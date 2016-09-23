import isNumber from '../checks/isNumber';

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

export default function complex(x: number, y: number): Complex {
    const that: Complex = {
        get x() {
            return x;
        },
        get y() {
            return y;
        },
        __abs__(): Complex {
            return complex(Math.sqrt(x * x + y * y), 0);
        },
        __add__(rhs: Complex): Complex {
            return complex(x + rhs.x, y + rhs.y);
        },
        __sub__(rhs: Complex): Complex {
            return complex(x - rhs.x, y - rhs.y);
        },
        __mul__(rhs: number | Complex): Complex {
            if (isNumber(rhs)) {
                return complex(x * rhs, y * rhs);
            }
            else {
                return complex(x * rhs.x - y * rhs.y, y * rhs.x + x * rhs.y);
            }
        },
        __div__(rhs: number | Complex): Complex {
            if (isNumber(rhs)) {
                return complex(x / rhs, y / rhs);
            }
            else {
                const denom = rhs.x * rhs.x + rhs.y * rhs.y;
                return complex((x * rhs.x + y * rhs.y) / denom, (y * rhs.x - x * rhs.y) / denom);
            }
        },
        __neg__(): Complex {
            return complex(-x, -y);
        },
        toString(): string {
            return `[${x}, ${y}]`;
        },
        __cos__(): Complex {
            throw new Error("TODO: cos");
        },
        __sin__(): Complex {
            throw new Error("TODO: sin");
        }
    };
    return that;
}
