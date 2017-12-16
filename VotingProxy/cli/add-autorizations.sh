source common.sh
# Adding the $1 channel autorizations

PARAMS='{"Args":["addAutorizations"'
argc=$#
argv=($@)
for ((i=1; i<argc; i++)); do
	PARAMS+=',"'${argv[i]}'"'
done
PARAMS+=']}'

setEnvVars custodian
peer chaincode invoke -o orderer.VotingProxy.com:7050 -C $1 -n shares -c $PARAMS >&log.txt
verifyResult $? "ledger modification"
