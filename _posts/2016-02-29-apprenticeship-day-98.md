---
layout: posts
title: Final Sprint
category: apprenticeship
---
### 8th Light Apprenticeship - Day 98

Over the weekend I continued with my server implementation, tackling Partial Content, Patch with Etag and Threading.

<!--break--> 

### Partial Content
For partial content, the request contains the starting and finishing index of the bytes to read. However, sometimes it only contains one value, and the second one needs to be derived. For example, if the request contains `bytes=0-4` then bytes from 0 to 4 are read and returned. If the request contains `bytes=-4` then the server must read from 4 bytes before the end of the resource up to the end.  If the request contains `bytes=4-` then the server must read from byte 4 until the end of the resource. 

Originally this logic was inside the PartialContent action, but on reflection I felt that the action was doing too much. Therefore I decided to take this logic out into a class which dealt with extracting header parameters. This way most of the formatting could take place outside of the routing action. I also moved extracting the authentication logic there, and introduced an enum for the header property keys to prevent duplication between the formatter and extracting of the information.

In terms of reading portions of the resource, first I used a Buffered reader, and read between the bytes of the boundaries given (as in the test case both the upper and lower boundary were provided). When I moved onto the test cases where only one boundary was supplied, it was not possible to calculate the other boundary, as no content length parameter was given in the request.  This meant I had to read the entire resource, calculate the boundaries if they were not both provided, then return a portion of the read resource.

It took me a while to realise that if the finishing index ended up being beyond the length of the array, the Fitnesse tests would fail. Therefore, it is was important to check that the maximum value of the finishing index was the length of the read resource.


### Patch With ETag

It took me a little while to figure out what to do with this test case. My conclusion was that the eTag received is the checksum for the files last value. The server therefore looks up the file specified in the request, generate the checksum for this file, and if it matches what was received in the request, the server should go ahead and patch it.

I did some research online to see how to generate the eTag value and I couldn't find anything in the specification stating how it should be done. I had two choices - (1) continue researching to find out how to generate an eTag, (2) Hardcode the values of [content => checksum] in the code, which would allow me to drill out the rest of the logic.

I went with the second approach, and created an EtagDictionary class, which was an abstraction that could be replaced by an encoding mechanism in the future. Once the test case was green, I looked again at the documentation, and saw on the Fitnesse test suite:

          "HTTP 1.1 specifications require that the client send a SHA1 encoded version of the resource you're attempting to update in an If-Match header."
          
I looked up how to generate a SHA1 key for a string, and through a unit test could see this was the correct algorithm that was being used to calculate the etag. I went ahead and updated my code to reflect this, replacing the etag dictionary with an etag generator.
 

### Simultaneous Processing

People say `save the best till last`. Threading was my last test case to tackle. Not being well versed in the in's and out's of threading, I took some time to research my options. From doing some reading, I learnt that concurrency is supported via processes and threads. Processes are instances of programs that run independently of each other (i.e. on start, a new process is spawned). Whereas threads have a run() method, and you specify the code to be executed by the thread.

From various articles it seemed that there were two approaches I could take - Threads or ExecutorService. I spiked them both.

First though, I needed to identify which part of the server I wanted to process simultaneously. As far as I could tell, it was the portion where the request is received, processed and a request returned. This is basically the entry point to the system, triggered by the `accept` blocking call. All this logic was initiated in the class `HttpServer` so that was where the threading logic needed to reside.

The first option was to create a class 'ProcessClientRequestThread' which extended `Thread`, containing the above aforementioned logic.  In the calling code (`HttpServer`), a new instance of `ProcessClientRequestThread` was created, and that thread started every time a new request comes in. 

The second option was to use an ExecutorService, which is a higher level replacement for working with threads directly and is able to manage a thread pool for you. Using this mechanism, the task and the execution is separated. You create a task to be executed, and an Executor to to execute it. In code terms, rather than placing the logic to execute simultaneously in a Thread, you create a class which extends `Runnable`. Then in the calling code, a new executor service is created which takes the runnable and executes it.

After the spikes, I asked myself how this logic could be TDD'd. I did some more research and saw this article [Threading TDD](https://dzone.com/articles/tdd-multithreaded-applications) which first tests a connection has been made. I tried this approach but realised I'd need to keep track of the number of connections that were being made (so that my test could check that one connection had been made, or many connections had been made). I usually try to avoid adding methods to production code simply for the tests sake (of course if there is no other way, then this is preferred over having no tests). Then I realised I could use the wrapping technique which I utilised both in my JavaFX Gui and ServerSocket/Socket part of the server. Once again, the Fitnesse tests would act as the integration test when using the real implementation of ExecutorService, so I felt this was a safe option to make, and would keep the unit tests simple.

This worked nicely. When I went to run the tests from Fitnesse however, the simultaneous test failed. I added some tracing so that I could see if the requests were being fed in and processed. This proved that they were.

I pondered for a while, as there were no exceptions in the logs. I added some output to the Fitnesse test suite, so that I could see how many responses the test suite had got back. The number printed out was the correct value, so why wasn't the test passing.

I took a short break to make a cup of tea, and my mind somehow wandered back to a project one of the teams once did at my old work. They had been tasked with profiling the application so that the slow parts of the system could be identified and rectified. So, there was an option, profiling. Before I got onto that however, I remembered that the slowest part of the system they had identified was the logging. In that project we used log4j, and there was not much thought put into what level the logging was being logged at. I wondered if my debugging statements were slowing the system down enough, that the 1500 messages were not quite being processed in the 3 seconds window they had.

As an experiment I removed all the system out log statements. Low and behold the test case passed! This was a joyous moment, as it was the last test case in Fitnesse to get working, and although I had a list of points to tidy up, I felt relieved that I would at least be able to demo all the functionality to my customers tomorrow.


### Tidy ups
Along the week I have kept a list of points that I should consider to revisit, should I have time. The most important two I felt were to do a review of the test coverage, and introduce packages.

I was confident that my test coverage was high, as I had applied TDD to drill out the server, and had used CI which reports the coverage, which I could see was 95%. However there were parts where I was calling code that throws a checked exception, therefore I had to wrap the call in a try/catch block in order for the code to compile, but I had not gone back to throw the appropriate custom exception and cover it with appropriate tests. 

Additionally, because I had refactored as I went along, sometimes I had extracted out new classes, and left the original tests in place. This meant the new classes were covered through tests for a different entity (think Chicago style TDD). Whilst the coverage was there, I felt it safer to retrofit a unit test specifically for the new entity, reducing the number of tests in the original object using the new collaborator.

Once addressing these points, the coverage went up to 97%. I felt pleased with that. The only parts that are not covered are the main method, and the real implementations of the entities I wrapped in test (like Socket and ExecutorService).

The other tidy up tasks I did was look for duplication, particularly around strings embedded into the code, like the delimiter values, and the routes themselves. I've learnt over the last few months, that if say a route changed, ideally there would only be one place in the code that would need updating. I decided therefore to put these values in an enum, which stores the route, providing one area to update if such an occurrence happened.

### Conclusion

This task was much dreaded, because of the stories that other apprentices & craftsmen told. I never imagined I'd finish all the functionality in one week, but in all honestly, I quite enjoyed it. This has taught me to not take other people's opinions of tasks too seriously. After all every person will find their own high's and low's when faced with a large task. For myself, I consciously got into a determined mindset, and set out on the mission.

Perhaps it was better than expected because I had such a hard time with Task Man during the previous iteration, or perhaps it was because I was meticulously organised whilst implementing the server (I made 8 evening meals up front and froze them so I wouldn't have to cook). I stuck to my implementation plan in a regimented fashion. I found a routine that worked for me (implement new business logic during the work day, refactor in the evening when I'm more tired, as the tests will act as my safety net). I worked all weekend, I've been to no social events of meetups for 7 days, and actually barely spoke to anyone all week.  Now I feel I am suffering from cabin fever, yet I achieved what I set out to, so for that I am pleased.

I found myself drawing on my past experiences as a developer, and using that to work around and trouble shoot problems. I ensured I remained disciplined and did refactoring as I went along, but tried not to do it too early when a refactoring path was not so clear.

I am proud of what I achieved, and apart from a few sections here and there, I generally like my solution. I felt it was easy to extend as new features were added. I hope that my mentors will agree, and that my spirit will not be crushed at the demo tomorrow.


### Useful Links

[Range Requests](https://tools.ietf.org/html/rfc7233)

[Partial Content](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.7)

[Patch method](https://greenbytes.de/tech/webdav/draft-dusseault-http-patch-08.html#rfc.section.2.1)

[ExecutorService tutorial](http://examples.javacodegeeks.com/core-java/util/concurrent/executorservice/java-executorservice-example-tutorial/)

[Java Thread Pool Example](http://howtodoinjava.com/core-java/multi-threading/java-thread-pool-executor-example/)