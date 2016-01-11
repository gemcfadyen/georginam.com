---
layout: posts
title: Ruby Tic Tac Toe
---

### 8th Light Apprenticeship - Day 63

As I am not very familiar with Ruby, I started my tic tac toe using a bottom up approach, the complete opposite to how I started the Java implementation. I decided to start with the Board. I chose this object because I didn't know how to read and write input to the command line, and it seems the Board is the only object that does not need to do this.

<!--break--> 

So that I explore different aspects of design, I want to use an immutable board, again this contrasts to what I did in the Java implementation. I have achieved this in one sense, but not in another. I have a test that checks that the grid has a different object_id after it has been updated, showing it is not the same object. However I am re-assigning the object internally. For some reason I don't think it is the best way to achieve immutability, as the reference is being mutated, something I'll go through in my IPM later in the week.

Once the board was working I looked into how to read and write to the console. I found that `puts` does the writing and `gets.chomp` does the reading. In fact, I have been using `puts` a lot, to print out, debug and experiment with my Ruby code. I just didn't realise it was the same thing.

I found a great [article](http://www.getlaura.com/how-to-test-ruby-io/) which goes through how to mock the input and output for test. I have now completed the writing side of the prompt, but still have a number of other classes to put in place to allow the game to be played.

It seems I underestimated the HvH story in Ruby. I've spent 3 points on it, (originally it was estimated at 4.25) and have only got through two classes. Also, I think there may be some updates after the IPM around the immutable board. As we are out at a team communications workshop tomorrow, I don't think there will be a full game to demo at the next IPM, but have set my customers expectation so there are no surprises. 

On an up note, so far I can see that in Ruby, it takes less lines of code to achieve the same result in Java. I am hoping that once the board is extended to 4x4 in future iterations, I may see a performance gain. Let's see when I get there. For now, I am trying to keep the design simple, mainly because I only know the simple bits of Ruby so far.








