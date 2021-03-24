# What not to do:
- Functional changes at the same time (e.g. go from checking truthiness to checking for undefined).
- Attempt conversion with low test coverage.
- "Let the perfect be the enemy of good." 
-- The goal is to transition a project from JavaScript (most likely) to TypeScript. Focus on completing 
the conversion first, and then "ratchet everything down" later. 
- Forget to add tests for your types. 
-- Don't stop at just utilizing old tests. Check typing with new tests, be 200% sure that everything is 
working as you intended.
- Publish types for consumer use while they're in a "weak" state.
-- Nothing pushed to the end user should be untested or unverified. Common theme here: be able to verify
that everything is working as intended before you finalize. Don't just eyeball it, *actually test it.* 

# Step 1): Compiling in "loose mode"
- Start with tests passing.
-- Before you even begin converting files, make sure *everything* you have right now is passing in your
testing suite. If you know there's a test (or tests) not passing, you should have that fixed and working
before you attempt conversion. 
- Rename all .js to .ts, allowing implicit any. 
-- **Implicit anys** pop up when the TypeScript compiler cannot infer a more specific and useful type. 
--- Also note that type information does not flow up. If in JS you have: 
` `
    function stringSplit(a) {
        a.split(', ');
    } 
` `
--- TS will *not* infer this as a string, and will instead type it as 'any'.  
- Fix only things that are not type-checking, or causing compile errors.
-- This is meant to be a first pass through the project. Again, you're not tightening things up until 
you have them all functional and tested. As such, the goal here should be to fix anything that is causing
TS compile errors. (It's common to run into TS compile errors when converting JS classes, as it needs to know what's a 
valid field and what's not.)
- Be careful to avoid changing behavior.
-- **Remember:** This is not about adding features or making tweaks to the functionality of your project. 
The goal in this phase of the conversion is to do just that - convert it to TS, get the project to
compile, and write solid tests for TS and its types.
--- With this step complete, you'll end up with a completed pull request and be ready to move on to Step 2!

# Step 2): Explicit Any
- Start with tests passing. 
-- Again, don't move from one step to another without having all tests passing. If you're done with 
step one but there's still a test not passing, refine until that test is passing before moving to
step two. 
- Ban implicit anys. 
-- This is a tsconfig compiler option. `("noImplicitAny": true,")` Setting that to true means that 
instead of TS falling back to any in places where it can't figure things out through inference, it
will give you a compile error.
- Where possible, provide a specific and appropriate types.
-- You'll end up with a "to-do list" of implicit anys that have now turned into compile errors. You
need to go through and provide meaningful types where you can, and use an explicit any where you can't.
--- You also could import types for dependencies from *DefinitelyTyped*, which is an open source project
that provides ambient type information. 
- Get your tests passing again.
-- Self-explanatory. Once you've completed this part of Step 2, you'll have a second, independent 
pull request ready for review. 

# Step 3): Squash explicit anys, enable strict mode
- Incrementally, in small chunks...
There's no real benefit to doing this step in a single, huge pass. It's better to work on it
piece by piece, and chip away at the project as a whole. This is to say *don't* enable all of 
the tsconfig strict mode checks at once. Do them one by one, completing another pass each time.
- Enable strict mode.
-- Strict mode consists of: 
` `
    "strictNullChecks": true, // The only thing that can hold a null is a null.
    "strict": true, // Multiple strictness settings packaged into one. Research elsewhere.
    "strictFunctionTypes": true, // Validates args/return types of callback types. 
    "strictBindCallApply": true // Args passed to Bind/Call/Apply and the lexical scope all type check appropriately.
` `
- Replace explicit anys w/ more appropriate types.
-- A more refined version of replacing implicit anys. Results in more strongly typed code, as is 
the whole purpose of using TS. 
- Try really hard to avoid unsafe casts.
-- **Casting -** Forcing TS to regard something as a particular type, which is done with the 
'as' keyword. (EX: "regard this as a string")
-- The more casting you introduce into your app, the more your types have a chance of lying to you.
- Is it worth it?
-- Conversion should be done on a case-by-case basis. Consider the size and scope of a project
before deciding to (or not to) convert it to TS. In many cases, conversion is worth the time. 

# Address Book Exercise - Notes
- Moving on to Address Book exercise, under /challenges/address-book.
-- Goal is to follow the conversion steps listed above; convert the AddressBook class in 
the index.js file from JS to TS. 
-- Start by just changing the file extension. 
-- Set the TS compiler in a loose mode, get the tests passing. 
-- REMEMBER: Always make sure tests are passing *before* and *after* you are done with each step. 
--- Might seem redundant on paper, but it's never a bad idea to double and triple-check your work. 
-- To run tests: 
` `
   => cd ../address-book
   => yarn test
   14 out of 14 should be passing, if everything is set up correctly. 
` `

# Address Book Exercise - Solution Notes
- In the getFullName function:
` contact: {firstName?: string `
-- Mike notes that `contact` should most likely be an object made up of first, middle,
and last name. Each type should be set to a string, which may be obvious. On top of this,
he also notes that we're filtering later in the function based on a Boolean, meaning that
somewhere in the function we're dealing with truthiness. 
-- Reminder: to make a *param optional*, you can drop a `?` after the param name. In the
snippet above, `firstName?:` will allow the function to continue with or without a first
name being input. (The same thing applies to middle and last name.)
- Utilizing an interface: 
-- Mike notes that we're reusing certain variables repeatedly, and could be better off
(more DRY) by creating an interface to hold them instead. EX: 
` `
    interface Person { 
        firstName?: string, 
        middleName?: string, 
        lastName?: string 
    }
` `
-- We can then input `Person` in place as our type for a few of the functions. Keep in
mind that this may cause some slight constraint; while it's may be simpler to do it
this way, it's not guaranteed to be the best method. 