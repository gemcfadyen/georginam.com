---
layout: posts
title: Unbeatable
category: apprenticeship
---
### 8th Light Apprenticeship - Day 32

Integrating the minimax algorithm written yesterday into the game was relatively straight forward. I had prepared a test upfront to prove that the unbeatable player was indeed unbeatable and am pleased to announce it passed.

<!--break--> 

I've been able to spot large chunks of duplication fairly easily in the last few weeks, and now I've started to be able to spot the more subtle duplication. I noticed that the functionality of finding the opponent of a player was something that was happening in a couple of places. I extracted this out into a static method in the PlayerSymbol enum and that is now referenced each time I need the opponents symbol.

When the unbeatable player takes the opening move I could see a slight delay in the console. This is because the first move has the largest graph to explore to determine the best move. As I had capacity, I added alpha beta pruning which sped up the decision making, improving the user interface. It also sped up my 'unbeatable' test.

As the code base is getting larger, I've introduced packages. I divided the files up as to what I think seems appropriate. I've been reading about package principles this week, so I'll check against them over the weekend to see how close I was.

Leaving for the weekend this Friday feels a lot calmer than last week, when I was battling the validation duplication. I'm enjoying this feeling for the moment. Each new week has new challenges to face, so you never know what is around the corner. Tomorrow I'm helping with the Global Day of Code Retreat, so another chance to practise my coaching skills, which will be useful on Monday when I'm back on client site.



