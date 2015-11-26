---
layout: posts
title: Pair Power
---
### 8th Light Apprenticeship - Day 39

Another apprentice, Priya, is going through the exercises I helped teach at a client a few weeks back. She had asked if I would pair with her. Having been neck deep in tic tac toe for over a week I was looking forward to helping out, knowing that taking a break from the current stories you are working on often helps clarify things in your mind.

<!--break--> 

Essentially the exercise was modelling a bank account, in which deposits could be made. She was almost there but had overcomplicated the interface slightly. I encouraged her to take a step back, to get the interface in alignment with what the exercise was asking. Once this was working, we wrote the next test. 

The test was to check each deposit was visible on the bank statement. She was asserting the following:

`assertEquals("Deposit: £1.00\nDeposit: £3.00\nTotal: £5.00");`

I encouraged her to use this assertion as the ultimate test, but to start small. We changed the assertion to:

`assertEquals("Deposit: £1.00");`

and got the test passing.

Next we updated the assertion to:

`assertEquals("Deposit: £1.00\nDeposit: £3.00");`

This meant that the program had to be changed to remember all the deposits that had been made in the past. I was able to prompt my pair to try to get her to realise that deposits needed to be stored in some sort of collection. 

First of all she realised she needed to remember the deposit made, so created a member variable, but this was overwritten each time a new deposit was made. By seeing the test fail, she was able to deduce that only the last deposit was being remembered, because the member variable was being reset each time. She then suggested using an array, which worked a treat.

Finally the assertion was updated to:

`assertEquals("Deposit: £1.00\nDeposit: £3.00\nTotal: £5.00");` 

This was the original assertion she had wanted to get working. There was already a method that calculated the balance as deposits were made, so it was simple to finish off.

The tests were green, so I suggested a few refactoring ideas to polish the code off. After extracting the functionality into a method which constructed all the deposit entries for the statement, the code was looking great.

On the flip side, Priya taught me a few new vim shortcuts:

`control-w L -> Jump to the right screen`

`control-w H -> Jump to the left screen`

`7 dd -> Delete 7 lines`

`d-i-( delete everything inside the brackets`

`yy copy a line`

`f c finds the first c on the line`

`x delete left to right`

I'll be trying them out as I start a new game, snakes and ladders this afternoon.