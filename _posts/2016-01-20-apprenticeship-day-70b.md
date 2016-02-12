---
layout: posts
title: Profiling Ruby Minimax
category: apprenticeship
---

### 8th Light Apprenticeship - Day 70

As previously mentioned, my Ruby  minimax was a bit slow. Rather than jump into alpha-beta pruning I did some Ruby profiling to establish which parts of the program were slowing it down.

<!--break--> 

Using [Ruby profiler](http://ruby-doc.org/stdlib-2.1.0/libdoc/profiler/rdoc/Profiler__.html) was fairly straight forward, you `require` the profile class at the position you want to profile, and when that test is run, statistics will be displayed to the screen detailing statistics on how much time is spent in which methods. 

        it "Tests profiling of minimax player" do 
              require 'profile'
              board = Board.new([PlayerSymbols::X, PlayerSymbols::X, nil, nil, nil, PlayerSymbols::O,  PlayerSymbols::O, nil, nil])  
              ai_player.minimax(board, true, board.vacant_indices.size, -2, 2)
        end
 
The grid I ran my tests against was as follows:

        X | X | 
       -----------
          |   | O
       -----------
        O |   |   
       
Before making any changes, the profile of the minimax player taking a go was:


     %   cumulative   self              self     total
     time   seconds   seconds    calls  ms/call  ms/call  name 
     21.61     2.31      2.31   161069     0.01     0.07  Board#find_winning_row_from 
     18.43     4.28      1.97    56608     0.03     0.95  Array#each 
     7.20     5.05      0.77    46145     0.02     0.08  Enumerable#all?  
     6.45     5.74      0.69     7506     0.09     0.12  Board#rows
     5.80     6.36      0.62   180144     0.00     0.00  Array#at
     5.33     6.93      0.57     7506     0.08     0.10  Board#columns
     4.4  0     7.40      0.47     7506     0.06     0.09  Board#diagonals
     4.21     7.85      0.45    10030     0.04    10.00  AiPlayer#minimax
     3.84     8.26      0.41   114335     0.00     0.00  Array#first
     3.37     8.62      0.36    25670     0.01     0.04  Board#vacant_indices

Seemed like most of the time was spent in the `find_winning_row_from` method. This is the method in the board class which determines the 8 rows (horizontal, vertical and diagonal) that can be formed in, the grid and checks if any of them are a winning row.

As my Board is immutable, it contains no state. In the last IPM, my mentor mentioned that I could cache the result of all the rows, as they wouldn't change for a given board instance. The symbols `||=` in Ruby allow for this, and is known as memoization.  

This improved the statistics a little:

    %   cumulative   self              self     total
    time   seconds   seconds    calls  ms/call  ms/call  name
    19.04     1.54      1.54   123833     0.01     0.06  Board#find_winning_row_from
    15.57     2.80      1.26    43429     0.03     0.88  Array#each
    6.55     3.33      0.53     5025     0.11     0.13  Board#columns
    6.30     3.84      0.51    10030     0.05     7.23  AiPlayer#minimax
    5.69     4.30      0.46     5025     0.09     0.13  Board#rows
    4.94     4.70      0.40   120600     0.00     0.00  Array#at
    4.57     5.07      0.37    35204     0.01     0.07  Enumerable#all?
    3.96     5.39      0.32     5025     0.06     0.08  Board#diagonals
    3.58     5.68      0.29    25670     0.01     0.04  Board#vacant_indices
    2.97     5.92      0.24     5134     0.05     0.11  Array#each_index
    2.47     6.12      0.20    85799     0.00     0.00  Array#first
    2.22     6.30      0.18     7506     0.02     0.25  Board#all_rows
    2.10     6.47      0.17     5005     0.03     0.09  Board#make_move
    1.61     6.60      0.13     5025     0.03     1.05  Board#winning_combination?
    1.61     6.73      0.13     5005     0.03     0.03  Kernel#initialize_dup

I then decided to memoize the winning row itself, so that once the symbol of the winner had been obtained for that board, it wouldnt have to recalculate it again. 

Memoize the winning symbol itself so that the program would only get the winning symbol from a winning row once per board.

    memoizes the wininng symbol itself, so that it does not have to be obtained from the row
     %   cumulative   self              self     total
    time   seconds   seconds    calls  ms/call  ms/call  name
    21.01     1.71      1.71   123833     0.01     0.07  Board#find_winning_row_from
    16.09     3.02      1.31    43429     0.03     0.91  Array#each
    6.02     3.51      0.49     5025     0.10     0.12  Board#rows
    5.65     3.97      0.46    35204     0.01     0.08  Enumerable#all?
    4.91     4.37      0.40     5025     0.08     0.11  Board#columns
    4.67     4.75      0.38   120600     0.00     0.00  Array#at
    4.55     5.12      0.37    25670     0.01     0.04  Board#vacant_indices
    4.55     5.49      0.37    85799     0.00     0.00  Array#first
    4.30     5.84      0.35    10030     0.03     7.39  AiPlayer#minimax
    3.56     6.13      0.29     5025     0.06     0.08  Board#diagonals
    2.58     6.34      0.21     5134     0.04     0.11  Array#each_index
    1.84     6.49      0.15    10029     0.01     0.02  Enumerable#first

It seems like the numbers went up again, so I changed the order of the scoring that took place. Previously I looked for a draw last, but I  moved it to the top of the scoring method. This improved the statistics a little:

    moving draw to first if clause in the scoring - thus winning symbol not found
     %   cumulative   self              self     total
    time   seconds   seconds    calls  ms/call  ms/call  name
    17.02     1.43      1.43   123833     0.01     0.06  Board#find_winning_row_from
    13.93     2.60      1.17    43429     0.03     0.91  Array#each
    7.74     3.25      0.65    35204     0.02     0.07  Enumerable#all?
    6.07     3.76      0.51     5025     0.10     0.13  Board#rows
    5.71     4.24      0.48     5025     0.10     0.12  Board#columns
    5.12     4.67      0.43    25670     0.02     0.06  Board#vacant_indices
    4.40     5.04      0.37     5025     0.07     0.09  Board#diagonals
    4.05     5.38      0.34    10030     0.03     7.57  AiPlayer#minimax
    3.81     5.70      0.32   120600     0.00     0.00  Array#at
    3.33     5.98      0.28     5134     0.05     0.16  Array#each_index
    3.21     6.25      0.27    85799     0.00     0.00  Array#first
    2.62     6.47      0.22     7506     0.03     0.25  Board#all_rows
    2.38     6.67      0.20    24714     0.01     0.01  Kernel#nil?

  
  When I played the game as a whole, it was still very slow, I tweaked a little here and there, trying each loops rather than find, calling methods to get the winning symbol and checking for nil rather than calling the boolean method to check if there was a winner first.
  
I decided therefore to put the alpha beta pruning in. This sped up the statistics a lot, and the output below shows how different the statistics look. 

     with alpha beta pruning
     %   cumulative   self              self     total
     time   seconds   seconds    calls  ms/call  ms/call  name
     100.00     0.01      0.01        2     5.00     5.00  Player#game_symbol
     0.00     0.01      0.00        1     0.00     0.00 RSpec::Core::Notifications::SummaryNotification#examples
     0.00     0.01      0.00       22     0.00     0.00  Class#new
     0.00     0.01      0.00        3     0.00     0.00  Thread.current
     0.00     0.01      0.00        1     0.00     0.00  Mutex#lock
     0.00     0.01      0.00        1     0.00     0.00  RSpec::Support::ReentrantMutex#enter
     0.00     0.01      0.00        1     0.00     0.00  Player#initialize
     0.00     0.01      0.00        1     0.00     0.00  AiPlayer#initialize
     0.00     0.01      0.00        2     0.00     0.00  RSpec::ExampleGroups::AiPlayer::LetDefinitions#ai_player
     0.00     0.01      0.00        3     0.00     0.00  RSpec::ExampleGroups::AiPlayer#ai_player
     0.00     0.01      0.00        4     0.00     0.00  RSpec::Core::MemoizedHelpers::ThreadsafeMemoized#fetch_or_store
     0.00     0.01      0.00       22     0.00     0.00  Hash#fetch
     0.00     0.01      0.00        1     0.00     0.00  Mutex#unlock
     0.00     0.01      0.00        1     0.00     0.00  RSpec::Support::ReentrantMutex#exit
     0.00     0.01      0.00        1     0.00     0.00  RSpec::Support::ReentrantMutex#synchronize
     0.00     0.01      0.00        4     0.00     0.00  Array#each_index
     0.00     0.01      0.00       12     0.00     0.00  Kernel#nil?


When playing the game now, it still takes about 3-4 seconds for the first move to be placed by the ai player on an empty board. I'll live with that for the moment, and if it needs speeding up further, I can plant the first move. Talking of which, in all the previously implementations of minimax, the first move on an empty board has been at 0, yet in my Ruby implementation is it 9. I've tried tweaking that too, to find the first winning move, but keep running into nil problems. I've parked this for now, so as not to get behind on the iteration.

When I do the next implementation I think I'll use [negaxmax](https://en.wikipedia.org/wiki/Negamax) to try another approach, and see if that simplifies the code.
  

