import { isInteger } from '../checks/isInteger';
import { mustSatisfy } from '../checks/mustSatisfy';

function beAnInteger() {
    return "be an integer";
}

export function mustBeInteger(name: string, value: number, contextBuilder?: () => string): number {
    mustSatisfy(name, isInteger(value), beAnInteger, contextBuilder);
    return value;
}
