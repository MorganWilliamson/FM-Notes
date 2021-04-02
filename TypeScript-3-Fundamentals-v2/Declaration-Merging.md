# Goals:
- Learn how TS understands your code. 
- Understand stacking values, types, and namespaces.
-- Mike: "I've titled it `Declaration Merging`, but we're going to look deeply
into how VSCode's ToolTips provide us with information that we can use to figure
out whether something is `of value`, or whether something is `of type`." 

# Declaration Merging
- "Identifiers" (i.e., a variable, class, function, interface) can be associated
- with up to three things: value, type, and namespace.
-- Think of identifiers as "things that you could export." Internally, TS calls
them "symbols". 
-- We haven't covered `namespaces` yet, but they're sort of like an object in that
they have types and values.

```ts
function foo() {}
interface bar {}
namespace baz {
  export const biz = "hello";
}

// how to test for a value
// "If it's a value, a variable should be able to hold it." 
const x = foo; // foo is in the value position (RHS).

// how to test for a type
// To test for type, jut try to use it as a type! 
const y: bar = {}; // bar is in the type position (LHS).

// how to test for a namespace
// You'll have to rely on tooltips for this test. Hover over a symbol, 
// and VSCode will let you know if it's a namespace with an appropriate
// tooltip. (Should say something to the effect of `namespace baz`)
baz;

// All three (types, values, namespaces) are importable/exportable.
export { foo, bar, baz }; 
```

