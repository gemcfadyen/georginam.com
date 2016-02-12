---
layout: posts
title: Spiking
category: apprenticeship
---

### 8th Light Apprenticeship - Day 84


During today's IPM I  have to admit I was a little apprehensive about a couple of things. The first was that I still had an exception thrown in my log, which I had not been able to fix. The second reason was that I had been looking into so many new technologies, I felt it would be difficult to estimate the new tasks that I was going to be given. 

<!--break-->

I need not have worried as Jim helped me trouble shoot the exception in the log, and although we didn't get it fixed during the meeting, he confirmed that it wasn't the cookie in my actual web application causing it, but the request to favicon, which is sent by the browser. 

As for the new stories - I gave a high estimate, as I felt things were still a little unknown. Because of this, I got a spike story, to try out post requests for the human making moves from the board, so that I can give an accurate estimate tomorrow.

During the spike, I managed to work out how to provide custom attributes to the `<a>` link, which can then be retrieved in the javascript. I also configured an event handler such that when a link is clicked on the board, it is executed.

At this point, I realised I would need to do some work to get the latest state of the board, namely traversing the <td> entries. I decided to leave this and move onto trying out a test using jasmine.

I found a lot of documentation, and tried a few things out. I'll continue to do so in the morning, as I'm going to pair with Skim to get the tests going. After that, I will be able to provide a better estimate back to my mentor. I definitely have a good idea of what I am trying to achieve, which was one of the goals to get out of the spike.
