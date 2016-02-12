---
layout: posts
title: Model View Controller
category: apprenticeships
---
### 8th Light Apprenticeship - Day 45

Back to the JavaFX Gui. Yesterday afternoon I started working on extracting the game logic that was in my 'Gui Prompt' into a separate file. This was accomplished, but I felt that something was not sitting quite right in my design.

<!--break--> 

The `GuiPrompt` has a member variable `GameRules`. The gui sets up the buttons for clicking, and provides the action with the information it needs. In the below example (an extract from my GuiPrompt class), I'm setting up the `UserSelectsButtonForMove` function, which is activated when a user clicks on the cell of the grid they wish to place their mark. This class is passed the prompt (as it needs to draw the next pane), and also the gameRules, as it needs to ask the gameRules for the valid dimensions to display.

      ClickEvent makeMoveOnClick = new UserSelectsButtonForMove(this, gameRules, clickableCell);


However the prompt (the `this`), has a reference to gameRules already. So it felt a little surplus. Also I'm passing the gui (as `this`) to invoke a guiPrompt method when the button is clicked, which felt a little circular.

I spent the afternoon spiking to see if I could split the dependencies but would get so far and reach a similar spot. I wanted to find a cleaner way to divide the responsibilities.

I remembered back to the client I had visited a few weeks ago. They had been using the model view controller as a pattern to split out the different responsibilities of their application. Therefore I decided to refactor to this pattern. 

As GuiPrompt already had a reference to the model (GameRules) and the view (BoardPresenter), my idea was to perform a series of refactoring. I started with displaying the home page. Using TDD I updated the GuiPrompt to ask the model (GameRules), for the GameTypes it should display on the home screen. These GameTypes were then passed to the BoardPresenter for displaying.  This proved that the concept would work, so afterwards I added a new interface, GuiGameController, and moved the true controller logic into there, hoping that GuiPrompt would just become redundant.

The same exercise was done to go to the model to get the dimension, which is passed to the BoardPresenter to display the dimensions on the screen.

I tried to keep all the unit tests green as I went, as the refactoring was quite large, really a re-design. I tried to use intellij refactoring tools, so that interfaces would remain in tact, and to add the controller as a new parameter so as not to break existing code, then replacing the functionality within the method. At the point the old parameters were unused they could be safely deleted through the IDE.  I managed to keep all the specific unit tests green. The end to end test however did remain broken until the end. Something I would try to prevent if doing a similar exercise again. 

In fact, todays activity would make a great 'keep it green kata'.

At the end of the refactoring, the code above has two parameters - the controller is passed in, which will coordinate the model and the view so that the next panel is displayed.

      ClickEvent gameSelectionOnClick = new UserSelectsGameType(controller, gameSelectionButton);
      
I feel it is now clearer where the different responsibilities lie. 

The next part to tackle is to remove the duplication between the model in the Gui (GameRules) and the Game that runs with the CommandLine. My idea is to do the same thing, i.e.: 

1) Take the game rules out of the 'Game' class and put them into 'GameRules' (Some may already be there from the gui side, and others may need adding)

2) Update the original 'Game' class to be the controller, and coordinate activities between the CommandPrompt and the game rules.

Originally I thought one controller would be used for both the Gui and the CommandPrompt app, but in fact the flow is quite different. With the gui, it is like a staggered step approach. Each click generates the next step of the game. With the command line its rather linear. There needs to be something to control the game loop, with the command line blocking, and the next step automatically occurring. 
Therefore I'm going to have a controller per app. If they look identical when they are done, then they could perhaps be generalised, but at the moment I'm expecting them to be a little different. 