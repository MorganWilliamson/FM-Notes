# Generics and Type Parameters
- *Generics* parameterize types in the same way that functions parameterize values.
-- TS Docs: https://www.typescriptlang.org/docs/handbook/2/generics.html 
- Syntax EX:
```ts
<!-- param determines the value of x -->
    function wrappedValue(x: any) {
        return {
            value: x
        };
    }

<!-- type param determines the type of x -->
    interface WrappedValue<X> {
        value: X;
    }

    let val: WrappedValue<string[]> = { value: [] };
    val.value;
```
-- Note that `T` is treated as a common placeholder name in other languages, like C++. 
- Side-note: Remember that TS will try to infer types when not explicitly stated.
-- `const number = "32"` <- TS will infer this as a string, and act as though you've
declared it as such. Keep in mind that it's still best to explicitly type variables
in most situations. TS may infer a type incorrectly. 

# Constraints and Scope
- Note that type parameters can also have constraints. 
-- In the following example, we're writing a function that can convert an array to a
dictionary. We're using a constraint to require that we have an id (in the form of a
string), and using that as our key in the dictionary. This also allows us to still 
access other information contained within each object, after its been passed into 
the dictionary. EX: 
```ts
function arrayToDict<T extends { id: string }>(array: T[]): { [k: string]: T } {
  const out: { [k: string]: T } = {};
  array.forEach(val => {
    out[val.id] = val;
  });
  return out;
}

const myDict = arrayToDict([
  { id: "a", value: "first", lisa: "Huang" },
  { id: "b", value: "second" }
]);
```
- Scope acts much the same way as it does in JS. 
-- Function scope is "one-way glass"; you can see from the inside out, but
can't see from the outside in. EX:
```ts
function startTuple<T>(a: T) {
    // b is NOT accessible here
  return function finishTuple<U>(b: U) {
    // b is accessible here
    return [a, b] as [T, U];
  };
}
const myTuple = startTuple(["first"])(42);
```