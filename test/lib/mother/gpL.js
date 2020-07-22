"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Blade_1 = require("./Blade");
var gpE_1 = require("./gpE");
function gpL(a, b, m, adapter) {
    var temp = gpE_1.default(a, b, adapter);
    var weight = temp.weight;
    // compute the meet (bitmap of annihilated vectors):
    var bitmap = a.bitmap & b.bitmap;
    // change the scale according to the metric.
    var i = 0;
    while (bitmap !== 0) {
        if ((bitmap & 1) !== 0) {
            weight = adapter.mulByNumber(weight, m[i]);
        }
        i++;
        bitmap = bitmap >> 1;
    }
    return Blade_1.default(temp.bitmap, weight, adapter);
}
exports.default = gpL;
