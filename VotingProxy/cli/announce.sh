source common.sh
# Announcing the $1 Proxy Voting

setEnvVars custodian
peer chaincode invoke -o orderer.VotingProxy.com:7050 -C custodian -n public -c '{"Args":["announceProxyVote","'$1'","'$2'"]}' >&log.txt
verifyResult $? "Proxy Vote nnouncement"
