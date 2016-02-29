---
layout: posts
title: File System Interaction
category: apprenticeship
---
### 8th Light Apprenticeship - Day 95

Today I have been interacting with the file system a lot. The first test I tackled was the combined Post-Get-Put-Get-Delete-Get. This meant I had to implement the 'proper' behaviour for each method, rather than just return a valid status. 

<!--break--> 

###Post Get Put Delete
Tests for interacting with the file system can be a little tricky. I didn't want to create files and load them as fixtures. Instead, I used the JUnit Rule `TemporaryFolder` which I learnt about at an Agile Development course at my old job. It can create a temporary directory structure for you, and it cleans up after itself. During this task I've also used another rule, `ExpectedException`, to ensure that the error messages thrown from my custom exceptions are under test.

I started with implementing a lookup that a GET request could use. For this test, the resources are files, which contain strings, therefore I used BufferedReader, reading each line at a time and concatenating them together. This worked great. I did make an assumption though. If you look up a resource that doesn't exist, what should the server do?

I thought about my options - Throw an exception, return empty string, return null. I don't like seeing 'null' scattered across a code base, however in this case, I don't want empty string, as that would actually put an empty string into the body of the http response, which I felt was incorrect. It would not be clear whether a resource did exist and was just empty, or whether it did exist and was null. I could have thrown an exception, but I don't want the server to crash, so it would be swallowed. Therefore I went for the null option, but wrapped it in a method to give it context. 

One point of confusion was that the test gets a resource (which doesn't exist initially), then creates it using a POST, but the test case wants a status of 200. Looking at the spec, it states if POST actually creates a resources it should be 201. As the aim of the task is to get the tests passing, I updated my server to return 200.

###Redirect
Once I had finished that test, I started on the next, redirect. Redirect returns a 302 status code, which means the requested resource resides temporarily under a different url (which was provided in the test fixture). This test was very quick to implement. That was lucky, as I had spent more time than I thought I would on the first one of the day.

###Image Content
The last test I had pencilled in for today was image content. I started off, as usual with writing a test to incorporate the new route. Then, I used the file reader I had created this morning, and a whole lot of little symbols filled my terminal. The code was reading the image as a string and not particularly happy about it! I looked into how to read bytes and went into spike mode, so that I knew how to do it. 

After a lot of trial and error, I came to realise that the HttpRequest I have, whose body was stored as a string (as that satisfied all the requirements I had so far), would probably be better off being stored as a byte[]. After all, I may not know if the resource I'm looking up is a text file, xml file, image and so on. The body was always being transmitted as bytes in the end, so I decided to transform the body earlier and  found a lovely helper method for this, which enabled me to delete around 4 methods in a class:

           Files.readAllBytes(Paths.get(filename(resourcePath)));
           
As a bonus, this worked for reading text files and images as bytes from the file system, which meant I wouldn't need to add a new method to the FileFinder interface.

Once I could see the route I needed to take,  I created a new branch and TDD'd the necessary changes. I remembered Kent Beck's quote `make the change easy then make the easy change` so I started with updating the request to store a byte[] for the body, checked everything worked ok, then, in a separate commit, added the new feature. 

The other thing I learnt today was how useful some debugging statements are when the server is running against the fitnesse test suite. For now, I am using system.out to print to the console, but I have a note to remove them before the customer demo. The most useful information is seeing the request that is coming in, and the response that is sent back. I may keep these but use log4j, which would be a more elegant solution.

The three tests I had scheduled in for today are green, however I have a few bullet points of refactoring I want to do. I'll save this for tonight, and start the next tests in the morning.


### Useful links

[Example Responses](http://doc.bonfire-project.eu/R1/api/example-session.html)
