"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isScalar_1 = require("./isScalar");
function multivectorGE(lhs, rhs, field) {
    if (isScalar_1.default(lhs) && isScalar_1.default(rhs)) {
        var l = lhs.scalarCoordinate();
        var r = rhs.scalarCoordinate();
        return field.ge(l, r);
    }
    else {
        throw new Error(lhs + " >= " + rhs + " is not implemented.");
    }
}
exports.default = multivectorGE;
