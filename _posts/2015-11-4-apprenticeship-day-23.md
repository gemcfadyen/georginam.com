---
layout: posts
title: Strategy
category: apprenticeship
---
### 8th Light Apprenticeship - Day 23

The number of note books I have with little 3 x 3 grids drawn in is increasing. Trying to visualise a 2D array in your head is difficult. Trying to make a square formation out of a line of X and O's is difficult. Once again drawing a visual representation is helping a lot.

<!--break-->

After a morning of refactoring and addressing pull request comments, I started to work on the unbeatable computer player.

I know the mini-max algorithm will do the job, but interested to see what would happen, I experimented with a test driven, non mini-max approach. I started with the obvious 
- If there is a winning move to be made, take it.
- Else, if there is a winning move for your opponent, block it. 

After that however, I wasn't sure what to do, short of implementing a fully blown game plan which would deal with your opponent forking, and strategically placing blocking moves. I've implemented such a solution before and know it can work, but it does involve a lot of code to model a strategic set of ordered moves. I think I'll do some more research and start again in the morning.

Another thing I've noticed is that the amount of tests I've got seems to be exploding. For the grid, I've been checking for wins in every direction (for example, I check for a win in the top row, middle row and bottom row, left column, middle column, right column and so on). I'm not sure if its necessary to check for all however I would want to know if the given logic stopped working so I see the value. 
