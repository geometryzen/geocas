export interface FieldAdapter<T> {
    ε: T;
    one: T;
    zero: T;
    abs(arg: T): T;
    add(lhs: T, rhs: T): T;
    sub(lhs: T, rhs: T): T;
    eq(lhs: T, rhs: T): boolean;
    ne(lhs: T, rhs: T): boolean;
    le(lhs: T, rhs: T): boolean;
    lt(lhs: T, rhs: T): boolean;
    ge(lhs: T, rhs: T): boolean;
    gt(lhs: T, rhs: T): boolean;
    max(lhs: T, rhs: T): T;
    min(lhs: T, rhs: T): T;
    mul(lhs: T, rhs: T): T;
    mulByNumber(arg: T, alpha: number): T;
    div(lhs: T, rhs: T): T;
    neg(arg: T): T;
    asString(arg: T): string;
    cos(arg: T): T;
    isField(arg: unknown): arg is T;
    isOne(arg: T): boolean;
    isZero(arg: T): boolean;
    sin(arg: T): T;
    sqrt(arg: T): T;
}
