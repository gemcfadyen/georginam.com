---
layout: posts
title: 
category: apprenticeship
---
### 8th Light Apprenticeship - Day 112

During waza today I paired with Danny on Clojure. Together we built the game battleship, and we got suprisingly far.

<!--break-->

I got started whilst Danny was at a meeting, and implemented a function which returned true if the co-ordinate passed in was part of the ships location. 

On his return, Danny had some other ideas in mind. Rather than checking for boolean expressions, he suggested we just returned the data and the state it was in. e.g: { :submarine :hit } if the coordinate was in the list of locations for submarine, or { :submarine :sunk } if all the co-ordinates had now been 'guessed' for the submarine. If the coordinate was not a location of the boat, then { :submarine :untouched }.

This, he explained, was passing the data around rather than querying the data and making decisions based on it's state. When it came to displaying the data, the map of statuses was used to determine the output.

By pairing I was exposed to some new constructs.

          (if-let [shipname (find-ship guess ships)]
            [guess :hit shipname]
            [guess :miss]))
          )

An `if-let` evaluates the boolean expression (find-ship in the above example). If the expression is true, the first vector is created 
   
          [guess :hit shipnam]

and if the expression is false, the second vector is created:

           [guess :miss]

We used the `if-not` method which would negate the result of the boolean expression evaluated. Something I had been building up using (not (if ...)) in my own code.

            (if-not (some #{coord} guesses)
               ....

We included the `clojure.set` methods, so that set logic such as `union`could be applied to the data.

By the end of the afternoon, we had a working battleship game on a 2 x 2 board. This board contained two ships and a user could enter guesses, which would update the display to show whether a boat had been found or not.

There was no validation, or fancy graphics but we had a whole solution which could be extended in future. It was really good fun.
