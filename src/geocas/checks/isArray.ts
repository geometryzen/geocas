export default function isArray(x: any): x is any[] {
    return Object.prototype.toString.call(x) === '[object Array]';
}
