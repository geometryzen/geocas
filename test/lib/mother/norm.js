"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var squaredNorm_1 = require("./squaredNorm");
function norm(A) {
    return squaredNorm_1.default(A).sqrt();
}
exports.default = norm;
