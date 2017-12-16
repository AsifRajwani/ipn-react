source common.sh
# Querying the vote

setEnvVars custodian
peer chaincode query -C $1 -n votes -v 1.0 -c '{"Args":["queryVote","'$2'"]}' >&log.txt
verifyResult $? "ledger query"
SH=$(cat log.txt | awk '/Query Result/ {print $NF}')
echo votes=$SH
