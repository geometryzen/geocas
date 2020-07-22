"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function squaredNorm(A) {
    return A.scp(A.rev());
}
exports.default = squaredNorm;
