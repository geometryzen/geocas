// math
import { config } from './config';
export { algebra } from './mother/Algebra';
export { blade } from './mother/Blade';
export { complex, Complex } from './mother/Complex';
export { ComplexFieldAdapter } from './mother/ComplexFieldAdapter';
export { cosineOfAngleBetweenBlades } from './mother/cosineOfAngleBetweenBlades';
export { FieldAdapter } from './mother/FieldAdapter';
export { Algebra, Blade, Metric, Multivector } from './mother/Multivector';
export { norm } from './mother/norm';
export { NumberFieldAdapter } from './mother/NumberFieldAdapter';
export { orthoFramesToVersor } from './mother/orthoFramesToVersor';
export { squaredNorm } from './mother/squaredNorm';

/**
 *
 */
export const GeoCAS = {
    /**
     * The publish date of the latest version of the library.
     */
    get LAST_MODIFIED() { return config.MODIFIED_AT; },

    /**
     * The semantic version of the library.
     */
    get VERSION() { return config.VERSION; },
}
