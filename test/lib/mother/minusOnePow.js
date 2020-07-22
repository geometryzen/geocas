"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * pow(-1, i), i.e. (-1) raised to the i'th power.
 */
function minusOnePow(i) {
    return ((i & 1) === 0) ? 1 : -1;
}
exports.default = minusOnePow;
