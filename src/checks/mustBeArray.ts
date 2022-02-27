import { mustSatisfy } from '../checks/mustSatisfy';

function beAnArray() {
    return "be an array";
}

export function mustBeArray<T>(name: string, value: T[], contextBuilder?: () => string): T[] {
    mustSatisfy(name, Array.isArray(value), beAnArray, contextBuilder);
    return value;
}
