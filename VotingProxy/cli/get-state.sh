source common.sh
# Querying the voting state

setEnvVars custodian
peer chaincode query -C custodian -n public -v 1.0 -c '{"Args":["getProxyVoteState","'$1'"]}' >&log.txt
verifyResult $? "ledger query"
ID=$(cat log.txt | awk '/Query Result/ {print $NF}')
echo $1=$ID
