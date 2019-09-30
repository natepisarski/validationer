import {validationer} from "./index";
import {IsLongerThan10Characters, IsShorterThan5Characters, IsNumeric} from "./validations/testValidations";

describe('Basic Validations', () => {
    it('Can run property validations', () => {
        const testObject = {
            firstName: 'Nathanielaaa',
            lastName: 'Pis',
            phone: 6097747183,
            email: {
                first: '1111111111111111111',
                second: '111hhhhhh'
            }
        };
        const value = validationer(testObject)({
            firstName: IsLongerThan10Characters,
            lastName: IsShorterThan5Characters,
            phone: [IsNumeric, IsNumeric],
            email: {
                first: IsLongerThan10Characters,
                second: IsShorterThan5Characters
            }
        });
        expect(value.length).toBe(0);
    });
});
