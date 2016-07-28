// math
import Algebra from './geocas/math/Algebra';

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
}
export default GeoCAS;
