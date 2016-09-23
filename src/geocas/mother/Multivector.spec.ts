import ComplexFieldAdapter from './ComplexFieldAdapter';
import {algebra} from './Multivector';
import NumberFieldAdapter from './NumberFieldAdapter';
import sortBlades from './sortBlades';

const cfa = new ComplexFieldAdapter();
const nfa = new NumberFieldAdapter();

describe("Multivector", function () {
    describe("G2 over number", function () {
        const G2 = algebra(2, nfa, ['e1', 'e2']);
        const one = G2.one;
        const e1 = G2.unit(0);
        const e2 = G2.unit(1);
        const e12 = e1.mul(e2);
        it("one", function () {
            expect(one).toBeDefined();
            expect(one.blades.length).toBe(1);
            expect(one.blades[0].bitmap).toBe(0);
            expect(one.blades[0].weight).toBe(1);
        });

        it("e1", function () {
            expect(e1.blades.length).toBe(1);
            expect(e1.blades[0].bitmap).toBe(1);
            expect(e1.blades[0].weight).toBe(1);
        });
        it("e2", function () {
            expect(e2.blades.length).toBe(1);
            expect(e2.blades[0].bitmap).toBe(2);
            expect(e2.blades[0].weight).toBe(1);
        });
        it("e12", function () {
            expect(e12.blades.length).toBe(1);
            expect(e12.blades[0].bitmap).toBe(3);
            expect(e12.blades[0].weight).toBe(1);
        });
        describe("+", function () {
            // one
            it("(one, one)", function () {
                const M = one.__add__(one);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(1);
                expect(blades[0].bitmap).toBe(0);
                expect(blades[0].weight).toBe(2);
            });
            it("(one, e1)", function () {
                const M = one.__add__(e1);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(0);
                expect(blades[0].weight).toBe(1);
                expect(blades[1].bitmap).toBe(1);
                expect(blades[1].weight).toBe(1);
            });
            it("(one, e2", function () {
                const M = one.__add__(e2);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(0);
                expect(blades[0].weight).toBe(1);
                expect(blades[1].bitmap).toBe(2);
                expect(blades[1].weight).toBe(1);
            });
            it("(one, e12)", function () {
                const M = one.__add__(e12);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(0);
                expect(blades[0].weight).toBe(1);
                expect(blades[1].bitmap).toBe(3);
                expect(blades[1].weight).toBe(1);
            });
            // e1
            it("(e1, one)", function () {
                const M = e1.__add__(one);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(0);
                expect(blades[0].weight).toBe(1);
                expect(blades[1].bitmap).toBe(1);
                expect(blades[1].weight).toBe(1);
            });
            it("(e1, e1)", function () {
                const M = e1.__add__(e1);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(1);
                expect(blades[0].bitmap).toBe(1);
                expect(blades[0].weight).toBe(2);
            });
            it("(e1, e2", function () {
                const M = e1.__add__(e2);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(1);
                expect(blades[0].weight).toBe(1);
                expect(blades[1].bitmap).toBe(2);
                expect(blades[1].weight).toBe(1);
            });
            it("(e1, e12)", function () {
                const M = e1.__add__(e12);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(1);
                expect(blades[0].weight).toBe(1);
                expect(blades[1].bitmap).toBe(3);
                expect(blades[1].weight).toBe(1);
            });
            // e2
            it("(e2, one)", function () {
                const M = e2.__add__(one);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(0);
                expect(blades[0].weight).toBe(1);
                expect(blades[1].bitmap).toBe(2);
                expect(blades[1].weight).toBe(1);
            });
            it("(e2, e1)", function () {
                const M = e2.__add__(e1);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(1);
                expect(blades[0].weight).toBe(1);
                expect(blades[1].bitmap).toBe(2);
                expect(blades[1].weight).toBe(1);
            });
            it("(e2, e2", function () {
                const M = e2.__add__(e2);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(1);
                expect(blades[0].bitmap).toBe(2);
                expect(blades[0].weight).toBe(2);
            });
            it("(e2, e12)", function () {
                const M = e2.__add__(e12);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(2);
                expect(blades[0].weight).toBe(1);
                expect(blades[1].bitmap).toBe(3);
                expect(blades[1].weight).toBe(1);
            });
            // e12
            it("(e12, one)", function () {
                const M = e12.__add__(one);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(0);
                expect(blades[0].weight).toBe(1);
                expect(blades[1].bitmap).toBe(3);
                expect(blades[1].weight).toBe(1);
            });
            it("(e12, e1)", function () {
                const M = e12.__add__(e1);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(1);
                expect(blades[0].weight).toBe(1);
                expect(blades[1].bitmap).toBe(3);
                expect(blades[1].weight).toBe(1);
            });
            it("(e12, e2", function () {
                const M = e12.__add__(e2);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(2);
                expect(blades[0].weight).toBe(1);
                expect(blades[1].bitmap).toBe(3);
                expect(blades[1].weight).toBe(1);
            });
            it("(e12, e12)", function () {
                const M = e12.__add__(e12);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(1);
                expect(blades[0].bitmap).toBe(3);
                expect(blades[0].weight).toBe(2);
            });
        });
        describe("-", function () {
            // one
            it("(one, one)", function () {
                const M = one.__sub__(one);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(0);
                // expect(blades[0].bitmap).toBe(0);
                // expect(blades[0].weight).toBe(2);
            });
            it("(one, e1)", function () {
                const M = one.__sub__(e1);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(0);
                expect(blades[0].weight).toBe(1);
                expect(blades[1].bitmap).toBe(1);
                expect(blades[1].weight).toBe(-1);
            });
            it("(one, e2", function () {
                const M = one.__sub__(e2);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(0);
                expect(blades[0].weight).toBe(1);
                expect(blades[1].bitmap).toBe(2);
                expect(blades[1].weight).toBe(-1);
            });
            it("(one, e12)", function () {
                const M = one.__sub__(e12);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(0);
                expect(blades[0].weight).toBe(1);
                expect(blades[1].bitmap).toBe(3);
                expect(blades[1].weight).toBe(-1);
            });
            // e1
            it("(e1, one)", function () {
                const M = e1.__sub__(one);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(0);
                expect(blades[0].weight).toBe(-1);
                expect(blades[1].bitmap).toBe(1);
                expect(blades[1].weight).toBe(1);
            });
            it("(e1, e1)", function () {
                const M = e1.__sub__(e1);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(0);
                // expect(blades[0].bitmap).toBe(1);
                // expect(blades[0].weight).toBe(2);
            });
            it("(e1, e2", function () {
                const M = e1.__sub__(e2);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(1);
                expect(blades[0].weight).toBe(1);
                expect(blades[1].bitmap).toBe(2);
                expect(blades[1].weight).toBe(-1);
            });
            it("(e1, e12)", function () {
                const M = e1.__sub__(e12);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(1);
                expect(blades[0].weight).toBe(1);
                expect(blades[1].bitmap).toBe(3);
                expect(blades[1].weight).toBe(-1);
            });
            // e2
            it("(e2, one)", function () {
                const M = e2.__sub__(one);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(0);
                expect(blades[0].weight).toBe(-1);
                expect(blades[1].bitmap).toBe(2);
                expect(blades[1].weight).toBe(1);
            });
            it("(e2, e1)", function () {
                const M = e2.__sub__(e1);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(1);
                expect(blades[0].weight).toBe(-1);
                expect(blades[1].bitmap).toBe(2);
                expect(blades[1].weight).toBe(1);
            });
            it("(e2, e2", function () {
                const M = e2.__sub__(e2);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(0);
                // expect(blades[0].bitmap).toBe(2);
                // expect(blades[0].weight).toBe(2);
            });
            it("(e2, e12)", function () {
                const M = e2.__sub__(e12);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(2);
                expect(blades[0].weight).toBe(1);
                expect(blades[1].bitmap).toBe(3);
                expect(blades[1].weight).toBe(-1);
            });
            // e12
            it("(e12, one)", function () {
                const M = e12.__sub__(one);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(0);
                expect(blades[0].weight).toBe(-1);
                expect(blades[1].bitmap).toBe(3);
                expect(blades[1].weight).toBe(1);
            });
            it("(e12, e1)", function () {
                const M = e12.__sub__(e1);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(1);
                expect(blades[0].weight).toBe(-1);
                expect(blades[1].bitmap).toBe(3);
                expect(blades[1].weight).toBe(1);
            });
            it("(e12, e2", function () {
                const M = e12.__sub__(e2);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(2);
                expect(blades[0].weight).toBe(-1);
                expect(blades[1].bitmap).toBe(3);
                expect(blades[1].weight).toBe(1);
            });
            it("(e12, e12)", function () {
                const M = e12.__sub__(e12);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(0);
                // expect(blades[0].bitmap).toBe(3);
                // expect(blades[0].weight).toBe(2);
            });
        });
        describe("*", function () {
            // one
            it("one * one", function () {
                const M = one.__mul__(one);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(0);
                expect(M.blades[0].weight).toBe(1);
            });
            it("one * e1", function () {
                const M = one.__mul__(e1);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(1);
                expect(M.blades[0].weight).toBe(1);
            });
            it("one * e2", function () {
                const M = one.__mul__(e2);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(2);
                expect(M.blades[0].weight).toBe(1);
            });
            it("one * e12", function () {
                const M = one.__mul__(e12);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(3);
                expect(M.blades[0].weight).toBe(1);
            });
            // e1
            it("(e1, one)", function () {
                const M = e1.__mul__(one);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(1);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(e1, e1)", function () {
                const M = e1.__mul__(e1);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(0);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(e1, e2)", function () {
                const M = e1.__mul__(e2);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(3);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(e1, e12)", function () {
                const M = e1.__mul__(e12);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(2);
                expect(M.blades[0].weight).toBe(1);
            });
            // e2
            it("(e2, one)", function () {
                const M = e2.__mul__(one);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(2);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(e2, e1)", function () {
                const M = e2.__mul__(e1);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(3);
                expect(M.blades[0].weight).toBe(-1);
            });
            it("(e2, e2)", function () {
                const M = e2.__mul__(e2);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(0);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(e2, e12)", function () {
                const M = e2.__mul__(e12);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(1);
                expect(M.blades[0].weight).toBe(-1);
            });
            // e12
            it("(e12, one)", function () {
                const M = e12.__mul__(one);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(3);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(e12, e1)", function () {
                const M = e12.__mul__(e1);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(2);
                expect(M.blades[0].weight).toBe(-1);
            });
            it("(e12, e2)", function () {
                const M = e12.__mul__(e2);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(1);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(e12, e12)", function () {
                const M = e12.__mul__(e12);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(0);
                expect(M.blades[0].weight).toBe(-1);
            });
        });
        describe("^", function () {
            // one
            it("one ^ one", function () {
                const M = one.__wedge__(one);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(0);
                expect(M.blades[0].weight).toBe(1);
            });
            it("one ^ e1", function () {
                const M = one.__wedge__(e1);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(1);
                expect(M.blades[0].weight).toBe(1);
            });
            it("one ^ e2", function () {
                const M = one.__wedge__(e2);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(2);
                expect(M.blades[0].weight).toBe(1);
            });
            it("one ^ e12", function () {
                const M = one.__wedge__(e12);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(3);
                expect(M.blades[0].weight).toBe(1);
            });
            // e1
            it("(e1, one)", function () {
                const M = e1.__wedge__(one);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(1);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(e1 ^ e1)", function () {
                const M = e1.__wedge__(e1);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(1);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("e1 ^ e2", function () {
                const M = e1.__wedge__(e2);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(3);
                expect(M.blades[0].weight).toBe(1);
            });
            it("e1 ^ e12", function () {
                const M = e1.__wedge__(e12);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(3);
                // expect(M.blades[0].weight).toBe(1);
            });
            // e2
            it("(e2, one)", function () {
                const M = e2.__wedge__(one);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(2);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(e2 ^ e1)", function () {
                const M = e2.__wedge__(e1);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(3);
                expect(M.blades[0].weight).toBe(-1);
            });
            it("e2 ^ e2", function () {
                const M = e2.__wedge__(e2);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(3);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("e2 ^ e12", function () {
                const M = e2.__wedge__(e12);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(3);
                // expect(M.blades[0].weight).toBe(1);
            });
            // e12
            it("(e12, one)", function () {
                const M = e12.__wedge__(one);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(3);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(e12 ^ e1)", function () {
                const M = e12.__wedge__(e1);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(3);
                // expect(M.blades[0].weight).toBe(-1);
            });
            it("e12 ^ e2", function () {
                const M = e12.__wedge__(e2);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(3);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("e12 ^ e12", function () {
                const M = e12.__wedge__(e12);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(3);
                // expect(M.blades[0].weight).toBe(1);
            });
        });
        describe("<<", function () {
            // one
            it("(one, one)", function () {
                const M = one.__lshift__(one);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(0);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(one, e1)", function () {
                const M = one.__lshift__(e1);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(1);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(one, e2)", function () {
                const M = one.__lshift__(e2);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(2);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(one, e12)", function () {
                const M = one.__lshift__(e12);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(3);
                expect(M.blades[0].weight).toBe(1);
            });
            // e1
            it("(e1, one)", function () {
                const M = e1.__lshift__(one);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(0);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("(e1, e1)", function () {
                const M = e1.__lshift__(e1);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(0);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(e1, e2)", function () {
                const M = e1.__lshift__(e2);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(2);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("(e1, e12)", function () {
                const M = e1.__lshift__(e12);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(2);
                expect(M.blades[0].weight).toBe(1);
            });
            // e2
            it("(e2, one)", function () {
                const M = e2.__lshift__(one);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(0);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("(e2, e1)", function () {
                const M = e2.__lshift__(e1);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(0);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("(e2, e2)", function () {
                const M = e2.__lshift__(e2);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(0);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(e2, e12)", function () {
                const M = e2.__lshift__(e12);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(1);
                expect(M.blades[0].weight).toBe(-1);
            });
            // e12
            it("(e12, one)", function () {
                const M = e12.__lshift__(one);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(0);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("(e12, e1)", function () {
                const M = e12.__lshift__(e1);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(0);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("(e12, e2)", function () {
                const M = e12.__lshift__(e2);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(0);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("(e12, e12)", function () {
                const M = e12.__lshift__(e12);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(0);
                expect(M.blades[0].weight).toBe(-1);
            });
        });
        describe(">>", function () {
            // one
            it("(one, one)", function () {
                const M = one.__rshift__(one);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(0);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(one, e1)", function () {
                const M = one.__rshift__(e1);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(0);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("(one, e2)", function () {
                const M = one.__rshift__(e2);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(0);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("(one, e12)", function () {
                const M = one.__rshift__(e12);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(0);
                // expect(M.blades[0].weight).toBe(1);
            });
            // e1
            it("(e1, one)", function () {
                const M = e1.__rshift__(one);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(1);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(e1, e1)", function () {
                const M = e1.__rshift__(e1);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(0);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(e1, e2)", function () {
                const M = e1.__rshift__(e2);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(0);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("(e1, e12)", function () {
                const M = e1.__rshift__(e12);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(0);
                // expect(M.blades[0].weight).toBe(1);
            });
            // e2
            it("(e2, one)", function () {
                const M = e2.__rshift__(one);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(2);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(e2, e1)", function () {
                const M = e2.__rshift__(e1);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(0);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("(e2, e2)", function () {
                const M = e2.__rshift__(e2);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(0);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(e2, e12)", function () {
                const M = e2.__rshift__(e12);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(0);
                // expect(M.blades[0].weight).toBe(1);
            });
            // e12
            it("(e12, one)", function () {
                const M = e12.__rshift__(one);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(3);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(e12, e1)", function () {
                const M = e12.__rshift__(e1);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(2);
                expect(M.blades[0].weight).toBe(-1);
            });
            it("(e12, e2)", function () {
                const M = e12.__rshift__(e2);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(1);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(e12, e12)", function () {
                const M = e12.__rshift__(e12);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(0);
                expect(M.blades[0].weight).toBe(-1);
            });
        });
        describe("|", function () {
            // one
            it("(one, one)", function () {
                const M = one.__vbar__(one);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(0);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(one, e1)", function () {
                const M = one.__vbar__(e1);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(0);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("(one, e2)", function () {
                const M = one.__vbar__(e2);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(0);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("(one, e12)", function () {
                const M = one.__vbar__(e12);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(0);
                // expect(M.blades[0].weight).toBe(1);
            });
            // e1
            it("(e1, one)", function () {
                const M = e1.__vbar__(one);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(1);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("(e1, e1)", function () {
                const M = e1.__vbar__(e1);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(0);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(e1, e2)", function () {
                const M = e1.__vbar__(e2);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(0);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("(e1, e12)", function () {
                const M = e1.__vbar__(e12);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(0);
                // expect(M.blades[0].weight).toBe(1);
            });
            // e2
            it("(e2, one)", function () {
                const M = e2.__vbar__(one);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(2);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("(e2, e1)", function () {
                const M = e2.__vbar__(e1);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(0);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("(e2, e2)", function () {
                const M = e2.__vbar__(e2);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(0);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(e2, e12)", function () {
                const M = e2.__vbar__(e12);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(0);
                // expect(M.blades[0].weight).toBe(1);
            });
            // e12
            it("(e12, one)", function () {
                const M = e12.__vbar__(one);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(3);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("(e12, e1)", function () {
                const M = e12.__vbar__(e1);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(2);
                // expect(M.blades[0].weight).toBe(-1);
            });
            it("(e12, e2)", function () {
                const M = e12.__vbar__(e2);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(1);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("(e12, e12)", function () {
                const M = e12.__vbar__(e12);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(0);
                expect(M.blades[0].weight).toBe(-1);
            });
        });
        describe("inv", function () {
            it("1", function () {
                const M = one.inv();
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(0);
                expect(M.blades[0].weight).toBe(1);
            });
            it("e1", function () {
                const M = e1.inv();
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(1);
                expect(M.blades[0].weight).toBe(1);
            });
            it("e2", function () {
                const M = e2.inv();
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(2);
                expect(M.blades[0].weight).toBe(1);
            });
            it("e12", function () {
                const M = e12.inv();
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(3);
                expect(M.blades[0].weight).toBe(-1);
            });
        });
        describe("dual", function () {
            it("1", function () {
                const M = one.dual();
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(3);
                expect(M.blades[0].weight).toBe(1);
            });
            it("e1", function () {
                const M = e1.dual();
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(2);
                expect(M.blades[0].weight).toBe(1);
            });
            it("e2", function () {
                const M = e2.dual();
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(1);
                expect(M.blades[0].weight).toBe(-1);
            });
            it("e12", function () {
                const M = e12.dual();
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(0);
                expect(M.blades[0].weight).toBe(-1);
            });
        });
        describe("direction", function () {
            it("1", function () {
                const M = one.direction();
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(0);
                expect(M.blades[0].weight).toBe(1);
            });
            it("e1", function () {
                const M = e1.direction();
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(1);
                expect(M.blades[0].weight).toBe(1);
            });
            it("e2", function () {
                const M = e2.direction();
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(2);
                expect(M.blades[0].weight).toBe(1);
            });
            it("e12", function () {
                const M = e12.direction();
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(3);
                expect(M.blades[0].weight).toBe(1);
            });
        });
    });
    describe("G11 over number", function () {
        const G11 = algebra([1, -1], nfa);
        const one = G11.one;
        const e1 = G11.unit(0);
        const e2 = G11.unit(1);
        const e12 = e1.mul(e2);
        it("one", function () {
            expect(one.blades.length).toBe(1);
            expect(one.blades[0].bitmap).toBe(0);
            expect(one.blades[0].weight).toBe(1);
        });
        it("e1", function () {
            expect(e1.blades.length).toBe(1);
            expect(e1.blades[0].bitmap).toBe(1);
            expect(e1.blades[0].weight).toBe(1);
        });
        it("e2", function () {
            expect(e2.blades.length).toBe(1);
            expect(e2.blades[0].bitmap).toBe(2);
            expect(e2.blades[0].weight).toBe(1);
        });
        it("e12", function () {
            expect(e12.blades.length).toBe(1);
            expect(e12.blades[0].bitmap).toBe(3);
            expect(e12.blades[0].weight).toBe(1);
        });
        describe("+", function () {
            // one
            it("(one, one)", function () {
                const M = one.__add__(one);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(1);
                expect(blades[0].bitmap).toBe(0);
                expect(blades[0].weight).toBe(2);
            });
            it("(one, e1)", function () {
                const M = one.__add__(e1);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(0);
                expect(blades[0].weight).toBe(1);
                expect(blades[1].bitmap).toBe(1);
                expect(blades[1].weight).toBe(1);
            });
            it("(one, e2", function () {
                const M = one.__add__(e2);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(0);
                expect(blades[0].weight).toBe(1);
                expect(blades[1].bitmap).toBe(2);
                expect(blades[1].weight).toBe(1);
            });
            it("(one, e12)", function () {
                const M = one.__add__(e12);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(0);
                expect(blades[0].weight).toBe(1);
                expect(blades[1].bitmap).toBe(3);
                expect(blades[1].weight).toBe(1);
            });
            // e1
            it("(e1, one)", function () {
                const M = e1.__add__(one);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(0);
                expect(blades[0].weight).toBe(1);
                expect(blades[1].bitmap).toBe(1);
                expect(blades[1].weight).toBe(1);
            });
            it("(e1, e1)", function () {
                const M = e1.__add__(e1);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(1);
                expect(blades[0].bitmap).toBe(1);
                expect(blades[0].weight).toBe(2);
            });
            it("(e1, e2", function () {
                const M = e1.__add__(e2);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(1);
                expect(blades[0].weight).toBe(1);
                expect(blades[1].bitmap).toBe(2);
                expect(blades[1].weight).toBe(1);
            });
            it("(e1, e12)", function () {
                const M = e1.__add__(e12);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(1);
                expect(blades[0].weight).toBe(1);
                expect(blades[1].bitmap).toBe(3);
                expect(blades[1].weight).toBe(1);
            });
            // e2
            it("(e2, one)", function () {
                const M = e2.__add__(one);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(0);
                expect(blades[0].weight).toBe(1);
                expect(blades[1].bitmap).toBe(2);
                expect(blades[1].weight).toBe(1);
            });
            it("(e2, e1)", function () {
                const M = e2.__add__(e1);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(1);
                expect(blades[0].weight).toBe(1);
                expect(blades[1].bitmap).toBe(2);
                expect(blades[1].weight).toBe(1);
            });
            it("(e2, e2", function () {
                const M = e2.__add__(e2);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(1);
                expect(blades[0].bitmap).toBe(2);
                expect(blades[0].weight).toBe(2);
            });
            it("(e2, e12)", function () {
                const M = e2.__add__(e12);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(2);
                expect(blades[0].weight).toBe(1);
                expect(blades[1].bitmap).toBe(3);
                expect(blades[1].weight).toBe(1);
            });
            // e12
            it("(e12, one)", function () {
                const M = e12.__add__(one);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(0);
                expect(blades[0].weight).toBe(1);
                expect(blades[1].bitmap).toBe(3);
                expect(blades[1].weight).toBe(1);
            });
            it("(e12, e1)", function () {
                const M = e12.__add__(e1);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(1);
                expect(blades[0].weight).toBe(1);
                expect(blades[1].bitmap).toBe(3);
                expect(blades[1].weight).toBe(1);
            });
            it("(e12, e2", function () {
                const M = e12.__add__(e2);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(2);
                expect(blades[0].weight).toBe(1);
                expect(blades[1].bitmap).toBe(3);
                expect(blades[1].weight).toBe(1);
            });
            it("(e12, e12)", function () {
                const M = e12.__add__(e12);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(1);
                expect(blades[0].bitmap).toBe(3);
                expect(blades[0].weight).toBe(2);
            });
        });
        describe("-", function () {
            // one
            it("(one, one)", function () {
                const M = one.__sub__(one);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(0);
                // expect(blades[0].bitmap).toBe(0);
                // expect(blades[0].weight).toBe(2);
            });
            it("(one, e1)", function () {
                const M = one.__sub__(e1);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(0);
                expect(blades[0].weight).toBe(1);
                expect(blades[1].bitmap).toBe(1);
                expect(blades[1].weight).toBe(-1);
            });
            it("(one, e2", function () {
                const M = one.__sub__(e2);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(0);
                expect(blades[0].weight).toBe(1);
                expect(blades[1].bitmap).toBe(2);
                expect(blades[1].weight).toBe(-1);
            });
            it("(one, e12)", function () {
                const M = one.__sub__(e12);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(0);
                expect(blades[0].weight).toBe(1);
                expect(blades[1].bitmap).toBe(3);
                expect(blades[1].weight).toBe(-1);
            });
            // e1
            it("(e1, one)", function () {
                const M = e1.__sub__(one);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(0);
                expect(blades[0].weight).toBe(-1);
                expect(blades[1].bitmap).toBe(1);
                expect(blades[1].weight).toBe(1);
            });
            it("(e1, e1)", function () {
                const M = e1.__sub__(e1);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(0);
                // expect(blades[0].bitmap).toBe(1);
                // expect(blades[0].weight).toBe(2);
            });
            it("(e1, e2", function () {
                const M = e1.__sub__(e2);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(1);
                expect(blades[0].weight).toBe(1);
                expect(blades[1].bitmap).toBe(2);
                expect(blades[1].weight).toBe(-1);
            });
            it("(e1, e12)", function () {
                const M = e1.__sub__(e12);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(1);
                expect(blades[0].weight).toBe(1);
                expect(blades[1].bitmap).toBe(3);
                expect(blades[1].weight).toBe(-1);
            });
            // e2
            it("(e2, one)", function () {
                const M = e2.__sub__(one);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(0);
                expect(blades[0].weight).toBe(-1);
                expect(blades[1].bitmap).toBe(2);
                expect(blades[1].weight).toBe(1);
            });
            it("(e2, e1)", function () {
                const M = e2.__sub__(e1);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(1);
                expect(blades[0].weight).toBe(-1);
                expect(blades[1].bitmap).toBe(2);
                expect(blades[1].weight).toBe(1);
            });
            it("(e2, e2", function () {
                const M = e2.__sub__(e2);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(0);
                // expect(blades[0].bitmap).toBe(2);
                // expect(blades[0].weight).toBe(2);
            });
            it("(e2, e12)", function () {
                const M = e2.__sub__(e12);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(2);
                expect(blades[0].weight).toBe(1);
                expect(blades[1].bitmap).toBe(3);
                expect(blades[1].weight).toBe(-1);
            });
            // e12
            it("(e12, one)", function () {
                const M = e12.__sub__(one);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(0);
                expect(blades[0].weight).toBe(-1);
                expect(blades[1].bitmap).toBe(3);
                expect(blades[1].weight).toBe(1);
            });
            it("(e12, e1)", function () {
                const M = e12.__sub__(e1);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(1);
                expect(blades[0].weight).toBe(-1);
                expect(blades[1].bitmap).toBe(3);
                expect(blades[1].weight).toBe(1);
            });
            it("(e12, e2", function () {
                const M = e12.__sub__(e2);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(2);
                expect(blades[0].bitmap).toBe(2);
                expect(blades[0].weight).toBe(-1);
                expect(blades[1].bitmap).toBe(3);
                expect(blades[1].weight).toBe(1);
            });
            it("(e12, e12)", function () {
                const M = e12.__sub__(e12);
                const blades = sortBlades(M.blades);
                expect(blades.length).toBe(0);
                // expect(blades[0].bitmap).toBe(3);
                // expect(blades[0].weight).toBe(2);
            });
        });
        describe("*", function () {
            // one
            it("one * one", function () {
                const M = one.__mul__(one);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(0);
                expect(M.blades[0].weight).toBe(1);
            });
            it("one * e1", function () {
                const M = one.__mul__(e1);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(1);
                expect(M.blades[0].weight).toBe(1);
            });
            it("one * e2", function () {
                const M = one.__mul__(e2);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(2);
                expect(M.blades[0].weight).toBe(1);
            });
            it("one * e12", function () {
                const M = one.__mul__(e12);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(3);
                expect(M.blades[0].weight).toBe(1);
            });
            // e1
            it("(e1, one)", function () {
                const M = e1.__mul__(one);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(1);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(e1, e1)", function () {
                const M = e1.__mul__(e1);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(0);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(e1, e2)", function () {
                const M = e1.__mul__(e2);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(3);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(e1, e12)", function () {
                const M = e1.__mul__(e12);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(2);
                expect(M.blades[0].weight).toBe(1);
            });
            // e2
            it("(e2, one)", function () {
                const M = e2.__mul__(one);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(2);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(e2, e1)", function () {
                const M = e2.__mul__(e1);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(3);
                expect(M.blades[0].weight).toBe(-1);
            });
            it("(e2, e2)", function () {
                const M = e2.__mul__(e2);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(0);
                expect(M.blades[0].weight).toBe(-1);
            });
            it("(e2, e12)", function () {
                const M = e2.__mul__(e12);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(1);
                expect(M.blades[0].weight).toBe(1);
            });
            // e12
            it("(e12, one)", function () {
                const M = e12.__mul__(one);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(3);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(e12, e1)", function () {
                const M = e12.__mul__(e1);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(2);
                expect(M.blades[0].weight).toBe(-1);
            });
            it("(e12, e2)", function () {
                const M = e12.__mul__(e2);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(1);
                expect(M.blades[0].weight).toBe(-1);
            });
            it("(e12, e12)", function () {
                const M = e12.__mul__(e12);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(0);
                expect(M.blades[0].weight).toBe(1);
            });
        });
        describe("^", function () {
            // one
            it("one ^ one", function () {
                const M = one.__wedge__(one);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(0);
                expect(M.blades[0].weight).toBe(1);
            });
            it("one ^ e1", function () {
                const M = one.__wedge__(e1);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(1);
                expect(M.blades[0].weight).toBe(1);
            });
            it("one ^ e2", function () {
                const M = one.__wedge__(e2);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(2);
                expect(M.blades[0].weight).toBe(1);
            });
            it("one ^ e12", function () {
                const M = one.__wedge__(e12);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(3);
                expect(M.blades[0].weight).toBe(1);
            });
            // e1
            it("(e1, one)", function () {
                const M = e1.__wedge__(one);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(1);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(e1 ^ e1)", function () {
                const M = e1.__wedge__(e1);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(1);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("e1 ^ e2", function () {
                const M = e1.__wedge__(e2);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(3);
                expect(M.blades[0].weight).toBe(1);
            });
            it("e1 ^ e12", function () {
                const M = e1.__wedge__(e12);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(3);
                // expect(M.blades[0].weight).toBe(1);
            });
            // e2
            it("(e2, one)", function () {
                const M = e2.__wedge__(one);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(2);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(e2 ^ e1)", function () {
                const M = e2.__wedge__(e1);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(3);
                expect(M.blades[0].weight).toBe(-1);
            });
            it("e2 ^ e2", function () {
                const M = e2.__wedge__(e2);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(3);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("e2 ^ e12", function () {
                const M = e2.__wedge__(e12);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(3);
                // expect(M.blades[0].weight).toBe(1);
            });
            // e12
            it("(e12, one)", function () {
                const M = e12.__wedge__(one);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(3);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(e12 ^ e1)", function () {
                const M = e12.__wedge__(e1);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(3);
                // expect(M.blades[0].weight).toBe(-1);
            });
            it("e12 ^ e2", function () {
                const M = e12.__wedge__(e2);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(3);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("e12 ^ e12", function () {
                const M = e12.__wedge__(e12);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(3);
                // expect(M.blades[0].weight).toBe(1);
            });
        });
        describe("<<", function () {
            // one
            it("(one, one)", function () {
                const M = one.__lshift__(one);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(0);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(one, e1)", function () {
                const M = one.__lshift__(e1);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(1);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(one, e2)", function () {
                const M = one.__lshift__(e2);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(2);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(one, e12)", function () {
                const M = one.__lshift__(e12);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(3);
                expect(M.blades[0].weight).toBe(1);
            });
            // e1
            it("(e1, one)", function () {
                const M = e1.__lshift__(one);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(0);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("(e1, e1)", function () {
                const M = e1.__lshift__(e1);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(0);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(e1, e2)", function () {
                const M = e1.__lshift__(e2);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(2);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("(e1, e12)", function () {
                const M = e1.__lshift__(e12);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(2);
                expect(M.blades[0].weight).toBe(1);
            });
            // e2
            it("(e2, one)", function () {
                const M = e2.__lshift__(one);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(0);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("(e2, e1)", function () {
                const M = e2.__lshift__(e1);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(0);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("(e2, e2)", function () {
                const M = e2.__lshift__(e2);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(0);
                expect(M.blades[0].weight).toBe(-1);
            });
            it("(e2, e12)", function () {
                const M = e2.__lshift__(e12);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(1);
                expect(M.blades[0].weight).toBe(1);
            });
            // e12
            it("(e12, one)", function () {
                const M = e12.__lshift__(one);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(0);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("(e12, e1)", function () {
                const M = e12.__lshift__(e1);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(0);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("(e12, e2)", function () {
                const M = e12.__lshift__(e2);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(0);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("(e12, e12)", function () {
                const M = e12.__lshift__(e12);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(0);
                expect(M.blades[0].weight).toBe(1);
            });
        });
        describe(">>", function () {
            // one
            it("(one, one)", function () {
                const M = one.__rshift__(one);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(0);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(one, e1)", function () {
                const M = one.__rshift__(e1);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(0);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("(one, e2)", function () {
                const M = one.__rshift__(e2);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(0);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("(one, e12)", function () {
                const M = one.__rshift__(e12);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(0);
                // expect(M.blades[0].weight).toBe(1);
            });
            // e1
            it("(e1, one)", function () {
                const M = e1.__rshift__(one);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(1);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(e1, e1)", function () {
                const M = e1.__rshift__(e1);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(0);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(e1, e2)", function () {
                const M = e1.__rshift__(e2);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(0);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("(e1, e12)", function () {
                const M = e1.__rshift__(e12);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(0);
                // expect(M.blades[0].weight).toBe(1);
            });
            // e2
            it("(e2, one)", function () {
                const M = e2.__rshift__(one);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(2);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(e2, e1)", function () {
                const M = e2.__rshift__(e1);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(0);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("(e2, e2)", function () {
                const M = e2.__rshift__(e2);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(0);
                expect(M.blades[0].weight).toBe(-1);
            });
            it("(e2, e12)", function () {
                const M = e2.__rshift__(e12);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(0);
                // expect(M.blades[0].weight).toBe(1);
            });
            // e12
            it("(e12, one)", function () {
                const M = e12.__rshift__(one);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(3);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(e12, e1)", function () {
                const M = e12.__rshift__(e1);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(2);
                expect(M.blades[0].weight).toBe(-1);
            });
            it("(e12, e2)", function () {
                const M = e12.__rshift__(e2);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(1);
                expect(M.blades[0].weight).toBe(-1);
            });
            it("(e12, e12)", function () {
                const M = e12.__rshift__(e12);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(0);
                expect(M.blades[0].weight).toBe(1);
            });
        });
        describe("|", function () {
            // one
            it("(one, one)", function () {
                const M = one.__vbar__(one);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(0);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(one, e1)", function () {
                const M = one.__vbar__(e1);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(0);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("(one, e2)", function () {
                const M = one.__vbar__(e2);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(0);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("(one, e12)", function () {
                const M = one.__vbar__(e12);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(0);
                // expect(M.blades[0].weight).toBe(1);
            });
            // e1
            it("(e1, one)", function () {
                const M = e1.__vbar__(one);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(1);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("(e1, e1)", function () {
                const M = e1.__vbar__(e1);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(0);
                expect(M.blades[0].weight).toBe(1);
            });
            it("(e1, e2)", function () {
                const M = e1.__vbar__(e2);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(0);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("(e1, e12)", function () {
                const M = e1.__vbar__(e12);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(0);
                // expect(M.blades[0].weight).toBe(1);
            });
            // e2
            it("(e2, one)", function () {
                const M = e2.__vbar__(one);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(2);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("(e2, e1)", function () {
                const M = e2.__vbar__(e1);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(0);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("(e2, e2)", function () {
                const M = e2.__vbar__(e2);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(0);
                expect(M.blades[0].weight).toBe(-1);
            });
            it("(e2, e12)", function () {
                const M = e2.__vbar__(e12);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(0);
                // expect(M.blades[0].weight).toBe(1);
            });
            // e12
            it("(e12, one)", function () {
                const M = e12.__vbar__(one);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(3);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("(e12, e1)", function () {
                const M = e12.__vbar__(e1);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(2);
                // expect(M.blades[0].weight).toBe(-1);
            });
            it("(e12, e2)", function () {
                const M = e12.__vbar__(e2);
                expect(M.blades.length).toBe(0);
                // expect(M.blades[0].bitmap).toBe(1);
                // expect(M.blades[0].weight).toBe(1);
            });
            it("(e12, e12)", function () {
                const M = e12.__vbar__(e12);
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(0);
                expect(M.blades[0].weight).toBe(1);
            });
        });
        describe("inv", function () {
            it("1", function () {
                const M = one.inv();
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(0);
                expect(M.blades[0].weight).toBe(1);
            });
            it("e1", function () {
                const M = e1.inv();
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(1);
                expect(M.blades[0].weight).toBe(1);
            });
            it("e2", function () {
                const M = e2.inv();
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(2);
                expect(M.blades[0].weight).toBe(-1);
            });
            it("e12", function () {
                const M = e12.inv();
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(3);
                expect(M.blades[0].weight).toBe(1);
            });
        });
        describe("dual", function () {
            it("1", function () {
                const M = one.dual();
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(3);
                expect(M.blades[0].weight).toBe(1);
            });
            it("e1", function () {
                const M = e1.dual();
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(2);
                expect(M.blades[0].weight).toBe(1);
            });
            it("e2", function () {
                const M = e2.dual();
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(1);
                expect(M.blades[0].weight).toBe(1);
            });
            it("e12", function () {
                const M = e12.dual();
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(0);
                expect(M.blades[0].weight).toBe(1);
            });
        });
        describe("direction", function () {
            it("1", function () {
                const M = one.direction();
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(0);
                expect(M.blades[0].weight).toBe(1);
            });
            it("e1", function () {
                const M = e1.direction();
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(1);
                expect(M.blades[0].weight).toBe(1);
            });
            // We can't compute the direction of a vector that squares to -1 when the field
            // is like the reals and is not closed. May be we should test with complex? 
            xit("e2", function () {
                const M = e2.direction();
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(2);
                expect(M.blades[0].weight).toBe(1);
            });
            xit("e12", function () {
                const M = e12.direction();
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(3);
                expect(M.blades[0].weight).toBe(1);
            });
        });
    });
    describe("G2 over Complex", function () {
        const G2 = algebra([1, 1], cfa);
        const one = G2.one;
        const e1 = G2.unit(0);
        const e2 = G2.unit(1);
        const e12 = e1.mul(e2);
        it("one", function () {
            expect(one.blades.length).toBe(1);
            expect(one.blades[0].bitmap).toBe(0);
            expect(one.blades[0].weight.x).toBe(1);
            expect(one.blades[0].weight.y).toBe(0);
        });
        it("e1", function () {
            expect(e1.blades.length).toBe(1);
            expect(e1.blades[0].bitmap).toBe(1);
            expect(e1.blades[0].weight.x).toBe(1);
            expect(e1.blades[0].weight.y).toBe(0);
        });
        it("e2", function () {
            expect(e2.blades.length).toBe(1);
            expect(e2.blades[0].bitmap).toBe(2);
            expect(e2.blades[0].weight.x).toBe(1);
            expect(e2.blades[0].weight.y).toBe(0);
        });
        it("e12", function () {
            expect(e12.blades.length).toBe(1);
            expect(e12.blades[0].bitmap).toBe(3);
            expect(e12.blades[0].weight.x).toBe(1);
            expect(e12.blades[0].weight.y).toBe(0);
        });
        describe("direction", function () {
            it("1", function () {
                const M = one.direction();
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(0);
                expect(M.blades[0].weight.x).toBe(1);
                expect(M.blades[0].weight.y).toBe(0);
            });
            it("e1", function () {
                const M = e1.direction();
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(1);
                expect(M.blades[0].weight.x).toBe(1);
                expect(M.blades[0].weight.y).toBe(0);
            });
            it("e2", function () {
                const M = e2.direction();
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(2);
                expect(M.blades[0].weight.x).toBe(1);
                expect(M.blades[0].weight.y).toBe(0);
            });
            it("e12", function () {
                const M = e12.direction();
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(3);
                expect(M.blades[0].weight.x).toBe(1);
                expect(M.blades[0].weight.y).toBe(0);
            });
        });
    });
    describe("G11 over Complex", function () {
        const G11 = algebra([+1, -1], cfa);
        const one = G11.one;
        const e1 = G11.unit(0);
        const e2 = G11.unit(1);
        const e12 = e1.mul(e2);
        it("one", function () {
            expect(one.blades.length).toBe(1);
            expect(one.blades[0].bitmap).toBe(0);
            expect(one.blades[0].weight.x).toBe(1);
            expect(one.blades[0].weight.y).toBe(0);
        });
        it("e1", function () {
            expect(e1.blades.length).toBe(1);
            expect(e1.blades[0].bitmap).toBe(1);
            expect(e1.blades[0].weight.x).toBe(1);
            expect(e1.blades[0].weight.y).toBe(0);
        });
        it("e2", function () {
            expect(e2.blades.length).toBe(1);
            expect(e2.blades[0].bitmap).toBe(2);
            expect(e2.blades[0].weight.x).toBe(1);
            expect(e2.blades[0].weight.y).toBe(0);
        });
        it("e12", function () {
            expect(e12.blades.length).toBe(1);
            expect(e12.blades[0].bitmap).toBe(3);
            expect(e12.blades[0].weight.x).toBe(1);
            expect(e12.blades[0].weight.y).toBe(0);
        });
        describe("direction", function () {
            it("1", function () {
                const M = one.direction();
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(0);
                expect(M.blades[0].weight.x).toBe(1);
                expect(M.blades[0].weight.y).toBe(0);
            });
            it("e1", function () {
                const M = e1.direction();
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(1);
                expect(M.blades[0].weight.x).toBe(1);
                expect(M.blades[0].weight.y).toBe(0);
            });
            it("e2", function () {
                const M = e2.direction();
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(2);
                expect(M.blades[0].weight.x).toBe(0);
                expect(M.blades[0].weight.y).toBe(-1);
            });
            it("e12", function () {
                const M = e12.direction();
                expect(M.blades.length).toBe(1);
                expect(M.blades[0].bitmap).toBe(3);
                expect(M.blades[0].weight.x).toBe(0);
                expect(M.blades[0].weight.y).toBe(-1);
            });
        });
    });
});
