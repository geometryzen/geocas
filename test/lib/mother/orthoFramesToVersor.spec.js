"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import blade from './Blade';
// import sortBlades from './sortBlades';
// import minusOnePow from './minusOnePow';
var NumberFieldAdapter_1 = require("./NumberFieldAdapter");
var orthoFramesToVersor_1 = require("./orthoFramesToVersor");
// import complex from './Complex';
// import ComplexFieldAdapter from './ComplexFieldAdapter';
// import mv from './Multivector';
var Algebra_1 = require("./Algebra");
// import sortBlades from './sortBlades';
// const cfa = new ComplexFieldAdapter();
var nfa = new NumberFieldAdapter_1.default();
describe("orthoFramesToVersor", function () {
    describe("R2", function () {
        describe("[e1, e2] => [e2, e1]", function () {
            var metric = [1, 1];
            var G11 = Algebra_1.algebra(metric, nfa);
            var e1 = G11.unit(0);
            var e2 = G11.unit(1);
            var A = [e1, e2];
            var B = [e2, e1];
            var vs = orthoFramesToVersor_1.default(A, B, [], G11);
            it("V should be empty", function () {
                expect(vs.length).toBe(1);
            });
        });
    });
    describe("R4", function () {
        var metric = [1, 1, 1, 1];
        var G4 = Algebra_1.algebra(metric, nfa);
        var e1 = G4.unit(0);
        var e2 = G4.unit(1);
        var e3 = G4.unit(2);
        var e4 = G4.unit(3);
        var A = [e1, e2, e3, e4];
        var B = [e2, e4, e1, e2];
        var vs = orthoFramesToVersor_1.default(A, B, [], G4);
        it("R should contain 3 vectors", function () {
            expect(vs.length).toBe(3);
        });
    });
});
