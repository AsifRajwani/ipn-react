package main

import
(
	"fmt"
	"encoding/json"
	"github.com/hyperledger/fabric/core/chaincode/shim"
	pb "github.com/hyperledger/fabric/protos/peer"
)

type PublicChaincode struct {}

func (t *PublicChaincode) Init(stub shim.ChaincodeStubInterface) pb.Response {
	_, args := stub.GetFunctionAndParameters()

	// initialize the channel list
	channels := []string{}
	for i := 0; i < len(args); i++ {
		channels = append(channels, args[i])
	}
	bytes, err := json.Marshal(channels)
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}
	err = stub.PutState("channels", bytes)
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}

	// initialize the Proxy Vote IDs to empty
	bytes, err = json.Marshal([]string{})
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}
	err = stub.PutState("proxyVotingIDs", bytes)
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}
	return shim.Success(nil)
}

func (t *PublicChaincode) Invoke(stub shim.ChaincodeStubInterface) pb.Response {
	fmt.Println("ex02 Invoke")
	function, args := stub.GetFunctionAndParameters()
	if function == "announceProxyVote" {
		return t.announceProxyVote(stub, args)
	}
	if function == "addVoteOptions" {
		return t.addVoteOptions(stub, args)
	}
	if function == "setProxyVoteState" {
		return t.setProxyVoteState(stub, args)
	}
	if function == "getProxyVoteState" {
		return t.getProxyVoteState(stub, args)
	}
	if function == "queryProxyVotingIDs" {
		return t.queryProxyVotingIDs(stub)
	}
	if function == "queryProxyVote" {
		return t.queryProxyVote(stub, args)
	}
	if function == "publishResults" {
		return t.publishResults(stub, args)
	}
	if function == "reset" {
		return t.reset(stub)
	}

	return shim.Error(FormatError("Invalid function name."))
}

func (t *PublicChaincode) announceProxyVote(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	var err error

	if len(args) != 2 {
		return shim.Error(FormatError("Incorrect number of arguments. Expecting 2: VoteID, VoteDescription"))
	}

	proxyVotingStateBytes, err := stub.GetState(args[0])
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}
	if proxyVotingStateBytes != nil {
		return shim.Error(FormatError("This Proxy Voting has already been announced"))
	}

	// new Proxy Vote object
	var proxyVote ProxyVote
	proxyVote.Id = args[0]
	proxyVote.Status = "new"
	proxyVote.Description = args[1]
	proxyVote.Options = []OptionVote{}

	// record the new initialized Proxy Vote object in JSON format
	proxyVoteBytes, err := json.Marshal(proxyVote)
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}
	err = stub.PutState(args[0], proxyVoteBytes)
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}

	// record the new initialized Proxy Vote ID
	proxyVotingIDs, err := stub.GetState("proxyVotingIDs")
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}

	ids := []string{}
	if proxyVotingIDs == nil {
		ids = append(ids, args[0])
	} else {
		err = json.Unmarshal(proxyVotingIDs, &ids)
		if err != nil {
			return shim.Error(FormatError(err.Error()))
		}
		var idinit bool = false
		for _, v := range ids {
			if v == args[0] {
				idinit = true
			}
		}
		if (idinit == false) {
			ids = append(ids, args[0])
		}
	}

	proxyVotingIDbytes, err := json.Marshal(ids)
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}

	err = stub.PutState("proxyVotingIDs", proxyVotingIDbytes)
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}

	return shim.Success(nil)
}

func (t *PublicChaincode) addVoteOptions(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	var err error

	if len(args) < 2 {
		return shim.Error(FormatError("Incorrect number of arguments. Expecting at least 2: VoteID, VoteOption1, ..."))
	}

	proxyVotingStateBytes, err := stub.GetState(args[0])
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}
	if proxyVotingStateBytes == nil {
		return shim.Error(FormatError("Unknown Proxy Voting ID"))
	}

	var proxyVote ProxyVote
	err = json.Unmarshal(proxyVotingStateBytes, &proxyVote)
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}

	// add proxy vote option if it is not redundant
	for i := 1; i < len(args); i++ {
		redundant := false
		for j := 0; j < len(proxyVote.Options); j++ {
			if proxyVote.Options[j].Id == args[i] {
				redundant = true
				break
			}
		}
		if redundant == false {
			proxyVote.Options = append(proxyVote.Options, OptionVote{args[i], 0})
		}
	}

	proxyVoteBytes, err := json.Marshal(proxyVote)
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}
	err = stub.PutState(args[0], proxyVoteBytes)
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}

	return shim.Success(nil)
}

func (t *PublicChaincode) setProxyVoteState(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	var err error

	if len(args) != 2 {
		return shim.Error(FormatError("Incorrect number of arguments. Expecting 2; VoteID, VoteStateValue"))
	}
	if args[1] != "active" && args[1] != "closed" {
		return shim.Error(FormatError("Incorrect value of the parameter, must be active or closed"))
	}

	proxyVotingStateBytes, err := stub.GetState(args[0])
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}
	if proxyVotingStateBytes == nil {
		return shim.Error(FormatError("Unknown Proxy Voting ID"))
	}

	var proxyVote ProxyVote
	err = json.Unmarshal(proxyVotingStateBytes, &proxyVote)
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}

	proxyVote.Status = args[1]
	proxyVotingUpdatedStateBytes, err := json.Marshal(proxyVote)
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}

	err = stub.PutState(args[0], proxyVotingUpdatedStateBytes)
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}

	return shim.Success(nil)
}

func (t *PublicChaincode) getProxyVoteState(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args) != 1 {
		return shim.Error(FormatError("Incorrect number of arguments. Expecting ID of the Proxy Voting"))
	}

	proxyVotingStateBytes, err := stub.GetState(args[0])
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}
	if proxyVotingStateBytes == nil {
		return shim.Error(FormatError("Unknown Proxy Voting ID"))
	}

	var proxyVote ProxyVote
	err = json.Unmarshal(proxyVotingStateBytes, &proxyVote)
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}

	return shim.Success([]byte(proxyVote.Status))
}

func (t *PublicChaincode) queryProxyVotingIDs(stub shim.ChaincodeStubInterface) pb.Response {
	proxyVotingStateIDs, err := stub.GetState("proxyVotingIDs")
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}
	ids := []string{}
	var result string = ""
	if proxyVotingStateIDs != nil {
		err = json.Unmarshal(proxyVotingStateIDs, &ids)
		if err != nil {
			return shim.Error(FormatError(err.Error()))
		}
		for _, id := range ids {
			proxyVotingStateBytes, err := stub.GetState(id)
			if err != nil {
				return shim.Error(FormatError(err.Error()))
			}
			if proxyVotingStateBytes == nil {
				return shim.Error(FormatError("Unknown Proxy Voting ID: " + id))
			}
			result += string(proxyVotingStateBytes)
		}
	}

	return shim.Success([]byte(result))
}

func (t *PublicChaincode) queryProxyVote(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args) != 1 {
		return shim.Error(FormatError("Incorrect number of arguments. Expecting ID of the Proxy Voting"))
	}

	proxyVotingStateBytes, err := stub.GetState(args[0])
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}
	if proxyVotingStateBytes == nil {
		return shim.Error(FormatError("Unknown Proxy Voting ID"))
	}

	var proxyVote ProxyVote
	err = json.Unmarshal(proxyVotingStateBytes, &proxyVote)
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}

	return shim.Success(proxyVotingStateBytes)
}

func (t *PublicChaincode) publishResults(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	var err error

	if len(args) != 1 {
		return shim.Error(FormatError("Incorrect number of arguments. Expecting: VoteID"))
	}

	bytes, err := stub.GetState("channels")
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}
	if bytes == nil {
		return shim.Error(FormatError("failure to retrieve the channel list"))
	}

	channels := []string{}
	err = json.Unmarshal(bytes, &channels)
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}

	bytes, err = stub.GetState(args[0])
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}
	if bytes == nil {
		return shim.Error(FormatError("Unknown Proxy Voting ID"))
	}

	var proxyVote ProxyVote
	err = json.Unmarshal(bytes, &proxyVote)
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}

	// verify that the Proxy Voting has been closed
	if proxyVote.Status != "closed" {
		return shim.Error(FormatError("The Proxy Voting has not been yet closed"))
	}

	for _, channel := range channels {
		// query the vote from the channel
		invRes := stub.InvokeChaincode("votes", [][]byte{[]byte("queryVote"), []byte(args[0])}, channel)
		if invRes.GetStatus() != 200 || invRes.GetPayload() == nil {
			return shim.Error(FormatError("Failed querying member votes for Proxy Voting ID"))
		}

		optionVotes := []OptionVote{}
		err = json.Unmarshal(invRes.GetPayload(), &optionVotes)
		if err != nil {
			return shim.Error(FormatError(err.Error()))
		}

		// add the queried member votes to the voting result
		for j := 0; j < len(optionVotes); j++ {
			for k := 0; k < len(proxyVote.Options); k++ {
				if optionVotes[j].Id == proxyVote.Options[k].Id {
					proxyVote.Options[k].Value += optionVotes[j].Value
				}
			}
		}
	}

	bytes, err = json.Marshal(proxyVote)
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}

	err = stub.PutState(args[0], bytes)
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}

	return shim.Success(nil)
}

func (t *PublicChaincode) reset(stub shim.ChaincodeStubInterface) pb.Response {
	bytes, err := stub.GetState("proxyVotingIDs")
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}
	if bytes == nil {
		return shim.Error(FormatError("failure to retrieve the Proxy Voting ID list"))
	}

	ids := []string{}
	err = json.Unmarshal(bytes, &ids)
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}
	for _, id := range ids {
		stub.DelState(id)
	}

	bytes, err = json.Marshal([]string{})
	err = stub.PutState("proxyVotingIDs", bytes)

	return shim.Success(nil)
}

func main() {
	err := shim.Start(new(PublicChaincode))
	if err != nil {
		fmt.Printf("Error starting ProxyVote public channel chaincode: %s", err)
	}
}
