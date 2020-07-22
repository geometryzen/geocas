import { __extends } from "tslib";
var wedgeBlades = function (a, b) {
    var result = [];
    var aLen = a.length;
    var bLen = b.length;
    for (var i = 0; i < aLen; i++) {
        var av = a[i];
        if (b.indexOf(av) < 0) {
            result.push(av);
        }
        else {
            return null;
        }
    }
    for (var i = 0; i < bLen; i++) {
        result.push(b[i]);
    }
    return result;
};
var Expr = /** @class */ (function () {
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
        }
        else if (typeof rhs === 'number') {
            return new AddExpr(this, new ScalarExpr(this.env, rhs));
        }
        else {
            return void 0;
        }
    };
    Expr.prototype.__radd__ = function (lhs) {
        if (lhs instanceof Expr) {
            return new AddExpr(lhs, this);
        }
        else if (typeof lhs === 'number') {
            return new AddExpr(new ScalarExpr(this.env, lhs), this);
        }
        else {
            return void 0;
        }
    };
    Expr.prototype.__sub__ = function (rhs) {
        if (rhs instanceof Expr) {
            return new SubExpr(this, rhs);
        }
        else if (typeof rhs === 'number') {
            return new SubExpr(this, new ScalarExpr(this.env, rhs));
        }
        else {
            return void 0;
        }
    };
    Expr.prototype.__rsub__ = function (lhs) {
        if (lhs instanceof Expr) {
            return new SubExpr(lhs, this);
        }
        else if (typeof lhs === 'number') {
            return new SubExpr(new ScalarExpr(this.env, lhs), this);
        }
        else {
            return void 0;
        }
    };
    Expr.prototype.__mul__ = function (rhs) {
        if (rhs instanceof Expr) {
            return new MultiplyExpr(this, rhs);
        }
        else if (typeof rhs === 'number') {
            return new MultiplyExpr(this, new ScalarExpr(this.env, rhs));
        }
        else {
            return void 0;
        }
    };
    Expr.prototype.__rmul__ = function (lhs) {
        if (lhs instanceof Expr) {
            return new MultiplyExpr(lhs, this);
        }
        else if (typeof lhs === 'number') {
            return new MultiplyExpr(new ScalarExpr(this.env, lhs), this);
        }
        else {
            return void 0;
        }
    };
    Expr.prototype.__div__ = function (rhs) {
        if (rhs instanceof Expr) {
            return new DivideExpr(this, rhs);
        }
        else if (typeof rhs === 'number') {
            return new DivideExpr(this, new ScalarExpr(this.env, rhs));
        }
        else {
            return void 0;
        }
    };
    Expr.prototype.__rdiv__ = function (lhs) {
        if (lhs instanceof Expr) {
            return new DivideExpr(lhs, this);
        }
        else if (typeof lhs === 'number') {
            return new DivideExpr(new ScalarExpr(this.env, lhs), this);
        }
        else {
            return void 0;
        }
    };
    Expr.prototype.__vbar__ = function (rhs) {
        if (rhs instanceof Expr) {
            return new VBarExpr(this, rhs);
        }
        else if (typeof rhs === 'number') {
            return new VBarExpr(this, new ScalarExpr(this.env, rhs));
        }
        else {
            return void 0;
        }
    };
    Expr.prototype.__rvbar__ = function (lhs) {
        if (lhs instanceof Expr) {
            return new VBarExpr(lhs, this);
        }
        else if (typeof lhs === 'number') {
            return new VBarExpr(new ScalarExpr(this.env, lhs), this);
        }
        else {
            return void 0;
        }
    };
    Expr.prototype.__lshift__ = function (rhs) {
        if (rhs instanceof Expr) {
            return new LContractExpr(this, rhs);
        }
        else if (typeof rhs === 'number') {
            return new LContractExpr(this, new ScalarExpr(this.env, rhs));
        }
        else {
            return void 0;
        }
    };
    Expr.prototype.__rlshift__ = function (lhs) {
        if (lhs instanceof Expr) {
            return new LContractExpr(lhs, this);
        }
        else if (typeof lhs === 'number') {
            return new LContractExpr(new ScalarExpr(this.env, lhs), this);
        }
        else {
            return void 0;
        }
    };
    Expr.prototype.__rshift__ = function (rhs) {
        if (rhs instanceof Expr) {
            return new RContractExpr(this, rhs);
        }
        else if (typeof rhs === 'number') {
            return new RContractExpr(this, new ScalarExpr(this.env, rhs));
        }
        else {
            return void 0;
        }
    };
    Expr.prototype.__rrshift__ = function (lhs) {
        if (lhs instanceof Expr) {
            return new RContractExpr(lhs, this);
        }
        else if (typeof lhs === 'number') {
            return new RContractExpr(new ScalarExpr(this.env, lhs), this);
        }
        else {
            return void 0;
        }
    };
    Expr.prototype.__wedge__ = function (rhs) {
        if (rhs instanceof Expr) {
            return new WedgeExpr(this, rhs);
        }
        else if (typeof rhs === 'number') {
            return new WedgeExpr(this, new ScalarExpr(this.env, rhs));
        }
        else {
            return void 0;
        }
    };
    Expr.prototype.__rwedge__ = function (lhs) {
        if (lhs instanceof Expr) {
            return new WedgeExpr(lhs, this);
        }
        else if (typeof lhs === 'number') {
            return new WedgeExpr(new ScalarExpr(this.env, lhs), this);
        }
        else {
            return void 0;
        }
    };
    Expr.prototype.__tilde__ = function () {
        return new ReverseExpr(this);
    };
    Expr.prototype.__bang__ = function () {
        return new InverseExpr(this);
    };
    Expr.prototype.__neg__ = function () {
        return new NegExpr(this);
    };
    Expr.prototype.__pos__ = function () {
        return new PosExpr(this);
    };
    return Expr;
}());
export { Expr };
var BinaryExpr = /** @class */ (function (_super) {
    __extends(BinaryExpr, _super);
    function BinaryExpr(lhs, rhs, type) {
        var _this = _super.call(this, lhs.env, type) || this;
        _this.lhs = lhs;
        _this.rhs = rhs;
        if (!(lhs instanceof Expr)) {
            throw new Error(type + ".lhs must be an Expr: " + typeof lhs);
        }
        if (!(rhs instanceof Expr)) {
            throw new Error(type + ".rhs must be an Expr: " + typeof rhs);
        }
        return _this;
    }
    return BinaryExpr;
}(Expr));
export { BinaryExpr };
var AddExpr = /** @class */ (function (_super) {
    __extends(AddExpr, _super);
    function AddExpr(lhs, rhs, dirty) {
        if (dirty === void 0) { dirty = false; }
        var _this = _super.call(this, lhs, rhs, 'AddExpr') || this;
        _this.dirty = dirty;
        return _this;
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
        }
        else if (a instanceof MultiplyExpr && b instanceof MultiplyExpr) {
            if (a.lhs instanceof ScalarExpr && b.lhs instanceof ScalarExpr && a.rhs === b.rhs) {
                var sa = a.lhs;
                var sb = b.lhs;
                if (typeof sa.value === 'number' && typeof sb.value === 'number') {
                    var s = new ScalarExpr(this.env, sa.value + sb.value);
                    return new MultiplyExpr(s, a.rhs, true);
                }
                else {
                    return new AddExpr(a, b);
                }
            }
            else {
                return new AddExpr(a, b);
            }
        }
        else if (a instanceof ScalarExpr && b instanceof ScalarExpr) {
            if (typeof a.value === 'number' && typeof b.value === 'number') {
                return new ScalarExpr(this.env, a.value + b.value, true);
            }
            else {
                return new AddExpr(a, b);
            }
        }
        else {
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
}(BinaryExpr));
export { AddExpr };
var SubExpr = /** @class */ (function (_super) {
    __extends(SubExpr, _super);
    function SubExpr(lhs, rhs, dirty) {
        if (dirty === void 0) { dirty = false; }
        var _this = _super.call(this, lhs, rhs, 'SubExpr') || this;
        _this.dirty = dirty;
        return _this;
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
}(BinaryExpr));
export { SubExpr };
var MultiplyExpr = /** @class */ (function (_super) {
    __extends(MultiplyExpr, _super);
    function MultiplyExpr(lhs, rhs, dirty) {
        if (dirty === void 0) { dirty = false; }
        var _this = _super.call(this, lhs, rhs, 'MultiplyExpr') || this;
        _this.dirty = dirty;
        return _this;
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
        if (!(a instanceof ScalarExpr) && b instanceof ScalarExpr) {
            return new MultiplyExpr(b, a, true);
        }
        else if (a instanceof MultiplyExpr) {
            var aL = a.lhs;
            var aR = a.rhs;
            if (aL instanceof ScalarExpr) {
                return new MultiplyExpr(aL, new MultiplyExpr(aR, b), true);
            }
            else {
                return new MultiplyExpr(a, b);
            }
        }
        else if (b instanceof MultiplyExpr) {
            var bL = b.lhs;
            var bR = b.rhs;
            if (bL instanceof ScalarExpr) {
                return new MultiplyExpr(bL, new MultiplyExpr(a, bR), true);
            }
            else {
                return new MultiplyExpr(a, b);
            }
        }
        else if (a instanceof ScalarExpr) {
            if (typeof a.value === 'number' && a.value === 0) {
                return a.copy(true);
            }
            else if (typeof a.value === 'number' && a.value === 1) {
                return b.copy(true);
            }
            else if (b instanceof ScalarExpr) {
                if (typeof a.value === 'number' && a.value === 1) {
                    return b;
                }
                else if (typeof a.value === 'number' && typeof b.value === 'number') {
                    return new ScalarExpr(this.env, a.value * b.value, true);
                }
                else if (typeof a.value !== 'number' && typeof b.value === 'number') {
                    return new MultiplyExpr(b, a, true);
                }
                else {
                    return new MultiplyExpr(a, b);
                }
            }
            else {
                return new MultiplyExpr(a, b);
            }
        }
        else if (a instanceof BasisBladeExpr) {
            if (b instanceof MultiplyExpr) {
                var bL = b.lhs;
                var bR = b.rhs;
                if (bL instanceof BasisBladeExpr) {
                    if (a.vectors[0] === bL.vectors[0]) {
                        return new MultiplyExpr(new MultiplyExpr(a, bL), bR, true);
                    }
                    else {
                        return new MultiplyExpr(a, b);
                    }
                }
                else {
                    return new MultiplyExpr(a, b);
                }
            }
            else if (b instanceof BasisBladeExpr) {
                if (a === b) {
                    return new VBarExpr(a, b, true);
                }
                else {
                    return new MultiplyExpr(a, b);
                }
            }
            else if (b instanceof ScalarExpr) {
                return new MultiplyExpr(b, a, true);
            }
            else {
                return new MultiplyExpr(a, b);
            }
        }
        else {
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
}(BinaryExpr));
export { MultiplyExpr };
var DivideExpr = /** @class */ (function (_super) {
    __extends(DivideExpr, _super);
    function DivideExpr(lhs, rhs, dirty) {
        if (dirty === void 0) { dirty = false; }
        var _this = _super.call(this, lhs, rhs, 'SubExpr') || this;
        _this.dirty = dirty;
        return _this;
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
}(BinaryExpr));
export { DivideExpr };
var LContractExpr = /** @class */ (function (_super) {
    __extends(LContractExpr, _super);
    function LContractExpr(lhs, rhs, dirty) {
        if (dirty === void 0) { dirty = false; }
        var _this = _super.call(this, lhs, rhs, 'LContractExpr') || this;
        _this.dirty = dirty;
        return _this;
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
}(BinaryExpr));
export { LContractExpr };
var RContractExpr = /** @class */ (function (_super) {
    __extends(RContractExpr, _super);
    function RContractExpr(lhs, rhs, dirty) {
        if (dirty === void 0) { dirty = false; }
        var _this = _super.call(this, lhs, rhs, 'RContractExpr') || this;
        _this.dirty = dirty;
        return _this;
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
}(BinaryExpr));
export { RContractExpr };
/**
 * A blade is the outer (wedge) product of a list of vectors.
 * An empty list of vectors corresponds to the unit scalar.
 */
var BasisBladeExpr = /** @class */ (function (_super) {
    __extends(BasisBladeExpr, _super);
    function BasisBladeExpr(env, vectors, dirty) {
        if (dirty === void 0) { dirty = false; }
        var _this = _super.call(this, env, 'BasisBladeExpr') || this;
        _this.vectors = vectors;
        _this.dirty = dirty;
        if (!Array.isArray(vectors)) {
            throw new Error('vectors must be a number[]');
        }
        return _this;
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
        }
        else {
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
}(Expr));
export { BasisBladeExpr };
var ScalarExpr = /** @class */ (function (_super) {
    __extends(ScalarExpr, _super);
    function ScalarExpr(env, value, dirty) {
        if (dirty === void 0) { dirty = false; }
        var _this = _super.call(this, env, 'ScalarExpr') || this;
        _this.value = value;
        _this.dirty = dirty;
        return _this;
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
        }
        else {
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
}(Expr));
export { ScalarExpr };
var VBarExpr = /** @class */ (function (_super) {
    __extends(VBarExpr, _super);
    function VBarExpr(lhs, rhs, dirty) {
        if (dirty === void 0) { dirty = false; }
        var _this = _super.call(this, lhs, rhs, 'VBarExpr') || this;
        _this.dirty = dirty;
        return _this;
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
        }
        else if (a instanceof AddExpr && b instanceof BasisBladeExpr) {
            var aL = a.lhs;
            var aR = a.rhs;
            return new AddExpr(new VBarExpr(aL, b), new VBarExpr(aR, b), true);
        }
        else if (a instanceof BasisBladeExpr && b instanceof AddExpr) {
            var bL = b.lhs;
            var bR = b.rhs;
            return new AddExpr(new VBarExpr(a, bL), new VBarExpr(a, bR), true);
        }
        else if (a instanceof MultiplyExpr && b instanceof Expr) {
            var aL = a.lhs;
            var aR = a.rhs;
            if (aL instanceof ScalarExpr && aR instanceof BasisBladeExpr) {
                return new MultiplyExpr(aL, new VBarExpr(aR, b), true);
            }
            else {
                return new VBarExpr(a, b);
            }
        }
        else if (a instanceof BasisBladeExpr && b instanceof MultiplyExpr) {
            var bL = b.lhs;
            var bR = b.rhs;
            if (bL instanceof ScalarExpr && bR instanceof BasisBladeExpr) {
                return new MultiplyExpr(bL, new VBarExpr(a, bR), true);
            }
            else {
                return new VBarExpr(a, b);
            }
        }
        else {
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
}(BinaryExpr));
export { VBarExpr };
var WedgeExpr = /** @class */ (function (_super) {
    __extends(WedgeExpr, _super);
    function WedgeExpr(lhs, rhs, dirty) {
        if (dirty === void 0) { dirty = false; }
        var _this = _super.call(this, lhs, rhs, 'WedgeExpr') || this;
        _this.dirty = dirty;
        return _this;
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
            }
            else if (typeof a.value === 'number' && a.value === 1) {
                return b.copy(true);
            }
            else {
                return new WedgeExpr(a, b);
            }
        }
        else if (b instanceof ScalarExpr) {
            if (a instanceof ScalarExpr) {
                return new ScalarExpr(this.env, 0, true);
            }
            else if (typeof b.value === 'number' && b.value === 1) {
                if (a instanceof BasisBladeExpr) {
                    return a.copy(true);
                }
                else {
                    return new WedgeExpr(a, b);
                }
            }
            else {
                return new WedgeExpr(a, b);
            }
        }
        else if (a instanceof BasisBladeExpr && b instanceof BasisBladeExpr) {
            var blade = wedgeBlades(a.vectors, b.vectors);
            if (Array.isArray(blade)) {
                return new BasisBladeExpr(this.env, blade, true);
            }
            else {
                return new ScalarExpr(this.env, 0, true);
            }
        }
        else if (a instanceof BasisBladeExpr && b instanceof BasisBladeExpr) {
            if (a === b) {
                return new ScalarExpr(this.env, 0, true);
            }
            else {
                return new AddExpr(new MultiplyExpr(a, b), new MultiplyExpr(new ScalarExpr(this.env, -1), new VBarExpr(a, b)), true);
            }
        }
        else {
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
}(BinaryExpr));
export { WedgeExpr };
var ReverseExpr = /** @class */ (function (_super) {
    __extends(ReverseExpr, _super);
    function ReverseExpr(inner, dirty) {
        if (dirty === void 0) { dirty = false; }
        var _this = _super.call(this, inner.env, 'ReverseExpr') || this;
        _this.inner = inner;
        _this.dirty = dirty;
        return _this;
    }
    ReverseExpr.prototype.isChanged = function () {
        return this.dirty || this.inner.isChanged();
    };
    ReverseExpr.prototype.copy = function (dirty) {
        return new ReverseExpr(this.inner, dirty);
    };
    ReverseExpr.prototype.reset = function () {
        return new ReverseExpr(this.inner.reset(), false);
    };
    ReverseExpr.prototype.simplify = function () {
        return new ReverseExpr(this.inner.simplify());
    };
    ReverseExpr.prototype.toPrefix = function () {
        return "reverse(" + this.inner + ")";
    };
    ReverseExpr.prototype.toString = function () {
        return "~" + this.inner;
    };
    return ReverseExpr;
}(Expr));
export { ReverseExpr };
var InverseExpr = /** @class */ (function (_super) {
    __extends(InverseExpr, _super);
    function InverseExpr(inner, dirty) {
        if (dirty === void 0) { dirty = false; }
        var _this = _super.call(this, inner.env, 'InverseExpr') || this;
        _this.inner = inner;
        _this.dirty = dirty;
        return _this;
    }
    InverseExpr.prototype.isChanged = function () {
        return this.dirty || this.inner.isChanged();
    };
    InverseExpr.prototype.copy = function (dirty) {
        return new InverseExpr(this.inner, dirty);
    };
    InverseExpr.prototype.reset = function () {
        return new InverseExpr(this.inner.reset(), false);
    };
    InverseExpr.prototype.simplify = function () {
        return new InverseExpr(this.inner.simplify());
    };
    InverseExpr.prototype.toPrefix = function () {
        return "inverse(" + this.inner + ")";
    };
    InverseExpr.prototype.toString = function () {
        return "!" + this.inner;
    };
    return InverseExpr;
}(Expr));
export { InverseExpr };
var NegExpr = /** @class */ (function (_super) {
    __extends(NegExpr, _super);
    function NegExpr(inner, dirty) {
        if (dirty === void 0) { dirty = false; }
        var _this = _super.call(this, inner.env, 'NegExpr') || this;
        _this.inner = inner;
        _this.dirty = dirty;
        return _this;
    }
    NegExpr.prototype.isChanged = function () {
        return this.dirty || this.inner.isChanged();
    };
    NegExpr.prototype.copy = function (dirty) {
        return new NegExpr(this.inner, dirty);
    };
    NegExpr.prototype.reset = function () {
        return new NegExpr(this.inner.reset(), false);
    };
    NegExpr.prototype.simplify = function () {
        return new NegExpr(this.inner.simplify());
    };
    NegExpr.prototype.toPrefix = function () {
        return "neg(" + this.inner + ")";
    };
    NegExpr.prototype.toString = function () {
        return "-" + this.inner;
    };
    return NegExpr;
}(Expr));
export { NegExpr };
var PosExpr = /** @class */ (function (_super) {
    __extends(PosExpr, _super);
    function PosExpr(inner, dirty) {
        if (dirty === void 0) { dirty = false; }
        var _this = _super.call(this, inner.env, 'PosExpr') || this;
        _this.inner = inner;
        _this.dirty = dirty;
        return _this;
    }
    PosExpr.prototype.isChanged = function () {
        return this.dirty || this.inner.isChanged();
    };
    PosExpr.prototype.copy = function (dirty) {
        return new PosExpr(this.inner, dirty);
    };
    PosExpr.prototype.reset = function () {
        return new PosExpr(this.inner.reset(), false);
    };
    PosExpr.prototype.simplify = function () {
        return new PosExpr(this.inner.simplify());
    };
    PosExpr.prototype.toPrefix = function () {
        return "pos(" + this.inner + ")";
    };
    PosExpr.prototype.toString = function () {
        return "+" + this.inner;
    };
    return PosExpr;
}(Expr));
export { PosExpr };
var Algebra = /** @class */ (function () {
    function Algebra(g, unused) {
        this.basis = [];
        this._bnames = [];
        this._metric = g;
        // TODO: Verify that the vectors is an array of strings.
        // TODO: Verify that the metric is a square array of numbers with the correct size.
        // Insert the basis blade corresponding to unity.
        // This primes the basis array for the steps that follow.
        this.basis.push(new BasisBladeExpr(this, []));
        this._bnames[0] = '1';
        // Insert the basis blades corresponding to the basis vectors.
        // The algorithm is to extend the existing blades by the new vector.
        for (var i = 0; i < this._metric.length; i++) {
            // const name = vectors[i];
            var vector = new BasisBladeExpr(this, [i]);
            // const index = Math.pow(2, i);
            // this.index[name] = index;
            var bLength = this.basis.length;
            for (var j = 0; j < bLength; j++) {
                var existing = this.basis[j];
                var extended = new WedgeExpr(existing, vector);
                var blade = this.simplify(extended);
                if (blade instanceof BasisBladeExpr) {
                    this.basis.push(blade);
                }
                else {
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
        }
        else {
            // The scalar blade name has no vectors.
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
        }
        else {
            throw new Error("expr must be an Expr");
        }
    };
    return Algebra;
}());
export default Algebra;
