import {validationerEngine} from "./src/engine";
import {
    IsEven,
    IsOdd,
    IsGreaterThan,
    IsGreaterThanOrEqualTo,
    IsLessThan,
    IsLessThanOrEqualTo,
    IsDivisibleBy,
    IsUndefined,
    IsNotUndefined,
    IsNull,
    IsNotNull,
    IsLongerThan,
    IsLongerThanOrEqualTo,
    IsShorterThan,
    IsShorterThanOrEqualTo,
    DoesContain
} from './src/validations/coreValidations';
import {ValidationErrorResult, ValidationSuccessResult} from "./src/validationResults";

describe('Basic Validations', () => {
    it('Can run validations', () => {
        const object = {
            age: 4,
            favoriteNumber: 7,
            ctxtTest: null,
            nested: {
                id: 40
            }
        };
        const validations = {
            age: [IsEven, IsOdd],
            favoriteNumber: IsOdd,
            nested: {
                id: [IsEven, IsOdd]
            }
        };

        // const validationResult = validationerEngine(object, validations);

        // const justNested = validationResult.nested;
        // TODO: Come back and write unit tests
        expect(1).toBe(1);
    });
});

const objectToTest = {
    evenNumber: 2,
    oddNumber: 7,

    greaterThanFive: 6,
    greaterThanOrEqualToFive: 5,

    lessThanTen: 9,
    lessThanOrEqualToTen: 10,

    isDivisibleByFive: 25,

    isUndefinedValue: undefined,
    isNotUndefinedValue: {},

    isNullValue: null,
    isNotNullValue: 4,

    isLongerThanTwo: [1, 2, 3],
    isLongerThanOrEqualToTwo: [1, 2],

    isShorterThanTwo: [1],
    isShorterThanOrEqualToTwo: [1, 2],

    containsJack: 'jack is a dope name'
};

const objectValidations = {
    evenNumber: IsEven,
    oddNumber: IsOdd,

    greaterThanFive: IsGreaterThan(5),
    greaterThanOrEqualToFive: IsGreaterThanOrEqualTo(5),

    lessThanTen: IsLessThan(10),
    lessThanOrEqualToTen: IsLessThanOrEqualTo(10),

    isDivisibleByFive: IsDivisibleBy(5),

    isUndefinedValue: IsUndefined,
    isNotUndefinedValue: IsNotUndefined,

    isNullValue: IsNull,
    isNotNullValue: IsNotNull,

    isLongerThanTwo: IsLongerThan(2),
    isLongerThanOrEqualToTwo: IsLongerThanOrEqualTo(2),

    isShorterThanTwo: IsShorterThan(2),
    isShorterThanOrEqualToTwo: IsShorterThanOrEqualTo(2),

    containsJack: DoesContain('jack')
};

describe('Global Test - Test the engine and all known validations', () => {
    const result = validationerEngine(objectToTest, objectValidations);
    for(const key of Object.keys(result)) {
        expect(result[key]).toBeInstanceOf(ValidationSuccessResult)
    }

});

describe('Distiller - Objects are distilled to the proper boolean values', () => {

});
