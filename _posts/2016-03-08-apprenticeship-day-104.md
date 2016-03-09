---
layout: posts
title: Tail Recursion in Clojure
category: apprenticeship
---
### 8th Light Apprenticeship - Day 104


I had a vague recollection that tail recursion was more efficient than 'normal' recursion, but I couldn't quite remember what the definition of tail recursion was. 

<!--break--> 

A quick online search reminded me that in tail recursion, the recursive call is the very last thing in the function. After recursing it does not need to add any variables together or do further processing, thus you don't have to consume any stack space.

I looked back at my roman numerals solution and was pleased to see that I had used tail recursion. However, I went on to learn t hat in Clojure, tail recursion needs to be specified slightly differently, using `loop` and `recur`.

Taking factorial as an example, to use tail recursion, you first state the loop syntax, providing a mapping of the variables (and their starting values) to be used within the recursive loop scope.

As in usual recursion, you provide a base case. Here we can use 1, and return the total accumulated so far. When the base case is not met, we can use the recur keyword, and provide the new values to pass back into the loop.  Only then will Clojure understand that tail recursion is to be used, and the stack space saved.

      (defn factorial [n]
         (loop [total 1 number n]
           (if (= 1 number)
              total
         (recur (* number total) (dec number))))
       )
