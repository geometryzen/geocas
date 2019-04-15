// math
import blade from './geocas/mother/Blade';
import complex from './geocas/mother/Complex';
import ComplexFieldAdapter from './geocas/mother/ComplexFieldAdapter';
import cosineOfAngleBetweenBlades from './geocas/mother/cosineOfAngleBetweenBlades';
import norm from './geocas/mother/norm';
import NumberFieldAdapter from './geocas/mother/NumberFieldAdapter';
import orthoFramesToVersor from './geocas/mother/orthoFramesToVersor';
import { algebra } from './geocas/mother/Algebra';
import config from './geocas/config';
import squaredNorm from './geocas/mother/squaredNorm';

/**
 *
 */
const GeoCAS = {
    /**
     * The publish date of the latest version of the library.
     */
    get LAST_MODIFIED() { return config.MODIFIED_AT; },

    /**
     * The semantic version of the library.
     */
    get VERSION() { return config.VERSION; },

    get blade() { return blade; },
    get complex() { return complex; },
    get ComplexFieldAdapter() { return ComplexFieldAdapter; },
    get cosineOfAngleBetweenBlades() { return cosineOfAngleBetweenBlades; },
    get norm() { return norm; },
    get NumberFieldAdapter() { return NumberFieldAdapter; },
    get orthoFramesToVersor() { return orthoFramesToVersor; },
    get algebra() { return algebra; },
    get squaredNorm() { return squaredNorm; }
}
export default GeoCAS;
