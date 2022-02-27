import gauss from './gauss';
import Float from './Float';
import FloatAdapter from './FloatAdapter';

const ffa = new FloatAdapter();

const one = new Float(1);
const two = new Float(2);
const three = new Float(3);
const four = new Float(4);
const six = new Float(6);
const eight = new Float(8);
const ten = new Float(10);
const fourteen = new Float(14);
const sixteen = new Float(16);

describe("gauss", function () {

    it("4x = 8", function () {
        const A = [[four]];
        const b = [eight];
        const result = gauss<Float>(A, b, ffa);
        expect(result.length).toBe(1);
        expect(result[0].value).toBe(2);
    });

    it("x + y = 10, 2x + y = 16", function () {
        const A = [[one, one], [two, one]];
        const b = [ten, sixteen];
        const result = gauss<Float>(A, b, ffa);
        expect(result.length).toBe(2);
        expect(result[0].value).toBe(6);
        expect(result[1].value).toBe(4);
    });

    it("x + y = 10, 2x + y = 16", function () {
        const A = [[two, one], [one, one]];
        const b = [sixteen, ten];
        const result = gauss<Float>(A, b, ffa);
        expect(result.length).toBe(2);
        expect(result[0].value).toBe(6);
        expect(result[1].value).toBe(4);
    });

    it("x + y + z = 6, 2x + y + 2z = 10, x + 2y + 3z = 14", function () {
        const A = [[one, one, one], [two, one, two], [one, two, three]];
        const b = [six, ten, fourteen];
        const result = gauss<Float>(A, b, ffa);
        expect(result.length).toBe(3);
        expect(result[0].value).toBe(1);
        expect(result[1].value).toBe(2);
        expect(result[2].value).toBe(3);
    });

});
