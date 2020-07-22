(function(global, define) {
  var globalDefine = global.define;
/**
 * @license almond 0.3.3 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, http://github.com/requirejs/almond/LICENSE
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
    var main, req, makeMap, handlers,
        defined = {},
        waiting = {},
        config = {},
        defining = {},
        hasOwn = Object.prototype.hasOwnProperty,
        aps = [].slice,
        jsSuffixRegExp = /\.js$/;

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var nameParts, nameSegment, mapValue, foundMap, lastIndex,
            foundI, foundStarMap, starI, i, j, part, normalizedBaseParts,
            baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {};

        //Adjust any relative paths.
        if (name) {
            name = name.split('/');
            lastIndex = name.length - 1;

            // If wanting node ID compatibility, strip .js from end
            // of IDs. Have to do this here, and not in nameToUrl
            // because node allows either .js or non .js to map
            // to same file.
            if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
            }

            // Starts with a '.' so need the baseName
            if (name[0].charAt(0) === '.' && baseParts) {
                //Convert baseName to array, and lop off the last part,
                //so that . matches that 'directory' and not name of the baseName's
                //module. For instance, baseName of 'one/two/three', maps to
                //'one/two/three.js', but we want the directory, 'one/two' for
                //this normalization.
                normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
                name = normalizedBaseParts.concat(name);
            }

            //start trimDots
            for (i = 0; i < name.length; i++) {
                part = name[i];
                if (part === '.') {
                    name.splice(i, 1);
                    i -= 1;
                } else if (part === '..') {
                    // If at the start, or previous value is still ..,
                    // keep them so that when converted to a path it may
                    // still work when converted to a path, even though
                    // as an ID it is less than ideal. In larger point
                    // releases, may be better to just kick out an error.
                    if (i === 0 || (i === 1 && name[2] === '..') || name[i - 1] === '..') {
                        continue;
                    } else if (i > 0) {
                        name.splice(i - 1, 2);
                        i -= 2;
                    }
                }
            }
            //end trimDots

            name = name.join('/');
        }

        //Apply map config if available.
        if ((baseParts || starMap) && map) {
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                            mapValue = mapValue[nameSegment];
                            if (mapValue) {
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            }
                        }
                    }
                }

                if (foundMap) {
                    break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                }
            }

            if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
            }

            if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            }
        }

        return name;
    }

    function makeRequire(relName, forceSync) {
        return function () {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            var args = aps.call(arguments, 0);

            //If first arg is not require('string'), and there is only
            //one arg, it is the array form without a callback. Insert
            //a null so that the following concat is correct.
            if (typeof args[0] !== 'string' && args.length === 1) {
                args.push(null);
            }
            return req.apply(undef, args.concat([relName, forceSync]));
        };
    }

    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(depName) {
        return function (value) {
            defined[depName] = value;
        };
    }

    function callDep(name) {
        if (hasProp(waiting, name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!hasProp(defined, name) && !hasProp(defining, name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    //Turns a plugin!resource to [plugin, resource]
    //with the plugin being undefined if the name
    //did not have a plugin prefix.
    function splitPrefix(name) {
        var prefix,
            index = name ? name.indexOf('!') : -1;
        if (index > -1) {
            prefix = name.substring(0, index);
            name = name.substring(index + 1, name.length);
        }
        return [prefix, name];
    }

    //Creates a parts array for a relName where first part is plugin ID,
    //second part is resource ID. Assumes relName has already been normalized.
    function makeRelParts(relName) {
        return relName ? splitPrefix(relName) : [];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    makeMap = function (name, relParts) {
        var plugin,
            parts = splitPrefix(name),
            prefix = parts[0],
            relResourceName = relParts[1];

        name = parts[1];

        if (prefix) {
            prefix = normalize(prefix, relResourceName);
            plugin = callDep(prefix);
        }

        //Normalize according
        if (prefix) {
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relResourceName));
            } else {
                name = normalize(name, relResourceName);
            }
        } else {
            name = normalize(name, relResourceName);
            parts = splitPrefix(name);
            prefix = parts[0];
            name = parts[1];
            if (prefix) {
                plugin = callDep(prefix);
            }
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            pr: prefix,
            p: plugin
        };
    };

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    handlers = {
        require: function (name) {
            return makeRequire(name);
        },
        exports: function (name) {
            var e = defined[name];
            if (typeof e !== 'undefined') {
                return e;
            } else {
                return (defined[name] = {});
            }
        },
        module: function (name) {
            return {
                id: name,
                uri: '',
                exports: defined[name],
                config: makeConfig(name)
            };
        }
    };

    main = function (name, deps, callback, relName) {
        var cjsModule, depName, ret, map, i, relParts,
            args = [],
            callbackType = typeof callback,
            usingExports;

        //Use name if no relName
        relName = relName || name;
        relParts = makeRelParts(relName);

        //Call the callback to define the module, if necessary.
        if (callbackType === 'undefined' || callbackType === 'function') {
            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relParts);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = handlers.require(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = handlers.exports(name);
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = handlers.module(name);
                } else if (hasProp(defined, depName) ||
                           hasProp(waiting, depName) ||
                           hasProp(defining, depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback ? callback.apply(defined[name], args) : undefined;

            if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                        cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                }
            }
        } else if (name) {
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        }
    };

    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
        if (typeof deps === "string") {
            if (handlers[deps]) {
                //callback in this case is really relName
                return handlers[deps](callback);
            }
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, makeRelParts(callback)).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
            if (config.deps) {
                req(config.deps, config.callback);
            }
            if (!callback) {
                return;
            }

            if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            } else {
                deps = undef;
            }
        }

        //Support require(['a'])
        callback = callback || function () {};

        //If relName is a function, it is an errback handler,
        //so remove it.
        if (typeof relName === 'function') {
            relName = forceSync;
            forceSync = alt;
        }

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            //Using a non-zero value because of concern for what old browsers
            //do, and latest browsers "upgrade" to 4 if lower value is used:
            //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
            //If want a value immediately, use require('id') instead -- something
            //that works in almond on the global level, but not guaranteed and
            //unlikely to work in other AMD implementations.
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 4);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        return req(cfg);
    };

    /**
     * Expose module registry for debugging and tooling
     */
    requirejs._defined = defined;

    define = function (name, deps, callback) {
        if (typeof name !== 'string') {
            throw new Error('See almond README: incorrect module build, no module name');
        }

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        if (!hasProp(defined, name) && !hasProp(waiting, name)) {
            waiting[name] = [name, deps, callback];
        }
    };

    define.amd = {
        jQuery: true
    };
}());

define("../bower_components/almond/almond", function(){});

define('geocas/mother/bitCount',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function bitCount(i) {
        i = i - ((i >> 1) & 0x55555555);
        i = (i & 0x33333333) + ((i >> 2) & 0x33333333);
        i = (i + (i >> 4)) & 0x0F0F0F0F;
        i = i + (i >> 8);
        i = i + (i >> 16);
        return i & 0x0000003F;
    }
    exports.default = bitCount;
});

define('geocas/mother/canonicalReorderingSign',["require", "exports", "./bitCount"], function (require, exports, bitCount_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function canonicalReorderingSign(a, b) {
        a >>= 1;
        var sum = 0;
        while (a !== 0) {
            sum += bitCount_1.default(a & b);
            a >>= 1;
        }
        return ((sum & 1) === 0) ? 1 : -1;
    }
    exports.default = canonicalReorderingSign;
});

define('geocas/checks/isUndefined',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isUndefined(arg) {
        return (typeof arg === 'undefined');
    }
    exports.default = isUndefined;
});

define('geocas/mother/minusOnePow',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function minusOnePow(i) {
        return ((i & 1) === 0) ? 1 : -1;
    }
    exports.default = minusOnePow;
});

define('geocas/mother/Blade',["require", "exports", "./bitCount", "./canonicalReorderingSign", "../checks/isUndefined", "./minusOnePow"], function (require, exports, bitCount_1, canonicalReorderingSign_1, isUndefined_1, minusOnePow_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SCALAR = 0;
    function blade(b, weight, adapter) {
        var that = {
            get bitmap() {
                return b;
            },
            get weight() {
                return weight;
            },
            __neg__: function () {
                return blade(b, adapter.neg(weight), adapter);
            },
            __vbar__: function (rhs, m) {
                if (b !== rhs.bitmap) {
                    return blade(SCALAR, adapter.zero, adapter);
                }
                else {
                    return blade(SCALAR, adapter.mul(weight, rhs.weight), adapter);
                }
            },
            __wedge__: function (rhs) {
                if (b & rhs.bitmap) {
                    return blade(SCALAR, adapter.zero, adapter);
                }
                else {
                    var bitmap = b ^ rhs.bitmap;
                    var sign = canonicalReorderingSign_1.default(b, rhs.bitmap);
                    var newScale = adapter.mul(weight, rhs.weight);
                    return blade(bitmap, sign > 0 ? newScale : adapter.neg(newScale), adapter);
                }
            },
            grade: function () {
                return bitCount_1.default(b);
            },
            reverse: function () {
                var x = that.grade();
                var sign = minusOnePow_1.default(x * (x - 1) / 2);
                return blade(b, sign > 0 ? weight : adapter.neg(weight), adapter);
            },
            gradeInversion: function () {
                var x = that.grade();
                var sign = minusOnePow_1.default(x);
                return blade(b, sign > 0 ? weight : adapter.neg(weight), adapter);
            },
            cliffordConjugate: function () {
                var x = that.grade();
                var sign = minusOnePow_1.default(x * (x + 1) / 2);
                return blade(b, sign > 0 ? weight : adapter.neg(weight), adapter);
            },
            zero: function () {
                return blade(SCALAR, adapter.zero, adapter);
            },
            asString: function (names) {
                var bladePart = "";
                var i = 1;
                var x = b;
                while (x !== 0) {
                    if ((x & 1) !== 0) {
                        if (bladePart.length > 0)
                            bladePart += " ^ ";
                        if (isUndefined_1.default(names) || (names === null) || (i > names.length) || (names[i - 1] == null)) {
                            bladePart = bladePart + "e" + i;
                        }
                        else {
                            bladePart = bladePart + names[i - 1];
                        }
                    }
                    x >>= 1;
                    i++;
                }
                if (bladePart.length === 0) {
                    return adapter.asString(weight);
                }
                else {
                    if (adapter.isOne(weight)) {
                        return bladePart;
                    }
                    else {
                        return adapter.asString(weight) + " * " + bladePart;
                    }
                }
            },
            toString: function () {
                return that.asString(void 0);
            }
        };
        return that;
    }
    exports.default = blade;
});

define('geocas/checks/isNumber',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isNumber(x) {
        return (typeof x === 'number');
    }
    exports.default = isNumber;
});

define('geocas/mother/Complex',["require", "exports", "../checks/isNumber"], function (require, exports, isNumber_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function complex(x, y) {
        var that = {
            get x() {
                return x;
            },
            get y() {
                return y;
            },
            __abs__: function () {
                return complex(Math.sqrt(x * x + y * y), 0);
            },
            __add__: function (rhs) {
                return complex(x + rhs.x, y + rhs.y);
            },
            __sub__: function (rhs) {
                return complex(x - rhs.x, y - rhs.y);
            },
            __mul__: function (rhs) {
                if (isNumber_1.default(rhs)) {
                    return complex(x * rhs, y * rhs);
                }
                else {
                    return complex(x * rhs.x - y * rhs.y, y * rhs.x + x * rhs.y);
                }
            },
            __div__: function (rhs) {
                if (isNumber_1.default(rhs)) {
                    return complex(x / rhs, y / rhs);
                }
                else {
                    var denom = rhs.x * rhs.x + rhs.y * rhs.y;
                    return complex((x * rhs.x + y * rhs.y) / denom, (y * rhs.x - x * rhs.y) / denom);
                }
            },
            __neg__: function () {
                return complex(-x, -y);
            },
            toString: function () {
                return "[" + x + ", " + y + "]";
            },
            __cos__: function () {
                throw new Error("TODO: cos");
            },
            __sin__: function () {
                throw new Error("TODO: sin");
            }
        };
        return that;
    }
    exports.default = complex;
});

define('geocas/checks/mustSatisfy',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function mustSatisfy(name, condition, messageBuilder, contextBuilder) {
        if (!condition) {
            var message = messageBuilder ? messageBuilder() : "satisfy some condition";
            var context = contextBuilder ? " in " + contextBuilder() : "";
            throw new Error(name + " must " + message + context + ".");
        }
    }
    exports.default = mustSatisfy;
});

define('geocas/checks/mustBeNumber',["require", "exports", "../checks/mustSatisfy", "../checks/isNumber"], function (require, exports, mustSatisfy_1, isNumber_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function beANumber() {
        return "be a `number`";
    }
    function default_1(name, value, contextBuilder) {
        mustSatisfy_1.default(name, isNumber_1.default(value), beANumber, contextBuilder);
        return value;
    }
    exports.default = default_1;
});

define('geocas/mother/ComplexFieldAdapter',["require", "exports", "./Complex", "../checks/isNumber", "../checks/mustBeNumber"], function (require, exports, Complex_1, isNumber_1, mustBeNumber_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ZERO = Complex_1.default(0, 0);
    var ComplexFieldAdapter = (function () {
        function ComplexFieldAdapter(ε) {
            if (ε === void 0) { ε = 1e-6; }
            this._ε = Complex_1.default(mustBeNumber_1.default('ε', ε), 0);
        }
        Object.defineProperty(ComplexFieldAdapter.prototype, "\u03B5", {
            get: function () {
                return this._ε;
            },
            enumerable: false,
            configurable: true
        });
        ComplexFieldAdapter.prototype.abs = function (z) {
            return z.__abs__();
        };
        ComplexFieldAdapter.prototype.add = function (lhs, rhs) {
            return lhs.__add__(rhs);
        };
        ComplexFieldAdapter.prototype.eq = function (lhs, rhs) {
            return lhs.x === rhs.x && lhs.y === rhs.y;
        };
        ComplexFieldAdapter.prototype.ne = function (lhs, rhs) {
            return lhs.x !== rhs.x || lhs.y !== rhs.y;
        };
        ComplexFieldAdapter.prototype.le = function (lhs, rhs) {
            return lhs.x <= rhs.x;
        };
        ComplexFieldAdapter.prototype.lt = function (lhs, rhs) {
            return lhs.x < rhs.x;
        };
        ComplexFieldAdapter.prototype.ge = function (lhs, rhs) {
            return lhs.x >= rhs.x;
        };
        ComplexFieldAdapter.prototype.gt = function (lhs, rhs) {
            return lhs.x > rhs.x;
        };
        ComplexFieldAdapter.prototype.sub = function (lhs, rhs) {
            return lhs.__sub__(rhs);
        };
        ComplexFieldAdapter.prototype.max = function (lhs, rhs) {
            return (lhs.x >= rhs.x) ? lhs : rhs;
        };
        ComplexFieldAdapter.prototype.min = function (lhs, rhs) {
            return (lhs.x <= rhs.x) ? lhs : rhs;
        };
        ComplexFieldAdapter.prototype.mul = function (lhs, rhs) {
            return lhs.__mul__(rhs);
        };
        ComplexFieldAdapter.prototype.mulByNumber = function (arg, α) {
            return arg.__mul__(α);
        };
        ComplexFieldAdapter.prototype.div = function (lhs, rhs) {
            return lhs.__div__(rhs);
        };
        ComplexFieldAdapter.prototype.neg = function (z) {
            return z.__neg__();
        };
        ComplexFieldAdapter.prototype.asString = function (z) {
            return z.toString();
        };
        ComplexFieldAdapter.prototype.cos = function (z) {
            return z.__cos__();
        };
        ComplexFieldAdapter.prototype.isField = function (z) {
            return isNumber_1.default(z.x) && isNumber_1.default(z.y);
        };
        ComplexFieldAdapter.prototype.isOne = function (z) {
            return z.x === 1 && z.y === 0;
        };
        ComplexFieldAdapter.prototype.isZero = function (z) {
            return z.x === 0 && z.y === 0;
        };
        Object.defineProperty(ComplexFieldAdapter.prototype, "one", {
            get: function () {
                return Complex_1.default(1, 0);
            },
            enumerable: false,
            configurable: true
        });
        ComplexFieldAdapter.prototype.sin = function (z) {
            return z.__sin__();
        };
        ComplexFieldAdapter.prototype.sqrt = function (z) {
            if (z.x === 0) {
                if (z.y === 0) {
                    return ZERO;
                }
                else {
                    throw new Error("TODO: sqrt" + z.toString());
                }
            }
            else {
                if (z.y === 0) {
                    if (z.x > 0) {
                        return Complex_1.default(Math.sqrt(z.x), 0);
                    }
                    else {
                        return Complex_1.default(0, Math.sqrt(-z.x));
                    }
                }
                else {
                    throw new Error("TODO: sqrt" + z.toString());
                }
            }
        };
        Object.defineProperty(ComplexFieldAdapter.prototype, "zero", {
            get: function () {
                return ZERO;
            },
            enumerable: false,
            configurable: true
        });
        return ComplexFieldAdapter;
    }());
    exports.default = ComplexFieldAdapter;
});

define('geocas/mother/squaredNorm',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function squaredNorm(A) {
        return A.scp(A.rev());
    }
    exports.default = squaredNorm;
});

define('geocas/mother/norm',["require", "exports", "./squaredNorm"], function (require, exports, squaredNorm_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function norm(A) {
        return squaredNorm_1.default(A).sqrt();
    }
    exports.default = norm;
});

define('geocas/mother/cosineOfAngleBetweenBlades',["require", "exports", "./norm"], function (require, exports, norm_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function cos(A, B) {
        var a = norm_1.default(A).scalarCoordinate();
        var b = norm_1.default(B).scalarCoordinate();
        return A.scp(B.rev()).divByScalar(a).divByScalar(b);
    }
    exports.default = cos;
});

define('geocas/mother/NumberFieldAdapter',["require", "exports", "../checks/mustBeNumber"], function (require, exports, mustBeNumber_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NumberFieldAdapter = (function () {
        function NumberFieldAdapter(ε) {
            if (ε === void 0) { ε = 1e-6; }
            this._ε = mustBeNumber_1.default('ε', ε);
        }
        Object.defineProperty(NumberFieldAdapter.prototype, "\u03B5", {
            get: function () {
                return this._ε;
            },
            enumerable: false,
            configurable: true
        });
        NumberFieldAdapter.prototype.abs = function (arg) {
            return Math.abs(arg);
        };
        NumberFieldAdapter.prototype.add = function (lhs, rhs) {
            return lhs + rhs;
        };
        NumberFieldAdapter.prototype.eq = function (lhs, rhs) {
            return lhs === rhs;
        };
        NumberFieldAdapter.prototype.ne = function (lhs, rhs) {
            return lhs !== rhs;
        };
        NumberFieldAdapter.prototype.le = function (lhs, rhs) {
            return lhs <= rhs;
        };
        NumberFieldAdapter.prototype.lt = function (lhs, rhs) {
            return lhs < rhs;
        };
        NumberFieldAdapter.prototype.ge = function (lhs, rhs) {
            return lhs >= rhs;
        };
        NumberFieldAdapter.prototype.gt = function (lhs, rhs) {
            return lhs > rhs;
        };
        NumberFieldAdapter.prototype.sub = function (lhs, rhs) {
            return lhs - rhs;
        };
        NumberFieldAdapter.prototype.max = function (lhs, rhs) {
            return Math.max(lhs, rhs);
        };
        NumberFieldAdapter.prototype.min = function (lhs, rhs) {
            return Math.min(lhs, rhs);
        };
        NumberFieldAdapter.prototype.mul = function (lhs, rhs) {
            return lhs * rhs;
        };
        NumberFieldAdapter.prototype.mulByNumber = function (arg, alpha) {
            return arg * alpha;
        };
        NumberFieldAdapter.prototype.div = function (lhs, rhs) {
            return lhs / rhs;
        };
        NumberFieldAdapter.prototype.neg = function (arg) {
            return -arg;
        };
        NumberFieldAdapter.prototype.asString = function (arg) {
            return arg.toString();
        };
        NumberFieldAdapter.prototype.cos = function (arg) {
            return Math.cos(arg);
        };
        NumberFieldAdapter.prototype.isField = function (arg) {
            return typeof arg === 'number';
        };
        NumberFieldAdapter.prototype.isOne = function (arg) {
            return arg === 1;
        };
        NumberFieldAdapter.prototype.isZero = function (arg) {
            return arg === 0;
        };
        Object.defineProperty(NumberFieldAdapter.prototype, "one", {
            get: function () {
                return 1;
            },
            enumerable: false,
            configurable: true
        });
        NumberFieldAdapter.prototype.sin = function (arg) {
            return Math.sin(arg);
        };
        NumberFieldAdapter.prototype.sqrt = function (arg) {
            return Math.sqrt(arg);
        };
        Object.defineProperty(NumberFieldAdapter.prototype, "zero", {
            get: function () {
                return 0;
            },
            enumerable: false,
            configurable: true
        });
        return NumberFieldAdapter;
    }());
    exports.default = NumberFieldAdapter;
});

define('geocas/mother/orthoFramesToVersor',["require", "exports", "./cosineOfAngleBetweenBlades"], function (require, exports, cosineOfAngleBetweenBlades_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function orthoFramesToVersor(A, B, vs, algebra) {
        if (A.length > 0) {
            var j = bestIndex(A, B, algebra);
            var a = A[j];
            var b = B[j];
            var e_1 = a.sub(b);
            var field = algebra.field;
            var eps = field.mulByNumber(field.one, 1e-6);
            var cosMinusOne = cosineOfAngleBetweenBlades_1.default(a, b).sub(algebra.one).scalarCoordinate();
            var tooClose = field.lt(field.abs(cosMinusOne), eps);
            if (tooClose) {
                return orthoFramesToVersor(removeAt(A, j), removeAt(B, j), vs, algebra);
            }
            else {
                var e2_1 = e_1.scp(e_1).scalarCoordinate();
                var rvs = prepend(vs, e_1.divByScalar(algebra.field.sqrt(e2_1)));
                return orthoFramesToVersor(removeAt(A, j).map(function (x) { return e_1.mul(x.mul(e_1)).neg().divByScalar(e2_1); }), removeAt(B, j), rvs, algebra);
            }
        }
        else {
            return vs;
        }
    }
    exports.default = orthoFramesToVersor;
    function prepend(xs, x) {
        var result = [];
        result.push(x);
        for (var i = 0; i < xs.length; i++) {
            result.push(xs[i]);
        }
        return result;
    }
    function removeAt(xs, index) {
        var result = [];
        for (var i = 0; i < xs.length; i++) {
            if (i !== index) {
                result.push(xs[i]);
            }
        }
        return result;
    }
    function bestIndex(A, B, algebra) {
        var N = A.length;
        var max = algebra.zero;
        var idx = 0;
        for (var k = 0; k < N; k++) {
            var x = A[k].sub(B[k]);
            var squaredNorm = x.scp(x.rev()).scalarCoordinate();
            if (algebra.field.gt(squaredNorm, max.scalarCoordinate())) {
                idx = k;
            }
        }
        return idx;
    }
});

define('geocas/mother/gpE',["require", "exports", "./Blade", "./canonicalReorderingSign"], function (require, exports, Blade_1, canonicalReorderingSign_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function gpE(a, b, adapter) {
        var bitmap = a.bitmap ^ b.bitmap;
        var sign = canonicalReorderingSign_1.default(a.bitmap, b.bitmap);
        var scale = adapter.mul(a.weight, b.weight);
        if (sign > 0) {
            return Blade_1.default(bitmap, scale, adapter);
        }
        else {
            return Blade_1.default(bitmap, adapter.neg(scale), adapter);
        }
    }
    exports.default = gpE;
});

define('geocas/mother/gpL',["require", "exports", "./Blade", "./gpE"], function (require, exports, Blade_1, gpE_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function gpL(a, b, m, adapter) {
        var temp = gpE_1.default(a, b, adapter);
        var weight = temp.weight;
        var bitmap = a.bitmap & b.bitmap;
        var i = 0;
        while (bitmap !== 0) {
            if ((bitmap & 1) !== 0) {
                weight = adapter.mulByNumber(weight, m[i]);
            }
            i++;
            bitmap = bitmap >> 1;
        }
        return Blade_1.default(temp.bitmap, weight, adapter);
    }
    exports.default = gpL;
});

define('geocas/mother/bladesToArray',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function bladesToArray(map) {
        var bitmaps = Object.keys(map);
        var rez = [];
        for (var i = 0; i < bitmaps.length; i++) {
            var bitmap = bitmaps[i];
            var blade = map[bitmap];
            rez.push(blade);
        }
        return rez;
    }
    exports.default = bladesToArray;
});

define('geocas/mother/simplify',["require", "exports", "./Blade", "./bladesToArray"], function (require, exports, Blade_1, bladesToArray_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function simplify(blades, adapter) {
        var map = {};
        for (var i = 0; i < blades.length; i++) {
            var B = blades[i];
            var existing = map[B.bitmap];
            if (existing) {
                var scale = adapter.add(existing.weight, B.weight);
                if (adapter.isZero(scale)) {
                    delete map[B.bitmap];
                }
                else {
                    map[B.bitmap] = Blade_1.default(B.bitmap, scale, adapter);
                }
            }
            else {
                if (!adapter.isZero(B.weight)) {
                    map[B.bitmap] = B;
                }
            }
        }
        return bladesToArray_1.default(map);
    }
    exports.default = simplify;
});

define('geocas/mother/gpG',["require", "exports", "./gpL", "./simplify"], function (require, exports, gpL_1, simplify_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function gpG(a, b, m, adapter) {
        var A = m.toEigenBasis(a);
        var B = m.toEigenBasis(b);
        var M = m.getEigenMetric();
        var rez = [];
        for (var i = 0; i < A.length; i++) {
            for (var k = 0; k < B.length; k++) {
                rez.push(gpL_1.default(A[i], B[k], M, adapter));
            }
        }
        return m.toMetricBasis(simplify_1.default(rez, adapter));
    }
    exports.default = gpG;
});

define('geocas/mother/grade',["require", "exports", "./bitCount"], function (require, exports, bitCount_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function grade(bitmap) {
        return bitCount_1.default(bitmap);
    }
    exports.default = grade;
});

define('geocas/mother/lcoE',["require", "exports", "./gpE", "./grade"], function (require, exports, gpE_1, grade_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function lcoE(a, b, adapter) {
        var ga = a.grade();
        var gb = b.grade();
        if (ga > gb) {
            return a.zero();
        }
        else {
            var bitmap = a.bitmap ^ b.bitmap;
            var g = grade_1.default(bitmap);
            if (g !== (gb - ga)) {
                return a.zero();
            }
            else {
                return gpE_1.default(a, b, adapter);
            }
        }
    }
    exports.default = lcoE;
});

define('geocas/mother/lcoL',["require", "exports", "./gpL", "./grade"], function (require, exports, gpL_1, grade_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function lcoL(a, b, m, adapter) {
        var ga = a.grade();
        var gb = b.grade();
        if (ga > gb) {
            return a.zero();
        }
        else {
            var bitmap = a.bitmap ^ b.bitmap;
            var g = grade_1.default(bitmap);
            if (g !== (gb - ga)) {
                return a.zero();
            }
            else {
                return gpL_1.default(a, b, m, adapter);
            }
        }
    }
    exports.default = lcoL;
});

define('geocas/mother/lcoG',["require", "exports", "./gpG", "./grade"], function (require, exports, gpG_1, grade_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function lcoG(a, b, m, adapter) {
        var ga = a.grade();
        var gb = b.grade();
        if (ga > gb) {
            return [];
        }
        else {
            var bitmap = a.bitmap ^ b.bitmap;
            var g = grade_1.default(bitmap);
            if (g !== (gb - ga)) {
                return [];
            }
            else {
                return gpG_1.default(a, b, m, adapter);
            }
        }
    }
    exports.default = lcoG;
});

define('geocas/mother/rcoE',["require", "exports", "./gpE", "./grade"], function (require, exports, gpE_1, grade_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function rcoE(a, b, adapter) {
        var ga = a.grade();
        var gb = b.grade();
        if (ga < gb) {
            return a.zero();
        }
        else {
            var bitmap = a.bitmap ^ b.bitmap;
            var g = grade_1.default(bitmap);
            if (g !== (ga - gb)) {
                return a.zero();
            }
            else {
                return gpE_1.default(a, b, adapter);
            }
        }
    }
    exports.default = rcoE;
});

define('geocas/mother/rcoL',["require", "exports", "./gpL", "./grade"], function (require, exports, gpL_1, grade_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function rcoL(a, b, m, adapter) {
        var ga = a.grade();
        var gb = b.grade();
        if (ga < gb) {
            return a.zero();
        }
        else {
            var bitmap = a.bitmap ^ b.bitmap;
            var g = grade_1.default(bitmap);
            if (g !== (ga - gb)) {
                return a.zero();
            }
            else {
                return gpL_1.default(a, b, m, adapter);
            }
        }
    }
    exports.default = rcoL;
});

define('geocas/mother/rcoG',["require", "exports", "./gpG", "./grade"], function (require, exports, gpG_1, grade_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function rcoG(a, b, m, adapter) {
        var ga = a.grade();
        var gb = b.grade();
        if (ga < gb) {
            return [];
        }
        else {
            var bitmap = a.bitmap ^ b.bitmap;
            var g = grade_1.default(bitmap);
            if (g !== (ga - gb)) {
                return [];
            }
            else {
                return gpG_1.default(a, b, m, adapter);
            }
        }
    }
    exports.default = rcoG;
});

define('geocas/checks/isArray',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isArray(x) {
        return Object.prototype.toString.call(x) === '[object Array]';
    }
    exports.default = isArray;
});

define('geocas/checks/isDefined',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isDefined(arg) {
        return (typeof arg !== 'undefined');
    }
    exports.default = isDefined;
});

define('geocas/mother/isScalar',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isScalar(arg) {
        var blades = arg.blades;
        var length = blades.length;
        for (var k = 0; k < length; k++) {
            var blade = blades[k];
            if (blade.bitmap !== 0) {
                return false;
            }
        }
        return true;
    }
    exports.default = isScalar;
});

define('geocas/checks/isString',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isString(s) {
        return (typeof s === 'string');
    }
    exports.default = isString;
});

define('geocas/mother/sortBlades',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function compareFn(a, b) {
        if (a.bitmap < b.bitmap) {
            return -1;
        }
        else if (a.bitmap > b.bitmap) {
            return +1;
        }
        else {
            return 0;
        }
    }
    function sortBlades(blades) {
        var rez = [];
        for (var i = 0; i < blades.length; i++) {
            var B = blades[i];
            rez.push(B);
        }
        rez.sort(compareFn);
        return rez;
    }
    exports.default = sortBlades;
});

define('geocas/mother/multivectorEQ',["require", "exports", "./sortBlades"], function (require, exports, sortBlades_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function multivectorEQ(lhs, rhs, field) {
        if (lhs.blades.length === rhs.blades.length) {
            var bladesL = sortBlades_1.default(lhs.blades);
            var bladesR = sortBlades_1.default(rhs.blades);
            var length_1 = bladesL.length;
            for (var i = 0; i < length_1; i++) {
                var bladeL = bladesL[i];
                var bladeR = bladesR[i];
                if (bladeL.bitmap !== bladeR.bitmap) {
                    return false;
                }
                if (field.ne(bladeL.weight, bladeR.weight)) {
                    return false;
                }
            }
            return true;
        }
        else {
            return false;
        }
    }
    exports.default = multivectorEQ;
});

define('geocas/mother/multivectorGE',["require", "exports", "./isScalar"], function (require, exports, isScalar_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function multivectorGE(lhs, rhs, field) {
        if (isScalar_1.default(lhs) && isScalar_1.default(rhs)) {
            var l = lhs.scalarCoordinate();
            var r = rhs.scalarCoordinate();
            return field.ge(l, r);
        }
        else {
            throw new Error(lhs + " >= " + rhs + " is not implemented.");
        }
    }
    exports.default = multivectorGE;
});

define('geocas/mother/multivectorGT',["require", "exports", "./isScalar"], function (require, exports, isScalar_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function multivectorGT(lhs, rhs, field) {
        if (isScalar_1.default(lhs) && isScalar_1.default(rhs)) {
            var l = lhs.scalarCoordinate();
            var r = rhs.scalarCoordinate();
            return field.gt(l, r);
        }
        else {
            throw new Error(lhs + " > " + rhs + " is not implemented.");
        }
    }
    exports.default = multivectorGT;
});

define('geocas/mother/multivectorLE',["require", "exports", "./isScalar"], function (require, exports, isScalar_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function multivectorLE(lhs, rhs, field) {
        if (isScalar_1.default(lhs) && isScalar_1.default(rhs)) {
            var l = lhs.scalarCoordinate();
            var r = rhs.scalarCoordinate();
            return field.le(l, r);
        }
        else {
            throw new Error(lhs + " <= " + rhs + " is not implemented.");
        }
    }
    exports.default = multivectorLE;
});

define('geocas/mother/multivectorLT',["require", "exports", "./isScalar"], function (require, exports, isScalar_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function multivectorLT(lhs, rhs, field) {
        if (isScalar_1.default(lhs) && isScalar_1.default(rhs)) {
            var l = lhs.scalarCoordinate();
            var r = rhs.scalarCoordinate();
            return field.lt(l, r);
        }
        else {
            throw new Error(lhs + " < " + rhs + " is not implemented.");
        }
    }
    exports.default = multivectorLT;
});

define('geocas/checks/mustBeDefined',["require", "exports", "../checks/mustSatisfy", "../checks/isDefined"], function (require, exports, mustSatisfy_1, isDefined_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function beDefined() {
        return "not be 'undefined'";
    }
    function mustBeDefined(name, value, contextBuilder) {
        mustSatisfy_1.default(name, isDefined_1.default(value), beDefined, contextBuilder);
        return value;
    }
    exports.default = mustBeDefined;
});

define('geocas/checks/isInteger',["require", "exports", "../checks/isNumber"], function (require, exports, isNumber_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isInteger(x) {
        return isNumber_1.default(x) && x % 1 === 0;
    }
    exports.default = isInteger;
});

define('geocas/checks/mustBeInteger',["require", "exports", "../checks/mustSatisfy", "../checks/isInteger"], function (require, exports, mustSatisfy_1, isInteger_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function beAnInteger() {
        return "be an integer";
    }
    function mustBeInteger(name, value, contextBuilder) {
        mustSatisfy_1.default(name, isInteger_1.default(value), beAnInteger, contextBuilder);
        return value;
    }
    exports.default = mustBeInteger;
});

define('geocas/mother/Algebra',["require", "exports", "./Blade", "./gpE", "./gpL", "./gpG", "./lcoE", "./lcoL", "./lcoG", "./rcoE", "./rcoL", "./rcoG", "../checks/isArray", "../checks/isDefined", "../checks/isNumber", "./isScalar", "../checks/isString", "../checks/isUndefined", "./multivectorEQ", "./multivectorGE", "./multivectorGT", "./multivectorLE", "./multivectorLT", "../checks/mustBeDefined", "../checks/mustBeInteger", "../checks/mustSatisfy", "./simplify"], function (require, exports, Blade_1, gpE_1, gpL_1, gpG_1, lcoE_1, lcoL_1, lcoG_1, rcoE_1, rcoL_1, rcoG_1, isArray_1, isDefined_1, isNumber_1, isScalar_1, isString_1, isUndefined_1, multivectorEQ_1, multivectorGE_1, multivectorGT_1, multivectorLE_1, multivectorLT_1, mustBeDefined_1, mustBeInteger_1, mustSatisfy_1, simplify_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.algebra = void 0;
    function isMultivector(arg) {
        if (arg) {
            return typeof arg['extractGrade'] === 'function';
        }
        else {
            return false;
        }
    }
    function isMetric(arg) {
        return typeof arg.getEigenMetric === 'function';
    }
    function dim(metric) {
        if (isNumber_1.default(metric)) {
            return metric;
        }
        else if (isArray_1.default(metric)) {
            return metric.length;
        }
        else if (isUndefined_1.default(metric)) {
            throw new Error("metric is undefined");
        }
        else if (isMetric(metric)) {
            return metric.getEigenMetric().length;
        }
        else {
            throw new Error("metric is undefined");
        }
    }
    function add(lhs, rhs, algebra, metric, labels) {
        var field = algebra.field;
        if (field.isField(lhs) && isMultivector(rhs)) {
            var rez = [];
            rez.push(Blade_1.default(0, lhs, field));
            for (var k = 0; k < rhs.blades.length; k++) {
                rez.push(rhs.blades[k]);
            }
            return mv(simplify_1.default(rez, field), algebra, metric, labels);
        }
        else if (isMultivector(lhs) && field.isField(rhs)) {
            var rez = [];
            rez.push(Blade_1.default(0, rhs, field));
            for (var k = 0; k < lhs.blades.length; k++) {
                rez.push(lhs.blades[k]);
            }
            return mv(simplify_1.default(rez, field), algebra, metric, labels);
        }
        else {
            if (isMultivector(lhs) && isMultivector(rhs)) {
                var rez = [];
                for (var i = 0; i < lhs.blades.length; i++) {
                    rez.push(lhs.blades[i]);
                }
                for (var k = 0; k < rhs.blades.length; k++) {
                    rez.push(rhs.blades[k]);
                }
                return mv(simplify_1.default(rez, field), algebra, metric, labels);
            }
            else {
                return void 0;
            }
        }
    }
    function sub(lhs, rhs, algebra, metric, labels) {
        var field = algebra.field;
        if (field.isField(lhs) && isMultivector(rhs)) {
            var rez = [];
            rez.push(Blade_1.default(0, lhs, field));
            for (var k = 0; k < rhs.blades.length; k++) {
                rez.push(rhs.blades[k].__neg__());
            }
            return mv(simplify_1.default(rez, field), algebra, metric, labels);
        }
        else if (isMultivector(lhs) && field.isField(rhs)) {
            var rez = [];
            rez.push(Blade_1.default(0, field.neg(rhs), field));
            for (var k = 0; k < lhs.blades.length; k++) {
                rez.push(lhs.blades[k]);
            }
            return mv(simplify_1.default(rez, field), algebra, metric, labels);
        }
        else {
            if (isMultivector(lhs) && isMultivector(rhs)) {
                var rez = [];
                for (var i = 0; i < lhs.blades.length; i++) {
                    rez.push(lhs.blades[i]);
                }
                for (var k = 0; k < rhs.blades.length; k++) {
                    rez.push(rhs.blades[k].__neg__());
                }
                return mv(simplify_1.default(rez, field), algebra, metric, labels);
            }
            else {
                return void 0;
            }
        }
    }
    function mul(lhs, rhs, algebra, metric, labels) {
        var field = algebra.field;
        if (field.isField(lhs) && isMultivector(rhs)) {
            return rhs.mulByScalar(lhs);
        }
        else if (isMultivector(lhs) && field.isField(rhs)) {
            return lhs.mulByScalar(rhs);
        }
        else {
            if (isMultivector(lhs) && isMultivector(rhs)) {
                var rez = [];
                for (var i = 0; i < lhs.blades.length; i++) {
                    var B1 = lhs.blades[i];
                    for (var k = 0; k < rhs.blades.length; k++) {
                        var B2 = rhs.blades[k];
                        if (isNumber_1.default(metric)) {
                            var B = gpE_1.default(B1, B2, field);
                            rez.push(B);
                        }
                        else if (isArray_1.default(metric)) {
                            var B = gpL_1.default(B1, B2, metric, field);
                            rez.push(B);
                        }
                        else {
                            var B = gpG_1.default(B1, B2, metric, field);
                            for (var b = 0; b < B.length; b++) {
                                rez.push(B[b]);
                            }
                        }
                    }
                }
                return mv(simplify_1.default(rez, field), algebra, metric, labels);
            }
            else {
                return void 0;
            }
        }
    }
    function div(lhs, rhs, algebra) {
        var field = algebra.field;
        if (field.isField(lhs) && isMultivector(rhs)) {
            throw new Error("Multivector division is not yet supported. " + lhs + " / " + rhs);
        }
        else if (isMultivector(lhs) && field.isField(rhs)) {
            return lhs.divByScalar(rhs);
        }
        else {
            if (isMultivector(lhs) && isMultivector(rhs)) {
                if (isScalar_1.default(rhs)) {
                    return lhs.divByScalar(rhs.scalarCoordinate());
                }
                else {
                    throw new Error("Multivector division is not yet supported. " + lhs + " / " + rhs);
                }
            }
            else {
                return void 0;
            }
        }
    }
    function getBasisVector(index, algebra, metric, labels) {
        mustBeInteger_1.default('index', index);
        mustBeDefined_1.default('algebra', algebra);
        var field = algebra.field;
        var B = Blade_1.default(1 << index, field.one, field);
        return mv([B], algebra, metric, labels);
    }
    function getScalar(weight, algebra, metric, labels) {
        mustBeDefined_1.default('algebra', algebra);
        var field = algebra.field;
        mustSatisfy_1.default('weight', field.isField(weight), function () { return "be a field value"; });
        var B = Blade_1.default(0, weight, field);
        return mv([B], algebra, metric, labels);
    }
    function mv(blades, algebra, metric, labels) {
        if (!isArray_1.default(blades)) {
            throw new Error("blades must be Blade<T>[]");
        }
        if (isUndefined_1.default(algebra)) {
            throw new Error("algebra must be defined");
        }
        var field = algebra.field;
        var extractGrade = function (grade) {
            var rez = [];
            for (var i = 0; i < blades.length; i++) {
                var B = blades[i];
                if (B.grade() === grade) {
                    rez.push(B);
                }
            }
            return mv(rez, algebra, metric, labels);
        };
        var that = {
            get blades() {
                return blades;
            },
            __abs__: function () {
                return that.scp(that.rev()).sqrt();
            },
            add: function (rhs) {
                return add(that, rhs, algebra, metric, labels);
            },
            __add__: function (rhs) {
                return add(that, rhs, algebra, metric, labels);
            },
            __radd__: function (lhs) {
                return add(lhs, that, algebra, metric, labels);
            },
            sub: function (rhs) {
                return sub(that, rhs, algebra, metric, labels);
            },
            __sub__: function (rhs) {
                return sub(that, rhs, algebra, metric, labels);
            },
            __rsub__: function (lhs) {
                return sub(lhs, that, algebra, metric, labels);
            },
            __eq__: function (rhs) {
                return multivectorEQ_1.default(that, rhs, field);
            },
            __ge__: function (rhs) {
                return multivectorGE_1.default(that, rhs, field);
            },
            __gt__: function (rhs) {
                return multivectorGT_1.default(that, rhs, field);
            },
            __le__: function (rhs) {
                return multivectorLE_1.default(that, rhs, field);
            },
            __lt__: function (rhs) {
                return multivectorLT_1.default(that, rhs, field);
            },
            __ne__: function (rhs) {
                return !multivectorEQ_1.default(that, rhs, field);
            },
            inv: function () {
                var reverse = that.rev();
                var denom = that.mul(reverse);
                if (denom.blades.length === 1 && denom.blades[0].bitmap === 0) {
                    return reverse.divByScalar(denom.scalarCoordinate());
                }
                else {
                    throw new Error("non-invertible multivector (versor inverse) " + that);
                }
            },
            isZero: function () {
                return blades.length === 0;
            },
            mul: function (rhs) {
                return mul(that, rhs, algebra, metric, labels);
            },
            mulByScalar: function (α) {
                var rez = [];
                for (var i = 0; i < blades.length; i++) {
                    var B = blades[i];
                    var scale = field.mul(B.weight, α);
                    if (!field.isZero(scale)) {
                        rez.push(Blade_1.default(B.bitmap, scale, field));
                    }
                }
                return mv(rez, algebra, metric, labels);
            },
            __mul__: function (rhs) {
                return mul(that, rhs, algebra, metric, labels);
            },
            __rmul__: function (lhs) {
                return mul(lhs, that, algebra, metric, labels);
            },
            __div__: function (rhs) {
                return div(that, rhs, algebra);
            },
            __lshift__: function (rhs) {
                var rez = [];
                for (var i = 0; i < blades.length; i++) {
                    var B1 = blades[i];
                    for (var k = 0; k < rhs.blades.length; k++) {
                        var B2 = rhs.blades[k];
                        if (isNumber_1.default(metric)) {
                            var B = lcoE_1.default(B1, B2, field);
                            rez.push(B);
                        }
                        else if (isArray_1.default(metric)) {
                            var B = lcoL_1.default(B1, B2, metric, field);
                            rez.push(B);
                        }
                        else {
                            var B = lcoG_1.default(B1, B2, metric, field);
                            for (var b = 0; b < B.length; b++) {
                                rez.push(B[b]);
                            }
                        }
                    }
                }
                return mv(simplify_1.default(rez, field), algebra, metric, labels);
            },
            __rshift__: function (rhs) {
                var rez = [];
                for (var i = 0; i < blades.length; i++) {
                    var B1 = blades[i];
                    for (var k = 0; k < rhs.blades.length; k++) {
                        var B2 = rhs.blades[k];
                        if (isNumber_1.default(metric)) {
                            var B = rcoE_1.default(B1, B2, field);
                            rez.push(B);
                        }
                        else if (isArray_1.default(metric)) {
                            var B = rcoL_1.default(B1, B2, metric, field);
                            rez.push(B);
                        }
                        else {
                            var B = rcoG_1.default(B1, B2, metric, field);
                            for (var b = 0; b < B.length; b++) {
                                rez.push(B[b]);
                            }
                        }
                    }
                }
                return mv(simplify_1.default(rez, field), algebra, metric, labels);
            },
            __vbar__: function (rhs) {
                return that.__mul__(rhs).extractGrade(0);
            },
            __wedge__: function (rhs) {
                var rez = [];
                for (var i = 0; i < blades.length; i++) {
                    var B1 = blades[i];
                    for (var k = 0; k < rhs.blades.length; k++) {
                        var B2 = rhs.blades[k];
                        var B = B1.__wedge__(B2);
                        rez.push(B);
                    }
                }
                return mv(simplify_1.default(rez, field), algebra, metric, labels);
            },
            __bang__: function () {
                return that.inv();
            },
            __pos__: function () {
                return that;
            },
            neg: function () {
                var rez = [];
                for (var i = 0; i < blades.length; i++) {
                    var B = blades[i];
                    rez.push(B.__neg__());
                }
                return mv(rez, algebra, metric, labels);
            },
            __neg__: function () {
                var rez = [];
                for (var i = 0; i < blades.length; i++) {
                    var B = blades[i];
                    rez.push(B.__neg__());
                }
                return mv(rez, algebra, metric, labels);
            },
            __tilde__: function () {
                return that.rev();
            },
            cliffordConjugate: function () {
                var rez = [];
                for (var i = 0; i < blades.length; i++) {
                    var B = blades[i];
                    rez.push(B.cliffordConjugate());
                }
                return mv(rez, algebra, metric, labels);
            },
            compress: function (fraction) {
                if (fraction === void 0) { fraction = 1e-12; }
                var eps = field.mulByNumber(field.one, fraction);
                var max = field.zero;
                for (var i = 0; i < blades.length; i++) {
                    var B = blades[i];
                    max = field.max(max, field.abs(B.weight));
                }
                var cutOff = field.mul(max, eps);
                var rez = [];
                for (var i = 0; i < blades.length; i++) {
                    var B = blades[i];
                    if (field.ge(field.abs(B.weight), cutOff)) {
                        rez.push(B);
                    }
                }
                return mv(rez, algebra, metric, labels);
            },
            direction: function () {
                var squaredNorm = that.scp(that.rev()).scalarCoordinate();
                var norm = field.sqrt(squaredNorm);
                if (!field.isZero(norm)) {
                    return that.divByScalar(norm);
                }
                else {
                    return that;
                }
            },
            exp: function () {
                var B = extractGrade(2);
                var Brev = B.rev();
                var θ = field.sqrt(B.__vbar__(Brev).scalarCoordinate());
                var i = B.divByScalar(θ);
                var cosθ = mv([Blade_1.default(0, field.cos(θ), field)], algebra, metric, labels);
                var sinθ = mv([Blade_1.default(0, field.sin(θ), field)], algebra, metric, labels);
                return cosθ.__add__(i.__mul__(sinθ));
            },
            extractGrade: extractGrade,
            div: function (rhs) {
                return that.mul(rhs.inv());
            },
            divByScalar: function (α) {
                var rez = [];
                for (var i = 0; i < blades.length; i++) {
                    var B = blades[i];
                    var scale = field.div(B.weight, α);
                    if (!field.isZero(scale)) {
                        rez.push(Blade_1.default(B.bitmap, scale, field));
                    }
                }
                return mv(rez, algebra, metric, labels);
            },
            dual: function () {
                var n = dim(metric);
                var I = mv([Blade_1.default((1 << n) - 1, field.one, field)], algebra, metric, labels);
                return that.__lshift__(I);
            },
            gradeInversion: function () {
                var rez = [];
                for (var i = 0; i < blades.length; i++) {
                    var B = blades[i];
                    rez.push(B.gradeInversion());
                }
                return mv(rez, algebra, metric, labels);
            },
            rev: function () {
                var rez = [];
                for (var i = 0; i < blades.length; i++) {
                    var B = blades[i];
                    rez.push(B.reverse());
                }
                return mv(rez, algebra, metric, labels);
            },
            scalarCoordinate: function () {
                for (var i = 0; i < blades.length; i++) {
                    var B = blades[i];
                    if (B.bitmap === 0) {
                        return B.weight;
                    }
                }
                return field.zero;
            },
            scp: function (rhs) {
                return that.__vbar__(rhs);
            },
            sqrt: function () {
                var rez = [];
                for (var i = 0; i < blades.length; i++) {
                    var B = blades[i];
                    if (B.bitmap === 0) {
                        rez.push(Blade_1.default(B.bitmap, field.sqrt(B.weight), field));
                    }
                    else {
                        throw new Error("sqrt on arbitrary multivectors is not yet supported.");
                    }
                }
                return mv(rez, algebra, metric, labels);
            },
            asString: function (names) {
                checkBasisLabels('names', names, dim(metric));
                if (blades.length === 0) {
                    return "0";
                }
                else {
                    var result = "";
                    for (var i = 0; i < blades.length; i++) {
                        var B = blades[i];
                        var s = B.asString(names);
                        if (i === 0) {
                            result += s;
                        }
                        else {
                            if (s.charAt(0) === '-') {
                                result += ' - ';
                                result += s.substring(1);
                            }
                            else {
                                result += ' + ';
                                result += s;
                            }
                        }
                    }
                    return result;
                }
            },
            toString: function () {
                return that.asString(labels);
            }
        };
        return that;
    }
    function checkBasisLabels(name, labels, n) {
        if (isDefined_1.default(labels)) {
            if (isArray_1.default(labels)) {
                if (labels.length !== n) {
                    throw new Error(name + ".length must match the dimensionality of the vector space.");
                }
                for (var i = 0; i < labels.length; i++) {
                    var label = labels[i];
                    if (!isString_1.default(label)) {
                        throw new Error(name + "[" + i + "] must be a string.");
                    }
                }
            }
            else {
                throw new Error(name + " must be a string[]");
            }
        }
    }
    function algebra(metric, field, labels) {
        mustBeDefined_1.default('metric', metric);
        var n = dim(metric);
        mustBeDefined_1.default('field', field);
        checkBasisLabels('labels', labels, n);
        var scalars = [];
        var basisVectors = [];
        var that = {
            get ε() {
                return scalars[2];
            },
            get field() {
                return field;
            },
            get one() {
                return scalars[1];
            },
            get zero() {
                return scalars[0];
            },
            unit: function (index) {
                mustBeInteger_1.default('index', index);
                if (index >= 0 && index < n) {
                    return basisVectors[index];
                }
                else {
                    throw new Error("index must be in range [0 ... " + (n - 1) + ")");
                }
            },
            get units() {
                return basisVectors.map(function (x) { return x; });
            }
        };
        scalars[0] = getScalar(field.zero, that, metric, labels);
        scalars[1] = getScalar(field.one, that, metric, labels);
        scalars[2] = getScalar(field.ε, that, metric, labels);
        for (var i = 0; i < n; i++) {
            basisVectors[i] = getBasisVector(i, that, metric, labels);
        }
        return that;
    }
    exports.algebra = algebra;
});

define('geocas/config',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GeoCAS = (function () {
        function GeoCAS() {
            this.GITHUB = 'https://github.com/geometryzen/GeoCAS';
            this.CREATED_AT = '2016-09-24';
            this.MODIFIED_AT = '2019-03-30';
            this.NAMESPACE = 'GeoCAS';
            this.VERSION = '1.13.1';
        }
        GeoCAS.prototype.log = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            console.log(message);
        };
        GeoCAS.prototype.info = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            console.info(message);
        };
        GeoCAS.prototype.warn = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            console.warn(message);
        };
        GeoCAS.prototype.error = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            console.error(message);
        };
        return GeoCAS;
    }());
    var config = new GeoCAS();
    exports.default = config;
});

define('geocas',["require", "exports", "./geocas/mother/Blade", "./geocas/mother/Complex", "./geocas/mother/ComplexFieldAdapter", "./geocas/mother/cosineOfAngleBetweenBlades", "./geocas/mother/norm", "./geocas/mother/NumberFieldAdapter", "./geocas/mother/orthoFramesToVersor", "./geocas/mother/Algebra", "./geocas/config", "./geocas/mother/squaredNorm"], function (require, exports, Blade_1, Complex_1, ComplexFieldAdapter_1, cosineOfAngleBetweenBlades_1, norm_1, NumberFieldAdapter_1, orthoFramesToVersor_1, Algebra_1, config_1, squaredNorm_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GeoCAS = {
        get LAST_MODIFIED() { return config_1.default.MODIFIED_AT; },
        get VERSION() { return config_1.default.VERSION; },
        get blade() { return Blade_1.default; },
        get complex() { return Complex_1.default; },
        get ComplexFieldAdapter() { return ComplexFieldAdapter_1.default; },
        get cosineOfAngleBetweenBlades() { return cosineOfAngleBetweenBlades_1.default; },
        get norm() { return norm_1.default; },
        get NumberFieldAdapter() { return NumberFieldAdapter_1.default; },
        get orthoFramesToVersor() { return orthoFramesToVersor_1.default; },
        get algebra() { return Algebra_1.algebra; },
        get squaredNorm() { return squaredNorm_1.default; }
    };
    exports.default = GeoCAS;
});

  var library = require('geocas').default;
  if(typeof module !== 'undefined' && module.exports) {
    module.exports = library;
  } else if(globalDefine) {
    (function (define) {
      define(function () { return library; });
    }(globalDefine));
  } else {
    global['GeoCAS'] = library;
  }
}(this));
