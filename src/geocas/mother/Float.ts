import mustBeNumber from '../checks/mustBeNumber';

/**
 * For testing purposes.
 */
export default class Float {
    constructor(public value: number) {
        mustBeNumber('value', value);
    };
}
