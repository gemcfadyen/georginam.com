---
layout: posts
title: Coin Changer Presentation
category: apprenticeship
---
### 8th Light Apprenticeship - Day 127

On Friday, another apprentice performed the bowling game kata. When she got feedback afterwards I listened carefully as I knew I would be performing a kata this week, so I figured I could pick up some tips.

<!--break--> 

One of the points mentioned was that the music she performed to, wasn't of any context of the kata. 

Whilst it might be hard to find appropriate music for some katas (maybe Pascal's triangle for example), I had chosen to perform the coin changer kata.  Last night I was googling for 'money songs' and came up with a playlist of three which I felt were appropriate 

    -  Aloe Blacc 'I need a Dollar'
    -  Jessie J 'Price Tag'
    -  Sam Smith 'Money on My Mind' (although we never got to the last song, I performed it too fast).

I had practised my refactoring steps so was not as nervous as I had been previously. Still, anything can happen, and at one point my test was still failing after I had done the refactoring step. Staying calm and mentally stepping through the code allowed me to spot my mistake, so other than spoiling the flow for the spectators, there was no real harm done.

The feedback afterwards was useful. Rather than iterating through the coins by index, I could just loop through the coins themselves, removing the need for the index. This read nicely:

           COINS.each do |coin|
             while (amount >= coin)
                amount -= coin
                change << coin
             end
            end
            change.sort

I found out to take this further, the [Enurable.reduce](http://ruby-doc.org/core-2.1.0/Enumerable.html#method-i-reduce) method can be used. This is often appropriate when there is iteration through a collection, where you are forming another one and returning it.

By using reduce, it eliminates the need for a local variable. As reduce returns a value (in this example, the change variable, which is initialised to [] in the original reduce method), Ruby will return it back to the calling code, as it is the last line in the method. 

The reduce setup reminded me a little of loop recur blocks in Clojure, where each iteration a new value is given for the loop variables.


        COINS.reduce([]) do |change, coin|
          while (amount >= coin)
            amount -= coin
            change << coin
          end
         change
        end.sort


Other than the 'I need a dollar' song being stuck in my head all morning, it ended up being a successful presentation, with some nice improvement points to implement too.

