---
layout: posts
title: Vim configuration
---

### 8th Light Apprenticeship - Day 60

As I am now using vim to write actual programs I needed to invest some time in making the vim editor look nice. When programming it is useful to have syntax highlighting, bracket matching as well as being able to format, run the tests through a shortcut and navigate files.

<!--break--> 

I thought it would be quite straightforward to configure vim with various plugins but in fact it took at least two hours. 

In order to download the plugins I used [Vundle](https://github.com/VundleVim/Vundle.vim) This involves polluting your .vimrc file with a header in which you place all the plugins you are interested in.

I decided on ctrlp, [nerdTree](https://github.com/scrooloose/nerdtree) and [vim-ruby](https://github.com/vim-ruby/vim-ruby) plugins. The first two help with file navigation, and the latter is for running and compiling ruby.

The configuration I added were 
`set showmatch` which highlights matching brackets

`syntax on` for syntax highlighting

`highlight ExtraWhitespace` to show any trailing whitespaces in a file

The colour scheme took some time to integrate. At first I installed the [base-16](https://github.com/chriskempson/base16-vim) colours plugin, but none of the colour schemes seemed to be picked up. This meant that I had the default highlighting, which was very bright. Method names were printing in dark blue, as such it was not very clear to read what they were. Reading a little more, I think this is because the base16 shell must not have been working for iTerm, as each time I changed the colourscheme, there were not changes reflected in the vim file. Instead, I browsed the colours available at [vim-colors](http://vimcolors.com/) and chose the 'onedark' theme. This worked nicely, and is calmer on the eye's.

So half a day down, I'm back to koans and now running behind schedule, as I am only half way through them. Investing in a comfortable setup and well configured tools is important though, so I feel it was time well spent, and something I would have had to do before starting tic tac toe anyway. 

I've pushed the dotfiles to github so that it will be quicker next time I have to set anything up.

### vim

To format ruby you can use the command `gg=G`
To undo in vim you can use the `u` command, and to redo, `ctrl-R`

To do a block insert (to comment a block of code for example) perform the following
`ctrl-V` and highlight the effected rows
`I`
`#`
`esc`

To remove the block of comments
`ctrl-V` and highlight the effected rows
'x'

### Ruby

#### Hash

`hash = Hash.new([])` creates a Hash with an initial value, an array. 

When the key does not exist, an array will be returned, and the array is pass by reference, so each time the element is pushed, it will modify the initial array. 

    hash = Hash.new([])

     hash[:one] << "uno"   #hash[:one] does not exist so return an array and push "uno"
     hash[:two] << "dos"   #hash[:two] does not exist, so return the array ["uno"] and push "dos"

The array at the end of this set of operations is therefore 


#### Strings

Strings can be encased in flexible quotes, which is where you  have the % sign followed by a delimiter. Within this boundary you can use both single and double quotes. 

      long_string = %{                                                                                               
          It was the best of times,                                                                                     
          It was the worst of times.                                                                                    
        }%
                                                                                               
        assert_equal 54, long_string.length                                                                            
        assert_equal 3, long_string.lines.count                                                                        
        assert_equal "\n", long_string[0,1]
        
the `length` method on the string counts the number of characters including white spaces and new line characters.

The `lines.count` gives the number of lines

Accessing a string like an array extracts a portion of the string from the index given for the given number of characters.

'EOS' is the end of string character.

When concatenating strings using the shovel notation (<<), the original string is also modified. When using the add notation, the original string is left alone.

#### Symbols

Method names in ruby become a Symbol but constants do not.

Symbols have a string and an integer representation. Symbols can be converted to strings using `to_s`. Symbols are not however equal to strings, as shown in the following assertions.

     assert_equal false, symbol.is_a?(String)                                                                                
     assert_equal false, symbol.eql?("ruby")
    
#### Methods

Methods in ruby do not declare a visibility modifier, or a return type. Even the parameter lists do not need the type declared. When you are calling a method, you do not need to put brackets around the parameter list. You can also provide default values for some of the parameters, so if a specific value is not provided by the calling code, the default is used.

When calling a method in the same class, you can use it's name or prefix the method call with the `self` keyword. However, if the symbol of that method is declared private, then it can not be accessed through 'self'.

#### Classes

Inheritance is shown using the '<' sign. Where we have constants in the inheritance tree, the value nearest the class in question will be used when the constant is referenced.

#### Control Flow

The if statements seemed to be very intuitive to what is seen in java, with the exception of the `unless` statement. This can be thought of as negating the condition that is presented. 

     `unless true` 
     
 translates to if(!true). Something to remember as my intuitive guess on the koan exercise was incorrect!
     