# Mapped Types
- Mapped Types allow the use of an interface to transform keys into the types
- that are associated with those keys. 
-- Mike notes that you can utilize an interface as a single source of truth in 
your app, and treat it like an object where you pull keys and values as necessary.
--- We saw this in an earlier example with communication methods: 
```ts
// Set up our interface
interface CommunicationMethods {
  email: HasEmail;
  phone: HasPhoneNumber;
  fax: { fax: number };
}

// Utilize inside of the `contact` function
function contact<K extends keyof CommunicationMethods>(
  method: K,
  contact: CommunicationMethods[K] // 💡turning key into value -- a *mapped type*
) {
  //...
}
contact("email", { name: "foo", email: "mike@example.com" });
contact("phone", { name: "foo", phone: 3213332222 });
contact("fax", { fax: 1231 });

// We can get all values by mapping through all keys
type AllCommKeys = keyof CommunicationMethods;
type AllCommValues = CommunicationMethods[keyof CommunicationMethods];
```

# Type Queries
- Type Queries allow us to obtain the type from a value using type.
-- For example, `typeof` allows us to get the type of a symbol in JavaScript. EX:
```js
const alreadyResolvedNum = Promise.resolve(4)

type ResolveType = typeof Promise.resolve;
```
--- The same can be accomplished in TypeScript. EX:
```ts
const alreadyResolvedNum = Promise.resolve(4)

let x: typeof Promise.resolve
```

# Conditional Types
- Conditional Types allow for the use of a ternary operator with types.
-- We can also extract type parameters using the `infer` keyword. Note: this is
the only place in TS where you can use the `infer` keyword, but it lets you "pluck
out" the type that the Promise resolves to.
-- EX:
```ts
type EventualType<T> = T extends Promise<infer S> // if T extends Promise<any>
  ? S // extract the type the promise resolves to
  : T; // otherwise just let T pass through

let a: EventualType<Promise<number>>;
let b: EventualType<number[]>;
```

