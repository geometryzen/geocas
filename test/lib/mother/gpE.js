"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Blade_1 = require("./Blade");
var canonicalReorderingSign_1 = require("./canonicalReorderingSign");
function gpE(a, b, adapter) {
    var bitmap = a.bitmap ^ b.bitmap;
    var sign = canonicalReorderingSign_1.default(a.bitmap, b.bitmap);
    var scale = adapter.mul(a.weight, b.weight);
    if (sign > 0) {
        return Blade_1.default(bitmap, scale, adapter);
    }
    else {
        return Blade_1.default(bitmap, adapter.neg(scale), adapter);
    }
}
exports.default = gpE;
