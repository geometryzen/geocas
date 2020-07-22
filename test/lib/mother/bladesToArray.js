"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function bladesToArray(map) {
    var bitmaps = Object.keys(map);
    var rez = [];
    for (var i = 0; i < bitmaps.length; i++) {
        var bitmap = bitmaps[i];
        var blade = map[bitmap];
        rez.push(blade);
    }
    return rez;
}
exports.default = bladesToArray;
