import FieldAdapter from './FieldAdapter';

export default class NumberFieldAdapter implements FieldAdapter<number> {
    abs(arg: number): number {
        return Math.abs(arg);
    }
    add(lhs: number, rhs: number): number {
        return lhs + rhs;
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
    isField(arg: any): arg is number {
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
