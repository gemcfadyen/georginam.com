---
layout: posts
title: Clojure Minimax
category: apprenticeship
---
### 8th Light Apprenticeship - Day 119

Today I gave minimax in Clojure a go. For the 5th time. I don't know what it is about minimax, but it always seems to behave differently each time I implement it.

<!--break--> 

Last week I looked back at some of my previous implementations. At that point I decided to keep a list of scores so that at the end I could find the biggest and the smallest depending on whether the player was the maximising player or not. That meant mutating a list, which wasn't appropriate for Clojure.

I then decided to keep hold of the highest or lowest score as I went along, but that meant re-assigning a variable which isn't appropriate for Clojure.

I talked it through with another apprentice. I had two main issues. One is that in Clojure you can not force an early return from a method (which is usually what happens when you win or draw). The other was the immutability. She suggested extracting the for loop out into a separate function. This meant, I could check for a win or draw in an if, and in the else statement call a new method, which recursed back. Mimicking the early return.

At first I didn't think this was possible to extract the loop into a new function. Clojure is dynamic, so if you have two methods that call each other in a cycle there is always one which can not be declared by the other. To get around this you can use the `declare function-name` key word at the top of your file. This forward declares that there will be a method with the name `function-name`. You are free to reference it and provide the implementation wherever you like.

I managed to get a single branch of the algorithm going. However, alternative branches were not being explored. Talking with Sarah again, she explained that I'd need to recurse in the extracted methods to trigger the alternative branches. After I  had put this in, the algorithm worked much better. Finally, minimax was working.... until I integrated it into the game, and found, as a human I could win. Argh. Back to the drawing board..!
