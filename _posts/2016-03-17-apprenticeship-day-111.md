---
layout: posts
title: The Player Factory
category: apprenticeship
---
### 8th Light Apprenticeship - Day 111

Today I introduced a player concept into my Clojure tic tac toe. I was still only working with Human vs Human, however I wanted all the building blocks in place, so that introducing the random computer player afterwards would be relatively easy. 

<!--break-->

Because each player type will have it's own way of choosing a move I knew I needed an agnostic way to refer to different players. Being a functional language, there are no interfaces so I came up with the idea of storing a function (which knows how to choose the next move) against a player mark (X/O).

This resulted in a map containing two lambdas. As the player type at this point is 'Human vs Human', each mark is associated with the human modules `choose-move` function:

     (def human-human
        { X #(human-player/choose-move %)
          O #(human-player/choose-move %) })

Because the choose-move function takes a board argument, which will be passed to it at runtime, I used the anonymous lambda notation.

When I came to test this setup I found it quite difficult. I wanted to assert that the function setup for X and O was the same, which I tried using the speclj assertion:

      (should-be-same 
                      (get human-human X))
                      (get human-human O))
                      
This didn't work, I think because the functions are essentially seen as anonymous, so get assigned different id's under the covers.  To get started, I omitted the test, as the map could be thought of as data, which wouldn't need to be tested, and I wanted to see what would evolve as I integrated the player concept into the game.

Once Human vs Human worked, I went to to TDD out the random player, and created another data map for this option:

       (def random-human
        { X #(random-player/choose-move %)
          O #(human-player/choose-move %)})
          
I then spiked the method which would act as the 'factory', which given the chosen player option, would return the correct map of player functions. This was so I could see if my tic tac toe could support different player types as expected.

        (defn configure-players [game-option]
         (cond
           (= game-option 1 human-human
           (= game-option 2 random-human
         )
        )

This worked, so I felt pleased I had found an agnostic way to incorporate different players. 

This last method had been spiked, so I knew I needed a way to test the logic here. I thought about what I had done in the past using Java and Ruby. When something is hard to test, usually I try to isolate it, and pass in a very simple fake implementation for testing. So I decided to invert the dependencies. 

As I couldn't test that the data maps had the right functions setup, I realised if I passed the maps of data in, I could test that the correct entry is looked up in a fake map, which for tests, just contained simple strings. This simplify the `configure-players` method down to the in built `get` function for maps.

     (defn configure-players [game-option player-move-map]
          (get player-move-map game-option)
        )
  
And for tests I provided a map containing a game-option to a fake player map.

    (def fake-player-move-map
     { 1 { X "player1" O "player2" }
    )

I could now test the `configure-players` method very easily:

     (should= "player1"
       (configure-players 1 fake-player-move-map)
     )

At this point I realised I was only really testing the in built `get` method, however having it wrapped in a `configure-players` function did provide some context.  Still, I did feel as though my test was missing the important part of the configuration, the actual maps with the functions in. Although they could be thought of as data, they still played an important part in the game, and I would want to know if they had been tampered with, ideally through a failing test rather than at runtime itself.

I asked Danny for an opinion and he liked the fact that I had configured lambdas, however he said that I didn't need to wrap them in an anonymous function. I could simply configure them player-mark to function name. I had originally thought, because the functions took a parameter which couldn't be provided at the time of declaration, that I needed to indicate this, but you don't:

      (def human-human
        { X human-player/choose-move
          O human-player/choose-move })

    (def random-human
        { X random-player/choose-move
          O human-player/choose-move })
 
This then allowed me to use the real maps in the unit test. No anonymous function id's would be generated so I was able to compare the function names. This also meant I didn't have to `inject` the map in anymore, as the data was simple to test as it was.

       (it "finds player configuration for human vs human"
        (let [human-human (configure-players 1)]
         (should= human-player/choose-move
            (get human-human X))
         (should= human-player/choose-move
            (get human-human O))))
            
This gave me greater confidence in the test coverage, and made the module look simpler. 