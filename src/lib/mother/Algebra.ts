import { Blade } from './Multivector';
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
import isScalar from './isScalar';
import isString from '../checks/isString';
import isUndefined from '../checks/isUndefined';
import { Metric } from './Multivector';
import multivectorEQ from './multivectorEQ';
import multivectorGE from './multivectorGE';
import multivectorGT from './multivectorGT';
import multivectorLE from './multivectorLE';
import multivectorLT from './multivectorLT';
import { Algebra, Multivector } from './Multivector';
import mustBeDefined from '../checks/mustBeDefined';
import mustBeInteger from '../checks/mustBeInteger';
import mustSatisfy from '../checks/mustSatisfy';
import simplify from './simplify';
import FieldAdapter from './FieldAdapter';

type METRIC<T> = number | number[] | Metric<T>;

/**
 * The JavaScript Bitwise operators use 32-bit signed numbers.
 * &  AND
 * |  OR
 * ~  NOT
 * ^  XOR
 * << Left shift (LHS is what is shifted, RHS is number of bits)
 * >> Right shift
 */

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

function add<T>(lhs: T | Multivector<T>, rhs: T | Multivector<T>, algebra: Algebra<T>, metric: METRIC<T>, labels: string[]): Multivector<T> {
    const field = algebra.field;
    if (field.isField(lhs) && isMultivector(rhs)) {
        const rez: Blade<T>[] = [];
        rez.push(blade(0, lhs, field));
        for (let k = 0; k < rhs.blades.length; k++) {
            rez.push(rhs.blades[k]);
        }
        return mv(simplify(rez, field), algebra, metric, labels);
    }
    else if (isMultivector(lhs) && field.isField(rhs)) {
        const rez: Blade<T>[] = [];
        rez.push(blade(0, rhs, field));
        for (let k = 0; k < lhs.blades.length; k++) {
            rez.push(lhs.blades[k]);
        }
        return mv(simplify(rez, field), algebra, metric, labels);
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
            return mv(simplify(rez, field), algebra, metric, labels);
        }
        else {
            // We'll be using this function for operator overloading.
            return void 0;
        }
    }
}

function sub<T>(lhs: T | Multivector<T>, rhs: T | Multivector<T>, algebra: Algebra<T>, metric: METRIC<T>, labels: string[]): Multivector<T> {
    const field = algebra.field;
    if (field.isField(lhs) && isMultivector(rhs)) {
        const rez: Blade<T>[] = [];
        rez.push(blade(0, lhs, field));
        for (let k = 0; k < rhs.blades.length; k++) {
            rez.push(rhs.blades[k].__neg__());
        }
        return mv(simplify(rez, field), algebra, metric, labels);
    }
    else if (isMultivector(lhs) && field.isField(rhs)) {
        const rez: Blade<T>[] = [];
        rez.push(blade(0, field.neg(rhs), field));
        for (let k = 0; k < lhs.blades.length; k++) {
            rez.push(lhs.blades[k]);
        }
        return mv(simplify(rez, field), algebra, metric, labels);
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
            return mv(simplify(rez, field), algebra, metric, labels);
        }
        else {
            // We'll be using this function for operator overloading.
            return void 0;
        }
    }
}

function mul<T>(lhs: T | Multivector<T>, rhs: T | Multivector<T>, algebra: Algebra<T>, metric: METRIC<T>, labels: string[]): Multivector<T> {
    const field = algebra.field;
    if (field.isField(lhs) && isMultivector(rhs)) {
        return rhs.mulByScalar(lhs);
    }
    else if (isMultivector(lhs) && field.isField(rhs)) {
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
                        const B = gpE(B1, B2, field);
                        rez.push(B);
                    }
                    else if (isArray(metric)) {
                        const B = gpL(B1, B2, <number[]>metric, field);
                        rez.push(B);
                    }
                    else {
                        const B = gpG(B1, B2, <Metric<T>>metric, field);
                        for (let b = 0; b < B.length; b++) {
                            rez.push(B[b]);
                        }
                    }
                }
            }
            return mv(simplify(rez, field), algebra, metric, labels);
        }
        else {
            // We'll be using this function for operator overloading.
            return void 0;
        }
    }
}

function div<T>(lhs: T | Multivector<T>, rhs: T | Multivector<T>, algebra: Algebra<T>): Multivector<T> {
    const field = algebra.field;
    if (field.isField(lhs) && isMultivector(rhs)) {
        throw new Error(`Multivector division is not yet supported. ${lhs} / ${rhs}`);
    }
    else if (isMultivector(lhs) && field.isField(rhs)) {
        return lhs.divByScalar(rhs);
    }
    else {
        if (isMultivector(lhs) && isMultivector(rhs)) {
            if (isScalar(rhs)) {
                return lhs.divByScalar(rhs.scalarCoordinate());
            }
            else {
                throw new Error(`Multivector division is not yet supported. ${lhs} / ${rhs}`);
            }
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
function getBasisVector<T>(index: number, algebra: Algebra<T>, metric: METRIC<T>, labels: string[]): Multivector<T> {
    mustBeInteger('index', index);
    mustBeDefined('algebra', algebra);
    const field = algebra.field;
    const B = blade(1 << index, field.one, field);
    return mv<T>([B], algebra, metric, labels);
}

/**
 * Returns a scalar Multivector.
 */
function getScalar<T>(weight: T, algebra: Algebra<T>, metric: METRIC<T>, labels: string[]): Multivector<T> {
    mustBeDefined('algebra', algebra);
    const field = algebra.field;
    mustSatisfy('weight', field.isField(weight), () => { return `be a field value`; });
    const B = blade(0, weight, field);
    return mv<T>([B], algebra, metric, labels);
}

function mv<T>(blades: Blade<T>[], algebra: Algebra<T>, metric: METRIC<T>, labels: string[]) {
    if (!isArray(blades)) {
        throw new Error("blades must be Blade<T>[]");
    }
    if (isUndefined(algebra)) {
        throw new Error("algebra must be defined");
    }
    // const metric = G.metric;
    const field = algebra.field;
    const extractGrade = function (grade: number): Multivector<T> {
        const rez: Blade<T>[] = [];
        for (let i = 0; i < blades.length; i++) {
            const B = blades[i];
            if (B.grade() === grade) {
                rez.push(B);
            }
        }
        return mv(rez, algebra, metric, labels);
    };
    const that: Multivector<T> = {
        get blades() {
            return blades;
        },
        __abs__(): Multivector<T> {
            return that.scp(that.rev()).sqrt();
        },
        add(rhs: Multivector<T>): Multivector<T> {
            return add(that, rhs, algebra, metric, labels);
        },
        __add__(rhs: Multivector<T>): Multivector<T> {
            return add(that, rhs, algebra, metric, labels);
        },
        __radd__(lhs: Multivector<T>): Multivector<T> {
            return add(lhs, that, algebra, metric, labels);
        },
        sub(rhs: Multivector<T>): Multivector<T> {
            return sub(that, rhs, algebra, metric, labels);
        },
        __sub__(rhs: Multivector<T>): Multivector<T> {
            return sub(that, rhs, algebra, metric, labels);
        },
        __rsub__(lhs: Multivector<T>): Multivector<T> {
            return sub(lhs, that, algebra, metric, labels);
        },
        __eq__(rhs: Multivector<T>): boolean {
            return multivectorEQ(that, rhs, field);
        },
        __ge__(rhs: Multivector<T>): boolean {
            return multivectorGE(that, rhs, field);
        },
        __gt__(rhs: Multivector<T>): boolean {
            return multivectorGT(that, rhs, field);
        },
        __le__(rhs: Multivector<T>): boolean {
            return multivectorLE(that, rhs, field);
        },
        __lt__(rhs: Multivector<T>): boolean {
            return multivectorLT(that, rhs, field);
        },
        __ne__(rhs: Multivector<T>): boolean {
            return !multivectorEQ(that, rhs, field);
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
            return mul(that, rhs, algebra, metric, labels);
        },
        mulByScalar(α: T): Multivector<T> {
            const rez: Blade<T>[] = [];
            for (let i = 0; i < blades.length; i++) {
                const B = blades[i];
                const scale = field.mul(B.weight, α);
                if (!field.isZero(scale)) {
                    rez.push(blade(B.bitmap, scale, field));
                }
            }
            return mv(rez, algebra, metric, labels);
        },
        __mul__(rhs: T | Multivector<T>): Multivector<T> {
            return mul(that, rhs, algebra, metric, labels);
        },
        __rmul__(lhs: T | Multivector<T>): Multivector<T> {
            return mul(lhs, that, algebra, metric, labels);
        },
        __div__(rhs: T | Multivector<T>): Multivector<T> {
            return div(that, rhs, algebra);
        },
        __lshift__(rhs: Multivector<T>): Multivector<T> {
            const rez: Blade<T>[] = [];
            for (let i = 0; i < blades.length; i++) {
                const B1 = blades[i];
                for (let k = 0; k < rhs.blades.length; k++) {
                    const B2 = rhs.blades[k];
                    if (isNumber(metric)) {
                        const B = lcoE(B1, B2, field);
                        rez.push(B);
                    }
                    else if (isArray(metric)) {
                        const B = lcoL(B1, B2, <number[]>metric, field);
                        rez.push(B);
                    }
                    else {
                        const B = lcoG(B1, B2, <Metric<T>>metric, field);
                        for (let b = 0; b < B.length; b++) {
                            rez.push(B[b]);
                        }
                    }
                }
            }
            return mv(simplify(rez, field), algebra, metric, labels);
        },
        __rshift__(rhs: Multivector<T>): Multivector<T> {
            const rez: Blade<T>[] = [];
            for (let i = 0; i < blades.length; i++) {
                const B1 = blades[i];
                for (let k = 0; k < rhs.blades.length; k++) {
                    const B2 = rhs.blades[k];
                    if (isNumber(metric)) {
                        const B = rcoE(B1, B2, field);
                        rez.push(B);
                    }
                    else if (isArray(metric)) {
                        const B = rcoL(B1, B2, metric, field);
                        rez.push(B);
                    }
                    else {
                        const B = rcoG(B1, B2, <Metric<T>>metric, field);
                        for (let b = 0; b < B.length; b++) {
                            rez.push(B[b]);
                        }
                    }
                }
            }
            return mv(simplify(rez, field), algebra, metric, labels);
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
            return mv(simplify(rez, field), algebra, metric, labels);
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
            return mv(rez, algebra, metric, labels);
        },
        __neg__(): Multivector<T> {
            const rez: Blade<T>[] = [];
            for (let i = 0; i < blades.length; i++) {
                const B = blades[i];
                rez.push(B.__neg__());
            }
            return mv(rez, algebra, metric, labels);
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
            return mv(rez, algebra, metric, labels);
        },
        compress(fraction = 1e-12): Multivector<T> {
            let eps = field.mulByNumber(field.one, fraction);
            let max = field.zero;
            // Find the largest blade in absolute terms.
            for (let i = 0; i < blades.length; i++) {
                const B = blades[i];
                max = field.max(max, field.abs(B.weight));
            }
            const cutOff = field.mul(max, eps);
            const rez: Blade<T>[] = [];
            for (let i = 0; i < blades.length; i++) {
                const B = blades[i];
                if (field.ge(field.abs(B.weight), cutOff)) {
                    rez.push(B);
                }
            }
            return mv(rez, algebra, metric, labels);
        },
        direction(): Multivector<T> {
            const squaredNorm = that.scp(that.rev()).scalarCoordinate();
            const norm = field.sqrt(squaredNorm);
            if (!field.isZero(norm)) {
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
            const θ = field.sqrt(B.__vbar__(Brev).scalarCoordinate());
            const i = B.divByScalar(θ);
            const cosθ = mv([blade(0, field.cos(θ), field)], algebra, metric, labels);
            const sinθ = mv([blade(0, field.sin(θ), field)], algebra, metric, labels);
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
                const scale = field.div(B.weight, α);
                if (!field.isZero(scale)) {
                    rez.push(blade(B.bitmap, scale, field));
                }
            }
            return mv(rez, algebra, metric, labels);
        },
        dual(): Multivector<T> {
            const n = dim(metric);
            const I = mv([blade((1 << n) - 1, field.one, field)], algebra, metric, labels);
            return that.__lshift__(I);
        },
        gradeInversion(): Multivector<T> {
            const rez: Blade<T>[] = [];
            for (let i = 0; i < blades.length; i++) {
                const B = blades[i];
                rez.push(B.gradeInversion());
            }
            return mv(rez, algebra, metric, labels);
        },
        rev(): Multivector<T> {
            const rez: Blade<T>[] = [];
            for (let i = 0; i < blades.length; i++) {
                const B = blades[i];
                rez.push(B.reverse());
            }
            return mv(rez, algebra, metric, labels);
        },
        scalarCoordinate(): T {
            for (let i = 0; i < blades.length; i++) {
                const B = blades[i];
                if (B.bitmap === 0) {
                    return B.weight;
                }
            }
            return field.zero;
        },
        scp(rhs: Multivector<T>): Multivector<T> {
            return that.__vbar__(rhs);
        },
        sqrt(): Multivector<T> {
            const rez: Blade<T>[] = [];
            for (let i = 0; i < blades.length; i++) {
                const B = blades[i];
                if (B.bitmap === 0) {
                    rez.push(blade(B.bitmap, field.sqrt(B.weight), field));
                }
                else {
                    throw new Error(`sqrt on arbitrary multivectors is not yet supported.`);
                }
            }
            return mv(rez, algebra, metric, labels);
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

    const scalars: Multivector<T>[] = [];

    /**
     * A cache of the basis vectors.
     */
    const basisVectors: Multivector<T>[] = [];

    const that: Algebra<T> = {
        get ε() {
            return scalars[2];
        },
        get field() {
            return field;
        },
        get one() {
            return scalars[1];
        },
        get zero() {
            return scalars[0];
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
    scalars[0] = getScalar(field.zero, that, metric, labels);
    scalars[1] = getScalar(field.one, that, metric, labels);
    scalars[2] = getScalar(field.ε, that, metric, labels);
    for (let i = 0; i < n; i++) {
        basisVectors[i] = getBasisVector(i, that, metric, labels);
    }
    return that;
}

