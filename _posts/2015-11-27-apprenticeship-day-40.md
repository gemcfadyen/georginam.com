---
layout: posts
title: Snakes & Ladders
category: apprenticeship
---
### 8th Light Apprenticeship - Day 40

Turns out snakes and ladders is similar to Tic Tac Toe.

There is a board, a player, a prompt and a game.

<!--break--> 

Displaying the snakes and ladders board is similar to the command line implemenatation of tic tac toe. With 100 squares per board, there are single digit, double digit and triple digit numbers, therefore all the squares needed lining up.

What's different? The board is displayed from bottom left and the numbers zig zag up the board. This makes displaying the board a little trickier. Players also get registered with the board, which sets them up on the first square, whereas in tic tac toe, the players just launch in and use the board to select their position.
Going forwards the board will change. Each square will need the ability to hold a snake or ladder as well as a square number, and a player token.
 
The main positive difference is that there is little input from the user in snakes and ladders. This eliminates the need for any input validation. This also holds true with the tic tac toe gui implemenation. By eliminating all possibility of free text entry, no validation is required. They either click a clickable element, or they don't. This keeps the code clean and simple.






