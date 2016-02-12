---
layout: posts
title: Ruby Mixin
category: apprenticeship
---

### 8th Light Apprenticeship - Day 70

Modules in Ruby are used to group together methods, classes and constants. Primarily they provide a namespace but they also enable Mixin's to be used. Similar to classes, modules are defined using the `module` keyword.  

<!--break--> 

Modules in Ruby are used to group together methods, classes and constants. Primarily they provide a namespace but they also enable Mixin's to be used. Similar to classes, modules are defined using the `module` keyword.

    module Hello
      def Hello.say_hi
          "hi"
      end
    end

To use the module functionality in a different class, the `include` keyword must be used. Like with constants, the statements inside Hello can be accessed in Greeting using the `::` functionality

    class Greeting 
      include Hello
      
      def greet
         puts Hello::say_hi
      end
    def 

If the module is defined in a separate class, then it must also be imported using the `require` statement.

Another use for modules is `mixins`. This is where a class can inherit features from more than one parent class, and can be used to model something similar to multiple inheritance.

    module Greet
      def say_hello
          "hello"
      end
    end
    
    class Welcome
      include Greet
      
      def politely_say_good_morning
         puts say_hi + ", Good Morning."
      end
    end
    
The class Welcome consists of the say_hello and the politely_say_good_morning methods. say_hello is essentially inherited and can be used as thought it is an instance method of the Welcome class itself.

You can not create an instance of a module, i.e. ` Greet.new` will not work, therefore all entities are best modelled as classes.

To conclude, a class can only have one superclass (using the `<` symbol), but it can mix in as many modules as it wants.
