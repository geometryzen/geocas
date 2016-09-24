import FieldAdapter from './FieldAdapter';
import isScalar from './isScalar';
import {Multivector} from './Multivector';

export default function multivectorGE<T>(lhs: Multivector<T>, rhs: Multivector<T>, field: FieldAdapter<T>): boolean {
    if (isScalar(lhs) && isScalar(rhs)) {
        const l = lhs.scalarCoordinate();
        const r = rhs.scalarCoordinate();
        return field.ge(l, r);
    }
    else {
        throw new Error(`${lhs} >= ${rhs} is not implemented.`);
    }
}
