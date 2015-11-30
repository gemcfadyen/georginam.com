---
layout: posts
title: Package Principles
---
### 8th Light Apprenticeship - Day 41

As developers, we constantly break problems down into manageable chunks. These emerge as methods, classes, systems. Sometimes an application is made up of hundreds of classes. How are they organised? With packages. How do we keep our packages organised? With package principles.

<!--break--> 

Just as solid principles exist for design, packages principles exist for packages.

- Release Equivalence Principles (REP) "Classes in a package should be reused together"

We write classes in such a way that they can be reused by others. Usually a single class is not much use on it's own. Reuse becomes powerful when there are many classes that can be used again. If a group of related classes are being reused, they should be released together. That way, the history is tracked, and a new version can be provided for any clients to upgrade to.  Such classes should be stored in the same package, so clients can reuse all related classes.

* Common Reuse Principle (CRP)

Where classes have dependencies on each other, and collaborate together, it makes sense for them to live in the same package.  

* Common Closure Principle (CCP) "Expect change in certain packages"

Like SRP in SOLID, a package should not contain multiple reasons to change. If code in an application must change, then it is better that those changes are in one place to minimise the amount of code that needs to be revalidated and rereleased.

* Acyclic Dependency Principle (ADP)

Cyclic dependencies between packages is not good. Team work is easier if a code base is split into separate packages, which can be released fairly independently.  This way, team members who depend on your package, can continue with their work, and decide when is a good time to upgrade to the newly released version. 

Cycles introduce dependencies on many other packages which makes testing and releasing difficult. You do not want to have to to build the entire code base to test one single area due to cyclic dependencies.

* Stable Dependencies Principle (SDP)
*
Any packages that is hard to change and maintain should not depend on volatile packages that change a lot. 
Stability in a package can be defined as the amount of work (size, complexity, clarity) required to make a change. Stable packages should have no outgoing dependencies. If a stable package changes, it has no knock on effect.



As we know it is not practical for a system to be entirely stable, as requirements change and systems evolve. We need to find a structure that allows us to easily make change. This brings me onto the last principle - 

* Stable Abstraction Principles (SAP) 

A package should be as abstract as it is stable. If a packages is to be stable, it should also have some abstract classes so it can be easily extendable. Think DIP for packages.
