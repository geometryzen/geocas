// math
import Algebra from './geocas/math/Algebra';
import bigInt from './geocas/math/BigInteger';
import bigRat from './geocas/math/BigRational';
import blade from './geocas/mother/Blade';
import mv from './geocas/mother/Multivector';
import NumberFieldAdapter from './geocas/mother/NumberFieldAdapter';
import {getScalar, getBasisVector} from './geocas/mother/Multivector';
import config from './geocas/config';

/**
 *
 */
const GeoCAS = {
    /**
     * The publish date of the latest version of the library.
     */
    get LAST_MODIFIED() { return config.LAST_MODIFIED },

    /**
     * The semantic version of the library.
     */
    get VERSION() { return config.VERSION },

    get Algebra() { return Algebra },
    get bigInt() { return bigInt },
    get bigRat() { return bigRat },
    get blade() { return blade },
    get mv() { return mv },
    get NumberFieldAdapter() { return NumberFieldAdapter },
    get getScalar() { return getScalar },
    get getBasisVector() { return getBasisVector }
}
export default GeoCAS;
