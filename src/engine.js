/*
This is the source file for the validationer engine. It controls all of the evaluation of the validation rules in the
system. Copied below is an example of all possible types of validationer rules that can be used in the system.

Comments are used above each type of rule to describe it.

 * {
//  If item has 'id', it must be a valid GUID. IsGUID
 *  id: IsGuid,
 *  name: [IsString, IsLongerThan(4)]
 *  dob: IsBetween('2019-02-12', '2019-05-12),
 *  permissionLevel: (prop, context, Success, Failure) => prop === 1 ? Success() : Failure('Did not work'),
 *  pet: {
 *      species: [IsDog, OlderThan('5y')],
 *      ...
 *  }
 * }
 */

import {ValidationErrorResult, ValidationSuccessResult} from "./validationResults";
import * as _ from "lodash";

const SuccessConstructor = successMessage => new ValidationSuccessResult(successMessage);
const ErrorConstructor = errorMessage => new ValidationErrorResult(errorMessage);

const runSingleValidation = (item, context, validation) => {
    // Here, the validation is a function that takes (item, context, success, error)
    const validationResult = validation(item, SuccessConstructor, ErrorConstructor, context);

    // A constructor has already been used, and this validation is properly formatted
    if (validationResult instanceof ValidationErrorResult) {
        return validationResult;
    }

    return validationResult ? SuccessConstructor() : ErrorConstructor();
};

const runArrayValidations = (item, context, array) => {
    return array.map(validation => runSingleValidation(item, context, validation));
};


/**
 * Run the validations for an object. This is the objective "entry point" of validationer, but it can also be used for
 * nested objects within the validation structure.
 * @param item - The object itself
 * @oaran validations - The validations object itself
 * @param context - If this is a nested object, this will be passed in. This refers to the parent object. It has a prop,
 *                  called 'context' that refers to ITS parent. All the way up until a null context.
 */
const runObjectValidations = (item, validations, context = null) => {
    const currentContextObject = {
        context,
        ...item
    };

    let validationStructure = {};

    for(const key of Object.keys(item)) {
        const currentValue = item[key];
        const currentValidation = validations[key];

        if (!currentValidation) {
            continue;
        }

        if (_.isArray(currentValidation)) {
            validationStructure[key] = runArrayValidations(currentValue, currentContextObject, currentValidation);
            continue;
        }

        if (!_.isFunction(validations[key]) && _.isObject(validations[key])) {
            validationStructure[key] = runObjectValidations(currentValue, currentValidation, currentContextObject);
            continue;
        }

        validationStructure[key] = runSingleValidation(currentValue, currentContextObject, currentValidation);
    }
    return validationStructure;
};

// This returns a mapping of the results of the validations compared to their object structure. This is not a function
// which will distill the validation runs down to a "boolean".
export const validationerEngine = (object, validations) => {
    return runObjectValidations(object, validations);
};
