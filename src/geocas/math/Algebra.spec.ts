import Algebra from './Algebra';
import {BasisBladeExpr} from './Algebra';
import {WedgeExpr} from './Algebra';

describe("Algebra", function() {
    describe("G3", function() {
        const g3 = new Algebra([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
        const uno = g3.scalar(1);
        const one = g3.basis[0];
        const two = uno.__add__(uno);
        const u2 = uno.__wedge__(uno);
        const e1 = g3.basis[1];
        const e2 = g3.basis[2];
        const e12 = e1.__wedge__(e2);
        const e3 = g3.basis[4];
        const e13 = e1.__wedge__(e3);
        const e23 = e2.__wedge__(e3);
        const e123 = e12.__wedge__(e3);
        // const unoe1 = uno.__wedge__(e1);
        it("should be created", function() {
            expect(g3).toBeDefined();
        });
        describe("__add__", function() {
            it("(Expr)", function() {
                const expr = e1.__add__(e2);
                expect(expr.toPrefix()).toBe("add(e1, e2)");
                expect(expr.toString()).toBe("e1 + e2");
            });
            it("(number)", function() {
                const expr = e1.__add__(5);
                expect(expr.toPrefix()).toBe("add(e1, 5)");
                expect(expr.toString()).toBe("e1 + 5");
            });
        });
        describe("__radd__", function() {
            it("(Expr)", function() {
                const expr = e1.__radd__(e2);
                expect(expr.toPrefix()).toBe("add(e2, e1)");
                expect(expr.toString()).toBe("e2 + e1");
            });
            it("(number)", function() {
                const expr = e1.__radd__(5);
                expect(expr.toPrefix()).toBe("add(5, e1)");
                expect(expr.toString()).toBe("5 + e1");
            });
        });
        describe("__sub__", function() {
            it("(Expr)", function() {
                const expr = e1.__sub__(e2);
                expect(expr.toPrefix()).toBe("sub(e1, e2)");
                expect(expr.toString()).toBe("e1 - e2");
            });
            it("(number)", function() {
                const expr = e1.__sub__(5);
                expect(expr.toPrefix()).toBe("sub(e1, 5)");
                expect(expr.toString()).toBe("e1 - 5");
            });
        });
        describe("__rsub__", function() {
            it("(Expr)", function() {
                const expr = e1.__rsub__(e2);
                expect(expr.toPrefix()).toBe("sub(e2, e1)");
                expect(expr.toString()).toBe("e2 - e1");
            });
            it("(number)", function() {
                const expr = e1.__rsub__(5);
                expect(expr.toPrefix()).toBe("sub(5, e1)");
                expect(expr.toString()).toBe("5 - e1");
            });
        });
        describe("__mul__", function() {
            it("(Expr)", function() {
                const expr = e1.__mul__(e2);
                expect(expr.toPrefix()).toBe("mul(e1, e2)");
                expect(expr.toString()).toBe("e1 * e2");
            });
            it("(number)", function() {
                const expr = e1.__mul__(5);
                expect(expr.toPrefix()).toBe("mul(e1, 5)");
                expect(expr.toString()).toBe("e1 * 5");
            });
        });
        describe("__rmul__", function() {
            it("(Expr)", function() {
                const expr = e1.__rmul__(e2);
                expect(expr.toPrefix()).toBe("mul(e2, e1)");
                expect(expr.toString()).toBe("e2 * e1");
            });
            it("(number)", function() {
                const expr = e1.__rmul__(5);
                expect(expr.toPrefix()).toBe("mul(5, e1)");
                expect(expr.toString()).toBe("5 * e1");
            });
        });
        describe("__div__", function() {
            it("(Expr)", function() {
                const expr = e1.__div__(e2);
                expect(expr.toPrefix()).toBe("div(e1, e2)");
                expect(expr.toString()).toBe("e1 / e2");
            });
            it("(number)", function() {
                const expr = e1.__div__(5);
                expect(expr.toPrefix()).toBe("div(e1, 5)");
                expect(expr.toString()).toBe("e1 / 5");
            });
        });
        describe("__rdiv__", function() {
            it("(Expr)", function() {
                const expr = e1.__rdiv__(e2);
                expect(expr.toPrefix()).toBe("div(e2, e1)");
                expect(expr.toString()).toBe("e2 / e1");
            });
            it("(number)", function() {
                const expr = e1.__rdiv__(5);
                expect(expr.toPrefix()).toBe("div(5, e1)");
                expect(expr.toString()).toBe("5 / e1");
            });
        });
        describe("__vbar__", function() {
            it("(Expr)", function() {
                const expr = e1.__vbar__(e2);
                expect(expr.toPrefix()).toBe("scp(e1, e2)");
                expect(expr.toString()).toBe("e1 | e2");
            });
            it("(number)", function() {
                const expr = e1.__vbar__(5);
                expect(expr.toPrefix()).toBe("scp(e1, 5)");
                expect(expr.toString()).toBe("e1 | 5");
            });
        });
        describe("__rvbar__", function() {
            it("(Expr)", function() {
                const expr = e1.__rvbar__(e2);
                expect(expr.toPrefix()).toBe("scp(e2, e1)");
                expect(expr.toString()).toBe("e2 | e1");
            });
            it("(number)", function() {
                const expr = e1.__rvbar__(5);
                expect(expr.toPrefix()).toBe("scp(5, e1)");
                expect(expr.toString()).toBe("5 | e1");
            });
        });
        describe("__lshift__", function() {
            it("(Expr)", function() {
                const expr = e1.__lshift__(e2);
                expect(expr.toPrefix()).toBe("lco(e1, e2)");
                expect(expr.toString()).toBe("e1 << e2");
            });
            it("(number)", function() {
                const expr = e1.__lshift__(5);
                expect(expr.toPrefix()).toBe("lco(e1, 5)");
                expect(expr.toString()).toBe("e1 << 5");
            });
        });
        describe("__rlshift__", function() {
            it("(Expr)", function() {
                const expr = e1.__rlshift__(e2);
                expect(expr.toPrefix()).toBe("lco(e2, e1)");
                expect(expr.toString()).toBe("e2 << e1");
            });
            it("(number)", function() {
                const expr = e1.__rlshift__(5);
                expect(expr.toPrefix()).toBe("lco(5, e1)");
                expect(expr.toString()).toBe("5 << e1");
            });
        });
        describe("__rshift__", function() {
            it("(Expr)", function() {
                const expr = e1.__rshift__(e2);
                expect(expr.toPrefix()).toBe("rco(e1, e2)");
                expect(expr.toString()).toBe("e1 >> e2");
            });
            it("(number)", function() {
                const expr = e1.__rshift__(5);
                expect(expr.toPrefix()).toBe("rco(e1, 5)");
                expect(expr.toString()).toBe("e1 >> 5");
            });
        });
        describe("__rrshift__", function() {
            it("(Expr)", function() {
                const expr = e1.__rrshift__(e2);
                expect(expr.toPrefix()).toBe("rco(e2, e1)");
                expect(expr.toString()).toBe("e2 >> e1");
            });
            it("(number)", function() {
                const expr = e1.__rrshift__(5);
                expect(expr.toPrefix()).toBe("rco(5, e1)");
                expect(expr.toString()).toBe("5 >> e1");
            });
        });
        describe("__wedge__", function() {
            it("(Expr)", function() {
                const expr = e1.__wedge__(e2);
                expect(expr.toPrefix()).toBe("ext(e1, e2)");
                expect(expr.toString()).toBe("e1 ^ e2");
            });
            it("(number)", function() {
                const expr = e1.__wedge__(5);
                expect(expr.toPrefix()).toBe("ext(e1, 5)");
                expect(expr.toString()).toBe("e1 ^ 5");
            });
        });
        describe("__rwedge__", function() {
            it("(Expr)", function() {
                const expr = e1.__rwedge__(e2);
                expect(expr.toPrefix()).toBe("ext(e2, e1)");
                expect(expr.toString()).toBe("e2 ^ e1");
            });
            it("(number)", function() {
                const expr = e1.__rwedge__(5);
                expect(expr.toPrefix()).toBe("ext(5, e1)");
                expect(expr.toString()).toBe("5 ^ e1");
            });
        });
        describe("__tilde__", function() {
            it("should be reversion", function() {
                const expr = e1.__tilde__();
                expect(expr.toPrefix()).toBe("reverse(e1)");
                expect(expr.toString()).toBe("~e1");

                expect(expr.reset().toString()).toBe("~e1");
                expect(expr.reset().isChanged()).toBeFalsy();

                expect(expr.copy(false).toString()).toBe("~e1");
                expect(expr.copy(false).isChanged()).toBeFalsy();

                expect(expr.copy(true).toString()).toBe("~e1");
                expect(expr.copy(true).isChanged()).toBeTruthy();
            });
        });
        describe("__bang__", function() {
            it("should be inverse", function() {
                const expr = e1.__bang__();
                expect(expr.toPrefix()).toBe("inverse(e1)");
                expect(expr.toString()).toBe("!e1");

                expect(expr.reset().toString()).toBe("!e1");
                expect(expr.reset().isChanged()).toBeFalsy();

                expect(expr.copy(false).toString()).toBe("!e1");
                expect(expr.copy(false).isChanged()).toBeFalsy();

                expect(expr.copy(true).toString()).toBe("!e1");
                expect(expr.copy(true).isChanged()).toBeTruthy();
            });
        });
        describe("__neg__", function() {
            it("should be negative", function() {
                const expr = e1.__neg__();
                expect(expr.toPrefix()).toBe("neg(e1)");
                expect(expr.toString()).toBe("-e1");

                expect(expr.reset().toString()).toBe("-e1");
                expect(expr.reset().isChanged()).toBeFalsy();

                expect(expr.copy(false).toString()).toBe("-e1");
                expect(expr.copy(false).isChanged()).toBeFalsy();

                expect(expr.copy(true).toString()).toBe("-e1");
                expect(expr.copy(true).isChanged()).toBeTruthy();
            });
        });
        describe("__pos__", function() {
            it("should be positive", function() {
                const expr = e1.__pos__();
                expect(expr.toPrefix()).toBe("pos(e1)");
                expect(expr.toString()).toBe("+e1");

                expect(expr.reset().toString()).toBe("+e1");
                expect(expr.reset().isChanged()).toBeFalsy();

                expect(expr.copy(false).toString()).toBe("+e1");
                expect(expr.copy(false).isChanged()).toBeFalsy();

                expect(expr.copy(true).toString()).toBe("+e1");
                expect(expr.copy(true).isChanged()).toBeTruthy();
            });
        });
        it("BasisBladeExpr", function() {
            expect(e1.dirty).toBeFalsy();
            expect(e1.copy(false).dirty).toBeFalsy();
            expect(e1.copy(true).dirty).toBeTruthy();
            expect(e1.copy(true).reset().dirty).toBeFalsy();
            expect(e1.copy(false).vectors[0]).toBe(0);
            expect(e1.reset().vectors[0]).toBe(0);
        });
        it("should have a complete basis", function() {
            expect(g3.basis[0].toString()).toBe("1");
            expect(g3.basis[1].toString()).toBe("e1");
            expect(g3.basis[2].toString()).toBe("e2");
            expect(g3.basis[3].toString()).toBe("e1 ^ e2");
            expect(g3.basis[4].toString()).toBe("e3");
            expect(g3.basis[5].toString()).toBe("e1 ^ e3");
            expect(g3.basis[6].toString()).toBe("e2 ^ e3");
            expect(g3.basis[7].toString()).toBe("e1 ^ e2 ^ e3");
        });
        it("extension", function() {
            expect(e12.toString()).toBe("e1 ^ e2");
            expect(e13.toString()).toBe("e1 ^ e3");
            expect(e23.toString()).toBe("e2 ^ e3");

            expect(e123.toString()).toBe("e1 ^ e2 ^ e3");
            expect(e123 instanceof WedgeExpr).toBeTruthy();

            expect(e1.__wedge__(e1).toString()).toBe("e1 ^ e1");
        });
        it("simplify", function() {
            expect(g3.simplify(uno).toString()).toBe("1");
            expect(g3.simplify(one).toString()).toBe("1");
            expect(g3.simplify(e1).toString()).toBe("e1");
            expect(g3.simplify(e2).toString()).toBe("e2");
            expect(g3.simplify(e3).toString()).toBe("e3");
            expect(g3.simplify(two).toString()).toBe("2");
            expect(g3.simplify(u2.__wedge__(u2)).toString()).toBe("0");
            expect(g3.simplify(uno.__wedge__(uno)).toString()).toBe("0");
            expect(g3.simplify(e1.__wedge__(uno)).toString()).toBe("e1");
            expect(g3.simplify(e1.__wedge__(e1)).toString()).toBe("0");
            expect(g3.simplify(e1.__wedge__(e1)).toString()).toBe("0");
            // expect(g3.simplify(uno.__wedge__(one)).toString()).toBe("0");
            expect(g3.simplify(uno.__wedge__(e1)).toString()).toBe("e1");
            expect(g3.simplify(e12).toString()).toBe("e1 ^ e2");
            expect(g3.simplify(e12) instanceof BasisBladeExpr).toBeTruthy();
            expect(g3.simplify(e12).toString()).toBe("e1 ^ e2");
            expect(g3.simplify(e1.__wedge__(e1)).toString()).toBe("0");
        });
        describe("hoisting scalar through * *", function() {
            describe("(5 * e1) * e2", function() {
                const s = g3.scalar(5);
                const expr = s.__mul__(e1).__mul__(e2);
                it("should hoist", function() {
                    expect(expr.toPrefix()).toBe("mul(mul(5, e1), e2)");
                    expect(g3.simplify(expr).toPrefix()).toBe("mul(5, mul(e1, e2))");
                });
            });
            describe("*(*(e1, 5), e2)", function() {
                const s = g3.scalar(5);
                const expr = e1.__mul__(s).__mul__(e2);
                it("should hoist", function() {
                    expect(expr.toPrefix()).toBe("mul(mul(e1, 5), e2)");
                    expect(g3.simplify(expr).toPrefix()).toBe("mul(5, mul(e1, e2))");
                });
            });
            describe("*(e1, *(5, e2))", function() {
                const s = g3.scalar(5);
                const expr = s.__mul__(e2).__rmul__(e1);
                it("should hoist", function() {
                    expect(expr.toPrefix()).toBe("mul(e1, mul(5, e2))");
                    expect(g3.simplify(expr).toPrefix()).toBe("mul(5, mul(e1, e2))");
                });
            });
            describe("*(e1, *(e2, 5))", function() {
                const s = g3.scalar(5);
                const expr = e2.__mul__(s).__rmul__(e1);
                it("should hoist", function() {
                    expect(expr.toPrefix()).toBe("mul(e1, mul(e2, 5))");
                    expect(g3.simplify(expr).toPrefix()).toBe("mul(5, mul(e1, e2))");
                });
            });
        });
    });
});
