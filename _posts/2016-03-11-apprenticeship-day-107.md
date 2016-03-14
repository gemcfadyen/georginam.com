---
layout: posts
title: Querying A Vector For A Value 
category: apprenticeship
---
### 8th Light Apprenticeship - Day 107

I remember when I was doing my java tic tac toe, I went on a mission to eliminate duplication within the bodies of loops when validating the user input. 

<!--break--> 

This was because each category of 'bad' user input  needed to have a custom error message, and there were several different categories such as 
- was the input given a number
- was the input given within range
- was the input given the index of a free cell in the board?


In Clojure it was actually easier to give each category of input invalidation it's own error message, rather than use a blanket "Input invalid". So what did I do differently?

Firstly I had less checks. Rather than checking if the number was within the boundary of the board, I just had the board functions return me the vacant cells. This way, if the input was a number, but that number was not in this list, I knew it was invalid straight away.

One of the the Clojure quirks occurs when trying to establish if there is a given value in the board. For example, does the list of free spaces contain 1? 
You would imagine there would be some sort of `contains?` or `includes` function.

There is, however it doesn't work as you imagine it.

`contains?` works on a map and looks for a match on the key. If you pass a vector, the keys are numerical, so contains is looking for a key of 1, not a value in the vector of 1. 

     tic-tac-toe.ttt=> (contains? [2 3 4] 1)
                        true
                        

     tic-tac-toe.ttt=> (contains? [2 3 4] 4)
                       false
     
     
To work around this with vectors, there is a helper method `some`. This returns true, if the collection contains the value under consideration, but nil if it does not. This took me by surprise, as intuitively I expected true and false as return values. To work around this, within my board namespace I translate the result of `some` to a `boolean`, so that any client does not have to check for nil. 

          (if (boolean (some #(= provided-index %) spaces-on-board))
            true
            (false-and-publish-error-message)
          )




