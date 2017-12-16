source common.sh
# Querying the shares

setEnvVars custodian
peer chaincode query -C $1 -n shares -v 1.0 -c '{"Args":["queryMemberShares"]}' >&log.txt
verifyResult $? "ledger query"
SH=$(cat log.txt | awk '/Query Result/ {print $NF}')
echo shares=$SH
	
setEnvVars $1
peer chaincode query -C $1 -n shares -v 1.0 -c '{"Args":["queryMemberShares"]}' >&log.txt
verifyResult $? "ledger query"
SH=$(cat log.txt | awk '/Query Result/ {print $NF}')
echo shares=$SH
