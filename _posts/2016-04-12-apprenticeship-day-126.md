---
layout: posts
title: Pairing Tour day 7
category: apprenticeship
---
### 8th Light Apprenticeship - Day 126

Todays pairing was done using Go, an open source language written by google, used quite a lot in dev ops. The application in question was used to load test a http server. It generated lots of `get` requests which then hit the server end point.

<!--break--> 

The task was to add basic auth functionality to the http requests. Thankfully I could just about remember the details of my http server so I could help identify the different response codes and parameters that needed to be added. 

There were two unit tests that we needed to update to accommodate for the new command line parameter which passed in the username and password credentials. One test checked that the parameters were there, and the other checked that given a different order of parameters, the flags were still parsed out correctly. 

To reduce these tests down to one we decided to randomise the order of the flags using an array shuffle. After some research it became apparent that there was no out the box method for shuffling an array. Instead, we had to do this ourselves. We used a for loop, inside of which we generated a random number with in the range of indexes of the array. We then swapped two items.

                    dest := make([]int, len(src))
                    perm := rand.Perm(len(src))
                    for i, v := range perm {
                      dest[v] = src[i]
                    }

We still found that the order never changed. Puzzled, we worked out that we needed to provide a seed. Without it, every time the random function was called, it was always seeded with 1 which preserved the initial order. To fix this, we generated a seed using the current nano time from the operating system, so it would be different each time. 

After we had shuffled the array we had to flatten it again, manually. It's funny how a one line method in one language, such as Ruby, can be several lines long in another language.

Go does not have any exception handling, so as the author of the code, you need to decide what is a valid return type, and what is invalid. if you want to essentially throw an exception, you must explicitly tell the application to create a new error, and return it. Go also has the 'panic' concept similar to Rust, which I learnt a little about at a conference last weekend. Another similarity between the two, is that the compilers is quite strict. If you have an unused import or variable, the code will not compile the way something like Java would. You must remove the unused code and compile again. It nicely forces you to tidy up as you go along.

After we sorted our test data out, we went on to implement the basic auth functionality. Because go has an http library, the base64 encryption was provided out of the box making the implementation fairly straight forward. 

At the end of the day we looked at the main package, which was not under test, and managed to start extracting out parts of the logic which setup channels of routes that would be pinged by the server into a separate package, which we put under test. I think we made some good improvements and increased test coverage. A productive day pairing.



