---
layout: posts
title: A Simpler Rack App
category: apprenticeship
---

### 8th Light Apprenticeship - Day 81


I had one day to write a rack app that was simpler in design than the Sinatra version. I felt a bit daunted, as it can be hard to think of new solutions. I thought about the main things I had been told in the review. I think they can be summarised as keeping the players on the web side as simple as possible, and changing the game so that there was an easy way for a web human's turn to be taken.

<!--break-->

In the morning I worked at implementing the routing in the web controller. Along the way I tried to 'de-java' my code, but removing any methods I had that started `get_xxxx`.

As the routing was put in place, I thought about the interface of the core game next, and what I wanted it to look like. Using TDD, I forced the change in the core game and introduced a method

     play_specific_move(position, board)

This allowed me to simply pass the chosen move from the web gui, to the core game.


If the human-ai combination is taken, then after the human has taken their go, I wanted the original game loop to continue. To achieve this, I used a `UnreadyPlayer` (which would always break out the game loop). This allowed me to call the original `play` method at the end of the `play_specific_move` method.

As the day drew to a close, I demoed my work to Jim. Thankfully he was satisfied that the design was simpler and that I had taken the feedback on board and applied it. I can see that the players are now much simpler, and I changed the way the players were stored from an array to a hash, so that the symbol can be used to look up the relevant player.

I think the design will need to change again when the Ai vs Ai option is introduced, but I will think about that another time, so as to not plan ahead too much.
