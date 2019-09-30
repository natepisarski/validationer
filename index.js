import * as _ from 'lodash';
/*
1 - Multiple can be run
2 - An object can be used to run nested validations
validationer({name: 'Tod', phone: '6097747183', birthday: { year: '2019' }}})({
    name: IsAlphanumeric,
    phone: [IsPhone, IsRequired, IsLengthGreaterThan(5)],
    birthday: {
        year: IsElapsedYear,
        month: IsMonthNumber,
        day: IsMonthDay(month)
    }
})
 */

const executeArrayValidations = (contextObject, validations) => {
    for(const validator of validations) {
        if (!validator(contextObject)) {
            console.debug('Returning false for array validation');
            return false;
        }
    }
    console.debug('Returning true for array validation');
    return true;
};

const executeObjectValidations = (contextObject, validations) => {
    let collection = [];
    for(const key of Object.keys(validations)) {

        if (_.isArray(validations[key])) {
            collection.push(executeArrayValidations(contextObject[key], validations[key]));
            continue;
        }
        if (_.isObject(validations[key])) {
            console.debug('Running object validation ' + key);
            console.debug(contextObject);
             collection.push(executeObjectValidations(contextObject[key],  validations[key]));
             continue;
        }
        // This must be a regular one-to-one validation
        collection.push((validations[key])(contextObject[key]));
    }

    console.debug('RETURNING_COLLECTION');
    console.debug(collection);
    return collection.filter(run => run === false);
};
/* validations ultimately have the function signature of
    Scalar/Object => true/false
   const isEven = t => !!(t % 2)
 */
export const validationer = contextObject => validations => {
    return executeObjectValidations(contextObject, validations);
};
