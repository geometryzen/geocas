import bigInt from './BigInteger';
import {Integer} from './BigInteger';
import {gcd, lcm, isInstance, one as BigIntegerOne} from './BigInteger';
import GeometricOperators from './GeometricOperators';

class BigRational implements GeometricOperators<BigRational, number | string | Integer> {
    constructor(public numer: Integer, public denom: Integer) {
        // Alias properties kept for backwards compatability
        if (denom.isZero()) throw "Denominator cannot be 0.";
    }
    add(n: number | string | Integer | BigRational, d?: number | string | Integer) {
        const v = interpret(n, d);
        const multiple = lcm(this.denom, v.denom);
        let a = multiple.divide(this.denom);
        let b = multiple.divide(v.denom);
        a = this.numer.times(a);
        b = v.numer.times(b);
        return reduce(a.add(b), multiple);
    }
    plus(n: number | string | Integer, d?: number | string | Integer) {
        return this.add(n, d);
    }
    __add__(rhs: number | string | Integer | BigRational) {
        return this.add(rhs);
    }
    __radd__(lhs: number | string | Integer | BigRational) {
        const v = interpret(lhs);
        return v.add(this);
    }
    subtract(n: number | string | Integer | BigRational, d?: number | string | Integer) {
        const v = interpret(n, d);
        return this.add(v.negate());
    }
    minus(n: number | string | Integer | BigRational, d?: number | string | Integer) {
        return this.subtract(n, d);
    }
    __sub__(rhs: number | string | Integer | BigRational) {
        return this.subtract(rhs);
    }
    __rsub__(lhs: number | string | Integer | BigRational) {
        const v = interpret(lhs);
        return v.subtract(this);
    }

    multiply(n: number | string | Integer | BigRational, d?: number | string | Integer) {
        const v = interpret(n, d);
        return reduce(this.numer.times(v.numer), this.denom.times(v.denom));
    }
    times(n: number | string | Integer | BigRational, d?: number | string | Integer) {
        return this.multiply(n, d);
    }
    __mul__(rhs: number | string | Integer | BigRational) {
        return this.multiply(rhs);
    }
    __rmul__(lhs: number | string | Integer | BigRational) {
        const v = interpret(lhs);
        return v.multiply(this);
    }
    divide(n: number | string | Integer | BigRational, d?: number | string | Integer) {
        const v = interpret(n, d);
        return reduce(this.numer.times(v.denom), this.denom.times(v.numer));
    }
    __div__(rhs: number | string | Integer | BigRational) {
        return this.divide(rhs);
    }
    __rdiv__(lhs: number | string | Integer | BigRational) {
        const v = interpret(lhs);
        return v.divide(this);
    }
    inv() {
        return this.reciprocate();
    }
    over(n: number | string | Integer | BigRational, d?: number | string | Integer) {
        return this.divide(n, d);
    }

    reciprocate() {
        return new BigRational(this.denom, this.numer);
    }
    mod(n: number | string | Integer, d?: number | string | Integer) {
        var v = interpret(n, d);
        return this.minus(v.times(this.over(v).floor()));
    }
    pow(n: number | string | Integer) {
        const v = bigInt(n);
        const num = this.numer.pow(v);
        const denom = this.denom.pow(v);
        return reduce(num, denom);
    }

    floor(toBigInt?: boolean): Integer | BigRational {
        const divmod = this.numer.divmod(this.denom);
        let floor: Integer;
        if (divmod.remainder.isZero() || !divmod.quotient.sign) {
            floor = divmod.quotient;
        }
        else floor = divmod.quotient.prev();
        if (toBigInt) return floor;
        return new BigRational(floor, BigIntegerOne);
    }
    ceil(toBigInt?: boolean): Integer | BigRational {
        const divmod = this.numer.divmod(this.denom);
        let ceil: Integer;
        if (divmod.remainder.isZero() || divmod.quotient.sign) {
            ceil = divmod.quotient;
        }
        else ceil = divmod.quotient.next();
        if (toBigInt) return ceil;
        return new BigRational(ceil, BigIntegerOne);
    }
    round(toBigInt?: boolean) {
        return this.add(1, 2).floor(toBigInt);
    }

    compareAbs(n: number | string | Integer, d?: number | string | Integer) {
        var v = interpret(n, d);
        if (this.denom.equals(v.denom)) {
            return this.numer.compareAbs(v.numer);
        }
        return this.numer.times(v.denom).compareAbs(v.numer.times(this.denom));
    }
    compare(n: number | string | Integer | BigRational, d?: number | string | Integer) {
        var v = interpret(n, d);
        if (this.denom.equals(v.denom)) {
            return this.numer.compare(v.numer);
        }
        var comparison = this.denom.sign === v.denom.sign ? 1 : -1;
        return comparison * this.numer.times(v.denom).compare(v.numer.times(this.denom));
    }
    compareTo(n: number | string | Integer | BigRational, d?: number | string | Integer) {
        return this.compare(n, d);
    }

    equals(n: number | string | Integer | BigRational, d?: number | string | Integer) {
        return this.compare(n, d) === 0;
    }
    eq(n: number | string | Integer | BigRational, d?: number | string | Integer) {
        return this.equals(n, d);
    }
    __eq__(rhs: number | string | Integer | BigRational) {
        return this.eq(rhs);
    }
    notEquals(n: number | string | Integer | BigRational, d?: number | string | Integer) {
        return this.compare(n, d) !== 0;
    }
    neq(n: number | string | Integer | BigRational, d?: number | string | Integer) {
        return this.notEquals(n, d);
    }
    __ne__(rhs: number | string | Integer | BigRational) {
        return this.neq(rhs);
    }

    lesser(n: number | string | Integer | BigRational, d?: number | string | Integer) {
        return this.compare(n, d) < 0;
    }
    lt(n: number | string | Integer | BigRational, d?: number | string | Integer) {
        return this.lesser(n, d);
    }
    __lt__(rhs: number | string | Integer | BigRational) {
        return this.lt(rhs);
    }

    lesserOrEquals(n: number | string | Integer | BigRational, d?: number | string | Integer) {
        return this.compare(n, d) <= 0;
    }
    leq(n: number | string | Integer | BigRational, d?: number | string | Integer) {
        return this.lesserOrEquals(n, d);
    }
    __le__(rhs: number | string | Integer | BigRational) {
        return this.leq(rhs);
    }

    greater(n: number | string | Integer | BigRational, d?: number | string | Integer) {
        return this.compare(n, d) > 0;
    }
    gt(n: number | string | Integer | BigRational, d?: number | string | Integer) {
        return this.greater(n, d);
    }
    __gt__(rhs: number | string | Integer | BigRational) {
        return this.gt(rhs);
    }

    greaterOrEquals(n: number | string | Integer | BigRational, d?: number | string | Integer) {
        return this.compare(n, d) >= 0;
    }
    geq(n: number | string | Integer | BigRational, d?: number | string | Integer) {
        return this.greaterOrEquals(n, d);
    }
    __ge__(rhs: number | string | Integer | BigRational) {
        return this.geq(rhs);
    }

    abs() {
        if (this.isPositive()) return this;
        return this.negate();
    }
    __pos__() {
        return this;
    }
    __neg__() {
        return this.negate();
    }
    neg() {
        return this.negate();
    }
    negate() {
        if (this.denom.sign) {
            return new BigRational(this.numer, this.denom.negate());
        }
        return new BigRational(this.numer.negate(), this.denom);
    }
    isNegative() {
        return this.numer.sign !== this.denom.sign && !this.numer.isZero();
    }
    isOne() {
        return this.numer.isUnit() && this.denom.isUnit();
    }
    isPositive() {
        return this.numer.sign === this.denom.sign && !this.numer.isZero();
    }
    isZero() {
        return this.numer.isZero();
    }
    __vbar__(rhs: number | string | Integer | BigRational) {
        return this.multiply(rhs);
    }
    __rvbar__(lhs: number | string | Integer | BigRational) {
        const v = interpret(lhs);
        return v.multiply(this);
    }
    __wedge__(rhs: number | string | Integer | BigRational) {
        return bigRat(0);
    }
    __rwedge__(rhs: number | string | Integer | BigRational) {
        return bigRat(0);
    }
    __lshift__(rhs: number | string | Integer | BigRational) {
        return this.__vbar__(rhs);
    }
    __rlshift__(rhs: number | string | Integer | BigRational) {
        return this.__vbar__(rhs);
    }
    __rshift__(rhs: number | string | Integer | BigRational) {
        return this.__vbar__(rhs);
    }
    __rrshift__(rhs: number | string | Integer | BigRational) {
        return this.__vbar__(rhs);
    }
    __bang__(): BigRational {
        return void 0;
    }
    __tilde__(): BigRational {
        return void 0;
    }
    toDecimal(digits = 10): string {
        var n = this.numer.divmod(this.denom);
        var intPart = n.quotient.abs().toString();
        var remainder = bigRat(n.remainder.abs(), this.denom);
        var shiftedRemainder = remainder.times(bigInt("1e" + digits));
        var decPart = shiftedRemainder.numer.over(shiftedRemainder.denom).toString();
        if (decPart.length < digits) {
            decPart = new Array(digits - decPart.length + 1).join("0") + decPart;
        }
        if (shiftedRemainder.numer.mod(shiftedRemainder.denom).isZero()) {
            while (decPart.slice(-1) === "0") {
                decPart = decPart.slice(0, -1);
            }
        }
        if (this.isNegative()) {
            intPart = "-" + intPart;
        }
        if (decPart === "") {
            return intPart;
        }
        return intPart + "." + decPart;
    }

    toString() {
        return String(this.numer) + "/" + String(this.denom);
    }

    valueOf() {
        return this.numer.valueOf() / this.denom.valueOf();
    }
}

function reduce(n: Integer, d: Integer) {
    const divisor = gcd(n, d);
    const numer = n.over(divisor);
    const denom = d.over(divisor);
    if (denom.isNegative()) {
        return new BigRational(numer.negate(), denom.negate());
    }
    return new BigRational(numer, denom);
}


function interpret(n: number | string | Integer | BigRational, d?: number | string | Integer) {
    return bigRat(n, d);
}

function parseDecimal(n: string): BigRational {
    var parts = n.split(/e/i);
    if (parts.length > 2) {
        throw new Error("Invalid input: too many 'e' tokens");
    }
    if (parts.length > 1) {
        var isPositive = true;
        if (parts[1][0] === "-") {
            parts[1] = parts[1].slice(1);
            isPositive = false;
        }
        if (parts[1][0] === "+") {
            parts[1] = parts[1].slice(1);
        }
        var significand = parseDecimal(parts[0]);
        var exponent = new BigRational(bigInt(10).pow(parts[1]), BigIntegerOne);
        if (isPositive) {
            return significand.times(exponent);
        } else {
            return significand.over(exponent);
        }
    }
    parts = n.trim().split(".");
    if (parts.length > 2) {
        throw new Error("Invalid input: too many '.' tokens");
    }
    if (parts.length > 1) {
        var isNegative = parts[0][0] === '-';
        if (isNegative) parts[0] = parts[0].slice(1);
        var intPart = new BigRational(bigInt(parts[0]), BigIntegerOne);
        var length = parts[1].length;
        while (parts[1][0] === "0") {
            parts[1] = parts[1].slice(1);
        }
        var exp = "1" + Array(length + 1).join("0");
        var decPart = reduce(bigInt(parts[1]), bigInt(exp));
        intPart = intPart.add(decPart);
        if (isNegative) intPart = intPart.negate();
        return intPart;
    }
    return new BigRational(bigInt(n), BigIntegerOne);
}

export default function bigRat(a: number | string | Integer | BigRational, b?: number | string | Integer): BigRational {
    if (!a) {
        return new BigRational(bigInt(0), BigIntegerOne);
    }
    if (b) {
        return reduce(bigInt(<any>a), bigInt(b));
    }
    if (isInstance(a)) {
        return new BigRational(<Integer>a, BigIntegerOne);
    }
    if (a instanceof BigRational) return <any>a;

    let numer: Integer;
    let denom: Integer;

    const text = String(a);
    const texts = text.split("/");
    if (texts.length > 2) {
        throw new Error("Invalid input: too many '/' tokens");
    }
    if (texts.length > 1) {
        const parts = texts[0].split("_");
        if (parts.length > 2) {
            throw new Error("Invalid input: too many '_' tokens");
        }
        if (parts.length > 1) {
            var isPositive = parts[0][0] !== "-";
            numer = bigInt(parts[0]).times(texts[1]);
            if (isPositive) {
                numer = numer.add(parts[1]);
            } else {
                numer = numer.subtract(parts[1]);
            }
            denom = bigInt(texts[1]);
            return reduce(numer, denom);
        }
        return reduce(bigInt(texts[0]), bigInt(texts[1]));
    }
    return parseDecimal(text);
}

export const zero = bigRat(0);
export const one = bigRat(1);
export const minusOne = bigRat(-1);
