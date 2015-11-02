---
layout: posts
title: Single Point of Change
---
### 8th Light Apprenticeship - Day 21

It's amazing how much you forget in a week. Having used Eclipse during last week's training course, I could not remember the shortcuts I had previously learned for IntelliJ. Luckily I still had my cheat sheet so resurrected it to refresh my memory. 

<!--break-->

Today's focus was to improve the user experience in my tic tac toe game. My first goal was to refamiliarise myself with my own code and make the grid one indexed based rather than zero indexed based. I went around in many circles. First I simply updated the HumanPlayer (to minus one of the number they entered), and the Prompt class (to add one to each position of the grid when displaying). Everything worked, however I felt the updates were in the wrong place. My reasoning was, if the underlying grid changed such that we didn't need to adapt the input, then two different classes, outside of the grid, would need to change. This felt like solution sprawl.

I wanted to have a single area of change, so introduced the concept of an offset. Now each cell that makes up the grid has an offset as well as a symbol (X, O, VACANT). I'm not 100% happy as although the user experience is a lot better, the code is a little bit more complex. There are still quite a few +/- 1's in different methods of Board, which could be confusing. All the offset calculations are however in the same class which was an improvement to my first attempt. In case there is a simpler solution I've raised a pull request, so any feedback is welcome.


