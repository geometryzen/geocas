import FieldAdapter from './FieldAdapter';

export interface Metric<T> {
    toEigenBasis(blade: Blade<T>): Blade<T>[];
    getEigenMetric(): number[];
    toMetricBasis(blades: Blade<T>[]): Blade<T>[];
}

export interface Blade<T> {
    bitmap: number;
    weight: T;
    __neg__(): Blade<T>;
    __vbar__(rhs: Blade<T>, m: number | number[] | Metric<T>): Blade<T>;
    __wedge__(rhs: Blade<T>): Blade<T>;
    grade(): number;
    reverse(): Blade<T>;
    gradeInversion(): Blade<T>;
    cliffordConjugate(): Blade<T>;
    zero(): Blade<T>;
    asString(names?: string[]): string;
    toString(): string;
}

export interface Multivector<T> {
    blades: Blade<T>[];
    __abs__(): Multivector<T>;
    __add__(rhs: Multivector<T>): Multivector<T>;
    __radd__(rhs: Multivector<T>): Multivector<T>;
    __sub__(rhs: Multivector<T>): Multivector<T>;
    __rsub__(rhs: Multivector<T>): Multivector<T>;
    __mul__(rhs: T | Multivector<T>): Multivector<T>;
    __rmul__(lhs: T | Multivector<T>): Multivector<T>;
    __div__(rhs: T | Multivector<T>): Multivector<T>;
    __lshift__(rhs: Multivector<T>): Multivector<T>;
    __rshift__(rhs: Multivector<T>): Multivector<T>;
    __vbar__(rhs: Multivector<T>): Multivector<T>;
    __wedge__(rhs: Multivector<T>): Multivector<T>;
    __eq__(rhs: Multivector<T>): boolean;
    __ge__(rhs: Multivector<T>): boolean;
    __gt__(rhs: Multivector<T>): boolean;
    __le__(rhs: Multivector<T>): boolean;
    __lt__(rhs: Multivector<T>): boolean;
    __ne__(rhs: Multivector<T>): boolean;
    __bang__(): Multivector<T>;
    __pos__(): Multivector<T>;
    __neg__(): Multivector<T>;
    __tilde__(): Multivector<T>;
    add(rhs: Multivector<T>): Multivector<T>;
    asString(names: string[]): string;
    cliffordConjugate(): Multivector<T>;
    compress(fraction?: number): Multivector<T>;
    /**
     * direction(M) = M / sqrt(M * ~M)
     */
    direction(): Multivector<T>;
    div(rhs: Multivector<T>): Multivector<T>;
    divByScalar(α: T): Multivector<T>;
    /**
     * dual(M) = M << I, where I is the pseudoscalar of the space.
     */
    dual(): Multivector<T>;
    /**
     * Returns the universal exponential function, exp, applied to this, i.e. exp(this).
     */
    exp(): Multivector<T>;
    extractGrade(grade: number): Multivector<T>;
    gradeInversion(): Multivector<T>;
    inv(): Multivector<T>;
    isZero(): boolean;
    mul(rhs: Multivector<T>): Multivector<T>;
    mulByScalar(α: T): Multivector<T>;
    neg(): Multivector<T>;
    rev(): Multivector<T>;
    scalarCoordinate(): T;
    /**
     * Returns the scalar product of this multivector with rhs, i.e. this | rhs.
     */
    scp(rhs: Multivector<T>): Multivector<T>;
    sqrt(): Multivector<T>;
    sub(rhs: Multivector<T>): Multivector<T>;
    toString(): string;
}


export interface Algebra<T> {
    ε: Multivector<T>;
    field: FieldAdapter<T>;
    one: Multivector<T>;
    zero: Multivector<T>;
    /**
     * Honoring Grassmann, who called the basis vectors "units".
     */
    unit(index: number): Multivector<T>;
    /**
     *
     */
    units: Multivector<T>[];
}
