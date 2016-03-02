---
layout: posts
title: Server Demo
category: apprenticeship
---
### 8th Light Apprenticeship - Day 99

This morning I continued to prepare the demo for my server. I planned to show the tests passing first (after all that is the proof that the functionality is in place), after which I would show the code. I felt a little more nervous about this demo and hoped it would go to plan. 

<!--break--> 

When Jim arrived I started off telling him the order of events but he cut me in my tracks. This demo was going to be a little different. He wanted to pull down the code onto his machine and run it from there. I was fine with this, but as I had not tried running the code from a brand new checkout so I must confess that I held my breath whilst he went through the setup steps, in case something didn't behave as expected. Thankfully after a little tweaking of the public directory path, the tests ran and went green on Jim's machine.

After that, I felt more relaxed and went ahead and showed the code. Jim mentioned that the cob spec repo could be in a vendor directory within my repository. That way, if someone wanted to check the code out, they could just clone my repository and get everything they needed. Additionally, if the cob spec tests evolve after I'm complete, my code would not necessarily run against the latests cob spec checkout. I thought this was an interesting point to consider, and may move it into my repository, or fork it to my github page.

Whilst I had made my routes configurable in a map, so only one place would need updating should a new route be added, Jim still felt that the code would need to be opened up, so suggested that I could have used a file for configuration. This would mean some code would be required to map the string configuration in the file, to certain classes in the code, which could be a little messy. As an alternative solution we discussed moving the map out into it's own class, which would make testing easier (you don't need a fully populated map to test the router, you could just configure one route for example). This would also isolate the code change to one class which has only one purpose.

The other question I had was how defensive the code should be. When parsing the request received, I had not been that defensive, trusting what had been received. I foresaw issues with this, as if a request comes in for a certain route, but it doesn't have the expected header parameters, the code may throw exceptions as it may be expecting certain key value pairs to exist in the headers. Something that I had seen when invoking some of the directory links from the browser (as the byte range headers would not be present for partial content for example) rather than invoking the functionality through the tests (where complete correct requests are setup). Jim said as the messages were coming from an external source, the code probably should be defensive because anything could be received. In a real project it is edge cases like this which would be discussed with the product owner, going through the error cases and deciding on what behaviour the application should exhibit should a 'bad' messages come in. 

Overall, the demo was very positively received, which I was proud of. I only had one update to make - to generalise some of the routing.

I got started on the update straight away and after a little confusion confirmed with Jim that not all the routing needed to be generalised, but I should make is as generalised as I can, so that, if you do a 'GET' on a resource that exists, it will be found, rather than only finding those configured in the routes enumeration. Once this is complete I will move onto Clojure, which I can enjoy safe in the knowledge that the server will have been done and dusted.
