---
layout: posts
title: Clojure Kata
category: apprenticeship
---
### 8th Light Apprenticeship - Day 103

I worked through some of the koans over the weekend, but, similar to Ruby, I found they didn't give me enough of an insight into how to actually write Clojure myself. After around 12 of them, I decided try something different.

<!--break--> 

As my next task was to write the Roman Numerals Kata, I googled for a sample Clojure kata (to find a different one to Roman Numerals). I came across [the bowling kata](http://www.jneander.com/writing/bowling-game-kata-in-clojure/).

I worked my way through this, copying the code character by character, bracket by bracket. I didn't fully understand all the data or constructs (to be honest it scared me a little bit), but I felt that I could use this as a sample from which to give the Roman Numerals kata a shot.


To setup a new Clojure project I used the command: 

       lein new speclj roman-numerals
       
This creates a new Clojure project laid out to use Speclj for unit testing. To run the tests, in a separate terminal, you can type:
       
         lein spec -a         
This watches the files, and on save, will automatically run the test cases.

I started with a simple test case of converting 1 to I.

          (it "converts 1 to I"
            (should= "I" (converts 1)))
            
            
To get this passing, I simply defined a converts method and return 1.      

Next I added the test case to convert 5 to V. To implement this functionality, I used an if statement which returns "I" when the input is 1, but "V" otherwise:
        
        (defn converts [arabic]
          (if (= 1 arabic)
            "I"
            "V")
        )
        
I felt I was on a roll. Next I added the conversion for 10 -> "X".

I changed the if statement to the following:

        (if (= 1 arabic) "I")
        (if (= 5 arabic) "V")
        (if (= 10 arabic) "X")

This did not work because the syntax for the if statement needs to return two values - one for when the if condition is true, and one for when the if condition is false. 

Next I tried the following:

       (if (< 6 arabic)   
           (if (= 5 arabic) "V" 
         "I"))
       "X"

I was hoping that the first two cases would return from within the 'if' statement, and leave the last test case returning "X". In actual fact, "X" is returned for all tests that run, I guess it is similar to Ruby in that it returns the last value in the method (which makes sense). There doesn't seem to be a way of forcing it to return earlier.

I then had another idea. Rather than having "X" being returned, surround this within an if condition, returning a default of "" if the input is not 10. 

          (if (< 6 arabic)   (if (= 5 arabic) "V"  "I"))
          (if (= 10 arabic) "X" "")
          
This meant that if arabic was not "X", it was always "" that was returned. Once again I reminded myself that Clojure does not break out of a method early.

After a bit of googling (which taught me that if-else is not really supported in Clojure), I came across a new construct - `cond`. This mimics if else branching, as multiple conditions can be listed. 

       (cond
         (= 1 arabic) "I"
         (= 5 arabic) "V"
         (= 10 arabic) "X"
       )
       
This worked nicely, and all the tests were green once again.

At this point I could see that I had three bits of duplication, which meant it was time to refactor. 

I decided to declare a constant which would map the arabic number to it's roman numeral equivalent. This reduced the function body down to:
    
           (get romanNumerals arabic)
           
At this point, the 'easy' cases are covered. I know that for a straight lookup all I need to do is put new entries in the map. The next test case I went for was converting 2 to "II".  As I wasn't sure how to loop through a map, I did a naive approach, by introducing another if statement. After a couple more test cases, I was in a similar place to earlier:

     (defn converts [arabic]
       (cond
         (contains? romanNumerals arabic) (get romanNumerals arabic)
         (= arabic 2) "II"
         (= arabic 3) "III"
         (= arabic 6) "VI"
      )
    )
    
Again, it was time to refactor.

I am used to OO code, so dived in and tried to get a looping construct going. I found `doseq` which will give you tuples from the map, so my idea was to look at each tuple, and find the one that was >= the value I was trying translate.  After a bit of confusion, it turned out that `doseq` always returns nil, so it was less than ideal.

I had a few hints from craftsmen, to try and use map, and reduce. I spent some time experimenting but ended up feeling a bit frustrated. I wasn't sure what each of the key words was doing. My code was returning objects rather than strings and I lost track of where I was going.

I decided to go back to basics. Jim had hinted recursion might be an easier approach with Clojure. Usually I'm put off by recursion, but I could see how it could be useful. I wrote out some pseudo code.

    convert method (called initially with empty vector, arabic number)
      if arabic is 0 
         reduce result
         
      else 
        find largest value in roman numerals < arabic
        call convert again with result + translate, arabic - value     


I did therefore know what I was trying to achieve. 

I started on the code, and tried to implement the base case. 
             
             (if (= 0 arabic))
                 (reduce + result)

This didn't actually work, and I was wondering how to go on when I couldn't get the base case to work.

As Jim had said to ask for help if stuck,  As I was beginning to feel like I did whilst doing JavaScript, I thought it was maybe time to ask for some help. I decided to ask Makis, who had arrived at the office.

After explaining what I was trying to do he asked me to write in the Clojure file, as comments, the logic I wanted to implement. He questioned a few things. 

- Why was I trying to use a vector to hold the resulting roman numeral, perhaps I could use a string and concatenate it.
- Maps are not guaranteed to be ordered, so perhaps I should use two vectors (which is what I had done in my Ruby and Java implementations.)
- Perhaps rather than trying to find the entry >= arabic, I could just look at the first entry in the vector each time. 

By the end of these discussions, I had the following pseudo code:

     ;; if arabic is 0
     ;; return result

     ;; else
     ;; check the first entry in arabics
     ;; append the romans equiv to result
     ;; deduct arabic entry found in step 1 from 'arabic'
     ;; call calculate again result+roman, arabic - val, romans arabics

     ;; else
     ;; skip onto the next entry in arabics
     ;; call calculate result arabic tail-of romans, tail-of arabics


Now it was just a case of translating this to Clojure. Having these precise instructions was much more manageable. 

I got stuck on the first else cause. In Clojure, you only get one line to do everything, yet I wanted to do several things - get the first entry from the vectors, deduct arabic, call the function again. Makis pointed out that actually I can inline everything to the recursive method call, so in fact do not need multi lines. He was right, and once that was realised, it was only a few minutes until the solution was working.

    (defn- calculate [result arabic romans arabics]
        (if (= 0 arabic)
          result

         (if (>= arabic (first arabics))
            (calculate (str result (first romans)) (- arabic (first arabics)) romans arabics)
           (calculate result arabic (rest romans) (rest arabics)))

         ))

Now the solution worked, I could extract out the duplication. I did this, then realised that the methods I had extracted, had longer names than the Clojure offering (for example I created a function `fitst-item` to wrap `first`) so on reflection I inlined them again, so that the code was concise. All in all, a good end to a Monday, and Danny said tomorrow he'd pair on the more complicated approach I started off with.