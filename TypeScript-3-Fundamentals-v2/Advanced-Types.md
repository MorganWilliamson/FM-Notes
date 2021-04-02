# Mapped & Conditional Types
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
