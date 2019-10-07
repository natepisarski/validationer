# validationer
> Make validation the easiest thing you do

Validationer is a Javascript library for validating objects. It excels in doing very complex validations, which can then be nested, composed, and all-around re-used 
for future validations. This package is both the engine which does the validating, as well as some out-of-the-box validations.

# Examples

**Validating a standard object**
```javascript

validationer({ id: 4, name: 'Nathaniel'}, {
  id: [IsNumber, IsEven],
  name: IsLongerThan(5) 
});
```

**Validating an object with nested objects**
```javascript
const object = {
    age: 4,
    favoriteNumber: 7,
    nested: {
        id: 40
    }
};
const validations = {
    age: [IsEven, IsOd], // FAILS BECAUSE OF THIS
    favoriteNumber: IsOdd,
    nested: {
        id: [IsEven, IsOdd]
    }
};

validationer(object, validations);
```

# Existing Validations
* IsEven
* IsOdd
* IsGreaterThan(x)
* IsGreaterThanOrEqualTo(x)
* IsLessThan(x)
* IsLessThanOrEqualTo(x)
* IsDivisibleBy(x)
* IsUndefined
* IsNotUndefined
* IsNull
* IsNotNull
* IsLongerThan(x)
* IsLongerThanOrEqualTo(x)
* IsShorterThan(x)
* IsShorterThanOrEqualTo(x)
* DoesContain(x)

# Extending Validationer
The idea is that the validationer "standard library" will grow to include everything you might want to validate. Obviously, 
this being the real world and all, that will be impossible. So, you can create your own validation rules to plug into the
validationer engine.

Any Javascript function that takes the arguments: `item, Success, Error, context` can be a validation rule.

```javascript
export const IsOverTen = (item, Succeess, Error, context) => {
  if (item > 10) {
    return Success('Item is over ten');
  }
  return Error('Item is not over ten');
}
```

The only parameter you _really_ need is `item`. `Success` and `Failure` let you choose your own error and success messages,
while `context` points to the overall parent object. Since every parameter is optional, you don't need to overcomplicate things.

If your function returns `true` or `false`, the validationer engine will interpret `true` to mean `Success`. This works well,
because most existing helper libraries rely on simple booleans to describe status. So these can be used here.

Since most Validation rules you write will follow that same form:

> IF something, SUCCESS something, else ERROR something

A function names `SimpleTest` is provided for your custom validations. That way, you can write your functions like this:

```javascript
export const IsEven = SimpleTest(
    number => number % 2 === 0,
    'Number was even',
'Number was not even'
);
```

In this case, you just give it a true / false test, a success message, and an error message.
