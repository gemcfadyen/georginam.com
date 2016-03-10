---
layout: posts
title: Clojure Data Structures
category: apprenticeship
---
### 8th Light Apprenticeship - Day 106

The board needs to be represented by an underlying data structure. The two that came to mind as potential candidates in Clojure were `Vector` and `List`. I took a few moments to read what each could offer.

<!--break--> 

A [vector](http://clojure.github.io/clojure/clojure.core-api.html#clojure.core/vector) is like an array, and is zero indexed. Items are added to the end of the vector, and can be retrieved using a particular index `(get [1 2 3] 0)`.
It can contain a mix of types, and be destructured `[first second third fourth...]`. 

A [List](http://clojure.github.io/clojure/clojure.core-api.html#clojure.core/list) sounded similar. To look up an item you use the nth method: `(nth [1 2 3] 0)`. This is however slower than a vector get, because when using a list, Clojure needs to traverse n elements before finding the one of interest, rather than directly looking up a given index, which is what happens in a vector.  Another differences is that when adding items to a list, they are added to the front.

During my reading I came across a guideline on [Clojure for the Brave](http://www.braveclojure.com/do-things/#Vectors):

      A good rule of thumb is that if you need to easily add items to the beginning of a sequence or if you’re writing a macro, you should use a list. Otherwise, you should use a vector. 

So the decision was easy. A vector will model my board, plus I have my eye on the method `subvec`. This might be handy when splitting my board up into rows for displaying.

The next puzzle was how to keep track of the board state. Functional languages are deemed immutable, and namespaces don't keep state. The usual member variable seen in static and dynamic languages was out of the equation. The only alternative I could see was to always pass the board into the methods to query it's state. This felt a little strange, as the data structure will be exposed throughout the game. I looked up other Clojure projects in GitHub, and came across a stateless bank account implementation and a stateless tamagotchi implementation. Here I could see that the data structures were always passed around. I checked with Jim and he confirmed it was the right idea. He gave me a nice quote which I am keeping in mind:

     "In OO we pass around objects, but in functional we pass around data."


