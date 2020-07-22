import mustBeEQ from '../checks/mustBeEQ';
function makeColumnVector(n, v) {
    var a = [];
    for (var i = 0; i < n; i++) {
        a.push(v);
    }
    return a;
}
function rowWithMaximumInColumn(A, column, N, adapter) {
    var biggest = adapter.abs(A[column][column]);
    var maxRow = column;
    for (var row = column + 1; row < N; row++) {
        if (adapter.abs(A[row][column]) > biggest) {
            biggest = adapter.abs(A[row][column]);
            maxRow = row;
        }
    }
    return maxRow;
}
function swapRows(A, i, j, N) {
    var colLength = N + 1;
    for (var column = i; column < colLength; column++) {
        var temp = A[j][column];
        A[j][column] = A[i][column];
        A[i][column] = temp;
    }
}
function makeZeroBelow(A, i, N, adapter) {
    for (var row = i + 1; row < N; row++) {
        var c = adapter.neg(adapter.div(A[row][i], A[i][i]));
        for (var column = i; column < N + 1; column++) {
            if (i === column) {
                A[row][column] = adapter.zero;
            }
            else {
                A[row][column] = adapter.add(A[row][column], adapter.mul(c, A[i][column]));
            }
        }
    }
}
function solve(A, N, adapter) {
    var x = makeColumnVector(N, adapter.zero);
    for (var i = N - 1; i > -1; i--) {
        x[i] = adapter.div(A[i][N], A[i][i]);
        for (var k = i - 1; k > -1; k--) {
            A[k][N] = adapter.sub(A[k][N], adapter.mul(A[k][i], x[i]));
        }
    }
    return x;
}
/**
 * Gaussian elimination using a parametrized field type.
 * Ax = b
 */
export default function gauss(A, b, adapter) {
    var N = A.length;
    mustBeEQ('A.length', N, b.length);
    for (var i = 0; i < N; i++) {
        var Ai = A[i];
        var bi = b[i];
        Ai.push(bi);
    }
    for (var j = 0; j < N; j++) {
        swapRows(A, j, rowWithMaximumInColumn(A, j, N, adapter), N);
        makeZeroBelow(A, j, N, adapter);
    }
    return solve(A, N, adapter);
}
