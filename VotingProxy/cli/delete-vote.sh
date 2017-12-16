source common.sh
# Deleting the momber vote

setEnvVars $1
peer chaincode invoke -C $1 -n votes -v 1.0 -c '{"Args":["deleteVote","'$2'"]}' >&log.txt
verifyResult $? "ledger vote deletion"
