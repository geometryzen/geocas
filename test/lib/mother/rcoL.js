"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gpL_1 = require("./gpL");
var grade_1 = require("./grade");
function rcoL(a, b, m, adapter) {
    var ga = a.grade();
    var gb = b.grade();
    if (ga < gb) {
        // May be more efficient to return null?
        return a.zero();
    }
    else {
        var bitmap = a.bitmap ^ b.bitmap;
        var g = grade_1.default(bitmap);
        if (g !== (ga - gb)) {
            // May be more efficient to return null?
            return a.zero();
        }
        else {
            return gpL_1.default(a, b, m, adapter);
        }
    }
}
exports.default = rcoL;
