---
layout: posts
title: Ruby Mocking
category: apprenticeship
---
### 8th Light Apprenticeship - Day 66

Originally I was thinking I would write my own test doubles for Ruby, but in fact, this is not as easy as it is in Java, as you can not strictly override methods the same way you can in Java. As Ruby is [duck typed](https://en.wikipedia.org/wiki/Duck_typing), it is easy to create a new testing class with the same method names as what you are trying to stub. However it means this duck type and the original class may diverge over time, and become a maintenance overhead.
 
<!--break-->

Instead, I was guided to use RSpec Mocks, where you can create an `instance_double` and expect that certain methods will be called in your test.

To define a test double, the following syntax can be used

      @reader_spy = instance_double("PromptReader") 
      
It takes the class name or object as the first argument, and checks that any method you mention in stubbing are actually present on the class, and verifies the arguments are supported by that method signature. 

Just using double("PromptReader") will not check if the stubbed method exists, thus it is possible you will end up with a false positive test result.

To ensure the method check takes place, add the following to your `spec/spec_helper.rb`

    mocks.verify_doubled_constant_names = true
    
So that you do not have to verify every interaction on every mock in each test, you can setup your test double as a null object. This way you can verify on the specific methods that you are interested in for a given test, and not the other methods that may be received by that mock during the test which are not important for the test scenario.

    @reader_spy = instance_double("PromptReader").as_null_object

To expect a certain method call, the following syntax can be used

     expect(@reader_spy).to receive(:get_input)
     
Your test would then fail if the get_input method was not  invoked by the subject under test.

To control the flow of the test, sometimes you need to provide a return value from your test_double. This can be achieved by
 
     expect(@reader_spy).to receive(:get_input).and_return("a")
   
To check a method has been received as an assertion to your test, you can use 

     expect(@reader_spy).to have_received(:get_input)

You can also include the number of times,

     expect(@reader_spy).to receive(:get_input).twice
       
To return multiple values, if the method is called twice for example, you just add more entries separated by a comma. For example:

     expect(@reader_spy).to receive(:get_input).and_return("a", "1", "u")
     
If you know a method should be called a certain number of times, you can check this, by including either .once or .twice, or .exactly(n). For example, to ensure get_input is called two times you could do:

    expect(@reader_spy).to receive(:get_input).twice.and_return("a", "1")

Finally to stub a method body, you can do the following
  
    expect(@reader_spy).to receive(:get_input) { "1" }

This will return the value 1 when the get_input method is called by the object under test.



