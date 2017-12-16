package main

import
(
	"fmt"
	"strconv"
	"encoding/json"
	"github.com/hyperledger/fabric/core/chaincode/shim"
	pb "github.com/hyperledger/fabric/protos/peer"
)

type VotesChaincode struct {}

func (t *VotesChaincode) Init(stub shim.ChaincodeStubInterface) pb.Response {
	// initialize the Proxy Vot list to empty
	bytes, err := json.Marshal([]string{})
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}
	err = stub.PutState("votes", bytes)
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}
	return shim.Success(nil)
}

func (t *VotesChaincode) Invoke(stub shim.ChaincodeStubInterface) pb.Response {
	fmt.Println("ex02 Invoke")
	function, args := stub.GetFunctionAndParameters()
	if function == "vote" {
		return t.vote(stub, args)
	}
	if function == "queryVote" {
		return t.queryVote(stub, args)
	}
	if function == "queryVotes" {
		return t.queryVotes(stub)
	}
	if function == "deleteVote" {
		return t.deleteVote(stub, args)
	}
	if function == "reset" {
		return t.reset(stub)
	}

	return shim.Error(FormatError("Invalid function name."))
}

func (t *VotesChaincode) vote(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	var err error

	if len(args) < 3 || len(args) % 2 == 0 {
		return shim.Error("Incorrect number of arguments. Expecting: ProxyID, OptionName1, OptionValue1, ...")
	}

	// query the state of the voting from the public channel
	invRes := stub.InvokeChaincode("public", [][]byte{[]byte("queryProxyVote"), []byte(args[0])}, "custodian")
	if invRes.GetStatus() != 200 || invRes.GetPayload() == nil {
		return shim.Error(FormatError("Unknown Proxy Voting ID"))
	}

	var proxyVote ProxyVote
	err = json.Unmarshal(invRes.GetPayload(), &proxyVote)
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}

	if proxyVote.Status != "active" {
		return shim.Error(FormatError("Proxy ID " + args[0] + " voting is not active"))
	}

	// verify that the voting is for the appropriate options set by Custodian
	for i := 1; i < len(args) && args[i] != ""; i+=2 {
		optonPresence := false
		for j := 0; j < len(proxyVote.Options); j++ {
			if (args[i] == proxyVote.Options[j].Id) {
				optonPresence = true;
				break;
			}
		}
		if (optonPresence == false) {
			return shim.Error(FormatError("Voting for invalid Proxy Option " + args[i]))
		}
	}

	// query authorizations from the shares chaincode
	invRes = stub.InvokeChaincode("shares", [][]byte{[]byte("queryAuthorizations")}, "")
	if invRes.GetStatus() != 200 || invRes.GetPayload() == nil {
		return shim.Error(FormatError("Failed to query the authorazation to vote for this Proxy"))
	}

	autorizations := []string{}
	err = json.Unmarshal(invRes.GetPayload(), &autorizations)
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}

	authorization := false
	for i := 0; i < len(autorizations); i++ {
		if (args[0] == autorizations[i]) {
			authorization = true;
			break;
		}
	}
	if (authorization == false) {
		return shim.Error(FormatError("Unauthorized to vote for this Proxy"))
	}

	// query the number of remaining shares from the SHARES channel
	invRes = stub.InvokeChaincode("shares", [][]byte{[]byte("queryMemberShares")}, "")
	if invRes.GetStatus() != 200 || invRes.GetPayload() == nil {
		return shim.Error(FormatError("Failed to query the member shares"))
	}
	shares, err := strconv.Atoi(string(invRes.Payload))
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}

	optionVotesBytes, err := stub.GetState(args[0])
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}
	optionVotes := []OptionVote{}
	if optionVotesBytes != nil {
		err = json.Unmarshal(optionVotesBytes, &optionVotes)
		if err != nil {
			return shim.Error(FormatError(err.Error()))
		}
	}

	for i := 1; i < len(args) && args[i] != ""; i+=2 {
		isUpdate := false
		for j := 0; j < len(optionVotes); j++ {
			if args[i] == optionVotes[j].Id {
				adjustement, err := strconv.Atoi(args[i+1])
				if err != nil || (adjustement < 0 && (adjustement + optionVotes[j].Value < 0)) {
					return shim.Error(FormatError("Incorrect voting adjustement for Id " + args[i]))
				}
				if adjustement > shares {
					return shim.Error(FormatError("Insufficient funds for voting the options"))
				}
				optionVotes[j].Value += adjustement
				shares -= adjustement
				isUpdate = true
				break
			}
		}
		if isUpdate == false {
			var optionVote OptionVote
			optionVote.Id = args[i]
			optionVote.Value, err = strconv.Atoi(args[i+1])
			if err != nil || optionVote.Value < 0 {
				return shim.Error(FormatError("Incorrect voting adjustement for Option " + args[i]))
			}
			if optionVote.Value > shares {
				return shim.Error(FormatError("Insufficient funds for voting the options"))
			}
			optionVotes = append(optionVotes, optionVote)
			shares -= optionVote.Value
		}
	}

	// record the updated vote
	optionVotesBytes, err = json.Marshal(optionVotes)
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}

	err = stub.PutState(args[0], optionVotesBytes)
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}

	// update the number of remaining shares to the SHARES channel
	stub.InvokeChaincode("shares", [][]byte{[]byte("initMemberShares"), []byte(strconv.Itoa(shares))}, "")

	// update the vote list
	bytes, err := stub.GetState("votes")
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}
	if bytes == nil {
		return shim.Error(FormatError("failure to retrieve the Proxy Vote list"))
	}
	votes := []string{}
	err = json.Unmarshal(bytes, &votes)
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}
	redundant := false
	for _, vote := range votes {
		if vote == args[0] {
			redundant = true
		}
	}
	if (redundant == false) {
		votes = append(votes, args[0])
	}
	bytes, err = json.Marshal(votes)
	err = stub.PutState("votes", bytes)

	return shim.Success(nil)
}

func (t *VotesChaincode) queryVote(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	var err error

	if len(args) != 1 {
		return shim.Error(FormatError("Incorrect number of arguments. Expecting 1: ProxyID"))
	}

	optionVotesBytes, err := stub.GetState(args[0])
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}
	if optionVotesBytes == nil {
		return shim.Error(FormatError("Unknown Proxy Voting ID: " + args[0]))
	}

	optionVotes := []OptionVote{}
	err = json.Unmarshal(optionVotesBytes, &optionVotes)
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}

	return shim.Success(optionVotesBytes)
}

func (t *VotesChaincode) queryVotes(stub shim.ChaincodeStubInterface) pb.Response {
	bytes, err := stub.GetState("votes")
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}
	if bytes == nil {
		return shim.Error(FormatError("failure to retrieve the Proxy Vote list"))
	}
	votes := []string{}
	err = json.Unmarshal(bytes, &votes)
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}
	var result string = ""

	for _, vote := range votes {
		bytes, err = stub.GetState(vote)
		if err != nil {
			return shim.Error(FormatError(err.Error()))
		}
		if bytes == nil {
			return shim.Error(FormatError("Unknown Proxy Voting ID: " + vote))
		}
		result += string(bytes)
	}

	return shim.Success([]byte(result))
}

func (t *VotesChaincode) deleteVote(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args) != 1 {
		return shim.Error(FormatError("Incorrect number of arguments. Expecting 1: ProxyID"))
	}
	stub.DelState(args[0])
	return shim.Success(nil)

	// rest of the function should not be allowed to run
	optionVotesBytes, err := stub.GetState(args[0])
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}
	if optionVotesBytes == nil {
		return shim.Error(FormatError("Unknown Proxy Voting ID: " + args[0]))
	}

	optionVotes := []OptionVote{}
	err = json.Unmarshal(optionVotesBytes, &optionVotes)
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}
	stub.DelState(args[0])

	// return shares to the wallet

	// query the number of remaining shares from the SHARES channel
	invRes := stub.InvokeChaincode("shares", [][]byte{[]byte("queryMemberShares")}, "")
	shares, err := strconv.Atoi(string(invRes.Payload))
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}

	for j := 0; j < len(optionVotes); j++ {
		shares += optionVotes[j].Value
	}

	// update the remaining shares in the wallet
	stub.InvokeChaincode("shares", [][]byte{[]byte("initMemberShares"), []byte(strconv.Itoa(shares))}, "")
	return shim.Success(nil)
}

func (t *VotesChaincode) reset(stub shim.ChaincodeStubInterface) pb.Response {
	bytes, err := stub.GetState("votes")
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}
	if bytes == nil {
		return shim.Error(FormatError("failure to retrieve the Proxy Vote list"))
	}
	votes := []string{}
	err = json.Unmarshal(bytes, &votes)
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}
	for _, vote := range votes {
		stub.DelState(vote)
	}
	bytes, err = json.Marshal([]string{})
	err = stub.PutState("votes", bytes)

	return shim.Success(nil)
}

func main() {
	err := shim.Start(new(VotesChaincode))
	if err != nil {
		fmt.Printf("Error starting ProxyVote private channel chaincode: %s", err)
	}
}
