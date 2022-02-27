import { mustBeNumber } from '../checks/mustBeNumber';

/**
 * For testing purposes.
 */
export class Float {
    constructor(public value: number) {
        mustBeNumber('value', value);
    }
}
