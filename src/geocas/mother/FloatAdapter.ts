import FieldAdapter from './FieldAdapter';
import Float from './Float';

export default class FloatAdapter implements FieldAdapter<Float> {
    abs(arg: Float): number {
        return Math.abs(arg.value);
    }
    add(lhs: Float, rhs: Float): Float {
        return new Float(lhs.value + rhs.value);
    }
    sub(lhs: Float, rhs: Float): Float {
        return new Float(lhs.value - rhs.value);
    }
    mul(lhs: Float, rhs: Float): Float {
        return new Float(lhs.value * rhs.value);
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
    isField(arg: any): arg is Float {
        return arg instanceof Float;
    }
    isOne(arg: any): boolean {
        return arg.value === 1;
    }
    isZero(arg: any): boolean {
        return arg.value === 0;
    }
    one(): Float {
        return new Float(1);
    }
    scale(arg: Float, multiplier: number): Float {
        return new Float(arg.value * multiplier);
    }
    sin(arg: Float): Float {
        return new Float(Math.sin(arg.value));
    }
    sqrt(arg: Float): Float {
        return new Float(Math.sqrt(arg.value));
    }
    zero(): Float {
        return new Float(0);
    }
}
