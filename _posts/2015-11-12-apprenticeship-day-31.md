---
layout: posts
title: Minimax
---
### 8th Light Apprenticeship - Day 31

Thursday was minimax day. Having started the scoring on Tuesday, then being out at the client yesterday, I had the feeling I was putting the innard workings of the minimax algorithm off. So Thursday was the day to jump right in. 

<!--break--> 

As its a well known algorithm, which would not be easy to get to through traditional TDD, I took a different approach and wrote all the blocking and winning test scenario's up front. At first it was a sea of orange, but I knew, that once complete, they should all turn to green.

I started looking over the Wikipedia pseudo code. It brought back memories of the submission I had made during the recruitment process. I think because of the recursion, it puts a little bit of dread inside of me. Anyway fighting those feelings, I knew I had done it before, so I could do it again.

I remembered that during my submission I had not been able to get the wikipedia version of the pseudo code running correctly in java. The only way I managed it then, was to hold a list of scores for every frame, then at the end, look for the max score from this list (if it is the turn of the maximising player), or the min score (if its the turn of the minimising player). I gave the Wikipedia version another go, but once again it didn't work. After a couple of hours, I resorted to implementing it using the same list approach, and my tests turned green.

Earlier in the day Mael had mentioned she wanted to pair, and has the same task on her horizon so we decided to join forces on the Wikipedia version. I realised that although I understood the algorithm and it's intent, I wasn't 100% clear about the score being passed up frame by frame. It is always at this point during the debugging that I loose track of where I am in the tree, and that is where those dread feelings come from. If something is wrong in a recursive algorithm, I tend to find it really difficult to debug. Mael had a good system of drawing out the different states, and marking the moves and scores, something which I'll use again next time.

We reorganised the code, reducing the loop for the max player and the loop for the min player down to one. A few more tests went green. Cue more drawings of little 3x3 grids. Just as Felipe was going home, he got interested in what we were doing and spotted that we were re-initialising the 'bestScore' variable each time we started a new tree. This meant, we were overwriting the score found in the previous path each time. He took a quick look at the version I had got working this morning and gave the most helpful tip. That version worked, so why not refactor that to remove the list (which was the main point of trying to get the Wikipedia version going). 
It was easier going from a green copy of the code, and it only took us about 5 mins to do the refactor. 

All seemed to work, so Mael and I celebrated with a beer.

On a side note, we made another discovery this eve. We had popcorn for dinner, and when mixed with dried strawberry's, the sweet and salty combination is delicious. Just shows that when you are brave enough to try new things, even things you don't think will work, good things can happen.


[Wikipedia on Minimax](https://en.wikipedia.org/wiki/Minimax)

[Minimax implementation using list approach](http://neverstopbuilding.com/minimax)