---
layout: posts
title: The Pomodoro Technique
category: apprenticeship
---
### 8th Light Apprenticeship - Day 109

The Pomodoro Technique is a working method such that for every 25 minutes you work, you take a 5 minute break. I've tried it before, but have often felt that 25 minutes was too quick. Usually I was just getting into something then bam! The time was up! 

<!--break-->

Still today, suffering from the 8th Light London flu, I didn't want to burn myself out so stuck to the work-break routine. It worked better than it has in the past, probably because I needed the five minute break to top up on fluids and recuperate.

I completed the Clojure game loop yesterday, for my IPM which would have been today. However not being in the office, thus not having the IPM I decided to take another look through the code and do some refactoring rather than just delve in and extend the functionality further.

##### Pomodoro 1
I read through the code, and noted down all the area's I felt would benefit from refactoring. These were all small tasks, so I started with extracting out smaller functions in the game loop.

##### Pomodoro 2
I had noticed when looking at other Clojure code, authors had often aliased the required module then referred to all methods using this alias prefix.  e.g: `board/winning-line?` rather than just `winning-line?`. I felt this looked clearer, and asked whether this was considered idiomatic Clojure. The craftsmen voted for it, so I updated my codebase to use aliases when requiring from different modules.

##### Pomodoro 3
I renamed some modules and methods to be more descriptive, particularly in the writer and prompt where I had methods `win` and `draw`, which actually printed out a winning message or a draw message.  

##### Pomodoro 4
When I was playing the game to ensure all was hanging together, I realised that when an invalid input is provided, the board is not redrawn. This means if a user made several invalid attempts they may loose sight of the board (depending on how big their terminal window is). This pomodoro was therefore used to display the board after each invalid input was provided.

##### Pomodoro 5 - 8
Having looked through the prompt which validates user input, I realised I had some methods `numeric?` and `within-range?` which returned booleans, but additionally printed out some error messages to the console. As the name suggests only a boolean check, I decided to refactor to see if I could remove this hidden logic and make it more transparent.

This was the original code:

       (defn valid-next-move[board]
        (prompt-for-next-move)

        (let [input (read-input)]

         (if (and (numeric? input)
             (within-range? (zero-based (to-number input)) (indicies-of-free-spaces board)))
           (zero-based (to-number input))
           (valid-next-move board)
         )
       )
    )

I made the boolean methods adhere to single responsibility - i.e: They were updated to just return a boolean. Then I had to explicitly call the functions which printed out the custom error messages in the if loop. This resulted in negating the if condition and introducing a nested if loop.

At this point the code highlighted duplication, so I extracted out some common methods. However, but because the method is recursive, I was unable to move the recursive call out. This is because Clojure is a dynamic language, so it reads the file from top to bottom. This means if a method at the top of the file refers to a method that comes later in the file, it can not be seen, and the application will break at runtime. I was therefore in a chicken and egg situation. 

After another pomodoro break I looked at the code that I had ended up with:


     (defn valid-next-move[board]
       (writer/prompt-for-next-move)

      (let [input (reader/read-input)]

      (if (not-numeric input)
        (do
          (show-invalid-message writer/not-numeric-message board)
          (valid-next-move board)
          )

        (if (not-valid-space input board)
          (do
            (show-invalid-message writer/invalid-space-message board)
            (valid-next-move board)
            )
          (zero-based (to-number input))
          )
        )
      )
    )

I didn't like it. It looked clumsy, duplicated and was not very concise. I compared it again to what I had started with, and why I had wanted to change it. I felt my original reasons were valid, unexpected behaviour was being hidden under the guise of a boolean method. As a compromise (one big thing I've learnt on the apprenticeship is that everything is a trade off), I reverted my refactoring, then changed the names of the original boolean methods.

    (defn valid-next-move[board]
     (writer/prompt-for-next-move)

     (let [input (reader/read-input)]

      (if (and 
            (validate-input-is-numeric input board)
            (validate-input-is-within-range (zero-based (to-number input)) board))
        (zero-based (to-number input))
        (valid-next-move board)
       )))

Not exactly totally transparent that the `validate-input..` methods also print out an error message and display the board, but I felt the code in this state was far more concise and readable. 

I had also planned on introducing replay functionality, but I feel that will introduce the same concerns as just described for validation. For replay, the game loop is recursive, so to introduce the functionality, the base cases which usually break out of the game loop, would need to additionally prompt the user for their replay choice, validate it then potentially continue the game loop with a new board. Doable but I think I'll get feedback on the application first.

##### Pomodoro 9 - 10
Having learnt a lot from attempting the above refactoring I spent time writing this blog post and raising a new pull request. I feel the code is now in a good state to go on and add new functionality. As it happens, the next requirement is to introduce a computer player (non mini-max initially).

Will I be using pomodoro from now on? Probably not regularly whilst working alone and in good health. However I think it is a useful technique if you are finding it hard to focus or don't want to burn yourself out. 

I think it would be a useful technique to try when pairing, which tends to be more tiring and harder to coordinate breaks. Using pomodoro would keep those breaks in synch and allow each of the pair to re-energise regularly.