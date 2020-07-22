declare class GeoCAS {
    GITHUB: string;
    CREATED_AT: string;
    MODIFIED_AT: string;
    NAMESPACE: string;
    VERSION: string;
    constructor();
    log(message?: any, ...optionalParams: any[]): void;
    info(message?: any, ...optionalParams: any[]): void;
    warn(message?: any, ...optionalParams: any[]): void;
    error(message?: any, ...optionalParams: any[]): void;
}
/**
 *
 */
declare const config: GeoCAS;
export default config;
