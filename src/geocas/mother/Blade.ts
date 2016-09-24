import bitCount from './bitCount';
import {Blade} from './Multivector';
import canonicalReorderingSign from './canonicalReorderingSign';
import FieldAdapter from './FieldAdapter';
import isUndefined from '../checks/isUndefined';
import {Metric} from './Multivector';
import minusOnePow from './minusOnePow';

/**
 * The bitmap representation of a scalar.
 */
const SCALAR = 0;

export default function blade<T>(b: number, weight: T, adapter: FieldAdapter<T>) {
    const that: Blade<T> = {
        get bitmap(): number {
            return b;
        },
        get weight(): T {
            return weight;
        },
        __neg__(): Blade<T> {
            return blade(b, adapter.neg(weight), adapter);
        },
        __vbar__(rhs: Blade<T>, m: number | number[] | Metric<T>): Blade<T> {
            if (b !== rhs.bitmap) {
                return blade(SCALAR, adapter.zero, adapter);
            }
            else {
                return blade(SCALAR, adapter.mul(weight, rhs.weight), adapter);
            }
        },
        __wedge__(rhs: Blade<T>): Blade<T> {
            // If there are any vectors in common then the result is zero.
            if (b & rhs.bitmap) {
                return blade(SCALAR, adapter.zero, adapter);
            }
            else {
                const bitmap = b ^ rhs.bitmap;
                const sign = canonicalReorderingSign(b, rhs.bitmap);
                const newScale = adapter.mul(weight, rhs.weight);
                return blade(bitmap, sign > 0 ? newScale : adapter.neg(newScale), adapter);
            }
        },
        grade(): number {
            return bitCount(b);
        },
        reverse(): Blade<T> {
            const x = that.grade();
            const sign = minusOnePow(x * (x - 1) / 2);
            return blade(b, sign > 0 ? weight : adapter.neg(weight), adapter);
        },
        gradeInversion(): Blade<T> {
            const x = that.grade();
            const sign = minusOnePow(x);
            return blade(b, sign > 0 ? weight : adapter.neg(weight), adapter);
        },
        cliffordConjugate(): Blade<T> {
            const x = that.grade();
            const sign = minusOnePow(x * (x + 1) / 2);
            return blade(b, sign > 0 ? weight : adapter.neg(weight), adapter);
        },
        zero(): Blade<T> {
            return blade(SCALAR, adapter.zero, adapter);
        },
        asString(names?: string[]): string {
            let bladePart = "";
            let i = 1;
            let x = b;
            while (x !== 0) {
                if ((x & 1) !== 0) {
                    if (bladePart.length > 0) bladePart += " ^ ";
                    if (isUndefined(names) || (names === null) || (i > names.length) || (names[i - 1] == null)) {
                        bladePart = bladePart + "e" + i;
                    }
                    else {
                        bladePart = bladePart + names[i - 1];
                    }
                }
                x >>= 1;
                i++;
            }
            if (bladePart.length === 0) {
                return adapter.asString(weight);
            }
            else {
                if (adapter.isOne(weight)) {
                    return bladePart;
                }
                else {
                    return adapter.asString(weight) + " * " + bladePart;
                }
            }
        },
        toString(): string {
            return that.asString(void 0);
        }
    };
    return that;
}
