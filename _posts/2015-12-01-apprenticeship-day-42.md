---
layout: posts
title: Gui Testing
---
### 8th Light Apprenticeship - Day 42

Testing gui's seems to be incredibly hard. I've been careful to keep the JavaFX specific code separate from the business logic so that the events that occur when a button is clicked can be written using TDD.

<!--break--> 

The difficulty is in trying to program an end to end test. 

I know what I want to do. I want a way to find gui components on the user interface, and simulate user input. In terms of tic tac toe, these steps can be summarized in the steps below:

1. Invoke the gui to draw the pane which asks the user to select their game type. 

2. Navigate the pane through the code, to find the selection box with a given id (gameSetupId)

3. Through code, click this selection box. This should bring up the next pane (to allow the user to choose a grid dimension)

... and so on. This would allow full control over what is 'clicked' therefore testing a given path through the system.

However, when you invoke a JavaFX application, the method `launch` is invoked, which puts your application in a ready state. The framework internals then invoke the `start` method to begin and program execution starts on the JavaFX application thread not the main thread. This means that normal JUnit tests fail.

Disappointingly there is no entry on testing JavaFX on the Oracle website. Googling finds many articles, which invoke the application in `BeforeClass` of the JUnit test, wrapped in a thread with a particular id. This Thread can be obtained in your actual test, but from that I don't know how, or even if you can get hold of the gui. 

      @BeforeClass
      public static void initJFX() {
          Thread t = new Thread("JavaFX Init Thread") {
              @Override
              public void run() {
                  Application.launch(BasicStart.class, new String[0]);
              }
          };
          t.setDaemon(true);
          t.start();
      }


Other articles show special test runners from which your application can be invoked, or have the test class extend `Application` to make it a JavaFX Application. After that there are specific frameworks that have been written such as Jemmy and TestFX. 

In a nutshell, I did not come across any article which shows a simple example of a JUnit test for a JavaFX application. Where they show the setup, they don't show the test case.

In summary, all the options that I've come across seem a little over complicated. Having tried a few of the suggestions, it seems near impossible to get hold of your JavaFXApplication. And even if you do, there is not actually anything exposed on this class that would be useful. 

Having realised this, I tried to think about the problem in a different way. The JavaFX Application class itself only sets up a blank pane, after which another class (TicTacToeBoardPresenter) configures the first scene for the user to interact with. 

That is when a new idea came to me. If I expose this scene in the BoardPresenter, then perhaps I can navigate to the necessary selection box, and simulate a click.

After giving it a go, in only a few lines of code, I have been able to get hold of the correct selection box. 

        BoardPresenter boardPresenter = new TicTacToeBoardPresenter(new Scene(new GridPane(), 700, 700));
        boardPresenter.presentGameTypes();`
       
        Scene firstScene = boardPresenter.getScene();
        Node lookup = firstScene.lookup("#gameSetupId");`
        
Above all, there only setup required is one line to create a JavaFXPane, which initialises the JavaFX Runtime environment.

Tomorrow I'll restart my search to figure out how to click the button I've found through my code. If I achieve that, I hope the next pane will be drawn, I can then get that scene and find the next button to click. If it works out, then I may have conquered it.

Some articles:

[Good summary of JavaFX Test options](http://qaware.blogspot.co.uk/2015/03/gui-tests-for-javafx.html)

[Testing JavaFX Services](http://blog.buildpath.de/how-to-test-javafx-services/)
