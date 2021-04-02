# Declaration Merging - Goals:
- Learn how TS understands your code. 
- Understand stacking values, types, and namespaces.
-- Mike: "I've titled it `Declaration Merging`, but we're going to look deeply
into how VSCode's ToolTips provide us with information that we can use to figure
out whether something is `of value`, or whether something is `of type`." 

# Declaration Merging - Notes:
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

- Functions and variables are purely values. 
-- Their types may only be extracted using type queries. EX:
```ts
const xx = 4;
const yy: typeof xx = 4;
```

- Interfaces are purely types. 
-- Trying to assign an interface to a variable will give you an error,
as interfaces are not meant to be used as anything other than types. EX:
```ts
interface Address {
    street: string;
    city: string;
    state: string;
    zip: number;
}

const z = Address; // This line would faile the value test above. 
```

- Classes are both types *and* values.
-- Classes can pass both the type and the value tests. In a sense, a class is 
a factory meant to produce instances (contains a constructor, prototype). However,
using a class as a type will describe the instance itself. They can be used almost
like an interface for an instance. Contact, for example, would work in both positions:
```ts
class Constact {
    name: string;
    static hello = "world";
}

Contact.hello;
// Both the value and type relate to the instance, passing both tests.
const contactClass = Contact;
const contactInstance: Contact = new Contact();
```

- Declarations with the same name can be merged (Title!), to occupy the same identifier:
```ts
class Album {
  label: Album.AlbumLabel = new Album.AlbumLabel();
}
namespace Album {
  export class AlbumLabel {}
}
interface Album {
  artist: string;
}

let al: Album; // type test
let alValue = Album; // value test

// If we were to hover over { Album } in a TS workspace, we'd see that it
// occupies all three spaces! (Type, value, namespace!)
export { Album };
```