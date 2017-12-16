source common.sh
# Modifying the $1 shares to $2

setEnvVars custodian
peer chaincode invoke -o orderer.VotingProxy.com:7050 -C $1 -n shares -c '{"Args":["initMemberShares","'$2'"]}' >&log.txt
verifyResult $? "ledger modification"
