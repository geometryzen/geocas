import { assert } from 'chai';
import { gauss } from '../src/math/gauss';

describe("gauss", function () {

    it("4x = 8", function () {
        const A = [[4]];
        const b = [8];
        const result = gauss(A, b);
        assert.strictEqual(result.length, 1);
        assert.strictEqual(result[0], 2);
    });

    it("x + y = 10, 2x + y = 16", function () {
        const A = [[1, 1], [2, 1]];
        const b = [10, 16];
        const result = gauss(A, b);
        assert.strictEqual(result.length, 2);
        assert.strictEqual(result[0], 6);
        assert.strictEqual(result[1], 4);
    });

    it("x + y = 10, 2x + y = 16", function () {
        const A = [[2, 1], [1, 1]];
        const b = [16, 10];
        const result = gauss(A, b);
        assert.strictEqual(result.length, 2);
        assert.strictEqual(result[0], 6);
        assert.strictEqual(result[1], 4);
    });

    it("x + y + z = 6, 2x + y + 2z = 10, x + 2y + 3z = 14", function () {
        const A = [[1, 1, 1], [2, 1, 2], [1, 2, 3]];
        const b = [6, 10, 14];
        const result = gauss(A, b);
        assert.strictEqual(result.length, 3);
        assert.strictEqual(result[0], 1);
        assert.strictEqual(result[1], 2);
        assert.strictEqual(result[2], 3);
    });
});
