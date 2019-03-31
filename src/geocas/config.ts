class GeoCAS {
    GITHUB: string;
    CREATED_AT: string;
    MODIFIED_AT: string;
    NAMESPACE: string;
    VERSION: string;

    constructor() {
        this.GITHUB = 'https://github.com/geometryzen/GeoCAS';
        this.CREATED_AT = '2016-09-24';
        this.MODIFIED_AT = '2019-03-30';
        this.NAMESPACE = 'GeoCAS';
        this.VERSION = '1.13.1';
    }

    log(message?: any, ...optionalParams: any[]): void {
        // This should allow us to unit test and run in environments without a console.
        console.log(message)
    }

    info(message?: any, ...optionalParams: any[]): void {
        // This should allow us to unit test and run in environments without a console.
        console.info(message)
    }

    warn(message?: any, ...optionalParams: any[]): void {
        // This should allow us to unit test and run in environments without a console.
        console.warn(message)
    }

    error(message?: any, ...optionalParams: any[]): void {
        // This should allow us to unit test and run in environments without a console.
        console.error(message)
    }
}

/**
 *
 */
const config = new GeoCAS()

export default config;
