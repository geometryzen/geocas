export default function isArray<T>(x: any): x is T[] {
    return Object.prototype.toString.call(x) === '[object Array]';
}
