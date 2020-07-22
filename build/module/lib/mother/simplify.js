import blade from './Blade';
import bladesToArray from './bladesToArray';
// TODO: This could be replaced by a more functional implementation using reduce?
export default function simplify(blades, adapter) {
    var map = {};
    for (var i = 0; i < blades.length; i++) {
        var B = blades[i];
        var existing = map[B.bitmap];
        if (existing) {
            var scale = adapter.add(existing.weight, B.weight);
            if (adapter.isZero(scale)) {
                delete map[B.bitmap];
            }
            else {
                map[B.bitmap] = blade(B.bitmap, scale, adapter);
            }
        }
        else {
            if (!adapter.isZero(B.weight)) {
                map[B.bitmap] = B;
            }
        }
    }
    return bladesToArray(map);
}
