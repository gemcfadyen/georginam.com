---
layout: posts
title: Mocking I/O in Clojure
category: apprenticeship
---
### 8th Light Apprenticeship - Day 105

Today I started implementing tic tac toe in Clojure. I don't feel I know much about the language, and I feel like I have been away from the tic tac toe domain for a few weeks, so I wrote a list of the collaborators I felt I might need, so that I could choose a starting point.

<!--break--> 

Usually when implementing the game with a new language I start with the board. This time, I decided to start with the input reader and writer. This is because I felt the board could be represented by one of Clojure's data structures, however I wasn't sure how to use, or test the I/O.

A quick look at the [speclj tutorial](http://speclj.com/tutorial/step5#ch7) showed how to mock out the input and output stream for tests. This worked nicely and allowed me to drill out a `Reader` and `Writer` group of methods, which I then wanted to bring together in a `Prompt`.

This is where it got interesting.  The prompt needed to use the functionality within the Reader and Writer namespaces. To import a file so that it can be used, `:require` can be used. I added this to my 'prod' file, but it turns out it additionally needs to be added to the spec file.

Clojure offers the ability to stub out a method body for tests using the [with-redefs](https://clojuredocs.org/clojure.core/with-redefs). 

          (with-redefs [method-whose-body-to-mock (fn [] "return val")]
             (should= "some-val" (method-under-test))
          )
          
At first this worked nicely, until I wanted to provide multiple inputs, in order to prove that a user would be reprompted if they provided a non-numeric input. I experimented a little, but the result always seemed to be an infinite loop. I decided to try running the prompt in the repl to check that the input was being read. It turned out that in the repl, an infinite loop was also taking place. It was as though the I/O in Clojure was not blocking.

After checking that Clojure should indeed block when waiting for input, I got a couple of craftsmen to check my code - which looked like below: 
 
          (defn valid-next-move[]
           (prompt-for-next-move)
           (try
             (Integer/parseInt read-input)
            (catch Exception e
                (invalid-input)
                (valid-next-move)
             )
           ))
           
After a few moments there was a Eureka moment from one of them. The function `read-input` was not being called, because I had forgotten the brackets. This meant the code was trying to cast a function definition to an Integer (which always failed), thus the function was just being recursively called. Once I changed the code to include the brackets, thus actually executing the read functionality, the command line blocked as expected.

       (defn valid-next-move[]
        (prompt-for-next-move)
         (try
           (Integer/parseInt (read-input))
          (catch Exception e
           (invalid-input)
           (valid-next-move)
          )       
         ))
         
This was great, however now none of the tests worked. I removed the `with-redefs` and instead mocked the input using  `with-in-str`. This allowed me to mimic several inputs being provided by the user, simply by providing a string of values separated by "\n". Now the tests are green, I can move onto the board implementation.

### Useful Links

[Speclj tutorial](http://speclj.com/tutorial/step7)

[Stubbing IO in Clojure](http://emmanuelsanmiguel.com/stubbing-functions-in-clojure/)

[with-redefs](http://mikeknep.com/2014/05/01/speclj-with-redefs-and-should-invoke.html)

[Mocking functions in clojure](http://meaganwaller.com/index.php/2014/03/26/mocking-functions-in-clojure/)

[Mocking input in Clojure](http://mikeebert.tumblr.com/post/32243344470/mocking-input-in-clojure-thanks-colin)