// math
import blade from './lib/mother/Blade';
import complex from './lib/mother/Complex';
import ComplexFieldAdapter from './lib/mother/ComplexFieldAdapter';
import cosineOfAngleBetweenBlades from './lib/mother/cosineOfAngleBetweenBlades';
import norm from './lib/mother/norm';
import NumberFieldAdapter from './lib/mother/NumberFieldAdapter';
import orthoFramesToVersor from './lib/mother/orthoFramesToVersor';
import { algebra } from './lib/mother/Algebra';
import config from './lib/config';
import squaredNorm from './lib/mother/squaredNorm';
/**
 *
 */
var GeoCAS = {
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
};
export default GeoCAS;
