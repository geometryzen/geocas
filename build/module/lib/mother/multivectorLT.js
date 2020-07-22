import isScalar from './isScalar';
export default function multivectorLT(lhs, rhs, field) {
    if (isScalar(lhs) && isScalar(rhs)) {
        var l = lhs.scalarCoordinate();
        var r = rhs.scalarCoordinate();
        return field.lt(l, r);
    }
    else {
        throw new Error(lhs + " < " + rhs + " is not implemented.");
    }
}
