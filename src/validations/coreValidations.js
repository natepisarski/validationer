/*
Validation rules can be written in numerous ways. There are up to four arguments passed to each validation rule.
    - item : the currently targeted item's value
    - Success : The constructor for Success results. Creates one given a success message.
    - Error   : The constructor for Error results. Given an error message, it returns an Error result with that message.
    - context : Context is the surrounding object. It may also have a "context" property, which points to its parent.
                This is a recursive relationship, so you may find yourself needing `context.context.context.context...`

Here are the discrete types of validations that can happen:

export const validation = item => true;
export const validation = (item, Success, Failure, context) => true;
export const validation = (item, Success, Failure, context) => true;

Technically, you can return "true" for Success, a ValidationErrorResult for error (or vice-versa), but that doesn't make
the most sense.
 */

/**
 * Helps with more simple tests, where you just need the test, a success message, and an error message.
 *
 * An example probably helps to understand this better.
 *
 * `export const IsEven = SimpleTest(n => n % 2 === 0, 'Number was even', 'Number was not even')`
 *
 * You can also use (n, c) to capture the context if you would like to.
 * @param func
 * @param successMessage
 * @param errorMessage
 * @param inverse - Should the function return true or false? (DEFAULT: true)
 * @returns {function(*=, *, *, *=): Error}
 * @constructor
 */
export const SimpleTest = (func, successMessage, errorMessage, inverse = false) => {
    return (item, Success, Error, context) => {
        let functionThatRuns = (item, context) => func(item, context);
        if (inverse) {
            functionThatRuns = (item, context) => !func(item, context);
        }
        return functionThatRuns(item, context) ? Success(successMessage) : Error(errorMessage);
    }
};

/* Math & Number Related */
export const IsEvenTest = SimpleTest(
    number => number % 2 === 0,
    'Number was even',
'Number was not even'
);
export const IsOdd = SimpleTest(
    number => number % 2 === 1,
    'Number was odd',
    'Number was not odd'
);
export const IsGreaterThan = threshold => SimpleTest(
    number => number > threshold,
    `Number was greater than ${threshold}`,
    `Number was not greater than ${threshold}`
);
export const IsGreaterThanOrEqualTo = threshold => SimpleTest(
    number => number >= threshold,
    `Number was greater than or equal to ${threshold}`,
    `Number was not greater than or equal to ${threshold}`
);
export const IsLessThan = threshold => SimpleTest(
    number => number < threshold,
    `Number was less than ${threshold}`,
    `Number was not less than ${threshold}`
);
export const IsLessThanOrEqualTo = threshold => SimpleTest(
    number => number <= threshold,
    `Number was less than or equal to ${threshold}`,
    `Number was not less than or equal to ${threshold}`
);
export const IsDivisibleBy = divisor => SimpleTest(
    number => number % divisor === 0,
    `Number was divisible by ${divisor}`,
    `Number was not divisible by ${divisor}`
);

/* Invariant States */
// Null and undefined

const isUndefined = item => item === undefined;
export const IsUndefined = SimpleTest(
    isUndefined,
    'Item is undefined',
    'Item is not undefined'
);
export const IsNotUndefined = SimpleTest(
    isUndefined,
    'Item is not undefined',
    'Item is undefined',
    true
);

const isNull = item => item === null;
export const IsNull = SimpleTest(
    isNull,
    'Item is null',
    'Item is not null'
);
export const IsNotNull = SimpleTest(
    isNull,
    'Item is not null',
    'Item is null',
    true
);

/* Collections */
export const IsLongerThan = length => SimpleTest(
    collection => collection.length > length,
    `Collection is longer than ${length}`,
    `Collection is shorter than or equal to ${length}`
);
export const IsLongerThanOrEqualTo = length => SimpleTest(
    collection => collection.length >= length,
    `Collection is longer than or equal to ${length}`,
    `Collection is shorter than ${length}`
);
export const IsShorterThan = length => SimpleTest(
    collection => collection.length < length,
    `Collection is shorter than ${length}`,
    `Collection is longer than or equal to ${length}`
);
export const IsShorterThanOrEqualTo = length => SimpleTest(
    collection => collection.length <= length,
    `Collection is shorter than or equal to ${length}`,
    `Collection is longer than ${length}`
);

/* Strings and Text Processing */
export const DoesContain = text => SimpleTest(
    bodyText => bodyText.indexOf(text) !== -1,
    `String contains substring "${text}"`,
    `String does not contain substring "${text}"`
);
/* Geolocation */
/* Boolean grouping operations */
