"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gpE_1 = require("./gpE");
var grade_1 = require("./grade");
function lcoE(a, b, adapter) {
    var ga = a.grade();
    var gb = b.grade();
    if (ga > gb) {
        // May be more efficient to return null?
        return a.zero();
    }
    else {
        var bitmap = a.bitmap ^ b.bitmap;
        var g = grade_1.default(bitmap);
        if (g !== (gb - ga)) {
            // May be more efficient to return null?
            return a.zero();
        }
        else {
            return gpE_1.default(a, b, adapter);
        }
    }
}
exports.default = lcoE;
