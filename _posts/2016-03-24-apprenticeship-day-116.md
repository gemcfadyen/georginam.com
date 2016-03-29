---
layout: posts
title: Replay Functionality
category: apprenticeship
---
### 8th Light Apprenticeship - Day 116

Of all the tic tac toe games I have written (I think I'm on my 5th), the replay functionality has been the most difficult to add to the Clojure version.

<!--break--> 

The original recursive game loop in my Clojure game looked like the following:

          (defn play-move [board players]
              (let [next-mark (marks/next-mark board)
                    updated-board (play-single-move players board next-mark)]
            
               (cond
                (has-win? updated-board) (announce-win updated-board)
                (no-free-spaces? updated-board) (announce-draw updated-board)
               :else
                (play-move updated-board players)
          )))


My first idea was to add the replay prompt to each of the base cases. This would mean the user would be asked to replay if they had won a game, or if the game was a draw.

As I thought further about this, I went off the idea. The current functions `announce-win` and `announce-draw` already had a couple of responsibilities - to display the board and display a winning/draw message. I felt that adding replay functionality in there would be unexpected for any future developer of my game. Additionally having the replay prompted from two places would be a form of duplication.

I thought of some alternative solutions. Rather than prompting in each base case, I wondered if the prompt could be after the recursive call. I had always thought of the recursive function call as the end of the method, but in fact, once the recursion has completed, the replay prompt could be displayed, and the `play-move` function started again if replay was selected.

To start off with I added a let block which prompted the user for their replay choice. I then started the recursion again, with an empty board and their choice of players. 

This was very similar to the function `start` which is invoked from the main method.

               (defn start[]
                  (let [player-choice (prompt/get-valid-player-option)
                      board (empty-board)]
                     (play-move board (players/configure-players player-choice))))

My instinct was to extract this into a function which could be called from the two places. Unfortunately due to the fact that Clojure is a dynamic language this wasn't possible in the `play-move` function. This is because all functions need to be declared upfront of their use. When there is a recursive call, it can not be extracted into a different method, as both functions need to reference each other. There would always be one function that could not be 'seen' by the other.

I do therefore have a bit of duplication between the start method and the play-move method. To combat it as far as possible, I extracted smaller functions. The final version of the play-move method is therefore:

     (defn play-move [board players]
     (let [next-mark (marks/next-mark board)
        updated-board (play-single-move players board next-mark)]
     (cond
       (has-win? updated-board) (announce-win updated-board)
       (no-free-spaces? updated-board) (announce-draw updated-board)
      :else
       (play-move updated-board players)
      )

    (if (game-over? updated-board)
      (if (replay?)
         (play-move (empty-board) (get-players))))))

And the start method:

         (defn start[]
            (play-move (empty-board) (get-players)))

Another draw back of the recursive approach, is that if you select to end the game, the stacks unwind. This means, if you displayed a message such as `Thanks for playing, good bye!`, it would show multiple times, one for each stack. My work around here was to remove the exit message. After all, it was only put in because I'm a polite Brit :-)