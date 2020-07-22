interface Env {
    g(u: BasisBladeExpr, v: BasisBladeExpr): ScalarExpr;
    bladeName(vectors: number[]): string;
}
export declare class Expr {
    env: Env;
    type: string;
    constructor(env: Env, type: string);
    isChanged(): boolean;
    copy(dirty: boolean): Expr;
    reset(): Expr;
    simplify(): Expr;
    toPrefix(): string;
    toString(): string;
    __add__(rhs: Expr | number): Expr;
    __radd__(lhs: Expr | number): Expr;
    __sub__(rhs: Expr | number): Expr;
    __rsub__(lhs: Expr | number): Expr;
    __mul__(rhs: number | Expr): Expr;
    __rmul__(lhs: Expr | number): Expr;
    __div__(rhs: number | Expr): Expr;
    __rdiv__(lhs: Expr | number): Expr;
    __vbar__(rhs: Expr | number): Expr;
    __rvbar__(lhs: Expr | number): Expr;
    __lshift__(rhs: Expr | number): Expr;
    __rlshift__(lhs: Expr | number): Expr;
    __rshift__(rhs: Expr | number): Expr;
    __rrshift__(lhs: Expr | number): Expr;
    __wedge__(rhs: Expr | number): WedgeExpr;
    __rwedge__(lhs: Expr | number): Expr;
    __tilde__(): Expr;
    __bang__(): Expr;
    __neg__(): Expr;
    __pos__(): Expr;
}
export declare class BinaryExpr extends Expr {
    lhs: Expr;
    rhs: Expr;
    constructor(lhs: Expr, rhs: Expr, type: string);
}
export declare class AddExpr extends BinaryExpr {
    dirty: boolean;
    constructor(lhs: Expr, rhs: Expr, dirty?: boolean);
    isChanged(): boolean;
    copy(dirty: boolean): Expr;
    reset(): Expr;
    simplify(): Expr;
    toPrefix(): string;
    toString(): string;
}
export declare class SubExpr extends BinaryExpr {
    dirty: boolean;
    constructor(lhs: Expr, rhs: Expr, dirty?: boolean);
    isChanged(): boolean;
    copy(dirty: boolean): Expr;
    reset(): Expr;
    simplify(): Expr;
    toPrefix(): string;
    toString(): string;
}
export declare class MultiplyExpr extends BinaryExpr {
    dirty: boolean;
    constructor(lhs: Expr, rhs: Expr, dirty?: boolean);
    isChanged(): boolean;
    copy(dirty: boolean): Expr;
    reset(): Expr;
    simplify(): Expr;
    toPrefix(): string;
    toString(): string;
}
export declare class DivideExpr extends BinaryExpr {
    dirty: boolean;
    constructor(lhs: Expr, rhs: Expr, dirty?: boolean);
    isChanged(): boolean;
    copy(dirty: boolean): Expr;
    reset(): Expr;
    simplify(): Expr;
    toPrefix(): string;
    toString(): string;
}
export declare class LContractExpr extends BinaryExpr {
    dirty: boolean;
    constructor(lhs: Expr, rhs: Expr, dirty?: boolean);
    isChanged(): boolean;
    copy(dirty: boolean): Expr;
    reset(): Expr;
    simplify(): Expr;
    toPrefix(): string;
    toString(): string;
}
export declare class RContractExpr extends BinaryExpr {
    dirty: boolean;
    constructor(lhs: Expr, rhs: Expr, dirty?: boolean);
    isChanged(): boolean;
    copy(dirty: boolean): Expr;
    reset(): Expr;
    simplify(): Expr;
    toPrefix(): string;
    toString(): string;
}
/**
 * A blade is the outer (wedge) product of a list of vectors.
 * An empty list of vectors corresponds to the unit scalar.
 */
export declare class BasisBladeExpr extends Expr {
    vectors: number[];
    dirty: boolean;
    constructor(env: Env, vectors: number[], dirty?: boolean);
    isChanged(): boolean;
    copy(dirty: boolean): BasisBladeExpr;
    reset(): BasisBladeExpr;
    simplify(): Expr;
    toPrefix(): string;
    toString(): string;
}
export declare class ScalarExpr extends Expr {
    value: number | string;
    dirty: boolean;
    constructor(env: Env, value: number | string, dirty?: boolean);
    isChanged(): boolean;
    copy(dirty: boolean): Expr;
    reset(): Expr;
    simplify(): Expr;
    toPrefix(): string;
    toPrefixLong(): string;
    toString(): string;
}
export declare class VBarExpr extends BinaryExpr {
    dirty: boolean;
    constructor(lhs: Expr, rhs: Expr, dirty?: boolean);
    isChanged(): boolean;
    reset(): Expr;
    simplify(): Expr;
    toPrefix(): string;
    toString(): string;
}
export declare class WedgeExpr extends BinaryExpr {
    dirty: boolean;
    constructor(lhs: Expr, rhs: Expr, dirty?: boolean);
    isChanged(): boolean;
    reset(): Expr;
    simplify(): Expr;
    toPrefix(): string;
    toString(): string;
}
export declare class ReverseExpr extends Expr {
    inner: Expr;
    dirty: boolean;
    constructor(inner: Expr, dirty?: boolean);
    isChanged(): boolean;
    copy(dirty: boolean): ReverseExpr;
    reset(): ReverseExpr;
    simplify(): Expr;
    toPrefix(): string;
    toString(): string;
}
export declare class InverseExpr extends Expr {
    inner: Expr;
    dirty: boolean;
    constructor(inner: Expr, dirty?: boolean);
    isChanged(): boolean;
    copy(dirty: boolean): InverseExpr;
    reset(): InverseExpr;
    simplify(): Expr;
    toPrefix(): string;
    toString(): string;
}
export declare class NegExpr extends Expr {
    inner: Expr;
    dirty: boolean;
    constructor(inner: Expr, dirty?: boolean);
    isChanged(): boolean;
    copy(dirty: boolean): NegExpr;
    reset(): NegExpr;
    simplify(): Expr;
    toPrefix(): string;
    toString(): string;
}
export declare class PosExpr extends Expr {
    inner: Expr;
    dirty: boolean;
    constructor(inner: Expr, dirty?: boolean);
    isChanged(): boolean;
    copy(dirty: boolean): PosExpr;
    reset(): PosExpr;
    simplify(): Expr;
    toPrefix(): string;
    toString(): string;
}
export default class Algebra implements Env {
    basis: BasisBladeExpr[];
    private _metric;
    private _bnames;
    constructor(g: number[][], unused?: string[]);
    bladeName(vectors: number[]): string;
    g(u: BasisBladeExpr, v: BasisBladeExpr): ScalarExpr;
    scalar(value: number | string): Expr;
    simplify(expr: Expr): Expr;
}
export {};
