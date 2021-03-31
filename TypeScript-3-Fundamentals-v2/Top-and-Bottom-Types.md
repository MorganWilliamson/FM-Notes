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