import gpE from './gpE';
import grade from './grade';
export default function lcoE(a, b, adapter) {
    var ga = a.grade();
    var gb = b.grade();
    if (ga > gb) {
        // May be more efficient to return null?
        return a.zero();
    }
    else {
        var bitmap = a.bitmap ^ b.bitmap;
        var g = grade(bitmap);
        if (g !== (gb - ga)) {
            // May be more efficient to return null?
            return a.zero();
        }
        else {
            return gpE(a, b, adapter);
        }
    }
}
