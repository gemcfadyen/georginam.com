---
layout: posts
title: Observer Pattern 
---
### 8th Light Apprenticeship - Day 53

The observer pattern has publishers and subscribers. Every time there is a change in the publisher, it tells the interested parties. Imagine you subscribe to a magazine, every time there is a new issue, you, as a subscriber will receive that issue.

<!--break--> 

In code terms, you have a Subject (publisher) which informs all the interested Observers. 
Formally the observer pattern is defined as 

"A one to many dependency between objects so that when one object changes state, all of it's dependents are notified and updated automatically"

This promotes loose coupling, because all the subject knows is that the observer implements a certain interface. Changes on one side will not effect the other, e.g: If new observers are added, nothing in the subject has to change.

Java offers Observable classes in the package `java.util`. These would be extended by your subject and observers, and provide the registration of observers for free.  A disadvantage of the java.util approach is that you have to toggle the `setChanged` flag, to tell the subject whether it actually needs to notify the observers or not. Also, when notify is called, it passes the subject to the observer, which may not always be necessary.  

The issue I was trying to address was the 'special case' logic in the gui controller. When a GuiHuman was the current player, they would always return '-1' which signalled the game to ignore that move, and instead use the value of the button that had been pressed. However if the current player was the Unbeatable computer player, take that go.

    int move = ticTacToeRules.getCurrentPlayersNextMove();
        if (move != -1) {
            playMoveIfSpaceOnBoard(move);
        }

I wanted to see if all my players could be treated the same, so I tried out the observer pattern. In terms of my current story, the subject would be `UserMakesAMove` which is invoked every time a button on the gui is pressed. The Observer would be the `GuiHumanPlayer` who wants to know what button has been pressed, so the player can save it as the next move. That way, each player could be treated the same, as the gui player would be 'pre-loaded' with the move obtained from the button press. i.e: Every time the subject gets invoked, it would send an update to the GuiHuman to say 'hey, this is the button that was pressed'. The GuiHuman could then save this.

To keep it simple, I opted to write my own interfaces. This way, on notify, only the id of the button pressed was sent to the gui player. This was fairly straight forward.

The problems came when trying to integrate the pattern into the actual gui game.  When the board is presented to the user, the `UserMakesAMove` event is bound to each button. This meant that the player had to be passed through the controller to the boardDisplayer. It didn't feel correct to need a player in order to display the board.

The other issue I came across was that the GuiHumanPlayer had to have a default move to indicate that a index had not been provided by the board yet. Because the move is zero index based, I opted for -1. This meant I was in no better position. The code was already checking if the move was -1 and ignoring it. That was the situation I was trying to fix. 

Struggling to think of alternatives I invited Christoph to pair. We discussed the differences between the gui game implementation and the command line game implementation. In the latter, there are no checks as to what the type of players are. Each player is treated in the same way using polymorphism. When it is a human players turn, the command line blocks, to wait for user input. Whereas on the gui this can't happen. He suggested we mimic the blocking behaviour, then we would be able to essentially have a game loop, which toggles between the players. Players take moves if they are ready (automated players), and if they are not ready (gui players), the loop is broken. 

We started by adding a method 'isReady()' to the Player classes. This was set to true for all players except the gui human. In the gui human, when a button is pressed, the controller sets the move on the gui, and sets the isReady flag to true. Once the gui player makes a move, the flag is set back to false, thus breaking the 'game loop'. He likened it to manually implementing the observer pattern. Whilst the formal set of interfaces were not being used, we were essentially updating the player when a button was pressed, achieving the same result as the observer pattern.

To set the move on the gui player, we did a cast. This is because, at this point in the code, we can guarentee the current player is indeed the GuiHumanPlayer. It is invoked from the button being clicked. I feel the casting is the same as saying `instanceof`, which would be violating the OCP principle. Maybe passing the current player to the boardDisplay, and casting inside the 'UserMakesAMove' class would be better, as again it's guarenteed to be a human at that point. But for now, as everything is a trade off, I'll leave it where it is, and start the task again test driving this time. Once it's updated, I'll take another look and decide if it is worth to pass the current player into the board displayer to pre load the gui human or not.


[Observer Pattern](https://en.wikipedia.org/wiki/Observer_pattern)
  
  
