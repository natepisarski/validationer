import {validationer} from "./index";
import {IsLongerThan10Characters, IsShorterThan5Characters, IsNumeric} from "./validations/testValidations";

describe('Basic Validations', () => {
    it('Can run property validations', () => {
        const testObject = {
            email: {
                first: 'abcdefghijklmnop',
                second: 'abc'
            }
        };
        const value = validationer(testObject)({
            email: {
                first: IsLongerThan10Characters,
                second: IsShorterThan5Characters
            }
        });
        expect(value.length).toBe(0);
    });
});
