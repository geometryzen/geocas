export interface Complex {
    x: number;
    y: number;
    __abs__(): Complex;
    __add__(rhs: Complex): Complex;
    __sub__(rhs: Complex): Complex;
    __mul__(rhs: number | Complex): Complex;
    __div__(rhs: number | Complex): Complex;
    __neg__(): Complex;
    toString(): string;
    __cos__(): Complex;
    __sin__(): Complex;
}
export default function complex(x: number, y: number): Complex;
