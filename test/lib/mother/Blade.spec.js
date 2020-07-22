"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Blade_1 = require("./Blade");
var NumberFieldAdapter_1 = require("./NumberFieldAdapter");
var nfa = new NumberFieldAdapter_1.default();
describe("Blade", function () {
    it("scalar", function () {
        var one = Blade_1.default(0, 1, nfa);
        expect(one.bitmap).toBe(0);
        expect(one.weight).toBe(1);
    });
    it("e1", function () {
        var one = Blade_1.default(1, 2, nfa);
        expect(one.bitmap).toBe(1);
        expect(one.weight).toBe(2);
    });
});
