import blade from './Blade';
import NumberFieldAdapter from './NumberFieldAdapter';

const nfa = new NumberFieldAdapter();

describe("Blade", function () {
    it("scalar", function () {
        const one = blade(0, 1, nfa);
        expect(one.bitmap).toBe(0);
        expect(one.weight).toBe(1);
    });
    it("e1", function () {
        const one = blade(1, 2, nfa);
        expect(one.bitmap).toBe(1);
        expect(one.weight).toBe(2);
    });
});
