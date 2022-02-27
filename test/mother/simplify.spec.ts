import { assert } from 'chai';
import { blade } from '../../src/mother/Blade';
import { NumberFieldAdapter } from '../../src/mother/NumberFieldAdapter';
import { simplify } from '../../src/mother/simplify';
import { sortBlades } from '../../src/mother/sortBlades';

const nfa = new NumberFieldAdapter();

describe("simplify", function () {
    it("should remove zero blades", function () {
        const blades = [blade(0, 0, nfa)];
        const rez = simplify(blades, nfa);
        assert.strictEqual(rez.length, 0);
    });
    it("should sum blades of the same kind", function () {
        const blades = [blade(0, 2, nfa), blade(0, 3, nfa)];
        const rez = simplify(blades, nfa);
        assert.strictEqual(rez.length, 1);
        assert.strictEqual(rez[0].bitmap, 0);
        assert.strictEqual(rez[0].weight, 5);
    });
    it("should not sum blades of different kinds", function () {
        const blades = [blade(0, 2, nfa), blade(1, 3, nfa)];
        const rez = simplify(blades, nfa);
        assert.strictEqual(rez.length, 2);
        assert.strictEqual(rez[0].bitmap, 0);
        assert.strictEqual(rez[0].weight, 2);
        assert.strictEqual(rez[1].bitmap, 1);
        assert.strictEqual(rez[1].weight, 3);
    });
    it("should merge discontiguous blades", function () {
        const blades = [blade(0, 2, nfa), blade(1, 3, nfa), blade(0, 5, nfa), blade(1, 7, nfa)];
        const rez = sortBlades(simplify(blades, nfa));
        assert.strictEqual(rez.length, 2);
        assert.strictEqual(rez[0].bitmap, 0);
        assert.strictEqual(rez[0].weight, 7);
        assert.strictEqual(rez[1].bitmap, 1);
        assert.strictEqual(rez[1].weight, 10);
    });
});
