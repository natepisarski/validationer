import * as _ from 'lodash';
export const IsLongerThan10Characters = (text) => {
    return text.toString().length > 10;
};

export const IsShorterThan5Characters = (text) => {
    return text.toString().length < 5;
};

export const IsNumeric = (text) => {
    return _.isNumber(text);
};
