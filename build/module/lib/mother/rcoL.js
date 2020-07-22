import gpL from './gpL';
import grade from './grade';
export default function rcoL(a, b, m, adapter) {
    var ga = a.grade();
    var gb = b.grade();
    if (ga < gb) {
        // May be more efficient to return null?
        return a.zero();
    }
    else {
        var bitmap = a.bitmap ^ b.bitmap;
        var g = grade(bitmap);
        if (g !== (ga - gb)) {
            // May be more efficient to return null?
            return a.zero();
        }
        else {
            return gpL(a, b, m, adapter);
        }
    }
}
