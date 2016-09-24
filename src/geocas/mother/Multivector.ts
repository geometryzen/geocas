
import {Blade} from './Blade';
import blade from './Blade';
import gpE from './gpE';
import gpL from './gpL';
import gpG from './gpG';
import lcoE from './lcoE';
import lcoL from './lcoL';
import lcoG from './lcoG';
import rcoE from './rcoE';
import rcoL from './rcoL';
import rcoG from './rcoG';
import isArray from '../checks/isArray';
import isDefined from '../checks/isDefined';
import isNumber from '../checks/isNumber';
import isString from '../checks/isString';
import isUndefined from '../checks/isUndefined';
import {Metric} from './Blade';
import mustBeDefined from '../checks/mustBeDefined';
import mustBeInteger from '../checks/mustBeInteger';
import mustSatisfy from '../checks/mustSatisfy';
import simplify from './simplify';
import FieldAdapter from './FieldAdapter';

/**
 * The JavaScript Bitwise operators use 32-bit signed numbers.
 * &  AND
 * |  OR
 * ~  NOT
 * ^  XOR
 * << Left shift (LHS is what is shifted, RHS is number of bits)
 * >> Right shift
 */

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

function isMultivector<T>(arg: any): arg is Multivector<T> {
    if (arg) {
        return typeof arg['extractGrade'] === 'function';
    }
    else {
        return false;
    }
}

function isMetric(arg: Metric<any>): arg is Metric<any> {
    return typeof arg.getEigenMetric === 'function';
}

/**
 * Computes the dimension of the vector space from the metric.
 */
function dim<T>(metric: number | number[] | Metric<T>): number {
    if (isNumber(metric)) {
        return metric;
    }
    else if (isArray(metric)) {
        return metric.length;
    }
    else if (isUndefined(metric)) {
        throw new Error("metric is undefined");
    }
    else if (isMetric(metric)) {
        return metric.getEigenMetric().length;
    }
    else {
        throw new Error("metric is undefined");
    }
}

function add<T>(lhs: T | Multivector<T>, rhs: T | Multivector<T>, metric: number | number[] | Metric<T>, adapter: FieldAdapter<T>, labels: string[]): Multivector<T> {
    if (adapter.isField(lhs) && isMultivector(rhs)) {
        const rez: Blade<T>[] = [];
        rez.push(blade(0, lhs, adapter));
        for (let k = 0; k < rhs.blades.length; k++) {
            rez.push(rhs.blades[k]);
        }
        return mv(simplify(rez, adapter), metric, adapter, labels);
    }
    else if (isMultivector(lhs) && adapter.isField(rhs)) {
        const rez: Blade<T>[] = [];
        rez.push(blade(0, rhs, adapter));
        for (let k = 0; k < lhs.blades.length; k++) {
            rez.push(lhs.blades[k]);
        }
        return mv(simplify(rez, adapter), metric, adapter, labels);
    }
    else {
        if (isMultivector(lhs) && isMultivector(rhs)) {
            const rez: Blade<T>[] = [];
            for (let i = 0; i < lhs.blades.length; i++) {
                rez.push(lhs.blades[i]);
            }
            for (let k = 0; k < rhs.blades.length; k++) {
                rez.push(rhs.blades[k]);
            }
            return mv(simplify(rez, adapter), metric, adapter, labels);
        }
        else {
            // We'll be using this function for operator overloading.
            return void 0;
        }
    }
}

function sub<T>(lhs: T | Multivector<T>, rhs: T | Multivector<T>, metric: number | number[] | Metric<T>, adapter: FieldAdapter<T>, labels: string[]): Multivector<T> {
    if (adapter.isField(lhs) && isMultivector(rhs)) {
        const rez: Blade<T>[] = [];
        rez.push(blade(0, lhs, adapter));
        for (let k = 0; k < rhs.blades.length; k++) {
            rez.push(rhs.blades[k].__neg__());
        }
        return mv(simplify(rez, adapter), metric, adapter, labels);
    }
    else if (isMultivector(lhs) && adapter.isField(rhs)) {
        const rez: Blade<T>[] = [];
        rez.push(blade(0, adapter.neg(rhs), adapter));
        for (let k = 0; k < lhs.blades.length; k++) {
            rez.push(lhs.blades[k]);
        }
        return mv(simplify(rez, adapter), metric, adapter, labels);
    }
    else {
        if (isMultivector(lhs) && isMultivector(rhs)) {
            const rez: Blade<T>[] = [];
            for (let i = 0; i < lhs.blades.length; i++) {
                rez.push(lhs.blades[i]);
            }
            for (let k = 0; k < rhs.blades.length; k++) {
                rez.push(rhs.blades[k].__neg__());
            }
            return mv(simplify(rez, adapter), metric, adapter, labels);
        }
        else {
            // We'll be using this function for operator overloading.
            return void 0;
        }
    }
}

function mul<T>(lhs: T | Multivector<T>, rhs: T | Multivector<T>, metric: number | number[] | Metric<T>, adapter: FieldAdapter<T>, labels: string[]): Multivector<T> {
    if (adapter.isField(lhs) && isMultivector(rhs)) {
        return rhs.mulByScalar(lhs);
    }
    else if (isMultivector(lhs) && adapter.isField(rhs)) {
        return lhs.mulByScalar(rhs);
    }
    else {
        if (isMultivector(lhs) && isMultivector(rhs)) {
            const rez: Blade<T>[] = [];
            for (let i = 0; i < lhs.blades.length; i++) {
                const B1 = lhs.blades[i];
                for (let k = 0; k < rhs.blades.length; k++) {
                    const B2 = rhs.blades[k];
                    if (isNumber(metric)) {
                        const B = gpE(B1, B2, adapter);
                        rez.push(B);
                    }
                    else if (isArray(metric)) {
                        const B = gpL(B1, B2, <number[]>metric, adapter);
                        rez.push(B);
                    }
                    else {
                        const B = gpG(B1, B2, <Metric<T>>metric, adapter);
                        for (let b = 0; b < B.length; b++) {
                            rez.push(B[b]);
                        }
                    }
                }
            }
            return mv(simplify(rez, adapter), metric, adapter, labels);
        }
        else {
            // We'll be using this function for operator overloading.
            return void 0;
        }
    }
}

function div<T>(lhs: T | Multivector<T>, rhs: T | Multivector<T>, metric: number | number[] | Metric<T>, adapter: FieldAdapter<T>): Multivector<T> {
    if (adapter.isField(lhs) && isMultivector(rhs)) {
        throw new Error("Multivector division is not yet supported.");
    }
    else if (isMultivector(lhs) && adapter.isField(rhs)) {
        return lhs.divByScalar(rhs);
    }
    else {
        if (isMultivector(lhs) && isMultivector(rhs)) {
            throw new Error("Multivector division is not yet supported.");
        }
        else {
            // We'll be using this function for operator overloading.
            return void 0;
        }
    }
}

/**
 * Returns the basis vector with index in the integer range [0 ... dim)
 */
function getBasisVector<T>(index: number, metric: number | number[] | Metric<T>, field: FieldAdapter<T>, labels: string[]): Multivector<T> {
    mustBeInteger('index', index);
    mustBeDefined('metric', metric);
    mustBeDefined('field', field);
    const B = blade(1 << index, field.one, field);
    return mv<T>([B], metric, field, labels);
}

/**
 * Returns a scalar Multivector.
 */
function getScalar<T>(weight: T, metric: number | number[] | Metric<T>, adapter: FieldAdapter<T>, labels: string[]): Multivector<T> {
    mustBeDefined('metric', metric);
    mustBeDefined('adapter', adapter);
    mustSatisfy('weight', adapter.isField(weight), () => { return `be a field value`; });
    const B = blade(0, weight, adapter);
    return mv<T>([B], metric, adapter, labels);
}

function mv<T>(blades: Blade<T>[], metric: number | number[] | Metric<T>, adapter: FieldAdapter<T>, labels: string[]) {
    if (!isArray(blades)) {
        throw new Error("blades must be Blade<T>[]");
    }
    if (isUndefined(metric)) {
        throw new Error("metric must be defined");
    }
    if (isUndefined(adapter)) {
        throw new Error("adapter must be defined");
    }
    const extractGrade = function (grade: number): Multivector<T> {
        const rez: Blade<T>[] = [];
        for (let i = 0; i < blades.length; i++) {
            const B = blades[i];
            if (B.grade() === grade) {
                rez.push(B);
            }
        }
        return mv(rez, metric, adapter, labels);
    };
    const that: Multivector<T> = {
        get blades() {
            return blades;
        },
        __abs__(): Multivector<T> {
            return that.scp(that.rev()).sqrt();
        },
        add(rhs: Multivector<T>): Multivector<T> {
            return add(that, rhs, metric, adapter, labels);
        },
        __add__(rhs: Multivector<T>): Multivector<T> {
            return add(that, rhs, metric, adapter, labels);
        },
        __radd__(lhs: Multivector<T>): Multivector<T> {
            return add(lhs, that, metric, adapter, labels);
        },
        sub(rhs: Multivector<T>): Multivector<T> {
            return sub(that, rhs, metric, adapter, labels);
        },
        __sub__(rhs: Multivector<T>): Multivector<T> {
            return sub(that, rhs, metric, adapter, labels);
        },
        __rsub__(lhs: Multivector<T>): Multivector<T> {
            return sub(lhs, that, metric, adapter, labels);
        },
        inv(): Multivector<T> {
            // We'll start by trying the versor inverse before doing the general inverse.
            const reverse = that.rev();
            const denom = that.mul(reverse);
            // If we have a scalar, then we can compute the versor inverse
            if (denom.blades.length === 1 && denom.blades[0].bitmap === 0) {
                return reverse.divByScalar(denom.scalarCoordinate());
            }
            else {
                throw new Error(`non-invertible multivector (versor inverse) ${that}`);
            }
        },
        isZero(): boolean {
            return blades.length === 0;
        },
        mul(rhs: Multivector<T>): Multivector<T> {
            return mul(that, rhs, metric, adapter, labels);
        },
        mulByScalar(α: T): Multivector<T> {
            const rez: Blade<T>[] = [];
            for (let i = 0; i < blades.length; i++) {
                const B = blades[i];
                const scale = adapter.mul(B.weight, α);
                if (!adapter.isZero(scale)) {
                    rez.push(blade(B.bitmap, scale, adapter));
                }
            }
            return mv(rez, metric, adapter, labels);
        },
        __mul__(rhs: T | Multivector<T>): Multivector<T> {
            return mul(that, rhs, metric, adapter, labels);
        },
        __rmul__(lhs: T | Multivector<T>): Multivector<T> {
            return mul(lhs, that, metric, adapter, labels);
        },
        __div__(rhs: T | Multivector<T>): Multivector<T> {
            return div(that, rhs, metric, adapter);
        },
        __lshift__(rhs: Multivector<T>): Multivector<T> {
            const rez: Blade<T>[] = [];
            for (let i = 0; i < blades.length; i++) {
                const B1 = blades[i];
                for (let k = 0; k < rhs.blades.length; k++) {
                    const B2 = rhs.blades[k];
                    if (isNumber(metric)) {
                        const B = lcoE(B1, B2, adapter);
                        rez.push(B);
                    }
                    else if (isArray(metric)) {
                        const B = lcoL(B1, B2, <number[]>metric, adapter);
                        rez.push(B);
                    }
                    else {
                        const B = lcoG(B1, B2, <Metric<T>>metric, adapter);
                        for (let b = 0; b < B.length; b++) {
                            rez.push(B[b]);
                        }
                    }
                }
            }
            return mv(simplify(rez, adapter), metric, adapter, labels);
        },
        __rshift__(rhs: Multivector<T>): Multivector<T> {
            const rez: Blade<T>[] = [];
            for (let i = 0; i < blades.length; i++) {
                const B1 = blades[i];
                for (let k = 0; k < rhs.blades.length; k++) {
                    const B2 = rhs.blades[k];
                    if (isNumber(metric)) {
                        const B = rcoE(B1, B2, adapter);
                        rez.push(B);
                    }
                    else if (isArray(metric)) {
                        const B = rcoL(B1, B2, <number[]>metric, adapter);
                        rez.push(B);
                    }
                    else {
                        const B = rcoG(B1, B2, <Metric<T>>metric, adapter);
                        for (let b = 0; b < B.length; b++) {
                            rez.push(B[b]);
                        }
                    }
                }
            }
            return mv(simplify(rez, adapter), metric, adapter, labels);
        },
        __vbar__(rhs: Multivector<T>): Multivector<T> {
            // Use the definition of the scalar product in terms of the geometric product.
            return that.__mul__(rhs).extractGrade(0);
        },
        __wedge__(rhs: Multivector<T>): Multivector<T> {
            const rez: Blade<T>[] = [];
            for (let i = 0; i < blades.length; i++) {
                const B1 = blades[i];
                for (let k = 0; k < rhs.blades.length; k++) {
                    const B2 = rhs.blades[k];
                    const B = B1.__wedge__(B2);
                    rez.push(B);
                }
            }
            return mv(simplify(rez, adapter), metric, adapter, labels);
        },
        __bang__(): Multivector<T> {
            return that.inv();
        },
        __pos__(): Multivector<T> {
            return that;
        },
        neg(): Multivector<T> {
            const rez: Blade<T>[] = [];
            for (let i = 0; i < blades.length; i++) {
                const B = blades[i];
                rez.push(B.__neg__());
            }
            return mv(rez, metric, adapter, labels);
        },
        __neg__(): Multivector<T> {
            const rez: Blade<T>[] = [];
            for (let i = 0; i < blades.length; i++) {
                const B = blades[i];
                rez.push(B.__neg__());
            }
            return mv(rez, metric, adapter, labels);
        },
        __tilde__(): Multivector<T> {
            return that.rev();
        },
        cliffordConjugate(): Multivector<T> {
            const rez: Blade<T>[] = [];
            for (let i = 0; i < blades.length; i++) {
                const B = blades[i];
                rez.push(B.cliffordConjugate());
            }
            return mv(rez, metric, adapter, labels);
        },
        compress(fraction = 1e-12): Multivector<T> {
            let eps = adapter.mulByNumber(adapter.one, fraction);
            let max = adapter.zero;
            // Find the largest blade in absolute terms.
            for (let i = 0; i < blades.length; i++) {
                const B = blades[i];
                max = adapter.max(max, adapter.abs(B.weight));
            }
            const cutOff = adapter.mul(max, eps);
            const rez: Blade<T>[] = [];
            for (let i = 0; i < blades.length; i++) {
                const B = blades[i];
                if (adapter.ge(adapter.abs(B.weight), cutOff)) {
                    rez.push(B);
                }
            }
            return mv(rez, metric, adapter, labels);
        },
        direction(): Multivector<T> {
            const squaredNorm = that.scp(that.rev()).scalarCoordinate();
            const norm = adapter.sqrt(squaredNorm);
            if (!adapter.isZero(norm)) {
                return that.divByScalar(norm);
            }
            else {
                return that;
            }
        },
        exp(): Multivector<T> {
            // TODO: Optimize and Generalize.
            const B = extractGrade(2);
            const Brev = B.rev();
            const θ = adapter.sqrt(B.__vbar__(Brev).scalarCoordinate());
            const i = B.divByScalar(θ);
            const cosθ = mv([blade(0, adapter.cos(θ), adapter)], metric, adapter, labels);
            const sinθ = mv([blade(0, adapter.sin(θ), adapter)], metric, adapter, labels);
            return cosθ.__add__(i.__mul__(sinθ));
        },
        extractGrade,
        div(rhs: Multivector<T>): Multivector<T> {
            return that.mul(rhs.inv());
        },
        divByScalar(α: T): Multivector<T> {
            const rez: Blade<T>[] = [];
            for (let i = 0; i < blades.length; i++) {
                const B = blades[i];
                const scale = adapter.div(B.weight, α);
                if (!adapter.isZero(scale)) {
                    rez.push(blade(B.bitmap, scale, adapter));
                }
            }
            return mv(rez, metric, adapter, labels);
        },
        dual(): Multivector<T> {
            const n = dim(metric);
            const I = mv([blade((1 << n) - 1, adapter.one, adapter)], metric, adapter, labels);
            return that.__lshift__(I);
        },
        gradeInversion(): Multivector<T> {
            const rez: Blade<T>[] = [];
            for (let i = 0; i < blades.length; i++) {
                const B = blades[i];
                rez.push(B.gradeInversion());
            }
            return mv(rez, metric, adapter, labels);
        },
        rev(): Multivector<T> {
            const rez: Blade<T>[] = [];
            for (let i = 0; i < blades.length; i++) {
                const B = blades[i];
                rez.push(B.reverse());
            }
            return mv(rez, metric, adapter, labels);
        },
        scalarCoordinate(): T {
            for (let i = 0; i < blades.length; i++) {
                const B = blades[i];
                if (B.bitmap === 0) {
                    return B.weight;
                }
            }
            return adapter.zero;
        },
        scp(rhs: Multivector<T>): Multivector<T> {
            return that.__vbar__(rhs);
        },
        sqrt(): Multivector<T> {
            const rez: Blade<T>[] = [];
            for (let i = 0; i < blades.length; i++) {
                const B = blades[i];
                if (B.bitmap === 0) {
                    rez.push(blade(B.bitmap, adapter.sqrt(B.weight), adapter));
                }
                else {
                    throw new Error(`sqrt on arbitrary multivectors is not yet supported.`);
                }
            }
            return mv(rez, metric, adapter, labels);
        },
        asString(names: string[]): string {

            checkBasisLabels('names', names, dim(metric));

            if (blades.length === 0) {
                return "0";
            }
            else {
                let result = "";
                for (let i = 0; i < blades.length; i++) {
                    const B = blades[i];
                    const s = B.asString(names);
                    if (i === 0) {
                        result += s;
                    }
                    else {
                        // TODO: Fix this hackery...
                        if (s.charAt(0) === '-') {
                            result += ' - ';
                            result += s.substring(1);
                        }
                        else {
                            result += ' + ';
                            result += s;
                        }
                    }
                }
                return result;
            }
        },
        toString(): string {
            return that.asString(labels);
        }
    };
    return that;
}

export interface Algebra<T> {
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

/**
 * Verify that the basis vector labels are strings and that there are the correct number.
 */
function checkBasisLabels(name: string, labels: string[], n: number): void {
    if (isDefined(labels)) {
        if (isArray(labels)) {
            if (labels.length !== n) {
                throw new Error(`${name}.length must match the dimensionality of the vector space.`);
            }
            for (let i = 0; i < labels.length; i++) {
                const label = labels[i];
                if (!isString(label)) {
                    throw new Error(`${name}[${i}] must be a string.`);
                }
            }
        }
        else {
            throw new Error(`${name} must be a string[]`);
        }
    }
}

export function algebra<T>(metric: number | number[] | Metric<T>, field: FieldAdapter<T>, labels?: string[]): Algebra<T> {
    mustBeDefined('metric', metric);
    const n = dim(metric);

    mustBeDefined('field', field);

    checkBasisLabels('labels', labels, n);

    const scalarOne = getScalar(field.one, metric, field, labels);
    const scalarZero = getScalar(field.zero, metric, field, labels);

    /**
     * A cache of the basis vectors.
     */
    const basisVectors: Multivector<T>[] = [];
    for (let i = 0; i < n; i++) {
        basisVectors[i] = getBasisVector(i, metric, field, labels);
    }

    const that: Algebra<T> = {
        get field() {
            return field;
        },
        get one() {
            return scalarOne;
        },
        get zero() {
            return scalarZero;
        },
        unit(index: number) {
            mustBeInteger('index', index);
            if (index >= 0 && index < n) {
                return basisVectors[index];
            }
            else {
                throw new Error(`index must be in range [0 ... ${n - 1})`);
            }
        },
        get units(): Multivector<T>[] {
            // For safety, return a copy of the cached array of basis vectors.
            return basisVectors.map(x => x);
        }
    };
    return that;
}

