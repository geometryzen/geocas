export default class EventEmitter<T> {
    private _eventRegistry;
    private owner;
    constructor(owner: T);
    addEventListener(eventName: string, callback: (eventName: string, key: string, value: number, source: T) => void): (eventName: string, key: string, value: number, source: T) => void;
    removeEventListener(eventName: string, callback: (eventName: string, key: string, value: number, source: T) => any): void;
    emit(eventName: string, key: string, value: number): any;
}
