"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mustBeNumber_1 = require("../checks/mustBeNumber");
/**
 * For testing purposes.
 */
var Float = /** @class */ (function () {
    function Float(value) {
        this.value = value;
        mustBeNumber_1.default('value', value);
    }
    return Float;
}());
exports.default = Float;
