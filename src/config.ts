class GeoCAS {
    GITHUB: string;
    CREATED_AT: string;
    MODIFIED_AT: string;
    NAMESPACE: string;
    VERSION: string;

    constructor() {
        this.GITHUB = 'https://github.com/geometryzen/GeoCAS';
        this.CREATED_AT = '2016-09-24';
        this.MODIFIED_AT = '2022-02-27';
        this.NAMESPACE = 'GeoCAS';
        this.VERSION = '3.0.0';
    }

    log(message?: unknown, ...optionalParams: unknown[]): void {
        // This should allow us to unit test and run in environments without a console.
        console.log(message, ...optionalParams);
    }

    info(message?: unknown, ...optionalParams: unknown[]): void {
        // This should allow us to unit test and run in environments without a console.
        console.log(message, ...optionalParams);
    }

    warn(message?: unknown, ...optionalParams: unknown[]): void {
        // This should allow us to unit test and run in environments without a console.
        console.warn(message, ...optionalParams);
    }

    error(message?: unknown, ...optionalParams: unknown[]): void {
        // This should allow us to unit test and run in environments without a console.
        console.error(message, optionalParams);
    }
}

/**
 *
 */
export const config = new GeoCAS();
