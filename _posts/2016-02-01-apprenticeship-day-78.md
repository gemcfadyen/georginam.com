---
layout: posts
title:  Ruby Closures
category: apprenticeship
---

### 8th Light Apprenticeship - Day 78

Ruby offers various closures which we can use to group code together. The official Wikipedia definition is:

     ‘A function or a reference to a function together with a referencing environment.
     Unlike a plain function, closures allow a function to access non-local variables
     even when invoked outside of its immediate lexical scope.’

Perhaps it is easier to remember a closure as a group of code which you put together, and when you call it, you have access to everything that was inside it when you created it.

<!--break-->

### Blocks

One way fo grouping code, is to use blocks, denoted by the curly braces. Blocks can only appear in argument lists and are not objects. E.g.:

    [1, 2, 3].each { puts 'hello world }

### Procs

Proc's are however objects. They are an instance of the Ruby [Proc class](http://ruby-doc.org/core-2.3.0/Proc.html). Proc stands for procedure, and represents a set of instructions packaged together as a single unit to form a specific task. They are often made to be called multiple times from a program. A simple definition of a Proc might look like:

     Proc.new { puts 'hello world' }

Procs can be thought of as a block of code in between `do` `end` keywords, wrapped in a (Proc) object. This object an be stored in a variable, or passed to a method and run whenever necessary. The powerful part is that the variables referred to within the proc, can still be accessed from wherever the proc is called. Here are a couple of examples:


     def a_method_returning_proc(a_variable)
       Proc.new { puts 'hello world x' + a_variable }
     end

     a_method_returning_proc('Frank').call

     -------------------------------------------

     a_proc = Proc.new do |name|
       puts 'hello world ' + name
     end

     a_proc('Frank').call


At most one block can appear in an argument list, however multiple procs can be passed to a method.

### Lambdas

A lambda is also a proc object, but has some differences. It is defined as follows:

     lambda { puts 'hello world' }

When passing lambdas in to a method, only one can be passed. If there is a `yield` inside the method, the lambda will get executed there, or alternatively, you can call it explicitly with `lambda_name.call`.

### Differences between procs and lambda's

Lambda's check the number of arguments but procs do not. If a proc is passed the wrong number of arguments, the proc just ignores the surplus ones. If no arguments are given to a proc that expects one, the argument is defaulted to nil.

Lambda's and procs treat the return statement differently.

Given the following example, when `lambda_test` is executed, and the return keyword is hit, the execution flow will resume from just after the point the lambda was called, and will display 'hello world'. In short, a lambda behaves in the same way a method does when it hits a return statement.

    def lambda_test
        lam = lambda { return }
        lam.call
        puts "Hello world"
    end

    lambda_test

A similar example with procs shows that when `proc_test` is executed, and the return statement is hit, the execution flow does not go on to print 'hello world'. It instead, returns to where the encasing method was actually invoked. The proc behaves as though it is part of the calling method, and returns from the block and the calling method when a return statement is reached.

    def proc_test
      proc = Proc.new { return }
      proc.call
      puts "Hello world"
    end

    proc_test

### Why not just use methods?

Why don't we just use methods rather than defining proc's? It is not possible to pass methods into other methods and call them at a particular point. You also can't return a method from a method, which you can do with Procs. This is because Procs are objects, whereas methods are not.
