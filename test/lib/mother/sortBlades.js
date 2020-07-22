"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function compareFn(a, b) {
    if (a.bitmap < b.bitmap) {
        return -1;
    }
    else if (a.bitmap > b.bitmap) {
        return +1;
    }
    else {
        return 0;
    }
}
// TODO: This could be replaced by a more functional implementation using reduce?
function sortBlades(blades) {
    var rez = [];
    for (var i = 0; i < blades.length; i++) {
        var B = blades[i];
        rez.push(B);
    }
    rez.sort(compareFn);
    return rez;
}
exports.default = sortBlades;
