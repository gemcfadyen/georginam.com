---
layout: posts
title: Real User Experience
---
### 8th Light Apprenticeship - Day 24

When working with user interfaces I have learnt that getting feedback from a user is important. Up to now I've been the only one interacting with the ttt game, however in my IPM today I passed it to my mentor to play. 

<!--break-->

He was able to spot some inconsistencies around where the prompt was printing the 'game over' messages vs where the prompt was printing 'enter your next move' messages. 

Additionally, he pointed out that although the game has input validation, there is no feedback given as to why a user has been re-prompted (if they have entered a letter for example).

These clean up tasks are forming my next iteration, which is a short one as next week I'm out at a client for a couple of days.

Some of the updates have been straight forward. Validating the input however has been more in depth that I initially thought. 

There are two checks to make, the first needs to check for an integer. The latter has to check if that integer is within the grid boundary. Currently these checks are split - one in prompt, the other in Player, but I want to move them into a common area. If I don't then there are inconsistencies with the error messaging, which was the whole point of making improvements.

I think both will end up in the prompt as a list of input validators, which the value entered by the user will be run through. This means I'll need to pass the board to the prompt when reading in the data, which doesn't necessarily feel correct, but I'm learning that everything is a compromise. 



