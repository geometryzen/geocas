import { mustBeNumber } from '../checks/mustBeNumber';
import { FieldAdapter } from './FieldAdapter';

export class NumberFieldAdapter implements FieldAdapter<number> {
    private _ε: number;
    constructor(ε = 1e-6) {
        this._ε = mustBeNumber('ε', ε);
    }
    get ε() {
        return this._ε;
    }
    abs(arg: number): number {
        return Math.abs(arg);
    }
    add(lhs: number, rhs: number): number {
        return lhs + rhs;
    }
    eq(lhs: number, rhs: number): boolean {
        return lhs === rhs;
    }
    ne(lhs: number, rhs: number): boolean {
        return lhs !== rhs;
    }
    le(lhs: number, rhs: number): boolean {
        return lhs <= rhs;
    }
    lt(lhs: number, rhs: number): boolean {
        return lhs < rhs;
    }
    ge(lhs: number, rhs: number): boolean {
        return lhs >= rhs;
    }
    gt(lhs: number, rhs: number): boolean {
        return lhs > rhs;
    }
    sub(lhs: number, rhs: number): number {
        return lhs - rhs;
    }
    max(lhs: number, rhs: number): number {
        return Math.max(lhs, rhs);
    }
    min(lhs: number, rhs: number): number {
        return Math.min(lhs, rhs);
    }
    mul(lhs: number, rhs: number): number {
        return lhs * rhs;
    }
    mulByNumber(arg: number, alpha: number): number {
        return arg * alpha;
    }
    div(lhs: number, rhs: number): number {
        return lhs / rhs;
    }
    neg(arg: number): number {
        return -arg;
    }
    asString(arg: number): string {
        return arg.toString();
    }
    cos(arg: number): number {
        return Math.cos(arg);
    }
    isField(arg: number): arg is number {
        return typeof arg === 'number';
    }
    isOne(arg: number): boolean {
        return arg === 1;
    }
    isZero(arg: number): boolean {
        return arg === 0;
    }
    get one(): number {
        return 1;
    }
    sin(arg: number): number {
        return Math.sin(arg);
    }
    sqrt(arg: number): number {
        return Math.sqrt(arg);
    }
    get zero(): number {
        return 0;
    }
}
