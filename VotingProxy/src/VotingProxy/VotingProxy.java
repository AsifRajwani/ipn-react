package VotingProxy;

import static java.lang.String.format;
import java.io.File;
import java.nio.file.Paths;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Properties;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;
import org.apache.commons.cli.CommandLine;
import org.hyperledger.fabric.sdk.ChaincodeID;
import org.hyperledger.fabric.sdk.Channel;
import org.hyperledger.fabric.sdk.EventHub;
import org.hyperledger.fabric.sdk.HFClient;
import org.hyperledger.fabric.sdk.Orderer;
import org.hyperledger.fabric.sdk.Peer;
import org.hyperledger.fabric.sdk.ProposalResponse;
import org.hyperledger.fabric.sdk.QueryByChaincodeRequest;
import org.hyperledger.fabric.sdk.SDKUtils;
import org.hyperledger.fabric.sdk.TransactionProposalRequest;
import org.hyperledger.fabric.sdk.security.CryptoSuite;
import org.json.JSONArray;
import org.json.JSONObject;

public class VotingProxy
{
    public static final String TEST_ADMIN_NAME = "admin";

    public TestConfig testConfig = TestConfig.getConfig();
    public HFClient client = HFClient.createNewInstance();
    
    public HashMap<String, Organizaton> organizatons = new HashMap<String, Organizaton>();
    public HashMap<String, EventHub> eventHubs = new HashMap<String, EventHub>();
    public HashMap<String, Channel> channels = new HashMap<String, Channel>();
    public HashMap<String, Orderer> orderers = new HashMap<String, Orderer>();
    public HashMap<String, Peer> peers = new HashMap<String, Peer>();
    
    public VotingProxy ()
    {
        try
        {
            organizatons.put("custodian", testConfig.getIntegrationTestsSampleOrg("custodian"));
            organizatons.put("morganstanley", testConfig.getIntegrationTestsSampleOrg("morganstanley"));
            organizatons.put("goldmansacks", testConfig.getIntegrationTestsSampleOrg("goldmansacks"));
            organizatons.put("jpmorgan", testConfig.getIntegrationTestsSampleOrg("jpmorgan"));
            
            client.setCryptoSuite(CryptoSuite.Factory.getCryptoSuite());
            final KeyStore keyStore = new KeyStore(new File(System.getProperty("java.io.tmpdir") + "/HFCSampletest.properties"));
            for (Organizaton organization : testConfig.getIntegrationTestsSampleOrgs())
            {
                final String orgName = organization.getName();
                organization.setAdmin(keyStore.getMember(TEST_ADMIN_NAME, orgName));
                OrgUser user = keyStore.getMember(orgName, organization.getName());
                organization.addUser(user);

                OrgUser peerOrgAdmin = keyStore.getMember
                (
                    organization.getName() + "Admin",
                    organization.getName(), organization.getMSPID(),
                    Paths.get
                    (
                        "config", "crypto-config/peerOrganizations/",
                        organization.getDomainName(),
                        format
                        (
                            "/users/Admin@%s/msp/keystore",
                            organization.getDomainName()
                        )
                    ).toFile().listFiles((dir, name) -> name.endsWith("_sk"))[0],
                    Paths.get
                    (
                        "config", "crypto-config/peerOrganizations/",
                        organization.getDomainName(),
                        format
                        (
                            "/users/Admin@%s/msp/signcerts/Admin@%s-cert.pem",
                            organization.getDomainName(),
                            organization.getDomainName()
                        )
                    ).toFile()
                );
                organization.setPeerAdmin(peerOrgAdmin);
            }

            client.setUserContext(organizatons.get("custodian").getPeerAdmin());

            String ordererName = (String)organizatons.get("custodian").getOrdererNames().toArray()[0];
            Properties ordererProperties = testConfig.getOrdererProperties(ordererName);
            ordererProperties.put("grpc.NettyChannelBuilderOption.keepAliveTime", new Object[] {5L, TimeUnit.MINUTES});
            ordererProperties.put("grpc.NettyChannelBuilderOption.keepAliveTimeout", new Object[] {8L, TimeUnit.SECONDS});
            orderers.put("custodian", client.newOrderer(ordererName, organizatons.get("custodian").getOrdererLocation(ordererName), ordererProperties));
            orderers.put("morganstanley", client.newOrderer(ordererName, organizatons.get("custodian").getOrdererLocation(ordererName), ordererProperties));
            orderers.put("goldmansacks", client.newOrderer(ordererName, organizatons.get("custodian").getOrdererLocation(ordererName), ordererProperties));
            orderers.put("jpmorgan", client.newOrderer(ordererName, organizatons.get("custodian").getOrdererLocation(ordererName), ordererProperties));
            
            String peercustodianName = (String)organizatons.get("custodian").getPeerNames().toArray()[0];
            String peercustodianLocation = organizatons.get("custodian").getPeerLocation(peercustodianName);
            Properties peerProperties = testConfig.getPeerProperties(peercustodianName);
            peerProperties = peerProperties == null ? new Properties() : peerProperties;
            peerProperties.put("grpc.NettyChannelBuilderOption.maxInboundMessageSize", 9000000);
            peers.put("custodianCustodian", client.newPeer(peercustodianName, peercustodianLocation, peerProperties));
            peers.put("custodianMorganstanley", client.newPeer(peercustodianName, peercustodianLocation, peerProperties));
            peers.put("custodianGoldmansacks", client.newPeer(peercustodianName, peercustodianLocation, peerProperties));
            peers.put("custodianJpmorgan", client.newPeer(peercustodianName, peercustodianLocation, peerProperties));
            String eventcustodianHubName = (String)organizatons.get("custodian").getEventHubNames().toArray()[0];
            Properties eventcustodianHubProperties = testConfig.getEventHubProperties(eventcustodianHubName);
            eventcustodianHubProperties.put("grpc.NettyChannelBuilderOption.keepAliveTime", new Object[] {5L, TimeUnit.MINUTES});
            eventcustodianHubProperties.put("grpc.NettyChannelBuilderOption.keepAliveTimeout", new Object[] {8L, TimeUnit.SECONDS});
            eventHubs.put("custodian", client.newEventHub(eventcustodianHubName, organizatons.get("custodian").getEventHubLocation(eventcustodianHubName), eventcustodianHubProperties));
            
            String peermorganstanleyName = (String)organizatons.get("morganstanley").getPeerNames().toArray()[0];
            String peermorganstanleyLocation = organizatons.get("morganstanley").getPeerLocation(peermorganstanleyName);
            peerProperties = testConfig.getPeerProperties(peermorganstanleyName);
            peerProperties = peerProperties == null ? new Properties() : peerProperties;
            peerProperties.put("grpc.NettyChannelBuilderOption.maxInboundMessageSize", 9000000);
            peers.put("morganstanleyCustodian", client.newPeer(peermorganstanleyName, peermorganstanleyLocation, peerProperties));
            peers.put("morganstanleyMorganstanley", client.newPeer(peermorganstanleyName, peermorganstanleyLocation, peerProperties));
            String eventmorganstanleyHubName = (String)organizatons.get("morganstanley").getEventHubNames().toArray()[0];
            Properties eventmorganstanleyHubProperties = testConfig.getEventHubProperties(eventmorganstanleyHubName);
            eventmorganstanleyHubProperties.put("grpc.NettyChannelBuilderOption.keepAliveTime", new Object[] {5L, TimeUnit.MINUTES});
            eventmorganstanleyHubProperties.put("grpc.NettyChannelBuilderOption.keepAliveTimeout", new Object[] {8L, TimeUnit.SECONDS});
            eventHubs.put("morganstanley", client.newEventHub(eventmorganstanleyHubName, organizatons.get("morganstanley").getEventHubLocation(eventmorganstanleyHubName), eventmorganstanleyHubProperties));
            
            String peergoldmansacksName = (String)organizatons.get("goldmansacks").getPeerNames().toArray()[0];
            String peergoldmansacksLocation = organizatons.get("goldmansacks").getPeerLocation(peergoldmansacksName);
            peerProperties = testConfig.getPeerProperties(peergoldmansacksName);
            peerProperties = peerProperties == null ? new Properties() : peerProperties;
            peerProperties.put("grpc.NettyChannelBuilderOption.maxInboundMessageSize", 9000000);
            peers.put("goldmansacksCustodian", client.newPeer(peergoldmansacksName, peergoldmansacksLocation, peerProperties));
            peers.put("goldmansacksGoldmansacks", client.newPeer(peergoldmansacksName, peergoldmansacksLocation, peerProperties));
            String eventgoldmansacksHubName = (String)organizatons.get("goldmansacks").getEventHubNames().toArray()[0];
            Properties eventgoldmansacksHubProperties = testConfig.getEventHubProperties(eventgoldmansacksHubName);
            eventgoldmansacksHubProperties.put("grpc.NettyChannelBuilderOption.keepAliveTime", new Object[] {5L, TimeUnit.MINUTES});
            eventgoldmansacksHubProperties.put("grpc.NettyChannelBuilderOption.keepAliveTimeout", new Object[] {8L, TimeUnit.SECONDS});
            eventHubs.put("goldmansacks", client.newEventHub(eventgoldmansacksHubName, organizatons.get("goldmansacks").getEventHubLocation(eventgoldmansacksHubName), eventgoldmansacksHubProperties));
            
            String peerjpmorganName = (String)organizatons.get("jpmorgan").getPeerNames().toArray()[0];
            String peerjpmorganLocation = organizatons.get("jpmorgan").getPeerLocation(peerjpmorganName);
            peerProperties = testConfig.getPeerProperties(peerjpmorganName);
            peerProperties = peerProperties == null ? new Properties() : peerProperties;
            peerProperties.put("grpc.NettyChannelBuilderOption.maxInboundMessageSize", 9000000);
            peers.put("jpmorganCustodian", client.newPeer(peerjpmorganName, peerjpmorganLocation, peerProperties));
            peers.put("jpmorganJpmorgan", client.newPeer(peerjpmorganName, peerjpmorganLocation, peerProperties));
            String eventjpmorganHubName = (String)organizatons.get("jpmorgan").getEventHubNames().toArray()[0];
            Properties eventjpmorganHubProperties = testConfig.getEventHubProperties(eventjpmorganHubName);
            eventjpmorganHubProperties.put("grpc.NettyChannelBuilderOption.keepAliveTime", new Object[] {5L, TimeUnit.MINUTES});
            eventjpmorganHubProperties.put("grpc.NettyChannelBuilderOption.keepAliveTimeout", new Object[] {8L, TimeUnit.SECONDS});
            eventHubs.put("jpmorgan", client.newEventHub(eventjpmorganHubName, organizatons.get("jpmorgan").getEventHubLocation(eventjpmorganHubName), eventjpmorganHubProperties));

            channels.put("custodian", client.newChannel("custodian"));
            channels.put("morganstanley", client.newChannel("morganstanley"));
            channels.put("goldmansacks", client.newChannel("goldmansacks"));
            channels.put("jpmorgan", client.newChannel("jpmorgan"));
           
            channels.get("custodian").addPeer(peers.get("custodianCustodian"));
            channels.get("morganstanley").addPeer(peers.get("custodianMorganstanley"));
            channels.get("goldmansacks").addPeer(peers.get("custodianGoldmansacks"));
            channels.get("jpmorgan").addPeer(peers.get("custodianJpmorgan"));

            client.setUserContext(organizatons.get("morganstanley").getPeerAdmin());
            channels.get("custodian").addPeer(peers.get("morganstanleyCustodian"));
            channels.get("morganstanley").addPeer(peers.get("morganstanleyMorganstanley"));

            client.setUserContext(organizatons.get("goldmansacks").getPeerAdmin());
            channels.get("custodian").addPeer(peers.get("goldmansacksCustodian"));
            channels.get("goldmansacks").addPeer(peers.get("goldmansacksGoldmansacks"));

            client.setUserContext(organizatons.get("jpmorgan").getPeerAdmin());
            channels.get("custodian").addPeer(peers.get("jpmorganCustodian"));
            channels.get("jpmorgan").addPeer(peers.get("jpmorganJpmorgan"));

            client.setUserContext(organizatons.get("custodian").getPeerAdmin());
            channels.get("custodian").addOrderer(orderers.get("custodian"));
            channels.get("morganstanley").addOrderer(orderers.get("morganstanley"));
            channels.get("goldmansacks").addOrderer(orderers.get("goldmansacks"));
            channels.get("jpmorgan").addOrderer(orderers.get("jpmorgan"));

            channels.get("custodian").addEventHub(eventHubs.get("custodian"));
            channels.get("morganstanley").addEventHub(eventHubs.get("morganstanley"));
            channels.get("goldmansacks").addEventHub(eventHubs.get("goldmansacks"));
            channels.get("jpmorgan").addEventHub(eventHubs.get("jpmorgan"));

            channels.get("custodian").initialize();
            client.setUserContext(organizatons.get("morganstanley").getPeerAdmin());
            channels.get("morganstanley").initialize();
            client.setUserContext(organizatons.get("goldmansacks").getPeerAdmin());
            channels.get("goldmansacks").initialize();
            client.setUserContext(organizatons.get("jpmorgan").getPeerAdmin());
            channels.get("jpmorgan").initialize();
       }
        catch (Exception e)
        {
            System.out.println(e.getMessage());
            System.exit(0);
        }
    }

    public boolean query(CommandLine commandLine) throws Exception
    {
        try
        {
            JSONObject jsonObject = new JSONObject(commandLine.getOptionValue("arguments").replaceFirst("'\\{", "\\{").replaceFirst("]\\}\'",  "]\\}"));
            JSONArray jArgs = jsonObject.getJSONArray("Args");

            QueryByChaincodeRequest query = client.newQueryProposalRequest();
            query.setChaincodeID(ChaincodeID.newBuilder().setName(commandLine.getOptionValue("chaincode")).build());
            query.setFcn(jArgs.optString(0));
            String[] params=new String[jArgs.length()-1];
            for(int i=1; i<jArgs.length(); i++)
            {
                params[i-1] = jArgs.optString(i);
            }
            
            query.setArgs(params);
            Collection<ProposalResponse> responses = channels.get(commandLine.getOptionValue("channel")).queryByChaincode(query);
            for (ProposalResponse response : responses)
                if (!response.isVerified() || response.getStatus() != ProposalResponse.Status.SUCCESS)
                {
                    System.out.println("ERROR");
                    System.out.println("Unsuccessful transaction proposal response from " + response.getPeer().getName());
                    return false;
                }

            for (ProposalResponse resp : responses)
            {
                System.out.println("SUCCESS");
                System.out.println(resp.getProposalResponse().getResponse().getPayload().toStringUtf8());
                return true;
            }
        }
        catch (Exception e)
        {
            System.out.println(e.getMessage());
            return false;
        }
        return false;
    }

    public boolean invoke(CommandLine commandLine) throws Exception
    {
        try
        {
            JSONObject jsonObject = new JSONObject(commandLine.getOptionValue("arguments").replaceFirst("'\\{", "\\{").replaceFirst("]\\}\'",  "]\\}"));
            JSONArray jArgs = jsonObject.getJSONArray("Args");

            TransactionProposalRequest invoke = client.newTransactionProposalRequest();
            invoke.setChaincodeID(ChaincodeID.newBuilder().setName(commandLine.getOptionValue("chaincode")).build());
            invoke.setFcn(jArgs.optString(0));
            String[] params=new String[jArgs.length()-1];
            for(int i=1; i<jArgs.length(); i++)
            {
                params[i-1] = jArgs.optString(i);
            }
            invoke.setArgs(params);
            
            Collection<Peer> endorsingPeers = new HashSet<Peer>();
            if (commandLine.getOptionValue("channel").equals("custodian"))
            {
                for (Peer peer : channels.get(commandLine.getOptionValue("channel")).getPeers())
                    if (peer.getName().contains("custodian"))
                        endorsingPeers.add(peer);
            }
            else endorsingPeers = channels.get(commandLine.getOptionValue("channel")).getPeers();

            Collection<ProposalResponse> responses = channels.get(commandLine.getOptionValue("channel")).sendTransactionProposal(invoke, endorsingPeers);
            for (ProposalResponse response : responses)
                if (response.getStatus() != ProposalResponse.Status.SUCCESS)
                {
                    System.out.println("ERROR");
                    System.out.println("Unsuccessful transaction proposal response from " + response.getPeer().getName());
                    return false;
                }

            Collection<Set<ProposalResponse>> proposalConsistencySets = SDKUtils.getProposalConsistencySets(responses);
            if (proposalConsistencySets.size() != 1)
            {
                System.out.println("ERROR");
                System.out.println("Incorrect proposal consistency size " + proposalConsistencySets.size());
                return false;
            }

            CompletableFuture<String> future = channels.get(commandLine.getOptionValue("channel")).sendTransaction(responses).thenApply(transactionEvent ->
            {      
                return transactionEvent.isValid() ? "SUCCESS" : "ERROR: unsuccessful transaction " + transactionEvent.getTransactionID();
            });
            
            System.out.println(future.get());
            return true;
        }
        catch (Exception e)
        {
            System.out.println(e.getMessage());
            return false;
        }
    }
}
