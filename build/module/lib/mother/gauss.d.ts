import FieldAdapter from './FieldAdapter';
/**
 * Gaussian elimination using a parametrized field type.
 * Ax = b
 */
export default function gauss<T>(A: T[][], b: T[], adapter: FieldAdapter<T>): T[];
