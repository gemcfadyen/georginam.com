---
layout: posts
title: Refactoring Makes Speedy Work
category: apprenticeship
---
### 8th Light Apprenticeship - Day 96

I couldn't wait to refactor the processor class, which is essentially the brain of the server application. In here, it decides what action should take place, based, mainly, on the route that has been received. Some routes are further broken down into the http method, i.e., for a given route '/form', if 'GET' then do A, but if 'POST', then do B.

<!--break--> 

I had a big if statement to work from. I watched it build up over the last two days, but wasn't too worried about it. I have seen this pattern many a time. To me, it screams strategy pattern and I know how to refactor it. I had held off for two days as I wanted to see how the routes evolved before doing the actual refactor.

I decided to stick with a simple map to model the strategies. I realised that the `processor` is actually the `router` so I renamed it. The key to the routing map is currently the uri received in the HttpRequest, together with the http method, bound together in a pojo called `RoutingConfiguration`. Based on this, a particular action is looked up and executed, which generates the correct http response. It took me a while to name the classes, and I may come back to them if I think of something better.

I did the refactoring with the help of IntelliJ. Initially I kept all the new classes within the same file. After each one was extracted, I ran all the tests again to ensure nothing had broken. Once they were all extracted, I took a fresh look at them and realised that for some routes, the same functionality was happening. This meant I could reuse the strategies. Now I have a configuration method which sets up all the routes, if no match is found, the 404 route kicks in. The original tests are still in place, so the router and all it's actions are tested together. If I was to add a new route, I would create a separate unit test, and may well break the existing test file out if time permits later in the week. 

Thursday had three sets of functionality planned - Directory Content, Directory Listing and File Content. 

###Directory Listing

I started on the Directory listings, and reading the tests I could see that I needed to return a list of the filenames present in the public directory. To achieve this, I enhanced the ResourceHandler to find the publicDirectory and then got back all the filenames within it. Because the HTTP Request body is bytes (as mentioned in yesterdays blog post), I needed to format the list of filenames into a comma separated string, then convert to a byte array. It does therefore feel as though this would be better kept in the ResponseFormatter, but then I'd need to add a separate field on the HttpResponse containing all the filenames, then check in the formatter if this field is populated, and if it is, format it and use it as the body of the response, otherwise use the usual response. That felt more complex.

I realised I had duplicated the logic to take a list and create a comma separated String from it. I decided therefore to extract that functionality out into it's own class, which uses generics to allow for the input parameter to be of different types, depending on where the code is called from. Later in the day I used this a third time, so I'm glad it is being reused well.

###File Conent
To implement the File Content, all I had to do was configure a new route with the appropriate routing key, and link it to an action (LoadResource) which already existed. It took minutes, and the Fitnesse test was passing. It assured me that my refactoring last night definitely helps me onboard new routes.

Because of this I managed to get the planned tests completed much faster than I anticipated, so used the time to look into the remaining test cases. Reading the titles has not always give me an insight into the functionality, so I felt it was good to spend half an hour refining the details so I can think about them (even if just subconsciously) over the coming days.

###Parameter Decode
I managed to complete two additional test cases today - MethodNotAllowed and ParameterDecode. For the latter, I decode the parameters when I parse the raw http request received from the client. The parser is therefore getting a little larger. It is also tightly tied to the structure of the raw http request message received. I can't see a way around this, something has to trust the message being received, and as this is at the boundary of the system, it essentially is the adapter pattern, transforming the raw data received to the internal HttpRequest representation.