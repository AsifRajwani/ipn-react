source common.sh

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
