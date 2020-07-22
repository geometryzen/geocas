import blade from './Blade';
import canonicalReorderingSign from './canonicalReorderingSign';
export default function gpE(a, b, adapter) {
    var bitmap = a.bitmap ^ b.bitmap;
    var sign = canonicalReorderingSign(a.bitmap, b.bitmap);
    var scale = adapter.mul(a.weight, b.weight);
    if (sign > 0) {
        return blade(bitmap, scale, adapter);
    }
    else {
        return blade(bitmap, adapter.neg(scale), adapter);
    }
}
