setEnvVars () {
	export CORE_PEER_ADDRESS=peer0.$1.VotingProxy.com:7051
	export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/crypto-config/peerOrganizations/$1.VotingProxy.com/users/Admin\@$1.VotingProxy.com/msp
	export CORE_PEER_LOCALMSPID="$1MSP"
}

verifyResult () {
	if [ $1 -ne 0 ] ; then
		echo "!!!!!!!!!!!!!!! "$2" !!!!!!!!!!!!!!!!"
    echo "========= ERROR !!! FAILED to execute End-2-End Scenario ==========="
		echo
   		exit 1
	fi
}

echo "Modifying the ledger by $1 coins A->B and $2 C->D"

setEnvVars "Custodian"
peer chaincode invoke -o orderer.VotingProxy.com:7050 -C public -n proxyvote1 -c '{"Args":["invoke","a","b","'$1'"]}' >&log.txt
verifyResult $? "ledger modification failed"
peer chaincode invoke -o orderer.VotingProxy.com:7050 -C public -n proxyvote2 -c '{"Args":["invoke","c","d","'$2'"]}' >&log.txt
verifyResult $? "ledger modification failed"
