# This Section Will review:
- Passing private values through typed code
- Exhaustive Conditionals
- Type Guards

# Top Types
- Top Types are types that can hold any value. 
-- There are two Top Types in TS- `any` and `unknown`.
- Any: 
-- `any` is treated like vanilla JS; there's no type or error checking, you're 
able to access just about anything you want through `any`.
-- `any` is great for parts of our programs where we want to maintain flexibility. 
Example: sometimes a `Promise<any>` is fine when we don't care at all about the
resolved value. 
```ts
async function logWhenResolved(p: Promise<any>) {
  const val = await p;
  console.log("Resolved to: ", val);
}
```
- Unknown: 
-- `unknown`, while happy to hold any value, cannot be used directly. `unknown` 
must be narrowed in some way before you're actually able to use it. For example, 
in an API response. You know you're getting JSON back, but you need to perform
some sort of assertion to ensure the JSON is what you hope it is. That narrowing
is something we can do using Type Guards, which we'll cover later. 
-- `Unknowns` are good for "private" values that we don't want to expose through a
public API. They can still hold any value, we just must narrow the type before 
we're able to use it.

# Type Guards
- Type Guards could be built-in, or user defined. 
-- `typeof` and `instanceof` are examples of type guards that we're already 
familiar with. 
```ts
if (typeof myUnknown === "string") {
  // in here, myUnknown is of type string
  myUnknown.split(", "); // ✅ OK
}
if (myUnknown instanceof Promise) {
  // in here, myUnknown is of type Promise<any>
  myUnknown.then(x => console.log(x));
}
```
-- User-defined type guards are great for covering more specific circumstances
in our code that would benefit from type checking. These custom type guards are
created using a function that returns a Boolean. An example Mike gives for a
custom type guard is one that checks whether or not a value is defined. EX: 
```ts
// my most common guard
function isDefined<T>(arg: T | undefined): arg is T {
  return typeof arg !== "undefined";
}
```
Other given examples include: 
```ts
// 💡 Note return type
function isHasEmail(x: any): x is HasEmail {
  return typeof x.name === "string" && typeof x.email === "string";
}

if (isHasEmail(myUnknown)) {
  // In here, myUnknown is of type HasEmail
  console.log(myUnknown.name, myUnknown.email);
}
```

# Unknowns & Branded Types
- Dealing with multiple unknowns
-- We kind of lose some of the benefits of structural typing when using 
`unknown`. Look how we can get mixed up below: 
```ts
let aa: unknown = 41;
let bb: unknown = ["a", "string", "array"];
bb = aa;
```
TS doesn't see an error with the above code snippet, even though `aa` is
a number and `bb` is an array. Technically speaking, both of them are 
unknown types. 
-- Working with unknowns is almost like working through opaque glass, in
that we can't see into it but it can hold whatever it wants. "It's very easy
to get a couple sort of different opaque values mixed up and interchanged with
each other." 
- Alternative to unknowns: Branded Types
-- "One thing we can do to avoid this is to create types with structures that are
difficult to accidentally match. This involves unsafe casting, but it's ok if we
do things carefully." 
-- In TS, casting is when you're forcing a value to become a particular type. This
is an unsafe practice, and is typically not recommended. 
-- EX: 
```ts
/* two branded types, each with "brand" and "unbrand" functions */
interface BrandedA {
  __this_is_branded_with_a: "a";
}
function brandA(value: string): BrandedA {
  return (value as unknown) as BrandedA;
}
function unbrandA(value: BrandedA): string {
  return (value as unknown) as string;
}

interface BrandedB {
  __this_is_branded_with_b: "b";
}
function brandB(value: { abc: string }): BrandedB {
  return (value as unknown) as BrandedB;
}
function unbrandB(value: BrandedB): { abc: string } {
  return (value as unknown) as { abc: string };
}

let secretA = brandA("This is a secret value");
let secretB = brandB({ abc: "This is a different secret value" });

// Unlike with unknowns, TS won't let these two get mixed up and intertwined.
// secretA and secretB are two distinct variables. 
// secretA = secretB; // ✅ No chance of getting these mixed up
// unbrandB(secretA);
// unbrandA(secretB);

// To retrieve our original values
let revealedA = unbrandA(secretA);
let revealedB = unbrandB(secretB);
```
-- As far as use cases go, this is great for keeping people from knowing what
types are used in a certain area or on certain objects. It's not meant to be 
used as a security feature, just as a difficult piece to unwind. This is meant
to discourage people, draw a clear line in the sand. 
-- The other tip Mike gives with branding/unbranding is that it should all be 
done in one place. Don't brand in multiple areas, unbrand in multiple other areas.
Keep it all collected, concise, and consistent. You'll thank yourself later. 

