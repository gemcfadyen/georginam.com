---
layout: posts
title: Scaling
category: apprenticeship
---
### 8th Light Apprenticeship - Day 33

Today I learnt a few things. The first is that I can't count. Looking back at my blog entries, each day is numbered in a sporadic fashion. No idea how that happened, I think the days are going so fast I got caught up in a my own timezone. I'll address this another time.

<!--break--> 

The other thing I learnt was that my suspicion about 4x4 being slow was proved correct. The loop-tastic solution was completed, but the time for the Unbeatable player to make their first move was, so slow, I ended up killing the process.

I wondered if the solution was slow because of all the loops required to identify if a board has a winning line. In order to prove or discard this concern, I did a spike on a new branch. I simply hardcoded the rows for a 4x4 grid, so that no derivation was required.

I ran my game again, and it was still incredibly slow. I waited it out, so perhaps it was marginally quicker than the looping solution. Either way the user experience had very much degraded, down to negative infinity and beyond.

I wasn't sure what to try next. I thought about trying to reduce the number of paths explored during the search. After all, for an empty board, you don't really need to explore all of the graph. I counted up the number of times the recursion happened for the 3x3 board [20866 times], and a 4x4 grid [554303011 times]. I continued the spike to break out of the recursion after various thresholds were met. Whilst this worked, I felt it was guess work. I was unable to find any sort of formula online that would determine the best number of recursions to aim for. Also if the grid got larger, no doubt that number would need to change, so without a formula if seemed a bit 'hit and miss'.

I ended up getting a little stuck. I was also aware the the estimate I had given for this story was fast expiring. I reached out for some new ideas, as I wondered if I had missed something. I was told that for a 4x4 board, the optimised game plan (minimax) does not have to start straight away. The board is bigger so there is more room for playing.  Jim suggested that I played a few 4x4 games on paper to determine the point that the algorithm needed to kick in. This was a useful tip. Very quickly I could see that once 4 or 5 moves had been taken, the users would need to get smart to start blocking potential wins.

I pondered what this meant. Did it mean the player could take any move up to that point? Or was I missing something again. 

I spiked some more using 5x5 grid. I could see on paper that once 5 moves were made, the algorithm needed to get smart. I placed the first 5 moves in a random fashion, thereafter used minimax. The user experience was still awful. On such a large grid, even with a few moves taken, the time was too slow. I had been looking for a pattern, e.g.: take the same number of moves as the dimension, after which fall into minimax. The algorithm just didn't support this time-wise.

I was confused. The story was to make the board larger, thus making it more generic, yet the solution was not scaling. I was not sure what to do, and with my co-mentor away, I used the time during the fire alarm practise to check back in with Jim. He agreed with my findings and alluded to the fact that, in a 4x4 grid, so long as the first 4 or 5 moves are made in a fast way, thereafter the minimax algorithm can kick in. As some of the grid is occupied by then, the user experience is not degraded. He agreed that the solution does not scale, so he will not be asking for any grid larger than 4x4 in the coming weeks. 

I now had a better idea of what I was trying to achieve. I decided to stick with the program dynamically generating lines to check for wins, as this was not really the cause of the slowness, and it seemed a more realistic change rather than hardcoding lines for a grid of size 3 and a grid of size 4.

I looked at what else had to change. Quite a lot. Quite unexpectedly. The order that the Game prompts had to change. I have a choice of game types - Human vs Human (which could in theory be any size grid, there are no performance implications), and the combinations of Human vs Computer player, on which the board size needs to be limited to 4 or below. This meant another set of validation, to ensure when the user enters the dimension they want to use, it is within the correct boundary depending on the game type they have chosen.

To implement this, I added a dimension boundary to the GameType enum so that there is one place that knows what the maximum grid dimension for a given GameType is. 

This means that the factory that creates players now needs to know about dimension, so that it can create the appropriate player. My idea is that the unbeatable player will now have an 'optimised strategy' injected in. This will use the null object pattern, so when using a board dimension of 3, essentially a dummy strategy will be injected which will do nothing. When using a grid size of 4, the strategy will make the first 4 moves outside of minimax, probably going for corner square first if they are available. I preferred this idea over creating another separate Player, because I felt that there would be a lot of duplication between the 3x3 player and the 4x4 player. This would then have led to more inheritance, or the template pattern which I am not so keen on (haunted by it's overuse in legacy code bases).

The other update I had not accounted for is to the displaying of the grid. Now that there are indexes of double figures (10+), the alignment is all out. I updated the command line gui to account for this, but again it was a change I had not factored into my estimation. I still have some 'debt' in my command line gui (as its formatting for display as well as reading/writing) so adding functionality can be a bit harder than it should. I didn't feel I had time to do this refactoring now, as it would mean I'd need to spend even more time on this story, which I am already behind on. 

To conclude, once again the story has turned out larger than I thought, and I've still not implemented it all. Am I just slow? Or is it because the solution is more than a few loops, which is what was initially anticipated. Instead the solution entails new validation, smarter players and updated displays. I hope to finish it tomorrow then move on to the next story on my agenda.

