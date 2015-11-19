---
layout: posts
title: 
---
### 8th Light Apprenticeship - Day 34

I finished off the 4x4 game before the morning standup but found it still quite slow in one specific scenario. I was about to start pulling the minimax logic into a strategy, to keep the design consistent, and it was time for zagaku.

<!--break--> 

The topic was estimating and it was timed perfectly. I had gone over my estimate for the 4x4 story, and was not totally comfortable with the design that I had come up with. During the meeting Jim mentioned that on a client site, if the team are unable to finish the story within the time frame, they need to alert the client as soon as they realise. Therefore after the session, I did a quick demo of my 4x4 board to illustrate, to my internal customer, what I had done. I also pointed out what I wasn't comfortable with, namely the speed and the fact that the design I had used was not lending itself to TDD.

I got some quick alternative ideas. One was to use inheritance (which I had thought of yesterday but had rejected as I felt it wasn't usually the preferred approach). The other was to use the Decorator pattern, and 'decorate' the Unbeatable player with some custom behaviour. Because I was very familiar with the inheritance approach, I decided to go with the decorator pattern, and it worked out really nicely. The code is clean, testable and reads well. I felt more positive about the overall design.

I noticed that when the user chooses to take the opening move of the game, against an unbeatable player, the fifth move, when minimax kicks in, still takes about 5-7seconds to return. This degrades the user experience. 
I checked back in towards the end of the afternoon, as I was aware I'm now a day behind in my stories, and was asked to think about what my next steps would be.

Even though I had been told to move on, my thoughts were deep in the 4x4 board. I did invest another half hour or so trying to profile the application using jprofile, but I didn't find the information that informative. I've started a list of areas that I think could be hotspots and will go through them in my next IPM meeting.

Tomorrow I really will draw a line under the 4x4 grid, and spend the day experimenting with java FX. A fellow apprentice gave me a quick introduction today, and a few gui principles to think about. I'm excited to venture into an area where I have no experience, to see what I can come up with.



