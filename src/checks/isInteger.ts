import { isNumber } from '../checks/isNumber';

export function isInteger(x: unknown): x is number {
    // % coerces its operand to numbers so a typeof test is required.
    // Not ethat ECMAScript 6 provides Number.isInteger().
    return isNumber(x) && x % 1 === 0;
}
