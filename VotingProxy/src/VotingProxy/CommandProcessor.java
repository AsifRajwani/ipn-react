package VotingProxy;

import java.io.File;
import java.io.FileDescriptor;
import java.io.FileInputStream;
import java.io.PrintWriter;
import java.util.Scanner;
import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.CommandLineParser;
import org.apache.commons.cli.DefaultParser;
import org.apache.commons.cli.HelpFormatter;
import org.apache.commons.cli.Option;
import org.apache.commons.cli.Options;
import jline.console.ConsoleReader;

public class CommandProcessor
{
    PrintWriter out = null;
    public ConsoleReader reader = null;
    public CommandLineParser commandLineParser = new DefaultParser();
    public HelpFormatter helpFormatter = new HelpFormatter();
    public VotingProxy votingProxy = new VotingProxy();
    public Options options = new Options();
    public CommandLine commandLine;
    
    public CommandProcessor ()
    {
        try
        {
            reader = new ConsoleReader("App", new FileInputStream(FileDescriptor.in), System.out, null);
            reader.setPrompt("ProxyVote> ");
            out = new PrintWriter(reader.getOutput());
    
            options.addOption(new Option("n", "chaincode", true, "chaincode name"));
            options.addOption(new Option("c", "arguments", true, "chaincode arguments"));
            options.addOption(new Option("C", "channel", true, "channel name"));
            
            Option option = new Option("source", "source", true, "script to run");
            option.setRequired(false);
            options.addOption(option);
            option = new Option("o", "orderer", true, "orderer address");
            option.setRequired(false);
            options.addOption(option);
            option = new Option("v", "version", true, "chaincode version");
            option.setRequired(false);
            options.addOption(option);
            option = new Option("setEnvVars", "user", true, "set user context");
            option.setRequired(false);
            options.addOption(option);
            option = new Option("invoke", "invoke", false, "ledger invoke");
            option.setRequired(false);
            options.addOption(option);
            option = new Option("query", "query", false, "ledger query");
            option.setRequired(false);
            options.addOption(option);
            option = new Option("exit", "exit", false, "exit the application");
            option.setRequired(false);
            options.addOption(option);
            
        }
        catch (Exception e) {System.out.println(e.getMessage());}
    }
    
    public static void main(String[] args) throws Throwable
    {
        CommandProcessor commandProcessor = new CommandProcessor();
        if (args.length == 0)
            commandProcessor.runCommandLine();
        else
            commandProcessor.runCommand(args);
    }

    public void runCommandLine()
    {
        try
        {
            String line;
            while ((line = reader.readLine()) != null)
            {
                runCommand(line.split(" "));
                reader.flush();
            }
        }
        catch (Exception e) {System.out.println(e.getMessage());}
    }

    public void runScript(String script)
    {
        try
        {
            Scanner sc = new Scanner(new File(script));
            while (sc.hasNextLine())
            {
                String command = sc.nextLine().trim();
                System.out.println(command);
                if (command.startsWith("#") || command.isEmpty())
                {
                    continue;
                }
                if (runCommand(command.split(" ")) == false)
                    break;
            }
        }
        catch (Exception e) {System.out.println(e.getMessage());}
    }

    public boolean runCommand(String[] args)
    {
        try
        {
            commandLine = commandLineParser.parse(options, args);
    
            switch (args[0])
            {
            case "-setEnvVars":
                if (votingProxy.organizatons.containsKey(args[1]) == false)
                {
                    out.println("Invalid ogranization name");
                    return false;
                }
                votingProxy.client.setUserContext(votingProxy.organizatons.get(args[1]).getPeerAdmin());
                return true;
            case "-query":
                return votingProxy.query(commandLine);
            case "-invoke":
                return votingProxy.invoke(commandLine);
            case "-source":
                runScript(commandLine.getOptionValue("source"));
                return true;
            case "":
                return true;
            case "exit":
                System.exit(0);
            default:
                System.out.println("Unrecognized commeand");
                return false;
            }
        }
        catch (Exception e) {System.out.println(e.getMessage());}
        return true;
    }
}
