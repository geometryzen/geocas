import blade from './lib/mother/Blade';
import complex from './lib/mother/Complex';
import ComplexFieldAdapter from './lib/mother/ComplexFieldAdapter';
import cosineOfAngleBetweenBlades from './lib/mother/cosineOfAngleBetweenBlades';
import norm from './lib/mother/norm';
import NumberFieldAdapter from './lib/mother/NumberFieldAdapter';
import orthoFramesToVersor from './lib/mother/orthoFramesToVersor';
import { algebra } from './lib/mother/Algebra';
import squaredNorm from './lib/mother/squaredNorm';
/**
 *
 */
declare const GeoCAS: {
    /**
     * The publish date of the latest version of the library.
     */
    readonly LAST_MODIFIED: string;
    /**
     * The semantic version of the library.
     */
    readonly VERSION: string;
    readonly blade: typeof blade;
    readonly complex: typeof complex;
    readonly ComplexFieldAdapter: typeof ComplexFieldAdapter;
    readonly cosineOfAngleBetweenBlades: typeof cosineOfAngleBetweenBlades;
    readonly norm: typeof norm;
    readonly NumberFieldAdapter: typeof NumberFieldAdapter;
    readonly orthoFramesToVersor: typeof orthoFramesToVersor;
    readonly algebra: typeof algebra;
    readonly squaredNorm: typeof squaredNorm;
};
export default GeoCAS;
