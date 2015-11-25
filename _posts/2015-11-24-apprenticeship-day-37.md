---
layout: posts
title: Weekly Review
---
### 8th Light Apprenticeship - Day 37

Today's IPM was really good. I showed my 4x4 board, and although it was a little slow to make the 5th move in the grid , when minimax kicks in, I'm pleased to say it was accepted. 

<!--break--> 

We talked about ways to further improve performance. For the design I have, when establishing whether there is a winning line, the grid is traversed. If there is a winner, it is traversed again to find the winning symbol. If this traversal happened only once, it is thought the performance would improve.

For larger grids, it has been known for developers to pre-calculate all the possible combinations up front and store them in a database. when the game is played, you can simply lookup what the best move is from the relevant table. Quite an overhead, but necessary if required!

The other feedback I had was how I calculate the maximum depth to search. I deduced that for a 3x3 grid, you need only search to a depth of 6 to find the best move (as that is deep enough to spot the forking formations). For 4x4 grid, you need only search to a depth of 8. I am always looking for patterns to try to generalise the solution, so I realised that the maximum depth was 2 * dimension. During the review however it was pointed out that a sample size of 2 is not large enough to spot a pattern. As this is an optimisation for the 4x4 case, it is actually better to hard code it and name it clearly as an optimisation, so that if the grid was expanded again, it would be clear this was a field that would need analysis for updating.

My gui spike got really good feedback too. I had managed to effectively split out the JavaFX functionality from the 'business logic' which could be TDD'd. Jim even mentioned that my solution would have been the same approach as he would have taken. I will need to do one end to end test (sunny day scenario), which I am not clear upon yet, however I hope as I progress through the task I will get a eureka moment and it will all become clear.

Finally today I started using vim when coding. I feel somewhat impeded at the moment, especially as this iteration adds up to over ten points, but I have not switched the plugin off yet. Just like the challenges I'm coding, I want to crack vim, then I'll be a proper developer ;-)