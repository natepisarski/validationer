/*
Validation rules can be written in numerous ways

export const validation = item => true;
export const validation = (item, context) => true;
export const validation = (item, context, Success, Failure) => true;
export const validation = new class {
    generateErrorMessage() {
    }
}
 */

// Type one validations: Return true or false. The engine uses true to mean Success, false to mean Error.
export const isEven = number => (number % 2) === 0;
export const isOdd = number => (number % 2) !== 0;

// Type two validations: Return true or false given context. Context here is the entire object being evaluated.
// Should not be used to validate the entire object. It should be used for cases where multiple properties need to be validated
// at once.
export const contextHasMoreThanThreeKeys = (item, context) => Object.keys(context).length > 3;

// Type three validations: These validations also get two constructors injected. These constructors allow them to create
// custom success and error messages. The item or context can be used to customize these messages.

// Note: technically type 1, 2, and 3 are the same, just one captures less parameters.
export const isGreaterThanFour = (item, context, Success, Error) => item > 4
    ? Success('Item is greater than 4')
    : Error('Item is not greater than 4');
