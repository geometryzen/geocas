interface FieldAdapter<T> {
    abs(arg: T): number;
    add(lhs: T, rhs: T): T;
    sub(lhs: T, rhs: T): T;
    mul(lhs: T, rhs: T): T;
    div(lhs: T, rhs: T): T;
    neg(arg: T): T;
    asString(arg: T): string;
    cos(arg: T): T;
    isField(arg: any): arg is T;
    isOne(arg: T): boolean;
    isZero(arg: T): boolean;
    one(): T;
    scale(arg: T, alpha: number): T;
    sin(arg: T): T;
    sqrt(arg: T): T;
    zero(): T;
}

export default FieldAdapter;
