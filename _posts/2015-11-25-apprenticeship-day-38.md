---
layout: posts
title: Inversion of Control
category: apprenticeship
---
### 8th Light Apprenticeship - Day 38

I am not experienced with Gui's. 

My tic tac toe game has a Prompt interface, which currently has one fully working CommandLinePrompt implementation. 

<!--break--> 

The gui story introduced a GuiPrompt implementation. The Game constructor adhere's to dependency inversion, so I just plugged my GuiPrompt implementation in, invoked it, and *boom!*

Turns out that whilst the command line is blocking, and therefore waits patiently for a user to enter their selection, the gui is not. This meant that when the Gui was launched, and it invoked the game, the game just whizzed through it's entire loop, crashing out because it had no dimension or game type selected. It all happens so fast, the first pane of the gui does not even draw itself completely.

I thought about this for a while, then tried to prove it by temporarily placing a `Thread.sleep(10000);` in the Game code, just after the prompt invokes the Gui. I thought that this would essentially slow the gui down, so I would see the welcome pan. Still, the gui didn't draw itself correctly. I tried debugging, as then you can control the pace of the application. Again, just a white pane, rather than my styled tic tac toe page.

It turns out the gui pane doesn't draw itself until it exits the `start()` method in `Application`, and returns to the bowels of the JavaFX framework. This means, by having the Game invoke the gui, not only is there lots of room for error in between the game being played, and the thread returning to the start() method, but also it doesn't make sense. The start() method needs to execute in entirety to draw the first pane, then the game needs to be triggered from thereon in, by interacting with the pane.

Getting this understanding has taken up my entire afternoon, but it is starting to become a little clearer that the Gui needs to control the flow of some of the logic, rather than the Game.

As I see it, there is the game logic (players taking turn, the rules of a win) and the display logic (the logic of what you see and how you interact with the application). This needs to be split appropriately between the Prompt implementations and the Game.

This is known as Inversion of control and does not feel intuitive at the moment. As I'm trying to keep pull requests concise I will switch back to the master (which has no gui work merged in at the moment), and remove the prompt from my game tomorrow, getting it working with the command line implementation before going back to the gui work.

Some useful links:
[C++ TTT Gui game](http://www.codeproject.com/Articles/678078/Cplusplus-is-fun-Writing-a-Tic-Tac-Toe-Game)
[Java TTT Gui Game](https://www3.ntu.edu.sg/home/ehchua/programming/java/JavaGame_TicTacToe.html)