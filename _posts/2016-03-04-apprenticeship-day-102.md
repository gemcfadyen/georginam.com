---
layout: posts
title: Clojure Koans
category: apprenticeship
---
### 8th Light Apprenticeship - Day 102

Clojure is a lisp dialect with a functional emphasis. The documentation states that it allows you to write expressive code.

<!--break--> 

It's fairly easy to install through leiningen. The Clojure compiler is a jar file (clojure.jar), which takes code written in Clojure and compiles it to JVM Byte code. This makes it a little slow when compiling. This makes it a hosted language, which relies on the jvm for features like threading and garbage collection.

Leiningen is actually a Clojure build tool. You can create a new Clojure project by doing 
 
             lein new app hello
             
This creates a new project with the name 'hello'. Because leiningen will be used to run this project, the structure it creates is what leiningen expects.

		| .gitignore
		| doc
		| 	| intro.md
		➊   | project.clj
		| README.md
		➋ | resources
		| src
		| | hello
		➌ | | | core.clj
		➍ | test
		| | hello
		| | | core_test.clj 
		
The file at (1) is a configuration file. In here you can configure dependencies and the entry point to the system for example.

(2) is where resources such as images would be stored

(3) is where the production source code would be stored  with the corresponding tests in (4).    

To run the program from it's entry point, you execute `lein run` from the root folder.

All lisps use prefix notation. The operator always comes first. For example, to check for equality
          
          = (2, 2)
And to add two numbers together:
          
          + (2, 2)  
            
Some types I've come across:

          \c is a character
          'c is a symbol
          "c" is a string
          
There are some useful helper methods. To concatenate strings together you can use:
          
          (string/join (", " 1 2 3)
          
Test for types:
           
           (string? "Hello") 
           (char? \c)

Calculate the length:
 
           (count "hello"))  //returns 5

Manipulate and query strings:

           (string/reverse "hi")                    
           (string/last-index-of "hello world" "hello")
           (string/blank? "")
           
Lists are defined by the symbol tick and brackets
 
           '(1 2 3)
           
You can get items from the list:

          (first '(1 2 3 4 5))  // returns 1
          (rest '(1 2 3 4 5))   // returns '(2 3 4 5)  
          (peek '(1 2 3))   // returns 1
          (pop '(1 2 3)) // returns '(2 3)
             

Vectors seem to be like an array:

          [:this :is :a :vector]
          
As well as the first and last elements, you can get the nth element

          nth [:peanut :butter :and :jelly] 3) //returns the element at index 3
          
Maps are immutable key value pairs:

            {1 "January" 2 "February"}

To add elements you create new map:
 
            (assoc {1 "January"} 2 "February")
            
To remove: 

            (dissoc {1 "January" 2 "February"} 2)

To lookup a key, you can use a map as a function:

            ({:a 1 :b 3} :a)  //returns 1
            
And  to find a value you can use the key as a function:

             (:a {:a 1 :b 3})
             
To get all (unsorted) keys:
        
             (keys {:a 1 :b 2 :c 3"})

To get all (unsorted) values:
   
             (values {:a 1 :b 2 :c 3})
             
###Useful links

[Brave Clojure](http://www.braveclojure.com/)

[Clojure Koans](https://github.com/functional-koans/clojure-koans)

[Lisp philosophy](http://web.archive.org/web/20060903034858/http://www.cs.indiana.edu/~tanaka/GEB/LP.txt)

[The language](http://clojure.org/reference/reader)