source common.sh
# Modifying the $1 shares to $2

PARAMS='{"Args":["vote"'
argc=$#
argv=($@)
for ((i=1; i<argc; i++)); do
	PARAMS+=',"'${argv[i]}'"'
done
PARAMS+=']}'

setEnvVars $1
peer chaincode invoke -o orderer.VotingProxy.com:7050 -C $1 -n votes -c $PARAMS >&log.txt
verifyResult $? "ledger modification"
