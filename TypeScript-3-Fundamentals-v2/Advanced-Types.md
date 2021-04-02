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

# Built-in Utility Types
- Utility Types are meant to facilitate common type transformations, and are
- available globally. 
-- The utility types Mike introduces are `partial`, `pick`, `extract`, `exclude`,
and `record`. The TS Docs include a list of around 21 utility types. Link:
https://www.typescriptlang.org/docs/handbook/utility-types.html
- *Partial* allows us to make all properties on an object optional. 
-- This is great if someone only gives you a subset of the properties available
on an object. For example, a case in which a user may not have an email: 

```ts
type MayHaveEmail = Partial<HasEmail>;
const me: MayHaveEmail = {}; // everything is optional
```

- *Pick* allows us to select one or more properties off of something. 
-- In using `pick`, you're *picking* property types off of an object tree. You
are selecting what is or isn't available in a given circumstance. EX: 
```ts 
type HasThen<T> = Pick<Promise<T>, "then" | "catch">;

let hasThen: HasThen<number> = Promise.resolve(4);
hasThen.then; // hasThen would only have access to "then" or "catch"
```

- *Extract* lets us obtain a subset of available types. 
-- When you have a big intersection type, extract lets you select things that
are assignable to a particular type. 
```ts
type OnlyNumbers = Extract<"a" | "b" | 1 | 2, number>;
```

- *Exclude* lets us obtain a subset of types that are NOT available.
-- `Exclude` functions very much as the inverse to `extract`.

- *Record* helps us create a type with specified property keys and the same type.
-- TS Docs: Constructs an object type whose property keys are Keys and whose 
property values are Type. This utility can be used to map the properties of a 
type to another type. EX: 
```ts
interface CatInfo {
  age: number;
  breed: string;
}

type CatName = "miffy" | "boris" | "mordred";

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};

cats.boris;
// ^ = const cats: Record<CatName, CatInfo>
```