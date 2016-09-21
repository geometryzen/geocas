
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
import isNumber from '../checks/isNumber';
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
    __add__(rhs: Multivector<T>): Multivector<T>;
    __sub__(rhs: Multivector<T>): Multivector<T>;
    __mul__(rhs: T | Multivector<T>): Multivector<T>;
    __rmul__(lhs: T | Multivector<T>): Multivector<T>;
    __div__(rhs: T | Multivector<T>): Multivector<T>;
    __lshift__(rhs: Multivector<T>): Multivector<T>;
    __rshift__(rhs: Multivector<T>): Multivector<T>;
    __vbar__(rhs: Multivector<T>): Multivector<T>;
    __wedge__(rhs: Multivector<T>): Multivector<T>;
    __pos__(): Multivector<T>;
    __neg__(): Multivector<T>;
    asString(names: string[]): string;
    div(rhs: Multivector<T>): Multivector<T>;
    divByScalar(α: T): Multivector<T>;
    dual(): Multivector<T>;
    /**
     * Returns the universal exponential function, exp, applied to this, i.e. exp(this).
     */
    exp(): Multivector<T>;
    extractGrade(grade: number): Multivector<T>;
    inv(): Multivector<T>;
    mul(rhs: Multivector<T>): Multivector<T>;
    mulByScalar(α: T): Multivector<T>;
    rev(): Multivector<T>;
    scalarCoordinate(): T;
    /**
     * Returns the scalar product of this multivector with rhs, i.e. this | rhs. 
     */
    scp(rhs: Multivector<T>): T;
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

function mul<T>(lhs: T | Multivector<T>, rhs: T | Multivector<T>, metric: number | number[] | Metric<T>, adapter: FieldAdapter<T>): Multivector<T> {
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
            return mv(simplify(rez, adapter), metric, adapter);
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
export function getBasisVector<T>(index: number, metric: number | number[] | Metric<T>, adapter: FieldAdapter<T>): Multivector<T> {
    mustBeInteger('index', index);
    mustBeDefined('metric', metric);
    mustBeDefined('adapter', adapter);
    const B = blade(1 << index, adapter.one(), adapter);
    return mv<T>([B], metric, adapter);
}

/**
 * Returns a scalar Multivector.
 */
export function getScalar<T>(weight: T, metric: number | number[] | Metric<T>, adapter: FieldAdapter<T>): Multivector<T> {
    mustBeDefined('metric', metric);
    mustBeDefined('adapter', adapter);
    mustSatisfy('weight', adapter.isField(weight), () => { return `be a field value`; });
    const B = blade(0, weight, adapter);
    return mv<T>([B], metric, adapter);
}

export default function mv<T>(blades: Blade<T>[], metric: number | number[] | Metric<T>, adapter: FieldAdapter<T>) {
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
        return mv(rez, metric, adapter);
    };
    const that: Multivector<T> = {
        get blades() {
            return blades;
        },
        __add__(rhs: Multivector<T>): Multivector<T> {
            const rez: Blade<T>[] = [];
            for (let i = 0; i < blades.length; i++) {
                rez.push(blades[i]);
            }
            for (let k = 0; k < rhs.blades.length; k++) {
                rez.push(rhs.blades[k]);
            }
            return mv(simplify(rez, adapter), metric, adapter);
        },
        __sub__(rhs: Multivector<T>): Multivector<T> {
            const rez: Blade<T>[] = [];
            for (let i = 0; i < blades.length; i++) {
                rez.push(blades[i]);
            }
            for (let k = 0; k < rhs.blades.length; k++) {
                rez.push(rhs.blades[k].__neg__());
            }
            return mv(simplify(rez, adapter), metric, adapter);
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
                throw new Error("non-invertible multivector (versor inverse)");
            }
        },
        mul(rhs: Multivector<T>): Multivector<T> {
            return mul(that, rhs, metric, adapter);
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
            return mv(rez, metric, adapter);
        },
        __mul__(rhs: T | Multivector<T>): Multivector<T> {
            return mul(that, rhs, metric, adapter);
        },
        __rmul__(lhs: T | Multivector<T>): Multivector<T> {
            return mul(lhs, that, metric, adapter);
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
            return mv(simplify(rez, adapter), metric, adapter);
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
            return mv(simplify(rez, adapter), metric, adapter);
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
            return mv(simplify(rez, adapter), metric, adapter);
        },
        __pos__(): Multivector<T> {
            return that;
        },
        __neg__(): Multivector<T> {
            const rez: Blade<T>[] = [];
            for (let i = 0; i < blades.length; i++) {
                const B = blades[i];
                rez.push(B.__neg__());
            }
            return mv(rez, metric, adapter);
        },
        exp(): Multivector<T> {
            // TODO: Optimize and Generalize.
            const B = extractGrade(2);
            const Brev = B.rev();
            const θ = adapter.sqrt(B.__vbar__(Brev).scalarCoordinate());
            const i = B.divByScalar(θ);
            const cosθ = mv([blade(0, adapter.cos(θ), adapter)], metric, adapter);
            const sinθ = mv([blade(0, adapter.sin(θ), adapter)], metric, adapter);
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
            return mv(rez, metric, adapter);
        },
        dual(): Multivector<T> {
            const n = dim(metric);
            const I = mv([blade((1 << n) - 1, adapter.one(), adapter)], metric, adapter);
            return that.__lshift__(I);
        },
        rev(): Multivector<T> {
            const rez: Blade<T>[] = [];
            for (let i = 0; i < blades.length; i++) {
                const B = blades[i];
                rez.push(B.reverse());
            }
            return mv(rez, metric, adapter);
        },
        scalarCoordinate(): T {
            for (let i = 0; i < blades.length; i++) {
                const B = blades[i];
                if (B.bitmap === 0) {
                    return B.weight;
                }
            }
            return adapter.zero();
        },
        scp(rhs: Multivector<T>): T {
            return that.__vbar__(rhs).scalarCoordinate();
        },
        asString(names: string[]): string {
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
            return that.asString(void 0);
        }
    };
    return that;
}
