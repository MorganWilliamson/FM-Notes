/* 
From TS Docs: 
One of TypeScript’s core principles is that type checking focuses on the shape
 that values have. This is sometimes called “duck typing” or “structural subtyping”.
 In TypeScript, interfaces fill the role of naming these types, and are a powerful 
 way of defining contracts within your code as well as contracts with code outside 
 of your project.
*/
// Instead of this: 
function getFullName(contact: { firstName: string, middleName: string, lastName: string }) {
    return [contact.firstName, contact.middleName, contact.lastName]
        .filter(Boolean)
        .join(" ");
}

// Create an interface to simplify and reuse: 
interface Person {
    firstName?: string;
    middleName?: string;
    lastName?: string;
}

function getFullNameAgain(contact: Person) {
    return [contact.firstName, contact.middleName, contact.lastName]
        .filter(Boolean)
        .join(" ");
}
/* 
The `Person` interface can now be used in other areas of our code that 
 utilize the firstName, middleName, and/or lastName properties. Also, 
 remember that putting a `?` before the colon makes that arg optional. 
*/