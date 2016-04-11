---
layout: posts
title: Ruby Recap
category: apprenticeship
---
### 8th Light Apprenticeship - Day 124

Since I've spent the last month doing Clojure, I had a story to spend a day or so refreshing my memory on Ruby. It felt a little alien setting up a new Ruby project, but it went fairly smoothly and all the shortcuts for running tests still worked.

<!--break--> 

I decided to try to the coin changer kata. The idea is that I will perform it next week.

I got started with the obvious test cases - returning 1 when asked to change 1p, returning 2 when asked to change 2p. I realised at this point, I could just return the original amount that was passed in.

When introducing the harder test cases, which involved multiple coins being returned, I knew I wanted to introduce a loop, so I made all the `if` clauses look similar, to form a pattern.

By this point, I had one if statement that returned the original amount if an exact coin was found. It had taken me 5 if statements to get the pattern formed for the other cases. To refactor to a loop at this point seemed drawn out and harder than it should be. I wanted a more concise set of steps for the performance.

I started the kata again, and this time, instead of just returning the amount for the cases were exact coins are matched, I introduced conditionals. Once I had three, I refactored by extracting the coins into an array, and forming a loop which returned the change.  Introducing the more complex cases was then straight forward small changes, as most of the algorithm was already drilled out.  This showed me that it doesn't pay off to try to be too smart up front.

During waza, Rabea and I did the [Pascal Triangle](http://rosettacode.org/wiki/Pascal%27s_triangle) in Ruby. I couldn't help thinking that the solution would lend itself better to Clojure, or another functional language as I felt I could easily see it's recursive nature and identify the base cases. Whilst I wouldn't say I'm at the stage where I would write everything functional by default, I was glad that I could spot a problem which I felt would fit well with a different language paradigm.