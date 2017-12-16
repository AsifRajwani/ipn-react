source common.sh
# Modifying the $1 Voting State to $2

setEnvVars custodian
peer chaincode invoke -o orderer.VotingProxy.com:7050 -C custodian -n public -c '{"Args":["setProxyVoteState","'$1'","'$2'"]}' >&log.txt
verifyResult $? "ledger modification"
