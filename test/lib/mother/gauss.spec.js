"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gauss_1 = require("./gauss");
var Float_1 = require("./Float");
var FloatAdapter_1 = require("./FloatAdapter");
var ffa = new FloatAdapter_1.default();
var one = new Float_1.default(1);
var two = new Float_1.default(2);
var three = new Float_1.default(3);
var four = new Float_1.default(4);
var six = new Float_1.default(6);
var eight = new Float_1.default(8);
var ten = new Float_1.default(10);
var fourteen = new Float_1.default(14);
var sixteen = new Float_1.default(16);
describe("gauss", function () {
    it("4x = 8", function () {
        var A = [[four]];
        var b = [eight];
        var result = gauss_1.default(A, b, ffa);
        expect(result.length).toBe(1);
        expect(result[0].value).toBe(2);
    });
    it("x + y = 10, 2x + y = 16", function () {
        var A = [[one, one], [two, one]];
        var b = [ten, sixteen];
        var result = gauss_1.default(A, b, ffa);
        expect(result.length).toBe(2);
        expect(result[0].value).toBe(6);
        expect(result[1].value).toBe(4);
    });
    it("x + y = 10, 2x + y = 16", function () {
        var A = [[two, one], [one, one]];
        var b = [sixteen, ten];
        var result = gauss_1.default(A, b, ffa);
        expect(result.length).toBe(2);
        expect(result[0].value).toBe(6);
        expect(result[1].value).toBe(4);
    });
    it("x + y + z = 6, 2x + y + 2z = 10, x + 2y + 3z = 14", function () {
        var A = [[one, one, one], [two, one, two], [one, two, three]];
        var b = [six, ten, fourteen];
        var result = gauss_1.default(A, b, ffa);
        expect(result.length).toBe(3);
        expect(result[0].value).toBe(1);
        expect(result[1].value).toBe(2);
        expect(result[2].value).toBe(3);
    });
});
