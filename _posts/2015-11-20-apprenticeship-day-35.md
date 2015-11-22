---
layout: posts
title: JavaFX
---
### 8th Light Apprenticeship - Day 35

Front end development is entirely new to me so Friday was time-boxed to get to know JavaFX. I was looking forward to this. Whilst I love getting into the guts of the business logic when doing server side development, seeing the gui change in front of my eye's with every line of code is also really rewarding. 

<!--break--> 

It turns out IntelliJ offers JavaFX as a project type, and provides a HelloWorld example. This was a useful start with. Thereafter I worked through the Oracle tutorial at:
[Oracle JavaFX Tutorial](http://docs.oracle.com/javafx/2/get_started/jfxpub-get_started.htm)

#### Some terminology
To use JavaFX, you must specify a class which extends `Application`. This has a `start()` method which is the entry point to the JavaFX Application.

To layout the front end, you have to configure the _stage_ and the _scene_.

The `Stage` is the top level container. In JavaFX, the `Stage` in the class extending `Application` is the primary stage, and is what ends up embedded in the browser for the user to interact with.
The `Scene` class is the container where all the content lives. Scenes are a hierarchical group of nodes, so there is a root node. 

#### Tic Tac Toe
I will be using JavaFX to create a gui for my tic tac toe game, so at this point I decided to opt for the `GridPane` as my root node. This allows you to create a grid of rows and columns to lay out various controls. This sounded as thought it would suit the game well, as ultimately the board in tic tac toe is also a grid. For the spike, I used `Button`'s to represent each 'cell' of the board, and a user takes a turn by clicking a button, after which the text on the button is updated to either 'X' or 'O' accordingly.

It had been fairly straight forward to get something on the GUI to interact with. As this is a spike, I decided to do it in a project outside of my actual tic tac toe game, and simply made a dummy Game class to represent the 'back end'.

Looking at the code, I could see that there was a lot of JavaFX code inter-twined with the business logic of updating the grid at a certain index, and checking if there was a win. One of the main ideas behind the spike was to figure out how the gui code can be tested. 

I knew I had to isolate the JavaFX code in single places. I also knew that I didn't have to test the layout of the gui. I felt the important parts to test where the logic on clicking elements such as the buttons. For example, it is important to know, that if a user selects a specific move on the board, that move thereafter becomes unavailable (the button is disabled).

My first instinct was to wrap the JavaFX Button behind an interface so that I could create a Spy for unit tests, then somehow trigger the click event using `MouseEvent.MOUSE_CLICKED`. That way, I could count how many times the disabled method had been called, when the button had been clicked. This wasn't possible because most of the methods in Button are `final`.  This means they can not be overridden. Additionally the constructor to create a MouseEvent takes around 20 parameters, so was not that easy to construct. I needed an alternative approach, but this exercise had been useful. Turn's out you can not invoke JavaFX controls from JUnit tests.
If you do, you will see the following error:
`java.lang.IllegalStateException: Toolkit not initialised`

To run JavaFX code from a unit test, the JavaFX Runtime environment needs to be initialised. In short, you need to do some jiggery pokery. A JavaFX thread is started and all the controls must be mutated on that same thread. I found a `JUnitRule` that is available on GitHub which sets up JavaFX Panel for unit testing:
[Junit Rule for JavaFX](http://andrewtill.blogspot.co.uk/2012/10/junit-rule-for-javafx-controller-testing.html) This may be useful for testing, and confirmed that the more I separate the game logic from JavaFX code the better.

Taking a step back I could see that for each component on the grid (RadioButton, Button), an action was registered. This action contains the logic that I feel should be under test. I started introducing interfaces. I used `AnyClickableItem` as the interface for the RadioButton and Button, and `AnyClickableItem` for the logic that takes place when they are clicked. For the spike I purposely named the interfaces with the word 'Any' to act as a reminder that for the concrete implementations should have no reference to JavaFX inside.

The idea is that for tests, I can create my own concrete implementation of 'AnyClickableItem' and bind the business logic to it. For the real gui, I have a concrete implementation called `JavaFXButton` (again named to show clearly that the class is tied to JavaFX and therefore would be hard to test). This class really just delegates to JavaFX, so would not really need testing, after all we know JavaFX is a working library.
You can see my spike code at: [JavaFX Spike](https://github.com/gemcfadyen/Apprenticeship-JavaFXSpike)

I have got a lot out of doing the spike but I still think implementing the gui will be quite a bit piece of work. On the surface, I see the following list of tasks will make up the story:

1. new implementation of Prompt which interacts with the GUI rather than CommandLine
2. Rather than the game telling the prompt what the user has chosen, the gui needs to ask the game for valid options for GameType (Human vs Human), Board dimensions (3x3, 4x4).
3. The board needs to be modelled using Buttons and displayed nicely to the user
4. Players need to take turns and after each go, the gui needs to ask the prompt if the board contains a win, then either continue play, or end the game.
5. When there is a win or no vacant spaces to play, the gui must prompt the user to ask if they wish to replay. If they do, the display needs reset, otherwise play ends.

I currently have a CommandLine Prompt and I think that I'll need a gui implementation which adheres to the same interface so you could essentially plug in the implementation that you would like to use. This existing Prompt interface will therefore need to change. For the gui, I can see that the direction of information needs to be different to the current flow. As mentioned under point 2, currently the prompt tells the game what the user has entered, whereas I think the GUI will need to ask the game for valid game options (e.g.: Human vs Human) and display them to the user in order for them to make their choice. It seems the prompt will create the Game, which again is different to what currently happens. The hope of the spike was to get a smallish estimate, yet I still feel the task is probably the biggest I've had yet.


 

 

