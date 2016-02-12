---
layout: posts
title: Loop tastic
category: apprenticeship
---
### 8th Light Apprenticeship - Day 34

In a sense my week starts on a Tuesday. It's the day of my weekly IPM meeting, where I demo what I have achieved and get my next set of goals. 

<!--break--> 

I got straight to work this morning on making my grid extendible. Up to now it has been tied to a 3x3 board, however it needs to support 4x4. I want to make it generic so the user can decide what size grid they wish to play.

I started by updating the game to prompt the user to enter the grid size. I'm glad that the validation work I completed a couple of week's ago is holding up. It was fairly simple to add a new prompt and validate the user's input to check it is a number. 

Generalising the code which checks for a winning row is slightly loop-tastic. Towards the end of the day I was getting tied up in knots, so this evening I deleted the code, reverting back to the hard coded 3x3 solution. I looked for patterns in the indices required for each row. So far horizontal and vertical rows are correctly being extracted, leaving the diagonals. The code is definitely more complicated than previously, and I worry I've made too big a jump in my approach. Another concern is performance. I fear that by determining the rows on the fly, the user experience will degrade if the unbeatable player takes too long to determine which cell to place their move first. If this is the case I may need to think about an alternative, simpler approach. 

Having the whole of the next week in the office means there are lots of stories planned. The most exciting is a spike to try out JavaFX. This is in preparation for writing a GUI for the game. I've never done a GUI before, and think that getting it in place will be very rewarding, and a good learning experience. 

Another new experience is upcoming as I have a performance to practise for. Remember back to Roman Numerals, the week has come to perform the kata. I am not used to coding to an audience, nor coding to music. Whilst many people sit at work in their headphones, it's not something I've ever done. I know it helps some people focus, yet for me, it can be a distraction as I feel I'm drawn to the lyrics of the songs rather than the problem I'm tackling. These days I'm embracing all new challenges, so I look forward to finding a tune and seeing what happens.





