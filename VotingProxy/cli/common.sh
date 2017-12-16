setEnvVars () {
	export CORE_PEER_ADDRESS=peer0.$1.VotingProxy.com:7051
	export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/config/crypto-config/peerOrganizations/$1.VotingProxy.com/users/Admin\@$1.VotingProxy.com/msp
	export CORE_PEER_LOCALMSPID="$1MSP"
}

verifyResult () {
	if [ $1 -ne 0 ] ; then
		tput setaf 1; echo $2 "FAILURE"; tput setaf 4;
   		exit 1
	else
		tput setaf 2; echo $2 "SUCCESS"; tput setaf 4;
	fi
}
