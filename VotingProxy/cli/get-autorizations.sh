source common.sh
# Quering the Proxy Voting authorizations on $1 chanel

setEnvVars custodian
peer chaincode query -o orderer.VotingProxy.com:7050 -C $1 -n shares -c '{"Args":["queryAuthorizations"]}' >&log.txt
verifyResult $? "ledger modification"
AUTH=$(cat log.txt | awk '/Query Result/ {print $NF}')
echo authorizations=$AUTH

setEnvVars $1
peer chaincode query -o orderer.VotingProxy.com:7050 -C $1 -n shares -c '{"Args":["queryAuthorizations"]}' >&log.txt
verifyResult $? "ledger modification"
AUTH=$(cat log.txt | awk '/Query Result/ {print $NF}')
echo authorizations=$AUTH
