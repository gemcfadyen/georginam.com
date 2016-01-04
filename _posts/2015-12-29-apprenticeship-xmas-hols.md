---
layout: posts
title: Gilded Rose Kata - My Masterclass
---

### 8th Light Apprenticeship - Christmas Holidays

The [Gilded Rose Kata](https://github.com/emilybache/GildedRose-Refactoring-Kata/blob/master/GildedRoseRequirements.txt) gives you a piece of 'legacy' code to understand then add to. The kata also has the constraint of being unable to change certain parts of the system. This is good practise for real life projects, which may have several clients, restricting the number of changes that can be made to a given interface.

Having just finished reading the book 'Clean Code' it lent itself well to applying some of the techniques. The ones I used are described below.

<!--break--> 


### Understand the Algorithm

In most projects, studies have found developers spend most of their time reading and understanding code, opposed to writing code. As such, in order to write clean, simple, maintainable systems, it is imperative that you understand the component you are working in. 

The gilded rose kata provides some documentation to give an overview of the system capabilities. It is a good idea to read the documentation several times. New concepts and language is introduced, such as the word 'sellIn'. It is impossible to understand everything at once (particularly if it is not a kata you are faced with but a real life project). So what to do..


### Check the requirements are true by writing tests

A good way to test your understanding of the system is to write tests. 

For gilded rose, each 'quality rule' outlined in the documentation can be verified through a unit test. What benefit does this have? Aside from the tests providing you a full regression test suite, so you can be confident that your refactoring works, I found the tests helped me to understand the term 'sellIn' used in the system. When reading the requirements, it wasn't clear exactly what this meant in business terms, nor how it would be specified in the system. After the first few tests however it was clear the term represented the 'number of days left before expiry' and was represented as a simple integer.

Once you believe you have tested all the cases, run a test coverage tool to capture any untested scenarios, and work them in before making any further changes. In my case, I couldn't get IntelliJ code coverage working on this project, so instead, I did a manual test to comment out each line of the gilded rose algorithm, to ensure at least one test failure was apparent. If it wasn't, a new test (typically a boundary test) was added.

### First make a change easy, and then make an easy change

The kata states that a new requirement needs to be implemented, however, as quoted from Kent Beck, 'First make a change easy, then make that easy change'. The gilded rose system is not in a clean state, therefore adding new functionality would be difficult. Clean up of the existing system is required.


### Extract obvious duplication into methods

The gilded rose system in it's [original state](https://github.com/emilybache/GildedRose-Refactoring-Kata/blob/master/Java/com/gildedrose/GildedRose.java) contains lots of duplication. There are many places which ask the item for it's name, deducts one from the sellIn, adds or deducts one from the quality.
Extracting out methods addresses this duplication is a good place to start, and also makes the developer think about good naming.


### Replace Magic Numbers With Named Constants

There is a maximum value for quality that exists within the system. Rather than have classes littered with numbers such as '50' which do not necessarily mean anything to the next author, it is good to hide the value under a well named constant.
   
       protected static final int MAXIMUM_QUALITY = 50;



### Improve naming

When presented with a piece of code to understand, it can take some time to figure out what the different variables and methods represent. In gilded rose, the phrase `items[i]` is repeated almost 35 times. Each time, as a reader you need to remember what it represents. In this case, it is the `currentItem`. Therefore, as a good citizen, rename the variables to help the next person. Tidying up as you go along is known as the [boy scout rule](http://programmer.97things.oreilly.com/wiki/index.php/The_Boy_Scout_Rule)

With the newly introduced methods and improved naming, there is an improvement in readability. 
      
      public void updateQuality() {
        for (Item currentItem : items) {
            if (notAgedBrie(currentItem)
                    && notBackstagePasses(currentItem)) {
                if (qualityIsGreaterThanZero(currentItem)) {
                    if (notSulfuras(currentItem)) {
                        setItemQualityTo(currentItem, decrementQualityOfItem(currentItem));
                    }
                }
            } else { //aged brie and backstage passes
                if (qualityIsLessThanMaximum(currentItem)) {
                    defaultQualityIncrease(currentItem);
                    additionalQualitySetForBackstagePasses(currentItem);
                }
            }

            if (notSulfuras(currentItem)) {
                setSellInOf(currentItem, decrementSellInOfItem(currentItem));
            }

            if (getSellInOf(currentItem) < 0) {
                if (notAgedBrie(currentItem)) {
                    if (notBackstagePasses(currentItem)) {
                        if (qualityIsGreaterThanZero(currentItem)) {
                            if (notSulfuras(currentItem)) {
                                setItemQualityTo(currentItem, decrementQualityOfItem(currentItem));
                            }
                        }
                    } else {
                        setItemQualityTo(currentItem, 0);
                    }
                } else {
                    if (qualityIsLessThanMaximum(currentItem)) {
                        defaultQualityIncrease(currentItem);
                    }
                }
            }
        }
    }


### Eliminate conditional blocks

As you can see, the gilded rose contains two large if/else blocks. The first if/else focuses on updating the quality of an item when it is within it's sellIn date, and the second when the sellIn date has passed. By identifying which parts of the if/else block was applicable to which item, it is possible to group related logic together. 


### Group related logic together

By grouping related logic together, it becomes clearer what updates should be applied to which item in gilded rose. The code below shows that the second if/else block has been removed, and that functionality inlined into the first for loop. Now it is possible to see what duplication exists between the different items. For example, two of the items (brie, backstage passes) have a default quality increase, and all of items have a default sell in decrement.


    public void updateQuality() {
        for (Item currentItem : items) {
                if (!notAgedBrie(currentItem)) { //Brie
                    if (qualityIsLessThanMaximum(currentItem)) {
                        defaultQualityIncrease(currentItem);
                        defaultSellInDecrement(currentItem);
                        brieIncreasesQualityWithAge(currentItem);
                    }
                } else if (!notBackstagePasses(currentItem)) { //Backstage passes
                    if (qualityIsLessThanMaximum(currentItem)) {
                        defaultQualityIncrease(currentItem);
                        defaultSellInDecrement(currentItem);
                        additionalQualitySetForBackstagePasses(currentItem);
                        backstagePassesLooseAllValueAfterSellIn(currentItem);
                    }
                } else if (notSulfuras(currentItem) && qualityIsGreaterThanZero(currentItem)) { //all except sulphuras
                    defaultQualityDecrease(currentItem);
                    defaultSellInDecrement(currentItem);

                    if (getSellInOf(currentItem) < 0) {
                        defaultQualityDecrease(currentItem);
                    }
                }
        }
    }

You'll notice that this code still has some confusing points. Take the conditional 
 
      if(!notAgedBrie(currentItem))

Negative conditionals are harder to understand, and this double negative would make the reader stop and think, and probably cause confusion. I left a comment temporarily to remind myself what item the if block was related to. This was a result of reusing the methods introduced in the first step. Rather than introduce a method to represent the positive case, I reused the existing method, ready to refactor them in the next cycle, as shown below. One step at a time.

    public void updateQuality() {
        for (Item currentItem : items) {
            if (isAgedBrie(currentItem)) {
                if (qualityIsLessThanMaximum(currentItem)) {
                    qualityIncreasesAsSellInDecreases(currentItem);
                    brieIncreasesQualityWithAge(currentItem);
                }
            } else if (isBackstagePasses(currentItem)) {
                if (qualityIsLessThanMaximum(currentItem)) {
                    qualityIncreasesAsSellInDecreases(currentItem);
                    additionalQualitySetForBackstagePasses(currentItem);
                    backstagePassesLooseAllValueAfterSellIn(currentItem);
                }
            } else if (notSulfuras(currentItem) && qualityIsGreaterThanZero(currentItem)) {
                defaultQualityDecrease(currentItem);
                defaultSellInDecrement(currentItem);

                if (getSellInOf(currentItem) < 0) {
                    defaultQualityDecrease(currentItem);
                }
            }
        }
    }

### Extract related logic into separate classes

Now that related logic is grouped, it is possible to extract each block into it's own class using automated moves. Taking Aged Brie as an example, here is how.

The aged brie logic is shown as a snippet here:

              if (isAgedBrie(currentItem)) {
                if (qualityIsLessThanMaximum(currentItem)) {
                    qualityIncreasesAsSellInDecreases(currentItem);
                    brieIncreasesQualityWithAge(currentItem);
                }
               }

Using the IDE, extract the inner 'if' into a method, call it brie(currentItem)

             if (isAgedBrie(currentItem)) {
                brie(currentItem);
             }

Create a new class for this method to live, and let the IDE create an inner class for you:
             
             if (isAgedBrie(currentItem)) {
                  BrieQuality brieQuality = new BrieQuality();
                  brie(currentItem);
             } 

Force the method brie() to take the inner class as a parameter:

            if (isAgedBrie(currentItem)) {
                  BrieQuality brieQuality = new BrieQuality();
                  brie(currentItem, brieQuality);
             } 

Move any methods that the method brie() uses from the outer class into the new inner class (even if it means duplication, as the duplication is cleaned up later).

Using IntelliJ, the F6 command allows you to move the brie() method into the BrieQuality class.

           if (isAgedBrie(currentItem)) {
                  BrieQuality brieQuality = new BrieQuality();
                  brieQuality.brie(currentItem, brieQuality);
             } 

At this point, if everything is green, and the automated changes look good, it is a good time to rename. 

           if (isAgedBrie(currentItem)) {
                AgedBrieItem agedBrieItem = new AgedBrieItem();
                agedBrieItem.process(currentItem);
            } 

The same exercise can be repeated for backstage passes and a standard item. The resulting code looks something along the lines of:

     public void updateQuality() {
        for (Item currentItem : items) {
            if (isAgedBrie(currentItem)) {
                AgedBrieItem agedBrieItem = new AgedBrieItem();
                agedBrieItem.process(currentItem);
            } else if (isBackstagePasses(currentItem)) {
                BackstagePassItem backstagePassItem = new BackstagePassItem();
                backstagePassItem.process(currentItem);
            } else if (notSulfuras(currentItem)) {
                StandardItem standardItem = new StandardItem();
                standardItem.process(currentItem);
            }
        }
    }

Why was this a good idea?  Using automated refactoring results in tiny incremental changes. After each step, the tests can be run to ensure nothing is broken. If the tests have broken, one ctrl-Z will take you back to a green state.

The method now is a lot smaller, the logic for each item is hidden behind the relevant class. If desired, specific unit tests can be written for each category of item, rather than always using the GildedRose.java class as the entry point.


### Prefer polymorphism over if/else

The duplication in the updateQuality method now shows that a common interface, with the method 'process(currentItem)' can be used. This looks like the Strategy pattern.


### Formalise the Strategy pattern

The conditional statements in each 'if' clause check to see if the strategy should be executed. This was moved into the strategy interface (`AgeingRules`) and substituted in each if clause. As the exercise progresses, it becomes clearer what each objects responsibilities are, thus renaming as you go along is a good habit to get into.

    public void updateQuality() {
        AgeingRules ageingBrieRules = new AgedBrieItem();
        AgeingRules backstagePassRules = new BackstagePassItem();
        AgeingRules standardItemRules = new StandardItem();
        List<AgeingRules> itemAgeingRules = new ArrayList();
        itemAgeingRules.add(ageingBrieRules);
        itemAgeingRules.add(backstagePassRules);
        itemAgeingRules.add(standardItemRules);

        for (Item currentItem : items) {
            if (ageingBrieRules.eligableFor(currentItem)) {
                ageingBrieRules.process(currentItem);
            } else if (backstagePassRules.eligableFor(currentItem)) {
                backstagePassRules.process(currentItem);
            } else if (standardItemRules.eligableFor(currentItem)) {
                standardItemRules.process(currentItem);
            }
        }
    }

Now it is clear that the if constructs can be collapsed down into a for loop.

    public void updateQuality() {
        for (Item currentItem : items) {
            for (AgeingRules agingRule : itemAgeingRules) {
                if (agingRule.isEligibleFor(currentItem)) {
                    agingRule.update(currentItem);
                    break;
                }
            }
        }
    }

Because the Sulfuras rules state that quality should not be effected, it is important to break out of the loop once a strategy has been applied.  Similarly for the rules to work, the `StandardItem` rules need to be last in the list. This is inferred by the word 'Ordered' in the name of the method which sets up the rules on construction. This gives context that the order of the rules is important, and doesn't hide it from the next developer who needs to touch the code.

    private List<AgeingRules> createOrderedAgeingRules() {
        List<AgeingRules> itemAgeingRules = new ArrayList<>();
        itemAgeingRules.add(new AgedBrieItem());
        itemAgeingRules.add(new BackstagePassItem());
        itemAgeingRules.add(new StandardItem());
        return itemAgeingRules;
    }


### Remove duplication between strategies by introducing parent class

Now that the structure of the system is improved, the duplication between the strategies can be removed. This can be achieved by having an abstract base class. Methods used by at least two of the three implementations were moved into the parent. After some more renames to ensure the api read fluently the refactoring part of the kata was complete.
 
 
### Encapsulate conditionals

Within each strategy, there are still small conditional blocks, by encapsulating the conditional statement in a method, readability is improved. Additionally I found the levels of abstraction remained more consistent.

Before:

    if (getSellInOf(currentItem) < 0) {
       if (getQualityOf(currentItem) < MAX_QUALITY) {
            setItemQualityTo(currentItem, 0);
            defaultQualityIncrease(currentItem);
       }		
     }

After:

     if (sellInHasPassedFor(currentItem)) {
       if (qualityIsLessThanMaximum(currentItem)) {
            setItemQuality(currentItem, 0);
            defaultQualityIncrease(currentItem);
        }		
     }



### Learnings

Aside from all the above, the big take away from this exercise is to trust your tests. The original code has been completely transformed, and the only tool providing feedback as to whether this was successful or not, is the state of the unit tests.

Where possible use automated refactoring. Although you have to verify the correct automation has taken place, it can leave less room for human error, and forces you to take one small step at a time.

Adding the new requirement - for 'Conjured' items, only took about an hour. It was just a case of adding a new strategy and including that in the list of rules.




