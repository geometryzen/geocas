import FieldAdapter from './FieldAdapter';

export default class NumberFieldAdapter implements FieldAdapter<number> {
    add(lhs: number, rhs: number): number {
        return lhs + rhs;
    }
    sub(lhs: number, rhs: number): number {
        return lhs - rhs;
    }
    mul(lhs: number, rhs: number): number {
        return lhs * rhs;
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
    one(): number {
        return 1;
    }
    scale(arg: number, alpha: number): number {
        return arg * alpha;
    }
    sin(arg: number): number {
        return Math.sin(arg);
    }
    sqrt(arg: number): number {
        return Math.sqrt(arg);
    }
    zero(): number {
        return 0;
    }
}
