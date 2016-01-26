---
layout: posts
title: Does TDD Slow You Down
---

### 8th Light Apprenticeship - Day 73

Often people ask the question 'Does TDD slow you down?'. Sometimes yes, because perhaps you have to put more thought into where you start the testing, figure out what testing framework to use, what type of tests to write, how to mock dependencies etc. But of course, the trade of is that you have the security blanket of a regression test, and that is priceless when it comes to refactoring or adding features to an application

<!--break--> 

Whilst doing a spike (so not using TDD), I found I was being slowed down because I didn't have a test. I was sending information between a client (browser) and server, trying to ensure that the format of the data the server was sending was correct. In order to test this, I had to start the server, navigate to host and port, refresh the page, flip back to the terminal to view the logs that I had printed out to inspect the data that had been sent. Times this by twenty whilst I fiddled with formatting, and I found myself thinking 'if only I had a test to check the format, then I could just run that'. 

Sometimes it is good to remind ourselves of why we follow the practises we do. Here was an occasion where I could really see the value, and where TDD would speed me up.
