source common.sh
# Publishing the $1 Proxy Voting results

setEnvVars custodian
peer chaincode invoke -o orderer.VotingProxy.com:7050 -C custodian -n public -c '{"Args":["publishResults","'$1'"]}' >&log.txt
verifyResult $? "ledger modification"

sleep 3 

peer chaincode query -o orderer.VotingProxy.com:7050 -C custodian -n public -c '{"Args":["queryProxyVote","'$1'"]}' >&log.txt
verifyResult $? "ledger query"
RESULT=$(cat log.txt | awk '/Query Result/ {print $NF}')
echo $RESULT
