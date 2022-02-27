import { mustBeEQ } from '../checks/mustBeEQ';
import { FieldAdapter } from './FieldAdapter';

function makeColumnVector<T>(n: number, v: T): T[] {
    const a: T[] = [];
    for (let i = 0; i < n; i++) {
        a.push(v);
    }
    return a;
}

function rowWithMaximumInColumn<T>(A: T[][], column: number, N: number, adapter: FieldAdapter<T>): number {
    let biggest = adapter.abs(A[column][column]);
    let maxRow = column;
    for (let row = column + 1; row < N; row++) {
        if (adapter.abs(A[row][column]) > biggest) {
            biggest = adapter.abs(A[row][column]);
            maxRow = row;
        }
    }
    return maxRow;
}

function swapRows<T>(A: T[][], i: number, j: number, N: number) {
    const colLength = N + 1;
    for (let column = i; column < colLength; column++) {
        const temp = A[j][column];
        A[j][column] = A[i][column];
        A[i][column] = temp;
    }
}

function makeZeroBelow<T>(A: T[][], i: number, N: number, adapter: FieldAdapter<T>): void {
    for (let row = i + 1; row < N; row++) {
        const c = adapter.neg(adapter.div(A[row][i], A[i][i]));
        for (let column = i; column < N + 1; column++) {
            if (i === column) {
                A[row][column] = adapter.zero;
            }
            else {
                A[row][column] = adapter.add(A[row][column], adapter.mul(c, A[i][column]));
            }
        }
    }
}

function solve<T>(A: T[][], N: number, adapter: FieldAdapter<T>) {
    const x = makeColumnVector(N, adapter.zero);
    for (let i = N - 1; i > -1; i--) {
        x[i] = adapter.div(A[i][N], A[i][i]);
        for (let k = i - 1; k > -1; k--) {
            A[k][N] = adapter.sub(A[k][N], adapter.mul(A[k][i], x[i]));
        }
    }
    return x;
}


/**
 * Gaussian elimination using a parametrized field type.
 * Ax = b
 */
export function gauss<T>(A: T[][], b: T[], adapter: FieldAdapter<T>): T[] {

    const N = A.length;

    mustBeEQ('A.length', N, b.length);

    for (let i = 0; i < N; i++) {
        const Ai = A[i];
        const bi = b[i];
        Ai.push(bi);
    }

    for (let j = 0; j < N; j++) {

        swapRows(A, j, rowWithMaximumInColumn(A, j, N, adapter), N);

        makeZeroBelow(A, j, N, adapter);
    }

    return solve(A, N, adapter);
}
