"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// math
var Blade_1 = require("./lib/mother/Blade");
var Complex_1 = require("./lib/mother/Complex");
var ComplexFieldAdapter_1 = require("./lib/mother/ComplexFieldAdapter");
var cosineOfAngleBetweenBlades_1 = require("./lib/mother/cosineOfAngleBetweenBlades");
var norm_1 = require("./lib/mother/norm");
var NumberFieldAdapter_1 = require("./lib/mother/NumberFieldAdapter");
var orthoFramesToVersor_1 = require("./lib/mother/orthoFramesToVersor");
var Algebra_1 = require("./lib/mother/Algebra");
var config_1 = require("./lib/config");
var squaredNorm_1 = require("./lib/mother/squaredNorm");
/**
 *
 */
var GeoCAS = {
    /**
     * The publish date of the latest version of the library.
     */
    get LAST_MODIFIED() { return config_1.default.MODIFIED_AT; },
    /**
     * The semantic version of the library.
     */
    get VERSION() { return config_1.default.VERSION; },
    get blade() { return Blade_1.default; },
    get complex() { return Complex_1.default; },
    get ComplexFieldAdapter() { return ComplexFieldAdapter_1.default; },
    get cosineOfAngleBetweenBlades() { return cosineOfAngleBetweenBlades_1.default; },
    get norm() { return norm_1.default; },
    get NumberFieldAdapter() { return NumberFieldAdapter_1.default; },
    get orthoFramesToVersor() { return orthoFramesToVersor_1.default; },
    get algebra() { return Algebra_1.algebra; },
    get squaredNorm() { return squaredNorm_1.default; }
};
exports.default = GeoCAS;
