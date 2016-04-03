---
layout: posts
title: Minimax is Unbeatable
category: apprenticeship
---
### 8th Light Apprenticeship - Day 120

Finally late last night I got minimax working in Clojure! It has no optimisations  but it works which is great starting point.

<!--break--> 

When I first attempted minimax in Clojure, I had tried to use a for loop. Because of the immutability nature of Clojure, it wasn't possible to keep track of the best score each time it iterated.  In my current solution, instead of a loop, two functions are used with recursion. This allows me to calculate the best score, then pass this value into the next method, thus updating it without Clojure realising. It is also probably more idiomatic to recurse, and keep for loops for Object Oriented programming.

The bug I had found yesterday was a surprise, as all my unit tests had passed, and I had a lot of unit tests, to ensure that the minimax player would take the winning move, and block an opponents move in every row, column and diagonal.

The behaviour I had found was when the human player (X) started the game, and took a move in the top left corner. Usually the computer will respond by taking the middle cell, however my minimax player was taking the middle cell on the top row. 

             X | O |
            -----------
               |   |
            -----------
               |   |      

This meant that the human could choose the middle left cell, forcing the minimax player to block a winning row:


             X | O |
            -----------
             X |   |
            -----------
             O |   |   

But now the human can take the middle cell, creating a fork which the automated player can not recover from.

             X | O |
            -----------
             X | X |
            -----------
             O |   |   
             

I wanted to debug the code, and looked as to how best to do this. Adding print statements is what I had been doing up to now, however because the grid started from almost empty, there was just too much output to follow it clearly.

I found an article on [debugging Clojure using IntelliJ](http://blog.tomeklipski.com/2013/04/running-and-debugging-clojure-code-with.html) and tried to set this up in IntelliJ. Whilst the article was very clear, and I setup a remote debugger, the IDE would not enable the run button, so I couldn't get it to start.

In the end I resorted to reading through the code I had written, checking details as I went. As it turns out, when I mimic the for loop by recursing, I was inputting the wrong depth. Once this was fixed, my minimax player was back to being unbeatable. Hooray!