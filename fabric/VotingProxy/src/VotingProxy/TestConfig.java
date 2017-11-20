/*
 *  Copyright 2016, 2017 IBM, DTCC, Fujitsu Australia Software Technology, IBM - All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 * 	  http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
package VotingProxy;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hyperledger.fabric.sdk.helper.Utils;

/**
 * Config allows for a global config of the toolkit. Central location for all
 * toolkit configuration defaults. Has a local config file that can override any
 * property defaults. Config file can be relocated via a system property
 * "org.hyperledger.fabric.sdk.configuration". Any property can be overridden
 * with environment variable and then overridden
 * with a java system property. Property hierarchy goes System property
 * overrides environment variable which overrides config file for default values specified here.
 */

/**
 * Test Configuration
 */

public class TestConfig {
    private static final Log logger = LogFactory.getLog(TestConfig.class);

    private static final String DEFAULT_CONFIG = "config/testutils.properties";
    private static final String ORG_HYPERLEDGER_FABRIC_SDK_CONFIGURATION = "VotingProxy.config";

    private static final String PROPBASE = "VotingProxy.";

    private static final String GOSSIPWAITTIME = PROPBASE + "GossipWaitTime";
    private static final String INVOKEWAITTIME = PROPBASE + "InvokeWaitTime";
    private static final String DEPLOYWAITTIME = PROPBASE + "DeployWaitTime";
    private static final String PROPOSALWAITTIME = PROPBASE + "ProposalWaitTime";


    private static final String INTEGRATIONTESTS_ORG = PROPBASE + "integrationTests.org.";
    private static final Pattern orgPat = Pattern.compile("^" + Pattern.quote(INTEGRATIONTESTS_ORG) + "([^\\.]+)\\.mspid$");

    private static final String INTEGRATIONTESTSTLS = PROPBASE + "integrationtests.tls";

    private static TestConfig config;
    private final static Properties sdkProperties = new Properties();
    private final boolean runningTLS;
    private final boolean runningFabricCATLS;
    private final boolean runningFabricTLS;
    private final static HashMap<String, SampleOrg> sampleOrgs = new HashMap<>();

    private TestConfig() {
        File loadFile;
        FileInputStream configProps;

        try {
            loadFile = new File(System.getProperty(ORG_HYPERLEDGER_FABRIC_SDK_CONFIGURATION, DEFAULT_CONFIG))
                    .getAbsoluteFile();
            logger.debug(String.format("Loading configuration from %s and it is present: %b", loadFile.toString(),
                    loadFile.exists()));
            configProps = new FileInputStream(loadFile);
            sdkProperties.load(configProps);

        } catch (IOException e) { // if not there no worries just use defaults
//            logger.warn(String.format("Failed to load any test configuration from: %s. Using toolkit defaults",
//                    DEFAULT_CONFIG));
        } finally {

            defaultProperty(GOSSIPWAITTIME, "5000");
            defaultProperty(INVOKEWAITTIME, "100000");
            defaultProperty(DEPLOYWAITTIME, "120000");
            defaultProperty(PROPOSALWAITTIME, "120000");

            defaultProperty(INTEGRATIONTESTS_ORG + "Custodian.mspid", "CustodianMSP");
            defaultProperty(INTEGRATIONTESTS_ORG + "Custodian.domname", "Custodian.VotingProxy.com");
            defaultProperty(INTEGRATIONTESTS_ORG + "Custodian.ca_location", "http://localhost:7054");
            defaultProperty(INTEGRATIONTESTS_ORG + "Custodian.peer_locations", "peer0.Custodian.VotingProxy.com@grpc://localhost:7051");
            defaultProperty(INTEGRATIONTESTS_ORG + "Custodian.orderer_locations", "orderer.VotingProxy.com@grpc://localhost:7050");
            defaultProperty(INTEGRATIONTESTS_ORG + "Custodian.eventhub_locations", "peer0.Custodian.VotingProxy.com@grpc://localhost:7053");

            defaultProperty(INTEGRATIONTESTS_ORG + "MorganStanley.mspid", "MorganStanleyMSP");
            defaultProperty(INTEGRATIONTESTS_ORG + "MorganStanley.domname", "MorganStanley.VotingProxy.com");
            defaultProperty(INTEGRATIONTESTS_ORG + "MorganStanley.ca_location", "http://localhost:7064");
            defaultProperty(INTEGRATIONTESTS_ORG + "MorganStanley.peer_locations", "peer0.MorganStanley.VotingProxy.com@grpc://localhost:7061");
            defaultProperty(INTEGRATIONTESTS_ORG + "MorganStanley.orderer_locations", "orderer.VotingProxy.com@grpc://localhost:7050");
            defaultProperty(INTEGRATIONTESTS_ORG + "MorganStanley.eventhub_locations", "peer0.MorganStanley.VotingProxy.com@grpc://localhost:7063");

            defaultProperty(INTEGRATIONTESTS_ORG + "GoldmanSacks.mspid", "GoldmanSacksMSP");
            defaultProperty(INTEGRATIONTESTS_ORG + "GoldmanSacks.domname", "GoldmanSacks.VotingProxy.com");
            defaultProperty(INTEGRATIONTESTS_ORG + "GoldmanSacks.ca_location", "http://localhost:7074");
            defaultProperty(INTEGRATIONTESTS_ORG + "GoldmanSacks.peer_locations", "peer0.GoldmanSacks.VotingProxy.com@grpc://localhost:7071");
            defaultProperty(INTEGRATIONTESTS_ORG + "GoldmanSacks.orderer_locations", "orderer.VotingProxy.com@grpc://localhost:7050");
            defaultProperty(INTEGRATIONTESTS_ORG + "GoldmanSacks.eventhub_locations", "peer0.GoldmanSacks.VotingProxy.com@grpc://localhost:7073");

            defaultProperty(INTEGRATIONTESTS_ORG + "JPMorgan.mspid", "JPMorganMSP");
            defaultProperty(INTEGRATIONTESTS_ORG + "JPMorgan.domname", "JPMorgan.VotingProxy.com");
            defaultProperty(INTEGRATIONTESTS_ORG + "JPMorgan.ca_location", "http://localhost:7084");
            defaultProperty(INTEGRATIONTESTS_ORG + "JPMorgan.peer_locations", "peer0.JPMorgan.VotingProxy.com@grpc://localhost:7081");
            defaultProperty(INTEGRATIONTESTS_ORG + "JPMorgan.orderer_locations", "orderer.VotingProxy.com@grpc://localhost:7050");
            defaultProperty(INTEGRATIONTESTS_ORG + "JPMorgan.eventhub_locations", "peer0.JPMorgan.VotingProxy.com@grpc://localhost:7083");

            defaultProperty(INTEGRATIONTESTSTLS, null);
            runningTLS = null != sdkProperties.getProperty(INTEGRATIONTESTSTLS, null);
            runningFabricCATLS = runningTLS;
            runningFabricTLS = runningTLS;

            for (Map.Entry<Object, Object> x : sdkProperties.entrySet()) {
                final String key = x.getKey() + "";
                final String val = x.getValue() + "";

                if (key.startsWith(INTEGRATIONTESTS_ORG)) {

                    Matcher match = orgPat.matcher(key);

                    if (match.matches() && match.groupCount() == 1) {
                        String orgName = match.group(1).trim();
                        sampleOrgs.put(orgName, new SampleOrg(orgName, val.trim()));

                    }
                }
            }

            for (Map.Entry<String, SampleOrg> org : sampleOrgs.entrySet()) {
                final SampleOrg sampleOrg = org.getValue();
                final String orgName = org.getKey();

                String peerNames = sdkProperties.getProperty(INTEGRATIONTESTS_ORG + orgName + ".peer_locations");
                String[] ps = peerNames.split("[ \t]*,[ \t]*");
                for (String peer : ps) {
                    String[] nl = peer.split("[ \t]*@[ \t]*");
                    sampleOrg.addPeerLocation(nl[0], grpcTLSify(nl[1]));
                }

                final String domainName = sdkProperties.getProperty(INTEGRATIONTESTS_ORG + orgName + ".domname");

                sampleOrg.setDomainName(domainName);

                String ordererNames = sdkProperties.getProperty(INTEGRATIONTESTS_ORG + orgName + ".orderer_locations");
                ps = ordererNames.split("[ \t]*,[ \t]*");
                for (String peer : ps) {
                    String[] nl = peer.split("[ \t]*@[ \t]*");
                    sampleOrg.addOrdererLocation(nl[0], grpcTLSify(nl[1]));
                }

                String eventHubNames = sdkProperties.getProperty(INTEGRATIONTESTS_ORG + orgName + ".eventhub_locations");
                ps = eventHubNames.split("[ \t]*,[ \t]*");
                for (String peer : ps) {
                    String[] nl = peer.split("[ \t]*@[ \t]*");
                    sampleOrg.addEventHubLocation(nl[0], grpcTLSify(nl[1]));
                }

                sampleOrg.setCALocation(httpTLSify(sdkProperties.getProperty((INTEGRATIONTESTS_ORG + org.getKey() + ".ca_location"))));

                if (runningFabricCATLS) {
                    String cert = "src/test/fixture/sdkintegration/e2e-2Orgs/channel/crypto-config/peerOrganizations/DNAME/ca/ca.DNAME-cert.pem".replaceAll("DNAME", domainName);
                    File cf = new File(cert);
                    if (!cf.exists() || !cf.isFile()) {
                        throw new RuntimeException("TEST is missing cert file " + cf.getAbsolutePath());
                    }
                    Properties properties = new Properties();
                    properties.setProperty("pemFile", cf.getAbsolutePath());

                    properties.setProperty("allowAllHostNames", "true");//testing environment only NOT FOR PRODUCTION!

                    sampleOrg.setCAProperties(properties);
                }
            }

        }

    }

    private String grpcTLSify(String location) {
        location = location.trim();
        Exception e = Utils.checkGrpcUrl(location);
        if (e != null) {
            throw new RuntimeException(String.format("Bad TEST parameters for grpc url %s", location), e);
        }
        return runningFabricTLS ?
                location.replaceFirst("^grpc://", "grpcs://") : location;

    }

    private String httpTLSify(String location) {
        location = location.trim();

        return runningFabricCATLS ?
                location.replaceFirst("^http://", "https://") : location;
    }

    /**
     * getConfig return back singleton for SDK configuration.
     *
     * @return Global configuration
     */
    public static TestConfig getConfig() {
        if (null == config) {
            config = new TestConfig();
        }
        return config;

    }

    /**
     * getProperty return back property for the given value.
     *
     * @param property
     * @return String value for the property
     */
    private String getProperty(String property) {

        String ret = sdkProperties.getProperty(property);

        if (null == ret) {
            logger.warn(String.format("No configuration value found for '%s'", property));
        }
        return ret;
    }

    /**
     * getProperty returns the value for given property key. If not found, it
     * will set the property to defaultValueidea-IC-171.3780.107
     *
     * @param property
     * @param defaultValue
     * @return property value as a String
     */
    private String getProperty(String property, String defaultValue) {

        return sdkProperties.getProperty(property, defaultValue);
    }

    static private void defaultProperty(String key, String value) {

        String ret = System.getProperty(key);
        if (ret != null) {
            sdkProperties.put(key, ret);
        } else {
            String envKey = key.toUpperCase().replaceAll("\\.", "_");
            ret = System.getenv(envKey);
            if (null != ret) {
                sdkProperties.put(key, ret);
            } else {
                if (null == sdkProperties.getProperty(key) && value != null) {
                    sdkProperties.put(key, value);
                }

            }

        }
    }

    public int getTransactionWaitTime() {
        return Integer.parseInt(getProperty(INVOKEWAITTIME));
    }

    public int getDeployWaitTime() {
        return Integer.parseInt(getProperty(DEPLOYWAITTIME));
    }

    public int getGossipWaitTime() {
        return Integer.parseInt(getProperty(GOSSIPWAITTIME));
    }

    /**
     * Time to wait for proposal to complete
     *
     * @return
     */
    public long getProposalWaitTime() {
        return Integer.parseInt(getProperty(PROPOSALWAITTIME));
    }

    public Collection<SampleOrg> getIntegrationTestsSampleOrgs() {
        return Collections.unmodifiableCollection(sampleOrgs.values());
    }

    public SampleOrg getIntegrationTestsSampleOrg(String name) {
        return sampleOrgs.get(name);

    }

    private final static String tlsbase = "src/test/fixture/sdkintegration/e2e-2Orgs/tls/";

    public Properties getPeerProperties(String name) {

        return getEndPointProperties("peer", name);

    }

    public Properties getOrdererProperties(String name) {

        return getEndPointProperties("orderer", name);

   }


    private Properties getEndPointProperties(final String type, final String name) {

        final String domainName = getDomainName(name);

        File cert = Paths.get("crypto", "crypto-config/ordererOrganizations".replace("orderer", type), domainName, type +"s",
                name, "tls/server.crt").toFile();
        if(!cert.exists()){
            throw new RuntimeException(String.format("Missing cert file for: %s. Could not find at location: %s", name,
                    cert.getAbsolutePath()) );
        }

        Properties ret = new Properties();
        ret.setProperty("pemFile", cert.getAbsolutePath());
        //      ret.setProperty("trustServerCertificate", "true"); //testing environment only NOT FOR PRODUCTION!
        ret.setProperty("hostnameOverride", name);
        ret.setProperty("sslProvider", "openSSL");
        ret.setProperty("negotiationType", "TLS");

        return ret;
    }

    public Properties getEventHubProperties(String name) {

        return getEndPointProperties("peer", name); //uses same as named peer

    }

    private Properties getTLSProperties(String type, String name) {
        Properties ret = null;
        if (runningFabricTLS) {
            String cert = tlsbase + "/" + type + "/" + name + "/cert.pem";
            File cf = new File(cert);
            if (!cf.exists() || !cf.isFile()) {
                throw new RuntimeException("Missing cert file " + cf.getAbsolutePath());
            }
            ret = new Properties();
            ret.setProperty("pemFile", cert);
            ret.setProperty("trustServerCertificate", "true"); //testing environment only NOT FOR PRODUCTION!
            ret.setProperty("sslProvider", "openSSL");
            ret.setProperty("negotiationType", "TLS");
        }
        return ret;
    }

    private Properties getTLSProperties(String cert) {
        Properties ret = null;
        if (runningFabricTLS) {
            //   String cert = tlsbase + "/" + type + "/" + name + "/ca.pem";
            File cf = new File(tlsbase + cert);
            if (!cf.exists() || !cf.isFile()) {
                throw new RuntimeException("TEST error missing cert file " + cf.getAbsolutePath());
            }
            ret = new Properties();
            ret.setProperty("pemFile", cf.getAbsolutePath());
            ret.setProperty("trustServerCertificate", "true"); //testing environment only NOT FOR PRODUCTION!
            ret.setProperty("sslProvider", "openSSL");
            ret.setProperty("negotiationType", "TLS");
        }
        return ret;
    }

    private String getDomainName(final String name) {
        int dot = name.indexOf(".");
        if (-1 == dot) {
            return null;
        } else {
            return name.substring(dot+1);
        }

    }


}