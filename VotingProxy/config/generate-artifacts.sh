export FABRIC_CFG_PATH=./
echo "Generating crypto material"
cryptogen generate --config=./crypto-config.yaml
echo "Generating orderer genesis block"
configtxgen -profile OrdererGenesis -outputBlock ../artifacts/genesis.block
echo "Generating channel configuration transactions"
configtxgen -profile custodian -outputCreateChannelTx ../artifacts/custodian.tx -channelID custodian
configtxgen -profile morganstanley -outputCreateChannelTx ../artifacts/morganstanley.tx -channelID morganstanley
configtxgen -profile goldmansacks -outputCreateChannelTx ../artifacts/goldmansacks.tx -channelID goldmansacks
configtxgen -profile jpmorgan -outputCreateChannelTx ../artifacts/jpmorgan.tx -channelID jpmorgan
