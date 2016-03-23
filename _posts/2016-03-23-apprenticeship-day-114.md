---
layout: posts
title: Client Server Tic Tac Toe
category: apprenticeship
---
### 8th Light Apprenticeship - Day 114

During today's IPM Jim came up with an idea of playing tic tac toe across sockets.

This means, there would be a server running (which would have all the game logic). A client would connect to this server, and request information, such as 'Request: Player-Options'. The server would receive this instruction, and respond with the string that the client should display, such as "Display: Choose a player option: (1) Human vs Human (2) Random vs Human". 

<!--break-->

The client would read this string, understand that it should show this information (because of the 'Display' prefix, and write it to the console.

I found some code in the Clojure Cookbook which demonstrated a simple server that interacts with the java.net libraries. It was however very difficult to find example clients. In all the articles, telnet is used, whereas I needed to write my own.

I set about doing this in Clojure, and successfully communicated with the server, sending requests to indicate the client wanted the player option information. Things got tricky when I wanted to receive information back. I was unable to get the reading functionality working, thus the client would hang in a loop, waiting for input from the server that it never received.

Jim had mentioned that the client could be written in any language. As such, I decided to write a quick Java client to see if I could get more of the communication going.

I now have bi-directional messaging between the server and client, however it only works if a new Socket is created on the client side each time a message is written to the output stream.

At first I thought this was incorrect, but maybe it makes sense. The server blocks, calling the method `accept` until a client request is received. If the request comes in, it will be processed, and although more input maybe streamed across the output stream, the while loop would not be triggered unless `accept` is called again.

The spike was very rough, and I still have a lot of uncertainty in the task. I do however have a better idea of what the story is about, at the high level anyway. 

Testing is one uncertainty. Whilst I'm very comfortable testing the client side written in Java, the Clojure server side is a different story. This blog post on [testing a Clojure Http Server](http://alexander-hill.tumblr.com/post/85931712980/end-to-end-testing-a-clojure-http-server) caught my eye, however as the server loop doesn't return any value, this kind of test doesn't have much value.  I think therefore, I'd need to use the `with-redefs` as I did for the game loop, in order to check certain methods had been invoked when expected.

Another uncertainty is how to swap the command line game in and out with the server socket game. I imagine I will need some way of knowing which function to use based on whether the game is started in 'socket' mode or 'command line' mode. 

These details are what I'd like to refine in next week's IPM. Perhaps this will end up being the dreaded server task ;-)

Until then, I'll estimate the real task based on the vague ideas I have. I feel it will be a big, non-trivial task, but perhaps it will be clearer after Tuesdays IPM.

Useful Links:

[reading a server request](http://alexander-hill.tumblr.com/post/86600986295/reading-a-full-http-request-in-clojure) 

[socket library in clojure](https://github.com/atroche/clj-sockets/blob/master/src/clj_sockets/core.clj)

[Websockets in Clojure](http://www.spantree.net/blog/2015/05/07/http-kit.html)



 