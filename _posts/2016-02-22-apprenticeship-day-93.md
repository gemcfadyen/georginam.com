---
layout: posts
title: The Dreaded Server Task
category: apprenticeship
---
### 8th Light Apprenticeship - Day 93


Shortly after I started at 8th Light, I started to hear rumours about the `dark times`. This is what some apprentices refer to as the weeks they implemented their HTTP Server. Since then, naturally I have been dreading this task. I'm not alone when I mention I have had sleepless nights anticipating it. Still, the time has come to embrace this challenge. I am welcoming it with open arms. Positive attitude usually results in positive outcome. 

<!--break-->

Not being experienced in web programming may give me a disadvantage, however, in the last few weeks, I have implemented a web app using Ruby with Sinatra and Rack. Therefore I'm becoming more familiar with some of the terminology. In preparation, I completed the [Oracle Socket tutorial](https://docs.oracle.com/javase/tutorial/networking/sockets/), and bought a book on [REST](http://www.amazon.co.uk/gp/product/0596805829?psc=1&redirect=true&ref_=oh_aui_detailpage_o00_s00). It contains sample HTTPRequests along with a description, which I'm hoping will help me decipher some of the terminology that keep cropping up. I'm excited that by the end of this task, I should have a far better understanding of GET, POST, PUT, and so on.

From reading various articles I have picked up on the following tips which may prove useful throughout my implementation:

- To create a server, you need a process which listens to a given port, waiting to receive requests. Upon receiving a request, it needs to react, and reply with the relevant response. In Java, The `java.net.ServerSocket` class can act as a server, and listen on a given port.  This server listens for requests using the accept method `final Socket client = server.accept();` Upon receiving a request, the server needs to understand the request, and act accordingly, eventually replying to the client with the relevant response.

- When writing a server/client application, you can only serve one client at a time because, the `accept` call is a blocking method. (It listens for an incoming connection and blocks until it receives something). This can be mitigated by using threads.

- Always use a separate worker thread to handle time consuming operations like writing to a Socket.
 
- Use a timeout while calling blocking methods, so if nothing gets returned, you can abort the call.

Threading comes with it's own issues - race conditions and thread safety. Looking at the suite of tests that I have to make pass, it looks like threading will be needed. However, I don't want to put it in until I need too.

So how to test?

Recently I was looking back at my JavaFX gui, in order to help another apprentice. Here, to isolate the JavaFX dependencies, I wrapped everything in custom classes. This way, for the tests, I could create test doubles and spies, but for the real thing I could inject JavaFX objects. I'm going to try the same approach here. By wrapping the SocketServer,  and the Socket, I can create a spy which will tell my test that `accept` has been called, but not block. 

Like anything there are pro's and con's with this approach. By using a fake implementation for the tests, the `real` implementation does not _really_ get unit tested. In this case, the Fitnesse tests are essentially integration or acceptance tests, which will use the real implementation, so I feel this risk is mitigated.  Another disadvantage is that, should java upgrade its Socket or ServerSocket library, and change it's behaviour, my unit tests would not necessarily flag this, as the real implementation is not being used.  I don't think this is likely in the life span of this project so again, am happy to go ahead. The final disadvantage that comes to mind is the number of classes rises, as you wrap a lot of objects. This can be an overhead in maintenance, however, the pro of allowing me to TDD the solution outweighs the cons and let's me get started. Here is what I planned, and achieved today:

1. Spike a server which receives a request, in which the SocketServer and Socket are wrapped in custom classes to ease testing. TDD this solution hardcoding the response as 404.
2. From the TDD solution, build a jar which can be used by the [Fitnesse suite of tests for cob spec](https://github.com/8thlight/cob_spec)
3. Configure Fitnesse to use the jar, and see the tests failing for the right reasons.

Tomorrow I will start the real implementation, so that the server can successfully respond to some requests. Every time I look at the test suite I get a slightly better idea of what I am trying to achieve, and I hope it comes together in an elegant solution.

[How to write a simple HTTP server](http://javarevisited.blogspot.co.uk/2015/06/how-to-create-http-server-in-java-serversocket-example.html#ixzz3xVlMN91S)

[HTTP 1.1 Protocol](https://www.w3.org/Protocols/rfc2616/rfc2616.html)