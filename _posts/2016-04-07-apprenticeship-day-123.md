---
layout: posts
title: The Last Clojure Story
category: apprenticeship
---
### 8th Light Apprenticeship - Day 123

In between the days I'm pairing, I have a few technical stories of my own to finish. Today I tackled the last story on the domain I've become so familiar with - tic tac toe.

<!--break--> 

I was to introduce the option to play computer vs computer, with a nice ux. That is, not just a way of showing the final game board (which is what it currently did). Instead, a user needed to be able to watch a game, automated move by automated move.

As I started this story, my initial instinct was to pass an interval time into the two computer players I had (random player and minimax players). The idea was this interval would determine the sleep time. This would mean, I could set it as 0 for tests and for the player combinations where a human was involved, where no delay was necessary. In the places I wanted a delay, I could pass a value such as 1000(ms) and delay the move.

             
       (defn choose-move [interval board]..
			...
			(Thread/sleep interval)
			...          

As I thought about this, I felt that it violated the LSP. In OO, the interface would be set in stone, and only a board would be able to be passed. Here, in my functional game, it didn't matter what the interface of each player was, because I passed the entire function around, rather than using polymorphism as in Java. Still, I explored some other options.

So as to not break the existing interface, I spiked the solution using multi-arity functions. 

     (defn choose-move ([board]
       (choose-move board 0))
       ([board interval]
       (Thread/sleep interval)
       (rand-nth (board/indicies-of-free-spaces board))))

This would allow existing code, where no interval was required to remain intact, as if called with just one parameter (board), the code delegates to the two-parameter version providing zero for the sleep interval. I could then directly invoke the two parameter version in the places I wanted a delay giving me some flexibility.

The downside I found with this approach was in the testing. When configuring the map of players, I would need to provide a partial function, or an anonymous function, which can not be compared using equality. I wouldn't be able to compare the function looked up from the player map with the expected partial function declared in my test. This is because anonymous functions all have a unique id so are never equal, even though both look the same in terms of functionality.

The concept of the decorator pattern then came to mind. Essentially I wanted to execute the functionality in the underlying player, but 'decorate' it with a delay. 

I had a quick chat with Danny. I had lots of solution ideas, but I wanted to know whether these approaches were idiomatic in a functional language. Whilst chatting to him, I realised that I could actually have another player type `delayed-player` who would be responsible for the sleep, and would then invoke the original player, mimicking the decorator pattern.

In terms of testing, I wasn't sure how to check that the Thread/sleep method had been invoked. I knew that in OO I would put the Thread/sleep in it's own function, which I would override for testing. In Clojure, I could have stubbed the Thread/sleep in a method using `with-redefs` but in my last IPM we had talked about why stubbing methods in the module under test creates a fragile test. Danny explained how I could use dynamic bindings to assist with the testing. This would allow me to override the method containing the Thread/sleep rather than passing it in. This meant in the real production code the binding containing the sleep could be used, but in test, I could override the sleep method to be a custom defined method which could feedback that it had been invoked.

        (def ^:dynamic sleep #(Thread/sleep %))

        (defn delayed-move [interval player board]
          (sleep interval)
          (player board))

This sounded useful and I set about using this solution. It was trickier than I thought to prove my 'fake' sleep method had been invoked. My first attempt involved the overriding function throwing an exception and the test checking that an exception had been thrown. This proved that the function had been invoked, yet I felt it was confusing I was using an exception, deemed negative, to test a positive case.

After some further thought I realised I could have my overriding function print a message to an output stream, then I could check the output stream had a certain value in it from the test. This felt cleaner.

         (defn prove-execution[msg]
            (print "Has executed from" msg))

            (it "Executes another function when making a delayed move"
   	                (binding [delayed-player/sleep prove-execution]
   	                (should= "Has executed from delayed-move test"
   	                (with-out-str
   	                   (delayed-move "delayed-move test" fake-player [X O X X X O O nil O])))))

To integrate this functionality into the game, each computer player needed to have a `def` which would call the delayed player with the interval and its original `choose-move` method.
               
                  (def delayed-unbeatable-move
                    (partial delayed-player/delayed-move 1000 (partial choose-move)))

This meant, when configuring the player map, the delayed players were not using the same interface as the others (`choose-move` vs `delayed-random-move`), which brought me back full circle to my original concern of violating LSP.
 
                 (= game-option player-options/unbeatable-random-id) (setup-players minimax-player/delayed-unbeatable-move random-player/delayed-random-move)
                 (= game-option player-options/random-random-id) (setup-players random-player/delayed-random-move random-player/delayed-random-move ) 

I checked again that this was deemed idiomatic and Danny thought it did feel functional. This has shown me that you can write more flexible code in a functional environment because you don't have strict typing and interfaces to adhere to. You can simply pass around entire (or partial) functions and execute them when appropriate regardless of what they are or how they were setup.

Watching an automated game, I felt a sense of achievement. Each move `magically` appears and is displayed and I made it all happen. In a functional language.

As I raise, what could be my last Clojure Tic Tac Toe pull request it seems a little sad. I feel I'm saying goodbye to a domain I've become so familiar with over the last six months. I know the journey is far from complete, and there is lots more to learn, particularly on real projects out in the client world, but I've loved spending my apprenticeship days focusing entirely on my technical skills and improving on what I really enjoy - writing clean code. Long may it continue.