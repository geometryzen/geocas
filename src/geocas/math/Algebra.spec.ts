import Algebra from './Algebra';
import {BasisBladeExpr} from './Algebra';
import {WedgeExpr} from './Algebra';

describe("Algebra", function() {
    describe("G3", function() {
        const g3 = new Algebra(['i', 'j', 'k'], [[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
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
    });
});
