# validationer
> Make validation the easiest thing you do

Validationer is a Javascript library for live input validation. It is (mostly) just an engine for building validation rules that can be composed, combined, and chained together in special ways. We also provide some validations out-of-the-box.

This library is specifically designed for validating entire Javascript objects, particularly ones which have deep nested data, but a known schema.

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
    age: [IsEven, IsOdd], // FAILS BECAUSE OF THIS - can't be even and odd
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
Validationer is an engine more than it is a library. Creating your own validation rules is integral to using the package.

## High Customization
Any Javascript function that takes the arguments: `item, Success, Error, context` can be a validation rule.

```javascript
export const IsOverTen = (item, Succeess, Error, context) => {
  if (item > 10) {
    return Success('Item is over ten');
  }
  return Error('Item is not over ten');
}
```

The only parameter you _really_ need is `item`, which is the value of the property being validated. The rest are:

- `Success`: Choose a custom success message
- `Error`: Choose a custom error message
- `context`: The entire object being validated, for complex rules.

## Low Customization
If your function returns `true` or `false`, then validationer will interpret `true` to mean `Success` and vice-versa. This lets you keep rules brief, such as:

```javascript
export const IsOverTen = item => item > 10;
```

## Medium Customization
Since most Validation rules you write will follow that same form:

> IF something, SUCCESS something, else ERROR something

A function named `SimpleTest` is provided for your custom validations. That way, you can write your functions like this:

```javascript
export const IsEven = SimpleTest(
    number => number % 2 === 0,
    'Number was even',
'Number was not even'
);
```

In this case, you just give it a true / false test, a success message, and an error message.
