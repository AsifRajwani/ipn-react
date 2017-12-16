source common.sh
# Adding the $1 Proxy Voting option

PARAMS='{"Args":["addVoteOptions"'
argc=$#
argv=($@)
for ((i=0; i<argc; i++)); do
	PARAMS+=',"'${argv[i]}'"'
done
PARAMS+=']}'

setEnvVars custodian
peer chaincode invoke -o orderer.VotingProxy.com:7050 -C custodian -n public -c $PARAMS >&log.txt
verifyResult $? "ledger modification"
