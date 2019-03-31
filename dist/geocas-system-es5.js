System.register("geocas/math/BigInteger.js", [], function (exports_1, context_1) {
    "use strict";

    var __extends = this && this.__extends || function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
                d.__proto__ = b;
            } || function (d, b) {
                for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
            };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    var BASE, LOG_BASE, MAX_INT, MAX_INT_ARR, LOG_MAX_INT, parseBase, powersOfTwo, powers2Length, highestPower2, Integer, BigInteger, SmallInteger, LOBMASK_I, LOBMASK_BI, i, one, zero, minusOne;
    var __moduleName = context_1 && context_1.id;
    function isPrecise(n) {
        return -MAX_INT < n && n < MAX_INT;
    }
    function smallToArray(n) {
        if (n < 1e7) return [n];
        if (n < 1e14) return [n % 1e7, Math.floor(n / 1e7)];
        return [n % 1e7, Math.floor(n / 1e7) % 1e7, Math.floor(n / 1e14)];
    }
    function arrayToSmall(arr) {
        trim(arr);
        var length = arr.length;
        if (length < 4 && compareAbs(arr, MAX_INT_ARR) < 0) {
            switch (length) {
                case 0:
                    return 0;
                case 1:
                    return arr[0];
                case 2:
                    return arr[0] + arr[1] * BASE;
                default:
                    return arr[0] + (arr[1] + arr[2] * BASE) * BASE;
            }
        }
        return arr;
    }
    function trim(v) {
        var i = v.length;
        while (v[--i] === 0);
        v.length = i + 1;
    }
    function createArray(length) {
        var x = new Array(length);
        var i = -1;
        while (++i < length) {
            x[i] = 0;
        }
        return x;
    }
    function truncate(n) {
        if (n > 0) return Math.floor(n);
        return Math.ceil(n);
    }
    function add(a, b) {
        var l_a = a.length;
        var l_b = b.length;
        var r = new Array(l_a);
        var carry = 0;
        var base = BASE;
        var sum;
        var i;
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
    function addAny(a, b) {
        if (a.length >= b.length) return add(a, b);
        return add(b, a);
    }
    function addSmall(a, carry) {
        var l = a.length;
        var r = new Array(l);
        var base = BASE;
        var i;
        for (i = 0; i < l; i++) {
            var sum = a[i] - base + carry;
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
    function subtract(a, b) {
        var a_l = a.length;
        var b_l = b.length;
        var r = new Array(a_l);
        var borrow = 0;
        var base = BASE;
        var i;
        var difference;
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
            if (difference < 0) difference += base;else {
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
    function subtractAny(a, b, sign) {
        var diff;
        if (compareAbs(a, b) >= 0) {
            diff = subtract(a, b);
        } else {
            diff = subtract(b, a);
            sign = !sign;
        }
        var value = arrayToSmall(diff);
        if (typeof value === "number") {
            if (sign) value = -value;
            return new SmallInteger(value);
        } else {
            return new BigInteger(value, sign);
        }
    }
    function subtractSmall(a, b, sign) {
        var l = a.length;
        var r0 = new Array(l);
        var carry = -b;
        var base = BASE;
        for (var i_1 = 0; i_1 < l; i_1++) {
            var difference = a[i_1] + carry;
            carry = Math.floor(difference / base);
            difference %= base;
            r0[i_1] = difference < 0 ? difference + base : difference;
        }
        var r = arrayToSmall(r0);
        if (typeof r === "number") {
            if (sign) {
                r = -r;
            }
            return new SmallInteger(r);
        } else {
            return new BigInteger(r, sign);
        }
    }
    function multiplyLong(a, b) {
        var a_l = a.length;
        var b_l = b.length;
        var l = a_l + b_l;
        var r = createArray(l);
        var base = BASE;
        for (var i_2 = 0; i_2 < a_l; ++i_2) {
            var a_i = a[i_2];
            for (var j = 0; j < b_l; ++j) {
                var b_j = b[j];
                var product = a_i * b_j + r[i_2 + j];
                var carry = Math.floor(product / base);
                r[i_2 + j] = product - carry * base;
                r[i_2 + j + 1] += carry;
            }
        }
        trim(r);
        return r;
    }
    function multiplySmall(a, b) {
        var l = a.length;
        var r = new Array(l);
        var base = BASE;
        var carry = 0;
        var i;
        for (i = 0; i < l; i++) {
            var product = a[i] * b + carry;
            carry = Math.floor(product / base);
            r[i] = product - carry * base;
        }
        while (carry > 0) {
            r[i++] = carry % base;
            carry = Math.floor(carry / base);
        }
        return r;
    }
    function shiftLeft(x, n) {
        var r = [];
        while (n-- > 0) r.push(0);
        return r.concat(x);
    }
    function multiplyKaratsuba(x, y) {
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
        var product = addAny(addAny(ac, shiftLeft(subtract(subtract(abcd, ac), bd), n)), shiftLeft(bd, 2 * n));
        trim(product);
        return product;
    }
    function useKaratsuba(l1, l2) {
        return -0.012 * l1 - 0.012 * l2 + 0.000015 * l1 * l2 > 0;
    }
    function multiplySmallAndArray(a, b, sign) {
        if (a < BASE) {
            return new BigInteger(multiplySmall(b, a), sign);
        }
        return new BigInteger(multiplyLong(b, smallToArray(a)), sign);
    }
    function square(a) {
        var l = a.length;
        var r = createArray(l + l);
        var base = BASE;
        for (var i_3 = 0; i_3 < l; i_3++) {
            var a_i = a[i_3];
            for (var j = 0; j < l; j++) {
                var a_j = a[j];
                var product = a_i * a_j + r[i_3 + j];
                var carry = Math.floor(product / base);
                r[i_3 + j] = product - carry * base;
                r[i_3 + j + 1] += carry;
            }
        }
        trim(r);
        return r;
    }
    function divMod1(a, b) {
        var a_l = a.length;
        var b_l = b.length;
        var base = BASE;
        var result = createArray(b.length);
        var divisorMostSignificantDigit = b[b_l - 1];
        var lambda = Math.ceil(base / (2 * divisorMostSignificantDigit));
        var remainder = multiplySmall(a, lambda);
        var divisor = multiplySmall(b, lambda);
        var quotientDigit;
        var shift;
        if (remainder.length <= a_l) remainder.push(0);
        divisor.push(0);
        divisorMostSignificantDigit = divisor[b_l - 1];
        for (shift = a_l - b_l; shift >= 0; shift--) {
            quotientDigit = base - 1;
            if (remainder[shift + b_l] !== divisorMostSignificantDigit) {
                quotientDigit = Math.floor((remainder[shift + b_l] * base + remainder[shift + b_l - 1]) / divisorMostSignificantDigit);
            }
            var carry = 0;
            var borrow = 0;
            var l = divisor.length;
            for (var i_4 = 0; i_4 < l; i_4++) {
                carry += quotientDigit * divisor[i_4];
                var q = Math.floor(carry / base);
                borrow += remainder[shift + i_4] - (carry - q * base);
                carry = q;
                if (borrow < 0) {
                    remainder[shift + i_4] = borrow + base;
                    borrow = -1;
                } else {
                    remainder[shift + i_4] = borrow;
                    borrow = 0;
                }
            }
            while (borrow !== 0) {
                quotientDigit -= 1;
                carry = 0;
                for (var i_5 = 0; i_5 < l; i_5++) {
                    carry += remainder[shift + i_5] - base + divisor[i_5];
                    if (carry < 0) {
                        remainder[shift + i_5] = carry + base;
                        carry = 0;
                    } else {
                        remainder[shift + i_5] = carry;
                        carry = 1;
                    }
                }
                borrow += carry;
            }
            result[shift] = quotientDigit;
        }
        remainder = divModSmall(remainder, lambda)[0];
        return [arrayToSmall(result), arrayToSmall(remainder)];
    }
    function divMod2(a, b) {
        var a_l = a.length;
        var b_l = b.length;
        var result = [];
        var part = [];
        var base = BASE;
        while (a_l) {
            part.unshift(a[--a_l]);
            if (compareAbs(part, b) < 0) {
                result.push(0);
                continue;
            }
            var xlen = part.length;
            var highx = part[xlen - 1] * base + part[xlen - 2];
            var highy = b[b_l - 1] * base + b[b_l - 2];
            if (xlen > b_l) {
                highx = (highx + 1) * base;
            }
            var guess = Math.ceil(highx / highy);
            var check = void 0;
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
    function divModSmall(value, lambda) {
        var length = value.length;
        var quotient = createArray(length);
        var base = BASE;
        var remainder = 0;
        for (var i_6 = length - 1; i_6 >= 0; --i_6) {
            var divisor = remainder * base + value[i_6];
            var q = truncate(divisor / lambda);
            remainder = divisor - q * lambda;
            quotient[i_6] = q | 0;
        }
        return [quotient, remainder | 0];
    }
    function divModAny(self, v) {
        var value;
        var n = parseValue(v);
        var a = self['value'];
        var b = n['value'];
        var quotient;
        if (b === 0) throw new Error("Cannot divide by zero");
        if (self.isSmall) {
            if (n.isSmall) {
                return [new SmallInteger(truncate(a / b)), new SmallInteger(a % b)];
            }
            return [Integer[0], self];
        }
        if (n.isSmall) {
            if (b === +1) return [self, Integer[0]];
            if (b === -1) return [self.negate(), Integer[0]];
            var abs = Math.abs(b);
            if (abs < BASE) {
                value = divModSmall(a, abs);
                quotient = arrayToSmall(value[0]);
                var remainder = value[1];
                if (self.sign) remainder = -remainder;
                if (typeof quotient === "number") {
                    if (self.sign !== n.sign) quotient = -quotient;
                    return [new SmallInteger(quotient), new SmallInteger(remainder)];
                }
                return [new BigInteger(quotient, self.sign !== n.sign), new SmallInteger(remainder)];
            }
            b = smallToArray(abs);
        }
        var lhs = a;
        var rhs = b;
        var comparison = compareAbs(lhs, rhs);
        if (comparison === -1) return [Integer[0], self];
        if (comparison === 0) return [Integer[self.sign === n.sign ? 1 : -1], Integer[0]];
        if (lhs.length + rhs.length <= 200) {
            value = divMod1(lhs, rhs);
        } else {
            value = divMod2(lhs, rhs);
        }
        quotient = value[0];
        var qSign = self.sign !== n.sign,
            mod = value[1],
            mSign = self.sign;
        var quotientInteger;
        if (typeof quotient === "number") {
            if (qSign) quotient = -quotient;
            quotientInteger = new SmallInteger(quotient);
        } else {
            quotientInteger = new BigInteger(quotient, qSign);
        }
        if (typeof mod === "number") {
            if (mSign) mod = -mod;
            return [quotientInteger, new SmallInteger(mod)];
        } else {
            return [quotientInteger, new BigInteger(mod, mSign)];
        }
    }
    function compareAbs(a, b) {
        if (a.length !== b.length) {
            return a.length > b.length ? 1 : -1;
        }
        for (var i = a.length - 1; i >= 0; i--) {
            if (a[i] !== b[i]) return a[i] > b[i] ? 1 : -1;
        }
        return 0;
    }
    function isBasicPrime(v) {
        var n = v.abs();
        if (n.isUnit()) return false;
        if (n.equals(2) || n.equals(3) || n.equals(5)) return true;
        if (n.isEven() || n.isDivisibleBy(3) || n.isDivisibleBy(5)) return false;
        if (n.lesser(25)) return true;
        return void 0;
    }
    function shift_isSmall(n) {
        return (typeof n === "number" || typeof n === "string") && +Math.abs(n) <= BASE || n instanceof BigInteger && n.value.length <= 1;
    }
    function bitwise(x, yIn, fn) {
        var y = parseValue(yIn);
        var xSign = x.isNegative(),
            ySign = y.isNegative();
        var xRem = xSign ? x.not() : x,
            yRem = ySign ? y.not() : y;
        var xBits = [];
        var yBits = [];
        var xStop = false;
        var yStop = false;
        while (!xStop || !yStop) {
            if (xRem.isZero()) {
                xStop = true;
                xBits.push(xSign ? 1 : 0);
            } else if (xSign) xBits.push(xRem.isEven() ? 1 : 0);else xBits.push(xRem.isEven() ? 0 : 1);
            if (yRem.isZero()) {
                yStop = true;
                yBits.push(ySign ? 1 : 0);
            } else if (ySign) yBits.push(yRem.isEven() ? 1 : 0);else yBits.push(yRem.isEven() ? 0 : 1);
            xRem = xRem.over(2);
            yRem = yRem.over(2);
        }
        var result = [];
        for (var i_7 = 0; i_7 < xBits.length; i_7++) result.push(fn(xBits[i_7], yBits[i_7]));
        var sum = bigInt(result.pop()).negate().times(bigInt(2).pow(result.length));
        while (result.length) {
            sum = sum.add(bigInt(result.pop()).times(bigInt(2).pow(result.length)));
        }
        return sum;
    }
    function roughLOB(n) {
        var v = n['value'];
        var x = typeof v === "number" ? v | LOBMASK_I : v[0] + v[1] * BASE | LOBMASK_BI;
        return x & -x;
    }
    function max(aIn, bIn) {
        var a = parseValue(aIn);
        var b = parseValue(bIn);
        return a.greater(b) ? a : b;
    }
    exports_1("max", max);
    function min(aIn, bIn) {
        var a = parseValue(aIn);
        var b = parseValue(bIn);
        return a.lesser(b) ? a : b;
    }
    exports_1("min", min);
    function gcd(aIn, bIn) {
        var a = parseValue(aIn).abs();
        var b = parseValue(bIn).abs();
        if (a.equals(b)) return a;
        if (a.isZero()) return b;
        if (b.isZero()) return a;
        var c = Integer[1];
        while (a.isEven() && b.isEven()) {
            var d = Math.min(roughLOB(a), roughLOB(b));
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
                var t = b;
                b = a;
                a = t;
            }
            b = b.subtract(a);
        } while (!b.isZero());
        return c.isUnit() ? a : a.multiply(c);
    }
    exports_1("gcd", gcd);
    function lcm(aIn, bIn) {
        var a = parseValue(aIn).abs();
        var b = parseValue(bIn).abs();
        return a.divide(gcd(a, b)).multiply(b);
    }
    exports_1("lcm", lcm);
    function randBetween(a, b) {
        if (typeof a === 'undefined') {
            throw new Error("a must be number | string | Integer");
        }
        if (typeof b === 'undefined') {
            throw new Error("b must be number | string | Integer");
        }
        a = parseValue(a);
        b = parseValue(b);
        var low = min(a, b),
            high = max(a, b);
        var range = high.subtract(low);
        if (range.isSmall) {
            return low.add(Math.round(Math.random() * range.valueOf()));
        }
        var length = range.value.length - 1;
        var temp = [];
        var restricted = true;
        for (var i = length; i >= 0; i--) {
            var top = restricted ? range.value[i] : BASE;
            var digit = truncate(Math.random() * top);
            temp.unshift(digit);
            if (digit < top) restricted = false;
        }
        var result = arrayToSmall(temp);
        return low.add(typeof result === "number" ? new SmallInteger(result) : new BigInteger(result, false));
    }
    exports_1("randBetween", randBetween);
    function stringify(digit) {
        var digitValue = digit['value'];
        var value;
        if (typeof digitValue === "number") {
            value = [digitValue];
        } else {
            value = digitValue;
        }
        if (value.length === 1 && value[0] <= 35) {
            return "0123456789abcdefghijklmnopqrstuvwxyz".charAt(value[0]);
        }
        return "<" + value + ">";
    }
    function toBase(n, baseIn) {
        var base = bigInt(baseIn);
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
            return minusSign + new Array(+n + 1).join("" + 1);
        }
        var out = [];
        var left = n;
        while (left.isNegative() || left.compareAbs(base) >= 0) {
            var divmod = left.divmod(base);
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
    function parseStringValue(v) {
        if (isPrecise(+v)) {
            var x = +v;
            if (x === truncate(x)) return new SmallInteger(x);
            throw "Invalid integer: " + v;
        }
        var sign = v[0] === "-";
        if (sign) v = v.slice(1);
        var split = v.split(/e/i);
        if (split.length > 2) throw new Error("Invalid integer: " + split.join("e"));
        if (split.length === 2) {
            var exp = split[1];
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
            text += new Array(exp + 1).join("0");
            v = text;
        }
        var isValid = /^([0-9][0-9]*)$/.test(v);
        if (!isValid) throw new Error("Invalid integer: " + v);
        var r = [];
        var max = v.length;
        var l = LOG_BASE;
        var min = max - l;
        while (max > 0) {
            r.push(+v.slice(min, max));
            min -= l;
            if (min < 0) min = 0;
            max -= l;
        }
        trim(r);
        return new BigInteger(r, sign);
    }
    function parseNumberValue(v) {
        if (isPrecise(v)) {
            if (v !== truncate(v)) throw new Error(v + " is not an integer.");
            return new SmallInteger(v);
        }
        return parseStringValue(v.toString());
    }
    function parseValue(v) {
        if (typeof v === "number") {
            return parseNumberValue(v);
        } else if (typeof v === "string") {
            return parseStringValue(v);
        } else if (v instanceof Integer) {
            return v;
        }
        throw new Error("v must be a number or a string or Integer: Found " + typeof v);
    }
    function isInstance(x) {
        return x instanceof BigInteger || x instanceof SmallInteger;
    }
    exports_1("isInstance", isInstance);
    function bigInt(v, radix) {
        return new Integer(v, radix);
    }
    exports_1("default", bigInt);
    return {
        setters: [],
        execute: function () {
            BASE = 1e7;
            LOG_BASE = 7;
            MAX_INT = 9007199254740992;
            MAX_INT_ARR = smallToArray(MAX_INT);
            LOG_MAX_INT = Math.log(MAX_INT);
            parseBase = function (text, base) {
                var val = Integer[0];
                var pow = Integer[1];
                var length = text.length;
                if (2 <= base && base <= 36) {
                    if (length <= LOG_MAX_INT / Math.log(base)) {
                        return new SmallInteger(parseInt(text, base));
                    }
                }
                var baseParsed = parseValue(base);
                var digits = [];
                var isNegative = text[0] === "-";
                for (var i_8 = isNegative ? 1 : 0; i_8 < text.length; i_8++) {
                    var c = text[i_8].toLowerCase(),
                        charCode = c.charCodeAt(0);
                    if (48 <= charCode && charCode <= 57) digits.push(parseValue(c));else if (97 <= charCode && charCode <= 122) digits.push(parseValue(c.charCodeAt(0) - 87));else if (c === "<") {
                        var start = i_8;
                        do {
                            i_8++;
                        } while (text[i_8] !== ">");
                        digits.push(parseValue(text.slice(start + 1, i_8)));
                    } else throw new Error(c + " is not a valid character");
                }
                digits.reverse();
                for (var i_9 = 0; i_9 < digits.length; i_9++) {
                    val = val.add(digits[i_9].times(pow));
                    pow = pow.times(baseParsed);
                }
                return isNegative ? val.negate() : val;
            };
            powersOfTwo = [1];
            while (powersOfTwo[powersOfTwo.length - 1] <= BASE) {
                powersOfTwo.push(2 * powersOfTwo[powersOfTwo.length - 1]);
            }
            powers2Length = powersOfTwo.length;
            highestPower2 = powersOfTwo[powers2Length - 1];
            Integer = function () {
                function Integer(v, radix) {
                    if (typeof v === "undefined") return Integer[0];
                    if (typeof radix !== "undefined") return +radix === 10 ? parseValue(v) : parseBase(v, radix);
                    return parseValue(v);
                }
                Integer.prototype.add = function (v) {
                    throw new Error();
                };
                Integer.prototype.plus = function (v) {
                    throw new Error();
                };
                Integer.prototype.subtract = function (v) {
                    throw new Error();
                };
                Integer.prototype.isPositive = function () {
                    throw new Error();
                };
                Integer.prototype.isNegative = function () {
                    throw new Error();
                };
                Integer.prototype.isUnit = function () {
                    throw new Error();
                };
                Integer.prototype.isOdd = function () {
                    throw new Error();
                };
                Integer.prototype.divmod = function (v) {
                    var result = divModAny(this, v);
                    return {
                        quotient: result[0],
                        remainder: result[1]
                    };
                };
                Integer.prototype.divide = function (v) {
                    return divModAny(this, v)[0];
                };
                Integer.prototype.over = function (v) {
                    return this.divide(v);
                };
                Integer.prototype.mod = function (v) {
                    return divModAny(this, v)[1];
                };
                Integer.prototype.remainder = function (v) {
                    return this.mod(v);
                };
                Integer.prototype.pow = function (v) {
                    var n = parseValue(v);
                    var a = this['value'];
                    var b = n['value'];
                    var value;
                    if (b === 0) return Integer[1];
                    if (a === 0) return Integer[0];
                    if (a === 1) return Integer[1];
                    if (a === -1) return n.isEven() ? Integer[1] : Integer[-1];
                    if (n.sign) {
                        return Integer[0];
                    }
                    if (!n.isSmall) throw new Error("The exponent " + n.toString() + " is too large.");
                    if (this.isSmall) {
                        if (isPrecise(value = Math.pow(a, b))) return new SmallInteger(truncate(value));
                    }
                    var x = this;
                    var y = Integer[1];
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
                };
                Integer.prototype.modPow = function (expIn, modIn) {
                    var exp = parseValue(expIn);
                    var mod = parseValue(modIn);
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
                };
                Integer.prototype._multiplyBySmall = function (a) {
                    throw new Error();
                };
                Integer.prototype.compare = function (v) {
                    throw new Error();
                };
                Integer.prototype.compareAbs = function (v) {
                    throw new Error();
                };
                Integer.prototype.equals = function (v) {
                    return this.compare(v) === 0;
                };
                Integer.prototype.eq = function (v) {
                    return this.equals(v);
                };
                Integer.prototype.notEquals = function (v) {
                    return this.compare(v) !== 0;
                };
                Integer.prototype.neq = function (v) {
                    return this.notEquals(v);
                };
                Integer.prototype.greater = function (v) {
                    return this.compare(v) > 0;
                };
                Integer.prototype.gt = function (v) {
                    return this.greater(v);
                };
                Integer.prototype.lesser = function (v) {
                    return this.compare(v) < 0;
                };
                Integer.prototype.lt = function (v) {
                    return this.lesser(v);
                };
                Integer.prototype.greaterOrEquals = function (v) {
                    return this.compare(v) >= 0;
                };
                Integer.prototype.geq = function (v) {
                    return this.greaterOrEquals(v);
                };
                Integer.prototype.lesserOrEquals = function (v) {
                    return this.compare(v) <= 0;
                };
                Integer.prototype.leq = function (v) {
                    return this.lesserOrEquals(v);
                };
                Integer.prototype.isEven = function () {
                    throw new Error();
                };
                Integer.prototype.isDivisibleBy = function (v) {
                    var n = parseValue(v);
                    var value = n['value'];
                    if (value === 0) return false;
                    if (value === 1) return true;
                    if (value === 2) return this.isEven();
                    return this.mod(n).equals(Integer[0]);
                };
                Integer.prototype.abs = function () {
                    throw new Error();
                };
                Integer.prototype.next = function () {
                    throw new Error();
                };
                Integer.prototype.prev = function () {
                    throw new Error();
                };
                Integer.prototype.times = function (v) {
                    throw new Error();
                };
                Integer.prototype.square = function () {
                    throw new Error();
                };
                Integer.prototype.isPrime = function () {
                    var isPrime = isBasicPrime(this);
                    if (isPrime !== undefined) return isPrime;
                    var n = this.abs();
                    var nPrev = n.prev();
                    var a = [2, 3, 5, 7, 11, 13, 17, 19];
                    var b = nPrev;
                    while (b.isEven()) b = b.divide(2);
                    for (var i_10 = 0; i_10 < a.length; i_10++) {
                        var x = bigInt(a[i_10]).modPow(b, n);
                        if (x.equals(Integer[1]) || x.equals(nPrev)) continue;
                        var t = void 0;
                        var d = void 0;
                        for (t = true, d = b; t && d.lesser(nPrev); d = d.multiply(2)) {
                            x = x.square().mod(n);
                            if (x.equals(nPrev)) t = false;
                        }
                        if (t) return false;
                    }
                    return true;
                };
                Integer.prototype.minus = function (v) {
                    throw new Error();
                };
                Integer.prototype.isProbablePrime = function (iterations) {
                    var isPrime = isBasicPrime(this);
                    if (isPrime !== undefined) return isPrime;
                    var n = this.abs();
                    var t = iterations === undefined ? 5 : iterations;
                    for (var i = 0; i < t; i++) {
                        var a = randBetween(2, n.minus(2));
                        if (!a.modPow(n.prev(), n).isUnit()) return false;
                    }
                    return true;
                };
                Integer.prototype.multiply = function (v) {
                    throw new Error();
                };
                Integer.prototype.shiftLeft = function (nIn) {
                    if (!shift_isSmall(nIn)) {
                        throw new Error(String(nIn) + " is too large for shifting.");
                    }
                    var n = +nIn;
                    if (n < 0) return this.shiftRight(-n);
                    var result = this;
                    while (n >= powers2Length) {
                        result = result.multiply(highestPower2);
                        n -= powers2Length - 1;
                    }
                    return result.multiply(powersOfTwo[n]);
                };
                Integer.prototype.isZero = function () {
                    throw new Error();
                };
                Integer.prototype.shiftRight = function (nIn) {
                    var remQuo;
                    if (!shift_isSmall(nIn)) {
                        throw new Error(String(nIn) + " is too large for shifting.");
                    }
                    var n = +nIn;
                    if (n < 0) return this.shiftLeft(-n);
                    var result = this;
                    while (n >= powers2Length) {
                        if (result.isZero()) return result;
                        remQuo = divModAny(result, highestPower2);
                        result = remQuo[1].isNegative() ? remQuo[0].prev() : remQuo[0];
                        n -= powers2Length - 1;
                    }
                    remQuo = divModAny(result, powersOfTwo[n]);
                    return remQuo[1].isNegative() ? remQuo[0].prev() : remQuo[0];
                };
                Integer.prototype.negate = function () {
                    throw new Error();
                };
                Integer.prototype.not = function () {
                    return this.negate().prev();
                };
                Integer.prototype.and = function (n) {
                    return bitwise(this, n, function (a, b) {
                        return a & b;
                    });
                };
                Integer.prototype.or = function (n) {
                    return bitwise(this, n, function (a, b) {
                        return a | b;
                    });
                };
                Integer.prototype.xor = function (n) {
                    return bitwise(this, n, function (a, b) {
                        return a ^ b;
                    });
                };
                Integer.prototype.valueOf = function () {
                    throw new Error();
                };
                Integer.prototype.toJSNumber = function () {
                    return this.valueOf();
                };
                Integer.prototype.toStringEx = function (radix) {
                    throw new Error();
                };
                Integer.prototype.toString = function () {
                    return this.toStringEx();
                };
                return Integer;
            }();
            exports_1("Integer", Integer);
            BigInteger = function (_super) {
                __extends(BigInteger, _super);
                function BigInteger(value, sign) {
                    var _this = _super.call(this, void 0, void 0) || this;
                    _this.value = value;
                    _this.sign = sign;
                    _this.isSmall = false;
                    return _this;
                }
                BigInteger.prototype.add = function (v) {
                    var n = parseValue(v);
                    if (this.sign !== n.sign) {
                        return this.subtract(n.negate());
                    }
                    var a = this.value;
                    if (n.isSmall) {
                        var b = n.value;
                        return new BigInteger(addSmall(a, Math.abs(b)), this.sign);
                    } else {
                        var b = n.value;
                        return new BigInteger(addAny(a, b), this.sign);
                    }
                };
                BigInteger.prototype.plus = function (v) {
                    return this.add(v);
                };
                BigInteger.prototype.__add__ = function (rhs) {
                    return this.add(rhs);
                };
                BigInteger.prototype.__radd__ = function (lhs) {
                    var n = parseValue(lhs);
                    return n.add(this);
                };
                BigInteger.prototype.subtract = function (v) {
                    var n = parseValue(v);
                    if (this.sign !== n.sign) {
                        return this.add(n.negate());
                    }
                    var a = this.value;
                    if (n.isSmall) {
                        var b = n.value;
                        return subtractSmall(a, Math.abs(b), this.sign);
                    } else {
                        var b = n.value;
                        return subtractAny(a, b, this.sign);
                    }
                };
                BigInteger.prototype.minus = function (v) {
                    return this.subtract(v);
                };
                BigInteger.prototype.__sub__ = function (rhs) {
                    return this.subtract(rhs);
                };
                BigInteger.prototype.__rsub__ = function (lhs) {
                    var n = parseValue(lhs);
                    return n.subtract(this);
                };
                BigInteger.prototype.negate = function () {
                    return new BigInteger(this.value, !this.sign);
                };
                BigInteger.prototype.neg = function () {
                    return new BigInteger(this.value, !this.sign);
                };
                BigInteger.prototype.__neg__ = function () {
                    return this.negate();
                };
                BigInteger.prototype.__pos__ = function () {
                    return this;
                };
                BigInteger.prototype.abs = function () {
                    return new BigInteger(this.value, false);
                };
                BigInteger.prototype.inv = function () {
                    throw new Error("inv() is not supported for BigInteger");
                };
                BigInteger.prototype.multiply = function (v) {
                    var n = parseValue(v);
                    var a = this.value;
                    var sign = this.sign !== n.sign;
                    var rhs;
                    if (n.isSmall) {
                        var b = n.value;
                        if (b === 0) return Integer[0];
                        if (b === 1) return this;
                        if (b === -1) return this.negate();
                        var abs = Math.abs(b);
                        if (abs < BASE) {
                            return new BigInteger(multiplySmall(a, abs), sign);
                        }
                        rhs = smallToArray(abs);
                    } else {
                        rhs = n.value;
                    }
                    if (useKaratsuba(a.length, rhs.length)) return new BigInteger(multiplyKaratsuba(a, rhs), sign);
                    return new BigInteger(multiplyLong(a, rhs), sign);
                };
                BigInteger.prototype.times = function (v) {
                    return this.multiply(v);
                };
                BigInteger.prototype.__mul__ = function (rhs) {
                    return this.multiply(rhs);
                };
                BigInteger.prototype.__rmul__ = function (lhs) {
                    var n = parseValue(lhs);
                    return n.multiply(this);
                };
                BigInteger.prototype._multiplyBySmall = function (a) {
                    if (a.value === 0) return Integer[0];
                    if (a.value === 1) return this;
                    if (a.value === -1) return this.negate();
                    return multiplySmallAndArray(Math.abs(a.value), this.value, this.sign !== a.sign);
                };
                BigInteger.prototype.square = function () {
                    return new BigInteger(square(this.value), false);
                };
                BigInteger.prototype.compareAbs = function (v) {
                    var n = parseValue(v);
                    var a = this.value;
                    if (n.isSmall) {
                        return 1;
                    } else {
                        var b = n.value;
                        return compareAbs(a, b);
                    }
                };
                BigInteger.prototype.compare = function (v) {
                    if (v === Infinity) {
                        return -1;
                    }
                    if (v === -Infinity) {
                        return 1;
                    }
                    var n = parseValue(v);
                    var a = this.value;
                    if (this.sign !== n.sign) {
                        return n.sign ? 1 : -1;
                    }
                    if (n.isSmall) {
                        return this.sign ? -1 : 1;
                    } else {
                        var b = n.value;
                        return compareAbs(a, b) * (this.sign ? -1 : 1);
                    }
                };
                BigInteger.prototype.compareTo = function (v) {
                    return this.compare(v);
                };
                BigInteger.prototype.isEven = function () {
                    return (this.value[0] & 1) === 0;
                };
                BigInteger.prototype.isOdd = function () {
                    return (this.value[0] & 1) === 1;
                };
                BigInteger.prototype.isPositive = function () {
                    return !this.sign;
                };
                BigInteger.prototype.isNegative = function () {
                    return this.sign;
                };
                BigInteger.prototype.isOne = function () {
                    return false;
                };
                BigInteger.prototype.isUnit = function () {
                    return false;
                };
                BigInteger.prototype.isZero = function () {
                    return false;
                };
                BigInteger.prototype.next = function () {
                    var value = this.value;
                    if (this.sign) {
                        return subtractSmall(value, 1, this.sign);
                    }
                    return new BigInteger(addSmall(value, 1), this.sign);
                };
                BigInteger.prototype.prev = function () {
                    var value = this.value;
                    if (this.sign) {
                        return new BigInteger(addSmall(value, 1), true);
                    }
                    return subtractSmall(value, 1, this.sign);
                };
                BigInteger.prototype.toStringEx = function (radix) {
                    if (radix === undefined) radix = 10;
                    if (radix !== 10) return toBase(this, radix);
                    var v = this.value;
                    var l = v.length;
                    var str = String(v[--l]);
                    var zeros = "0000000";
                    while (--l >= 0) {
                        var digit = String(v[l]);
                        str += zeros.slice(digit.length) + digit;
                    }
                    var sign = this.sign ? "-" : "";
                    return sign + str;
                };
                BigInteger.prototype.valueOf = function () {
                    return +this.toStringEx();
                };
                return BigInteger;
            }(Integer);
            SmallInteger = function (_super) {
                __extends(SmallInteger, _super);
                function SmallInteger(value) {
                    var _this = _super.call(this, void 0, void 0) || this;
                    _this.value = value;
                    _this.sign = value < 0;
                    _this.isSmall = true;
                    return _this;
                }
                SmallInteger.prototype.add = function (v) {
                    var n = parseValue(v);
                    var a = this.value;
                    if (a < 0 !== n.sign) {
                        return this.subtract(n.negate());
                    }
                    var rhs;
                    if (n.isSmall) {
                        var b = n.value;
                        if (isPrecise(a + b)) return new SmallInteger(a + b);
                        rhs = smallToArray(Math.abs(b));
                    } else {
                        rhs = n.value;
                    }
                    return new BigInteger(addSmall(rhs, Math.abs(a)), a < 0);
                };
                SmallInteger.prototype.plus = function (v) {
                    return this.add(v);
                };
                SmallInteger.prototype.__add__ = function (rhs) {
                    return this.add(rhs);
                };
                SmallInteger.prototype.__radd__ = function (lhs) {
                    var n = parseValue(lhs);
                    return n.add(this);
                };
                SmallInteger.prototype.subtract = function (v) {
                    var n = parseValue(v);
                    var a = this.value;
                    if (a < 0 !== n.sign) {
                        return this.add(n.negate());
                    }
                    if (n.isSmall) {
                        var b = n.value;
                        return new SmallInteger(a - b);
                    } else {
                        var b = n.value;
                        return subtractSmall(b, Math.abs(a), a >= 0);
                    }
                };
                SmallInteger.prototype.minus = function (v) {
                    return this.subtract(v);
                };
                SmallInteger.prototype.__sub__ = function (rhs) {
                    return this.subtract(rhs);
                };
                SmallInteger.prototype.__rsub__ = function (lhs) {
                    var n = parseValue(lhs);
                    return n.subtract(this);
                };
                SmallInteger.prototype.negate = function () {
                    var sign = this.sign;
                    var small = new SmallInteger(-this.value);
                    small.sign = !sign;
                    return small;
                };
                SmallInteger.prototype.neg = function () {
                    return this.negate();
                };
                SmallInteger.prototype.__neg__ = function () {
                    return this.negate();
                };
                SmallInteger.prototype.__pos__ = function () {
                    return this;
                };
                SmallInteger.prototype.abs = function () {
                    return new SmallInteger(Math.abs(this.value));
                };
                SmallInteger.prototype.inv = function () {
                    throw new Error("inv() is not supported");
                };
                SmallInteger.prototype._multiplyBySmall = function (a) {
                    if (isPrecise(a.value * this.value)) {
                        return new SmallInteger(a.value * this.value);
                    }
                    return multiplySmallAndArray(Math.abs(a.value), smallToArray(Math.abs(this.value)), this.sign !== a.sign);
                };
                SmallInteger.prototype.multiply = function (v) {
                    return parseValue(v)._multiplyBySmall(this);
                };
                SmallInteger.prototype.times = function (v) {
                    return this.multiply(v);
                };
                SmallInteger.prototype.__mul__ = function (rhs) {
                    return this.multiply(rhs);
                };
                SmallInteger.prototype.__rmul__ = function (lhs) {
                    var n = parseValue(lhs);
                    return n.multiply(this);
                };
                SmallInteger.prototype.square = function () {
                    var value = this.value * this.value;
                    if (isPrecise(value)) return new SmallInteger(value);
                    return new BigInteger(square(smallToArray(Math.abs(this.value))), false);
                };
                SmallInteger.prototype.compareAbs = function (v) {
                    var n = parseValue(v);
                    var a = Math.abs(this.value);
                    if (n.isSmall) {
                        var value = n.value;
                        var b = Math.abs(value);
                        return a === b ? 0 : a > b ? 1 : -1;
                    }
                    return -1;
                };
                SmallInteger.prototype.compare = function (v) {
                    if (v === Infinity) {
                        return -1;
                    }
                    if (v === -Infinity) {
                        return 1;
                    }
                    var n = parseValue(v);
                    var a = this.value;
                    if (n.isSmall) {
                        var b = n.value;
                        return a === b ? 0 : a > b ? 1 : -1;
                    }
                    if (a < 0 !== n.sign) {
                        return a < 0 ? -1 : 1;
                    }
                    return a < 0 ? 1 : -1;
                };
                SmallInteger.prototype.compareTo = function (v) {
                    return this.compare(v);
                };
                SmallInteger.prototype.isEven = function () {
                    return (this.value & 1) === 0;
                };
                SmallInteger.prototype.isOdd = function () {
                    return (this.value & 1) === 1;
                };
                SmallInteger.prototype.isPositive = function () {
                    return this.value > 0;
                };
                SmallInteger.prototype.isNegative = function () {
                    return this.value < 0;
                };
                SmallInteger.prototype.isOne = function () {
                    return this.isUnit();
                };
                SmallInteger.prototype.isUnit = function () {
                    return Math.abs(this.value) === 1;
                };
                SmallInteger.prototype.isZero = function () {
                    return this.value === 0;
                };
                SmallInteger.prototype.next = function () {
                    var value = this.value;
                    if (value + 1 < MAX_INT) return new SmallInteger(value + 1);
                    return new BigInteger(MAX_INT_ARR, false);
                };
                SmallInteger.prototype.prev = function () {
                    var value = this.value;
                    if (value - 1 > -MAX_INT) return new SmallInteger(value - 1);
                    return new BigInteger(MAX_INT_ARR, true);
                };
                SmallInteger.prototype.toStringEx = function (radix) {
                    if (radix === undefined) radix = 10;
                    if (radix !== 10) return toBase(this, radix);
                    return String(this.value);
                };
                SmallInteger.prototype.valueOf = function () {
                    return this.value;
                };
                return SmallInteger;
            }(Integer);
            LOBMASK_I = 1 << 30, LOBMASK_BI = (BASE & -BASE) * (BASE & -BASE) | LOBMASK_I;
            for (i = 0; i < 1000; i++) {
                Integer[i] = new SmallInteger(i);
                if (i > 0) Integer[-i] = new SmallInteger(-i);
            }
            exports_1("one", one = Integer[1]);
            exports_1("zero", zero = Integer[0]);
            exports_1("minusOne", minusOne = Integer[-1]);
        }
    };
});
System.register("geocas/math/BigRational.js", ["./BigInteger"], function (exports_1, context_1) {
    "use strict";

    var BigInteger_1, BigInteger_2, BigRational, zero, one, minusOne;
    var __moduleName = context_1 && context_1.id;
    function reduce(n, d) {
        var divisor = BigInteger_2.gcd(n, d);
        var numer = n.over(divisor);
        var denom = d.over(divisor);
        if (denom.isNegative()) {
            return new BigRational(numer.negate(), denom.negate());
        }
        return new BigRational(numer, denom);
    }
    function interpret(n, d) {
        return bigRat(n, d);
    }
    function parseDecimal(n) {
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
            var exponent = new BigRational(BigInteger_1.default(10).pow(parts[1]), BigInteger_2.one);
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
            var intPart = new BigRational(BigInteger_1.default(parts[0]), BigInteger_2.one);
            var length = parts[1].length;
            while (parts[1][0] === "0") {
                parts[1] = parts[1].slice(1);
            }
            var exp = "1" + Array(length + 1).join("0");
            var decPart = reduce(BigInteger_1.default(parts[1]), BigInteger_1.default(exp));
            intPart = intPart.add(decPart);
            if (isNegative) intPart = intPart.negate();
            return intPart;
        }
        return new BigRational(BigInteger_1.default(n), BigInteger_2.one);
    }
    function bigRat(a, b) {
        if (!a) {
            return new BigRational(BigInteger_1.default(0), BigInteger_2.one);
        }
        if (b) {
            return reduce(BigInteger_1.default(a), BigInteger_1.default(b));
        }
        if (BigInteger_2.isInstance(a)) {
            return new BigRational(a, BigInteger_2.one);
        }
        if (a instanceof BigRational) return a;
        var numer;
        var denom;
        var text = String(a);
        var texts = text.split("/");
        if (texts.length > 2) {
            throw new Error("Invalid input: too many '/' tokens");
        }
        if (texts.length > 1) {
            var parts = texts[0].split("_");
            if (parts.length > 2) {
                throw new Error("Invalid input: too many '_' tokens");
            }
            if (parts.length > 1) {
                var isPositive = parts[0][0] !== "-";
                numer = BigInteger_1.default(parts[0]).times(texts[1]);
                if (isPositive) {
                    numer = numer.add(parts[1]);
                } else {
                    numer = numer.subtract(parts[1]);
                }
                denom = BigInteger_1.default(texts[1]);
                return reduce(numer, denom);
            }
            return reduce(BigInteger_1.default(texts[0]), BigInteger_1.default(texts[1]));
        }
        return parseDecimal(text);
    }
    exports_1("default", bigRat);
    return {
        setters: [function (BigInteger_1_1) {
            BigInteger_1 = BigInteger_1_1;
            BigInteger_2 = BigInteger_1_1;
        }],
        execute: function () {
            BigRational = function () {
                function BigRational(numer, denom) {
                    this.numer = numer;
                    this.denom = denom;
                    if (denom.isZero()) throw "Denominator cannot be 0.";
                }
                BigRational.prototype.add = function (n, d) {
                    var v = interpret(n, d);
                    var multiple = BigInteger_2.lcm(this.denom, v.denom);
                    var a = multiple.divide(this.denom);
                    var b = multiple.divide(v.denom);
                    a = this.numer.times(a);
                    b = v.numer.times(b);
                    return reduce(a.add(b), multiple);
                };
                BigRational.prototype.plus = function (n, d) {
                    return this.add(n, d);
                };
                BigRational.prototype.__add__ = function (rhs) {
                    return this.add(rhs);
                };
                BigRational.prototype.__radd__ = function (lhs) {
                    var v = interpret(lhs);
                    return v.add(this);
                };
                BigRational.prototype.subtract = function (n, d) {
                    var v = interpret(n, d);
                    return this.add(v.negate());
                };
                BigRational.prototype.minus = function (n, d) {
                    return this.subtract(n, d);
                };
                BigRational.prototype.__sub__ = function (rhs) {
                    return this.subtract(rhs);
                };
                BigRational.prototype.__rsub__ = function (lhs) {
                    var v = interpret(lhs);
                    return v.subtract(this);
                };
                BigRational.prototype.multiply = function (n, d) {
                    var v = interpret(n, d);
                    return reduce(this.numer.times(v.numer), this.denom.times(v.denom));
                };
                BigRational.prototype.times = function (n, d) {
                    return this.multiply(n, d);
                };
                BigRational.prototype.__mul__ = function (rhs) {
                    return this.multiply(rhs);
                };
                BigRational.prototype.__rmul__ = function (lhs) {
                    var v = interpret(lhs);
                    return v.multiply(this);
                };
                BigRational.prototype.divide = function (n, d) {
                    var v = interpret(n, d);
                    return reduce(this.numer.times(v.denom), this.denom.times(v.numer));
                };
                BigRational.prototype.__div__ = function (rhs) {
                    return this.divide(rhs);
                };
                BigRational.prototype.__rdiv__ = function (lhs) {
                    var v = interpret(lhs);
                    return v.divide(this);
                };
                BigRational.prototype.inv = function () {
                    return this.reciprocate();
                };
                BigRational.prototype.over = function (n, d) {
                    return this.divide(n, d);
                };
                BigRational.prototype.reciprocate = function () {
                    return new BigRational(this.denom, this.numer);
                };
                BigRational.prototype.mod = function (n, d) {
                    var v = interpret(n, d);
                    return this.minus(v.times(this.over(v).floor()));
                };
                BigRational.prototype.pow = function (n) {
                    var v = BigInteger_1.default(n);
                    var num = this.numer.pow(v);
                    var denom = this.denom.pow(v);
                    return reduce(num, denom);
                };
                BigRational.prototype.floor = function (toBigInt) {
                    var divmod = this.numer.divmod(this.denom);
                    var floor;
                    if (divmod.remainder.isZero() || !divmod.quotient.sign) {
                        floor = divmod.quotient;
                    } else floor = divmod.quotient.prev();
                    if (toBigInt) return floor;
                    return new BigRational(floor, BigInteger_2.one);
                };
                BigRational.prototype.ceil = function (toBigInt) {
                    var divmod = this.numer.divmod(this.denom);
                    var ceil;
                    if (divmod.remainder.isZero() || divmod.quotient.sign) {
                        ceil = divmod.quotient;
                    } else ceil = divmod.quotient.next();
                    if (toBigInt) return ceil;
                    return new BigRational(ceil, BigInteger_2.one);
                };
                BigRational.prototype.round = function (toBigInt) {
                    return this.add(1, 2).floor(toBigInt);
                };
                BigRational.prototype.compareAbs = function (n, d) {
                    var v = interpret(n, d);
                    if (this.denom.equals(v.denom)) {
                        return this.numer.compareAbs(v.numer);
                    }
                    return this.numer.times(v.denom).compareAbs(v.numer.times(this.denom));
                };
                BigRational.prototype.compare = function (n, d) {
                    var v = interpret(n, d);
                    if (this.denom.equals(v.denom)) {
                        return this.numer.compare(v.numer);
                    }
                    var comparison = this.denom.sign === v.denom.sign ? 1 : -1;
                    return comparison * this.numer.times(v.denom).compare(v.numer.times(this.denom));
                };
                BigRational.prototype.compareTo = function (n, d) {
                    return this.compare(n, d);
                };
                BigRational.prototype.equals = function (n, d) {
                    return this.compare(n, d) === 0;
                };
                BigRational.prototype.eq = function (n, d) {
                    return this.equals(n, d);
                };
                BigRational.prototype.__eq__ = function (rhs) {
                    return this.eq(rhs);
                };
                BigRational.prototype.notEquals = function (n, d) {
                    return this.compare(n, d) !== 0;
                };
                BigRational.prototype.neq = function (n, d) {
                    return this.notEquals(n, d);
                };
                BigRational.prototype.__ne__ = function (rhs) {
                    return this.neq(rhs);
                };
                BigRational.prototype.lesser = function (n, d) {
                    return this.compare(n, d) < 0;
                };
                BigRational.prototype.lt = function (n, d) {
                    return this.lesser(n, d);
                };
                BigRational.prototype.__lt__ = function (rhs) {
                    return this.lt(rhs);
                };
                BigRational.prototype.lesserOrEquals = function (n, d) {
                    return this.compare(n, d) <= 0;
                };
                BigRational.prototype.leq = function (n, d) {
                    return this.lesserOrEquals(n, d);
                };
                BigRational.prototype.__le__ = function (rhs) {
                    return this.leq(rhs);
                };
                BigRational.prototype.greater = function (n, d) {
                    return this.compare(n, d) > 0;
                };
                BigRational.prototype.gt = function (n, d) {
                    return this.greater(n, d);
                };
                BigRational.prototype.__gt__ = function (rhs) {
                    return this.gt(rhs);
                };
                BigRational.prototype.greaterOrEquals = function (n, d) {
                    return this.compare(n, d) >= 0;
                };
                BigRational.prototype.geq = function (n, d) {
                    return this.greaterOrEquals(n, d);
                };
                BigRational.prototype.__ge__ = function (rhs) {
                    return this.geq(rhs);
                };
                BigRational.prototype.abs = function () {
                    if (this.isPositive()) return this;
                    return this.negate();
                };
                BigRational.prototype.__pos__ = function () {
                    return this;
                };
                BigRational.prototype.__neg__ = function () {
                    return this.negate();
                };
                BigRational.prototype.neg = function () {
                    return this.negate();
                };
                BigRational.prototype.negate = function () {
                    if (this.denom.sign) {
                        return new BigRational(this.numer, this.denom.negate());
                    }
                    return new BigRational(this.numer.negate(), this.denom);
                };
                BigRational.prototype.isNegative = function () {
                    return this.numer.sign !== this.denom.sign && !this.numer.isZero();
                };
                BigRational.prototype.isOne = function () {
                    return this.numer.isUnit() && this.denom.isUnit();
                };
                BigRational.prototype.isPositive = function () {
                    return this.numer.sign === this.denom.sign && !this.numer.isZero();
                };
                BigRational.prototype.isZero = function () {
                    return this.numer.isZero();
                };
                BigRational.prototype.__vbar__ = function (rhs) {
                    return this.multiply(rhs);
                };
                BigRational.prototype.__rvbar__ = function (lhs) {
                    var v = interpret(lhs);
                    return v.multiply(this);
                };
                BigRational.prototype.__wedge__ = function (rhs) {
                    return bigRat(0);
                };
                BigRational.prototype.__rwedge__ = function (rhs) {
                    return bigRat(0);
                };
                BigRational.prototype.__lshift__ = function (rhs) {
                    return this.__vbar__(rhs);
                };
                BigRational.prototype.__rlshift__ = function (rhs) {
                    return this.__vbar__(rhs);
                };
                BigRational.prototype.__rshift__ = function (rhs) {
                    return this.__vbar__(rhs);
                };
                BigRational.prototype.__rrshift__ = function (rhs) {
                    return this.__vbar__(rhs);
                };
                BigRational.prototype.__bang__ = function () {
                    return void 0;
                };
                BigRational.prototype.__tilde__ = function () {
                    return void 0;
                };
                BigRational.prototype.toDecimal = function (digits) {
                    if (digits === void 0) {
                        digits = 10;
                    }
                    var n = this.numer.divmod(this.denom);
                    var intPart = n.quotient.abs().toString();
                    var remainder = bigRat(n.remainder.abs(), this.denom);
                    var shiftedRemainder = remainder.times(BigInteger_1.default("1e" + digits));
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
                };
                BigRational.prototype.toString = function () {
                    return String(this.numer) + "/" + String(this.denom);
                };
                BigRational.prototype.valueOf = function () {
                    return this.numer.valueOf() / this.denom.valueOf();
                };
                return BigRational;
            }();
            exports_1("zero", zero = bigRat(0));
            exports_1("one", one = bigRat(1));
            exports_1("minusOne", minusOne = bigRat(-1));
        }
    };
});
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
                    enumerable: true,
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
                    enumerable: true,
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
                    enumerable: true,
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
                    enumerable: true,
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
                    enumerable: true,
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
                    enumerable: true,
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
                    this.MODIFIED_AT = '2019-03-30';
                    this.NAMESPACE = 'GeoCAS';
                    this.VERSION = '1.13.1';
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
System.register("geocas.js", ["./geocas/math/BigInteger", "./geocas/math/BigRational", "./geocas/mother/Blade", "./geocas/mother/Complex", "./geocas/mother/ComplexFieldAdapter", "./geocas/mother/cosineOfAngleBetweenBlades", "./geocas/mother/norm", "./geocas/mother/NumberFieldAdapter", "./geocas/mother/orthoFramesToVersor", "./geocas/mother/Algebra", "./geocas/config", "./geocas/mother/squaredNorm"], function (exports_1, context_1) {
    "use strict";

    var BigInteger_1, BigRational_1, Blade_1, Complex_1, ComplexFieldAdapter_1, cosineOfAngleBetweenBlades_1, norm_1, NumberFieldAdapter_1, orthoFramesToVersor_1, Algebra_1, config_1, squaredNorm_1, GeoCAS;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [function (BigInteger_1_1) {
            BigInteger_1 = BigInteger_1_1;
        }, function (BigRational_1_1) {
            BigRational_1 = BigRational_1_1;
        }, function (Blade_1_1) {
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
                get bigInt() {
                    return BigInteger_1.default;
                },
                get bigRat() {
                    return BigRational_1.default;
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