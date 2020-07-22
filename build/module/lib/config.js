var GeoCAS = /** @class */ (function () {
    function GeoCAS() {
        this.GITHUB = 'https://github.com/geometryzen/GeoCAS';
        this.CREATED_AT = '2016-09-24';
        this.MODIFIED_AT = '2020-07-22';
        this.NAMESPACE = 'GeoCAS';
        this.VERSION = '2.0.0';
    }
    GeoCAS.prototype.log = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        // This should allow us to unit test and run in environments without a console.
        console.log(message);
    };
    GeoCAS.prototype.info = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        // This should allow us to unit test and run in environments without a console.
        console.log(message);
    };
    GeoCAS.prototype.warn = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        // This should allow us to unit test and run in environments without a console.
        console.warn(message);
    };
    GeoCAS.prototype.error = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        // This should allow us to unit test and run in environments without a console.
        console.error(message);
    };
    return GeoCAS;
}());
/**
 *
 */
var config = new GeoCAS();
export default config;
