---
layout: posts
title: Terminal Visuals
---
### 8th Light Apprenticeship - Day 22

Apart from a short spell at University, when we were asked to draw a square and a circle onto the screen, I've never really used Java to do anything more visual than print a few ascii boxes onto the command line. Today that changed _slightly_. 

<!--break-->

Working on my tic tac toe program, my task was to clear the command line and redraw the board each time a user makes a move. I didn't know how to do this, so turned to my old friend google.

Google suggested a few things. The first was to use _Runtime.getRuntime().exec("some-command");_ This seemed sensible. The command I was interested in was _"clear"_. Easy. Except it didn't work.

The next suggestion on stack overflow was to write a _for loop which iterated a hundred times, printing out a new line character, thus emulating a clear_. Hmmmm. Not convinced. Although it would work, it felt like a big (hack) work around.

The final suggestion was to use _ANSI characters (escape characters)_. The terminal looks for sequences of ANSI characters embedded in the text and interprets them as commands rather than characters. ANSI can be used to set the font colours, background colours and formats of terminals. 

All ANSI characters start with the escape character '\033['. The command I was initially interested in was '\033[H\033[2J'. This command tells the terminal to move to the top of the screen (H) then clear the screen (2J). Simple. Except it didn't work. 

I started to ponder why all the methods I was reading about were not working correctly. I had a suspicion that IntelliJ perhaps used a different sort of terminal when running the application. To prove this I went back to basics and invoked my game through the command line. That's right, 'java ttt.Game'. Just like that the screen was clearing. 

Being used to doing back end server side development, anything vaguely visual get's me excited. I decided to experiment with the font and background colours. Over the morning I've had the grid printing out in salmon, yellow and red. After lots of experimenting I decided to stick to blue's and green's which are a bit easier for the eye's to digest. Now when a Player is presented with the grid, they see each numbered cell in a pale grey. Upon choosing a cell to put their symbol (X, O), the grey number is replaced by a green symbol. 

Having sorted my visuals, I removed the code used in the spike, and set out to test drive it back in. I was a little unsure at first how to test it, then fell back to reusing my PromptSpy in order to introduce the clear-screen functionality to the Player class. 

If you are wondering if Runtime.getRuntime().exec("clear") also works outside of IntelliJ, the answer is no. At least not on my machine. 

- [ANSI escape characters](https://en.wikipedia.org/wiki/ANSI_escape_code)
- [ANSI colours](http://bitmote.com/index.php?post/2012/11/19/Using-ANSI-Color-Codes-to-Colorize-Your-Bash-Prompt-on-Linux)
