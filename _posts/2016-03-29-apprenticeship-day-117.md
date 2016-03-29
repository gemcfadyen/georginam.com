---
layout: posts
title: Separation of Concerns
category: apprenticeship
---
### 8th Light Apprenticeship - Day 117

During my IPM I explained how I implemented the replay functionality. Jim pointed out that I could still have my polite 'Thanks for playing' message if I just pushed it up a level, so that it was outside of the recursive functions. 

<!--break--> 

I pointed out the duplication between the `start` method and the `play-move` method when replay is selected.

The extract from `play-move` is:

     (play-move [..]
        ....
      (if (game-over? updated-board)
          (if (replay?)
            (play-move (empty-board) (get-players))))))


And the extract from the `start` method:

      (defn start[]
         (play-move (empty-board) (get-players)))

First, Jim noticed that the `play-move	` was mis-named. As the function was recursive, it was playing an entire game and also asking if you wanted to replay, which would set off the recursion again. It also recursed to make each move, so it was doing a bit much.

He suggested splitting the method so that the game-setup was distinct from the game play. As I saw it, by splitting, the methods I had would become smaller and adhere better to the single responsibility principle.

Now, I have a start method which simply invokes `play-game`, and when play is over, outputs a polite good-bye message.

`play-game` now sets up the empty board and the gets the player choice, hands this off to `play-move`, then once a game is complete, prompts for replay, and recurses if replay is selected.

`play-move` now plays each move of the game and when the game is over it just returns rather than controlling the replay. 

This also allowed me to simplify some of the unit tests I had. I could target which functionality I wanted to test, and could stub out the other methods entirely. I like the improvements that splitting the methods have brought.

As a bonus I implemented Clojure tail recursion in the `play-move` method. Looking at examples, it seems that you need to start the recursion loop passing in the data that will change each time. In my case, this seemed to be the board, as it gets updated with a new move each iteration. Each time the loop recur's I update the board, and the state is queried for win/draw, otherwise recurses again.

     (defn play-move [board players]
         (let [next-mark (mark-of-next-player board)
          updated-board (update-board-with-move players board next-mark)]

         (loop [updated-board updated-board]

          (if (game-over? updated-board)
            (announce-result updated-board)
          (recur (update-board-with-move players updated-board (mark-of-next-player updated-board)))))))

Once again, I felt that this introduced some duplication, as the `recur` condition matches that in the `let` block. I tried moving the `let` block into the the loop, but I found it didn't actually get evaluated when it was inside.

Some of the points seem like obvious cleanups now that they have been pointed out. Sometimes you work so closely on a code base you fail to spot some of the tidy-ups that are required. On client site, this is where reviews and pairing is very important. Talking of which, tomorrow I'm off to client site to start my pairing tour. It will be a very interesting day as it is their go-live! Quite a change from my Clojure tic tac toe!

