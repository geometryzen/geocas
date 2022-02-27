import { isNumber } from '../checks/isNumber';
import { mustSatisfy } from '../checks/mustSatisfy';

function beANumber() {
    return "be a `number`";
}

export function mustBeNumber(name: string, value: number, contextBuilder?: () => string): number {
    mustSatisfy(name, isNumber(value), beANumber, contextBuilder);
    return value;
}
