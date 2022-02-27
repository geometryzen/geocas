import { mustBeNumber } from '../checks/mustBeNumber';
import { FieldAdapter } from './FieldAdapter';
import { Float } from './Float';

export class FloatAdapter implements FieldAdapter<Float> {
    private _ε: Float;
    constructor(ε = 1e-6) {
        this._ε = new Float(mustBeNumber('ε', ε));
    }
    get ε(): Float {
        return this._ε;
    }
    abs(arg: Float): Float {
        return new Float(Math.abs(arg.value));
    }
    add(lhs: Float, rhs: Float): Float {
        return new Float(lhs.value + rhs.value);
    }
    sub(lhs: Float, rhs: Float): Float {
        return new Float(lhs.value - rhs.value);
    }
    eq(lhs: Float, rhs: Float): boolean {
        return lhs.value === rhs.value;
    }
    ne(lhs: Float, rhs: Float): boolean {
        return lhs.value !== rhs.value;
    }
    le(lhs: Float, rhs: Float): boolean {
        return lhs.value <= rhs.value;
    }
    lt(lhs: Float, rhs: Float): boolean {
        return lhs.value < rhs.value;
    }
    ge(lhs: Float, rhs: Float): boolean {
        return lhs.value >= rhs.value;
    }
    gt(lhs: Float, rhs: Float): boolean {
        return lhs.value > rhs.value;
    }
    max(lhs: Float, rhs: Float): Float {
        return lhs.value >= rhs.value ? lhs : rhs;
    }
    min(lhs: Float, rhs: Float): Float {
        return lhs.value <= rhs.value ? lhs : rhs;
    }
    mul(lhs: Float, rhs: Float): Float {
        return new Float(lhs.value * rhs.value);
    }
    mulByNumber(arg: Float, multiplier: number): Float {
        return new Float(arg.value * multiplier);
    }
    div(lhs: Float, rhs: Float): Float {
        return new Float(lhs.value / rhs.value);
    }
    neg(arg: Float): Float {
        return new Float(-arg.value);
    }
    asString(arg: Float): string {
        return arg.value.toString();
    }
    cos(arg: Float): Float {
        return new Float(Math.cos(arg.value));
    }
    isField(arg: Float): arg is Float {
        return arg instanceof Float;
    }
    isOne(arg: Float): boolean {
        return arg.value === 1;
    }
    isZero(arg: Float): boolean {
        return arg.value === 0;
    }
    get one(): Float {
        return new Float(1);
    }
    sin(arg: Float): Float {
        return new Float(Math.sin(arg.value));
    }
    sqrt(arg: Float): Float {
        return new Float(Math.sqrt(arg.value));
    }
    get zero(): Float {
        return new Float(0);
    }
}
