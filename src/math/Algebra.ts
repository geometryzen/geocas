const wedgeBlades = function (a: number[], b: number[]): number[] | null {
    const result: number[] = [];
    const aLen = a.length;
    const bLen = b.length;
    for (let i = 0; i < aLen; i++) {
        const av = a[i];
        if (b.indexOf(av) < 0) {
            result.push(av);
        }
        else {
            return null;
        }
    }
    for (let i = 0; i < bLen; i++) {
        result.push(b[i]);
    }
    return result;
};

interface Env {
    g(u: BasisBladeExpr, v: BasisBladeExpr): ScalarExpr;
    bladeName(vectors: number[]): string;
}

export class Expr {
    constructor(public env: Env, public type: string) {
    }
    isChanged(): boolean {
        throw new Error(`${this.type}.isChanged is not implemented.`);
    }
    copy(_dirty: boolean): Expr {
        throw new Error(`${this.type}.copy(${_dirty}) is not implemented.`);
    }
    reset(): Expr {
        throw new Error(`${this.type}.reset is not implemented.`);
    }
    simplify(): Expr {
        throw new Error(`${this.type}.simplify is not implemented.`);
    }
    toPrefix(): string {
        throw new Error(`${this.type}.toPrefix is not implemented.`);
    }
    toString(): string {
        throw new Error(`${this.type}.toString is not implemented.`);
    }
    __add__(rhs: Expr | number): Expr {
        if (rhs instanceof Expr) {
            return new AddExpr(this, rhs);
        }
        else if (typeof rhs === 'number') {
            return new AddExpr(this, new ScalarExpr(this.env, rhs));
        }
        else {
            return void 0 as unknown as Expr;
        }
    }
    __radd__(lhs: Expr | number): Expr {
        if (lhs instanceof Expr) {
            return new AddExpr(lhs, this);
        }
        else if (typeof lhs === 'number') {
            return new AddExpr(new ScalarExpr(this.env, lhs), this);
        }
        else {
            return void 0 as unknown as Expr;
        }
    }
    __sub__(rhs: Expr | number): Expr {
        if (rhs instanceof Expr) {
            return new SubExpr(this, rhs);
        }
        else if (typeof rhs === 'number') {
            return new SubExpr(this, new ScalarExpr(this.env, rhs));
        }
        else {
            return void 0 as unknown as Expr;
        }
    }
    __rsub__(lhs: Expr | number): Expr {
        if (lhs instanceof Expr) {
            return new SubExpr(lhs, this);
        }
        else if (typeof lhs === 'number') {
            return new SubExpr(new ScalarExpr(this.env, lhs), this);
        }
        else {
            return void 0 as unknown as Expr;
        }
    }
    __mul__(rhs: number | Expr): Expr {
        if (rhs instanceof Expr) {
            return new MultiplyExpr(this, rhs);
        }
        else if (typeof rhs === 'number') {
            return new MultiplyExpr(this, new ScalarExpr(this.env, rhs));
        }
        else {
            return void 0 as unknown as Expr;
        }
    }
    __rmul__(lhs: Expr | number): Expr {
        if (lhs instanceof Expr) {
            return new MultiplyExpr(lhs, this);
        }
        else if (typeof lhs === 'number') {
            return new MultiplyExpr(new ScalarExpr(this.env, lhs), this);
        }
        else {
            return void 0 as unknown as Expr;
        }
    }
    __div__(rhs: number | Expr): Expr {
        if (rhs instanceof Expr) {
            return new DivideExpr(this, rhs);
        }
        else if (typeof rhs === 'number') {
            return new DivideExpr(this, new ScalarExpr(this.env, rhs));
        }
        else {
            return void 0 as unknown as Expr;
        }
    }
    __rdiv__(lhs: Expr | number): Expr {
        if (lhs instanceof Expr) {
            return new DivideExpr(lhs, this);
        }
        else if (typeof lhs === 'number') {
            return new DivideExpr(new ScalarExpr(this.env, lhs), this);
        }
        else {
            return void 0 as unknown as Expr;
        }
    }
    __vbar__(rhs: Expr | number): Expr {
        if (rhs instanceof Expr) {
            return new VBarExpr(this, rhs);
        }
        else if (typeof rhs === 'number') {
            return new VBarExpr(this, new ScalarExpr(this.env, rhs));
        }
        else {
            return void 0 as unknown as Expr;
        }
    }
    __rvbar__(lhs: Expr | number): Expr {
        if (lhs instanceof Expr) {
            return new VBarExpr(lhs, this);
        }
        else if (typeof lhs === 'number') {
            return new VBarExpr(new ScalarExpr(this.env, lhs), this);
        }
        else {
            return void 0 as unknown as Expr;
        }
    }
    __lshift__(rhs: Expr | number): Expr {
        if (rhs instanceof Expr) {
            return new LContractExpr(this, rhs);
        }
        else if (typeof rhs === 'number') {
            return new LContractExpr(this, new ScalarExpr(this.env, rhs));
        }
        else {
            return void 0 as unknown as Expr;
        }
    }
    __rlshift__(lhs: Expr | number): Expr {
        if (lhs instanceof Expr) {
            return new LContractExpr(lhs, this);
        }
        else if (typeof lhs === 'number') {
            return new LContractExpr(new ScalarExpr(this.env, lhs), this);
        }
        else {
            return void 0 as unknown as Expr;
        }
    }
    __rshift__(rhs: Expr | number): Expr {
        if (rhs instanceof Expr) {
            return new RContractExpr(this, rhs);
        }
        else if (typeof rhs === 'number') {
            return new RContractExpr(this, new ScalarExpr(this.env, rhs));
        }
        else {
            return void 0 as unknown as Expr;
        }
    }
    __rrshift__(lhs: Expr | number): Expr {
        if (lhs instanceof Expr) {
            return new RContractExpr(lhs, this);
        }
        else if (typeof lhs === 'number') {
            return new RContractExpr(new ScalarExpr(this.env, lhs), this);
        }
        else {
            return void 0 as unknown as Expr;
        }
    }
    __wedge__(rhs: Expr | number): WedgeExpr {
        if (rhs instanceof Expr) {
            return new WedgeExpr(this, rhs);
        }
        else if (typeof rhs === 'number') {
            return new WedgeExpr(this, new ScalarExpr(this.env, rhs));
        }
        else {
            return void 0 as unknown as WedgeExpr;
        }
    }
    __rwedge__(lhs: Expr | number): Expr {
        if (lhs instanceof Expr) {
            return new WedgeExpr(lhs, this);
        }
        else if (typeof lhs === 'number') {
            return new WedgeExpr(new ScalarExpr(this.env, lhs), this);
        }
        else {
            return void 0 as unknown as Expr;
        }
    }
    __tilde__(): Expr {
        return new ReverseExpr(this);
    }
    __bang__(): Expr {
        return new InverseExpr(this);
    }
    __neg__(): Expr {
        return new NegExpr(this);
    }
    __pos__(): Expr {
        return new PosExpr(this);
    }
}

export class BinaryExpr extends Expr {
    constructor(public lhs: Expr, public rhs: Expr, type: string) {
        super(lhs.env, type);
        if (!(lhs instanceof Expr)) {
            throw new Error(`${type}.lhs must be an Expr: ${typeof lhs}`);
        }
        if (!(rhs instanceof Expr)) {
            throw new Error(`${type}.rhs must be an Expr: ${typeof rhs}`);
        }
    }
}

export class AddExpr extends BinaryExpr {
    constructor(lhs: Expr, rhs: Expr, public dirty = false) {
        super(lhs, rhs, 'AddExpr');
    }
    isChanged(): boolean {
        return this.dirty || this.lhs.isChanged() || this.rhs.isChanged();
    }
    copy(dirty: boolean): Expr {
        return new AddExpr(this.lhs, this.rhs, dirty);
    }
    reset(): Expr {
        return new AddExpr(this.lhs.reset(), this.rhs.reset());
    }
    simplify(): Expr {
        const a = this.lhs.simplify();
        const b = this.rhs.simplify();
        if (b instanceof ScalarExpr && typeof b.value === 'number' && b.value === 0) {
            return a.copy(true);
        }
        else if (a instanceof MultiplyExpr && b instanceof MultiplyExpr) {
            if (a.lhs instanceof ScalarExpr && b.lhs instanceof ScalarExpr && a.rhs === b.rhs) {
                const sa: ScalarExpr = <ScalarExpr>a.lhs;
                const sb: ScalarExpr = <ScalarExpr>b.lhs;
                if (typeof sa.value === 'number' && typeof sb.value === 'number') {
                    const s = new ScalarExpr(this.env, <number>sa.value + <number>sb.value);
                    return new MultiplyExpr(s, a.rhs, true);
                }
                else {
                    return new AddExpr(a, b);
                }
            }
            else {
                return new AddExpr(a, b);
            }
        }
        else if (a instanceof ScalarExpr && b instanceof ScalarExpr) {
            if (typeof a.value === 'number' && typeof b.value === 'number') {
                return new ScalarExpr(this.env, <number>a.value + <number>b.value, true);
            }
            else {
                return new AddExpr(a, b);
            }
        }
        else {
            return new AddExpr(a, b);
        }
    }
    toPrefix(): string {
        return `add(${this.lhs.toPrefix()}, ${this.rhs.toPrefix()})`;
    }
    toString() {
        return `${this.lhs} + ${this.rhs}`;
    }
}

export class SubExpr extends BinaryExpr {
    constructor(lhs: Expr, rhs: Expr, public dirty = false) {
        super(lhs, rhs, 'SubExpr');
    }
    isChanged(): boolean {
        return this.dirty || this.lhs.isChanged() || this.rhs.isChanged();
    }
    copy(dirty: boolean): Expr {
        return new SubExpr(this.lhs, this.rhs, dirty);
    }
    reset(): Expr {
        return new SubExpr(this.lhs.reset(), this.rhs.reset());
    }
    simplify(): Expr {
        const a = this.lhs.simplify();
        const b = this.rhs.simplify();
        return new SubExpr(a, b);
    }
    toPrefix(): string {
        return `sub(${this.lhs.toPrefix()}, ${this.rhs.toPrefix()})`;
    }
    toString() {
        return `${this.lhs} - ${this.rhs}`;
    }
}

export class MultiplyExpr extends BinaryExpr {
    constructor(lhs: Expr, rhs: Expr, public dirty = false) {
        super(lhs, rhs, 'MultiplyExpr');
    }
    isChanged(): boolean {
        return this.dirty || this.lhs.isChanged() || this.rhs.isChanged();
    }
    copy(dirty: boolean): Expr {
        return new MultiplyExpr(this.lhs, this.rhs, dirty);
    }
    reset(): Expr {
        return new MultiplyExpr(this.lhs.reset(), this.rhs.reset());
    }
    simplify(): Expr {
        const a = this.lhs.simplify();
        const b = this.rhs.simplify();
        if (!(a instanceof ScalarExpr) && b instanceof ScalarExpr) {
            return new MultiplyExpr(b, a, true);
        }
        else if (a instanceof MultiplyExpr) {
            const aL = a.lhs;
            const aR = a.rhs;
            if (aL instanceof ScalarExpr) {
                return new MultiplyExpr(aL, new MultiplyExpr(aR, b), true);
            }
            else {
                return new MultiplyExpr(a, b);
            }
        }
        else if (b instanceof MultiplyExpr) {
            const bL = b.lhs;
            const bR = b.rhs;
            if (bL instanceof ScalarExpr) {
                return new MultiplyExpr(bL, new MultiplyExpr(a, bR), true);
            }
            else {
                return new MultiplyExpr(a, b);
            }
        }
        else if (a instanceof ScalarExpr) {
            if (typeof a.value === 'number' && a.value === 0) {
                return a.copy(true);
            }
            else if (typeof a.value === 'number' && a.value === 1) {
                return b.copy(true);
            }
            else if (b instanceof ScalarExpr) {
                if (typeof a.value === 'number' && a.value === 1) {
                    return b;
                }
                else if (typeof a.value === 'number' && typeof b.value === 'number') {
                    return new ScalarExpr(this.env, <number>a.value * <number>b.value, true);
                }
                else if (typeof a.value !== 'number' && typeof b.value === 'number') {
                    return new MultiplyExpr(b, a, true);
                }
                else {
                    return new MultiplyExpr(a, b);
                }
            }
            else {
                return new MultiplyExpr(a, b);
            }
        }
        else if (a instanceof BasisBladeExpr) {
            if (b instanceof MultiplyExpr) {
                const bL = b.lhs;
                const bR = b.rhs;
                if (bL instanceof BasisBladeExpr) {
                    if (a.vectors[0] === bL.vectors[0]) {
                        return new MultiplyExpr(new MultiplyExpr(a, bL), bR, true);
                    }
                    else {
                        return new MultiplyExpr(a, b);
                    }
                }
                else {
                    return new MultiplyExpr(a, b);
                }
            }
            else if (b instanceof BasisBladeExpr) {
                if (a === b) {
                    return new VBarExpr(a, b, true);
                }
                else {
                    return new MultiplyExpr(a, b);
                }
            }
            else if (b instanceof ScalarExpr) {
                return new MultiplyExpr(b, a, true);
            }
            else {
                return new MultiplyExpr(a, b);
            }
        }
        else {
            return new MultiplyExpr(a, b);
        }
    }
    toPrefix() {
        return `mul(${this.lhs.toPrefix()}, ${this.rhs.toPrefix()})`;
    }
    toString() {
        return `${this.lhs} * ${this.rhs}`;
    }
}

export class DivideExpr extends BinaryExpr {
    constructor(lhs: Expr, rhs: Expr, public dirty = false) {
        super(lhs, rhs, 'SubExpr');
    }
    isChanged(): boolean {
        return this.dirty || this.lhs.isChanged() || this.rhs.isChanged();
    }
    copy(dirty: boolean): Expr {
        return new DivideExpr(this.lhs, this.rhs, dirty);
    }
    reset(): Expr {
        return new DivideExpr(this.lhs.reset(), this.rhs.reset());
    }
    simplify(): Expr {
        const a = this.lhs.simplify();
        const b = this.rhs.simplify();
        return new DivideExpr(a, b);
    }
    toPrefix(): string {
        return `div(${this.lhs.toPrefix()}, ${this.rhs.toPrefix()})`;
    }
    toString() {
        return `${this.lhs} / ${this.rhs}`;
    }
}

export class LContractExpr extends BinaryExpr {
    constructor(lhs: Expr, rhs: Expr, public dirty = false) {
        super(lhs, rhs, 'LContractExpr');
    }
    isChanged(): boolean {
        return this.dirty || this.lhs.isChanged() || this.rhs.isChanged();
    }
    copy(dirty: boolean): Expr {
        return new LContractExpr(this.lhs, this.rhs, dirty);
    }
    reset(): Expr {
        return new LContractExpr(this.lhs.reset(), this.rhs.reset());
    }
    simplify(): Expr {
        const a = this.lhs.simplify();
        const b = this.rhs.simplify();
        return new LContractExpr(a, b);
    }
    toPrefix(): string {
        return `lco(${this.lhs.toPrefix()}, ${this.rhs.toPrefix()})`;
    }
    toString() {
        return `${this.lhs} << ${this.rhs}`;
    }
}

export class RContractExpr extends BinaryExpr {
    constructor(lhs: Expr, rhs: Expr, public dirty = false) {
        super(lhs, rhs, 'RContractExpr');
    }
    isChanged(): boolean {
        return this.dirty || this.lhs.isChanged() || this.rhs.isChanged();
    }
    copy(dirty: boolean): Expr {
        return new RContractExpr(this.lhs, this.rhs, dirty);
    }
    reset(): Expr {
        return new RContractExpr(this.lhs.reset(), this.rhs.reset());
    }
    simplify(): Expr {
        const a = this.lhs.simplify();
        const b = this.rhs.simplify();
        return new RContractExpr(a, b);
    }
    toPrefix(): string {
        return `rco(${this.lhs.toPrefix()}, ${this.rhs.toPrefix()})`;
    }
    toString() {
        return `${this.lhs} >> ${this.rhs}`;
    }
}

/**
 * A blade is the outer (wedge) product of a list of vectors.
 * An empty list of vectors corresponds to the unit scalar.
 */
export class BasisBladeExpr extends Expr {
    constructor(env: Env, public vectors: number[], public dirty = false) {
        super(env, 'BasisBladeExpr');
        if (!Array.isArray(vectors)) {
            throw new Error('vectors must be a number[]');
        }
    }
    isChanged(): boolean {
        return this.dirty;
    }
    copy(dirty: boolean): BasisBladeExpr {
        return new BasisBladeExpr(this.env, this.vectors, dirty);
    }
    reset(): BasisBladeExpr {
        if (this.dirty) {
            return new BasisBladeExpr(this.env, this.vectors, false);
        }
        else {
            return this;
        }
    }
    simplify(): Expr {
        return this;
    }
    toPrefix(): string {
        return this.env.bladeName(this.vectors);
    }
    toString(): string {
        return this.env.bladeName(this.vectors);
    }
}

export class ScalarExpr extends Expr {
    constructor(env: Env, public value: number | string, public dirty = false) {
        super(env, 'ScalarExpr');
    }
    isChanged(): boolean {
        return false;
    }
    copy(dirty: boolean): Expr {
        return new ScalarExpr(this.env, this.value, dirty);
    }
    reset(): Expr {
        if (this.dirty) {
            return new ScalarExpr(this.env, this.value, false);
        }
        else {
            return this;
        }
    }
    simplify(): Expr {
        return this;
    }
    toPrefix(): string {
        return `${this.value}`;
    }
    toPrefixLong(): string {
        return `ScalarExpr('${this.value}')`;
    }
    toString(): string {
        return `${this.value}`;
    }
}

export class VBarExpr extends BinaryExpr {
    constructor(lhs: Expr, rhs: Expr, public dirty = false) {
        super(lhs, rhs, 'VBarExpr');
    }
    isChanged(): boolean {
        return this.dirty || this.lhs.isChanged() || this.rhs.isChanged();
    }
    reset(): Expr {
        return new VBarExpr(this.lhs.reset(), this.rhs.reset());
    }
    simplify(): Expr {
        const a = this.lhs.simplify();
        const b = this.rhs.simplify();
        if (a instanceof BasisBladeExpr && b instanceof BasisBladeExpr) {
            return this.env.g(a, b);
        }
        else if (a instanceof AddExpr && b instanceof BasisBladeExpr) {
            const aL = a.lhs;
            const aR = a.rhs;
            return new AddExpr(new VBarExpr(aL, b), new VBarExpr(aR, b), true);
        }
        else if (a instanceof BasisBladeExpr && b instanceof AddExpr) {
            const bL = b.lhs;
            const bR = b.rhs;
            return new AddExpr(new VBarExpr(a, bL), new VBarExpr(a, bR), true);
        }
        else if (a instanceof MultiplyExpr && b instanceof Expr) {
            const aL = a.lhs;
            const aR = a.rhs;
            if (aL instanceof ScalarExpr && aR instanceof BasisBladeExpr) {
                return new MultiplyExpr(aL, new VBarExpr(aR, b), true);
            }
            else {
                return new VBarExpr(a, b);
            }
        }
        else if (a instanceof BasisBladeExpr && b instanceof MultiplyExpr) {
            const bL = b.lhs;
            const bR = b.rhs;
            if (bL instanceof ScalarExpr && bR instanceof BasisBladeExpr) {
                return new MultiplyExpr(bL, new VBarExpr(a, bR), true);
            }
            else {
                return new VBarExpr(a, b);
            }
        }
        else {
            return new VBarExpr(a, b);
        }
    }
    toPrefix(): string {
        return `scp(${this.lhs.toPrefix()}, ${this.rhs.toPrefix()})`;
    }
    toString() {
        return `${this.lhs} | ${this.rhs}`;
    }
}

export class WedgeExpr extends BinaryExpr {
    constructor(lhs: Expr, rhs: Expr, public dirty = false) {
        super(lhs, rhs, 'WedgeExpr');
    }
    isChanged(): boolean {
        return this.dirty || this.lhs.isChanged() || this.rhs.isChanged();
    }
    reset(): Expr {
        return new WedgeExpr(this.lhs.reset(), this.rhs.reset());
    }
    simplify(): Expr {
        const a = this.lhs.simplify();
        const b = this.rhs.simplify();
        if (a instanceof ScalarExpr) {
            if (b instanceof ScalarExpr) {
                return new ScalarExpr(this.env, 0, true);
            }
            else if (typeof a.value === 'number' && a.value === 1) {
                return b.copy(true);
            }
            else {
                return new WedgeExpr(a, b);
            }
        }
        else if (b instanceof ScalarExpr) {
            if (a instanceof ScalarExpr) {
                return new ScalarExpr(this.env, 0, true);
            }
            else if (typeof b.value === 'number' && b.value === 1) {
                if (a instanceof BasisBladeExpr) {
                    return a.copy(true);
                }
                else {
                    return new WedgeExpr(a, b);
                }
            }
            else {
                return new WedgeExpr(a, b);
            }
        }
        else if (a instanceof BasisBladeExpr && b instanceof BasisBladeExpr) {
            const blade = wedgeBlades(a.vectors, b.vectors);
            if (Array.isArray(blade)) {
                return new BasisBladeExpr(this.env, blade, true);
            }
            else {
                return new ScalarExpr(this.env, 0, true);
            }
        }
        // eslint-disable-next-line no-dupe-else-if
        else if (a instanceof BasisBladeExpr && b instanceof BasisBladeExpr) {
            if (a === b) {
                return new ScalarExpr(this.env, 0, true);
            }
            else {
                return new AddExpr(new MultiplyExpr(a, b), new MultiplyExpr(new ScalarExpr(this.env, -1), new VBarExpr(a, b)), true);
            }
        }
        else {
            return new WedgeExpr(a, b);
        }
    }
    toPrefix() {
        return `ext(${this.lhs}, ${this.rhs})`;
    }
    toString() {
        return `${this.lhs} ^ ${this.rhs}`;
    }
}

export class ReverseExpr extends Expr {
    constructor(public inner: Expr, public dirty = false) {
        super(inner.env, 'ReverseExpr');
    }
    isChanged(): boolean {
        return this.dirty || this.inner.isChanged();
    }
    copy(dirty: boolean): ReverseExpr {
        return new ReverseExpr(this.inner, dirty);
    }
    reset(): ReverseExpr {
        return new ReverseExpr(this.inner.reset(), false);
    }
    simplify(): Expr {
        return new ReverseExpr(this.inner.simplify());
    }
    toPrefix() {
        return `reverse(${this.inner})`;
    }
    toString() {
        return `~${this.inner}`;
    }
}

export class InverseExpr extends Expr {
    constructor(public inner: Expr, public dirty = false) {
        super(inner.env, 'InverseExpr');
    }
    isChanged(): boolean {
        return this.dirty || this.inner.isChanged();
    }
    copy(dirty: boolean): InverseExpr {
        return new InverseExpr(this.inner, dirty);
    }
    reset(): InverseExpr {
        return new InverseExpr(this.inner.reset(), false);
    }
    simplify(): Expr {
        return new InverseExpr(this.inner.simplify());
    }
    toPrefix() {
        return `inverse(${this.inner})`;
    }
    toString() {
        return `!${this.inner}`;
    }
}

export class NegExpr extends Expr {
    constructor(public inner: Expr, public dirty = false) {
        super(inner.env, 'NegExpr');
    }
    isChanged(): boolean {
        return this.dirty || this.inner.isChanged();
    }
    copy(dirty: boolean): NegExpr {
        return new NegExpr(this.inner, dirty);
    }
    reset(): NegExpr {
        return new NegExpr(this.inner.reset(), false);
    }
    simplify(): Expr {
        return new NegExpr(this.inner.simplify());
    }
    toPrefix() {
        return `neg(${this.inner})`;
    }
    toString() {
        return `-${this.inner}`;
    }
}

export class PosExpr extends Expr {
    constructor(public inner: Expr, public dirty = false) {
        super(inner.env, 'PosExpr');
    }
    isChanged(): boolean {
        return this.dirty || this.inner.isChanged();
    }
    copy(dirty: boolean): PosExpr {
        return new PosExpr(this.inner, dirty);
    }
    reset(): PosExpr {
        return new PosExpr(this.inner.reset(), false);
    }
    simplify(): Expr {
        return new PosExpr(this.inner.simplify());
    }
    toPrefix() {
        return `pos(${this.inner})`;
    }
    toString() {
        return `+${this.inner}`;
    }
}

export class Algebra implements Env {
    public basis: BasisBladeExpr[] = [];
    // private index: { [name: string]: number } = {};
    private _metric: number[][];
    private _bnames: string[] = [];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor(g: number[][], _unused?: string[]) {
        this._metric = g;
        // TODO: Verify that the vectors is an array of strings.
        // TODO: Verify that the metric is a square array of numbers with the correct size.
        // Insert the basis blade corresponding to unity.
        // This primes the basis array for the steps that follow.
        this.basis.push(new BasisBladeExpr(this, []));
        this._bnames[0] = '1';
        // Insert the basis blades corresponding to the basis vectors.
        // The algorithm is to extend the existing blades by the new vector.
        for (let i = 0; i < this._metric.length; i++) {
            // const name = vectors[i];
            const vector = new BasisBladeExpr(this, [i]);
            // const index = Math.pow(2, i);
            // this.index[name] = index;
            const bLength = this.basis.length;
            for (let j = 0; j < bLength; j++) {
                const existing = this.basis[j];
                const extended = new WedgeExpr(existing, vector);
                const blade = this.simplify(extended);
                if (blade instanceof BasisBladeExpr) {
                    this.basis.push(blade);
                }
                else {
                    throw new Error(`${extended} must simplify to a BasisBladeExpr`);
                }
            }
        }
    }
    bladeName(vectors: number[]): string {
        if (vectors.length > 0) {
            return vectors.map((i) => {
                if (this._bnames) {
                    const basisIndex = Math.pow(2, i);
                    if (this._bnames[basisIndex]) {
                        return this._bnames[basisIndex];
                    }
                }
                return `e${i + 1}`;
            }).join(' ^ ');
        }
        else {
            // The scalar blade name has no vectors.
            return this._bnames[0];
        }
    }
    g(u: BasisBladeExpr, v: BasisBladeExpr): ScalarExpr {
        const i = u.vectors[0];
        const j = v.vectors[0];
        return new ScalarExpr(this, this._metric[i][j]);
    }
    scalar(value: number | string): Expr {
        return new ScalarExpr(this, value);
    }
    simplify(expr: Expr): Expr {
        let count = 0;
        if (expr instanceof Expr) {
            expr = expr.reset();
            expr = expr.simplify();
            while (expr.isChanged()) {
                expr = expr.reset();
                count++;
                if (count < 100) {
                    expr = expr.simplify();
                }
            }
            return expr;
        }
        else {
            throw new Error("expr must be an Expr");
        }
    }
}
