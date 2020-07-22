"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gpG_1 = require("./gpG");
var grade_1 = require("./grade");
function lcoG(a, b, m, adapter) {
    var ga = a.grade();
    var gb = b.grade();
    if (ga > gb) {
        return [];
    }
    else {
        var bitmap = a.bitmap ^ b.bitmap;
        var g = grade_1.default(bitmap);
        if (g !== (gb - ga)) {
            return [];
        }
        else {
            return gpG_1.default(a, b, m, adapter);
        }
    }
}
exports.default = lcoG;
