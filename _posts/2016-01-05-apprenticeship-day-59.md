---
layout: posts
title: Ruby
category: apprenticeship
---

### 8th Light Apprenticeship - Day 59

One day, towards the end of the year in 2005 my boss wanted to have a word. The familiar flush of adrenalin went through my body as I tried to think what I had done wrong, how I could fix it and what terrible knock on effect it might have had... 

<!--break--> 

In fact, I was simply being asked to join a new team working on a greenfield project (almost unheard of these days in the finance industry). The challenge was this brand new project was being written in Java, and up until then, I had only used C++. 

I felt the opportunity was good, after all, Java did seem to be the latest greatest language at that time. My first challenge was to write a simple calculator that added and subtracted numbers. This would get me familiarised with the syntax. 

As it had happened, I did opt in for the java module at university so although I was not a Java programmer, the look and feel of the language was not completely alien and I soon got the hang of it. I've stuck with this language over the years. I quite like it. Whilst it is verbose, it is clear as to what types are being used where. There are rules and you follow them. 

Today I started to learn ruby. This time round there are many more resources on offer. I have started with the [ruby koans](http://rubykoans.com) I really like that you use tests right from the start. When I was learning Java, tests did not even feature in the production projects, let alone whilst learning the language. 

The things that have struck me about ruby so far are listed below.

### Equality

`nil.is_a?(Object)`  Unlike in Java, nil is an actual object in Ruby. This means methods can be invoked on nil without throwing a null pointer exception.

`nil?nil` A bit like the Spanish language, in Ruby where you see a '?', you can think of the object being asked a question. This asks nil if it is indeed nil.

`nil.toS` The Ruby equivalent of 'toString' in java, and for nil objects, the empty string is returned

`nil.inspect` On nil objects, inspect always returns the string "nil"


In fact, in ruby it seems everything is an object. All the following assertions are true:

`assert_equal true, 1.is_a?(Object)`                                         
      
`assert_equal true, 1.5.is_a?(Object`                                          
       
`assert_equal true, "string".is_a?(Object) `                                      
     
`assert_equal true, nil.is_a?(Object)   `                                          
     
`assert_equal true, Object.is_a?(Object)`

### Objects

It seems that a new object is created by calling `Object.new` and in fact every new object comes with a built in identifier (of type Fixnum) `obj.object_id`. 

Integers have fixed id's, and follow a sequence determined internally from bit shifting. The explanation is a bit magical so for now I have skipped over it.

`>> (0..5).each { |i| print i.object_id, ' ' }`

`1 3 5 7 9 `

More detail can be found in these posts:

[integers have fixed id's](http://www.oreillynet.com/ruby/blog/2006/01/the_ruby_value_1.html)

[ruby values and objects](http://www.oreillynet.com/ruby/blog/2006/02/ruby_values_and_object_ids.html)

You can clone an object by doing `my_obj.clone` but the object_id of the clone would still be different compared to the object you have cloned.

### Arrays

Seems that you can navigate forwards and backwards around an array in Ruby. It is certainly more of a rebel language than Java!

Given an array containing `[:peanut, :butter, :and, :jelly]`

You can access each element using the indexes 0, 1, 2, 3 as expected. However, you can also access the array using negative indices! 

For example, array[-1] returns the element :jelly and array[-3] returns :butter. This is navigating from the beginning of the array straight to the end and reversing through. 

It is possible to create a new array from an existing array by providing two indices between the square brackets.

array[2,2] creates [:and, :jelly]

Interestingly, a quirk of the language is that array[4,0] returns [], yet array[5,0] returns nil. This is because the index 4 is the 'lower bound' of the array. I am imagining it as a pointer to the next available space for an insertion to go. Ruby knows about the lower bound and as such returns an empty array, whereas, the index 5 is beyond the lower bound so returns nil.

This is explained [here](http://stackoverflow.com/questions/15058827/ruby-koans-about-arrays-rb)

### Ranges

Ranges can be stated using two or three dots. For example, (0..9) is the range from the beginning to the end inclusive, whereas (0...9) goes from the beginning (0) but excludes the last value.

### Hashes

Like a map in Java you can get the keys and the values. E.g: `hash.values` which returns as an Array type.

Like in Java it seems the keys can be of any type, for example hash(1) and has(:one) are both valid keys. The type preceded by a colon is a Symbol.

### Symbol

"A Ruby symbol is a thing that has both a number (integer) representation and a string representation." [Symbols](http://www.troubleshooters.com/codecorn/ruby/symbols.htm) explains that this is not strictly the case, however for a new Ruby coder, it may be ok to start thinking of a Symbol in this way.

### vim

Whilst learning Ruby, I want to improve my vim. 

I managed to find out how to set line numbers in vim (by adding 'set number' in the .vimrc)

`vi +5 ruby_file.rb`  This opens the file specified and places the cursor at line 5.

`df <last letter you want to delete>`  This deletes all characters from the cursor position up until the letter specified.

I'm looking forward to becoming proficient with several languages over the coming months and years. Not only will I be able to offer a broader skill set to clients, I feel I will be able to get more out of meetup's and conferences. I can choose what language to do exercises in, work with and learn from different people, and choose from my selection, which one will be best for the job.