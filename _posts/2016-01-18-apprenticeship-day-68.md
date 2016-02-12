---
layout: posts
title: Ruby Minimax
category: apprenticeship
---

### 8th Light Apprenticeship - Day 68

The time had come to start the minimax algorithm in Ruby. I've now done it twice before, but it doesn't seem to get any easier. I could tell I wasn't looking forward to it, as I decided to do everything else in my iteration before starting it. To warm up, I paired with Priya on a Ruby Kata in preparation for our upcoming talk on effective pairing. However as soon as that I was done I got to work.

<!--break--> 

I spent the rest of the morning familiarising myself with the algorithm once again. I found a new [article](http://web.eecs.umich.edu/~akamil/teaching/sp03/minimax.pdf) online with some nice pseudo code so set about translating it in to Ruby.

Like before, I test drove the scoring mechanism, then wrote all the tests to show that a winning move would be taken by the maximising player, and that a blocking move would be made by the maximising player. 

After a few tweaks, all the tests that showed the winning move being taken were green. I felt surprised, and started to think, that perhaps this would go really smoothly. However the blocking scenario's did not cooperate quite so well. 

Whereas in Java, I stepped through the algorithm using the IDE debugger, I didn't know what the best way to debug in Ruby was. I felt under a bit of time pressure because it was the last day of the iteration, and we had planned a ten point iteration, despite there only being 8 points available (because of last weeks communication workshop). Therefore rather than researching debugging tools for Ruby and vim, I added lots of print statements to the code. This allowed me to see that all the correct game states were being generated. I could also see that the score was correctly calculated. It seemed the best move was not being set, and was being returned as nil in some cases.  

About 8 o'clock I decided to call it a day, so mentioned it to my mentor so that he was aware it had not been finished. Others joked there was still time to finish it before tomorrow morning, and that echoed in my head the whole walk home.. Perhaps I had not thought of something. Perhaps my customer would be really disappointed. I put a last few hours of effort in once home. Knowing my best work never occurs late into the evening, I tried to keep aware of the changes I was making. In the end a single '=' sign sorted the problem out, but meant the latests best move was chosen, so the solution was slower than I would have liked. 

At this point I felt it was best to switch to integrating the minimax player with the game. In hindsight I should have perhaps switched to this earlier in the day, when I got stuck, as it took longer than I thought and it was getting more tired.  In the end I got it integrated so felt pleased that I could demo to my mentor a solution that worked, all be it slow. 11pm I put it away, coverage had fallen by 1% (two left over unused methods were still in the code base), failing the continuous integration build, however I left it as it was. It would be useful to demo the story 'Integrate code coverage, which fails the build when < 100%'.
