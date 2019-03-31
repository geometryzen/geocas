import RingOperators from './RingOperators';

const BASE = 1e7;
const LOG_BASE = 7;
const MAX_INT = 9007199254740992;
const MAX_INT_ARR = smallToArray(MAX_INT);
const LOG_MAX_INT = Math.log(MAX_INT);

const parseBase = function (text: string, base: number) {
    let val = Integer[0];
    let pow = Integer[1];
    const length = text.length;
    if (2 <= base && base <= 36) {
        if (length <= LOG_MAX_INT / Math.log(base)) {
            return new SmallInteger(parseInt(text, base));
        }
    }
    const baseParsed = parseValue(base);
    var digits: Integer[] = [];
    var isNegative = text[0] === "-";
    for (let i = isNegative ? 1 : 0; i < text.length; i++) {
        var c = text[i].toLowerCase(),
            charCode = c.charCodeAt(0);
        if (48 <= charCode && charCode <= 57) digits.push(parseValue(c));
        else if (97 <= charCode && charCode <= 122) digits.push(parseValue(c.charCodeAt(0) - 87));
        else if (c === "<") {
            var start = i;
            do { i++; } while (text[i] !== ">");
            digits.push(parseValue(text.slice(start + 1, i)));
        }
        else throw new Error(c + " is not a valid character");
    }
    digits.reverse();
    for (let i = 0; i < digits.length; i++) {
        val = val.add(digits[i].times(pow));
        pow = pow.times(baseParsed);
    }
    return isNegative ? val.negate() : val;
};

const powersOfTwo = [1];
while (powersOfTwo[powersOfTwo.length - 1] <= BASE) {
    powersOfTwo.push(2 * powersOfTwo[powersOfTwo.length - 1]);
}
const powers2Length = powersOfTwo.length;
const highestPower2 = powersOfTwo[powers2Length - 1];

export class Integer {
    sign: boolean;
    isSmall: boolean;
    constructor(v?: number | string | Integer, radix?: number | string | Integer) {
        if (typeof v === "undefined") return Integer[0];
        if (typeof radix !== "undefined") return +radix === 10 ? parseValue(v) : parseBase(<string>v, <number>radix);
        return parseValue(v);
    }
    add(v: number | string | Integer): Integer {
        // Must override.
        throw new Error();
    }
    plus(v: number | string | Integer): Integer {
        // Must override.
        throw new Error();
    }
    subtract(v: number | string | Integer): Integer {
        // Must override.
        throw new Error();
    }
    isPositive(): boolean {
        // Must override.
        throw new Error();
    }
    isNegative(): boolean {
        // Must override.
        throw new Error();
    }
    isUnit(): boolean {
        // Must override.
        throw new Error();
    }
    isOdd(): boolean {
        // Must override.
        throw new Error();
    }
    divmod(v: number | string | Integer) {
        var result = divModAny(this, v);
        return {
            quotient: result[0],
            remainder: result[1]
        };
    }
    divide(v: number | string | Integer) {
        return divModAny(this, v)[0];
    }
    over(v: number | string | Integer) {
        return this.divide(v);
    }
    mod(v: number | string | Integer) {
        return divModAny(this, v)[1];
    }
    remainder(v: number | string | Integer) {
        return this.mod(v);
    }
    pow(v: number | string | Integer) {
        const n = parseValue(v);
        const a: number | number[] = this['value'];
        let b: number = n['value'];
        let value: number;
        if (b === 0) return Integer[1];
        if (a === 0) return Integer[0];
        if (a === 1) return Integer[1];
        if (a === -1) return n.isEven() ? Integer[1] : Integer[-1];
        if (n.sign) {
            return Integer[0];
        }
        if (!n.isSmall) throw new Error("The exponent " + n.toString() + " is too large.");
        if (this.isSmall) {
            if (isPrecise(value = Math.pow(<number>a, <number>b)))
                return new SmallInteger(truncate(value));
        }
        let x: Integer = this;
        let y = Integer[1];
        while (true) {
            if ((b & 1) === 1) {
                y = y.times(x);
                --b;
            }
            if (b === 0) break;
            b /= 2;
            x = x.square();
        }
        return y;
    }
    modPow(expIn: number | string | Integer, modIn: number | string | Integer) {
        let exp = parseValue(expIn);
        const mod = parseValue(modIn);
        if (mod.isZero()) throw new Error("Cannot take modPow with modulus 0");
        var r = Integer[1],
            base = this.mod(mod);
        while (exp.isPositive()) {
            if (base.isZero()) return Integer[0];
            if (exp.isOdd()) r = r.multiply(base).mod(mod);
            exp = exp.divide(2);
            base = base.square().mod(mod);
        }
        return r;
    }
    _multiplyBySmall(a: SmallInteger): Integer {
        // Must override.
        throw new Error();
    }
    compare(v: number | string | Integer): number {
        // Must override.
        throw new Error();
    }
    compareAbs(v: number | string | Integer): number {
        // Must override.
        throw new Error();
    }
    equals(v: number | string | Integer): boolean {
        return this.compare(v) === 0;
    }
    eq(v: number | string | Integer): boolean {
        return this.equals(v);
    }
    notEquals(v: number | string | Integer): boolean {
        return this.compare(v) !== 0;
    }
    neq(v: number | string | Integer): boolean {
        return this.notEquals(v);
    }
    greater(v: number | string | Integer): boolean {
        return this.compare(v) > 0;
    }
    gt(v: number | string | Integer): boolean {
        return this.greater(v);
    }
    lesser(v: number | string | Integer) {
        return this.compare(v) < 0;
    }
    lt(v: number | string | Integer) {
        return this.lesser(v);
    }
    greaterOrEquals(v: number | string | Integer) {
        return this.compare(v) >= 0;
    }
    geq(v: number | string | Integer) {
        return this.greaterOrEquals(v);
    }
    lesserOrEquals(v: number | string | Integer) {
        return this.compare(v) <= 0;
    }
    leq(v: number | string | Integer) {
        return this.lesserOrEquals(v);
    }
    isEven(): boolean {
        // Must override.
        throw new Error();
    }
    isDivisibleBy(v: number | string | Integer) {
        const n = parseValue(v);
        const value: number | number[] = n['value'];
        if (value === 0) return false;
        if (value === 1) return true;
        if (value === 2) return this.isEven();
        return this.mod(n).equals(Integer[0]);
    }
    abs(): Integer {
        // Must override.
        throw new Error();
    }
    next(): Integer {
        // Must override.
        throw new Error();
    }
    prev(): Integer {
        // Must override.
        throw new Error();
    }
    times(v: number | string | Integer): Integer {
        // Must override.
        throw new Error();
    }
    square(): Integer {
        // Must override.
        throw new Error();
    }
    isPrime() {
        const isPrime = isBasicPrime(this);
        if (isPrime !== undefined) return isPrime;
        const n = this.abs();
        const nPrev = n.prev();
        const a = [2, 3, 5, 7, 11, 13, 17, 19];
        let b = nPrev;

        while (b.isEven()) b = b.divide(2);
        for (let i = 0; i < a.length; i++) {
            let x = bigInt(a[i]).modPow(b, n);
            if (x.equals(Integer[1]) || x.equals(nPrev)) continue;
            let t: boolean;
            let d: Integer;
            for (t = true, d = b; t && d.lesser(nPrev); d = d.multiply(2)) {
                x = x.square().mod(n);
                if (x.equals(nPrev)) t = false;
            }
            if (t) return false;
        }
        return true;
    }
    minus(v: number | string | Integer): Integer {
        // Must override.
        throw new Error();
    }
    isProbablePrime(iterations?: number) {
        var isPrime = isBasicPrime(this);
        if (isPrime !== undefined) return isPrime;
        var n = this.abs();
        var t = iterations === undefined ? 5 : iterations;
        // use the Fermat primality test
        for (var i = 0; i < t; i++) {
            var a = randBetween(2, n.minus(2));
            if (!a.modPow(n.prev(), n).isUnit()) return false; // definitely composite
        }
        return true; // large chance of being prime
    }
    multiply(v: number | string | Integer): Integer {
        // Must override.
        throw new Error();
    }
    shiftLeft(nIn: number | string): Integer {
        if (!shift_isSmall(nIn)) {
            throw new Error(String(nIn) + " is too large for shifting.");
        }
        let n = +nIn;
        if (n < 0) return this.shiftRight(-n);
        var result: Integer = this;
        while (n >= powers2Length) {
            result = result.multiply(highestPower2);
            n -= powers2Length - 1;
        }
        return result.multiply(powersOfTwo[n]);
    }
    isZero(): boolean {
        // Must override.
        throw new Error();
    }
    shiftRight(nIn: number | string): Integer {
        var remQuo: Integer[];
        if (!shift_isSmall(nIn)) {
            throw new Error(String(nIn) + " is too large for shifting.");
        }
        let n = +nIn;
        if (n < 0) return this.shiftLeft(-n);
        let result: Integer = this;
        while (n >= powers2Length) {
            if (result.isZero()) return result;
            remQuo = divModAny(result, highestPower2);
            result = remQuo[1].isNegative() ? remQuo[0].prev() : remQuo[0];
            n -= powers2Length - 1;
        }
        remQuo = divModAny(result, powersOfTwo[n]);
        return remQuo[1].isNegative() ? remQuo[0].prev() : remQuo[0];
    }
    negate(): Integer {
        // Must override.
        throw new Error();
    }
    not() {
        return this.negate().prev();
    }

    and(n: number | string | Integer) {
        return bitwise(this, n, function (a, b) { return a & b; });
    }

    or(n: number | string | Integer) {
        return bitwise(this, n, function (a, b) { return a | b; });
    }

    xor(n: number | string | Integer) {
        return bitwise(this, n, function (a, b) { return a ^ b; });
    }
    valueOf(): number {
        // Must override.
        throw new Error();
    }
    toJSNumber(): number {
        return this.valueOf();
    }
    toStringEx(radix?: number): string {
        // Must override.
        throw new Error();
    }
    toString(): string {
        return this.toStringEx();
    }
}

class BigInteger extends Integer implements RingOperators<Integer, number | string> {
    value: number[];
    constructor(value: number[], sign: boolean) {
        super(void 0, void 0);
        this.value = value;
        this.sign = sign;
        this.isSmall = false;
    }
    add(v: number | string | Integer): Integer {
        const n = parseValue(v);
        if (this.sign !== n.sign) {
            return this.subtract(n.negate());
        }
        const a = this.value;
        if (n.isSmall) {
            const b = (<SmallInteger>n).value;
            return new BigInteger(addSmall(a, Math.abs(b)), this.sign);
        }
        else {
            const b = (<BigInteger>n).value;
            return new BigInteger(addAny(a, b), this.sign);
        }
    }
    plus(v: number | string | Integer) {
        return this.add(v);
    }
    __add__(rhs: number | string | Integer): Integer {
        return this.add(rhs);
    }
    __radd__(lhs: number | string | Integer): Integer {
        const n = parseValue(lhs);
        return n.add(this);
    }
    subtract(v: number | string | Integer): Integer {
        const n = parseValue(v);
        if (this.sign !== n.sign) {
            return this.add(n.negate());
        }
        const a = this.value;
        if (n.isSmall) {
            const b = (<SmallInteger>n).value;
            return subtractSmall(a, Math.abs(b), this.sign);
        }
        else {
            const b = (<BigInteger>n).value;
            return subtractAny(a, b, this.sign);
        }
    }
    minus(v: number | string | Integer) {
        return this.subtract(v);
    }
    __sub__(rhs: number | string | Integer): Integer {
        return this.subtract(rhs);
    }
    __rsub__(lhs: number | string | Integer): Integer {
        const n = parseValue(lhs);
        return n.subtract(this);
    }
    negate() {
        return new BigInteger(this.value, !this.sign);
    }
    neg() {
        return new BigInteger(this.value, !this.sign);
    }
    __neg__() {
        return this.negate();
    }
    __pos__() {
        return this;
    }
    abs() {
        return new BigInteger(this.value, false);
    }
    inv(): Integer {
        throw new Error("inv() is not supported for BigInteger");
    }
    multiply(v: number | string | Integer): BigInteger {
        const n = parseValue(v);
        const a = this.value;
        const sign = this.sign !== n.sign;
        let rhs: number[];
        if (n.isSmall) {
            const b = (<SmallInteger>n).value;
            if (b === 0) return Integer[0];
            if (b === 1) return this;
            if (b === -1) return this.negate();
            const abs = Math.abs(b);
            if (abs < BASE) {
                return new BigInteger(multiplySmall(a, abs), sign);
            }
            rhs = smallToArray(abs);
        }
        else {
            rhs = (<BigInteger>n).value;
        }
        if (useKaratsuba(a.length, rhs.length)) // Karatsuba is only faster for certain array sizes
            return new BigInteger(multiplyKaratsuba(a, rhs), sign);
        return new BigInteger(multiplyLong(a, rhs), sign);
    }
    times(v: number | string | Integer): BigInteger {
        return this.multiply(v);
    }
    __mul__(rhs: number | string | Integer): Integer {
        return this.multiply(rhs);
    }
    __rmul__(lhs: number | string | Integer): Integer {
        const n = parseValue(lhs);
        return n.multiply(this);
    }
    _multiplyBySmall(a: SmallInteger): Integer {
        if (a.value === 0) return Integer[0];
        if (a.value === 1) return this;
        if (a.value === -1) return this.negate();
        return multiplySmallAndArray(Math.abs(a.value), this.value, this.sign !== a.sign);
    }
    square() {
        return new BigInteger(square(this.value), false);
    }
    compareAbs(v: number | string | Integer): number {
        const n = parseValue(v);
        const a = this.value;
        if (n.isSmall) {
            return 1;
        }
        else {
            const b = (<BigInteger>n).value;
            return compareAbs(a, b);
        }
    }
    compare(v: number | string | Integer): number {
        // See discussion about comparison with Infinity:
        // https://github.com/peterolson/BigInteger.js/issues/61
        if (v === Infinity) {
            return -1;
        }
        if (v === -Infinity) {
            return 1;
        }

        const n = parseValue(v);
        const a = this.value;
        if (this.sign !== n.sign) {
            return n.sign ? 1 : -1;
        }
        if (n.isSmall) {
            return this.sign ? -1 : 1;
        }
        else {
            const b = (<BigInteger>n).value;
            return compareAbs(a, b) * (this.sign ? -1 : 1);
        }
    }
    compareTo(v: number | string | Integer) {
        return this.compare(v);
    }
    isEven() {
        return (this.value[0] & 1) === 0;
    }
    isOdd() {
        return (this.value[0] & 1) === 1;
    }

    isPositive() {
        return !this.sign;
    }

    isNegative() {
        return this.sign;
    }

    isOne() {
        return false;
    }

    isUnit() {
        return false;
    }

    isZero() {
        return false;
    }

    next(): Integer {
        var value = this.value;
        if (this.sign) {
            return subtractSmall(value, 1, this.sign);
        }
        return new BigInteger(addSmall(value, 1), this.sign);
    }
    prev(): Integer {
        var value = this.value;
        if (this.sign) {
            return new BigInteger(addSmall(value, 1), true);
        }
        return subtractSmall(value, 1, this.sign);
    }
    toStringEx(radix?: number): string {
        if (radix === undefined) radix = 10;
        if (radix !== 10) return toBase(this, radix);
        const v = this.value;
        let l = v.length;
        let str = String(v[--l]);
        const zeros = "0000000";
        while (--l >= 0) {
            const digit = String(v[l]);
            str += zeros.slice(digit.length) + digit;
        }
        const sign = this.sign ? "-" : "";
        return sign + str;
    }
    valueOf(): number {
        return +this.toStringEx();
    }
}

class SmallInteger extends Integer implements RingOperators<Integer, number | string> {
    value: number;
    constructor(value: number) {
        super(void 0, void 0);
        this.value = value;
        this.sign = value < 0;
        this.isSmall = true;
    }
    add(v: number | string | Integer): Integer {
        const n = parseValue(v);
        const a = this.value;
        if (a < 0 !== n.sign) {
            return this.subtract(n.negate());
        }
        let rhs: number[];
        if (n.isSmall) {
            const b = (<SmallInteger>n).value;
            if (isPrecise(a + b)) return new SmallInteger(a + b);
            rhs = smallToArray(Math.abs(b));
        }
        else {
            rhs = (<BigInteger>n).value;
        }
        return new BigInteger(addSmall(rhs, Math.abs(a)), a < 0);
    }
    plus(v: number | string | Integer) {
        return this.add(v);
    }
    __add__(rhs: number | string | Integer): Integer {
        return this.add(rhs);
    }
    __radd__(lhs: number | string | Integer): Integer {
        const n = parseValue(lhs);
        return n.add(this);
    }
    subtract(v: number | string | Integer): Integer {
        const n = parseValue(v);
        const a = this.value;
        if (a < 0 !== n.sign) {
            return this.add(n.negate());
        }
        if (n.isSmall) {
            const b = (<SmallInteger>n).value;
            return new SmallInteger(a - b);
        }
        else {
            const b = (<BigInteger>n).value;
            return subtractSmall(b, Math.abs(a), a >= 0);
        }
    }
    minus(v: number | string | Integer) {
        return this.subtract(v);
    }
    __sub__(rhs: number | string | Integer): Integer {
        return this.subtract(rhs);
    }
    __rsub__(lhs: number | string | Integer): Integer {
        const n = parseValue(lhs);
        return n.subtract(this);
    }
    negate() {
        var sign = this.sign;
        var small = new SmallInteger(-this.value);
        small.sign = !sign;
        return small;
    }
    neg() {
        return this.negate();
    }
    __neg__() {
        return this.negate();
    }
    __pos__() {
        return this;
    }
    abs() {
        return new SmallInteger(Math.abs(this.value));
    }
    inv(): Integer {
        throw new Error("inv() is not supported");
    }
    _multiplyBySmall(a: SmallInteger): Integer {
        if (isPrecise(a.value * this.value)) {
            return new SmallInteger(a.value * this.value);
        }
        return multiplySmallAndArray(Math.abs(a.value), smallToArray(Math.abs(this.value)), this.sign !== a.sign);
    }
    multiply(v: number | string | Integer) {
        return parseValue(v)._multiplyBySmall(this);
    }
    times(v: number | string | Integer) {
        return this.multiply(v);
    }
    __mul__(rhs: number | string | Integer): Integer {
        return this.multiply(rhs);
    }
    __rmul__(lhs: number | string | Integer): Integer {
        const n = parseValue(lhs);
        return n.multiply(this);
    }
    square(): Integer {
        var value = this.value * this.value;
        if (isPrecise(value)) return new SmallInteger(value);
        return new BigInteger(square(smallToArray(Math.abs(this.value))), false);
    }
    compareAbs(v: number | string | Integer): number {
        const n = parseValue(v);
        const a = Math.abs(this.value);
        if (n.isSmall) {
            const value = (<SmallInteger>n).value;
            const b = Math.abs(value);
            return a === b ? 0 : a > b ? 1 : -1;
        }
        return -1;
    }
    compare(v: number | string | Integer): number {
        if (v === Infinity) {
            return -1;
        }
        if (v === -Infinity) {
            return 1;
        }

        const n = parseValue(v);
        const a = this.value;
        if (n.isSmall) {
            const b = (<SmallInteger>n).value;
            return a === b ? 0 : a > b ? 1 : -1;
        }
        if (a < 0 !== n.sign) {
            return a < 0 ? -1 : 1;
        }
        return a < 0 ? 1 : -1;
    }
    compareTo(v: number | string | Integer) {
        return this.compare(v);
    }
    isEven(): boolean {
        return (this.value & 1) === 0;
    }
    isOdd(): boolean {
        return (this.value & 1) === 1;
    }
    isPositive(): boolean {
        return this.value > 0;
    }
    isNegative(): boolean {
        return this.value < 0;
    }
    isOne(): boolean {
        return this.isUnit();
    }
    isUnit(): boolean {
        return Math.abs(this.value) === 1;
    }
    isZero(): boolean {
        return this.value === 0;
    }
    next(): Integer {
        var value = this.value;
        if (value + 1 < MAX_INT) return new SmallInteger(value + 1);
        return new BigInteger(MAX_INT_ARR, false);
    }
    prev(): Integer {
        var value = this.value;
        if (value - 1 > -MAX_INT) return new SmallInteger(value - 1);
        return new BigInteger(MAX_INT_ARR, true);
    }
    toStringEx(radix?: number): string {
        if (radix === undefined) radix = 10;
        if (radix !== 10) return toBase(this, radix);
        return String(this.value);
    }
    valueOf(): number {
        return this.value;
    }
}

function isPrecise(n: number) {
    return -MAX_INT < n && n < MAX_INT;
}

function smallToArray(n: number): number[] { // For performance reasons doesn't reference BASE, need to change this function if BASE changes
    if (n < 1e7)
        return [n];
    if (n < 1e14)
        return [n % 1e7, Math.floor(n / 1e7)];
    return [n % 1e7, Math.floor(n / 1e7) % 1e7, Math.floor(n / 1e14)];
}

function arrayToSmall(arr: number[]): number | number[] { // If BASE changes this function may need to change
    trim(arr);
    var length = arr.length;
    if (length < 4 && compareAbs(arr, MAX_INT_ARR) < 0) {
        switch (length) {
            case 0: return 0;
            case 1: return arr[0];
            case 2: return arr[0] + arr[1] * BASE;
            default: return arr[0] + (arr[1] + arr[2] * BASE) * BASE;
        }
    }
    return arr;
}

function trim(v: number[]): void {
    let i = v.length;
    while (v[--i] === 0);
    v.length = i + 1;
}

function createArray(length: number): number[] { // function shamelessly stolen from Yaffle's library https://github.com/Yaffle/BigInteger
    const x: number[] = new Array(length);
    var i = -1;
    while (++i < length) {
        x[i] = 0;
    }
    return x;
}

function truncate(n: number): number {
    if (n > 0) return Math.floor(n);
    return Math.ceil(n);
}

function add(a: number[], b: number[]) { // assumes a and b are arrays with a.length >= b.length
    const l_a = a.length;
    const l_b = b.length;
    const r = new Array<number>(l_a);
    let carry = 0;
    const base = BASE;
    let sum: number;
    let i: number;
    for (i = 0; i < l_b; i++) {
        sum = a[i] + b[i] + carry;
        carry = sum >= base ? 1 : 0;
        r[i] = sum - carry * base;
    }
    while (i < l_a) {
        sum = a[i] + carry;
        carry = sum === base ? 1 : 0;
        r[i++] = sum - carry * base;
    }
    if (carry > 0) r.push(carry);
    return r;
}

function addAny(a: number[], b: number[]) {
    if (a.length >= b.length) return add(a, b);
    return add(b, a);
}

function addSmall(a: number[], carry: number): number[] { // assumes a is array, carry is number with 0 <= carry < MAX_INT
    const l = a.length;
    const r = new Array<number>(l);
    const base = BASE;
    let i: number;
    for (i = 0; i < l; i++) {
        const sum = a[i] - base + carry;
        carry = Math.floor(sum / base);
        r[i] = sum - carry * base;
        carry += 1;
    }
    while (carry > 0) {
        r[i++] = carry % base;
        carry = Math.floor(carry / base);
    }
    return r;
}

function subtract(a: number[], b: number[]) { // assumes a and b are arrays with a >= b
    const a_l = a.length;
    const b_l = b.length;
    const r = new Array<number>(a_l);
    let borrow = 0;
    const base = BASE;
    let i: number;
    let difference: number;
    for (i = 0; i < b_l; i++) {
        difference = a[i] - borrow - b[i];
        if (difference < 0) {
            difference += base;
            borrow = 1;
        } else borrow = 0;
        r[i] = difference;
    }
    for (i = b_l; i < a_l; i++) {
        difference = a[i] - borrow;
        if (difference < 0) difference += base;
        else {
            r[i++] = difference;
            break;
        }
        r[i] = difference;
    }
    for (; i < a_l; i++) {
        r[i] = a[i];
    }
    trim(r);
    return r;
}

function subtractAny(a: number[], b: number[], sign: boolean): Integer {
    let diff: number[];
    if (compareAbs(a, b) >= 0) {
        diff = subtract(a, b);
    } else {
        diff = subtract(b, a);
        sign = !sign;
    }
    let value = arrayToSmall(diff);
    if (typeof value === "number") {
        if (sign) value = -value;
        return new SmallInteger(<number>value);
    }
    else {
        return new BigInteger(<number[]>value, sign);
    }
}

function subtractSmall(a: number[], b: number, sign: boolean): Integer { // assumes a is array, b is number with 0 <= b < MAX_INT
    const l = a.length;
    const r0 = new Array<number>(l);
    let carry = -b;
    const base = BASE;
    for (let i = 0; i < l; i++) {
        let difference = a[i] + carry;
        carry = Math.floor(difference / base);
        difference %= base;
        r0[i] = difference < 0 ? difference + base : difference;
    }
    let r = arrayToSmall(r0);
    if (typeof r === "number") {
        if (sign) {
            r = -r;
        }
        return new SmallInteger(<number>r);
    }
    else {
        return new BigInteger(<number[]>r, sign);
    }
}

function multiplyLong(a: number[], b: number[]): number[] {
    const a_l = a.length;
    const b_l = b.length;
    const l = a_l + b_l;
    const r = createArray(l);
    const base = BASE;
    for (let i = 0; i < a_l; ++i) {
        const a_i = a[i];
        for (var j = 0; j < b_l; ++j) {
            const b_j = b[j];
            const product = a_i * b_j + r[i + j];
            const carry = Math.floor(product / base);
            r[i + j] = product - carry * base;
            r[i + j + 1] += carry;
        }
    }
    trim(r);
    return r;
}

function multiplySmall(a: number[], b: number): number[] { // assumes a is array, b is number with |b| < BASE
    const l = a.length;
    const r = new Array<number>(l);
    const base = BASE;
    let carry = 0;
    let i: number;
    for (i = 0; i < l; i++) {
        const product = a[i] * b + carry;
        carry = Math.floor(product / base);
        r[i] = product - carry * base;
    }
    while (carry > 0) {
        r[i++] = carry % base;
        carry = Math.floor(carry / base);
    }
    return r;
}

function shiftLeft(x: number[], n: number): number[] {
    const r: number[] = [];
    while (n-- > 0) r.push(0);
    return r.concat(x);
}

function multiplyKaratsuba(x: number[], y: number[]) {
    var n = Math.max(x.length, y.length);

    if (n <= 30) return multiplyLong(x, y);
    n = Math.ceil(n / 2);

    var b = x.slice(n),
        a = x.slice(0, n),
        d = y.slice(n),
        c = y.slice(0, n);

    var ac = multiplyKaratsuba(a, c),
        bd = multiplyKaratsuba(b, d),
        abcd = multiplyKaratsuba(addAny(a, b), addAny(c, d));

    const product: number[] = addAny(addAny(ac, shiftLeft(subtract(subtract(abcd, ac), bd), n)), shiftLeft(bd, 2 * n));
    trim(product);
    return product;
}

// The following function is derived from a surface fit of a graph plotting the performance difference
// between long multiplication and karatsuba multiplication versus the lengths of the two arrays.
function useKaratsuba(l1: number, l2: number): boolean {
    return -0.012 * l1 - 0.012 * l2 + 0.000015 * l1 * l2 > 0;
}

function multiplySmallAndArray(a: number, b: number[], sign: boolean) { // a >= 0
    if (a < BASE) {
        return new BigInteger(multiplySmall(b, a), sign);
    }
    return new BigInteger(multiplyLong(b, smallToArray(a)), sign);
}

function square(a: number[]) {
    const l = a.length;
    const r = createArray(l + l);
    const base = BASE;
    for (let i = 0; i < l; i++) {
        const a_i = a[i];
        for (var j = 0; j < l; j++) {
            const a_j = a[j];
            const product = a_i * a_j + r[i + j];
            const carry = Math.floor(product / base);
            r[i + j] = product - carry * base;
            r[i + j + 1] += carry;
        }
    }
    trim(r);
    return r;
}

function divMod1(a: number[], b: number[]) { // Left over from previous version. Performs faster than divMod2 on smaller input sizes.
    const a_l = a.length;
    const b_l = b.length;
    const base = BASE;
    const result = createArray(b.length);
    let divisorMostSignificantDigit = b[b_l - 1];
    // normalization
    const lambda = Math.ceil(base / (2 * divisorMostSignificantDigit));
    let remainder = multiplySmall(a, lambda);
    const divisor = multiplySmall(b, lambda);
    let quotientDigit: number;
    let shift: number;
    if (remainder.length <= a_l) remainder.push(0);
    divisor.push(0);
    divisorMostSignificantDigit = divisor[b_l - 1];
    for (shift = a_l - b_l; shift >= 0; shift--) {
        quotientDigit = base - 1;
        if (remainder[shift + b_l] !== divisorMostSignificantDigit) {
            quotientDigit = Math.floor((remainder[shift + b_l] * base + remainder[shift + b_l - 1]) / divisorMostSignificantDigit);
        }
        // quotientDigit <= base - 1
        let carry = 0;
        let borrow = 0;
        let l = divisor.length;
        for (let i = 0; i < l; i++) {
            carry += quotientDigit * divisor[i];
            const q = Math.floor(carry / base);
            borrow += remainder[shift + i] - (carry - q * base);
            carry = q;
            if (borrow < 0) {
                remainder[shift + i] = borrow + base;
                borrow = -1;
            } else {
                remainder[shift + i] = borrow;
                borrow = 0;
            }
        }
        while (borrow !== 0) {
            quotientDigit -= 1;
            carry = 0;
            for (let i = 0; i < l; i++) {
                carry += remainder[shift + i] - base + divisor[i];
                if (carry < 0) {
                    remainder[shift + i] = carry + base;
                    carry = 0;
                } else {
                    remainder[shift + i] = carry;
                    carry = 1;
                }
            }
            borrow += carry;
        }
        result[shift] = quotientDigit;
    }
    // denormalization
    remainder = <number[]>divModSmall(remainder, lambda)[0];
    return [arrayToSmall(result), arrayToSmall(remainder)];
}

function divMod2(a: number[], b: number[]) { // Implementation idea shamelessly stolen from Silent Matt's library http://silentmatt.com/biginteger/
    // Performs faster than divMod1 on larger input sizes.
    let a_l = a.length;
    const b_l = b.length;
    const result: number[] = [];
    let part: number[] = [];
    const base = BASE;
    while (a_l) {
        part.unshift(a[--a_l]);
        if (compareAbs(part, b) < 0) {
            result.push(0);
            continue;
        }
        const xlen = part.length;
        let highx = part[xlen - 1] * base + part[xlen - 2];
        const highy = b[b_l - 1] * base + b[b_l - 2];
        if (xlen > b_l) {
            highx = (highx + 1) * base;
        }
        let guess = Math.ceil(highx / highy);
        let check: number[];
        do {
            check = multiplySmall(b, guess);
            if (compareAbs(check, part) <= 0) break;
            guess--;
        } while (guess);
        result.push(guess);
        part = subtract(part, check);
    }
    result.reverse();
    return [arrayToSmall(result), arrayToSmall(part)];
}

function divModSmall(value: number[], lambda: number) {
    const length = value.length;
    const quotient = createArray(length);
    const base = BASE;
    let remainder = 0;
    for (let i = length - 1; i >= 0; --i) {
        const divisor = remainder * base + value[i];
        const q = truncate(divisor / lambda);
        remainder = divisor - q * lambda;
        quotient[i] = q | 0;
    }
    return [quotient, remainder | 0];
}

function divModAny(self: Integer, v: number | string | Integer): Integer[] {
    let value: (number[] | number)[];
    const n = parseValue(v);
    const a: number | number[] = self['value'];
    let b: number | number[] = n['value'];
    var quotient: number | number[];
    if (b === 0) throw new Error("Cannot divide by zero");
    if (self.isSmall) {
        if (n.isSmall) {
            return [new SmallInteger(truncate(<number>a / <number>b)), new SmallInteger(<number>a % <number>b)];
        }
        return [Integer[0], self];
    }
    if (n.isSmall) {
        if (b === +1) return [self, Integer[0]];
        if (b === -1) return [self.negate(), Integer[0]];
        var abs = Math.abs(<number>b);
        if (abs < BASE) {
            value = divModSmall(<number[]>a, abs);
            quotient = arrayToSmall(<number[]>value[0]);
            var remainder = value[1];
            if (self.sign) remainder = -remainder;
            if (typeof quotient === "number") {
                if (self.sign !== n.sign) quotient = -quotient;
                return [new SmallInteger(<number>quotient), new SmallInteger(<number>remainder)];
            }
            return [new BigInteger(<number[]>quotient, self.sign !== n.sign), new SmallInteger(<number>remainder)];
        }
        b = smallToArray(abs);
    }
    const lhs = <number[]>a;
    const rhs = <number[]>b;
    var comparison = compareAbs(lhs, rhs);
    if (comparison === -1) return [Integer[0], self];
    if (comparison === 0) return [Integer[self.sign === n.sign ? 1 : -1], Integer[0]];

    // divMod1 is faster on smaller input sizes
    if (lhs.length + rhs.length <= 200) {
        value = divMod1(lhs, rhs);
    }
    else {
        value = divMod2(lhs, rhs);
    }

    quotient = value[0];
    var qSign = self.sign !== n.sign,
        mod = value[1],
        mSign = self.sign;
    let quotientInteger: Integer;
    if (typeof quotient === "number") {
        if (qSign) quotient = -quotient;
        quotientInteger = new SmallInteger(<number>quotient);
    }
    else {
        quotientInteger = new BigInteger(<number[]>quotient, qSign);
    }
    if (typeof mod === "number") {
        if (mSign) mod = -mod;
        return [quotientInteger, new SmallInteger(<number>mod)];
    }
    else {
        return [quotientInteger, new BigInteger(<number[]>mod, mSign)];
    }
}

function compareAbs(a: number[], b: number[]): number {
    if (a.length !== b.length) {
        return a.length > b.length ? 1 : -1;
    }
    for (var i = a.length - 1; i >= 0; i--) {
        if (a[i] !== b[i]) return a[i] > b[i] ? 1 : -1;
    }
    return 0;
}

function isBasicPrime(v: Integer): boolean {
    const n = v.abs();
    if (n.isUnit()) return false;
    if (n.equals(2) || n.equals(3) || n.equals(5)) return true;
    if (n.isEven() || n.isDivisibleBy(3) || n.isDivisibleBy(5)) return false;
    if (n.lesser(25)) return true;
    // we don't know if it's prime: let the other functions figure it out?
    return void 0;
}

function shift_isSmall(n: number | string | BigInteger) {
    return ((typeof n === "number" || typeof n === "string") && +Math.abs(<number>n) <= BASE) ||
        (n instanceof BigInteger && n.value.length <= 1);
}

function bitwise(x: Integer, yIn: number | string | Integer, fn: (a: number, b: number) => number): Integer {
    const y = parseValue(yIn);
    var xSign = x.isNegative(), ySign = y.isNegative();
    var xRem = xSign ? x.not() : x,
        yRem = ySign ? y.not() : y;
    const xBits: number[] = [];
    const yBits: number[] = [];
    let xStop = false;
    let yStop = false;
    while (!xStop || !yStop) {
        if (xRem.isZero()) { // virtual sign extension for simulating two's complement
            xStop = true;
            xBits.push(xSign ? 1 : 0);
        }
        else if (xSign) xBits.push(xRem.isEven() ? 1 : 0); // two's complement for negative numbers
        else xBits.push(xRem.isEven() ? 0 : 1);

        if (yRem.isZero()) {
            yStop = true;
            yBits.push(ySign ? 1 : 0);
        }
        else if (ySign) yBits.push(yRem.isEven() ? 1 : 0);
        else yBits.push(yRem.isEven() ? 0 : 1);

        xRem = xRem.over(2);
        yRem = yRem.over(2);
    }
    const result: number[] = [];
    for (let i = 0; i < xBits.length; i++) result.push(fn(xBits[i], yBits[i]));
    let sum = bigInt(result.pop()).negate().times(bigInt(2).pow(result.length));
    while (result.length) {
        sum = sum.add(bigInt(result.pop()).times(bigInt(2).pow(result.length)));
    }
    return sum;
}

var LOBMASK_I = 1 << 30, LOBMASK_BI = (BASE & -BASE) * (BASE & -BASE) | LOBMASK_I;
function roughLOB(n: Integer): number { // get lowestOneBit (rough)
    // SmallInteger: return Min(lowestOneBit(n), 1 << 30)
    // BigInteger: return Min(lowestOneBit(n), 1 << 14) [BASE=1e7]
    const v: number | number[] = n['value'];
    const x = typeof v === "number" ? v | LOBMASK_I : v[0] + v[1] * BASE | LOBMASK_BI;
    return x & -x;
}

export function max(aIn: number | string | Integer, bIn: number | string | Integer) {
    const a = parseValue(aIn);
    const b = parseValue(bIn);
    return a.greater(b) ? a : b;
}
export function min(aIn: number | string | Integer, bIn: number | string | Integer) {
    const a = parseValue(aIn);
    const b = parseValue(bIn);
    return a.lesser(b) ? a : b;
}
export function gcd(aIn: number | string | Integer, bIn: number | string | Integer) {
    let a = parseValue(aIn).abs();
    let b = parseValue(bIn).abs();
    if (a.equals(b)) return a;
    if (a.isZero()) return b;
    if (b.isZero()) return a;
    let c = Integer[1];
    while (a.isEven() && b.isEven()) {
        const d = Math.min(roughLOB(a), roughLOB(b));
        a = a.divide(d);
        b = b.divide(d);
        c = c.multiply(d);
    }
    while (a.isEven()) {
        a = a.divide(roughLOB(a));
    }
    do {
        while (b.isEven()) {
            b = b.divide(roughLOB(b));
        }
        if (a.greater(b)) {
            let t = b; b = a; a = t;
        }
        b = b.subtract(a);
    } while (!b.isZero());
    return c.isUnit() ? a : a.multiply(c);
}
export function lcm(aIn: number | string | Integer, bIn: number | string | Integer) {
    const a = parseValue(aIn).abs();
    const b = parseValue(bIn).abs();
    return a.divide(gcd(a, b)).multiply(b);
}
export function randBetween(a: number | string | Integer, b: number | string | Integer) {
    if (typeof a === 'undefined') {
        throw new Error("a must be number | string | Integer");
    }
    if (typeof b === 'undefined') {
        throw new Error("b must be number | string | Integer");
    }
    a = parseValue(a);
    b = parseValue(b);
    var low = min(a, b), high = max(a, b);
    var range = high.subtract(low);
    if (range.isSmall) {
        return low.add(Math.round(Math.random() * range.valueOf()));
    }
    var length = (<BigInteger>range).value.length - 1;
    const temp: number[] = [];
    let restricted = true;
    for (var i = length; i >= 0; i--) {
        var top = restricted ? (<BigInteger>range).value[i] : BASE;
        var digit = truncate(Math.random() * top);
        temp.unshift(digit);
        if (digit < top) restricted = false;
    }
    const result = arrayToSmall(temp);
    return low.add(typeof result === "number" ? new SmallInteger(result) : new BigInteger(result, false));
}

function stringify(digit: Integer): string {
    let digitValue: number | number[] = digit['value'];
    let value: number[];
    if (typeof digitValue === "number") {
        value = [digitValue];
    }
    else {
        value = digitValue;
    }
    if (value.length === 1 && value[0] <= 35) {
        return "0123456789abcdefghijklmnopqrstuvwxyz".charAt(value[0]);
    }
    return "<" + value + ">";
}
function toBase(n: Integer, baseIn: number | Integer) {
    const base = bigInt(baseIn);
    if (base.isZero()) {
        if (n.isZero()) return "0";
        throw new Error("Cannot convert nonzero numbers to base 0.");
    }
    if (base.equals(-1)) {
        if (n.isZero()) return "0";
        if (n.isNegative()) return new Array(1 - n.valueOf()).join("10");
        return "1" + new Array(+n).join("01");
    }
    var minusSign = "";
    if (n.isNegative() && base.isPositive()) {
        minusSign = "-";
        n = n.abs();
    }
    if (base.equals(1)) {
        if (n.isZero()) return "0";
        // FIXME: join argument was 1 but it needs to be a string.
        return minusSign + new Array(+n + 1).join("" + 1);
    }
    const out: string[] = [];
    let left = n;
    while (left.isNegative() || left.compareAbs(base) >= 0) {
        const divmod = left.divmod(base);
        left = divmod.quotient;
        var digit = divmod.remainder;
        if (digit.isNegative()) {
            digit = base.minus(digit).abs();
            left = left.next();
        }
        out.push(stringify(digit));
    }
    out.push(stringify(left));
    return minusSign + out.reverse().join("");
}

function parseStringValue(v: string): Integer {
    if (isPrecise(+v)) {
        var x = +v;
        if (x === truncate(x))
            return new SmallInteger(x);
        throw "Invalid integer: " + v;
    }
    var sign = v[0] === "-";
    if (sign) v = v.slice(1);
    var split = v.split(/e/i);
    if (split.length > 2) throw new Error("Invalid integer: " + split.join("e"));
    if (split.length === 2) {
        var exp: any = split[1];
        if (exp[0] === "+") exp = exp.slice(1);
        exp = +exp;
        if (exp !== truncate(exp) || !isPrecise(exp)) throw new Error("Invalid integer: " + exp + " is not a valid exponent.");
        var text = split[0];
        var decimalPlace = text.indexOf(".");
        if (decimalPlace >= 0) {
            exp -= text.length - decimalPlace - 1;
            text = text.slice(0, decimalPlace) + text.slice(decimalPlace + 1);
        }
        if (exp < 0) throw new Error("Cannot include negative exponent part for integers");
        text += (new Array(exp + 1)).join("0");
        v = text;
    }
    const isValid = /^([0-9][0-9]*)$/.test(v);
    if (!isValid) throw new Error("Invalid integer: " + v);
    const r: number[] = [];
    let max = v.length;
    const l = LOG_BASE;
    let min = max - l;
    while (max > 0) {
        r.push(+v.slice(min, max));
        min -= l;
        if (min < 0) min = 0;
        max -= l;
    }
    trim(r);
    return new BigInteger(r, sign);
}

function parseNumberValue(v: number): Integer {
    if (isPrecise(v)) {
        if (v !== truncate(v)) throw new Error(v + " is not an integer.");
        return new SmallInteger(v);
    }
    return parseStringValue(v.toString());
}

function parseValue(v: number | string | Integer): Integer {
    if (typeof v === "number") {
        return parseNumberValue(v);
    }
    else if (typeof v === "string") {
        return parseStringValue(v);
    }
    else if (v instanceof Integer) {
        return v;
    }
    throw new Error(`v must be a number or a string or Integer: Found ${typeof v}`);
    // return v;
}
// Pre-define numbers in range [-999,999]
for (var i = 0; i < 1000; i++) {
    Integer[i] = new SmallInteger(i);
    if (i > 0) Integer[-i] = new SmallInteger(-i);
}
// Backwards compatibility
export const one = Integer[1];
export const zero = Integer[0];
export const minusOne = Integer[-1];
// Integer.max = max;
// Integer.min = min;
// Integer.gcd = gcd;
// Integer.lcm = lcm;
export function isInstance(x: any) { return x instanceof BigInteger || x instanceof SmallInteger; }
// Integer.randBetween = randBetween;
// return Integer;

export default function bigInt(v?: number | string | Integer, radix?: number | string | Integer) {
    return new Integer(v, radix);
}
