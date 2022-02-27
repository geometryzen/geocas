// import blade from './Blade';
// import sortBlades from './sortBlades';
// import minusOnePow from './minusOnePow';
// import sortBlades from './sortBlades';
import { assert } from 'chai';
// import complex from './Complex';
// import ComplexFieldAdapter from './ComplexFieldAdapter';
// import mv from './Multivector';
import { algebra } from '../../src/mother/Algebra';
import { NumberFieldAdapter } from '../../src/mother/NumberFieldAdapter';
import { orthoFramesToVersor } from '../../src/mother/orthoFramesToVersor';

// const cfa = new ComplexFieldAdapter();
const nfa = new NumberFieldAdapter();

describe("orthoFramesToVersor", function () {
    describe("R2", function () {
        describe("[e1, e2] => [e2, e1]", function () {
            const metric = [1, 1];
            const G11 = algebra(metric, nfa, ["e1", "e2"]);
            const e1 = G11.unit(0);
            const e2 = G11.unit(1);
            const A = [e1, e2];
            const B = [e2, e1];
            const vs = orthoFramesToVersor(A, B, [], G11);
            it("V should be empty", function () {
                assert.strictEqual(vs.length, 1);
            });
        });
    });
    describe("R4", function () {
        const metric = [1, 1, 1, 1];
        const G4 = algebra(metric, nfa, ["e1", "e2", "e3", "e4"]);
        const e1 = G4.unit(0);
        const e2 = G4.unit(1);
        const e3 = G4.unit(2);
        const e4 = G4.unit(3);
        const A = [e1, e2, e3, e4];
        const B = [e2, e4, e1, e2];
        const vs = orthoFramesToVersor(A, B, [], G4);
        it("R should contain 3 vectors", function () {
            assert.strictEqual(vs.length, 3);
        });
    });
});
