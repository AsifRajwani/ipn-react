package VotingProxy;

import static java.lang.String.format;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.nio.file.Paths;
import java.util.Collection;
import java.util.Properties;
import java.util.concurrent.TimeUnit;

import org.hyperledger.fabric.sdk.Channel;
import org.hyperledger.fabric.sdk.ChannelConfiguration;
import org.hyperledger.fabric.sdk.EventHub;
import org.hyperledger.fabric.sdk.HFClient;
import org.hyperledger.fabric.sdk.Orderer;
import org.hyperledger.fabric.sdk.Peer;
import org.hyperledger.fabric.sdk.security.CryptoSuite;
import org.hyperledger.fabric_ca.sdk.HFCAClient;
import org.hyperledger.fabric_ca.sdk.RegistrationRequest;

public class VotingProxy
{
    private static VotingProxy votingProxy = new VotingProxy();

    private final TestConfigHelper configHelper = new TestConfigHelper();
    private final TestConfig testConfig = TestConfig.getConfig();
    private String PROJECTBASE="C:\\work\\eclipseWorkspace\\VotingProxy\\";
    private Collection<SampleOrg> testSampleOrgs;
    private static HFClient client = null;
    
    private static final String TEST_ADMIN_NAME = "admin";

    public static void main(String[] args) throws Throwable
    {
        if (votingProxy.setup()==false)
        {
            return;
        }
    }
    
    boolean setup()
    {
        try
        {
            configHelper.clearConfig();
            configHelper.customizeConfig();
            testSampleOrgs = testConfig.getIntegrationTestsSampleOrgs();
            for (SampleOrg sampleOrg : testSampleOrgs)
            {
                sampleOrg.setCAClient(HFCAClient.createNewInstance(sampleOrg.getCALocation(), sampleOrg.getCAProperties()));
            }
            HFClient client = HFClient.createNewInstance();
            client.setCryptoSuite(CryptoSuite.Factory.getCryptoSuite());
            File sampleStoreFile = new File(System.getProperty("java.io.tmpdir") + "/HFCSampletest.properties");
            if (sampleStoreFile.exists())
            {
                sampleStoreFile.delete();
            }
            final SampleStore sampleStore = new SampleStore(sampleStoreFile);
            for (SampleOrg sampleOrg : testSampleOrgs)
            {
                HFCAClient ca = sampleOrg.getCAClient();
                final String orgName = sampleOrg.getName();
                final String mspid = sampleOrg.getMSPID();
                ca.setCryptoSuite(CryptoSuite.Factory.getCryptoSuite());
                SampleUser admin = sampleStore.getMember(TEST_ADMIN_NAME, orgName);
                if (!admin.isEnrolled())
                {
                    admin.setEnrollment(ca.enroll(admin.getName(), "adminpw"));
                    admin.setMspId(mspid);
                }

                sampleOrg.setAdmin(admin); // The admin of this org --

                SampleUser user = sampleStore.getMember(orgName, sampleOrg.getName());
                if (!user.isRegistered()) {  // users need to be registered AND enrolled
                    RegistrationRequest rr = new RegistrationRequest(user.getName(), "org1.department1");
                    user.setEnrollmentSecret(ca.register(rr, admin));
                }
                if (!user.isEnrolled()) {
                    user.setEnrollment(ca.enroll(user.getName(), user.getEnrollmentSecret()));
                    user.setMspId(mspid);
                }
                sampleOrg.addUser(user); //Remember user belongs to this Org

                final String sampleOrgName = sampleOrg.getName();
                final String sampleOrgDomainName = sampleOrg.getDomainName();

                SampleUser peerOrgAdmin = sampleStore.getMember(sampleOrgName + "Admin", sampleOrgName, sampleOrg.getMSPID(),
                        findFileSk(Paths.get("crypto", "crypto-config/peerOrganizations/",
                                sampleOrgDomainName, format("/users/Admin@%s/msp/keystore", sampleOrgDomainName)).toFile()),
                        Paths.get("crypto", "crypto-config/peerOrganizations/", sampleOrgDomainName,
                                format("/users/Admin@%s/msp/signcerts/Admin@%s-cert.pem", sampleOrgDomainName, sampleOrgDomainName)).toFile());
                sampleOrg.setPeerAdmin(peerOrgAdmin); //A special user that can create channels, join peers and install chaincode
            }

            constructChannels(client);
            //runChannel(client, PublicChannel, true, sampleOrg, 0);
            //PublicChannel.shutdown(true); // Force foo channel to shutdown clean up resources.
            System.out.println("setup success");
            return true;
        }
        catch (Exception e)
        {
            System.out.println(e.getMessage());
            return false;
        }
    }
    
    File findFileSk(File directory)
    {

        File[] matches = directory.listFiles((dir, name) -> name.endsWith("_sk"));

        if (null == matches)
        {
            throw new RuntimeException(format("Matches returned null does %s directory exist?", directory.getAbsoluteFile().getName()));
        }
        if (matches.length != 1)
        {
            throw new RuntimeException(format("Expected in %s only 1 sk file but found %d", directory.getAbsoluteFile().getName(), matches.length));
        }
        return matches[0];
    }

    private void constructChannels(HFClient client) throws Exception
    {
        SampleOrg Custodian = testConfig.getIntegrationTestsSampleOrg("Custodian");
        SampleOrg MorganStanley = testConfig.getIntegrationTestsSampleOrg("MorganStanley");
        SampleOrg GoldmanSacks = testConfig.getIntegrationTestsSampleOrg("GoldmanSacks");
        SampleOrg JPMorgan = testConfig.getIntegrationTestsSampleOrg("JPMorgan");

        client.setUserContext(Custodian.getPeerAdmin());
        String ordererName = (String)Custodian.getOrdererNames().toArray()[0];
        Properties ordererProperties = testConfig.getOrdererProperties(ordererName);
        ordererProperties.put("grpc.NettyChannelBuilderOption.keepAliveTime", new Object[] {5L, TimeUnit.MINUTES});
        ordererProperties.put("grpc.NettyChannelBuilderOption.keepAliveTimeout", new Object[] {8L, TimeUnit.SECONDS});
        Orderer orderer = client.newOrderer(ordererName, Custodian.getOrdererLocation(ordererName), ordererProperties);

        String peerCustodianName = (String)Custodian.getPeerNames().toArray()[0];
        String peerCustodianLocation = Custodian.getPeerLocation(peerCustodianName);
        Properties peerProperties = testConfig.getPeerProperties(peerCustodianName);
        peerProperties = peerProperties == null ? new Properties() : peerProperties;
        peerProperties.put("grpc.NettyChannelBuilderOption.maxInboundMessageSize", 9000000);
        Peer CustodianPeer = client.newPeer(peerCustodianName, peerCustodianLocation, peerProperties);
        String eventCustodianHubName = (String)Custodian.getEventHubNames().toArray()[0];
        Properties eventCustodianHubProperties = testConfig.getEventHubProperties(eventCustodianHubName);
        eventCustodianHubProperties.put("grpc.NettyChannelBuilderOption.keepAliveTime", new Object[] {5L, TimeUnit.MINUTES});
        eventCustodianHubProperties.put("grpc.NettyChannelBuilderOption.keepAliveTimeout", new Object[] {8L, TimeUnit.SECONDS});
        EventHub eventCustodianHub = client.newEventHub(eventCustodianHubName, Custodian.getEventHubLocation(eventCustodianHubName), eventCustodianHubProperties);

        String peerMorganStanleyName = (String)MorganStanley.getPeerNames().toArray()[0];
        String peerMorganStanleyLocation = MorganStanley.getPeerLocation(peerMorganStanleyName);
        peerProperties = testConfig.getPeerProperties(peerMorganStanleyName);
        peerProperties = peerProperties == null ? new Properties() : peerProperties;
        peerProperties.put("grpc.NettyChannelBuilderOption.maxInboundMessageSize", 9000000);
        Peer MorganStanleyPeer = client.newPeer(peerMorganStanleyName, peerMorganStanleyLocation, peerProperties);
        String eventMorganStanleyHubName = (String)MorganStanley.getEventHubNames().toArray()[0];
        Properties eventMorganStanleyHubProperties = testConfig.getEventHubProperties(eventMorganStanleyHubName);
        eventMorganStanleyHubProperties.put("grpc.NettyChannelBuilderOption.keepAliveTime", new Object[] {5L, TimeUnit.MINUTES});
        eventMorganStanleyHubProperties.put("grpc.NettyChannelBuilderOption.keepAliveTimeout", new Object[] {8L, TimeUnit.SECONDS});
        EventHub eventMorganStanleyHub = client.newEventHub(eventMorganStanleyHubName, MorganStanley.getEventHubLocation(eventMorganStanleyHubName), eventMorganStanleyHubProperties);

        String peerGoldmanSacksName = (String)GoldmanSacks.getPeerNames().toArray()[0];
        String peerGoldmanSacksLocation = GoldmanSacks.getPeerLocation(peerGoldmanSacksName);
        peerProperties = testConfig.getPeerProperties(peerGoldmanSacksName);
        peerProperties = peerProperties == null ? new Properties() : peerProperties;
        peerProperties.put("grpc.NettyChannelBuilderOption.maxInboundMessageSize", 9000000);
        Peer GoldmanSacksPeer = client.newPeer(peerGoldmanSacksName, peerGoldmanSacksLocation, peerProperties);
        String eventGoldmanSacksHubName = (String)GoldmanSacks.getEventHubNames().toArray()[0];
        Properties eventGoldmanSacksHubProperties = testConfig.getEventHubProperties(eventGoldmanSacksHubName);
        eventGoldmanSacksHubProperties.put("grpc.NettyChannelBuilderOption.keepAliveTime", new Object[] {5L, TimeUnit.MINUTES});
        eventGoldmanSacksHubProperties.put("grpc.NettyChannelBuilderOption.keepAliveTimeout", new Object[] {8L, TimeUnit.SECONDS});
        EventHub eventGoldmanSacksHub = client.newEventHub(eventGoldmanSacksHubName, GoldmanSacks.getEventHubLocation(eventGoldmanSacksHubName), eventGoldmanSacksHubProperties);

        String peerJPMorganName = (String)JPMorgan.getPeerNames().toArray()[0];
        String peerJPMorganLocation = JPMorgan.getPeerLocation(peerJPMorganName);
        peerProperties = testConfig.getPeerProperties(peerJPMorganName);
        peerProperties = peerProperties == null ? new Properties() : peerProperties;
        peerProperties.put("grpc.NettyChannelBuilderOption.maxInboundMessageSize", 9000000);
        Peer JPMorganPeer = client.newPeer(peerJPMorganName, peerJPMorganLocation, peerProperties);
        String eventJPMorganHubName = (String)JPMorgan.getEventHubNames().toArray()[0];
        Properties eventJPMorganHubProperties = testConfig.getEventHubProperties(eventJPMorganHubName);
        eventJPMorganHubProperties.put("grpc.NettyChannelBuilderOption.keepAliveTime", new Object[] {5L, TimeUnit.MINUTES});
        eventJPMorganHubProperties.put("grpc.NettyChannelBuilderOption.keepAliveTimeout", new Object[] {8L, TimeUnit.SECONDS});
        EventHub eventJPMorganHub = client.newEventHub(eventJPMorganHubName, JPMorgan.getEventHubLocation(eventJPMorganHubName), eventJPMorganHubProperties);

        System.out.println("Constructing channel public");
        ChannelConfiguration channelConfiguration = new ChannelConfiguration(new File("crypto/public.tx"));
        Channel CustodianChannel = client.newChannel
        (
            "public",
            orderer,
            channelConfiguration,
            client.getChannelConfigurationSignature(channelConfiguration, Custodian.getPeerAdmin()),
            client.getChannelConfigurationSignature(channelConfiguration, MorganStanley.getPeerAdmin()),
            client.getChannelConfigurationSignature(channelConfiguration, GoldmanSacks.getPeerAdmin()),
            client.getChannelConfigurationSignature(channelConfiguration, JPMorgan.getPeerAdmin())
        );
        System.out.println("Created channel public");

        CustodianChannel.joinPeer(CustodianPeer);
        // install chaincode
        // initialize chaincode on one peer
        CustodianChannel.addEventHub(eventCustodianHub);
        Custodian.addPeer(CustodianPeer);
        System.out.println("Peer "+peerCustodianName+" joined channel public");

        client.setUserContext(MorganStanley.getPeerAdmin());
        CustodianChannel.joinPeer(MorganStanleyPeer);
        CustodianChannel.addEventHub(eventMorganStanleyHub);
        MorganStanley.addPeer(MorganStanleyPeer);
        System.out.println("Peer "+peerMorganStanleyName+" joined channel public");
        
        client.setUserContext(GoldmanSacks.getPeerAdmin());
        CustodianChannel.joinPeer(GoldmanSacksPeer);
        CustodianChannel.addEventHub(eventGoldmanSacksHub);
        GoldmanSacks.addPeer(GoldmanSacksPeer);
        System.out.println("Peer "+peerGoldmanSacksName+" joined channel public");

        client.setUserContext(JPMorgan.getPeerAdmin());
        CustodianChannel.joinPeer(JPMorganPeer);
        CustodianChannel.addEventHub(eventJPMorganHub);
        JPMorgan.addPeer(JPMorganPeer);
        System.out.println("Peer "+peerJPMorganName+" joined channel public");

        client.setUserContext(Custodian.getPeerAdmin());
        CustodianChannel.initialize();
        System.out.println("Finished initialization channel public");
    }
}
