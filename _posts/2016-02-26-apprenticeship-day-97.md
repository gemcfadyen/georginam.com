---
layout: posts
title: Basic Auth
category: apprenticeship
---
### 8th Light Apprenticeship - Day 97

This morning when I got to work, Felipe asked how my server was going. He wanted a quick look at the code, as he was curious. I gave him open reins on IntelliJ. He took a few seconds to look at the code, and straight away opened the router, which is the class he wanted to see. I was amazed, that he honed in on exactly the right class. Maybe my naming is better than I thought as he seemed to be able to navigate intuitively. 

<!--break--> 

Yesterday Uku also asked how it was going. He told me about when he wrote his implementation using Clojure, and how he liked how concise his solution was. 

Both these craftsmen had excitement in their eyes when they talked about their implementation. This contrasts greatly to the apprentices who are yet to take on this challenge. The stories that go around about the task put the fear into you, when in reality, so far, the task for me has also been really enjoyable.

Today there was only half a day at the office, as the afternoon was our mini-conf. I wanted to use the time efficiently, so got straight to work on the basic-auth story. For some reason it was the one that excited me this morning. 

At first the description seemed a little confusing. 

    get /logs
    ensure access is denied
    get /log
    put /these
    head /requests
    get /logs
    ensure body of logs contains the last three requests
    
Having read up on basic auth last night, I understood that the first request would come in without authentication credentials, and my server would need to respond with the header 'Authorised'. This would then prompt the client to send their user name and password, which, if correct, would enable them to access the logs resource.

What I didn't quite get was the purpose of the get /log, put /these, and head /requests. There was nothing in the literature that I'd read stating that when authorising, you need to log all requests that come in. 
Back to the test case, all I could assume, from the assertion, was that I treat these get requests pretty much as normal, but write to the resource /logs as well. This seemed a bit strange, as a get request would not usually change a resource I don't think. Additionally there were no assertions about the body of each of the responses required. In the spec, it says that HEAD should not have a body, whereas GET and POST do. As nothing was being checked in Fitnesse for this, and I was told to do the minimum required for the suite, I didn't attach a body in any of these instances, and as such I could use the same action to respond to each request.

Never the less, I let the test guide me and made some good progress before mini-conf.

In the evening I went back to it. The client, in the last step will send the username and password encoded in base64. I googled how to decrypt this. There are various libraries that do it for you, although the one native to java didn't seem to work. In the end I added the guava library to do the decoding. 

Earlier in the week Christoph had stated that no external libraries should be used, but then yesterday he mentioned it was probably ok to use a library for the decoding. 

The unrealistic part is that the code now contains the username and password, so that once it is decrypted, it can be compared to what it is suppose to be, in order to authenticate. In a real project this would not happen. The credentials would be kept somewhere secret (maybe a protected directory with controlled access, maybe you'd call out to a separate authentication service which stores the credentials in a secure way). I could have saved them in a file, and looked it up, but I don't feel that was the purpose of this test case. I'll mention it at the demo and see what the customers feel and I'll be onto the next test case tomorrow. 


