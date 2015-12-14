---
layout: posts
title: Compromise
---
### 8th Light Apprenticeship - Day 51

Last Thursday I added the different game types to the gui tic tac toe. As I result I had code that checked what game type had been chosen then acted accordingly. This violated the Open Closed Principle. If a different game type was added, then I'd potentially have to update this code to do something different.

<!--break--> 

I wanted to address this. Part of the issue was that when playing tic tac toe from the gui, there is no need to use the 'Player' class when a Human is taking a turn. This is because the information on what position the human wants to take, is provided by the button they press. The information is already there.

However to generalise the code, I felt having a player representing the Human may prove useful. Therefore, I added a GuiHumanPlayer, which just returns a negative value, which is mapped as a constant. This way, I can, in the gui code, ask the Player class to give me the next move. It doesn't matter what type of player is being asked (if its the GuiHuman or the UnbeatablePlayer) As long as its not a negative value that is given, then that move is taken. Otherwise, the move provided by the real human player having pressed the button through the gui is used. 

This allowed me to remove the specific GameType reference, and thus generalise my code a little. I'm not saying this is a perfect solution, but I've learnt over the last two months that everything is a compromise. 

