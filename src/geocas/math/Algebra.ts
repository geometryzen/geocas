const wedgeBlades = function(a: number[], b: number[]): number[] {
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

interface Metric {
    (u: BasisBladeExpr, v: BasisBladeExpr): ScalarExpr;
}

export class Expr {
    constructor(public g: Metric, public type: string) {
    }
    isChanged(): boolean {
        throw new Error(`${this.type}.isChanged is not implemented.`);
    }
    copy(dirty: boolean): Expr {
        throw new Error(`${this.type}.copy is not implemented.`);
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
            return new AddExpr(this, new ScalarExpr(this.g, rhs));
        }
        else {
            return void 0;
        }
    }
    __radd__(lhs: Expr | number): Expr {
        if (lhs instanceof Expr) {
            return new AddExpr(lhs, this);
        }
        else if (typeof lhs === 'number') {
            return new AddExpr(new ScalarExpr(this.g, lhs), this);
        }
        else {
            return void 0;
        }
    }
    __mul__(rhs: number | Expr): Expr {
        if (rhs instanceof Expr) {
            return new MulExpr(this, rhs);
        }
        else if (typeof rhs === 'number') {
            return new MulExpr(this, new ScalarExpr(this.g, rhs));
        }
        else {
            return void 0;
        }
    }
    __rmul__(lhs: Expr | number): Expr {
        if (lhs instanceof Expr) {
            return new MulExpr(lhs, this);
        }
        else if (typeof lhs === 'number') {
            return new MulExpr(new ScalarExpr(this.g, lhs), this);
        }
        else {
            return void 0;
        }
    }
    __vbar__(rhs: Expr | number): Expr {
        if (rhs instanceof Expr) {
            return new VBarExpr(this, rhs);
        }
        else if (typeof rhs === 'number') {
            return new VBarExpr(this, new ScalarExpr(this.g, rhs));
        }
        else {
            return void 0;
        }
    }
    __rvbar__(lhs: Expr | number): Expr {
        if (lhs instanceof Expr) {
            return new VBarExpr(lhs, this);
        }
        else if (typeof lhs === 'number') {
            return new VBarExpr(new ScalarExpr(this.g, lhs), this);
        }
        else {
            return void 0;
        }
    }
    __wedge__(rhs: Expr | number): WedgeExpr {
        if (rhs instanceof Expr) {
            return new WedgeExpr(this, rhs);
        }
        else if (typeof rhs === 'number') {
            return new WedgeExpr(this, new ScalarExpr(this.g, rhs));
        }
        else {
            return void 0;
        }
    }
    __rwedge__(lhs: Expr | number): Expr {
        if (lhs instanceof Expr) {
            return new VBarExpr(lhs, this);
        }
        else if (typeof lhs === 'number') {
            return new VBarExpr(new ScalarExpr(this.g, lhs), this);
        }
        else {
            return void 0;
        }
    }
}

export class BinaryExpr extends Expr {
    constructor(public lhs: Expr, public rhs: Expr, type: string) {
        super(lhs.g, type);
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
        else if (a instanceof MulExpr && b instanceof MulExpr) {
            if (a.lhs instanceof ScalarExpr && b.lhs instanceof ScalarExpr && a.rhs === b.rhs) {
                const sa: ScalarExpr = <ScalarExpr>a.lhs;
                const sb: ScalarExpr = <ScalarExpr>b.lhs;
                if (typeof sa.value === 'number' && typeof sb.value === 'number') {
                    const s = new ScalarExpr(this.g, <number>sa.value + <number>sb.value);
                    return new MulExpr(s, a.rhs, true);
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
                return new ScalarExpr(this.g, <number>a.value + <number>b.value, true);
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
        return `+(${this.lhs.toPrefix()}, ${this.rhs.toPrefix()})`;
    }
    toString() {
        return `${this.lhs} + ${this.rhs}`;
    }
}

export class MulExpr extends BinaryExpr {
    constructor(lhs: Expr, rhs: Expr, public dirty = false) {
        super(lhs, rhs, 'MultiplyExpr');
    }
    isChanged(): boolean {
        return this.dirty || this.lhs.isChanged() || this.rhs.isChanged();
    }
    copy(dirty: boolean): Expr {
        return new MulExpr(this.lhs, this.rhs, dirty);
    }
    reset(): Expr {
        return new MulExpr(this.lhs.reset(), this.rhs.reset());
    }
    simplify(): Expr {
        const a = this.lhs.simplify();
        const b = this.rhs.simplify();
        if (a instanceof ScalarExpr) {
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
                    return new ScalarExpr(this.g, <number>a.value * <number>b.value, true);
                }
                else if (typeof a.value !== 'number' && typeof b.value === 'number') {
                    return new MulExpr(b, a, true);
                }
                else {
                    return new MulExpr(a, b);
                }
            }
            else {
                return new MulExpr(a, b);
            }
        }
        else if (a instanceof BasisBladeExpr) {
            if (b instanceof MulExpr) {
                const bL = b.lhs;
                const bR = b.rhs;
                if (bL instanceof BasisBladeExpr) {
                    if (a.vectors[0] === bL.vectors[0]) {
                        return new MulExpr(new MulExpr(a, bL), bR, true);
                    }
                    else {
                        return new MulExpr(a, b);
                    }
                }
                else {
                    return new MulExpr(a, b);
                }
            }
            else if (b instanceof BasisBladeExpr) {
                if (a === b) {
                    return this.g(a, b);
                }
                else {
                    return new MulExpr(a, b);
                }
            }
            else if (b instanceof ScalarExpr) {
                return new MulExpr(b, a, true);
            }
            else {
                return new MulExpr(a, b);
            }
        }
        else {
            return new MulExpr(a, b);
        }
    }
    toPrefix() {
        return `*(${this.lhs.toPrefix()}, ${this.rhs.toPrefix()})`;
    }
    toString() {
        return `${this.lhs} * ${this.rhs}`;
    }
}

/**
 * A blade is the outer (wedge) product of a list of vectors.
 * An empty list of vectors corresponds to the unit scalar. 
 */
export class BasisBladeExpr extends Expr {
    constructor(g: Metric, public vectors: number[], public dirty = false) {
        super(g, 'BasisBladeExpr');
        if (!Array.isArray(vectors)) {
            throw new Error('vectors must be a number[]');
        }
    }
    isChanged(): boolean {
        return this.dirty;
    }
    copy(dirty: boolean): BasisBladeExpr {
        return new BasisBladeExpr(this.g, this.vectors, dirty);
    }
    reset(): BasisBladeExpr {
        if (this.dirty) {
            return new BasisBladeExpr(this.g, this.vectors, false);
        }
        else {
            return this;
        }
    }
    simplify(): Expr {
        return this;
    }
    toPrefix(): string {
        if (this.vectors.length > 0) {
            return this.vectors.map((i) => `e${i + 1}`).join(' ^ ');
        }
        else {
            return "1";
        }
    }
    toString(): string {
        if (this.vectors.length > 0) {
            return this.vectors.map((i) => `e${i + 1}`).join(' ^ ');
        }
        else {
            return "1";
        }
    }
}

export class ScalarExpr extends Expr {
    constructor(g: Metric, public value: number | string, public dirty = false) {
        super(g, 'ScalarExpr');
    }
    isChanged(): boolean {
        return false;
    }
    copy(dirty: boolean): Expr {
        return new ScalarExpr(this.g, this.value, dirty);
    }
    reset(): Expr {
        if (this.dirty) {
            return new ScalarExpr(this.g, this.value, false);
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
            return this.g(a, b);
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
        else if (a instanceof MulExpr && b instanceof Expr) {
            const aL = a.lhs;
            const aR = a.rhs;
            if (aL instanceof ScalarExpr && aR instanceof BasisBladeExpr) {
                return new MulExpr(aL, new VBarExpr(aR, b), true);
            }
            else {
                return new VBarExpr(a, b);
            }
        }
        else if (a instanceof BasisBladeExpr && b instanceof MulExpr) {
            const bL = b.lhs;
            const bR = b.rhs;
            if (bL instanceof ScalarExpr && bR instanceof BasisBladeExpr) {
                return new MulExpr(bL, new VBarExpr(a, bR), true);
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
                return new ScalarExpr(this.g, 0, true);
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
                return new ScalarExpr(this.g, 0, true);
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
                return new BasisBladeExpr(this.g, blade, true);
            }
            else {
                return new ScalarExpr(this.g, 0, true);
            }
        }
        else if (a instanceof BasisBladeExpr && b instanceof BasisBladeExpr) {
            if (a === b) {
                return new ScalarExpr(this.g, 0, true);
            }
            else {
                return new AddExpr(new MulExpr(a, b), new MulExpr(new ScalarExpr(this.g, -1), new VBarExpr(a, b)), true);
            }
        }
        else {
            return new WedgeExpr(a, b);
        }
    }
    toPrefix() {
        return `^(${this.lhs}, ${this.rhs})`;
    }
    toString() {
        return `${this.lhs} ^ ${this.rhs}`;
    }
}

export default class Algebra {
    basis: BasisBladeExpr[] = [];
    index: { [name: string]: number } = {};
    private metric: Metric;
    constructor(names: string[], g: number[][]) {
        this.metric = (u: BasisBladeExpr, v: BasisBladeExpr): ScalarExpr => {
            const i = u.vectors[0];
            const j = v.vectors[0];
            return new ScalarExpr(this.metric, g[i][j]);
        };
        // Insert the basis blade corresponding to unity.
        // This primes the basis array for the steps that follow.
        this.basis.push(new BasisBladeExpr(this.metric, []));
        this.index['1'] = 0;
        // Insert the basis blades corresponding to the basis vectors.
        // The algorithm is to extend the existing blades by the new vector.
        for (let i = 0; i < names.length; i++) {
            const name = names[i];
            const vector = new BasisBladeExpr(this.metric, [i]);
            const index = Math.pow(2, i);
            this.index[name] = index;
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
    scalar(value: number | string): Expr {
        return new ScalarExpr(this.metric, value);
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
