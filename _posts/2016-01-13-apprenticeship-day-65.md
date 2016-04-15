---
layout: posts
title: Colloquaial Ruby
category: apprenticeship
---
### 8th Light Apprenticeship - Day 65

Having written Java for years, switching to Ruby shows how much Java is ingrained in my blood.
 
<!--break-->

I couldn't help but chuckle when my mentor spotted the following method in my code and gasped.

    def getInput
      std_in.gets.chomp
    end
   
I looked and thought he meant the name was not very good. I started saying that I could easily rename it, but it was actually the fact that camel case was being used, whereas the Ruby convention is underscores. Whilst I had been keeping to the underscore convention, this one had slipped in and I had not even noticed.

Another convention I'm now aware of is for conditional methods. Whereas in Java you typically name methods 'isThisThing()', in ruby you would say 'this_thing?', thus the question mark depicts the fact you are essentially asking the question.

I've realised that learning a new language is more than getting the correct syntax and design. An important part is learning the conventions, akin to the colloquial words in a spoken language.