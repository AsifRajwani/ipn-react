source common.sh

./announce.sh WellsFargo WellsFargoCeoVoting
verifyResult $? "announce Proxy Vote"
sleep 3
./add-vote-options.sh WellsFargo WalterScott JulesVerne JamesJoyce
verifyResult $? "add Proxy Vote options WalterScott JulesVerne JamesJoyce options to the created Proxy Vote"
sleep 3
./add-autorizations.sh morganstanley WellsFargo
verifyResult $? "add Proxy Vote autorizations for morganstanley to the created Proxy Vote"
./add-autorizations.sh goldmansacks WellsFargo
verifyResult $? "add Proxy Vote autorizations for goldmansacks to the created Proxy Vote"
./add-autorizations.sh jpmorgan WellsFargo
verifyResult $? "add Proxy Vote autorizations for mjpmorgan to the created Proxy Vote"
sleep 3
./set-state.sh WellsFargo active
verifyResult $? "activate the Proxy Vote"
sleep 3 
./get-state.sh WellsFargo
verifyResult $? "query the Proxy Vote state, should be active"
./list-states.sh
verifyResult $? "list all announced Proxy Votes, there sholud be only one and active"
./set-shares.sh morganstanley 357
verifyResult $? "set 357 shares for morganstanley member"
sleep 3 
./set-shares.sh goldmansacks 135
verifyResult $? "set 135 shares for goldmansacks member"
sleep 3 
./set-shares.sh jpmorgan 531
verifyResult $? "set 531 shares for jpmorgan member"
sleep 3
./get-shares.sh morganstanley
verifyResult $? "query the morganstanley member's shares, must match the previous setting"
./get-shares.sh goldmansacks
verifyResult $? "query the goldmansacks member's shares, must match the previous setting"
./get-shares.sh jpmorgan
verifyResult $? "query the jpmorgan member's shares, must match the previous setting"
# morganstanley votes 
./vote.sh morganstanley WellsFargo WalterScott 100 JulesVerne 100
verifyResult $? "morganstanley votes shares for options WalterScott: 100 JulesVerne: 100"
sleep 3
./get-shares.sh morganstanley
verifyResult $? "query morganstanley's remaining shares, must reflect the voted amount"
./get-vote.sh morganstanley WellsFargo
verifyResult $? "query morganstanley's vote, must show the wote amounts for options"
./vote.sh morganstanley WellsFargo WalterScott 11 JulesVerne 13
verifyResult $? "morganstanley adjusts the previous vote incrementing amounts for options WalterScott: 11 JulesVerne: 13"
sleep 3
./get-vote.sh morganstanley WellsFargo
verifyResult $? "query morganstanley's vote, must show the adjusted wote amounts for options"
./get-shares.sh morganstanley
verifyResult $? "query morganstanley's remaining shares, must reflect the voted amount"
./vote.sh morganstanley WellsFargo WalterScott -5 JamesJoyce 5
verifyResult $? "morganstanley transfers 5 votes from WalterScott option to JamesJoyce option"
sleep 3
./get-shares.sh morganstanley
verifyResult $? "query morganstanley's remaining shares, this must be same as the it was the vote transfer between the options"
./get-vote.sh morganstanley WellsFargo
verifyResult $? "query morganstanley's vote, must show the adjusted wote amounts for options"
# jpmorgan votes
./vote.sh jpmorgan WellsFargo JamesJoyce 135 JulesVerne 357
verifyResult $? "jpmorgan votes shares for options JamesJoyce 135: JulesVerne: 357"
sleep 3
./get-shares.sh jpmorgan
verifyResult $? "query jpmorgan's remaining shares, must reflect the voted amount"
./get-vote.sh jpmorgan WellsFargo
verifyResult $? "query jpmorgan member's vote, must show the wote amounts for options"
./vote.sh jpmorgan WellsFargo WalterScott 31 JulesVerne -53
verifyResult $? "jpmorgan adjusts the previous vote  amounts for options adding WalterScott: 31 subtracting JulesVerne: 53"
sleep 3
./get-vote.sh jpmorgan WellsFargo
verifyResult $? "query jpmorgan's vote, must show the adjusted wote amounts for options"
./get-shares.sh jpmorgan
verifyResult $? "query jpmorgan's remaining shares, must reflect the voted amount"
./vote.sh jpmorgan WellsFargo WalterScott -25 JamesJoyce 25
verifyResult $? "jpmorgan transfers 25 votes from WalterScott option to JamesJoyce option"
sleep 3
./get-shares.sh jpmorgan
verifyResult $? "query jpmorgan's remaining shares, this must be same as the it was the vote transfer between the options"
./get-vote.sh jpmorgan WellsFargo
verifyResult $? "query jpmorgan's vote, must show the adjusted wote amounts for options"
# goldmansacks votes
./vote.sh goldmansacks WellsFargo WalterScott 13 JamesJoyce 57
verifyResult $? "goldmansacks votes shares for options WalterScott: 13 JamesJoyce: 57"
sleep 3
./get-shares.sh goldmansacks
verifyResult $? "query goldmansacks's remaining shares, must reflect the voted amount"
./get-vote.sh goldmansacks WellsFargo
verifyResult $? "query goldmansacks member's vote, must show the wote amounts for options"
./vote.sh goldmansacks WellsFargo WalterScott -7 JamesJoyce 7
verifyResult $? "goldmansacks transfers 7 votes from WalterScott option to JamesJoyce option"
sleep 3
./get-shares.sh goldmansacks
verifyResult $? "query goldmansacks remaning shares, this must be same as the it was the vote transfer between the options"
./get-vote.sh goldmansacks WellsFargo
verifyResult $? "query goldmansacks member's vote, must show the wote amounts for options"
# Publish voting results
./set-state.sh WellsFargo closed
verifyResult $? "close the Proxy Vote"
sleep 3
./publish-results.sh WellsFargo
verifyResult $? "publish voting results for WellsFargo vote"
