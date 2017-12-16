source common.sh
echo "Creating channels"

setEnvVars custodian
peer channel create -o orderer.VotingProxy.com:7050 -c custodian -f ../artifacts/custodian.tx >&log.txt
verifyResult $? "custodian channel creation"
mv custodian.block ../artifacts/custodian.block
peer channel create -o orderer.VotingProxy.com:7050 -c morganstanley -f ../artifacts/morganstanley.tx >&log.txt
verifyResult $? "morganstanley channel creation"
mv morganstanley.block ../artifacts/morganstanley.block
peer channel create -o orderer.VotingProxy.com:7050 -c goldmansacks -f ../artifacts/goldmansacks.tx >&log.txt
verifyResult $? "goldmansacks channel creation"
mv goldmansacks.block ../artifacts/goldmansacks.block
peer channel create -o orderer.VotingProxy.com:7050 -c jpmorgan -f ../artifacts/jpmorgan.tx >&log.txt
verifyResult $? "jpmorgan channel creation"
mv jpmorgan.block ../artifacts/jpmorgan.block

echo "joining custodian Peer to channels"

peer channel join -b ../artifacts/custodian.block >&log.txt
verifyResult $? "custodian Peer custodian channel join"
peer channel join -b ../artifacts/morganstanley.block >&log.txt
verifyResult $? "custodian Peer morganstanley join"
peer channel join -b ../artifacts/goldmansacks.block >&log.txt
verifyResult $? "custodian Peer goldmansacks channel join"
peer channel join -b ../artifacts/jpmorgan.block >&log.txt
verifyResult $? "custodian Peer jpmorgan channel join"

echo "joining morganstanley Peer to channels"

setEnvVars morganstanley
peer channel join -b ../artifacts/custodian.block >&log.txt
verifyResult $? "morganstanley Peer custodian channel join"
peer channel join -b ../artifacts/morganstanley.block >&log.txt
verifyResult $? "morganstanley Peer morganstanley channel join"

echo "joining goldmansacks Peer to channels"

setEnvVars goldmansacks
peer channel join -b ../artifacts/custodian.block >&log.txt
verifyResult $? "goldmansacks Peer custodian channel join"
peer channel join -b ../artifacts/goldmansacks.block >&log.txt
verifyResult $? "goldmansacks Peer goldmansacks channel join"

echo "joining jpmorgan Peer to channels"

setEnvVars jpmorgan
peer channel join -b ../artifacts/custodian.block >&log.txt
verifyResult $? "jpmorgan Peer custodian channel join"
peer channel join -b ../artifacts/jpmorgan.block >&log.txt
verifyResult $? "jpmorgan Peer jpmorgan channel join"

echo "installing the chaincodes"

setEnvVars custodian
peer chaincode install -o orderer.VotingProxy.com:7050 -n public -v 1.0 -p github.com/hyperledger/fabric/chaincode/public >&log.txt
verifyResult $? "custodian peer public chaincode installation"
peer chaincode install -o orderer.VotingProxy.com:7050 -n shares -v 1.0 -p github.com/hyperledger/fabric/chaincode/private/shares >&log.txt
verifyResult $? "custodian peer shares chaincode installation"
peer chaincode install -o orderer.VotingProxy.com:7050 -n votes -v 1.0 -p github.com/hyperledger/fabric/chaincode/private/votes >&log.txt
verifyResult $? "custodian peer votes chaincode installation"
setEnvVars morganstanley
peer chaincode install -o orderer.VotingProxy.com:7050 -n public -v 1.0 -p github.com/hyperledger/fabric/chaincode/public >&log.txt
verifyResult $? "morganstanley peer public chaincode installation"
peer chaincode install -o orderer.VotingProxy.com:7050 -n shares -v 1.0 -p github.com/hyperledger/fabric/chaincode/private/shares >&log.txt
verifyResult $? "morganstanley peer shares chaincode installation"
peer chaincode install -o orderer.VotingProxy.com:7050 -n votes -v 1.0 -p github.com/hyperledger/fabric/chaincode/private/votes >&log.txt
verifyResult $? "morganstanley peer votes chaincode installation"
setEnvVars goldmansacks
peer chaincode install -o orderer.VotingProxy.com:7050 -n public -v 1.0 -p github.com/hyperledger/fabric/chaincode/public >&log.txt
verifyResult $? "goldmansacks peer public chaincode installation"
peer chaincode install -o orderer.VotingProxy.com:7050 -n shares -v 1.0 -p github.com/hyperledger/fabric/chaincode/private/shares >&log.txt
verifyResult $? "goldmansacks peer shares chaincode installation"
peer chaincode install -o orderer.VotingProxy.com:7050 -n votes -v 1.0 -p github.com/hyperledger/fabric/chaincode/private/votes >&log.txt
verifyResult $? "goldmansacks peer votes chaincode installation"
setEnvVars jpmorgan
peer chaincode install -o orderer.VotingProxy.com:7050 -n public -v 1.0 -p github.com/hyperledger/fabric/chaincode/public >&log.txt
verifyResult $? "jpmorgan peer public chaincode installation"
peer chaincode install -o orderer.VotingProxy.com:7050 -n shares -v 1.0 -p github.com/hyperledger/fabric/chaincode/private/shares >&log.txt
verifyResult $? "jpmorgan peer shares chaincode installation"
peer chaincode install -o orderer.VotingProxy.com:7050 -n votes -v 1.0 -p github.com/hyperledger/fabric/chaincode/private/votes >&log.txt
verifyResult $? "jpmorgan peer votes chaincode installation"

echo "instantiating the chaincodes"

setEnvVars custodian
peer chaincode instantiate -o orderer.VotingProxy.com:7050 -C custodian -n public -v 1.0 -c '{"Args":["init","morganstanley","goldmansacks","jpmorgan"]}' -P "OR ('custodianMSP.member')" >&log.txt
verifyResult $? "custodian public chaincode on custodian chanel instantiation"

peer chaincode instantiate -o orderer.VotingProxy.com:7050 -C morganstanley -n shares -v 1.0 -c '{"Args":[]}' -P "OR ('custodianMSP.member','morganstanleyMSP.member')" >&log.txt
verifyResult $? "custodian shares chaincode on morganstanley chanel instantiation"
peer chaincode instantiate -o orderer.VotingProxy.com:7050 -C morganstanley -n votes -v 1.0 -c '{"Args":[]}' -P "OR ('custodianMSP.member','morganstanleyMSP.member')" >&log.txt
verifyResult $? "custodian votes chaincode on morganstanley chanel instantiation"

peer chaincode instantiate -o orderer.VotingProxy.com:7050 -C goldmansacks -n shares -v 1.0 -c '{"Args":[]}' -P "OR ('custodianMSP.member','goldmansacksMSP.member')" >&log.txt
verifyResult $? "custodian shares chaincode on goldmansacks chanel instantiation"
peer chaincode instantiate -o orderer.VotingProxy.com:7050 -C goldmansacks -n votes -v 1.0 -c '{"Args":[]}' -P "OR ('custodianMSP.member','goldmansacksMSP.member')" >&log.txt
verifyResult $? "custodian votes chaincode on goldmansacks chanel instantiation"

peer chaincode instantiate -o orderer.VotingProxy.com:7050 -C jpmorgan -n shares -v 1.0 -c '{"Args":[]}' -P "OR ('custodianMSP.member','jpmorganMSP.member')" >&log.txt
verifyResult $? "custodian shares chaincode on jpmorgan chanel instantiation"
peer chaincode instantiate -o orderer.VotingProxy.com:7050 -C jpmorgan -n votes -v 1.0 -c '{"Args":[]}' -P "OR ('custodianMSP.member','jpmorganMSP.member')" >&log.txt
verifyResult $? "custodian votes chaincode on jpmorgan chanel instantiation"

sleep 5
echo "building the remaining chaincodes"

buildChainCode () {
	setEnvVars $1
	peer chaincode query -o orderer.VotingProxy.com:7050 -C $1 -n votes -c '{"Args":["queryVotes"]}' >&log.txt
	verifyResult $? "build votes for $1"
	peer chaincode query -o orderer.VotingProxy.com:7050 -C $1 -n shares -c '{"Args":["queryMemberShares"]}' >&log.txt
	verifyResult $? "build shares for $1"
	peer chaincode query -o orderer.VotingProxy.com:7050 -C custodian -n public -c '{"Args":["queryProxyVotingIDs"]}' >&log.txt
	verifyResult $? "build public for $1"
}

buildChainCode morganstanley
buildChainCode goldmansacks
buildChainCode jpmorgan
