---
layout: posts
title: Simple Http Tests
category: apprenticeship
---
### 8th Light Apprenticeship - Day 94

"Let's start from the very beginning, it's the very best place to start. When you read you begin with A, B, C, when you sing you begin with Do, Ray, Me"

Well, what do you do when you are coding an HTTP Server? 

<!--break-->

This is a big task, and there around 20 end to end tests to get passing. I've had a look through them, and decided on a rough order to tackle them. It seemed sensible to start with the test cases named _Simple_ Get, _Simple_ Put, _Simple_ Post. These only checked the status code returned in the HTTP Response.

Yesterday my server was hardcoded to return a 404 response. The first test I looked at their after was SimpleGet, which required a 200 response. I didn't want to test the routing through the higher level server, so introduced a 'processor' which will deal with the routing, and know what processing is required for which request. Having this collaborator, allowed me to create a spy for the server test, and test the permutations at a processor unit level.

Having drilled out a few routes, I can identify some areas that will need refactoring. As more routes get added, it would be nice for the processor to be generalised, and be able to look up routes dynamically. I don't want the http methods ("GET", "PUT") to be scattered all over the code base so I plan to extract these out into an enum or similar.  I will do some refactorings as I go, and others I need to see how the entity will evolve a little further before making the decision. 

For now, my plan is as below. It is subject to change, as some of the functionality is  still unknown. So far I'm on track (although it is only day 1!) and will end the day with some refactorings before starting the new test cases tomorrow.


|Day   | Tasks   | 
|---|---|---|---|---|
| Monday  | TDD a socket implementation which returns a hard coded value, and setup the testing framework; inspect what is received on the various requests   | 
| Tuesday  | SimpleGet; SimplePut; SimplePost; 404; PostGetPutGetDeleteGet |
| Wednesday | SimpleOption; Redirect Path; Image Content |
| Thursday | Directory Links; Directory Listing; FileContains |
| Friday | MiniConf |
| Saturday | Buffered time to catch up on anything not completed so far plus MethodNotAllowed, ParameterDecode, Patching with eTag |
| Sunday | Basic Auth |
| Monday | Simultaneous Tests |
| Tuesday | Demo to customer |
