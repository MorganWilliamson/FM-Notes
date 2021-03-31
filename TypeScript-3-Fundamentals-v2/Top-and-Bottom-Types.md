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
