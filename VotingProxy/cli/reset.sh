source common.sh

resetLedger () {
	setEnvVars $1
	peer chaincode invoke -o orderer.VotingProxy.com:7050 -C $1 -n votes -c '{"Args":["reset"]}' >&log.txt
	verifyResult $? "votes resetLedger for $1"
	sleep 3
	peer chaincode invoke -o orderer.VotingProxy.com:7050 -C $1 -n shares -c '{"Args":["reset"]}' >&log.txt
	verifyResult $? "shares resetLedger for $1"
	sleep 3
}

resetLedger morganstanley
resetLedger goldmansacks
resetLedger jpmorgan

setEnvVars custodian
peer chaincode invoke -o orderer.VotingProxy.com:7050 -C custodian -n public -c '{"Args":["reset"]}' >&log.txt
verifyResult $? "ledger modification"
