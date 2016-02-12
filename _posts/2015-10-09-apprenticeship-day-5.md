---
layout: posts
title: Small Steps
category: apprenticeship
---
### 8th Light Apprenticeship - Day 5

Today I saw an Apprentice become a Craftsman which was a great way to end my first week - Seeing someone else reach the goal that I have only just started working towards.

<!--break-->

I started my remaining story today. Reminding myself of the rules of TDD, I set about incrementally building up the game Tic Tac Toe. It was definitely a slow start. In the past I've always used Outside In, London style TDD to drill out the collaborators, verifying their interactions with mocks. Somehow I felt this wasn't what was expected so tried to think of other approaches. After talking to a couple of Craftsmen I had a few new ideas to try.

Currently I have a couple of higher level test that return whether the game has been 'Won' or 'Drawn', which led nicely to drilling out the functionality of the board containing the X's and O's. 

I'm still not sure how to write a test to force me to create a Player or a Prompt. I don't want the Game to expose these internals solely for test purposes. Something I'll ponder over the weekend, and if necessary ask on Monday... Perhaps when using a bottom up approach it's ok to start creating a Player or Prompt even if there is no higher level 'acceptance' test forcing it. I just can't help thinking that for more complex problems, creating lots of stand alone classes that don't interact until the very end could lead to waste such as the wrong API or unused classes. I'm willing to be proved wrong and to try new approaches.
