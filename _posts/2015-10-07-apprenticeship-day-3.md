---
layout: posts
title: Trade-offs
---
### 8th Light Apprenticeship - Day 3

Yesterday afternoon I started my first coding task at 8th Light. My aim is to perform the RomanNumerals kata at 'waza', 8th Light's afternoon dedicated to learning. Whilst I was not apprehensive about the kata, as I'm familiar with the problem, I found it harder than I originally anticipated. 

<!--break-->

I started small converting the simple cases (1 => I, 5 => V, 10 => X...). Quickly progressed onto the simple additions (2 => II, 20 => XX...) and ended the day attempting the special cases (4 => IV, 9 => IX..). I didn't manage to complete the implementation of the kata by the time I left the office, but did spend my evening thinking about the problem, such that by mid morning today I had the functionality working.

I wasn't however very pleased with the code. Despite some refactoring, my solution contained several loops, including one nested loop. Remembering this is a kata I need to perform in under ten minutes, I felt that I needed a more consise solution, and that I had perhaps over complicated the solution.

I would have said I'm quite good at writing 'Clean Code', however I knew that if I were to give my solution to another developer to pick up, they would probably struggle. I had struggled to name various sections of the algorithm. Plus the aformentioned loops were playing on my mind. Time to reach out for a review.

Calling on one of my mentors, I explained my concerns and together we proposed another solution to try. Rather than using an algorithm to calculate the special cases (which is where most of the 'ugly' logic lay), why not make them part of the lookup table for the simple cases.  I had felt this was perhaps a cheat, perhaps a hard-coded solution, however what [Enrique](https://twitter.com/ecomba) pointed out was that there are only six special cases. Did these six cases really justify fifty lines of complex code. I was sold. The trade off seemed worth it, so having implemented this improvement, the size of the class has reduced by almost 50%, and I can go home happier.

- [Roman Numeral Kata](http://codingdojo.org/cgi-bin/index.pl?KataRomanNumerals)
- [Roman Numeral Logic ](http://agilekatas.co.uk/katas/romannumerals-kata)
- [My Solution](https://github.com/gemcfadyen/Apprenticeship-RomanNumerals)
