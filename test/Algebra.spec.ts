import { assert } from 'chai';
import { algebra } from '../src/mother/Algebra';
import { Complex } from '../src/mother/Complex';
import { ComplexFieldAdapter } from '../src/mother/ComplexFieldAdapter';
import { NumberFieldAdapter } from '../src/mother/NumberFieldAdapter';
import { sortBlades } from '../src/mother/sortBlades';

const cfa = new ComplexFieldAdapter();
const nfa = new NumberFieldAdapter();

describe("Multivector", function () {
    describe("labels", function () {
        const G2 = algebra(2, nfa, ['i', 'j']);
        const one = G2.one;
        const e1 = G2.unit(0);
        const e2 = G2.unit(1);
        const e12 = e1.mul(e2);
        it("one should be 1", function () {
            assert.strictEqual(one.toString(), '1');
        });
        it("e1 should be i", function () {
            assert.strictEqual(e1.toString(), 'i');
        });
        it("e2 should be j", function () {
            assert.strictEqual(e2.toString(), 'j');
        });
        it("e12 should be i ^ j", function () {
            assert.strictEqual(e12.toString(), 'i ^ j');
        });
    });
    describe("G2 over number", function () {
        const G2 = algebra(2, nfa, ['e1', 'e2']);
        const one = G2.one;
        const e1 = G2.unit(0);
        const e2 = G2.unit(1);
        const e12 = e1.mul(e2);
        it("one", function () {
            assert.isDefined(one);
            assert.strictEqual(one.blades.length, 1);
            assert.strictEqual(one.blades[0].bitmap, 0);
            assert.strictEqual(one.blades[0].weight, 1);
        });

        it("e1", function () {
            assert.strictEqual(e1.blades.length, 1);
            assert.strictEqual(e1.blades[0].bitmap, 1);
            assert.strictEqual(e1.blades[0].weight, 1);
        });
        it("e2", function () {
            assert.strictEqual(e2.blades.length, 1);
            assert.strictEqual(e2.blades[0].bitmap, 2);
            assert.strictEqual(e2.blades[0].weight, 1);
        });
        it("e12", function () {
            assert.strictEqual(e12.blades.length, 1);
            assert.strictEqual(e12.blades[0].bitmap, 3);
            assert.strictEqual(e12.blades[0].weight, 1);
        });
        describe("+", function () {
            // one
            it("(one, one)", function () {
                const M = one.__add__(one);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 1);
                assert.strictEqual(blades[0].bitmap, 0);
                assert.strictEqual(blades[0].weight, 2);
            });
            it("(one, e1)", function () {
                const M = one.__add__(e1);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 0);
                assert.strictEqual(blades[0].weight, 1);
                assert.strictEqual(blades[1].bitmap, 1);
                assert.strictEqual(blades[1].weight, 1);
            });
            it("(one, e2", function () {
                const M = one.__add__(e2);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 0);
                assert.strictEqual(blades[0].weight, 1);
                assert.strictEqual(blades[1].bitmap, 2);
                assert.strictEqual(blades[1].weight, 1);
            });
            it("(one, e12)", function () {
                const M = one.__add__(e12);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 0);
                assert.strictEqual(blades[0].weight, 1);
                assert.strictEqual(blades[1].bitmap, 3);
                assert.strictEqual(blades[1].weight, 1);
            });
            // e1
            it("(e1, one)", function () {
                const M = e1.__add__(one);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 0);
                assert.strictEqual(blades[0].weight, 1);
                assert.strictEqual(blades[1].bitmap, 1);
                assert.strictEqual(blades[1].weight, 1);
            });
            it("(e1, e1)", function () {
                const M = e1.__add__(e1);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 1);
                assert.strictEqual(blades[0].bitmap, 1);
                assert.strictEqual(blades[0].weight, 2);
            });
            it("(e1, e2", function () {
                const M = e1.__add__(e2);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 1);
                assert.strictEqual(blades[0].weight, 1);
                assert.strictEqual(blades[1].bitmap, 2);
                assert.strictEqual(blades[1].weight, 1);
            });
            it("(e1, e12)", function () {
                const M = e1.__add__(e12);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 1);
                assert.strictEqual(blades[0].weight, 1);
                assert.strictEqual(blades[1].bitmap, 3);
                assert.strictEqual(blades[1].weight, 1);
            });
            // e2
            it("(e2, one)", function () {
                const M = e2.__add__(one);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 0);
                assert.strictEqual(blades[0].weight, 1);
                assert.strictEqual(blades[1].bitmap, 2);
                assert.strictEqual(blades[1].weight, 1);
            });
            it("(e2, e1)", function () {
                const M = e2.__add__(e1);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 1);
                assert.strictEqual(blades[0].weight, 1);
                assert.strictEqual(blades[1].bitmap, 2);
                assert.strictEqual(blades[1].weight, 1);
            });
            it("(e2, e2", function () {
                const M = e2.__add__(e2);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 1);
                assert.strictEqual(blades[0].bitmap, 2);
                assert.strictEqual(blades[0].weight, 2);
            });
            it("(e2, e12)", function () {
                const M = e2.__add__(e12);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 2);
                assert.strictEqual(blades[0].weight, 1);
                assert.strictEqual(blades[1].bitmap, 3);
                assert.strictEqual(blades[1].weight, 1);
            });
            // e12
            it("(e12, one)", function () {
                const M = e12.__add__(one);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 0);
                assert.strictEqual(blades[0].weight, 1);
                assert.strictEqual(blades[1].bitmap, 3);
                assert.strictEqual(blades[1].weight, 1);
            });
            it("(e12, e1)", function () {
                const M = e12.__add__(e1);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 1);
                assert.strictEqual(blades[0].weight, 1);
                assert.strictEqual(blades[1].bitmap, 3);
                assert.strictEqual(blades[1].weight, 1);
            });
            it("(e12, e2", function () {
                const M = e12.__add__(e2);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 2);
                assert.strictEqual(blades[0].weight, 1);
                assert.strictEqual(blades[1].bitmap, 3);
                assert.strictEqual(blades[1].weight, 1);
            });
            it("(e12, e12)", function () {
                const M = e12.__add__(e12);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 1);
                assert.strictEqual(blades[0].bitmap, 3);
                assert.strictEqual(blades[0].weight, 2);
            });
        });
        describe("-", function () {
            // one
            it("(one, one)", function () {
                const M = one.__sub__(one);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 0);
                // assert.strictEqual(blades[0].bitmap,0);
                // assert.strictEqual(blades[0].weight,2);
            });
            it("(one, e1)", function () {
                const M = one.__sub__(e1);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 0);
                assert.strictEqual(blades[0].weight, 1);
                assert.strictEqual(blades[1].bitmap, 1);
                assert.strictEqual(blades[1].weight, -1);
            });
            it("(one, e2", function () {
                const M = one.__sub__(e2);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 0);
                assert.strictEqual(blades[0].weight, 1);
                assert.strictEqual(blades[1].bitmap, 2);
                assert.strictEqual(blades[1].weight, -1);
            });
            it("(one, e12)", function () {
                const M = one.__sub__(e12);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 0);
                assert.strictEqual(blades[0].weight, 1);
                assert.strictEqual(blades[1].bitmap, 3);
                assert.strictEqual(blades[1].weight, -1);
            });
            // e1
            it("(e1, one)", function () {
                const M = e1.__sub__(one);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 0);
                assert.strictEqual(blades[0].weight, -1);
                assert.strictEqual(blades[1].bitmap, 1);
                assert.strictEqual(blades[1].weight, 1);
            });
            it("(e1, e1)", function () {
                const M = e1.__sub__(e1);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 0);
                // assert.strictEqual(blades[0].bitmap,1);
                // assert.strictEqual(blades[0].weight,2);
            });
            it("(e1, e2", function () {
                const M = e1.__sub__(e2);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 1);
                assert.strictEqual(blades[0].weight, 1);
                assert.strictEqual(blades[1].bitmap, 2);
                assert.strictEqual(blades[1].weight, -1);
            });
            it("(e1, e12)", function () {
                const M = e1.__sub__(e12);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 1);
                assert.strictEqual(blades[0].weight, 1);
                assert.strictEqual(blades[1].bitmap, 3);
                assert.strictEqual(blades[1].weight, -1);
            });
            // e2
            it("(e2, one)", function () {
                const M = e2.__sub__(one);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 0);
                assert.strictEqual(blades[0].weight, -1);
                assert.strictEqual(blades[1].bitmap, 2);
                assert.strictEqual(blades[1].weight, 1);
            });
            it("(e2, e1)", function () {
                const M = e2.__sub__(e1);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 1);
                assert.strictEqual(blades[0].weight, -1);
                assert.strictEqual(blades[1].bitmap, 2);
                assert.strictEqual(blades[1].weight, 1);
            });
            it("(e2, e2", function () {
                const M = e2.__sub__(e2);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 0);
                // assert.strictEqual(blades[0].bitmap,2);
                // assert.strictEqual(blades[0].weight,2);
            });
            it("(e2, e12)", function () {
                const M = e2.__sub__(e12);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 2);
                assert.strictEqual(blades[0].weight, 1);
                assert.strictEqual(blades[1].bitmap, 3);
                assert.strictEqual(blades[1].weight, -1);
            });
            // e12
            it("(e12, one)", function () {
                const M = e12.__sub__(one);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 0);
                assert.strictEqual(blades[0].weight, -1);
                assert.strictEqual(blades[1].bitmap, 3);
                assert.strictEqual(blades[1].weight, 1);
            });
            it("(e12, e1)", function () {
                const M = e12.__sub__(e1);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 1);
                assert.strictEqual(blades[0].weight, -1);
                assert.strictEqual(blades[1].bitmap, 3);
                assert.strictEqual(blades[1].weight, 1);
            });
            it("(e12, e2", function () {
                const M = e12.__sub__(e2);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 2);
                assert.strictEqual(blades[0].weight, -1);
                assert.strictEqual(blades[1].bitmap, 3);
                assert.strictEqual(blades[1].weight, 1);
            });
            it("(e12, e12)", function () {
                const M = e12.__sub__(e12);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 0);
                // assert.strictEqual(blades[0].bitmap,3);
                // assert.strictEqual(blades[0].weight,2);
            });
        });
        describe("*", function () {
            // one
            it("one * one", function () {
                const M = one.__mul__(one);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 0);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("one * e1", function () {
                const M = one.__mul__(e1);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 1);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("one * e2", function () {
                const M = one.__mul__(e2);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 2);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("one * e12", function () {
                const M = one.__mul__(e12);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 3);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            // e1
            it("(e1, one)", function () {
                const M = e1.__mul__(one);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 1);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(e1, e1)", function () {
                const M = e1.__mul__(e1);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 0);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(e1, e2)", function () {
                const M = e1.__mul__(e2);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 3);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(e1, e12)", function () {
                const M = e1.__mul__(e12);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 2);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            // e2
            it("(e2, one)", function () {
                const M = e2.__mul__(one);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 2);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(e2, e1)", function () {
                const M = e2.__mul__(e1);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 3);
                assert.strictEqual(M.blades[0].weight, -1);
            });
            it("(e2, e2)", function () {
                const M = e2.__mul__(e2);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 0);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(e2, e12)", function () {
                const M = e2.__mul__(e12);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 1);
                assert.strictEqual(M.blades[0].weight, -1);
            });
            // e12
            it("(e12, one)", function () {
                const M = e12.__mul__(one);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 3);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(e12, e1)", function () {
                const M = e12.__mul__(e1);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 2);
                assert.strictEqual(M.blades[0].weight, -1);
            });
            it("(e12, e2)", function () {
                const M = e12.__mul__(e2);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 1);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(e12, e12)", function () {
                const M = e12.__mul__(e12);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 0);
                assert.strictEqual(M.blades[0].weight, -1);
            });
        });
        describe("^", function () {
            // one
            it("one ^ one", function () {
                const M = one.__wedge__(one);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 0);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("one ^ e1", function () {
                const M = one.__wedge__(e1);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 1);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("one ^ e2", function () {
                const M = one.__wedge__(e2);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 2);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("one ^ e12", function () {
                const M = one.__wedge__(e12);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 3);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            // e1
            it("(e1, one)", function () {
                const M = e1.__wedge__(one);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 1);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(e1 ^ e1)", function () {
                const M = e1.__wedge__(e1);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,1);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("e1 ^ e2", function () {
                const M = e1.__wedge__(e2);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 3);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("e1 ^ e12", function () {
                const M = e1.__wedge__(e12);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,3);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            // e2
            it("(e2, one)", function () {
                const M = e2.__wedge__(one);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 2);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(e2 ^ e1)", function () {
                const M = e2.__wedge__(e1);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 3);
                assert.strictEqual(M.blades[0].weight, -1);
            });
            it("e2 ^ e2", function () {
                const M = e2.__wedge__(e2);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,3);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("e2 ^ e12", function () {
                const M = e2.__wedge__(e12);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,3);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            // e12
            it("(e12, one)", function () {
                const M = e12.__wedge__(one);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 3);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(e12 ^ e1)", function () {
                const M = e12.__wedge__(e1);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,3);
                // assert.strictEqual(M.blades[0].weight,-1);
            });
            it("e12 ^ e2", function () {
                const M = e12.__wedge__(e2);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,3);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("e12 ^ e12", function () {
                const M = e12.__wedge__(e12);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,3);
                // assert.strictEqual(M.blades[0].weight,1);
            });
        });
        describe("<<", function () {
            // one
            it("(one, one)", function () {
                const M = one.__lshift__(one);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 0);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(one, e1)", function () {
                const M = one.__lshift__(e1);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 1);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(one, e2)", function () {
                const M = one.__lshift__(e2);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 2);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(one, e12)", function () {
                const M = one.__lshift__(e12);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 3);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            // e1
            it("(e1, one)", function () {
                const M = e1.__lshift__(one);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,0);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("(e1, e1)", function () {
                const M = e1.__lshift__(e1);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 0);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(e1, e2)", function () {
                const M = e1.__lshift__(e2);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,2);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("(e1, e12)", function () {
                const M = e1.__lshift__(e12);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 2);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            // e2
            it("(e2, one)", function () {
                const M = e2.__lshift__(one);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,0);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("(e2, e1)", function () {
                const M = e2.__lshift__(e1);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,0);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("(e2, e2)", function () {
                const M = e2.__lshift__(e2);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 0);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(e2, e12)", function () {
                const M = e2.__lshift__(e12);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 1);
                assert.strictEqual(M.blades[0].weight, -1);
            });
            // e12
            it("(e12, one)", function () {
                const M = e12.__lshift__(one);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,0);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("(e12, e1)", function () {
                const M = e12.__lshift__(e1);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,0);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("(e12, e2)", function () {
                const M = e12.__lshift__(e2);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,0);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("(e12, e12)", function () {
                const M = e12.__lshift__(e12);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 0);
                assert.strictEqual(M.blades[0].weight, -1);
            });
        });
        describe(">>", function () {
            // one
            it("(one, one)", function () {
                const M = one.__rshift__(one);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 0);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(one, e1)", function () {
                const M = one.__rshift__(e1);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,0);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("(one, e2)", function () {
                const M = one.__rshift__(e2);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,0);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("(one, e12)", function () {
                const M = one.__rshift__(e12);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,0);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            // e1
            it("(e1, one)", function () {
                const M = e1.__rshift__(one);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 1);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(e1, e1)", function () {
                const M = e1.__rshift__(e1);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 0);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(e1, e2)", function () {
                const M = e1.__rshift__(e2);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,0);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("(e1, e12)", function () {
                const M = e1.__rshift__(e12);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,0);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            // e2
            it("(e2, one)", function () {
                const M = e2.__rshift__(one);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 2);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(e2, e1)", function () {
                const M = e2.__rshift__(e1);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,0);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("(e2, e2)", function () {
                const M = e2.__rshift__(e2);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 0);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(e2, e12)", function () {
                const M = e2.__rshift__(e12);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,0);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            // e12
            it("(e12, one)", function () {
                const M = e12.__rshift__(one);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 3);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(e12, e1)", function () {
                const M = e12.__rshift__(e1);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 2);
                assert.strictEqual(M.blades[0].weight, -1);
            });
            it("(e12, e2)", function () {
                const M = e12.__rshift__(e2);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 1);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(e12, e12)", function () {
                const M = e12.__rshift__(e12);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 0);
                assert.strictEqual(M.blades[0].weight, -1);
            });
        });
        describe("|", function () {
            // one
            it("(one, one)", function () {
                const M = one.__vbar__(one);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 0);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(one, e1)", function () {
                const M = one.__vbar__(e1);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,0);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("(one, e2)", function () {
                const M = one.__vbar__(e2);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,0);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("(one, e12)", function () {
                const M = one.__vbar__(e12);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,0);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            // e1
            it("(e1, one)", function () {
                const M = e1.__vbar__(one);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,1);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("(e1, e1)", function () {
                const M = e1.__vbar__(e1);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 0);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(e1, e2)", function () {
                const M = e1.__vbar__(e2);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,0);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("(e1, e12)", function () {
                const M = e1.__vbar__(e12);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,0);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            // e2
            it("(e2, one)", function () {
                const M = e2.__vbar__(one);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,2);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("(e2, e1)", function () {
                const M = e2.__vbar__(e1);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,0);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("(e2, e2)", function () {
                const M = e2.__vbar__(e2);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 0);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(e2, e12)", function () {
                const M = e2.__vbar__(e12);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,0);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            // e12
            it("(e12, one)", function () {
                const M = e12.__vbar__(one);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,3);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("(e12, e1)", function () {
                const M = e12.__vbar__(e1);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,2);
                // assert.strictEqual(M.blades[0].weight,-1);
            });
            it("(e12, e2)", function () {
                const M = e12.__vbar__(e2);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,1);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("(e12, e12)", function () {
                const M = e12.__vbar__(e12);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 0);
                assert.strictEqual(M.blades[0].weight, -1);
            });
        });
        describe("inv", function () {
            it("1", function () {
                const M = one.inv();
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 0);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("e1", function () {
                const M = e1.inv();
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 1);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("e2", function () {
                const M = e2.inv();
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 2);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("e12", function () {
                const M = e12.inv();
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 3);
                assert.strictEqual(M.blades[0].weight, -1);
            });
        });
        describe("dual", function () {
            it("1", function () {
                const M = one.dual();
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 3);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("e1", function () {
                const M = e1.dual();
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 2);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("e2", function () {
                const M = e2.dual();
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 1);
                assert.strictEqual(M.blades[0].weight, -1);
            });
            it("e12", function () {
                const M = e12.dual();
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 0);
                assert.strictEqual(M.blades[0].weight, -1);
            });
        });
        describe("direction", function () {
            it("1", function () {
                const M = one.direction();
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 0);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("e1", function () {
                const M = e1.direction();
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 1);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("e2", function () {
                const M = e2.direction();
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 2);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("e12", function () {
                const M = e12.direction();
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 3);
                assert.strictEqual(M.blades[0].weight, 1);
            });
        });
    });
    describe("G11 over number", function () {
        const G11 = algebra([1, -1], nfa, ["e1", "e2"]);
        const one = G11.one;
        const e1 = G11.unit(0);
        const e2 = G11.unit(1);
        const e12 = e1.mul(e2);
        it("one", function () {
            assert.strictEqual(one.blades.length, 1);
            assert.strictEqual(one.blades[0].bitmap, 0);
            assert.strictEqual(one.blades[0].weight, 1);
        });
        it("e1", function () {
            assert.strictEqual(e1.blades.length, 1);
            assert.strictEqual(e1.blades[0].bitmap, 1);
            assert.strictEqual(e1.blades[0].weight, 1);
        });
        it("e2", function () {
            assert.strictEqual(e2.blades.length, 1);
            assert.strictEqual(e2.blades[0].bitmap, 2);
            assert.strictEqual(e2.blades[0].weight, 1);
        });
        it("e12", function () {
            assert.strictEqual(e12.blades.length, 1);
            assert.strictEqual(e12.blades[0].bitmap, 3);
            assert.strictEqual(e12.blades[0].weight, 1);
        });
        describe("+", function () {
            // one
            it("(one, one)", function () {
                const M = one.__add__(one);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 1);
                assert.strictEqual(blades[0].bitmap, 0);
                assert.strictEqual(blades[0].weight, 2);
            });
            it("(one, e1)", function () {
                const M = one.__add__(e1);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 0);
                assert.strictEqual(blades[0].weight, 1);
                assert.strictEqual(blades[1].bitmap, 1);
                assert.strictEqual(blades[1].weight, 1);
            });
            it("(one, e2", function () {
                const M = one.__add__(e2);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 0);
                assert.strictEqual(blades[0].weight, 1);
                assert.strictEqual(blades[1].bitmap, 2);
                assert.strictEqual(blades[1].weight, 1);
            });
            it("(one, e12)", function () {
                const M = one.__add__(e12);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 0);
                assert.strictEqual(blades[0].weight, 1);
                assert.strictEqual(blades[1].bitmap, 3);
                assert.strictEqual(blades[1].weight, 1);
            });
            // e1
            it("(e1, one)", function () {
                const M = e1.__add__(one);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 0);
                assert.strictEqual(blades[0].weight, 1);
                assert.strictEqual(blades[1].bitmap, 1);
                assert.strictEqual(blades[1].weight, 1);
            });
            it("(e1, e1)", function () {
                const M = e1.__add__(e1);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 1);
                assert.strictEqual(blades[0].bitmap, 1);
                assert.strictEqual(blades[0].weight, 2);
            });
            it("(e1, e2", function () {
                const M = e1.__add__(e2);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 1);
                assert.strictEqual(blades[0].weight, 1);
                assert.strictEqual(blades[1].bitmap, 2);
                assert.strictEqual(blades[1].weight, 1);
            });
            it("(e1, e12)", function () {
                const M = e1.__add__(e12);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 1);
                assert.strictEqual(blades[0].weight, 1);
                assert.strictEqual(blades[1].bitmap, 3);
                assert.strictEqual(blades[1].weight, 1);
            });
            // e2
            it("(e2, one)", function () {
                const M = e2.__add__(one);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 0);
                assert.strictEqual(blades[0].weight, 1);
                assert.strictEqual(blades[1].bitmap, 2);
                assert.strictEqual(blades[1].weight, 1);
            });
            it("(e2, e1)", function () {
                const M = e2.__add__(e1);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 1);
                assert.strictEqual(blades[0].weight, 1);
                assert.strictEqual(blades[1].bitmap, 2);
                assert.strictEqual(blades[1].weight, 1);
            });
            it("(e2, e2", function () {
                const M = e2.__add__(e2);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 1);
                assert.strictEqual(blades[0].bitmap, 2);
                assert.strictEqual(blades[0].weight, 2);
            });
            it("(e2, e12)", function () {
                const M = e2.__add__(e12);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 2);
                assert.strictEqual(blades[0].weight, 1);
                assert.strictEqual(blades[1].bitmap, 3);
                assert.strictEqual(blades[1].weight, 1);
            });
            // e12
            it("(e12, one)", function () {
                const M = e12.__add__(one);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 0);
                assert.strictEqual(blades[0].weight, 1);
                assert.strictEqual(blades[1].bitmap, 3);
                assert.strictEqual(blades[1].weight, 1);
            });
            it("(e12, e1)", function () {
                const M = e12.__add__(e1);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 1);
                assert.strictEqual(blades[0].weight, 1);
                assert.strictEqual(blades[1].bitmap, 3);
                assert.strictEqual(blades[1].weight, 1);
            });
            it("(e12, e2", function () {
                const M = e12.__add__(e2);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 2);
                assert.strictEqual(blades[0].weight, 1);
                assert.strictEqual(blades[1].bitmap, 3);
                assert.strictEqual(blades[1].weight, 1);
            });
            it("(e12, e12)", function () {
                const M = e12.__add__(e12);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 1);
                assert.strictEqual(blades[0].bitmap, 3);
                assert.strictEqual(blades[0].weight, 2);
            });
        });
        describe("-", function () {
            // one
            it("(one, one)", function () {
                const M = one.__sub__(one);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 0);
                // assert.strictEqual(blades[0].bitmap,0);
                // assert.strictEqual(blades[0].weight,2);
            });
            it("(one, e1)", function () {
                const M = one.__sub__(e1);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 0);
                assert.strictEqual(blades[0].weight, 1);
                assert.strictEqual(blades[1].bitmap, 1);
                assert.strictEqual(blades[1].weight, -1);
            });
            it("(one, e2", function () {
                const M = one.__sub__(e2);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 0);
                assert.strictEqual(blades[0].weight, 1);
                assert.strictEqual(blades[1].bitmap, 2);
                assert.strictEqual(blades[1].weight, -1);
            });
            it("(one, e12)", function () {
                const M = one.__sub__(e12);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 0);
                assert.strictEqual(blades[0].weight, 1);
                assert.strictEqual(blades[1].bitmap, 3);
                assert.strictEqual(blades[1].weight, -1);
            });
            // e1
            it("(e1, one)", function () {
                const M = e1.__sub__(one);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 0);
                assert.strictEqual(blades[0].weight, -1);
                assert.strictEqual(blades[1].bitmap, 1);
                assert.strictEqual(blades[1].weight, 1);
            });
            it("(e1, e1)", function () {
                const M = e1.__sub__(e1);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 0);
                // assert.strictEqual(blades[0].bitmap,1);
                // assert.strictEqual(blades[0].weight,2);
            });
            it("(e1, e2", function () {
                const M = e1.__sub__(e2);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 1);
                assert.strictEqual(blades[0].weight, 1);
                assert.strictEqual(blades[1].bitmap, 2);
                assert.strictEqual(blades[1].weight, -1);
            });
            it("(e1, e12)", function () {
                const M = e1.__sub__(e12);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 1);
                assert.strictEqual(blades[0].weight, 1);
                assert.strictEqual(blades[1].bitmap, 3);
                assert.strictEqual(blades[1].weight, -1);
            });
            // e2
            it("(e2, one)", function () {
                const M = e2.__sub__(one);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 0);
                assert.strictEqual(blades[0].weight, -1);
                assert.strictEqual(blades[1].bitmap, 2);
                assert.strictEqual(blades[1].weight, 1);
            });
            it("(e2, e1)", function () {
                const M = e2.__sub__(e1);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 1);
                assert.strictEqual(blades[0].weight, -1);
                assert.strictEqual(blades[1].bitmap, 2);
                assert.strictEqual(blades[1].weight, 1);
            });
            it("(e2, e2", function () {
                const M = e2.__sub__(e2);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 0);
                // assert.strictEqual(blades[0].bitmap,2);
                // assert.strictEqual(blades[0].weight,2);
            });
            it("(e2, e12)", function () {
                const M = e2.__sub__(e12);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 2);
                assert.strictEqual(blades[0].weight, 1);
                assert.strictEqual(blades[1].bitmap, 3);
                assert.strictEqual(blades[1].weight, -1);
            });
            // e12
            it("(e12, one)", function () {
                const M = e12.__sub__(one);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 0);
                assert.strictEqual(blades[0].weight, -1);
                assert.strictEqual(blades[1].bitmap, 3);
                assert.strictEqual(blades[1].weight, 1);
            });
            it("(e12, e1)", function () {
                const M = e12.__sub__(e1);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 1);
                assert.strictEqual(blades[0].weight, -1);
                assert.strictEqual(blades[1].bitmap, 3);
                assert.strictEqual(blades[1].weight, 1);
            });
            it("(e12, e2", function () {
                const M = e12.__sub__(e2);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 2);
                assert.strictEqual(blades[0].bitmap, 2);
                assert.strictEqual(blades[0].weight, -1);
                assert.strictEqual(blades[1].bitmap, 3);
                assert.strictEqual(blades[1].weight, 1);
            });
            it("(e12, e12)", function () {
                const M = e12.__sub__(e12);
                const blades = sortBlades(M.blades);
                assert.strictEqual(blades.length, 0);
                // assert.strictEqual(blades[0].bitmap,3);
                // assert.strictEqual(blades[0].weight,2);
            });
        });
        describe("*", function () {
            // one
            it("one * one", function () {
                const M = one.__mul__(one);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 0);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("one * e1", function () {
                const M = one.__mul__(e1);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 1);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("one * e2", function () {
                const M = one.__mul__(e2);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 2);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("one * e12", function () {
                const M = one.__mul__(e12);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 3);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            // e1
            it("(e1, one)", function () {
                const M = e1.__mul__(one);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 1);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(e1, e1)", function () {
                const M = e1.__mul__(e1);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 0);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(e1, e2)", function () {
                const M = e1.__mul__(e2);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 3);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(e1, e12)", function () {
                const M = e1.__mul__(e12);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 2);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            // e2
            it("(e2, one)", function () {
                const M = e2.__mul__(one);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 2);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(e2, e1)", function () {
                const M = e2.__mul__(e1);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 3);
                assert.strictEqual(M.blades[0].weight, -1);
            });
            it("(e2, e2)", function () {
                const M = e2.__mul__(e2);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 0);
                assert.strictEqual(M.blades[0].weight, -1);
            });
            it("(e2, e12)", function () {
                const M = e2.__mul__(e12);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 1);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            // e12
            it("(e12, one)", function () {
                const M = e12.__mul__(one);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 3);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(e12, e1)", function () {
                const M = e12.__mul__(e1);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 2);
                assert.strictEqual(M.blades[0].weight, -1);
            });
            it("(e12, e2)", function () {
                const M = e12.__mul__(e2);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 1);
                assert.strictEqual(M.blades[0].weight, -1);
            });
            it("(e12, e12)", function () {
                const M = e12.__mul__(e12);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 0);
                assert.strictEqual(M.blades[0].weight, 1);
            });
        });
        describe("^", function () {
            // one
            it("one ^ one", function () {
                const M = one.__wedge__(one);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 0);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("one ^ e1", function () {
                const M = one.__wedge__(e1);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 1);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("one ^ e2", function () {
                const M = one.__wedge__(e2);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 2);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("one ^ e12", function () {
                const M = one.__wedge__(e12);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 3);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            // e1
            it("(e1, one)", function () {
                const M = e1.__wedge__(one);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 1);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(e1 ^ e1)", function () {
                const M = e1.__wedge__(e1);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,1);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("e1 ^ e2", function () {
                const M = e1.__wedge__(e2);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 3);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("e1 ^ e12", function () {
                const M = e1.__wedge__(e12);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,3);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            // e2
            it("(e2, one)", function () {
                const M = e2.__wedge__(one);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 2);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(e2 ^ e1)", function () {
                const M = e2.__wedge__(e1);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 3);
                assert.strictEqual(M.blades[0].weight, -1);
            });
            it("e2 ^ e2", function () {
                const M = e2.__wedge__(e2);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,3);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("e2 ^ e12", function () {
                const M = e2.__wedge__(e12);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,3);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            // e12
            it("(e12, one)", function () {
                const M = e12.__wedge__(one);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 3);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(e12 ^ e1)", function () {
                const M = e12.__wedge__(e1);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,3);
                // assert.strictEqual(M.blades[0].weight,-1);
            });
            it("e12 ^ e2", function () {
                const M = e12.__wedge__(e2);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,3);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("e12 ^ e12", function () {
                const M = e12.__wedge__(e12);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,3);
                // assert.strictEqual(M.blades[0].weight,1);
            });
        });
        describe("<<", function () {
            // one
            it("(one, one)", function () {
                const M = one.__lshift__(one);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 0);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(one, e1)", function () {
                const M = one.__lshift__(e1);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 1);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(one, e2)", function () {
                const M = one.__lshift__(e2);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 2);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(one, e12)", function () {
                const M = one.__lshift__(e12);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 3);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            // e1
            it("(e1, one)", function () {
                const M = e1.__lshift__(one);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,0);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("(e1, e1)", function () {
                const M = e1.__lshift__(e1);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 0);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(e1, e2)", function () {
                const M = e1.__lshift__(e2);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,2);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("(e1, e12)", function () {
                const M = e1.__lshift__(e12);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 2);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            // e2
            it("(e2, one)", function () {
                const M = e2.__lshift__(one);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,0);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("(e2, e1)", function () {
                const M = e2.__lshift__(e1);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,0);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("(e2, e2)", function () {
                const M = e2.__lshift__(e2);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 0);
                assert.strictEqual(M.blades[0].weight, -1);
            });
            it("(e2, e12)", function () {
                const M = e2.__lshift__(e12);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 1);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            // e12
            it("(e12, one)", function () {
                const M = e12.__lshift__(one);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,0);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("(e12, e1)", function () {
                const M = e12.__lshift__(e1);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,0);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("(e12, e2)", function () {
                const M = e12.__lshift__(e2);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,0);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("(e12, e12)", function () {
                const M = e12.__lshift__(e12);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 0);
                assert.strictEqual(M.blades[0].weight, 1);
            });
        });
        describe(">>", function () {
            // one
            it("(one, one)", function () {
                const M = one.__rshift__(one);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 0);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(one, e1)", function () {
                const M = one.__rshift__(e1);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,0);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("(one, e2)", function () {
                const M = one.__rshift__(e2);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,0);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("(one, e12)", function () {
                const M = one.__rshift__(e12);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,0);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            // e1
            it("(e1, one)", function () {
                const M = e1.__rshift__(one);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 1);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(e1, e1)", function () {
                const M = e1.__rshift__(e1);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 0);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(e1, e2)", function () {
                const M = e1.__rshift__(e2);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,0);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("(e1, e12)", function () {
                const M = e1.__rshift__(e12);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,0);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            // e2
            it("(e2, one)", function () {
                const M = e2.__rshift__(one);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 2);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(e2, e1)", function () {
                const M = e2.__rshift__(e1);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,0);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("(e2, e2)", function () {
                const M = e2.__rshift__(e2);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 0);
                assert.strictEqual(M.blades[0].weight, -1);
            });
            it("(e2, e12)", function () {
                const M = e2.__rshift__(e12);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,0);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            // e12
            it("(e12, one)", function () {
                const M = e12.__rshift__(one);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 3);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(e12, e1)", function () {
                const M = e12.__rshift__(e1);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 2);
                assert.strictEqual(M.blades[0].weight, -1);
            });
            it("(e12, e2)", function () {
                const M = e12.__rshift__(e2);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 1);
                assert.strictEqual(M.blades[0].weight, -1);
            });
            it("(e12, e12)", function () {
                const M = e12.__rshift__(e12);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 0);
                assert.strictEqual(M.blades[0].weight, 1);
            });
        });
        describe("|", function () {
            // one
            it("(one, one)", function () {
                const M = one.__vbar__(one);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 0);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(one, e1)", function () {
                const M = one.__vbar__(e1);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,0);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("(one, e2)", function () {
                const M = one.__vbar__(e2);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,0);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("(one, e12)", function () {
                const M = one.__vbar__(e12);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,0);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            // e1
            it("(e1, one)", function () {
                const M = e1.__vbar__(one);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,1);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("(e1, e1)", function () {
                const M = e1.__vbar__(e1);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 0);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("(e1, e2)", function () {
                const M = e1.__vbar__(e2);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,0);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("(e1, e12)", function () {
                const M = e1.__vbar__(e12);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,0);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            // e2
            it("(e2, one)", function () {
                const M = e2.__vbar__(one);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,2);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("(e2, e1)", function () {
                const M = e2.__vbar__(e1);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,0);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("(e2, e2)", function () {
                const M = e2.__vbar__(e2);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 0);
                assert.strictEqual(M.blades[0].weight, -1);
            });
            it("(e2, e12)", function () {
                const M = e2.__vbar__(e12);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,0);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            // e12
            it("(e12, one)", function () {
                const M = e12.__vbar__(one);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,3);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("(e12, e1)", function () {
                const M = e12.__vbar__(e1);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,2);
                // assert.strictEqual(M.blades[0].weight,-1);
            });
            it("(e12, e2)", function () {
                const M = e12.__vbar__(e2);
                assert.strictEqual(M.blades.length, 0);
                // assert.strictEqual(M.blades[0].bitmap,1);
                // assert.strictEqual(M.blades[0].weight,1);
            });
            it("(e12, e12)", function () {
                const M = e12.__vbar__(e12);
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 0);
                assert.strictEqual(M.blades[0].weight, 1);
            });
        });
        describe("inv", function () {
            it("1", function () {
                const M = one.inv();
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 0);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("e1", function () {
                const M = e1.inv();
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 1);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("e2", function () {
                const M = e2.inv();
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 2);
                assert.strictEqual(M.blades[0].weight, -1);
            });
            it("e12", function () {
                const M = e12.inv();
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 3);
                assert.strictEqual(M.blades[0].weight, 1);
            });
        });
        describe("dual", function () {
            it("1", function () {
                const M = one.dual();
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 3);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("e1", function () {
                const M = e1.dual();
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 2);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("e2", function () {
                const M = e2.dual();
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 1);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("e12", function () {
                const M = e12.dual();
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 0);
                assert.strictEqual(M.blades[0].weight, 1);
            });
        });
        describe("direction", function () {
            it("1", function () {
                const M = one.direction();
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 0);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            it("e1", function () {
                const M = e1.direction();
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 1);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            // We can't compute the direction of a vector that squares to -1 when the field
            // is like the reals and is not closed. May be we should test with complex?
            xit("e2", function () {
                const M = e2.direction();
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 2);
                assert.strictEqual(M.blades[0].weight, 1);
            });
            xit("e12", function () {
                const M = e12.direction();
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 3);
                assert.strictEqual(M.blades[0].weight, 1);
            });
        });
    });
    describe("G2 over Complex", function () {
        const G2 = algebra<Complex>([1, 1], cfa, ["e1", "e2"]);
        const one = G2.one;
        const e1 = G2.unit(0);
        const e2 = G2.unit(1);
        const e12 = e1.mul(e2);
        it("one", function () {
            assert.strictEqual(one.blades.length, 1);
            assert.strictEqual(one.blades[0].bitmap, 0);
            assert.strictEqual(one.blades[0].weight.x, 1);
            assert.strictEqual(one.blades[0].weight.y, 0);
        });
        it("e1", function () {
            assert.strictEqual(e1.blades.length, 1);
            assert.strictEqual(e1.blades[0].bitmap, 1);
            assert.strictEqual(e1.blades[0].weight.x, 1);
            assert.strictEqual(e1.blades[0].weight.y, 0);
        });
        it("e2", function () {
            assert.strictEqual(e2.blades.length, 1);
            assert.strictEqual(e2.blades[0].bitmap, 2);
            assert.strictEqual(e2.blades[0].weight.x, 1);
            assert.strictEqual(e2.blades[0].weight.y, 0);
        });
        it("e12", function () {
            assert.strictEqual(e12.blades.length, 1);
            assert.strictEqual(e12.blades[0].bitmap, 3);
            assert.strictEqual(e12.blades[0].weight.x, 1);
            assert.strictEqual(e12.blades[0].weight.y, 0);
        });
        describe("direction", function () {
            it("1", function () {
                const M = one.direction();
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 0);
                assert.strictEqual(M.blades[0].weight.x, 1);
                assert.strictEqual(M.blades[0].weight.y, 0);
            });
            it("e1", function () {
                const M = e1.direction();
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 1);
                assert.strictEqual(M.blades[0].weight.x, 1);
                assert.strictEqual(M.blades[0].weight.y, 0);
            });
            it("e2", function () {
                const M = e2.direction();
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 2);
                assert.strictEqual(M.blades[0].weight.x, 1);
                assert.strictEqual(M.blades[0].weight.y, 0);
            });
            it("e12", function () {
                const M = e12.direction();
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 3);
                assert.strictEqual(M.blades[0].weight.x, 1);
                assert.strictEqual(M.blades[0].weight.y, 0);
            });
        });
    });
    describe("G11 over Complex", function () {
        const G11 = algebra<Complex>([+1, -1], cfa, ["e1", "e2"]);
        const one = G11.one;
        const e1 = G11.unit(0);
        const e2 = G11.unit(1);
        const e12 = e1.mul(e2);
        it("one", function () {
            assert.strictEqual(one.blades.length, 1);
            assert.strictEqual(one.blades[0].bitmap, 0);
            assert.strictEqual(one.blades[0].weight.x, 1);
            assert.strictEqual(one.blades[0].weight.y, 0);
        });
        it("e1", function () {
            assert.strictEqual(e1.blades.length, 1);
            assert.strictEqual(e1.blades[0].bitmap, 1);
            assert.strictEqual(e1.blades[0].weight.x, 1);
            assert.strictEqual(e1.blades[0].weight.y, 0);
        });
        it("e2", function () {
            assert.strictEqual(e2.blades.length, 1);
            assert.strictEqual(e2.blades[0].bitmap, 2);
            assert.strictEqual(e2.blades[0].weight.x, 1);
            assert.strictEqual(e2.blades[0].weight.y, 0);
        });
        it("e12", function () {
            assert.strictEqual(e12.blades.length, 1);
            assert.strictEqual(e12.blades[0].bitmap, 3);
            assert.strictEqual(e12.blades[0].weight.x, 1);
            assert.strictEqual(e12.blades[0].weight.y, 0);
        });
        describe("direction", function () {
            it("1", function () {
                const M = one.direction();
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 0);
                assert.strictEqual(M.blades[0].weight.x, 1);
                assert.strictEqual(M.blades[0].weight.y, 0);
            });
            it("e1", function () {
                const M = e1.direction();
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 1);
                assert.strictEqual(M.blades[0].weight.x, 1);
                assert.strictEqual(M.blades[0].weight.y, 0);
            });
            it("e2", function () {
                const M = e2.direction();
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 2);
                assert.strictEqual(M.blades[0].weight.x, 0);
                assert.strictEqual(M.blades[0].weight.y, -1);
            });
            it("e12", function () {
                const M = e12.direction();
                assert.strictEqual(M.blades.length, 1);
                assert.strictEqual(M.blades[0].bitmap, 3);
                assert.strictEqual(M.blades[0].weight.x, 0);
                assert.strictEqual(M.blades[0].weight.y, -1);
            });
        });
    });
    describe("Relational", function () {
        const G2 = algebra(2, nfa, ['i', 'j']);
        const one = G2.one;
        const two = G2.one.mulByScalar(2);
        const e1 = G2.unit(0);
        const e2 = G2.unit(1);
        const e12 = e1.mul(e2);
        const sum = e1.__add__(e2);
        describe("eq", function () {
            it("one eq one", function () {
                assert.isTrue(one.__eq__(one));
            });
            it("one eq two", function () {
                assert.isFalse(one.__eq__(two));
            });
            it("e1 eq e1", function () {
                assert.isTrue(e1.__eq__(e1));
            });
            it("e1 eq e2", function () {
                assert.isFalse(e1.__eq__(e2));
            });
            it("e1 eq sum", function () {
                assert.isFalse(e1.__eq__(sum));
            });
            it("e12 eq sum", function () {
                assert.isFalse(e12.__eq__(sum));
            });
        });
        describe("ge", function () {
            it("one ge one", function () {
                assert.isTrue(one.__ge__(one));
            });
            it("one ge two", function () {
                assert.isFalse(one.__ge__(two));
            });
            it("two ge one", function () {
                assert.isTrue(two.__ge__(one));
            });
        });
        describe("gt", function () {
            it("one gt one", function () {
                assert.isFalse(one.__gt__(one));
            });
            it("one gt two", function () {
                assert.isFalse(one.__gt__(two));
            });
            it("two ge one", function () {
                assert.isTrue(two.__ge__(one));
            });
        });
        describe("le", function () {
            it("one le one", function () {
                assert.isTrue(one.__le__(one));
            });
            it("one le two", function () {
                assert.isTrue(one.__le__(two));
            });
            it("two le one", function () {
                assert.isFalse(two.__le__(one));
            });
        });
        describe("lt", function () {
            it("one lt one", function () {
                assert.isFalse(one.__lt__(one));
            });
            it("one lt two", function () {
                assert.isTrue(one.__lt__(two));
            });
            it("two lt one", function () {
                assert.isFalse(two.__lt__(one));
            });
        });
        describe("ne", function () {
            it("one ne one", function () {
                assert.isFalse(one.__ne__(one));
            });
            it("one ne two", function () {
                assert.isTrue(one.__ne__(two));
            });
            it("e1 ne e1", function () {
                assert.isFalse(e1.__ne__(e1));
            });
            it("e1 ne e2", function () {
                assert.isTrue(e1.__ne__(e2));
            });
        });
    });
});
