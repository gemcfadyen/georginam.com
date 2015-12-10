---
layout: posts
title: Different Game Types
---
### 8th Light Apprenticeship - Day 49

Something that has been bothering me about my `GamesRules` class, is the fact that it can only create a board and players once it has information from the player regarding what type of game they want to play, and the board dimensions they wish to use.

<!--break--> 

The class as it stood, was instantiated, and gave the list of GameTypes to the view to present to the user. Depending on what game type was chosen, the correct list of dimensions was presented.

Only at this point does the GameRules have enough information to create a board and generate the right type of players. There is a method `initialiseGame` that did this. 

The thing is, from a client code perspective, there is nothing to stop you calling another method such as 'playMove' or 'checkForWin' before 'initialiseGame' has been called. This makes the class fragile, as if the methods are called out of order, null pointer exceptions would occur.

Because of this I decided to extract the gathering of game types and dimensions into a `GameConfiguration` class. This way, I hope that the GameRules can be created only once the necessary config data has been gathered. It also felt as though a separate responsibility had been extracted out, which is a positive thing.

What I didn't realise was in doing this, I just pushed the problem further up. Now the Gui controller suffers from the symptoms I cured in GameRules. I.e. if the Gui Controller methods were called out of order then there would be problems. But in fact this was always the case, as from the gui the calls are chained one after another based on the buttons that are clicked. Data from the first choice, feeds into the second question. Unless I had a chain of different controllers, I think this would always be the case.

I also managed to implement the different game types. Now the gui can play Human vs Computer, and Computer vs Human as well as Human vs Human.  I can see the code is violating the Open Close Principle, as depending on the game type, the flow is slightly different. I have therefore two lines in the code that look suspicious.

If the computer player takes the first move, this needs to be done before the initial board is presented to the human. Therefore, on displaying the first board, there is code that looks like:

     if (gameType == UNBEATABLE_VS_HUMAN) {
           ...play unbeatable move first
        }
        
        
In the usual play method, after the human takes their go, the computer player must take theirs. But if the game type is human vs human, then I don't want anything extra to happen.
 
      if ((!gameType.equals(HUMAN_VS_HUMAN)) && gameInProgress()) {
            ..play automated move
         }
         
Usually to address the open close principle, dependency inversion helps. I.e. you can plug different logic into your class to provide the custom logic. I'll have a think about this over the next couple of days. Tomorrow I'm back at the client to see their finished product. I hope they have done well! 
