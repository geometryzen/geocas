import blade from './Blade';
import gpE from './gpE';
export default function gpL(a, b, m, adapter) {
    var temp = gpE(a, b, adapter);
    var weight = temp.weight;
    // compute the meet (bitmap of annihilated vectors):
    var bitmap = a.bitmap & b.bitmap;
    // change the scale according to the metric.
    var i = 0;
    while (bitmap !== 0) {
        if ((bitmap & 1) !== 0) {
            weight = adapter.mulByNumber(weight, m[i]);
        }
        i++;
        bitmap = bitmap >> 1;
    }
    return blade(temp.bitmap, weight, adapter);
}
