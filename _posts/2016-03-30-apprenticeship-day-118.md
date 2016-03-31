---
layout: posts
title: Pairing Tour Day 1
category: apprenticeship
---
### 8th Light Apprenticeship - Day 118

Towards the end of the apprenticeship, you take part in a pairing tour. The pairing tour is your opportunity to pair with the 8 craftsmen who make up your review board.

<!--break--> 

You spend a day with each, pairing on their client project, on client site if appropriate. 

My first visit was indeed on client site, where four of our craftsmen are working on a web project. More than that, I was pairing with one of them on the day of their launch. I thought back to some project launches I've seen prior to 8th Light. I have witnessed a few where the go live day was chaos as people ran around finding last minute issues, fixing last minute issues, deliberating whether to 'go' or 'no go' on conference calls that seemed to go on for hours. Contrary, here everything was very calm. 

In fact, the product was already 'live' in one sense. The application was deployed and running, just protected by basic auth. The launch would consist of simply removing the basic auth, so that the public could use the site thereafter. This meant a pull request was ready for merge as soon as the business gave the go ahead. 

In the meantime, I worked together with Nathan on some small improvements that had been identified. 

The application sources some data from third party api's. We needed to data which fell into a certain category and filter based on some id's. We followed TDD and I even got control of the keyboard a couple of times to write a test or implementation. I much prefer pairing when you get this chance. I feel more engaged and productive even if the code I wrote was quite simple. 

Along the way as we looked at our change in a test environment, we noticed that the website was showing an expansion button even if there were no details when expanded. We simply added a story for what we found, and fixed it straight away. It turned out that the condition surrounding the expansion was incorrect, so we just had to make one change.

The code on this project is written in Ruby, which I have not looked at for a couple of months. It looked so alien. I felt a little rusty and think I will try to schedule a day of Ruby in one of my upcoming IPM's to refresh myself.

All changes are reviewed by other team members so some of the day was spent code reviewing other developers changes.

In the afternoon there was the weekly IPM Meeting and it was great to see that it was lead by their product manager. He went through each story and checked that the feature was present on the staging environment. After he was happy the stories were complete, he prioritised the backlog and the team estimated using 'finger gymnastics'. Displaying their unit of estimation by holding up different numbers of fingers, the rough average of which was taken.

In the end the launch didn't take place through no fault of the developers. The business go ahead was not available, so they hope they will launch later in the week. It was a good day, I felt I learnt a lot, and am looking forward to getting out to clients after graduation.