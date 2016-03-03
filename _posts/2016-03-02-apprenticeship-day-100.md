---
layout: posts
title: Generalising the Routing
category: apprenticeship
---
### 8th Light Apprenticeship - Day 100


I needed to generalise the routing as much as possible in my HttpServer. The first thing I did this morning was to draw out a table of HttpMethod (verb), to action and return code. From this I could see which routes were doing the same thing (thus could be grouped together in the same bucket), and which routes needed special consideration (as perhaps the return code was different, or extra manipulation, such as decoding the parameters, or authentication was required).

<!--break--> 

Once I had my group of 'special cases' I ran those individual Fitnesse tests to see if the request contained any information that would indicate this special behaviour should take place.

Some of them did. For example, if a request has parameters that require decoding, the request contains those parameters. Similarly, if the request was for partial content, it contained a range of bytes to be read. I noticed that if the request was to be considered as readonly, the 'Content-Length' parameter was always 0. From this analysis I realised I could use the request to work out whether a given action should be executed.

There were still some outliers. The test for authentication must deny access when the first `GET /logs` is received and there was nothing on the first GET request that indicates this request should be considered for authentication.

Redirect was the same. The request contains nothing to indicate it should be redirected so there was no way of knowing to return the `Location` field simply from the request received. 

Directory Links was another. I could look up the resource and check if it was a directory and if so, return the links instead of the file content. When I spiked this, it felt like the ResourceHandler which deals with interacting with the file system was doing too many things, looking up a resource, checking what it was, then either formatting links and returning them, or looking up the resource content again. Jim agreed and was happy for these few routes to kept specific.

I decided therefore to look up the relevant action, first by HttpMethod (e.g. `GET`), then secondly, look for the eligible action for the given request. This was achieved using a `Map<HttpMethod, List<Action>>`. Each action has an `isEligible` method, which checks the route, or the request, or is set to true (for default cases). This provided a generic solution for a lot of the actions, and now when you start the server independently and navigate the links in the browser, it doesn't throw any exceptions, as if the request doesn't include the partial content byte range, the default `GET` action is picked up instead.

Some of the tests require the requests to be logged to a file. At first I made the necessary actions extend a LoggingAction, but felt that it was a bit hap-hazard. I decided therefore to audit all requests that come in, so now the processor logs the request received then goes onto process it. I felt this was a more generic solution.

Previously when there were no matching route, 404 would be the final choice. Using the more generalised case, I had to hardcode the 404 route for `/foobar` path in order for the Fitnesse test to pass. At first I wanted a generic solution, something like 'if the resource is not in the public folder, return 404', however some of the tests do `GET` on resources that are not yet in existence but expect a different return code, such as 401 for unauthorised, and subsequent requests go on to create the resource.

I'm now pleased that the routing is much less rigid, meaning the server is more robust.