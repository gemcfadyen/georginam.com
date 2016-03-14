---
layout: posts
title: Stubs in Speclj
category: apprenticeship
---
### 8th Light Apprenticeship - Day 108

Over the weekend I took a total break from working, so bar a couple of Clojure dreams, and falling ill (typical!), I was all set to start working on the game loop of tic tac toe this morning.

<!--break--> 

Last week I had attempted to get the mocking mechanism `with-redefs` working. I had another stab at it today. It turns out, you can place them in the `(around [it])` block, which acts a little like the JUnit @Before annotation. This got me started, but after a few tests I really wanted to have each test case setup the data it needed. I felt this would make it easier for another developer to read the test case and understand what it was doing.

So that the console did not get polluted with board displays during the unit test, I redirected the out stream to a string using `(with-out-str)`. I ended up in a position that, when redirecting, a couple of tests would fail, but without redirecting, they would all pass. I thought perhaps I didn't need it, so removed some logic from the production code to ensure I would get a test failure, but all the tests still (incorrectly) passed. 

Puzzled, I figured that something in the output stream was required by a step in the tests, and by redirecting it, the test was not getting what it required.

I played around for a little while, but there seems to be little documentation on how to setup more complex mocks in specklj.

Luckily Danny was in the office who able to offer some tips. He suggested that I created stubs, then used the `should-have-invoked` verifier to check that stub had been called. This also allowed me to format the tests cases in a more standard layout - Arrange Act Assert.

This way I could setup the return value for the method that asks for user input. I simply returned a predefined value which would cause the game to draw, or win. For other tests cases, where I wanted to mimic the players taking turns, I used the `with-str-in` and provided the input separated by `\n`. This way, every time `read-line` was invoked, the next value was read in as the next move.

I found the tests for the game loop the hardest ones to implement in Clojure so far. The result is that for some tests, the test code is a quite tied to the implementation, which I've seen before when using spies and verifying interaction. Yet for other test cases, quite a lot of the 'real' functions are used. In some ways that feels inconsistent, yet in others it feels good. If everything was stubbed, the tests would all be very rigid and may not show if the program did not actually hang together.


