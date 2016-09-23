interface FieldAdapter<T> {
    one: T;
    zero: T;
    abs(arg: T): T;
    add(lhs: T, rhs: T): T;
    sub(lhs: T, rhs: T): T;
    le(lhs: T, rhs: T): boolean;
    lt(lhs: T, rhs: T): boolean;
    ge(lhs: T, rhs: T): boolean;
    gt(lhs: T, rhs: T): boolean;
    max(lhs: T, rhs: T): T;
    mul(lhs: T, rhs: T): T;
    mulByNumber(arg: T, alpha: number): T;
    div(lhs: T, rhs: T): T;
    neg(arg: T): T;
    asString(arg: T): string;
    cos(arg: T): T;
    isField(arg: any): arg is T;
    isOne(arg: T): boolean;
    isZero(arg: T): boolean;
    sin(arg: T): T;
    sqrt(arg: T): T;
}

export default FieldAdapter;
