---
layout: posts
title: Validation Template Method
category: apprenticeship
---
### 8th Light Apprenticeship - Day 110

The next requirement for my Clojure tic tac toe is to introduce a computer player. I had a quick think about this, and have a few ideas as to how to implement it, however at the moment, the code base is not in the right shape to support different player types. I don't yet have a concept of a player.

<!--break-->

Because I like to make the code easy to extend before extending it, I started off implementing the functionality which asks the user which player type they would like to select, only displaying "Human vs Human", as that is all that the code base offers right now. 

As with all input via the command line, it needs to be validated to ensure it is a provided option. If it is not, the user is re-prompted until a valid input is provided.

The resulting validation function was very similar to the validation function when a player enters their next move. I had a similar encounter with my Ruby tic tac toe which I resolved using a template method, passing in different functions for the parts that change. I decided to do the same here, after all Clojure is a functional language so is made for things like this. 

After some long debugging sessions (so many damn brackets!) I got the template method working, and removed several methods from the module. Not only that, I think I used every type of function Clojure offers - anonymous, partial and higher order. Although I have not finished reading about the functionality the language offers, I've been finding it quite manageable to apply what I have read about. This is making it quite an enjoyable language so far.

Also today, I received the nicest comment I've ever had on a pull request, where I had commented on why I took the approach I did, despite it not being perfect - Thanks Jim!

_Just want to say I love the thoughtfulness of this comment. Acknowledging there are tradeoffs, choosing one thoughtfully, and blogging about it. I'd love to see this kind of approach shared with the other apprentices. Maybe even a zagaku._



	