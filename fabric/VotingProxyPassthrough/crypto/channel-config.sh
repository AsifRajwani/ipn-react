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

echo "Creating channels"

setEnvVars "Custodian"
peer channel create -o orderer.VotingProxy.com:7050 -c public -f ./public.tx >&log.txt
verifyResult $? "public channel creation failed"
peer channel create -o orderer.VotingProxy.com:7050 -c ms -f ./ms.tx >&log.txt
verifyResult $? "ms channel creation failed"
peer channel create -o orderer.VotingProxy.com:7050 -c gs -f ./gs.tx >&log.txt
verifyResult $? "gs channel creation failed"
peer channel create -o orderer.VotingProxy.com:7050 -c jpm -f ./jpm.tx >&log.txt
verifyResult $? "jpm channel creation failed"

echo "joining Custodian Peer to channels"

peer channel join -b public.block >&log.txt
verifyResult $? "Custodian Peer public channel join failed"
peer channel join -b ms.block >&log.txt
verifyResult $? "Custodian Peer public channel join failed"
peer channel join -b gs.block >&log.txt
verifyResult $? "Custodian Peer public channel join failed"
peer channel join -b jpm.block >&log.txt
verifyResult $? "Custodian Peer public channel join failed"

echo "joining MorganStanley Peer to channels"

setEnvVars "MorganStanley"
peer channel join -b public.block >&log.txt
verifyResult $? "MorganStanley Peer public channel join failed"
peer channel join -b ms.block >&log.txt
verifyResult $? "MorganStanley Peer ms channel join failed"

echo "joining GoldmanSacks Peer to channels"

setEnvVars "GoldmanSacks"
peer channel join -b public.block >&log.txt
verifyResult $? "GoldmanSacks Peer public channel join failed"
peer channel join -b gs.block >&log.txt
verifyResult $? "GoldmanSacks Peer gs channel join failed"

echo "joining JPMorgan Peer to channels"

setEnvVars "JPMorgan"
peer channel join -b public.block >&log.txt
verifyResult $? "JPMorgan Peer public channel join failed"
peer channel join -b jpm.block >&log.txt
verifyResult $? "JPMorgan Peer jpm channel join failed"

echo "installing the chaincodes"

setEnvVars "Custodian"
peer chaincode install -o orderer.VotingProxy.com:7050 -n proxyvote1 -v 1.0 -p github.com/hyperledger/fabric/chaincode/proxyvote1 >&log.txt
verifyResult $? "Custodian peer chaincode installation failed"
peer chaincode install -o orderer.VotingProxy.com:7050 -n proxyvote2 -v 1.0 -p github.com/hyperledger/fabric/chaincode/proxyvote2 >&log.txt
verifyResult $? "Custodian peer chaincode installation failed"
setEnvVars "MorganStanley"
peer chaincode install -o orderer.VotingProxy.com:7050 -n proxyvote1 -v 1.0 -p github.com/hyperledger/fabric/chaincode/proxyvote1 >&log.txt
verifyResult $? "MorganStanley peer chaincode installation failed"
peer chaincode install -o orderer.VotingProxy.com:7050 -n proxyvote2 -v 1.0 -p github.com/hyperledger/fabric/chaincode/proxyvote2 >&log.txt
verifyResult $? "Custodian peer chaincode installation failed"
setEnvVars "GoldmanSacks"
peer chaincode install -o orderer.VotingProxy.com:7050 -n proxyvote1 -v 1.0 -p github.com/hyperledger/fabric/chaincode/proxyvote1 >&log.txt
verifyResult $? "GoldmanSacks peer chaincode installation failed"
peer chaincode install -o orderer.VotingProxy.com:7050 -n proxyvote2 -v 1.0 -p github.com/hyperledger/fabric/chaincode/proxyvote2 >&log.txt
verifyResult $? "Custodian peer chaincode installation failed"
setEnvVars "JPMorgan"
peer chaincode install -o orderer.VotingProxy.com:7050 -n proxyvote1 -v 1.0 -p github.com/hyperledger/fabric/chaincode/proxyvote1 >&log.txt
verifyResult $? "JPMorgan peer chaincode installation failed"
peer chaincode install -o orderer.VotingProxy.com:7050 -n proxyvote2 -v 1.0 -p github.com/hyperledger/fabric/chaincode/proxyvote2 >&log.txt
verifyResult $? "Custodian peer chaincode installation failed"

echo "instantiating the chaincode"

setEnvVars "Custodian"
peer chaincode instantiate -o orderer.VotingProxy.com:7050 -C public -n proxyvote1 -v 1.0 -c '{"Args":["init","a","100","b","200"]}' -P "OR	('CustodianMSP.member','MorganStanleyMSP.member')" >&log.txt
verifyResult $? "chaincode instantiation failed"
peer chaincode instantiate -o orderer.VotingProxy.com:7050 -C public -n proxyvote2 -v 1.0 -c '{"Args":["init","c","2000","d","3000"]}' -P "OR	('CustodianMSP.member','MorganStanleyMSP.member')" >&log.txt
verifyResult $? "chaincode instantiation failed"

sleep 3

echo "Querying the ledger"

setEnvVars "Custodian"
peer chaincode query -C public -n proxyvote1 -v 1.0 -c '{"Args":["query","a"]}' >&log.txt
verifyResult $? "ledger query failed"
peer chaincode query -C public -n proxyvote2 -v 1.0 -c '{"Args":["query","c"]}' >&log.txt
verifyResult $? "ledger query failed"
setEnvVars "MorganStanley"
peer chaincode query -C public -n proxyvote1 -v 1.0 -c '{"Args":["query","a"]}' >&log.txt
verifyResult $? "ledger query failed"
peer chaincode query -C public -n proxyvote2 -v 1.0 -c '{"Args":["query","c"]}' >&log.txt
verifyResult $? "ledger query failed"
setEnvVars "GoldmanSacks"
peer chaincode query -C public -n proxyvote1 -v 1.0 -c '{"Args":["query","a"]}' >&log.txt
verifyResult $? "ledger query failed"
peer chaincode query -C public -n proxyvote2 -v 1.0 -c '{"Args":["query","c"]}' >&log.txt
verifyResult $? "ledger query failed"
setEnvVars "JPMorgan"
peer chaincode query -C public -n proxyvote1 -v 1.0 -c '{"Args":["query","a"]}' >&log.txt
verifyResult $? "ledger query failed"
peer chaincode query -C public -n proxyvote2 -v 1.0 -c '{"Args":["query","c"]}' >&log.txt
verifyResult $? "ledger query failed"
