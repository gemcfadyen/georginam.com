---
layout: posts
title: Productive Week, Productive Review
---
### 8th Light Apprenticeship - Day 47

I feel I have been my most productive in the last week. I had a couple of tricky tasks but kept my head down and just kept on going. 

<!--break--> 

In my weekly review, I managed to show the following:

- Rock Paper Scissors game which plays Human against Computer player
- Tic Tac Toe Gui doesn't jump when the winning/draw message is displayed
- Gui end to end test for winning and draw scenario
- Formatting of the command line output (colours) separated into a Formatter class
- Lowercase y/n accepted as valid replay options, not just uppercase Y/N.

In preparation I merged all the pull requests and decided on the order I would demo. I felt that Tic Tac Toe had the most change, so may warrant more time. Therefore I felt it better to start with Rock Paper Scissors.
Here the computer player was added as a bit of an afterthought, and as such, when the game is played the console looks something like:

		Player one  - please enter:
		1 for ROCK
		2 for PAPER
		3 for SCISSORS
		1
		Player one  chose 1 - ROCK

		Player two  - please enter:
		1 for ROCK
		2 for PAPER
		3 for SCISSORS
		Player two  chose 3 - SCISSORS

		Player one won

Player one is a human, so it makes sense for the menu to be displayed. However player two is the computer. The menu is a little bit of a waste, as the computer does not use it to make its decision. In this sense, the UI is tied to the game. A change to the UI should not result in a change to the game.

The other piece of feedback I got was around using private member variables.

eg: 
        
        return gesture == PAPER && id == ROCK.id;

I'm using the private member variable 'id' directly in the class, when there is a getter available. I was advised that a good rule of thumb is to always us the getter method (if there is one available), even if you are in the actual class itself. This way if the member variable changes name for example, only one line will be effected.

Back to Tic Tac Toe.  For the demo I wrote down all the features I wanted to show, as well as the areas that I felt still warranted some cleanup or further thought.

I wanted to highlight that I had managed to separate responsibilities such that all the JavaFX functionality was in one place - the 'view'. Similarly, the game rules were also separated and available for use from both the Gui and CommandLine game. Finally a controller class sat in between them both coordinating the two.
Compared to my previous design, the responsibilities seemed clearer. Also I felt that the classes had one overarching responsibility, adhering to the SRP.

The points for improvement I wanted to point out were the following:

- The gui still doesn't really use the Player in the usual manner. The controller knows the position the human has selected, so delegates this to the game rules in order to get the symbol of the current player and update the board. Once different player types are being used, I imagine I'll want to call the 'getNextMove' on the computer player, but not if its the human player. This would mean a special if loop to handle the Human player. Not ideal.
- The gui deals a lot with Strings, as this is what comes back from the user interface. This means conversions are sometimes needed from GameTypes to Strings, Strings to int's and so forth. This has been done a bit sporadically, and I need to find a consistent place to do this.
- Packages... These have become somewhat corrupted. With all the redesigning, I have a lot of classes in the gui packages which should actually live in the core game. This will need refactoring. 
- When a user selects a game type and dimension, the controller passes these to the GameRules to save. Only once it has these pieces of information can a game be initialised. However there is nothing stopping client code calling other methods such as 'updateBoard' before a game has been initialised. This feels dangerous. Another person, or team would need to be told about the order of methods. It would not be clear from looking at the code.

I managed to review all of these points with my mentors and came away with a couple of new ideas and refactoring that I hope to work in to the week. The point on the gui using the player is still a little hazy but I'll have to get started and see what evolves.

I also found out that, although the board jumps less when the winning message is displayed, it still jumps a tiny bit. This is because the blank text box is of a different size to a text box that contains letters. I'll need to check if there is a way to specify the size of a text box to improve the ux further.

Another take away was keeping the methods in the GUI controller class at the same level of abstraction as those in the Game Controller class. 

Once I've wrapped up all the existing Java stories I'll be starting Ruby, and doing a tic tac toe with a immutable board, and creating a web app. That said I'll crack on..!


