"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isNumber_1 = require("../checks/isNumber");
function complex(x, y) {
    var that = {
        get x() {
            return x;
        },
        get y() {
            return y;
        },
        __abs__: function () {
            return complex(Math.sqrt(x * x + y * y), 0);
        },
        __add__: function (rhs) {
            return complex(x + rhs.x, y + rhs.y);
        },
        __sub__: function (rhs) {
            return complex(x - rhs.x, y - rhs.y);
        },
        __mul__: function (rhs) {
            if (isNumber_1.default(rhs)) {
                return complex(x * rhs, y * rhs);
            }
            else {
                return complex(x * rhs.x - y * rhs.y, y * rhs.x + x * rhs.y);
            }
        },
        __div__: function (rhs) {
            if (isNumber_1.default(rhs)) {
                return complex(x / rhs, y / rhs);
            }
            else {
                var denom = rhs.x * rhs.x + rhs.y * rhs.y;
                return complex((x * rhs.x + y * rhs.y) / denom, (y * rhs.x - x * rhs.y) / denom);
            }
        },
        __neg__: function () {
            return complex(-x, -y);
        },
        toString: function () {
            return "[" + x + ", " + y + "]";
        },
        __cos__: function () {
            throw new Error("TODO: cos");
        },
        __sin__: function () {
            throw new Error("TODO: sin");
        }
    };
    return that;
}
exports.default = complex;
