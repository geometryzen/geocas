import gpG from './gpG';
import grade from './grade';
export default function rcoG(a, b, m, adapter) {
    var ga = a.grade();
    var gb = b.grade();
    if (ga < gb) {
        return [];
    }
    else {
        var bitmap = a.bitmap ^ b.bitmap;
        var g = grade(bitmap);
        if (g !== (ga - gb)) {
            return [];
        }
        else {
            return gpG(a, b, m, adapter);
        }
    }
}
