import { isObject } from '../checks/isObject';
import { mustSatisfy } from '../checks/mustSatisfy';

function beObject() {
    return "be an `object`";
}

export function mustBeObject<T>(name: string, value: T, contextBuilder?: () => string): T {
    mustSatisfy(name, isObject(value), beObject, contextBuilder);
    return value;
}
