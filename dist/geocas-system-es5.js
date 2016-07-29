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
    var wedgeBlades, Expr, BinaryExpr, AddExpr, SubExpr, MultiplyExpr, DivideExpr, LContractExpr, RContractExpr, BasisBladeExpr, ScalarExpr, VBarExpr, WedgeExpr, Algebra;
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
                function Expr(env, type) {
                    this.env = env;
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
                        return new AddExpr(this, new ScalarExpr(this.env, rhs));
                    } else {
                        return void 0;
                    }
                };
                Expr.prototype.__radd__ = function (lhs) {
                    if (lhs instanceof Expr) {
                        return new AddExpr(lhs, this);
                    } else if (typeof lhs === 'number') {
                        return new AddExpr(new ScalarExpr(this.env, lhs), this);
                    } else {
                        return void 0;
                    }
                };
                Expr.prototype.__sub__ = function (rhs) {
                    if (rhs instanceof Expr) {
                        return new SubExpr(this, rhs);
                    } else if (typeof rhs === 'number') {
                        return new SubExpr(this, new ScalarExpr(this.env, rhs));
                    } else {
                        return void 0;
                    }
                };
                Expr.prototype.__rsub__ = function (lhs) {
                    if (lhs instanceof Expr) {
                        return new SubExpr(lhs, this);
                    } else if (typeof lhs === 'number') {
                        return new SubExpr(new ScalarExpr(this.env, lhs), this);
                    } else {
                        return void 0;
                    }
                };
                Expr.prototype.__mul__ = function (rhs) {
                    if (rhs instanceof Expr) {
                        return new MultiplyExpr(this, rhs);
                    } else if (typeof rhs === 'number') {
                        return new MultiplyExpr(this, new ScalarExpr(this.env, rhs));
                    } else {
                        return void 0;
                    }
                };
                Expr.prototype.__rmul__ = function (lhs) {
                    if (lhs instanceof Expr) {
                        return new MultiplyExpr(lhs, this);
                    } else if (typeof lhs === 'number') {
                        return new MultiplyExpr(new ScalarExpr(this.env, lhs), this);
                    } else {
                        return void 0;
                    }
                };
                Expr.prototype.__div__ = function (rhs) {
                    if (rhs instanceof Expr) {
                        return new DivideExpr(this, rhs);
                    } else if (typeof rhs === 'number') {
                        return new DivideExpr(this, new ScalarExpr(this.env, rhs));
                    } else {
                        return void 0;
                    }
                };
                Expr.prototype.__rdiv__ = function (lhs) {
                    if (lhs instanceof Expr) {
                        return new DivideExpr(lhs, this);
                    } else if (typeof lhs === 'number') {
                        return new DivideExpr(new ScalarExpr(this.env, lhs), this);
                    } else {
                        return void 0;
                    }
                };
                Expr.prototype.__vbar__ = function (rhs) {
                    if (rhs instanceof Expr) {
                        return new VBarExpr(this, rhs);
                    } else if (typeof rhs === 'number') {
                        return new VBarExpr(this, new ScalarExpr(this.env, rhs));
                    } else {
                        return void 0;
                    }
                };
                Expr.prototype.__rvbar__ = function (lhs) {
                    if (lhs instanceof Expr) {
                        return new VBarExpr(lhs, this);
                    } else if (typeof lhs === 'number') {
                        return new VBarExpr(new ScalarExpr(this.env, lhs), this);
                    } else {
                        return void 0;
                    }
                };
                Expr.prototype.__lshift__ = function (rhs) {
                    if (rhs instanceof Expr) {
                        return new LContractExpr(this, rhs);
                    } else if (typeof rhs === 'number') {
                        return new LContractExpr(this, new ScalarExpr(this.env, rhs));
                    } else {
                        return void 0;
                    }
                };
                Expr.prototype.__rlshift__ = function (lhs) {
                    if (lhs instanceof Expr) {
                        return new LContractExpr(lhs, this);
                    } else if (typeof lhs === 'number') {
                        return new LContractExpr(new ScalarExpr(this.env, lhs), this);
                    } else {
                        return void 0;
                    }
                };
                Expr.prototype.__rshift__ = function (rhs) {
                    if (rhs instanceof Expr) {
                        return new RContractExpr(this, rhs);
                    } else if (typeof rhs === 'number') {
                        return new RContractExpr(this, new ScalarExpr(this.env, rhs));
                    } else {
                        return void 0;
                    }
                };
                Expr.prototype.__rrshift__ = function (lhs) {
                    if (lhs instanceof Expr) {
                        return new RContractExpr(lhs, this);
                    } else if (typeof lhs === 'number') {
                        return new RContractExpr(new ScalarExpr(this.env, lhs), this);
                    } else {
                        return void 0;
                    }
                };
                Expr.prototype.__wedge__ = function (rhs) {
                    if (rhs instanceof Expr) {
                        return new WedgeExpr(this, rhs);
                    } else if (typeof rhs === 'number') {
                        return new WedgeExpr(this, new ScalarExpr(this.env, rhs));
                    } else {
                        return void 0;
                    }
                };
                Expr.prototype.__rwedge__ = function (lhs) {
                    if (lhs instanceof Expr) {
                        return new WedgeExpr(lhs, this);
                    } else if (typeof lhs === 'number') {
                        return new WedgeExpr(new ScalarExpr(this.env, lhs), this);
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
                    _super.call(this, lhs.env, type);
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
                    } else if (a instanceof MultiplyExpr && b instanceof MultiplyExpr) {
                        if (a.lhs instanceof ScalarExpr && b.lhs instanceof ScalarExpr && a.rhs === b.rhs) {
                            var sa = a.lhs;
                            var sb = b.lhs;
                            if (typeof sa.value === 'number' && typeof sb.value === 'number') {
                                var s = new ScalarExpr(this.env, sa.value + sb.value);
                                return new MultiplyExpr(s, a.rhs, true);
                            } else {
                                return new AddExpr(a, b);
                            }
                        } else {
                            return new AddExpr(a, b);
                        }
                    } else if (a instanceof ScalarExpr && b instanceof ScalarExpr) {
                        if (typeof a.value === 'number' && typeof b.value === 'number') {
                            return new ScalarExpr(this.env, a.value + b.value, true);
                        } else {
                            return new AddExpr(a, b);
                        }
                    } else {
                        return new AddExpr(a, b);
                    }
                };
                AddExpr.prototype.toPrefix = function () {
                    return "add(" + this.lhs.toPrefix() + ", " + this.rhs.toPrefix() + ")";
                };
                AddExpr.prototype.toString = function () {
                    return this.lhs + " + " + this.rhs;
                };
                return AddExpr;
            }(BinaryExpr);
            exports_1("AddExpr", AddExpr);
            SubExpr = function (_super) {
                __extends(SubExpr, _super);
                function SubExpr(lhs, rhs, dirty) {
                    if (dirty === void 0) {
                        dirty = false;
                    }
                    _super.call(this, lhs, rhs, 'SubExpr');
                    this.dirty = dirty;
                }
                SubExpr.prototype.isChanged = function () {
                    return this.dirty || this.lhs.isChanged() || this.rhs.isChanged();
                };
                SubExpr.prototype.copy = function (dirty) {
                    return new SubExpr(this.lhs, this.rhs, dirty);
                };
                SubExpr.prototype.reset = function () {
                    return new SubExpr(this.lhs.reset(), this.rhs.reset());
                };
                SubExpr.prototype.simplify = function () {
                    var a = this.lhs.simplify();
                    var b = this.rhs.simplify();
                    return new SubExpr(a, b);
                };
                SubExpr.prototype.toPrefix = function () {
                    return "sub(" + this.lhs.toPrefix() + ", " + this.rhs.toPrefix() + ")";
                };
                SubExpr.prototype.toString = function () {
                    return this.lhs + " - " + this.rhs;
                };
                return SubExpr;
            }(BinaryExpr);
            exports_1("SubExpr", SubExpr);
            MultiplyExpr = function (_super) {
                __extends(MultiplyExpr, _super);
                function MultiplyExpr(lhs, rhs, dirty) {
                    if (dirty === void 0) {
                        dirty = false;
                    }
                    _super.call(this, lhs, rhs, 'MultiplyExpr');
                    this.dirty = dirty;
                }
                MultiplyExpr.prototype.isChanged = function () {
                    return this.dirty || this.lhs.isChanged() || this.rhs.isChanged();
                };
                MultiplyExpr.prototype.copy = function (dirty) {
                    return new MultiplyExpr(this.lhs, this.rhs, dirty);
                };
                MultiplyExpr.prototype.reset = function () {
                    return new MultiplyExpr(this.lhs.reset(), this.rhs.reset());
                };
                MultiplyExpr.prototype.simplify = function () {
                    var a = this.lhs.simplify();
                    var b = this.rhs.simplify();
                    if (a instanceof MultiplyExpr) {
                        var aL = a.lhs;
                        var aR = a.rhs;
                        if (aL instanceof ScalarExpr) {
                            return new MultiplyExpr(aL, new MultiplyExpr(aR, b), true);
                        } else {
                            return new MultiplyExpr(a, b);
                        }
                    } else if (b instanceof MultiplyExpr) {
                        var bL = b.lhs;
                        var bR = b.rhs;
                        if (bL instanceof ScalarExpr) {
                            return new MultiplyExpr(bL, new MultiplyExpr(a, bR), true);
                        } else {
                            return new MultiplyExpr(a, b);
                        }
                    }
                    if (a instanceof ScalarExpr) {
                        if (typeof a.value === 'number' && a.value === 0) {
                            return a.copy(true);
                        } else if (typeof a.value === 'number' && a.value === 1) {
                            return b.copy(true);
                        } else if (b instanceof ScalarExpr) {
                            if (typeof a.value === 'number' && a.value === 1) {
                                return b;
                            } else if (typeof a.value === 'number' && typeof b.value === 'number') {
                                return new ScalarExpr(this.env, a.value * b.value, true);
                            } else if (typeof a.value !== 'number' && typeof b.value === 'number') {
                                return new MultiplyExpr(b, a, true);
                            } else {
                                return new MultiplyExpr(a, b);
                            }
                        } else {
                            return new MultiplyExpr(a, b);
                        }
                    } else if (a instanceof BasisBladeExpr) {
                        if (b instanceof MultiplyExpr) {
                            var bL = b.lhs;
                            var bR = b.rhs;
                            if (bL instanceof BasisBladeExpr) {
                                if (a.vectors[0] === bL.vectors[0]) {
                                    return new MultiplyExpr(new MultiplyExpr(a, bL), bR, true);
                                } else {
                                    return new MultiplyExpr(a, b);
                                }
                            } else {
                                return new MultiplyExpr(a, b);
                            }
                        } else if (b instanceof BasisBladeExpr) {
                            if (a === b) {
                                return new VBarExpr(a, b, true);
                            } else {
                                return new MultiplyExpr(a, b);
                            }
                        } else if (b instanceof ScalarExpr) {
                            return new MultiplyExpr(b, a, true);
                        } else {
                            return new MultiplyExpr(a, b);
                        }
                    } else {
                        return new MultiplyExpr(a, b);
                    }
                };
                MultiplyExpr.prototype.toPrefix = function () {
                    return "mul(" + this.lhs.toPrefix() + ", " + this.rhs.toPrefix() + ")";
                };
                MultiplyExpr.prototype.toString = function () {
                    return this.lhs + " * " + this.rhs;
                };
                return MultiplyExpr;
            }(BinaryExpr);
            exports_1("MultiplyExpr", MultiplyExpr);
            DivideExpr = function (_super) {
                __extends(DivideExpr, _super);
                function DivideExpr(lhs, rhs, dirty) {
                    if (dirty === void 0) {
                        dirty = false;
                    }
                    _super.call(this, lhs, rhs, 'SubExpr');
                    this.dirty = dirty;
                }
                DivideExpr.prototype.isChanged = function () {
                    return this.dirty || this.lhs.isChanged() || this.rhs.isChanged();
                };
                DivideExpr.prototype.copy = function (dirty) {
                    return new DivideExpr(this.lhs, this.rhs, dirty);
                };
                DivideExpr.prototype.reset = function () {
                    return new DivideExpr(this.lhs.reset(), this.rhs.reset());
                };
                DivideExpr.prototype.simplify = function () {
                    var a = this.lhs.simplify();
                    var b = this.rhs.simplify();
                    return new DivideExpr(a, b);
                };
                DivideExpr.prototype.toPrefix = function () {
                    return "div(" + this.lhs.toPrefix() + ", " + this.rhs.toPrefix() + ")";
                };
                DivideExpr.prototype.toString = function () {
                    return this.lhs + " / " + this.rhs;
                };
                return DivideExpr;
            }(BinaryExpr);
            exports_1("DivideExpr", DivideExpr);
            LContractExpr = function (_super) {
                __extends(LContractExpr, _super);
                function LContractExpr(lhs, rhs, dirty) {
                    if (dirty === void 0) {
                        dirty = false;
                    }
                    _super.call(this, lhs, rhs, 'LContractExpr');
                    this.dirty = dirty;
                }
                LContractExpr.prototype.isChanged = function () {
                    return this.dirty || this.lhs.isChanged() || this.rhs.isChanged();
                };
                LContractExpr.prototype.copy = function (dirty) {
                    return new LContractExpr(this.lhs, this.rhs, dirty);
                };
                LContractExpr.prototype.reset = function () {
                    return new LContractExpr(this.lhs.reset(), this.rhs.reset());
                };
                LContractExpr.prototype.simplify = function () {
                    var a = this.lhs.simplify();
                    var b = this.rhs.simplify();
                    return new LContractExpr(a, b);
                };
                LContractExpr.prototype.toPrefix = function () {
                    return "lco(" + this.lhs.toPrefix() + ", " + this.rhs.toPrefix() + ")";
                };
                LContractExpr.prototype.toString = function () {
                    return this.lhs + " << " + this.rhs;
                };
                return LContractExpr;
            }(BinaryExpr);
            exports_1("LContractExpr", LContractExpr);
            RContractExpr = function (_super) {
                __extends(RContractExpr, _super);
                function RContractExpr(lhs, rhs, dirty) {
                    if (dirty === void 0) {
                        dirty = false;
                    }
                    _super.call(this, lhs, rhs, 'RContractExpr');
                    this.dirty = dirty;
                }
                RContractExpr.prototype.isChanged = function () {
                    return this.dirty || this.lhs.isChanged() || this.rhs.isChanged();
                };
                RContractExpr.prototype.copy = function (dirty) {
                    return new RContractExpr(this.lhs, this.rhs, dirty);
                };
                RContractExpr.prototype.reset = function () {
                    return new RContractExpr(this.lhs.reset(), this.rhs.reset());
                };
                RContractExpr.prototype.simplify = function () {
                    var a = this.lhs.simplify();
                    var b = this.rhs.simplify();
                    return new RContractExpr(a, b);
                };
                RContractExpr.prototype.toPrefix = function () {
                    return "rco(" + this.lhs.toPrefix() + ", " + this.rhs.toPrefix() + ")";
                };
                RContractExpr.prototype.toString = function () {
                    return this.lhs + " >> " + this.rhs;
                };
                return RContractExpr;
            }(BinaryExpr);
            exports_1("RContractExpr", RContractExpr);
            BasisBladeExpr = function (_super) {
                __extends(BasisBladeExpr, _super);
                function BasisBladeExpr(env, vectors, dirty) {
                    if (dirty === void 0) {
                        dirty = false;
                    }
                    _super.call(this, env, 'BasisBladeExpr');
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
                    return new BasisBladeExpr(this.env, this.vectors, dirty);
                };
                BasisBladeExpr.prototype.reset = function () {
                    if (this.dirty) {
                        return new BasisBladeExpr(this.env, this.vectors, false);
                    } else {
                        return this;
                    }
                };
                BasisBladeExpr.prototype.simplify = function () {
                    return this;
                };
                BasisBladeExpr.prototype.toPrefix = function () {
                    return this.env.bladeName(this.vectors);
                };
                BasisBladeExpr.prototype.toString = function () {
                    return this.env.bladeName(this.vectors);
                };
                return BasisBladeExpr;
            }(Expr);
            exports_1("BasisBladeExpr", BasisBladeExpr);
            ScalarExpr = function (_super) {
                __extends(ScalarExpr, _super);
                function ScalarExpr(env, value, dirty) {
                    if (dirty === void 0) {
                        dirty = false;
                    }
                    _super.call(this, env, 'ScalarExpr');
                    this.value = value;
                    this.dirty = dirty;
                }
                ScalarExpr.prototype.isChanged = function () {
                    return false;
                };
                ScalarExpr.prototype.copy = function (dirty) {
                    return new ScalarExpr(this.env, this.value, dirty);
                };
                ScalarExpr.prototype.reset = function () {
                    if (this.dirty) {
                        return new ScalarExpr(this.env, this.value, false);
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
                        return this.env.g(a, b);
                    } else if (a instanceof AddExpr && b instanceof BasisBladeExpr) {
                        var aL = a.lhs;
                        var aR = a.rhs;
                        return new AddExpr(new VBarExpr(aL, b), new VBarExpr(aR, b), true);
                    } else if (a instanceof BasisBladeExpr && b instanceof AddExpr) {
                        var bL = b.lhs;
                        var bR = b.rhs;
                        return new AddExpr(new VBarExpr(a, bL), new VBarExpr(a, bR), true);
                    } else if (a instanceof MultiplyExpr && b instanceof Expr) {
                        var aL = a.lhs;
                        var aR = a.rhs;
                        if (aL instanceof ScalarExpr && aR instanceof BasisBladeExpr) {
                            return new MultiplyExpr(aL, new VBarExpr(aR, b), true);
                        } else {
                            return new VBarExpr(a, b);
                        }
                    } else if (a instanceof BasisBladeExpr && b instanceof MultiplyExpr) {
                        var bL = b.lhs;
                        var bR = b.rhs;
                        if (bL instanceof ScalarExpr && bR instanceof BasisBladeExpr) {
                            return new MultiplyExpr(bL, new VBarExpr(a, bR), true);
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
                            return new ScalarExpr(this.env, 0, true);
                        } else if (typeof a.value === 'number' && a.value === 1) {
                            return b.copy(true);
                        } else {
                            return new WedgeExpr(a, b);
                        }
                    } else if (b instanceof ScalarExpr) {
                        if (a instanceof ScalarExpr) {
                            return new ScalarExpr(this.env, 0, true);
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
                            return new BasisBladeExpr(this.env, blade, true);
                        } else {
                            return new ScalarExpr(this.env, 0, true);
                        }
                    } else if (a instanceof BasisBladeExpr && b instanceof BasisBladeExpr) {
                        if (a === b) {
                            return new ScalarExpr(this.env, 0, true);
                        } else {
                            return new AddExpr(new MultiplyExpr(a, b), new MultiplyExpr(new ScalarExpr(this.env, -1), new VBarExpr(a, b)), true);
                        }
                    } else {
                        return new WedgeExpr(a, b);
                    }
                };
                WedgeExpr.prototype.toPrefix = function () {
                    return "ext(" + this.lhs + ", " + this.rhs + ")";
                };
                WedgeExpr.prototype.toString = function () {
                    return this.lhs + " ^ " + this.rhs;
                };
                return WedgeExpr;
            }(BinaryExpr);
            exports_1("WedgeExpr", WedgeExpr);
            Algebra = function () {
                function Algebra(g, unused) {
                    this.basis = [];
                    this._bnames = [];
                    this._metric = g;
                    this.basis.push(new BasisBladeExpr(this, []));
                    this._bnames[0] = '1';
                    for (var i = 0; i < this._metric.length; i++) {
                        var vector = new BasisBladeExpr(this, [i]);
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
                Algebra.prototype.bladeName = function (vectors) {
                    var _this = this;
                    if (vectors.length > 0) {
                        return vectors.map(function (i) {
                            if (_this._bnames) {
                                var basisIndex = Math.pow(2, i);
                                if (_this._bnames[basisIndex]) {
                                    return _this._bnames[basisIndex];
                                }
                            }
                            return "e" + (i + 1);
                        }).join(' ^ ');
                    } else {
                        return this._bnames[0];
                    }
                };
                Algebra.prototype.g = function (u, v) {
                    var i = u.vectors[0];
                    var j = v.vectors[0];
                    return new ScalarExpr(this, this._metric[i][j]);
                };
                Algebra.prototype.scalar = function (value) {
                    return new ScalarExpr(this, value);
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