import complex from './Complex';
import {Complex} from './Complex';
import isNumber from '../checks/isNumber';
import FieldAdapter from './FieldAdapter';
import mustBeNumber from '../checks/mustBeNumber';

const ZERO: Complex = complex(0, 0);

export default class ComplexFieldAdapter implements FieldAdapter<Complex> {
    private _ε: Complex;
    constructor(ε = 1e-6) {
        this._ε = complex(mustBeNumber('ε', ε), 0);
    }
    get ε(): Complex {
        return this._ε;
    }
    abs(z: Complex): Complex {
        return z.__abs__();
    }
    add(lhs: Complex, rhs: Complex): Complex {
        return lhs.__add__(rhs);
    }
    eq(lhs: Complex, rhs: Complex): boolean {
        return lhs.x === rhs.x && lhs.y === rhs.y;
    }
    ne(lhs: Complex, rhs: Complex): boolean {
        return lhs.x !== rhs.x || lhs.y !== rhs.y;
    }
    le(lhs: Complex, rhs: Complex): boolean {
        return lhs.x <= rhs.x;
    }
    lt(lhs: Complex, rhs: Complex): boolean {
        return lhs.x < rhs.x;
    }
    ge(lhs: Complex, rhs: Complex): boolean {
        return lhs.x >= rhs.x;
    }
    gt(lhs: Complex, rhs: Complex): boolean {
        return lhs.x > rhs.x;
    }
    sub(lhs: Complex, rhs: Complex): Complex {
        return lhs.__sub__(rhs);
    }
    max(lhs: Complex, rhs: Complex): Complex {
        return (lhs.x >= rhs.x) ? lhs : rhs;
    }
    min(lhs: Complex, rhs: Complex): Complex {
        return (lhs.x <= rhs.x) ? lhs : rhs;
    }
    mul(lhs: Complex, rhs: Complex): Complex {
        return lhs.__mul__(rhs);
    }
    mulByNumber(arg: Complex, α: number): Complex {
        return arg.__mul__(α);
    }
    div(lhs: Complex, rhs: Complex): Complex {
        return lhs.__div__(rhs);
    }
    neg(z: Complex): Complex {
        return z.__neg__();
    }
    asString(z: Complex): string {
        return z.toString();
    }
    cos(z: Complex): Complex {
        return z.__cos__();
    }
    isField(z: Complex): z is Complex {
        return isNumber(z.x) && isNumber(z.y);
    }
    isOne(z: Complex): boolean {
        return z.x === 1 && z.y === 0;
    }
    isZero(z: Complex): boolean {
        return z.x === 0 && z.y === 0;
    }
    get one(): Complex {
        return complex(1, 0);
    }
    sin(z: Complex): Complex {
        return z.__sin__();
    }
    sqrt(z: Complex): Complex {
        if (z.x === 0) {
            if (z.y === 0) {
                return ZERO;
            }
            else {
                throw new Error(`TODO: sqrt${z.toString()}`);
            }
        }
        else {
            if (z.y === 0) {
                if (z.x > 0) {
                    return complex(Math.sqrt(z.x), 0);
                }
                else {
                    return complex(0, Math.sqrt(-z.x));
                }
            }
            else {
                throw new Error(`TODO: sqrt${z.toString()}`);
            }
        }
    }
    get zero(): Complex {
        return ZERO;
    }
}
