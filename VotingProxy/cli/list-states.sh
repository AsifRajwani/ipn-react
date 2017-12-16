source common.sh
# Querying the voting states

setEnvVars custodian
peer chaincode query -C custodian -n public -v 1.0 -c '{"Args":["queryProxyVotingIDs"]}' >&log.txt
verifyResult $? "ledger query"
IDS=$(cat log.txt | awk '/Query Result/ {print $NF}')
echo $IDS
