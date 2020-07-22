"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Blade_1 = require("./Blade");
var simplify_1 = require("./simplify");
var sortBlades_1 = require("./sortBlades");
var NumberFieldAdapter_1 = require("./NumberFieldAdapter");
var nfa = new NumberFieldAdapter_1.default();
describe("simplify", function () {
    it("should remove zero blades", function () {
        var blades = [Blade_1.default(0, 0, nfa)];
        var rez = simplify_1.default(blades, nfa);
        expect(rez.length).toBe(0);
    });
    it("should sum blades of the same kind", function () {
        var blades = [Blade_1.default(0, 2, nfa), Blade_1.default(0, 3, nfa)];
        var rez = simplify_1.default(blades, nfa);
        expect(rez.length).toBe(1);
        expect(rez[0].bitmap).toBe(0);
        expect(rez[0].weight).toBe(5);
    });
    it("should not sum blades of different kinds", function () {
        var blades = [Blade_1.default(0, 2, nfa), Blade_1.default(1, 3, nfa)];
        var rez = simplify_1.default(blades, nfa);
        expect(rez.length).toBe(2);
        expect(rez[0].bitmap).toBe(0);
        expect(rez[0].weight).toBe(2);
        expect(rez[1].bitmap).toBe(1);
        expect(rez[1].weight).toBe(3);
    });
    it("should merge discontiguous blades", function () {
        var blades = [Blade_1.default(0, 2, nfa), Blade_1.default(1, 3, nfa), Blade_1.default(0, 5, nfa), Blade_1.default(1, 7, nfa)];
        var rez = sortBlades_1.default(simplify_1.default(blades, nfa));
        expect(rez.length).toBe(2);
        expect(rez[0].bitmap).toBe(0);
        expect(rez[0].weight).toBe(7);
        expect(rez[1].bitmap).toBe(1);
        expect(rez[1].weight).toBe(10);
    });
});
