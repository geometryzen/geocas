"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bitCount_1 = require("./bitCount");
/**
 * Returns sign change due to putting the blade blades represented
 * by <code>a<code> and <code>b</code> into canonical order.
 */
function canonicalReorderingSign(a, b) {
    // Count the number of basis vector flips required to
    // get a and b into canonical order.
    a >>= 1;
    var sum = 0;
    while (a !== 0) {
        sum += bitCount_1.default(a & b);
        a >>= 1;
    }
    // even number of flips -> return +1
    // odd number of flips -> return -1
    // The test (sum & 1) === 0 evaluates to true for even numbers.
    return ((sum & 1) === 0) ? 1 : -1;
}
exports.default = canonicalReorderingSign;
