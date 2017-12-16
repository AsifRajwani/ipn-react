# test the error conditions

# attempt to vote for a not announced Proxy Vote, this will result in Unknown Proxy Voting ID
./vote.sh ms w www 100 qqq 100 sss 100
# announce Proxy Vote for www zzz sss options
./announce.sh w iytiuytiuytiuy
sleep 5
# add Proxy Vote options www zzz sss to non-existent Proxy Vote, this will result in Unknown Proxy Voting ID
./add-vote-options.sh z www zzz sss
# add Proxy Vote options www zzz sss to the created Proxy Vote, this will succeed
./add-vote-options.sh w www zzz sss
sleep 5
# try doing the previous vote again, this will result in Proxy ID w voting is closed
./vote.sh ms w www 100 qqq 100 sss 100
# query the Proxy Vote state, should be closed
./get-state.sh w
# activate the Proxy Vote
./set-state.sh w true
sleep 5 
# query the Proxy Vote state, should be active
./get-state.sh w
# list all announced Proxy Votes, there sholud be only one and active
./list-states.sh
# try doing the previous vote again, this will result in Voting for invalid Proxy Option qqq
./vote.sh ms w www 100 qqq 100 sss 100
sleep 5
# try doing the previous vote again without voting for qqq, this will result in Unauthorized to vote for this Proxy
./vote.sh ms w www 100 sss 100
sleep 5
# add Proxy Vote autorizations for www zzz sss to the created Proxy Vote, this will succeed
./add-autorizations.sh ms w
./add-autorizations.sh gs w
./add-autorizations.sh jpm w
# try doing the previous vote again, this will result in Insufficient funds for voting the options
./vote.sh ms w www 100 qqq sss 100
# set shares for the member
./set-shares.sh ms 357
sleep 5
# query the member's shares, must match the previous setting
./get-shares.sh ms
# try doing the previous vote again, this will result in success
./vote.sh ms w www 100 sss 100
sleep 5
# query the member's shares, must reflect the voted amount
./get-shares.sh ms
# query the member's vote, must show the wote amounts for options
./get-vote.sh ms w
# adjust the previous vote incrementing amounts for options
./vote.sh ms w www 11 sss 13
sleep 5
# query the member's vote, must show the adjusted wote amounts for options
./get-vote.sh ms w
# query the member's shares, must reflect the voted amount
./get-shares.sh ms
# attempt to vote for another not announced Proxy Vote, this will result in Unknown Proxy Voting ID
./vote.sh ms z ttt 11 sss 13
# announce Proxy Vote for ttt sss options
./announce.sh z dfasdfafasdfa
sleep 5
# add Proxy Vote options www zzz sss options to the created Proxy Vote, this will succeed
./add-vote-options.sh z ttt sss
sleep 5
# try doing the previous vote again, this will result in Proxy ID w voting is closed
./vote.sh ms z ttt 11 sss 13
# activate the Proxy Vote
./set-state.sh z true
sleep 5
# query the Proxy Vote state, should be active
./get-state.sh z
# list all announced Proxy Votes, thre sholud be two active Proxy Votes
./list-states.sh
# try doing the previous vote again, this will result in Unauthorized to vote for this Proxy
./vote.sh ms z ttt 11 sss 13
sleep 5
# add Proxy Vote autorizations for ms to the created Proxy Vote
./add-autorizations.sh ms z
./add-autorizations.sh gs z
./add-autorizations.sh jpm z
# try doing the previous vote again, this will result in sccess
./vote.sh ms z ttt 11 sss 13
sleep 5
# query the member's shares, must reflect the voted amount
./get-shares.sh ms
# attempt to transfer votes between options, this will result in sccess
./vote.sh ms z ttt -5 sss 5
sleep 5
# query the member's shares, this must be same as the it was the vote transfer between the options
./get-shares.sh ms
# vote large number of shares for some option of the last vote, this will result in Insufficient funds for voting the options
./vote.sh ms z ttt 150
# query the member's shares, this must be same as the vote has failed
./get-shares.sh ms
# query the vote x, note the amount voted for options
./get-vote.sh ms z
# vote a transfer of shares that exceeds the amount voted for an option, this will fail
./vote.sh ms z ttt -20 sss 20
# query the member's shares, this must be same as the vote has failed
./get-shares.sh ms
# publish voting results fow w, this should fail because the voting is still open
./publish-results.sh w ms
# close the Proxy Vote
./set-state.sh w false
# publish voting results fow w, this ssucceeds
./publish-results.sh w ms
