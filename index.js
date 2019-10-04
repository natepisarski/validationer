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

/**
 * Used to execute an array of validations on one property.
 * Syntax:
 * {
 *     name: [IsString, IsLongerThan(0)]
 * }
*/
const executeArrayValidations = (contextObject, validations) => {
    for(const validator of validations) {
        if (!validator(contextObject)) {
            return false;
        }
    }

    return true;
};

/**
 * This is the core of validationer. Given an object, validate it. This is the early stages of the project, so in lieu
 * of more in-depth analysis of the validationer API, straight-up validationer syntax is provided below in this docblock
 *
 * {
 *  id: IsGuid,
 *  name: [IsString, IsLongerThan(4)]
 *  dob: IsBetween('2019-02-12', '2019-05-12),
 *  permissionLevel: (prop, context, Success, Failure) => prop === 1 ? Success() : Failure('Did not work'),
 *  pet: {
 *      species: [IsDog, OlderThan('5y')],
 *      ...
 *  }
 * }
 *
 * Each rval is an object of the form (prop, context = null) => Success | Failure
 *
 * Success is an object of the form
 * {
 *     isSuccess: true,
 *     isError: false,
 *     message: ''
 * }
 *
 * Failure is an object of the form
 * {
 *     isSuccess: false,
 *     isError: true,
 *     message: ''
 * }
 *
 * If the rval (or a member in the rval) is a function, Success and Failure constructors are automatically injected.
 *
 * At the end, you wind up with a nested-ish set of
 * {
 *     id: [Failure1, Failure2, Success1],
 *     pet: {
 *         IsDog: [Success1]
 *     }
 * }
 *
 * This is the "validation map"
 *
 * The validation map can be parsed with special options. Some of those are listed below:
 *
 * {
 *     global: {
 *         failureCriteria: All | One | None
 *     },
 *     id: {
 *         failureCriteria: None
 *     },
 *     pet: {
 *         failureCriteria: All
 *     }
 * }
 *
 * that determines how to distill down a validation map into a boolean "this worked or didn't" value.
 * @param contextObject
 * @param validations
 * @returns {*[]}
 */
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
