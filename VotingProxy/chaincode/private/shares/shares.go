package main

import
(
	"fmt"
	"strconv"
	"runtime"
	"encoding/json"
	"github.com/hyperledger/fabric/core/chaincode/shim"
	pb "github.com/hyperledger/fabric/protos/peer"
)

func FormatError(err string) string {
	_, fn, line, _ := runtime.Caller(1)
	return fmt.Sprintf(" %s:%d %s", fn, line, err)
}

type SharesChaincode struct {}

func (t *SharesChaincode) Init(stub shim.ChaincodeStubInterface) pb.Response {
	// initialize the authorizations to empty
	authorizations := []string{}
	authorizationBytes, err := json.Marshal(authorizations)
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}
	err = stub.PutState("authorizations", authorizationBytes)
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}

	// initialize the shares to zero
	err = stub.PutState("shares", []byte("0"))
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}
	return shim.Success(nil)
}

func (t *SharesChaincode) Invoke(stub shim.ChaincodeStubInterface) pb.Response {
	fmt.Println("ex02 Invoke")
	function, args := stub.GetFunctionAndParameters()
	if function == "initMemberShares" {
		return t.initMemberShares(stub, args)
	}
	if function == "queryMemberShares" {
		return t.queryMemberShares(stub)
	}
	if function == "queryAuthorizations" {
		return t.queryAuthorizations(stub)
	}
	if function == "addAutorizations" {
		return t.addAutorizations(stub, args)
	}
	if function == "reset" {
		return t.reset(stub)
	}
	return shim.Error(FormatError("Invalid function name."))
}

func (t *SharesChaincode) initMemberShares(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	var err error

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1: SharesNimber")
	}

	_, err = strconv.Atoi(args[0])
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}

	err = stub.PutState("shares", []byte(args[0]))
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}

	return shim.Success(nil)
}

func (t *SharesChaincode) queryMemberShares(stub shim.ChaincodeStubInterface) pb.Response {
	var err error

	memberSharesBytes, err := stub.GetState("shares")
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}
	if memberSharesBytes == nil {
		return shim.Success([]byte("0"))
	}
	_, err = strconv.Atoi(string(memberSharesBytes))
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}

	return shim.Success(memberSharesBytes)
}

func (t *SharesChaincode) queryAuthorizations(stub shim.ChaincodeStubInterface) pb.Response {
	authorizationBytes, err := stub.GetState("authorizations")
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}

	authorizations := []string{}
	if authorizationBytes != nil {
		err = json.Unmarshal(authorizationBytes, &authorizations)
		if err != nil {
			return shim.Error(FormatError(err.Error()))
		}
	}

	authorizationBytes, err = json.Marshal(authorizations)
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}

	return shim.Success(authorizationBytes)
}

func (t *SharesChaincode) addAutorizations(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	authorizationBytes, err := stub.GetState("authorizations")
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}

	authorizations := []string{}
	if authorizationBytes != nil {
		err = json.Unmarshal(authorizationBytes, &authorizations)
		if err != nil {
			return shim.Error(FormatError(err.Error()))
		}
	}

	for j := 0; j < len(args); j++ {
		redundant := false
		for i := 0; i < len(authorizations); i++ {
			if (args[j] == authorizations[i]) {
				redundant = true;
				break;
			}
		}
		if (redundant == false) {
			// add authorization to vote for Proxy
			authorizations = append(authorizations, args[j])
		}
	}

	authorizationBytes, err = json.Marshal(authorizations)
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}
	err = stub.PutState("authorizations", authorizationBytes)
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}

	return shim.Success(nil)
}

func (t *SharesChaincode) reset(stub shim.ChaincodeStubInterface) pb.Response {
	err := stub.PutState("shares", []byte("0"))
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}
	bytes, err := json.Marshal([]string{})
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}
	err = stub.PutState("authorizations", bytes)
	if err != nil {
		return shim.Error(FormatError(err.Error()))
	}

	return shim.Success(nil)
}

func main() {
	err := shim.Start(new(SharesChaincode))
	if err != nil {
		fmt.Printf("Error starting ProxyVote private channel chaincode: %s", err)
	}
}
