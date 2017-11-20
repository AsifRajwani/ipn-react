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

echo "Querying the ledger"

setEnvVars "Custodian"
peer chaincode query -C public -n proxyvote1 -v 1.0 -c '{"Args":["query","a"]}' >&log.txt
verifyResult $? "ledger query failed"
A=$(cat log.txt | awk '/Query Result/ {print $NF}')
peer chaincode query -C public -n proxyvote1 -v 1.0 -c '{"Args":["query","b"]}' >&log.txt
verifyResult $? "ledger query failed"
B=$(cat log.txt | awk '/Query Result/ {print $NF}')
peer chaincode query -C public -n proxyvote2 -v 1.0 -c '{"Args":["query","c"]}' >&log.txt
verifyResult $? "ledger query failed"
C=$(cat log.txt | awk '/Query Result/ {print $NF}')
peer chaincode query -C public -n proxyvote2 -v 1.0 -c '{"Args":["query","d"]}' >&log.txt
verifyResult $? "ledger query failed"
D=$(cat log.txt | awk '/Query Result/ {print $NF}')
echo Custodian: A=$A, B=$B, C=$C, D=$D

setEnvVars "MorganStanley"
peer chaincode query -C public -n proxyvote1 -v 1.0 -c '{"Args":["query","a"]}' >&log.txt
verifyResult $? "ledger query failed"
A=$(cat log.txt | awk '/Query Result/ {print $NF}')
peer chaincode query -C public -n proxyvote1 -v 1.0 -c '{"Args":["query","b"]}' >&log.txt
verifyResult $? "ledger query failed"
B=$(cat log.txt | awk '/Query Result/ {print $NF}')
peer chaincode query -C public -n proxyvote2 -v 1.0 -c '{"Args":["query","c"]}' >&log.txt
verifyResult $? "ledger query failed"
C=$(cat log.txt | awk '/Query Result/ {print $NF}')
peer chaincode query -C public -n proxyvote2 -v 1.0 -c '{"Args":["query","d"]}' >&log.txt
verifyResult $? "ledger query failed"
D=$(cat log.txt | awk '/Query Result/ {print $NF}')
echo MorganStanley: A=$A, B=$B, C=$C, D=$D

setEnvVars "GoldmanSacks"
peer chaincode query -C public -n proxyvote1 -v 1.0 -c '{"Args":["query","a"]}' >&log.txt
verifyResult $? "ledger query failed"
A=$(cat log.txt | awk '/Query Result/ {print $NF}')
peer chaincode query -C public -n proxyvote1 -v 1.0 -c '{"Args":["query","b"]}' >&log.txt
verifyResult $? "ledger query failed"
B=$(cat log.txt | awk '/Query Result/ {print $NF}')
peer chaincode query -C public -n proxyvote2 -v 1.0 -c '{"Args":["query","c"]}' >&log.txt
verifyResult $? "ledger query failed"
C=$(cat log.txt | awk '/Query Result/ {print $NF}')
peer chaincode query -C public -n proxyvote2 -v 1.0 -c '{"Args":["query","d"]}' >&log.txt
verifyResult $? "ledger query failed"
D=$(cat log.txt | awk '/Query Result/ {print $NF}')
echo GoldmanSacks: A=$A, B=$B, C=$C, D=$D

setEnvVars "JPMorgan"
peer chaincode query -C public -n proxyvote1 -v 1.0 -c '{"Args":["query","a"]}' >&log.txt
verifyResult $? "ledger query failed"
A=$(cat log.txt | awk '/Query Result/ {print $NF}')
peer chaincode query -C public -n proxyvote1 -v 1.0 -c '{"Args":["query","b"]}' >&log.txt
verifyResult $? "ledger query failed"
B=$(cat log.txt | awk '/Query Result/ {print $NF}')
peer chaincode query -C public -n proxyvote2 -v 1.0 -c '{"Args":["query","c"]}' >&log.txt
verifyResult $? "ledger query failed"
C=$(cat log.txt | awk '/Query Result/ {print $NF}')
peer chaincode query -C public -n proxyvote2 -v 1.0 -c '{"Args":["query","d"]}' >&log.txt
verifyResult $? "ledger query failed"
D=$(cat log.txt | awk '/Query Result/ {print $NF}')
echo JPMorgan: A=$A, B=$B, C=$C, D=$D
