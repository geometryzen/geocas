System.register("geocas/math/Algebra.js", [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var __extends = this && this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var wedgeBlades, Expr, BinaryExpr, AddExpr, MulExpr, BasisBladeExpr, ScalarExpr, VBarExpr, WedgeExpr, Algebra;
    return {
        setters: [],
        execute: function () {
            wedgeBlades = function (a, b) {
                var result = [];
                var aLen = a.length;
                var bLen = b.length;
                for (var i = 0; i < aLen; i++) {
                    var av = a[i];
                    if (b.indexOf(av) < 0) {
                        result.push(av);
                    } else {
                        return null;
                    }
                }
                for (var i = 0; i < bLen; i++) {
                    result.push(b[i]);
                }
                return result;
            };
            Expr = function () {
                function Expr(g, type) {
                    this.g = g;
                    this.type = type;
                }
                Expr.prototype.isChanged = function () {
                    throw new Error(this.type + ".isChanged is not implemented.");
                };
                Expr.prototype.copy = function (dirty) {
                    throw new Error(this.type + ".copy is not implemented.");
                };
                Expr.prototype.reset = function () {
                    throw new Error(this.type + ".reset is not implemented.");
                };
                Expr.prototype.simplify = function () {
                    throw new Error(this.type + ".simplify is not implemented.");
                };
                Expr.prototype.toPrefix = function () {
                    throw new Error(this.type + ".toPrefix is not implemented.");
                };
                Expr.prototype.toString = function () {
                    throw new Error(this.type + ".toString is not implemented.");
                };
                Expr.prototype.__add__ = function (rhs) {
                    if (rhs instanceof Expr) {
                        return new AddExpr(this, rhs);
                    } else if (typeof rhs === 'number') {
                        return new AddExpr(this, new ScalarExpr(this.g, rhs));
                    } else {
                        return void 0;
                    }
                };
                Expr.prototype.__radd__ = function (lhs) {
                    if (lhs instanceof Expr) {
                        return new AddExpr(lhs, this);
                    } else if (typeof lhs === 'number') {
                        return new AddExpr(new ScalarExpr(this.g, lhs), this);
                    } else {
                        return void 0;
                    }
                };
                Expr.prototype.__mul__ = function (rhs) {
                    if (rhs instanceof Expr) {
                        return new MulExpr(this, rhs);
                    } else if (typeof rhs === 'number') {
                        return new MulExpr(this, new ScalarExpr(this.g, rhs));
                    } else {
                        return void 0;
                    }
                };
                Expr.prototype.__rmul__ = function (lhs) {
                    if (lhs instanceof Expr) {
                        return new MulExpr(lhs, this);
                    } else if (typeof lhs === 'number') {
                        return new MulExpr(new ScalarExpr(this.g, lhs), this);
                    } else {
                        return void 0;
                    }
                };
                Expr.prototype.__vbar__ = function (rhs) {
                    if (rhs instanceof Expr) {
                        return new VBarExpr(this, rhs);
                    } else if (typeof rhs === 'number') {
                        return new VBarExpr(this, new ScalarExpr(this.g, rhs));
                    } else {
                        return void 0;
                    }
                };
                Expr.prototype.__rvbar__ = function (lhs) {
                    if (lhs instanceof Expr) {
                        return new VBarExpr(lhs, this);
                    } else if (typeof lhs === 'number') {
                        return new VBarExpr(new ScalarExpr(this.g, lhs), this);
                    } else {
                        return void 0;
                    }
                };
                Expr.prototype.__wedge__ = function (rhs) {
                    if (rhs instanceof Expr) {
                        return new WedgeExpr(this, rhs);
                    } else if (typeof rhs === 'number') {
                        return new WedgeExpr(this, new ScalarExpr(this.g, rhs));
                    } else {
                        return void 0;
                    }
                };
                Expr.prototype.__rwedge__ = function (lhs) {
                    if (lhs instanceof Expr) {
                        return new VBarExpr(lhs, this);
                    } else if (typeof lhs === 'number') {
                        return new VBarExpr(new ScalarExpr(this.g, lhs), this);
                    } else {
                        return void 0;
                    }
                };
                return Expr;
            }();
            exports_1("Expr", Expr);
            BinaryExpr = function (_super) {
                __extends(BinaryExpr, _super);
                function BinaryExpr(lhs, rhs, type) {
                    _super.call(this, lhs.g, type);
                    this.lhs = lhs;
                    this.rhs = rhs;
                    if (!(lhs instanceof Expr)) {
                        throw new Error(type + ".lhs must be an Expr: " + typeof lhs);
                    }
                    if (!(rhs instanceof Expr)) {
                        throw new Error(type + ".rhs must be an Expr: " + typeof rhs);
                    }
                }
                return BinaryExpr;
            }(Expr);
            exports_1("BinaryExpr", BinaryExpr);
            AddExpr = function (_super) {
                __extends(AddExpr, _super);
                function AddExpr(lhs, rhs, dirty) {
                    if (dirty === void 0) {
                        dirty = false;
                    }
                    _super.call(this, lhs, rhs, 'AddExpr');
                    this.dirty = dirty;
                }
                AddExpr.prototype.isChanged = function () {
                    return this.dirty || this.lhs.isChanged() || this.rhs.isChanged();
                };
                AddExpr.prototype.copy = function (dirty) {
                    return new AddExpr(this.lhs, this.rhs, dirty);
                };
                AddExpr.prototype.reset = function () {
                    return new AddExpr(this.lhs.reset(), this.rhs.reset());
                };
                AddExpr.prototype.simplify = function () {
                    var a = this.lhs.simplify();
                    var b = this.rhs.simplify();
                    if (b instanceof ScalarExpr && typeof b.value === 'number' && b.value === 0) {
                        return a.copy(true);
                    } else if (a instanceof MulExpr && b instanceof MulExpr) {
                        if (a.lhs instanceof ScalarExpr && b.lhs instanceof ScalarExpr && a.rhs === b.rhs) {
                            var sa = a.lhs;
                            var sb = b.lhs;
                            if (typeof sa.value === 'number' && typeof sb.value === 'number') {
                                var s = new ScalarExpr(this.g, sa.value + sb.value);
                                return new MulExpr(s, a.rhs, true);
                            } else {
                                return new AddExpr(a, b);
                            }
                        } else {
                            return new AddExpr(a, b);
                        }
                    } else if (a instanceof ScalarExpr && b instanceof ScalarExpr) {
                        if (typeof a.value === 'number' && typeof b.value === 'number') {
                            return new ScalarExpr(this.g, a.value + b.value, true);
                        } else {
                            return new AddExpr(a, b);
                        }
                    } else {
                        return new AddExpr(a, b);
                    }
                };
                AddExpr.prototype.toPrefix = function () {
                    return "+(" + this.lhs.toPrefix() + ", " + this.rhs.toPrefix() + ")";
                };
                AddExpr.prototype.toString = function () {
                    return this.lhs + " + " + this.rhs;
                };
                return AddExpr;
            }(BinaryExpr);
            exports_1("AddExpr", AddExpr);
            MulExpr = function (_super) {
                __extends(MulExpr, _super);
                function MulExpr(lhs, rhs, dirty) {
                    if (dirty === void 0) {
                        dirty = false;
                    }
                    _super.call(this, lhs, rhs, 'MultiplyExpr');
                    this.dirty = dirty;
                }
                MulExpr.prototype.isChanged = function () {
                    return this.dirty || this.lhs.isChanged() || this.rhs.isChanged();
                };
                MulExpr.prototype.copy = function (dirty) {
                    return new MulExpr(this.lhs, this.rhs, dirty);
                };
                MulExpr.prototype.reset = function () {
                    return new MulExpr(this.lhs.reset(), this.rhs.reset());
                };
                MulExpr.prototype.simplify = function () {
                    var a = this.lhs.simplify();
                    var b = this.rhs.simplify();
                    if (a instanceof ScalarExpr) {
                        if (typeof a.value === 'number' && a.value === 0) {
                            return a.copy(true);
                        } else if (typeof a.value === 'number' && a.value === 1) {
                            return b.copy(true);
                        } else if (b instanceof ScalarExpr) {
                            if (typeof a.value === 'number' && a.value === 1) {
                                return b;
                            } else if (typeof a.value === 'number' && typeof b.value === 'number') {
                                return new ScalarExpr(this.g, a.value * b.value, true);
                            } else if (typeof a.value !== 'number' && typeof b.value === 'number') {
                                return new MulExpr(b, a, true);
                            } else {
                                return new MulExpr(a, b);
                            }
                        } else {
                            return new MulExpr(a, b);
                        }
                    } else if (a instanceof BasisBladeExpr) {
                        if (b instanceof MulExpr) {
                            var bL = b.lhs;
                            var bR = b.rhs;
                            if (bL instanceof BasisBladeExpr) {
                                if (a.vectors[0] === bL.vectors[0]) {
                                    return new MulExpr(new MulExpr(a, bL), bR, true);
                                } else {
                                    return new MulExpr(a, b);
                                }
                            } else {
                                return new MulExpr(a, b);
                            }
                        } else if (b instanceof BasisBladeExpr) {
                            if (a === b) {
                                return this.g(a, b);
                            } else {
                                return new MulExpr(a, b);
                            }
                        } else if (b instanceof ScalarExpr) {
                            return new MulExpr(b, a, true);
                        } else {
                            return new MulExpr(a, b);
                        }
                    } else {
                        return new MulExpr(a, b);
                    }
                };
                MulExpr.prototype.toPrefix = function () {
                    return "*(" + this.lhs.toPrefix() + ", " + this.rhs.toPrefix() + ")";
                };
                MulExpr.prototype.toString = function () {
                    return this.lhs + " * " + this.rhs;
                };
                return MulExpr;
            }(BinaryExpr);
            exports_1("MulExpr", MulExpr);
            BasisBladeExpr = function (_super) {
                __extends(BasisBladeExpr, _super);
                function BasisBladeExpr(g, vectors, dirty) {
                    if (dirty === void 0) {
                        dirty = false;
                    }
                    _super.call(this, g, 'BasisBladeExpr');
                    this.vectors = vectors;
                    this.dirty = dirty;
                    if (!Array.isArray(vectors)) {
                        throw new Error('vectors must be a number[]');
                    }
                }
                BasisBladeExpr.prototype.isChanged = function () {
                    return this.dirty;
                };
                BasisBladeExpr.prototype.copy = function (dirty) {
                    return new BasisBladeExpr(this.g, this.vectors, dirty);
                };
                BasisBladeExpr.prototype.reset = function () {
                    if (this.dirty) {
                        return new BasisBladeExpr(this.g, this.vectors, false);
                    } else {
                        return this;
                    }
                };
                BasisBladeExpr.prototype.simplify = function () {
                    return this;
                };
                BasisBladeExpr.prototype.toPrefix = function () {
                    if (this.vectors.length > 0) {
                        return this.vectors.map(function (i) {
                            return "e" + (i + 1);
                        }).join(' ^ ');
                    } else {
                        return "1";
                    }
                };
                BasisBladeExpr.prototype.toString = function () {
                    if (this.vectors.length > 0) {
                        return this.vectors.map(function (i) {
                            return "e" + (i + 1);
                        }).join(' ^ ');
                    } else {
                        return "1";
                    }
                };
                return BasisBladeExpr;
            }(Expr);
            exports_1("BasisBladeExpr", BasisBladeExpr);
            ScalarExpr = function (_super) {
                __extends(ScalarExpr, _super);
                function ScalarExpr(g, value, dirty) {
                    if (dirty === void 0) {
                        dirty = false;
                    }
                    _super.call(this, g, 'ScalarExpr');
                    this.value = value;
                    this.dirty = dirty;
                }
                ScalarExpr.prototype.isChanged = function () {
                    return false;
                };
                ScalarExpr.prototype.copy = function (dirty) {
                    return new ScalarExpr(this.g, this.value, dirty);
                };
                ScalarExpr.prototype.reset = function () {
                    if (this.dirty) {
                        return new ScalarExpr(this.g, this.value, false);
                    } else {
                        return this;
                    }
                };
                ScalarExpr.prototype.simplify = function () {
                    return this;
                };
                ScalarExpr.prototype.toPrefix = function () {
                    return "" + this.value;
                };
                ScalarExpr.prototype.toPrefixLong = function () {
                    return "ScalarExpr('" + this.value + "')";
                };
                ScalarExpr.prototype.toString = function () {
                    return "" + this.value;
                };
                return ScalarExpr;
            }(Expr);
            exports_1("ScalarExpr", ScalarExpr);
            VBarExpr = function (_super) {
                __extends(VBarExpr, _super);
                function VBarExpr(lhs, rhs, dirty) {
                    if (dirty === void 0) {
                        dirty = false;
                    }
                    _super.call(this, lhs, rhs, 'VBarExpr');
                    this.dirty = dirty;
                }
                VBarExpr.prototype.isChanged = function () {
                    return this.dirty || this.lhs.isChanged() || this.rhs.isChanged();
                };
                VBarExpr.prototype.reset = function () {
                    return new VBarExpr(this.lhs.reset(), this.rhs.reset());
                };
                VBarExpr.prototype.simplify = function () {
                    var a = this.lhs.simplify();
                    var b = this.rhs.simplify();
                    if (a instanceof BasisBladeExpr && b instanceof BasisBladeExpr) {
                        return this.g(a, b);
                    } else if (a instanceof AddExpr && b instanceof BasisBladeExpr) {
                        var aL = a.lhs;
                        var aR = a.rhs;
                        return new AddExpr(new VBarExpr(aL, b), new VBarExpr(aR, b), true);
                    } else if (a instanceof BasisBladeExpr && b instanceof AddExpr) {
                        var bL = b.lhs;
                        var bR = b.rhs;
                        return new AddExpr(new VBarExpr(a, bL), new VBarExpr(a, bR), true);
                    } else if (a instanceof MulExpr && b instanceof Expr) {
                        var aL = a.lhs;
                        var aR = a.rhs;
                        if (aL instanceof ScalarExpr && aR instanceof BasisBladeExpr) {
                            return new MulExpr(aL, new VBarExpr(aR, b), true);
                        } else {
                            return new VBarExpr(a, b);
                        }
                    } else if (a instanceof BasisBladeExpr && b instanceof MulExpr) {
                        var bL = b.lhs;
                        var bR = b.rhs;
                        if (bL instanceof ScalarExpr && bR instanceof BasisBladeExpr) {
                            return new MulExpr(bL, new VBarExpr(a, bR), true);
                        } else {
                            return new VBarExpr(a, b);
                        }
                    } else {
                        return new VBarExpr(a, b);
                    }
                };
                VBarExpr.prototype.toPrefix = function () {
                    return "scp(" + this.lhs.toPrefix() + ", " + this.rhs.toPrefix() + ")";
                };
                VBarExpr.prototype.toString = function () {
                    return this.lhs + " | " + this.rhs;
                };
                return VBarExpr;
            }(BinaryExpr);
            exports_1("VBarExpr", VBarExpr);
            WedgeExpr = function (_super) {
                __extends(WedgeExpr, _super);
                function WedgeExpr(lhs, rhs, dirty) {
                    if (dirty === void 0) {
                        dirty = false;
                    }
                    _super.call(this, lhs, rhs, 'WedgeExpr');
                    this.dirty = dirty;
                }
                WedgeExpr.prototype.isChanged = function () {
                    return this.dirty || this.lhs.isChanged() || this.rhs.isChanged();
                };
                WedgeExpr.prototype.reset = function () {
                    return new WedgeExpr(this.lhs.reset(), this.rhs.reset());
                };
                WedgeExpr.prototype.simplify = function () {
                    var a = this.lhs.simplify();
                    var b = this.rhs.simplify();
                    if (a instanceof ScalarExpr) {
                        if (b instanceof ScalarExpr) {
                            return new ScalarExpr(this.g, 0, true);
                        } else if (typeof a.value === 'number' && a.value === 1) {
                            return b.copy(true);
                        } else {
                            return new WedgeExpr(a, b);
                        }
                    } else if (b instanceof ScalarExpr) {
                        if (a instanceof ScalarExpr) {
                            return new ScalarExpr(this.g, 0, true);
                        } else if (typeof b.value === 'number' && b.value === 1) {
                            if (a instanceof BasisBladeExpr) {
                                return a.copy(true);
                            } else {
                                return new WedgeExpr(a, b);
                            }
                        } else {
                            return new WedgeExpr(a, b);
                        }
                    } else if (a instanceof BasisBladeExpr && b instanceof BasisBladeExpr) {
                        var blade = wedgeBlades(a.vectors, b.vectors);
                        if (Array.isArray(blade)) {
                            return new BasisBladeExpr(this.g, blade, true);
                        } else {
                            return new ScalarExpr(this.g, 0, true);
                        }
                    } else if (a instanceof BasisBladeExpr && b instanceof BasisBladeExpr) {
                        if (a === b) {
                            return new ScalarExpr(this.g, 0, true);
                        } else {
                            return new AddExpr(new MulExpr(a, b), new MulExpr(new ScalarExpr(this.g, -1), new VBarExpr(a, b)), true);
                        }
                    } else {
                        return new WedgeExpr(a, b);
                    }
                };
                WedgeExpr.prototype.toPrefix = function () {
                    return "^(" + this.lhs + ", " + this.rhs + ")";
                };
                WedgeExpr.prototype.toString = function () {
                    return this.lhs + " ^ " + this.rhs;
                };
                return WedgeExpr;
            }(BinaryExpr);
            exports_1("WedgeExpr", WedgeExpr);
            Algebra = function () {
                function Algebra(names, g) {
                    var _this = this;
                    this.basis = [];
                    this.index = {};
                    this.metric = function (u, v) {
                        var i = u.vectors[0];
                        var j = v.vectors[0];
                        return new ScalarExpr(_this.metric, g[i][j]);
                    };
                    this.basis.push(new BasisBladeExpr(this.metric, []));
                    this.index['1'] = 0;
                    for (var i = 0; i < names.length; i++) {
                        var name_1 = names[i];
                        var vector = new BasisBladeExpr(this.metric, [i]);
                        var index = Math.pow(2, i);
                        this.index[name_1] = index;
                        var bLength = this.basis.length;
                        for (var j = 0; j < bLength; j++) {
                            var existing = this.basis[j];
                            var extended = new WedgeExpr(existing, vector);
                            var blade = this.simplify(extended);
                            if (blade instanceof BasisBladeExpr) {
                                this.basis.push(blade);
                            } else {
                                throw new Error(extended + " must simplify to a BasisBladeExpr");
                            }
                        }
                    }
                }
                Algebra.prototype.scalar = function (value) {
                    return new ScalarExpr(this.metric, value);
                };
                Algebra.prototype.simplify = function (expr) {
                    var count = 0;
                    if (expr instanceof Expr) {
                        expr = expr.reset();
                        expr = expr.simplify();
                        while (expr.isChanged()) {
                            expr = expr.reset();
                            count++;
                            if (count < 100) {
                                expr = expr.simplify();
                            }
                        }
                        return expr;
                    } else {
                        throw new Error("expr must be an Expr");
                    }
                };
                return Algebra;
            }();
            exports_1("default", Algebra);
        }
    };
});
System.register('geocas/config.js', [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var GeoCAS, config;
    return {
        setters: [],
        execute: function () {
            GeoCAS = function () {
                function GeoCAS() {
                    this.GITHUB = 'https://github.com/geometryzen/GeoCAS';
                    this.LAST_MODIFIED = '2016-07-20';
                    this.NAMESPACE = 'GeoCAS';
                    this.VERSION = '1.0.0';
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
System.register('geocas.js', ['./geocas/math/Algebra', './geocas/config'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var Algebra_1, config_1;
    var GeoCAS;
    return {
        setters: [function (Algebra_1_1) {
            Algebra_1 = Algebra_1_1;
        }, function (config_1_1) {
            config_1 = config_1_1;
        }],
        execute: function () {
            GeoCAS = {
                get LAST_MODIFIED() {
                    return config_1.default.LAST_MODIFIED;
                },
                get VERSION() {
                    return config_1.default.VERSION;
                },
                get Algebra() {
                    return Algebra_1.default;
                }
            };
            exports_1("default", GeoCAS);
        }
    };
});
//# sourceMappingURL=geocas-system-es5.js.map