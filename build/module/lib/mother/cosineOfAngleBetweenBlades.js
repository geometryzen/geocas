import norm from './norm';
/**
 * The cosine of the angle between two blades.
 */
export default function cos(A, B) {
    var a = norm(A).scalarCoordinate();
    var b = norm(B).scalarCoordinate();
    return A.scp(B.rev()).divByScalar(a).divByScalar(b);
}
