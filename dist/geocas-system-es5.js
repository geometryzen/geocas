System.register("geocas/mother/Complex.js", ["../checks/isNumber"], function (exports_1, context_1) {
    "use strict";

    var isNumber_1;
    var __moduleName = context_1 && context_1.id;
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
                } else {
                    return complex(x * rhs.x - y * rhs.y, y * rhs.x + x * rhs.y);
                }
            },
            __div__: function (rhs) {
                if (isNumber_1.default(rhs)) {
                    return complex(x / rhs, y / rhs);
                } else {
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
    exports_1("default", complex);
    return {
        setters: [function (isNumber_1_1) {
            isNumber_1 = isNumber_1_1;
        }],
        execute: function () {}
    };
});
System.register("geocas/mother/ComplexFieldAdapter.js", ["./Complex", "../checks/isNumber", "../checks/mustBeNumber"], function (exports_1, context_1) {
    "use strict";

    var Complex_1, isNumber_1, mustBeNumber_1, ZERO, ComplexFieldAdapter;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [function (Complex_1_1) {
            Complex_1 = Complex_1_1;
        }, function (isNumber_1_1) {
            isNumber_1 = isNumber_1_1;
        }, function (mustBeNumber_1_1) {
            mustBeNumber_1 = mustBeNumber_1_1;
        }],
        execute: function () {
            ZERO = Complex_1.default(0, 0);
            ComplexFieldAdapter = function () {
                function ComplexFieldAdapter(ε) {
                    if (ε === void 0) {
                        ε = 1e-6;
                    }
                    this._ε = Complex_1.default(mustBeNumber_1.default('ε', ε), 0);
                }
                Object.defineProperty(ComplexFieldAdapter.prototype, "\u03B5", {
                    get: function () {
                        return this._ε;
                    },
                    enumerable: false,
                    configurable: true
                });
                ComplexFieldAdapter.prototype.abs = function (z) {
                    return z.__abs__();
                };
                ComplexFieldAdapter.prototype.add = function (lhs, rhs) {
                    return lhs.__add__(rhs);
                };
                ComplexFieldAdapter.prototype.eq = function (lhs, rhs) {
                    return lhs.x === rhs.x && lhs.y === rhs.y;
                };
                ComplexFieldAdapter.prototype.ne = function (lhs, rhs) {
                    return lhs.x !== rhs.x || lhs.y !== rhs.y;
                };
                ComplexFieldAdapter.prototype.le = function (lhs, rhs) {
                    return lhs.x <= rhs.x;
                };
                ComplexFieldAdapter.prototype.lt = function (lhs, rhs) {
                    return lhs.x < rhs.x;
                };
                ComplexFieldAdapter.prototype.ge = function (lhs, rhs) {
                    return lhs.x >= rhs.x;
                };
                ComplexFieldAdapter.prototype.gt = function (lhs, rhs) {
                    return lhs.x > rhs.x;
                };
                ComplexFieldAdapter.prototype.sub = function (lhs, rhs) {
                    return lhs.__sub__(rhs);
                };
                ComplexFieldAdapter.prototype.max = function (lhs, rhs) {
                    return lhs.x >= rhs.x ? lhs : rhs;
                };
                ComplexFieldAdapter.prototype.min = function (lhs, rhs) {
                    return lhs.x <= rhs.x ? lhs : rhs;
                };
                ComplexFieldAdapter.prototype.mul = function (lhs, rhs) {
                    return lhs.__mul__(rhs);
                };
                ComplexFieldAdapter.prototype.mulByNumber = function (arg, α) {
                    return arg.__mul__(α);
                };
                ComplexFieldAdapter.prototype.div = function (lhs, rhs) {
                    return lhs.__div__(rhs);
                };
                ComplexFieldAdapter.prototype.neg = function (z) {
                    return z.__neg__();
                };
                ComplexFieldAdapter.prototype.asString = function (z) {
                    return z.toString();
                };
                ComplexFieldAdapter.prototype.cos = function (z) {
                    return z.__cos__();
                };
                ComplexFieldAdapter.prototype.isField = function (z) {
                    return isNumber_1.default(z.x) && isNumber_1.default(z.y);
                };
                ComplexFieldAdapter.prototype.isOne = function (z) {
                    return z.x === 1 && z.y === 0;
                };
                ComplexFieldAdapter.prototype.isZero = function (z) {
                    return z.x === 0 && z.y === 0;
                };
                Object.defineProperty(ComplexFieldAdapter.prototype, "one", {
                    get: function () {
                        return Complex_1.default(1, 0);
                    },
                    enumerable: false,
                    configurable: true
                });
                ComplexFieldAdapter.prototype.sin = function (z) {
                    return z.__sin__();
                };
                ComplexFieldAdapter.prototype.sqrt = function (z) {
                    if (z.x === 0) {
                        if (z.y === 0) {
                            return ZERO;
                        } else {
                            throw new Error("TODO: sqrt" + z.toString());
                        }
                    } else {
                        if (z.y === 0) {
                            if (z.x > 0) {
                                return Complex_1.default(Math.sqrt(z.x), 0);
                            } else {
                                return Complex_1.default(0, Math.sqrt(-z.x));
                            }
                        } else {
                            throw new Error("TODO: sqrt" + z.toString());
                        }
                    }
                };
                Object.defineProperty(ComplexFieldAdapter.prototype, "zero", {
                    get: function () {
                        return ZERO;
                    },
                    enumerable: false,
                    configurable: true
                });
                return ComplexFieldAdapter;
            }();
            exports_1("default", ComplexFieldAdapter);
        }
    };
});
System.register("geocas/checks/mustBeNumber.js", ["../checks/mustSatisfy", "../checks/isNumber"], function (exports_1, context_1) {
    "use strict";

    var mustSatisfy_1, isNumber_1;
    var __moduleName = context_1 && context_1.id;
    function beANumber() {
        return "be a `number`";
    }
    function default_1(name, value, contextBuilder) {
        mustSatisfy_1.default(name, isNumber_1.default(value), beANumber, contextBuilder);
        return value;
    }
    exports_1("default", default_1);
    return {
        setters: [function (mustSatisfy_1_1) {
            mustSatisfy_1 = mustSatisfy_1_1;
        }, function (isNumber_1_1) {
            isNumber_1 = isNumber_1_1;
        }],
        execute: function () {}
    };
});
System.register("geocas/mother/NumberFieldAdapter.js", ["../checks/mustBeNumber"], function (exports_1, context_1) {
    "use strict";

    var mustBeNumber_1, NumberFieldAdapter;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [function (mustBeNumber_1_1) {
            mustBeNumber_1 = mustBeNumber_1_1;
        }],
        execute: function () {
            NumberFieldAdapter = function () {
                function NumberFieldAdapter(ε) {
                    if (ε === void 0) {
                        ε = 1e-6;
                    }
                    this._ε = mustBeNumber_1.default('ε', ε);
                }
                Object.defineProperty(NumberFieldAdapter.prototype, "\u03B5", {
                    get: function () {
                        return this._ε;
                    },
                    enumerable: false,
                    configurable: true
                });
                NumberFieldAdapter.prototype.abs = function (arg) {
                    return Math.abs(arg);
                };
                NumberFieldAdapter.prototype.add = function (lhs, rhs) {
                    return lhs + rhs;
                };
                NumberFieldAdapter.prototype.eq = function (lhs, rhs) {
                    return lhs === rhs;
                };
                NumberFieldAdapter.prototype.ne = function (lhs, rhs) {
                    return lhs !== rhs;
                };
                NumberFieldAdapter.prototype.le = function (lhs, rhs) {
                    return lhs <= rhs;
                };
                NumberFieldAdapter.prototype.lt = function (lhs, rhs) {
                    return lhs < rhs;
                };
                NumberFieldAdapter.prototype.ge = function (lhs, rhs) {
                    return lhs >= rhs;
                };
                NumberFieldAdapter.prototype.gt = function (lhs, rhs) {
                    return lhs > rhs;
                };
                NumberFieldAdapter.prototype.sub = function (lhs, rhs) {
                    return lhs - rhs;
                };
                NumberFieldAdapter.prototype.max = function (lhs, rhs) {
                    return Math.max(lhs, rhs);
                };
                NumberFieldAdapter.prototype.min = function (lhs, rhs) {
                    return Math.min(lhs, rhs);
                };
                NumberFieldAdapter.prototype.mul = function (lhs, rhs) {
                    return lhs * rhs;
                };
                NumberFieldAdapter.prototype.mulByNumber = function (arg, alpha) {
                    return arg * alpha;
                };
                NumberFieldAdapter.prototype.div = function (lhs, rhs) {
                    return lhs / rhs;
                };
                NumberFieldAdapter.prototype.neg = function (arg) {
                    return -arg;
                };
                NumberFieldAdapter.prototype.asString = function (arg) {
                    return arg.toString();
                };
                NumberFieldAdapter.prototype.cos = function (arg) {
                    return Math.cos(arg);
                };
                NumberFieldAdapter.prototype.isField = function (arg) {
                    return typeof arg === 'number';
                };
                NumberFieldAdapter.prototype.isOne = function (arg) {
                    return arg === 1;
                };
                NumberFieldAdapter.prototype.isZero = function (arg) {
                    return arg === 0;
                };
                Object.defineProperty(NumberFieldAdapter.prototype, "one", {
                    get: function () {
                        return 1;
                    },
                    enumerable: false,
                    configurable: true
                });
                NumberFieldAdapter.prototype.sin = function (arg) {
                    return Math.sin(arg);
                };
                NumberFieldAdapter.prototype.sqrt = function (arg) {
                    return Math.sqrt(arg);
                };
                Object.defineProperty(NumberFieldAdapter.prototype, "zero", {
                    get: function () {
                        return 0;
                    },
                    enumerable: false,
                    configurable: true
                });
                return NumberFieldAdapter;
            }();
            exports_1("default", NumberFieldAdapter);
        }
    };
});
System.register("geocas/mother/norm.js", ["./squaredNorm"], function (exports_1, context_1) {
    "use strict";

    var squaredNorm_1;
    var __moduleName = context_1 && context_1.id;
    function norm(A) {
        return squaredNorm_1.default(A).sqrt();
    }
    exports_1("default", norm);
    return {
        setters: [function (squaredNorm_1_1) {
            squaredNorm_1 = squaredNorm_1_1;
        }],
        execute: function () {}
    };
});
System.register("geocas/mother/cosineOfAngleBetweenBlades.js", ["./norm"], function (exports_1, context_1) {
    "use strict";

    var norm_1;
    var __moduleName = context_1 && context_1.id;
    function cos(A, B) {
        var a = norm_1.default(A).scalarCoordinate();
        var b = norm_1.default(B).scalarCoordinate();
        return A.scp(B.rev()).divByScalar(a).divByScalar(b);
    }
    exports_1("default", cos);
    return {
        setters: [function (norm_1_1) {
            norm_1 = norm_1_1;
        }],
        execute: function () {}
    };
});
System.register("geocas/mother/orthoFramesToVersor.js", ["./cosineOfAngleBetweenBlades"], function (exports_1, context_1) {
    "use strict";

    var cosineOfAngleBetweenBlades_1;
    var __moduleName = context_1 && context_1.id;
    function orthoFramesToVersor(A, B, vs, algebra) {
        if (A.length > 0) {
            var j = bestIndex(A, B, algebra);
            var a = A[j];
            var b = B[j];
            var e_1 = a.sub(b);
            var field = algebra.field;
            var eps = field.mulByNumber(field.one, 1e-6);
            var cosMinusOne = cosineOfAngleBetweenBlades_1.default(a, b).sub(algebra.one).scalarCoordinate();
            var tooClose = field.lt(field.abs(cosMinusOne), eps);
            if (tooClose) {
                return orthoFramesToVersor(removeAt(A, j), removeAt(B, j), vs, algebra);
            } else {
                var e2_1 = e_1.scp(e_1).scalarCoordinate();
                var rvs = prepend(vs, e_1.divByScalar(algebra.field.sqrt(e2_1)));
                return orthoFramesToVersor(removeAt(A, j).map(function (x) {
                    return e_1.mul(x.mul(e_1)).neg().divByScalar(e2_1);
                }), removeAt(B, j), rvs, algebra);
            }
        } else {
            return vs;
        }
    }
    exports_1("default", orthoFramesToVersor);
    function prepend(xs, x) {
        var result = [];
        result.push(x);
        for (var i = 0; i < xs.length; i++) {
            result.push(xs[i]);
        }
        return result;
    }
    function removeAt(xs, index) {
        var result = [];
        for (var i = 0; i < xs.length; i++) {
            if (i !== index) {
                result.push(xs[i]);
            }
        }
        return result;
    }
    function bestIndex(A, B, algebra) {
        var N = A.length;
        var max = algebra.zero;
        var idx = 0;
        for (var k = 0; k < N; k++) {
            var x = A[k].sub(B[k]);
            var squaredNorm = x.scp(x.rev()).scalarCoordinate();
            if (algebra.field.gt(squaredNorm, max.scalarCoordinate())) {
                idx = k;
            }
        }
        return idx;
    }
    return {
        setters: [function (cosineOfAngleBetweenBlades_1_1) {
            cosineOfAngleBetweenBlades_1 = cosineOfAngleBetweenBlades_1_1;
        }],
        execute: function () {}
    };
});
System.register("geocas/mother/lcoE.js", ["./gpE", "./grade"], function (exports_1, context_1) {
    "use strict";

    var gpE_1, grade_1;
    var __moduleName = context_1 && context_1.id;
    function lcoE(a, b, adapter) {
        var ga = a.grade();
        var gb = b.grade();
        if (ga > gb) {
            return a.zero();
        } else {
            var bitmap = a.bitmap ^ b.bitmap;
            var g = grade_1.default(bitmap);
            if (g !== gb - ga) {
                return a.zero();
            } else {
                return gpE_1.default(a, b, adapter);
            }
        }
    }
    exports_1("default", lcoE);
    return {
        setters: [function (gpE_1_1) {
            gpE_1 = gpE_1_1;
        }, function (grade_1_1) {
            grade_1 = grade_1_1;
        }],
        execute: function () {}
    };
});
System.register("geocas/mother/lcoL.js", ["./gpL", "./grade"], function (exports_1, context_1) {
    "use strict";

    var gpL_1, grade_1;
    var __moduleName = context_1 && context_1.id;
    function lcoL(a, b, m, adapter) {
        var ga = a.grade();
        var gb = b.grade();
        if (ga > gb) {
            return a.zero();
        } else {
            var bitmap = a.bitmap ^ b.bitmap;
            var g = grade_1.default(bitmap);
            if (g !== gb - ga) {
                return a.zero();
            } else {
                return gpL_1.default(a, b, m, adapter);
            }
        }
    }
    exports_1("default", lcoL);
    return {
        setters: [function (gpL_1_1) {
            gpL_1 = gpL_1_1;
        }, function (grade_1_1) {
            grade_1 = grade_1_1;
        }],
        execute: function () {}
    };
});
System.register("geocas/mother/lcoG.js", ["./gpG", "./grade"], function (exports_1, context_1) {
    "use strict";

    var gpG_1, grade_1;
    var __moduleName = context_1 && context_1.id;
    function lcoG(a, b, m, adapter) {
        var ga = a.grade();
        var gb = b.grade();
        if (ga > gb) {
            return [];
        } else {
            var bitmap = a.bitmap ^ b.bitmap;
            var g = grade_1.default(bitmap);
            if (g !== gb - ga) {
                return [];
            } else {
                return gpG_1.default(a, b, m, adapter);
            }
        }
    }
    exports_1("default", lcoG);
    return {
        setters: [function (gpG_1_1) {
            gpG_1 = gpG_1_1;
        }, function (grade_1_1) {
            grade_1 = grade_1_1;
        }],
        execute: function () {}
    };
});
System.register("geocas/mother/rcoE.js", ["./gpE", "./grade"], function (exports_1, context_1) {
    "use strict";

    var gpE_1, grade_1;
    var __moduleName = context_1 && context_1.id;
    function rcoE(a, b, adapter) {
        var ga = a.grade();
        var gb = b.grade();
        if (ga < gb) {
            return a.zero();
        } else {
            var bitmap = a.bitmap ^ b.bitmap;
            var g = grade_1.default(bitmap);
            if (g !== ga - gb) {
                return a.zero();
            } else {
                return gpE_1.default(a, b, adapter);
            }
        }
    }
    exports_1("default", rcoE);
    return {
        setters: [function (gpE_1_1) {
            gpE_1 = gpE_1_1;
        }, function (grade_1_1) {
            grade_1 = grade_1_1;
        }],
        execute: function () {}
    };
});
System.register("geocas/mother/rcoL.js", ["./gpL", "./grade"], function (exports_1, context_1) {
    "use strict";

    var gpL_1, grade_1;
    var __moduleName = context_1 && context_1.id;
    function rcoL(a, b, m, adapter) {
        var ga = a.grade();
        var gb = b.grade();
        if (ga < gb) {
            return a.zero();
        } else {
            var bitmap = a.bitmap ^ b.bitmap;
            var g = grade_1.default(bitmap);
            if (g !== ga - gb) {
                return a.zero();
            } else {
                return gpL_1.default(a, b, m, adapter);
            }
        }
    }
    exports_1("default", rcoL);
    return {
        setters: [function (gpL_1_1) {
            gpL_1 = gpL_1_1;
        }, function (grade_1_1) {
            grade_1 = grade_1_1;
        }],
        execute: function () {}
    };
});
System.register("geocas/mother/gpE.js", ["./Blade", "./canonicalReorderingSign"], function (exports_1, context_1) {
    "use strict";

    var Blade_1, canonicalReorderingSign_1;
    var __moduleName = context_1 && context_1.id;
    function gpE(a, b, adapter) {
        var bitmap = a.bitmap ^ b.bitmap;
        var sign = canonicalReorderingSign_1.default(a.bitmap, b.bitmap);
        var scale = adapter.mul(a.weight, b.weight);
        if (sign > 0) {
            return Blade_1.default(bitmap, scale, adapter);
        } else {
            return Blade_1.default(bitmap, adapter.neg(scale), adapter);
        }
    }
    exports_1("default", gpE);
    return {
        setters: [function (Blade_1_1) {
            Blade_1 = Blade_1_1;
        }, function (canonicalReorderingSign_1_1) {
            canonicalReorderingSign_1 = canonicalReorderingSign_1_1;
        }],
        execute: function () {}
    };
});
System.register("geocas/mother/gpL.js", ["./Blade", "./gpE"], function (exports_1, context_1) {
    "use strict";

    var Blade_1, gpE_1;
    var __moduleName = context_1 && context_1.id;
    function gpL(a, b, m, adapter) {
        var temp = gpE_1.default(a, b, adapter);
        var weight = temp.weight;
        var bitmap = a.bitmap & b.bitmap;
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
    exports_1("default", gpL);
    return {
        setters: [function (Blade_1_1) {
            Blade_1 = Blade_1_1;
        }, function (gpE_1_1) {
            gpE_1 = gpE_1_1;
        }],
        execute: function () {}
    };
});
System.register("geocas/mother/gpG.js", ["./gpL", "./simplify"], function (exports_1, context_1) {
    "use strict";

    var gpL_1, simplify_1;
    var __moduleName = context_1 && context_1.id;
    function gpG(a, b, m, adapter) {
        var A = m.toEigenBasis(a);
        var B = m.toEigenBasis(b);
        var M = m.getEigenMetric();
        var rez = [];
        for (var i = 0; i < A.length; i++) {
            for (var k = 0; k < B.length; k++) {
                rez.push(gpL_1.default(A[i], B[k], M, adapter));
            }
        }
        return m.toMetricBasis(simplify_1.default(rez, adapter));
    }
    exports_1("default", gpG);
    return {
        setters: [function (gpL_1_1) {
            gpL_1 = gpL_1_1;
        }, function (simplify_1_1) {
            simplify_1 = simplify_1_1;
        }],
        execute: function () {}
    };
});
System.register("geocas/mother/grade.js", ["./bitCount"], function (exports_1, context_1) {
    "use strict";

    var bitCount_1;
    var __moduleName = context_1 && context_1.id;
    function grade(bitmap) {
        return bitCount_1.default(bitmap);
    }
    exports_1("default", grade);
    return {
        setters: [function (bitCount_1_1) {
            bitCount_1 = bitCount_1_1;
        }],
        execute: function () {}
    };
});
System.register("geocas/mother/rcoG.js", ["./gpG", "./grade"], function (exports_1, context_1) {
    "use strict";

    var gpG_1, grade_1;
    var __moduleName = context_1 && context_1.id;
    function rcoG(a, b, m, adapter) {
        var ga = a.grade();
        var gb = b.grade();
        if (ga < gb) {
            return [];
        } else {
            var bitmap = a.bitmap ^ b.bitmap;
            var g = grade_1.default(bitmap);
            if (g !== ga - gb) {
                return [];
            } else {
                return gpG_1.default(a, b, m, adapter);
            }
        }
    }
    exports_1("default", rcoG);
    return {
        setters: [function (gpG_1_1) {
            gpG_1 = gpG_1_1;
        }, function (grade_1_1) {
            grade_1 = grade_1_1;
        }],
        execute: function () {}
    };
});
System.register("geocas/checks/isArray.js", [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    function isArray(x) {
        return Object.prototype.toString.call(x) === '[object Array]';
    }
    exports_1("default", isArray);
    return {
        setters: [],
        execute: function () {}
    };
});
System.register("geocas/checks/isString.js", [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    function isString(s) {
        return typeof s === 'string';
    }
    exports_1("default", isString);
    return {
        setters: [],
        execute: function () {}
    };
});
System.register("geocas/mother/sortBlades.js", [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    function compareFn(a, b) {
        if (a.bitmap < b.bitmap) {
            return -1;
        } else if (a.bitmap > b.bitmap) {
            return +1;
        } else {
            return 0;
        }
    }
    function sortBlades(blades) {
        var rez = [];
        for (var i = 0; i < blades.length; i++) {
            var B = blades[i];
            rez.push(B);
        }
        rez.sort(compareFn);
        return rez;
    }
    exports_1("default", sortBlades);
    return {
        setters: [],
        execute: function () {}
    };
});
System.register("geocas/mother/multivectorEQ.js", ["./sortBlades"], function (exports_1, context_1) {
    "use strict";

    var sortBlades_1;
    var __moduleName = context_1 && context_1.id;
    function multivectorEQ(lhs, rhs, field) {
        if (lhs.blades.length === rhs.blades.length) {
            var bladesL = sortBlades_1.default(lhs.blades);
            var bladesR = sortBlades_1.default(rhs.blades);
            var length_1 = bladesL.length;
            for (var i = 0; i < length_1; i++) {
                var bladeL = bladesL[i];
                var bladeR = bladesR[i];
                if (bladeL.bitmap !== bladeR.bitmap) {
                    return false;
                }
                if (field.ne(bladeL.weight, bladeR.weight)) {
                    return false;
                }
            }
            return true;
        } else {
            return false;
        }
    }
    exports_1("default", multivectorEQ);
    return {
        setters: [function (sortBlades_1_1) {
            sortBlades_1 = sortBlades_1_1;
        }],
        execute: function () {}
    };
});
System.register("geocas/mother/multivectorGE.js", ["./isScalar"], function (exports_1, context_1) {
    "use strict";

    var isScalar_1;
    var __moduleName = context_1 && context_1.id;
    function multivectorGE(lhs, rhs, field) {
        if (isScalar_1.default(lhs) && isScalar_1.default(rhs)) {
            var l = lhs.scalarCoordinate();
            var r = rhs.scalarCoordinate();
            return field.ge(l, r);
        } else {
            throw new Error(lhs + " >= " + rhs + " is not implemented.");
        }
    }
    exports_1("default", multivectorGE);
    return {
        setters: [function (isScalar_1_1) {
            isScalar_1 = isScalar_1_1;
        }],
        execute: function () {}
    };
});
System.register("geocas/mother/multivectorGT.js", ["./isScalar"], function (exports_1, context_1) {
    "use strict";

    var isScalar_1;
    var __moduleName = context_1 && context_1.id;
    function multivectorGT(lhs, rhs, field) {
        if (isScalar_1.default(lhs) && isScalar_1.default(rhs)) {
            var l = lhs.scalarCoordinate();
            var r = rhs.scalarCoordinate();
            return field.gt(l, r);
        } else {
            throw new Error(lhs + " > " + rhs + " is not implemented.");
        }
    }
    exports_1("default", multivectorGT);
    return {
        setters: [function (isScalar_1_1) {
            isScalar_1 = isScalar_1_1;
        }],
        execute: function () {}
    };
});
System.register("geocas/mother/multivectorLE.js", ["./isScalar"], function (exports_1, context_1) {
    "use strict";

    var isScalar_1;
    var __moduleName = context_1 && context_1.id;
    function multivectorLE(lhs, rhs, field) {
        if (isScalar_1.default(lhs) && isScalar_1.default(rhs)) {
            var l = lhs.scalarCoordinate();
            var r = rhs.scalarCoordinate();
            return field.le(l, r);
        } else {
            throw new Error(lhs + " <= " + rhs + " is not implemented.");
        }
    }
    exports_1("default", multivectorLE);
    return {
        setters: [function (isScalar_1_1) {
            isScalar_1 = isScalar_1_1;
        }],
        execute: function () {}
    };
});
System.register("geocas/mother/isScalar.js", [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    function isScalar(arg) {
        var blades = arg.blades;
        var length = blades.length;
        for (var k = 0; k < length; k++) {
            var blade = blades[k];
            if (blade.bitmap !== 0) {
                return false;
            }
        }
        return true;
    }
    exports_1("default", isScalar);
    return {
        setters: [],
        execute: function () {}
    };
});
System.register("geocas/mother/multivectorLT.js", ["./isScalar"], function (exports_1, context_1) {
    "use strict";

    var isScalar_1;
    var __moduleName = context_1 && context_1.id;
    function multivectorLT(lhs, rhs, field) {
        if (isScalar_1.default(lhs) && isScalar_1.default(rhs)) {
            var l = lhs.scalarCoordinate();
            var r = rhs.scalarCoordinate();
            return field.lt(l, r);
        } else {
            throw new Error(lhs + " < " + rhs + " is not implemented.");
        }
    }
    exports_1("default", multivectorLT);
    return {
        setters: [function (isScalar_1_1) {
            isScalar_1 = isScalar_1_1;
        }],
        execute: function () {}
    };
});
System.register("geocas/checks/isDefined.js", [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    function isDefined(arg) {
        return typeof arg !== 'undefined';
    }
    exports_1("default", isDefined);
    return {
        setters: [],
        execute: function () {}
    };
});
System.register("geocas/checks/mustBeDefined.js", ["../checks/mustSatisfy", "../checks/isDefined"], function (exports_1, context_1) {
    "use strict";

    var mustSatisfy_1, isDefined_1;
    var __moduleName = context_1 && context_1.id;
    function beDefined() {
        return "not be 'undefined'";
    }
    function mustBeDefined(name, value, contextBuilder) {
        mustSatisfy_1.default(name, isDefined_1.default(value), beDefined, contextBuilder);
        return value;
    }
    exports_1("default", mustBeDefined);
    return {
        setters: [function (mustSatisfy_1_1) {
            mustSatisfy_1 = mustSatisfy_1_1;
        }, function (isDefined_1_1) {
            isDefined_1 = isDefined_1_1;
        }],
        execute: function () {}
    };
});
System.register("geocas/checks/isNumber.js", [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    function isNumber(x) {
        return typeof x === 'number';
    }
    exports_1("default", isNumber);
    return {
        setters: [],
        execute: function () {}
    };
});
System.register("geocas/checks/isInteger.js", ["../checks/isNumber"], function (exports_1, context_1) {
    "use strict";

    var isNumber_1;
    var __moduleName = context_1 && context_1.id;
    function isInteger(x) {
        return isNumber_1.default(x) && x % 1 === 0;
    }
    exports_1("default", isInteger);
    return {
        setters: [function (isNumber_1_1) {
            isNumber_1 = isNumber_1_1;
        }],
        execute: function () {}
    };
});
System.register("geocas/checks/mustBeInteger.js", ["../checks/mustSatisfy", "../checks/isInteger"], function (exports_1, context_1) {
    "use strict";

    var mustSatisfy_1, isInteger_1;
    var __moduleName = context_1 && context_1.id;
    function beAnInteger() {
        return "be an integer";
    }
    function mustBeInteger(name, value, contextBuilder) {
        mustSatisfy_1.default(name, isInteger_1.default(value), beAnInteger, contextBuilder);
        return value;
    }
    exports_1("default", mustBeInteger);
    return {
        setters: [function (mustSatisfy_1_1) {
            mustSatisfy_1 = mustSatisfy_1_1;
        }, function (isInteger_1_1) {
            isInteger_1 = isInteger_1_1;
        }],
        execute: function () {}
    };
});
System.register("geocas/checks/mustSatisfy.js", [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    function mustSatisfy(name, condition, messageBuilder, contextBuilder) {
        if (!condition) {
            var message = messageBuilder ? messageBuilder() : "satisfy some condition";
            var context = contextBuilder ? " in " + contextBuilder() : "";
            throw new Error(name + " must " + message + context + ".");
        }
    }
    exports_1("default", mustSatisfy);
    return {
        setters: [],
        execute: function () {}
    };
});
System.register("geocas/mother/bitCount.js", [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    function bitCount(i) {
        i = i - (i >> 1 & 0x55555555);
        i = (i & 0x33333333) + (i >> 2 & 0x33333333);
        i = i + (i >> 4) & 0x0F0F0F0F;
        i = i + (i >> 8);
        i = i + (i >> 16);
        return i & 0x0000003F;
    }
    exports_1("default", bitCount);
    return {
        setters: [],
        execute: function () {}
    };
});
System.register("geocas/mother/canonicalReorderingSign.js", ["./bitCount"], function (exports_1, context_1) {
    "use strict";

    var bitCount_1;
    var __moduleName = context_1 && context_1.id;
    function canonicalReorderingSign(a, b) {
        a >>= 1;
        var sum = 0;
        while (a !== 0) {
            sum += bitCount_1.default(a & b);
            a >>= 1;
        }
        return (sum & 1) === 0 ? 1 : -1;
    }
    exports_1("default", canonicalReorderingSign);
    return {
        setters: [function (bitCount_1_1) {
            bitCount_1 = bitCount_1_1;
        }],
        execute: function () {}
    };
});
System.register("geocas/checks/isUndefined.js", [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    function isUndefined(arg) {
        return typeof arg === 'undefined';
    }
    exports_1("default", isUndefined);
    return {
        setters: [],
        execute: function () {}
    };
});
System.register("geocas/mother/minusOnePow.js", [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    function minusOnePow(i) {
        return (i & 1) === 0 ? 1 : -1;
    }
    exports_1("default", minusOnePow);
    return {
        setters: [],
        execute: function () {}
    };
});
System.register("geocas/mother/Blade.js", ["./bitCount", "./canonicalReorderingSign", "../checks/isUndefined", "./minusOnePow"], function (exports_1, context_1) {
    "use strict";

    var bitCount_1, canonicalReorderingSign_1, isUndefined_1, minusOnePow_1, SCALAR;
    var __moduleName = context_1 && context_1.id;
    function blade(b, weight, adapter) {
        var that = {
            get bitmap() {
                return b;
            },
            get weight() {
                return weight;
            },
            __neg__: function () {
                return blade(b, adapter.neg(weight), adapter);
            },
            __vbar__: function (rhs, m) {
                if (b !== rhs.bitmap) {
                    return blade(SCALAR, adapter.zero, adapter);
                } else {
                    return blade(SCALAR, adapter.mul(weight, rhs.weight), adapter);
                }
            },
            __wedge__: function (rhs) {
                if (b & rhs.bitmap) {
                    return blade(SCALAR, adapter.zero, adapter);
                } else {
                    var bitmap = b ^ rhs.bitmap;
                    var sign = canonicalReorderingSign_1.default(b, rhs.bitmap);
                    var newScale = adapter.mul(weight, rhs.weight);
                    return blade(bitmap, sign > 0 ? newScale : adapter.neg(newScale), adapter);
                }
            },
            grade: function () {
                return bitCount_1.default(b);
            },
            reverse: function () {
                var x = that.grade();
                var sign = minusOnePow_1.default(x * (x - 1) / 2);
                return blade(b, sign > 0 ? weight : adapter.neg(weight), adapter);
            },
            gradeInversion: function () {
                var x = that.grade();
                var sign = minusOnePow_1.default(x);
                return blade(b, sign > 0 ? weight : adapter.neg(weight), adapter);
            },
            cliffordConjugate: function () {
                var x = that.grade();
                var sign = minusOnePow_1.default(x * (x + 1) / 2);
                return blade(b, sign > 0 ? weight : adapter.neg(weight), adapter);
            },
            zero: function () {
                return blade(SCALAR, adapter.zero, adapter);
            },
            asString: function (names) {
                var bladePart = "";
                var i = 1;
                var x = b;
                while (x !== 0) {
                    if ((x & 1) !== 0) {
                        if (bladePart.length > 0) bladePart += " ^ ";
                        if (isUndefined_1.default(names) || names === null || i > names.length || names[i - 1] == null) {
                            bladePart = bladePart + "e" + i;
                        } else {
                            bladePart = bladePart + names[i - 1];
                        }
                    }
                    x >>= 1;
                    i++;
                }
                if (bladePart.length === 0) {
                    return adapter.asString(weight);
                } else {
                    if (adapter.isOne(weight)) {
                        return bladePart;
                    } else {
                        return adapter.asString(weight) + " * " + bladePart;
                    }
                }
            },
            toString: function () {
                return that.asString(void 0);
            }
        };
        return that;
    }
    exports_1("default", blade);
    return {
        setters: [function (bitCount_1_1) {
            bitCount_1 = bitCount_1_1;
        }, function (canonicalReorderingSign_1_1) {
            canonicalReorderingSign_1 = canonicalReorderingSign_1_1;
        }, function (isUndefined_1_1) {
            isUndefined_1 = isUndefined_1_1;
        }, function (minusOnePow_1_1) {
            minusOnePow_1 = minusOnePow_1_1;
        }],
        execute: function () {
            SCALAR = 0;
        }
    };
});
System.register("geocas/mother/bladesToArray.js", [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
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
    exports_1("default", bladesToArray);
    return {
        setters: [],
        execute: function () {}
    };
});
System.register("geocas/mother/simplify.js", ["./Blade", "./bladesToArray"], function (exports_1, context_1) {
    "use strict";

    var Blade_1, bladesToArray_1;
    var __moduleName = context_1 && context_1.id;
    function simplify(blades, adapter) {
        var map = {};
        for (var i = 0; i < blades.length; i++) {
            var B = blades[i];
            var existing = map[B.bitmap];
            if (existing) {
                var scale = adapter.add(existing.weight, B.weight);
                if (adapter.isZero(scale)) {
                    delete map[B.bitmap];
                } else {
                    map[B.bitmap] = Blade_1.default(B.bitmap, scale, adapter);
                }
            } else {
                if (!adapter.isZero(B.weight)) {
                    map[B.bitmap] = B;
                }
            }
        }
        return bladesToArray_1.default(map);
    }
    exports_1("default", simplify);
    return {
        setters: [function (Blade_1_1) {
            Blade_1 = Blade_1_1;
        }, function (bladesToArray_1_1) {
            bladesToArray_1 = bladesToArray_1_1;
        }],
        execute: function () {}
    };
});
System.register("geocas/mother/Algebra.js", ["./Blade", "./gpE", "./gpL", "./gpG", "./lcoE", "./lcoL", "./lcoG", "./rcoE", "./rcoL", "./rcoG", "../checks/isArray", "../checks/isDefined", "../checks/isNumber", "./isScalar", "../checks/isString", "../checks/isUndefined", "./multivectorEQ", "./multivectorGE", "./multivectorGT", "./multivectorLE", "./multivectorLT", "../checks/mustBeDefined", "../checks/mustBeInteger", "../checks/mustSatisfy", "./simplify"], function (exports_1, context_1) {
    "use strict";

    var Blade_1, gpE_1, gpL_1, gpG_1, lcoE_1, lcoL_1, lcoG_1, rcoE_1, rcoL_1, rcoG_1, isArray_1, isDefined_1, isNumber_1, isScalar_1, isString_1, isUndefined_1, multivectorEQ_1, multivectorGE_1, multivectorGT_1, multivectorLE_1, multivectorLT_1, mustBeDefined_1, mustBeInteger_1, mustSatisfy_1, simplify_1;
    var __moduleName = context_1 && context_1.id;
    function isMultivector(arg) {
        if (arg) {
            return typeof arg['extractGrade'] === 'function';
        } else {
            return false;
        }
    }
    function isMetric(arg) {
        return typeof arg.getEigenMetric === 'function';
    }
    function dim(metric) {
        if (isNumber_1.default(metric)) {
            return metric;
        } else if (isArray_1.default(metric)) {
            return metric.length;
        } else if (isUndefined_1.default(metric)) {
            throw new Error("metric is undefined");
        } else if (isMetric(metric)) {
            return metric.getEigenMetric().length;
        } else {
            throw new Error("metric is undefined");
        }
    }
    function add(lhs, rhs, algebra, metric, labels) {
        var field = algebra.field;
        if (field.isField(lhs) && isMultivector(rhs)) {
            var rez = [];
            rez.push(Blade_1.default(0, lhs, field));
            for (var k = 0; k < rhs.blades.length; k++) {
                rez.push(rhs.blades[k]);
            }
            return mv(simplify_1.default(rez, field), algebra, metric, labels);
        } else if (isMultivector(lhs) && field.isField(rhs)) {
            var rez = [];
            rez.push(Blade_1.default(0, rhs, field));
            for (var k = 0; k < lhs.blades.length; k++) {
                rez.push(lhs.blades[k]);
            }
            return mv(simplify_1.default(rez, field), algebra, metric, labels);
        } else {
            if (isMultivector(lhs) && isMultivector(rhs)) {
                var rez = [];
                for (var i = 0; i < lhs.blades.length; i++) {
                    rez.push(lhs.blades[i]);
                }
                for (var k = 0; k < rhs.blades.length; k++) {
                    rez.push(rhs.blades[k]);
                }
                return mv(simplify_1.default(rez, field), algebra, metric, labels);
            } else {
                return void 0;
            }
        }
    }
    function sub(lhs, rhs, algebra, metric, labels) {
        var field = algebra.field;
        if (field.isField(lhs) && isMultivector(rhs)) {
            var rez = [];
            rez.push(Blade_1.default(0, lhs, field));
            for (var k = 0; k < rhs.blades.length; k++) {
                rez.push(rhs.blades[k].__neg__());
            }
            return mv(simplify_1.default(rez, field), algebra, metric, labels);
        } else if (isMultivector(lhs) && field.isField(rhs)) {
            var rez = [];
            rez.push(Blade_1.default(0, field.neg(rhs), field));
            for (var k = 0; k < lhs.blades.length; k++) {
                rez.push(lhs.blades[k]);
            }
            return mv(simplify_1.default(rez, field), algebra, metric, labels);
        } else {
            if (isMultivector(lhs) && isMultivector(rhs)) {
                var rez = [];
                for (var i = 0; i < lhs.blades.length; i++) {
                    rez.push(lhs.blades[i]);
                }
                for (var k = 0; k < rhs.blades.length; k++) {
                    rez.push(rhs.blades[k].__neg__());
                }
                return mv(simplify_1.default(rez, field), algebra, metric, labels);
            } else {
                return void 0;
            }
        }
    }
    function mul(lhs, rhs, algebra, metric, labels) {
        var field = algebra.field;
        if (field.isField(lhs) && isMultivector(rhs)) {
            return rhs.mulByScalar(lhs);
        } else if (isMultivector(lhs) && field.isField(rhs)) {
            return lhs.mulByScalar(rhs);
        } else {
            if (isMultivector(lhs) && isMultivector(rhs)) {
                var rez = [];
                for (var i = 0; i < lhs.blades.length; i++) {
                    var B1 = lhs.blades[i];
                    for (var k = 0; k < rhs.blades.length; k++) {
                        var B2 = rhs.blades[k];
                        if (isNumber_1.default(metric)) {
                            var B = gpE_1.default(B1, B2, field);
                            rez.push(B);
                        } else if (isArray_1.default(metric)) {
                            var B = gpL_1.default(B1, B2, metric, field);
                            rez.push(B);
                        } else {
                            var B = gpG_1.default(B1, B2, metric, field);
                            for (var b = 0; b < B.length; b++) {
                                rez.push(B[b]);
                            }
                        }
                    }
                }
                return mv(simplify_1.default(rez, field), algebra, metric, labels);
            } else {
                return void 0;
            }
        }
    }
    function div(lhs, rhs, algebra) {
        var field = algebra.field;
        if (field.isField(lhs) && isMultivector(rhs)) {
            throw new Error("Multivector division is not yet supported. " + lhs + " / " + rhs);
        } else if (isMultivector(lhs) && field.isField(rhs)) {
            return lhs.divByScalar(rhs);
        } else {
            if (isMultivector(lhs) && isMultivector(rhs)) {
                if (isScalar_1.default(rhs)) {
                    return lhs.divByScalar(rhs.scalarCoordinate());
                } else {
                    throw new Error("Multivector division is not yet supported. " + lhs + " / " + rhs);
                }
            } else {
                return void 0;
            }
        }
    }
    function getBasisVector(index, algebra, metric, labels) {
        mustBeInteger_1.default('index', index);
        mustBeDefined_1.default('algebra', algebra);
        var field = algebra.field;
        var B = Blade_1.default(1 << index, field.one, field);
        return mv([B], algebra, metric, labels);
    }
    function getScalar(weight, algebra, metric, labels) {
        mustBeDefined_1.default('algebra', algebra);
        var field = algebra.field;
        mustSatisfy_1.default('weight', field.isField(weight), function () {
            return "be a field value";
        });
        var B = Blade_1.default(0, weight, field);
        return mv([B], algebra, metric, labels);
    }
    function mv(blades, algebra, metric, labels) {
        if (!isArray_1.default(blades)) {
            throw new Error("blades must be Blade<T>[]");
        }
        if (isUndefined_1.default(algebra)) {
            throw new Error("algebra must be defined");
        }
        var field = algebra.field;
        var extractGrade = function (grade) {
            var rez = [];
            for (var i = 0; i < blades.length; i++) {
                var B = blades[i];
                if (B.grade() === grade) {
                    rez.push(B);
                }
            }
            return mv(rez, algebra, metric, labels);
        };
        var that = {
            get blades() {
                return blades;
            },
            __abs__: function () {
                return that.scp(that.rev()).sqrt();
            },
            add: function (rhs) {
                return add(that, rhs, algebra, metric, labels);
            },
            __add__: function (rhs) {
                return add(that, rhs, algebra, metric, labels);
            },
            __radd__: function (lhs) {
                return add(lhs, that, algebra, metric, labels);
            },
            sub: function (rhs) {
                return sub(that, rhs, algebra, metric, labels);
            },
            __sub__: function (rhs) {
                return sub(that, rhs, algebra, metric, labels);
            },
            __rsub__: function (lhs) {
                return sub(lhs, that, algebra, metric, labels);
            },
            __eq__: function (rhs) {
                return multivectorEQ_1.default(that, rhs, field);
            },
            __ge__: function (rhs) {
                return multivectorGE_1.default(that, rhs, field);
            },
            __gt__: function (rhs) {
                return multivectorGT_1.default(that, rhs, field);
            },
            __le__: function (rhs) {
                return multivectorLE_1.default(that, rhs, field);
            },
            __lt__: function (rhs) {
                return multivectorLT_1.default(that, rhs, field);
            },
            __ne__: function (rhs) {
                return !multivectorEQ_1.default(that, rhs, field);
            },
            inv: function () {
                var reverse = that.rev();
                var denom = that.mul(reverse);
                if (denom.blades.length === 1 && denom.blades[0].bitmap === 0) {
                    return reverse.divByScalar(denom.scalarCoordinate());
                } else {
                    throw new Error("non-invertible multivector (versor inverse) " + that);
                }
            },
            isZero: function () {
                return blades.length === 0;
            },
            mul: function (rhs) {
                return mul(that, rhs, algebra, metric, labels);
            },
            mulByScalar: function (α) {
                var rez = [];
                for (var i = 0; i < blades.length; i++) {
                    var B = blades[i];
                    var scale = field.mul(B.weight, α);
                    if (!field.isZero(scale)) {
                        rez.push(Blade_1.default(B.bitmap, scale, field));
                    }
                }
                return mv(rez, algebra, metric, labels);
            },
            __mul__: function (rhs) {
                return mul(that, rhs, algebra, metric, labels);
            },
            __rmul__: function (lhs) {
                return mul(lhs, that, algebra, metric, labels);
            },
            __div__: function (rhs) {
                return div(that, rhs, algebra);
            },
            __lshift__: function (rhs) {
                var rez = [];
                for (var i = 0; i < blades.length; i++) {
                    var B1 = blades[i];
                    for (var k = 0; k < rhs.blades.length; k++) {
                        var B2 = rhs.blades[k];
                        if (isNumber_1.default(metric)) {
                            var B = lcoE_1.default(B1, B2, field);
                            rez.push(B);
                        } else if (isArray_1.default(metric)) {
                            var B = lcoL_1.default(B1, B2, metric, field);
                            rez.push(B);
                        } else {
                            var B = lcoG_1.default(B1, B2, metric, field);
                            for (var b = 0; b < B.length; b++) {
                                rez.push(B[b]);
                            }
                        }
                    }
                }
                return mv(simplify_1.default(rez, field), algebra, metric, labels);
            },
            __rshift__: function (rhs) {
                var rez = [];
                for (var i = 0; i < blades.length; i++) {
                    var B1 = blades[i];
                    for (var k = 0; k < rhs.blades.length; k++) {
                        var B2 = rhs.blades[k];
                        if (isNumber_1.default(metric)) {
                            var B = rcoE_1.default(B1, B2, field);
                            rez.push(B);
                        } else if (isArray_1.default(metric)) {
                            var B = rcoL_1.default(B1, B2, metric, field);
                            rez.push(B);
                        } else {
                            var B = rcoG_1.default(B1, B2, metric, field);
                            for (var b = 0; b < B.length; b++) {
                                rez.push(B[b]);
                            }
                        }
                    }
                }
                return mv(simplify_1.default(rez, field), algebra, metric, labels);
            },
            __vbar__: function (rhs) {
                return that.__mul__(rhs).extractGrade(0);
            },
            __wedge__: function (rhs) {
                var rez = [];
                for (var i = 0; i < blades.length; i++) {
                    var B1 = blades[i];
                    for (var k = 0; k < rhs.blades.length; k++) {
                        var B2 = rhs.blades[k];
                        var B = B1.__wedge__(B2);
                        rez.push(B);
                    }
                }
                return mv(simplify_1.default(rez, field), algebra, metric, labels);
            },
            __bang__: function () {
                return that.inv();
            },
            __pos__: function () {
                return that;
            },
            neg: function () {
                var rez = [];
                for (var i = 0; i < blades.length; i++) {
                    var B = blades[i];
                    rez.push(B.__neg__());
                }
                return mv(rez, algebra, metric, labels);
            },
            __neg__: function () {
                var rez = [];
                for (var i = 0; i < blades.length; i++) {
                    var B = blades[i];
                    rez.push(B.__neg__());
                }
                return mv(rez, algebra, metric, labels);
            },
            __tilde__: function () {
                return that.rev();
            },
            cliffordConjugate: function () {
                var rez = [];
                for (var i = 0; i < blades.length; i++) {
                    var B = blades[i];
                    rez.push(B.cliffordConjugate());
                }
                return mv(rez, algebra, metric, labels);
            },
            compress: function (fraction) {
                if (fraction === void 0) {
                    fraction = 1e-12;
                }
                var eps = field.mulByNumber(field.one, fraction);
                var max = field.zero;
                for (var i = 0; i < blades.length; i++) {
                    var B = blades[i];
                    max = field.max(max, field.abs(B.weight));
                }
                var cutOff = field.mul(max, eps);
                var rez = [];
                for (var i = 0; i < blades.length; i++) {
                    var B = blades[i];
                    if (field.ge(field.abs(B.weight), cutOff)) {
                        rez.push(B);
                    }
                }
                return mv(rez, algebra, metric, labels);
            },
            direction: function () {
                var squaredNorm = that.scp(that.rev()).scalarCoordinate();
                var norm = field.sqrt(squaredNorm);
                if (!field.isZero(norm)) {
                    return that.divByScalar(norm);
                } else {
                    return that;
                }
            },
            exp: function () {
                var B = extractGrade(2);
                var Brev = B.rev();
                var θ = field.sqrt(B.__vbar__(Brev).scalarCoordinate());
                var i = B.divByScalar(θ);
                var cosθ = mv([Blade_1.default(0, field.cos(θ), field)], algebra, metric, labels);
                var sinθ = mv([Blade_1.default(0, field.sin(θ), field)], algebra, metric, labels);
                return cosθ.__add__(i.__mul__(sinθ));
            },
            extractGrade: extractGrade,
            div: function (rhs) {
                return that.mul(rhs.inv());
            },
            divByScalar: function (α) {
                var rez = [];
                for (var i = 0; i < blades.length; i++) {
                    var B = blades[i];
                    var scale = field.div(B.weight, α);
                    if (!field.isZero(scale)) {
                        rez.push(Blade_1.default(B.bitmap, scale, field));
                    }
                }
                return mv(rez, algebra, metric, labels);
            },
            dual: function () {
                var n = dim(metric);
                var I = mv([Blade_1.default((1 << n) - 1, field.one, field)], algebra, metric, labels);
                return that.__lshift__(I);
            },
            gradeInversion: function () {
                var rez = [];
                for (var i = 0; i < blades.length; i++) {
                    var B = blades[i];
                    rez.push(B.gradeInversion());
                }
                return mv(rez, algebra, metric, labels);
            },
            rev: function () {
                var rez = [];
                for (var i = 0; i < blades.length; i++) {
                    var B = blades[i];
                    rez.push(B.reverse());
                }
                return mv(rez, algebra, metric, labels);
            },
            scalarCoordinate: function () {
                for (var i = 0; i < blades.length; i++) {
                    var B = blades[i];
                    if (B.bitmap === 0) {
                        return B.weight;
                    }
                }
                return field.zero;
            },
            scp: function (rhs) {
                return that.__vbar__(rhs);
            },
            sqrt: function () {
                var rez = [];
                for (var i = 0; i < blades.length; i++) {
                    var B = blades[i];
                    if (B.bitmap === 0) {
                        rez.push(Blade_1.default(B.bitmap, field.sqrt(B.weight), field));
                    } else {
                        throw new Error("sqrt on arbitrary multivectors is not yet supported.");
                    }
                }
                return mv(rez, algebra, metric, labels);
            },
            asString: function (names) {
                checkBasisLabels('names', names, dim(metric));
                if (blades.length === 0) {
                    return "0";
                } else {
                    var result = "";
                    for (var i = 0; i < blades.length; i++) {
                        var B = blades[i];
                        var s = B.asString(names);
                        if (i === 0) {
                            result += s;
                        } else {
                            if (s.charAt(0) === '-') {
                                result += ' - ';
                                result += s.substring(1);
                            } else {
                                result += ' + ';
                                result += s;
                            }
                        }
                    }
                    return result;
                }
            },
            toString: function () {
                return that.asString(labels);
            }
        };
        return that;
    }
    function checkBasisLabels(name, labels, n) {
        if (isDefined_1.default(labels)) {
            if (isArray_1.default(labels)) {
                if (labels.length !== n) {
                    throw new Error(name + ".length must match the dimensionality of the vector space.");
                }
                for (var i = 0; i < labels.length; i++) {
                    var label = labels[i];
                    if (!isString_1.default(label)) {
                        throw new Error(name + "[" + i + "] must be a string.");
                    }
                }
            } else {
                throw new Error(name + " must be a string[]");
            }
        }
    }
    function algebra(metric, field, labels) {
        mustBeDefined_1.default('metric', metric);
        var n = dim(metric);
        mustBeDefined_1.default('field', field);
        checkBasisLabels('labels', labels, n);
        var scalars = [];
        var basisVectors = [];
        var that = {
            get ε() {
                return scalars[2];
            },
            get field() {
                return field;
            },
            get one() {
                return scalars[1];
            },
            get zero() {
                return scalars[0];
            },
            unit: function (index) {
                mustBeInteger_1.default('index', index);
                if (index >= 0 && index < n) {
                    return basisVectors[index];
                } else {
                    throw new Error("index must be in range [0 ... " + (n - 1) + ")");
                }
            },
            get units() {
                return basisVectors.map(function (x) {
                    return x;
                });
            }
        };
        scalars[0] = getScalar(field.zero, that, metric, labels);
        scalars[1] = getScalar(field.one, that, metric, labels);
        scalars[2] = getScalar(field.ε, that, metric, labels);
        for (var i = 0; i < n; i++) {
            basisVectors[i] = getBasisVector(i, that, metric, labels);
        }
        return that;
    }
    exports_1("algebra", algebra);
    return {
        setters: [function (Blade_1_1) {
            Blade_1 = Blade_1_1;
        }, function (gpE_1_1) {
            gpE_1 = gpE_1_1;
        }, function (gpL_1_1) {
            gpL_1 = gpL_1_1;
        }, function (gpG_1_1) {
            gpG_1 = gpG_1_1;
        }, function (lcoE_1_1) {
            lcoE_1 = lcoE_1_1;
        }, function (lcoL_1_1) {
            lcoL_1 = lcoL_1_1;
        }, function (lcoG_1_1) {
            lcoG_1 = lcoG_1_1;
        }, function (rcoE_1_1) {
            rcoE_1 = rcoE_1_1;
        }, function (rcoL_1_1) {
            rcoL_1 = rcoL_1_1;
        }, function (rcoG_1_1) {
            rcoG_1 = rcoG_1_1;
        }, function (isArray_1_1) {
            isArray_1 = isArray_1_1;
        }, function (isDefined_1_1) {
            isDefined_1 = isDefined_1_1;
        }, function (isNumber_1_1) {
            isNumber_1 = isNumber_1_1;
        }, function (isScalar_1_1) {
            isScalar_1 = isScalar_1_1;
        }, function (isString_1_1) {
            isString_1 = isString_1_1;
        }, function (isUndefined_1_1) {
            isUndefined_1 = isUndefined_1_1;
        }, function (multivectorEQ_1_1) {
            multivectorEQ_1 = multivectorEQ_1_1;
        }, function (multivectorGE_1_1) {
            multivectorGE_1 = multivectorGE_1_1;
        }, function (multivectorGT_1_1) {
            multivectorGT_1 = multivectorGT_1_1;
        }, function (multivectorLE_1_1) {
            multivectorLE_1 = multivectorLE_1_1;
        }, function (multivectorLT_1_1) {
            multivectorLT_1 = multivectorLT_1_1;
        }, function (mustBeDefined_1_1) {
            mustBeDefined_1 = mustBeDefined_1_1;
        }, function (mustBeInteger_1_1) {
            mustBeInteger_1 = mustBeInteger_1_1;
        }, function (mustSatisfy_1_1) {
            mustSatisfy_1 = mustSatisfy_1_1;
        }, function (simplify_1_1) {
            simplify_1 = simplify_1_1;
        }],
        execute: function () {}
    };
});
System.register('geocas/config.js', [], function (exports_1, context_1) {
    "use strict";

    var GeoCAS, config;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            GeoCAS = function () {
                function GeoCAS() {
                    this.GITHUB = 'https://github.com/geometryzen/GeoCAS';
                    this.CREATED_AT = '2016-09-24';
                    this.MODIFIED_AT = '2020-07-22';
                    this.NAMESPACE = 'GeoCAS';
                    this.VERSION = '1.13.2';
                }
                GeoCAS.prototype.log = function (message) {
                    var optionalParams = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        optionalParams[_i - 1] = arguments[_i];
                    }
                    console.log(message);
                };
                GeoCAS.prototype.info = function (message) {
                    var optionalParams = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        optionalParams[_i - 1] = arguments[_i];
                    }
                    console.info(message);
                };
                GeoCAS.prototype.warn = function (message) {
                    var optionalParams = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        optionalParams[_i - 1] = arguments[_i];
                    }
                    console.warn(message);
                };
                GeoCAS.prototype.error = function (message) {
                    var optionalParams = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        optionalParams[_i - 1] = arguments[_i];
                    }
                    console.error(message);
                };
                return GeoCAS;
            }();
            config = new GeoCAS();
            exports_1("default", config);
        }
    };
});
System.register("geocas/mother/squaredNorm.js", [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    function squaredNorm(A) {
        return A.scp(A.rev());
    }
    exports_1("default", squaredNorm);
    return {
        setters: [],
        execute: function () {}
    };
});
System.register("geocas.js", ["./geocas/mother/Blade", "./geocas/mother/Complex", "./geocas/mother/ComplexFieldAdapter", "./geocas/mother/cosineOfAngleBetweenBlades", "./geocas/mother/norm", "./geocas/mother/NumberFieldAdapter", "./geocas/mother/orthoFramesToVersor", "./geocas/mother/Algebra", "./geocas/config", "./geocas/mother/squaredNorm"], function (exports_1, context_1) {
    "use strict";

    var Blade_1, Complex_1, ComplexFieldAdapter_1, cosineOfAngleBetweenBlades_1, norm_1, NumberFieldAdapter_1, orthoFramesToVersor_1, Algebra_1, config_1, squaredNorm_1, GeoCAS;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [function (Blade_1_1) {
            Blade_1 = Blade_1_1;
        }, function (Complex_1_1) {
            Complex_1 = Complex_1_1;
        }, function (ComplexFieldAdapter_1_1) {
            ComplexFieldAdapter_1 = ComplexFieldAdapter_1_1;
        }, function (cosineOfAngleBetweenBlades_1_1) {
            cosineOfAngleBetweenBlades_1 = cosineOfAngleBetweenBlades_1_1;
        }, function (norm_1_1) {
            norm_1 = norm_1_1;
        }, function (NumberFieldAdapter_1_1) {
            NumberFieldAdapter_1 = NumberFieldAdapter_1_1;
        }, function (orthoFramesToVersor_1_1) {
            orthoFramesToVersor_1 = orthoFramesToVersor_1_1;
        }, function (Algebra_1_1) {
            Algebra_1 = Algebra_1_1;
        }, function (config_1_1) {
            config_1 = config_1_1;
        }, function (squaredNorm_1_1) {
            squaredNorm_1 = squaredNorm_1_1;
        }],
        execute: function () {
            GeoCAS = {
                get LAST_MODIFIED() {
                    return config_1.default.MODIFIED_AT;
                },
                get VERSION() {
                    return config_1.default.VERSION;
                },
                get blade() {
                    return Blade_1.default;
                },
                get complex() {
                    return Complex_1.default;
                },
                get ComplexFieldAdapter() {
                    return ComplexFieldAdapter_1.default;
                },
                get cosineOfAngleBetweenBlades() {
                    return cosineOfAngleBetweenBlades_1.default;
                },
                get norm() {
                    return norm_1.default;
                },
                get NumberFieldAdapter() {
                    return NumberFieldAdapter_1.default;
                },
                get orthoFramesToVersor() {
                    return orthoFramesToVersor_1.default;
                },
                get algebra() {
                    return Algebra_1.algebra;
                },
                get squaredNorm() {
                    return squaredNorm_1.default;
                }
            };
            exports_1("default", GeoCAS);
        }
    };
});
//# sourceMappingURL=geocas-system-es5.js.map