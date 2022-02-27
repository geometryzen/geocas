import { assert } from 'chai';
import { blade } from '../../src/mother/Blade';
import { NumberFieldAdapter } from '../../src/mother/NumberFieldAdapter';

const nfa = new NumberFieldAdapter();

describe("Blade", function () {
    it("scalar", function () {
        const one = blade(0, 1, nfa);
        assert.strictEqual(one.bitmap, 0);
        assert.strictEqual(one.weight, 1);
    });
    it("e1", function () {
        const one = blade(1, 2, nfa);
        assert.strictEqual(one.bitmap, 1);
        assert.strictEqual(one.weight, 2);
    });
});
