---
layout: posts
title: Optimising Clojure Minimax
category: apprenticeship
---
### 8th Light Apprenticeship - Day 122

When someone wants to play my Clojure tic tac toe, they choose the player combination they would like. If they choose 'Minimax vs Human', they need to be patient. As there is no optimisation in my minimax implementation, it takes around 30 seconds for the first move to be placed.

<!--break--> 

It was therefore time to optimise this.

I knew from previous implementations that alpha beta pruning was an efficient way to go. I had a link to a [MiT lecture on minimax with alpha beta pruning ](https://www.youtube.com/watch?v=STjW3eH0Cik) which I had been meaning to watch for some time, so I decided to watch it this afternoon.

It was a very clear explanation. At the beginning the lecturer, who is using Chess as the example zero sum game, explains different ways of devising a winning strategy. He lists the first approach as using analysis, strategy and tactics, the second approach as rules based, then introduces the idea of looking at game states as far into the future as possible. 

This list reminded me of the apprenticeship journey. When I first implemented an unbeatable player, I opted for the rules based approach, as I did not know about the third option of analysing future states using algorithms such as minimax, looking at the board after each move and deciding which move is the best. 

The lecturer explained that using minimax, each branch gets a value from the perspective of the player at the top (maximising player). The opponent (minimising player) wants the smallest scored route as his intention is the exact opposite. On reaching a terminal node, a score is assigned, and then backed up the route. By the end each sub-root node has a score, which informs the max or min player which route is best.

Alpha Beta pruning is then demonstrated. Alpha is the best already explored option along the path to the root node for the maximising player and beta is the best already explored option along the path to the root for the minimising player.

Sometimes it is not worth exploring the next leaf node because the game already knows the most favourable route.

In fact, if you end up in a situation where alpha >= beta, there is no need to keep on exploring that path. For example, if a minimised path is scored, the maximising player knows it will get at least that value. When choosing between two branches, if one is already more favourable, then there is no need to evaluate a score, or even calculate the options. 

Going back to my solution, I implemented the pruning and saw a considerable speed up. My requirement stated the first move should take less than one second, and I wasn't sure if it was within that time boundary.

I started to think about other options to speed the solution up further. I had remembered memoizing some values in my Ruby implementation and did some research. Clojure also has a way of memoizing data. 

You declare a `def` which contains the name of the function you want to memoize, surrounded the `memoize` function.

 `(memoize <name of function you want to memoize)`

I decided to memoize the functions which found if there was a winning row, and which would identify the winning symbol. I remember these being expensive, and I know they are called multiple times, yet with an immutable board, recalculating is wasteful as the answer will be the same each time for a given board.

I felt I could see a further improvement but had really just been counting `one, two, three` in my head as the move was being made, so it was not very accurate. 

I decided to get the opinion of a real player. I therefore asked Rabea to be a manual tester, to gauge whether the move appeared slow.  She thought it seemed fairly fast, but suggested I actually wrote a test which failed if the time taken was greater than a second. This seemed like a great idea and I researched how to do this in Clojure.

There is a `clj-time.core` library which has lots of useful methods to get the current time, find an interval between two times in all the different time units. I wrote a test which checked that the time taken for the minimax player to come back with the first move on an empty board was under 1000 milliseconds.  It passed. 

Curiosity got the better of me, and I decided to undo the changes and put the timing test in first, so I could see what the improvement was. 

##### Time taken for the minimax first move

|State   | Time   | 
|---|---|---|---|---|
| No optimisations  | 25.94 sec |
| Alpha Beta Pruning |  1.26 sec|
| Memoisation of the public methods to find winning line and winning symbol | 0.44 millis |
| Memoisation of the private methods which checks if a given row has a winning symbol | 0.275 ms|

This gave me the confidence I needed to ensure the move was being made in under one second, and would act as a regression test, capturing any loss of performance going forwards. 


### Useful Links


[alpha beta](https://www.youtube.com/watch?v=xBXHtz4Gbdo)
[clojure date-time library](https://github.com/clj-time/clj-time)