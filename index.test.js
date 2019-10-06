// import {validationer} from "./index";
// import {IsLongerThan10Characters, IsShorterThan5Characters, IsNumeric} from "./validations/testValidations";
//
// describe('Basic Validations', () => {
//     it('Can run property validations', () => {
//         const testObject = {
//             email: {
//                 first: 'abcdefghijklmnop',
//                 second: 'abc'
//             }
//         };
//         const value = validationer(testObject)({
//             email: {
//                 first: IsLongerThan10Characters,
//                 second: IsShorterThan5Characters
//             }
//         });
//         expect(value.length).toBe(0);
//     });
// });

import {validationerEngine} from "./src/engine";
import {isEven, isOdd, isGreaterThanFour, contextHasMoreThanThreeKeys} from './src/validations/coreValidations';

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
            age: [isGreaterThanFour, isEven, isOdd],
            favoriteNumber: isOdd,
            ctxtTest: contextHasMoreThanThreeKeys,
            nested: {
                id: [isEven, isOdd]
            }
        };

        const validationResult = validationerEngine(object, validations);

        const justNested = validationResult.nested;
        // TODO: Come back and write unit tests
        expect(1).toBe(1);
    });
});
