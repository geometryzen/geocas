import mustBeNumber from '../checks/mustBeNumber';
/**
 * For testing purposes.
 */
var Float = /** @class */ (function () {
    function Float(value) {
        this.value = value;
        mustBeNumber('value', value);
    }
    return Float;
}());
export default Float;
