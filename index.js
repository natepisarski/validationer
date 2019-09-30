import * as _ from 'lodash';
/*
1 - Multiple can be run
2 - An object can be used to run nested validations
validationer({name: 'Tod', phone: '7777777777', birthday: { year: '2019' }}})({
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
            return false;
        }
    }

    return true;
};

const executeObjectValidations = (contextObject, validations) => {
    let collection = [];
    for(const key of Object.keys(validations)) {

        if (_.isArray(validations[key])) {
            collection.push(executeArrayValidations(contextObject[key], validations[key]));
            continue;
        }
        if (!_.isFunction(validations[key]) && _.isObject(validations[key])) {
             collection.push(executeObjectValidations(contextObject[key],  validations[key]));
             continue;
        }
        // This must be a regular one-to-one validation
        collection.push((validations[key])(contextObject[key]));
    }

    return collection.filter(run => run === false);
};
/* validations ultimately have the function signature of
    Scalar/Object => true/false
   const isEven = t => !!(t % 2)
 */
export const validationer = contextObject => validations => {
    return executeObjectValidations(contextObject, validations);
};
