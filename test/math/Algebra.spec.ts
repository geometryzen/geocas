import { assert } from 'chai';
import { Algebra, BasisBladeExpr, WedgeExpr } from '../../src/math/Algebra';

describe("Algebra", function () {
    describe("G3", function () {
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
        it("should be created", function () {
            assert.isDefined(g3);
        });
        describe("__add__", function () {
            it("(Expr)", function () {
                const expr = e1.__add__(e2);
                assert.strictEqual(expr.toPrefix(), "add(e1, e2)");
                assert.strictEqual(expr.toString(), "e1 + e2");
            });
            it("(number)", function () {
                const expr = e1.__add__(5);
                assert.strictEqual(expr.toPrefix(), "add(e1, 5)");
                assert.strictEqual(expr.toString(), "e1 + 5");
            });
        });
        describe("__radd__", function () {
            it("(Expr)", function () {
                const expr = e1.__radd__(e2);
                assert.strictEqual(expr.toPrefix(), "add(e2, e1)");
                assert.strictEqual(expr.toString(), "e2 + e1");
            });
            it("(number)", function () {
                const expr = e1.__radd__(5);
                assert.strictEqual(expr.toPrefix(), "add(5, e1)");
                assert.strictEqual(expr.toString(), "5 + e1");
            });
        });
        describe("__sub__", function () {
            it("(Expr)", function () {
                const expr = e1.__sub__(e2);
                assert.strictEqual(expr.toPrefix(), "sub(e1, e2)");
                assert.strictEqual(expr.toString(), "e1 - e2");
            });
            it("(number)", function () {
                const expr = e1.__sub__(5);
                assert.strictEqual(expr.toPrefix(), "sub(e1, 5)");
                assert.strictEqual(expr.toString(), "e1 - 5");
            });
        });
        describe("__rsub__", function () {
            it("(Expr)", function () {
                const expr = e1.__rsub__(e2);
                assert.strictEqual(expr.toPrefix(), "sub(e2, e1)");
                assert.strictEqual(expr.toString(), "e2 - e1");
            });
            it("(number)", function () {
                const expr = e1.__rsub__(5);
                assert.strictEqual(expr.toPrefix(), "sub(5, e1)");
                assert.strictEqual(expr.toString(), "5 - e1");
            });
        });
        describe("__mul__", function () {
            it("(Expr)", function () {
                const expr = e1.__mul__(e2);
                assert.strictEqual(expr.toPrefix(), "mul(e1, e2)");
                assert.strictEqual(expr.toString(), "e1 * e2");
            });
            it("(number)", function () {
                const expr = e1.__mul__(5);
                assert.strictEqual(expr.toPrefix(), "mul(e1, 5)");
                assert.strictEqual(expr.toString(), "e1 * 5");
            });
        });
        describe("__rmul__", function () {
            it("(Expr)", function () {
                const expr = e1.__rmul__(e2);
                assert.strictEqual(expr.toPrefix(), "mul(e2, e1)");
                assert.strictEqual(expr.toString(), "e2 * e1");
            });
            it("(number)", function () {
                const expr = e1.__rmul__(5);
                assert.strictEqual(expr.toPrefix(), "mul(5, e1)");
                assert.strictEqual(expr.toString(), "5 * e1");
            });
        });
        describe("__div__", function () {
            it("(Expr)", function () {
                const expr = e1.__div__(e2);
                assert.strictEqual(expr.toPrefix(), "div(e1, e2)");
                assert.strictEqual(expr.toString(), "e1 / e2");
            });
            it("(number)", function () {
                const expr = e1.__div__(5);
                assert.strictEqual(expr.toPrefix(), "div(e1, 5)");
                assert.strictEqual(expr.toString(), "e1 / 5");
            });
        });
        describe("__rdiv__", function () {
            it("(Expr)", function () {
                const expr = e1.__rdiv__(e2);
                assert.strictEqual(expr.toPrefix(), "div(e2, e1)");
                assert.strictEqual(expr.toString(), "e2 / e1");
            });
            it("(number)", function () {
                const expr = e1.__rdiv__(5);
                assert.strictEqual(expr.toPrefix(), "div(5, e1)");
                assert.strictEqual(expr.toString(), "5 / e1");
            });
        });
        describe("__vbar__", function () {
            it("(Expr)", function () {
                const expr = e1.__vbar__(e2);
                assert.strictEqual(expr.toPrefix(), "scp(e1, e2)");
                assert.strictEqual(expr.toString(), "e1 | e2");
            });
            it("(number)", function () {
                const expr = e1.__vbar__(5);
                assert.strictEqual(expr.toPrefix(), "scp(e1, 5)");
                assert.strictEqual(expr.toString(), "e1 | 5");
            });
        });
        describe("__rvbar__", function () {
            it("(Expr)", function () {
                const expr = e1.__rvbar__(e2);
                assert.strictEqual(expr.toPrefix(), "scp(e2, e1)");
                assert.strictEqual(expr.toString(), "e2 | e1");
            });
            it("(number)", function () {
                const expr = e1.__rvbar__(5);
                assert.strictEqual(expr.toPrefix(), "scp(5, e1)");
                assert.strictEqual(expr.toString(), "5 | e1");
            });
        });
        describe("__lshift__", function () {
            it("(Expr)", function () {
                const expr = e1.__lshift__(e2);
                assert.strictEqual(expr.toPrefix(), "lco(e1, e2)");
                assert.strictEqual(expr.toString(), "e1 << e2");
            });
            it("(number)", function () {
                const expr = e1.__lshift__(5);
                assert.strictEqual(expr.toPrefix(), "lco(e1, 5)");
                assert.strictEqual(expr.toString(), "e1 << 5");
            });
        });
        describe("__rlshift__", function () {
            it("(Expr)", function () {
                const expr = e1.__rlshift__(e2);
                assert.strictEqual(expr.toPrefix(), "lco(e2, e1)");
                assert.strictEqual(expr.toString(), "e2 << e1");
            });
            it("(number)", function () {
                const expr = e1.__rlshift__(5);
                assert.strictEqual(expr.toPrefix(), "lco(5, e1)");
                assert.strictEqual(expr.toString(), "5 << e1");
            });
        });
        describe("__rshift__", function () {
            it("(Expr)", function () {
                const expr = e1.__rshift__(e2);
                assert.strictEqual(expr.toPrefix(), "rco(e1, e2)");
                assert.strictEqual(expr.toString(), "e1 >> e2");
            });
            it("(number)", function () {
                const expr = e1.__rshift__(5);
                assert.strictEqual(expr.toPrefix(), "rco(e1, 5)");
                assert.strictEqual(expr.toString(), "e1 >> 5");
            });
        });
        describe("__rrshift__", function () {
            it("(Expr)", function () {
                const expr = e1.__rrshift__(e2);
                assert.strictEqual(expr.toPrefix(), "rco(e2, e1)");
                assert.strictEqual(expr.toString(), "e2 >> e1");
            });
            it("(number)", function () {
                const expr = e1.__rrshift__(5);
                assert.strictEqual(expr.toPrefix(), "rco(5, e1)");
                assert.strictEqual(expr.toString(), "5 >> e1");
            });
        });
        describe("__wedge__", function () {
            it("(Expr)", function () {
                const expr = e1.__wedge__(e2);
                assert.strictEqual(expr.toPrefix(), "ext(e1, e2)");
                assert.strictEqual(expr.toString(), "e1 ^ e2");
            });
            it("(number)", function () {
                const expr = e1.__wedge__(5);
                assert.strictEqual(expr.toPrefix(), "ext(e1, 5)");
                assert.strictEqual(expr.toString(), "e1 ^ 5");
            });
        });
        describe("__rwedge__", function () {
            it("(Expr)", function () {
                const expr = e1.__rwedge__(e2);
                assert.strictEqual(expr.toPrefix(), "ext(e2, e1)");
                assert.strictEqual(expr.toString(), "e2 ^ e1");
            });
            it("(number)", function () {
                const expr = e1.__rwedge__(5);
                assert.strictEqual(expr.toPrefix(), "ext(5, e1)");
                assert.strictEqual(expr.toString(), "5 ^ e1");
            });
        });
        describe("__tilde__", function () {
            it("should be reversion", function () {
                const expr = e1.__tilde__();
                assert.strictEqual(expr.toPrefix(), "reverse(e1)");
                assert.strictEqual(expr.toString(), "~e1");
                assert.strictEqual(expr.simplify().toString(), "~e1");

                assert.strictEqual(expr.reset().toString(), "~e1");
                assert.isFalse(expr.reset().isChanged());

                assert.strictEqual(expr.copy(false).toString(), "~e1");
                assert.isFalse(expr.copy(false).isChanged());

                assert.strictEqual(expr.copy(true).toString(), "~e1");
                assert.isTrue(expr.copy(true).isChanged());
            });
        });
        describe("__bang__", function () {
            it("should be inverse", function () {
                const expr = e1.__bang__();
                assert.strictEqual(expr.toPrefix(), "inverse(e1)");
                assert.strictEqual(expr.toString(), "!e1");
                assert.strictEqual(expr.simplify().toString(), "!e1");

                assert.strictEqual(expr.reset().toString(), "!e1");
                assert.isFalse(expr.reset().isChanged());

                assert.strictEqual(expr.copy(false).toString(), "!e1");
                assert.isFalse(expr.copy(false).isChanged());

                assert.strictEqual(expr.copy(true).toString(), "!e1");
                assert.isTrue(expr.copy(true).isChanged());
            });
        });
        describe("__neg__", function () {
            it("should be negative", function () {
                const expr = e1.__neg__();
                assert.strictEqual(expr.toPrefix(), "neg(e1)");
                assert.strictEqual(expr.toString(), "-e1");
                assert.strictEqual(expr.simplify().toString(), "-e1");

                assert.strictEqual(expr.reset().toString(), "-e1");
                assert.isFalse(expr.reset().isChanged());

                assert.strictEqual(expr.copy(false).toString(), "-e1");
                assert.isFalse(expr.copy(false).isChanged());

                assert.strictEqual(expr.copy(true).toString(), "-e1");
                assert.isTrue(expr.copy(true).isChanged());
            });
        });
        describe("__pos__", function () {
            it("should be positive", function () {
                const expr = e1.__pos__();
                assert.strictEqual(expr.toPrefix(), "pos(e1)");
                assert.strictEqual(expr.toString(), "+e1");
                assert.strictEqual(expr.simplify().toString(), "+e1");

                assert.strictEqual(expr.reset().toString(), "+e1");
                assert.isFalse(expr.reset().isChanged());

                assert.strictEqual(expr.copy(false).toString(), "+e1");
                assert.isFalse(expr.copy(false).isChanged());

                assert.strictEqual(expr.copy(true).toString(), "+e1");
                assert.isTrue(expr.copy(true).isChanged());
            });
        });
        it("BasisBladeExpr", function () {
            assert.isFalse(e1.dirty);
            assert.isFalse(e1.copy(false).dirty);
            assert.isTrue(e1.copy(true).dirty);
            assert.isFalse(e1.copy(true).reset().dirty);
            assert.strictEqual(e1.copy(false).vectors[0], 0);
            assert.strictEqual(e1.reset().vectors[0], 0);
        });
        it("should have a complete basis", function () {
            assert.strictEqual(g3.basis[0].toString(), "1");
            assert.strictEqual(g3.basis[1].toString(), "e1");
            assert.strictEqual(g3.basis[2].toString(), "e2");
            assert.strictEqual(g3.basis[3].toString(), "e1 ^ e2");
            assert.strictEqual(g3.basis[4].toString(), "e3");
            assert.strictEqual(g3.basis[5].toString(), "e1 ^ e3");
            assert.strictEqual(g3.basis[6].toString(), "e2 ^ e3");
            assert.strictEqual(g3.basis[7].toString(), "e1 ^ e2 ^ e3");
        });
        it("extension", function () {
            assert.strictEqual(e12.toString(), "e1 ^ e2");
            assert.strictEqual(e13.toString(), "e1 ^ e3");
            assert.strictEqual(e23.toString(), "e2 ^ e3");

            assert.strictEqual(e123.toString(), "e1 ^ e2 ^ e3");
            assert.isTrue(e123 instanceof WedgeExpr);

            assert.strictEqual(e1.__wedge__(e1).toString(), "e1 ^ e1");
        });
        describe("", function () {
            it("simplify", function () {
                assert.strictEqual(g3.simplify(uno).toString(), "1");
                assert.strictEqual(g3.simplify(one).toString(), "1");
                assert.strictEqual(g3.simplify(e1).toString(), "e1");
                assert.strictEqual(g3.simplify(e2).toString(), "e2");
                assert.strictEqual(g3.simplify(e3).toString(), "e3");
                assert.strictEqual(g3.simplify(two).toString(), "2");
                assert.strictEqual(g3.simplify(u2.__wedge__(u2)).toString(), "0");
                assert.strictEqual(g3.simplify(uno.__wedge__(uno)).toString(), "0");
                assert.strictEqual(g3.simplify(e1.__wedge__(uno)).toString(), "e1");
                assert.strictEqual(g3.simplify(e1.__wedge__(e1)).toString(), "0");
                assert.strictEqual(g3.simplify(e1.__wedge__(e1)).toString(), "0");
                // FIXME?
                // assert.strictEqual(g3.simplify(uno.__wedge__(one)).toString(), "0");
                assert.strictEqual(g3.simplify(uno.__wedge__(e1)).toString(), "e1");
                assert.strictEqual(g3.simplify(e12).toString(), "e1 ^ e2");
                assert.isTrue(g3.simplify(e12) instanceof BasisBladeExpr);
                assert.strictEqual(g3.simplify(e12).toString(), "e1 ^ e2");
                assert.strictEqual(g3.simplify(e1.__wedge__(e1)).toString(), "0");
            });
            it("e1 ^ e2", function () {
                assert.strictEqual(g3.simplify(e1.__wedge__(e1)).toString(), "0");
            });
            it("e1 ^ e2", function () {
                const expr = e1.__wedge__(e2);
                assert.strictEqual(expr.toPrefix(), "ext(e1, e2)");
                assert.strictEqual(expr.toString(), "e1 ^ e2");
                assert.strictEqual(g3.simplify(expr).toPrefix(), "e1 ^ e2");
                assert.strictEqual(g3.simplify(expr).toString(), "e1 ^ e2");
            });
        });
        describe("hoisting scalar through * *", function () {
            describe("(5 * e1) * e2", function () {
                const s = g3.scalar(5);
                const expr = s.__mul__(e1).__mul__(e2);
                it("should hoist", function () {
                    assert.strictEqual(expr.toPrefix(), "mul(mul(5, e1), e2)");
                    assert.strictEqual(g3.simplify(expr).toPrefix(), "mul(5, mul(e1, e2))");
                });
            });
            describe("*(*(e1, 5), e2)", function () {
                const s = g3.scalar(5);
                const expr = e1.__mul__(s).__mul__(e2);
                it("should hoist", function () {
                    assert.strictEqual(expr.toPrefix(), "mul(mul(e1, 5), e2)");
                    assert.strictEqual(g3.simplify(expr).toPrefix(), "mul(5, mul(e1, e2))");
                });
            });
            describe("*(e1, *(5, e2))", function () {
                const s = g3.scalar(5);
                const expr = s.__mul__(e2).__rmul__(e1);
                it("should hoist", function () {
                    assert.strictEqual(expr.toPrefix(), "mul(e1, mul(5, e2))");
                    assert.strictEqual(g3.simplify(expr).toPrefix(), "mul(5, mul(e1, e2))");
                });
            });
            describe("*(e1, *(e2, 5))", function () {
                const s = g3.scalar(5);
                const expr = e2.__mul__(s).__rmul__(e1);
                it("should hoist", function () {
                    assert.strictEqual(expr.toPrefix(), "mul(e1, mul(e2, 5))");
                    assert.strictEqual(g3.simplify(expr).toPrefix(), "mul(5, mul(e1, e2))");
                });
            });
            describe("(e1 * e2) * 5", function () {
                const s = g3.scalar(5);
                const expr = e1.__mul__(e2).__mul__(s);
                it("should hoist", function () {
                    assert.strictEqual(expr.toPrefix(), "mul(mul(e1, e2), 5)");
                    assert.strictEqual(g3.simplify(expr).toPrefix(), "mul(5, mul(e1, e2))");
                });
            });
        });
    });
});
