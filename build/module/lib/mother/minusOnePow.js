/**
 * pow(-1, i), i.e. (-1) raised to the i'th power.
 */
export default function minusOnePow(i) {
    return ((i & 1) === 0) ? 1 : -1;
}
