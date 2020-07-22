"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Blade_1 = require("./Blade");
var bladesToArray_1 = require("./bladesToArray");
// TODO: This could be replaced by a more functional implementation using reduce?
function simplify(blades, adapter) {
    var map = {};
    for (var i = 0; i < blades.length; i++) {
        var B = blades[i];
        var existing = map[B.bitmap];
        if (existing) {
            var scale = adapter.add(existing.weight, B.weight);
            if (adapter.isZero(scale)) {
                delete map[B.bitmap];
            }
            else {
                map[B.bitmap] = Blade_1.default(B.bitmap, scale, adapter);
            }
        }
        else {
            if (!adapter.isZero(B.weight)) {
                map[B.bitmap] = B;
            }
        }
    }
    return bladesToArray_1.default(map);
}
exports.default = simplify;
