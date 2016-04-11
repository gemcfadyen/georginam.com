---
layout: posts
title: Pairing Tour day 6
category: apprenticeship
---
### 8th Light Apprenticeship - Day 125

Today I was back to my pairing tour, which makes up most of this, the last week of my apprenticeship. 

<!--break--> 

Today's task was working on some high level validation of data, input by the user of the application. Once validated within the application, that data is sent to a third party application, where it is validated further. This meant, our task was to check the data was of a certain format, and translate it to a different format, suitable for the third party application.

Once we had implemented the logic it was clear we had two categories of Date data, each of which could be transformed to the other format. We extracted out two date classes, which had a valid method and a transform method. At this point we could see that there was a lot of duplication between the two. Both the validation methods were the same, as were the definition of the different formats.

To address this we refactored, firstly using inheritance. This introduced a base class with all the duplicated logic in, which the two child classes extended. Each child class then contained only the differences. This allowed us to see that the interface was not really shared. Whilst the common functionality was in the base class, what was left in each child class was quite different. In fact it became clear that even though the validation for each type of date was the same now, they could diverge in future as their sources were different. They had independent reasons that they might change.

We did another spike to see what it looked like using aggregation. Whist still not perfect, it did feel like a cleaner approach, so we went with this in the end. 