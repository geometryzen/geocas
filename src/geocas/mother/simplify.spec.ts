import blade from './Blade';
import simplify from './simplify';
import sortBlades from './sortBlades';
import NumberFieldAdapter from './NumberFieldAdapter';

const nfa = new NumberFieldAdapter();

describe("simplify", function () {
    it("should remove zero blades", function () {
        const blades = [blade(0, 0, nfa)];
        const rez = simplify(blades, nfa);
        expect(rez.length).toBe(0);
    });
    it("should sum blades of the same kind", function () {
        const blades = [blade(0, 2, nfa), blade(0, 3, nfa)];
        const rez = simplify(blades, nfa);
        expect(rez.length).toBe(1);
        expect(rez[0].bitmap).toBe(0);
        expect(rez[0].weight).toBe(5);
    });
    it("should not sum blades of different kinds", function () {
        const blades = [blade(0, 2, nfa), blade(1, 3, nfa)];
        const rez = simplify(blades, nfa);
        expect(rez.length).toBe(2);
        expect(rez[0].bitmap).toBe(0);
        expect(rez[0].weight).toBe(2);
        expect(rez[1].bitmap).toBe(1);
        expect(rez[1].weight).toBe(3);
    });
    it("should merge discontiguous blades", function () {
        const blades = [blade(0, 2, nfa), blade(1, 3, nfa), blade(0, 5, nfa), blade(1, 7, nfa)];
        const rez = sortBlades(simplify(blades, nfa));
        expect(rez.length).toBe(2);
        expect(rez[0].bitmap).toBe(0);
        expect(rez[0].weight).toBe(7);
        expect(rez[1].bitmap).toBe(1);
        expect(rez[1].weight).toBe(10);
    });
});
