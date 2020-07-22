"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var norm_1 = require("./norm");
/**
 * The cosine of the angle between two blades.
 */
function cos(A, B) {
    var a = norm_1.default(A).scalarCoordinate();
    var b = norm_1.default(B).scalarCoordinate();
    return A.scp(B.rev()).divByScalar(a).divByScalar(b);
}
exports.default = cos;
