module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "01a8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
// This comes from the fact that parseInt trims characters coming
// after digits and consider it a valid int, so `1*` becomes `1`.
var safeParseInt = function (value) {
    if (/^\d+$/.test(value)) {
        return Number(value);
    }
    else {
        return NaN;
    }
};
var isWildcard = function (value) {
    return value === '*';
};
var isQuestionMark = function (value) {
    return value === '?';
};
var isInRange = function (value, start, stop) {
    return value >= start && value <= stop;
};
var isValidRange = function (value, start, stop) {
    var sides = value.split('-');
    switch (sides.length) {
        case 1:
            return isWildcard(value) || isInRange(safeParseInt(value), start, stop);
        case 2:
            var _a = sides.map(function (side) { return safeParseInt(side); }), small = _a[0], big = _a[1];
            return small <= big && isInRange(small, start, stop) && isInRange(big, start, stop);
        default:
            return false;
    }
};
var isValidStep = function (value) {
    return value === undefined || value.search(/[^\d]/) === -1;
};
var validateForRange = function (value, start, stop) {
    if (value.search(/[^\d-,\/*]/) !== -1) {
        return false;
    }
    var list = value.split(',');
    return list.every(function (condition) {
        var splits = condition.split('/');
        // Prevents `*/ * * * *` from being accepted.
        if (condition.trim().endsWith('/')) {
            return false;
        }
        // Prevents `*/*/* * * * *` from being accepted
        if (splits.length > 2) {
            return false;
        }
        // If we don't have a `/`, right will be undefined which is considered a valid step if we don't a `/`.
        var left = splits[0], right = splits[1];
        return isValidRange(left, start, stop) && isValidStep(right);
    });
};
var hasValidSeconds = function (seconds) {
    return validateForRange(seconds, 0, 59);
};
var hasValidMinutes = function (minutes) {
    return validateForRange(minutes, 0, 59);
};
var hasValidHours = function (hours) {
    return validateForRange(hours, 0, 23);
};
var hasValidDays = function (days, allowBlankDay) {
    return (allowBlankDay && isQuestionMark(days)) || validateForRange(days, 1, 31);
};
var monthAlias = {
    jan: '1',
    feb: '2',
    mar: '3',
    apr: '4',
    may: '5',
    jun: '6',
    jul: '7',
    aug: '8',
    sep: '9',
    oct: '10',
    nov: '11',
    dec: '12'
};
var hasValidMonths = function (months, alias) {
    // Prevents alias to be used as steps
    if (months.search(/\/[a-zA-Z]/) !== -1) {
        return false;
    }
    if (alias) {
        var remappedMonths = months.toLowerCase().replace(/[a-z]{3}/g, function (match) {
            return monthAlias[match] === undefined ? match : monthAlias[match];
        });
        // If any invalid alias was used, it won't pass the other checks as there will be non-numeric values in the months
        return validateForRange(remappedMonths, 1, 12);
    }
    return validateForRange(months, 1, 12);
};
var weekdaysAlias = {
    sun: '0',
    mon: '1',
    tue: '2',
    wed: '3',
    thu: '4',
    fri: '5',
    sat: '6'
};
var hasValidWeekdays = function (weekdays, alias, allowBlankDay) {
    // If there is a question mark, checks if the allowBlankDay flag is set
    if (allowBlankDay && isQuestionMark(weekdays)) {
        return true;
    }
    else if (!allowBlankDay && isQuestionMark(weekdays)) {
        return false;
    }
    // Prevents alias to be used as steps
    if (weekdays.search(/\/[a-zA-Z]/) !== -1) {
        return false;
    }
    if (alias) {
        var remappedWeekdays = weekdays.toLowerCase().replace(/[a-z]{3}/g, function (match) {
            return weekdaysAlias[match] === undefined ? match : weekdaysAlias[match];
        });
        // If any invalid alias was used, it won't pass the other checks as there will be non-numeric values in the weekdays
        return validateForRange(remappedWeekdays, 0, 6);
    }
    return validateForRange(weekdays, 0, 6);
};
var hasCompatibleDayFormat = function (days, weekdays, allowBlankDay) {
    return !(allowBlankDay && isQuestionMark(days) && isQuestionMark(weekdays));
};
var split = function (cron) {
    return cron.trim().split(/\s+/);
};
var defaultOptions = {
    alias: false,
    seconds: false,
    allowBlankDay: false
};
exports.isValidCron = function (cron, options) {
    options = __assign(__assign({}, defaultOptions), options);
    var splits = split(cron);
    if (splits.length > (options.seconds ? 6 : 5) || splits.length < 5) {
        return false;
    }
    var checks = [];
    if (splits.length === 6) {
        var seconds = splits.shift();
        if (seconds) {
            checks.push(hasValidSeconds(seconds));
        }
    }
    // We could only check the steps gradually and return false on the first invalid block,
    // However, this won't have any performance impact so why bother for now.
    var minutes = splits[0], hours = splits[1], days = splits[2], months = splits[3], weekdays = splits[4];
    checks.push(hasValidMinutes(minutes));
    checks.push(hasValidHours(hours));
    checks.push(hasValidDays(days, options.allowBlankDay));
    checks.push(hasValidMonths(months, options.alias));
    checks.push(hasValidWeekdays(weekdays, options.alias, options.allowBlankDay));
    checks.push(hasCompatibleDayFormat(days, weekdays, options.allowBlankDay));
    return checks.every(Boolean);
};
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "0366":
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__("1c0b");

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "057f":
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__("fc6a");
var nativeGetOwnPropertyNames = __webpack_require__("241c").f;

var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return nativeGetOwnPropertyNames(it);
  } catch (error) {
    return windowNames.slice();
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]'
    ? getWindowNames(it)
    : nativeGetOwnPropertyNames(toIndexedObject(it));
};


/***/ }),

/***/ "06cf":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var propertyIsEnumerableModule = __webpack_require__("d1e7");
var createPropertyDescriptor = __webpack_require__("5c6c");
var toIndexedObject = __webpack_require__("fc6a");
var toPrimitive = __webpack_require__("c04e");
var has = __webpack_require__("5135");
var IE8_DOM_DEFINE = __webpack_require__("0cfb");

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),

/***/ "0cfb":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var fails = __webpack_require__("d039");
var createElement = __webpack_require__("cc12");

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "122c":
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var stringUtilities_1 = __webpack_require__(1);
var cronParser_1 = __webpack_require__(2);
var ExpressionDescriptor = (function () {
    function ExpressionDescriptor(expression, options) {
        this.expression = expression;
        this.options = options;
        this.expressionParts = new Array(5);
        if (ExpressionDescriptor.locales[options.locale]) {
            this.i18n = ExpressionDescriptor.locales[options.locale];
        }
        else {
            console.warn("Locale '" + options.locale + "' could not be found; falling back to 'en'.");
            this.i18n = ExpressionDescriptor.locales["en"];
        }
        if (options.use24HourTimeFormat === undefined) {
            options.use24HourTimeFormat = this.i18n.use24HourTimeFormatByDefault();
        }
    }
    ExpressionDescriptor.toString = function (expression, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.throwExceptionOnParseError, throwExceptionOnParseError = _c === void 0 ? true : _c, _d = _b.verbose, verbose = _d === void 0 ? false : _d, _e = _b.dayOfWeekStartIndexZero, dayOfWeekStartIndexZero = _e === void 0 ? true : _e, use24HourTimeFormat = _b.use24HourTimeFormat, _f = _b.locale, locale = _f === void 0 ? "en" : _f;
        var options = {
            throwExceptionOnParseError: throwExceptionOnParseError,
            verbose: verbose,
            dayOfWeekStartIndexZero: dayOfWeekStartIndexZero,
            use24HourTimeFormat: use24HourTimeFormat,
            locale: locale
        };
        var descripter = new ExpressionDescriptor(expression, options);
        return descripter.getFullDescription();
    };
    ExpressionDescriptor.initialize = function (localesLoader) {
        ExpressionDescriptor.specialCharacters = ["/", "-", ",", "*"];
        localesLoader.load(ExpressionDescriptor.locales);
    };
    ExpressionDescriptor.prototype.getFullDescription = function () {
        var description = "";
        try {
            var parser = new cronParser_1.CronParser(this.expression, this.options.dayOfWeekStartIndexZero);
            this.expressionParts = parser.parse();
            var timeSegment = this.getTimeOfDayDescription();
            var dayOfMonthDesc = this.getDayOfMonthDescription();
            var monthDesc = this.getMonthDescription();
            var dayOfWeekDesc = this.getDayOfWeekDescription();
            var yearDesc = this.getYearDescription();
            description += timeSegment + dayOfMonthDesc + dayOfWeekDesc + monthDesc + yearDesc;
            description = this.transformVerbosity(description, this.options.verbose);
            description = description.charAt(0).toLocaleUpperCase() + description.substr(1);
        }
        catch (ex) {
            if (!this.options.throwExceptionOnParseError) {
                description = this.i18n.anErrorOccuredWhenGeneratingTheExpressionD();
            }
            else {
                throw "" + ex;
            }
        }
        return description;
    };
    ExpressionDescriptor.prototype.getTimeOfDayDescription = function () {
        var secondsExpression = this.expressionParts[0];
        var minuteExpression = this.expressionParts[1];
        var hourExpression = this.expressionParts[2];
        var description = "";
        if (!stringUtilities_1.StringUtilities.containsAny(minuteExpression, ExpressionDescriptor.specialCharacters) &&
            !stringUtilities_1.StringUtilities.containsAny(hourExpression, ExpressionDescriptor.specialCharacters) &&
            !stringUtilities_1.StringUtilities.containsAny(secondsExpression, ExpressionDescriptor.specialCharacters)) {
            description += this.i18n.atSpace() + this.formatTime(hourExpression, minuteExpression, secondsExpression);
        }
        else if (!secondsExpression &&
            minuteExpression.indexOf("-") > -1 &&
            !(minuteExpression.indexOf(",") > -1) &&
            !(minuteExpression.indexOf("/") > -1) &&
            !stringUtilities_1.StringUtilities.containsAny(hourExpression, ExpressionDescriptor.specialCharacters)) {
            var minuteParts = minuteExpression.split("-");
            description += stringUtilities_1.StringUtilities.format(this.i18n.everyMinuteBetweenX0AndX1(), this.formatTime(hourExpression, minuteParts[0], ""), this.formatTime(hourExpression, minuteParts[1], ""));
        }
        else if (!secondsExpression &&
            hourExpression.indexOf(",") > -1 &&
            hourExpression.indexOf("-") == -1 &&
            hourExpression.indexOf("/") == -1 &&
            !stringUtilities_1.StringUtilities.containsAny(minuteExpression, ExpressionDescriptor.specialCharacters)) {
            var hourParts = hourExpression.split(",");
            description += this.i18n.at();
            for (var i = 0; i < hourParts.length; i++) {
                description += " ";
                description += this.formatTime(hourParts[i], minuteExpression, "");
                if (i < hourParts.length - 2) {
                    description += ",";
                }
                if (i == hourParts.length - 2) {
                    description += this.i18n.spaceAnd();
                }
            }
        }
        else {
            var secondsDescription = this.getSecondsDescription();
            var minutesDescription = this.getMinutesDescription();
            var hoursDescription = this.getHoursDescription();
            description += secondsDescription;
            if (description.length > 0 && minutesDescription.length > 0) {
                description += ", ";
            }
            description += minutesDescription;
            if (description.length > 0 && hoursDescription.length > 0) {
                description += ", ";
            }
            description += hoursDescription;
        }
        return description;
    };
    ExpressionDescriptor.prototype.getSecondsDescription = function () {
        var _this = this;
        var description = this.getSegmentDescription(this.expressionParts[0], this.i18n.everySecond(), function (s) {
            return s;
        }, function (s) {
            return stringUtilities_1.StringUtilities.format(_this.i18n.everyX0Seconds(), s);
        }, function (s) {
            return _this.i18n.secondsX0ThroughX1PastTheMinute();
        }, function (s) {
            return s == "0"
                ? ""
                : parseInt(s) < 20
                    ? _this.i18n.atX0SecondsPastTheMinute()
                    : _this.i18n.atX0SecondsPastTheMinuteGt20() || _this.i18n.atX0SecondsPastTheMinute();
        });
        return description;
    };
    ExpressionDescriptor.prototype.getMinutesDescription = function () {
        var _this = this;
        var secondsExpression = this.expressionParts[0];
        var hourExpression = this.expressionParts[2];
        var description = this.getSegmentDescription(this.expressionParts[1], this.i18n.everyMinute(), function (s) {
            return s;
        }, function (s) {
            return stringUtilities_1.StringUtilities.format(_this.i18n.everyX0Minutes(), s);
        }, function (s) {
            return _this.i18n.minutesX0ThroughX1PastTheHour();
        }, function (s) {
            try {
                return s == "0" && hourExpression.indexOf("/") == -1 && secondsExpression == ""
                    ? _this.i18n.everyHour()
                    : parseInt(s) < 20
                        ? _this.i18n.atX0MinutesPastTheHour()
                        : _this.i18n.atX0MinutesPastTheHourGt20() || _this.i18n.atX0MinutesPastTheHour();
            }
            catch (e) {
                return _this.i18n.atX0MinutesPastTheHour();
            }
        });
        return description;
    };
    ExpressionDescriptor.prototype.getHoursDescription = function () {
        var _this = this;
        var expression = this.expressionParts[2];
        var description = this.getSegmentDescription(expression, this.i18n.everyHour(), function (s) {
            return _this.formatTime(s, "0", "");
        }, function (s) {
            return stringUtilities_1.StringUtilities.format(_this.i18n.everyX0Hours(), s);
        }, function (s) {
            return _this.i18n.betweenX0AndX1();
        }, function (s) {
            return _this.i18n.atX0();
        });
        return description;
    };
    ExpressionDescriptor.prototype.getDayOfWeekDescription = function () {
        var _this = this;
        var daysOfWeekNames = this.i18n.daysOfTheWeek();
        var description = null;
        if (this.expressionParts[5] == "*") {
            description = "";
        }
        else {
            description = this.getSegmentDescription(this.expressionParts[5], this.i18n.commaEveryDay(), function (s) {
                var exp = s;
                if (s.indexOf("#") > -1) {
                    exp = s.substr(0, s.indexOf("#"));
                }
                else if (s.indexOf("L") > -1) {
                    exp = exp.replace("L", "");
                }
                return daysOfWeekNames[parseInt(exp)];
            }, function (s) {
                if (parseInt(s) == 1) {
                    return "";
                }
                else {
                    return stringUtilities_1.StringUtilities.format(_this.i18n.commaEveryX0DaysOfTheWeek(), s);
                }
            }, function (s) {
                return _this.i18n.commaX0ThroughX1();
            }, function (s) {
                var format = null;
                if (s.indexOf("#") > -1) {
                    var dayOfWeekOfMonthNumber = s.substring(s.indexOf("#") + 1);
                    var dayOfWeekOfMonthDescription = null;
                    switch (dayOfWeekOfMonthNumber) {
                        case "1":
                            dayOfWeekOfMonthDescription = _this.i18n.first();
                            break;
                        case "2":
                            dayOfWeekOfMonthDescription = _this.i18n.second();
                            break;
                        case "3":
                            dayOfWeekOfMonthDescription = _this.i18n.third();
                            break;
                        case "4":
                            dayOfWeekOfMonthDescription = _this.i18n.fourth();
                            break;
                        case "5":
                            dayOfWeekOfMonthDescription = _this.i18n.fifth();
                            break;
                    }
                    format = _this.i18n.commaOnThe() + dayOfWeekOfMonthDescription + _this.i18n.spaceX0OfTheMonth();
                }
                else if (s.indexOf("L") > -1) {
                    format = _this.i18n.commaOnTheLastX0OfTheMonth();
                }
                else {
                    var domSpecified = _this.expressionParts[3] != "*";
                    format = domSpecified ? _this.i18n.commaAndOnX0() : _this.i18n.commaOnlyOnX0();
                }
                return format;
            });
        }
        return description;
    };
    ExpressionDescriptor.prototype.getMonthDescription = function () {
        var _this = this;
        var monthNames = this.i18n.monthsOfTheYear();
        var description = this.getSegmentDescription(this.expressionParts[4], "", function (s) {
            return monthNames[parseInt(s) - 1];
        }, function (s) {
            if (parseInt(s) == 1) {
                return "";
            }
            else {
                return stringUtilities_1.StringUtilities.format(_this.i18n.commaEveryX0Months(), s);
            }
        }, function (s) {
            return _this.i18n.commaMonthX0ThroughMonthX1() || _this.i18n.commaX0ThroughX1();
        }, function (s) {
            return _this.i18n.commaOnlyInMonthX0 ? _this.i18n.commaOnlyInMonthX0() : _this.i18n.commaOnlyInX0();
        });
        return description;
    };
    ExpressionDescriptor.prototype.getDayOfMonthDescription = function () {
        var _this = this;
        var description = null;
        var expression = this.expressionParts[3];
        switch (expression) {
            case "L":
                description = this.i18n.commaOnTheLastDayOfTheMonth();
                break;
            case "WL":
            case "LW":
                description = this.i18n.commaOnTheLastWeekdayOfTheMonth();
                break;
            default:
                var weekDayNumberMatches = expression.match(/(\d{1,2}W)|(W\d{1,2})/);
                if (weekDayNumberMatches) {
                    var dayNumber = parseInt(weekDayNumberMatches[0].replace("W", ""));
                    var dayString = dayNumber == 1
                        ? this.i18n.firstWeekday()
                        : stringUtilities_1.StringUtilities.format(this.i18n.weekdayNearestDayX0(), dayNumber.toString());
                    description = stringUtilities_1.StringUtilities.format(this.i18n.commaOnTheX0OfTheMonth(), dayString);
                    break;
                }
                else {
                    var lastDayOffSetMatches = expression.match(/L-(\d{1,2})/);
                    if (lastDayOffSetMatches) {
                        var offSetDays = lastDayOffSetMatches[1];
                        description = stringUtilities_1.StringUtilities.format(this.i18n.commaDaysBeforeTheLastDayOfTheMonth(), offSetDays);
                        break;
                    }
                    else if (expression == "*" && this.expressionParts[5] != "*") {
                        return "";
                    }
                    else {
                        description = this.getSegmentDescription(expression, this.i18n.commaEveryDay(), function (s) {
                            return s == "L" ? _this.i18n.lastDay() : ((_this.i18n.dayX0) ? stringUtilities_1.StringUtilities.format(_this.i18n.dayX0(), s) : s);
                        }, function (s) {
                            return s == "1" ? _this.i18n.commaEveryDay() : _this.i18n.commaEveryX0Days();
                        }, function (s) {
                            return _this.i18n.commaBetweenDayX0AndX1OfTheMonth();
                        }, function (s) {
                            return _this.i18n.commaOnDayX0OfTheMonth();
                        });
                    }
                    break;
                }
        }
        return description;
    };
    ExpressionDescriptor.prototype.getYearDescription = function () {
        var _this = this;
        var description = this.getSegmentDescription(this.expressionParts[6], "", function (s) {
            return /^\d+$/.test(s) ? new Date(parseInt(s), 1).getFullYear().toString() : s;
        }, function (s) {
            return stringUtilities_1.StringUtilities.format(_this.i18n.commaEveryX0Years(), s);
        }, function (s) {
            return _this.i18n.commaYearX0ThroughYearX1() || _this.i18n.commaX0ThroughX1();
        }, function (s) {
            return _this.i18n.commaOnlyInYearX0 ? _this.i18n.commaOnlyInYearX0() : _this.i18n.commaOnlyInX0();
        });
        return description;
    };
    ExpressionDescriptor.prototype.getSegmentDescription = function (expression, allDescription, getSingleItemDescription, getIntervalDescriptionFormat, getBetweenDescriptionFormat, getDescriptionFormat) {
        var _this = this;
        var description = null;
        if (!expression) {
            description = "";
        }
        else if (expression === "*") {
            description = allDescription;
        }
        else if (!stringUtilities_1.StringUtilities.containsAny(expression, ["/", "-", ","])) {
            description = stringUtilities_1.StringUtilities.format(getDescriptionFormat(expression), getSingleItemDescription(expression));
        }
        else if (expression.indexOf("/") > -1) {
            var segments = expression.split("/");
            description = stringUtilities_1.StringUtilities.format(getIntervalDescriptionFormat(segments[1]), segments[1]);
            if (segments[0].indexOf("-") > -1) {
                var betweenSegmentDescription = this.generateBetweenSegmentDescription(segments[0], getBetweenDescriptionFormat, getSingleItemDescription);
                if (betweenSegmentDescription.indexOf(", ") != 0) {
                    description += ", ";
                }
                description += betweenSegmentDescription;
            }
            else if (!stringUtilities_1.StringUtilities.containsAny(segments[0], ["*", ","])) {
                var rangeItemDescription = stringUtilities_1.StringUtilities.format(getDescriptionFormat(segments[0]), getSingleItemDescription(segments[0]));
                rangeItemDescription = rangeItemDescription.replace(", ", "");
                description += stringUtilities_1.StringUtilities.format(this.i18n.commaStartingX0(), rangeItemDescription);
            }
        }
        else if (expression.indexOf(",") > -1) {
            var segments = expression.split(",");
            var descriptionContent = "";
            for (var i = 0; i < segments.length; i++) {
                if (i > 0 && segments.length > 2) {
                    descriptionContent += ",";
                    if (i < segments.length - 1) {
                        descriptionContent += " ";
                    }
                }
                if (i > 0 && segments.length > 1 && (i == segments.length - 1 || segments.length == 2)) {
                    descriptionContent += this.i18n.spaceAnd() + " ";
                }
                if (segments[i].indexOf("-") > -1) {
                    var betweenSegmentDescription = this.generateBetweenSegmentDescription(segments[i], function (s) {
                        return _this.i18n.commaX0ThroughX1();
                    }, getSingleItemDescription);
                    betweenSegmentDescription = betweenSegmentDescription.replace(", ", "");
                    descriptionContent += betweenSegmentDescription;
                }
                else {
                    descriptionContent += getSingleItemDescription(segments[i]);
                }
            }
            description = stringUtilities_1.StringUtilities.format(getDescriptionFormat(expression), descriptionContent);
        }
        else if (expression.indexOf("-") > -1) {
            description = this.generateBetweenSegmentDescription(expression, getBetweenDescriptionFormat, getSingleItemDescription);
        }
        return description;
    };
    ExpressionDescriptor.prototype.generateBetweenSegmentDescription = function (betweenExpression, getBetweenDescriptionFormat, getSingleItemDescription) {
        var description = "";
        var betweenSegments = betweenExpression.split("-");
        var betweenSegment1Description = getSingleItemDescription(betweenSegments[0]);
        var betweenSegment2Description = getSingleItemDescription(betweenSegments[1]);
        betweenSegment2Description = betweenSegment2Description.replace(":00", ":59");
        var betweenDescriptionFormat = getBetweenDescriptionFormat(betweenExpression);
        description += stringUtilities_1.StringUtilities.format(betweenDescriptionFormat, betweenSegment1Description, betweenSegment2Description);
        return description;
    };
    ExpressionDescriptor.prototype.formatTime = function (hourExpression, minuteExpression, secondExpression) {
        var hour = parseInt(hourExpression);
        var period = "";
        var setPeriodBeforeTime = false;
        if (!this.options.use24HourTimeFormat) {
            setPeriodBeforeTime = this.i18n.setPeriodBeforeTime && this.i18n.setPeriodBeforeTime();
            period = setPeriodBeforeTime ? this.getPeriod(hour) + " " : " " + this.getPeriod(hour);
            if (hour > 12) {
                hour -= 12;
            }
            if (hour === 0) {
                hour = 12;
            }
        }
        var minute = minuteExpression;
        var second = "";
        if (secondExpression) {
            second = ":" + ("00" + secondExpression).substring(secondExpression.length);
        }
        return "" + (setPeriodBeforeTime ? period : "") + ("00" + hour.toString()).substring(hour.toString().length) + ":" + ("00" + minute.toString()).substring(minute.toString().length) + second + (!setPeriodBeforeTime ? period : "");
    };
    ExpressionDescriptor.prototype.transformVerbosity = function (description, useVerboseFormat) {
        if (!useVerboseFormat) {
            description = description.replace(new RegExp(", " + this.i18n.everyMinute(), "g"), "");
            description = description.replace(new RegExp(", " + this.i18n.everyHour(), "g"), "");
            description = description.replace(new RegExp(this.i18n.commaEveryDay(), "g"), "");
            description = description.replace(/\, ?$/, "");
        }
        return description;
    };
    ExpressionDescriptor.prototype.getPeriod = function (hour) {
        return hour >= 12 ? this.i18n.pm && this.i18n.pm() || "PM" : this.i18n.am && this.i18n.am() || "AM";
    };
    ExpressionDescriptor.locales = {};
    return ExpressionDescriptor;
}());
exports.ExpressionDescriptor = ExpressionDescriptor;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var StringUtilities = (function () {
    function StringUtilities() {
    }
    StringUtilities.format = function (template) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            values[_i - 1] = arguments[_i];
        }
        return template.replace(/%s/g, function () {
            return values.shift();
        });
    };
    StringUtilities.containsAny = function (text, searchStrings) {
        return searchStrings.some(function (c) {
            return text.indexOf(c) > -1;
        });
    };
    return StringUtilities;
}());
exports.StringUtilities = StringUtilities;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CronParser = (function () {
    function CronParser(expression, dayOfWeekStartIndexZero) {
        if (dayOfWeekStartIndexZero === void 0) { dayOfWeekStartIndexZero = true; }
        this.expression = expression;
        this.dayOfWeekStartIndexZero = dayOfWeekStartIndexZero;
    }
    CronParser.prototype.parse = function () {
        var parsed = this.extractParts(this.expression);
        this.normalize(parsed);
        this.validate(parsed);
        return parsed;
    };
    CronParser.prototype.extractParts = function (expression) {
        if (!this.expression) {
            throw new Error("Expression is empty");
        }
        var parsed = expression.trim().split(/[ ]+/);
        if (parsed.length < 5) {
            throw new Error("Expression has only " + parsed.length + " part" + (parsed.length == 1 ? "" : "s") + ". At least 5 parts are required.");
        }
        else if (parsed.length == 5) {
            parsed.unshift("");
            parsed.push("");
        }
        else if (parsed.length == 6) {
            if (/\d{4}$/.test(parsed[5])) {
                parsed.unshift("");
            }
            else {
                parsed.push("");
            }
        }
        else if (parsed.length > 7) {
            throw new Error("Expression has " + parsed.length + " parts; too many!");
        }
        return parsed;
    };
    CronParser.prototype.normalize = function (expressionParts) {
        var _this = this;
        expressionParts[3] = expressionParts[3].replace("?", "*");
        expressionParts[5] = expressionParts[5].replace("?", "*");
        expressionParts[2] = expressionParts[2].replace("?", "*");
        if (expressionParts[0].indexOf("0/") == 0) {
            expressionParts[0] = expressionParts[0].replace("0/", "*/");
        }
        if (expressionParts[1].indexOf("0/") == 0) {
            expressionParts[1] = expressionParts[1].replace("0/", "*/");
        }
        if (expressionParts[2].indexOf("0/") == 0) {
            expressionParts[2] = expressionParts[2].replace("0/", "*/");
        }
        if (expressionParts[3].indexOf("1/") == 0) {
            expressionParts[3] = expressionParts[3].replace("1/", "*/");
        }
        if (expressionParts[4].indexOf("1/") == 0) {
            expressionParts[4] = expressionParts[4].replace("1/", "*/");
        }
        if (expressionParts[5].indexOf("1/") == 0) {
            expressionParts[5] = expressionParts[5].replace("1/", "*/");
        }
        if (expressionParts[6].indexOf("1/") == 0) {
            expressionParts[6] = expressionParts[6].replace("1/", "*/");
        }
        expressionParts[5] = expressionParts[5].replace(/(^\d)|([^#/\s]\d)/g, function (t) {
            var dowDigits = t.replace(/\D/, "");
            var dowDigitsAdjusted = dowDigits;
            if (_this.dayOfWeekStartIndexZero) {
                if (dowDigits == "7") {
                    dowDigitsAdjusted = "0";
                }
            }
            else {
                dowDigitsAdjusted = (parseInt(dowDigits) - 1).toString();
            }
            return t.replace(dowDigits, dowDigitsAdjusted);
        });
        if (expressionParts[5] == "L") {
            expressionParts[5] = "6";
        }
        if (expressionParts[3] == "?") {
            expressionParts[3] = "*";
        }
        if (expressionParts[3].indexOf("W") > -1 &&
            (expressionParts[3].indexOf(",") > -1 || expressionParts[3].indexOf("-") > -1)) {
            throw new Error("The 'W' character can be specified only when the day-of-month is a single day, not a range or list of days.");
        }
        var days = {
            SUN: 0,
            MON: 1,
            TUE: 2,
            WED: 3,
            THU: 4,
            FRI: 5,
            SAT: 6
        };
        for (var day in days) {
            expressionParts[5] = expressionParts[5].replace(new RegExp(day, "gi"), days[day].toString());
        }
        var months = {
            JAN: 1,
            FEB: 2,
            MAR: 3,
            APR: 4,
            MAY: 5,
            JUN: 6,
            JUL: 7,
            AUG: 8,
            SEP: 9,
            OCT: 10,
            NOV: 11,
            DEC: 12
        };
        for (var month in months) {
            expressionParts[4] = expressionParts[4].replace(new RegExp(month, "gi"), months[month].toString());
        }
        if (expressionParts[0] == "0") {
            expressionParts[0] = "";
        }
        if (!/\*|\-|\,|\//.test(expressionParts[2]) &&
            (/\*|\//.test(expressionParts[1]) || /\*|\//.test(expressionParts[0]))) {
            expressionParts[2] += "-" + expressionParts[2];
        }
        for (var i = 0; i < expressionParts.length; i++) {
            if (expressionParts[i] == "*/1") {
                expressionParts[i] = "*";
            }
            if (expressionParts[i].indexOf("/") > -1 && !/^\*|\-|\,/.test(expressionParts[i])) {
                var stepRangeThrough = null;
                switch (i) {
                    case 4:
                        stepRangeThrough = "12";
                        break;
                    case 5:
                        stepRangeThrough = "6";
                        break;
                    case 6:
                        stepRangeThrough = "9999";
                        break;
                    default:
                        stepRangeThrough = null;
                        break;
                }
                if (stepRangeThrough != null) {
                    var parts = expressionParts[i].split("/");
                    expressionParts[i] = parts[0] + "-" + stepRangeThrough + "/" + parts[1];
                }
            }
        }
    };
    CronParser.prototype.validate = function (parsed) {
        this.assertNoInvalidCharacters("DOW", parsed[5]);
        this.assertNoInvalidCharacters("DOM", parsed[3]);
    };
    CronParser.prototype.assertNoInvalidCharacters = function (partDescription, expression) {
        var invalidChars = expression.match(/[A-KM-VX-Z]+/gi);
        if (invalidChars && invalidChars.length) {
            throw new Error(partDescription + " part contains invalid values: '" + invalidChars.toString() + "'");
        }
    };
    return CronParser;
}());
exports.CronParser = CronParser;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var en = (function () {
    function en() {
    }
    en.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    en.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    en.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    en.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    en.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    en.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "An error occured when generating the expression description.  Check the cron expression syntax.";
    };
    en.prototype.everyMinute = function () {
        return "every minute";
    };
    en.prototype.everyHour = function () {
        return "every hour";
    };
    en.prototype.atSpace = function () {
        return "At ";
    };
    en.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Every minute between %s and %s";
    };
    en.prototype.at = function () {
        return "At";
    };
    en.prototype.spaceAnd = function () {
        return " and";
    };
    en.prototype.everySecond = function () {
        return "every second";
    };
    en.prototype.everyX0Seconds = function () {
        return "every %s seconds";
    };
    en.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "seconds %s through %s past the minute";
    };
    en.prototype.atX0SecondsPastTheMinute = function () {
        return "at %s seconds past the minute";
    };
    en.prototype.everyX0Minutes = function () {
        return "every %s minutes";
    };
    en.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minutes %s through %s past the hour";
    };
    en.prototype.atX0MinutesPastTheHour = function () {
        return "at %s minutes past the hour";
    };
    en.prototype.everyX0Hours = function () {
        return "every %s hours";
    };
    en.prototype.betweenX0AndX1 = function () {
        return "between %s and %s";
    };
    en.prototype.atX0 = function () {
        return "at %s";
    };
    en.prototype.commaEveryDay = function () {
        return ", every day";
    };
    en.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", every %s days of the week";
    };
    en.prototype.commaX0ThroughX1 = function () {
        return ", %s through %s";
    };
    en.prototype.first = function () {
        return "first";
    };
    en.prototype.second = function () {
        return "second";
    };
    en.prototype.third = function () {
        return "third";
    };
    en.prototype.fourth = function () {
        return "fourth";
    };
    en.prototype.fifth = function () {
        return "fifth";
    };
    en.prototype.commaOnThe = function () {
        return ", on the ";
    };
    en.prototype.spaceX0OfTheMonth = function () {
        return " %s of the month";
    };
    en.prototype.lastDay = function () {
        return "the last day";
    };
    en.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", on the last %s of the month";
    };
    en.prototype.commaOnlyOnX0 = function () {
        return ", only on %s";
    };
    en.prototype.commaAndOnX0 = function () {
        return ", and on %s";
    };
    en.prototype.commaEveryX0Months = function () {
        return ", every %s months";
    };
    en.prototype.commaOnlyInX0 = function () {
        return ", only in %s";
    };
    en.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", on the last day of the month";
    };
    en.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", on the last weekday of the month";
    };
    en.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s days before the last day of the month";
    };
    en.prototype.firstWeekday = function () {
        return "first weekday";
    };
    en.prototype.weekdayNearestDayX0 = function () {
        return "weekday nearest day %s";
    };
    en.prototype.commaOnTheX0OfTheMonth = function () {
        return ", on the %s of the month";
    };
    en.prototype.commaEveryX0Days = function () {
        return ", every %s days";
    };
    en.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", between day %s and %s of the month";
    };
    en.prototype.commaOnDayX0OfTheMonth = function () {
        return ", on day %s of the month";
    };
    en.prototype.commaEveryHour = function () {
        return ", every hour";
    };
    en.prototype.commaEveryX0Years = function () {
        return ", every %s years";
    };
    en.prototype.commaStartingX0 = function () {
        return ", starting %s";
    };
    en.prototype.daysOfTheWeek = function () {
        return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    };
    en.prototype.monthsOfTheYear = function () {
        return [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
    };
    return en;
}());
exports.en = en;


/***/ }),
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var expressionDescriptor_1 = __webpack_require__(0);
var allLocalesLoader_1 = __webpack_require__(7);
expressionDescriptor_1.ExpressionDescriptor.initialize(new allLocalesLoader_1.allLocalesLoader());
exports.default = expressionDescriptor_1.ExpressionDescriptor;
var toString = expressionDescriptor_1.ExpressionDescriptor.toString;
exports.toString = toString;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var allLocales = __webpack_require__(8);
var allLocalesLoader = (function () {
    function allLocalesLoader() {
    }
    allLocalesLoader.prototype.load = function (availableLocales) {
        for (var property in allLocales) {
            if (allLocales.hasOwnProperty(property)) {
                availableLocales[property] = new allLocales[property]();
            }
        }
    };
    return allLocalesLoader;
}());
exports.allLocalesLoader = allLocalesLoader;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var en_1 = __webpack_require__(3);
exports.en = en_1.en;
var da_1 = __webpack_require__(9);
exports.da = da_1.da;
var de_1 = __webpack_require__(10);
exports.de = de_1.de;
var es_1 = __webpack_require__(11);
exports.es = es_1.es;
var fr_1 = __webpack_require__(12);
exports.fr = fr_1.fr;
var it_1 = __webpack_require__(13);
exports.it = it_1.it;
var ko_1 = __webpack_require__(14);
exports.ko = ko_1.ko;
var nl_1 = __webpack_require__(15);
exports.nl = nl_1.nl;
var nb_1 = __webpack_require__(16);
exports.nb = nb_1.nb;
var sv_1 = __webpack_require__(17);
exports.sv = sv_1.sv;
var pl_1 = __webpack_require__(18);
exports.pl = pl_1.pl;
var pt_BR_1 = __webpack_require__(19);
exports.pt_BR = pt_BR_1.pt_BR;
var ro_1 = __webpack_require__(20);
exports.ro = ro_1.ro;
var ru_1 = __webpack_require__(21);
exports.ru = ru_1.ru;
var tr_1 = __webpack_require__(22);
exports.tr = tr_1.tr;
var uk_1 = __webpack_require__(23);
exports.uk = uk_1.uk;
var zh_CN_1 = __webpack_require__(24);
exports.zh_CN = zh_CN_1.zh_CN;
var zh_TW_1 = __webpack_require__(25);
exports.zh_TW = zh_TW_1.zh_TW;
var ja_1 = __webpack_require__(26);
exports.ja = ja_1.ja;
var he_1 = __webpack_require__(27);
exports.he = he_1.he;
var cs_1 = __webpack_require__(28);
exports.cs = cs_1.cs;
var sk_1 = __webpack_require__(29);
exports.sk = sk_1.sk;
var fi_1 = __webpack_require__(30);
exports.fi = fi_1.fi;
var sl_1 = __webpack_require__(31);
exports.sl = sl_1.sl;
var sw_1 = __webpack_require__(32);
exports.sw = sw_1.sw;
var fa_1 = __webpack_require__(33);
exports.fa = fa_1.fa;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var da = (function () {
    function da() {
    }
    da.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    da.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Der opstod en fejl ved generering af udtryksbeskrivelsen. Tjek cron-ekspressionssyntaxen.";
    };
    da.prototype.at = function () {
        return "kl";
    };
    da.prototype.atSpace = function () {
        return "kl ";
    };
    da.prototype.atX0 = function () {
        return "kl %s";
    };
    da.prototype.atX0MinutesPastTheHour = function () {
        return "%s minutter efter timeskift";
    };
    da.prototype.atX0SecondsPastTheMinute = function () {
        return "%s sekunder efter minutskift";
    };
    da.prototype.betweenX0AndX1 = function () {
        return "mellem %s og %s";
    };
    da.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", mellem dag %s og %s i måneden";
    };
    da.prototype.commaEveryDay = function () {
        return ", hver dag";
    };
    da.prototype.commaEveryX0Days = function () {
        return ", hver %s. dag";
    };
    da.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", hver %s. ugedag";
    };
    da.prototype.commaEveryX0Months = function () {
        return ", hver %s. måned";
    };
    da.prototype.commaEveryX0Years = function () {
        return ", hvert %s. år";
    };
    da.prototype.commaOnDayX0OfTheMonth = function () {
        return ", på dag %s i måneden";
    };
    da.prototype.commaOnlyInX0 = function () {
        return ", kun i %s";
    };
    da.prototype.commaOnlyOnX0 = function () {
        return ", kun på %s";
    };
    da.prototype.commaAndOnX0 = function () {
        return ", og på %s";
    };
    da.prototype.commaOnThe = function () {
        return ", på den ";
    };
    da.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", på den sidste dag i måneden";
    };
    da.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", på den sidste hverdag i måneden";
    };
    da.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s dage før den sidste dag i måneden";
    };
    da.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", på den sidste %s i måneden";
    };
    da.prototype.commaOnTheX0OfTheMonth = function () {
        return ", på den %s i måneden";
    };
    da.prototype.commaX0ThroughX1 = function () {
        return ", %s til og med %s";
    };
    da.prototype.everyHour = function () {
        return "hver time";
    };
    da.prototype.everyMinute = function () {
        return "hvert minut";
    };
    da.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "hvert minut mellem %s og %s";
    };
    da.prototype.everySecond = function () {
        return "hvert sekund";
    };
    da.prototype.everyX0Hours = function () {
        return "hver %s. time";
    };
    da.prototype.everyX0Minutes = function () {
        return "hvert %s. minut";
    };
    da.prototype.everyX0Seconds = function () {
        return "hvert %s. sekund";
    };
    da.prototype.fifth = function () {
        return "femte";
    };
    da.prototype.first = function () {
        return "første";
    };
    da.prototype.firstWeekday = function () {
        return "første hverdag";
    };
    da.prototype.fourth = function () {
        return "fjerde";
    };
    da.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minutterne fra %s til og med %s hver time";
    };
    da.prototype.second = function () {
        return "anden";
    };
    da.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "sekunderne fra %s til og med %s hvert minut";
    };
    da.prototype.spaceAnd = function () {
        return " og";
    };
    da.prototype.spaceX0OfTheMonth = function () {
        return " %s i måneden";
    };
    da.prototype.lastDay = function () {
        return "sidste dag";
    };
    da.prototype.third = function () {
        return "tredje";
    };
    da.prototype.weekdayNearestDayX0 = function () {
        return "hverdag nærmest dag %s";
    };
    da.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    da.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    da.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    da.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    da.prototype.commaStartingX0 = function () {
        return ", startende %s";
    };
    da.prototype.daysOfTheWeek = function () {
        return ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"];
    };
    da.prototype.monthsOfTheYear = function () {
        return [
            "januar",
            "februar",
            "marts",
            "april",
            "maj",
            "juni",
            "juli",
            "august",
            "september",
            "oktober",
            "november",
            "december"
        ];
    };
    return da;
}());
exports.da = da;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var de = (function () {
    function de() {
    }
    de.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    de.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    de.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    de.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    de.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    de.prototype.everyMinute = function () {
        return "jede Minute";
    };
    de.prototype.everyHour = function () {
        return "jede Stunde";
    };
    de.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Beim Generieren der Ausdrucksbeschreibung ist ein Fehler aufgetreten. Überprüfen Sie die Syntax des Cron-Ausdrucks.";
    };
    de.prototype.atSpace = function () {
        return "Um ";
    };
    de.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Jede Minute zwischen %s und %s";
    };
    de.prototype.at = function () {
        return "Um";
    };
    de.prototype.spaceAnd = function () {
        return " und";
    };
    de.prototype.everySecond = function () {
        return "Jede Sekunde";
    };
    de.prototype.everyX0Seconds = function () {
        return "alle %s Sekunden";
    };
    de.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "Sekunden %s bis %s";
    };
    de.prototype.atX0SecondsPastTheMinute = function () {
        return "bei Sekunde %s";
    };
    de.prototype.everyX0Minutes = function () {
        return "alle %s Minuten";
    };
    de.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "Minuten %s bis %s";
    };
    de.prototype.atX0MinutesPastTheHour = function () {
        return "bei Minute %s";
    };
    de.prototype.everyX0Hours = function () {
        return "alle %s Stunden";
    };
    de.prototype.betweenX0AndX1 = function () {
        return "zwischen %s und %s";
    };
    de.prototype.atX0 = function () {
        return "um %s";
    };
    de.prototype.commaEveryDay = function () {
        return ", jeden Tag";
    };
    de.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", alle %s Tage der Woche";
    };
    de.prototype.commaX0ThroughX1 = function () {
        return ", %s bis %s";
    };
    de.prototype.first = function () {
        return "ersten";
    };
    de.prototype.second = function () {
        return "zweiten";
    };
    de.prototype.third = function () {
        return "dritten";
    };
    de.prototype.fourth = function () {
        return "vierten";
    };
    de.prototype.fifth = function () {
        return "fünften";
    };
    de.prototype.commaOnThe = function () {
        return ", am ";
    };
    de.prototype.spaceX0OfTheMonth = function () {
        return " %s des Monats";
    };
    de.prototype.lastDay = function () {
        return "der letzte Tag";
    };
    de.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", am letzten %s des Monats";
    };
    de.prototype.commaOnlyOnX0 = function () {
        return ", nur am %s";
    };
    de.prototype.commaAndOnX0 = function () {
        return ", und am %s";
    };
    de.prototype.commaEveryX0Months = function () {
        return ", alle %s Monate";
    };
    de.prototype.commaOnlyInX0 = function () {
        return ", nur im %s";
    };
    de.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", am letzten Tag des Monats";
    };
    de.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", am letzten Werktag des Monats";
    };
    de.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s tage vor dem letzten Tag des Monats";
    };
    de.prototype.firstWeekday = function () {
        return "ersten Werktag";
    };
    de.prototype.weekdayNearestDayX0 = function () {
        return "Werktag am nächsten zum %s Tag";
    };
    de.prototype.commaOnTheX0OfTheMonth = function () {
        return ", am %s des Monats";
    };
    de.prototype.commaEveryX0Days = function () {
        return ", alle %s Tage";
    };
    de.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", zwischen Tag %s und %s des Monats";
    };
    de.prototype.commaOnDayX0OfTheMonth = function () {
        return ", am %s Tag des Monats";
    };
    de.prototype.commaEveryX0Years = function () {
        return ", alle %s Jahre";
    };
    de.prototype.commaStartingX0 = function () {
        return ", beginnend %s";
    };
    de.prototype.daysOfTheWeek = function () {
        return ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    };
    de.prototype.monthsOfTheYear = function () {
        return [
            "Januar",
            "Februar",
            "März",
            "April",
            "Mai",
            "Juni",
            "Juli",
            "August",
            "September",
            "Oktober",
            "November",
            "Dezember"
        ];
    };
    return de;
}());
exports.de = de;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var es = (function () {
    function es() {
    }
    es.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    es.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    es.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    es.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    es.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    es.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Ocurrió un error mientras se generaba la descripción de la expresión. Revise la sintaxis de la expresión de cron.";
    };
    es.prototype.at = function () {
        return "A las";
    };
    es.prototype.atSpace = function () {
        return "A las ";
    };
    es.prototype.atX0 = function () {
        return "a las %s";
    };
    es.prototype.atX0MinutesPastTheHour = function () {
        return "a los %s minutos de la hora";
    };
    es.prototype.atX0SecondsPastTheMinute = function () {
        return "a los %s segundos del minuto";
    };
    es.prototype.betweenX0AndX1 = function () {
        return "entre las %s y las %s";
    };
    es.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", entre los días %s y %s del mes";
    };
    es.prototype.commaEveryDay = function () {
        return ", cada día";
    };
    es.prototype.commaEveryX0Days = function () {
        return ", cada %s días";
    };
    es.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", cada %s días de la semana";
    };
    es.prototype.commaEveryX0Months = function () {
        return ", cada %s meses";
    };
    es.prototype.commaOnDayX0OfTheMonth = function () {
        return ", el día %s del mes";
    };
    es.prototype.commaOnlyInX0 = function () {
        return ", sólo en %s";
    };
    es.prototype.commaOnlyOnX0 = function () {
        return ", sólo el %s";
    };
    es.prototype.commaAndOnX0 = function () {
        return ", y el %s";
    };
    es.prototype.commaOnThe = function () {
        return ", en el ";
    };
    es.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", en el último día del mes";
    };
    es.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", en el último día de la semana del mes";
    };
    es.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s días antes del último día del mes";
    };
    es.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", en el último %s del mes";
    };
    es.prototype.commaOnTheX0OfTheMonth = function () {
        return ", en el %s del mes";
    };
    es.prototype.commaX0ThroughX1 = function () {
        return ", de %s a %s";
    };
    es.prototype.everyHour = function () {
        return "cada hora";
    };
    es.prototype.everyMinute = function () {
        return "cada minuto";
    };
    es.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "cada minuto entre las %s y las %s";
    };
    es.prototype.everySecond = function () {
        return "cada segundo";
    };
    es.prototype.everyX0Hours = function () {
        return "cada %s horas";
    };
    es.prototype.everyX0Minutes = function () {
        return "cada %s minutos";
    };
    es.prototype.everyX0Seconds = function () {
        return "cada %s segundos";
    };
    es.prototype.fifth = function () {
        return "quinto";
    };
    es.prototype.first = function () {
        return "primero";
    };
    es.prototype.firstWeekday = function () {
        return "primer día de la semana";
    };
    es.prototype.fourth = function () {
        return "cuarto";
    };
    es.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "del minuto %s al %s pasada la hora";
    };
    es.prototype.second = function () {
        return "segundo";
    };
    es.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "En los segundos %s al %s de cada minuto";
    };
    es.prototype.spaceAnd = function () {
        return " y";
    };
    es.prototype.spaceX0OfTheMonth = function () {
        return " %s del mes";
    };
    es.prototype.lastDay = function () {
        return "el último día";
    };
    es.prototype.third = function () {
        return "tercer";
    };
    es.prototype.weekdayNearestDayX0 = function () {
        return "día de la semana más próximo al %s";
    };
    es.prototype.commaEveryX0Years = function () {
        return ", cada %s años";
    };
    es.prototype.commaStartingX0 = function () {
        return ", comenzando %s";
    };
    es.prototype.daysOfTheWeek = function () {
        return ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
    };
    es.prototype.monthsOfTheYear = function () {
        return [
            "enero",
            "febrero",
            "marzo",
            "abril",
            "mayo",
            "junio",
            "julio",
            "agosto",
            "septiembre",
            "octubre",
            "noviembre",
            "diciembre"
        ];
    };
    return es;
}());
exports.es = es;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var fr = (function () {
    function fr() {
    }
    fr.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    fr.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    fr.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    fr.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    fr.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    fr.prototype.everyMinute = function () {
        return "toutes les minutes";
    };
    fr.prototype.everyHour = function () {
        return "toutes les heures";
    };
    fr.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Une erreur est survenue en générant la description de l'expression cron. Vérifiez sa syntaxe.";
    };
    fr.prototype.atSpace = function () {
        return "À ";
    };
    fr.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Toutes les minutes entre %s et %s";
    };
    fr.prototype.at = function () {
        return "À";
    };
    fr.prototype.spaceAnd = function () {
        return " et";
    };
    fr.prototype.everySecond = function () {
        return "toutes les secondes";
    };
    fr.prototype.everyX0Seconds = function () {
        return "toutes les %s secondes";
    };
    fr.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "les secondes entre %s et %s après la minute";
    };
    fr.prototype.atX0SecondsPastTheMinute = function () {
        return "%s secondes après la minute";
    };
    fr.prototype.everyX0Minutes = function () {
        return "toutes les %s minutes";
    };
    fr.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "les minutes entre %s et %s après l'heure";
    };
    fr.prototype.atX0MinutesPastTheHour = function () {
        return "%s minutes après l'heure";
    };
    fr.prototype.everyX0Hours = function () {
        return "toutes les %s heures";
    };
    fr.prototype.betweenX0AndX1 = function () {
        return "de %s à %s";
    };
    fr.prototype.atX0 = function () {
        return "à %s";
    };
    fr.prototype.commaEveryDay = function () {
        return ", tous les jours";
    };
    fr.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", every %s days of the week";
    };
    fr.prototype.commaX0ThroughX1 = function () {
        return ", de %s à %s";
    };
    fr.prototype.first = function () {
        return "premier";
    };
    fr.prototype.second = function () {
        return "second";
    };
    fr.prototype.third = function () {
        return "troisième";
    };
    fr.prototype.fourth = function () {
        return "quatrième";
    };
    fr.prototype.fifth = function () {
        return "cinquième";
    };
    fr.prototype.commaOnThe = function () {
        return ", le ";
    };
    fr.prototype.spaceX0OfTheMonth = function () {
        return " %s du mois";
    };
    fr.prototype.lastDay = function () {
        return "le dernier jour";
    };
    fr.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", le dernier %s du mois";
    };
    fr.prototype.commaOnlyOnX0 = function () {
        return ", uniquement le %s";
    };
    fr.prototype.commaAndOnX0 = function () {
        return ", et %s";
    };
    fr.prototype.commaEveryX0Months = function () {
        return ", tous les %s mois";
    };
    fr.prototype.commaOnlyInX0 = function () {
        return ", uniquement en %s";
    };
    fr.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", le dernier jour du mois";
    };
    fr.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", le dernier jour ouvrable du mois";
    };
    fr.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s jours avant le dernier jour du mois";
    };
    fr.prototype.firstWeekday = function () {
        return "premier jour ouvrable";
    };
    fr.prototype.weekdayNearestDayX0 = function () {
        return "jour ouvrable le plus proche du %s";
    };
    fr.prototype.commaOnTheX0OfTheMonth = function () {
        return ", le %s du mois";
    };
    fr.prototype.commaEveryX0Days = function () {
        return ", tous les %s jours";
    };
    fr.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", du %s au %s du mois";
    };
    fr.prototype.commaOnDayX0OfTheMonth = function () {
        return ", le %s du mois";
    };
    fr.prototype.commaEveryX0Years = function () {
        return ", tous les %s ans";
    };
    fr.prototype.commaDaysX0ThroughX1 = function () {
        return ", du %s au %s";
    };
    fr.prototype.commaStartingX0 = function () {
        return ", départ %s";
    };
    fr.prototype.daysOfTheWeek = function () {
        return ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
    };
    fr.prototype.monthsOfTheYear = function () {
        return [
            "janvier",
            "février",
            "mars",
            "avril",
            "mai",
            "juin",
            "juillet",
            "août",
            "septembre",
            "octobre",
            "novembre",
            "décembre"
        ];
    };
    return fr;
}());
exports.fr = fr;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var it = (function () {
    function it() {
    }
    it.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    it.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    it.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    it.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    it.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    it.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "È verificato un errore durante la generazione la descrizione espressione. Controllare la sintassi delle espressioni cron.";
    };
    it.prototype.at = function () {
        return "Alle";
    };
    it.prototype.atSpace = function () {
        return "Alle ";
    };
    it.prototype.atX0 = function () {
        return "alle %s";
    };
    it.prototype.atX0MinutesPastTheHour = function () {
        return "al %s minuto passata l'ora";
    };
    it.prototype.atX0SecondsPastTheMinute = function () {
        return "al %s secondo passato il minuto";
    };
    it.prototype.betweenX0AndX1 = function () {
        return "tra le %s e le %s";
    };
    it.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", tra il giorno %s e %s del mese";
    };
    it.prototype.commaEveryDay = function () {
        return ", ogni giorno";
    };
    it.prototype.commaEveryX0Days = function () {
        return ", ogni %s giorni";
    };
    it.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", ogni %s giorni della settimana";
    };
    it.prototype.commaEveryX0Months = function () {
        return ", ogni %s mesi";
    };
    it.prototype.commaEveryX0Years = function () {
        return ", ogni %s anni";
    };
    it.prototype.commaOnDayX0OfTheMonth = function () {
        return ", il giorno %s del mese";
    };
    it.prototype.commaOnlyInX0 = function () {
        return ", solo in %s";
    };
    it.prototype.commaOnlyOnX0 = function () {
        return ", solo il %s";
    };
    it.prototype.commaAndOnX0 = function () {
        return ", e il %s";
    };
    it.prototype.commaOnThe = function () {
        return ", il ";
    };
    it.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", l'ultimo giorno del mese";
    };
    it.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", nell'ultima settimana del mese";
    };
    it.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s giorni prima dell'ultimo giorno del mese";
    };
    it.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", l'ultimo %s del mese";
    };
    it.prototype.commaOnTheX0OfTheMonth = function () {
        return ", il %s del mese";
    };
    it.prototype.commaX0ThroughX1 = function () {
        return ", %s al %s";
    };
    it.prototype.everyHour = function () {
        return "ogni ora";
    };
    it.prototype.everyMinute = function () {
        return "ogni minuto";
    };
    it.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Ogni minuto tra le %s e le %s";
    };
    it.prototype.everySecond = function () {
        return "ogni secondo";
    };
    it.prototype.everyX0Hours = function () {
        return "ogni %s ore";
    };
    it.prototype.everyX0Minutes = function () {
        return "ogni %s minuti";
    };
    it.prototype.everyX0Seconds = function () {
        return "ogni %s secondi";
    };
    it.prototype.fifth = function () {
        return "quinto";
    };
    it.prototype.first = function () {
        return "primo";
    };
    it.prototype.firstWeekday = function () {
        return "primo giorno della settimana";
    };
    it.prototype.fourth = function () {
        return "quarto";
    };
    it.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minuti %s al %s dopo l'ora";
    };
    it.prototype.second = function () {
        return "secondo";
    };
    it.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "secondi %s al %s oltre il minuto";
    };
    it.prototype.spaceAnd = function () {
        return " e";
    };
    it.prototype.spaceX0OfTheMonth = function () {
        return " %s del mese";
    };
    it.prototype.lastDay = function () {
        return "l'ultimo giorno";
    };
    it.prototype.third = function () {
        return "terzo";
    };
    it.prototype.weekdayNearestDayX0 = function () {
        return "giorno della settimana più vicino al %s";
    };
    it.prototype.commaStartingX0 = function () {
        return ", a partire %s";
    };
    it.prototype.daysOfTheWeek = function () {
        return ["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"];
    };
    it.prototype.monthsOfTheYear = function () {
        return [
            "gennaio",
            "febbraio",
            "marzo",
            "aprile",
            "maggio",
            "giugno",
            "luglio",
            "agosto",
            "settembre",
            "ottobre",
            "novembre",
            "dicembre"
        ];
    };
    return it;
}());
exports.it = it;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ko = (function () {
    function ko() {
    }
    ko.prototype.setPeriodBeforeTime = function () {
        return true;
    };
    ko.prototype.pm = function () {
        return "오후";
    };
    ko.prototype.am = function () {
        return "오전";
    };
    ko.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    ko.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    ko.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    ko.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    ko.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    ko.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "표현식 설명을 생성하는 중 오류가 발생했습니다. cron 표현식 구문을 확인하십시오.";
    };
    ko.prototype.everyMinute = function () {
        return "1분마다";
    };
    ko.prototype.everyHour = function () {
        return "1시간마다";
    };
    ko.prototype.atSpace = function () {
        return "에서 ";
    };
    ko.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "%s 및 %s 사이에 매 분";
    };
    ko.prototype.at = function () {
        return "에서";
    };
    ko.prototype.spaceAnd = function () {
        return " 및";
    };
    ko.prototype.everySecond = function () {
        return "1초마다";
    };
    ko.prototype.everyX0Seconds = function () {
        return "%s초마다";
    };
    ko.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "정분 후 %s초에서 %s초까지";
    };
    ko.prototype.atX0SecondsPastTheMinute = function () {
        return "정분 후 %s초에서";
    };
    ko.prototype.everyX0Minutes = function () {
        return "%s분마다";
    };
    ko.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "정시 후 %s분에서 %s까지";
    };
    ko.prototype.atX0MinutesPastTheHour = function () {
        return "정시 후 %s분에서";
    };
    ko.prototype.everyX0Hours = function () {
        return "%s시간마다";
    };
    ko.prototype.betweenX0AndX1 = function () {
        return "%s에서 %s 사이";
    };
    ko.prototype.atX0 = function () {
        return "%s에서";
    };
    ko.prototype.commaEveryDay = function () {
        return ", 매일";
    };
    ko.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", 주 중 %s일마다";
    };
    ko.prototype.commaX0ThroughX1 = function () {
        return ", %s에서 %s가지";
    };
    ko.prototype.first = function () {
        return "첫 번째";
    };
    ko.prototype.second = function () {
        return "두 번째";
    };
    ko.prototype.third = function () {
        return "세 번째";
    };
    ko.prototype.fourth = function () {
        return "네 번째";
    };
    ko.prototype.fifth = function () {
        return "다섯 번째";
    };
    ko.prototype.commaOnThe = function () {
        return ", 해당 ";
    };
    ko.prototype.spaceX0OfTheMonth = function () {
        return " 해당 월의 %s";
    };
    ko.prototype.lastDay = function () {
        return "마지막 날";
    };
    ko.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", 해당 월의 마지막 %s";
    };
    ko.prototype.commaOnlyOnX0 = function () {
        return ", %s에만";
    };
    ko.prototype.commaAndOnX0 = function () {
        return ", 및 %s에";
    };
    ko.prototype.commaEveryX0Months = function () {
        return ", %s개월마다";
    };
    ko.prototype.commaOnlyInX0 = function () {
        return ", %s에서만";
    };
    ko.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", 해당 월의 마지막 날에";
    };
    ko.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", 해당 월의 마지막 평일에";
    };
    ko.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", 해당 월의 마지막 날 %s일 전";
    };
    ko.prototype.firstWeekday = function () {
        return "첫 번째 평일";
    };
    ko.prototype.weekdayNearestDayX0 = function () {
        return "평일 가장 가까운 날 %s";
    };
    ko.prototype.commaOnTheX0OfTheMonth = function () {
        return ", 해당 월의 %s에";
    };
    ko.prototype.commaEveryX0Days = function () {
        return ", %s일마다";
    };
    ko.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", 해당 월의 %s일 및 %s일 사이";
    };
    ko.prototype.commaOnDayX0OfTheMonth = function () {
        return ", 해당 월의 %s일에";
    };
    ko.prototype.commaEveryMinute = function () {
        return ", 1분마다";
    };
    ko.prototype.commaEveryHour = function () {
        return ", 1시간마다";
    };
    ko.prototype.commaEveryX0Years = function () {
        return ", %s년마다";
    };
    ko.prototype.commaStartingX0 = function () {
        return ", %s부터";
    };
    ko.prototype.daysOfTheWeek = function () {
        return ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    };
    ko.prototype.monthsOfTheYear = function () {
        return [
            "1월",
            "2월",
            "3월",
            "4월",
            "5월",
            "6월",
            "7월",
            "8월",
            "9월",
            "10월",
            "11월",
            "12월"
        ];
    };
    return ko;
}());
exports.ko = ko;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var nl = (function () {
    function nl() {
    }
    nl.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    nl.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    nl.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    nl.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    nl.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    nl.prototype.everyMinute = function () {
        return "elke minuut";
    };
    nl.prototype.everyHour = function () {
        return "elk uur";
    };
    nl.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Er is een fout opgetreden bij het vertalen van de gegevens. Controleer de gegevens.";
    };
    nl.prototype.atSpace = function () {
        return "Op ";
    };
    nl.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Elke minuut tussen %s en %s";
    };
    nl.prototype.at = function () {
        return "Op";
    };
    nl.prototype.spaceAnd = function () {
        return " en";
    };
    nl.prototype.everySecond = function () {
        return "elke seconde";
    };
    nl.prototype.everyX0Seconds = function () {
        return "elke %s seconden";
    };
    nl.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "seconden %s t/m %s na de minuut";
    };
    nl.prototype.atX0SecondsPastTheMinute = function () {
        return "op %s seconden na de minuut";
    };
    nl.prototype.everyX0Minutes = function () {
        return "elke %s minuten";
    };
    nl.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minuut %s t/m %s na het uur";
    };
    nl.prototype.atX0MinutesPastTheHour = function () {
        return "op %s minuten na het uur";
    };
    nl.prototype.everyX0Hours = function () {
        return "elke %s uur";
    };
    nl.prototype.betweenX0AndX1 = function () {
        return "tussen %s en %s";
    };
    nl.prototype.atX0 = function () {
        return "op %s";
    };
    nl.prototype.commaEveryDay = function () {
        return ", elke dag";
    };
    nl.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", elke %s dagen van de week";
    };
    nl.prototype.commaX0ThroughX1 = function () {
        return ", %s t/m %s";
    };
    nl.prototype.first = function () {
        return "eerste";
    };
    nl.prototype.second = function () {
        return "tweede";
    };
    nl.prototype.third = function () {
        return "derde";
    };
    nl.prototype.fourth = function () {
        return "vierde";
    };
    nl.prototype.fifth = function () {
        return "vijfde";
    };
    nl.prototype.commaOnThe = function () {
        return ", op de ";
    };
    nl.prototype.spaceX0OfTheMonth = function () {
        return " %s van de maand";
    };
    nl.prototype.lastDay = function () {
        return "de laatste dag";
    };
    nl.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", op de laatste %s van de maand";
    };
    nl.prototype.commaOnlyOnX0 = function () {
        return ", alleen op %s";
    };
    nl.prototype.commaAndOnX0 = function () {
        return ", en op %s";
    };
    nl.prototype.commaEveryX0Months = function () {
        return ", elke %s maanden";
    };
    nl.prototype.commaOnlyInX0 = function () {
        return ", alleen in %s";
    };
    nl.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", op de laatste dag van de maand";
    };
    nl.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", op de laatste werkdag van de maand";
    };
    nl.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s dagen vóór de laatste dag van de maand";
    };
    nl.prototype.firstWeekday = function () {
        return "eerste werkdag";
    };
    nl.prototype.weekdayNearestDayX0 = function () {
        return "werkdag dichtst bij dag %s";
    };
    nl.prototype.commaOnTheX0OfTheMonth = function () {
        return ", op de %s van de maand";
    };
    nl.prototype.commaEveryX0Days = function () {
        return ", elke %s dagen";
    };
    nl.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", tussen dag %s en %s van de maand";
    };
    nl.prototype.commaOnDayX0OfTheMonth = function () {
        return ", op dag %s van de maand";
    };
    nl.prototype.commaEveryX0Years = function () {
        return ", elke %s jaren";
    };
    nl.prototype.commaStartingX0 = function () {
        return ", beginnend %s";
    };
    nl.prototype.daysOfTheWeek = function () {
        return ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];
    };
    nl.prototype.monthsOfTheYear = function () {
        return [
            "januari",
            "februari",
            "maart",
            "april",
            "mei",
            "juni",
            "juli",
            "augustus",
            "september",
            "oktober",
            "november",
            "december"
        ];
    };
    return nl;
}());
exports.nl = nl;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var nb = (function () {
    function nb() {
    }
    nb.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    nb.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    nb.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    nb.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    nb.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    nb.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "En feil inntraff ved generering av uttrykksbeskrivelse. Sjekk cron syntaks.";
    };
    nb.prototype.at = function () {
        return "Kl.";
    };
    nb.prototype.atSpace = function () {
        return "Kl.";
    };
    nb.prototype.atX0 = function () {
        return "på %s";
    };
    nb.prototype.atX0MinutesPastTheHour = function () {
        return "på %s minutter etter timen";
    };
    nb.prototype.atX0SecondsPastTheMinute = function () {
        return "på %s sekunder etter minuttet";
    };
    nb.prototype.betweenX0AndX1 = function () {
        return "mellom %s og %s";
    };
    nb.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", mellom dag %s og %s av måneden";
    };
    nb.prototype.commaEveryDay = function () {
        return ", hver dag";
    };
    nb.prototype.commaEveryX0Days = function () {
        return ", hver %s dag";
    };
    nb.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", hver %s ukedag";
    };
    nb.prototype.commaEveryX0Months = function () {
        return ", hver %s måned";
    };
    nb.prototype.commaEveryX0Years = function () {
        return ", hvert %s år";
    };
    nb.prototype.commaOnDayX0OfTheMonth = function () {
        return ", på dag %s av måneden";
    };
    nb.prototype.commaOnlyInX0 = function () {
        return ", bare i %s";
    };
    nb.prototype.commaOnlyOnX0 = function () {
        return ", på %s";
    };
    nb.prototype.commaAndOnX0 = function () {
        return ", og på %s";
    };
    nb.prototype.commaOnThe = function () {
        return ", på ";
    };
    nb.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", på den siste dagen i måneden";
    };
    nb.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", den siste ukedagen i måneden";
    };
    nb.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s dager før den siste dagen i måneden";
    };
    nb.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", på den siste %s av måneden";
    };
    nb.prototype.commaOnTheX0OfTheMonth = function () {
        return ", på den %s av måneden";
    };
    nb.prototype.commaX0ThroughX1 = function () {
        return ", %s til og med %s";
    };
    nb.prototype.everyHour = function () {
        return "hver time";
    };
    nb.prototype.everyMinute = function () {
        return "hvert minutt";
    };
    nb.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Hvert minutt mellom %s og %s";
    };
    nb.prototype.everySecond = function () {
        return "hvert sekund";
    };
    nb.prototype.everyX0Hours = function () {
        return "hver %s time";
    };
    nb.prototype.everyX0Minutes = function () {
        return "hvert %s minutt";
    };
    nb.prototype.everyX0Seconds = function () {
        return "hvert %s sekund";
    };
    nb.prototype.fifth = function () {
        return "femte";
    };
    nb.prototype.first = function () {
        return "første";
    };
    nb.prototype.firstWeekday = function () {
        return "første ukedag";
    };
    nb.prototype.fourth = function () {
        return "fjerde";
    };
    nb.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minuttene fra %s til og med %s etter timen";
    };
    nb.prototype.second = function () {
        return "sekund";
    };
    nb.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "sekundene fra %s til og med %s etter minuttet";
    };
    nb.prototype.spaceAnd = function () {
        return " og";
    };
    nb.prototype.spaceX0OfTheMonth = function () {
        return " %s i måneden";
    };
    nb.prototype.lastDay = function () {
        return "den siste dagen";
    };
    nb.prototype.third = function () {
        return "tredje";
    };
    nb.prototype.weekdayNearestDayX0 = function () {
        return "ukedag nærmest dag %s";
    };
    nb.prototype.commaStartingX0 = function () {
        return ", starter %s";
    };
    nb.prototype.daysOfTheWeek = function () {
        return ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"];
    };
    nb.prototype.monthsOfTheYear = function () {
        return [
            "januar",
            "februar",
            "mars",
            "april",
            "mai",
            "juni",
            "juli",
            "august",
            "september",
            "oktober",
            "november",
            "desember"
        ];
    };
    return nb;
}());
exports.nb = nb;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var sv = (function () {
    function sv() {
    }
    sv.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    sv.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    sv.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    sv.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    sv.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    sv.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Ett fel inträffade vid generering av uttryckets beskrivning. Kontrollera cron-uttryckets syntax.";
    };
    sv.prototype.everyMinute = function () {
        return "varje minut";
    };
    sv.prototype.everyHour = function () {
        return "varje timme";
    };
    sv.prototype.atSpace = function () {
        return "Kl ";
    };
    sv.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Varje minut mellan %s och %s";
    };
    sv.prototype.at = function () {
        return "Kl";
    };
    sv.prototype.spaceAnd = function () {
        return " och";
    };
    sv.prototype.everySecond = function () {
        return "varje sekund";
    };
    sv.prototype.everyX0Seconds = function () {
        return "varje %s sekund";
    };
    sv.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "sekunderna från %s till och med %s efter minuten";
    };
    sv.prototype.atX0SecondsPastTheMinute = function () {
        return "på %s sekunder efter minuten";
    };
    sv.prototype.everyX0Minutes = function () {
        return "var %s minut";
    };
    sv.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minuterna från %s till och med %s efter timmen";
    };
    sv.prototype.atX0MinutesPastTheHour = function () {
        return "på %s minuten efter timmen";
    };
    sv.prototype.everyX0Hours = function () {
        return "var %s timme";
    };
    sv.prototype.betweenX0AndX1 = function () {
        return "mellan %s och %s";
    };
    sv.prototype.atX0 = function () {
        return "kl %s";
    };
    sv.prototype.commaEveryDay = function () {
        return ", varje dag";
    };
    sv.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", var %s dag i veckan";
    };
    sv.prototype.commaX0ThroughX1 = function () {
        return ", %s till %s";
    };
    sv.prototype.first = function () {
        return "första";
    };
    sv.prototype.second = function () {
        return "andra";
    };
    sv.prototype.third = function () {
        return "tredje";
    };
    sv.prototype.fourth = function () {
        return "fjärde";
    };
    sv.prototype.fifth = function () {
        return "femte";
    };
    sv.prototype.commaOnThe = function () {
        return ", den ";
    };
    sv.prototype.spaceX0OfTheMonth = function () {
        return " %sen av månaden";
    };
    sv.prototype.lastDay = function () {
        return "den sista dagen";
    };
    sv.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", på sista %s av månaden";
    };
    sv.prototype.commaOnlyOnX0 = function () {
        return ", varje %s";
    };
    sv.prototype.commaAndOnX0 = function () {
        return ", och på %s";
    };
    sv.prototype.commaEveryX0Months = function () {
        return ", var %s månad";
    };
    sv.prototype.commaOnlyInX0 = function () {
        return ", bara på %s";
    };
    sv.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", på sista dagen av månaden";
    };
    sv.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", på sista veckodag av månaden";
    };
    sv.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s dagar före den sista dagen i månaden";
    };
    sv.prototype.firstWeekday = function () {
        return "första veckodag";
    };
    sv.prototype.weekdayNearestDayX0 = function () {
        return "veckodagen närmast dag %s";
    };
    sv.prototype.commaOnTheX0OfTheMonth = function () {
        return ", på den %s av månaden";
    };
    sv.prototype.commaEveryX0Days = function () {
        return ", var %s dag";
    };
    sv.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", mellan dag %s och %s av månaden";
    };
    sv.prototype.commaOnDayX0OfTheMonth = function () {
        return ", på dag %s av månaden";
    };
    sv.prototype.commaEveryX0Years = function () {
        return ", var %s år";
    };
    sv.prototype.commaStartingX0 = function () {
        return ", startar %s";
    };
    sv.prototype.daysOfTheWeek = function () {
        return ["söndag", "måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag"];
    };
    sv.prototype.monthsOfTheYear = function () {
        return [
            "januari",
            "februari",
            "mars",
            "april",
            "maj",
            "juni",
            "juli",
            "augusti",
            "september",
            "oktober",
            "november",
            "december"
        ];
    };
    return sv;
}());
exports.sv = sv;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var pl = (function () {
    function pl() {
    }
    pl.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    pl.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    pl.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    pl.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    pl.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    pl.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Wystąpił błąd podczas generowania opisu wyrażenia cron. Sprawdź składnię wyrażenia cron.";
    };
    pl.prototype.at = function () {
        return "O";
    };
    pl.prototype.atSpace = function () {
        return "O ";
    };
    pl.prototype.atX0 = function () {
        return "o %s";
    };
    pl.prototype.atX0MinutesPastTheHour = function () {
        return "w %s minucie";
    };
    pl.prototype.atX0SecondsPastTheMinute = function () {
        return "w %s sekundzie";
    };
    pl.prototype.betweenX0AndX1 = function () {
        return "od %s do %s";
    };
    pl.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", od %s-ego do %s-ego dnia miesiąca";
    };
    pl.prototype.commaEveryDay = function () {
        return ", co dzień";
    };
    pl.prototype.commaEveryX0Days = function () {
        return ", co %s dni";
    };
    pl.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", co %s dni tygodnia";
    };
    pl.prototype.commaEveryX0Months = function () {
        return ", co %s miesięcy";
    };
    pl.prototype.commaEveryX0Years = function () {
        return ", co %s lat";
    };
    pl.prototype.commaOnDayX0OfTheMonth = function () {
        return ", %s-ego dnia miesiąca";
    };
    pl.prototype.commaOnlyInX0 = function () {
        return ", tylko %s";
    };
    pl.prototype.commaOnlyOnX0 = function () {
        return ", tylko %s";
    };
    pl.prototype.commaAndOnX0 = function () {
        return ", i %s";
    };
    pl.prototype.commaOnThe = function () {
        return ", ";
    };
    pl.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", ostatni dzień miesiąca";
    };
    pl.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", ostatni dzień roboczy miesiąca";
    };
    pl.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s dni przed ostatnim dniem miesiąca";
    };
    pl.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", ostatni %s miesiąca";
    };
    pl.prototype.commaOnTheX0OfTheMonth = function () {
        return ", %s miesiąca";
    };
    pl.prototype.commaX0ThroughX1 = function () {
        return ", od %s do %s";
    };
    pl.prototype.everyHour = function () {
        return "co godzinę";
    };
    pl.prototype.everyMinute = function () {
        return "co minutę";
    };
    pl.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Co minutę od %s do %s";
    };
    pl.prototype.everySecond = function () {
        return "co sekundę";
    };
    pl.prototype.everyX0Hours = function () {
        return "co %s godzin";
    };
    pl.prototype.everyX0Minutes = function () {
        return "co %s minut";
    };
    pl.prototype.everyX0Seconds = function () {
        return "co %s sekund";
    };
    pl.prototype.fifth = function () {
        return "piąty";
    };
    pl.prototype.first = function () {
        return "pierwszy";
    };
    pl.prototype.firstWeekday = function () {
        return "pierwszy dzień roboczy";
    };
    pl.prototype.fourth = function () {
        return "czwarty";
    };
    pl.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minuty od %s do %s";
    };
    pl.prototype.second = function () {
        return "drugi";
    };
    pl.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "sekundy od %s do %s";
    };
    pl.prototype.spaceAnd = function () {
        return " i";
    };
    pl.prototype.spaceX0OfTheMonth = function () {
        return " %s miesiąca";
    };
    pl.prototype.lastDay = function () {
        return "ostatni dzień";
    };
    pl.prototype.third = function () {
        return "trzeci";
    };
    pl.prototype.weekdayNearestDayX0 = function () {
        return "dzień roboczy najbliższy %s-ego dnia";
    };
    pl.prototype.commaStartingX0 = function () {
        return ", startowy %s";
    };
    pl.prototype.daysOfTheWeek = function () {
        return ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"];
    };
    pl.prototype.monthsOfTheYear = function () {
        return [
            "styczeń",
            "luty",
            "marzec",
            "kwiecień",
            "maj",
            "czerwiec",
            "lipiec",
            "sierpień",
            "wrzesień",
            "październik",
            "listopad",
            "grudzień"
        ];
    };
    return pl;
}());
exports.pl = pl;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var pt_BR = (function () {
    function pt_BR() {
    }
    pt_BR.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    pt_BR.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    pt_BR.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    pt_BR.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    pt_BR.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    pt_BR.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Ocorreu um erro ao gerar a descrição da expressão Cron.";
    };
    pt_BR.prototype.at = function () {
        return "às";
    };
    pt_BR.prototype.atSpace = function () {
        return "às ";
    };
    pt_BR.prototype.atX0 = function () {
        return "Às %s";
    };
    pt_BR.prototype.atX0MinutesPastTheHour = function () {
        return "aos %s minutos da hora";
    };
    pt_BR.prototype.atX0SecondsPastTheMinute = function () {
        return "aos %s segundos do minuto";
    };
    pt_BR.prototype.betweenX0AndX1 = function () {
        return "entre %s e %s";
    };
    pt_BR.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", entre os dias %s e %s do mês";
    };
    pt_BR.prototype.commaEveryDay = function () {
        return ", a cada dia";
    };
    pt_BR.prototype.commaEveryX0Days = function () {
        return ", a cada %s dias";
    };
    pt_BR.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", a cada %s dias de semana";
    };
    pt_BR.prototype.commaEveryX0Months = function () {
        return ", a cada %s meses";
    };
    pt_BR.prototype.commaOnDayX0OfTheMonth = function () {
        return ", no dia %s do mês";
    };
    pt_BR.prototype.commaOnlyInX0 = function () {
        return ", somente em %s";
    };
    pt_BR.prototype.commaOnlyOnX0 = function () {
        return ", somente de %s";
    };
    pt_BR.prototype.commaAndOnX0 = function () {
        return ", e de %s";
    };
    pt_BR.prototype.commaOnThe = function () {
        return ", na ";
    };
    pt_BR.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", no último dia do mês";
    };
    pt_BR.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", no último dia da semana do mês";
    };
    pt_BR.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s dias antes do último dia do mês";
    };
    pt_BR.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", na última %s do mês";
    };
    pt_BR.prototype.commaOnTheX0OfTheMonth = function () {
        return ", no %s do mês";
    };
    pt_BR.prototype.commaX0ThroughX1 = function () {
        return ", de %s a %s";
    };
    pt_BR.prototype.everyHour = function () {
        return "a cada hora";
    };
    pt_BR.prototype.everyMinute = function () {
        return "a cada minuto";
    };
    pt_BR.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "a cada minuto entre %s e %s";
    };
    pt_BR.prototype.everySecond = function () {
        return "a cada segundo";
    };
    pt_BR.prototype.everyX0Hours = function () {
        return "a cada %s horas";
    };
    pt_BR.prototype.everyX0Minutes = function () {
        return "a cada %s minutos";
    };
    pt_BR.prototype.everyX0Seconds = function () {
        return "a cada %s segundos";
    };
    pt_BR.prototype.fifth = function () {
        return "quinta";
    };
    pt_BR.prototype.first = function () {
        return "primeira";
    };
    pt_BR.prototype.firstWeekday = function () {
        return "primeiro dia da semana";
    };
    pt_BR.prototype.fourth = function () {
        return "quarta";
    };
    pt_BR.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "do minuto %s até %s de cada hora";
    };
    pt_BR.prototype.second = function () {
        return "segunda";
    };
    pt_BR.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "No segundo %s até %s de cada minuto";
    };
    pt_BR.prototype.spaceAnd = function () {
        return " e";
    };
    pt_BR.prototype.spaceX0OfTheMonth = function () {
        return " %s do mês";
    };
    pt_BR.prototype.lastDay = function () {
        return "o último dia";
    };
    pt_BR.prototype.third = function () {
        return "terceira";
    };
    pt_BR.prototype.weekdayNearestDayX0 = function () {
        return "dia da semana mais próximo do dia %s";
    };
    pt_BR.prototype.commaEveryX0Years = function () {
        return ", a cada %s anos";
    };
    pt_BR.prototype.commaStartingX0 = function () {
        return ", iniciando %s";
    };
    pt_BR.prototype.daysOfTheWeek = function () {
        return ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
    };
    pt_BR.prototype.monthsOfTheYear = function () {
        return [
            "janeiro",
            "fevereiro",
            "março",
            "abril",
            "maio",
            "junho",
            "julho",
            "agosto",
            "setembro",
            "outubro",
            "novembro",
            "dezembro"
        ];
    };
    return pt_BR;
}());
exports.pt_BR = pt_BR;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ro = (function () {
    function ro() {
    }
    ro.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    ro.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Eroare la generarea descrierii. Verificați sintaxa.";
    };
    ro.prototype.at = function () {
        return "La";
    };
    ro.prototype.atSpace = function () {
        return "La ";
    };
    ro.prototype.atX0 = function () {
        return "la %s";
    };
    ro.prototype.atX0MinutesPastTheHour = function () {
        return "la și %s minute";
    };
    ro.prototype.atX0SecondsPastTheMinute = function () {
        return "la și %s secunde";
    };
    ro.prototype.betweenX0AndX1 = function () {
        return "între %s și %s";
    };
    ro.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", între zilele %s și %s ale lunii";
    };
    ro.prototype.commaEveryDay = function () {
        return ", în fiecare zi";
    };
    ro.prototype.commaEveryX0Days = function () {
        return ", la fiecare %s zile";
    };
    ro.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", la fiecare a %s-a zi a săptămânii";
    };
    ro.prototype.commaEveryX0Months = function () {
        return ", la fiecare %s luni";
    };
    ro.prototype.commaEveryX0Years = function () {
        return ", o dată la %s ani";
    };
    ro.prototype.commaOnDayX0OfTheMonth = function () {
        return ", în ziua %s a lunii";
    };
    ro.prototype.commaOnlyInX0 = function () {
        return ", doar în %s";
    };
    ro.prototype.commaOnlyOnX0 = function () {
        return ", doar %s";
    };
    ro.prototype.commaAndOnX0 = function () {
        return ", și %s";
    };
    ro.prototype.commaOnThe = function () {
        return ", în ";
    };
    ro.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", în ultima zi a lunii";
    };
    ro.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", în ultima zi lucrătoare a lunii";
    };
    ro.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s zile înainte de ultima zi a lunii";
    };
    ro.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", în ultima %s a lunii";
    };
    ro.prototype.commaOnTheX0OfTheMonth = function () {
        return ", în %s a lunii";
    };
    ro.prototype.commaX0ThroughX1 = function () {
        return ", de %s până %s";
    };
    ro.prototype.everyHour = function () {
        return "în fiecare oră";
    };
    ro.prototype.everyMinute = function () {
        return "în fiecare minut";
    };
    ro.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "În fiecare minut între %s și %s";
    };
    ro.prototype.everySecond = function () {
        return "în fiecare secundă";
    };
    ro.prototype.everyX0Hours = function () {
        return "la fiecare %s ore";
    };
    ro.prototype.everyX0Minutes = function () {
        return "la fiecare %s minute";
    };
    ro.prototype.everyX0Seconds = function () {
        return "la fiecare %s secunde";
    };
    ro.prototype.fifth = function () {
        return "a cincea";
    };
    ro.prototype.first = function () {
        return "prima";
    };
    ro.prototype.firstWeekday = function () {
        return "prima zi a săptămânii";
    };
    ro.prototype.fourth = function () {
        return "a patra";
    };
    ro.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "între minutele %s și %s";
    };
    ro.prototype.second = function () {
        return "a doua";
    };
    ro.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "între secunda %s și secunda %s";
    };
    ro.prototype.spaceAnd = function () {
        return " și";
    };
    ro.prototype.spaceX0OfTheMonth = function () {
        return " %s a lunii";
    };
    ro.prototype.lastDay = function () {
        return "ultima zi";
    };
    ro.prototype.third = function () {
        return "a treia";
    };
    ro.prototype.weekdayNearestDayX0 = function () {
        return "cea mai apropiată zi a săptămânii de ziua %s";
    };
    ro.prototype.commaMonthX0ThroughMonthX1 = function () {
        return ", din %s până în %s";
    };
    ro.prototype.commaYearX0ThroughYearX1 = function () {
        return ", din %s până în %s";
    };
    ro.prototype.atX0MinutesPastTheHourGt20 = function () {
        return "la și %s de minute";
    };
    ro.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return "la și %s de secunde";
    };
    ro.prototype.commaStartingX0 = function () {
        return ", pornire %s";
    };
    ro.prototype.daysOfTheWeek = function () {
        return ["duminică", "luni", "marți", "miercuri", "joi", "vineri", "sâmbătă"];
    };
    ro.prototype.monthsOfTheYear = function () {
        return [
            "ianuarie",
            "februarie",
            "martie",
            "aprilie",
            "mai",
            "iunie",
            "iulie",
            "august",
            "septembrie",
            "octombrie",
            "noiembrie",
            "decembrie"
        ];
    };
    return ro;
}());
exports.ro = ro;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ru = (function () {
    function ru() {
    }
    ru.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    ru.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    ru.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    ru.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    ru.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    ru.prototype.everyMinute = function () {
        return "каждую минуту";
    };
    ru.prototype.everyHour = function () {
        return "каждый час";
    };
    ru.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Произошла ошибка во время генерации описания выражения. Проверьте синтаксис крон-выражения.";
    };
    ru.prototype.atSpace = function () {
        return "В ";
    };
    ru.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Каждую минуту с %s по %s";
    };
    ru.prototype.at = function () {
        return "В";
    };
    ru.prototype.spaceAnd = function () {
        return " и";
    };
    ru.prototype.everySecond = function () {
        return "каждую секунду";
    };
    ru.prototype.everyX0Seconds = function () {
        return "каждые %s секунд";
    };
    ru.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "секунды с %s по %s";
    };
    ru.prototype.atX0SecondsPastTheMinute = function () {
        return "в %s секунд";
    };
    ru.prototype.everyX0Minutes = function () {
        return "каждые %s минут";
    };
    ru.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "минуты с %s по %s";
    };
    ru.prototype.atX0MinutesPastTheHour = function () {
        return "в %s минут";
    };
    ru.prototype.everyX0Hours = function () {
        return "каждые %s часов";
    };
    ru.prototype.betweenX0AndX1 = function () {
        return "с %s по %s";
    };
    ru.prototype.atX0 = function () {
        return "в %s";
    };
    ru.prototype.commaEveryDay = function () {
        return ", каждый день";
    };
    ru.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", каждые %s дней недели";
    };
    ru.prototype.commaX0ThroughX1 = function () {
        return ", %s по %s";
    };
    ru.prototype.first = function () {
        return "первый";
    };
    ru.prototype.second = function () {
        return "второй";
    };
    ru.prototype.third = function () {
        return "третий";
    };
    ru.prototype.fourth = function () {
        return "четвертый";
    };
    ru.prototype.fifth = function () {
        return "пятый";
    };
    ru.prototype.commaOnThe = function () {
        return ", в ";
    };
    ru.prototype.spaceX0OfTheMonth = function () {
        return " %s месяца";
    };
    ru.prototype.lastDay = function () {
        return "последний день";
    };
    ru.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", в последний %s месяца";
    };
    ru.prototype.commaOnlyOnX0 = function () {
        return ", только в %s";
    };
    ru.prototype.commaAndOnX0 = function () {
        return ", и в %s";
    };
    ru.prototype.commaEveryX0Months = function () {
        return ", каждые %s месяцев";
    };
    ru.prototype.commaOnlyInX0 = function () {
        return ", только в %s";
    };
    ru.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", в последний день месяца";
    };
    ru.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", в последний будний день месяца";
    };
    ru.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s дней до последнего дня месяца";
    };
    ru.prototype.firstWeekday = function () {
        return "первый будний день";
    };
    ru.prototype.weekdayNearestDayX0 = function () {
        return "ближайший будний день к %s";
    };
    ru.prototype.commaOnTheX0OfTheMonth = function () {
        return ", в %s месяца";
    };
    ru.prototype.commaEveryX0Days = function () {
        return ", каждые %s дней";
    };
    ru.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", с %s по %s число месяца";
    };
    ru.prototype.commaOnDayX0OfTheMonth = function () {
        return ", в %s число месяца";
    };
    ru.prototype.commaEveryX0Years = function () {
        return ", каждые %s лет";
    };
    ru.prototype.commaStartingX0 = function () {
        return ", начало %s";
    };
    ru.prototype.daysOfTheWeek = function () {
        return ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"];
    };
    ru.prototype.monthsOfTheYear = function () {
        return [
            "январь",
            "февраль",
            "март",
            "апрель",
            "май",
            "июнь",
            "июль",
            "август",
            "сентябрь",
            "октябрь",
            "ноябрь",
            "декабрь"
        ];
    };
    return ru;
}());
exports.ru = ru;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tr = (function () {
    function tr() {
    }
    tr.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    tr.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    tr.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    tr.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    tr.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    tr.prototype.everyMinute = function () {
        return "her dakika";
    };
    tr.prototype.everyHour = function () {
        return "her saat";
    };
    tr.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "İfade açıklamasını oluştururken bir hata oluştu. Cron ifadesini gözden geçirin.";
    };
    tr.prototype.atSpace = function () {
        return "Saat ";
    };
    tr.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Saat %s ve %s arasındaki her dakika";
    };
    tr.prototype.at = function () {
        return "Saat";
    };
    tr.prototype.spaceAnd = function () {
        return " ve";
    };
    tr.prototype.everySecond = function () {
        return "her saniye";
    };
    tr.prototype.everyX0Seconds = function () {
        return "her %s saniyede bir";
    };
    tr.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "dakikaların %s. ve %s. saniyeleri arası";
    };
    tr.prototype.atX0SecondsPastTheMinute = function () {
        return "dakikaların %s. saniyesinde";
    };
    tr.prototype.everyX0Minutes = function () {
        return "her %s dakikada bir";
    };
    tr.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "saatlerin %s. ve %s. dakikaları arası";
    };
    tr.prototype.atX0MinutesPastTheHour = function () {
        return "saatlerin %s. dakikasında";
    };
    tr.prototype.everyX0Hours = function () {
        return "her %s saatte";
    };
    tr.prototype.betweenX0AndX1 = function () {
        return "%s ile %s arasında";
    };
    tr.prototype.atX0 = function () {
        return "saat %s";
    };
    tr.prototype.commaEveryDay = function () {
        return ", her gün";
    };
    tr.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", ayın her %s günü";
    };
    tr.prototype.commaX0ThroughX1 = function () {
        return ", %s ile %s arasında";
    };
    tr.prototype.first = function () {
        return "ilk";
    };
    tr.prototype.second = function () {
        return "ikinci";
    };
    tr.prototype.third = function () {
        return "üçüncü";
    };
    tr.prototype.fourth = function () {
        return "dördüncü";
    };
    tr.prototype.fifth = function () {
        return "beşinci";
    };
    tr.prototype.commaOnThe = function () {
        return ", ayın ";
    };
    tr.prototype.spaceX0OfTheMonth = function () {
        return " %s günü";
    };
    tr.prototype.lastDay = function () {
        return "son gün";
    };
    tr.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", ayın son %s günü";
    };
    tr.prototype.commaOnlyOnX0 = function () {
        return ", sadece %s günü";
    };
    tr.prototype.commaAndOnX0 = function () {
        return ", ve %s";
    };
    tr.prototype.commaEveryX0Months = function () {
        return ", %s ayda bir";
    };
    tr.prototype.commaOnlyInX0 = function () {
        return ", sadece %s için";
    };
    tr.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", ayın son günü";
    };
    tr.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", ayın son iş günü";
    };
    tr.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s ayın son gününden önceki günler";
    };
    tr.prototype.firstWeekday = function () {
        return "ilk iş günü";
    };
    tr.prototype.weekdayNearestDayX0 = function () {
        return "%s. günü sonrasındaki ilk iş günü";
    };
    tr.prototype.commaOnTheX0OfTheMonth = function () {
        return ", ayın %s";
    };
    tr.prototype.commaEveryX0Days = function () {
        return ", %s günde bir";
    };
    tr.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", ayın %s. ve %s. günleri arası";
    };
    tr.prototype.commaOnDayX0OfTheMonth = function () {
        return ", ayın %s. günü";
    };
    tr.prototype.commaEveryX0Years = function () {
        return ", %s yılda bir";
    };
    tr.prototype.commaStartingX0 = function () {
        return ", başlangıç %s";
    };
    tr.prototype.daysOfTheWeek = function () {
        return ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
    };
    tr.prototype.monthsOfTheYear = function () {
        return [
            "Ocak",
            "Şubat",
            "Mart",
            "Nisan",
            "Mayıs",
            "Haziran",
            "Temmuz",
            "Ağustos",
            "Eylül",
            "Ekim",
            "Kasım",
            "Aralık"
        ];
    };
    return tr;
}());
exports.tr = tr;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var uk = (function () {
    function uk() {
    }
    uk.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    uk.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    uk.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    uk.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    uk.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    uk.prototype.everyMinute = function () {
        return "щохвилини";
    };
    uk.prototype.everyHour = function () {
        return "щогодини";
    };
    uk.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "ВІдбулася помилка підчас генерації опису. Перевірта правильність написання cron виразу.";
    };
    uk.prototype.atSpace = function () {
        return "О ";
    };
    uk.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Щохвилини між %s та %s";
    };
    uk.prototype.at = function () {
        return "О";
    };
    uk.prototype.spaceAnd = function () {
        return " та";
    };
    uk.prototype.everySecond = function () {
        return "Щосекунди";
    };
    uk.prototype.everyX0Seconds = function () {
        return "кожні %s секунд";
    };
    uk.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "з %s по %s секунду";
    };
    uk.prototype.atX0SecondsPastTheMinute = function () {
        return "о %s секунді";
    };
    uk.prototype.everyX0Minutes = function () {
        return "кожні %s хвилин";
    };
    uk.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "з %s по %s хвилину";
    };
    uk.prototype.atX0MinutesPastTheHour = function () {
        return "о %s хвилині";
    };
    uk.prototype.everyX0Hours = function () {
        return "кожні %s годин";
    };
    uk.prototype.betweenX0AndX1 = function () {
        return "між %s та %s";
    };
    uk.prototype.atX0 = function () {
        return "о %s";
    };
    uk.prototype.commaEveryDay = function () {
        return ", щоденно";
    };
    uk.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", кожен %s день тижня";
    };
    uk.prototype.commaX0ThroughX1 = function () {
        return ", %s по %s";
    };
    uk.prototype.first = function () {
        return "перший";
    };
    uk.prototype.second = function () {
        return "другий";
    };
    uk.prototype.third = function () {
        return "третій";
    };
    uk.prototype.fourth = function () {
        return "четвертий";
    };
    uk.prototype.fifth = function () {
        return "п'ятий";
    };
    uk.prototype.commaOnThe = function () {
        return ", в ";
    };
    uk.prototype.spaceX0OfTheMonth = function () {
        return " %s місяця";
    };
    uk.prototype.lastDay = function () {
        return "останній день";
    };
    uk.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", в останній %s місяця";
    };
    uk.prototype.commaOnlyOnX0 = function () {
        return ", тільки в %s";
    };
    uk.prototype.commaAndOnX0 = function () {
        return ", і в %s";
    };
    uk.prototype.commaEveryX0Months = function () {
        return ", кожен %s місяць";
    };
    uk.prototype.commaOnlyInX0 = function () {
        return ", тільки в %s";
    };
    uk.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", в останній день місяця";
    };
    uk.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", в останній будень місяця";
    };
    uk.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s днів до останнього дня місяця";
    };
    uk.prototype.firstWeekday = function () {
        return "перший будень";
    };
    uk.prototype.weekdayNearestDayX0 = function () {
        return "будень найближчий до %s дня";
    };
    uk.prototype.commaOnTheX0OfTheMonth = function () {
        return ", в %s місяця";
    };
    uk.prototype.commaEveryX0Days = function () {
        return ", кожен %s день";
    };
    uk.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", між %s та %s днями місяця";
    };
    uk.prototype.commaOnDayX0OfTheMonth = function () {
        return ", на %s день місяця";
    };
    uk.prototype.commaEveryX0Years = function () {
        return ", кожні %s роки";
    };
    uk.prototype.commaStartingX0 = function () {
        return ", початок %s";
    };
    uk.prototype.daysOfTheWeek = function () {
        return ["неділя", "понеділок", "вівторок", "середа", "четвер", "п'ятниця", "субота"];
    };
    uk.prototype.monthsOfTheYear = function () {
        return [
            "січень",
            "лютий",
            "березень",
            "квітень",
            "травень",
            "червень",
            "липень",
            "серпень",
            "вересень",
            "жовтень",
            "листопад",
            "грудень"
        ];
    };
    return uk;
}());
exports.uk = uk;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var zh_CN = (function () {
    function zh_CN() {
    }
    zh_CN.prototype.setPeriodBeforeTime = function () {
        return true;
    };
    zh_CN.prototype.pm = function () {
        return "下午";
    };
    zh_CN.prototype.am = function () {
        return "上午";
    };
    zh_CN.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    zh_CN.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    zh_CN.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    zh_CN.prototype.commaYearX0ThroughYearX1 = function () {
        return ", 从%s年至%s年";
    };
    zh_CN.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    zh_CN.prototype.everyMinute = function () {
        return "每分钟";
    };
    zh_CN.prototype.everyHour = function () {
        return "每小时";
    };
    zh_CN.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "生成表达式描述时发生了错误，请检查cron表达式语法。";
    };
    zh_CN.prototype.atSpace = function () {
        return "在";
    };
    zh_CN.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "在 %s 至 %s 之间的每分钟";
    };
    zh_CN.prototype.at = function () {
        return "在";
    };
    zh_CN.prototype.spaceAnd = function () {
        return " 和";
    };
    zh_CN.prototype.everySecond = function () {
        return "每秒";
    };
    zh_CN.prototype.everyX0Seconds = function () {
        return "每隔 %s 秒";
    };
    zh_CN.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "在每分钟的第 %s 到 %s 秒";
    };
    zh_CN.prototype.atX0SecondsPastTheMinute = function () {
        return "在每分钟的第 %s 秒";
    };
    zh_CN.prototype.everyX0Minutes = function () {
        return "每隔 %s 分钟";
    };
    zh_CN.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "在每小时的第 %s 到 %s 分钟";
    };
    zh_CN.prototype.atX0MinutesPastTheHour = function () {
        return "在每小时的第 %s 分钟";
    };
    zh_CN.prototype.everyX0Hours = function () {
        return "每隔 %s 小时";
    };
    zh_CN.prototype.betweenX0AndX1 = function () {
        return "在 %s 和 %s 之间";
    };
    zh_CN.prototype.atX0 = function () {
        return "在%s";
    };
    zh_CN.prototype.commaEveryDay = function () {
        return ", 每天";
    };
    zh_CN.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", 每周的每 %s 天";
    };
    zh_CN.prototype.commaX0ThroughX1 = function () {
        return ", %s至%s";
    };
    zh_CN.prototype.first = function () {
        return "第一个";
    };
    zh_CN.prototype.second = function () {
        return "第二个";
    };
    zh_CN.prototype.third = function () {
        return "第三个";
    };
    zh_CN.prototype.fourth = function () {
        return "第四个";
    };
    zh_CN.prototype.fifth = function () {
        return "第五个";
    };
    zh_CN.prototype.commaOnThe = function () {
        return ", 限每月的";
    };
    zh_CN.prototype.spaceX0OfTheMonth = function () {
        return "%s";
    };
    zh_CN.prototype.lastDay = function () {
        return "本月最后一天";
    };
    zh_CN.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", 限每月的最后一个%s";
    };
    zh_CN.prototype.commaOnlyOnX0 = function () {
        return ", 仅%s";
    };
    zh_CN.prototype.commaAndOnX0 = function () {
        return ", 并且为%s";
    };
    zh_CN.prototype.commaEveryX0Months = function () {
        return ", 每隔 %s 个月";
    };
    zh_CN.prototype.commaOnlyInX0 = function () {
        return ", 仅限%s";
    };
    zh_CN.prototype.commaOnlyInMonthX0 = function () {
        return ", 仅于%s份";
    };
    zh_CN.prototype.commaOnlyInYearX0 = function () {
        return ", 仅于 %s 年";
    };
    zh_CN.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", 限每月的最后一天";
    };
    zh_CN.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", 限每月的最后一个工作日";
    };
    zh_CN.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", 限每月最后%s天";
    };
    zh_CN.prototype.firstWeekday = function () {
        return "第一个工作日";
    };
    zh_CN.prototype.weekdayNearestDayX0 = function () {
        return "最接近 %s 号的工作日";
    };
    zh_CN.prototype.commaOnTheX0OfTheMonth = function () {
        return ", 限每月的%s";
    };
    zh_CN.prototype.commaEveryX0Days = function () {
        return ", 每隔 %s 天";
    };
    zh_CN.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", 限每月的 %s 至 %s 之间";
    };
    zh_CN.prototype.commaOnDayX0OfTheMonth = function () {
        return ", 限每月%s";
    };
    zh_CN.prototype.commaEveryX0Years = function () {
        return ", 每隔 %s 年";
    };
    zh_CN.prototype.commaStartingX0 = function () {
        return ", %s开始";
    };
    zh_CN.prototype.dayX0 = function () {
        return " %s 号";
    };
    zh_CN.prototype.daysOfTheWeek = function () {
        return ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    };
    zh_CN.prototype.monthsOfTheYear = function () {
        return ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
    };
    return zh_CN;
}());
exports.zh_CN = zh_CN;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var zh_TW = (function () {
    function zh_TW() {
    }
    zh_TW.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    zh_TW.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    zh_TW.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    zh_TW.prototype.commaYearX0ThroughYearX1 = function () {
        return ", 从%s年至%s年";
    };
    zh_TW.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    zh_TW.prototype.everyMinute = function () {
        return "每分鐘";
    };
    zh_TW.prototype.everyHour = function () {
        return "每小時";
    };
    zh_TW.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "產生正規表達式描述時發生了錯誤，請檢查 cron 表達式語法。";
    };
    zh_TW.prototype.atSpace = function () {
        return "在 ";
    };
    zh_TW.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "在 %s 和 %s 之間的每分鐘";
    };
    zh_TW.prototype.at = function () {
        return "在";
    };
    zh_TW.prototype.spaceAnd = function () {
        return " 和";
    };
    zh_TW.prototype.everySecond = function () {
        return "每秒";
    };
    zh_TW.prototype.everyX0Seconds = function () {
        return "每 %s 秒";
    };
    zh_TW.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "在每分鐘的 %s 到 %s 秒";
    };
    zh_TW.prototype.atX0SecondsPastTheMinute = function () {
        return "在每分鐘的 %s 秒";
    };
    zh_TW.prototype.everyX0Minutes = function () {
        return "每 %s 分鐘";
    };
    zh_TW.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "在每小時的 %s 到 %s 分鐘";
    };
    zh_TW.prototype.atX0MinutesPastTheHour = function () {
        return "在每小時的 %s 分";
    };
    zh_TW.prototype.everyX0Hours = function () {
        return "每 %s 小時";
    };
    zh_TW.prototype.betweenX0AndX1 = function () {
        return "在 %s 和 %s 之間";
    };
    zh_TW.prototype.atX0 = function () {
        return "在 %s";
    };
    zh_TW.prototype.commaEveryDay = function () {
        return ", 每天";
    };
    zh_TW.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", 每週的每 %s 天";
    };
    zh_TW.prototype.commaX0ThroughX1 = function () {
        return ", %s 到 %s";
    };
    zh_TW.prototype.first = function () {
        return "第一個";
    };
    zh_TW.prototype.second = function () {
        return "第二個";
    };
    zh_TW.prototype.third = function () {
        return "第三個";
    };
    zh_TW.prototype.fourth = function () {
        return "第四個";
    };
    zh_TW.prototype.fifth = function () {
        return "第五個";
    };
    zh_TW.prototype.commaOnThe = function () {
        return ", 在每月 ";
    };
    zh_TW.prototype.spaceX0OfTheMonth = function () {
        return "%s ";
    };
    zh_TW.prototype.lastDay = function () {
        return "最後一天";
    };
    zh_TW.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", 每月的最後一個 %s ";
    };
    zh_TW.prototype.commaOnlyOnX0 = function () {
        return ", 僅在 %s";
    };
    zh_TW.prototype.commaAndOnX0 = function () {
        return ", 和 %s";
    };
    zh_TW.prototype.commaEveryX0Months = function () {
        return ", 每 %s 月";
    };
    zh_TW.prototype.commaOnlyInX0 = function () {
        return ", 僅在 %s";
    };
    zh_TW.prototype.commaOnlyInMonthX0 = function () {
        return ", 僅在%s";
    };
    zh_TW.prototype.commaOnlyInYearX0 = function () {
        return ", 僅在 %s 年";
    };
    zh_TW.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", 每月的最後一天";
    };
    zh_TW.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", 每月的最後一個工作日";
    };
    zh_TW.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s 這個月的最後一天的前幾天";
    };
    zh_TW.prototype.firstWeekday = function () {
        return "第一個工作日";
    };
    zh_TW.prototype.weekdayNearestDayX0 = function () {
        return "最接近 %s 號的工作日";
    };
    zh_TW.prototype.commaOnTheX0OfTheMonth = function () {
        return ", 每月的 %s ";
    };
    zh_TW.prototype.commaEveryX0Days = function () {
        return ", 每 %s 天";
    };
    zh_TW.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", 在每月的 %s 和 %s 之間";
    };
    zh_TW.prototype.commaOnDayX0OfTheMonth = function () {
        return ", 每月的 %s";
    };
    zh_TW.prototype.commaEveryX0Years = function () {
        return ", 每 %s 年";
    };
    zh_TW.prototype.commaStartingX0 = function () {
        return ", %s 開始";
    };
    zh_TW.prototype.dayX0 = function () {
        return " %s 號";
    };
    zh_TW.prototype.daysOfTheWeek = function () {
        return ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    };
    zh_TW.prototype.monthsOfTheYear = function () {
        return ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
    };
    return zh_TW;
}());
exports.zh_TW = zh_TW;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ja = (function () {
    function ja() {
    }
    ja.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    ja.prototype.everyMinute = function () {
        return "毎分";
    };
    ja.prototype.everyHour = function () {
        return "毎時";
    };
    ja.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "式の記述を生成する際にエラーが発生しました。Cron 式の構文を確認してください。";
    };
    ja.prototype.atSpace = function () {
        return "次において実施";
    };
    ja.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "%s から %s まで毎分";
    };
    ja.prototype.at = function () {
        return "次において実施";
    };
    ja.prototype.spaceAnd = function () {
        return "と";
    };
    ja.prototype.everySecond = function () {
        return "毎秒";
    };
    ja.prototype.everyX0Seconds = function () {
        return "%s 秒ごと";
    };
    ja.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "毎分 %s 秒から %s 秒まで";
    };
    ja.prototype.atX0SecondsPastTheMinute = function () {
        return "毎分 %s 秒過ぎ";
    };
    ja.prototype.everyX0Minutes = function () {
        return "%s 分ごと";
    };
    ja.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "毎時 %s 分から %s 分まで";
    };
    ja.prototype.atX0MinutesPastTheHour = function () {
        return "毎時 %s 分過ぎ";
    };
    ja.prototype.everyX0Hours = function () {
        return "%s 時間ごと";
    };
    ja.prototype.betweenX0AndX1 = function () {
        return "%s と %s の間";
    };
    ja.prototype.atX0 = function () {
        return "次において実施 %s";
    };
    ja.prototype.commaEveryDay = function () {
        return "、毎日";
    };
    ja.prototype.commaEveryX0DaysOfTheWeek = function () {
        return "、週のうち %s 日ごと";
    };
    ja.prototype.commaX0ThroughX1 = function () {
        return "、%s から %s まで";
    };
    ja.prototype.first = function () {
        return "1 番目";
    };
    ja.prototype.second = function () {
        return "2 番目";
    };
    ja.prototype.third = function () {
        return "3 番目";
    };
    ja.prototype.fourth = function () {
        return "4 番目";
    };
    ja.prototype.fifth = function () {
        return "5 番目";
    };
    ja.prototype.commaOnThe = function () {
        return "次に";
    };
    ja.prototype.spaceX0OfTheMonth = function () {
        return "月のうち %s";
    };
    ja.prototype.commaOnTheLastX0OfTheMonth = function () {
        return "月の最後の %s に";
    };
    ja.prototype.commaOnlyOnX0 = function () {
        return "%s にのみ";
    };
    ja.prototype.commaEveryX0Months = function () {
        return "、%s か月ごと";
    };
    ja.prototype.commaOnlyInX0 = function () {
        return "%s でのみ";
    };
    ja.prototype.commaOnTheLastDayOfTheMonth = function () {
        return "次の最終日に";
    };
    ja.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return "月の最後の平日に";
    };
    ja.prototype.firstWeekday = function () {
        return "最初の平日";
    };
    ja.prototype.weekdayNearestDayX0 = function () {
        return "%s 日の直近の平日";
    };
    ja.prototype.commaOnTheX0OfTheMonth = function () {
        return "月の %s に";
    };
    ja.prototype.commaEveryX0Days = function () {
        return "、%s 日ごと";
    };
    ja.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return "、月の %s 日から %s 日の間";
    };
    ja.prototype.commaOnDayX0OfTheMonth = function () {
        return "、月の %s 日目";
    };
    ja.prototype.spaceAndSpace = function () {
        return "と";
    };
    ja.prototype.commaEveryMinute = function () {
        return "、毎分";
    };
    ja.prototype.commaEveryHour = function () {
        return "、毎時";
    };
    ja.prototype.commaEveryX0Years = function () {
        return "、%s 年ごと";
    };
    ja.prototype.commaStartingX0 = function () {
        return "、%s に開始";
    };
    ja.prototype.aMPeriod = function () {
        return "AM";
    };
    ja.prototype.pMPeriod = function () {
        return "PM";
    };
    ja.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return "月の最終日の %s 日前";
    };
    ja.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    ja.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    ja.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    ja.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    ja.prototype.lastDay = function () {
        return "最終日";
    };
    ja.prototype.commaAndOnX0 = function () {
        return "、〜と %s";
    };
    ja.prototype.daysOfTheWeek = function () {
        return ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"];
    };
    ja.prototype.monthsOfTheYear = function () {
        return ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
    };
    return ja;
}());
exports.ja = ja;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var he = (function () {
    function he() {
    }
    he.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    he.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    he.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    he.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    he.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    he.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "אירעה שגיאה בעת יצירת תיאור הביטוי. בדוק את תחביר הביטוי cron.";
    };
    he.prototype.everyMinute = function () {
        return "כל דקה";
    };
    he.prototype.everyHour = function () {
        return "כל שעה";
    };
    he.prototype.atSpace = function () {
        return "ב ";
    };
    he.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "כל דקה %s עד %s";
    };
    he.prototype.at = function () {
        return "ב";
    };
    he.prototype.spaceAnd = function () {
        return " ו";
    };
    he.prototype.everySecond = function () {
        return "כל שניה";
    };
    he.prototype.everyX0Seconds = function () {
        return "כל %s שניות";
    };
    he.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "%s עד %s שניות של הדקה";
    };
    he.prototype.atX0SecondsPastTheMinute = function () {
        return "ב %s שניות של הדקה";
    };
    he.prototype.everyX0Minutes = function () {
        return "כל %s דקות";
    };
    he.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "%s עד %s דקות של השעה";
    };
    he.prototype.atX0MinutesPastTheHour = function () {
        return "ב %s דקות של השעה";
    };
    he.prototype.everyX0Hours = function () {
        return "כל %s שעות";
    };
    he.prototype.betweenX0AndX1 = function () {
        return "%s עד %s";
    };
    he.prototype.atX0 = function () {
        return "ב %s";
    };
    he.prototype.commaEveryDay = function () {
        return ", כל יום";
    };
    he.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", כל %s ימים בשבוע";
    };
    he.prototype.commaX0ThroughX1 = function () {
        return ", %s עד %s";
    };
    he.prototype.first = function () {
        return "ראשון";
    };
    he.prototype.second = function () {
        return "שני";
    };
    he.prototype.third = function () {
        return "שלישי";
    };
    he.prototype.fourth = function () {
        return "רביעי";
    };
    he.prototype.fifth = function () {
        return "חמישי";
    };
    he.prototype.commaOnThe = function () {
        return ", ב ";
    };
    he.prototype.spaceX0OfTheMonth = function () {
        return " %s של החודש";
    };
    he.prototype.lastDay = function () {
        return "היום האחרון";
    };
    he.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", רק ב %s של החודש";
    };
    he.prototype.commaOnlyOnX0 = function () {
        return ", רק ב %s";
    };
    he.prototype.commaAndOnX0 = function () {
        return ", וב %s";
    };
    he.prototype.commaEveryX0Months = function () {
        return ", כל %s חודשים";
    };
    he.prototype.commaOnlyInX0 = function () {
        return ", רק ב %s";
    };
    he.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", ביום האחרון של החודש";
    };
    he.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", ביום החול האחרון של החודש";
    };
    he.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s ימים לפני היום האחרון בחודש";
    };
    he.prototype.firstWeekday = function () {
        return "יום החול הראשון";
    };
    he.prototype.weekdayNearestDayX0 = function () {
        return "יום החול הראשון הקרוב אל %s";
    };
    he.prototype.commaOnTheX0OfTheMonth = function () {
        return ", ביום ה%s של החודש";
    };
    he.prototype.commaEveryX0Days = function () {
        return ", כל %s ימים";
    };
    he.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", בין היום ה%s וה%s של החודש";
    };
    he.prototype.commaOnDayX0OfTheMonth = function () {
        return ", ביום ה%s של החודש";
    };
    he.prototype.commaEveryX0Years = function () {
        return ", כל %s שנים";
    };
    he.prototype.commaStartingX0 = function () {
        return ", החל מ %s";
    };
    he.prototype.daysOfTheWeek = function () {
        return ["יום ראשון", "יום שני", "יום שלישי", "יום רביעי", "יום חמישי", "יום שישי", "יום שבת"];
    };
    he.prototype.monthsOfTheYear = function () {
        return [
            "ינואר",
            "פברואר",
            "מרץ",
            "אפריל",
            "מאי",
            "יוני",
            "יולי",
            "אוגוסט",
            "ספטמבר",
            "אוקטובר",
            "נובמבר",
            "דצמבר"
        ];
    };
    return he;
}());
exports.he = he;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cs = (function () {
    function cs() {
    }
    cs.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    cs.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    cs.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    cs.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    cs.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    cs.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Při vytváření popisu došlo k chybě. Zkontrolujte prosím správnost syntaxe cronu.";
    };
    cs.prototype.everyMinute = function () {
        return "každou minutu";
    };
    cs.prototype.everyHour = function () {
        return "každou hodinu";
    };
    cs.prototype.atSpace = function () {
        return "V ";
    };
    cs.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Každou minutu mezi %s a %s";
    };
    cs.prototype.at = function () {
        return "V";
    };
    cs.prototype.spaceAnd = function () {
        return " a";
    };
    cs.prototype.everySecond = function () {
        return "každou sekundu";
    };
    cs.prototype.everyX0Seconds = function () {
        return "každých %s sekund";
    };
    cs.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "sekundy od %s do %s";
    };
    cs.prototype.atX0SecondsPastTheMinute = function () {
        return "v %s sekund";
    };
    cs.prototype.everyX0Minutes = function () {
        return "každých %s minut";
    };
    cs.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minuty od %s do %s";
    };
    cs.prototype.atX0MinutesPastTheHour = function () {
        return "v %s minut";
    };
    cs.prototype.everyX0Hours = function () {
        return "každých %s hodin";
    };
    cs.prototype.betweenX0AndX1 = function () {
        return "mezi %s a %s";
    };
    cs.prototype.atX0 = function () {
        return "v %s";
    };
    cs.prototype.commaEveryDay = function () {
        return ", každý den";
    };
    cs.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", každých %s dní v týdnu";
    };
    cs.prototype.commaX0ThroughX1 = function () {
        return ", od %s do %s";
    };
    cs.prototype.first = function () {
        return "první";
    };
    cs.prototype.second = function () {
        return "druhý";
    };
    cs.prototype.third = function () {
        return "třetí";
    };
    cs.prototype.fourth = function () {
        return "čtvrtý";
    };
    cs.prototype.fifth = function () {
        return "pátý";
    };
    cs.prototype.commaOnThe = function () {
        return ", ";
    };
    cs.prototype.spaceX0OfTheMonth = function () {
        return " %s v měsíci";
    };
    cs.prototype.lastDay = function () {
        return "poslední den";
    };
    cs.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", poslední %s v měsíci";
    };
    cs.prototype.commaOnlyOnX0 = function () {
        return ", pouze v %s";
    };
    cs.prototype.commaAndOnX0 = function () {
        return ", a v %s";
    };
    cs.prototype.commaEveryX0Months = function () {
        return ", každých %s měsíců";
    };
    cs.prototype.commaOnlyInX0 = function () {
        return ", pouze v %s";
    };
    cs.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", poslední den v měsíci";
    };
    cs.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", poslední pracovní den v měsíci";
    };
    cs.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s dní před posledním dnem v měsíci";
    };
    cs.prototype.firstWeekday = function () {
        return "první pracovní den";
    };
    cs.prototype.weekdayNearestDayX0 = function () {
        return "pracovní den nejblíže %s. dni";
    };
    cs.prototype.commaOnTheX0OfTheMonth = function () {
        return ", v %s v měsíci";
    };
    cs.prototype.commaEveryX0Days = function () {
        return ", každých %s dnů";
    };
    cs.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", mezi dny %s a %s v měsíci";
    };
    cs.prototype.commaOnDayX0OfTheMonth = function () {
        return ", %s. den v měsíci";
    };
    cs.prototype.commaEveryX0Years = function () {
        return ", každých %s roků";
    };
    cs.prototype.commaStartingX0 = function () {
        return ", začínající %s";
    };
    cs.prototype.daysOfTheWeek = function () {
        return ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"];
    };
    cs.prototype.monthsOfTheYear = function () {
        return [
            "Leden",
            "Únor",
            "Březen",
            "Duben",
            "Květen",
            "Červen",
            "Červenec",
            "Srpen",
            "Září",
            "Říjen",
            "Listopad",
            "Prosinec"
        ];
    };
    return cs;
}());
exports.cs = cs;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var sk = (function () {
    function sk() {
    }
    sk.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    sk.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    sk.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    sk.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    sk.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    sk.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Pri vytváraní popisu došlo k chybe. Skontrolujte prosím správnosť syntaxe cronu.";
    };
    sk.prototype.everyMinute = function () {
        return "každú minútu";
    };
    sk.prototype.everyHour = function () {
        return "každú hodinu";
    };
    sk.prototype.atSpace = function () {
        return "V ";
    };
    sk.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Každú minútu medzi %s a %s";
    };
    sk.prototype.at = function () {
        return "V";
    };
    sk.prototype.spaceAnd = function () {
        return " a";
    };
    sk.prototype.everySecond = function () {
        return "každú sekundu";
    };
    sk.prototype.everyX0Seconds = function () {
        return "každých %s sekúnd";
    };
    sk.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "sekundy od %s do %s";
    };
    sk.prototype.atX0SecondsPastTheMinute = function () {
        return "v %s sekúnd";
    };
    sk.prototype.everyX0Minutes = function () {
        return "každých %s minút";
    };
    sk.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minúty od %s do %s";
    };
    sk.prototype.atX0MinutesPastTheHour = function () {
        return "v %s minút";
    };
    sk.prototype.everyX0Hours = function () {
        return "každých %s hodín";
    };
    sk.prototype.betweenX0AndX1 = function () {
        return "medzi %s a %s";
    };
    sk.prototype.atX0 = function () {
        return "v %s";
    };
    sk.prototype.commaEveryDay = function () {
        return ", každý deň";
    };
    sk.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", každých %s dní v týždni";
    };
    sk.prototype.commaX0ThroughX1 = function () {
        return ", od %s do %s";
    };
    sk.prototype.first = function () {
        return "prvý";
    };
    sk.prototype.second = function () {
        return "druhý";
    };
    sk.prototype.third = function () {
        return "tretí";
    };
    sk.prototype.fourth = function () {
        return "štvrtý";
    };
    sk.prototype.fifth = function () {
        return "piaty";
    };
    sk.prototype.commaOnThe = function () {
        return ", ";
    };
    sk.prototype.spaceX0OfTheMonth = function () {
        return " %s v mesiaci";
    };
    sk.prototype.lastDay = function () {
        return "posledný deň";
    };
    sk.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", posledný %s v mesiaci";
    };
    sk.prototype.commaOnlyOnX0 = function () {
        return ", iba v %s";
    };
    sk.prototype.commaAndOnX0 = function () {
        return ", a v %s";
    };
    sk.prototype.commaEveryX0Months = function () {
        return ", každých %s mesiacov";
    };
    sk.prototype.commaOnlyInX0 = function () {
        return ", iba v %s";
    };
    sk.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", posledný deň v mesiaci";
    };
    sk.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", posledný pracovný deň v mesiaci";
    };
    sk.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s dní pred posledným dňom v mesiaci";
    };
    sk.prototype.firstWeekday = function () {
        return "prvý pracovný deň";
    };
    sk.prototype.weekdayNearestDayX0 = function () {
        return "pracovný deň najbližšie %s. dňu";
    };
    sk.prototype.commaOnTheX0OfTheMonth = function () {
        return ", v %s v mesiaci";
    };
    sk.prototype.commaEveryX0Days = function () {
        return ", každých %s dní";
    };
    sk.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", medzi dňami %s a %s v mesiaci";
    };
    sk.prototype.commaOnDayX0OfTheMonth = function () {
        return ", %s. deň v mesiaci";
    };
    sk.prototype.commaEveryX0Years = function () {
        return ", každých %s rokov";
    };
    sk.prototype.commaStartingX0 = function () {
        return ", začínajúcich %s";
    };
    sk.prototype.daysOfTheWeek = function () {
        return ["Nedeľa", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"];
    };
    sk.prototype.monthsOfTheYear = function () {
        return [
            "Január",
            "Február",
            "Marec",
            "Apríl",
            "Máj",
            "Jún",
            "Júl",
            "August",
            "September",
            "Október",
            "November",
            "December"
        ];
    };
    return sk;
}());
exports.sk = sk;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var fi = (function () {
    function fi() {
    }
    fi.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    fi.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Virhe kuvauksen generoinnissa. Tarkista cron-syntaksi.";
    };
    fi.prototype.at = function () {
        return "Klo";
    };
    fi.prototype.atSpace = function () {
        return "Klo ";
    };
    fi.prototype.atX0 = function () {
        return "klo %s";
    };
    fi.prototype.atX0MinutesPastTheHour = function () {
        return "%s minuuttia yli";
    };
    fi.prototype.atX0MinutesPastTheHourGt20 = function () {
        return "%s minuuttia yli";
    };
    fi.prototype.atX0SecondsPastTheMinute = function () {
        return "%s sekunnnin jälkeen";
    };
    fi.prototype.betweenX0AndX1 = function () {
        return "%s - %s välillä";
    };
    fi.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", kuukauden päivien %s ja %s välillä";
    };
    fi.prototype.commaEveryDay = function () {
        return ", joka päivä";
    };
    fi.prototype.commaEveryHour = function () {
        return ", joka tunti";
    };
    fi.prototype.commaEveryMinute = function () {
        return ", joka minuutti";
    };
    fi.prototype.commaEveryX0Days = function () {
        return ", joka %s. päivä";
    };
    fi.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", joka %s. viikonpäivä";
    };
    fi.prototype.commaEveryX0Months = function () {
        return ", joka %s. kuukausi";
    };
    fi.prototype.commaEveryX0Years = function () {
        return ", joka %s. vuosi";
    };
    fi.prototype.commaOnDayX0OfTheMonth = function () {
        return ", kuukauden %s päivä";
    };
    fi.prototype.commaOnlyInX0 = function () {
        return ", vain %s";
    };
    fi.prototype.commaOnlyOnX0 = function () {
        return ", vain %s";
    };
    fi.prototype.commaOnThe = function () {
        return ",";
    };
    fi.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", kuukauden viimeisenä päivänä";
    };
    fi.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", kuukauden viimeisenä viikonpäivänä";
    };
    fi.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", kuukauden viimeinen %s";
    };
    fi.prototype.commaOnTheX0OfTheMonth = function () {
        return ", kuukauden %s";
    };
    fi.prototype.commaX0ThroughX1 = function () {
        return ", %s - %s";
    };
    fi.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s päivää ennen kuukauden viimeistä päivää";
    };
    fi.prototype.commaStartingX0 = function () {
        return ", alkaen %s";
    };
    fi.prototype.everyHour = function () {
        return "joka tunti";
    };
    fi.prototype.everyMinute = function () {
        return "joka minuutti";
    };
    fi.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "joka minuutti %s - %s välillä";
    };
    fi.prototype.everySecond = function () {
        return "joka sekunti";
    };
    fi.prototype.everyX0Hours = function () {
        return "joka %s. tunti";
    };
    fi.prototype.everyX0Minutes = function () {
        return "joka %s. minuutti";
    };
    fi.prototype.everyX0Seconds = function () {
        return "joka %s. sekunti";
    };
    fi.prototype.fifth = function () {
        return "viides";
    };
    fi.prototype.first = function () {
        return "ensimmäinen";
    };
    fi.prototype.firstWeekday = function () {
        return "ensimmäinen viikonpäivä";
    };
    fi.prototype.fourth = function () {
        return "neljäs";
    };
    fi.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "joka tunti minuuttien %s - %s välillä";
    };
    fi.prototype.second = function () {
        return "toinen";
    };
    fi.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "joka minuutti sekunttien %s - %s välillä";
    };
    fi.prototype.spaceAnd = function () {
        return " ja";
    };
    fi.prototype.spaceAndSpace = function () {
        return " ja ";
    };
    fi.prototype.spaceX0OfTheMonth = function () {
        return " %s kuukaudessa";
    };
    fi.prototype.third = function () {
        return "kolmas";
    };
    fi.prototype.weekdayNearestDayX0 = function () {
        return "viikonpäivä lähintä %s päivää";
    };
    fi.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    fi.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    fi.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    fi.prototype.lastDay = function () {
        return "viimeinen päivä";
    };
    fi.prototype.commaAndOnX0 = function () {
        return ", ja edelleen %s";
    };
    fi.prototype.daysOfTheWeek = function () {
        return ["sunnuntai", "maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai"];
    };
    fi.prototype.monthsOfTheYear = function () {
        return [
            "tammikuu",
            "helmikuu",
            "maaliskuu",
            "huhtikuu",
            "toukokuu",
            "kesäkuu",
            "heinäkuu",
            "elokuu",
            "syyskuu",
            "lokakuu",
            "marraskuu",
            "joulukuu"
        ];
    };
    return fi;
}());
exports.fi = fi;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var sl = (function () {
    function sl() {
    }
    sl.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    sl.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Pri generiranju opisa izraza je prišlo do napake. Preverite sintakso izraza cron.";
    };
    sl.prototype.at = function () {
        return "Ob";
    };
    sl.prototype.atSpace = function () {
        return "Ob ";
    };
    sl.prototype.atX0 = function () {
        return "ob %s";
    };
    sl.prototype.atX0MinutesPastTheHour = function () {
        return "ob %s.";
    };
    sl.prototype.atX0SecondsPastTheMinute = function () {
        return "ob %s.";
    };
    sl.prototype.betweenX0AndX1 = function () {
        return "od %s do %s";
    };
    sl.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", od %s. do %s. dne v mesecu";
    };
    sl.prototype.commaEveryDay = function () {
        return ", vsak dan";
    };
    sl.prototype.commaEveryX0Days = function () {
        return ", vsakih %s dni";
    };
    sl.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", vsakih %s dni v tednu";
    };
    sl.prototype.commaEveryX0Months = function () {
        return ", vsakih %s mesecev";
    };
    sl.prototype.commaEveryX0Years = function () {
        return ", vsakih %s let";
    };
    sl.prototype.commaOnDayX0OfTheMonth = function () {
        return ", %s. dan v mesecu";
    };
    sl.prototype.commaOnlyInX0 = function () {
        return ", samo v %s";
    };
    sl.prototype.commaOnlyOnX0 = function () {
        return ", samo v %s";
    };
    sl.prototype.commaAndOnX0 = function () {
        return "in naprej %s";
    };
    sl.prototype.commaOnThe = function () {
        return ", ";
    };
    sl.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", zadnji %s v mesecu";
    };
    sl.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", zadnji delovni dan v mesecu";
    };
    sl.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s dni pred koncem meseca";
    };
    sl.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", zadnji %s v mesecu";
    };
    sl.prototype.commaOnTheX0OfTheMonth = function () {
        return ", %s v mesecu";
    };
    sl.prototype.commaX0ThroughX1 = function () {
        return ", od %s do %s";
    };
    sl.prototype.everyHour = function () {
        return "vsako uro";
    };
    sl.prototype.everyMinute = function () {
        return "vsako minuto";
    };
    sl.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Vsako minuto od %s do %s";
    };
    sl.prototype.everySecond = function () {
        return "vsako sekundo";
    };
    sl.prototype.everyX0Hours = function () {
        return "vsakih %s ur";
    };
    sl.prototype.everyX0Minutes = function () {
        return "vsakih %s minut";
    };
    sl.prototype.everyX0Seconds = function () {
        return "vsakih %s sekund";
    };
    sl.prototype.fifth = function () {
        return "peti";
    };
    sl.prototype.first = function () {
        return "prvi";
    };
    sl.prototype.firstWeekday = function () {
        return "prvi delovni dan";
    };
    sl.prototype.fourth = function () {
        return "četrti";
    };
    sl.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minute od %s do %s";
    };
    sl.prototype.second = function () {
        return "drugi";
    };
    sl.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "sekunde od %s do %s";
    };
    sl.prototype.spaceAnd = function () {
        return " in";
    };
    sl.prototype.spaceX0OfTheMonth = function () {
        return " %s v mesecu";
    };
    sl.prototype.lastDay = function () {
        return "zadnjič";
    };
    sl.prototype.third = function () {
        return "tretji";
    };
    sl.prototype.weekdayNearestDayX0 = function () {
        return "delovni dan, najbližji %s. dnevu";
    };
    sl.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    sl.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    sl.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    sl.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    sl.prototype.commaStartingX0 = function () {
        return ", začenši %s";
    };
    sl.prototype.daysOfTheWeek = function () {
        return ["Nedelja", "Ponedeljek", "Torek", "Sreda", "Četrtek", "Petek", "Sobota"];
    };
    sl.prototype.monthsOfTheYear = function () {
        return [
            "januar",
            "februar",
            "marec",
            "april",
            "maj",
            "junij",
            "julij",
            "avgust",
            "september",
            "oktober",
            "november",
            "december"
        ];
    };
    return sl;
}());
exports.sl = sl;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var sw = (function () {
    function sw() {
    }
    sw.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    sw.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    sw.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    sw.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    sw.prototype.use24HourTimeFormatByDefault = function () {
        return false;
    };
    sw.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "Kuna tatizo wakati wa kutunga msemo. Angalia cron expression syntax.";
    };
    sw.prototype.everyMinute = function () {
        return "kila dakika";
    };
    sw.prototype.everyHour = function () {
        return "kila saa";
    };
    sw.prototype.atSpace = function () {
        return "Kwa ";
    };
    sw.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "Kila dakika kwanzia %s hadi %s";
    };
    sw.prototype.at = function () {
        return "Kwa";
    };
    sw.prototype.spaceAnd = function () {
        return " na";
    };
    sw.prototype.everySecond = function () {
        return "kila sekunde";
    };
    sw.prototype.everyX0Seconds = function () {
        return "kila sekunde %s";
    };
    sw.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "sekunde ya %s hadi %s baada ya dakika";
    };
    sw.prototype.atX0SecondsPastTheMinute = function () {
        return "at %s seconds past the minute";
        return "sekunde %s baada ya dakika";
    };
    sw.prototype.everyX0Minutes = function () {
        return "kila dakika %s";
    };
    sw.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "minutes %s through %s past the hour";
    };
    sw.prototype.atX0MinutesPastTheHour = function () {
        return "at %s minutes past the hour";
    };
    sw.prototype.everyX0Hours = function () {
        return "every %s hours";
    };
    sw.prototype.betweenX0AndX1 = function () {
        return "kati ya %s na %s";
    };
    sw.prototype.atX0 = function () {
        return "kwenye %s";
    };
    sw.prototype.commaEveryDay = function () {
        return ", kila siku";
    };
    sw.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", kila siku %s ya wiki";
    };
    sw.prototype.commaX0ThroughX1 = function () {
        return ", %s hadi %s";
    };
    sw.prototype.first = function () {
        return "ya kwanza";
    };
    sw.prototype.second = function () {
        return "ya pili";
    };
    sw.prototype.third = function () {
        return "ya tatu";
    };
    sw.prototype.fourth = function () {
        return "ya nne";
    };
    sw.prototype.fifth = function () {
        return "ya tano";
    };
    sw.prototype.commaOnThe = function () {
        return ", kwenye ";
    };
    sw.prototype.spaceX0OfTheMonth = function () {
        return " siku %s ya mwezi";
    };
    sw.prototype.lastDay = function () {
        return "siku ya mwisho";
    };
    sw.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", siku ya %s ya mwezi";
    };
    sw.prototype.commaOnlyOnX0 = function () {
        return ", kwa %s tu";
    };
    sw.prototype.commaAndOnX0 = function () {
        return ", na pia %s";
    };
    sw.prototype.commaEveryX0Months = function () {
        return ", kila mwezi wa %s";
    };
    sw.prototype.commaOnlyInX0 = function () {
        return ", kwa %s tu";
    };
    sw.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", siku ya mwisho wa mwezi";
    };
    sw.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", wikendi ya mwisho wa mwezi";
    };
    sw.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", siku ya %s kabla ya siku ya mwisho wa mwezi";
    };
    sw.prototype.firstWeekday = function () {
        return "siku za kazi ya kwanza";
    };
    sw.prototype.weekdayNearestDayX0 = function () {
        return "siku ya kazi karibu na siku ya %s";
    };
    sw.prototype.commaOnTheX0OfTheMonth = function () {
        return ", siku ya %s ya mwezi";
    };
    sw.prototype.commaEveryX0Days = function () {
        return ", kila siku %s";
    };
    sw.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", kati ya siku %s na %s ya mwezi";
    };
    sw.prototype.commaOnDayX0OfTheMonth = function () {
        return ", siku ya %s ya mwezi";
    };
    sw.prototype.commaEveryX0Years = function () {
        return ", kila miaka %s";
    };
    sw.prototype.commaStartingX0 = function () {
        return ", kwanzia %s";
    };
    sw.prototype.daysOfTheWeek = function () {
        return ["Jumapili", "Jumatatu", "Jumanne", "Jumatano", "Alhamisi", "Ijumaa", "Jumamosi"];
    };
    sw.prototype.monthsOfTheYear = function () {
        return [
            "Januari",
            "Februari",
            "Machi",
            "Aprili",
            "Mei",
            "Juni",
            "Julai",
            "Agosti",
            "Septemba",
            "Oktoba",
            "Novemba",
            "Desemba"
        ];
    };
    return sw;
}());
exports.sw = sw;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var fa = (function () {
    function fa() {
    }
    fa.prototype.atX0SecondsPastTheMinuteGt20 = function () {
        return null;
    };
    fa.prototype.atX0MinutesPastTheHourGt20 = function () {
        return null;
    };
    fa.prototype.commaMonthX0ThroughMonthX1 = function () {
        return null;
    };
    fa.prototype.commaYearX0ThroughYearX1 = function () {
        return null;
    };
    fa.prototype.use24HourTimeFormatByDefault = function () {
        return true;
    };
    fa.prototype.anErrorOccuredWhenGeneratingTheExpressionD = function () {
        return "خطایی در نمایش توضیحات این وظیفه رخ داد. لطفا ساختار آن را بررسی کنید.";
    };
    fa.prototype.everyMinute = function () {
        return "هر دقیقه";
    };
    fa.prototype.everyHour = function () {
        return "هر ساعت";
    };
    fa.prototype.atSpace = function () {
        return "در ";
    };
    fa.prototype.everyMinuteBetweenX0AndX1 = function () {
        return "هر دقیقه بین %s و %s";
    };
    fa.prototype.at = function () {
        return "در";
    };
    fa.prototype.spaceAnd = function () {
        return " و";
    };
    fa.prototype.everySecond = function () {
        return "هر ثانیه";
    };
    fa.prototype.everyX0Seconds = function () {
        return "هر %s ثانیه";
    };
    fa.prototype.secondsX0ThroughX1PastTheMinute = function () {
        return "ثانیه %s تا %s دقیقه گذشته";
    };
    fa.prototype.atX0SecondsPastTheMinute = function () {
        return "در %s قانیه از دقیقه گذشته";
    };
    fa.prototype.everyX0Minutes = function () {
        return "هر %s دقیقه";
    };
    fa.prototype.minutesX0ThroughX1PastTheHour = function () {
        return "دقیقه %s تا %s ساعت گذشته";
    };
    fa.prototype.atX0MinutesPastTheHour = function () {
        return "در %s دقیقه پس از ساعت";
    };
    fa.prototype.everyX0Hours = function () {
        return "هر %s ساعت";
    };
    fa.prototype.betweenX0AndX1 = function () {
        return "بین %s و %s";
    };
    fa.prototype.atX0 = function () {
        return "در %s";
    };
    fa.prototype.commaEveryDay = function () {
        return ", هر روز";
    };
    fa.prototype.commaEveryX0DaysOfTheWeek = function () {
        return ", هر %s روز از هفته";
    };
    fa.prototype.commaX0ThroughX1 = function () {
        return ", %s تا %s";
    };
    fa.prototype.first = function () {
        return "اول";
    };
    fa.prototype.second = function () {
        return "دوم";
    };
    fa.prototype.third = function () {
        return "سوم";
    };
    fa.prototype.fourth = function () {
        return "چهارم";
    };
    fa.prototype.fifth = function () {
        return "پنجم";
    };
    fa.prototype.commaOnThe = function () {
        return ", در ";
    };
    fa.prototype.spaceX0OfTheMonth = function () {
        return " %s ماه";
    };
    fa.prototype.lastDay = function () {
        return "آخرین روز";
    };
    fa.prototype.commaOnTheLastX0OfTheMonth = function () {
        return ", در %s ماه";
    };
    fa.prototype.commaOnlyOnX0 = function () {
        return ", فقط در %s";
    };
    fa.prototype.commaAndOnX0 = function () {
        return ", و در %s";
    };
    fa.prototype.commaEveryX0Months = function () {
        return ", هر %s ماه";
    };
    fa.prototype.commaOnlyInX0 = function () {
        return ", فقط در %s";
    };
    fa.prototype.commaOnTheLastDayOfTheMonth = function () {
        return ", در آخرین روز ماه";
    };
    fa.prototype.commaOnTheLastWeekdayOfTheMonth = function () {
        return ", در آخرین روز ماه";
    };
    fa.prototype.commaDaysBeforeTheLastDayOfTheMonth = function () {
        return ", %s روز قبل از آخرین روز ماه";
    };
    fa.prototype.firstWeekday = function () {
        return "اولین روز";
    };
    fa.prototype.weekdayNearestDayX0 = function () {
        return "روز نزدیک به روز %s";
    };
    fa.prototype.commaOnTheX0OfTheMonth = function () {
        return ", در %s ماه";
    };
    fa.prototype.commaEveryX0Days = function () {
        return ", هر %s روز";
    };
    fa.prototype.commaBetweenDayX0AndX1OfTheMonth = function () {
        return ", بین روز %s و %s ماه";
    };
    fa.prototype.commaOnDayX0OfTheMonth = function () {
        return ", در %s ماه";
    };
    fa.prototype.commaEveryMinute = function () {
        return ", هر minute";
    };
    fa.prototype.commaEveryHour = function () {
        return ", هر ساعت";
    };
    fa.prototype.commaEveryX0Years = function () {
        return ", هر %s سال";
    };
    fa.prototype.commaStartingX0 = function () {
        return ", آغاز %s";
    };
    fa.prototype.daysOfTheWeek = function () {
        return ["یک‌شنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه"];
    };
    fa.prototype.monthsOfTheYear = function () {
        return [
            "ژانویه",
            "فوریه",
            "مارس",
            "آپریل",
            "مه",
            "ژوئن",
            "ژوئیه",
            "آگوست",
            "سپتامبر",
            "اکتبر",
            "نوامبر",
            "دسامبر"
        ];
    };
    return fa;
}());
exports.fa = fa;


/***/ })
/******/ ]);
});

/***/ }),

/***/ "1276":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__("d784");
var isRegExp = __webpack_require__("44e7");
var anObject = __webpack_require__("825a");
var requireObjectCoercible = __webpack_require__("1d80");
var speciesConstructor = __webpack_require__("4840");
var advanceStringIndex = __webpack_require__("8aa5");
var toLength = __webpack_require__("50c4");
var callRegExpExec = __webpack_require__("14c3");
var regexpExec = __webpack_require__("9263");
var fails = __webpack_require__("d039");

var arrayPush = [].push;
var min = Math.min;
var MAX_UINT32 = 0xFFFFFFFF;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { return !RegExp(MAX_UINT32, 'y'); });

// @@split logic
fixRegExpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'.split(/(b)*/)[1] == 'c' ||
    'test'.split(/(?:)/, -1).length != 4 ||
    'ab'.split(/(?:ab)*/).length != 2 ||
    '.'.split(/(.?)(.?)/).length != 4 ||
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) {
        return nativeSplit.call(string, separator, lim);
      }
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }
        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output.length > lim ? output.slice(0, lim) : output;
    };
  // Chakra, V8
  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
}, !SUPPORTS_Y);


/***/ }),

/***/ "14c3":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("c6b6");
var regexpExec = __webpack_require__("9263");

// `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classof(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};



/***/ }),

/***/ "159b":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var DOMIterables = __webpack_require__("fdbc");
var forEach = __webpack_require__("17c2");
var createNonEnumerableProperty = __webpack_require__("9112");

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
}


/***/ }),

/***/ "17c2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $forEach = __webpack_require__("b727").forEach;
var arrayMethodIsStrict = __webpack_require__("a640");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var STRICT_METHOD = arrayMethodIsStrict('forEach');
var USES_TO_LENGTH = arrayMethodUsesToLength('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
module.exports = (!STRICT_METHOD || !USES_TO_LENGTH) ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : [].forEach;


/***/ }),

/***/ "1be4":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ "1c0b":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),

/***/ "1d80":
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "1dde":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var wellKnownSymbol = __webpack_require__("b622");
var V8_VERSION = __webpack_require__("2d00");

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};


/***/ }),

/***/ "23cb":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a691");

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "23e7":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
var createNonEnumerableProperty = __webpack_require__("9112");
var redefine = __webpack_require__("6eeb");
var setGlobal = __webpack_require__("ce4e");
var copyConstructorProperties = __webpack_require__("e893");
var isForced = __webpack_require__("94ca");

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ "241c":
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__("ca84");
var enumBugKeys = __webpack_require__("7839");

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "2d00":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var userAgent = __webpack_require__("342f");

var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

module.exports = version && +version;


/***/ }),

/***/ "2dd8":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "342f":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ "37e8":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var definePropertyModule = __webpack_require__("9bf2");
var anObject = __webpack_require__("825a");
var objectKeys = __webpack_require__("df75");

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};


/***/ }),

/***/ "3bbe":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};


/***/ }),

/***/ "4160":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var forEach = __webpack_require__("17c2");

// `Array.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
$({ target: 'Array', proto: true, forced: [].forEach != forEach }, {
  forEach: forEach
});


/***/ }),

/***/ "428f":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");

module.exports = global;


/***/ }),

/***/ "4362":
/***/ (function(module, exports, __webpack_require__) {

exports.nextTick = function nextTick(fn) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    setTimeout(function () {
        fn.apply(null, args);
    }, 0);
};

exports.platform = exports.arch = 
exports.execPath = exports.title = 'browser';
exports.pid = 1;
exports.browser = true;
exports.env = {};
exports.argv = [];

exports.binding = function (name) {
	throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    exports.cwd = function () { return cwd };
    exports.chdir = function (dir) {
        if (!path) path = __webpack_require__("df7c");
        cwd = path.resolve(dir, cwd);
    };
})();

exports.exit = exports.kill = 
exports.umask = exports.dlopen = 
exports.uptime = exports.memoryUsage = 
exports.uvCounters = function() {};
exports.features = {};


/***/ }),

/***/ "44ad":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var classof = __webpack_require__("c6b6");

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),

/***/ "44d2":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");
var create = __webpack_require__("7c73");
var definePropertyModule = __webpack_require__("9bf2");

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "44e7":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");
var classof = __webpack_require__("c6b6");
var wellKnownSymbol = __webpack_require__("b622");

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};


/***/ }),

/***/ "466d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__("d784");
var anObject = __webpack_require__("825a");
var toLength = __webpack_require__("50c4");
var requireObjectCoercible = __webpack_require__("1d80");
var advanceStringIndex = __webpack_require__("8aa5");
var regExpExec = __webpack_require__("14c3");

// @@match logic
fixRegExpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible(this);
      var matcher = regexp == undefined ? undefined : regexp[MATCH];
      return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative(nativeMatch, regexp, this);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);

      if (!rx.global) return regExpExec(rx, S);

      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});


/***/ }),

/***/ "4840":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var aFunction = __webpack_require__("1c0b");
var wellKnownSymbol = __webpack_require__("b622");

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.github.io/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
};


/***/ }),

/***/ "4930":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});


/***/ }),

/***/ "4d64":
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__("fc6a");
var toLength = __webpack_require__("50c4");
var toAbsoluteIndex = __webpack_require__("23cb");

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ "4de4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $filter = __webpack_require__("b727").filter;
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');
// Edge 14- issue
var USES_TO_LENGTH = arrayMethodUsesToLength('filter');

// `Array.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "50c4":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a691");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "5135":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "5319":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__("d784");
var anObject = __webpack_require__("825a");
var toObject = __webpack_require__("7b0b");
var toLength = __webpack_require__("50c4");
var toInteger = __webpack_require__("a691");
var requireObjectCoercible = __webpack_require__("1d80");
var advanceStringIndex = __webpack_require__("8aa5");
var regExpExec = __webpack_require__("14c3");

var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
  var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
      return replacer !== undefined
        ? replacer.call(searchValue, O, replaceValue)
        : nativeReplace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      if (
        (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0) ||
        (typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
      ) {
        var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
        if (res.done) return res.value;
      }

      var rx = anObject(regexp);
      var S = String(this);

      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;

        results.push(result);
        if (!global) break;

        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

  // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return nativeReplace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),

/***/ "5692":
/***/ (function(module, exports, __webpack_require__) {

var IS_PURE = __webpack_require__("c430");
var store = __webpack_require__("c6cd");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.6.5',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "56ef":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");
var getOwnPropertyNamesModule = __webpack_require__("241c");
var getOwnPropertySymbolsModule = __webpack_require__("7418");
var anObject = __webpack_require__("825a");

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ "5899":
/***/ (function(module, exports) {

// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ "58a8":
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__("1d80");
var whitespaces = __webpack_require__("5899");

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};


/***/ }),

/***/ "5c6c":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "60da":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__("83ab");
var fails = __webpack_require__("d039");
var objectKeys = __webpack_require__("df75");
var getOwnPropertySymbolsModule = __webpack_require__("7418");
var propertyIsEnumerableModule = __webpack_require__("d1e7");
var toObject = __webpack_require__("7b0b");
var IndexedObject = __webpack_require__("44ad");

var nativeAssign = Object.assign;
var defineProperty = Object.defineProperty;

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
module.exports = !nativeAssign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS && nativeAssign({ b: 1 }, nativeAssign(defineProperty({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  } return T;
} : nativeAssign;


/***/ }),

/***/ "6547":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a691");
var requireObjectCoercible = __webpack_require__("1d80");

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ "65f0":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");
var isArray = __webpack_require__("e8b5");
var wellKnownSymbol = __webpack_require__("b622");

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};


/***/ }),

/***/ "69f3":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__("7f9a");
var global = __webpack_require__("da84");
var isObject = __webpack_require__("861d");
var createNonEnumerableProperty = __webpack_require__("9112");
var objectHas = __webpack_require__("5135");
var sharedKey = __webpack_require__("f772");
var hiddenKeys = __webpack_require__("d012");

var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "6eeb":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var createNonEnumerableProperty = __webpack_require__("9112");
var has = __webpack_require__("5135");
var setGlobal = __webpack_require__("ce4e");
var inspectSource = __webpack_require__("8925");
var InternalStateModule = __webpack_require__("69f3");

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});


/***/ }),

/***/ "7156":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");
var setPrototypeOf = __webpack_require__("d2bb");

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ "7418":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "746f":
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__("428f");
var has = __webpack_require__("5135");
var wrappedWellKnownSymbolModule = __webpack_require__("e538");
var defineProperty = __webpack_require__("9bf2").f;

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};


/***/ }),

/***/ "7839":
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "7aa9":
/***/ (function(module, exports, __webpack_require__) {

// This file allows dist/cronstrue-i18n.js to be required from Node as:
// var cronstrue = require('cronstrue/i18n');

var cronstrueWithLocales = __webpack_require__("122c");
module.exports = cronstrueWithLocales;


/***/ }),

/***/ "7b0b":
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__("1d80");

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "7c73":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var defineProperties = __webpack_require__("37e8");
var enumBugKeys = __webpack_require__("7839");
var hiddenKeys = __webpack_require__("d012");
var html = __webpack_require__("1be4");
var documentCreateElement = __webpack_require__("cc12");
var sharedKey = __webpack_require__("f772");

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};


/***/ }),

/***/ "7db0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $find = __webpack_require__("b727").find;
var addToUnscopables = __webpack_require__("44d2");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var FIND = 'find';
var SKIPS_HOLES = true;

var USES_TO_LENGTH = arrayMethodUsesToLength(FIND);

// Shouldn't skip holes
if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

// `Array.prototype.find` method
// https://tc39.github.io/ecma262/#sec-array.prototype.find
$({ target: 'Array', proto: true, forced: SKIPS_HOLES || !USES_TO_LENGTH }, {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND);


/***/ }),

/***/ "7f9a":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var inspectSource = __webpack_require__("8925");

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ "825a":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),

/***/ "83ab":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

// Thank's IE8 for his funny defineProperty
module.exports = !fails(function () {
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ "8418":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toPrimitive = __webpack_require__("c04e");
var definePropertyModule = __webpack_require__("9bf2");
var createPropertyDescriptor = __webpack_require__("5c6c");

module.exports = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),

/***/ "861d":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "8875":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    if (document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ }),

/***/ "8925":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("c6cd");

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ "8aa5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__("6547").charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};


/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),

/***/ "90e3":
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),

/***/ "9112":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var definePropertyModule = __webpack_require__("9bf2");
var createPropertyDescriptor = __webpack_require__("5c6c");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "9263":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpFlags = __webpack_require__("ad6d");
var stickyHelpers = __webpack_require__("9f7f");

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "938d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return hasWindowSupport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return hasDocumentSupport; });
/* unused harmony export hasNavigatorSupport */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return hasPromiseSupport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return hasMutationObserverSupport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return isBrowser; });
/* unused harmony export userAgent */
/* unused harmony export isJSDOM */
/* unused harmony export isIE */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return hasPassiveEventSupport; });
/* unused harmony export hasTouchSupport */
/* unused harmony export hasPointerEventSupport */
/* unused harmony export hasIntersectionObserverSupport */
/* unused harmony export getEnv */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getNoWarn; });
/**
 * Utilities to get information about the current environment
 */
// --- Constants ---
var hasWindowSupport = typeof window !== 'undefined';
var hasDocumentSupport = typeof document !== 'undefined';
var hasNavigatorSupport = typeof navigator !== 'undefined';
var hasPromiseSupport = typeof Promise !== 'undefined';
/* istanbul ignore next: JSDOM always returns false */

var hasMutationObserverSupport = typeof MutationObserver !== 'undefined' || typeof WebKitMutationObserver !== 'undefined' || typeof MozMutationObserver !== 'undefined';
var isBrowser = hasWindowSupport && hasDocumentSupport && hasNavigatorSupport; // Browser type sniffing

var userAgent = isBrowser ? window.navigator.userAgent.toLowerCase() : '';
var isJSDOM = userAgent.indexOf('jsdom') > 0;
var isIE = /msie|trident/.test(userAgent); // Determine if the browser supports the option passive for events

var hasPassiveEventSupport = function () {
  var passiveEventSupported = false;

  if (isBrowser) {
    try {
      var options = {
        get passive() {
          // This function will be called when the browser
          // attempts to access the passive property.

          /* istanbul ignore next: will never be called in JSDOM */
          passiveEventSupported = true;
        }

      };
      window.addEventListener('test', options, options);
      window.removeEventListener('test', options, options);
    } catch (err) {
      /* istanbul ignore next: will never be called in JSDOM */
      passiveEventSupported = false;
    }
  }

  return passiveEventSupported;
}();
var hasTouchSupport = isBrowser && ('ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0);
var hasPointerEventSupport = isBrowser && Boolean(window.PointerEvent || window.MSPointerEvent);
/* istanbul ignore next: JSDOM only checks for 'IntersectionObserver' */

var hasIntersectionObserverSupport = isBrowser && 'IntersectionObserver' in window && 'IntersectionObserverEntry' in window && // Edge 15 and UC Browser lack support for `isIntersecting`
// but we an use intersectionRatio > 0 instead
// 'isIntersecting' in window.IntersectionObserverEntry.prototype &&
'intersectionRatio' in window.IntersectionObserverEntry.prototype; // --- Getters ---

var getEnv = function getEnv(key) {
  var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var env = typeof process !== 'undefined' && process ? Object({"NODE_ENV":"production","BASE_URL":"/vue-cron-editor-bootstrap/"}) || false : {};

  if (!key) {
    /* istanbul ignore next */
    return env;
  }

  return env[key] || fallback;
};
var getNoWarn = function getNoWarn() {
  return getEnv('BOOTSTRAP_VUE_NO_WARN');
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("4362")))

/***/ }),

/***/ "94ca":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "99af":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var fails = __webpack_require__("d039");
var isArray = __webpack_require__("e8b5");
var isObject = __webpack_require__("861d");
var toObject = __webpack_require__("7b0b");
var toLength = __webpack_require__("50c4");
var createProperty = __webpack_require__("8418");
var arraySpeciesCreate = __webpack_require__("65f0");
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var wellKnownSymbol = __webpack_require__("b622");
var V8_VERSION = __webpack_require__("2d00");

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.github.io/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$({ target: 'Array', proto: true, forced: FORCED }, {
  concat: function concat(arg) { // eslint-disable-line no-unused-vars
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});


/***/ }),

/***/ "9bf2":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var IE8_DOM_DEFINE = __webpack_require__("0cfb");
var anObject = __webpack_require__("825a");
var toPrimitive = __webpack_require__("c04e");

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "9f7f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__("d039");

// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
// so we use an intermediate function.
function RE(s, f) {
  return RegExp(s, f);
}

exports.UNSUPPORTED_Y = fails(function () {
  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

exports.BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});


/***/ }),

/***/ "a15b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var IndexedObject = __webpack_require__("44ad");
var toIndexedObject = __webpack_require__("fc6a");
var arrayMethodIsStrict = __webpack_require__("a640");

var nativeJoin = [].join;

var ES3_STRINGS = IndexedObject != Object;
var STRICT_METHOD = arrayMethodIsStrict('join', ',');

// `Array.prototype.join` method
// https://tc39.github.io/ecma262/#sec-array.prototype.join
$({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD }, {
  join: function join(separator) {
    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),

/***/ "a4d3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var getBuiltIn = __webpack_require__("d066");
var IS_PURE = __webpack_require__("c430");
var DESCRIPTORS = __webpack_require__("83ab");
var NATIVE_SYMBOL = __webpack_require__("4930");
var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");
var fails = __webpack_require__("d039");
var has = __webpack_require__("5135");
var isArray = __webpack_require__("e8b5");
var isObject = __webpack_require__("861d");
var anObject = __webpack_require__("825a");
var toObject = __webpack_require__("7b0b");
var toIndexedObject = __webpack_require__("fc6a");
var toPrimitive = __webpack_require__("c04e");
var createPropertyDescriptor = __webpack_require__("5c6c");
var nativeObjectCreate = __webpack_require__("7c73");
var objectKeys = __webpack_require__("df75");
var getOwnPropertyNamesModule = __webpack_require__("241c");
var getOwnPropertyNamesExternal = __webpack_require__("057f");
var getOwnPropertySymbolsModule = __webpack_require__("7418");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var definePropertyModule = __webpack_require__("9bf2");
var propertyIsEnumerableModule = __webpack_require__("d1e7");
var createNonEnumerableProperty = __webpack_require__("9112");
var redefine = __webpack_require__("6eeb");
var shared = __webpack_require__("5692");
var sharedKey = __webpack_require__("f772");
var hiddenKeys = __webpack_require__("d012");
var uid = __webpack_require__("90e3");
var wellKnownSymbol = __webpack_require__("b622");
var wrappedWellKnownSymbolModule = __webpack_require__("e538");
var defineWellKnownSymbol = __webpack_require__("746f");
var setToStringTag = __webpack_require__("d44e");
var InternalStateModule = __webpack_require__("69f3");
var $forEach = __webpack_require__("b727").forEach;

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);
var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global.Symbol;
var $stringify = getBuiltIn('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = DESCRIPTORS && fails(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS) symbol.description = description;
  return symbol;
};

var isSymbol = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return Object(it) instanceof $Symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPrimitive(P, true);
  anObject(Attributes);
  if (has(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!has(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPrimitive(V, true);
  var enumerable = nativePropertyIsEnumerable.call(this, P);
  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPrimitive(P, true);
  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
      result.push(AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.github.io/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
    var tag = uid(description);
    var setter = function (value) {
      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };
    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return getInternalState(this).tag;
  });

  redefine($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });

  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };

  if (DESCRIPTORS) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });
    if (!IS_PURE) {
      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
    }
  }
}

$({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
  Symbol: $Symbol
});

$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});

$({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
  // `Symbol.for` method
  // https://tc39.github.io/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = String(key);
    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
  // `Object.create` method
  // https://tc39.github.io/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
$({ target: 'Object', stat: true, forced: fails(function () { getOwnPropertySymbolsModule.f(1); }) }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return getOwnPropertySymbolsModule.f(toObject(it));
  }
});

// `JSON.stringify` method behavior with symbols
// https://tc39.github.io/ecma262/#sec-json.stringify
if ($stringify) {
  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails(function () {
    var symbol = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    return $stringify([symbol]) != '[null]'
      // WebKit converts symbol values to JSON as null
      || $stringify({ a: symbol }) != '{}'
      // V8 throws on boxed symbols
      || $stringify(Object(symbol)) != '{}';
  });

  $({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
    // eslint-disable-next-line no-unused-vars
    stringify: function stringify(it, replacer, space) {
      var args = [it];
      var index = 1;
      var $replacer;
      while (arguments.length > index) args.push(arguments[index++]);
      $replacer = replacer;
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
      if (!isArray(replacer)) replacer = function (key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return $stringify.apply(null, args);
    }
  });
}

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive
if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
  createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
}
// `Symbol.prototype[@@toStringTag]` property
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag($Symbol, SYMBOL);

hiddenKeys[HIDDEN] = true;


/***/ }),

/***/ "a640":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__("d039");

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),

/***/ "a691":
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),

/***/ "a9e3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__("83ab");
var global = __webpack_require__("da84");
var isForced = __webpack_require__("94ca");
var redefine = __webpack_require__("6eeb");
var has = __webpack_require__("5135");
var classof = __webpack_require__("c6b6");
var inheritIfRequired = __webpack_require__("7156");
var toPrimitive = __webpack_require__("c04e");
var fails = __webpack_require__("d039");
var create = __webpack_require__("7c73");
var getOwnPropertyNames = __webpack_require__("241c").f;
var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
var defineProperty = __webpack_require__("9bf2").f;
var trim = __webpack_require__("58a8").trim;

var NUMBER = 'Number';
var NativeNumber = global[NUMBER];
var NumberPrototype = NativeNumber.prototype;

// Opera ~12 has broken Object#toString
var BROKEN_CLASSOF = classof(create(NumberPrototype)) == NUMBER;

// `ToNumber` abstract operation
// https://tc39.github.io/ecma262/#sec-tonumber
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  var first, third, radix, maxCode, digits, length, index, code;
  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = it.charCodeAt(0);
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
        default: return +it;
      }
      digits = it.slice(2);
      length = digits.length;
      for (index = 0; index < length; index++) {
        code = digits.charCodeAt(index);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

// `Number` constructor
// https://tc39.github.io/ecma262/#sec-number-constructor
if (isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var dummy = this;
    return dummy instanceof NumberWrapper
      // check on 1..constructor(foo) case
      && (BROKEN_CLASSOF ? fails(function () { NumberPrototype.valueOf.call(dummy); }) : classof(dummy) != NUMBER)
        ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
  };
  for (var keys = DESCRIPTORS ? getOwnPropertyNames(NativeNumber) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(NativeNumber, key = keys[j]) && !has(NumberWrapper, key)) {
      defineProperty(NumberWrapper, key, getOwnPropertyDescriptor(NativeNumber, key));
    }
  }
  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  redefine(global, NUMBER, NumberWrapper);
}


/***/ }),

/***/ "ac1f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var exec = __webpack_require__("9263");

$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),

/***/ "ad6d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__("825a");

// `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "ae40":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var fails = __webpack_require__("d039");
var has = __webpack_require__("5135");

var defineProperty = Object.defineProperty;
var cache = {};

var thrower = function (it) { throw it; };

module.exports = function (METHOD_NAME, options) {
  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
  if (!options) options = {};
  var method = [][METHOD_NAME];
  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
  var argument0 = has(options, 0) ? options[0] : thrower;
  var argument1 = has(options, 1) ? options[1] : undefined;

  return cache[METHOD_NAME] = !!method && !fails(function () {
    if (ACCESSORS && !DESCRIPTORS) return true;
    var O = { length: -1 };

    if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
    else O[1] = 1;

    method.call(O, argument0, argument1);
  });
};


/***/ }),

/***/ "b622":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var shared = __webpack_require__("5692");
var has = __webpack_require__("5135");
var uid = __webpack_require__("90e3");
var NATIVE_SYMBOL = __webpack_require__("4930");
var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (NATIVE_SYMBOL && has(Symbol, name)) WellKnownSymbolsStore[name] = Symbol[name];
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ "b64b":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var toObject = __webpack_require__("7b0b");
var nativeKeys = __webpack_require__("df75");
var fails = __webpack_require__("d039");

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});


/***/ }),

/***/ "b727":
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__("0366");
var IndexedObject = __webpack_require__("44ad");
var toObject = __webpack_require__("7b0b");
var toLength = __webpack_require__("50c4");
var arraySpeciesCreate = __webpack_require__("65f0");

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else if (IS_EVERY) return false;  // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6)
};


/***/ }),

/***/ "c04e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "c430":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "c6b6":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "c6cd":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var setGlobal = __webpack_require__("ce4e");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ "c8ba":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "ca84":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("5135");
var toIndexedObject = __webpack_require__("fc6a");
var indexOf = __webpack_require__("4d64").indexOf;
var hiddenKeys = __webpack_require__("d012");

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "cc12":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isObject = __webpack_require__("861d");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "cca6":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var assign = __webpack_require__("60da");

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
$({ target: 'Object', stat: true, forced: Object.assign !== assign }, {
  assign: assign
});


/***/ }),

/***/ "ce4e":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var createNonEnumerableProperty = __webpack_require__("9112");

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "d012":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "d039":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "d066":
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__("428f");
var global = __webpack_require__("da84");

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "d1e7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;


/***/ }),

/***/ "d2bb":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var aPossiblePrototype = __webpack_require__("3bbe");

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ "d44e":
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__("9bf2").f;
var has = __webpack_require__("5135");
var wellKnownSymbol = __webpack_require__("b622");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),

/***/ "d784":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__("ac1f");
var redefine = __webpack_require__("6eeb");
var fails = __webpack_require__("d039");
var wellKnownSymbol = __webpack_require__("b622");
var regexpExec = __webpack_require__("9263");
var createNonEnumerableProperty = __webpack_require__("9112");

var SPECIES = wellKnownSymbol('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  return 'a'.replace(/./, '$0') === '$0';
})();

var REPLACE = wellKnownSymbol('replace');
// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

module.exports = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !(
      REPLACE_SUPPORTS_NAMED_GROUPS &&
      REPLACE_KEEPS_$0 &&
      !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    )) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    }, {
      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];

    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return regexMethod.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return regexMethod.call(string, this); }
    );
  }

  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
};


/***/ }),

/***/ "d81d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $map = __webpack_require__("b727").map;
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');
// FF49- issue
var USES_TO_LENGTH = arrayMethodUsesToLength('map');

// `Array.prototype.map` method
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "da84":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "dbb4":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var DESCRIPTORS = __webpack_require__("83ab");
var ownKeys = __webpack_require__("56ef");
var toIndexedObject = __webpack_require__("fc6a");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var createProperty = __webpack_require__("8418");

// `Object.getOwnPropertyDescriptors` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
$({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIndexedObject(object);
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    var keys = ownKeys(O);
    var result = {};
    var index = 0;
    var key, descriptor;
    while (keys.length > index) {
      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
      if (descriptor !== undefined) createProperty(result, key, descriptor);
    }
    return result;
  }
});


/***/ }),

/***/ "df75":
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__("ca84");
var enumBugKeys = __webpack_require__("7839");

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ "df7c":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("4362")))

/***/ }),

/***/ "e439":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var fails = __webpack_require__("d039");
var toIndexedObject = __webpack_require__("fc6a");
var nativeGetOwnPropertyDescriptor = __webpack_require__("06cf").f;
var DESCRIPTORS = __webpack_require__("83ab");

var FAILS_ON_PRIMITIVES = fails(function () { nativeGetOwnPropertyDescriptor(1); });
var FORCED = !DESCRIPTORS || FAILS_ON_PRIMITIVES;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
$({ target: 'Object', stat: true, forced: FORCED, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
  }
});


/***/ }),

/***/ "e538":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

exports.f = wellKnownSymbol;


/***/ }),

/***/ "e893":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("5135");
var ownKeys = __webpack_require__("56ef");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var definePropertyModule = __webpack_require__("9bf2");

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),

/***/ "e8b5":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("c6b6");

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};


/***/ }),

/***/ "f0bd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.16.1
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && typeof navigator !== 'undefined';

var timeoutDuration = function () {
  var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
  for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
    if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
      return 1;
    }
  }
  return 0;
}();

function microtaskDebounce(fn) {
  var called = false;
  return function () {
    if (called) {
      return;
    }
    called = true;
    window.Promise.resolve().then(function () {
      called = false;
      fn();
    });
  };
}

function taskDebounce(fn) {
  var scheduled = false;
  return function () {
    if (!scheduled) {
      scheduled = true;
      setTimeout(function () {
        scheduled = false;
        fn();
      }, timeoutDuration);
    }
  };
}

var supportsMicroTasks = isBrowser && window.Promise;

/**
* Create a debounced version of a method, that's asynchronously deferred
* but called in the minimum time possible.
*
* @method
* @memberof Popper.Utils
* @argument {Function} fn
* @returns {Function}
*/
var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

/**
 * Check if the given variable is a function
 * @method
 * @memberof Popper.Utils
 * @argument {Any} functionToCheck - variable to check
 * @returns {Boolean} answer to: is a function?
 */
function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

/**
 * Get CSS computed property of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Eement} element
 * @argument {String} property
 */
function getStyleComputedProperty(element, property) {
  if (element.nodeType !== 1) {
    return [];
  }
  // NOTE: 1 DOM access here
  var window = element.ownerDocument.defaultView;
  var css = window.getComputedStyle(element, null);
  return property ? css[property] : css;
}

/**
 * Returns the parentNode or the host of the element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} parent
 */
function getParentNode(element) {
  if (element.nodeName === 'HTML') {
    return element;
  }
  return element.parentNode || element.host;
}

/**
 * Returns the scrolling parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} scroll parent
 */
function getScrollParent(element) {
  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
  if (!element) {
    return document.body;
  }

  switch (element.nodeName) {
    case 'HTML':
    case 'BODY':
      return element.ownerDocument.body;
    case '#document':
      return element.body;
  }

  // Firefox want us to check `-x` and `-y` variations as well

  var _getStyleComputedProp = getStyleComputedProperty(element),
      overflow = _getStyleComputedProp.overflow,
      overflowX = _getStyleComputedProp.overflowX,
      overflowY = _getStyleComputedProp.overflowY;

  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
    return element;
  }

  return getScrollParent(getParentNode(element));
}

/**
 * Returns the reference node of the reference object, or the reference object itself.
 * @method
 * @memberof Popper.Utils
 * @param {Element|Object} reference - the reference element (the popper will be relative to this)
 * @returns {Element} parent
 */
function getReferenceNode(reference) {
  return reference && reference.referenceNode ? reference.referenceNode : reference;
}

var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);

/**
 * Determines if the browser is Internet Explorer
 * @method
 * @memberof Popper.Utils
 * @param {Number} version to check
 * @returns {Boolean} isIE
 */
function isIE(version) {
  if (version === 11) {
    return isIE11;
  }
  if (version === 10) {
    return isIE10;
  }
  return isIE11 || isIE10;
}

/**
 * Returns the offset parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} offset parent
 */
function getOffsetParent(element) {
  if (!element) {
    return document.documentElement;
  }

  var noOffsetParent = isIE(10) ? document.body : null;

  // NOTE: 1 DOM access here
  var offsetParent = element.offsetParent || null;
  // Skip hidden elements which don't have an offsetParent
  while (offsetParent === noOffsetParent && element.nextElementSibling) {
    offsetParent = (element = element.nextElementSibling).offsetParent;
  }

  var nodeName = offsetParent && offsetParent.nodeName;

  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
    return element ? element.ownerDocument.documentElement : document.documentElement;
  }

  // .offsetParent will return the closest TH, TD or TABLE in case
  // no offsetParent is present, I hate this job...
  if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
    return getOffsetParent(offsetParent);
  }

  return offsetParent;
}

function isOffsetContainer(element) {
  var nodeName = element.nodeName;

  if (nodeName === 'BODY') {
    return false;
  }
  return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
}

/**
 * Finds the root node (document, shadowDOM root) of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} node
 * @returns {Element} root node
 */
function getRoot(node) {
  if (node.parentNode !== null) {
    return getRoot(node.parentNode);
  }

  return node;
}

/**
 * Finds the offset parent common to the two provided nodes
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element1
 * @argument {Element} element2
 * @returns {Element} common offset parent
 */
function findCommonOffsetParent(element1, element2) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return document.documentElement;
  }

  // Here we make sure to give as "start" the element that comes first in the DOM
  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  var start = order ? element1 : element2;
  var end = order ? element2 : element1;

  // Get common ancestor container
  var range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  var commonAncestorContainer = range.commonAncestorContainer;

  // Both nodes are inside #document

  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }

    return getOffsetParent(commonAncestorContainer);
  }

  // one of the nodes is inside shadowDOM, find which one
  var element1root = getRoot(element1);
  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}

/**
 * Gets the scroll value of the given element in the given side (top and left)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {String} side `top` or `left`
 * @returns {number} amount of scrolled pixels
 */
function getScroll(element) {
  var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

  var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
  var nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    var html = element.ownerDocument.documentElement;
    var scrollingElement = element.ownerDocument.scrollingElement || html;
    return scrollingElement[upperSide];
  }

  return element[upperSide];
}

/*
 * Sum or subtract the element scroll values (left and top) from a given rect object
 * @method
 * @memberof Popper.Utils
 * @param {Object} rect - Rect object you want to change
 * @param {HTMLElement} element - The element from the function reads the scroll values
 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
 * @return {Object} rect - The modifier rect object
 */
function includeScroll(rect, element) {
  var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var scrollTop = getScroll(element, 'top');
  var scrollLeft = getScroll(element, 'left');
  var modifier = subtract ? -1 : 1;
  rect.top += scrollTop * modifier;
  rect.bottom += scrollTop * modifier;
  rect.left += scrollLeft * modifier;
  rect.right += scrollLeft * modifier;
  return rect;
}

/*
 * Helper to detect borders of a given element
 * @method
 * @memberof Popper.Utils
 * @param {CSSStyleDeclaration} styles
 * Result of `getStyleComputedProperty` on the given element
 * @param {String} axis - `x` or `y`
 * @return {number} borders - The borders size of the given axis
 */

function getBordersSize(styles, axis) {
  var sideA = axis === 'x' ? 'Left' : 'Top';
  var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

  return parseFloat(styles['border' + sideA + 'Width']) + parseFloat(styles['border' + sideB + 'Width']);
}

function getSize(axis, body, html, computedStyle) {
  return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
}

function getWindowSizes(document) {
  var body = document.body;
  var html = document.documentElement;
  var computedStyle = isIE(10) && getComputedStyle(html);

  return {
    height: getSize('Height', body, html, computedStyle),
    width: getSize('Width', body, html, computedStyle)
  };
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/**
 * Given element offsets, generate an output similar to getBoundingClientRect
 * @method
 * @memberof Popper.Utils
 * @argument {Object} offsets
 * @returns {Object} ClientRect like output
 */
function getClientRect(offsets) {
  return _extends({}, offsets, {
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  });
}

/**
 * Get bounding client rect of given element
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} element
 * @return {Object} client rect
 */
function getBoundingClientRect(element) {
  var rect = {};

  // IE10 10 FIX: Please, don't ask, the element isn't
  // considered in DOM in some circumstances...
  // This isn't reproducible in IE10 compatibility mode of IE11
  try {
    if (isIE(10)) {
      rect = element.getBoundingClientRect();
      var scrollTop = getScroll(element, 'top');
      var scrollLeft = getScroll(element, 'left');
      rect.top += scrollTop;
      rect.left += scrollLeft;
      rect.bottom += scrollTop;
      rect.right += scrollLeft;
    } else {
      rect = element.getBoundingClientRect();
    }
  } catch (e) {}

  var result = {
    left: rect.left,
    top: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };

  // subtract scrollbar size from sizes
  var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
  var width = sizes.width || element.clientWidth || result.width;
  var height = sizes.height || element.clientHeight || result.height;

  var horizScrollbar = element.offsetWidth - width;
  var vertScrollbar = element.offsetHeight - height;

  // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
  // we make this check conditional for performance reasons
  if (horizScrollbar || vertScrollbar) {
    var styles = getStyleComputedProperty(element);
    horizScrollbar -= getBordersSize(styles, 'x');
    vertScrollbar -= getBordersSize(styles, 'y');

    result.width -= horizScrollbar;
    result.height -= vertScrollbar;
  }

  return getClientRect(result);
}

function getOffsetRectRelativeToArbitraryNode(children, parent) {
  var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var isIE10 = isIE(10);
  var isHTML = parent.nodeName === 'HTML';
  var childrenRect = getBoundingClientRect(children);
  var parentRect = getBoundingClientRect(parent);
  var scrollParent = getScrollParent(children);

  var styles = getStyleComputedProperty(parent);
  var borderTopWidth = parseFloat(styles.borderTopWidth);
  var borderLeftWidth = parseFloat(styles.borderLeftWidth);

  // In cases where the parent is fixed, we must ignore negative scroll in offset calc
  if (fixedPosition && isHTML) {
    parentRect.top = Math.max(parentRect.top, 0);
    parentRect.left = Math.max(parentRect.left, 0);
  }
  var offsets = getClientRect({
    top: childrenRect.top - parentRect.top - borderTopWidth,
    left: childrenRect.left - parentRect.left - borderLeftWidth,
    width: childrenRect.width,
    height: childrenRect.height
  });
  offsets.marginTop = 0;
  offsets.marginLeft = 0;

  // Subtract margins of documentElement in case it's being used as parent
  // we do this only on HTML because it's the only element that behaves
  // differently when margins are applied to it. The margins are included in
  // the box of the documentElement, in the other cases not.
  if (!isIE10 && isHTML) {
    var marginTop = parseFloat(styles.marginTop);
    var marginLeft = parseFloat(styles.marginLeft);

    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft;

    // Attach marginTop and marginLeft because in some circumstances we may need them
    offsets.marginTop = marginTop;
    offsets.marginLeft = marginLeft;
  }

  if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
    offsets = includeScroll(offsets, parent);
  }

  return offsets;
}

function getViewportOffsetRectRelativeToArtbitraryNode(element) {
  var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var html = element.ownerDocument.documentElement;
  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
  var width = Math.max(html.clientWidth, window.innerWidth || 0);
  var height = Math.max(html.clientHeight, window.innerHeight || 0);

  var scrollTop = !excludeScroll ? getScroll(html) : 0;
  var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;

  var offset = {
    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
    width: width,
    height: height
  };

  return getClientRect(offset);
}

/**
 * Check if the given element is fixed or is inside a fixed parent
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {Element} customContainer
 * @returns {Boolean} answer to "isFixed?"
 */
function isFixed(element) {
  var nodeName = element.nodeName;
  if (nodeName === 'BODY' || nodeName === 'HTML') {
    return false;
  }
  if (getStyleComputedProperty(element, 'position') === 'fixed') {
    return true;
  }
  var parentNode = getParentNode(element);
  if (!parentNode) {
    return false;
  }
  return isFixed(parentNode);
}

/**
 * Finds the first parent of an element that has a transformed property defined
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} first transformed parent or documentElement
 */

function getFixedPositionOffsetParent(element) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element || !element.parentElement || isIE()) {
    return document.documentElement;
  }
  var el = element.parentElement;
  while (el && getStyleComputedProperty(el, 'transform') === 'none') {
    el = el.parentElement;
  }
  return el || document.documentElement;
}

/**
 * Computed the boundaries limits and return them
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} popper
 * @param {HTMLElement} reference
 * @param {number} padding
 * @param {HTMLElement} boundariesElement - Element used to define the boundaries
 * @param {Boolean} fixedPosition - Is in fixed position mode
 * @returns {Object} Coordinates of the boundaries
 */
function getBoundaries(popper, reference, padding, boundariesElement) {
  var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  // NOTE: 1 DOM access here

  var boundaries = { top: 0, left: 0 };
  var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));

  // Handle viewport case
  if (boundariesElement === 'viewport') {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
  } else {
    // Handle other cases based on DOM element used as boundaries
    var boundariesNode = void 0;
    if (boundariesElement === 'scrollParent') {
      boundariesNode = getScrollParent(getParentNode(reference));
      if (boundariesNode.nodeName === 'BODY') {
        boundariesNode = popper.ownerDocument.documentElement;
      }
    } else if (boundariesElement === 'window') {
      boundariesNode = popper.ownerDocument.documentElement;
    } else {
      boundariesNode = boundariesElement;
    }

    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

    // In case of HTML, we need a different computation
    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
      var _getWindowSizes = getWindowSizes(popper.ownerDocument),
          height = _getWindowSizes.height,
          width = _getWindowSizes.width;

      boundaries.top += offsets.top - offsets.marginTop;
      boundaries.bottom = height + offsets.top;
      boundaries.left += offsets.left - offsets.marginLeft;
      boundaries.right = width + offsets.left;
    } else {
      // for all the other DOM elements, this one is good
      boundaries = offsets;
    }
  }

  // Add paddings
  padding = padding || 0;
  var isPaddingNumber = typeof padding === 'number';
  boundaries.left += isPaddingNumber ? padding : padding.left || 0;
  boundaries.top += isPaddingNumber ? padding : padding.top || 0;
  boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
  boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;

  return boundaries;
}

function getArea(_ref) {
  var width = _ref.width,
      height = _ref.height;

  return width * height;
}

/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 * @method
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

  if (placement.indexOf('auto') === -1) {
    return placement;
  }

  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

  var rects = {
    top: {
      width: boundaries.width,
      height: refRect.top - boundaries.top
    },
    right: {
      width: boundaries.right - refRect.right,
      height: boundaries.height
    },
    bottom: {
      width: boundaries.width,
      height: boundaries.bottom - refRect.bottom
    },
    left: {
      width: refRect.left - boundaries.left,
      height: boundaries.height
    }
  };

  var sortedAreas = Object.keys(rects).map(function (key) {
    return _extends({
      key: key
    }, rects[key], {
      area: getArea(rects[key])
    });
  }).sort(function (a, b) {
    return b.area - a.area;
  });

  var filteredAreas = sortedAreas.filter(function (_ref2) {
    var width = _ref2.width,
        height = _ref2.height;
    return width >= popper.clientWidth && height >= popper.clientHeight;
  });

  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

  var variation = placement.split('-')[1];

  return computedPlacement + (variation ? '-' + variation : '');
}

/**
 * Get offsets to the reference element
 * @method
 * @memberof Popper.Utils
 * @param {Object} state
 * @param {Element} popper - the popper element
 * @param {Element} reference - the reference element (the popper will be relative to this)
 * @param {Element} fixedPosition - is in fixed position mode
 * @returns {Object} An object containing the offsets which will be applied to the popper
 */
function getReferenceOffsets(state, popper, reference) {
  var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));
  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
}

/**
 * Get the outer sizes of the given element (offset size + margins)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Object} object containing width and height properties
 */
function getOuterSizes(element) {
  var window = element.ownerDocument.defaultView;
  var styles = window.getComputedStyle(element);
  var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
  var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
  var result = {
    width: element.offsetWidth + y,
    height: element.offsetHeight + x
  };
  return result;
}

/**
 * Get the opposite placement of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement
 * @returns {String} flipped placement
 */
function getOppositePlacement(placement) {
  var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/**
 * Get offsets to the popper
 * @method
 * @memberof Popper.Utils
 * @param {Object} position - CSS position the Popper will get applied
 * @param {HTMLElement} popper - the popper element
 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
 * @param {String} placement - one of the valid placement options
 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
 */
function getPopperOffsets(popper, referenceOffsets, placement) {
  placement = placement.split('-')[0];

  // Get popper node sizes
  var popperRect = getOuterSizes(popper);

  // Add position, width and height to our offsets object
  var popperOffsets = {
    width: popperRect.width,
    height: popperRect.height
  };

  // depending by the popper placement we have to compute its offsets slightly differently
  var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
  var mainSide = isHoriz ? 'top' : 'left';
  var secondarySide = isHoriz ? 'left' : 'top';
  var measurement = isHoriz ? 'height' : 'width';
  var secondaryMeasurement = !isHoriz ? 'height' : 'width';

  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
  if (placement === secondarySide) {
    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
  } else {
    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
  }

  return popperOffsets;
}

/**
 * Mimics the `find` method of Array
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function find(arr, check) {
  // use native find if supported
  if (Array.prototype.find) {
    return arr.find(check);
  }

  // use `filter` to obtain the same behavior of `find`
  return arr.filter(check)[0];
}

/**
 * Return the index of the matching object
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function findIndex(arr, prop, value) {
  // use native findIndex if supported
  if (Array.prototype.findIndex) {
    return arr.findIndex(function (cur) {
      return cur[prop] === value;
    });
  }

  // use `find` + `indexOf` if `findIndex` isn't supported
  var match = find(arr, function (obj) {
    return obj[prop] === value;
  });
  return arr.indexOf(match);
}

/**
 * Loop trough the list of modifiers and run them in order,
 * each of them will then edit the data object.
 * @method
 * @memberof Popper.Utils
 * @param {dataObject} data
 * @param {Array} modifiers
 * @param {String} ends - Optional modifier name used as stopper
 * @returns {dataObject}
 */
function runModifiers(modifiers, data, ends) {
  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

  modifiersToRun.forEach(function (modifier) {
    if (modifier['function']) {
      // eslint-disable-line dot-notation
      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
    }
    var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
    if (modifier.enabled && isFunction(fn)) {
      // Add properties to offsets to make them a complete clientRect object
      // we do this before each modifier to make sure the previous one doesn't
      // mess with these values
      data.offsets.popper = getClientRect(data.offsets.popper);
      data.offsets.reference = getClientRect(data.offsets.reference);

      data = fn(data, modifier);
    }
  });

  return data;
}

/**
 * Updates the position of the popper, computing the new offsets and applying
 * the new style.<br />
 * Prefer `scheduleUpdate` over `update` because of performance reasons.
 * @method
 * @memberof Popper
 */
function update() {
  // if popper is destroyed, don't perform any further update
  if (this.state.isDestroyed) {
    return;
  }

  var data = {
    instance: this,
    styles: {},
    arrowStyles: {},
    attributes: {},
    flipped: false,
    offsets: {}
  };

  // compute reference element offsets
  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

  // store the computed placement inside `originalPlacement`
  data.originalPlacement = data.placement;

  data.positionFixed = this.options.positionFixed;

  // compute the popper offsets
  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

  data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

  // run the modifiers
  data = runModifiers(this.modifiers, data);

  // the first `update` will call `onCreate` callback
  // the other ones will call `onUpdate` callback
  if (!this.state.isCreated) {
    this.state.isCreated = true;
    this.options.onCreate(data);
  } else {
    this.options.onUpdate(data);
  }
}

/**
 * Helper used to know if the given modifier is enabled.
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean}
 */
function isModifierEnabled(modifiers, modifierName) {
  return modifiers.some(function (_ref) {
    var name = _ref.name,
        enabled = _ref.enabled;
    return enabled && name === modifierName;
  });
}

/**
 * Get the prefixed supported property name
 * @method
 * @memberof Popper.Utils
 * @argument {String} property (camelCase)
 * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
 */
function getSupportedPropertyName(property) {
  var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

  for (var i = 0; i < prefixes.length; i++) {
    var prefix = prefixes[i];
    var toCheck = prefix ? '' + prefix + upperProp : property;
    if (typeof document.body.style[toCheck] !== 'undefined') {
      return toCheck;
    }
  }
  return null;
}

/**
 * Destroys the popper.
 * @method
 * @memberof Popper
 */
function destroy() {
  this.state.isDestroyed = true;

  // touch DOM only if `applyStyle` modifier is enabled
  if (isModifierEnabled(this.modifiers, 'applyStyle')) {
    this.popper.removeAttribute('x-placement');
    this.popper.style.position = '';
    this.popper.style.top = '';
    this.popper.style.left = '';
    this.popper.style.right = '';
    this.popper.style.bottom = '';
    this.popper.style.willChange = '';
    this.popper.style[getSupportedPropertyName('transform')] = '';
  }

  this.disableEventListeners();

  // remove the popper if user explicitly asked for the deletion on destroy
  // do not use `remove` because IE11 doesn't support it
  if (this.options.removeOnDestroy) {
    this.popper.parentNode.removeChild(this.popper);
  }
  return this;
}

/**
 * Get the window associated with the element
 * @argument {Element} element
 * @returns {Window}
 */
function getWindow(element) {
  var ownerDocument = element.ownerDocument;
  return ownerDocument ? ownerDocument.defaultView : window;
}

function attachToScrollParents(scrollParent, event, callback, scrollParents) {
  var isBody = scrollParent.nodeName === 'BODY';
  var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
  target.addEventListener(event, callback, { passive: true });

  if (!isBody) {
    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
  }
  scrollParents.push(target);
}

/**
 * Setup needed event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function setupEventListeners(reference, options, state, updateBound) {
  // Resize event listener on window
  state.updateBound = updateBound;
  getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });

  // Scroll event listener on scroll parents
  var scrollElement = getScrollParent(reference);
  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
  state.scrollElement = scrollElement;
  state.eventsEnabled = true;

  return state;
}

/**
 * It will add resize/scroll events and start recalculating
 * position of the popper element when they are triggered.
 * @method
 * @memberof Popper
 */
function enableEventListeners() {
  if (!this.state.eventsEnabled) {
    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
  }
}

/**
 * Remove event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function removeEventListeners(reference, state) {
  // Remove resize event listener on window
  getWindow(reference).removeEventListener('resize', state.updateBound);

  // Remove scroll event listener on scroll parents
  state.scrollParents.forEach(function (target) {
    target.removeEventListener('scroll', state.updateBound);
  });

  // Reset state
  state.updateBound = null;
  state.scrollParents = [];
  state.scrollElement = null;
  state.eventsEnabled = false;
  return state;
}

/**
 * It will remove resize/scroll events and won't recalculate popper position
 * when they are triggered. It also won't trigger `onUpdate` callback anymore,
 * unless you call `update` method manually.
 * @method
 * @memberof Popper
 */
function disableEventListeners() {
  if (this.state.eventsEnabled) {
    cancelAnimationFrame(this.scheduleUpdate);
    this.state = removeEventListeners(this.reference, this.state);
  }
}

/**
 * Tells if a given input is a number
 * @method
 * @memberof Popper.Utils
 * @param {*} input to check
 * @return {Boolean}
 */
function isNumeric(n) {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Set the style to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the style to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setStyles(element, styles) {
  Object.keys(styles).forEach(function (prop) {
    var unit = '';
    // add unit if the value is numeric and is one of the following
    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
      unit = 'px';
    }
    element.style[prop] = styles[prop] + unit;
  });
}

/**
 * Set the attributes to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the attributes to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(function (prop) {
    var value = attributes[prop];
    if (value !== false) {
      element.setAttribute(prop, attributes[prop]);
    } else {
      element.removeAttribute(prop);
    }
  });
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} data.styles - List of style properties - values to apply to popper element
 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The same data object
 */
function applyStyle(data) {
  // any property present in `data.styles` will be applied to the popper,
  // in this way we can make the 3rd party modifiers add custom styles to it
  // Be aware, modifiers could override the properties defined in the previous
  // lines of this modifier!
  setStyles(data.instance.popper, data.styles);

  // any property present in `data.attributes` will be applied to the popper,
  // they will be set as HTML attributes of the element
  setAttributes(data.instance.popper, data.attributes);

  // if arrowElement is defined and arrowStyles has some properties
  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
    setStyles(data.arrowElement, data.arrowStyles);
  }

  return data;
}

/**
 * Set the x-placement attribute before everything else because it could be used
 * to add margins to the popper margins needs to be calculated to get the
 * correct popper offsets.
 * @method
 * @memberof Popper.modifiers
 * @param {HTMLElement} reference - The reference element used to position the popper
 * @param {HTMLElement} popper - The HTML element used as popper
 * @param {Object} options - Popper.js options
 */
function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
  // compute reference element offsets
  var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

  popper.setAttribute('x-placement', placement);

  // Apply `position` to popper before anything else because
  // without the position applied we can't guarantee correct computations
  setStyles(popper, { position: options.positionFixed ? 'fixed' : 'absolute' });

  return options;
}

/**
 * @function
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Boolean} shouldRound - If the offsets should be rounded at all
 * @returns {Object} The popper's position offsets rounded
 *
 * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
 * good as it can be within reason.
 * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
 *
 * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
 * as well on High DPI screens).
 *
 * Firefox prefers no rounding for positioning and does not have blurriness on
 * high DPI screens.
 *
 * Only horizontal placement and left/right values need to be considered.
 */
function getRoundedOffsets(data, shouldRound) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var round = Math.round,
      floor = Math.floor;

  var noRound = function noRound(v) {
    return v;
  };

  var referenceWidth = round(reference.width);
  var popperWidth = round(popper.width);

  var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
  var isVariation = data.placement.indexOf('-') !== -1;
  var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
  var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;

  var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
  var verticalToInteger = !shouldRound ? noRound : round;

  return {
    left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
    top: verticalToInteger(popper.top),
    bottom: verticalToInteger(popper.bottom),
    right: horizontalToInteger(popper.right)
  };
}

var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeStyle(data, options) {
  var x = options.x,
      y = options.y;
  var popper = data.offsets.popper;

  // Remove this legacy support in Popper.js v2

  var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'applyStyle';
  }).gpuAcceleration;
  if (legacyGpuAccelerationOption !== undefined) {
    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
  }
  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

  var offsetParent = getOffsetParent(data.instance.popper);
  var offsetParentRect = getBoundingClientRect(offsetParent);

  // Styles
  var styles = {
    position: popper.position
  };

  var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);

  var sideA = x === 'bottom' ? 'top' : 'bottom';
  var sideB = y === 'right' ? 'left' : 'right';

  // if gpuAcceleration is set to `true` and transform is supported,
  //  we use `translate3d` to apply the position to the popper we
  // automatically use the supported prefixed version if needed
  var prefixedProperty = getSupportedPropertyName('transform');

  // now, let's make a step back and look at this code closely (wtf?)
  // If the content of the popper grows once it's been positioned, it
  // may happen that the popper gets misplaced because of the new content
  // overflowing its reference element
  // To avoid this problem, we provide two options (x and y), which allow
  // the consumer to define the offset origin.
  // If we position a popper on top of a reference element, we can set
  // `x` to `top` to make the popper grow towards its top instead of
  // its bottom.
  var left = void 0,
      top = void 0;
  if (sideA === 'bottom') {
    // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
    // and not the bottom of the html element
    if (offsetParent.nodeName === 'HTML') {
      top = -offsetParent.clientHeight + offsets.bottom;
    } else {
      top = -offsetParentRect.height + offsets.bottom;
    }
  } else {
    top = offsets.top;
  }
  if (sideB === 'right') {
    if (offsetParent.nodeName === 'HTML') {
      left = -offsetParent.clientWidth + offsets.right;
    } else {
      left = -offsetParentRect.width + offsets.right;
    }
  } else {
    left = offsets.left;
  }
  if (gpuAcceleration && prefixedProperty) {
    styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
    styles[sideA] = 0;
    styles[sideB] = 0;
    styles.willChange = 'transform';
  } else {
    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
    var invertTop = sideA === 'bottom' ? -1 : 1;
    var invertLeft = sideB === 'right' ? -1 : 1;
    styles[sideA] = top * invertTop;
    styles[sideB] = left * invertLeft;
    styles.willChange = sideA + ', ' + sideB;
  }

  // Attributes
  var attributes = {
    'x-placement': data.placement
  };

  // Update `data` attributes, styles and arrowStyles
  data.attributes = _extends({}, attributes, data.attributes);
  data.styles = _extends({}, styles, data.styles);
  data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);

  return data;
}

/**
 * Helper used to know if the given modifier depends from another one.<br />
 * It checks if the needed modifier is listed and enabled.
 * @method
 * @memberof Popper.Utils
 * @param {Array} modifiers - list of modifiers
 * @param {String} requestingName - name of requesting modifier
 * @param {String} requestedName - name of requested modifier
 * @returns {Boolean}
 */
function isModifierRequired(modifiers, requestingName, requestedName) {
  var requesting = find(modifiers, function (_ref) {
    var name = _ref.name;
    return name === requestingName;
  });

  var isRequired = !!requesting && modifiers.some(function (modifier) {
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  });

  if (!isRequired) {
    var _requesting = '`' + requestingName + '`';
    var requested = '`' + requestedName + '`';
    console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
  }
  return isRequired;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function arrow(data, options) {
  var _data$offsets$arrow;

  // arrow depends on keepTogether in order to work
  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
    return data;
  }

  var arrowElement = options.element;

  // if arrowElement is a string, suppose it's a CSS selector
  if (typeof arrowElement === 'string') {
    arrowElement = data.instance.popper.querySelector(arrowElement);

    // if arrowElement is not found, don't run the modifier
    if (!arrowElement) {
      return data;
    }
  } else {
    // if the arrowElement isn't a query selector we must check that the
    // provided DOM node is child of its popper node
    if (!data.instance.popper.contains(arrowElement)) {
      console.warn('WARNING: `arrow.element` must be child of its popper element!');
      return data;
    }
  }

  var placement = data.placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isVertical = ['left', 'right'].indexOf(placement) !== -1;

  var len = isVertical ? 'height' : 'width';
  var sideCapitalized = isVertical ? 'Top' : 'Left';
  var side = sideCapitalized.toLowerCase();
  var altSide = isVertical ? 'left' : 'top';
  var opSide = isVertical ? 'bottom' : 'right';
  var arrowElementSize = getOuterSizes(arrowElement)[len];

  //
  // extends keepTogether behavior making sure the popper and its
  // reference have enough pixels in conjunction
  //

  // top/left side
  if (reference[opSide] - arrowElementSize < popper[side]) {
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
  }
  // bottom/right side
  if (reference[side] + arrowElementSize > popper[opSide]) {
    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
  }
  data.offsets.popper = getClientRect(data.offsets.popper);

  // compute center of the popper
  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

  // Compute the sideValue using the updated popper offsets
  // take popper margin in account because we don't have this info available
  var css = getStyleComputedProperty(data.instance.popper);
  var popperMarginSide = parseFloat(css['margin' + sideCapitalized]);
  var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width']);
  var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

  // prevent arrowElement from being placed not contiguously to its popper
  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

  data.arrowElement = arrowElement;
  data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

  return data;
}

/**
 * Get the opposite placement variation of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement variation
 * @returns {String} flipped placement variation
 */
function getOppositeVariation(variation) {
  if (variation === 'end') {
    return 'start';
  } else if (variation === 'start') {
    return 'end';
  }
  return variation;
}

/**
 * List of accepted placements to use as values of the `placement` option.<br />
 * Valid placements are:
 * - `auto`
 * - `top`
 * - `right`
 * - `bottom`
 * - `left`
 *
 * Each placement can have a variation from this list:
 * - `-start`
 * - `-end`
 *
 * Variations are interpreted easily if you think of them as the left to right
 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
 * is right.<br />
 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
 *
 * Some valid examples are:
 * - `top-end` (on top of reference, right aligned)
 * - `right-start` (on right of reference, top aligned)
 * - `bottom` (on bottom, centered)
 * - `auto-end` (on the side with more space available, alignment depends by placement)
 *
 * @static
 * @type {Array}
 * @enum {String}
 * @readonly
 * @method placements
 * @memberof Popper
 */
var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

// Get rid of `auto` `auto-start` and `auto-end`
var validPlacements = placements.slice(3);

/**
 * Given an initial placement, returns all the subsequent placements
 * clockwise (or counter-clockwise).
 *
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement - A valid placement (it accepts variations)
 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
 * @returns {Array} placements including their variations
 */
function clockwise(placement) {
  var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var index = validPlacements.indexOf(placement);
  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
  return counter ? arr.reverse() : arr;
}

var BEHAVIORS = {
  FLIP: 'flip',
  CLOCKWISE: 'clockwise',
  COUNTERCLOCKWISE: 'counterclockwise'
};

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function flip(data, options) {
  // if `inner` modifier is enabled, we can't use the `flip` modifier
  if (isModifierEnabled(data.instance.modifiers, 'inner')) {
    return data;
  }

  if (data.flipped && data.placement === data.originalPlacement) {
    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
    return data;
  }

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);

  var placement = data.placement.split('-')[0];
  var placementOpposite = getOppositePlacement(placement);
  var variation = data.placement.split('-')[1] || '';

  var flipOrder = [];

  switch (options.behavior) {
    case BEHAVIORS.FLIP:
      flipOrder = [placement, placementOpposite];
      break;
    case BEHAVIORS.CLOCKWISE:
      flipOrder = clockwise(placement);
      break;
    case BEHAVIORS.COUNTERCLOCKWISE:
      flipOrder = clockwise(placement, true);
      break;
    default:
      flipOrder = options.behavior;
  }

  flipOrder.forEach(function (step, index) {
    if (placement !== step || flipOrder.length === index + 1) {
      return data;
    }

    placement = data.placement.split('-')[0];
    placementOpposite = getOppositePlacement(placement);

    var popperOffsets = data.offsets.popper;
    var refOffsets = data.offsets.reference;

    // using floor because the reference offsets may contain decimals we are not going to consider here
    var floor = Math.floor;
    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

    // flip the variation if required
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;

    // flips variation if reference element overflows boundaries
    var flippedVariationByRef = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

    // flips variation if popper content overflows boundaries
    var flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === 'start' && overflowsRight || isVertical && variation === 'end' && overflowsLeft || !isVertical && variation === 'start' && overflowsBottom || !isVertical && variation === 'end' && overflowsTop);

    var flippedVariation = flippedVariationByRef || flippedVariationByContent;

    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      // this boolean to detect any flip loop
      data.flipped = true;

      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }

      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }

      data.placement = placement + (variation ? '-' + variation : '');

      // this object contains `position`, we want to preserve it along with
      // any additional property we may add in the future
      data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

      data = runModifiers(data.instance.modifiers, data, 'flip');
    }
  });
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function keepTogether(data) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var placement = data.placement.split('-')[0];
  var floor = Math.floor;
  var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
  var side = isVertical ? 'right' : 'bottom';
  var opSide = isVertical ? 'left' : 'top';
  var measurement = isVertical ? 'width' : 'height';

  if (popper[side] < floor(reference[opSide])) {
    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
  }
  if (popper[opSide] > floor(reference[side])) {
    data.offsets.popper[opSide] = floor(reference[side]);
  }

  return data;
}

/**
 * Converts a string containing value + unit into a px value number
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} str - Value + unit string
 * @argument {String} measurement - `height` or `width`
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @returns {Number|String}
 * Value in pixels, or original string if no values were extracted
 */
function toValue(str, measurement, popperOffsets, referenceOffsets) {
  // separate value from unit
  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
  var value = +split[1];
  var unit = split[2];

  // If it's not a number it's an operator, I guess
  if (!value) {
    return str;
  }

  if (unit.indexOf('%') === 0) {
    var element = void 0;
    switch (unit) {
      case '%p':
        element = popperOffsets;
        break;
      case '%':
      case '%r':
      default:
        element = referenceOffsets;
    }

    var rect = getClientRect(element);
    return rect[measurement] / 100 * value;
  } else if (unit === 'vh' || unit === 'vw') {
    // if is a vh or vw, we calculate the size based on the viewport
    var size = void 0;
    if (unit === 'vh') {
      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    } else {
      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
    return size / 100 * value;
  } else {
    // if is an explicit pixel unit, we get rid of the unit and keep the value
    // if is an implicit unit, it's px, and we return just the value
    return value;
  }
}

/**
 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} offset
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @argument {String} basePlacement
 * @returns {Array} a two cells array with x and y offsets in numbers
 */
function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
  var offsets = [0, 0];

  // Use height if placement is left or right and index is 0 otherwise use width
  // in this way the first offset will use an axis and the second one
  // will use the other one
  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

  // Split the offset string to obtain a list of values and operands
  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
  var fragments = offset.split(/(\+|\-)/).map(function (frag) {
    return frag.trim();
  });

  // Detect if the offset string contains a pair of values or a single one
  // they could be separated by comma or space
  var divider = fragments.indexOf(find(fragments, function (frag) {
    return frag.search(/,|\s/) !== -1;
  }));

  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
  }

  // If divider is found, we divide the list of values and operands to divide
  // them by ofset X and Y.
  var splitRegex = /\s*,\s*|\s+/;
  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

  // Convert the values with units to absolute pixels to allow our computations
  ops = ops.map(function (op, index) {
    // Most of the units rely on the orientation of the popper
    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
    var mergeWithPrevious = false;
    return op
    // This aggregates any `+` or `-` sign that aren't considered operators
    // e.g.: 10 + +5 => [10, +, +5]
    .reduce(function (a, b) {
      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
        a[a.length - 1] = b;
        mergeWithPrevious = true;
        return a;
      } else if (mergeWithPrevious) {
        a[a.length - 1] += b;
        mergeWithPrevious = false;
        return a;
      } else {
        return a.concat(b);
      }
    }, [])
    // Here we convert the string values into number values (in px)
    .map(function (str) {
      return toValue(str, measurement, popperOffsets, referenceOffsets);
    });
  });

  // Loop trough the offsets arrays and execute the operations
  ops.forEach(function (op, index) {
    op.forEach(function (frag, index2) {
      if (isNumeric(frag)) {
        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
      }
    });
  });
  return offsets;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @argument {Number|String} options.offset=0
 * The offset value as described in the modifier description
 * @returns {Object} The data object, properly modified
 */
function offset(data, _ref) {
  var offset = _ref.offset;
  var placement = data.placement,
      _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var basePlacement = placement.split('-')[0];

  var offsets = void 0;
  if (isNumeric(+offset)) {
    offsets = [+offset, 0];
  } else {
    offsets = parseOffset(offset, popper, reference, basePlacement);
  }

  if (basePlacement === 'left') {
    popper.top += offsets[0];
    popper.left -= offsets[1];
  } else if (basePlacement === 'right') {
    popper.top += offsets[0];
    popper.left += offsets[1];
  } else if (basePlacement === 'top') {
    popper.left += offsets[0];
    popper.top -= offsets[1];
  } else if (basePlacement === 'bottom') {
    popper.left += offsets[0];
    popper.top += offsets[1];
  }

  data.popper = popper;
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function preventOverflow(data, options) {
  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

  // If offsetParent is the reference element, we really want to
  // go one step up and use the next offsetParent as reference to
  // avoid to make this modifier completely useless and look like broken
  if (data.instance.reference === boundariesElement) {
    boundariesElement = getOffsetParent(boundariesElement);
  }

  // NOTE: DOM access here
  // resets the popper's position so that the document size can be calculated excluding
  // the size of the popper element itself
  var transformProp = getSupportedPropertyName('transform');
  var popperStyles = data.instance.popper.style; // assignment to help minification
  var top = popperStyles.top,
      left = popperStyles.left,
      transform = popperStyles[transformProp];

  popperStyles.top = '';
  popperStyles.left = '';
  popperStyles[transformProp] = '';

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

  // NOTE: DOM access here
  // restores the original style properties after the offsets have been computed
  popperStyles.top = top;
  popperStyles.left = left;
  popperStyles[transformProp] = transform;

  options.boundaries = boundaries;

  var order = options.priority;
  var popper = data.offsets.popper;

  var check = {
    primary: function primary(placement) {
      var value = popper[placement];
      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
        value = Math.max(popper[placement], boundaries[placement]);
      }
      return defineProperty({}, placement, value);
    },
    secondary: function secondary(placement) {
      var mainSide = placement === 'right' ? 'left' : 'top';
      var value = popper[mainSide];
      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
      }
      return defineProperty({}, mainSide, value);
    }
  };

  order.forEach(function (placement) {
    var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
    popper = _extends({}, popper, check[side](placement));
  });

  data.offsets.popper = popper;

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function shift(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var shiftvariation = placement.split('-')[1];

  // if shift shiftvariation is specified, run the modifier
  if (shiftvariation) {
    var _data$offsets = data.offsets,
        reference = _data$offsets.reference,
        popper = _data$offsets.popper;

    var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
    var side = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    var shiftOffsets = {
      start: defineProperty({}, side, reference[side]),
      end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
    };

    data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function hide(data) {
  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
    return data;
  }

  var refRect = data.offsets.reference;
  var bound = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'preventOverflow';
  }).boundaries;

  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === true) {
      return data;
    }

    data.hide = true;
    data.attributes['x-out-of-boundaries'] = '';
  } else {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === false) {
      return data;
    }

    data.hide = false;
    data.attributes['x-out-of-boundaries'] = false;
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function inner(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

  var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

  popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

  data.placement = getOppositePlacement(placement);
  data.offsets.popper = getClientRect(popper);

  return data;
}

/**
 * Modifier function, each modifier can have a function of this type assigned
 * to its `fn` property.<br />
 * These functions will be called on each update, this means that you must
 * make sure they are performant enough to avoid performance bottlenecks.
 *
 * @function ModifierFn
 * @argument {dataObject} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {dataObject} The data object, properly modified
 */

/**
 * Modifiers are plugins used to alter the behavior of your poppers.<br />
 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
 * needed by the library.
 *
 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
 * All the other properties are configurations that could be tweaked.
 * @namespace modifiers
 */
var modifiers = {
  /**
   * Modifier used to shift the popper on the start or end of its reference
   * element.<br />
   * It will read the variation of the `placement` property.<br />
   * It can be one either `-end` or `-start`.
   * @memberof modifiers
   * @inner
   */
  shift: {
    /** @prop {number} order=100 - Index used to define the order of execution */
    order: 100,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: shift
  },

  /**
   * The `offset` modifier can shift your popper on both its axis.
   *
   * It accepts the following units:
   * - `px` or unit-less, interpreted as pixels
   * - `%` or `%r`, percentage relative to the length of the reference element
   * - `%p`, percentage relative to the length of the popper element
   * - `vw`, CSS viewport width unit
   * - `vh`, CSS viewport height unit
   *
   * For length is intended the main axis relative to the placement of the popper.<br />
   * This means that if the placement is `top` or `bottom`, the length will be the
   * `width`. In case of `left` or `right`, it will be the `height`.
   *
   * You can provide a single value (as `Number` or `String`), or a pair of values
   * as `String` divided by a comma or one (or more) white spaces.<br />
   * The latter is a deprecated method because it leads to confusion and will be
   * removed in v2.<br />
   * Additionally, it accepts additions and subtractions between different units.
   * Note that multiplications and divisions aren't supported.
   *
   * Valid examples are:
   * ```
   * 10
   * '10%'
   * '10, 10'
   * '10%, 10'
   * '10 + 10%'
   * '10 - 5vh + 3%'
   * '-10px + 5vh, 5px - 6%'
   * ```
   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
   * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
   *
   * @memberof modifiers
   * @inner
   */
  offset: {
    /** @prop {number} order=200 - Index used to define the order of execution */
    order: 200,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: offset,
    /** @prop {Number|String} offset=0
     * The offset value as described in the modifier description
     */
    offset: 0
  },

  /**
   * Modifier used to prevent the popper from being positioned outside the boundary.
   *
   * A scenario exists where the reference itself is not within the boundaries.<br />
   * We can say it has "escaped the boundaries" — or just "escaped".<br />
   * In this case we need to decide whether the popper should either:
   *
   * - detach from the reference and remain "trapped" in the boundaries, or
   * - if it should ignore the boundary and "escape with its reference"
   *
   * When `escapeWithReference` is set to`true` and reference is completely
   * outside its boundaries, the popper will overflow (or completely leave)
   * the boundaries in order to remain attached to the edge of the reference.
   *
   * @memberof modifiers
   * @inner
   */
  preventOverflow: {
    /** @prop {number} order=300 - Index used to define the order of execution */
    order: 300,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: preventOverflow,
    /**
     * @prop {Array} [priority=['left','right','top','bottom']]
     * Popper will try to prevent overflow following these priorities by default,
     * then, it could overflow on the left and on top of the `boundariesElement`
     */
    priority: ['left', 'right', 'top', 'bottom'],
    /**
     * @prop {number} padding=5
     * Amount of pixel used to define a minimum distance between the boundaries
     * and the popper. This makes sure the popper always has a little padding
     * between the edges of its container
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='scrollParent'
     * Boundaries used by the modifier. Can be `scrollParent`, `window`,
     * `viewport` or any DOM element.
     */
    boundariesElement: 'scrollParent'
  },

  /**
   * Modifier used to make sure the reference and its popper stay near each other
   * without leaving any gap between the two. Especially useful when the arrow is
   * enabled and you want to ensure that it points to its reference element.
   * It cares only about the first axis. You can still have poppers with margin
   * between the popper and its reference element.
   * @memberof modifiers
   * @inner
   */
  keepTogether: {
    /** @prop {number} order=400 - Index used to define the order of execution */
    order: 400,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: keepTogether
  },

  /**
   * This modifier is used to move the `arrowElement` of the popper to make
   * sure it is positioned between the reference element and its popper element.
   * It will read the outer size of the `arrowElement` node to detect how many
   * pixels of conjunction are needed.
   *
   * It has no effect if no `arrowElement` is provided.
   * @memberof modifiers
   * @inner
   */
  arrow: {
    /** @prop {number} order=500 - Index used to define the order of execution */
    order: 500,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: arrow,
    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
    element: '[x-arrow]'
  },

  /**
   * Modifier used to flip the popper's placement when it starts to overlap its
   * reference element.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   *
   * **NOTE:** this modifier will interrupt the current update cycle and will
   * restart it if it detects the need to flip the placement.
   * @memberof modifiers
   * @inner
   */
  flip: {
    /** @prop {number} order=600 - Index used to define the order of execution */
    order: 600,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: flip,
    /**
     * @prop {String|Array} behavior='flip'
     * The behavior used to change the popper's placement. It can be one of
     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
     * placements (with optional variations)
     */
    behavior: 'flip',
    /**
     * @prop {number} padding=5
     * The popper will flip if it hits the edges of the `boundariesElement`
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='viewport'
     * The element which will define the boundaries of the popper position.
     * The popper will never be placed outside of the defined boundaries
     * (except if `keepTogether` is enabled)
     */
    boundariesElement: 'viewport',
    /**
     * @prop {Boolean} flipVariations=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the reference element overlaps its boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariations: false,
    /**
     * @prop {Boolean} flipVariationsByContent=false
     * The popper will switch placement variation between `-start` and `-end` when
     * the popper element overlaps its reference boundaries.
     *
     * The original placement should have a set variation.
     */
    flipVariationsByContent: false
  },

  /**
   * Modifier used to make the popper flow toward the inner of the reference element.
   * By default, when this modifier is disabled, the popper will be placed outside
   * the reference element.
   * @memberof modifiers
   * @inner
   */
  inner: {
    /** @prop {number} order=700 - Index used to define the order of execution */
    order: 700,
    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
    enabled: false,
    /** @prop {ModifierFn} */
    fn: inner
  },

  /**
   * Modifier used to hide the popper when its reference element is outside of the
   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
   * be used to hide with a CSS selector the popper when its reference is
   * out of boundaries.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   * @memberof modifiers
   * @inner
   */
  hide: {
    /** @prop {number} order=800 - Index used to define the order of execution */
    order: 800,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: hide
  },

  /**
   * Computes the style that will be applied to the popper element to gets
   * properly positioned.
   *
   * Note that this modifier will not touch the DOM, it just prepares the styles
   * so that `applyStyle` modifier can apply it. This separation is useful
   * in case you need to replace `applyStyle` with a custom implementation.
   *
   * This modifier has `850` as `order` value to maintain backward compatibility
   * with previous versions of Popper.js. Expect the modifiers ordering method
   * to change in future major versions of the library.
   *
   * @memberof modifiers
   * @inner
   */
  computeStyle: {
    /** @prop {number} order=850 - Index used to define the order of execution */
    order: 850,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: computeStyle,
    /**
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: true,
    /**
     * @prop {string} [x='bottom']
     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
     * Change this if your popper should grow in a direction different from `bottom`
     */
    x: 'bottom',
    /**
     * @prop {string} [x='left']
     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
     * Change this if your popper should grow in a direction different from `right`
     */
    y: 'right'
  },

  /**
   * Applies the computed styles to the popper element.
   *
   * All the DOM manipulations are limited to this modifier. This is useful in case
   * you want to integrate Popper.js inside a framework or view library and you
   * want to delegate all the DOM manipulations to it.
   *
   * Note that if you disable this modifier, you must make sure the popper element
   * has its position set to `absolute` before Popper.js can do its work!
   *
   * Just disable this modifier and define your own to achieve the desired effect.
   *
   * @memberof modifiers
   * @inner
   */
  applyStyle: {
    /** @prop {number} order=900 - Index used to define the order of execution */
    order: 900,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: applyStyle,
    /** @prop {Function} */
    onLoad: applyStyleOnLoad,
    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3D transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties
     */
    gpuAcceleration: undefined
  }
};

/**
 * The `dataObject` is an object containing all the information used by Popper.js.
 * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
 * @name dataObject
 * @property {Object} data.instance The Popper.js instance
 * @property {String} data.placement Placement applied to popper
 * @property {String} data.originalPlacement Placement originally defined on init
 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
 * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.boundaries Offsets of the popper boundaries
 * @property {Object} data.offsets The measurements of popper, reference and arrow elements
 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
 */

/**
 * Default options provided to Popper.js constructor.<br />
 * These can be overridden using the `options` argument of Popper.js.<br />
 * To override an option, simply pass an object with the same
 * structure of the `options` object, as the 3rd argument. For example:
 * ```
 * new Popper(ref, pop, {
 *   modifiers: {
 *     preventOverflow: { enabled: false }
 *   }
 * })
 * ```
 * @type {Object}
 * @static
 * @memberof Popper
 */
var Defaults = {
  /**
   * Popper's placement.
   * @prop {Popper.placements} placement='bottom'
   */
  placement: 'bottom',

  /**
   * Set this to true if you want popper to position it self in 'fixed' mode
   * @prop {Boolean} positionFixed=false
   */
  positionFixed: false,

  /**
   * Whether events (resize, scroll) are initially enabled.
   * @prop {Boolean} eventsEnabled=true
   */
  eventsEnabled: true,

  /**
   * Set to true if you want to automatically remove the popper when
   * you call the `destroy` method.
   * @prop {Boolean} removeOnDestroy=false
   */
  removeOnDestroy: false,

  /**
   * Callback called when the popper is created.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onCreate}
   */
  onCreate: function onCreate() {},

  /**
   * Callback called when the popper is updated. This callback is not called
   * on the initialization/creation of the popper, but only on subsequent
   * updates.<br />
   * By default, it is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onUpdate}
   */
  onUpdate: function onUpdate() {},

  /**
   * List of modifiers used to modify the offsets before they are applied to the popper.
   * They provide most of the functionalities of Popper.js.
   * @prop {modifiers}
   */
  modifiers: modifiers
};

/**
 * @callback onCreate
 * @param {dataObject} data
 */

/**
 * @callback onUpdate
 * @param {dataObject} data
 */

// Utils
// Methods
var Popper = function () {
  /**
   * Creates a new Popper.js instance.
   * @class Popper
   * @param {Element|referenceObject} reference - The reference element used to position the popper
   * @param {Element} popper - The HTML / XML element used as the popper
   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
   * @return {Object} instance - The generated Popper.js instance
   */
  function Popper(reference, popper) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, Popper);

    this.scheduleUpdate = function () {
      return requestAnimationFrame(_this.update);
    };

    // make update() debounced, so that it only runs at most once-per-tick
    this.update = debounce(this.update.bind(this));

    // with {} we create a new object with the options inside it
    this.options = _extends({}, Popper.Defaults, options);

    // init state
    this.state = {
      isDestroyed: false,
      isCreated: false,
      scrollParents: []
    };

    // get reference and popper elements (allow jQuery wrappers)
    this.reference = reference && reference.jquery ? reference[0] : reference;
    this.popper = popper && popper.jquery ? popper[0] : popper;

    // Deep merge modifiers options
    this.options.modifiers = {};
    Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
      _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
    });

    // Refactoring modifiers' list (Object => Array)
    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
      return _extends({
        name: name
      }, _this.options.modifiers[name]);
    })
    // sort the modifiers by order
    .sort(function (a, b) {
      return a.order - b.order;
    });

    // modifiers have the ability to execute arbitrary code when Popper.js get inited
    // such code is executed in the same order of its modifier
    // they could add new properties to their options configuration
    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
    this.modifiers.forEach(function (modifierOptions) {
      if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
      }
    });

    // fire the first update to position the popper in the right place
    this.update();

    var eventsEnabled = this.options.eventsEnabled;
    if (eventsEnabled) {
      // setup event listeners, they will take care of update the position in specific situations
      this.enableEventListeners();
    }

    this.state.eventsEnabled = eventsEnabled;
  }

  // We can't use class properties because they don't get listed in the
  // class prototype and break stuff like Sinon stubs


  createClass(Popper, [{
    key: 'update',
    value: function update$$1() {
      return update.call(this);
    }
  }, {
    key: 'destroy',
    value: function destroy$$1() {
      return destroy.call(this);
    }
  }, {
    key: 'enableEventListeners',
    value: function enableEventListeners$$1() {
      return enableEventListeners.call(this);
    }
  }, {
    key: 'disableEventListeners',
    value: function disableEventListeners$$1() {
      return disableEventListeners.call(this);
    }

    /**
     * Schedules an update. It will run on the next UI update available.
     * @method scheduleUpdate
     * @memberof Popper
     */


    /**
     * Collection of utilities useful when writing custom modifiers.
     * Starting from version 1.7, this method is available only if you
     * include `popper-utils.js` before `popper.js`.
     *
     * **DEPRECATION**: This way to access PopperUtils is deprecated
     * and will be removed in v2! Use the PopperUtils module directly instead.
     * Due to the high instability of the methods contained in Utils, we can't
     * guarantee them to follow semver. Use them at your own risk!
     * @static
     * @private
     * @type {Object}
     * @deprecated since version 1.8
     * @member Utils
     * @memberof Popper
     */

  }]);
  return Popper;
}();

/**
 * The `referenceObject` is an object that provides an interface compatible with Popper.js
 * and lets you use it as replacement of a real DOM node.<br />
 * You can use this method to position a popper relatively to a set of coordinates
 * in case you don't have a DOM node to use as reference.
 *
 * ```
 * new Popper(referenceObject, popperNode);
 * ```
 *
 * NB: This feature isn't supported in Internet Explorer 10.
 * @name referenceObject
 * @property {Function} data.getBoundingClientRect
 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
 * @property {number} data.clientWidth
 * An ES6 getter that will return the width of the virtual reference element.
 * @property {number} data.clientHeight
 * An ES6 getter that will return the height of the virtual reference element.
 */


Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
Popper.placements = placements;
Popper.Defaults = Defaults;

/* harmony default export */ __webpack_exports__["a"] = (Popper);
//# sourceMappingURL=popper.js.map

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "f772":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5692");
var uid = __webpack_require__("90e3");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "f9e3":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (true) {
    var getCurrentScript = __webpack_require__("8875")
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1135941c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/VueCronEditorBootstrap.vue?vue&type=template&id=0a36a7b8&
var VueCronEditorBootstrapvue_type_template_id_0a36a7b8_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('b-tabs',{attrs:{"content-class":"mt-3"},on:{"input":_vm.reset},model:{value:(_vm.activeTab),callback:function ($$v) {_vm.activeTab=$$v},expression:"activeTab"}},[_c('b-tab',{staticClass:"minutes-tab",attrs:{"value":0,"title":_vm._$t('minutes')}},[_c('b-row',[_c('b-col',{attrs:{"size":"12"}},[_c('b-form',{attrs:{"inline":""}},[_c('label',{staticClass:"mr-sm-2"},[_vm._v(_vm._s(_vm._$t("every")))]),_c('b-form-input',{attrs:{"type":"number"},model:{value:(_vm.editorData.minuteInterval),callback:function ($$v) {_vm.$set(_vm.editorData, "minuteInterval", $$v)},expression:"editorData.minuteInterval"}}),_c('label',{staticClass:"mr-sm-2 ml-sm-2"},[_vm._v(_vm._s(_vm._$t("mminutes")))])],1)],1)],1)],1),_c('b-tab',{staticClass:"hourly-tab",attrs:{"value":1,"title":_vm._$t('hourly')}},[_c('b-row',[_c('b-col',{attrs:{"size":"12"}},[_c('b-form',{attrs:{"inline":""}},[_c('label',{staticClass:"mr-sm-2"},[_vm._v(_vm._s(_vm._$t("every")))]),_c('b-form-input',{attrs:{"type":"number"},model:{value:(_vm.editorData.hourInterval),callback:function ($$v) {_vm.$set(_vm.editorData, "hourInterval", $$v)},expression:"editorData.hourInterval"}}),_c('label',{staticClass:"mr-sm-2 ml-sm-2"},[_vm._v(_vm._s(_vm._$t("hoursOnMinute")))]),_c('b-form-input',{attrs:{"type":"number","max":"59","min":"0"},model:{value:(_vm.editorData.minutes),callback:function ($$v) {_vm.$set(_vm.editorData, "minutes", $$v)},expression:"editorData.minutes"}})],1)],1)],1)],1),_c('b-tab',{staticClass:"daily-tab",attrs:{"value":2,"title":_vm._$t('daily')}},[_c('b-row',[_c('b-col',{attrs:{"size":"12"}},[_c('b-form',{attrs:{"inline":""}},[_c('label',{staticClass:"mr-sm-2"},[_vm._v(_vm._s(_vm._$t("every")))]),_c('b-form-input',{attrs:{"type":"number"},model:{value:(_vm.editorData.dayInterval),callback:function ($$v) {_vm.$set(_vm.editorData, "dayInterval", $$v)},expression:"editorData.dayInterval"}}),_c('label',{staticClass:"mr-sm-2 ml-sm-2"},[_vm._v(_vm._s(_vm._$t("daysAt")))]),_c('b-form-timepicker',{attrs:{"value":"dateTime","hour12":false},on:{"input":_vm.setDateTime},model:{value:(_vm.editorData.time),callback:function ($$v) {_vm.$set(_vm.editorData, "time", $$v)},expression:"editorData.time"}})],1)],1)],1)],1),_c('b-tab',{staticClass:"weekly-tab",attrs:{"value":3,"title":_vm._$t('weekly')}},[_c('b-row',[_c('b-col',{attrs:{"size":"12"}},[_c('b-form',{attrs:{"inline":""}},[_c('label',{staticClass:"mr-sm-2"},[_vm._v(_vm._s(_vm._$t("every")))]),_c('b-form-checkbox',{staticClass:"mr-sm-2",attrs:{"value":"0"},model:{value:(_vm.editorData.days),callback:function ($$v) {_vm.$set(_vm.editorData, "days", $$v)},expression:"editorData.days"}},[_vm._v(_vm._s(_vm._$t("sun")))]),_c('b-form-checkbox',{staticClass:"mr-sm-2",attrs:{"value":"1"},model:{value:(_vm.editorData.days),callback:function ($$v) {_vm.$set(_vm.editorData, "days", $$v)},expression:"editorData.days"}},[_vm._v(_vm._s(_vm._$t("mon")))]),_c('b-form-checkbox',{staticClass:"mr-sm-2",attrs:{"value":"2"},model:{value:(_vm.editorData.days),callback:function ($$v) {_vm.$set(_vm.editorData, "days", $$v)},expression:"editorData.days"}},[_vm._v(_vm._s(_vm._$t("tue")))]),_c('b-form-checkbox',{staticClass:"mr-sm-2",attrs:{"value":"3"},model:{value:(_vm.editorData.days),callback:function ($$v) {_vm.$set(_vm.editorData, "days", $$v)},expression:"editorData.days"}},[_vm._v(_vm._s(_vm._$t("wed")))]),_c('b-form-checkbox',{staticClass:"mr-sm-2",attrs:{"value":"4"},model:{value:(_vm.editorData.days),callback:function ($$v) {_vm.$set(_vm.editorData, "days", $$v)},expression:"editorData.days"}},[_vm._v(_vm._s(_vm._$t("thu")))]),_c('b-form-checkbox',{staticClass:"mr-sm-2",attrs:{"value":"5"},model:{value:(_vm.editorData.days),callback:function ($$v) {_vm.$set(_vm.editorData, "days", $$v)},expression:"editorData.days"}},[_vm._v(_vm._s(_vm._$t("fri")))]),_c('b-form-checkbox',{attrs:{"value":"6"},model:{value:(_vm.editorData.days),callback:function ($$v) {_vm.$set(_vm.editorData, "days", $$v)},expression:"editorData.days"}},[_vm._v(_vm._s(_vm._$t("sat")))]),_c('label',{staticClass:"mr-sm-2 ml-sm-2"},[_vm._v(_vm._s(_vm._$t("at")))]),_c('b-form-timepicker',{attrs:{"hour12":false},model:{value:(_vm.editorData.time),callback:function ($$v) {_vm.$set(_vm.editorData, "time", $$v)},expression:"editorData.time"}})],1)],1)],1)],1),_c('b-tab',{staticClass:"monthly-tab",attrs:{"value":4,"title":_vm._$t('monthly')}},[_c('b-row',[_c('b-col',{attrs:{"size":"12"}},[_c('b-form',{attrs:{"inline":""}},[_c('label',{staticClass:"mr-sm-2"},[_vm._v(_vm._s(_vm._$t("onThe")))]),_c('b-form-input',{attrs:{"type":"number"},model:{value:(_vm.editorData.day),callback:function ($$v) {_vm.$set(_vm.editorData, "day", $$v)},expression:"editorData.day"}}),_c('label',{staticClass:"mr-sm-2 ml-sm-2"},[_vm._v(_vm._s(_vm._$t("dayOfEvery")))]),_c('b-form-input',{attrs:{"type":"number"},model:{value:(_vm.editorData.monthInterval),callback:function ($$v) {_vm.$set(_vm.editorData, "monthInterval", $$v)},expression:"editorData.monthInterval"}}),_c('label',{staticClass:"mr-sm-2 ml-sm-2"},[_vm._v(_vm._s(_vm._$t("monthsAt")))]),_c('b-form-timepicker',{attrs:{"hour12":false},model:{value:(_vm.editorData.time),callback:function ($$v) {_vm.$set(_vm.editorData, "time", $$v)},expression:"editorData.time"}})],1)],1)],1)],1),_c('b-tab',{staticClass:"advanced-tab",attrs:{"value":4,"title":_vm._$t('advanced')}},[_c('b-row',[_c('b-col',{attrs:{"size":"12"}},[_c('b-form',{attrs:{"inline":""}},[_c('label',{staticClass:"mr-sm-2"},[_vm._v(_vm._s(_vm._$t("cronExpression")))]),_c('b-form-input',{model:{value:(_vm.editorData.cronExpression),callback:function ($$v) {_vm.$set(_vm.editorData, "cronExpression", $$v)},expression:"editorData.cronExpression"}}),_c('label',{staticClass:"mr-sm-2 ml-sm-2"},[_vm._v(" "+_vm._s(_vm.explanation)+" ")])],1)],1)],1)],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/VueCronEditorBootstrap.vue?vue&type=template&id=0a36a7b8&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.find.js
var es_array_find = __webpack_require__("7db0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.split.js
var es_string_split = __webpack_require__("1276");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.assign.js
var es_object_assign = __webpack_require__("cca6");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.js
var es_symbol = __webpack_require__("a4d3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.for-each.js
var es_array_for_each = __webpack_require__("4160");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptor.js
var es_object_get_own_property_descriptor = __webpack_require__("e439");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptors.js
var es_object_get_own_property_descriptors = __webpack_require__("dbb4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("b64b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__("159b");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js









function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.join.js
var es_array_join = __webpack_require__("a15b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__("d81d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__("fb6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__("a9e3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.match.js
var es_string_match = __webpack_require__("466d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__("5319");

// CONCATENATED MODULE: ./src/core/cronExpressions.ts










var buildExpression = function buildExpression(event) {
  if (event.type === "minutes") {
    return "*/".concat(event.minuteInterval, " * * * *");
  }

  if (event.type === "hourly") {
    return "".concat(event.minutes, " */").concat(event.hourInterval, " * * *");
  }

  if (event.type === "daily") {
    return "".concat(event.minutes, " ").concat(event.hours, " */").concat(event.dayInterval, " * *");
  }

  if (event.type === "weekly") {
    return "".concat(event.minutes, " ").concat(event.hours, " * * ") + "".concat(event.days.filter(function (d) {
      return d;
    }).sort().join());
  }

  if (event.type === "monthly") {
    return "".concat(event.minutes, " ").concat(event.hours, " ").concat(event.day, " */").concat(event.monthInterval, " *");
  }

  if (event.type === "advanced") {
    return event.cronExpression;
  }

  throw "unknown event type: ".concat(event);
};
var parseExpression = function parseExpression(expression) {
  var groups = null;

  if (expression.split(" ").length != 5) {
    return {
      type: "advanced",
      cronExpression: expression
    };
  }

  if (groups = expression.match(/^\*\/(\d+) \* \* \* \*$/)) {
    return {
      type: "minutes",
      minuteInterval: Number(groups[1])
    };
  }

  if (groups = expression.match(/^(\d+) \*\/(\d+) \* \* \*$/)) {
    return {
      type: "hourly",
      minutes: Number(groups[1]),
      hourInterval: Number(groups[2])
    };
  }

  if (groups = expression.match(/^(\d+) (\d+) \*\/(\d+) \* \*$/)) {
    return {
      type: "daily",
      minutes: Number(groups[1]),
      hours: Number(groups[2]),
      dayInterval: Number(groups[3])
    };
  }

  if (groups = expression.match(/^(\d+) (\d+) \* \* (\d)(,\d)?(,\d)?(,\d)?(,\d)?(,\d)?(,\d)?$/)) {
    var optionalDaysBeginIndex = 4;
    var matchesEndIndex = 10;
    return {
      type: "weekly",
      minutes: Number(groups[1]),
      hours: Number(groups[2]),
      days: [groups[3]].concat(groups.slice(optionalDaysBeginIndex, matchesEndIndex).map(function (d) {
        return d && d.replace(/,/, "");
      }).filter(function (d) {
        return d;
      }))
    };
  }

  if (groups = expression.match(/^(\d+) (\d+) (\d+) \*\/(\d+) \*$/)) {
    return {
      type: "monthly",
      minutes: Number(groups[1]),
      hours: Number(groups[2]),
      day: Number(groups[3]),
      monthInterval: Number(groups[4])
    };
  }

  return {
    type: "advanced",
    cronExpression: expression
  };
};
// EXTERNAL MODULE: ./node_modules/cron-validator/lib/index.js
var lib = __webpack_require__("01a8");

// EXTERNAL MODULE: ./node_modules/cronstrue/i18n.js
var i18n = __webpack_require__("7aa9");

// CONCATENATED MODULE: ./src/core/i18n.ts

var defaultLocales = {
  en: {
    every: "Every",
    mminutes: "minute(s)",
    hoursOnMinute: "hour(s) on minute",
    daysAt: "day(s) at",
    at: "at",
    onThe: "On the",
    dayOfEvery: "day, of every",
    monthsAt: "month(s), at",
    everyDay: "Every",
    mon: "Mon",
    tue: "Tue",
    wed: "Wed",
    thu: "Thu",
    fri: "Fri",
    sat: "Sat",
    sun: "Sun",
    hasToBeBetween: "Has to be between",
    and: "and",
    minutes: "MINUTES",
    hourly: "HOURLY",
    daily: "DAILY",
    weekly: "WEEKLY",
    monthly: "MONTHLY",
    advanced: "ADVANCED",
    cronExpression: "cron expression:"
  },
  pl: {
    every: "Co",
    mminutes: "minut",
    hoursOnMinute: "godzin w minucie",
    daysAt: "dni o",
    at: "o",
    onThe: "",
    dayOfEvery: "dzień miesiąca, co",
    monthsAt: "miesięcy, o godzinie",
    everyDay: "W każdy",
    mon: "Pon",
    tue: "Wt",
    wed: "Śr",
    thu: "Czw",
    fri: "Pt",
    sat: "So",
    sun: "Nie",
    hasToBeBetween: "Wymagana wartość pomiędzy",
    and: "i",
    minutes: "Minuty",
    hourly: "Godziny",
    daily: "Dni",
    weekly: "Tygodnie",
    monthly: "Miesiące",
    advanced: "Zaawansowane",
    cronExpression: "Wyrażenie cron:"
  }
};
function createI18n(customLocales, locale) {
  var allLocales = _objectSpread2({}, defaultLocales, {}, customLocales);

  return allLocales[locale];
}
// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// CONCATENATED MODULE: ./src/core/vueCronEditorMixin.ts



/**
 * vueCronEditorMixin
 * Core logic of a component.
 * Functionality dependent on UI frameworks should be implemented in derived components
 */





var initialData = {
  minutes: {
    type: "minutes",
    minuteInterval: 1
  },
  hourly: {
    type: "hourly",
    minutes: 0,
    hourInterval: 1
  },
  daily: {
    type: "daily",
    minutes: 0,
    hours: 0,
    dayInterval: 1
  },
  weekly: {
    type: "weekly",
    minutes: 0,
    hours: 0,
    days: ["1"]
  },
  monthly: {
    type: "monthly",
    hours: 0,
    minutes: 0,
    day: 1,
    monthInterval: 1
  },
  advanced: {
    type: "advanced",
    cronExpression: ""
  }
};
/* harmony default export */ var vueCronEditorMixin = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a.extend({
  created: function created() {
    this.i18n = createI18n(this.customLocales, this.locale);
    this.innerValue = this.value;

    this.__loadDataFromExpression();
  },
  props: {
    value: {
      type: String,
      default: "*/1 * * * *"
    },
    isAdvancedTabVisible: {
      type: Boolean,
      default: true
    },
    preserveStateOnSwitchToAdvanced: {
      type: Boolean,
      default: false
    },
    locale: {
      type: String,
      default: "en"
    },
    customLocales: {
      type: Object,
      default: null
    }
  },
  data: function data() {
    return {
      innerValue: "*/1 * * * *",
      editorData: Object.assign({}, initialData.minutes),
      currentTab: "minutes",
      i18n: null
    };
  },
  computed: {
    explanation: function explanation() {
      if (!this.innerValue) return "";
      return i18n["toString"](this.innerValue, {
        locale: this.locale
      });
    }
  },
  methods: {
    _$t: function _$t(key) {
      return this.i18n[key];
    },
    __loadDataFromExpression: function __loadDataFromExpression() {
      var tabData = parseExpression(this.value);
      this.$data.editorData = _objectSpread2({}, tabData);
      this.currentTab = tabData.type;
    },
    __updateCronExpression: function __updateCronExpression(event) {
      var cronExpression = buildExpression(_objectSpread2({}, event));

      if (lib["isValidCron"](cronExpression)) {
        this.innerValue = cronExpression;
        this.$emit("input", cronExpression);
      } else {
        this.innerValue = null;
        this.$emit("input", null);
      }
    },
    _resetToTab: function _resetToTab(tabKey) {
      this.currentTab = tabKey;

      if (this.preserveStateOnSwitchToAdvanced && tabKey === "advanced") {
        this.$data.editorData = {
          type: "advanced",
          cronExpression: this.innerValue
        };
        return;
      }

      this.$data.editorData = Object.assign({}, initialData[tabKey]);

      this.__updateCronExpression(initialData[tabKey]);
    }
  },
  watch: {
    value: {
      handler: function handler() {
        if (this.value == this.innerValue) {
          return;
        }

        this.__loadDataFromExpression();
      }
    },
    editorData: {
      deep: true,
      handler: function handler(changedData) {
        this.__updateCronExpression(changedData);
      }
    }
  }
}));
// EXTERNAL MODULE: ./node_modules/bootstrap/dist/css/bootstrap.css
var bootstrap = __webpack_require__("f9e3");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/dist/bootstrap-vue.css
var bootstrap_vue = __webpack_require__("2dd8");

// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/vue.js
//
// Single point of contact for Vue
//
// TODO:
//   Conditionally import Vue if no global Vue
//

/* harmony default export */ var vue = (external_commonjs_vue_commonjs2_vue_root_Vue_default.a);
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/array.js
// --- Static ---
var from = function from() {
  return Array.from.apply(Array, arguments);
};
var isArray = function isArray(val) {
  return Array.isArray(val);
}; // --- Instance ---

var arrayIncludes = function arrayIncludes(array, value) {
  return array.indexOf(value) !== -1;
};
var concat = function concat() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return Array.prototype.concat.apply([], args);
};
// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/utils/env.js
var env = __webpack_require__("938d");

// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/safe-types.js
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * SSR safe types
 */

var w = env["f" /* hasWindowSupport */] ? window : {};
var safe_types_Element = env["f" /* hasWindowSupport */] ? w.Element : /*#__PURE__*/function (_Object) {
  _inherits(Element, _Object);

  var _super = _createSuper(Element);

  function Element() {
    _classCallCheck(this, Element);

    return _super.apply(this, arguments);
  }

  return Element;
}( /*#__PURE__*/_wrapNativeSuper(Object));
var HTMLElement = env["f" /* hasWindowSupport */] ? w.HTMLElement : /*#__PURE__*/function (_Element) {
  _inherits(HTMLElement, _Element);

  var _super2 = _createSuper(HTMLElement);

  function HTMLElement() {
    _classCallCheck(this, HTMLElement);

    return _super2.apply(this, arguments);
  }

  return HTMLElement;
}(safe_types_Element);
var SVGElement = env["f" /* hasWindowSupport */] ? w.SVGElement : /*#__PURE__*/function (_Element2) {
  _inherits(SVGElement, _Element2);

  var _super3 = _createSuper(SVGElement);

  function SVGElement() {
    _classCallCheck(this, SVGElement);

    return _super3.apply(this, arguments);
  }

  return SVGElement;
}(safe_types_Element);
var File = env["f" /* hasWindowSupport */] ? w.File : /*#__PURE__*/function (_Object2) {
  _inherits(File, _Object2);

  var _super4 = _createSuper(File);

  function File() {
    _classCallCheck(this, File);

    return _super4.apply(this, arguments);
  }

  return File;
}( /*#__PURE__*/_wrapNativeSuper(Object));
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/inspect.js
function inspect_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { inspect_typeof = function _typeof(obj) { return typeof obj; }; } else { inspect_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return inspect_typeof(obj); }



 // --- Convenience inspection utilities ---

var toType = function toType(val) {
  return inspect_typeof(val);
};
var toRawType = function toRawType(val) {
  return Object.prototype.toString.call(val).slice(8, -1);
};
var toRawTypeLC = function toRawTypeLC(val) {
  return toRawType(val).toLowerCase();
};
var isUndefined = function isUndefined(val) {
  return val === undefined;
};
var isNull = function isNull(val) {
  return val === null;
};
var isEmptyString = function isEmptyString(val) {
  return val === '';
};
var isUndefinedOrNull = function isUndefinedOrNull(val) {
  return isUndefined(val) || isNull(val);
};
var isUndefinedOrNullOrEmpty = function isUndefinedOrNullOrEmpty(val) {
  return isUndefinedOrNull(val) || isEmptyString(val);
};
var isFunction = function isFunction(val) {
  return toType(val) === 'function';
};
var isBoolean = function isBoolean(val) {
  return toType(val) === 'boolean';
};
var isString = function isString(val) {
  return toType(val) === 'string';
};
var isNumber = function isNumber(val) {
  return toType(val) === 'number';
};
var isPrimitive = function isPrimitive(val) {
  return isBoolean(val) || isString(val) || isNumber(val);
};
var isDate = function isDate(val) {
  return val instanceof Date;
};
var isEvent = function isEvent(val) {
  return val instanceof Event;
};
var inspect_isFile = function isFile(val) {
  return val instanceof File;
};
var isRegExp = function isRegExp(val) {
  return toRawType(val) === 'RegExp';
};
var isPromise = function isPromise(val) {
  return !isUndefinedOrNull(val) && isFunction(val.then) && isFunction(val.catch);
}; // Extra convenience named re-exports


// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/number.js
// Number utilities
// Converts a value (string, number, etc) to an integer number
// Assumes radix base 10
var toInteger = function toInteger(value) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NaN;
  var integer = parseInt(value, 10);
  return isNaN(integer) ? defaultValue : integer;
}; // Converts a value (string, number, etc) to a number

var toFloat = function toFloat(value) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NaN;
  var float = parseFloat(value);
  return isNaN(float) ? defaultValue : float;
}; // Converts a value (string, number, etc) to a string
// representation with `precision` digits after the decimal
// Returns the string 'NaN' if the value cannot be converted

var toFixed = function toFixed(val, precision) {
  return toFloat(val).toFixed(toInteger(precision, 0));
};
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/dom.js



 // --- Constants ---

var TABABLE_SELECTOR = ['button', '[href]:not(.disabled)', 'input', 'select', 'textarea', '[tabindex]', '[contenteditable]'].map(function (s) {
  return "".concat(s, ":not(:disabled):not([disabled])");
}).join(', ');
var dom_w = env["f" /* hasWindowSupport */] ? window : {};
var d = env["b" /* hasDocumentSupport */] ? document : {};
var elProto = typeof Element !== 'undefined' ? Element.prototype : {}; // --- Normalization utils ---
// See: https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill

/* istanbul ignore next */

var matchesEl = elProto.matches || elProto.msMatchesSelector || elProto.webkitMatchesSelector; // See: https://developer.mozilla.org/en-US/docs/Web/API/Element/closest

/* istanbul ignore next */

var closestEl = elProto.closest || function (sel)
/* istanbul ignore next */
{
  var el = this;

  do {
    // Use our "patched" matches function
    if (matches(el, sel)) {
      return el;
    }

    el = el.parentElement || el.parentNode;
  } while (!isNull(el) && el.nodeType === Node.ELEMENT_NODE);

  return null;
}; // `requestAnimationFrame()` convenience method

/* istanbul ignore next: JSDOM always returns the first option */

var requestAF = dom_w.requestAnimationFrame || dom_w.webkitRequestAnimationFrame || dom_w.mozRequestAnimationFrame || dom_w.msRequestAnimationFrame || dom_w.oRequestAnimationFrame || // Fallback, but not a true polyfill
// Only needed for Opera Mini

/* istanbul ignore next */
function (cb) {
  return setTimeout(cb, 16);
};
var MutationObs = dom_w.MutationObserver || dom_w.WebKitMutationObserver || dom_w.MozMutationObserver || null; // --- Utils ---
// Remove a node from DOM

var removeNode = function removeNode(el) {
  return el && el.parentNode && el.parentNode.removeChild(el);
}; // Determine if an element is an HTML element

var isElement = function isElement(el) {
  return !!(el && el.nodeType === Node.ELEMENT_NODE);
}; // Get the currently active HTML element

var getActiveElement = function getActiveElement() {
  var excludes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var activeElement = d.activeElement;
  return activeElement && !excludes.some(function (el) {
    return el === activeElement;
  }) ? activeElement : null;
}; // Determine if an HTML element is the currently active element

var isActiveElement = function isActiveElement(el) {
  return isElement(el) && el === getActiveElement();
}; // Determine if an HTML element is visible - Faster than CSS check

var isVisible = function isVisible(el) {
  if (!isElement(el) || !el.parentNode || !dom_contains(d.body, el)) {
    // Note this can fail for shadow dom elements since they
    // are not a direct descendant of document.body
    return false;
  }

  if (el.style.display === 'none') {
    // We do this check to help with vue-test-utils when using v-show

    /* istanbul ignore next */
    return false;
  } // All browsers support getBoundingClientRect(), except JSDOM as it returns all 0's for values :(
  // So any tests that need isVisible will fail in JSDOM
  // Except when we override the getBCR prototype in some tests


  var bcr = getBCR(el);
  return !!(bcr && bcr.height > 0 && bcr.width > 0);
}; // Determine if an element is disabled

var isDisabled = function isDisabled(el) {
  return !isElement(el) || el.disabled || hasAttr(el, 'disabled') || hasClass(el, 'disabled');
}; // Cause/wait-for an element to reflow its content (adjusting its height/width)

var reflow = function reflow(el) {
  // Requesting an elements offsetHight will trigger a reflow of the element content

  /* istanbul ignore next: reflow doesn't happen in JSDOM */
  return isElement(el) && el.offsetHeight;
}; // Select all elements matching selector. Returns `[]` if none found

var dom_selectAll = function selectAll(selector, root) {
  return from((isElement(root) ? root : d).querySelectorAll(selector));
}; // Select a single element, returns `null` if not found

var dom_select = function select(selector, root) {
  return (isElement(root) ? root : d).querySelector(selector) || null;
}; // Determine if an element matches a selector

var matches = function matches(el, selector) {
  return isElement(el) ? matchesEl.call(el, selector) : false;
}; // Finds closest element matching selector. Returns `null` if not found

var closest = function closest(selector, root) {
  var includeRoot = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (!isElement(root)) {
    return null;
  }

  var el = closestEl.call(root, selector); // Native closest behaviour when `includeRoot` is truthy,
  // else emulate jQuery closest and return `null` if match is
  // the passed in root element when `includeRoot` is falsey

  return includeRoot ? el : el === root ? null : el;
}; // Returns true if the parent element contains the child element

var dom_contains = function contains(parent, child) {
  return parent && isFunction(parent.contains) ? parent.contains(child) : false;
}; // Get an element given an ID

var getById = function getById(id) {
  return d.getElementById(/^#/.test(id) ? id.slice(1) : id) || null;
}; // Add a class to an element

var addClass = function addClass(el, className) {
  // We are checking for `el.classList` existence here since IE 11
  // returns `undefined` for some elements (e.g. SVG elements)
  // See https://github.com/bootstrap-vue/bootstrap-vue/issues/2713
  if (className && isElement(el) && el.classList) {
    el.classList.add(className);
  }
}; // Remove a class from an element

var removeClass = function removeClass(el, className) {
  // We are checking for `el.classList` existence here since IE 11
  // returns `undefined` for some elements (e.g. SVG elements)
  // See https://github.com/bootstrap-vue/bootstrap-vue/issues/2713
  if (className && isElement(el) && el.classList) {
    el.classList.remove(className);
  }
}; // Test if an element has a class

var hasClass = function hasClass(el, className) {
  // We are checking for `el.classList` existence here since IE 11
  // returns `undefined` for some elements (e.g. SVG elements)
  // See https://github.com/bootstrap-vue/bootstrap-vue/issues/2713
  if (className && isElement(el) && el.classList) {
    return el.classList.contains(className);
  }

  return false;
}; // Set an attribute on an element

var setAttr = function setAttr(el, attr, val) {
  if (attr && isElement(el)) {
    el.setAttribute(attr, val);
  }
}; // Remove an attribute from an element

var removeAttr = function removeAttr(el, attr) {
  if (attr && isElement(el)) {
    el.removeAttribute(attr);
  }
}; // Get an attribute value from an element
// Returns `null` if not found

var getAttr = function getAttr(el, attr) {
  return attr && isElement(el) ? el.getAttribute(attr) : null;
}; // Determine if an attribute exists on an element
// Returns `true` or `false`, or `null` if element not found

var hasAttr = function hasAttr(el, attr) {
  return attr && isElement(el) ? el.hasAttribute(attr) : null;
}; // Return the Bounding Client Rect of an element
// Returns `null` if not an element

/* istanbul ignore next: getBoundingClientRect() doesn't work in JSDOM */

var getBCR = function getBCR(el) {
  return isElement(el) ? el.getBoundingClientRect() : null;
}; // Get computed style object for an element

/* istanbul ignore next: getComputedStyle() doesn't work in JSDOM */

var dom_getCS = function getCS(el) {
  return env["f" /* hasWindowSupport */] && isElement(el) ? dom_w.getComputedStyle(el) : {};
}; // Returns a `Selection` object representing the range of text selected
// Returns `null` if no window support is given

/* istanbul ignore next: getSelection() doesn't work in JSDOM */

var dom_getSel = function getSel() {
  return env["f" /* hasWindowSupport */] && dom_w.getSelection ? dom_w.getSelection() : null;
}; // Return an element's offset with respect to document element
// https://j11y.io/jquery/#v=git&fn=jQuery.fn.offset

var offset = function offset(el)
/* istanbul ignore next: getBoundingClientRect(), getClientRects() doesn't work in JSDOM */
{
  var _offset = {
    top: 0,
    left: 0
  };

  if (!isElement(el) || el.getClientRects().length === 0) {
    return _offset;
  }

  var bcr = getBCR(el);

  if (bcr) {
    var win = el.ownerDocument.defaultView;
    _offset.top = bcr.top + win.pageYOffset;
    _offset.left = bcr.left + win.pageXOffset;
  }

  return _offset;
}; // Return an element's offset with respect to to its offsetParent
// https://j11y.io/jquery/#v=git&fn=jQuery.fn.position

var dom_position = function position(el)
/* istanbul ignore next: getBoundingClientRect() doesn't work in JSDOM */
{
  var _offset = {
    top: 0,
    left: 0
  };

  if (!isElement(el)) {
    return _offset;
  }

  var parentOffset = {
    top: 0,
    left: 0
  };
  var elStyles = dom_getCS(el);

  if (elStyles.position === 'fixed') {
    _offset = getBCR(el) || _offset;
  } else {
    _offset = offset(el);
    var doc = el.ownerDocument;
    var offsetParent = el.offsetParent || doc.documentElement;

    while (offsetParent && (offsetParent === doc.body || offsetParent === doc.documentElement) && dom_getCS(offsetParent).position === 'static') {
      offsetParent = offsetParent.parentNode;
    }

    if (offsetParent && offsetParent !== el && offsetParent.nodeType === Node.ELEMENT_NODE) {
      parentOffset = offset(offsetParent);
      var offsetParentStyles = dom_getCS(offsetParent);
      parentOffset.top += toFloat(offsetParentStyles.borderTopWidth, 0);
      parentOffset.left += toFloat(offsetParentStyles.borderLeftWidth, 0);
    }
  }

  return {
    top: _offset.top - parentOffset.top - toFloat(elStyles.marginTop, 0),
    left: _offset.left - parentOffset.left - toFloat(elStyles.marginLeft, 0)
  };
}; // Find all tabable elements in the given element
// Assumes users have not used `tabindex` > `0` on elements

var getTabables = function getTabables() {
  var rootEl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  return dom_selectAll(TABABLE_SELECTOR, rootEl).filter(isVisible).filter(function (el) {
    return el.tabIndex > -1 && !el.disabled;
  });
}; // Attempt to focus an element, and return `true` if successful

var attemptFocus = function attemptFocus(el) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  try {
    el.focus(options);
  } catch (_unused) {}

  return isActiveElement(el);
}; // Attempt to blur an element, and return `true` if successful

var attemptBlur = function attemptBlur(el) {
  try {
    el.blur();
  } catch (_unused2) {}

  return !isActiveElement(el);
};
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/object.js
function object_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { object_ownKeys(Object(source), true).forEach(function (key) { object_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { object_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function object_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function object_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { object_typeof = function _typeof(obj) { return typeof obj; }; } else { object_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return object_typeof(obj); }

 // --- Static ---

var object_assign = function assign() {
  return Object.assign.apply(Object, arguments);
};
var create = function create(proto, optionalProps) {
  return Object.create(proto, optionalProps);
};
var defineProperties = function defineProperties(obj, props) {
  return Object.defineProperties(obj, props);
};
var defineProperty = function defineProperty(obj, prop, descriptor) {
  return Object.defineProperty(obj, prop, descriptor);
};
var freeze = function freeze(obj) {
  return Object.freeze(obj);
};
var getOwnPropertyNames = function getOwnPropertyNames(obj) {
  return Object.getOwnPropertyNames(obj);
};
var getOwnPropertyDescriptor = function getOwnPropertyDescriptor(obj, prop) {
  return Object.getOwnPropertyDescriptor(obj, prop);
};
var getOwnPropertySymbols = function getOwnPropertySymbols(obj) {
  return Object.getOwnPropertySymbols(obj);
};
var getPrototypeOf = function getPrototypeOf(obj) {
  return Object.getPrototypeOf(obj);
};
var is = function is(value1, value2) {
  return Object.is(value1, value2);
};
var isFrozen = function isFrozen(obj) {
  return Object.isFrozen(obj);
};
var keys = function keys(obj) {
  return Object.keys(obj);
}; // --- "Instance" ---

var object_hasOwnProperty = function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};
var object_toString = function toString(obj) {
  return Object.prototype.toString.call(obj);
}; // --- Utilities ---

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 * Note object could be a complex type like array, date, etc.
 */

var isObject = function isObject(obj) {
  return obj !== null && object_typeof(obj) === 'object';
};
/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */

var isPlainObject = function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
};
/**
 * Shallow copy an object. If the passed in object
 * is null or undefined, returns an empty object
 */

var clone = function clone(obj) {
  return _objectSpread({}, obj);
};
/**
 * Return a shallow copy of object with the specified properties only
 * @link https://gist.github.com/bisubus/2da8af7e801ffd813fab7ac221aa7afc
 */

var pick = function pick(obj, props) {
  return keys(obj).filter(function (key) {
    return props.indexOf(key) !== -1;
  }).reduce(function (result, key) {
    return _objectSpread(_objectSpread({}, result), {}, object_defineProperty({}, key, obj[key]));
  }, {});
};
/**
 * Return a shallow copy of object with the specified properties omitted
 * @link https://gist.github.com/bisubus/2da8af7e801ffd813fab7ac221aa7afc
 */

var omit = function omit(obj, props) {
  return keys(obj).filter(function (key) {
    return props.indexOf(key) === -1;
  }).reduce(function (result, key) {
    return _objectSpread(_objectSpread({}, result), {}, object_defineProperty({}, key, obj[key]));
  }, {});
};
/**
 * Convenience method to create a read-only descriptor
 */

var readonlyDescriptor = function readonlyDescriptor() {
  return {
    enumerable: true,
    configurable: false,
    writable: false
  };
};
/**
 * Deep-freezes and object, making it immutable / read-only.
 * Returns the same object passed-in, but frozen.
 * Freezes inner object/array/values first.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
 * Note: this method will not work for property values using Symbol() as a key
 */

var object_deepFreeze = function deepFreeze(obj) {
  // Retrieve the property names defined on object/array
  // Note: `keys` will ignore properties that are keyed by a `Symbol()`
  var props = keys(obj); // Iterate over each prop and recursively freeze it

  props.forEach(function (prop) {
    var value = obj[prop]; // If value is a plain object or array, we deepFreeze it

    obj[prop] = value && (isPlainObject(value) || isArray(value)) ? deepFreeze(value) : value;
  });
  return freeze(obj);
};
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/events.js

 // --- Constants ---

var EVENT_OPTIONS_PASSIVE = {
  passive: true
};
var EVENT_OPTIONS_NO_CAPTURE = {
  passive: true,
  capture: false
}; // --- Utils ---
// Normalize event options based on support of passive option
// Exported only for testing purposes

var events_parseEventOptions = function parseEventOptions(options) {
  /* istanbul ignore else: can't test in JSDOM, as it supports passive */
  if (env["d" /* hasPassiveEventSupport */]) {
    return isObject(options) ? options : {
      capture: !!options || false
    };
  } else {
    // Need to translate to actual Boolean value
    return !!(isObject(options) ? options.capture : options);
  }
}; // Attach an event listener to an element

var eventOn = function eventOn(el, evtName, handler, options) {
  if (el && el.addEventListener) {
    el.addEventListener(evtName, handler, events_parseEventOptions(options));
  }
}; // Remove an event listener from an element

var eventOff = function eventOff(el, evtName, handler, options) {
  if (el && el.removeEventListener) {
    el.removeEventListener(evtName, handler, events_parseEventOptions(options));
  }
}; // Utility method to add/remove a event listener based on first argument (boolean)
// It passes all other arguments to the `eventOn()` or `eventOff` method

var eventOnOff = function eventOnOff(on) {
  var method = on ? eventOn : eventOff;

  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  method.apply(void 0, args);
};
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/mixins/form.js

var SELECTOR = 'input, textarea, select'; // @vue/component

/* harmony default export */ var mixins_form = ({
  props: {
    name: {
      type: String // default: undefined

    },
    id: {
      type: String // default: undefined

    },
    disabled: {
      type: Boolean
    },
    required: {
      type: Boolean,
      default: false
    },
    form: {
      type: String // default: null

    },
    autofocus: {
      type: Boolean,
      default: false
    }
  },
  mounted: function mounted() {
    this.handleAutofocus();
  },

  /* istanbul ignore next */
  activated: function activated() {
    this.handleAutofocus();
  },
  methods: {
    handleAutofocus: function handleAutofocus() {
      var _this = this;

      this.$nextTick(function () {
        requestAF(function () {
          var el = _this.$el;

          if (_this.autofocus && isVisible(el)) {
            if (!matches(el, SELECTOR)) {
              el = dom_select(SELECTOR, el);
            }

            attemptFocus(el);
          }
        });
      });
    }
  }
});
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/mixins/form-selection.js
// @vue/component
/* harmony default export */ var form_selection = ({
  computed: {
    selectionStart: {
      // Expose selectionStart for formatters, etc
      cache: false,

      /* istanbul ignore next */
      get: function get() {
        return this.$refs.input.selectionStart;
      },

      /* istanbul ignore next */
      set: function set(val) {
        this.$refs.input.selectionStart = val;
      }
    },
    selectionEnd: {
      // Expose selectionEnd for formatters, etc
      cache: false,

      /* istanbul ignore next */
      get: function get() {
        return this.$refs.input.selectionEnd;
      },

      /* istanbul ignore next */
      set: function set(val) {
        this.$refs.input.selectionEnd = val;
      }
    },
    selectionDirection: {
      // Expose selectionDirection for formatters, etc
      cache: false,

      /* istanbul ignore next */
      get: function get() {
        return this.$refs.input.selectionDirection;
      },

      /* istanbul ignore next */
      set: function set(val) {
        this.$refs.input.selectionDirection = val;
      }
    }
  },
  methods: {
    /* istanbul ignore next */
    select: function select() {
      var _this$$refs$input;

      // For external handler that may want a select() method
      (_this$$refs$input = this.$refs.input).select.apply(_this$$refs$input, arguments);
    },

    /* istanbul ignore next */
    setSelectionRange: function setSelectionRange() {
      var _this$$refs$input2;

      // For external handler that may want a setSelectionRange(a,b,c) method
      (_this$$refs$input2 = this.$refs.input).setSelectionRange.apply(_this$$refs$input2, arguments);
    },

    /* istanbul ignore next */
    setRangeText: function setRangeText() {
      var _this$$refs$input3;

      // For external handler that may want a setRangeText(a,b,c) method
      (_this$$refs$input3 = this.$refs.input).setRangeText.apply(_this$$refs$input3, arguments);
    }
  }
});
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/clone-deep.js
function clone_deep_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function clone_deep_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { clone_deep_ownKeys(Object(source), true).forEach(function (key) { clone_deep_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { clone_deep_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function clone_deep_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



var clone_deep_cloneDeep = function cloneDeep(obj) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : obj;

  if (isArray(obj)) {
    return obj.reduce(function (result, val) {
      return [].concat(_toConsumableArray(result), [cloneDeep(val, val)]);
    }, []);
  }

  if (isPlainObject(obj)) {
    return keys(obj).reduce(function (result, key) {
      return clone_deep_objectSpread(clone_deep_objectSpread({}, result), {}, clone_deep_defineProperty({}, key, cloneDeep(obj[key], obj[key])));
    }, {});
  }

  return defaultValue;
};
/* harmony default export */ var clone_deep = (clone_deep_cloneDeep);
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/identity.js
var identity = function identity(x) {
  return x;
};

/* harmony default export */ var utils_identity = (identity);
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/get.js


var RX_ARRAY_NOTATION = /\[(\d+)]/g;
/**
 * Get property defined by dot/array notation in string, returns undefined if not found
 *
 * @link https://gist.github.com/jeneg/9767afdcca45601ea44930ea03e0febf#gistcomment-1935901
 *
 * @param {Object} obj
 * @param {string|Array} path
 * @return {*}
 */

var get_getRaw = function getRaw(obj, path) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  // Handle array of path values
  path = isArray(path) ? path.join('.') : path; // If no path or no object passed

  if (!path || !isObject(obj)) {
    return defaultValue;
  } // Handle edge case where user has dot(s) in top-level item field key
  // See https://github.com/bootstrap-vue/bootstrap-vue/issues/2762
  // Switched to `in` operator vs `hasOwnProperty` to handle obj.prototype getters
  // https://github.com/bootstrap-vue/bootstrap-vue/issues/3463


  if (path in obj) {
    return obj[path];
  } // Handle string array notation (numeric indices only)


  path = String(path).replace(RX_ARRAY_NOTATION, '.$1');
  var steps = path.split('.').filter(utils_identity); // Handle case where someone passes a string of only dots

  if (steps.length === 0) {
    return defaultValue;
  } // Traverse path in object to find result
  // Switched to `in` operator vs `hasOwnProperty` to handle obj.prototype getters
  // https://github.com/bootstrap-vue/bootstrap-vue/issues/3463


  return steps.every(function (step) {
    return isObject(obj) && step in obj && !isUndefinedOrNull(obj = obj[step]);
  }) ? obj : isNull(obj) ? null : defaultValue;
};
/**
 * Get property defined by dot/array notation in string.
 *
 * @link https://gist.github.com/jeneg/9767afdcca45601ea44930ea03e0febf#gistcomment-1935901
 *
 * @param {Object} obj
 * @param {string|Array} path
 * @param {*} defaultValue (optional)
 * @return {*}
 */

var get_get = function get(obj, path) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var val = get_getRaw(obj, path);
  return isUndefinedOrNull(val) ? defaultValue : val;
};
/* harmony default export */ var utils_get = (get_get);
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/memoize.js


var memoize_memoize = function memoize(fn) {
  var cache = create(null);
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var argsKey = JSON.stringify(args);
    return cache[argsKey] = cache[argsKey] || fn.apply(null, args);
  };
};

/* harmony default export */ var utils_memoize = (memoize_memoize);
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/config-defaults.js
 // --- General BootstrapVue configuration ---
// NOTES
//
// The global config SHALL NOT be used to set defaults for Boolean props, as the props
// would loose their semantic meaning, and force people writing 3rd party components to
// explicitly set a true or false value using the v-bind syntax on boolean props
//
// Supported config values (depending on the prop's supported type(s)):
// `String`, `Array`, `Object`, `null` or `undefined`
// BREAKPOINT DEFINITIONS
//
// Some components (`<b-col>` and `<b-form-group>`) generate props based on breakpoints,
// and this occurs when the component is first loaded (evaluated), which may happen
// before the config is created/modified
//
// To get around this we make these components' props async (lazy evaluation)
// The component definition is only called/executed when the first access to the
// component is used (and cached on subsequent uses)
// PROP DEFAULTS
//
// For default values on props, we use the default value factory function approach so
// that the default values are pulled in at each component instantiation
//
//  props: {
//    variant: {
//      type: String,
//      default: () => getConfigComponent('BAlert', 'variant')
//    }
//  }
//
// We also provide a cached getter for breakpoints, which are "frozen" on first access
// prettier-ignore

/* harmony default export */ var config_defaults = (object_deepFreeze({
  // Breakpoints
  breakpoints: ['xs', 'sm', 'md', 'lg', 'xl'],
  // Form controls
  formControls: {
    size: undefined
  },
  // Component specific defaults are keyed by the component
  // name (PascalCase) and prop name (camelCase)
  BAlert: {
    dismissLabel: 'Close',
    variant: 'info'
  },
  BAvatar: {
    variant: 'secondary',
    badgeVariant: 'primary'
  },
  BBadge: {
    variant: 'secondary'
  },
  BButton: {
    size: undefined,
    variant: 'secondary'
  },
  BButtonClose: {
    content: '&times;',
    // `textVariant` is `null` to inherit the current text color
    textVariant: undefined,
    ariaLabel: 'Close'
  },
  BCalendar: {
    // BFormDate will choose these first if not provided in BFormDate section
    labelPrevDecade: 'Previous decade',
    labelPrevYear: 'Previous year',
    labelPrevMonth: 'Previous month',
    labelCurrentMonth: 'Current month',
    labelNextMonth: 'Next month',
    labelNextYear: 'Next year',
    labelNextDecade: 'Next decade',
    labelToday: 'Today',
    labelSelected: 'Selected date',
    labelNoDateSelected: 'No date selected',
    labelCalendar: 'Calendar',
    labelNav: 'Calendar navigation',
    labelHelp: 'Use cursor keys to navigate calendar dates'
  },
  BCardSubTitle: {
    // `<b-card>` and `<b-card-body>` also inherit this prop
    subTitleTextVariant: 'muted'
  },
  BCarousel: {
    labelPrev: 'Previous Slide',
    labelNext: 'Next Slide',
    labelGotoSlide: 'Goto Slide',
    labelIndicators: 'Select a slide to display'
  },
  BDropdown: {
    toggleText: 'Toggle Dropdown',
    size: undefined,
    variant: 'secondary',
    splitVariant: undefined
  },
  BFormDatepicker: {
    // BFormDatepicker will choose from BCalendar first if not provided here
    labelPrevDecade: undefined,
    labelPrevYear: undefined,
    labelPrevMonth: undefined,
    labelCurrentMonth: undefined,
    labelNextMonth: undefined,
    labelNextYear: undefined,
    labelNextDecade: undefined,
    labelToday: undefined,
    labelSelected: undefined,
    labelNoDateSelected: undefined,
    labelCalendar: undefined,
    labelNav: undefined,
    labelHelp: undefined,
    // These props are specific to BFormDatepicker
    labelTodayButton: 'Select today',
    labelResetButton: 'Reset',
    labelCloseButton: 'Close'
  },
  BFormFile: {
    browseText: 'Browse',
    // Chrome default file prompt
    placeholder: 'No file chosen',
    dropPlaceholder: 'Drop files here'
  },
  BFormRating: {
    variant: null,
    color: null
  },
  BFormTag: {
    removeLabel: 'Remove tag',
    variant: 'secondary'
  },
  BFormTags: {
    addButtonText: 'Add',
    addButtonVariant: 'outline-secondary',
    duplicateTagText: 'Duplicate tag(s)',
    invalidTagText: 'Invalid tag(s)',
    placeholder: 'Add tag...',
    tagRemoveLabel: 'Remove tag',
    tagRemovedLabel: 'Tag removed',
    tagVariant: 'secondary'
  },
  BFormText: {
    textVariant: 'muted'
  },
  BFormTimepicker: {
    // Fallback to BTime
    labelNoTimeSelected: undefined,
    labelSelected: undefined,
    labelHours: undefined,
    labelMinutes: undefined,
    labelSeconds: undefined,
    labelAmpm: undefined,
    labelAm: undefined,
    labelPm: undefined,
    // Fallback to BTime then BFormSpinbutton
    labelDecrement: undefined,
    labelIncrement: undefined,
    // These props are specific to BFormTimepicker
    labelNowButton: 'Select now',
    labelResetButton: 'Reset',
    labelCloseButton: 'Close'
  },
  BFormSpinbutton: {
    labelDecrement: 'Decrement',
    labelIncrement: 'Increment'
  },
  BImg: {
    blankColor: 'transparent'
  },
  BImgLazy: {
    blankColor: 'transparent'
  },
  BInputGroup: {
    size: undefined
  },
  BJumbotron: {
    bgVariant: undefined,
    borderVariant: undefined,
    textVariant: undefined
  },
  BListGroupItem: {
    variant: undefined
  },
  BModal: {
    titleTag: 'h5',
    size: 'md',
    headerBgVariant: undefined,
    headerBorderVariant: undefined,
    headerTextVariant: undefined,
    headerCloseVariant: undefined,
    bodyBgVariant: undefined,
    bodyTextVariant: undefined,
    footerBgVariant: undefined,
    footerBorderVariant: undefined,
    footerTextVariant: undefined,
    cancelTitle: 'Cancel',
    cancelVariant: 'secondary',
    okTitle: 'OK',
    okVariant: 'primary',
    headerCloseContent: '&times;',
    headerCloseLabel: 'Close'
  },
  BNavbar: {
    variant: null
  },
  BNavbarToggle: {
    label: 'Toggle navigation'
  },
  BPagination: {
    size: undefined
  },
  BPaginationNav: {
    size: undefined
  },
  BPopover: {
    boundary: 'scrollParent',
    boundaryPadding: 5,
    customClass: undefined,
    delay: 50,
    variant: undefined
  },
  BProgress: {
    variant: undefined
  },
  BProgressBar: {
    variant: undefined
  },
  BSpinner: {
    variant: undefined
  },
  BSidebar: {
    bgVariant: 'light',
    textVariant: 'dark',
    shadow: false,
    width: undefined,
    tag: 'div'
  },
  BTable: {
    selectedVariant: 'active',
    headVariant: undefined,
    footVariant: undefined
  },
  BTime: {
    labelNoTimeSelected: 'No time selected',
    labelSelected: 'Selected time',
    labelHours: 'Hours',
    labelMinutes: 'Minutes',
    labelSeconds: 'Seconds',
    labelAmpm: 'AM/PM',
    // It would be nice to be able to get these from Intl.DateTimeFormat somehow
    labelAm: 'AM',
    labelPm: 'PM',
    // The following inherit from BFormSpinbutton if not provided
    labelIncrement: undefined,
    labelDecrement: undefined
  },
  BToast: {
    toaster: 'b-toaster-top-right',
    autoHideDelay: 5000,
    variant: undefined,
    toastClass: undefined,
    headerClass: undefined,
    bodyClass: undefined
  },
  BToaster: {
    ariaLive: undefined,
    ariaAtomic: undefined,
    role: undefined
  },
  BTooltip: {
    boundary: 'scrollParent',
    boundaryPadding: 5,
    customClass: undefined,
    delay: 50,
    variant: undefined
  }
}));
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/config.js




 // --- Constants ---

var PROP_NAME = '$bvConfig';
var VueProto = vue.prototype; // --- Getter methods ---
// All methods return a deep clone (immutable) copy of the config
// value, to prevent mutation of the user config object.
// Get the current user config. For testing purposes only

var getConfig = function getConfig() {
  return VueProto[PROP_NAME] ? VueProto[PROP_NAME].getConfig() : {};
}; // Method to grab a config value based on a dotted/array notation key

var config_getConfigValue = function getConfigValue(key) {
  return VueProto[PROP_NAME] ? VueProto[PROP_NAME].getConfigValue(key) : clone_deep(get_getRaw(config_defaults, key));
}; // Method to grab a config value for a particular component

var getComponentConfig = function getComponentConfig(cmpName) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  // Return the particular config value for key for if specified,
  // otherwise we return the full config (or an empty object if not found)
  return key ? config_getConfigValue("".concat(cmpName, ".").concat(key)) : config_getConfigValue(cmpName) || {};
}; // Convenience method for getting all breakpoint names

var getBreakpoints = function getBreakpoints() {
  return config_getConfigValue('breakpoints');
}; // Private function for caching / locking-in breakpoint names

var _getBreakpointsCached = utils_memoize(function () {
  return getBreakpoints();
}); // Convenience method for getting all breakpoint names.
// Caches the results after first access.


var config_getBreakpointsCached = function getBreakpointsCached() {
  return clone_deep(_getBreakpointsCached());
}; // Convenience method for getting breakpoints with
// the smallest breakpoint set as ''.
// Useful for components that create breakpoint specific props.

var getBreakpointsUp = function getBreakpointsUp() {
  var breakpoints = getBreakpoints();
  breakpoints[0] = '';
  return breakpoints;
}; // Convenience method for getting breakpoints with
// the smallest breakpoint set as ''.
// Useful for components that create breakpoint specific props.
// Caches the results after first access.

var getBreakpointsUpCached = utils_memoize(function () {
  var breakpoints = config_getBreakpointsCached();
  breakpoints[0] = '';
  return breakpoints;
}); // Convenience method for getting breakpoints with
// the largest breakpoint set as ''.
// Useful for components that create breakpoint specific props.

var getBreakpointsDown = function getBreakpointsDown() {
  var breakpoints = getBreakpoints();
  breakpoints[breakpoints.length - 1] = '';
  return breakpoints;
}; // Convenience method for getting breakpoints with
// the largest breakpoint set as ''.
// Useful for components that create breakpoint specific props.
// Caches the results after first access.

/* istanbul ignore next: we don't use this method anywhere, yet */

var getBreakpointsDownCached = function getBreakpointsDownCached()
/* istanbul ignore next */
{
  var breakpoints = config_getBreakpointsCached();
  breakpoints[breakpoints.length - 1] = '';
  return breakpoints;
};
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/mixins/form-size.js
 // @vue/component

/* harmony default export */ var form_size = ({
  props: {
    size: {
      type: String,
      default: function _default() {
        return getComponentConfig('formControls', 'size');
      }
    }
  },
  computed: {
    sizeFormClass: function sizeFormClass() {
      return [this.size ? "form-control-".concat(this.size) : null];
    },

    /* istanbul ignore next: don't think this is used */
    sizeBtnClass: function sizeBtnClass() {
      return [this.size ? "btn-".concat(this.size) : null];
    }
  }
});
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/mixins/form-state.js
/* Form control contextual state class computation
 *
 * Returned class is either 'is-valid' or 'is-invalid' based on the 'state' prop
 * state can be one of five values:
 *  - true for is-valid
 *  - false for is-invalid
 *  - null for no contextual state
 */
 // @vue/component

/* harmony default export */ var form_state = ({
  props: {
    state: {
      // Tri-state prop: true, false, null (or undefined)
      type: Boolean,
      default: null
    }
  },
  computed: {
    computedState: function computedState() {
      // If not a boolean, ensure that value is null
      return isBoolean(this.state) ? this.state : null;
    },
    stateClass: function stateClass() {
      var state = this.computedState;
      return state === true ? 'is-valid' : state === false ? 'is-invalid' : null;
    }
  }
});
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/math.js
// Math utilty functions
var mathMin = Math.min;
var mathMax = Math.max;
var mathAbs = Math.abs;
var mathCeil = Math.ceil;
var mathFloor = Math.floor;
var mathPow = Math.pow;
var mathRound = Math.round;
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/string.js
// String utilities
 // --- Constants ---

var RX_TRIM_LEFT = /^\s+/;
var RX_TRIM_RIGHT = /\s+$/;
var RX_REGEXP_REPLACE = /[-/\\^$*+?.()|[\]{}]/g;
var RX_UN_KEBAB = /-(\w)/g;
var RX_HYPHENATE = /\B([A-Z])/g; // --- Utilities ---
// Converts PascalCase or camelCase to kebab-case

var kebabCase = function kebabCase(str) {
  return str.replace(RX_HYPHENATE, '-$1').toLowerCase();
}; // Converts a kebab-case or camelCase string to PascalCase

var pascalCase = function pascalCase(str) {
  str = kebabCase(str).replace(RX_UN_KEBAB, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
  return str.charAt(0).toUpperCase() + str.slice(1);
}; // Lowercases the first letter of a string and returns a new string

var string_lowerFirst = function lowerFirst(str) {
  str = isString(str) ? str.trim() : String(str);
  return str.charAt(0).toLowerCase() + str.slice(1);
}; // Uppercases the first letter of a string and returns a new string

var string_upperFirst = function upperFirst(str) {
  str = isString(str) ? str.trim() : String(str);
  return str.charAt(0).toUpperCase() + str.slice(1);
}; // Escape characters to be used in building a regular expression

var escapeRegExp = function escapeRegExp(str) {
  return str.replace(RX_REGEXP_REPLACE, '\\$&');
}; // Convert a value to a string that can be rendered
// `undefined`/`null` will be converted to `''`
// Plain objects and arrays will be JSON stringified

var string_toString = function toString(val) {
  var spaces = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  return isUndefinedOrNull(val) ? '' : isArray(val) || isPlainObject(val) && val.toString === Object.prototype.toString ? JSON.stringify(val, null, spaces) : String(val);
}; // Remove leading white space from a string

var trimLeft = function trimLeft(str) {
  return string_toString(str).replace(RX_TRIM_LEFT, '');
}; // Remove Trailing white space from a string

var trimRight = function trimRight(str) {
  return string_toString(str).replace(RX_TRIM_RIGHT, '');
}; // Remove leading and trailing white space from a string

var trim = function trim(str) {
  return string_toString(str).trim();
}; // Lower case a string

var lowerCase = function lowerCase(str) {
  return string_toString(str).toLowerCase();
}; // Upper case a string

var upperCase = function upperCase(str) {
  return string_toString(str).toUpperCase();
};
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/mixins/form-text.js




 // @vue/component

/* harmony default export */ var form_text = ({
  model: {
    prop: 'value',
    event: 'update'
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    ariaInvalid: {
      type: [Boolean, String],
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    plaintext: {
      type: Boolean,
      default: false
    },
    autocomplete: {
      type: String // default: null

    },
    placeholder: {
      type: String // default: null

    },
    formatter: {
      type: Function // default: null

    },
    lazyFormatter: {
      type: Boolean,
      default: false
    },
    trim: {
      type: Boolean,
      default: false
    },
    number: {
      type: Boolean,
      default: false
    },
    lazy: {
      // Only update the `v-model` on blur/change events
      type: Boolean,
      default: false
    },
    debounce: {
      // Debounce timeout (in ms). Not applicable with `lazy` prop
      type: [Number, String],
      default: 0
    }
  },
  data: function data() {
    return {
      localValue: string_toString(this.value),
      vModelValue: this.value
    };
  },
  computed: {
    computedClass: function computedClass() {
      return [{
        // Range input needs class `custom-range`
        'custom-range': this.type === 'range',
        // `plaintext` not supported by `type="range"` or `type="color"`
        'form-control-plaintext': this.plaintext && this.type !== 'range' && this.type !== 'color',
        // `form-control` not used by `type="range"` or `plaintext`
        // Always used by `type="color"`
        'form-control': !this.plaintext && this.type !== 'range' || this.type === 'color'
      }, this.sizeFormClass, this.stateClass];
    },
    computedAriaInvalid: function computedAriaInvalid() {
      if (!this.ariaInvalid || this.ariaInvalid === 'false') {
        // `this.ariaInvalid` is `null` or `false` or 'false'
        return this.computedState === false ? 'true' : null;
      }

      if (this.ariaInvalid === true) {
        // User wants explicit `:aria-invalid="true"`
        return 'true';
      } // Most likely a string value (which could be the string 'true')


      return this.ariaInvalid;
    },
    computedDebounce: function computedDebounce() {
      // Ensure we have a positive number equal to or greater than 0
      return mathMax(toInteger(this.debounce, 0), 0);
    },
    hasFormatter: function hasFormatter() {
      return isFunction(this.formatter);
    }
  },
  watch: {
    value: function value(newVal) {
      var stringifyValue = string_toString(newVal);

      if (stringifyValue !== this.localValue && newVal !== this.vModelValue) {
        // Clear any pending debounce timeout, as we are overwriting the user input
        this.clearDebounce(); // Update the local values

        this.localValue = stringifyValue;
        this.vModelValue = newVal;
      }
    }
  },
  mounted: function mounted() {
    // Create non-reactive property and set up destroy handler
    this.$_inputDebounceTimer = null;
    this.$on('hook:beforeDestroy', this.clearDebounce); // Preset the internal state

    var value = this.value;
    var stringifyValue = string_toString(value);
    /* istanbul ignore next */

    if (stringifyValue !== this.localValue && value !== this.vModelValue) {
      this.localValue = stringifyValue;
      this.vModelValue = value;
    }
  },
  methods: {
    clearDebounce: function clearDebounce() {
      clearTimeout(this.$_inputDebounceTimer);
      this.$_inputDebounceTimer = null;
    },
    formatValue: function formatValue(value, evt) {
      var force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      value = string_toString(value);

      if (this.hasFormatter && (!this.lazyFormatter || force)) {
        value = this.formatter(value, evt);
      }

      return value;
    },
    modifyValue: function modifyValue(value) {
      // Emulate `.trim` modifier behaviour
      if (this.trim) {
        value = value.trim();
      } // Emulate `.number` modifier behaviour


      if (this.number) {
        value = toFloat(value, value);
      }

      return value;
    },
    updateValue: function updateValue(value) {
      var _this = this;

      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var lazy = this.lazy;

      if (lazy && !force) {
        return;
      }

      value = this.modifyValue(value);

      if (value !== this.vModelValue) {
        this.clearDebounce();

        var doUpdate = function doUpdate() {
          _this.vModelValue = value;

          _this.$emit('update', value);
        };

        var debounce = this.computedDebounce; // Only debounce the value update when a value greater than `0`
        // is set and we are not in lazy mode or this is a forced update

        if (debounce > 0 && !lazy && !force) {
          this.$_inputDebounceTimer = setTimeout(doUpdate, debounce);
        } else {
          // Immediately update the v-model
          doUpdate();
        }
      } else if (this.hasFormatter) {
        // When the `vModelValue` hasn't changed but the actual input value
        // is out of sync, make sure to change it to the given one
        // Usually caused by browser autocomplete and how it triggers the
        // change or input event, or depending on the formatter function
        // https://github.com/bootstrap-vue/bootstrap-vue/issues/2657
        // https://github.com/bootstrap-vue/bootstrap-vue/issues/3498

        /* istanbul ignore next: hard to test */
        var $input = this.$refs.input;
        /* istanbul ignore if: hard to test out of sync value */

        if ($input && value !== $input.value) {
          $input.value = value;
        }
      }
    },
    onInput: function onInput(evt) {
      // `evt.target.composing` is set by Vue
      // https://github.com/vuejs/vue/blob/dev/src/platforms/web/runtime/directives/model.js
      // TODO: Is this needed now with the latest Vue?

      /* istanbul ignore if: hard to test composition events */
      if (evt.target.composing) {
        return;
      }

      var value = evt.target.value;
      var formattedValue = this.formatValue(value, evt); // Exit when the `formatter` function strictly returned `false`
      // or prevented the input event

      /* istanbul ignore next */

      if (formattedValue === false || evt.defaultPrevented) {
        evt.preventDefault();
        return;
      }

      this.localValue = formattedValue;
      this.updateValue(formattedValue);
      this.$emit('input', formattedValue);
    },
    onChange: function onChange(evt) {
      var value = evt.target.value;
      var formattedValue = this.formatValue(value, evt); // Exit when the `formatter` function strictly returned `false`
      // or prevented the input event

      /* istanbul ignore next */

      if (formattedValue === false || evt.defaultPrevented) {
        evt.preventDefault();
        return;
      }

      this.localValue = formattedValue;
      this.updateValue(formattedValue, true);
      this.$emit('change', formattedValue);
    },
    onBlur: function onBlur(evt) {
      // Apply the `localValue` on blur to prevent cursor jumps
      // on mobile browsers (e.g. caused by autocomplete)
      var value = evt.target.value;
      var formattedValue = this.formatValue(value, evt, true);

      if (formattedValue !== false) {
        // We need to use the modified value here to apply the
        // `.trim` and `.number` modifiers properly
        this.localValue = string_toString(this.modifyValue(formattedValue)); // We pass the formatted value here since the `updateValue` method
        // handles the modifiers itself

        this.updateValue(formattedValue, true);
      } // Emit native blur event


      this.$emit('blur', evt);
    },
    focus: function focus() {
      // For external handler that may want a focus method
      if (!this.disabled) {
        attemptFocus(this.$el);
      }
    },
    blur: function blur() {
      // For external handler that may want a blur method
      if (!this.disabled) {
        attemptBlur(this.$el);
      }
    }
  }
});
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/mixins/form-validity.js
// @vue/component
/* harmony default export */ var form_validity = ({
  computed: {
    validity: {
      // Expose validity property
      cache: false,

      /* istanbul ignore next */
      get: function get() {
        return this.$refs.input.validity;
      }
    },
    validationMessage: {
      // Expose validationMessage property
      cache: false,

      /* istanbul ignore next */
      get: function get() {
        return this.$refs.input.validationMessage;
      }
    },
    willValidate: {
      // Expose willValidate property
      cache: false,

      /* istanbul ignore next */
      get: function get() {
        return this.$refs.input.willValidate;
      }
    }
  },
  methods: {
    /* istanbul ignore next */
    setCustomValidity: function setCustomValidity() {
      var _this$$refs$input;

      // For external handler that may want a setCustomValidity(...) method
      return (_this$$refs$input = this.$refs.input).setCustomValidity.apply(_this$$refs$input, arguments);
    },

    /* istanbul ignore next */
    checkValidity: function checkValidity() {
      var _this$$refs$input2;

      // For external handler that may want a checkValidity(...) method
      return (_this$$refs$input2 = this.$refs.input).checkValidity.apply(_this$$refs$input2, arguments);
    },

    /* istanbul ignore next */
    reportValidity: function reportValidity() {
      var _this$$refs$input3;

      // For external handler that may want a reportValidity(...) method
      return (_this$$refs$input3 = this.$refs.input).reportValidity.apply(_this$$refs$input3, arguments);
    }
  }
});
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/mixins/id.js
// SSR safe client-side ID attribute generation
// ID's can only be generated client-side, after mount
// `this._uid` is not synched between server and client
// @vue/component
/* harmony default export */ var mixins_id = ({
  props: {
    id: {
      type: String // default: null

    }
  },
  data: function data() {
    return {
      localId_: null
    };
  },
  computed: {
    safeId: function safeId() {
      // Computed property that returns a dynamic function for creating the ID
      // Reacts to changes in both `.id` and `.localId_` and regenerates a new function
      var id = this.id || this.localId_; // We return a function that accepts an optional suffix string
      // So this computed prop looks and works like a method
      // but benefits from Vue's computed prop caching

      var fn = function fn(suffix) {
        if (!id) {
          return null;
        }

        suffix = String(suffix || '').replace(/\s+/g, '_');
        return suffix ? id + '_' + suffix : id;
      };

      return fn;
    }
  },
  mounted: function mounted() {
    var _this = this;

    // `mounted()` only occurs client-side
    this.$nextTick(function () {
      // Update DOM with auto-generated ID after mount
      // to prevent SSR hydration errors
      _this.localId_ = "__BVID__".concat(_this._uid);
    });
  }
});
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/cache.js
function cache_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function cache_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { cache_ownKeys(Object(source), true).forEach(function (key) { cache_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { cache_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function cache_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var cache_makePropWatcher = function makePropWatcher(propName) {
  return {
    handler: function handler(newVal, oldVal) {
      for (var key in oldVal) {
        if (!object_hasOwnProperty(newVal, key)) {
          this.$delete(this.$data[propName], key);
        }
      }

      for (var _key in newVal) {
        this.$set(this.$data[propName], _key, newVal[_key]);
      }
    }
  };
};
var makePropCacheMixin = function makePropCacheMixin(propName, proxyPropName) {
  return {
    data: function data() {
      return cache_defineProperty({}, proxyPropName, {});
    },
    watch: cache_defineProperty({}, propName, cache_makePropWatcher(proxyPropName)),
    created: function created() {
      this[proxyPropName] = cache_objectSpread({}, this[propName]);
    }
  };
};
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/mixins/listeners.js

/* harmony default export */ var mixins_listeners = (makePropCacheMixin('$listeners', 'bvListeners'));
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/components/form-input/form-input.js
function form_input_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function form_input_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { form_input_ownKeys(Object(source), true).forEach(function (key) { form_input_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { form_input_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function form_input_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }












 // Valid supported input types

var TYPES = ['text', 'password', 'email', 'number', 'url', 'tel', 'search', 'range', 'color', 'date', 'time', 'datetime', 'datetime-local', 'month', 'week']; // @vue/component

var BFormInput = /*#__PURE__*/vue.extend({
  name: 'BFormInput',
  // Mixin order is important!
  mixins: [mixins_listeners, mixins_id, mixins_form, form_size, form_state, form_text, form_selection, form_validity],
  props: {
    // `value` prop is defined in form-text mixin
    type: {
      type: String,
      default: 'text',
      validator: function validator(type) {
        return arrayIncludes(TYPES, type);
      }
    },
    noWheel: {
      // Disable mousewheel to prevent wheel from
      // changing values (i.e. number/date)
      type: Boolean,
      default: false
    },
    min: {
      type: [String, Number] // default: null

    },
    max: {
      type: [String, Number] // default: null

    },
    step: {
      type: [String, Number] // default: null

    },
    list: {
      type: String // default: null

    }
  },
  computed: {
    localType: function localType() {
      // We only allow certain types
      return arrayIncludes(TYPES, this.type) ? this.type : 'text';
    },
    computedAttrs: function computedAttrs() {
      var type = this.localType,
          disabled = this.disabled,
          placeholder = this.placeholder,
          required = this.required,
          min = this.min,
          max = this.max,
          step = this.step;
      return {
        id: this.safeId(),
        name: this.name || null,
        form: this.form || null,
        type: type,
        disabled: disabled,
        placeholder: placeholder,
        required: required,
        autocomplete: this.autocomplete || null,
        readonly: this.readonly || this.plaintext,
        min: min,
        max: max,
        step: step,
        list: type !== 'password' ? this.list : null,
        'aria-required': required ? 'true' : null,
        'aria-invalid': this.computedAriaInvalid
      };
    },
    computedListeners: function computedListeners() {
      return form_input_objectSpread(form_input_objectSpread({}, this.bvListeners), {}, {
        input: this.onInput,
        change: this.onChange,
        blur: this.onBlur
      });
    }
  },
  watch: {
    noWheel: function noWheel(newVal) {
      this.setWheelStopper(newVal);
    }
  },
  mounted: function mounted() {
    this.setWheelStopper(this.noWheel);
  },

  /* istanbul ignore next */
  deactivated: function deactivated() {
    // Turn off listeners when keep-alive component deactivated

    /* istanbul ignore next */
    this.setWheelStopper(false);
  },

  /* istanbul ignore next */
  activated: function activated() {
    // Turn on listeners (if no-wheel) when keep-alive component activated

    /* istanbul ignore next */
    this.setWheelStopper(this.noWheel);
  },
  beforeDestroy: function beforeDestroy() {
    /* istanbul ignore next */
    this.setWheelStopper(false);
  },
  methods: {
    setWheelStopper: function setWheelStopper(on) {
      var input = this.$el; // We use native events, so that we don't interfere with propagation

      eventOnOff(on, input, 'focus', this.onWheelFocus);
      eventOnOff(on, input, 'blur', this.onWheelBlur);

      if (!on) {
        eventOff(document, 'wheel', this.stopWheel);
      }
    },
    onWheelFocus: function onWheelFocus() {
      eventOn(document, 'wheel', this.stopWheel);
    },
    onWheelBlur: function onWheelBlur() {
      eventOff(document, 'wheel', this.stopWheel);
    },
    stopWheel: function stopWheel(evt) {
      evt.preventDefault();
      attemptBlur(this.$el);
    }
  },
  render: function render(h) {
    return h('input', {
      ref: 'input',
      class: this.computedClass,
      attrs: this.computedAttrs,
      domProps: {
        value: this.localValue
      },
      on: this.computedListeners
    });
  }
});
// CONCATENATED MODULE: ./node_modules/vue-functional-data-merge/dist/lib.esm.js
var e=function(){return(e=Object.assign||function(e){for(var t,r=1,s=arguments.length;r<s;r++)for(var a in t=arguments[r])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},t={kebab:/-(\w)/g,styleProp:/:(.*)/,styleList:/;(?![^(]*\))/g};function r(e,t){return t?t.toUpperCase():""}function s(e){for(var s,a={},c=0,o=e.split(t.styleList);c<o.length;c++){var n=o[c].split(t.styleProp),i=n[0],l=n[1];(i=i.trim())&&("string"==typeof l&&(l=l.trim()),a[(s=i,s.replace(t.kebab,r))]=l)}return a}function lib_esm_a(){for(var t,r,a={},c=arguments.length;c--;)for(var o=0,n=Object.keys(arguments[c]);o<n.length;o++)switch(t=n[o]){case"class":case"style":case"directives":if(Array.isArray(a[t])||(a[t]=[]),"style"===t){var i=void 0;i=Array.isArray(arguments[c].style)?arguments[c].style:[arguments[c].style];for(var l=0;l<i.length;l++){var y=i[l];"string"==typeof y&&(i[l]=s(y))}arguments[c].style=i}a[t]=a[t].concat(arguments[c][t]);break;case"staticClass":if(!arguments[c][t])break;void 0===a[t]&&(a[t]=""),a[t]&&(a[t]+=" "),a[t]+=arguments[c][t].trim();break;case"on":case"nativeOn":a[t]||(a[t]={});for(var p=0,f=Object.keys(arguments[c][t]||{});p<f.length;p++)r=f[p],a[t][r]?a[t][r]=[].concat(a[t][r],arguments[c][t][r]):a[t][r]=arguments[c][t][r];break;case"attrs":case"props":case"domProps":case"scopedSlots":case"staticStyle":case"hook":case"transition":a[t]||(a[t]={}),a[t]=e({},arguments[c][t],a[t]);break;case"slot":case"key":case"ref":case"tag":case"show":case"keepAlive":default:a[t]||(a[t]=arguments[c][t])}return a}
//# sourceMappingURL=lib.esm.js.map

// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/components/form/form.js


var form_props = {
  id: {
    type: String // default: null

  },
  inline: {
    type: Boolean,
    default: false
  },
  novalidate: {
    type: Boolean,
    default: false
  },
  validated: {
    type: Boolean,
    default: false
  }
}; // @vue/component

var BForm = /*#__PURE__*/vue.extend({
  name: 'BForm',
  functional: true,
  props: form_props,
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    return h('form', lib_esm_a(data, {
      class: {
        'form-inline': props.inline,
        'was-validated': props.validated
      },
      attrs: {
        id: props.id,
        novalidate: props.novalidate
      }
    }), children);
  }
});
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/key-codes.js
/*
 * Key Codes (events)
 */

var KEY_CODES = freeze({
  SPACE: 32,
  ENTER: 13,
  ESC: 27,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  PAGEUP: 33,
  PAGEDOWN: 34,
  HOME: 36,
  END: 35,
  TAB: 9,
  SHIFT: 16,
  CTRL: 17,
  BACKSPACE: 8,
  ALT: 18,
  PAUSE: 19,
  BREAK: 19,
  INSERT: 45,
  INS: 45,
  DELETE: 46
});
/* harmony default export */ var key_codes = (KEY_CODES);
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/loose-equal.js

 // Assumes both a and b are arrays!
// Handles when arrays are "sparse" (array.every(...) doesn't handle sparse)

var compareArrays = function compareArrays(a, b) {
  if (a.length !== b.length) {
    return false;
  }

  var equal = true;

  for (var i = 0; equal && i < a.length; i++) {
    equal = loose_equal_looseEqual(a[i], b[i]);
  }

  return equal;
};
/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 * Returns boolean true or false
 */


var loose_equal_looseEqual = function looseEqual(a, b) {
  if (a === b) {
    return true;
  }

  var aValidType = isDate(a);
  var bValidType = isDate(b);

  if (aValidType || bValidType) {
    return aValidType && bValidType ? a.getTime() === b.getTime() : false;
  }

  aValidType = isArray(a);
  bValidType = isArray(b);

  if (aValidType || bValidType) {
    return aValidType && bValidType ? compareArrays(a, b) : false;
  }

  aValidType = isObject(a);
  bValidType = isObject(b);

  if (aValidType || bValidType) {
    /* istanbul ignore if: this if will probably never be called */
    if (!aValidType || !bValidType) {
      return false;
    }

    var aKeysCount = keys(a).length;
    var bKeysCount = keys(b).length;

    if (aKeysCount !== bKeysCount) {
      return false;
    }

    for (var key in a) {
      // eslint-disable-next-line no-prototype-builtins
      var aHasKey = a.hasOwnProperty(key); // eslint-disable-next-line no-prototype-builtins

      var bHasKey = b.hasOwnProperty(key);

      if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) {
        return false;
      }
    }
  }

  return String(a) === String(b);
};

/* harmony default export */ var loose_equal = (loose_equal_looseEqual);
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/warn.js

/**
 * Log a warning message to the console with BootstrapVue formatting
 * @param {string} message
 */

var warn_warn = function warn(message)
/* istanbul ignore next */
{
  var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (!Object(env["a" /* getNoWarn */])()) {
    console.warn("[BootstrapVue warn]: ".concat(source ? "".concat(source, " - ") : '').concat(message));
  }
};
/**
 * Warn when no Promise support is given
 * @param {string} source
 * @returns {boolean} warned
 */

var warn_warnNotClient = function warnNotClient(source) {
  /* istanbul ignore else */
  if (env["g" /* isBrowser */]) {
    return false;
  } else {
    warn_warn("".concat(source, ": Can not be called during SSR."));
    return true;
  }
};
/**
 * Warn when no Promise support is given
 * @param {string} source
 * @returns {boolean} warned
 */

var warn_warnNoPromiseSupport = function warnNoPromiseSupport(source) {
  /* istanbul ignore else */
  if (env["e" /* hasPromiseSupport */]) {
    return false;
  } else {
    warn_warn("".concat(source, ": Requires Promise support."));
    return true;
  }
};
/**
 * Warn when no MutationObserver support is given
 * @param {string} source
 * @returns {boolean} warned
 */

var warn_warnNoMutationObserverSupport = function warnNoMutationObserverSupport(source) {
  /* istanbul ignore else */
  if (env["c" /* hasMutationObserverSupport */]) {
    return false;
  } else {
    warn_warn("".concat(source, ": Requires MutationObserver support."));
    return true;
  }
};
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/observe-dom.js
function observe_dom_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function observe_dom_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { observe_dom_ownKeys(Object(source), true).forEach(function (key) { observe_dom_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { observe_dom_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function observe_dom_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/**
 * Observe a DOM element changes, falls back to eventListener mode
 * @param {Element} el The DOM element to observe
 * @param {Function} callback callback to be called on change
 * @param {object} [options={childList: true, subtree: true}] observe options
 * @see https://stackoverflow.com/questions/3219758
 */

var observe_dom_observeDom = function observeDom(el, callback, options)
/* istanbul ignore next: difficult to test in JSDOM */
{
  // Handle cases where we might be passed a Vue instance
  el = el ? el.$el || el : null; // Early exit when we have no element

  /* istanbul ignore next: difficult to test in JSDOM */

  if (!isElement(el)) {
    return null;
  } // Exit and throw a warning when `MutationObserver` isn't available


  if (warn_warnNoMutationObserverSupport('observeDom')) {
    return null;
  } // Define a new observer


  var obs = new MutationObs(function (mutations) {
    var changed = false; // A mutation can contain several change records, so we loop
    // through them to see what has changed
    // We break out of the loop early if any "significant" change
    // has been detected

    for (var i = 0; i < mutations.length && !changed; i++) {
      // The mutation record
      var mutation = mutations[i]; // Mutation type

      var type = mutation.type; // DOM node (could be any DOM node type - HTMLElement, Text, comment, etc.)

      var target = mutation.target; // Detect whether a change happened based on type and target

      if (type === 'characterData' && target.nodeType === Node.TEXT_NODE) {
        // We ignore nodes that are not TEXT (i.e. comments, etc)
        // as they don't change layout
        changed = true;
      } else if (type === 'attributes') {
        changed = true;
      } else if (type === 'childList' && (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0)) {
        // This includes HTMLElement and text nodes being
        // added/removed/re-arranged
        changed = true;
      }
    } // We only call the callback if a change that could affect
    // layout/size truly happened


    if (changed) {
      callback();
    }
  }); // Have the observer observe foo for changes in children, etc

  obs.observe(el, observe_dom_objectSpread({
    childList: true,
    subtree: true
  }, options)); // We return a reference to the observer so that `obs.disconnect()`
  // can be called if necessary
  // To reduce overhead when the root element is hidden

  return obs;
};

/* harmony default export */ var observe_dom = (observe_dom_observeDom);
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/stable-sort.js
/*
 * Consistent and stable sort function across JavaScript platforms
 *
 * Inconsistent sorts can cause SSR problems between client and server
 * such as in <b-table> if sortBy is applied to the data on server side render.
 * Chrome and V8 native sorts are inconsistent/unstable
 *
 * This function uses native sort with fallback to index compare when the a and b
 * compare returns 0
 *
 * Algorithm based on:
 * https://stackoverflow.com/questions/1427608/fast-stable-sorting-algorithm-implementation-in-javascript/45422645#45422645
 *
 * @param {array} array to sort
 * @param {function} sort compare function
 * @return {array}
 */
var stableSort = function stableSort(array, compareFn) {
  // Using `.bind(compareFn)` on the wrapped anonymous function improves
  // performance by avoiding the function call setup. We don't use an arrow
  // function here as it binds `this` to the `stableSort` context rather than
  // the `compareFn` context, which wouldn't give us the performance increase.
  return array.map(function (a, index) {
    return [index, a];
  }).sort(function (a, b) {
    return this(a[1], b[1]) || a[0] - b[0];
  }.bind(compareFn)).map(function (e) {
    return e[1];
  });
};

/* harmony default export */ var stable_sort = (stableSort);
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/bv-event.class.js
function bv_event_class_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var bv_event_class_BvEvent = /*#__PURE__*/function () {
  function BvEvent(type) {
    var eventInit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    bv_event_class_classCallCheck(this, BvEvent);

    // Start by emulating native Event constructor
    if (!type) {
      /* istanbul ignore next */
      throw new TypeError("Failed to construct '".concat(this.constructor.name, "'. 1 argument required, ").concat(arguments.length, " given."));
    } // Merge defaults first, the eventInit, and the type last
    // so it can't be overwritten


    object_assign(this, BvEvent.Defaults, this.constructor.Defaults, eventInit, {
      type: type
    }); // Freeze some props as readonly, but leave them enumerable

    defineProperties(this, {
      type: readonlyDescriptor(),
      cancelable: readonlyDescriptor(),
      nativeEvent: readonlyDescriptor(),
      target: readonlyDescriptor(),
      relatedTarget: readonlyDescriptor(),
      vueTarget: readonlyDescriptor(),
      componentId: readonlyDescriptor()
    }); // Create a private variable using closure scoping

    var defaultPrevented = false; // Recreate preventDefault method. One way setter

    this.preventDefault = function preventDefault() {
      if (this.cancelable) {
        defaultPrevented = true;
      }
    }; // Create `defaultPrevented` publicly accessible prop that
    // can only be altered by the preventDefault method


    defineProperty(this, 'defaultPrevented', {
      enumerable: true,
      get: function get() {
        return defaultPrevented;
      }
    });
  }

  _createClass(BvEvent, null, [{
    key: "Defaults",
    get: function get() {
      return {
        type: '',
        cancelable: true,
        nativeEvent: null,
        target: null,
        relatedTarget: null,
        vueTarget: null,
        componentId: null
      };
    }
  }]);

  return BvEvent;
}(); // Named Exports



// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/normalize-slot.js


 // Note for functional components:
// In functional components, `slots` is a function so it must be called
// first before passing to the below methods. `scopedSlots` is always an
// object and may be undefined (for Vue < 2.6.x)

/**
 * Returns true if either scoped or unscoped named slot exists
 *
 * @param {String, Array} name or name[]
 * @param {Object} scopedSlots
 * @param {Object} slots
 * @returns {Array|undefined} VNodes
 */

var normalize_slot_hasNormalizedSlot = function hasNormalizedSlot(names) {
  var $scopedSlots = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var $slots = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  // Ensure names is an array
  names = concat(names).filter(utils_identity); // Returns true if the either a $scopedSlot or $slot exists with the specified name

  return names.some(function (name) {
    return $scopedSlots[name] || $slots[name];
  });
};
/**
 * Returns VNodes for named slot either scoped or unscoped
 *
 * @param {String, Array} name or name[]
 * @param {String} scope
 * @param {Object} scopedSlots
 * @param {Object} slots
 * @returns {Array|undefined} VNodes
 */


var normalize_slot_normalizeSlot = function normalizeSlot(names) {
  var scope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var $scopedSlots = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var $slots = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  // Ensure names is an array
  names = concat(names).filter(utils_identity);
  var slot;

  for (var i = 0; i < names.length && !slot; i++) {
    var name = names[i];
    slot = $scopedSlots[name] || $slots[name];
  } // Note: in Vue 2.6.x, all named slots are also scoped slots


  return isFunction(slot) ? slot(scope) : slot;
}; // Named exports


 // Default export (backwards compatibility)

/* harmony default export */ var normalize_slot = (normalize_slot_normalizeSlot);
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/mixins/normalize-slot.js


/* harmony default export */ var mixins_normalize_slot = ({
  methods: {
    hasNormalizedSlot: function hasNormalizedSlot(names) {
      // Returns true if the either a $scopedSlot or $slot exists with the specified name
      // `names` can be a string name or an array of names
      return normalize_slot_hasNormalizedSlot(names, this.$scopedSlots, this.$slots);
    },
    normalizeSlot: function normalizeSlot(names) {
      var scope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      // Returns an array of rendered VNodes if slot found.
      // Returns undefined if not found.
      // `names` can be a string name or an array of names
      var vNodes = normalize_slot_normalizeSlot(names, scope, this.$scopedSlots, this.$slots);

      return vNodes ? concat(vNodes) : vNodes;
    }
  }
});
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/router.js



var ANCHOR_TAG = 'a'; // Precompile RegExp

var commaRE = /%2C/g;
var encodeReserveRE = /[!'()*]/g;
var plusRE = /\+/g;
var queryStartRE = /^(\?|#|&)/; // Method to replace reserved chars

var encodeReserveReplacer = function encodeReserveReplacer(c) {
  return '%' + c.charCodeAt(0).toString(16);
}; // Fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas


var router_encode = function encode(str) {
  return encodeURIComponent(string_toString(str)).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ',');
};

var decode = decodeURIComponent; // Stringifies an object of query parameters
// See: https://github.com/vuejs/vue-router/blob/dev/src/util/query.js

var router_stringifyQueryObj = function stringifyQueryObj(obj) {
  if (!isPlainObject(obj)) {
    return '';
  }

  var query = keys(obj).map(function (key) {
    var val = obj[key];

    if (isUndefined(val)) {
      return '';
    } else if (isNull(val)) {
      return router_encode(key);
    } else if (isArray(val)) {
      return val.reduce(function (results, val2) {
        if (isNull(val2)) {
          results.push(router_encode(key));
        } else if (!isUndefined(val2)) {
          // Faster than string interpolation
          results.push(router_encode(key) + '=' + router_encode(val2));
        }

        return results;
      }, []).join('&');
    } // Faster than string interpolation


    return router_encode(key) + '=' + router_encode(val);
  })
  /* must check for length, as we only want to filter empty strings, not things that look falsey! */
  .filter(function (x) {
    return x.length > 0;
  }).join('&');
  return query ? "?".concat(query) : '';
};
var router_parseQuery = function parseQuery(query) {
  var parsed = {};
  query = string_toString(query).trim().replace(queryStartRE, '');

  if (!query) {
    return parsed;
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(plusRE, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0 ? decode(parts.join('=')) : null;

    if (isUndefined(parsed[key])) {
      parsed[key] = val;
    } else if (isArray(parsed[key])) {
      parsed[key].push(val);
    } else {
      parsed[key] = [parsed[key], val];
    }
  });
  return parsed;
};
var router_isRouterLink = function isRouterLink(tag) {
  return string_toString(tag).toLowerCase() !== ANCHOR_TAG;
};
var computeTag = function computeTag() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      to = _ref.to,
      disabled = _ref.disabled;

  var thisOrParent = arguments.length > 1 ? arguments[1] : undefined;
  return thisOrParent.$router && to && !disabled ? thisOrParent.$nuxt ? 'nuxt-link' : 'router-link' : ANCHOR_TAG;
};
var router_computeRel = function computeRel() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      target = _ref2.target,
      rel = _ref2.rel;

  if (target === '_blank' && isNull(rel)) {
    return 'noopener';
  }

  return rel || null;
};
var router_computeHref = function computeHref() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      href = _ref3.href,
      to = _ref3.to;

  var tag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ANCHOR_TAG;
  var fallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '#';
  var toFallback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '/';

  // We've already checked the $router in computeTag(), so isRouterLink() indicates a live router.
  // When deferring to Vue Router's router-link, don't use the href attribute at all.
  // We return null, and then remove href from the attributes passed to router-link
  if (router_isRouterLink(tag)) {
    return null;
  } // Return `href` when explicitly provided


  if (href) {
    return href;
  } // Reconstruct `href` when `to` used, but no router


  if (to) {
    // Fallback to `to` prop (if `to` is a string)
    if (isString(to)) {
      return to || toFallback;
    } // Fallback to `to.path + to.query + to.hash` prop (if `to` is an object)


    if (isPlainObject(to) && (to.path || to.query || to.hash)) {
      var path = string_toString(to.path);
      var query = router_stringifyQueryObj(to.query);
      var hash = string_toString(to.hash);
      hash = !hash || hash.charAt(0) === '#' ? hash : "#".concat(hash);
      return "".concat(path).concat(query).concat(hash) || toFallback;
    }
  } // If nothing is provided return the fallback


  return fallback;
};
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/mixins/attrs.js

/* harmony default export */ var attrs = (makePropCacheMixin('$attrs', 'bvAttrs'));
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/components/link/link.js
function link_toConsumableArray(arr) { return link_arrayWithoutHoles(arr) || link_iterableToArray(arr) || link_unsupportedIterableToArray(arr) || link_nonIterableSpread(); }

function link_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function link_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return link_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return link_arrayLikeToArray(o, minLen); }

function link_iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function link_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return link_arrayLikeToArray(arr); }

function link_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function link_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function link_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { link_ownKeys(Object(source), true).forEach(function (key) { link_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { link_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function link_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










/**
 * The Link component is used in many other BV components
 * As such, sharing its props makes supporting all its features easier
 * However, some components need to modify the defaults for their own purpose
 * Prefer sharing a fresh copy of the props to ensure mutations
 * do not affect other component references to the props
 *
 * See: https://github.com/vuejs/vue-router/blob/dev/src/components/link.js
 */

var propsFactory = function propsFactory() {
  return {
    href: {
      type: String,
      default: null
    },
    rel: {
      type: String,
      // Must be `null` if no value provided
      default: null
    },
    target: {
      type: String,
      default: '_self'
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // router-link specific props
    to: {
      type: [String, Object],
      default: null
    },
    append: {
      type: Boolean,
      default: false
    },
    replace: {
      type: Boolean,
      default: false
    },
    event: {
      type: [String, Array],
      default: 'click'
    },
    activeClass: {
      type: String // default: undefined

    },
    exact: {
      type: Boolean,
      default: false
    },
    exactActiveClass: {
      type: String // default: undefined

    },
    routerTag: {
      type: String,
      default: 'a'
    },
    // nuxt-link specific prop(s)
    noPrefetch: {
      type: Boolean,
      default: false
    }
  };
};
var link_props = propsFactory(); // @vue/component

var BLink = /*#__PURE__*/vue.extend({
  name: 'BLink',
  // Mixin order is important!
  mixins: [attrs, mixins_listeners, mixins_normalize_slot],
  inheritAttrs: false,
  props: propsFactory(),
  computed: {
    computedTag: function computedTag() {
      // We don't pass `this` as the first arg as we need reactivity of the props
      return computeTag({
        to: this.to,
        disabled: this.disabled
      }, this);
    },
    isRouterLink: function isRouterLink() {
      return router_isRouterLink(this.computedTag);
    },
    computedRel: function computedRel() {
      // We don't pass `this` as the first arg as we need reactivity of the props
      return router_computeRel({
        target: this.target,
        rel: this.rel
      });
    },
    computedHref: function computedHref() {
      // We don't pass `this` as the first arg as we need reactivity of the props
      return router_computeHref({
        to: this.to,
        href: this.href
      }, this.computedTag);
    },
    computedProps: function computedProps() {
      var props = this.isRouterLink ? link_objectSpread(link_objectSpread({}, this.$props), {}, {
        tag: this.routerTag
      }) : {}; // Ensure the `href` prop does not exist for router links

      return this.computedHref ? props : omit(props, ['href']);
    },
    computedAttrs: function computedAttrs() {
      var bvAttrs = this.bvAttrs,
          href = this.computedHref,
          rel = this.computedRel,
          disabled = this.disabled,
          target = this.target,
          routerTag = this.routerTag,
          isRouterLink = this.isRouterLink;
      return link_objectSpread(link_objectSpread(link_objectSpread(link_objectSpread({}, bvAttrs), href ? {
        href: href
      } : {}), isRouterLink && routerTag !== 'a' && routerTag !== 'area' ? {} : {
        rel: rel,
        target: target
      }), {}, {
        tabindex: disabled ? '-1' : isUndefined(bvAttrs.tabindex) ? null : bvAttrs.tabindex,
        'aria-disabled': disabled ? 'true' : null
      });
    },
    computedListeners: function computedListeners() {
      return link_objectSpread(link_objectSpread({}, this.bvListeners), {}, {
        // We want to overwrite any click handler since our callback
        // will invoke the user supplied handler(s) if `!this.disabled`
        click: this.onClick
      });
    }
  },
  methods: {
    onClick: function onClick(evt) {
      var _arguments = arguments;
      var evtIsEvent = isEvent(evt);
      var isRouterLink = this.isRouterLink;
      var suppliedHandler = this.bvListeners.click;

      if (evtIsEvent && this.disabled) {
        // Stop event from bubbling up
        evt.stopPropagation(); // Kill the event loop attached to this specific `EventTarget`
        // Needed to prevent `vue-router` for doing its thing

        evt.stopImmediatePropagation();
      } else {
        /* istanbul ignore next: difficult to test, but we know it works */
        if (isRouterLink && evt.currentTarget.__vue__) {
          // Router links do not emit instance `click` events, so we
          // add in an `$emit('click', evt)` on its Vue instance
          evt.currentTarget.__vue__.$emit('click', evt);
        } // Call the suppliedHandler(s), if any provided


        concat(suppliedHandler).filter(function (h) {
          return isFunction(h);
        }).forEach(function (handler) {
          handler.apply(void 0, link_toConsumableArray(_arguments));
        }); // Emit the global `$root` click event

        this.$root.$emit('clicked::link', evt);
      } // Stop scroll-to-top behavior or navigation on
      // regular links when href is just '#'


      if (evtIsEvent && (this.disabled || !isRouterLink && this.computedHref === '#')) {
        evt.preventDefault();
      }
    },
    focus: function focus() {
      attemptFocus(this.$el);
    },
    blur: function blur() {
      attemptBlur(this.$el);
    }
  },
  render: function render(h) {
    var active = this.active,
        disabled = this.disabled;
    return h(this.computedTag, link_defineProperty({
      class: {
        active: active,
        disabled: disabled
      },
      attrs: this.computedAttrs,
      props: this.computedProps
    }, this.isRouterLink ? 'nativeOn' : 'on', this.computedListeners), this.normalizeSlot('default'));
  }
});
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/components/nav/nav.js
function nav_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


 // -- Constants --

var nav_props = {
  tag: {
    type: String,
    default: 'ul'
  },
  fill: {
    type: Boolean,
    default: false
  },
  justified: {
    type: Boolean,
    default: false
  },
  align: {
    type: String // default: null

  },
  tabs: {
    type: Boolean,
    default: false
  },
  pills: {
    type: Boolean,
    default: false
  },
  vertical: {
    type: Boolean,
    default: false
  },
  small: {
    type: Boolean,
    default: false
  },
  cardHeader: {
    // Set to true if placing in a card header
    type: Boolean,
    default: false
  }
}; // -- Utils --

var computeJustifyContent = function computeJustifyContent(value) {
  // Normalize value
  value = value === 'left' ? 'start' : value === 'right' ? 'end' : value;
  return "justify-content-".concat(value);
}; // @vue/component


var BNav = /*#__PURE__*/vue.extend({
  name: 'BNav',
  functional: true,
  props: nav_props,
  render: function render(h, _ref) {
    var _class;

    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    return h(props.tag, lib_esm_a(data, {
      staticClass: 'nav',
      class: (_class = {
        'nav-tabs': props.tabs,
        'nav-pills': props.pills && !props.tabs,
        'card-header-tabs': !props.vertical && props.cardHeader && props.tabs,
        'card-header-pills': !props.vertical && props.cardHeader && props.pills && !props.tabs,
        'flex-column': props.vertical,
        'nav-fill': !props.vertical && props.fill,
        'nav-justified': !props.vertical && props.justified
      }, nav_defineProperty(_class, computeJustifyContent(props.align), !props.vertical && props.align), nav_defineProperty(_class, "small", props.small), _class)
    }), children);
  }
});
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/components/tabs/tabs.js
function tabs_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function tabs_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { tabs_ownKeys(Object(source), true).forEach(function (key) { tabs_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { tabs_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function tabs_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

















 // -- Constants --

var navProps = omit(nav_props, ['tabs', 'isNavBar', 'cardHeader']); // -- Utils --
// Filter function to filter out disabled tabs

var notDisabled = function notDisabled(tab) {
  return !tab.disabled;
}; // --- Helper components ---
// @vue/component


var BTabButtonHelper = /*#__PURE__*/vue.extend({
  name: 'BTabButtonHelper',
  inject: {
    bvTabs: {
      /* istanbul ignore next */
      default: function _default()
      /* istanbul ignore next */
      {
        return {};
      }
    }
  },
  props: {
    // Reference to the child <b-tab> instance
    tab: {
      default: null
    },
    tabs: {
      type: Array,

      /* istanbul ignore next */
      default: function _default()
      /* istanbul ignore next */
      {
        return [];
      }
    },
    id: {
      type: String,
      default: null
    },
    controls: {
      type: String,
      default: null
    },
    tabIndex: {
      type: Number,
      default: null
    },
    posInSet: {
      type: Number,
      default: null
    },
    setSize: {
      type: Number,
      default: null
    },
    noKeyNav: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    focus: function focus() {
      attemptFocus(this.$refs.link);
    },
    handleEvt: function handleEvt(evt) {
      var stop = function stop() {
        evt.preventDefault();
        evt.stopPropagation();
      };

      if (this.tab.disabled) {
        /* istanbul ignore next */
        return;
      }

      var type = evt.type;
      var key = evt.keyCode;
      var shift = evt.shiftKey;

      if (type === 'click') {
        stop();
        this.$emit('click', evt);
      } else if (type === 'keydown' && key === key_codes.SPACE) {
        // For ARIA tabs the SPACE key will also trigger a click/select
        // Even with keyboard navigation disabled, SPACE should "click" the button
        // See: https://github.com/bootstrap-vue/bootstrap-vue/issues/4323
        stop();
        this.$emit('click', evt);
      } else if (type === 'keydown' && !this.noKeyNav) {
        // For keyboard navigation
        if (key === key_codes.UP || key === key_codes.LEFT || key === key_codes.HOME) {
          stop();

          if (shift || key === key_codes.HOME) {
            this.$emit('first', evt);
          } else {
            this.$emit('prev', evt);
          }
        } else if (key === key_codes.DOWN || key === key_codes.RIGHT || key === key_codes.END) {
          stop();

          if (shift || key === key_codes.END) {
            this.$emit('last', evt);
          } else {
            this.$emit('next', evt);
          }
        }
      }
    }
  },
  render: function render(h) {
    var link = h(BLink, {
      ref: 'link',
      staticClass: 'nav-link',
      class: [{
        active: this.tab.localActive && !this.tab.disabled,
        disabled: this.tab.disabled
      }, this.tab.titleLinkClass, // Apply <b-tabs> `activeNavItemClass` styles when the tab is active
      this.tab.localActive ? this.bvTabs.activeNavItemClass : null],
      props: {
        disabled: this.tab.disabled
      },
      attrs: tabs_objectSpread(tabs_objectSpread({}, this.tab.titleLinkAttributes), {}, {
        role: 'tab',
        id: this.id,
        // Roving tab index when keynav enabled
        tabindex: this.tabIndex,
        'aria-selected': this.tab.localActive && !this.tab.disabled ? 'true' : 'false',
        'aria-setsize': this.setSize,
        'aria-posinset': this.posInSet,
        'aria-controls': this.controls
      }),
      on: {
        click: this.handleEvt,
        keydown: this.handleEvt
      }
    }, [this.tab.normalizeSlot('title') || this.tab.title]);
    return h('li', {
      staticClass: 'nav-item',
      class: [this.tab.titleItemClass],
      attrs: {
        role: 'presentation'
      }
    }, [link]);
  }
}); // @vue/component

var BTabs = /*#__PURE__*/vue.extend({
  name: 'BTabs',
  mixins: [mixins_id, mixins_normalize_slot],
  provide: function provide() {
    return {
      bvTabs: this
    };
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  props: tabs_objectSpread(tabs_objectSpread({}, navProps), {}, {
    tag: {
      type: String,
      default: 'div'
    },
    card: {
      type: Boolean,
      default: false
    },
    end: {
      // Synonym for 'bottom'
      type: Boolean,
      default: false
    },
    noFade: {
      type: Boolean,
      default: false
    },
    noNavStyle: {
      type: Boolean,
      default: false
    },
    noKeyNav: {
      type: Boolean,
      default: false
    },
    lazy: {
      // This prop is sniffed by the <b-tab> child
      type: Boolean,
      default: false
    },
    contentClass: {
      type: [String, Array, Object] // default: null

    },
    navClass: {
      type: [String, Array, Object] // default: null

    },
    navWrapperClass: {
      type: [String, Array, Object] // default: null

    },
    activeNavItemClass: {
      // Only applied to the currently active <b-nav-item>
      type: [String, Array, Object] // default: null

    },
    activeTabClass: {
      // Only applied to the currently active <b-tab>
      // This prop is sniffed by the <b-tab> child
      type: [String, Array, Object] // default: null

    },
    value: {
      // v-model
      type: Number,
      default: null
    }
  }),
  data: function data() {
    return {
      // Index of current tab
      currentTab: toInteger(this.value, -1),
      // Array of direct child <b-tab> instances, in DOM order
      tabs: [],
      // Array of child instances registered (for triggering reactive updates)
      registeredTabs: [],
      // Flag to know if we are mounted or not
      isMounted: false
    };
  },
  computed: {
    fade: function fade() {
      // This computed prop is sniffed by the tab child
      return !this.noFade;
    },
    localNavClass: function localNavClass() {
      var classes = [];

      if (this.card && this.vertical) {
        classes.push('card-header', 'h-100', 'border-bottom-0', 'rounded-0');
      }

      return [].concat(classes, [this.navClass]);
    }
  },
  watch: {
    currentTab: function currentTab(newVal) {
      var index = -1; // Ensure only one tab is active at most

      this.tabs.forEach(function (tab, idx) {
        if (newVal === idx && !tab.disabled) {
          tab.localActive = true;
          index = idx;
        } else {
          tab.localActive = false;
        }
      }); // Update the v-model

      this.$emit('input', index);
    },
    value: function value(newVal, oldVal) {
      if (newVal !== oldVal) {
        newVal = toInteger(newVal, -1);
        oldVal = toInteger(oldVal, 0);
        var tabs = this.tabs;

        if (tabs[newVal] && !tabs[newVal].disabled) {
          this.activateTab(tabs[newVal]);
        } else {
          // Try next or prev tabs
          if (newVal < oldVal) {
            this.previousTab();
          } else {
            this.nextTab();
          }
        }
      }
    },
    registeredTabs: function registeredTabs() {
      var _this = this;

      // Each b-tab will register/unregister itself.
      // We use this to detect when tabs are added/removed
      // to trigger the update of the tabs.
      this.$nextTick(function () {
        requestAF(function () {
          _this.updateTabs();
        });
      });
    },
    tabs: function tabs(newVal, oldVal) {
      var _this2 = this;

      // If tabs added, removed, or re-ordered, we emit a `changed` event.
      // We use `tab._uid` instead of `tab.safeId()`, as the later is changed
      // in a nextTick if no explicit ID is provided, causing duplicate emits.
      if (!loose_equal(newVal.map(function (t) {
        return t._uid;
      }), oldVal.map(function (t) {
        return t._uid;
      }))) {
        // In a nextTick to ensure currentTab has been set first.
        this.$nextTick(function () {
          // We emit shallow copies of the new and old arrays of tabs, to
          // prevent users from potentially mutating the internal arrays.
          _this2.$emit('changed', newVal.slice(), oldVal.slice());
        });
      }
    },
    isMounted: function isMounted(newVal) {
      var _this3 = this;

      // Trigger an update after mounted.  Needed for tabs inside lazy modals.
      if (newVal) {
        requestAF(function () {
          _this3.updateTabs();
        });
      } // Enable or disable the observer


      this.setObserver(newVal);
    }
  },
  created: function created() {
    var _this4 = this;

    this.currentTab = toInteger(this.value, -1);
    this._bvObserver = null; // For SSR and to make sure only a single tab is shown on mount
    // We wrap this in a `$nextTick()` to ensure the child tabs have been created

    this.$nextTick(function () {
      _this4.updateTabs();
    });
  },
  mounted: function mounted() {
    var _this5 = this;

    // Call `updateTabs()` just in case...
    this.updateTabs();
    this.$nextTick(function () {
      // Flag we are now mounted and to switch to DOM for tab probing.
      // As this.$slots.default appears to lie about component instances
      // after b-tabs is destroyed and re-instantiated.
      // And this.$children does not respect DOM order.
      _this5.isMounted = true;
    });
  },

  /* istanbul ignore next */
  deactivated: function deactivated()
  /* istanbul ignore next */
  {
    this.isMounted = false;
  },

  /* istanbul ignore next */
  activated: function activated()
  /* istanbul ignore next */
  {
    var _this6 = this;

    this.currentTab = toInteger(this.value, -1);
    this.$nextTick(function () {
      _this6.updateTabs();

      _this6.isMounted = true;
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.isMounted = false;
  },
  destroyed: function destroyed() {
    // Ensure no references to child instances exist
    this.tabs = [];
  },
  methods: {
    registerTab: function registerTab(tab) {
      var _this7 = this;

      if (!arrayIncludes(this.registeredTabs, tab)) {
        this.registeredTabs.push(tab);
        tab.$once('hook:destroyed', function () {
          _this7.unregisterTab(tab);
        });
      }
    },
    unregisterTab: function unregisterTab(tab) {
      this.registeredTabs = this.registeredTabs.slice().filter(function (t) {
        return t !== tab;
      });
    },
    setObserver: function setObserver(on) {
      // DOM observer is needed to detect changes in order of tabs
      if (on) {
        // Make sure no existing observer running
        this.setObserver(false);
        var self = this;
        /* istanbul ignore next: difficult to test mutation observer in JSDOM */

        var handler = function handler() {
          // We delay the update to ensure that `tab.safeId()` has
          // updated with the final ID value.
          self.$nextTick(function () {
            requestAF(function () {
              self.updateTabs();
            });
          });
        }; // Watch for changes to <b-tab> sub components


        this._bvObserver = observe_dom(this.$refs.tabsContainer, handler, {
          childList: true,
          subtree: false,
          attributes: true,
          attributeFilter: ['id']
        });
      } else {
        /* istanbul ignore next */
        if (this._bvObserver && this._bvObserver.disconnect) {
          this._bvObserver.disconnect();
        }

        this._bvObserver = null;
      }
    },
    getTabs: function getTabs() {
      // We use registeredTabs as the source of truth for child tab components. And we
      // filter out any BTab components that are extended BTab with a root child BTab.
      // https://github.com/bootstrap-vue/bootstrap-vue/issues/3260
      var tabs = this.registeredTabs.filter(function (tab) {
        return tab.$children.filter(function (t) {
          return t._isTab;
        }).length === 0;
      }); // DOM Order of Tabs

      var order = [];

      if (this.isMounted && tabs.length > 0) {
        // We rely on the DOM when mounted to get the 'true' order of the b-tab children.
        // querySelectorAll(...) always returns elements in document order, regardless of
        // order specified in the selector.
        var selector = tabs.map(function (tab) {
          return "#".concat(tab.safeId());
        }).join(', ');
        order = dom_selectAll(selector, this.$el).map(function (el) {
          return el.id;
        }).filter(utils_identity);
      } // Stable sort keeps the original order if not found in the
      // `order` array, which will be an empty array before mount.


      return stable_sort(tabs, function (a, b) {
        return order.indexOf(a.safeId()) - order.indexOf(b.safeId());
      });
    },
    // Update list of <b-tab> children
    updateTabs: function updateTabs() {
      // Probe tabs
      var tabs = this.getTabs(); // Find *last* active non-disabled tab in current tabs
      // We trust tab state over currentTab, in case tabs were added/removed/re-ordered

      var tabIndex = tabs.indexOf(tabs.slice().reverse().find(function (tab) {
        return tab.localActive && !tab.disabled;
      })); // Else try setting to currentTab

      if (tabIndex < 0) {
        var currentTab = this.currentTab;

        if (currentTab >= tabs.length) {
          // Handle last tab being removed, so find the last non-disabled tab
          tabIndex = tabs.indexOf(tabs.slice().reverse().find(notDisabled));
        } else if (tabs[currentTab] && !tabs[currentTab].disabled) {
          // Current tab is not disabled
          tabIndex = currentTab;
        }
      } // Else find *first* non-disabled tab in current tabs


      if (tabIndex < 0) {
        tabIndex = tabs.indexOf(tabs.find(notDisabled));
      } // Set the current tab state to active


      tabs.forEach(function (tab) {
        // tab.localActive = idx === tabIndex && !tab.disabled
        tab.localActive = false;
      });

      if (tabs[tabIndex]) {
        tabs[tabIndex].localActive = true;
      } // Update the array of tab children


      this.tabs = tabs; // Set the currentTab index (can be -1 if no non-disabled tabs)

      this.currentTab = tabIndex;
    },
    // Find a button that controls a tab, given the tab reference
    // Returns the button vm instance
    getButtonForTab: function getButtonForTab(tab) {
      return (this.$refs.buttons || []).find(function (btn) {
        return btn.tab === tab;
      });
    },
    // Force a button to re-render its content, given a <b-tab> instance
    // Called by <b-tab> on `update()`
    updateButton: function updateButton(tab) {
      var button = this.getButtonForTab(tab);

      if (button && button.$forceUpdate) {
        button.$forceUpdate();
      }
    },
    // Activate a tab given a <b-tab> instance
    // Also accessed by <b-tab>
    activateTab: function activateTab(tab) {
      var result = false;

      if (tab) {
        var index = this.tabs.indexOf(tab);

        if (!tab.disabled && index > -1 && index !== this.currentTab) {
          var tabEvt = new bv_event_class_BvEvent('activate-tab', {
            cancelable: true,
            vueTarget: this,
            componentId: this.safeId()
          });
          this.$emit(tabEvt.type, index, this.currentTab, tabEvt);

          if (!tabEvt.defaultPrevented) {
            result = true;
            this.currentTab = index;
          }
        }
      } // Couldn't set tab, so ensure v-model is set to `this.currentTab`

      /* istanbul ignore next: should rarely happen */


      if (!result && this.currentTab !== this.value) {
        this.$emit('input', this.currentTab);
      }

      return result;
    },
    // Deactivate a tab given a <b-tab> instance
    // Accessed by <b-tab>
    deactivateTab: function deactivateTab(tab) {
      if (tab) {
        // Find first non-disabled tab that isn't the one being deactivated
        // If no tabs are available, then don't deactivate current tab
        return this.activateTab(this.tabs.filter(function (t) {
          return t !== tab;
        }).find(notDisabled));
      }
      /* istanbul ignore next: should never/rarely happen */


      return false;
    },
    // Focus a tab button given its <b-tab> instance
    focusButton: function focusButton(tab) {
      var _this8 = this;

      // Wrap in `$nextTick()` to ensure DOM has completed rendering/updating before focusing
      this.$nextTick(function () {
        attemptFocus(_this8.getButtonForTab(tab));
      });
    },
    // Emit a click event on a specified <b-tab> component instance
    emitTabClick: function emitTabClick(tab, evt) {
      if (isEvent(evt) && tab && tab.$emit && !tab.disabled) {
        tab.$emit('click', evt);
      }
    },
    // Click handler
    clickTab: function clickTab(tab, evt) {
      this.activateTab(tab);
      this.emitTabClick(tab, evt);
    },
    // Move to first non-disabled tab
    firstTab: function firstTab(focus) {
      var tab = this.tabs.find(notDisabled);

      if (this.activateTab(tab) && focus) {
        this.focusButton(tab);
        this.emitTabClick(tab, focus);
      }
    },
    // Move to previous non-disabled tab
    previousTab: function previousTab(focus) {
      var currentIndex = mathMax(this.currentTab, 0);
      var tab = this.tabs.slice(0, currentIndex).reverse().find(notDisabled);

      if (this.activateTab(tab) && focus) {
        this.focusButton(tab);
        this.emitTabClick(tab, focus);
      }
    },
    // Move to next non-disabled tab
    nextTab: function nextTab(focus) {
      var currentIndex = mathMax(this.currentTab, -1);
      var tab = this.tabs.slice(currentIndex + 1).find(notDisabled);

      if (this.activateTab(tab) && focus) {
        this.focusButton(tab);
        this.emitTabClick(tab, focus);
      }
    },
    // Move to last non-disabled tab
    lastTab: function lastTab(focus) {
      var tab = this.tabs.slice().reverse().find(notDisabled);

      if (this.activateTab(tab) && focus) {
        this.focusButton(tab);
        this.emitTabClick(tab, focus);
      }
    }
  },
  render: function render(h) {
    var _this9 = this;

    var tabs = this.tabs; // Currently active tab

    var activeTab = tabs.find(function (tab) {
      return tab.localActive && !tab.disabled;
    }); // Tab button to allow focusing when no active tab found (keynav only)

    var fallbackTab = tabs.find(function (tab) {
      return !tab.disabled;
    }); // For each <b-tab> found create the tab buttons

    var buttons = tabs.map(function (tab, index) {
      var tabIndex = null; // Ensure at least one tab button is focusable when keynav enabled (if possible)

      if (!_this9.noKeyNav) {
        // Buttons are not in tab index unless active, or a fallback tab
        tabIndex = -1;

        if (activeTab === tab || !activeTab && fallbackTab === tab) {
          // Place tab button in tab sequence
          tabIndex = null;
        }
      }

      return h(BTabButtonHelper, {
        key: tab._uid || index,
        ref: 'buttons',
        // Needed to make `this.$refs.buttons` an array
        refInFor: true,
        props: {
          tab: tab,
          tabs: tabs,
          id: tab.controlledBy || (tab.safeId ? tab.safeId("_BV_tab_button_") : null),
          controls: tab.safeId ? tab.safeId() : null,
          tabIndex: tabIndex,
          setSize: tabs.length,
          posInSet: index + 1,
          noKeyNav: _this9.noKeyNav
        },
        on: {
          click: function click(evt) {
            _this9.clickTab(tab, evt);
          },
          first: _this9.firstTab,
          prev: _this9.previousTab,
          next: _this9.nextTab,
          last: _this9.lastTab
        }
      });
    }); // Nav

    var nav = h(BNav, {
      ref: 'nav',
      class: this.localNavClass,
      attrs: {
        role: 'tablist',
        id: this.safeId('_BV_tab_controls_')
      },
      props: {
        fill: this.fill,
        justified: this.justified,
        align: this.align,
        tabs: !this.noNavStyle && !this.pills,
        pills: !this.noNavStyle && this.pills,
        vertical: this.vertical,
        small: this.small,
        cardHeader: this.card && !this.vertical
      }
    }, [this.normalizeSlot('tabs-start') || h(), buttons, this.normalizeSlot('tabs-end') || h()]);
    nav = h('div', {
      key: 'bv-tabs-nav',
      class: [{
        'card-header': this.card && !this.vertical && !this.end,
        'card-footer': this.card && !this.vertical && this.end,
        'col-auto': this.vertical
      }, this.navWrapperClass]
    }, [nav]);
    var empty = h();

    if (!tabs || tabs.length === 0) {
      empty = h('div', {
        key: 'bv-empty-tab',
        class: ['tab-pane', 'active', {
          'card-body': this.card
        }]
      }, this.normalizeSlot('empty'));
    } // Main content section


    var content = h('div', {
      ref: 'tabsContainer',
      key: 'bv-tabs-container',
      staticClass: 'tab-content',
      class: [{
        col: this.vertical
      }, this.contentClass],
      attrs: {
        id: this.safeId('_BV_tab_container_')
      }
    }, concat(this.normalizeSlot('default'), empty)); // Render final output

    return h(this.tag, {
      staticClass: 'tabs',
      class: {
        row: this.vertical,
        'no-gutters': this.vertical && this.card
      },
      attrs: {
        id: this.safeId()
      }
    }, [this.end ? content : h(), [nav], this.end ? h() : content]);
  }
});
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/bv-transition.js
function bv_transition_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function bv_transition_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { bv_transition_ownKeys(Object(source), true).forEach(function (key) { bv_transition_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { bv_transition_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function bv_transition_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Generic Bootstrap v4 fade (no-fade) transition component
//
// Assumes that `show` class is not required when
// the transition has finished the enter transition
// (show and fade classes are only applied during transition)



var NO_FADE_PROPS = {
  name: '',
  enterClass: '',
  enterActiveClass: '',
  enterToClass: 'show',
  leaveClass: 'show',
  leaveActiveClass: '',
  leaveToClass: ''
};

var FADE_PROPS = bv_transition_objectSpread(bv_transition_objectSpread({}, NO_FADE_PROPS), {}, {
  enterActiveClass: 'fade',
  leaveActiveClass: 'fade'
}); // @vue/component


var BVTransition = /*#__PURE__*/vue.extend({
  name: 'BVTransition',
  functional: true,
  props: {
    noFade: {
      // Only applicable to the built in transition
      // Has no effect if `trans-props` provided
      type: Boolean,
      default: false
    },
    appear: {
      // Has no effect if `trans-props` provided
      type: Boolean,
      default: false
    },
    mode: {
      // Can be overridden by user supplied trans-props
      type: String // default: undefined

    },
    // For user supplied transitions (if needed)
    transProps: {
      type: Object,
      default: null
    }
  },
  render: function render(h, _ref) {
    var children = _ref.children,
        data = _ref.data,
        props = _ref.props;
    var transProps = props.transProps;

    if (!isPlainObject(transProps)) {
      transProps = props.noFade ? NO_FADE_PROPS : FADE_PROPS;

      if (props.appear) {
        // Default the appear classes to equal the enter classes
        transProps = bv_transition_objectSpread(bv_transition_objectSpread({}, transProps), {}, {
          appear: true,
          appearClass: transProps.enterClass,
          appearActiveClass: transProps.enterActiveClass,
          appearToClass: transProps.enterToClass
        });
      }
    }

    transProps = bv_transition_objectSpread(bv_transition_objectSpread({
      mode: props.mode
    }, transProps), {}, {
      // We always need `css` true
      css: true
    });
    return h('transition', // Any transition event listeners will get merged here
    lib_esm_a(data, {
      props: transProps
    }), children);
  }
});
/* harmony default export */ var bv_transition = (BVTransition);
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/components/tabs/tab.js



 // @vue/component

var BTab = /*#__PURE__*/vue.extend({
  name: 'BTab',
  mixins: [mixins_id, mixins_normalize_slot],
  inject: {
    bvTabs: {
      default: function _default() {
        return {};
      }
    }
  },
  props: {
    active: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: 'div'
    },
    buttonId: {
      type: String // default: ''

    },
    title: {
      type: String,
      default: ''
    },
    titleItemClass: {
      // Sniffed by tabs.js and added to nav 'li.nav-item'
      type: [String, Array, Object] // default: null

    },
    titleLinkClass: {
      // Sniffed by tabs.js and added to nav 'a.nav-link'
      type: [String, Array, Object] // default: null

    },
    titleLinkAttributes: {
      type: Object // default: null

    },
    disabled: {
      type: Boolean,
      default: false
    },
    noBody: {
      type: Boolean,
      default: false
    },
    lazy: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      localActive: this.active && !this.disabled,
      show: false
    };
  },
  computed: {
    tabClasses: function tabClasses() {
      return [{
        active: this.localActive,
        disabled: this.disabled,
        'card-body': this.bvTabs.card && !this.noBody
      }, // Apply <b-tabs> `activeTabClass` styles when this tab is active
      this.localActive ? this.bvTabs.activeTabClass : null];
    },
    controlledBy: function controlledBy() {
      return this.buttonId || this.safeId('__BV_tab_button__');
    },
    computedNoFade: function computedNoFade() {
      return !(this.bvTabs.fade || false);
    },
    computedLazy: function computedLazy() {
      return this.bvTabs.lazy || this.lazy;
    },
    _isTab: function _isTab() {
      // For parent sniffing of child
      return true;
    }
  },
  watch: {
    localActive: function localActive(newVal) {
      // Make 'active' prop work with `.sync` modifier
      this.$emit('update:active', newVal);
    },
    active: function active(newVal, oldVal) {
      if (newVal !== oldVal) {
        if (newVal) {
          // If activated post mount
          this.activate();
        } else {
          /* istanbul ignore next */
          if (!this.deactivate()) {
            // Tab couldn't be deactivated, so we reset the synced active prop
            // Deactivation will fail if no other tabs to activate
            this.$emit('update:active', this.localActive);
          }
        }
      }
    },
    disabled: function disabled(newVal, oldVal) {
      if (newVal !== oldVal) {
        if (newVal && this.localActive && this.bvTabs.firstTab) {
          this.localActive = false;
          this.bvTabs.firstTab();
        }
      }
    }
  },
  mounted: function mounted() {
    // Inform b-tabs of our presence
    this.registerTab(); // Initially show on mount if active and not disabled

    this.show = this.localActive;
  },
  updated: function updated() {
    // Force the tab button content to update (since slots are not reactive)
    // Only done if we have a title slot, as the title prop is reactive
    if (this.hasNormalizedSlot('title') && this.bvTabs.updateButton) {
      this.bvTabs.updateButton(this);
    }
  },
  destroyed: function destroyed() {
    // inform b-tabs of our departure
    this.unregisterTab();
  },
  methods: {
    // Private methods
    registerTab: function registerTab() {
      // Inform `b-tabs` of our presence
      this.bvTabs.registerTab && this.bvTabs.registerTab(this);
    },
    unregisterTab: function unregisterTab() {
      // Inform `b-tabs` of our departure
      this.bvTabs.unregisterTab && this.bvTabs.unregisterTab(this);
    },
    // Public methods
    activate: function activate() {
      if (this.bvTabs.activateTab && !this.disabled) {
        return this.bvTabs.activateTab(this);
      } else {
        // Not inside a <b-tabs> component or tab is disabled
        return false;
      }
    },
    deactivate: function deactivate() {
      if (this.bvTabs.deactivateTab && this.localActive) {
        return this.bvTabs.deactivateTab(this);
      } else {
        // Not inside a <b-tabs> component or not active to begin with
        return false;
      }
    }
  },
  render: function render(h) {
    var content = h(this.tag, {
      ref: 'panel',
      staticClass: 'tab-pane',
      class: this.tabClasses,
      directives: [{
        name: 'show',
        rawName: 'v-show',
        value: this.localActive,
        expression: 'localActive'
      }],
      attrs: {
        role: 'tabpanel',
        id: this.safeId(),
        'aria-hidden': this.localActive ? 'false' : 'true',
        'aria-labelledby': this.controlledBy || null
      }
    }, // Render content lazily if requested
    [this.localActive || !this.computedLazy ? this.normalizeSlot('default') : h()]);
    return h(bv_transition, {
      props: {
        mode: 'out-in',
        noFade: this.computedNoFade
      }
    }, [content]);
  }
});
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/suffix-prop-name.js

/**
 * Suffix can be a falsey value so nothing is appended to string.
 * (helps when looping over props & some shouldn't change)
 * Use data last parameters to allow for currying.
 * @param {string} suffix
 * @param {string} str
 */

var suffix_prop_name_suffixPropName = function suffixPropName(suffix, str) {
  return str + (suffix ? string_upperFirst(suffix) : '');
};

/* harmony default export */ var suffix_prop_name = (suffix_prop_name_suffixPropName);
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/components/layout/col.js
function col_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function col_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { col_ownKeys(Object(source), true).forEach(function (key) { col_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { col_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function col_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










var RX_COL_CLASS = /^col-/; // Generates a prop object with a type of `[Boolean, String, Number]`

var boolStrNum = function boolStrNum() {
  return {
    type: [Boolean, String, Number],
    default: false
  };
}; // Generates a prop object with a type of `[String, Number]`


var strNum = function strNum() {
  return {
    type: [String, Number],
    default: null
  };
}; // Compute a breakpoint class name


var col_computeBreakpoint = function computeBreakpoint(type, breakpoint, val) {
  var className = type;

  if (isUndefinedOrNull(val) || val === false) {
    return undefined;
  }

  if (breakpoint) {
    className += "-".concat(breakpoint);
  } // Handling the boolean style prop when accepting [Boolean, String, Number]
  // means Vue will not convert <b-col sm></b-col> to sm: true for us.
  // Since the default is false, an empty string indicates the prop's presence.


  if (type === 'col' && (val === '' || val === true)) {
    // .col-md
    return lowerCase(className);
  } // .order-md-6


  className += "-".concat(val);
  return lowerCase(className);
}; // Memoized function for better performance on generating class names


var computeBreakpointClass = utils_memoize(col_computeBreakpoint); // Cached copy of the breakpoint prop names

var breakpointPropMap = create(null); // Lazy evaled props factory for BCol

var col_generateProps = function generateProps() {
  // Grab the breakpoints from the cached config (exclude the '' (xs) breakpoint)
  var breakpoints = getBreakpointsUpCached().filter(utils_identity); // Supports classes like: .col-sm, .col-md-6, .col-lg-auto

  var breakpointCol = breakpoints.reduce(function (propMap, breakpoint) {
    if (breakpoint) {
      // We filter out the '' breakpoint (xs), as making a prop name ''
      // would not work. The `cols` prop is used for `xs`
      propMap[breakpoint] = boolStrNum();
    }

    return propMap;
  }, create(null)); // Supports classes like: .offset-md-1, .offset-lg-12

  var breakpointOffset = breakpoints.reduce(function (propMap, breakpoint) {
    propMap[suffix_prop_name(breakpoint, 'offset')] = strNum();
    return propMap;
  }, create(null)); // Supports classes like: .order-md-1, .order-lg-12

  var breakpointOrder = breakpoints.reduce(function (propMap, breakpoint) {
    propMap[suffix_prop_name(breakpoint, 'order')] = strNum();
    return propMap;
  }, create(null)); // For loop doesn't need to check hasOwnProperty
  // when using an object created from null

  breakpointPropMap = object_assign(create(null), {
    col: keys(breakpointCol),
    offset: keys(breakpointOffset),
    order: keys(breakpointOrder)
  }); // Return the generated props

  return col_objectSpread(col_objectSpread(col_objectSpread(col_objectSpread({
    // Generic flexbox .col (xs)
    col: {
      type: Boolean,
      default: false
    },
    // .col-[1-12]|auto  (xs)
    cols: strNum()
  }, breakpointCol), {}, {
    offset: strNum()
  }, breakpointOffset), {}, {
    order: strNum()
  }, breakpointOrder), {}, {
    // Flex alignment
    alignSelf: {
      type: String,
      default: null,
      validator: function validator(str) {
        return arrayIncludes(['auto', 'start', 'end', 'center', 'baseline', 'stretch'], str);
      }
    },
    tag: {
      type: String,
      default: 'div'
    }
  });
}; // We do not use Vue.extend here as that would evaluate the props
// immediately, which we do not want to happen
// @vue/component


var BCol = {
  name: 'BCol',
  functional: true,

  get props() {
    // Allow props to be lazy evaled on first access and
    // then they become a non-getter afterwards.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get#Smart_self-overwriting_lazy_getters
    delete this.props; // eslint-disable-next-line no-return-assign

    return this.props = col_generateProps();
  },

  render: function render(h, _ref) {
    var _classList$push;

    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    var classList = []; // Loop through `col`, `offset`, `order` breakpoint props

    for (var type in breakpointPropMap) {
      // Returns colSm, offset, offsetSm, orderMd, etc.
      var _keys = breakpointPropMap[type];

      for (var i = 0; i < _keys.length; i++) {
        // computeBreakpoint(col, colSm => Sm, value=[String, Number, Boolean])
        var c = computeBreakpointClass(type, _keys[i].replace(type, ''), props[_keys[i]]); // If a class is returned, push it onto the array.

        if (c) {
          classList.push(c);
        }
      }
    }

    var hasColClasses = classList.some(function (className) {
      return RX_COL_CLASS.test(className);
    });
    classList.push((_classList$push = {
      // Default to .col if no other col-{bp}-* classes generated nor `cols` specified.
      col: props.col || !hasColClasses && !props.cols
    }, col_defineProperty(_classList$push, "col-".concat(props.cols), props.cols), col_defineProperty(_classList$push, "offset-".concat(props.offset), props.offset), col_defineProperty(_classList$push, "order-".concat(props.order), props.order), col_defineProperty(_classList$push, "align-self-".concat(props.alignSelf), props.alignSelf), _classList$push));
    return h(props.tag, lib_esm_a(data, {
      class: classList
    }), children);
  }
};
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/components/layout/row.js
function row_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function row_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { row_ownKeys(Object(source), true).forEach(function (key) { row_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { row_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function row_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









var COMMON_ALIGNMENT = ['start', 'end', 'center']; // Generates a prop object with a type of `[String, Number]`

var row_strNum = function strNum() {
  return {
    type: [String, Number],
    default: null
  };
}; // Compute a `row-cols-{breakpoint}-{cols}` class name
// Memoized function for better performance on generating class names


var computeRowColsClass = utils_memoize(function (breakpoint, cols) {
  cols = trim(string_toString(cols));
  return cols ? lowerCase(['row-cols', breakpoint, cols].filter(utils_identity).join('-')) : null;
}); // Get the breakpoint name from the `rowCols` prop name
// Memoized function for better performance on extracting breakpoint names

var computeRowColsBreakpoint = utils_memoize(function (prop) {
  return lowerCase(prop.replace('cols', ''));
}); // Cached copy of the `row-cols` breakpoint prop names
// Will be populated when the props are generated

var rowColsPropList = []; // Lazy evaled props factory for <b-row> (called only once,
// the first time the component is used)

var row_generateProps = function generateProps() {
  // Grab the breakpoints from the cached config (including the '' (xs) breakpoint)
  var breakpoints = getBreakpointsUpCached(); // Supports classes like: `row-cols-2`, `row-cols-md-4`, `row-cols-xl-6`

  var rowColsProps = breakpoints.reduce(function (props, breakpoint) {
    props[suffix_prop_name(breakpoint, 'cols')] = row_strNum();
    return props;
  }, create(null)); // Cache the row-cols prop names

  rowColsPropList = keys(rowColsProps); // Return the generated props

  return row_objectSpread({
    tag: {
      type: String,
      default: 'div'
    },
    noGutters: {
      type: Boolean,
      default: false
    },
    alignV: {
      type: String,
      default: null,
      validator: function validator(str) {
        return arrayIncludes(concat(COMMON_ALIGNMENT, 'baseline', 'stretch'), str);
      }
    },
    alignH: {
      type: String,
      default: null,
      validator: function validator(str) {
        return arrayIncludes(concat(COMMON_ALIGNMENT, 'between', 'around'), str);
      }
    },
    alignContent: {
      type: String,
      default: null,
      validator: function validator(str) {
        return arrayIncludes(concat(COMMON_ALIGNMENT, 'between', 'around', 'stretch'), str);
      }
    }
  }, rowColsProps);
}; // We do not use `Vue.extend()` here as that would evaluate the props
// immediately, which we do not want to happen
// @vue/component


var BRow = {
  name: 'BRow',
  functional: true,

  get props() {
    // Allow props to be lazy evaled on first access and
    // then they become a non-getter afterwards
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get#Smart_self-overwriting_lazy_getters
    delete this.props;
    this.props = row_generateProps();
    return this.props;
  },

  render: function render(h, _ref) {
    var _classList$push;

    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;
    var classList = []; // Loop through row-cols breakpoint props and generate the classes

    rowColsPropList.forEach(function (prop) {
      var c = computeRowColsClass(computeRowColsBreakpoint(prop), props[prop]); // If a class is returned, push it onto the array

      if (c) {
        classList.push(c);
      }
    });
    classList.push((_classList$push = {
      'no-gutters': props.noGutters
    }, row_defineProperty(_classList$push, "align-items-".concat(props.alignV), props.alignV), row_defineProperty(_classList$push, "justify-content-".concat(props.alignH), props.alignH), row_defineProperty(_classList$push, "align-content-".concat(props.alignContent), props.alignContent), _classList$push));
    return h(props.tag, lib_esm_a(data, {
      staticClass: 'row',
      class: classList
    }), children);
  }
};
// EXTERNAL MODULE: ./node_modules/popper.js/dist/esm/popper.js
var popper = __webpack_require__("f0bd");

// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/mixins/click-out.js

 // @vue/component

/* harmony default export */ var click_out = ({
  data: function data() {
    return {
      listenForClickOut: false
    };
  },
  watch: {
    listenForClickOut: function listenForClickOut(newValue, oldValue) {
      if (newValue !== oldValue) {
        eventOff(this.clickOutElement, this.clickOutEventName, this._clickOutHandler, EVENT_OPTIONS_NO_CAPTURE);

        if (newValue) {
          eventOn(this.clickOutElement, this.clickOutEventName, this._clickOutHandler, EVENT_OPTIONS_NO_CAPTURE);
        }
      }
    }
  },
  beforeCreate: function beforeCreate() {
    // Declare non-reactive properties
    this.clickOutElement = null;
    this.clickOutEventName = null;
  },
  mounted: function mounted() {
    if (!this.clickOutElement) {
      this.clickOutElement = document;
    }

    if (!this.clickOutEventName) {
      this.clickOutEventName = 'click';
    }

    if (this.listenForClickOut) {
      eventOn(this.clickOutElement, this.clickOutEventName, this._clickOutHandler, EVENT_OPTIONS_NO_CAPTURE);
    }
  },
  beforeDestroy: function beforeDestroy()
  /* istanbul ignore next */
  {
    eventOff(this.clickOutElement, this.clickOutEventName, this._clickOutHandler, EVENT_OPTIONS_NO_CAPTURE);
  },
  methods: {
    isClickOut: function isClickOut(evt) {
      return !dom_contains(this.$el, evt.target);
    },
    _clickOutHandler: function _clickOutHandler(evt) {
      if (this.clickOutHandler && this.isClickOut(evt)) {
        this.clickOutHandler(evt);
      }
    }
  }
});
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/mixins/focus-in.js
 // @vue/component

/* harmony default export */ var focus_in = ({
  data: function data() {
    return {
      listenForFocusIn: false
    };
  },
  watch: {
    listenForFocusIn: function listenForFocusIn(newValue, oldValue) {
      if (newValue !== oldValue) {
        eventOff(this.focusInElement, 'focusin', this._focusInHandler, EVENT_OPTIONS_NO_CAPTURE);

        if (newValue) {
          eventOn(this.focusInElement, 'focusin', this._focusInHandler, EVENT_OPTIONS_NO_CAPTURE);
        }
      }
    }
  },
  beforeCreate: function beforeCreate() {
    // Declare non-reactive properties
    this.focusInElement = null;
  },
  mounted: function mounted() {
    if (!this.focusInElement) {
      this.focusInElement = document;
    }

    if (this.listenForFocusIn) {
      eventOn(this.focusInElement, 'focusin', this._focusInHandler, EVENT_OPTIONS_NO_CAPTURE);
    }
  },
  beforeDestroy: function beforeDestroy()
  /* istanbul ignore next */
  {
    eventOff(this.focusInElement, 'focusin', this._focusInHandler, EVENT_OPTIONS_NO_CAPTURE);
  },
  methods: {
    _focusInHandler: function _focusInHandler(evt) {
      if (this.focusInHandler) {
        this.focusInHandler(evt);
      }
    }
  }
});
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/mixins/dropdown.js
function dropdown_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function dropdown_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { dropdown_ownKeys(Object(source), true).forEach(function (key) { dropdown_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { dropdown_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function dropdown_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










 // Return an array of visible items

var dropdown_filterVisibles = function filterVisibles(els) {
  return (els || []).filter(isVisible);
}; // Root dropdown event names


var ROOT_DROPDOWN_PREFIX = 'bv::dropdown::';
var ROOT_DROPDOWN_SHOWN = "".concat(ROOT_DROPDOWN_PREFIX, "shown");
var ROOT_DROPDOWN_HIDDEN = "".concat(ROOT_DROPDOWN_PREFIX, "hidden"); // Dropdown item CSS selectors

var Selector = {
  FORM_CHILD: '.dropdown form',
  ITEM_SELECTOR: ['.dropdown-item', '.b-dropdown-form'].map(function (selector) {
    return "".concat(selector, ":not(.disabled):not([disabled])");
  }).join(', ')
}; // Popper attachment positions

var AttachmentMap = {
  // Dropup left align
  TOP: 'top-start',
  // Dropup right align
  TOPEND: 'top-end',
  // Dropdown left align
  BOTTOM: 'bottom-start',
  // Dropdown right align
  BOTTOMEND: 'bottom-end',
  // Dropright left align
  RIGHT: 'right-start',
  // Dropright right align
  RIGHTEND: 'right-end',
  // Dropleft left align
  LEFT: 'left-start',
  // Dropleft right align
  LEFTEND: 'left-end'
};
var commonProps = {
  dropup: {
    // place on top if possible
    type: Boolean,
    default: false
  },
  dropright: {
    // place right if possible
    type: Boolean,
    default: false
  },
  dropleft: {
    // place left if possible
    type: Boolean,
    default: false
  },
  right: {
    // Right align menu (default is left align)
    type: Boolean,
    default: false
  },
  offset: {
    // Number of pixels to offset menu, or a CSS unit value (i.e. 1px, 1rem, etc)
    type: [Number, String],
    default: 0
  },
  noFlip: {
    // Disable auto-flipping of menu from bottom<=>top
    type: Boolean,
    default: false
  },
  popperOpts: {
    // type: Object,
    default: function _default() {}
  },
  boundary: {
    // String: `scrollParent`, `window` or `viewport`
    // HTMLElement: HTML Element reference
    type: [String, HTMLElement],
    default: 'scrollParent'
  }
}; // @vue/component

/* harmony default export */ var dropdown = ({
  mixins: [mixins_id, click_out, focus_in],
  provide: function provide() {
    return {
      bvDropdown: this
    };
  },
  inject: {
    bvNavbar: {
      default: null
    }
  },
  props: dropdown_objectSpread({
    disabled: {
      type: Boolean,
      default: false
    }
  }, commonProps),
  data: function data() {
    return {
      visible: false,
      visibleChangePrevented: false
    };
  },
  computed: {
    inNavbar: function inNavbar() {
      return !isNull(this.bvNavbar);
    },
    toggler: function toggler() {
      var toggle = this.$refs.toggle;
      return toggle ? toggle.$el || toggle : null;
    },
    directionClass: function directionClass() {
      if (this.dropup) {
        return 'dropup';
      } else if (this.dropright) {
        return 'dropright';
      } else if (this.dropleft) {
        return 'dropleft';
      }

      return '';
    }
  },
  watch: {
    visible: function visible(newValue, oldValue) {
      if (this.visibleChangePrevented) {
        this.visibleChangePrevented = false;
        return;
      }

      if (newValue !== oldValue) {
        var evtName = newValue ? 'show' : 'hide';
        var bvEvt = new bv_event_class_BvEvent(evtName, {
          cancelable: true,
          vueTarget: this,
          target: this.$refs.menu,
          relatedTarget: null,
          componentId: this.safeId ? this.safeId() : this.id || null
        });
        this.emitEvent(bvEvt);

        if (bvEvt.defaultPrevented) {
          // Reset value and exit if canceled
          this.visibleChangePrevented = true;
          this.visible = oldValue; // Just in case a child element triggered `this.hide(true)`

          this.$off('hidden', this.focusToggler);
          return;
        }

        if (evtName === 'show') {
          this.showMenu();
        } else {
          this.hideMenu();
        }
      }
    },
    disabled: function disabled(newValue, oldValue) {
      if (newValue !== oldValue && newValue && this.visible) {
        // Hide dropdown if disabled changes to true
        this.visible = false;
      }
    }
  },
  created: function created() {
    // Create non-reactive property
    this.$_popper = null;
  },

  /* istanbul ignore next */
  deactivated: function deactivated()
  /* istanbul ignore next: not easy to test */
  {
    // In case we are inside a `<keep-alive>`
    this.visible = false;
    this.whileOpenListen(false);
    this.destroyPopper();
  },
  beforeDestroy: function beforeDestroy() {
    this.visible = false;
    this.whileOpenListen(false);
    this.destroyPopper();
  },
  methods: {
    // Event emitter
    emitEvent: function emitEvent(bvEvt) {
      var type = bvEvt.type;
      this.$emit(type, bvEvt);
      this.$root.$emit("".concat(ROOT_DROPDOWN_PREFIX).concat(type), bvEvt);
    },
    showMenu: function showMenu() {
      var _this = this;

      if (this.disabled) {
        /* istanbul ignore next */
        return;
      } // Only instantiate Popper.js when dropdown is not in `<b-navbar>`


      if (!this.inNavbar) {
        if (typeof popper["a" /* default */] === 'undefined') {
          /* istanbul ignore next */
          warn_warn('Popper.js not found. Falling back to CSS positioning', 'BDropdown');
        } else {
          // For dropup with alignment we use the parent element as popper container
          var el = this.dropup && this.right || this.split ? this.$el : this.$refs.toggle; // Make sure we have a reference to an element, not a component!

          el = el.$el || el; // Instantiate Popper.js

          this.createPopper(el);
        }
      } // Ensure other menus are closed


      this.$root.$emit(ROOT_DROPDOWN_SHOWN, this); // Enable listeners

      this.whileOpenListen(true); // Wrap in `$nextTick()` to ensure menu is fully rendered/shown

      this.$nextTick(function () {
        // Focus on the menu container on show
        _this.focusMenu(); // Emit the shown event


        _this.$emit('shown');
      });
    },
    hideMenu: function hideMenu() {
      this.whileOpenListen(false);
      this.$root.$emit(ROOT_DROPDOWN_HIDDEN, this);
      this.$emit('hidden');
      this.destroyPopper();
    },
    createPopper: function createPopper(element) {
      this.destroyPopper();
      this.$_popper = new popper["a" /* default */](element, this.$refs.menu, this.getPopperConfig());
    },
    destroyPopper: function destroyPopper() {
      // Ensure popper event listeners are removed cleanly
      if (this.$_popper) {
        this.$_popper.destroy();
      }

      this.$_popper = null;
    },
    updatePopper: function updatePopper()
    /* istanbul ignore next: not easy to test */
    {
      // Instructs popper to re-computes the dropdown position
      // useful if the content changes size
      try {
        this.$_popper.scheduleUpdate();
      } catch (_unused) {}
    },
    getPopperConfig: function getPopperConfig() {
      var placement = AttachmentMap.BOTTOM;

      if (this.dropup) {
        placement = this.right ? AttachmentMap.TOPEND : AttachmentMap.TOP;
      } else if (this.dropright) {
        placement = AttachmentMap.RIGHT;
      } else if (this.dropleft) {
        placement = AttachmentMap.LEFT;
      } else if (this.right) {
        placement = AttachmentMap.BOTTOMEND;
      }

      var popperConfig = {
        placement: placement,
        modifiers: {
          offset: {
            offset: this.offset || 0
          },
          flip: {
            enabled: !this.noFlip
          }
        }
      };

      if (this.boundary) {
        popperConfig.modifiers.preventOverflow = {
          boundariesElement: this.boundary
        };
      }

      return dropdown_objectSpread(dropdown_objectSpread({}, popperConfig), this.popperOpts || {});
    },
    // Turn listeners on/off while open
    whileOpenListen: function whileOpenListen(isOpen) {
      // Hide the dropdown when clicked outside
      this.listenForClickOut = isOpen; // Hide the dropdown when it loses focus

      this.listenForFocusIn = isOpen; // Hide the dropdown when another dropdown is opened

      var method = isOpen ? '$on' : '$off';
      this.$root[method](ROOT_DROPDOWN_SHOWN, this.rootCloseListener);
    },
    rootCloseListener: function rootCloseListener(vm) {
      if (vm !== this) {
        this.visible = false;
      }
    },
    show: function show() {
      var _this2 = this;

      // Public method to show dropdown
      if (this.disabled) {
        return;
      } // Wrap in a `requestAF()` to allow any previous
      // click handling to occur first


      requestAF(function () {
        _this2.visible = true;
      });
    },
    hide: function hide() {
      var refocus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      // Public method to hide dropdown
      if (this.disabled) {
        /* istanbul ignore next */
        return;
      }

      this.visible = false;

      if (refocus) {
        // Child element is closing the dropdown on click
        this.$once('hidden', this.focusToggler);
      }
    },
    // Called only by a button that toggles the menu
    toggle: function toggle(evt) {
      evt = evt || {}; // Early exit when not a click event or ENTER, SPACE or DOWN were pressed

      var _evt = evt,
          type = _evt.type,
          keyCode = _evt.keyCode;

      if (type !== 'click' && !(type === 'keydown' && [key_codes.ENTER, key_codes.SPACE, key_codes.DOWN].indexOf(keyCode) !== -1)) {
        /* istanbul ignore next */
        return;
      }
      /* istanbul ignore next */


      if (this.disabled) {
        this.visible = false;
        return;
      }

      this.$emit('toggle', evt);
      evt.preventDefault();
      evt.stopPropagation(); // Toggle visibility

      if (this.visible) {
        this.hide(true);
      } else {
        this.show();
      }
    },
    // Mousedown handler for the toggle

    /* istanbul ignore next */
    onMousedown: function onMousedown(evt)
    /* istanbul ignore next */
    {
      // We prevent the 'mousedown' event for the toggle to stop the
      // 'focusin' event from being fired
      // The event would otherwise be picked up by the global 'focusin'
      // listener and there is no cross-browser solution to detect it
      // relates to the toggle click
      // The 'click' event will still be fired and we handle closing
      // other dropdowns there too
      // See https://github.com/bootstrap-vue/bootstrap-vue/issues/4328
      evt.preventDefault();
    },
    // Called from dropdown menu context
    onKeydown: function onKeydown(evt) {
      var keyCode = evt.keyCode;

      if (keyCode === key_codes.ESC) {
        // Close on ESC
        this.onEsc(evt);
      } else if (keyCode === key_codes.DOWN) {
        // Down Arrow
        this.focusNext(evt, false);
      } else if (keyCode === key_codes.UP) {
        // Up Arrow
        this.focusNext(evt, true);
      }
    },
    // If user presses ESC, close the menu
    onEsc: function onEsc(evt) {
      if (this.visible) {
        this.visible = false;
        evt.preventDefault();
        evt.stopPropagation(); // Return focus to original trigger button

        this.$once('hidden', this.focusToggler);
      }
    },
    // Called only in split button mode, for the split button
    onSplitClick: function onSplitClick(evt) {
      /* istanbul ignore next */
      if (this.disabled) {
        this.visible = false;
        return;
      }

      this.$emit('click', evt);
    },
    // Shared hide handler between click-out and focus-in events
    hideHandler: function hideHandler(evt) {
      var target = evt.target;

      if (this.visible && !dom_contains(this.$refs.menu, target) && !dom_contains(this.toggler, target)) {
        this.hide();
      }
    },
    // Document click-out listener
    clickOutHandler: function clickOutHandler(evt) {
      this.hideHandler(evt);
    },
    // Document focus-in listener
    focusInHandler: function focusInHandler(evt) {
      this.hideHandler(evt);
    },
    // Keyboard nav
    focusNext: function focusNext(evt, up) {
      var _this3 = this;

      // Ignore key up/down on form elements
      var target = evt.target;

      if (!this.visible || evt && closest(Selector.FORM_CHILD, target)) {
        /* istanbul ignore next: should never happen */
        return;
      }

      evt.preventDefault();
      evt.stopPropagation();
      this.$nextTick(function () {
        var items = _this3.getItems();

        if (items.length < 1) {
          /* istanbul ignore next: should never happen */
          return;
        }

        var index = items.indexOf(target);

        if (up && index > 0) {
          index--;
        } else if (!up && index < items.length - 1) {
          index++;
        }

        if (index < 0) {
          /* istanbul ignore next: should never happen */
          index = 0;
        }

        _this3.focusItem(index, items);
      });
    },
    focusItem: function focusItem(index, items) {
      var el = items.find(function (el, i) {
        return i === index;
      });
      attemptFocus(el);
    },
    getItems: function getItems() {
      // Get all items
      return dropdown_filterVisibles(dom_selectAll(Selector.ITEM_SELECTOR, this.$refs.menu));
    },
    focusMenu: function focusMenu() {
      attemptFocus(this.$refs.menu);
    },
    focusToggler: function focusToggler() {
      var _this4 = this;

      this.$nextTick(function () {
        attemptFocus(_this4.toggler);
      });
    }
  }
});
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/directives/hover/hover.js
// v-b-hover directive


 // --- Constants ---

var PROP = '__BV_hover_handler__';
var MOUSEENTER = 'mouseenter';
var MOUSELEAVE = 'mouseleave'; // --- Utility methods ---

var createListener = function createListener(handler) {
  var listener = function listener(evt) {
    handler(evt.type === MOUSEENTER, evt);
  };

  listener.fn = handler;
  return listener;
};

var hover_updateListeners = function updateListeners(on, el, listener) {
  eventOnOff(on, el, MOUSEENTER, listener, EVENT_OPTIONS_NO_CAPTURE);
  eventOnOff(on, el, MOUSELEAVE, listener, EVENT_OPTIONS_NO_CAPTURE);
}; // --- Directive bind/unbind/update handler ---


var hover_directive = function directive(el, _ref) {
  var _ref$value = _ref.value,
      handler = _ref$value === void 0 ? null : _ref$value;

  if (env["g" /* isBrowser */]) {
    var listener = el[PROP];
    var hasListener = isFunction(listener);
    var handlerChanged = !(hasListener && listener.fn === handler);

    if (hasListener && handlerChanged) {
      hover_updateListeners(false, el, listener);
      delete el[PROP];
    }

    if (isFunction(handler) && handlerChanged) {
      el[PROP] = createListener(handler);
      hover_updateListeners(true, el, el[PROP]);
    }
  }
}; // VBHover directive


var VBHover = {
  bind: hover_directive,
  componentUpdated: hover_directive,
  unbind: function unbind(el) {
    hover_directive(el, {
      value: null
    });
  }
};
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/icons/helpers/icon-base.js
function icon_base_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function icon_base_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { icon_base_ownKeys(Object(source), true).forEach(function (key) { icon_base_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { icon_base_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function icon_base_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






 // Common icon props (should be cloned/spread before using)

var commonIconProps = {
  variant: {
    type: String,
    default: null
  },
  fontScale: {
    type: [Number, String],
    default: 1
  },
  scale: {
    type: [Number, String],
    default: 1
  },
  rotate: {
    type: [Number, String],
    default: 0
  },
  flipH: {
    type: Boolean,
    default: false
  },
  flipV: {
    type: Boolean,
    default: false
  },
  shiftH: {
    type: [Number, String],
    default: 0
  },
  shiftV: {
    type: [Number, String],
    default: 0
  },
  animation: {
    type: String,
    default: null
  }
}; // Base attributes needed on all icons

var baseAttrs = {
  viewBox: '0 0 16 16',
  width: '1em',
  height: '1em',
  focusable: 'false',
  role: 'img',
  alt: 'icon'
}; // Attributes that are nulled out when stacked

var stackedAttrs = {
  width: null,
  height: null,
  focusable: null,
  role: null,
  alt: null
}; // Shared private base component to reduce bundle/runtime size
// @vue/component

var BVIconBase = /*#__PURE__*/vue.extend({
  name: 'BVIconBase',
  functional: true,
  props: icon_base_objectSpread({
    content: {
      type: String
    },
    stacked: {
      type: Boolean,
      default: false
    }
  }, commonIconProps),
  render: function render(h, _ref) {
    var _class;

    var data = _ref.data,
        props = _ref.props,
        children = _ref.children;
    var fontScale = mathMax(toFloat(props.fontScale, 1), 0) || 1;
    var scale = mathMax(toFloat(props.scale, 1), 0) || 1;
    var rotate = toFloat(props.rotate, 0);
    var shiftH = toFloat(props.shiftH, 0);
    var shiftV = toFloat(props.shiftV, 0);
    var flipH = props.flipH;
    var flipV = props.flipV;
    var animation = props.animation; // Compute the transforms
    // Note that order is important as SVG transforms are applied in order from
    // left to right and we want flipping/scale to occur before rotation
    // Note shifting is applied separately
    // Assumes that the viewbox is `0 0 16 16` (`8 8` is the center)

    var hasScale = flipH || flipV || scale !== 1;
    var hasTransforms = hasScale || rotate;
    var hasShift = shiftH || shiftV;
    var transforms = [hasTransforms ? 'translate(8 8)' : null, hasScale ? "scale(".concat((flipH ? -1 : 1) * scale, " ").concat((flipV ? -1 : 1) * scale, ")") : null, rotate ? "rotate(".concat(rotate, ")") : null, hasTransforms ? 'translate(-8 -8)' : null].filter(utils_identity); // Handling stacked icons

    var isStacked = props.stacked;
    var hasContent = !isUndefinedOrNull(props.content); // We wrap the content in a `<g>` for handling the transforms (except shift)

    var $inner = h('g', {
      attrs: {
        transform: transforms.join(' ') || null
      },
      domProps: hasContent ? {
        innerHTML: props.content || ''
      } : {}
    }, children); // If needed, we wrap in an additional `<g>` in order to handle the shifting

    if (hasShift) {
      $inner = h('g', {
        attrs: {
          transform: "translate(".concat(16 * shiftH / 16, " ").concat(-16 * shiftV / 16, ")")
        }
      }, [$inner]);
    }

    if (isStacked) {
      // Wrap in an additional `<g>` for proper
      // animation handling if stacked
      $inner = h('g', {}, [$inner]);
    }

    return h('svg', lib_esm_a({
      staticClass: 'b-icon bi',
      class: (_class = {}, icon_base_defineProperty(_class, "text-".concat(props.variant), !!props.variant), icon_base_defineProperty(_class, "b-icon-animation-".concat(animation), !!animation), _class),
      attrs: baseAttrs,
      style: isStacked ? {} : {
        fontSize: fontScale === 1 ? null : "".concat(fontScale * 100, "%")
      }
    }, // Merge in user supplied data
    data, // If icon is stacked, null out some attrs
    isStacked ? {
      attrs: stackedAttrs
    } : {}, // These cannot be overridden by users
    {
      attrs: {
        xmlns: isStacked ? null : 'http://www.w3.org/2000/svg',
        fill: 'currentColor'
      }
    }), [$inner]);
  }
});
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/icons/helpers/make-icon.js
function make_icon_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function make_icon_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { make_icon_ownKeys(Object(source), true).forEach(function (key) { make_icon_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { make_icon_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function make_icon_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





/**
 * Icon component generator function
 *
 * @param {string} icon name (minus the leading `BIcon`)
 * @param {string} raw `innerHTML` for SVG
 * @return {VueComponent}
 */

var make_icon_makeIcon = function makeIcon(name, content) {
  // For performance reason we pre-compute some values, so that
  // they are not computed on each render of the icon component
  var iconName = "BIcon".concat(pascalCase(name));
  var iconNameClass = "bi-".concat(kebabCase(name));
  var svgContent = trim(content || ''); // Return the icon component definition

  return /*#__PURE__*/vue.extend({
    name: iconName,
    functional: true,
    props: make_icon_objectSpread(make_icon_objectSpread({}, commonIconProps), {}, {
      stacked: {
        type: Boolean,
        default: false
      }
    }),
    render: function render(h, _ref) {
      var data = _ref.data,
          props = _ref.props;
      return h(BVIconBase, lib_esm_a(data, {
        staticClass: iconNameClass,
        props: make_icon_objectSpread(make_icon_objectSpread({}, props), {}, {
          content: svgContent
        })
      }));
    }
  });
};
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/icons/icons.js
// --- BEGIN AUTO-GENERATED FILE ---
//
// @IconsVersion: 1.0.0-alpha3
// @Generated: 2020-05-12T01:41:42.277Z
//
// This file is generated on each build. Do not edit this file!

/*!
 * BootstrapVue Icons, generated from Bootstrap Icons 1.0.0-alpha3
 *
 * @link https://icons.getbootstrap.com/
 * @license MIT
 * https://github.com/twbs/icons/blob/master/LICENSE.md
 */
 // --- BootstrapVue custom icons ---

var BIconBlank = /*#__PURE__*/make_icon_makeIcon('Blank', ''); // --- Bootstrap Icons ---
// eslint-disable-next-line

var BIconAlarm = /*#__PURE__*/make_icon_makeIcon('Alarm', '<path fill-rule="evenodd" d="M8 15A6 6 0 108 3a6 6 0 000 12zm0 1A7 7 0 108 2a7 7 0 000 14z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 4.5a.5.5 0 01.5.5v4a.5.5 0 01-.053.224l-1.5 3a.5.5 0 11-.894-.448L7.5 8.882V5a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path d="M.86 5.387A2.5 2.5 0 114.387 1.86 8.035 8.035 0 00.86 5.387zM11.613 1.86a2.5 2.5 0 113.527 3.527 8.035 8.035 0 00-3.527-3.527z"/><path fill-rule="evenodd" d="M11.646 14.146a.5.5 0 01.708 0l1 1a.5.5 0 01-.708.708l-1-1a.5.5 0 010-.708zm-7.292 0a.5.5 0 00-.708 0l-1 1a.5.5 0 00.708.708l1-1a.5.5 0 000-.708zM5.5.5A.5.5 0 016 0h4a.5.5 0 010 1H6a.5.5 0 01-.5-.5z" clip-rule="evenodd"/><path d="M7 1h2v2H7V1z"/>'); // eslint-disable-next-line

var BIconAlarmFill = /*#__PURE__*/make_icon_makeIcon('AlarmFill', '<path fill-rule="evenodd" d="M5.5.5A.5.5 0 016 0h4a.5.5 0 010 1H9v1.07a7.002 7.002 0 013.537 12.26l.817.816a.5.5 0 01-.708.708l-.924-.925A6.967 6.967 0 018 16a6.967 6.967 0 01-3.722-1.07l-.924.924a.5.5 0 01-.708-.708l.817-.816A7.002 7.002 0 017 2.07V1H5.999a.5.5 0 01-.5-.5zM.86 5.387A2.5 2.5 0 114.387 1.86 8.035 8.035 0 00.86 5.387zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 013.527 3.527A2.5 2.5 0 0013.5 1zm-5 4a.5.5 0 00-1 0v3.882l-1.447 2.894a.5.5 0 10.894.448l1.5-3A.5.5 0 008.5 9V5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconAlt = /*#__PURE__*/make_icon_makeIcon('Alt', '<path fill-rule="evenodd" d="M1 13.5a.5.5 0 00.5.5h3.797a.5.5 0 00.439-.26L11 3h3.5a.5.5 0 000-1h-3.797a.5.5 0 00-.439.26L5 13H1.5a.5.5 0 00-.5.5zm10 0a.5.5 0 00.5.5h3a.5.5 0 000-1h-3a.5.5 0 00-.5.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconApp = /*#__PURE__*/make_icon_makeIcon('App', '<path fill-rule="evenodd" d="M11 2H5a3 3 0 00-3 3v6a3 3 0 003 3h6a3 3 0 003-3V5a3 3 0 00-3-3zM5 1a4 4 0 00-4 4v6a4 4 0 004 4h6a4 4 0 004-4V5a4 4 0 00-4-4H5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconAppIndicator = /*#__PURE__*/make_icon_makeIcon('AppIndicator', '<path fill-rule="evenodd" d="M5.5 2A3.5 3.5 0 002 5.5v5A3.5 3.5 0 005.5 14h5a3.5 3.5 0 003.5-3.5V8a.5.5 0 011 0v2.5a4.5 4.5 0 01-4.5 4.5h-5A4.5 4.5 0 011 10.5v-5A4.5 4.5 0 015.5 1H8a.5.5 0 010 1H5.5z" clip-rule="evenodd"/><path d="M16 3a3 3 0 11-6 0 3 3 0 016 0z"/>'); // eslint-disable-next-line

var BIconArchive = /*#__PURE__*/make_icon_makeIcon('Archive', '<path fill-rule="evenodd" d="M2 5v7.5c0 .864.642 1.5 1.357 1.5h9.286c.715 0 1.357-.636 1.357-1.5V5h1v7.5c0 1.345-1.021 2.5-2.357 2.5H3.357C2.021 15 1 13.845 1 12.5V5h1z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5.5 7.5A.5.5 0 016 7h4a.5.5 0 010 1H6a.5.5 0 01-.5-.5zM15 2H1v2h14V2zM1 1a1 1 0 00-1 1v2a1 1 0 001 1h14a1 1 0 001-1V2a1 1 0 00-1-1H1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconArchiveFill = /*#__PURE__*/make_icon_makeIcon('ArchiveFill', '<path fill-rule="evenodd" d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM6 7a.5.5 0 000 1h4a.5.5 0 000-1H6zM.8 1a.8.8 0 00-.8.8V3a.8.8 0 00.8.8h14.4A.8.8 0 0016 3V1.8a.8.8 0 00-.8-.8H.8z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconArrow90degDown = /*#__PURE__*/make_icon_makeIcon('Arrow90degDown', '<path fill-rule="evenodd" d="M2.646 9.646a.5.5 0 01.708 0L6 12.293l2.646-2.647a.5.5 0 11.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 010-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M6 13a.5.5 0 01-.5-.5V6A2.5 2.5 0 018 3.5h5.5a.5.5 0 010 1H8A1.5 1.5 0 006.5 6v6.5a.5.5 0 01-.5.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconArrow90degLeft = /*#__PURE__*/make_icon_makeIcon('Arrow90degLeft', '<path fill-rule="evenodd" d="M6.104 2.396a.5.5 0 010 .708L3.457 5.75l2.647 2.646a.5.5 0 11-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M2.75 5.75a.5.5 0 01.5-.5h6.5a2.5 2.5 0 012.5 2.5v5.5a.5.5 0 01-1 0v-5.5a1.5 1.5 0 00-1.5-1.5h-6.5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconArrow90degRight = /*#__PURE__*/make_icon_makeIcon('Arrow90degRight', '<path fill-rule="evenodd" d="M9.896 2.396a.5.5 0 000 .708l2.647 2.646-2.647 2.646a.5.5 0 10.708.708l3-3a.5.5 0 000-.708l-3-3a.5.5 0 00-.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M13.25 5.75a.5.5 0 00-.5-.5h-6.5a2.5 2.5 0 00-2.5 2.5v5.5a.5.5 0 001 0v-5.5a1.5 1.5 0 011.5-1.5h6.5a.5.5 0 00.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconArrow90degUp = /*#__PURE__*/make_icon_makeIcon('Arrow90degUp', '<path fill-rule="evenodd" d="M2.646 6.854a.5.5 0 00.708 0L6 4.207l2.646 2.647a.5.5 0 10.708-.708l-3-3a.5.5 0 00-.708 0l-3 3a.5.5 0 000 .708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M6 3.5a.5.5 0 00-.5.5v6.5A2.5 2.5 0 008 13h5.5a.5.5 0 000-1H8a1.5 1.5 0 01-1.5-1.5V4a.5.5 0 00-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconArrowBarDown = /*#__PURE__*/make_icon_makeIcon('ArrowBarDown', '<path fill-rule="evenodd" d="M11.354 10.146a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 01.708-.708L8 12.793l2.646-2.647a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 6a.5.5 0 01.5.5V13a.5.5 0 01-1 0V6.5A.5.5 0 018 6zM2 3.5a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconArrowBarLeft = /*#__PURE__*/make_icon_makeIcon('ArrowBarLeft', '<path fill-rule="evenodd" d="M5.854 4.646a.5.5 0 00-.708 0l-3 3a.5.5 0 000 .708l3 3a.5.5 0 00.708-.708L3.207 8l2.647-2.646a.5.5 0 000-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10 8a.5.5 0 00-.5-.5H3a.5.5 0 000 1h6.5A.5.5 0 0010 8zm2.5 6a.5.5 0 01-.5-.5v-11a.5.5 0 011 0v11a.5.5 0 01-.5.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconArrowBarRight = /*#__PURE__*/make_icon_makeIcon('ArrowBarRight', '<path fill-rule="evenodd" d="M10.146 4.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L12.793 8l-2.647-2.646a.5.5 0 010-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M6 8a.5.5 0 01.5-.5H13a.5.5 0 010 1H6.5A.5.5 0 016 8zm-2.5 6a.5.5 0 01-.5-.5v-11a.5.5 0 011 0v11a.5.5 0 01-.5.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconArrowBarUp = /*#__PURE__*/make_icon_makeIcon('ArrowBarUp', '<path fill-rule="evenodd" d="M11.354 5.854a.5.5 0 000-.708l-3-3a.5.5 0 00-.708 0l-3 3a.5.5 0 10.708.708L8 3.207l2.646 2.647a.5.5 0 00.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 10a.5.5 0 00.5-.5V3a.5.5 0 00-1 0v6.5a.5.5 0 00.5.5zm-4.8 1.6c0-.22.18-.4.4-.4h8.8a.4.4 0 010 .8H3.6a.4.4 0 01-.4-.4z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconArrowClockwise = /*#__PURE__*/make_icon_makeIcon('ArrowClockwise', '<path fill-rule="evenodd" d="M3.17 6.706a5 5 0 017.103-3.16.5.5 0 10.454-.892A6 6 0 1013.455 5.5a.5.5 0 00-.91.417 5 5 0 11-9.375.789z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8.147.146a.5.5 0 01.707 0l2.5 2.5a.5.5 0 010 .708l-2.5 2.5a.5.5 0 11-.707-.708L10.293 3 8.147.854a.5.5 0 010-.708z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconArrowCounterclockwise = /*#__PURE__*/make_icon_makeIcon('ArrowCounterclockwise', '<path fill-rule="evenodd" d="M12.83 6.706a5 5 0 00-7.103-3.16.5.5 0 11-.454-.892A6 6 0 112.545 5.5a.5.5 0 11.91.417 5 5 0 109.375.789z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.854.146a.5.5 0 00-.708 0l-2.5 2.5a.5.5 0 000 .708l2.5 2.5a.5.5 0 10.708-.708L5.707 3 7.854.854a.5.5 0 000-.708z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconArrowDown = /*#__PURE__*/make_icon_makeIcon('ArrowDown', '<path fill-rule="evenodd" d="M4.646 9.646a.5.5 0 01.708 0L8 12.293l2.646-2.647a.5.5 0 01.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 010-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 2.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V3a.5.5 0 01.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconArrowDownLeft = /*#__PURE__*/make_icon_makeIcon('ArrowDownLeft', '<path fill-rule="evenodd" d="M3 7.5a.5.5 0 01.5.5v4.5H8a.5.5 0 010 1H3a.5.5 0 01-.5-.5V8a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M12.354 3.646a.5.5 0 010 .708l-9 9a.5.5 0 01-.708-.708l9-9a.5.5 0 01.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconArrowDownRight = /*#__PURE__*/make_icon_makeIcon('ArrowDownRight', '<path fill-rule="evenodd" d="M12 7.5a.5.5 0 01.5.5v5a.5.5 0 01-.5.5H7a.5.5 0 010-1h4.5V8a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M2.646 3.646a.5.5 0 01.708 0l9 9a.5.5 0 01-.708.708l-9-9a.5.5 0 010-.708z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconArrowDownShort = /*#__PURE__*/make_icon_makeIcon('ArrowDownShort', '<path fill-rule="evenodd" d="M4.646 7.646a.5.5 0 01.708 0L8 10.293l2.646-2.647a.5.5 0 01.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 010-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 4.5a.5.5 0 01.5.5v5a.5.5 0 01-1 0V5a.5.5 0 01.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconArrowLeft = /*#__PURE__*/make_icon_makeIcon('ArrowLeft', '<path fill-rule="evenodd" d="M5.854 4.646a.5.5 0 010 .708L3.207 8l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M2.5 8a.5.5 0 01.5-.5h10.5a.5.5 0 010 1H3a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconArrowLeftRight = /*#__PURE__*/make_icon_makeIcon('ArrowLeftRight', '<path fill-rule="evenodd" d="M10.146 7.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L12.793 11l-2.647-2.646a.5.5 0 010-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M2 11a.5.5 0 01.5-.5H13a.5.5 0 010 1H2.5A.5.5 0 012 11zm3.854-9.354a.5.5 0 010 .708L3.207 5l2.647 2.646a.5.5 0 11-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M2.5 5a.5.5 0 01.5-.5h10.5a.5.5 0 010 1H3a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconArrowLeftShort = /*#__PURE__*/make_icon_makeIcon('ArrowLeftShort', '<path fill-rule="evenodd" d="M7.854 4.646a.5.5 0 010 .708L5.207 8l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4.5 8a.5.5 0 01.5-.5h6.5a.5.5 0 010 1H5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconArrowRepeat = /*#__PURE__*/make_icon_makeIcon('ArrowRepeat', '<path fill-rule="evenodd" d="M2.854 7.146a.5.5 0 00-.708 0l-2 2a.5.5 0 10.708.708L2.5 8.207l1.646 1.647a.5.5 0 00.708-.708l-2-2zm13-1a.5.5 0 00-.708 0L13.5 7.793l-1.646-1.647a.5.5 0 00-.708.708l2 2a.5.5 0 00.708 0l2-2a.5.5 0 000-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 3a4.995 4.995 0 00-4.192 2.273.5.5 0 01-.837-.546A6 6 0 0114 8a.5.5 0 01-1.001 0 5 5 0 00-5-5zM2.5 7.5A.5.5 0 013 8a5 5 0 009.192 2.727.5.5 0 11.837.546A6 6 0 012 8a.5.5 0 01.501-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconArrowReturnLeft = /*#__PURE__*/make_icon_makeIcon('ArrowReturnLeft', '<path fill-rule="evenodd" d="M5.854 5.646a.5.5 0 010 .708L3.207 9l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M13.5 2.5a.5.5 0 01.5.5v4a2.5 2.5 0 01-2.5 2.5H3a.5.5 0 010-1h8.5A1.5 1.5 0 0013 7V3a.5.5 0 01.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconArrowReturnRight = /*#__PURE__*/make_icon_makeIcon('ArrowReturnRight', '<path fill-rule="evenodd" d="M10.146 5.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L12.793 9l-2.647-2.646a.5.5 0 010-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M3 2.5a.5.5 0 00-.5.5v4A2.5 2.5 0 005 9.5h8.5a.5.5 0 000-1H5A1.5 1.5 0 013.5 7V3a.5.5 0 00-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconArrowRight = /*#__PURE__*/make_icon_makeIcon('ArrowRight', '<path fill-rule="evenodd" d="M10.146 4.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L12.793 8l-2.647-2.646a.5.5 0 010-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M2 8a.5.5 0 01.5-.5H13a.5.5 0 010 1H2.5A.5.5 0 012 8z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconArrowRightShort = /*#__PURE__*/make_icon_makeIcon('ArrowRightShort', '<path fill-rule="evenodd" d="M8.146 4.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L10.793 8 8.146 5.354a.5.5 0 010-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4 8a.5.5 0 01.5-.5H11a.5.5 0 010 1H4.5A.5.5 0 014 8z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconArrowUp = /*#__PURE__*/make_icon_makeIcon('ArrowUp', '<path fill-rule="evenodd" d="M8 3.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V4a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.646 2.646a.5.5 0 01.708 0l3 3a.5.5 0 01-.708.708L8 3.707 5.354 6.354a.5.5 0 11-.708-.708l3-3z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconArrowUpDown = /*#__PURE__*/make_icon_makeIcon('ArrowUpDown', '<path fill-rule="evenodd" d="M11 3.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V4a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10.646 2.646a.5.5 0 01.708 0l3 3a.5.5 0 01-.708.708L11 3.707 8.354 6.354a.5.5 0 11-.708-.708l3-3zm-9 7a.5.5 0 01.708 0L5 12.293l2.646-2.647a.5.5 0 11.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 010-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5 2.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V3a.5.5 0 01.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconArrowUpLeft = /*#__PURE__*/make_icon_makeIcon('ArrowUpLeft', '<path fill-rule="evenodd" d="M2.5 4a.5.5 0 01.5-.5h5a.5.5 0 010 1H3.5V9a.5.5 0 01-1 0V4z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M2.646 3.646a.5.5 0 01.708 0l9 9a.5.5 0 01-.708.708l-9-9a.5.5 0 010-.708z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconArrowUpRight = /*#__PURE__*/make_icon_makeIcon('ArrowUpRight', '<path fill-rule="evenodd" d="M6.5 4a.5.5 0 01.5-.5h5a.5.5 0 01.5.5v5a.5.5 0 01-1 0V4.5H7a.5.5 0 01-.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M12.354 3.646a.5.5 0 010 .708l-9 9a.5.5 0 01-.708-.708l9-9a.5.5 0 01.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconArrowUpShort = /*#__PURE__*/make_icon_makeIcon('ArrowUpShort', '<path fill-rule="evenodd" d="M8 5.5a.5.5 0 01.5.5v5a.5.5 0 01-1 0V6a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 01.708 0l3 3a.5.5 0 01-.708.708L8 5.707 5.354 8.354a.5.5 0 11-.708-.708l3-3z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconArrowsAngleContract = /*#__PURE__*/make_icon_makeIcon('ArrowsAngleContract', '<path fill-rule="evenodd" d="M9.5 2.036a.5.5 0 01.5.5v3.5h3.5a.5.5 0 010 1h-4a.5.5 0 01-.5-.5v-4a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M14.354 1.646a.5.5 0 010 .708l-4.5 4.5a.5.5 0 11-.708-.708l4.5-4.5a.5.5 0 01.708 0zm-7.5 7.5a.5.5 0 010 .708l-4.5 4.5a.5.5 0 01-.708-.708l4.5-4.5a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M2.036 9.5a.5.5 0 01.5-.5h4a.5.5 0 01.5.5v4a.5.5 0 01-1 0V10h-3.5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconArrowsAngleExpand = /*#__PURE__*/make_icon_makeIcon('ArrowsAngleExpand', '<path fill-rule="evenodd" d="M1.5 10.036a.5.5 0 01.5.5v3.5h3.5a.5.5 0 010 1h-4a.5.5 0 01-.5-.5v-4a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M6.354 9.646a.5.5 0 010 .708l-4.5 4.5a.5.5 0 01-.708-.708l4.5-4.5a.5.5 0 01.708 0zm8.5-8.5a.5.5 0 010 .708l-4.5 4.5a.5.5 0 01-.708-.708l4.5-4.5a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10.036 1.5a.5.5 0 01.5-.5h4a.5.5 0 01.5.5v4a.5.5 0 11-1 0V2h-3.5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconArrowsCollapse = /*#__PURE__*/make_icon_makeIcon('ArrowsCollapse', '<path fill-rule="evenodd" d="M2 8a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11A.5.5 0 012 8zm6-7a.5.5 0 01.5.5V6a.5.5 0 01-1 0V1.5A.5.5 0 018 1z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10.354 3.646a.5.5 0 010 .708l-2 2a.5.5 0 01-.708 0l-2-2a.5.5 0 11.708-.708L8 5.293l1.646-1.647a.5.5 0 01.708 0zM8 15a.5.5 0 00.5-.5V10a.5.5 0 00-1 0v4.5a.5.5 0 00.5.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10.354 12.354a.5.5 0 000-.708l-2-2a.5.5 0 00-.708 0l-2 2a.5.5 0 00.708.708L8 10.707l1.646 1.647a.5.5 0 00.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconArrowsExpand = /*#__PURE__*/make_icon_makeIcon('ArrowsExpand', '<path fill-rule="evenodd" d="M2 8a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11A.5.5 0 012 8zm6-1.5a.5.5 0 00.5-.5V1.5a.5.5 0 00-1 0V6a.5.5 0 00.5.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10.354 3.854a.5.5 0 000-.708l-2-2a.5.5 0 00-.708 0l-2 2a.5.5 0 10.708.708L8 2.207l1.646 1.647a.5.5 0 00.708 0zM8 9.5a.5.5 0 01.5.5v4.5a.5.5 0 01-1 0V10a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10.354 12.146a.5.5 0 010 .708l-2 2a.5.5 0 01-.708 0l-2-2a.5.5 0 01.708-.708L8 13.793l1.646-1.647a.5.5 0 01.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconArrowsFullscreen = /*#__PURE__*/make_icon_makeIcon('ArrowsFullscreen', '<path fill-rule="evenodd" d="M1.464 10.536a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3.5a.5.5 0 01-.5-.5v-3.5a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5.964 10a.5.5 0 010 .707l-4.146 4.147a.5.5 0 01-.707-.708L5.257 10a.5.5 0 01.707 0zm8.854-8.854a.5.5 0 010 .708L10.672 6a.5.5 0 01-.708-.707l4.147-4.147a.5.5 0 01.707 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10.5 1.5A.5.5 0 0111 1h3.5a.5.5 0 01.5.5V5a.5.5 0 01-1 0V2h-3a.5.5 0 01-.5-.5zm4 9a.5.5 0 00-.5.5v3h-3a.5.5 0 000 1h3.5a.5.5 0 00.5-.5V11a.5.5 0 00-.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10 9.964a.5.5 0 000 .708l4.146 4.146a.5.5 0 00.708-.707l-4.147-4.147a.5.5 0 00-.707 0zM1.182 1.146a.5.5 0 000 .708L5.328 6a.5.5 0 00.708-.707L1.889 1.146a.5.5 0 00-.707 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5.5 1.5A.5.5 0 005 1H1.5a.5.5 0 00-.5.5V5a.5.5 0 001 0V2h3a.5.5 0 00.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconArrowsMove = /*#__PURE__*/make_icon_makeIcon('ArrowsMove', '<path fill-rule="evenodd" d="M6.5 8a.5.5 0 00-.5-.5H1.5a.5.5 0 000 1H6a.5.5 0 00.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M3.854 5.646a.5.5 0 00-.708 0l-2 2a.5.5 0 000 .708l2 2a.5.5 0 00.708-.708L2.207 8l1.647-1.646a.5.5 0 000-.708zM9.5 8a.5.5 0 01.5-.5h4.5a.5.5 0 010 1H10a.5.5 0 01-.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M12.146 5.646a.5.5 0 01.708 0l2 2a.5.5 0 010 .708l-2 2a.5.5 0 01-.708-.708L13.793 8l-1.647-1.646a.5.5 0 010-.708zM8 9.5a.5.5 0 00-.5.5v4.5a.5.5 0 001 0V10a.5.5 0 00-.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5.646 12.146a.5.5 0 000 .708l2 2a.5.5 0 00.708 0l2-2a.5.5 0 00-.708-.708L8 13.793l-1.646-1.647a.5.5 0 00-.708 0zM8 6.5a.5.5 0 01-.5-.5V1.5a.5.5 0 011 0V6a.5.5 0 01-.5.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5.646 3.854a.5.5 0 010-.708l2-2a.5.5 0 01.708 0l2 2a.5.5 0 01-.708.708L8 2.207 6.354 3.854a.5.5 0 01-.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconAspectRatio = /*#__PURE__*/make_icon_makeIcon('AspectRatio', '<path fill-rule="evenodd" d="M0 3.5A1.5 1.5 0 011.5 2h13A1.5 1.5 0 0116 3.5v9a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 010 12.5v-9zM1.5 3a.5.5 0 00-.5.5v9a.5.5 0 00.5.5h13a.5.5 0 00.5-.5v-9a.5.5 0 00-.5-.5h-13z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M2 4.5a.5.5 0 01.5-.5h3a.5.5 0 010 1H3v2.5a.5.5 0 01-1 0v-3zm12 7a.5.5 0 01-.5.5h-3a.5.5 0 010-1H13V8.5a.5.5 0 011 0v3z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconAspectRatioFill = /*#__PURE__*/make_icon_makeIcon('AspectRatioFill', '<path fill-rule="evenodd" d="M1.5 2A1.5 1.5 0 000 3.5v9A1.5 1.5 0 001.5 14h13a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0014.5 2h-13zm1 2a.5.5 0 00-.5.5v3a.5.5 0 001 0V5h2.5a.5.5 0 000-1h-3zm11 8a.5.5 0 00.5-.5v-3a.5.5 0 00-1 0V11h-2.5a.5.5 0 000 1h3z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconAt = /*#__PURE__*/make_icon_makeIcon('At', '<path fill-rule="evenodd" d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconAward = /*#__PURE__*/make_icon_makeIcon('Award', '<path fill-rule="evenodd" d="M9.669.864L8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193l-1.51-.229L8 1.126l-1.355.702-1.51.229-.684 1.365-1.086 1.072L3.614 6l-.25 1.506 1.087 1.072.684 1.365 1.51.229L8 10.874l1.356-.702 1.509-.229.684-1.365 1.086-1.072L12.387 6l.248-1.506-1.086-1.072-.684-1.365z" clip-rule="evenodd"/><path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/>'); // eslint-disable-next-line

var BIconAwardFill = /*#__PURE__*/make_icon_makeIcon('AwardFill', '<path d="M8 0l1.669.864 1.858.282.842 1.68 1.337 1.32L13.4 6l.306 1.854-1.337 1.32-.842 1.68-1.858.282L8 12l-1.669-.864-1.858-.282-.842-1.68-1.337-1.32L2.6 6l-.306-1.854 1.337-1.32.842-1.68L6.331.864 8 0z"/><path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/>'); // eslint-disable-next-line

var BIconBackspace = /*#__PURE__*/make_icon_makeIcon('Backspace', '<path fill-rule="evenodd" d="M6.603 2h7.08a1 1 0 011 1v10a1 1 0 01-1 1h-7.08a1 1 0 01-.76-.35L1 8l4.844-5.65A1 1 0 016.603 2zm7.08-1a2 2 0 012 2v10a2 2 0 01-2 2h-7.08a2 2 0 01-1.519-.698L.241 8.65a1 1 0 010-1.302L5.084 1.7A2 2 0 016.603 1h7.08z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5.83 5.146a.5.5 0 000 .708l5 5a.5.5 0 00.707-.708l-5-5a.5.5 0 00-.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M11.537 5.146a.5.5 0 010 .708l-5 5a.5.5 0 01-.708-.708l5-5a.5.5 0 01.707 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBackspaceFill = /*#__PURE__*/make_icon_makeIcon('BackspaceFill', '<path fill-rule="evenodd" d="M15.683 3a2 2 0 00-2-2h-7.08a2 2 0 00-1.519.698L.241 7.35a1 1 0 000 1.302l4.843 5.65A2 2 0 006.603 15h7.08a2 2 0 002-2V3zM5.829 5.854a.5.5 0 11.707-.708l2.147 2.147 2.146-2.147a.5.5 0 11.707.708L9.39 8l2.146 2.146a.5.5 0 01-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 01-.707-.708L7.976 8 5.829 5.854z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBackspaceReverse = /*#__PURE__*/make_icon_makeIcon('BackspaceReverse', '<path fill-rule="evenodd" d="M9.08 2H2a1 1 0 00-1 1v10a1 1 0 001 1h7.08a1 1 0 00.76-.35L14.682 8 9.839 2.35A1 1 0 009.08 2zM2 1a2 2 0 00-2 2v10a2 2 0 002 2h7.08a2 2 0 001.519-.698l4.843-5.651a1 1 0 000-1.302L10.6 1.7A2 2 0 009.08 1H2z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M9.854 5.146a.5.5 0 010 .708l-5 5a.5.5 0 01-.708-.708l5-5a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4.146 5.146a.5.5 0 000 .708l5 5a.5.5 0 00.708-.708l-5-5a.5.5 0 00-.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBackspaceReverseFill = /*#__PURE__*/make_icon_makeIcon('BackspaceReverseFill', '<path fill-rule="evenodd" d="M0 3a2 2 0 012-2h7.08a2 2 0 011.519.698l4.843 5.651a1 1 0 010 1.302L10.6 14.3a2 2 0 01-1.52.7H2a2 2 0 01-2-2V3zm9.854 2.854a.5.5 0 00-.708-.708L7 7.293 4.854 5.146a.5.5 0 10-.708.708L6.293 8l-2.147 2.146a.5.5 0 00.708.708L7 8.707l2.146 2.147a.5.5 0 00.708-.708L7.707 8l2.147-2.146z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBag = /*#__PURE__*/make_icon_makeIcon('Bag', '<path fill-rule="evenodd" d="M14 5H2v9a1 1 0 001 1h10a1 1 0 001-1V5zM1 4v10a2 2 0 002 2h10a2 2 0 002-2V4H1z" clip-rule="evenodd"/><path d="M8 1.5A2.5 2.5 0 005.5 4h-1a3.5 3.5 0 117 0h-1A2.5 2.5 0 008 1.5z"/>'); // eslint-disable-next-line

var BIconBagFill = /*#__PURE__*/make_icon_makeIcon('BagFill', '<path d="M1 4h14v10a2 2 0 01-2 2H3a2 2 0 01-2-2V4zm7-2.5A2.5 2.5 0 005.5 4h-1a3.5 3.5 0 117 0h-1A2.5 2.5 0 008 1.5z"/>'); // eslint-disable-next-line

var BIconBarChart = /*#__PURE__*/make_icon_makeIcon('BarChart', '<path fill-rule="evenodd" d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5h-2v12h2V2zm-2-1a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V2a1 1 0 00-1-1h-2zM6 7a1 1 0 011-1h2a1 1 0 011 1v7a1 1 0 01-1 1H7a1 1 0 01-1-1V7zm-5 4a1 1 0 011-1h2a1 1 0 011 1v3a1 1 0 01-1 1H2a1 1 0 01-1-1v-3z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBarChartFill = /*#__PURE__*/make_icon_makeIcon('BarChartFill', '<rect width="4" height="5" x="1" y="10" rx="1"/><rect width="4" height="9" x="6" y="6" rx="1"/><rect width="4" height="14" x="11" y="1" rx="1"/>'); // eslint-disable-next-line

var BIconBattery = /*#__PURE__*/make_icon_makeIcon('Battery', '<path fill-rule="evenodd" d="M12 5H2a1 1 0 00-1 1v4a1 1 0 001 1h10a1 1 0 001-1V6a1 1 0 00-1-1zM2 4a2 2 0 00-2 2v4a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path d="M14.5 9.5a1.5 1.5 0 000-3v3z"/>'); // eslint-disable-next-line

var BIconBatteryCharging = /*#__PURE__*/make_icon_makeIcon('BatteryCharging', '<path d="M14.5 9.5a1.5 1.5 0 000-3v3z"/><path fill-rule="evenodd" d="M9.585 2.568a.5.5 0 01.226.58L8.677 6.832h1.99a.5.5 0 01.364.843l-5.334 5.667a.5.5 0 01-.842-.49L5.99 9.167H4a.5.5 0 01-.364-.843l5.333-5.667a.5.5 0 01.616-.09z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M6.332 4H2a2 2 0 00-2 2v4a2 2 0 002 2h2.072l.307-1H2a1 1 0 01-1-1V6a1 1 0 011-1h3.391l.941-1zM4.45 6H2v4h1.313a1.5 1.5 0 01-.405-2.361L4.45 6zm.976 5l-.308 1H6.96l.21-.224h.001l.73-.776H6.53l-.085.09.028-.09H5.426zm1.354-1H5.733l.257-.833H4a.5.5 0 01-.364-.843l.793-.843L5.823 6h1.373L5.157 8.167h1.51a.5.5 0 01.478.647L6.78 10zm.69 0h1.374l1.394-1.482.793-.842a.5.5 0 00-.364-.843h-1.99L8.933 6H7.887l-.166.54-.199.646A.5.5 0 008 7.833h1.51L7.47 10zm.725-5H9.24l.308-1H7.706l-.942 1h1.374l.085-.09-.028.09zm2.4-1l-.308 1H12a1 1 0 011 1v4a1 1 0 01-1 1H9.276l-.942 1H12a2 2 0 002-2V6a2 2 0 00-2-2h-1.405zm-.378 6H12V8.02a1.499 1.499 0 01-.241.341L10.217 10zM12 6.646V6h-.646a1.5 1.5 0 01.646.646z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBatteryFull = /*#__PURE__*/make_icon_makeIcon('BatteryFull', '<path fill-rule="evenodd" d="M12 5H2a1 1 0 00-1 1v4a1 1 0 001 1h10a1 1 0 001-1V6a1 1 0 00-1-1zM2 4a2 2 0 00-2 2v4a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path d="M2 6h10v4H2V6zm12.5 3.5a1.5 1.5 0 000-3v3z"/>'); // eslint-disable-next-line

var BIconBatteryHalf = /*#__PURE__*/make_icon_makeIcon('BatteryHalf', '<path fill-rule="evenodd" d="M12 5H2a1 1 0 00-1 1v4a1 1 0 001 1h10a1 1 0 001-1V6a1 1 0 00-1-1zM2 4a2 2 0 00-2 2v4a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path d="M2 6h5v4H2V6zm12.5 3.5a1.5 1.5 0 000-3v3z"/>'); // eslint-disable-next-line

var BIconBell = /*#__PURE__*/make_icon_makeIcon('Bell', '<path d="M8 16a2 2 0 002-2H6a2 2 0 002 2z"/><path fill-rule="evenodd" d="M8 1.918l-.797.161A4.002 4.002 0 004 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 00-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 111.99 0A5.002 5.002 0 0113 6c0 .88.32 4.2 1.22 6z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBellFill = /*#__PURE__*/make_icon_makeIcon('BellFill', '<path d="M8 16a2 2 0 002-2H6a2 2 0 002 2zm.995-14.901a1 1 0 10-1.99 0A5.002 5.002 0 003 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>'); // eslint-disable-next-line

var BIconBlockquoteLeft = /*#__PURE__*/make_icon_makeIcon('BlockquoteLeft', '<path fill-rule="evenodd" d="M2 3.5a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm5 3a.5.5 0 01.5-.5h6a.5.5 0 010 1h-6a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h6a.5.5 0 010 1h-6a.5.5 0 01-.5-.5zm-5 3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z" clip-rule="evenodd"/><path d="M3.734 6.352a6.586 6.586 0 00-.445.275 1.94 1.94 0 00-.346.299 1.38 1.38 0 00-.252.369c-.058.129-.1.295-.123.498h.282c.242 0 .431.06.568.182.14.117.21.29.21.521a.697.697 0 01-.187.463c-.12.14-.289.21-.503.21-.336 0-.577-.108-.721-.327C2.072 8.619 2 8.328 2 7.969c0-.254.055-.485.164-.692.11-.21.242-.398.398-.562.16-.168.33-.31.51-.428.18-.117.33-.213.451-.287l.211.352zm2.168 0a6.588 6.588 0 00-.445.275 1.94 1.94 0 00-.346.299c-.113.12-.199.246-.257.375a1.75 1.75 0 00-.118.492h.282c.242 0 .431.06.568.182.14.117.21.29.21.521a.697.697 0 01-.187.463c-.12.14-.289.21-.504.21-.335 0-.576-.108-.72-.327-.145-.223-.217-.514-.217-.873 0-.254.055-.485.164-.692.11-.21.242-.398.398-.562.16-.168.33-.31.51-.428.18-.117.33-.213.451-.287l.211.352z"/>'); // eslint-disable-next-line

var BIconBlockquoteRight = /*#__PURE__*/make_icon_makeIcon('BlockquoteRight', '<path fill-rule="evenodd" d="M2 3.5a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h6a.5.5 0 010 1h-6a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h6a.5.5 0 010 1h-6a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z" clip-rule="evenodd"/><path d="M12.168 6.352c.184.105.332.197.445.275.114.074.229.174.346.299.11.117.193.24.252.369s.1.295.123.498h-.281c-.243 0-.432.06-.569.182-.14.117-.21.29-.21.521 0 .164.062.318.187.463.121.14.289.21.504.21.336 0 .576-.108.72-.327.145-.223.217-.514.217-.873 0-.254-.054-.485-.164-.692a2.436 2.436 0 00-.398-.562c-.16-.168-.33-.31-.51-.428-.18-.117-.33-.213-.451-.287l-.211.352zm-2.168 0c.184.105.332.197.445.275.114.074.229.174.346.299.113.12.2.246.258.375.055.125.094.289.117.492h-.281c-.242 0-.432.06-.569.182-.14.117-.21.29-.21.521 0 .164.062.318.187.463.121.14.289.21.504.21.336 0 .576-.108.72-.327.145-.223.217-.514.217-.873 0-.254-.054-.485-.164-.692a2.438 2.438 0 00-.398-.562c-.16-.168-.33-.31-.51-.428-.18-.117-.33-.213-.451-.287L10 6.352z"/>'); // eslint-disable-next-line

var BIconBook = /*#__PURE__*/make_icon_makeIcon('Book', '<path fill-rule="evenodd" d="M3.214 1.072C4.813.752 6.916.71 8.354 2.146A.5.5 0 018.5 2.5v11a.5.5 0 01-.854.354c-.843-.844-2.115-1.059-3.47-.92-1.344.14-2.66.617-3.452 1.013A.5.5 0 010 13.5v-11a.5.5 0 01.276-.447L.5 2.5l-.224-.447.002-.001.004-.002.013-.006a5.017 5.017 0 01.22-.103 12.958 12.958 0 012.7-.869zM1 2.82v9.908c.846-.343 1.944-.672 3.074-.788 1.143-.118 2.387-.023 3.426.56V2.718c-1.063-.929-2.631-.956-4.09-.664A11.958 11.958 0 001 2.82z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M12.786 1.072C11.188.752 9.084.71 7.646 2.146A.5.5 0 007.5 2.5v11a.5.5 0 00.854.354c.843-.844 2.115-1.059 3.47-.92 1.344.14 2.66.617 3.452 1.013A.5.5 0 0016 13.5v-11a.5.5 0 00-.276-.447L15.5 2.5l.224-.447-.002-.001-.004-.002-.013-.006-.047-.023a12.582 12.582 0 00-.799-.34 12.96 12.96 0 00-2.073-.609zM15 2.82v9.908c-.846-.343-1.944-.672-3.074-.788-1.143-.118-2.387-.023-3.426.56V2.718c1.063-.929 2.631-.956 4.09-.664A11.956 11.956 0 0115 2.82z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBookHalf = /*#__PURE__*/make_icon_makeIcon('BookHalf', '<path fill-rule="evenodd" d="M3.214 1.072C4.813.752 6.916.71 8.354 2.146A.5.5 0 018.5 2.5v11a.5.5 0 01-.854.354c-.843-.844-2.115-1.059-3.47-.92-1.344.14-2.66.617-3.452 1.013A.5.5 0 010 13.5v-11a.5.5 0 01.276-.447L.5 2.5l-.224-.447.002-.001.004-.002.013-.006a5.017 5.017 0 01.22-.103 12.958 12.958 0 012.7-.869zM1 2.82v9.908c.846-.343 1.944-.672 3.074-.788 1.143-.118 2.387-.023 3.426.56V2.718c-1.063-.929-2.631-.956-4.09-.664A11.958 11.958 0 001 2.82z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M12.786 1.072C11.188.752 9.084.71 7.646 2.146A.5.5 0 007.5 2.5v11a.5.5 0 00.854.354c.843-.844 2.115-1.059 3.47-.92 1.344.14 2.66.617 3.452 1.013A.5.5 0 0016 13.5v-11a.5.5 0 00-.276-.447L15.5 2.5l.224-.447-.002-.001-.004-.002-.013-.006-.047-.023a12.582 12.582 0 00-.799-.34 12.96 12.96 0 00-2.073-.609z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBookmark = /*#__PURE__*/make_icon_makeIcon('Bookmark', '<path fill-rule="evenodd" d="M8 12l5 3V3a2 2 0 00-2-2H5a2 2 0 00-2 2v12l5-3zm-4 1.234l4-2.4 4 2.4V3a1 1 0 00-1-1H5a1 1 0 00-1 1v10.234z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBookmarkCheck = /*#__PURE__*/make_icon_makeIcon('BookmarkCheck', '<path fill-rule="evenodd" d="M4.5 2a.5.5 0 00-.5.5v11.066l4-2.667 4 2.667V8.5a.5.5 0 011 0v6.934l-5-3.333-5 3.333V2.5A1.5 1.5 0 014.5 1h4a.5.5 0 010 1h-4z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M15.854 2.146a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0l-1.5-1.5a.5.5 0 01.708-.708L12.5 4.793l2.646-2.647a.5.5 0 01.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBookmarkDash = /*#__PURE__*/make_icon_makeIcon('BookmarkDash', '<path fill-rule="evenodd" d="M11 3.5a.5.5 0 01.5-.5h4a.5.5 0 010 1h-4a.5.5 0 01-.5-.5zM4.5 2a.5.5 0 00-.5.5v11.066l4-2.667 4 2.667V8.5a.5.5 0 011 0v6.934l-5-3.333-5 3.333V2.5A1.5 1.5 0 014.5 1h4a.5.5 0 010 1h-4z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBookmarkFill = /*#__PURE__*/make_icon_makeIcon('BookmarkFill', '<path fill-rule="evenodd" d="M3 3a2 2 0 012-2h6a2 2 0 012 2v12l-5-3-5 3V3z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBookmarkPlus = /*#__PURE__*/make_icon_makeIcon('BookmarkPlus', '<path fill-rule="evenodd" d="M4.5 2a.5.5 0 00-.5.5v11.066l4-2.667 4 2.667V8.5a.5.5 0 011 0v6.934l-5-3.333-5 3.333V2.5A1.5 1.5 0 014.5 1h4a.5.5 0 010 1h-4zm9-1a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-2a.5.5 0 010-1H13V1.5a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M13 3.5a.5.5 0 01.5-.5h2a.5.5 0 010 1H14v1.5a.5.5 0 01-1 0v-2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBookmarks = /*#__PURE__*/make_icon_makeIcon('Bookmarks', '<path fill-rule="evenodd" d="M7 13l5 3V4a2 2 0 00-2-2H4a2 2 0 00-2 2v12l5-3zm-4 1.234l4-2.4 4 2.4V4a1 1 0 00-1-1H4a1 1 0 00-1 1v10.234z" clip-rule="evenodd"/><path d="M14 14l-1-.6V2a1 1 0 00-1-1H4.268A2 2 0 016 0h6a2 2 0 012 2v12z"/>'); // eslint-disable-next-line

var BIconBookmarksFill = /*#__PURE__*/make_icon_makeIcon('BookmarksFill', '<path fill-rule="evenodd" d="M2 4a2 2 0 012-2h6a2 2 0 012 2v12l-5-3-5 3V4z" clip-rule="evenodd"/><path d="M14 14l-1-.6V2a1 1 0 00-1-1H4.268A2 2 0 016 0h6a2 2 0 012 2v12z"/>'); // eslint-disable-next-line

var BIconBootstrap = /*#__PURE__*/make_icon_makeIcon('Bootstrap', '<path fill-rule="evenodd" d="M12 1H4a3 3 0 00-3 3v8a3 3 0 003 3h8a3 3 0 003-3V4a3 3 0 00-3-3zM4 0a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V4a4 4 0 00-4-4H4z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8.537 12H5.062V3.545h3.399c1.587 0 2.543.809 2.543 2.11 0 .884-.65 1.675-1.483 1.816v.1c1.143.117 1.904.931 1.904 2.033 0 1.488-1.084 2.396-2.888 2.396zM6.375 4.658v2.467h1.558c1.16 0 1.764-.428 1.764-1.23 0-.78-.569-1.237-1.541-1.237H6.375zm1.898 6.229H6.375V8.162h1.822c1.236 0 1.887.463 1.887 1.348 0 .896-.627 1.377-1.811 1.377z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBootstrapFill = /*#__PURE__*/make_icon_makeIcon('BootstrapFill', '<path fill-rule="evenodd" d="M4.002 0a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V4a4 4 0 00-4-4h-8zm1.06 12h3.475c1.804 0 2.888-.908 2.888-2.396 0-1.102-.761-1.916-1.904-2.034v-.1c.832-.14 1.482-.93 1.482-1.816 0-1.3-.955-2.11-2.542-2.11H5.062V12zm1.313-4.875V4.658h1.78c.973 0 1.542.457 1.542 1.237 0 .802-.604 1.23-1.764 1.23H6.375zm0 3.762h1.898c1.184 0 1.81-.48 1.81-1.377 0-.885-.65-1.348-1.886-1.348H6.375v2.725z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBootstrapReboot = /*#__PURE__*/make_icon_makeIcon('BootstrapReboot', '<path fill-rule="evenodd" d="M1.161 8a6.84 6.84 0 106.842-6.84.58.58 0 010-1.16 8 8 0 11-6.556 3.412l-.663-.577a.58.58 0 01.227-.997l2.52-.69a.58.58 0 01.728.633l-.332 2.592a.58.58 0 01-.956.364l-.643-.56A6.812 6.812 0 001.16 8zm5.48-.079V5.277h1.57c.881 0 1.416.499 1.416 1.32 0 .84-.504 1.324-1.386 1.324h-1.6zm0 3.75V8.843h1.57l1.498 2.828h1.314L9.377 8.665c.897-.3 1.427-1.106 1.427-2.1 0-1.37-.943-2.246-2.456-2.246H5.5v7.352h1.141z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBoundingBox = /*#__PURE__*/make_icon_makeIcon('BoundingBox', '<path fill-rule="evenodd" d="M5 2V0H0v5h2v6H0v5h5v-2h6v2h5v-5h-2V5h2V0h-5v2H5zm6 1H5v2H3v6h2v2h6v-2h2V5h-2V3zm1-2v3h3V1h-3zm3 11h-3v3h3v-3zM4 15v-3H1v3h3zM1 4h3V1H1v3z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBoundingBoxCircles = /*#__PURE__*/make_icon_makeIcon('BoundingBoxCircles', '<path fill-rule="evenodd" d="M12.5 2h-9V1h9v1zm-10 1.5v9h-1v-9h1zm11 9v-9h1v9h-1zM3.5 14h9v1h-9v-1z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M14 3a1 1 0 100-2 1 1 0 000 2zm0 1a2 2 0 100-4 2 2 0 000 4zm0 11a1 1 0 100-2 1 1 0 000 2zm0 1a2 2 0 100-4 2 2 0 000 4zM2 3a1 1 0 100-2 1 1 0 000 2zm0 1a2 2 0 100-4 2 2 0 000 4zm0 11a1 1 0 100-2 1 1 0 000 2zm0 1a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBoxArrowDown = /*#__PURE__*/make_icon_makeIcon('BoxArrowDown', '<path fill-rule="evenodd" d="M4.646 11.646a.5.5 0 01.708 0L8 14.293l2.646-2.647a.5.5 0 01.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 010-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 4.5a.5.5 0 01.5.5v9a.5.5 0 01-1 0V5a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M2.5 2A1.5 1.5 0 014 .5h8A1.5 1.5 0 0113.5 2v7a1.5 1.5 0 01-1.5 1.5h-1.5a.5.5 0 010-1H12a.5.5 0 00.5-.5V2a.5.5 0 00-.5-.5H4a.5.5 0 00-.5.5v7a.5.5 0 00.5.5h1.5a.5.5 0 010 1H4A1.5 1.5 0 012.5 9V2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBoxArrowDownLeft = /*#__PURE__*/make_icon_makeIcon('BoxArrowDownLeft', '<path fill-rule="evenodd" d="M13 1.5A1.5 1.5 0 0114.5 3v8a1.5 1.5 0 01-1.5 1.5H9a.5.5 0 010-1h4a.5.5 0 00.5-.5V3a.5.5 0 00-.5-.5H5a.5.5 0 00-.5.5v4a.5.5 0 01-1 0V3A1.5 1.5 0 015 1.5h8zm-11 7a.5.5 0 00-.5.5v5a.5.5 0 00.5.5h5a.5.5 0 000-1H2.5V9a.5.5 0 00-.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M1.646 14.354a.5.5 0 00.708 0l8-8a.5.5 0 00-.708-.708l-8 8a.5.5 0 000 .708z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBoxArrowDownRight = /*#__PURE__*/make_icon_makeIcon('BoxArrowDownRight', '<path fill-rule="evenodd" d="M3 1.5A1.5 1.5 0 001.5 3v8A1.5 1.5 0 003 12.5h4a.5.5 0 000-1H3a.5.5 0 01-.5-.5V3a.5.5 0 01.5-.5h8a.5.5 0 01.5.5v4a.5.5 0 001 0V3A1.5 1.5 0 0011 1.5H3zm11 7a.5.5 0 01.5.5v5a.5.5 0 01-.5.5H9a.5.5 0 010-1h4.5V9a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M14.354 14.354a.5.5 0 01-.708 0l-8-8a.5.5 0 11.708-.708l8 8a.5.5 0 010 .708z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBoxArrowInDown = /*#__PURE__*/make_icon_makeIcon('BoxArrowInDown', '<path fill-rule="evenodd" d="M4.646 8.146a.5.5 0 01.708 0L8 10.793l2.646-2.647a.5.5 0 01.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 010-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 1a.5.5 0 01.5.5v9a.5.5 0 01-1 0v-9A.5.5 0 018 1z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M1.5 13.5A1.5 1.5 0 003 15h10a1.5 1.5 0 001.5-1.5v-8A1.5 1.5 0 0013 4h-1.5a.5.5 0 000 1H13a.5.5 0 01.5.5v8a.5.5 0 01-.5.5H3a.5.5 0 01-.5-.5v-8A.5.5 0 013 5h1.5a.5.5 0 000-1H3a1.5 1.5 0 00-1.5 1.5v8z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBoxArrowInDownLeft = /*#__PURE__*/make_icon_makeIcon('BoxArrowInDownLeft', '<path fill-rule="evenodd" d="M1.5 13A1.5 1.5 0 003 14.5h10a1.5 1.5 0 001.5-1.5V8a.5.5 0 00-1 0v5a.5.5 0 01-.5.5H3a.5.5 0 01-.5-.5V3a.5.5 0 01.5-.5h4a.5.5 0 000-1H3A1.5 1.5 0 001.5 3v10z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M11.5 10a.5.5 0 01-.5.5H6a.5.5 0 01-.5-.5V5a.5.5 0 011 0v4.5H11a.5.5 0 01.5.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5.646 10.354a.5.5 0 010-.708l8-8a.5.5 0 01.708.708l-8 8a.5.5 0 01-.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBoxArrowInDownRight = /*#__PURE__*/make_icon_makeIcon('BoxArrowInDownRight', '<path fill-rule="evenodd" d="M14.5 13a1.5 1.5 0 01-1.5 1.5H3A1.5 1.5 0 011.5 13V8a.5.5 0 011 0v5a.5.5 0 00.5.5h10a.5.5 0 00.5-.5V3a.5.5 0 00-.5-.5H9a.5.5 0 010-1h4A1.5 1.5 0 0114.5 3v10z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4.5 10a.5.5 0 00.5.5h5a.5.5 0 00.5-.5V5a.5.5 0 00-1 0v4.5H5a.5.5 0 00-.5.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10.354 10.354a.5.5 0 000-.708l-8-8a.5.5 0 10-.708.708l8 8a.5.5 0 00.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBoxArrowInLeft = /*#__PURE__*/make_icon_makeIcon('BoxArrowInLeft', '<path fill-rule="evenodd" d="M7.854 11.354a.5.5 0 000-.708L5.207 8l2.647-2.646a.5.5 0 10-.708-.708l-3 3a.5.5 0 000 .708l3 3a.5.5 0 00.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M15 8a.5.5 0 00-.5-.5h-9a.5.5 0 000 1h9A.5.5 0 0015 8z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M2.5 14.5A1.5 1.5 0 011 13V3a1.5 1.5 0 011.5-1.5h8A1.5 1.5 0 0112 3v1.5a.5.5 0 01-1 0V3a.5.5 0 00-.5-.5h-8A.5.5 0 002 3v10a.5.5 0 00.5.5h8a.5.5 0 00.5-.5v-1.5a.5.5 0 011 0V13a1.5 1.5 0 01-1.5 1.5h-8z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBoxArrowInRight = /*#__PURE__*/make_icon_makeIcon('BoxArrowInRight', '<path fill-rule="evenodd" d="M8.146 11.354a.5.5 0 010-.708L10.793 8 8.146 5.354a.5.5 0 11.708-.708l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M1 8a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9A.5.5 0 011 8z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M13.5 14.5A1.5 1.5 0 0015 13V3a1.5 1.5 0 00-1.5-1.5h-8A1.5 1.5 0 004 3v1.5a.5.5 0 001 0V3a.5.5 0 01.5-.5h8a.5.5 0 01.5.5v10a.5.5 0 01-.5.5h-8A.5.5 0 015 13v-1.5a.5.5 0 00-1 0V13a1.5 1.5 0 001.5 1.5h8z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBoxArrowInUp = /*#__PURE__*/make_icon_makeIcon('BoxArrowInUp', '<path fill-rule="evenodd" d="M4.646 7.854a.5.5 0 00.708 0L8 5.207l2.646 2.647a.5.5 0 00.708-.708l-3-3a.5.5 0 00-.708 0l-3 3a.5.5 0 000 .708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 15a.5.5 0 00.5-.5v-9a.5.5 0 00-1 0v9a.5.5 0 00.5.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M1.5 2.5A1.5 1.5 0 013 1h10a1.5 1.5 0 011.5 1.5v8A1.5 1.5 0 0113 12h-1.5a.5.5 0 010-1H13a.5.5 0 00.5-.5v-8A.5.5 0 0013 2H3a.5.5 0 00-.5.5v8a.5.5 0 00.5.5h1.5a.5.5 0 010 1H3a1.5 1.5 0 01-1.5-1.5v-8z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBoxArrowInUpLeft = /*#__PURE__*/make_icon_makeIcon('BoxArrowInUpLeft', '<path fill-rule="evenodd" d="M1.5 3A1.5 1.5 0 013 1.5h10A1.5 1.5 0 0114.5 3v5a.5.5 0 01-1 0V3a.5.5 0 00-.5-.5H3a.5.5 0 00-.5.5v10a.5.5 0 00.5.5h4a.5.5 0 010 1H3A1.5 1.5 0 011.5 13V3z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M11.5 6a.5.5 0 00-.5-.5H6a.5.5 0 00-.5.5v5a.5.5 0 001 0V6.5H11a.5.5 0 00.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5.646 5.646a.5.5 0 000 .708l8 8a.5.5 0 00.708-.708l-8-8a.5.5 0 00-.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBoxArrowInUpRight = /*#__PURE__*/make_icon_makeIcon('BoxArrowInUpRight', '<path fill-rule="evenodd" d="M14.5 3A1.5 1.5 0 0013 1.5H3A1.5 1.5 0 001.5 3v5a.5.5 0 001 0V3a.5.5 0 01.5-.5h10a.5.5 0 01.5.5v10a.5.5 0 01-.5.5H9a.5.5 0 000 1h4a1.5 1.5 0 001.5-1.5V3z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4.5 6a.5.5 0 01.5-.5h5a.5.5 0 01.5.5v5a.5.5 0 01-1 0V6.5H5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10.354 5.646a.5.5 0 010 .708l-8 8a.5.5 0 01-.708-.708l8-8a.5.5 0 01.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBoxArrowLeft = /*#__PURE__*/make_icon_makeIcon('BoxArrowLeft', '<path fill-rule="evenodd" d="M4.354 11.354a.5.5 0 000-.708L1.707 8l2.647-2.646a.5.5 0 10-.708-.708l-3 3a.5.5 0 000 .708l3 3a.5.5 0 00.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M11.5 8a.5.5 0 00-.5-.5H2a.5.5 0 000 1h9a.5.5 0 00.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M14 13.5a1.5 1.5 0 001.5-1.5V4A1.5 1.5 0 0014 2.5H7A1.5 1.5 0 005.5 4v1.5a.5.5 0 001 0V4a.5.5 0 01.5-.5h7a.5.5 0 01.5.5v8a.5.5 0 01-.5.5H7a.5.5 0 01-.5-.5v-1.5a.5.5 0 00-1 0V12A1.5 1.5 0 007 13.5h7z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBoxArrowRight = /*#__PURE__*/make_icon_makeIcon('BoxArrowRight', '<path fill-rule="evenodd" d="M11.646 11.354a.5.5 0 010-.708L14.293 8l-2.647-2.646a.5.5 0 01.708-.708l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4.5 8a.5.5 0 01.5-.5h9a.5.5 0 010 1H5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M2 13.5A1.5 1.5 0 01.5 12V4A1.5 1.5 0 012 2.5h7A1.5 1.5 0 0110.5 4v1.5a.5.5 0 01-1 0V4a.5.5 0 00-.5-.5H2a.5.5 0 00-.5.5v8a.5.5 0 00.5.5h7a.5.5 0 00.5-.5v-1.5a.5.5 0 011 0V12A1.5 1.5 0 019 13.5H2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBoxArrowUp = /*#__PURE__*/make_icon_makeIcon('BoxArrowUp', '<path fill-rule="evenodd" d="M4.646 4.354a.5.5 0 00.708 0L8 1.707l2.646 2.647a.5.5 0 00.708-.708l-3-3a.5.5 0 00-.708 0l-3 3a.5.5 0 000 .708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 11.5a.5.5 0 00.5-.5V2a.5.5 0 00-1 0v9a.5.5 0 00.5.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M2.5 14A1.5 1.5 0 004 15.5h8a1.5 1.5 0 001.5-1.5V7A1.5 1.5 0 0012 5.5h-1.5a.5.5 0 000 1H12a.5.5 0 01.5.5v7a.5.5 0 01-.5.5H4a.5.5 0 01-.5-.5V7a.5.5 0 01.5-.5h1.5a.5.5 0 000-1H4A1.5 1.5 0 002.5 7v7z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBoxArrowUpLeft = /*#__PURE__*/make_icon_makeIcon('BoxArrowUpLeft', '<path fill-rule="evenodd" d="M14.5 13a1.5 1.5 0 01-1.5 1.5H5A1.5 1.5 0 013.5 13V9a.5.5 0 011 0v4a.5.5 0 00.5.5h8a.5.5 0 00.5-.5V5a.5.5 0 00-.5-.5H9a.5.5 0 010-1h4A1.5 1.5 0 0114.5 5v8zm-7-11a.5.5 0 00-.5-.5H2a.5.5 0 00-.5.5v5a.5.5 0 001 0V2.5H7a.5.5 0 00.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M1.646 1.646a.5.5 0 000 .708l8 8a.5.5 0 00.708-.708l-8-8a.5.5 0 00-.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBoxArrowUpRight = /*#__PURE__*/make_icon_makeIcon('BoxArrowUpRight', '<path fill-rule="evenodd" d="M1.5 13A1.5 1.5 0 003 14.5h8a1.5 1.5 0 001.5-1.5V9a.5.5 0 00-1 0v4a.5.5 0 01-.5.5H3a.5.5 0 01-.5-.5V5a.5.5 0 01.5-.5h4a.5.5 0 000-1H3A1.5 1.5 0 001.5 5v8zm7-11a.5.5 0 01.5-.5h5a.5.5 0 01.5.5v5a.5.5 0 01-1 0V2.5H9a.5.5 0 01-.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M14.354 1.646a.5.5 0 010 .708l-8 8a.5.5 0 01-.708-.708l8-8a.5.5 0 01.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBraces = /*#__PURE__*/make_icon_makeIcon('Braces', '<path d="M2.114 8.063V7.9c1.005-.102 1.497-.615 1.497-1.6V4.503c0-1.094.39-1.538 1.354-1.538h.273V2h-.376C3.25 2 2.49 2.759 2.49 4.352v1.524c0 1.094-.376 1.456-1.49 1.456v1.299c1.114 0 1.49.362 1.49 1.456v1.524c0 1.593.759 2.352 2.372 2.352h.376v-.964h-.273c-.964 0-1.354-.444-1.354-1.538V9.663c0-.984-.492-1.497-1.497-1.6zM13.886 7.9v.163c-1.005.103-1.497.616-1.497 1.6v1.798c0 1.094-.39 1.538-1.354 1.538h-.273v.964h.376c1.613 0 2.372-.759 2.372-2.352v-1.524c0-1.094.376-1.456 1.49-1.456V7.332c-1.114 0-1.49-.362-1.49-1.456V4.352C13.51 2.759 12.75 2 11.138 2h-.376v.964h.273c.964 0 1.354.444 1.354 1.538V6.3c0 .984.492 1.497 1.497 1.6z"/>'); // eslint-disable-next-line

var BIconBriefcase = /*#__PURE__*/make_icon_makeIcon('Briefcase', '<path fill-rule="evenodd" d="M0 12.5A1.5 1.5 0 001.5 14h13a1.5 1.5 0 001.5-1.5v-6h-1v6a.5.5 0 01-.5.5h-13a.5.5 0 01-.5-.5v-6H0v6z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M0 4.5A1.5 1.5 0 011.5 3h13A1.5 1.5 0 0116 4.5v2.384l-7.614 2.03a1.5 1.5 0 01-.772 0L0 6.884V4.5zM1.5 4a.5.5 0 00-.5.5v1.616l6.871 1.832a.5.5 0 00.258 0L15 6.116V4.5a.5.5 0 00-.5-.5h-13zM5 2.5A1.5 1.5 0 016.5 1h3A1.5 1.5 0 0111 2.5V3h-1v-.5a.5.5 0 00-.5-.5h-3a.5.5 0 00-.5.5V3H5v-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBriefcaseFill = /*#__PURE__*/make_icon_makeIcon('BriefcaseFill', '<path fill-rule="evenodd" d="M0 12.5A1.5 1.5 0 001.5 14h13a1.5 1.5 0 001.5-1.5V6.85L8.129 8.947a.5.5 0 01-.258 0L0 6.85v5.65z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M0 4.5A1.5 1.5 0 011.5 3h13A1.5 1.5 0 0116 4.5v1.384l-7.614 2.03a1.5 1.5 0 01-.772 0L0 5.884V4.5zm5-2A1.5 1.5 0 016.5 1h3A1.5 1.5 0 0111 2.5V3h-1v-.5a.5.5 0 00-.5-.5h-3a.5.5 0 00-.5.5V3H5v-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBrightnessAltHigh = /*#__PURE__*/make_icon_makeIcon('BrightnessAltHigh', '<path fill-rule="evenodd" d="M5.041 10.5h5.918a3 3 0 00-5.918 0zM4 11a4 4 0 118 0 .5.5 0 01-.5.5h-7A.5.5 0 014 11zm4-8a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2A.5.5 0 018 3zm8 8a.5.5 0 01-.5.5h-2a.5.5 0 010-1h2a.5.5 0 01.5.5zM3 11a.5.5 0 01-.5.5h-2a.5.5 0 010-1h2a.5.5 0 01.5.5zm10.657-5.657a.5.5 0 010 .707l-1.414 1.414a.5.5 0 11-.707-.707l1.414-1.414a.5.5 0 01.707 0zM4.464 7.464a.5.5 0 01-.707 0L2.343 6.05a.5.5 0 01.707-.707l1.414 1.414a.5.5 0 010 .707z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBrightnessAltHighFill = /*#__PURE__*/make_icon_makeIcon('BrightnessAltHighFill', '<path fill-rule="evenodd" d="M4 11a4 4 0 118 0 .5.5 0 01-.5.5h-7A.5.5 0 014 11zm4-8a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2A.5.5 0 018 3zm8 8a.5.5 0 01-.5.5h-2a.5.5 0 010-1h2a.5.5 0 01.5.5zM3 11a.5.5 0 01-.5.5h-2a.5.5 0 010-1h2a.5.5 0 01.5.5zm10.657-5.657a.5.5 0 010 .707l-1.414 1.414a.5.5 0 11-.707-.707l1.414-1.414a.5.5 0 01.707 0zM4.464 7.464a.5.5 0 01-.707 0L2.343 6.05a.5.5 0 01.707-.707l1.414 1.414a.5.5 0 010 .707z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBrightnessAltLow = /*#__PURE__*/make_icon_makeIcon('BrightnessAltLow', '<path d="M8.5 5.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 6a.5.5 0 110-1 .5.5 0 010 1zm-11 0a.5.5 0 110-1 .5.5 0 010 1zm9.743-4.036a.5.5 0 11-.707-.707.5.5 0 01.707.707zm-8.486 0a.5.5 0 11.707-.707.5.5 0 01-.707.707z"/><path fill-rule="evenodd" d="M5.041 10.5h5.918a3 3 0 00-5.918 0zM4 11a4 4 0 118 0 .5.5 0 01-.5.5h-7A.5.5 0 014 11z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBrightnessAltLowFill = /*#__PURE__*/make_icon_makeIcon('BrightnessAltLowFill', '<path d="M8.5 5.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 6a.5.5 0 110-1 .5.5 0 010 1zm-11 0a.5.5 0 110-1 .5.5 0 010 1zm9.743-4.036a.5.5 0 11-.707-.707.5.5 0 01.707.707zm-8.486 0a.5.5 0 11.707-.707.5.5 0 01-.707.707z"/><path fill-rule="evenodd" d="M4 11a4 4 0 118 0 .5.5 0 01-.5.5h-7A.5.5 0 014 11z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBrightnessHigh = /*#__PURE__*/make_icon_makeIcon('BrightnessHigh', '<path fill-rule="evenodd" d="M8 11a3 3 0 100-6 3 3 0 000 6zm0 1a4 4 0 100-8 4 4 0 000 8zM8 0a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2A.5.5 0 018 0zm0 13a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2A.5.5 0 018 13zm8-5a.5.5 0 01-.5.5h-2a.5.5 0 010-1h2a.5.5 0 01.5.5zM3 8a.5.5 0 01-.5.5h-2a.5.5 0 010-1h2A.5.5 0 013 8zm10.657-5.657a.5.5 0 010 .707l-1.414 1.415a.5.5 0 11-.707-.708l1.414-1.414a.5.5 0 01.707 0zm-9.193 9.193a.5.5 0 010 .707L3.05 13.657a.5.5 0 01-.707-.707l1.414-1.414a.5.5 0 01.707 0zm9.193 2.121a.5.5 0 01-.707 0l-1.414-1.414a.5.5 0 01.707-.707l1.414 1.414a.5.5 0 010 .707zM4.464 4.465a.5.5 0 01-.707 0L2.343 3.05a.5.5 0 11.707-.707l1.414 1.414a.5.5 0 010 .708z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBrightnessHighFill = /*#__PURE__*/make_icon_makeIcon('BrightnessHighFill', '<circle cx="8" cy="8" r="4"/><path fill-rule="evenodd" d="M8 0a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2A.5.5 0 018 0zm0 13a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2A.5.5 0 018 13zm8-5a.5.5 0 01-.5.5h-2a.5.5 0 010-1h2a.5.5 0 01.5.5zM3 8a.5.5 0 01-.5.5h-2a.5.5 0 010-1h2A.5.5 0 013 8zm10.657-5.657a.5.5 0 010 .707l-1.414 1.415a.5.5 0 11-.707-.708l1.414-1.414a.5.5 0 01.707 0zm-9.193 9.193a.5.5 0 010 .707L3.05 13.657a.5.5 0 01-.707-.707l1.414-1.414a.5.5 0 01.707 0zm9.193 2.121a.5.5 0 01-.707 0l-1.414-1.414a.5.5 0 01.707-.707l1.414 1.414a.5.5 0 010 .707zM4.464 4.465a.5.5 0 01-.707 0L2.343 3.05a.5.5 0 01.707-.707l1.414 1.414a.5.5 0 010 .708z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBrightnessLow = /*#__PURE__*/make_icon_makeIcon('BrightnessLow', '<path fill-rule="evenodd" d="M8 11a3 3 0 100-6 3 3 0 000 6zm0 1a4 4 0 100-8 4 4 0 000 8z" clip-rule="evenodd"/><circle cx="8" cy="2.5" r=".5"/><circle cx="8" cy="13.5" r=".5"/><circle cx="13.5" cy="8" r=".5" transform="rotate(90 13.5 8)"/><circle cx="2.5" cy="8" r=".5" transform="rotate(90 2.5 8)"/><circle cx="11.889" cy="4.111" r=".5" transform="rotate(45 11.89 4.11)"/><circle cx="4.111" cy="11.889" r=".5" transform="rotate(45 4.11 11.89)"/><circle cx="11.889" cy="11.889" r=".5" transform="rotate(135 11.89 11.889)"/><circle cx="4.111" cy="4.111" r=".5" transform="rotate(135 4.11 4.11)"/>'); // eslint-disable-next-line

var BIconBrightnessLowFill = /*#__PURE__*/make_icon_makeIcon('BrightnessLowFill', '<circle cx="8" cy="8" r="4"/><circle cx="8" cy="2.5" r=".5"/><circle cx="8" cy="13.5" r=".5"/><circle cx="13.5" cy="8" r=".5" transform="rotate(90 13.5 8)"/><circle cx="2.5" cy="8" r=".5" transform="rotate(90 2.5 8)"/><circle cx="11.889" cy="4.111" r=".5" transform="rotate(45 11.89 4.11)"/><circle cx="4.111" cy="11.889" r=".5" transform="rotate(45 4.11 11.89)"/><circle cx="11.889" cy="11.889" r=".5" transform="rotate(135 11.89 11.889)"/><circle cx="4.111" cy="4.111" r=".5" transform="rotate(135 4.11 4.11)"/>'); // eslint-disable-next-line

var BIconBrush = /*#__PURE__*/make_icon_makeIcon('Brush', '<path d="M15.213 1.018a.572.572 0 01.756.05.57.57 0 01.057.746C15.085 3.082 12.044 7.107 9.6 9.55c-.71.71-1.42 1.243-1.952 1.596-.508.339-1.167.234-1.599-.197-.416-.416-.53-1.047-.212-1.543.346-.542.887-1.273 1.642-1.977 2.521-2.35 6.476-5.44 7.734-6.411z"/><path d="M7 12a2 2 0 01-2 2c-1 0-2 0-3.5-.5s.5-1 1-1.5 1.395-2 2.5-2a2 2 0 012 2z"/>'); // eslint-disable-next-line

var BIconBucket = /*#__PURE__*/make_icon_makeIcon('Bucket', '<path fill-rule="evenodd" d="M8 1.5A4.5 4.5 0 003.5 6h-1a5.5 5.5 0 1111 0h-1A4.5 4.5 0 008 1.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M1.61 5.687A.5.5 0 012 5.5h12a.5.5 0 01.488.608l-1.826 8.217a1.5 1.5 0 01-1.464 1.175H4.802a1.5 1.5 0 01-1.464-1.175L1.512 6.108a.5.5 0 01.098-.42zm1.013.813l1.691 7.608a.5.5 0 00.488.392h6.396a.5.5 0 00.488-.392l1.69-7.608H2.624z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBucketFill = /*#__PURE__*/make_icon_makeIcon('BucketFill', '<path fill-rule="evenodd" d="M8 1.5A4.5 4.5 0 003.5 6h-1a5.5 5.5 0 1111 0h-1A4.5 4.5 0 008 1.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M1.61 5.687A.5.5 0 012 5.5h12a.5.5 0 01.488.608l-1.826 8.217a1.5 1.5 0 01-1.464 1.175H4.802a1.5 1.5 0 01-1.464-1.175L1.512 6.108a.5.5 0 01.098-.42z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconBuilding = /*#__PURE__*/make_icon_makeIcon('Building', '<path fill-rule="evenodd" d="M15.285.089A.5.5 0 0115.5.5v15a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5V14h-1v1.5a.5.5 0 01-.5.5H1a.5.5 0 01-.5-.5v-6a.5.5 0 01.418-.493l5.582-.93V3.5a.5.5 0 01.324-.468l8-3a.5.5 0 01.46.057zM7.5 3.846V8.5a.5.5 0 01-.418.493l-5.582.93V15h8v-1.5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5V15h2V1.222l-7 2.624z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M6.5 15.5v-7h1v7h-1z" clip-rule="evenodd"/><path d="M2.5 11h1v1h-1v-1zm2 0h1v1h-1v-1zm-2 2h1v1h-1v-1zm2 0h1v1h-1v-1zm6-10h1v1h-1V3zm2 0h1v1h-1V3zm-4 2h1v1h-1V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm-2 2h1v1h-1V7zm2 0h1v1h-1V7zm-4 0h1v1h-1V7zm0 2h1v1h-1V9zm2 0h1v1h-1V9zm2 0h1v1h-1V9zm-4 2h1v1h-1v-1zm2 0h1v1h-1v-1zm2 0h1v1h-1v-1z"/>'); // eslint-disable-next-line

var BIconBullseye = /*#__PURE__*/make_icon_makeIcon('Bullseye', '<path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 13A5 5 0 108 3a5 5 0 000 10zm0 1A6 6 0 108 2a6 6 0 000 12z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 11a3 3 0 100-6 3 3 0 000 6zm0 1a4 4 0 100-8 4 4 0 000 8z" clip-rule="evenodd"/><path d="M9.5 8a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>'); // eslint-disable-next-line

var BIconCalendar = /*#__PURE__*/make_icon_makeIcon('Calendar', '<path fill-rule="evenodd" d="M14 0H2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M6.5 7a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm-9 3a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm-9 3a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconCalendarFill = /*#__PURE__*/make_icon_makeIcon('CalendarFill', '<path d="M0 2a2 2 0 012-2h12a2 2 0 012 2H0z"/><path fill-rule="evenodd" d="M0 3h16v11a2 2 0 01-2 2H2a2 2 0 01-2-2V3zm6.5 4a1 1 0 100-2 1 1 0 000 2zm4-1a1 1 0 11-2 0 1 1 0 012 0zm2 1a1 1 0 100-2 1 1 0 000 2zm-8 2a1 1 0 11-2 0 1 1 0 012 0zm2 1a1 1 0 100-2 1 1 0 000 2zm4-1a1 1 0 11-2 0 1 1 0 012 0zm2 1a1 1 0 100-2 1 1 0 000 2zm-8 2a1 1 0 11-2 0 1 1 0 012 0zm2 1a1 1 0 100-2 1 1 0 000 2zm4-1a1 1 0 11-2 0 1 1 0 012 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconCamera = /*#__PURE__*/make_icon_makeIcon('Camera', '<path d="M9 5C7.343 5 5 6.343 5 8a4 4 0 014-4v1z"/><path fill-rule="evenodd" d="M14.333 3h-2.015A5.97 5.97 0 009 2a5.972 5.972 0 00-3.318 1H1.667C.747 3 0 3.746 0 4.667v6.666C0 12.253.746 13 1.667 13h4.015c.95.632 2.091 1 3.318 1a5.973 5.973 0 003.318-1h2.015c.92 0 1.667-.746 1.667-1.667V4.667C16 3.747 15.254 3 14.333 3zM1.5 5a.5.5 0 100-1 .5.5 0 000 1zM9 13A5 5 0 109 3a5 5 0 000 10z" clip-rule="evenodd"/><path d="M2 3a1 1 0 011-1h1a1 1 0 010 2H3a1 1 0 01-1-1z"/>'); // eslint-disable-next-line

var BIconCameraVideo = /*#__PURE__*/make_icon_makeIcon('CameraVideo', '<path fill-rule="evenodd" d="M2.667 3.5c-.645 0-1.167.522-1.167 1.167v6.666c0 .645.522 1.167 1.167 1.167h6.666c.645 0 1.167-.522 1.167-1.167V4.667c0-.645-.522-1.167-1.167-1.167H2.667zM.5 4.667C.5 3.47 1.47 2.5 2.667 2.5h6.666c1.197 0 2.167.97 2.167 2.167v6.666c0 1.197-.97 2.167-2.167 2.167H2.667A2.167 2.167 0 01.5 11.333V4.667z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M11.25 5.65l2.768-1.605a.318.318 0 01.482.263v7.384c0 .228-.26.393-.482.264l-2.767-1.605-.502.865 2.767 1.605c.859.498 1.984-.095 1.984-1.129V4.308c0-1.033-1.125-1.626-1.984-1.128L10.75 4.785l.502.865z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconCameraVideoFill = /*#__PURE__*/make_icon_makeIcon('CameraVideoFill', '<path d="M2.667 3h6.666C10.253 3 11 3.746 11 4.667v6.666c0 .92-.746 1.667-1.667 1.667H2.667C1.747 13 1 12.254 1 11.333V4.667C1 3.747 1.746 3 2.667 3z"/><path d="M7.404 8.697l6.363 3.692c.54.313 1.233-.066 1.233-.697V4.308c0-.63-.693-1.01-1.233-.696L7.404 7.304a.802.802 0 000 1.393z"/>'); // eslint-disable-next-line

var BIconCapslock = /*#__PURE__*/make_icon_makeIcon('Capslock', '<path fill-rule="evenodd" d="M7.27 1.047a1 1 0 011.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v1a1 1 0 01-1 1h-5a1 1 0 01-1-1v-1H1.654C.78 9.5.326 8.455.924 7.816L7.27 1.047zM14.346 8.5L8 1.731 1.654 8.5H4.5a1 1 0 011 1v1h5v-1a1 1 0 011-1h2.846zm-9.846 5a1 1 0 011-1h5a1 1 0 011 1v1a1 1 0 01-1 1h-5a1 1 0 01-1-1v-1zm6 0h-5v1h5v-1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconCapslockFill = /*#__PURE__*/make_icon_makeIcon('CapslockFill', '<path fill-rule="evenodd" d="M7.27 1.047a1 1 0 011.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v1a1 1 0 01-1 1h-5a1 1 0 01-1-1v-1H1.654C.78 9.5.326 8.455.924 7.816L7.27 1.047zM4.5 13.5a1 1 0 011-1h5a1 1 0 011 1v1a1 1 0 01-1 1h-5a1 1 0 01-1-1v-1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconCardChecklist = /*#__PURE__*/make_icon_makeIcon('CardChecklist', '<path fill-rule="evenodd" d="M14.5 3h-13a.5.5 0 00-.5.5v9a.5.5 0 00.5.5h13a.5.5 0 00.5-.5v-9a.5.5 0 00-.5-.5zm-13-1A1.5 1.5 0 000 3.5v9A1.5 1.5 0 001.5 14h13a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0014.5 2h-13z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7 5.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm-1.496-.854a.5.5 0 010 .708l-1.5 1.5a.5.5 0 01-.708 0l-.5-.5a.5.5 0 11.708-.708l.146.147 1.146-1.147a.5.5 0 01.708 0zM7 9.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm-1.496-.854a.5.5 0 010 .708l-1.5 1.5a.5.5 0 01-.708 0l-.5-.5a.5.5 0 01.708-.708l.146.147 1.146-1.147a.5.5 0 01.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconCardHeading = /*#__PURE__*/make_icon_makeIcon('CardHeading', '<path fill-rule="evenodd" d="M14.5 3h-13a.5.5 0 00-.5.5v9a.5.5 0 00.5.5h13a.5.5 0 00.5-.5v-9a.5.5 0 00-.5-.5zm-13-1A1.5 1.5 0 000 3.5v9A1.5 1.5 0 001.5 14h13a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0014.5 2h-13z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M3 8.5a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm0 2a.5.5 0 01.5-.5h6a.5.5 0 010 1h-6a.5.5 0 01-.5-.5z" clip-rule="evenodd"/><path d="M3 5.5a.5.5 0 01.5-.5h9a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-9a.5.5 0 01-.5-.5v-1z"/>'); // eslint-disable-next-line

var BIconCardImage = /*#__PURE__*/make_icon_makeIcon('CardImage', '<path fill-rule="evenodd" d="M14.5 3h-13a.5.5 0 00-.5.5v9a.5.5 0 00.5.5h13a.5.5 0 00.5-.5v-9a.5.5 0 00-.5-.5zm-13-1A1.5 1.5 0 000 3.5v9A1.5 1.5 0 001.5 14h13a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0014.5 2h-13z" clip-rule="evenodd"/><path d="M10.648 7.646a.5.5 0 01.577-.093L15.002 9.5V13h-14v-1l2.646-2.354a.5.5 0 01.63-.062l2.66 1.773 3.71-3.71z"/><path fill-rule="evenodd" d="M4.502 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconCardList = /*#__PURE__*/make_icon_makeIcon('CardList', '<path fill-rule="evenodd" d="M14.5 3h-13a.5.5 0 00-.5.5v9a.5.5 0 00.5.5h13a.5.5 0 00.5-.5v-9a.5.5 0 00-.5-.5zm-13-1A1.5 1.5 0 000 3.5v9A1.5 1.5 0 001.5 14h13a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0014.5 2h-13z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5 8a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7A.5.5 0 015 8zm0-2.5a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm0 5a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5z" clip-rule="evenodd"/><circle cx="3.5" cy="5.5" r=".5"/><circle cx="3.5" cy="8" r=".5"/><circle cx="3.5" cy="10.5" r=".5"/>'); // eslint-disable-next-line

var BIconCardText = /*#__PURE__*/make_icon_makeIcon('CardText', '<path fill-rule="evenodd" d="M14.5 3h-13a.5.5 0 00-.5.5v9a.5.5 0 00.5.5h13a.5.5 0 00.5-.5v-9a.5.5 0 00-.5-.5zm-13-1A1.5 1.5 0 000 3.5v9A1.5 1.5 0 001.5 14h13a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0014.5 2h-13z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M3 5.5a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zM3 8a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9A.5.5 0 013 8zm0 2.5a.5.5 0 01.5-.5h6a.5.5 0 010 1h-6a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconCaretDown = /*#__PURE__*/make_icon_makeIcon('CaretDown', '<path fill-rule="evenodd" d="M3.204 5L8 10.481 12.796 5H3.204zm-.753.659l4.796 5.48a1 1 0 001.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 00-.753 1.659z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconCaretDownFill = /*#__PURE__*/make_icon_makeIcon('CaretDownFill', '<path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 01.753 1.659l-4.796 5.48a1 1 0 01-1.506 0z"/>'); // eslint-disable-next-line

var BIconCaretLeft = /*#__PURE__*/make_icon_makeIcon('CaretLeft', '<path fill-rule="evenodd" d="M10 12.796L4.519 8 10 3.204v9.592zm-.659.753l-5.48-4.796a1 1 0 010-1.506l5.48-4.796A1 1 0 0111 3.204v9.592a1 1 0 01-1.659.753z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconCaretLeftFill = /*#__PURE__*/make_icon_makeIcon('CaretLeftFill', '<path d="M3.86 8.753l5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 00-1.659-.753l-5.48 4.796a1 1 0 000 1.506z"/>'); // eslint-disable-next-line

var BIconCaretRight = /*#__PURE__*/make_icon_makeIcon('CaretRight', '<path fill-rule="evenodd" d="M6 12.796L11.481 8 6 3.204v9.592zm.659.753l5.48-4.796a1 1 0 000-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 001.659.753z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconCaretRightFill = /*#__PURE__*/make_icon_makeIcon('CaretRightFill', '<path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 011.659-.753l5.48 4.796a1 1 0 010 1.506z"/>'); // eslint-disable-next-line

var BIconCaretUp = /*#__PURE__*/make_icon_makeIcon('CaretUp', '<path fill-rule="evenodd" d="M3.204 11L8 5.519 12.796 11H3.204zm-.753-.659l4.796-5.48a1 1 0 011.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 01-.753-1.659z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconCaretUpFill = /*#__PURE__*/make_icon_makeIcon('CaretUpFill', '<path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z"/>'); // eslint-disable-next-line

var BIconChat = /*#__PURE__*/make_icon_makeIcon('Chat', '<path fill-rule="evenodd" d="M2.678 11.894a1 1 0 01.287.801 10.97 10.97 0 01-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 01.71-.074A8.06 8.06 0 008 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 01-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 00.244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 01-2.347-.306c-.52.263-1.639.742-3.468 1.105z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconChatDots = /*#__PURE__*/make_icon_makeIcon('ChatDots', '<path fill-rule="evenodd" d="M2.678 11.894a1 1 0 01.287.801 10.97 10.97 0 01-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 01.71-.074A8.06 8.06 0 008 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 01-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 00.244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 01-2.347-.306c-.52.263-1.639.742-3.468 1.105z" clip-rule="evenodd"/><path d="M5 8a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0z"/>'); // eslint-disable-next-line

var BIconChatDotsFill = /*#__PURE__*/make_icon_makeIcon('ChatDotsFill', '<path fill-rule="evenodd" d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 01-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0zm3 1a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconChatFill = /*#__PURE__*/make_icon_makeIcon('ChatFill', '<path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 008 15z"/>'); // eslint-disable-next-line

var BIconChatQuote = /*#__PURE__*/make_icon_makeIcon('ChatQuote', '<path fill-rule="evenodd" d="M2.678 11.894a1 1 0 01.287.801 10.97 10.97 0 01-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 01.71-.074A8.06 8.06 0 008 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 01-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 00.244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 01-2.347-.306c-.52.263-1.639.742-3.468 1.105z" clip-rule="evenodd"/><path d="M7.468 7.667c0 .92-.776 1.666-1.734 1.666S4 8.587 4 7.667C4 6.747 4.776 6 5.734 6s1.734.746 1.734 1.667z"/><path fill-rule="evenodd" d="M6.157 6.936a.438.438 0 01-.56.293.413.413 0 01-.274-.527c.08-.23.23-.44.477-.546a.891.891 0 01.698.014c.387.16.72.545.923.997.428.948.393 2.377-.942 3.706a.446.446 0 01-.612.01.405.405 0 01-.011-.59c1.093-1.087 1.058-2.158.77-2.794-.152-.336-.354-.514-.47-.563zm-.035-.012h-.001.001z" clip-rule="evenodd"/><path d="M11.803 7.667c0 .92-.776 1.666-1.734 1.666-.957 0-1.734-.746-1.734-1.666 0-.92.777-1.667 1.734-1.667.958 0 1.734.746 1.734 1.667z"/><path fill-rule="evenodd" d="M10.492 6.936a.438.438 0 01-.56.293.413.413 0 01-.274-.527c.08-.23.23-.44.477-.546a.891.891 0 01.698.014c.387.16.72.545.924.997.428.948.392 2.377-.942 3.706a.446.446 0 01-.613.01.405.405 0 01-.011-.59c1.093-1.087 1.058-2.158.77-2.794-.152-.336-.354-.514-.469-.563zm-.034-.012h-.002.002z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconChatQuoteFill = /*#__PURE__*/make_icon_makeIcon('ChatQuoteFill', '<path fill-rule="evenodd" d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 01-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM7.194 6.766c.087.124.163.26.227.401.428.948.393 2.377-.942 3.706a.446.446 0 01-.612.01.405.405 0 01-.011-.59c.419-.416.672-.831.809-1.22-.269.165-.588.26-.93.26C4.775 9.333 4 8.587 4 7.667 4 6.747 4.776 6 5.734 6c.271 0 .528.06.756.166l.008.004c.169.07.327.182.469.324.085.083.161.174.227.272zM11 9.073c-.269.165-.588.26-.93.26-.958 0-1.735-.746-1.735-1.666 0-.92.777-1.667 1.734-1.667.271 0 .528.06.756.166l.008.004c.17.07.327.182.469.324.085.083.161.174.227.272.087.124.164.26.228.401.428.948.392 2.377-.942 3.706a.446.446 0 01-.613.01.405.405 0 01-.011-.59c.42-.416.672-.831.81-1.22z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconChatSquare = /*#__PURE__*/make_icon_makeIcon('ChatSquare', '<path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v8a1 1 0 001 1h2.5a2 2 0 011.6.8L8 14.333 9.9 11.8a2 2 0 011.6-.8H14a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v8a2 2 0 002 2h2.5a1 1 0 01.8.4l1.9 2.533a1 1 0 001.6 0l1.9-2.533a1 1 0 01.8-.4H14a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconChatSquareDots = /*#__PURE__*/make_icon_makeIcon('ChatSquareDots', '<path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v8a1 1 0 001 1h2.5a2 2 0 011.6.8L8 14.333 9.9 11.8a2 2 0 011.6-.8H14a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v8a2 2 0 002 2h2.5a1 1 0 01.8.4l1.9 2.533a1 1 0 001.6 0l1.9-2.533a1 1 0 01.8-.4H14a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path d="M5 6a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0z"/>'); // eslint-disable-next-line

var BIconChatSquareDotsFill = /*#__PURE__*/make_icon_makeIcon('ChatSquareDotsFill', '<path fill-rule="evenodd" d="M0 2a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2h-2.5a1 1 0 00-.8.4l-1.9 2.533a1 1 0 01-1.6 0L5.3 12.4a1 1 0 00-.8-.4H2a2 2 0 01-2-2V2zm5 4a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0zm3 1a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconChatSquareFill = /*#__PURE__*/make_icon_makeIcon('ChatSquareFill', '<path fill-rule="evenodd" d="M2 0a2 2 0 00-2 2v8a2 2 0 002 2h2.5a1 1 0 01.8.4l1.9 2.533a1 1 0 001.6 0l1.9-2.533a1 1 0 01.8-.4H14a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconChatSquareQuote = /*#__PURE__*/make_icon_makeIcon('ChatSquareQuote', '<path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v8a1 1 0 001 1h2.5a2 2 0 011.6.8L8 14.333 9.9 11.8a2 2 0 011.6-.8H14a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v8a2 2 0 002 2h2.5a1 1 0 01.8.4l1.9 2.533a1 1 0 001.6 0l1.9-2.533a1 1 0 01.8-.4H14a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path d="M7.468 5.667c0 .92-.776 1.666-1.734 1.666S4 6.587 4 5.667C4 4.747 4.776 4 5.734 4s1.734.746 1.734 1.667z"/><path fill-rule="evenodd" d="M6.157 4.936a.438.438 0 01-.56.293.413.413 0 01-.274-.527c.08-.23.23-.44.477-.546a.891.891 0 01.698.014c.387.16.72.545.923.997.428.948.393 2.377-.942 3.706a.446.446 0 01-.612.01.405.405 0 01-.011-.59c1.093-1.087 1.058-2.158.77-2.794-.152-.336-.354-.514-.47-.563z" clip-rule="evenodd"/><path d="M11.803 5.667c0 .92-.776 1.666-1.734 1.666-.957 0-1.734-.746-1.734-1.666 0-.92.777-1.667 1.734-1.667.958 0 1.734.746 1.734 1.667z"/><path fill-rule="evenodd" d="M10.492 4.936a.438.438 0 01-.56.293.413.413 0 01-.274-.527c.08-.23.23-.44.477-.546a.891.891 0 01.698.014c.387.16.72.545.924.997.428.948.392 2.377-.942 3.706a.446.446 0 01-.613.01.405.405 0 01-.011-.59c1.093-1.087 1.058-2.158.77-2.794-.152-.336-.354-.514-.469-.563z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconChatSquareQuoteFill = /*#__PURE__*/make_icon_makeIcon('ChatSquareQuoteFill', '<path fill-rule="evenodd" d="M0 2a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2h-2.5a1 1 0 00-.8.4l-1.9 2.533a1 1 0 01-1.6 0L5.3 12.4a1 1 0 00-.8-.4H2a2 2 0 01-2-2V2zm7.194 2.766c.087.124.163.26.227.401.428.948.393 2.377-.942 3.706a.446.446 0 01-.612.01.405.405 0 01-.011-.59c.419-.416.672-.831.809-1.22-.269.165-.588.26-.93.26C4.775 7.333 4 6.587 4 5.667 4 4.747 4.776 4 5.734 4c.271 0 .528.06.756.166l.008.004c.169.07.327.182.469.324.085.083.161.174.227.272zM11 7.073c-.269.165-.588.26-.93.26-.958 0-1.735-.746-1.735-1.666 0-.92.777-1.667 1.734-1.667.271 0 .528.06.756.166l.008.004c.17.07.327.182.469.324.085.083.161.174.227.272.087.124.164.26.228.401.428.948.392 2.377-.942 3.706a.446.446 0 01-.613.01.405.405 0 01-.011-.59c.42-.416.672-.831.81-1.22z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconCheck = /*#__PURE__*/make_icon_makeIcon('Check', '<path fill-rule="evenodd" d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconCheckAll = /*#__PURE__*/make_icon_makeIcon('CheckAll', '<path fill-rule="evenodd" d="M12.354 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L5 10.293l6.646-6.647a.5.5 0 01.708 0z" clip-rule="evenodd"/><path d="M6.25 8.043l-.896-.897a.5.5 0 10-.708.708l.897.896.707-.707zm1 2.414l.896.897a.5.5 0 00.708 0l7-7a.5.5 0 00-.708-.708L8.5 10.293l-.543-.543-.707.707z"/>'); // eslint-disable-next-line

var BIconCheckBox = /*#__PURE__*/make_icon_makeIcon('CheckBox', '<path fill-rule="evenodd" d="M15.354 2.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3-3a.5.5 0 11.708-.708L8 9.293l6.646-6.647a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M1.5 13A1.5 1.5 0 003 14.5h10a1.5 1.5 0 001.5-1.5V8a.5.5 0 00-1 0v5a.5.5 0 01-.5.5H3a.5.5 0 01-.5-.5V3a.5.5 0 01.5-.5h8a.5.5 0 000-1H3A1.5 1.5 0 001.5 3v10z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconCheckCircle = /*#__PURE__*/make_icon_makeIcon('CheckCircle', '<path fill-rule="evenodd" d="M15.354 2.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3-3a.5.5 0 11.708-.708L8 9.293l6.646-6.647a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 2.5A5.5 5.5 0 1013.5 8a.5.5 0 011 0 6.5 6.5 0 11-3.25-5.63.5.5 0 11-.5.865A5.472 5.472 0 008 2.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconChevronBarContract = /*#__PURE__*/make_icon_makeIcon('ChevronBarContract', '<path fill-rule="evenodd" d="M3.646 14.854a.5.5 0 00.708 0L8 11.207l3.646 3.647a.5.5 0 00.708-.708l-4-4a.5.5 0 00-.708 0l-4 4a.5.5 0 000 .708zm0-13.708a.5.5 0 01.708 0L8 4.793l3.646-3.647a.5.5 0 01.708.708l-4 4a.5.5 0 01-.708 0l-4-4a.5.5 0 010-.708zM1 8a.5.5 0 01.5-.5h13a.5.5 0 010 1h-13A.5.5 0 011 8z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconChevronBarDown = /*#__PURE__*/make_icon_makeIcon('ChevronBarDown', '<path fill-rule="evenodd" d="M3.646 4.146a.5.5 0 01.708 0L8 7.793l3.646-3.647a.5.5 0 01.708.708l-4 4a.5.5 0 01-.708 0l-4-4a.5.5 0 010-.708zM1 11.5a.5.5 0 01.5-.5h13a.5.5 0 010 1h-13a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconChevronBarExpand = /*#__PURE__*/make_icon_makeIcon('ChevronBarExpand', '<path fill-rule="evenodd" d="M3.646 10.146a.5.5 0 01.708 0L8 13.793l3.646-3.647a.5.5 0 01.708.708l-4 4a.5.5 0 01-.708 0l-4-4a.5.5 0 010-.708zm0-4.292a.5.5 0 00.708 0L8 2.207l3.646 3.647a.5.5 0 00.708-.708l-4-4a.5.5 0 00-.708 0l-4 4a.5.5 0 000 .708zM1 8a.5.5 0 01.5-.5h13a.5.5 0 010 1h-13A.5.5 0 011 8z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconChevronBarLeft = /*#__PURE__*/make_icon_makeIcon('ChevronBarLeft', '<path fill-rule="evenodd" d="M11.854 3.646a.5.5 0 010 .708L8.207 8l3.647 3.646a.5.5 0 01-.708.708l-4-4a.5.5 0 010-.708l4-4a.5.5 0 01.708 0zM4.5 1a.5.5 0 00-.5.5v13a.5.5 0 001 0v-13a.5.5 0 00-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconChevronBarRight = /*#__PURE__*/make_icon_makeIcon('ChevronBarRight', '<path fill-rule="evenodd" d="M4.146 3.646a.5.5 0 000 .708L7.793 8l-3.647 3.646a.5.5 0 00.708.708l4-4a.5.5 0 000-.708l-4-4a.5.5 0 00-.708 0zM11.5 1a.5.5 0 01.5.5v13a.5.5 0 01-1 0v-13a.5.5 0 01.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconChevronBarUp = /*#__PURE__*/make_icon_makeIcon('ChevronBarUp', '<path fill-rule="evenodd" d="M3.646 11.854a.5.5 0 00.708 0L8 8.207l3.646 3.647a.5.5 0 00.708-.708l-4-4a.5.5 0 00-.708 0l-4 4a.5.5 0 000 .708zM2.4 5.2c0 .22.18.4.4.4h10.4a.4.4 0 000-.8H2.8a.4.4 0 00-.4.4z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconChevronCompactDown = /*#__PURE__*/make_icon_makeIcon('ChevronCompactDown', '<path fill-rule="evenodd" d="M1.553 6.776a.5.5 0 01.67-.223L8 9.44l5.776-2.888a.5.5 0 11.448.894l-6 3a.5.5 0 01-.448 0l-6-3a.5.5 0 01-.223-.67z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconChevronCompactLeft = /*#__PURE__*/make_icon_makeIcon('ChevronCompactLeft', '<path fill-rule="evenodd" d="M9.224 1.553a.5.5 0 01.223.67L6.56 8l2.888 5.776a.5.5 0 11-.894.448l-3-6a.5.5 0 010-.448l3-6a.5.5 0 01.67-.223z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconChevronCompactRight = /*#__PURE__*/make_icon_makeIcon('ChevronCompactRight', '<path fill-rule="evenodd" d="M6.776 1.553a.5.5 0 01.671.223l3 6a.5.5 0 010 .448l-3 6a.5.5 0 11-.894-.448L9.44 8 6.553 2.224a.5.5 0 01.223-.671z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconChevronCompactUp = /*#__PURE__*/make_icon_makeIcon('ChevronCompactUp', '<path fill-rule="evenodd" d="M7.776 5.553a.5.5 0 01.448 0l6 3a.5.5 0 11-.448.894L8 6.56 2.224 9.447a.5.5 0 11-.448-.894l6-3z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconChevronContract = /*#__PURE__*/make_icon_makeIcon('ChevronContract', '<path fill-rule="evenodd" d="M3.646 13.854a.5.5 0 00.708 0L8 10.207l3.646 3.647a.5.5 0 00.708-.708l-4-4a.5.5 0 00-.708 0l-4 4a.5.5 0 000 .708zm0-11.708a.5.5 0 01.708 0L8 5.793l3.646-3.647a.5.5 0 01.708.708l-4 4a.5.5 0 01-.708 0l-4-4a.5.5 0 010-.708z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconChevronDoubleDown = /*#__PURE__*/make_icon_makeIcon('ChevronDoubleDown', '<path fill-rule="evenodd" d="M1.646 6.646a.5.5 0 01.708 0L8 12.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M1.646 2.646a.5.5 0 01.708 0L8 8.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconChevronDoubleLeft = /*#__PURE__*/make_icon_makeIcon('ChevronDoubleLeft', '<path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 010 .708L2.707 8l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 010 .708L6.707 8l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconChevronDoubleRight = /*#__PURE__*/make_icon_makeIcon('ChevronDoubleRight', '<path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L9.293 8 3.646 2.354a.5.5 0 010-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L13.293 8 7.646 2.354a.5.5 0 010-.708z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconChevronDoubleUp = /*#__PURE__*/make_icon_makeIcon('ChevronDoubleUp', '<path fill-rule="evenodd" d="M7.646 2.646a.5.5 0 01.708 0l6 6a.5.5 0 01-.708.708L8 3.707 2.354 9.354a.5.5 0 11-.708-.708l6-6z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.646 6.646a.5.5 0 01.708 0l6 6a.5.5 0 01-.708.708L8 7.707l-5.646 5.647a.5.5 0 01-.708-.708l6-6z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconChevronDown = /*#__PURE__*/make_icon_makeIcon('ChevronDown', '<path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 01.708 0L8 10.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconChevronExpand = /*#__PURE__*/make_icon_makeIcon('ChevronExpand', '<path fill-rule="evenodd" d="M3.646 9.146a.5.5 0 01.708 0L8 12.793l3.646-3.647a.5.5 0 01.708.708l-4 4a.5.5 0 01-.708 0l-4-4a.5.5 0 010-.708zm0-2.292a.5.5 0 00.708 0L8 3.207l3.646 3.647a.5.5 0 00.708-.708l-4-4a.5.5 0 00-.708 0l-4 4a.5.5 0 000 .708z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconChevronLeft = /*#__PURE__*/make_icon_makeIcon('ChevronLeft', '<path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 010 .708L5.707 8l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconChevronRight = /*#__PURE__*/make_icon_makeIcon('ChevronRight', '<path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L10.293 8 4.646 2.354a.5.5 0 010-.708z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconChevronUp = /*#__PURE__*/make_icon_makeIcon('ChevronUp', '<path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 01.708 0l6 6a.5.5 0 01-.708.708L8 5.707l-5.646 5.647a.5.5 0 01-.708-.708l6-6z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconCircle = /*#__PURE__*/make_icon_makeIcon('Circle', '<path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconCircleFill = /*#__PURE__*/make_icon_makeIcon('CircleFill', '<circle cx="8" cy="8" r="8"/>'); // eslint-disable-next-line

var BIconCircleHalf = /*#__PURE__*/make_icon_makeIcon('CircleHalf', '<path fill-rule="evenodd" d="M8 15V1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconCircleSquare = /*#__PURE__*/make_icon_makeIcon('CircleSquare', '<path d="M0 6a6 6 0 1112 0A6 6 0 010 6z"/><path d="M12.93 5h1.57a.5.5 0 01.5.5v9a.5.5 0 01-.5.5h-9a.5.5 0 01-.5-.5v-1.57a6.953 6.953 0 01-1-.22v1.79A1.5 1.5 0 005.5 16h9a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0014.5 4h-1.79c.097.324.17.658.22 1z"/>'); // eslint-disable-next-line

var BIconClipboard = /*#__PURE__*/make_icon_makeIcon('Clipboard', '<path fill-rule="evenodd" d="M4 1.5H3a2 2 0 00-2 2V14a2 2 0 002 2h10a2 2 0 002-2V3.5a2 2 0 00-2-2h-1v1h1a1 1 0 011 1V14a1 1 0 01-1 1H3a1 1 0 01-1-1V3.5a1 1 0 011-1h1v-1z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M9.5 1h-3a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5zm-3-1A1.5 1.5 0 005 1.5v1A1.5 1.5 0 006.5 4h3A1.5 1.5 0 0011 2.5v-1A1.5 1.5 0 009.5 0h-3z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconClipboardData = /*#__PURE__*/make_icon_makeIcon('ClipboardData', '<path fill-rule="evenodd" d="M4 1.5H3a2 2 0 00-2 2V14a2 2 0 002 2h10a2 2 0 002-2V3.5a2 2 0 00-2-2h-1v1h1a1 1 0 011 1V14a1 1 0 01-1 1H3a1 1 0 01-1-1V3.5a1 1 0 011-1h1v-1z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M9.5 1h-3a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5zm-3-1A1.5 1.5 0 005 1.5v1A1.5 1.5 0 006.5 4h3A1.5 1.5 0 0011 2.5v-1A1.5 1.5 0 009.5 0h-3z" clip-rule="evenodd"/><path d="M4 11a1 1 0 112 0v1a1 1 0 11-2 0v-1zm6-4a1 1 0 112 0v5a1 1 0 11-2 0V7zM7 9a1 1 0 012 0v3a1 1 0 11-2 0V9z"/>'); // eslint-disable-next-line

var BIconClock = /*#__PURE__*/make_icon_makeIcon('Clock', '<path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm8-7A8 8 0 110 8a8 8 0 0116 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.5 3a.5.5 0 01.5.5v5.21l3.248 1.856a.5.5 0 01-.496.868l-3.5-2A.5.5 0 017 9V3.5a.5.5 0 01.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconClockFill = /*#__PURE__*/make_icon_makeIcon('ClockFill', '<path fill-rule="evenodd" d="M16 8A8 8 0 110 8a8 8 0 0116 0zM8 3.5a.5.5 0 00-1 0V9a.5.5 0 00.252.434l3.5 2a.5.5 0 00.496-.868L8 8.71V3.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconClockHistory = /*#__PURE__*/make_icon_makeIcon('ClockHistory', '<path fill-rule="evenodd" d="M8.515 1.019A7 7 0 008 1V0a8 8 0 01.589.022l-.074.997zm2.004.45a7.003 7.003 0 00-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 00-.439-.27l.493-.87a8.025 8.025 0 01.979.654l-.615.789a6.996 6.996 0 00-.418-.302zm1.834 1.79a6.99 6.99 0 00-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 00-.214-.468l.893-.45a7.976 7.976 0 01.45 1.088l-.95.313a7.023 7.023 0 00-.179-.483zm.53 2.507a6.991 6.991 0 00-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 01-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 01-.401.432l-.707-.707z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 1a7 7 0 104.95 11.95l.707.707A8.001 8.001 0 118 0v1z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.5 3a.5.5 0 01.5.5v5.21l3.248 1.856a.5.5 0 01-.496.868l-3.5-2A.5.5 0 017 9V3.5a.5.5 0 01.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconCloud = /*#__PURE__*/make_icon_makeIcon('Cloud', '<path fill-rule="evenodd" d="M4.887 7.2l-.964-.165A2.5 2.5 0 103.5 12h10a1.5 1.5 0 00.237-2.981L12.7 8.854l.216-1.028a4 4 0 10-7.843-1.587l-.185.96zm9.084.341a5 5 0 00-9.88-1.492A3.5 3.5 0 103.5 13h9.999a2.5 2.5 0 00.394-4.968c.033-.16.06-.324.077-.49z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconCloudDownload = /*#__PURE__*/make_icon_makeIcon('CloudDownload', '<path d="M4.887 5.2l-.964-.165A2.5 2.5 0 103.5 10H6v1H3.5a3.5 3.5 0 11.59-6.95 5.002 5.002 0 119.804 1.98A2.501 2.501 0 0113.5 11H10v-1h3.5a1.5 1.5 0 00.237-2.981L12.7 6.854l.216-1.028a4 4 0 10-7.843-1.587l-.185.96z"/><path fill-rule="evenodd" d="M5 12.5a.5.5 0 01.707 0L8 14.793l2.293-2.293a.5.5 0 11.707.707l-2.646 2.646a.5.5 0 01-.708 0L5 13.207a.5.5 0 010-.707z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 6a.5.5 0 01.5.5v8a.5.5 0 01-1 0v-8A.5.5 0 018 6z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconCloudFill = /*#__PURE__*/make_icon_makeIcon('CloudFill', '<path fill-rule="evenodd" d="M3.5 13a3.5 3.5 0 11.59-6.95 5.002 5.002 0 119.804 1.98A2.5 2.5 0 0113.5 13h-10z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconCloudUpload = /*#__PURE__*/make_icon_makeIcon('CloudUpload', '<path d="M4.887 6.2l-.964-.165A2.5 2.5 0 103.5 11H6v1H3.5a3.5 3.5 0 11.59-6.95 5.002 5.002 0 119.804 1.98A2.501 2.501 0 0113.5 12H10v-1h3.5a1.5 1.5 0 00.237-2.981L12.7 7.854l.216-1.028a4 4 0 10-7.843-1.587l-.185.96z"/><path fill-rule="evenodd" d="M5 8.854a.5.5 0 00.707 0L8 6.56l2.293 2.293A.5.5 0 1011 8.146L8.354 5.5a.5.5 0 00-.708 0L5 8.146a.5.5 0 000 .708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 6a.5.5 0 01.5.5v8a.5.5 0 01-1 0v-8A.5.5 0 018 6z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconCode = /*#__PURE__*/make_icon_makeIcon('Code', '<path fill-rule="evenodd" d="M5.854 4.146a.5.5 0 010 .708L2.707 8l3.147 3.146a.5.5 0 01-.708.708l-3.5-3.5a.5.5 0 010-.708l3.5-3.5a.5.5 0 01.708 0zm4.292 0a.5.5 0 000 .708L13.293 8l-3.147 3.146a.5.5 0 00.708.708l3.5-3.5a.5.5 0 000-.708l-3.5-3.5a.5.5 0 00-.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconCodeSlash = /*#__PURE__*/make_icon_makeIcon('CodeSlash', '<path fill-rule="evenodd" d="M4.854 4.146a.5.5 0 010 .708L1.707 8l3.147 3.146a.5.5 0 01-.708.708l-3.5-3.5a.5.5 0 010-.708l3.5-3.5a.5.5 0 01.708 0zm6.292 0a.5.5 0 000 .708L14.293 8l-3.147 3.146a.5.5 0 00.708.708l3.5-3.5a.5.5 0 000-.708l-3.5-3.5a.5.5 0 00-.708 0zm-.999-3.124a.5.5 0 01.33.625l-4 13a.5.5 0 01-.955-.294l4-13a.5.5 0 01.625-.33z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconCollection = /*#__PURE__*/make_icon_makeIcon('Collection', '<path fill-rule="evenodd" d="M14.5 13.5h-13A.5.5 0 011 13V6a.5.5 0 01.5-.5h13a.5.5 0 01.5.5v7a.5.5 0 01-.5.5zm-13 1A1.5 1.5 0 010 13V6a1.5 1.5 0 011.5-1.5h13A1.5 1.5 0 0116 6v7a1.5 1.5 0 01-1.5 1.5h-13zM2 3a.5.5 0 00.5.5h11a.5.5 0 000-1h-11A.5.5 0 002 3zm2-2a.5.5 0 00.5.5h7a.5.5 0 000-1h-7A.5.5 0 004 1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconCollectionFill = /*#__PURE__*/make_icon_makeIcon('CollectionFill', '<rect width="16" height="10" rx="1.5" transform="matrix(1 0 0 -1 0 14.5)"/><path fill-rule="evenodd" d="M2 3a.5.5 0 00.5.5h11a.5.5 0 000-1h-11A.5.5 0 002 3zm2-2a.5.5 0 00.5.5h7a.5.5 0 000-1h-7A.5.5 0 004 1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconCollectionPlay = /*#__PURE__*/make_icon_makeIcon('CollectionPlay', '<path fill-rule="evenodd" d="M14.5 13.5h-13A.5.5 0 011 13V6a.5.5 0 01.5-.5h13a.5.5 0 01.5.5v7a.5.5 0 01-.5.5zm-13 1A1.5 1.5 0 010 13V6a1.5 1.5 0 011.5-1.5h13A1.5 1.5 0 0116 6v7a1.5 1.5 0 01-1.5 1.5h-13zM2 3a.5.5 0 00.5.5h11a.5.5 0 000-1h-11A.5.5 0 002 3zm2-2a.5.5 0 00.5.5h7a.5.5 0 000-1h-7A.5.5 0 004 1z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M6.258 6.563a.5.5 0 01.507.013l4 2.5a.5.5 0 010 .848l-4 2.5A.5.5 0 016 12V7a.5.5 0 01.258-.437z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconCollectionPlayFill = /*#__PURE__*/make_icon_makeIcon('CollectionPlayFill', '<path fill-rule="evenodd" d="M1.5 14.5A1.5 1.5 0 010 13V6a1.5 1.5 0 011.5-1.5h13A1.5 1.5 0 0116 6v7a1.5 1.5 0 01-1.5 1.5h-13zm5.265-7.924A.5.5 0 006 7v5a.5.5 0 00.765.424l4-2.5a.5.5 0 000-.848l-4-2.5zM2 3a.5.5 0 00.5.5h11a.5.5 0 000-1h-11A.5.5 0 002 3zm2-2a.5.5 0 00.5.5h7a.5.5 0 000-1h-7A.5.5 0 004 1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconColumns = /*#__PURE__*/make_icon_makeIcon('Columns', '<path fill-rule="evenodd" d="M15 2H1v12h14V2zM1 1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V2a1 1 0 00-1-1H1z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.5 14V2h1v12h-1zm0-8H1V5h6.5v1zm7.5 5H8.5v-1H15v1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconColumnsGap = /*#__PURE__*/make_icon_makeIcon('ColumnsGap', '<path fill-rule="evenodd" d="M6 1H1v3h5V1zM1 0a1 1 0 00-1 1v3a1 1 0 001 1h5a1 1 0 001-1V1a1 1 0 00-1-1H1zm14 12h-5v3h5v-3zm-5-1a1 1 0 00-1 1v3a1 1 0 001 1h5a1 1 0 001-1v-3a1 1 0 00-1-1h-5zM6 8H1v7h5V8zM1 7a1 1 0 00-1 1v7a1 1 0 001 1h5a1 1 0 001-1V8a1 1 0 00-1-1H1zm14-6h-5v7h5V1zm-5-1a1 1 0 00-1 1v7a1 1 0 001 1h5a1 1 0 001-1V1a1 1 0 00-1-1h-5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconCommand = /*#__PURE__*/make_icon_makeIcon('Command', '<path fill-rule="evenodd" d="M2 3.5A1.5 1.5 0 003.5 5H5V3.5a1.5 1.5 0 10-3 0zM6 6V3.5A2.5 2.5 0 103.5 6H6zm8-2.5A1.5 1.5 0 0112.5 5H11V3.5a1.5 1.5 0 013 0zM10 6V3.5A2.5 2.5 0 1112.5 6H10zm-8 6.5A1.5 1.5 0 013.5 11H5v1.5a1.5 1.5 0 01-3 0zM6 10v2.5A2.5 2.5 0 113.5 10H6zm8 2.5a1.5 1.5 0 00-1.5-1.5H11v1.5a1.5 1.5 0 003 0zM10 10v2.5a2.5 2.5 0 102.5-2.5H10z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10 6H6v4h4V6zM5 5v6h6V5H5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconCompass = /*#__PURE__*/make_icon_makeIcon('Compass', '<path fill-rule="evenodd" d="M8 15.016a6.5 6.5 0 100-13 6.5 6.5 0 000 13zm0 1a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" clip-rule="evenodd"/><path d="M6 1a1 1 0 011-1h2a1 1 0 010 2H7a1 1 0 01-1-1zm.94 6.44l4.95-2.83-2.83 4.95-4.95 2.83 2.83-4.95z"/>'); // eslint-disable-next-line

var BIconCone = /*#__PURE__*/make_icon_makeIcon('Cone', '<path d="M7.03 1.88c.252-1.01 1.688-1.01 1.94 0L12 14H4L7.03 1.88z"/><path fill-rule="evenodd" d="M1.5 14a.5.5 0 01.5-.5h12a.5.5 0 010 1H2a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconConeStriped = /*#__PURE__*/make_icon_makeIcon('ConeStriped', '<path fill-rule="evenodd" d="M7.879 11.015a.5.5 0 01.242 0l6 1.5a.5.5 0 01.037.96l-6 2a.499.499 0 01-.316 0l-6-2a.5.5 0 01.037-.96l6-1.5z" clip-rule="evenodd"/><path d="M11.885 12.538l-.72-2.877C10.303 9.873 9.201 10 8 10s-2.303-.127-3.165-.339l-.72 2.877c-.073.292-.002.6.256.756C4.86 13.589 5.916 14 8 14s3.14-.411 3.63-.706c.257-.155.328-.464.255-.756zM9.97 4.88l.953 3.811C10.159 8.878 9.14 9 8 9c-1.14 0-2.159-.122-2.923-.309L6.03 4.88C6.635 4.957 7.3 5 8 5s1.365-.043 1.97-.12zm-.245-.978L8.97.88C8.718-.13 7.282-.13 7.03.88L6.275 3.9C6.8 3.965 7.382 4 8 4c.618 0 1.2-.036 1.725-.098z"/>'); // eslint-disable-next-line

var BIconController = /*#__PURE__*/make_icon_makeIcon('Controller', '<path fill-rule="evenodd" d="M11.119 2.693c.904.19 1.75.495 2.235.98.407.408.779 1.05 1.094 1.772.32.733.599 1.591.805 2.466.206.875.34 1.78.364 2.606.024.815-.059 1.602-.328 2.21a1.42 1.42 0 01-1.445.83c-.636-.067-1.115-.394-1.513-.773a11.307 11.307 0 01-.739-.809c-.126-.147-.25-.291-.368-.422-.728-.804-1.597-1.527-3.224-1.527-1.627 0-2.496.723-3.224 1.527-.119.131-.242.275-.368.422-.243.283-.494.576-.739.81-.398.378-.877.705-1.513.772a1.42 1.42 0 01-1.445-.83c-.27-.608-.352-1.395-.329-2.21.024-.826.16-1.73.365-2.606.206-.875.486-1.733.805-2.466.315-.722.687-1.364 1.094-1.772.486-.485 1.331-.79 2.235-.98.932-.196 2.03-.292 3.119-.292 1.089 0 2.187.096 3.119.292zm-6.032.979c-.877.185-1.469.443-1.733.708-.276.276-.587.783-.885 1.465a13.748 13.748 0 00-.748 2.295 12.351 12.351 0 00-.339 2.406c-.022.755.062 1.368.243 1.776a.42.42 0 00.426.24c.327-.034.61-.199.929-.502.212-.202.4-.423.615-.674.133-.156.276-.323.44-.505C4.861 9.97 5.978 9.026 8 9.026s3.139.943 3.965 1.855c.164.182.307.35.44.505.214.25.403.472.615.674.318.303.601.468.929.503a.42.42 0 00.426-.241c.18-.408.265-1.02.243-1.776a12.354 12.354 0 00-.339-2.406 13.753 13.753 0 00-.748-2.295c-.298-.682-.61-1.19-.885-1.465-.264-.265-.856-.523-1.733-.708-.85-.179-1.877-.27-2.913-.27-1.036 0-2.063.091-2.913.27z" clip-rule="evenodd"/><path d="M11.5 6.026a.5.5 0 11-1 0 .5.5 0 011 0zm-1 1a.5.5 0 11-1 0 .5.5 0 011 0zm2 0a.5.5 0 11-1 0 .5.5 0 011 0zm-1 1a.5.5 0 11-1 0 .5.5 0 011 0zm-7-2.5h1v3h-1v-3z"/><path d="M3.5 6.526h3v1h-3v-1zM3.051 3.26a.5.5 0 01.354-.613l1.932-.518a.5.5 0 01.258.966l-1.932.518a.5.5 0 01-.612-.354zm9.976 0a.5.5 0 00-.353-.613l-1.932-.518a.5.5 0 10-.259.966l1.932.518a.5.5 0 00.612-.354z"/>'); // eslint-disable-next-line

var BIconCreditCard = /*#__PURE__*/make_icon_makeIcon('CreditCard', '<path fill-rule="evenodd" d="M14 3H2a1 1 0 00-1 1v8a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1zM2 2a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H2z" clip-rule="evenodd"/><rect width="3" height="3" x="2" y="9" rx="1"/><path d="M1 5h14v2H1z"/>'); // eslint-disable-next-line

var BIconCrop = /*#__PURE__*/make_icon_makeIcon('Crop', '<path fill-rule="evenodd" d="M3.5.5A.5.5 0 014 1v13h13a.5.5 0 010 1H3.5a.5.5 0 01-.5-.5V1a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M.5 3.5A.5.5 0 011 3h2.5a.5.5 0 010 1H1a.5.5 0 01-.5-.5zm5.5 0a.5.5 0 01.5-.5h8a.5.5 0 01.5.5v8a.5.5 0 01-1 0V4H6.5a.5.5 0 01-.5-.5zM14.5 14a.5.5 0 01.5.5V17a.5.5 0 01-1 0v-2.5a.5.5 0 01.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconCursor = /*#__PURE__*/make_icon_makeIcon('Cursor', '<path fill-rule="evenodd" d="M14.082 2.182a.5.5 0 01.103.557L8.528 15.467a.5.5 0 01-.917-.007L5.57 10.694.803 8.652a.5.5 0 01-.006-.916l12.728-5.657a.5.5 0 01.556.103zM2.25 8.184l3.897 1.67a.5.5 0 01.262.263l1.67 3.897L12.743 3.52 2.25 8.184z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconCursorFill = /*#__PURE__*/make_icon_makeIcon('CursorFill', '<path fill-rule="evenodd" d="M14.082 2.182a.5.5 0 01.103.557L8.528 15.467a.5.5 0 01-.917-.007L5.57 10.694.803 8.652a.5.5 0 01-.006-.916l12.728-5.657a.5.5 0 01.556.103z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconCursorText = /*#__PURE__*/make_icon_makeIcon('CursorText', '<path fill-rule="evenodd" d="M5 2a.5.5 0 01.5-.5c.862 0 1.573.287 2.06.566.174.099.321.198.44.286.119-.088.266-.187.44-.286A4.165 4.165 0 0110.5 1.5a.5.5 0 010 1c-.638 0-1.177.213-1.564.434a3.49 3.49 0 00-.436.294V7.5H9a.5.5 0 010 1h-.5v4.272c.1.08.248.187.436.294.387.221.926.434 1.564.434a.5.5 0 010 1 4.165 4.165 0 01-2.06-.566A4.561 4.561 0 018 13.65a4.561 4.561 0 01-.44.285 4.165 4.165 0 01-2.06.566.5.5 0 010-1c.638 0 1.177-.213 1.564-.434.188-.107.335-.214.436-.294V8.5H7a.5.5 0 010-1h.5V3.228a3.49 3.49 0 00-.436-.294A3.166 3.166 0 005.5 2.5.5.5 0 015 2zm3.352 1.355zm-.704 9.29z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconDash = /*#__PURE__*/make_icon_makeIcon('Dash', '<path fill-rule="evenodd" d="M3.5 8a.5.5 0 01.5-.5h8a.5.5 0 010 1H4a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconDashCircle = /*#__PURE__*/make_icon_makeIcon('DashCircle', '<path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M3.5 8a.5.5 0 01.5-.5h8a.5.5 0 010 1H4a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconDashCircleFill = /*#__PURE__*/make_icon_makeIcon('DashCircleFill', '<path fill-rule="evenodd" d="M16 8A8 8 0 110 8a8 8 0 0116 0zM4 7.5a.5.5 0 000 1h8a.5.5 0 000-1H4z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconDashSquare = /*#__PURE__*/make_icon_makeIcon('DashSquare', '<path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M3.5 8a.5.5 0 01.5-.5h8a.5.5 0 010 1H4a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconDashSquareFill = /*#__PURE__*/make_icon_makeIcon('DashSquareFill', '<path fill-rule="evenodd" d="M2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2zm2 7.5a.5.5 0 000 1h8a.5.5 0 000-1H4z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconDiamond = /*#__PURE__*/make_icon_makeIcon('Diamond', '<path fill-rule="evenodd" d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 010-2.098L6.95.435zm1.4.7a.495.495 0 00-.7 0L1.134 7.65a.495.495 0 000 .7l6.516 6.516a.495.495 0 00.7 0l6.516-6.516a.495.495 0 000-.7L8.35 1.134z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconDiamondFill = /*#__PURE__*/make_icon_makeIcon('DiamondFill', '<path fill-rule="evenodd" d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 010-2.098L6.95.435z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconDiamondHalf = /*#__PURE__*/make_icon_makeIcon('DiamondHalf', '<path fill-rule="evenodd" d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 010-2.098L6.95.435zM8 .989a.493.493 0 00-.35.145L1.134 7.65a.495.495 0 000 .7l6.516 6.516a.493.493 0 00.35.145V.989z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconDisplay = /*#__PURE__*/make_icon_makeIcon('Display', '<path d="M5.75 13.5c.167-.333.25-.833.25-1.5h4c0 .667.083 1.167.25 1.5H11a.5.5 0 010 1H5a.5.5 0 010-1h.75z"/><path fill-rule="evenodd" d="M13.991 3H2c-.325 0-.502.078-.602.145a.758.758 0 00-.254.302A1.46 1.46 0 001 4.01V10c0 .325.078.502.145.602.07.105.17.188.302.254a1.464 1.464 0 00.538.143L2.01 11H14c.325 0 .502-.078.602-.145a.758.758 0 00.254-.302 1.464 1.464 0 00.143-.538L15 9.99V4c0-.325-.078-.502-.145-.602a.757.757 0 00-.302-.254A1.46 1.46 0 0013.99 3zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconDisplayFill = /*#__PURE__*/make_icon_makeIcon('DisplayFill', '<path d="M5.75 13.5c.167-.333.25-.833.25-1.5h4c0 .667.083 1.167.25 1.5H11a.5.5 0 010 1H5a.5.5 0 010-1h.75z"/><path fill-rule="evenodd" d="M13.991 3H2c-.325 0-.502.078-.602.145a.758.758 0 00-.254.302A1.46 1.46 0 001 4.01V10c0 .325.078.502.145.602.07.105.17.188.302.254a1.464 1.464 0 00.538.143L2.01 11H14c.325 0 .502-.078.602-.145a.758.758 0 00.254-.302 1.464 1.464 0 00.143-.538L15 9.99V4c0-.325-.078-.502-.145-.602a.757.757 0 00-.302-.254A1.46 1.46 0 0013.99 3zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2z" clip-rule="evenodd"/><path d="M2 4h12v6H2z"/>'); // eslint-disable-next-line

var BIconDot = /*#__PURE__*/make_icon_makeIcon('Dot', '<path fill-rule="evenodd" d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconDownload = /*#__PURE__*/make_icon_makeIcon('Download', '<path fill-rule="evenodd" d="M.5 8a.5.5 0 01.5.5V12a1 1 0 001 1h12a1 1 0 001-1V8.5a.5.5 0 011 0V12a2 2 0 01-2 2H2a2 2 0 01-2-2V8.5A.5.5 0 01.5 8z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5 7.5a.5.5 0 01.707 0L8 9.793 10.293 7.5a.5.5 0 11.707.707l-2.646 2.647a.5.5 0 01-.708 0L5 8.207A.5.5 0 015 7.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 1a.5.5 0 01.5.5v8a.5.5 0 01-1 0v-8A.5.5 0 018 1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconDroplet = /*#__PURE__*/make_icon_makeIcon('Droplet', '<path fill-rule="evenodd" d="M7.21.8C7.69.295 8 0 8 0c.109.363.234.708.371 1.038.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 01-12 0C2 6.668 5.58 2.517 7.21.8zm.413 1.021A31.25 31.25 0 005.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10a5 5 0 0010 0c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconDropletFill = /*#__PURE__*/make_icon_makeIcon('DropletFill', '<path fill-rule="evenodd" d="M8 16a6 6 0 006-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 006 6zM6.646 4.646c-.376.377-1.272 1.489-2.093 3.13l.894.448c.78-1.559 1.616-2.58 1.907-2.87l-.708-.708z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconDropletHalf = /*#__PURE__*/make_icon_makeIcon('DropletHalf', '<path fill-rule="evenodd" d="M7.21.8C7.69.295 8 0 8 0c.109.363.234.708.371 1.038.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 01-12 0C2 6.668 5.58 2.517 7.21.8zm.413 1.021A31.25 31.25 0 005.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10a5 5 0 0010 0c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448z" clip-rule="evenodd"/><path d="M14 10a6 6 0 01-12 0s2.5 2.5 6.5.5S14 10 14 10z"/>'); // eslint-disable-next-line

var BIconEgg = /*#__PURE__*/make_icon_makeIcon('Egg', '<path fill-rule="evenodd" d="M8 15a5 5 0 005-5c0-1.956-.69-4.286-1.742-6.12-.524-.913-1.112-1.658-1.704-2.164C8.956 1.206 8.428 1 8 1c-.428 0-.956.206-1.554.716-.592.506-1.18 1.251-1.704 2.164C3.69 5.714 3 8.044 3 10a5 5 0 005 5zm0 1a6 6 0 006-6c0-4.314-3-10-6-10S2 5.686 2 10a6 6 0 006 6z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconEggFill = /*#__PURE__*/make_icon_makeIcon('EggFill', '<path d="M14 10a6 6 0 01-12 0C2 5.686 5 0 8 0s6 5.686 6 10z"/>'); // eslint-disable-next-line

var BIconEggFried = /*#__PURE__*/make_icon_makeIcon('EggFried', '<path fill-rule="evenodd" d="M13.665 6.113a1 1 0 01-.667-.977L13 5a4 4 0 00-6.483-3.136 1 1 0 01-.8.2 4 4 0 00-3.693 6.61 1 1 0 01.2 1 4 4 0 006.67 4.087 1 1 0 011.262-.152 2.5 2.5 0 003.715-2.905 1 1 0 01.341-1.113 2.001 2.001 0 00-.547-3.478zM14 5c0 .057 0 .113-.003.17a3.001 3.001 0 01.822 5.216 3.5 3.5 0 01-5.201 4.065 5 5 0 01-8.336-5.109A5 5 0 015.896 1.08 5 5 0 0114 5z" clip-rule="evenodd"/><circle cx="8" cy="8" r="3"/>'); // eslint-disable-next-line

var BIconEject = /*#__PURE__*/make_icon_makeIcon('Eject', '<path fill-rule="evenodd" d="M7.27 1.047a1 1 0 011.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H1.656C.78 9.5.326 8.455.926 7.816L7.27 1.047zM14.346 8.5L8 1.731 1.654 8.5h12.692zM.5 11.5a1 1 0 011-1h13a1 1 0 011 1v1a1 1 0 01-1 1h-13a1 1 0 01-1-1v-1zm14 0h-13v1h13v-1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconEjectFill = /*#__PURE__*/make_icon_makeIcon('EjectFill', '<path fill-rule="evenodd" d="M7.27 1.047a1 1 0 011.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H1.656C.78 9.5.326 8.455.926 7.816L7.27 1.047zM.5 11.5a1 1 0 011-1h13a1 1 0 011 1v1a1 1 0 01-1 1h-13a1 1 0 01-1-1v-1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconEnvelope = /*#__PURE__*/make_icon_makeIcon('Envelope', '<path fill-rule="evenodd" d="M14 3H2a1 1 0 00-1 1v8a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1zM2 2a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M.071 4.243a.5.5 0 01.686-.172L8 8.417l7.243-4.346a.5.5 0 01.514.858L8 9.583.243 4.93a.5.5 0 01-.172-.686z" clip-rule="evenodd"/><path d="M6.752 8.932l.432-.252-.504-.864-.432.252.504.864zm-6 3.5l6-3.5-.504-.864-6 3.5.504.864zm8.496-3.5l-.432-.252.504-.864.432.252-.504.864zm6 3.5l-6-3.5.504-.864 6 3.5-.504.864z"/>'); // eslint-disable-next-line

var BIconEnvelopeFill = /*#__PURE__*/make_icon_makeIcon('EnvelopeFill', '<path d="M.05 3.555L8 8.414l7.95-4.859A2 2 0 0014 2H2A2 2 0 00.05 3.555zM16 4.697l-5.875 3.59L16 11.743V4.697zm-.168 8.108L9.157 8.879 8 9.586l-1.157-.707-6.675 3.926A2 2 0 002 14h12a2 2 0 001.832-1.195zM0 11.743l5.875-3.456L0 4.697v7.046z"/>'); // eslint-disable-next-line

var BIconEnvelopeOpen = /*#__PURE__*/make_icon_makeIcon('EnvelopeOpen', '<path fill-rule="evenodd" d="M.243 6.929l.514-.858L8 10.417l7.243-4.346.514.858L8 11.583.243 6.93z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.184 10.68L.752 14.432l-.504-.864L6.68 9.816l.504.864zm1.632 0l6.432 3.752.504-.864L9.32 9.816l-.504.864z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8.47 1.318a1 1 0 00-.94 0l-6 3.2A1 1 0 001 5.4V14a1 1 0 001 1h12a1 1 0 001-1V5.4a1 1 0 00-.53-.882l-6-3.2zM7.06.435a2 2 0 011.882 0l6 3.2A2 2 0 0116 5.4V14a2 2 0 01-2 2H2a2 2 0 01-2-2V5.4a2 2 0 011.059-1.765l6-3.2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconEnvelopeOpenFill = /*#__PURE__*/make_icon_makeIcon('EnvelopeOpenFill', '<path fill-rule="evenodd" d="M8.941.435a2 2 0 00-1.882 0l-6 3.2A2 2 0 000 5.4v.125l8 4.889 8-4.889V5.4a2 2 0 00-1.059-1.765l-6-3.2zM16 6.697l-5.875 3.59L16 13.743V6.697zm-.168 8.108L9.246 10.93l-.089-.052-.896.548-.261.159-.26-.16-.897-.547-.09.052-6.585 3.874A2 2 0 002 16h12a2 2 0 001.832-1.195zM0 13.743l5.875-3.456L0 6.697v7.046z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconExclamation = /*#__PURE__*/make_icon_makeIcon('Exclamation', '<path d="M7.002 11a1 1 0 112 0 1 1 0 01-2 0zM7.1 4.995a.905.905 0 111.8 0l-.35 3.507a.552.552 0 01-1.1 0L7.1 4.995z"/>'); // eslint-disable-next-line

var BIconExclamationCircle = /*#__PURE__*/make_icon_makeIcon('ExclamationCircle', '<path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/><path d="M7.002 11a1 1 0 112 0 1 1 0 01-2 0zM7.1 4.995a.905.905 0 111.8 0l-.35 3.507a.552.552 0 01-1.1 0L7.1 4.995z"/>'); // eslint-disable-next-line

var BIconExclamationCircleFill = /*#__PURE__*/make_icon_makeIcon('ExclamationCircleFill', '<path fill-rule="evenodd" d="M16 8A8 8 0 110 8a8 8 0 0116 0zM8 4a.905.905 0 00-.9.995l.35 3.507a.552.552 0 001.1 0l.35-3.507A.905.905 0 008 4zm.002 6a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconExclamationDiamond = /*#__PURE__*/make_icon_makeIcon('ExclamationDiamond', '<path fill-rule="evenodd" d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 010-2.098L6.95.435zm1.4.7a.495.495 0 00-.7 0L1.134 7.65a.495.495 0 000 .7l6.516 6.516a.495.495 0 00.7 0l6.516-6.516a.495.495 0 000-.7L8.35 1.134z" clip-rule="evenodd"/><path d="M7.002 11a1 1 0 112 0 1 1 0 01-2 0zM7.1 4.995a.905.905 0 111.8 0l-.35 3.507a.552.552 0 01-1.1 0L7.1 4.995z"/>'); // eslint-disable-next-line

var BIconExclamationDiamondFill = /*#__PURE__*/make_icon_makeIcon('ExclamationDiamondFill', '<path fill-rule="evenodd" d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM8 4a.905.905 0 00-.9.995l.35 3.507a.552.552 0 001.1 0l.35-3.507A.905.905 0 008 4zm.002 6a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconExclamationOctagon = /*#__PURE__*/make_icon_makeIcon('ExclamationOctagon', '<path fill-rule="evenodd" d="M4.54.146A.5.5 0 014.893 0h6.214a.5.5 0 01.353.146l4.394 4.394a.5.5 0 01.146.353v6.214a.5.5 0 01-.146.353l-4.394 4.394a.5.5 0 01-.353.146H4.893a.5.5 0 01-.353-.146L.146 11.46A.5.5 0 010 11.107V4.893a.5.5 0 01.146-.353L4.54.146zM5.1 1L1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z" clip-rule="evenodd"/><path d="M7.002 11a1 1 0 112 0 1 1 0 01-2 0zM7.1 4.995a.905.905 0 111.8 0l-.35 3.507a.552.552 0 01-1.1 0L7.1 4.995z"/>'); // eslint-disable-next-line

var BIconExclamationOctagonFill = /*#__PURE__*/make_icon_makeIcon('ExclamationOctagonFill', '<path fill-rule="evenodd" d="M11.46.146A.5.5 0 0011.107 0H4.893a.5.5 0 00-.353.146L.146 4.54A.5.5 0 000 4.893v6.214a.5.5 0 00.146.353l4.394 4.394a.5.5 0 00.353.146h6.214a.5.5 0 00.353-.146l4.394-4.394a.5.5 0 00.146-.353V4.893a.5.5 0 00-.146-.353L11.46.146zM8 4a.905.905 0 00-.9.995l.35 3.507a.552.552 0 001.1 0l.35-3.507A.905.905 0 008 4zm.002 6a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconExclamationSquare = /*#__PURE__*/make_icon_makeIcon('ExclamationSquare', '<path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path d="M7.002 11a1 1 0 112 0 1 1 0 01-2 0zM7.1 4.995a.905.905 0 111.8 0l-.35 3.507a.552.552 0 01-1.1 0L7.1 4.995z"/>'); // eslint-disable-next-line

var BIconExclamationSquareFill = /*#__PURE__*/make_icon_makeIcon('ExclamationSquareFill', '<path fill-rule="evenodd" d="M2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2zm6 4a.905.905 0 00-.9.995l.35 3.507a.552.552 0 001.1 0l.35-3.507A.905.905 0 008 4zm.002 6a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconExclamationTriangle = /*#__PURE__*/make_icon_makeIcon('ExclamationTriangle', '<path fill-rule="evenodd" d="M7.938 2.016a.146.146 0 00-.054.057L1.027 13.74a.176.176 0 00-.002.183c.016.03.037.05.054.06.015.01.034.017.066.017h13.713a.12.12 0 00.066-.017.163.163 0 00.055-.06.176.176 0 00-.003-.183L8.12 2.073a.146.146 0 00-.054-.057A.13.13 0 008.002 2a.13.13 0 00-.064.016zm1.044-.45a1.13 1.13 0 00-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" clip-rule="evenodd"/><path d="M7.002 12a1 1 0 112 0 1 1 0 01-2 0zM7.1 5.995a.905.905 0 111.8 0l-.35 3.507a.552.552 0 01-1.1 0L7.1 5.995z"/>'); // eslint-disable-next-line

var BIconExclamationTriangleFill = /*#__PURE__*/make_icon_makeIcon('ExclamationTriangleFill', '<path fill-rule="evenodd" d="M8.982 1.566a1.13 1.13 0 00-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5a.905.905 0 00-.9.995l.35 3.507a.552.552 0 001.1 0l.35-3.507A.905.905 0 008 5zm.002 6a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconExclude = /*#__PURE__*/make_icon_makeIcon('Exclude', '<path fill-rule="evenodd" d="M1.5 0A1.5 1.5 0 000 1.5v9A1.5 1.5 0 001.5 12H4v2.5A1.5 1.5 0 005.5 16h9a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0014.5 4H12V1.5A1.5 1.5 0 0010.5 0h-9zM12 4H5.5A1.5 1.5 0 004 5.5V12h6.5a1.5 1.5 0 001.5-1.5V4z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconEye = /*#__PURE__*/make_icon_makeIcon('Eye', '<path fill-rule="evenodd" d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.134 13.134 0 001.66 2.043C4.12 11.332 5.88 12.5 8 12.5c2.12 0 3.879-1.168 5.168-2.457A13.134 13.134 0 0014.828 8a13.133 13.133 0 00-1.66-2.043C11.879 4.668 10.119 3.5 8 3.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 001.172 8z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 5.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM4.5 8a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconEyeFill = /*#__PURE__*/make_icon_makeIcon('EyeFill', '<path d="M10.5 8a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/><path fill-rule="evenodd" d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconEyeSlash = /*#__PURE__*/make_icon_makeIcon('EyeSlash', '<path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 00-2.79.588l.77.771A5.944 5.944 0 018 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0114.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/><path d="M11.297 9.176a3.5 3.5 0 00-4.474-4.474l.823.823a2.5 2.5 0 012.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 01-4.474-4.474l.823.823a2.5 2.5 0 002.829 2.829z"/><path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 001.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 018 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709z"/><path fill-rule="evenodd" d="M13.646 14.354l-12-12 .708-.708 12 12-.708.708z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconEyeSlashFill = /*#__PURE__*/make_icon_makeIcon('EyeSlashFill', '<path d="M10.79 12.912l-1.614-1.615a3.5 3.5 0 01-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 002.79-.588zM5.21 3.088A7.028 7.028 0 018 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 00-4.474-4.474L5.21 3.089z"/><path d="M5.525 7.646a2.5 2.5 0 002.829 2.829l-2.83-2.829zm4.95.708l-2.829-2.83a2.5 2.5 0 012.829 2.829z"/><path fill-rule="evenodd" d="M13.646 14.354l-12-12 .708-.708 12 12-.708.708z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconFile = /*#__PURE__*/make_icon_makeIcon('File', '<path fill-rule="evenodd" d="M4 1h8a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2zm0 1a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V3a1 1 0 00-1-1H4z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconFileArrowDown = /*#__PURE__*/make_icon_makeIcon('FileArrowDown', '<path fill-rule="evenodd" d="M4 1h8a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2zm0 1a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V3a1 1 0 00-1-1H4z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4.646 8.146a.5.5 0 01.708 0L8 10.793l2.646-2.647a.5.5 0 01.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 010-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 4a.5.5 0 01.5.5v6a.5.5 0 01-1 0v-6A.5.5 0 018 4z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconFileArrowUp = /*#__PURE__*/make_icon_makeIcon('FileArrowUp', '<path fill-rule="evenodd" d="M4 1h8a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2zm0 1a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V3a1 1 0 00-1-1H4z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4.646 7.854a.5.5 0 00.708 0L8 5.207l2.646 2.647a.5.5 0 00.708-.708l-3-3a.5.5 0 00-.708 0l-3 3a.5.5 0 000 .708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 12a.5.5 0 00.5-.5v-6a.5.5 0 00-1 0v6a.5.5 0 00.5.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconFileBreak = /*#__PURE__*/make_icon_makeIcon('FileBreak', '<path fill-rule="evenodd" d="M0 10.5a.5.5 0 01.5-.5h15a.5.5 0 010 1H.5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/><path d="M12 1H4a2 2 0 00-2 2v6h1V3a1 1 0 011-1h8a1 1 0 011 1v6h1V3a2 2 0 00-2-2zm2 11h-1v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-1H2v1a2 2 0 002 2h8a2 2 0 002-2v-1z"/>'); // eslint-disable-next-line

var BIconFileCheck = /*#__PURE__*/make_icon_makeIcon('FileCheck', '<path d="M9 1H4a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V8h-1v5a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1h5V1z"/><path fill-rule="evenodd" d="M15.854 2.146a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0l-1.5-1.5a.5.5 0 01.708-.708L12.5 4.793l2.646-2.647a.5.5 0 01.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconFileCode = /*#__PURE__*/make_icon_makeIcon('FileCode', '<path fill-rule="evenodd" d="M4 1h8a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2zm0 1a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V3a1 1 0 00-1-1H4z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8.646 5.646a.5.5 0 01.708 0l2 2a.5.5 0 010 .708l-2 2a.5.5 0 01-.708-.708L10.293 8 8.646 6.354a.5.5 0 010-.708zm-1.292 0a.5.5 0 00-.708 0l-2 2a.5.5 0 000 .708l2 2a.5.5 0 00.708-.708L5.707 8l1.647-1.646a.5.5 0 000-.708z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconFileDiff = /*#__PURE__*/make_icon_makeIcon('FileDiff', '<path fill-rule="evenodd" d="M4 1h8a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2zm0 1a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V3a1 1 0 00-1-1H4z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5.5 10.5A.5.5 0 016 10h4a.5.5 0 010 1H6a.5.5 0 01-.5-.5zM8 4a.5.5 0 01.5.5v4a.5.5 0 01-1 0v-4A.5.5 0 018 4z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5.5 6.5A.5.5 0 016 6h4a.5.5 0 010 1H6a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconFileEarmark = /*#__PURE__*/make_icon_makeIcon('FileEarmark', '<path d="M4 1h5v1H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V6h1v7a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2z"/><path d="M9 4.5V1l5 5h-3.5A1.5 1.5 0 019 4.5z"/>'); // eslint-disable-next-line

var BIconFileEarmarkArrowDown = /*#__PURE__*/make_icon_makeIcon('FileEarmarkArrowDown', '<path d="M4 1h5v1H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V6h1v7a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2z"/><path d="M9 4.5V1l5 5h-3.5A1.5 1.5 0 019 4.5z"/><path fill-rule="evenodd" d="M5.646 9.146a.5.5 0 01.708 0L8 10.793l1.646-1.647a.5.5 0 01.708.708l-2 2a.5.5 0 01-.708 0l-2-2a.5.5 0 010-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 6a.5.5 0 01.5.5v4a.5.5 0 01-1 0v-4A.5.5 0 018 6z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconFileEarmarkArrowUp = /*#__PURE__*/make_icon_makeIcon('FileEarmarkArrowUp', '<path d="M4 1h5v1H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V6h1v7a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2z"/><path d="M9 4.5V1l5 5h-3.5A1.5 1.5 0 019 4.5z"/><path fill-rule="evenodd" d="M5.646 8.854a.5.5 0 00.708 0L8 7.207l1.646 1.647a.5.5 0 00.708-.708l-2-2a.5.5 0 00-.708 0l-2 2a.5.5 0 000 .708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 12a.5.5 0 00.5-.5v-4a.5.5 0 00-1 0v4a.5.5 0 00.5.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconFileEarmarkBreak = /*#__PURE__*/make_icon_makeIcon('FileEarmarkBreak', '<path fill-rule="evenodd" d="M9 1H4a2 2 0 00-2 2v6h1V3a1 1 0 011-1h5v2.5A1.5 1.5 0 0010.5 6H13v3h1V6L9 1zm5 11h-1v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-1H2v1a2 2 0 002 2h8a2 2 0 002-2v-1zM0 10.5a.5.5 0 01.5-.5h15a.5.5 0 010 1H.5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconFileEarmarkCheck = /*#__PURE__*/make_icon_makeIcon('FileEarmarkCheck', '<path d="M9 1H4a2 2 0 00-2 2v10a2 2 0 002 2h5v-1H4a1 1 0 01-1-1V3a1 1 0 011-1h5v2.5A1.5 1.5 0 0010.5 6H13v2h1V6L9 1z"/><path fill-rule="evenodd" d="M15.854 10.146a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0l-1.5-1.5a.5.5 0 01.708-.708l1.146 1.147 2.646-2.647a.5.5 0 01.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconFileEarmarkCode = /*#__PURE__*/make_icon_makeIcon('FileEarmarkCode', '<path d="M4 1h5v1H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V6h1v7a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2z"/><path d="M9 4.5V1l5 5h-3.5A1.5 1.5 0 019 4.5z"/><path fill-rule="evenodd" d="M8.646 6.646a.5.5 0 01.708 0l2 2a.5.5 0 010 .708l-2 2a.5.5 0 01-.708-.708L10.293 9 8.646 7.354a.5.5 0 010-.708zm-1.292 0a.5.5 0 00-.708 0l-2 2a.5.5 0 000 .708l2 2a.5.5 0 00.708-.708L5.707 9l1.647-1.646a.5.5 0 000-.708z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconFileEarmarkDiff = /*#__PURE__*/make_icon_makeIcon('FileEarmarkDiff', '<path d="M4 1h5v1H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V6h1v7a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2z"/><path d="M9 4.5V1l5 5h-3.5A1.5 1.5 0 019 4.5z"/><path fill-rule="evenodd" d="M5.5 11.5A.5.5 0 016 11h4a.5.5 0 010 1H6a.5.5 0 01-.5-.5zM8 5a.5.5 0 01.5.5v4a.5.5 0 01-1 0v-4A.5.5 0 018 5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5.5 7.5A.5.5 0 016 7h4a.5.5 0 010 1H6a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconFileEarmarkMinus = /*#__PURE__*/make_icon_makeIcon('FileEarmarkMinus', '<path d="M9 1H4a2 2 0 00-2 2v10a2 2 0 002 2h5v-1H4a1 1 0 01-1-1V3a1 1 0 011-1h5v2.5A1.5 1.5 0 0010.5 6H13v2h1V6L9 1z"/><path fill-rule="evenodd" d="M11 11.5a.5.5 0 01.5-.5h4a.5.5 0 010 1h-4a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconFileEarmarkPlus = /*#__PURE__*/make_icon_makeIcon('FileEarmarkPlus', '<path d="M9 1H4a2 2 0 00-2 2v10a2 2 0 002 2h5v-1H4a1 1 0 01-1-1V3a1 1 0 011-1h5v2.5A1.5 1.5 0 0010.5 6H13v2h1V6L9 1z"/><path fill-rule="evenodd" d="M13.5 10a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-2a.5.5 0 010-1H13v-1.5a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M13 12.5a.5.5 0 01.5-.5h2a.5.5 0 010 1H14v1.5a.5.5 0 01-1 0v-2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconFileEarmarkRuled = /*#__PURE__*/make_icon_makeIcon('FileEarmarkRuled', '<path fill-rule="evenodd" d="M13 9H3V8h10v1zm0 3H3v-1h10v1z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5 14V9h1v5H5z" clip-rule="evenodd"/><path d="M4 1h5v1H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V6h1v7a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2z"/><path d="M9 4.5V1l5 5h-3.5A1.5 1.5 0 019 4.5z"/>'); // eslint-disable-next-line

var BIconFileEarmarkSpreadsheet = /*#__PURE__*/make_icon_makeIcon('FileEarmarkSpreadsheet', '<path fill-rule="evenodd" d="M13 9H3V8h10v1zm0 3H3v-1h10v1z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5 14V9h1v5H5zm4 0V9h1v5H9z" clip-rule="evenodd"/><path d="M4 1h5v1H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V6h1v7a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2z"/><path d="M9 4.5V1l5 5h-3.5A1.5 1.5 0 019 4.5z"/>'); // eslint-disable-next-line

var BIconFileEarmarkText = /*#__PURE__*/make_icon_makeIcon('FileEarmarkText', '<path d="M4 1h5v1H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V6h1v7a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2z"/><path d="M9 4.5V1l5 5h-3.5A1.5 1.5 0 019 4.5z"/><path fill-rule="evenodd" d="M5 11.5a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5zm0-2a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm0-2a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconFileEarmarkZip = /*#__PURE__*/make_icon_makeIcon('FileEarmarkZip', '<path d="M4 1h5v1H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V6h1v7a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2z"/><path d="M9 4.5V1l5 5h-3.5A1.5 1.5 0 019 4.5z"/><path fill-rule="evenodd" d="M5 8.5a1 1 0 011-1h1a1 1 0 011 1v.938l.4 1.599a1 1 0 01-.416 1.074l-.93.62a1 1 0 01-1.11 0l-.929-.62a1 1 0 01-.415-1.074L5 9.438V8.5zm2 0H6v.938a1 1 0 01-.03.243l-.4 1.598.93.62.929-.62-.4-1.598A1 1 0 017 9.438V8.5z" clip-rule="evenodd"/><path d="M6 2h1.5v1H6zM5 3h1.5v1H5zm1 1h1.5v1H6zM5 5h1.5v1H5zm1 1h1.5v1H6V6z"/>'); // eslint-disable-next-line

var BIconFileMinus = /*#__PURE__*/make_icon_makeIcon('FileMinus', '<path d="M9 1H4a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V8h-1v5a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1h5V1z"/><path fill-rule="evenodd" d="M11 3.5a.5.5 0 01.5-.5h4a.5.5 0 010 1h-4a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconFilePlus = /*#__PURE__*/make_icon_makeIcon('FilePlus', '<path d="M9 1H4a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V8h-1v5a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1h5V1z"/><path fill-rule="evenodd" d="M13.5 1a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-2a.5.5 0 010-1H13V1.5a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M13 3.5a.5.5 0 01.5-.5h2a.5.5 0 010 1H14v1.5a.5.5 0 01-1 0v-2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconFilePost = /*#__PURE__*/make_icon_makeIcon('FilePost', '<path fill-rule="evenodd" d="M4 1h8a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2zm0 1a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V3a1 1 0 00-1-1H4z" clip-rule="evenodd"/><path d="M4 5.5a.5.5 0 01.5-.5h7a.5.5 0 01.5.5v7a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5v-7z"/><path fill-rule="evenodd" d="M4 3.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconFileRichtext = /*#__PURE__*/make_icon_makeIcon('FileRichtext', '<path fill-rule="evenodd" d="M4 1h8a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2zm0 1a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V3a1 1 0 00-1-1H4z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4.5 11.5A.5.5 0 015 11h3a.5.5 0 010 1H5a.5.5 0 01-.5-.5zm0-2A.5.5 0 015 9h6a.5.5 0 010 1H5a.5.5 0 01-.5-.5zm1.639-3.708l1.33.886 1.854-1.855a.25.25 0 01.289-.047l1.888.974V7.5a.5.5 0 01-.5.5H5a.5.5 0 01-.5-.5V7s1.54-1.274 1.639-1.208zM6.25 5a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconFileRuled = /*#__PURE__*/make_icon_makeIcon('FileRuled', '<path fill-rule="evenodd" d="M4 1h8a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2zm0 1a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V3a1 1 0 00-1-1H4z" clip-rule="evenodd"/><path stroke="currentColor" d="M3 5.5h10m-10 3h10m-10 3h10M5.5 6v8"/>'); // eslint-disable-next-line

var BIconFileSpreadsheet = /*#__PURE__*/make_icon_makeIcon('FileSpreadsheet', '<path fill-rule="evenodd" d="M4 1h8a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2zm0 1a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V3a1 1 0 00-1-1H4z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M13 6H3V5h10v1zm0 3H3V8h10v1zm0 3H3v-1h10v1z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5 14V6h1v8H5zm4 0V6h1v8H9z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconFileText = /*#__PURE__*/make_icon_makeIcon('FileText', '<path fill-rule="evenodd" d="M4 1h8a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2zm0 1a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V3a1 1 0 00-1-1H4z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4.5 10.5A.5.5 0 015 10h3a.5.5 0 010 1H5a.5.5 0 01-.5-.5zm0-2A.5.5 0 015 8h6a.5.5 0 010 1H5a.5.5 0 01-.5-.5zm0-2A.5.5 0 015 6h6a.5.5 0 010 1H5a.5.5 0 01-.5-.5zm0-2A.5.5 0 015 4h6a.5.5 0 010 1H5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconFileZip = /*#__PURE__*/make_icon_makeIcon('FileZip', '<path fill-rule="evenodd" d="M4 1h8a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2zm0 1a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V3a1 1 0 00-1-1H4z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M6.5 8.5a1 1 0 011-1h1a1 1 0 011 1v.938l.4 1.599a1 1 0 01-.416 1.074l-.93.62a1 1 0 01-1.109 0l-.93-.62a1 1 0 01-.415-1.074l.4-1.599V8.5zm2 0h-1v.938a1 1 0 01-.03.243l-.4 1.598.93.62.93-.62-.4-1.598a1 1 0 01-.03-.243V8.5z" clip-rule="evenodd"/><path d="M7.5 2H9v1H7.5zm-1 1H8v1H6.5zm1 1H9v1H7.5zm-1 1H8v1H6.5zm1 1H9v1H7.5V6z"/>'); // eslint-disable-next-line

var BIconFiles = /*#__PURE__*/make_icon_makeIcon('Files', '<path fill-rule="evenodd" d="M3 2h8a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V4a2 2 0 012-2zm0 1a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V4a1 1 0 00-1-1H3z" clip-rule="evenodd"/><path d="M5 0h8a2 2 0 012 2v10a2 2 0 01-2 2v-1a1 1 0 001-1V2a1 1 0 00-1-1H5a1 1 0 00-1 1H3a2 2 0 012-2z"/>'); // eslint-disable-next-line

var BIconFilesAlt = /*#__PURE__*/make_icon_makeIcon('FilesAlt', '<path fill-rule="evenodd" d="M3 1h8a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V3a2 2 0 012-2zm0 1a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V3a1 1 0 00-1-1H3z" clip-rule="evenodd"/><path d="M13 4V3a2 2 0 012 2v6a2 2 0 01-2 2v-1a1 1 0 001-1V5a1 1 0 00-1-1z"/>'); // eslint-disable-next-line

var BIconFilm = /*#__PURE__*/make_icon_makeIcon('Film', '<path fill-rule="evenodd" d="M0 1a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H1a1 1 0 01-1-1V1zm4 0h8v6H4V1zm8 8H4v6h8V9zM1 1h2v2H1V1zm2 3H1v2h2V4zM1 7h2v2H1V7zm2 3H1v2h2v-2zm-2 3h2v2H1v-2zM15 1h-2v2h2V1zm-2 3h2v2h-2V4zm2 3h-2v2h2V7zm-2 3h2v2h-2v-2zm2 3h-2v2h2v-2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconFilter = /*#__PURE__*/make_icon_makeIcon('Filter', '<path fill-rule="evenodd" d="M6 10.5a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3a.5.5 0 01-.5-.5zm-2-3a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm-2-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconFilterLeft = /*#__PURE__*/make_icon_makeIcon('FilterLeft', '<path fill-rule="evenodd" d="M2 10.5a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconFilterRight = /*#__PURE__*/make_icon_makeIcon('FilterRight', '<path fill-rule="evenodd" d="M14 10.5a.5.5 0 00-.5-.5h-3a.5.5 0 000 1h3a.5.5 0 00.5-.5zm0-3a.5.5 0 00-.5-.5h-7a.5.5 0 000 1h7a.5.5 0 00.5-.5zm0-3a.5.5 0 00-.5-.5h-11a.5.5 0 000 1h11a.5.5 0 00.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconFlag = /*#__PURE__*/make_icon_makeIcon('Flag', '<path fill-rule="evenodd" d="M3.5 1a.5.5 0 01.5.5v13a.5.5 0 01-1 0v-13a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M3.762 2.558C4.735 1.909 5.348 1.5 6.5 1.5c.653 0 1.139.325 1.495.562l.032.022c.391.26.646.416.973.416.168 0 .356-.042.587-.126a8.89 8.89 0 00.593-.25c.058-.027.117-.053.18-.08.57-.255 1.278-.544 2.14-.544a.5.5 0 01.5.5v6a.5.5 0 01-.5.5c-.638 0-1.18.21-1.734.457l-.159.07c-.22.1-.453.205-.678.287A2.719 2.719 0 019 9.5c-.653 0-1.139-.325-1.495-.562l-.032-.022c-.391-.26-.646-.416-.973-.416-.833 0-1.218.246-2.223.916a.5.5 0 11-.515-.858C4.735 7.909 5.348 7.5 6.5 7.5c.653 0 1.139.325 1.495.562l.032.022c.391.26.646.416.973.416.168 0 .356-.042.587-.126.187-.068.376-.153.593-.25.058-.027.117-.053.18-.08.456-.204 1-.43 1.64-.512V2.543c-.433.074-.83.234-1.234.414l-.159.07c-.22.1-.453.205-.678.287A2.719 2.719 0 019 3.5c-.653 0-1.139-.325-1.495-.562l-.032-.022c-.391-.26-.646-.416-.973-.416-.833 0-1.218.246-2.223.916a.5.5 0 01-.554-.832l.04-.026z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconFlagFill = /*#__PURE__*/make_icon_makeIcon('FlagFill', '<path fill-rule="evenodd" d="M3.5 1a.5.5 0 01.5.5v13a.5.5 0 01-1 0v-13a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M3.762 2.558C4.735 1.909 5.348 1.5 6.5 1.5c.653 0 1.139.325 1.495.562l.032.022c.391.26.646.416.973.416.168 0 .356-.042.587-.126a8.89 8.89 0 00.593-.25c.058-.027.117-.053.18-.08.57-.255 1.278-.544 2.14-.544a.5.5 0 01.5.5v6a.5.5 0 01-.5.5c-.638 0-1.18.21-1.734.457l-.159.07c-.22.1-.453.205-.678.287A2.719 2.719 0 019 9.5c-.653 0-1.139-.325-1.495-.562l-.032-.022c-.391-.26-.646-.416-.973-.416-.833 0-1.218.246-2.223.916A.5.5 0 013.5 9V3a.5.5 0 01.223-.416l.04-.026z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconFolder = /*#__PURE__*/make_icon_makeIcon('Folder', '<path d="M9.828 4a3 3 0 01-2.12-.879l-.83-.828A1 1 0 006.173 2H2.5a1 1 0 00-1 .981L1.546 4h-1L.5 3a2 2 0 012-2h3.672a2 2 0 011.414.586l.828.828A2 2 0 009.828 3v1z"/><path fill-rule="evenodd" d="M13.81 4H2.19a1 1 0 00-.996 1.09l.637 7a1 1 0 00.995.91h10.348a1 1 0 00.995-.91l.637-7A1 1 0 0013.81 4zM2.19 3A2 2 0 00.198 5.181l.637 7A2 2 0 002.826 14h10.348a2 2 0 001.991-1.819l.637-7A2 2 0 0013.81 3H2.19z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconFolderCheck = /*#__PURE__*/make_icon_makeIcon('FolderCheck', '<path fill-rule="evenodd" d="M9.828 4H2.19a1 1 0 00-.996 1.09l.637 7a1 1 0 00.995.91H9v1H2.826a2 2 0 01-1.991-1.819l-.637-7a1.99 1.99 0 01.342-1.31L.5 3a2 2 0 012-2h3.672a2 2 0 011.414.586l.828.828A2 2 0 009.828 3h3.982a2 2 0 011.992 2.181L15.546 8H14.54l.265-2.91A1 1 0 0013.81 4H9.828zm-2.95-1.707L7.587 3H2.19c-.24 0-.47.042-.684.12L1.5 2.98a1 1 0 011-.98h3.672a1 1 0 01.707.293z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M15.854 10.146a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0l-1.5-1.5a.5.5 0 01.708-.708l1.146 1.147 2.646-2.647a.5.5 0 01.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconFolderFill = /*#__PURE__*/make_icon_makeIcon('FolderFill', '<path fill-rule="evenodd" d="M9.828 3h3.982a2 2 0 011.992 2.181l-.637 7A2 2 0 0113.174 14H2.826a2 2 0 01-1.991-1.819l-.637-7a1.99 1.99 0 01.342-1.31L.5 3a2 2 0 012-2h3.672a2 2 0 011.414.586l.828.828A2 2 0 009.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 006.172 2H2.5a1 1 0 00-1 .981l.006.139z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconFolderMinus = /*#__PURE__*/make_icon_makeIcon('FolderMinus', '<path fill-rule="evenodd" d="M9.828 4H2.19a1 1 0 00-.996 1.09l.637 7a1 1 0 00.995.91H9v1H2.826a2 2 0 01-1.991-1.819l-.637-7a1.99 1.99 0 01.342-1.31L.5 3a2 2 0 012-2h3.672a2 2 0 011.414.586l.828.828A2 2 0 009.828 3h3.982a2 2 0 011.992 2.181L15.546 8H14.54l.265-2.91A1 1 0 0013.81 4H9.828zm-2.95-1.707L7.587 3H2.19c-.24 0-.47.042-.684.12L1.5 2.98a1 1 0 011-.98h3.672a1 1 0 01.707.293z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M11 11.5a.5.5 0 01.5-.5h4a.5.5 0 010 1h-4a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconFolderPlus = /*#__PURE__*/make_icon_makeIcon('FolderPlus', '<path fill-rule="evenodd" d="M9.828 4H2.19a1 1 0 00-.996 1.09l.637 7a1 1 0 00.995.91H9v1H2.826a2 2 0 01-1.991-1.819l-.637-7a1.99 1.99 0 01.342-1.31L.5 3a2 2 0 012-2h3.672a2 2 0 011.414.586l.828.828A2 2 0 009.828 3h3.982a2 2 0 011.992 2.181L15.546 8H14.54l.265-2.91A1 1 0 0013.81 4H9.828zm-2.95-1.707L7.587 3H2.19c-.24 0-.47.042-.684.12L1.5 2.98a1 1 0 011-.98h3.672a1 1 0 01.707.293z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M13.5 10a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-2a.5.5 0 010-1H13v-1.5a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M13 12.5a.5.5 0 01.5-.5h2a.5.5 0 010 1H14v1.5a.5.5 0 01-1 0v-2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconFolderSymlink = /*#__PURE__*/make_icon_makeIcon('FolderSymlink', '<path d="M9.828 4a3 3 0 01-2.12-.879l-.83-.828A1 1 0 006.173 2H2.5a1 1 0 00-1 .981L1.546 4h-1L.5 3a2 2 0 012-2h3.672a2 2 0 011.414.586l.828.828A2 2 0 009.828 3v1z"/><path fill-rule="evenodd" d="M13.81 4H2.19a1 1 0 00-.996 1.09l.637 7a1 1 0 00.995.91h10.348a1 1 0 00.995-.91l.637-7A1 1 0 0013.81 4zM2.19 3A2 2 0 00.198 5.181l.637 7A2 2 0 002.826 14h10.348a2 2 0 001.991-1.819l.637-7A2 2 0 0013.81 3H2.19z" clip-rule="evenodd"/><path d="M8.616 10.24l3.182-1.969a.443.443 0 000-.742l-3.182-1.97c-.27-.166-.616.036-.616.372V6.7c-.857 0-3.429 0-4 4.8 1.429-2.7 4-2.4 4-2.4v.769c0 .336.346.538.616.371z"/>'); // eslint-disable-next-line

var BIconFolderSymlinkFill = /*#__PURE__*/make_icon_makeIcon('FolderSymlinkFill', '<path fill-rule="evenodd" d="M13.81 3H9.828a2 2 0 01-1.414-.586l-.828-.828A2 2 0 006.172 1H2.5a2 2 0 00-2 2l.04.87a1.99 1.99 0 00-.342 1.311l.637 7A2 2 0 002.826 14h10.348a2 2 0 001.991-1.819l.637-7A2 2 0 0013.81 3zM2.19 3c-.24 0-.47.042-.684.12L1.5 2.98a1 1 0 011-.98h3.672a1 1 0 01.707.293L7.586 3H2.19zm9.608 5.271l-3.182 1.97c-.27.166-.616-.036-.616-.372V9.1s-2.571-.3-4 2.4c.571-4.8 3.143-4.8 4-4.8v-.769c0-.336.346-.538.616-.371l3.182 1.969c.27.166.27.576 0 .742z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconFonts = /*#__PURE__*/make_icon_makeIcon('Fonts', '<path d="M12.258 3H3.747l-.082 2.46h.479c.26-1.544.758-1.783 2.693-1.845l.424-.013v7.827c0 .663-.144.82-1.3.923v.52h4.082v-.52c-1.162-.103-1.306-.26-1.306-.923V3.602l.43.013c1.935.062 2.434.301 2.694 1.846h.479L12.258 3z"/>'); // eslint-disable-next-line

var BIconForward = /*#__PURE__*/make_icon_makeIcon('Forward', '<path fill-rule="evenodd" d="M9.502 5.513a.144.144 0 00-.202.134V6.65a.5.5 0 01-.5.5H2.5v2.9h6.3a.5.5 0 01.5.5v1.003c0 .108.11.176.202.134l3.984-2.933a.51.51 0 01.042-.028.147.147 0 000-.252.51.51 0 01-.042-.028L9.502 5.513zM8.3 5.647a1.144 1.144 0 011.767-.96l3.994 2.94a1.147 1.147 0 010 1.946l-3.994 2.94a1.144 1.144 0 01-1.767-.96v-.503H2a.5.5 0 01-.5-.5v-3.9a.5.5 0 01.5-.5h6.3v-.503z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconForwardFill = /*#__PURE__*/make_icon_makeIcon('ForwardFill', '<path d="M9.77 12.11l4.012-2.953a.647.647 0 000-1.114L9.771 5.09a.644.644 0 00-.971.557V6.65H2v3.9h6.8v1.003c0 .505.545.808.97.557z"/>'); // eslint-disable-next-line

var BIconFullscreen = /*#__PURE__*/make_icon_makeIcon('Fullscreen', '<path fill-rule="evenodd" d="M1.5 1a.5.5 0 00-.5.5v4a.5.5 0 01-1 0v-4A1.5 1.5 0 011.5 0h4a.5.5 0 010 1h-4zM10 .5a.5.5 0 01.5-.5h4A1.5 1.5 0 0116 1.5v4a.5.5 0 01-1 0v-4a.5.5 0 00-.5-.5h-4a.5.5 0 01-.5-.5zM.5 10a.5.5 0 01.5.5v4a.5.5 0 00.5.5h4a.5.5 0 010 1h-4A1.5 1.5 0 010 14.5v-4a.5.5 0 01.5-.5zm15 0a.5.5 0 01.5.5v4a1.5 1.5 0 01-1.5 1.5h-4a.5.5 0 010-1h4a.5.5 0 00.5-.5v-4a.5.5 0 01.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconFullscreenExit = /*#__PURE__*/make_icon_makeIcon('FullscreenExit', '<path fill-rule="evenodd" d="M5.5 0a.5.5 0 01.5.5v4A1.5 1.5 0 014.5 6h-4a.5.5 0 010-1h4a.5.5 0 00.5-.5v-4a.5.5 0 01.5-.5zm5 0a.5.5 0 01.5.5v4a.5.5 0 00.5.5h4a.5.5 0 010 1h-4A1.5 1.5 0 0110 4.5v-4a.5.5 0 01.5-.5zM0 10.5a.5.5 0 01.5-.5h4A1.5 1.5 0 016 11.5v4a.5.5 0 01-1 0v-4a.5.5 0 00-.5-.5h-4a.5.5 0 01-.5-.5zm10 1a1.5 1.5 0 011.5-1.5h4a.5.5 0 010 1h-4a.5.5 0 00-.5.5v4a.5.5 0 01-1 0v-4z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconFunnel = /*#__PURE__*/make_icon_makeIcon('Funnel', '<path fill-rule="evenodd" d="M1.5 1.5A.5.5 0 012 1h12a.5.5 0 01.5.5v2a.5.5 0 01-.128.334L10 8.692V13.5a.5.5 0 01-.342.474l-3 1A.5.5 0 016 14.5V8.692L1.628 3.834A.5.5 0 011.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 017 8.5v5.306l2-.666V8.5a.5.5 0 01.128-.334L13.5 3.308V2h-11z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconFunnelFill = /*#__PURE__*/make_icon_makeIcon('FunnelFill', '<path d="M2 3.5v-2h12v2l-4.5 5v5l-3 1v-6L2 3.5z"/><path fill-rule="evenodd" d="M1.5 1.5A.5.5 0 012 1h12a.5.5 0 01.5.5v2a.5.5 0 01-.128.334L10 8.692V13.5a.5.5 0 01-.342.474l-3 1A.5.5 0 016 14.5V8.692L1.628 3.834A.5.5 0 011.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 017 8.5v5.306l2-.666V8.5a.5.5 0 01.128-.334L13.5 3.308V2h-11z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconGear = /*#__PURE__*/make_icon_makeIcon('Gear', '<path fill-rule="evenodd" d="M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 014.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 01-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 011.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 012.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 012.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 011.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 01-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 018.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 001.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 00.52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 00-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 00-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 00-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 00-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 00.52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 001.255-.52l.094-.319z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 5.754a2.246 2.246 0 100 4.492 2.246 2.246 0 000-4.492zM4.754 8a3.246 3.246 0 116.492 0 3.246 3.246 0 01-6.492 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconGearFill = /*#__PURE__*/make_icon_makeIcon('GearFill', '<path fill-rule="evenodd" d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 01-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 01.872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 012.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 012.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 01.872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 01-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 01-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 100-5.86 2.929 2.929 0 000 5.858z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconGearWide = /*#__PURE__*/make_icon_makeIcon('GearWide', '<path fill-rule="evenodd" d="M9.928 1.723c-.243-.97-1.62-.97-1.863 0l-.072.286a.96.96 0 01-1.622.435l-.204-.212c-.695-.718-1.889-.03-1.614.932l.08.283a.96.96 0 01-1.186 1.187l-.283-.081c-.961-.275-1.65.919-.932 1.614l.212.204a.96.96 0 01-.435 1.622l-.286.072c-.97.242-.97 1.62 0 1.863l.286.071a.96.96 0 01.435 1.622l-.212.205c-.718.695-.03 1.888.932 1.613l.283-.08a.96.96 0 011.187 1.187l-.081.283c-.275.96.919 1.65 1.614.931l.204-.211a.96.96 0 011.622.434l.072.286c.242.97 1.62.97 1.863 0l.071-.286a.96.96 0 011.622-.434l.205.212c.695.718 1.888.029 1.613-.932l-.08-.283a.96.96 0 011.187-1.188l.283.081c.96.275 1.65-.918.931-1.613l-.211-.205A.96.96 0 0115.983 10l.286-.071c.97-.243.97-1.62 0-1.863l-.286-.072a.96.96 0 01-.434-1.622l.212-.204c.718-.695.029-1.889-.932-1.614l-.283.08a.96.96 0 01-1.188-1.186l.081-.283c.275-.961-.918-1.65-1.613-.932l-.205.212A.96.96 0 0110 2.009l-.071-.286zm-.932 12.27a4.998 4.998 0 100-9.994 4.998 4.998 0 000 9.995z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconGearWideConnected = /*#__PURE__*/make_icon_makeIcon('GearWideConnected', '<path fill-rule="evenodd" d="M9.928 1.723c-.243-.97-1.62-.97-1.863 0l-.072.286a.96.96 0 01-1.622.435l-.204-.212c-.695-.718-1.889-.03-1.614.932l.08.283a.96.96 0 01-1.186 1.187l-.283-.081c-.961-.275-1.65.919-.932 1.614l.212.204a.96.96 0 01-.435 1.622l-.286.072c-.97.242-.97 1.62 0 1.863l.286.071a.96.96 0 01.435 1.622l-.212.205c-.718.695-.03 1.888.932 1.613l.283-.08a.96.96 0 011.187 1.187l-.081.283c-.275.96.919 1.65 1.614.931l.204-.211a.96.96 0 011.622.434l.072.286c.242.97 1.62.97 1.863 0l.071-.286a.96.96 0 011.622-.434l.205.212c.695.718 1.888.029 1.613-.932l-.08-.283a.96.96 0 011.187-1.188l.283.081c.96.275 1.65-.918.931-1.613l-.211-.205A.96.96 0 0115.983 10l.286-.071c.97-.243.97-1.62 0-1.863l-.286-.072a.96.96 0 01-.434-1.622l.212-.204c.718-.695.029-1.889-.932-1.614l-.283.08a.96.96 0 01-1.188-1.186l.081-.283c.275-.961-.918-1.65-1.613-.932l-.205.212A.96.96 0 0110 2.009l-.071-.286zm-.932 12.27a4.998 4.998 0 100-9.994 4.998 4.998 0 000 9.995z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8.372 8.996L5.598 5.298l.8-.6 2.848 3.798h4.748v1H9.246l-2.849 3.798-.8-.6 2.775-3.698z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconGem = /*#__PURE__*/make_icon_makeIcon('Gem', '<path fill-rule="evenodd" d="M3.1.7a.5.5 0 01.4-.2h9a.5.5 0 01.4.2l2.976 3.974c.149.185.156.45.01.644L8.4 15.3a.5.5 0 01-.8 0L.1 5.3a.5.5 0 010-.6l3-4zm11.386 3.785l-1.806-2.41-.776 2.413 2.582-.003zm-3.633.004l.961-2.989H4.186l.963 2.995 5.704-.006zM5.47 5.495l5.062-.005L8 13.366 5.47 5.495zm-1.371-.999l-.78-2.422-1.818 2.425 2.598-.003zM1.499 5.5l2.92-.003 2.193 6.82L1.5 5.5zm7.889 6.817l2.194-6.828 2.929-.003-5.123 6.831z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconGeo = /*#__PURE__*/make_icon_makeIcon('Geo', '<path d="M11 4a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M7.5 4h1v9a.5.5 0 01-1 0V4z"/><path fill-rule="evenodd" d="M6.489 12.095a.5.5 0 01-.383.594c-.565.123-1.003.292-1.286.472-.302.192-.32.321-.32.339 0 .013.005.085.146.21.14.124.372.26.701.382.655.246 1.593.408 2.653.408s1.998-.162 2.653-.408c.329-.123.56-.258.701-.382.14-.125.146-.197.146-.21 0-.018-.018-.147-.32-.339-.283-.18-.721-.35-1.286-.472a.5.5 0 11.212-.977c.63.137 1.193.34 1.61.606.4.253.784.645.784 1.182 0 .402-.219.724-.483.958-.264.235-.618.423-1.013.57-.793.298-1.855.472-3.004.472s-2.21-.174-3.004-.471c-.395-.148-.749-.336-1.013-.571-.264-.234-.483-.556-.483-.958 0-.537.384-.929.783-1.182.418-.266.98-.47 1.611-.606a.5.5 0 01.595.383z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconGeoAlt = /*#__PURE__*/make_icon_makeIcon('GeoAlt', '<path fill-rule="evenodd" d="M8 16s6-5.686 6-10A6 6 0 002 6c0 4.314 6 10 6 10zm0-7a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconGift = /*#__PURE__*/make_icon_makeIcon('Gift', '<path fill-rule="evenodd" d="M2 6v8.5a.5.5 0 00.5.5h11a.5.5 0 00.5-.5V6h1v8.5a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 011 14.5V6h1zm8-5a1.5 1.5 0 00-1.5 1.5c0 .098.033.16.12.227.103.081.272.15.49.2A3.44 3.44 0 009.96 3h.015L10 2.999l.025.002h.014A2.569 2.569 0 0010.293 3c.17-.006.387-.026.598-.073.217-.048.386-.118.49-.199.086-.066.119-.13.119-.227A1.5 1.5 0 0010 1zm0 3h-.006a3.535 3.535 0 01-.326 0 4.435 4.435 0 01-.777-.097c-.283-.063-.614-.175-.885-.385A1.255 1.255 0 017.5 2.5a2.5 2.5 0 015 0c0 .454-.217.793-.506 1.017-.27.21-.602.322-.885.385a4.434 4.434 0 01-1.104.099H10z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M6 1a1.5 1.5 0 00-1.5 1.5c0 .098.033.16.12.227.103.081.272.15.49.2A3.44 3.44 0 005.96 3h.015L6 2.999l.025.002h.014l.053.001a3.869 3.869 0 00.799-.076c.217-.048.386-.118.49-.199.086-.066.119-.13.119-.227A1.5 1.5 0 006 1zm0 3h-.006a3.535 3.535 0 01-.326 0 4.435 4.435 0 01-.777-.097c-.283-.063-.614-.175-.885-.385A1.255 1.255 0 013.5 2.5a2.5 2.5 0 015 0c0 .454-.217.793-.506 1.017-.27.21-.602.322-.885.385a4.435 4.435 0 01-1.103.099H6zm1.5 12V6h1v10h-1z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M15 4H1v1h14V4zM1 3a1 1 0 00-1 1v1a1 1 0 001 1h14a1 1 0 001-1V4a1 1 0 00-1-1H1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconGiftFill = /*#__PURE__*/make_icon_makeIcon('GiftFill', '<path fill-rule="evenodd" d="M10 1a1.5 1.5 0 00-1.5 1.5c0 .098.033.16.12.227.103.081.272.15.49.2A3.44 3.44 0 009.96 3h.015L10 2.999l.025.002h.014A2.569 2.569 0 0010.293 3c.17-.006.387-.026.598-.073.217-.048.386-.118.49-.199.086-.066.119-.13.119-.227A1.5 1.5 0 0010 1zm0 3h-.006a3.535 3.535 0 01-.326 0 4.435 4.435 0 01-.777-.097c-.283-.063-.614-.175-.885-.385A1.255 1.255 0 017.5 2.5a2.5 2.5 0 015 0c0 .454-.217.793-.506 1.017-.27.21-.602.322-.885.385a4.434 4.434 0 01-1.104.099H10z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M6 1a1.5 1.5 0 00-1.5 1.5c0 .098.033.16.12.227.103.081.272.15.49.2A3.44 3.44 0 005.96 3h.015L6 2.999l.025.002h.014l.053.001a3.869 3.869 0 00.799-.076c.217-.048.386-.118.49-.199.086-.066.119-.13.119-.227A1.5 1.5 0 006 1zm0 3h-.006a3.535 3.535 0 01-.326 0 4.435 4.435 0 01-.777-.097c-.283-.063-.614-.175-.885-.385A1.255 1.255 0 013.5 2.5a2.5 2.5 0 015 0c0 .454-.217.793-.506 1.017-.27.21-.602.322-.885.385a4.435 4.435 0 01-1.103.099H6zm9 10.5V7H8.5v9h5a1.5 1.5 0 001.5-1.5zM7.5 16h-5A1.5 1.5 0 011 14.5V7h6.5v9z" clip-rule="evenodd"/><path d="M0 4a1 1 0 011-1h14a1 1 0 011 1v1a1 1 0 01-1 1H1a1 1 0 01-1-1V4z"/>'); // eslint-disable-next-line

var BIconGraphDown = /*#__PURE__*/make_icon_makeIcon('GraphDown', '<path d="M0 0h1v16H0V0zm1 15h15v1H1v-1z"/><path fill-rule="evenodd" d="M14.39 9.041l-4.349-5.436L7 6.646 3.354 3l-.708.707L7 8.061l2.959-2.959 3.65 4.564.781-.625z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10 9.854a.5.5 0 00.5.5h4a.5.5 0 00.5-.5v-4a.5.5 0 00-1 0v3.5h-3.5a.5.5 0 00-.5.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconGraphUp = /*#__PURE__*/make_icon_makeIcon('GraphUp', '<path d="M0 0h1v16H0V0zm1 15h15v1H1v-1z"/><path fill-rule="evenodd" d="M14.39 4.312L10.041 9.75 7 6.707l-3.646 3.647-.708-.708L7 5.293 9.959 8.25l3.65-4.563.781.624z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10 3.5a.5.5 0 01.5-.5h4a.5.5 0 01.5.5v4a.5.5 0 01-1 0V4h-3.5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconGrid = /*#__PURE__*/make_icon_makeIcon('Grid', '<path fill-rule="evenodd" d="M1 2.5A1.5 1.5 0 012.5 1h3A1.5 1.5 0 017 2.5v3A1.5 1.5 0 015.5 7h-3A1.5 1.5 0 011 5.5v-3zM2.5 2a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5h-3zm6.5.5A1.5 1.5 0 0110.5 1h3A1.5 1.5 0 0115 2.5v3A1.5 1.5 0 0113.5 7h-3A1.5 1.5 0 019 5.5v-3zm1.5-.5a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5h-3zM1 10.5A1.5 1.5 0 012.5 9h3A1.5 1.5 0 017 10.5v3A1.5 1.5 0 015.5 15h-3A1.5 1.5 0 011 13.5v-3zm1.5-.5a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5h-3zm6.5.5A1.5 1.5 0 0110.5 9h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 019 13.5v-3zm1.5-.5a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5h-3z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconGrid1x2 = /*#__PURE__*/make_icon_makeIcon('Grid1x2', '<path fill-rule="evenodd" d="M6 1H1v14h5V1zm9 0h-5v5h5V1zm0 9h-5v5h5v-5zM0 1a1 1 0 011-1h5a1 1 0 011 1v14a1 1 0 01-1 1H1a1 1 0 01-1-1V1zm9 0a1 1 0 011-1h5a1 1 0 011 1v5a1 1 0 01-1 1h-5a1 1 0 01-1-1V1zm1 8a1 1 0 00-1 1v5a1 1 0 001 1h5a1 1 0 001-1v-5a1 1 0 00-1-1h-5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconGrid1x2Fill = /*#__PURE__*/make_icon_makeIcon('Grid1x2Fill', '<path d="M0 1a1 1 0 011-1h5a1 1 0 011 1v14a1 1 0 01-1 1H1a1 1 0 01-1-1V1zm9 0a1 1 0 011-1h5a1 1 0 011 1v5a1 1 0 01-1 1h-5a1 1 0 01-1-1V1zm0 9a1 1 0 011-1h5a1 1 0 011 1v5a1 1 0 01-1 1h-5a1 1 0 01-1-1v-5z"/>'); // eslint-disable-next-line

var BIconGrid3x2 = /*#__PURE__*/make_icon_makeIcon('Grid3x2', '<path fill-rule="evenodd" d="M0 3.5A1.5 1.5 0 011.5 2h13A1.5 1.5 0 0116 3.5v8a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 010 11.5v-8zM1.5 3a.5.5 0 00-.5.5V7h4V3H1.5zM5 8H1v3.5a.5.5 0 00.5.5H5V8zm1 0h4v4H6V8zm4-1H6V3h4v4zm1 1v4h3.5a.5.5 0 00.5-.5V8h-4zm0-1V3h3.5a.5.5 0 01.5.5V7h-4z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconGrid3x2Gap = /*#__PURE__*/make_icon_makeIcon('Grid3x2Gap', '<path stroke="currentColor" d="M1.5 4a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v2a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5V4zm5 0a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v2a.5.5 0 01-.5.5H7a.5.5 0 01-.5-.5V4zm5 0a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5V4zm-10 5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v2a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5V9zm5 0a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v2a.5.5 0 01-.5.5H7a.5.5 0 01-.5-.5V9zm5 0a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5V9z"/>'); // eslint-disable-next-line

var BIconGrid3x2GapFill = /*#__PURE__*/make_icon_makeIcon('Grid3x2GapFill', '<path d="M1 4a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H2a1 1 0 01-1-1V4zm5 0a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H7a1 1 0 01-1-1V4zm5 0a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V4zM1 9a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H2a1 1 0 01-1-1V9zm5 0a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H7a1 1 0 01-1-1V9zm5 0a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V9z"/>'); // eslint-disable-next-line

var BIconGrid3x3 = /*#__PURE__*/make_icon_makeIcon('Grid3x3', '<path fill-rule="evenodd" d="M0 1.5A1.5 1.5 0 011.5 0h13A1.5 1.5 0 0116 1.5v13a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 010 14.5v-13zM1.5 1a.5.5 0 00-.5.5V5h4V1H1.5zM5 6H1v4h4V6zm1 4V6h4v4H6zm-1 1H1v3.5a.5.5 0 00.5.5H5v-4zm1 0h4v4H6v-4zm5 0v4h3.5a.5.5 0 00.5-.5V11h-4zm0-1h4V6h-4v4zm0-5h4V1.5a.5.5 0 00-.5-.5H11v4zm-1 0H6V1h4v4z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconGrid3x3Gap = /*#__PURE__*/make_icon_makeIcon('Grid3x3Gap', '<path stroke="currentColor" d="M1.5 2a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v2a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5V2zm5 0a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v2a.5.5 0 01-.5.5H7a.5.5 0 01-.5-.5V2zm5 0a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5V2zm-10 5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v2a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5V7zm5 0a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v2a.5.5 0 01-.5.5H7a.5.5 0 01-.5-.5V7zm5 0a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5V7zm-10 5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v2a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5v-2zm5 0a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v2a.5.5 0 01-.5.5H7a.5.5 0 01-.5-.5v-2zm5 0a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5v-2z"/>'); // eslint-disable-next-line

var BIconGrid3x3GapFill = /*#__PURE__*/make_icon_makeIcon('Grid3x3GapFill', '<path d="M1 2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H2a1 1 0 01-1-1V2zm5 0a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H7a1 1 0 01-1-1V2zm5 0a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V2zM1 7a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H2a1 1 0 01-1-1V7zm5 0a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H7a1 1 0 01-1-1V7zm5 0a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V7zM1 12a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H2a1 1 0 01-1-1v-2zm5 0a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H7a1 1 0 01-1-1v-2zm5 0a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2z"/>'); // eslint-disable-next-line

var BIconGridFill = /*#__PURE__*/make_icon_makeIcon('GridFill', '<path fill-rule="evenodd" d="M1 2.5A1.5 1.5 0 012.5 1h3A1.5 1.5 0 017 2.5v3A1.5 1.5 0 015.5 7h-3A1.5 1.5 0 011 5.5v-3zm8 0A1.5 1.5 0 0110.5 1h3A1.5 1.5 0 0115 2.5v3A1.5 1.5 0 0113.5 7h-3A1.5 1.5 0 019 5.5v-3zm-8 8A1.5 1.5 0 012.5 9h3A1.5 1.5 0 017 10.5v3A1.5 1.5 0 015.5 15h-3A1.5 1.5 0 011 13.5v-3zm8 0A1.5 1.5 0 0110.5 9h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 019 13.5v-3z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconHammer = /*#__PURE__*/make_icon_makeIcon('Hammer', '<path d="M9.812 1.952a.5.5 0 01-.312.89c-1.671 0-2.852.596-3.616 1.185L4.857 5.073V6.21a.5.5 0 01-.146.354L3.425 7.853a.5.5 0 01-.708 0L.146 5.274a.5.5 0 010-.706l1.286-1.29a.5.5 0 01.354-.146H2.84C4.505 1.228 6.216.862 7.557 1.04a5.009 5.009 0 012.077.782l.178.129z"/><path fill-rule="evenodd" d="M6.012 3.5a.5.5 0 01.359.165l9.146 8.646A.5.5 0 0115.5 13L14 14.5a.5.5 0 01-.756-.056L4.598 5.297a.5.5 0 01.048-.65l1-1a.5.5 0 01.366-.147z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconHash = /*#__PURE__*/make_icon_makeIcon('Hash', '<path d="M8.39 12.648a1.32 1.32 0 00-.015.18c0 .305.21.508.5.508.266 0 .492-.172.555-.477l.554-2.703h1.204c.421 0 .617-.234.617-.547 0-.312-.188-.53-.617-.53h-.985l.516-2.524h1.265c.43 0 .618-.227.618-.547 0-.313-.188-.524-.618-.524h-1.046l.476-2.304a1.06 1.06 0 00.016-.164.51.51 0 00-.516-.516.54.54 0 00-.539.43l-.523 2.554H7.617l.477-2.304c.008-.04.015-.118.015-.164a.512.512 0 00-.523-.516.539.539 0 00-.531.43L6.53 5.484H5.414c-.43 0-.617.22-.617.532 0 .312.187.539.617.539h.906l-.515 2.523H4.609c-.421 0-.609.219-.609.531 0 .313.188.547.61.547h.976l-.516 2.492c-.008.04-.015.125-.015.18 0 .305.21.508.5.508.265 0 .492-.172.554-.477l.555-2.703h2.242l-.515 2.492zm-1-6.109h2.266l-.515 2.563H6.859l.532-2.563z"/>'); // eslint-disable-next-line

var BIconHeart = /*#__PURE__*/make_icon_makeIcon('Heart', '<path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 01.176-.17C12.72-3.042 23.333 4.867 8 15z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconHeartFill = /*#__PURE__*/make_icon_makeIcon('HeartFill', '<path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconHeartHalf = /*#__PURE__*/make_icon_makeIcon('HeartHalf', '<path fill-rule="evenodd" d="M8 1.314C3.562-3.248-7.534 4.735 8 15V1.314z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 01.176-.17C12.72-3.042 23.333 4.867 8 15z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconHouse = /*#__PURE__*/make_icon_makeIcon('House', '<path fill-rule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 00.5.5h9a.5.5 0 00.5-.5V7h1v6.5a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 012 13.5zm11-11V6l-2-2V2.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.293 1.5a1 1 0 011.414 0l6.647 6.646a.5.5 0 01-.708.708L8 2.207 1.354 8.854a.5.5 0 11-.708-.708L7.293 1.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconHouseDoor = /*#__PURE__*/make_icon_makeIcon('HouseDoor', '<path fill-rule="evenodd" d="M7.646 1.146a.5.5 0 01.708 0l6 6a.5.5 0 01.146.354v7a.5.5 0 01-.5.5H9.5a.5.5 0 01-.5-.5v-4H7v4a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5v-7a.5.5 0 01.146-.354l6-6zM2.5 7.707V14H6v-4a.5.5 0 01.5-.5h3a.5.5 0 01.5.5v4h3.5V7.707L8 2.207l-5.5 5.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M13 2.5V6l-2-2V2.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconHouseDoorFill = /*#__PURE__*/make_icon_makeIcon('HouseDoorFill', '<path d="M6.5 10.995V14.5a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5v-7a.5.5 0 01.146-.354l6-6a.5.5 0 01.708 0l6 6a.5.5 0 01.146.354v7a.5.5 0 01-.5.5h-4a.5.5 0 01-.5-.5V11c0-.25-.25-.5-.5-.5H7c-.25 0-.5.25-.5.495z"/><path fill-rule="evenodd" d="M13 2.5V6l-2-2V2.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconHouseFill = /*#__PURE__*/make_icon_makeIcon('HouseFill', '<path fill-rule="evenodd" d="M8 3.293l6 6V13.5a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 012 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.293 1.5a1 1 0 011.414 0l6.647 6.646a.5.5 0 01-.708.708L8 2.207 1.354 8.854a.5.5 0 11-.708-.708L7.293 1.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconHr = /*#__PURE__*/make_icon_makeIcon('Hr', '<path fill-rule="evenodd" d="M0 8a.5.5 0 01.5-.5h15a.5.5 0 010 1H.5A.5.5 0 010 8z" clip-rule="evenodd"/><path d="M4 3h8a1 1 0 011 1v2.5h1V4a2 2 0 00-2-2H4a2 2 0 00-2 2v2.5h1V4a1 1 0 011-1zM3 9.5H2V12a2 2 0 002 2h8a2 2 0 002-2V9.5h-1V12a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>'); // eslint-disable-next-line

var BIconImage = /*#__PURE__*/make_icon_makeIcon('Image', '<path fill-rule="evenodd" d="M14.002 2h-12a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V3a1 1 0 00-1-1zm-12-1a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V3a2 2 0 00-2-2h-12z" clip-rule="evenodd"/><path d="M10.648 7.646a.5.5 0 01.577-.093L15.002 9.5V14h-14v-2l2.646-2.354a.5.5 0 01.63-.062l2.66 1.773 3.71-3.71z"/><path fill-rule="evenodd" d="M4.502 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconImageAlt = /*#__PURE__*/make_icon_makeIcon('ImageAlt', '<path d="M10.648 6.646a.5.5 0 01.577-.093l4.777 3.947V15a1 1 0 01-1 1h-14a1 1 0 01-1-1v-2l3.646-4.354a.5.5 0 01.63-.062l2.66 2.773 3.71-4.71z"/><path fill-rule="evenodd" d="M4.5 5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconImageFill = /*#__PURE__*/make_icon_makeIcon('ImageFill', '<path fill-rule="evenodd" d="M.002 3a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2h-12a2 2 0 01-2-2V3zm1 9l2.646-2.354a.5.5 0 01.63-.062l2.66 1.773 3.71-3.71a.5.5 0 01.577-.094L15.002 9.5V13a1 1 0 01-1 1h-12a1 1 0 01-1-1v-1zm5-6.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconImages = /*#__PURE__*/make_icon_makeIcon('Images', '<path fill-rule="evenodd" d="M12.002 4h-10a1 1 0 00-1 1v8a1 1 0 001 1h10a1 1 0 001-1V5a1 1 0 00-1-1zm-10-1a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2h-10z" clip-rule="evenodd"/><path d="M10.648 8.646a.5.5 0 01.577-.093l1.777 1.947V14h-12v-1l2.646-2.354a.5.5 0 01.63-.062l2.66 1.773 3.71-3.71z"/><path fill-rule="evenodd" d="M4.502 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM4 2h10a1 1 0 011 1v8a1 1 0 01-1 1v1a2 2 0 002-2V3a2 2 0 00-2-2H4a2 2 0 00-2 2h1a1 1 0 011-1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconInbox = /*#__PURE__*/make_icon_makeIcon('Inbox', '<path fill-rule="evenodd" d="M3.81 4.063A1.5 1.5 0 014.98 3.5h6.04a1.5 1.5 0 011.17.563l3.7 4.625a.5.5 0 01-.78.624l-3.7-4.624a.5.5 0 00-.39-.188H4.98a.5.5 0 00-.39.188L.89 9.312a.5.5 0 11-.78-.624l3.7-4.625z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M.125 8.67A.5.5 0 01.5 8.5H6a.5.5 0 01.5.5 1.5 1.5 0 003 0 .5.5 0 01.5-.5h5.5a.5.5 0 01.496.562l-.39 3.124a1.5 1.5 0 01-1.489 1.314H1.883a1.5 1.5 0 01-1.489-1.314l-.39-3.124a.5.5 0 01.121-.393zm.941.83l.32 2.562a.5.5 0 00.497.438h12.234a.5.5 0 00.496-.438l.32-2.562H10.45a2.5 2.5 0 01-4.9 0H1.066z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconInboxFill = /*#__PURE__*/make_icon_makeIcon('InboxFill', '<path fill-rule="evenodd" d="M3.81 4.063A1.5 1.5 0 014.98 3.5h6.04a1.5 1.5 0 011.17.563l3.7 4.625a.5.5 0 01-.78.624l-3.7-4.624a.5.5 0 00-.39-.188H4.98a.5.5 0 00-.39.188L.89 9.312a.5.5 0 11-.78-.624l3.7-4.625z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M.125 8.67A.5.5 0 01.5 8.5h5A.5.5 0 016 9c0 .828.625 2 2 2s2-1.172 2-2a.5.5 0 01.5-.5h5a.5.5 0 01.496.562l-.39 3.124a1.5 1.5 0 01-1.489 1.314H1.883a1.5 1.5 0 01-1.489-1.314l-.39-3.124a.5.5 0 01.121-.393z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconInboxes = /*#__PURE__*/make_icon_makeIcon('Inboxes', '<path fill-rule="evenodd" d="M.125 11.17A.5.5 0 01.5 11H6a.5.5 0 01.5.5 1.5 1.5 0 003 0 .5.5 0 01.5-.5h5.5a.5.5 0 01.496.562l-.39 3.124A1.5 1.5 0 0114.117 16H1.883a1.5 1.5 0 01-1.489-1.314l-.39-3.124a.5.5 0 01.121-.393zm.941.83l.32 2.562a.5.5 0 00.497.438h12.234a.5.5 0 00.496-.438l.32-2.562H10.45a2.5 2.5 0 01-4.9 0H1.066zM3.81.563A1.5 1.5 0 014.98 0h6.04a1.5 1.5 0 011.17.563l3.7 4.625a.5.5 0 01-.78.624l-3.7-4.624A.5.5 0 0011.02 1H4.98a.5.5 0 00-.39.188L.89 5.812a.5.5 0 11-.78-.624L3.81.563z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M.125 5.17A.5.5 0 01.5 5H6a.5.5 0 01.5.5 1.5 1.5 0 003 0A.5.5 0 0110 5h5.5a.5.5 0 01.496.562l-.39 3.124A1.5 1.5 0 0114.117 10H1.883A1.5 1.5 0 01.394 8.686l-.39-3.124a.5.5 0 01.121-.393zm.941.83l.32 2.562A.5.5 0 001.884 9h12.234a.5.5 0 00.496-.438L14.933 6H10.45a2.5 2.5 0 01-4.9 0H1.066z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconInboxesFill = /*#__PURE__*/make_icon_makeIcon('InboxesFill', '<path fill-rule="evenodd" d="M.125 11.17A.5.5 0 01.5 11H6a.5.5 0 01.5.5 1.5 1.5 0 003 0 .5.5 0 01.5-.5h5.5a.5.5 0 01.496.562l-.39 3.124A1.5 1.5 0 0114.117 16H1.883a1.5 1.5 0 01-1.489-1.314l-.39-3.124a.5.5 0 01.121-.393zM3.81.563A1.5 1.5 0 014.98 0h6.04a1.5 1.5 0 011.17.563l3.7 4.625a.5.5 0 01-.78.624l-3.7-4.624A.5.5 0 0011.02 1H4.98a.5.5 0 00-.39.188L.89 5.812a.5.5 0 11-.78-.624L3.81.563z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M.125 5.17A.5.5 0 01.5 5H6a.5.5 0 01.5.5 1.5 1.5 0 003 0A.5.5 0 0110 5h5.5a.5.5 0 01.496.562l-.39 3.124A1.5 1.5 0 0114.117 10H1.883A1.5 1.5 0 01.394 8.686l-.39-3.124a.5.5 0 01.121-.393z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconInfo = /*#__PURE__*/make_icon_makeIcon('Info', '<path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z"/><circle cx="8" cy="4.5" r="1"/>'); // eslint-disable-next-line

var BIconInfoCircle = /*#__PURE__*/make_icon_makeIcon('InfoCircle', '<path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/><path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z"/><circle cx="8" cy="4.5" r="1"/>'); // eslint-disable-next-line

var BIconInfoCircleFill = /*#__PURE__*/make_icon_makeIcon('InfoCircleFill', '<path fill-rule="evenodd" d="M8 16A8 8 0 108 0a8 8 0 000 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconInfoSquare = /*#__PURE__*/make_icon_makeIcon('InfoSquare', '<path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z"/><circle cx="8" cy="4.5" r="1"/>'); // eslint-disable-next-line

var BIconInfoSquareFill = /*#__PURE__*/make_icon_makeIcon('InfoSquareFill', '<path fill-rule="evenodd" d="M0 2a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H2a2 2 0 01-2-2V2zm8.93 4.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconIntersect = /*#__PURE__*/make_icon_makeIcon('Intersect', '<path fill-rule="evenodd" d="M12 4v6.5a1.5 1.5 0 01-1.5 1.5H4V5.5A1.5 1.5 0 015.5 4H12z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M14.5 5h-9a.5.5 0 00-.5.5v9a.5.5 0 00.5.5h9a.5.5 0 00.5-.5v-9a.5.5 0 00-.5-.5zm-9-1A1.5 1.5 0 004 5.5v9A1.5 1.5 0 005.5 16h9a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0014.5 4h-9z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10.5 1h-9a.5.5 0 00-.5.5v9a.5.5 0 00.5.5h9a.5.5 0 00.5-.5v-9a.5.5 0 00-.5-.5zm-9-1A1.5 1.5 0 000 1.5v9A1.5 1.5 0 001.5 12h9a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0010.5 0h-9z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconJustify = /*#__PURE__*/make_icon_makeIcon('Justify', '<path fill-rule="evenodd" d="M2 12.5a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconJustifyLeft = /*#__PURE__*/make_icon_makeIcon('JustifyLeft', '<path fill-rule="evenodd" d="M2 12.5a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconJustifyRight = /*#__PURE__*/make_icon_makeIcon('JustifyRight', '<path fill-rule="evenodd" d="M6 12.5a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm-4-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconKanban = /*#__PURE__*/make_icon_makeIcon('Kanban', '<path fill-rule="evenodd" d="M13.5 1h-11a1 1 0 00-1 1v12a1 1 0 001 1h11a1 1 0 001-1V2a1 1 0 00-1-1zm-11-1a2 2 0 00-2 2v12a2 2 0 002 2h11a2 2 0 002-2V2a2 2 0 00-2-2h-11z" clip-rule="evenodd"/><rect width="3" height="5" x="6.5" y="2" rx="1"/><rect width="3" height="9" x="2.5" y="2" rx="1"/><rect width="3" height="12" x="10.5" y="2" rx="1"/>'); // eslint-disable-next-line

var BIconKanbanFill = /*#__PURE__*/make_icon_makeIcon('KanbanFill', '<path fill-rule="evenodd" d="M2.5 0a2 2 0 00-2 2v12a2 2 0 002 2h11a2 2 0 002-2V2a2 2 0 00-2-2h-11zm5 2a1 1 0 00-1 1v3a1 1 0 001 1h1a1 1 0 001-1V3a1 1 0 00-1-1h-1zm-5 1a1 1 0 011-1h1a1 1 0 011 1v7a1 1 0 01-1 1h-1a1 1 0 01-1-1V3zm9-1a1 1 0 00-1 1v10a1 1 0 001 1h1a1 1 0 001-1V3a1 1 0 00-1-1h-1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconLaptop = /*#__PURE__*/make_icon_makeIcon('Laptop', '<path fill-rule="evenodd" d="M13.5 3h-11a.5.5 0 00-.5.5V11h12V3.5a.5.5 0 00-.5-.5zm-11-1A1.5 1.5 0 001 3.5V12h14V3.5A1.5 1.5 0 0013.5 2h-11z" clip-rule="evenodd"/><path d="M0 12h16v.5a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 010 12.5V12z"/>'); // eslint-disable-next-line

var BIconLayers = /*#__PURE__*/make_icon_makeIcon('Layers', '<path fill-rule="evenodd" d="M3.188 8L.264 9.559a.5.5 0 000 .882l7.5 4a.5.5 0 00.47 0l7.5-4a.5.5 0 000-.882L12.813 8l-1.063.567L14.438 10 8 13.433 1.562 10 4.25 8.567 3.187 8z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.765 1.559a.5.5 0 01.47 0l7.5 4a.5.5 0 010 .882l-7.5 4a.5.5 0 01-.47 0l-7.5-4a.5.5 0 010-.882l7.5-4zM1.563 6L8 9.433 14.438 6 8 2.567 1.562 6z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconLayersFill = /*#__PURE__*/make_icon_makeIcon('LayersFill', '<path fill-rule="evenodd" d="M7.765 1.559a.5.5 0 01.47 0l7.5 4a.5.5 0 010 .882l-7.5 4a.5.5 0 01-.47 0l-7.5-4a.5.5 0 010-.882l7.5-4z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M2.125 8.567l-1.86.992a.5.5 0 000 .882l7.5 4a.5.5 0 00.47 0l7.5-4a.5.5 0 000-.882l-1.86-.992-5.17 2.756a1.5 1.5 0 01-1.41 0l.418-.785-.419.785-5.169-2.756z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconLayersHalf = /*#__PURE__*/make_icon_makeIcon('LayersHalf', '<path fill-rule="evenodd" d="M3.188 8L.264 9.559a.5.5 0 000 .882l7.5 4a.5.5 0 00.47 0l7.5-4a.5.5 0 000-.882L12.813 8l-4.578 2.441a.5.5 0 01-.47 0L3.188 8z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.765 1.559a.5.5 0 01.47 0l7.5 4a.5.5 0 010 .882l-7.5 4a.5.5 0 01-.47 0l-7.5-4a.5.5 0 010-.882l7.5-4zM1.563 6L8 9.433 14.438 6 8 2.567 1.562 6z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconLayoutSidebar = /*#__PURE__*/make_icon_makeIcon('LayoutSidebar', '<path fill-rule="evenodd" d="M14 2H2a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V3a1 1 0 00-1-1zM2 1a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V3a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4 14V2h1v12H4z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconLayoutSidebarInset = /*#__PURE__*/make_icon_makeIcon('LayoutSidebarInset', '<path fill-rule="evenodd" d="M14 2H2a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V3a1 1 0 00-1-1zM2 1a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V3a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path d="M3 4a1 1 0 011-1h2a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"/>'); // eslint-disable-next-line

var BIconLayoutSidebarInsetReverse = /*#__PURE__*/make_icon_makeIcon('LayoutSidebarInsetReverse', '<path fill-rule="evenodd" d="M2 2h12a1 1 0 011 1v10a1 1 0 01-1 1H2a1 1 0 01-1-1V3a1 1 0 011-1zm12-1a2 2 0 012 2v10a2 2 0 01-2 2H2a2 2 0 01-2-2V3a2 2 0 012-2h12z" clip-rule="evenodd"/><path d="M13 4a1 1 0 00-1-1h-2a1 1 0 00-1 1v8a1 1 0 001 1h2a1 1 0 001-1V4z"/>'); // eslint-disable-next-line

var BIconLayoutSidebarReverse = /*#__PURE__*/make_icon_makeIcon('LayoutSidebarReverse', '<path fill-rule="evenodd" d="M14 2H2a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V3a1 1 0 00-1-1zM2 1a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V3a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M11 14V2h1v12h-1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconLayoutSplit = /*#__PURE__*/make_icon_makeIcon('LayoutSplit', '<path fill-rule="evenodd" d="M14 2H2a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V3a1 1 0 00-1-1zM2 1a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V3a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.5 14V2h1v12h-1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconLayoutTextSidebar = /*#__PURE__*/make_icon_makeIcon('LayoutTextSidebar', '<path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M11 15V1h1v14h-1zM3 3.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconLayoutTextSidebarReverse = /*#__PURE__*/make_icon_makeIcon('LayoutTextSidebarReverse', '<path fill-rule="evenodd" d="M2 1h12a1 1 0 011 1v12a1 1 0 01-1 1H2a1 1 0 01-1-1V2a1 1 0 011-1zm12-1a2 2 0 012 2v12a2 2 0 01-2 2H2a2 2 0 01-2-2V2a2 2 0 012-2h12z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5 15V1H4v14h1zm8-11.5a.5.5 0 00-.5-.5h-5a.5.5 0 000 1h5a.5.5 0 00.5-.5zm0 3a.5.5 0 00-.5-.5h-5a.5.5 0 000 1h5a.5.5 0 00.5-.5zm0 3a.5.5 0 00-.5-.5h-5a.5.5 0 000 1h5a.5.5 0 00.5-.5zm0 3a.5.5 0 00-.5-.5h-5a.5.5 0 000 1h5a.5.5 0 00.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconLayoutTextWindow = /*#__PURE__*/make_icon_makeIcon('LayoutTextWindow', '<path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M11 15V4h1v11h-1zm4.5-11H.5V3h15v1zM3 6.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconLayoutTextWindowReverse = /*#__PURE__*/make_icon_makeIcon('LayoutTextWindowReverse', '<path fill-rule="evenodd" d="M2 1h12a1 1 0 011 1v12a1 1 0 01-1 1H2a1 1 0 01-1-1V2a1 1 0 011-1zm12-1a2 2 0 012 2v12a2 2 0 01-2 2H2a2 2 0 01-2-2V2a2 2 0 012-2h12z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5 15V4H4v11h1zM.5 4h15V3H.5v1zM13 6.5a.5.5 0 00-.5-.5h-5a.5.5 0 000 1h5a.5.5 0 00.5-.5zm0 3a.5.5 0 00-.5-.5h-5a.5.5 0 000 1h5a.5.5 0 00.5-.5zm0 3a.5.5 0 00-.5-.5h-5a.5.5 0 000 1h5a.5.5 0 00.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconLayoutThreeColumns = /*#__PURE__*/make_icon_makeIcon('LayoutThreeColumns', '<path fill-rule="evenodd" d="M0 2.5A1.5 1.5 0 011.5 1h13A1.5 1.5 0 0116 2.5v11a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 010 13.5v-11zM1.5 2a.5.5 0 00-.5.5v11a.5.5 0 00.5.5h13a.5.5 0 00.5-.5v-11a.5.5 0 00-.5-.5h-13z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5 15V1h1v14H5zm5 0V1h1v14h-1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconLayoutWtf = /*#__PURE__*/make_icon_makeIcon('LayoutWtf', '<path fill-rule="evenodd" d="M5 1H1v8h4V1zM1 0a1 1 0 00-1 1v8a1 1 0 001 1h4a1 1 0 001-1V1a1 1 0 00-1-1H1zm13 2H9v5h5V2zM9 1a1 1 0 00-1 1v5a1 1 0 001 1h5a1 1 0 001-1V2a1 1 0 00-1-1H9zM5 13H3v2h2v-2zm-2-1a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 00-1-1H3zm12-1H9v2h6v-2zm-6-1a1 1 0 00-1 1v2a1 1 0 001 1h6a1 1 0 001-1v-2a1 1 0 00-1-1H9z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconLifePreserver = /*#__PURE__*/make_icon_makeIcon('LifePreserver', '<path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 11a3 3 0 100-6 3 3 0 000 6zm0 1a4 4 0 100-8 4 4 0 000 8z" clip-rule="evenodd"/><path d="M11.642 6.343L15 5v6l-3.358-1.343A3.99 3.99 0 0012 8a3.99 3.99 0 00-.358-1.657zM9.657 4.358L11 1H5l1.343 3.358A3.985 3.985 0 018 4c.59 0 1.152.128 1.657.358zM4.358 6.343L1 5v6l3.358-1.343A3.985 3.985 0 014 8c0-.59.128-1.152.358-1.657zm1.985 5.299L5 15h6l-1.343-3.358A3.984 3.984 0 018 12a3.99 3.99 0 01-1.657-.358z"/>'); // eslint-disable-next-line

var BIconLightning = /*#__PURE__*/make_icon_makeIcon('Lightning', '<path fill-rule="evenodd" d="M11.251.068a.5.5 0 01.227.58L9.677 6.5H13a.5.5 0 01.364.843l-8 8.5a.5.5 0 01-.842-.49L6.323 9.5H3a.5.5 0 01-.364-.843l8-8.5a.5.5 0 01.615-.09zM4.157 8.5H7a.5.5 0 01.478.647L6.11 13.59l5.732-6.09H9a.5.5 0 01-.478-.647L9.89 2.41 4.157 8.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconLightningFill = /*#__PURE__*/make_icon_makeIcon('LightningFill', '<path fill-rule="evenodd" d="M11.251.068a.5.5 0 01.227.58L9.677 6.5H13a.5.5 0 01.364.843l-8 8.5a.5.5 0 01-.842-.49L6.323 9.5H3a.5.5 0 01-.364-.843l8-8.5a.5.5 0 01.615-.09z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconLink = /*#__PURE__*/make_icon_makeIcon('Link', '<path d="M6.354 5.5H4a3 3 0 000 6h3a3 3 0 002.83-4H9c-.086 0-.17.01-.25.031A2 2 0 017 10.5H4a2 2 0 110-4h1.535c.218-.376.495-.714.82-1z"/><path d="M6.764 6.5H7c.364 0 .706.097 1 .268A1.99 1.99 0 019 6.5h.236A3.004 3.004 0 008 5.67a3 3 0 00-1.236.83z"/><path d="M9 5.5a3 3 0 00-2.83 4h1.098A2 2 0 019 6.5h3a2 2 0 110 4h-1.535a4.02 4.02 0 01-.82 1H12a3 3 0 100-6H9z"/><path d="M8 11.33a3.01 3.01 0 001.236-.83H9a1.99 1.99 0 01-1-.268 1.99 1.99 0 01-1 .268h-.236c.332.371.756.66 1.236.83z"/>'); // eslint-disable-next-line

var BIconLink45deg = /*#__PURE__*/make_icon_makeIcon('Link45deg', '<path d="M4.715 6.542L3.343 7.914a3 3 0 104.243 4.243l1.828-1.829A3 3 0 008.586 5.5L8 6.086a1.001 1.001 0 00-.154.199 2 2 0 01.861 3.337L6.88 11.45a2 2 0 11-2.83-2.83l.793-.792a4.018 4.018 0 01-.128-1.287z"/><path d="M5.712 6.96l.167-.167a1.99 1.99 0 01.896-.518 1.99 1.99 0 01.518-.896l.167-.167A3.004 3.004 0 006 5.499c-.22.46-.316.963-.288 1.46z"/><path d="M6.586 4.672A3 3 0 007.414 9.5l.775-.776a2 2 0 01-.896-3.346L9.12 3.55a2 2 0 012.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 00-4.243-4.243L6.586 4.672z"/><path d="M10 9.5a2.99 2.99 0 00.288-1.46l-.167.167a1.99 1.99 0 01-.896.518 1.99 1.99 0 01-.518.896l-.167.167A3.004 3.004 0 0010 9.501z"/>'); // eslint-disable-next-line

var BIconList = /*#__PURE__*/make_icon_makeIcon('List', '<path fill-rule="evenodd" d="M2.5 11.5A.5.5 0 013 11h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4A.5.5 0 013 7h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4A.5.5 0 013 3h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconListCheck = /*#__PURE__*/make_icon_makeIcon('ListCheck', '<path fill-rule="evenodd" d="M5 11.5a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm0-4a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm0-4a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zM3.854 2.146a.5.5 0 010 .708l-1.5 1.5a.5.5 0 01-.708 0l-.5-.5a.5.5 0 11.708-.708L2 3.293l1.146-1.147a.5.5 0 01.708 0zm0 4a.5.5 0 010 .708l-1.5 1.5a.5.5 0 01-.708 0l-.5-.5a.5.5 0 11.708-.708L2 7.293l1.146-1.147a.5.5 0 01.708 0zm0 4a.5.5 0 010 .708l-1.5 1.5a.5.5 0 01-.708 0l-.5-.5a.5.5 0 01.708-.708l.146.147 1.146-1.147a.5.5 0 01.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconListNested = /*#__PURE__*/make_icon_makeIcon('ListNested', '<path fill-rule="evenodd" d="M4.5 11.5A.5.5 0 015 11h10a.5.5 0 010 1H5a.5.5 0 01-.5-.5zm-2-4A.5.5 0 013 7h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm-2-4A.5.5 0 011 3h10a.5.5 0 010 1H1a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconListOl = /*#__PURE__*/make_icon_makeIcon('ListOl', '<path fill-rule="evenodd" d="M5 11.5a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm0-4a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm0-4a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5z" clip-rule="evenodd"/><path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 01-.492.594v.033a.615.615 0 01.569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 00-.342.338v.041zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635V5z"/>'); // eslint-disable-next-line

var BIconListTask = /*#__PURE__*/make_icon_makeIcon('ListTask', '<path fill-rule="evenodd" d="M2 2.5a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5V3a.5.5 0 00-.5-.5H2zM3 3H2v1h1V3z" clip-rule="evenodd"/><path d="M5 3.5a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zM5.5 7a.5.5 0 000 1h9a.5.5 0 000-1h-9zm0 4a.5.5 0 000 1h9a.5.5 0 000-1h-9z"/><path fill-rule="evenodd" d="M1.5 7a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5V7zM2 7h1v1H2V7zm0 3.5a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5H2zm1 .5H2v1h1v-1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconListUl = /*#__PURE__*/make_icon_makeIcon('ListUl', '<path fill-rule="evenodd" d="M5 11.5a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm0-4a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm0-4a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zm-3 1a1 1 0 100-2 1 1 0 000 2zm0 4a1 1 0 100-2 1 1 0 000 2zm0 4a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconLock = /*#__PURE__*/make_icon_makeIcon('Lock', '<path fill-rule="evenodd" d="M11.5 8h-7a1 1 0 00-1 1v5a1 1 0 001 1h7a1 1 0 001-1V9a1 1 0 00-1-1zm-7-1a2 2 0 00-2 2v5a2 2 0 002 2h7a2 2 0 002-2V9a2 2 0 00-2-2h-7zm0-3a3.5 3.5 0 117 0v3h-1V4a2.5 2.5 0 00-5 0v3h-1V4z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconLockFill = /*#__PURE__*/make_icon_makeIcon('LockFill', '<rect width="11" height="9" x="2.5" y="7" rx="2"/><path fill-rule="evenodd" d="M4.5 4a3.5 3.5 0 117 0v3h-1V4a2.5 2.5 0 00-5 0v3h-1V4z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconMap = /*#__PURE__*/make_icon_makeIcon('Map', '<path fill-rule="evenodd" d="M15.817.613A.5.5 0 0116 1v13a.5.5 0 01-.402.49l-5 1a.502.502 0 01-.196 0L5.5 14.51l-4.902.98A.5.5 0 010 15V2a.5.5 0 01.402-.49l5-1a.5.5 0 01.196 0l4.902.98 4.902-.98a.5.5 0 01.415.103zM10 2.41l-4-.8v11.98l4 .8V2.41zm1 11.98l4-.8V1.61l-4 .8v11.98zm-6-.8V1.61l-4 .8v11.98l4-.8z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconMic = /*#__PURE__*/make_icon_makeIcon('Mic', '<path fill-rule="evenodd" d="M3.5 6.5A.5.5 0 014 7v1a4 4 0 008 0V7a.5.5 0 011 0v1a5 5 0 01-4.5 4.975V15h3a.5.5 0 010 1h-7a.5.5 0 010-1h3v-2.025A5 5 0 013 8V7a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10 8V3a2 2 0 10-4 0v5a2 2 0 104 0zM8 0a3 3 0 00-3 3v5a3 3 0 006 0V3a3 3 0 00-3-3z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconMicFill = /*#__PURE__*/make_icon_makeIcon('MicFill', '<path d="M5 3a3 3 0 016 0v5a3 3 0 01-6 0V3z"/><path fill-rule="evenodd" d="M3.5 6.5A.5.5 0 014 7v1a4 4 0 008 0V7a.5.5 0 011 0v1a5 5 0 01-4.5 4.975V15h3a.5.5 0 010 1h-7a.5.5 0 010-1h3v-2.025A5 5 0 013 8V7a.5.5 0 01.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconMicMute = /*#__PURE__*/make_icon_makeIcon('MicMute', '<path fill-rule="evenodd" d="M12.734 9.613A4.995 4.995 0 0013 8V7a.5.5 0 00-1 0v1c0 .274-.027.54-.08.799l.814.814zm-2.522 1.72A4 4 0 014 8V7a.5.5 0 00-1 0v1a5 5 0 004.5 4.975V15h-3a.5.5 0 000 1h7a.5.5 0 000-1h-3v-2.025a4.973 4.973 0 002.43-.923l-.718-.719zM11 7.88V3a3 3 0 00-5.842-.963l.845.845A2 2 0 0110 3v3.879l1 1zM8.738 9.86l.748.748A3 3 0 015 8V6.121l1 1V8a2 2 0 002.738 1.86z" clip-rule="evenodd"/><path stroke="currentColor" d="M2 1l12 12"/>'); // eslint-disable-next-line

var BIconMicMuteFill = /*#__PURE__*/make_icon_makeIcon('MicMuteFill', '<path fill-rule="evenodd" d="M12.734 9.613A4.995 4.995 0 0013 8V7a.5.5 0 00-1 0v1c0 .274-.027.54-.08.799l.814.814zm-2.522 1.72A4 4 0 014 8V7a.5.5 0 00-1 0v1a5 5 0 004.5 4.975V15h-3a.5.5 0 000 1h7a.5.5 0 000-1h-3v-2.025a4.973 4.973 0 002.43-.923l-.718-.719zM11 7.88V3a3 3 0 00-5.842-.963L11 7.879zM5 6.12l4.486 4.486A3 3 0 015 8V6.121z" clip-rule="evenodd"/><path stroke="currentColor" d="M2 1l12 12"/>'); // eslint-disable-next-line

var BIconMoon = /*#__PURE__*/make_icon_makeIcon('Moon', '<path fill-rule="evenodd" d="M14.53 10.53a7 7 0 01-9.058-9.058A7.003 7.003 0 008 15a7.002 7.002 0 006.53-4.47z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconMusicNote = /*#__PURE__*/make_icon_makeIcon('MusicNote', '<path d="M9 13c0 1.105-1.12 2-2.5 2S4 14.105 4 13s1.12-2 2.5-2 2.5.895 2.5 2z"/><path fill-rule="evenodd" d="M9 3v10H8V3h1z" clip-rule="evenodd"/><path d="M8 2.82a1 1 0 01.804-.98l3-.6A1 1 0 0113 2.22V4L8 5V2.82z"/>'); // eslint-disable-next-line

var BIconMusicNoteBeamed = /*#__PURE__*/make_icon_makeIcon('MusicNoteBeamed', '<path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13c0-1.104 1.12-2 2.5-2s2.5.896 2.5 2zm9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2z"/><path fill-rule="evenodd" d="M14 11V2h1v9h-1zM6 3v10H5V3h1z" clip-rule="evenodd"/><path d="M5 2.905a1 1 0 01.9-.995l8-.8a1 1 0 011.1.995V3L5 4V2.905z"/>'); // eslint-disable-next-line

var BIconMusicNoteList = /*#__PURE__*/make_icon_makeIcon('MusicNoteList', '<path d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2z"/><path fill-rule="evenodd" d="M12 3v10h-1V3h1z" clip-rule="evenodd"/><path d="M11 2.82a1 1 0 01.804-.98l3-.6A1 1 0 0116 2.22V4l-5 1V2.82z"/><path fill-rule="evenodd" d="M0 11.5a.5.5 0 01.5-.5H4a.5.5 0 010 1H.5a.5.5 0 01-.5-.5zm0-4A.5.5 0 01.5 7H8a.5.5 0 010 1H.5a.5.5 0 01-.5-.5zm0-4A.5.5 0 01.5 3H8a.5.5 0 010 1H.5a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconMusicPlayer = /*#__PURE__*/make_icon_makeIcon('MusicPlayer', '<path fill-rule="evenodd" d="M12 1H4a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1V2a1 1 0 00-1-1zM4 0a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V2a2 2 0 00-2-2H4z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M11 3H5v3h6V3zM5 2a1 1 0 00-1 1v3a1 1 0 001 1h6a1 1 0 001-1V3a1 1 0 00-1-1H5zm3 11a2 2 0 100-4 2 2 0 000 4zm3-2a3 3 0 11-6 0 3 3 0 016 0z" clip-rule="evenodd"/><circle cx="8" cy="11" r="1"/>'); // eslint-disable-next-line

var BIconMusicPlayerFill = /*#__PURE__*/make_icon_makeIcon('MusicPlayerFill', '<path fill-rule="evenodd" d="M2 2a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V2zm2 1a1 1 0 011-1h6a1 1 0 011 1v2.5a1 1 0 01-1 1H5a1 1 0 01-1-1V3zm7 8a3 3 0 11-6 0 3 3 0 016 0z" clip-rule="evenodd"/><circle cx="8" cy="11" r="1"/>'); // eslint-disable-next-line

var BIconNewspaper = /*#__PURE__*/make_icon_makeIcon('Newspaper', '<path fill-rule="evenodd" d="M0 2A1.5 1.5 0 011.5.5h11A1.5 1.5 0 0114 2v12a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 010 14V2zm1.5-.5A.5.5 0 001 2v12a.5.5 0 00.5.5h11a.5.5 0 00.5-.5V2a.5.5 0 00-.5-.5h-11z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M15.5 3a.5.5 0 01.5.5V14a1.5 1.5 0 01-1.5 1.5h-3v-1h3a.5.5 0 00.5-.5V3.5a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path d="M2 3h10v2H2V3zm0 3h4v3H2V6zm0 4h4v1H2v-1zm0 2h4v1H2v-1zm5-6h2v1H7V6zm3 0h2v1h-2V6zM7 8h2v1H7V8zm3 0h2v1h-2V8zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1z"/>'); // eslint-disable-next-line

var BIconOctagon = /*#__PURE__*/make_icon_makeIcon('Octagon', '<path fill-rule="evenodd" d="M4.54.146A.5.5 0 014.893 0h6.214a.5.5 0 01.353.146l4.394 4.394a.5.5 0 01.146.353v6.214a.5.5 0 01-.146.353l-4.394 4.394a.5.5 0 01-.353.146H4.893a.5.5 0 01-.353-.146L.146 11.46A.5.5 0 010 11.107V4.893a.5.5 0 01.146-.353L4.54.146zM5.1 1L1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconOctagonFill = /*#__PURE__*/make_icon_makeIcon('OctagonFill', '<path d="M11.107 0a.5.5 0 01.353.146l4.394 4.394a.5.5 0 01.146.353v6.214a.5.5 0 01-.146.353l-4.394 4.394a.5.5 0 01-.353.146H4.893a.5.5 0 01-.353-.146L.146 11.46A.5.5 0 010 11.107V4.893a.5.5 0 01.146-.353L4.54.146A.5.5 0 014.893 0h6.214z"/>'); // eslint-disable-next-line

var BIconOctagonHalf = /*#__PURE__*/make_icon_makeIcon('OctagonHalf', '<path d="M4.893 16h3.214V0H4.893a.5.5 0 00-.353.146L.146 4.54A.5.5 0 000 4.893v6.214a.5.5 0 00.146.353l4.394 4.394a.5.5 0 00.353.146z"/><path fill-rule="evenodd" d="M4.54.146A.5.5 0 014.893 0h6.214a.5.5 0 01.353.146l4.394 4.394a.5.5 0 01.146.353v6.214a.5.5 0 01-.146.353l-4.394 4.394a.5.5 0 01-.353.146H4.893a.5.5 0 01-.353-.146L.146 11.46A.5.5 0 010 11.107V4.893a.5.5 0 01.146-.353L4.54.146zM5.1 1L1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconOption = /*#__PURE__*/make_icon_makeIcon('Option', '<path fill-rule="evenodd" d="M1 2.5a.5.5 0 01.5-.5h3.797a.5.5 0 01.439.26L11 13h3.5a.5.5 0 010 1h-3.797a.5.5 0 01-.439-.26L5 3H1.5a.5.5 0 01-.5-.5zm10 0a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconOutlet = /*#__PURE__*/make_icon_makeIcon('Outlet', '<path fill-rule="evenodd" d="M3.34 2.994c.275-.338.68-.494 1.074-.494h7.172c.393 0 .798.156 1.074.494.578.708 1.84 2.534 1.84 5.006 0 2.472-1.262 4.297-1.84 5.006-.276.338-.68.494-1.074.494H4.414c-.394 0-.799-.156-1.074-.494C2.762 12.297 1.5 10.472 1.5 8c0-2.472 1.262-4.297 1.84-5.006zm1.074.506a.376.376 0 00-.299.126C3.599 4.259 2.5 5.863 2.5 8c0 2.137 1.099 3.74 1.615 4.374.06.073.163.126.3.126h7.17c.137 0 .24-.053.3-.126.516-.633 1.615-2.237 1.615-4.374 0-2.137-1.099-3.74-1.615-4.374a.376.376 0 00-.3-.126h-7.17z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M6 5.5a.5.5 0 01.5.5v1.5a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm4 0a.5.5 0 01.5.5v1.5a.5.5 0 01-1 0V6a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path d="M7 10v1h2v-1a1 1 0 00-2 0z"/>'); // eslint-disable-next-line

var BIconPaperclip = /*#__PURE__*/make_icon_makeIcon('Paperclip', '<path fill-rule="evenodd" d="M4.5 3a2.5 2.5 0 015 0v9a1.5 1.5 0 01-3 0V5a.5.5 0 011 0v7a.5.5 0 001 0V3a1.5 1.5 0 10-3 0v9a2.5 2.5 0 005 0V5a.5.5 0 011 0v7a3.5 3.5 0 11-7 0V3z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconPause = /*#__PURE__*/make_icon_makeIcon('Pause', '<path fill-rule="evenodd" d="M6 3.5a.5.5 0 01.5.5v8a.5.5 0 01-1 0V4a.5.5 0 01.5-.5zm4 0a.5.5 0 01.5.5v8a.5.5 0 01-1 0V4a.5.5 0 01.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconPauseFill = /*#__PURE__*/make_icon_makeIcon('PauseFill', '<path d="M5.5 3.5A1.5 1.5 0 017 5v6a1.5 1.5 0 01-3 0V5a1.5 1.5 0 011.5-1.5zm5 0A1.5 1.5 0 0112 5v6a1.5 1.5 0 01-3 0V5a1.5 1.5 0 011.5-1.5z"/>'); // eslint-disable-next-line

var BIconPen = /*#__PURE__*/make_icon_makeIcon('Pen', '<path fill-rule="evenodd" d="M5.707 13.707a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391L10.086 2.5a2 2 0 012.828 0l.586.586a2 2 0 010 2.828l-7.793 7.793zM3 11l7.793-7.793a1 1 0 011.414 0l.586.586a1 1 0 010 1.414L5 13l-3 1 1-3z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M9.854 2.56a.5.5 0 00-.708 0L5.854 5.855a.5.5 0 01-.708-.708L8.44 1.854a1.5 1.5 0 012.122 0l.293.292a.5.5 0 01-.707.708l-.293-.293z" clip-rule="evenodd"/><path d="M13.293 1.207a1 1 0 011.414 0l.03.03a1 1 0 01.03 1.383L13.5 4 12 2.5l1.293-1.293z"/>'); // eslint-disable-next-line

var BIconPencil = /*#__PURE__*/make_icon_makeIcon('Pencil', '<path fill-rule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconPencilSquare = /*#__PURE__*/make_icon_makeIcon('PencilSquare', '<path d="M15.502 1.94a.5.5 0 010 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 01.707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 00-.121.196l-.805 2.414a.25.25 0 00.316.316l2.414-.805a.5.5 0 00.196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-6a.5.5 0 00-1 0v6a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11a.5.5 0 01.5-.5H9a.5.5 0 000-1H2.5A1.5 1.5 0 001 2.5v11z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconPentagon = /*#__PURE__*/make_icon_makeIcon('Pentagon', '<path fill-rule="evenodd" d="M8 1.288l-6.842 5.56L3.733 15h8.534l2.575-8.153L8 1.288zM16 6.5L8 0 0 6.5 3 16h10l3-9.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconPentagonFill = /*#__PURE__*/make_icon_makeIcon('PentagonFill', '<path d="M8 0l8 6.5-3 9.5H3L0 6.5 8 0z"/>'); // eslint-disable-next-line

var BIconPentagonHalf = /*#__PURE__*/make_icon_makeIcon('PentagonHalf', '<path fill-rule="evenodd" d="M8 1.288V15h4.267l2.575-8.153L8 1.288zM16 6.5L8 0 0 6.5 3 16h10l3-9.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconPeople = /*#__PURE__*/make_icon_makeIcon('People', '<path fill-rule="evenodd" d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.995-.944v-.002.002zM7.022 13h7.956a.274.274 0 00.014-.002l.008-.002c-.002-.264-.167-1.03-.76-1.72C13.688 10.629 12.718 10 11 10c-1.717 0-2.687.63-3.24 1.276-.593.69-.759 1.457-.76 1.72a1.05 1.05 0 00.022.004zm7.973.056v-.002.002zM11 7a2 2 0 100-4 2 2 0 000 4zm3-2a3 3 0 11-6 0 3 3 0 016 0zM6.936 9.28a5.88 5.88 0 00-1.23-.247A7.35 7.35 0 005 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 015 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10c-1.668.02-2.615.64-3.16 1.276C1.163 11.97 1 12.739 1 13h3c0-1.045.323-2.086.92-3zM1.5 5.5a3 3 0 116 0 3 3 0 01-6 0zm3-2a2 2 0 100 4 2 2 0 000-4z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconPeopleCircle = /*#__PURE__*/make_icon_makeIcon('PeopleCircle', '<path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 008 15a6.987 6.987 0 005.468-2.63z"/><path fill-rule="evenodd" d="M8 9a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zM0 8a8 8 0 1116 0A8 8 0 010 8z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconPeopleFill = /*#__PURE__*/make_icon_makeIcon('PeopleFill', '<path fill-rule="evenodd" d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 100-6 3 3 0 000 6zm-5.784 6A2.238 2.238 0 015 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 005 9c-4 0-5 3-5 4s1 1 1 1h4.216zM4.5 8a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconPerson = /*#__PURE__*/make_icon_makeIcon('Person', '<path fill-rule="evenodd" d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 00.014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 00.022.004zm9.974.056v-.002.002zM8 7a2 2 0 100-4 2 2 0 000 4zm3-2a3 3 0 11-6 0 3 3 0 016 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconPersonBoundingBox = /*#__PURE__*/make_icon_makeIcon('PersonBoundingBox', '<path fill-rule="evenodd" d="M1.5 1a.5.5 0 00-.5.5v3a.5.5 0 01-1 0v-3A1.5 1.5 0 011.5 0h3a.5.5 0 010 1h-3zM11 .5a.5.5 0 01.5-.5h3A1.5 1.5 0 0116 1.5v3a.5.5 0 01-1 0v-3a.5.5 0 00-.5-.5h-3a.5.5 0 01-.5-.5zM.5 11a.5.5 0 01.5.5v3a.5.5 0 00.5.5h3a.5.5 0 010 1h-3A1.5 1.5 0 010 14.5v-3a.5.5 0 01.5-.5zm15 0a.5.5 0 01.5.5v3a1.5 1.5 0 01-1.5 1.5h-3a.5.5 0 010-1h3a.5.5 0 00.5-.5v-3a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconPersonCheck = /*#__PURE__*/make_icon_makeIcon('PersonCheck', '<path fill-rule="evenodd" d="M11 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM1.022 13h9.956a.274.274 0 00.014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 00.022.004zm9.974.056v-.002.002zM6 7a2 2 0 100-4 2 2 0 000 4zm3-2a3 3 0 11-6 0 3 3 0 016 0zm6.854.146a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0l-1.5-1.5a.5.5 0 01.708-.708L12.5 7.793l2.646-2.647a.5.5 0 01.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconPersonCheckFill = /*#__PURE__*/make_icon_makeIcon('PersonCheckFill', '<path fill-rule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 100-6 3 3 0 000 6zm9.854-2.854a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0l-1.5-1.5a.5.5 0 01.708-.708L12.5 7.793l2.646-2.647a.5.5 0 01.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconPersonDash = /*#__PURE__*/make_icon_makeIcon('PersonDash', '<path fill-rule="evenodd" d="M11 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM1.022 13h9.956a.274.274 0 00.014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 00.022.004zm9.974.056v-.002.002zM6 7a2 2 0 100-4 2 2 0 000 4zm3-2a3 3 0 11-6 0 3 3 0 016 0zm2 2.5a.5.5 0 01.5-.5h4a.5.5 0 010 1h-4a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconPersonDashFill = /*#__PURE__*/make_icon_makeIcon('PersonDashFill', '<path fill-rule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 100-6 3 3 0 000 6zm5-.5a.5.5 0 01.5-.5h4a.5.5 0 010 1h-4a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconPersonFill = /*#__PURE__*/make_icon_makeIcon('PersonFill', '<path fill-rule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconPersonLinesFill = /*#__PURE__*/make_icon_makeIcon('PersonLinesFill', '<path fill-rule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 100-6 3 3 0 000 6zm7 1.5a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5zm-2-3a.5.5 0 01.5-.5h4a.5.5 0 010 1h-4a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h4a.5.5 0 010 1h-4a.5.5 0 01-.5-.5zm2 9a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconPersonPlus = /*#__PURE__*/make_icon_makeIcon('PersonPlus', '<path fill-rule="evenodd" d="M11 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM1.022 13h9.956a.274.274 0 00.014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 00.022.004zm9.974.056v-.002.002zM6 7a2 2 0 100-4 2 2 0 000 4zm3-2a3 3 0 11-6 0 3 3 0 016 0zm4.5 0a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-2a.5.5 0 010-1H13V5.5a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M13 7.5a.5.5 0 01.5-.5h2a.5.5 0 010 1H14v1.5a.5.5 0 01-1 0v-2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconPersonPlusFill = /*#__PURE__*/make_icon_makeIcon('PersonPlusFill', '<path fill-rule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 100-6 3 3 0 000 6zm7.5-3a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-2a.5.5 0 010-1H13V5.5a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M13 7.5a.5.5 0 01.5-.5h2a.5.5 0 010 1H14v1.5a.5.5 0 01-1 0v-2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconPersonSquare = /*#__PURE__*/make_icon_makeIcon('PersonSquare', '<path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M2 15v-1c0-1 1-4 6-4s6 3 6 4v1H2zm6-6a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconPhone = /*#__PURE__*/make_icon_makeIcon('Phone', '<path fill-rule="evenodd" d="M11 1H5a1 1 0 00-1 1v12a1 1 0 001 1h6a1 1 0 001-1V2a1 1 0 00-1-1zM5 0a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V2a2 2 0 00-2-2H5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 14a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconPhoneLandscape = /*#__PURE__*/make_icon_makeIcon('PhoneLandscape', '<path fill-rule="evenodd" d="M1 4.5v6a1 1 0 001 1h12a1 1 0 001-1v-6a1 1 0 00-1-1H2a1 1 0 00-1 1zm-1 6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2H2a2 2 0 00-2 2v6z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M14 7.5a1 1 0 10-2 0 1 1 0 002 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconPieChart = /*#__PURE__*/make_icon_makeIcon('PieChart', '<path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.5 7.793V1h1v6.5H15v1H8.207l-4.853 4.854-.708-.708L7.5 7.793z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconPieChartFill = /*#__PURE__*/make_icon_makeIcon('PieChartFill', '<path d="M15.985 8.5H8.207l-5.5 5.5a8 8 0 0013.277-5.5zM2 13.292A8 8 0 017.5.015v7.778l-5.5 5.5zM8.5.015V7.5h7.485A8.001 8.001 0 008.5.015z"/>'); // eslint-disable-next-line

var BIconPip = /*#__PURE__*/make_icon_makeIcon('Pip', '<path fill-rule="evenodd" d="M0 3.5A1.5 1.5 0 011.5 2h13A1.5 1.5 0 0116 3.5v9a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 010 12.5v-9zM1.5 3a.5.5 0 00-.5.5v9a.5.5 0 00.5.5h13a.5.5 0 00.5-.5v-9a.5.5 0 00-.5-.5h-13z" clip-rule="evenodd"/><path d="M8 8.5a.5.5 0 01.5-.5h5a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-5a.5.5 0 01-.5-.5v-3z"/>'); // eslint-disable-next-line

var BIconPipFill = /*#__PURE__*/make_icon_makeIcon('PipFill', '<path fill-rule="evenodd" d="M1.5 2A1.5 1.5 0 000 3.5v9A1.5 1.5 0 001.5 14h13a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0014.5 2h-13zm7 6a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h5a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5h-5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconPlay = /*#__PURE__*/make_icon_makeIcon('Play', '<path fill-rule="evenodd" d="M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 010 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconPlayFill = /*#__PURE__*/make_icon_makeIcon('PlayFill', '<path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 010 1.393z"/>'); // eslint-disable-next-line

var BIconPlug = /*#__PURE__*/make_icon_makeIcon('Plug', '<path d="M4 5h8v3a4 4 0 01-8 0V5z"/><path fill-rule="evenodd" d="M6 1.5a.5.5 0 01.5.5v3a.5.5 0 01-1 0V2a.5.5 0 01.5-.5zm4 0a.5.5 0 01.5.5v3a.5.5 0 01-1 0V2a.5.5 0 01.5-.5zM7.115 13.651c.256-.511.385-1.408.385-2.651h1c0 1.257-.121 2.36-.49 3.099-.191.381-.47.707-.87.877-.401.17-.845.15-1.298-.002-.961-.32-1.534-.175-1.851.046-.33.23-.491.615-.491.98h-1c0-.635.278-1.353.918-1.8.653-.456 1.58-.561 2.74-.174.297.099.478.078.592.03.115-.05.244-.161.365-.405z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconPlus = /*#__PURE__*/make_icon_makeIcon('Plus', '<path fill-rule="evenodd" d="M8 3.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4a.5.5 0 010-1h3.5V4a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.5 8a.5.5 0 01.5-.5h4a.5.5 0 010 1H8.5V12a.5.5 0 01-1 0V8z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconPlusCircle = /*#__PURE__*/make_icon_makeIcon('PlusCircle', '<path fill-rule="evenodd" d="M8 3.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4a.5.5 0 010-1h3.5V4a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.5 8a.5.5 0 01.5-.5h4a.5.5 0 010 1H8.5V12a.5.5 0 01-1 0V8z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconPlusCircleFill = /*#__PURE__*/make_icon_makeIcon('PlusCircleFill', '<path fill-rule="evenodd" d="M16 8A8 8 0 110 8a8 8 0 0116 0zM8.5 4a.5.5 0 00-1 0v3.5H4a.5.5 0 000 1h3.5V12a.5.5 0 001 0V8.5H12a.5.5 0 000-1H8.5V4z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconPlusSquare = /*#__PURE__*/make_icon_makeIcon('PlusSquare', '<path fill-rule="evenodd" d="M8 3.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4a.5.5 0 010-1h3.5V4a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.5 8a.5.5 0 01.5-.5h4a.5.5 0 010 1H8.5V12a.5.5 0 01-1 0V8z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconPlusSquareFill = /*#__PURE__*/make_icon_makeIcon('PlusSquareFill', '<path fill-rule="evenodd" d="M2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2zm6.5 4a.5.5 0 00-1 0v3.5H4a.5.5 0 000 1h3.5V12a.5.5 0 001 0V8.5H12a.5.5 0 000-1H8.5V4z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconPower = /*#__PURE__*/make_icon_makeIcon('Power', '<path fill-rule="evenodd" d="M5.578 4.437a5 5 0 104.922.044l.5-.866a6 6 0 11-5.908-.053l.486.875z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.5 8V1h1v7h-1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconPuzzle = /*#__PURE__*/make_icon_makeIcon('Puzzle', '<path d="M4.605 2.5V2v.5zM3.61 3.6l.498-.043V3.55l-.498.05zM7 2.5h.5A.5.5 0 007 2v.5zm-.676 1.454l.304.397-.304-.397zm3.352 0l-.304.397.304-.397zM9 2.5V2a.5.5 0 00-.5.5H9zm3.39 1.1l-.498-.05v.007l.498.043zM12.1 7l-.498-.043a.5.5 0 00.498.543V7zm1.854-.676l.397.304-.397-.304zm0 3.352l.397-.304-.397.304zM12.1 9v-.5a.5.5 0 00-.498.542L12.1 9zm.29 3.4l-.498.043v.007l.498-.05zM9 13.5h-.5a.5.5 0 00.5.5v-.5zm.676-1.454l-.304-.397.304.397zm-3.352 0l.304-.397-.304.397zM7 13.5v.5a.5.5 0 00.5-.5H7zm-2.395 0V13v.5zm-.995-1.1l.498.05v-.007L3.61 12.4zM3.9 9l.498.042A.5.5 0 003.9 8.5V9zm-1.854.676l-.397-.304.397.304zm0-3.352l-.397.304.397-.304zM3.9 7v.5a.5.5 0 00.498-.543L3.9 7zm.705-5a1.5 1.5 0 00-1.493 1.65l.995-.1A.5.5 0 014.605 3V2zM7 2H4.605v1H7V2zm.5.882V2.5h-1v.382h1zm-.872 1.469c.375-.287.872-.773.872-1.469h-1c0 .195-.147.42-.48.675l.608.794zM6.5 4.5l.001-.006a.113.113 0 01.012-.025.459.459 0 01.115-.118l-.608-.794c-.274.21-.52.528-.52.943h1zM8 5c-.491 0-.912-.1-1.19-.24a.86.86 0 01-.271-.194.213.213 0 01-.039-.063V4.5h-1c0 .568.447.947.862 1.154C6.807 5.877 7.387 6 8 6V5zm1.5-.5v.003a.213.213 0 01-.039.064.86.86 0 01-.27.193C8.91 4.9 8.49 5 8 5v1c.613 0 1.193-.123 1.638-.346.415-.207.862-.586.862-1.154h-1zm-.128-.15c.065.05.099.092.115.119.008.013.01.021.012.025L9.5 4.5h1c0-.415-.246-.733-.52-.943l-.608.794zM8.5 2.883c0 .696.497 1.182.872 1.469l.608-.794c-.333-.255-.48-.48-.48-.675h-1zm0-.382v.382h1V2.5h-1zm2.895-.5H9v1h2.395V2zm1.493 1.65A1.5 1.5 0 0011.395 2v1a.5.5 0 01.498.55l.995.1zm-.29 3.392l.29-3.4-.996-.085-.29 3.4.996.085zm.284-.542H12.1v1h.782v-1zm.675-.48c-.255.333-.48.48-.675.48v1c.696 0 1.182-.497 1.469-.872l-.794-.608zm.943-.52c-.415 0-.733.246-.943.52l.794.608a.459.459 0 01.118-.115.113.113 0 01.025-.012L14.5 6.5v-1zM16 8c0-.613-.123-1.193-.346-1.638-.207-.415-.586-.862-1.154-.862v1h.003l.01.003a.237.237 0 01.053.036.86.86 0 01.194.27c.14.28.24.7.24 1.191h1zm-1.5 2.5c.568 0 .947-.447 1.154-.862C15.877 9.193 16 8.613 16 8h-1c0 .491-.1.912-.24 1.19a.86.86 0 01-.194.271.214.214 0 01-.063.039H14.5v1zm-.943-.52c.21.274.528.52.943.52v-1l-.006-.001a.113.113 0 01-.025-.012.458.458 0 01-.118-.115l-.794.608zm-.675-.48c.195 0 .42.147.675.48l.794-.608c-.287-.375-.773-.872-1.469-.872v1zm-.782 0h.782v-1H12.1v1zm.788 2.858l-.29-3.4-.996.084.29 3.401.996-.085zM11.395 14a1.5 1.5 0 001.493-1.65l-.995.1a.5.5 0 01-.498.55v1zM9 14h2.395v-1H9v1zm.5-.5v-.382h-1v.382h1zm0-.382c0-.195.147-.42.48-.675l-.608-.794c-.375.287-.872.773-.872 1.469h1zm.48-.675c.274-.21.52-.528.52-.943h-1l-.001.006a.113.113 0 01-.012.025.459.459 0 01-.115.118l.608.794zm.52-.943c0-.568-.447-.947-.862-1.154C9.193 10.123 8.613 10 8 10v1c.492 0 .912.1 1.19.24.14.07.226.14.271.194a.214.214 0 01.039.063v.003h1zM8 10c-.613 0-1.193.123-1.638.346-.415.207-.862.586-.862 1.154h1v-.003l.003-.01a.214.214 0 01.036-.053.859.859 0 01.27-.194C7.09 11.1 7.51 11 8 11v-1zm-2.5 1.5c0 .415.246.733.52.943l.608-.794a.459.459 0 01-.115-.118.113.113 0 01-.012-.025L6.5 11.5h-1zm.52.943c.333.255.48.48.48.675h1c0-.696-.497-1.182-.872-1.469l-.608.794zm.48.675v.382h1v-.382h-1zM4.605 14H7v-1H4.605v1zm-1.493-1.65A1.5 1.5 0 004.605 14v-1a.5.5 0 01-.498-.55l-.995-.1zm.29-3.393l-.29 3.401.996.085.29-3.4-.996-.086zm-.284.543H3.9v-1h-.782v1zm-.675.48c.255-.333.48-.48.675-.48v-1c-.696 0-1.182.497-1.469.872l.794.608zm-.943.52c.415 0 .733-.246.943-.52l-.794-.608a.459.459 0 01-.118.115.112.112 0 01-.025.012L1.5 9.5v1zM0 8c0 .613.123 1.193.346 1.638.207.415.586.862 1.154.862v-1h-.003a.213.213 0 01-.064-.039.86.86 0 01-.193-.27C1.1 8.91 1 8.49 1 8H0zm1.5-2.5c-.568 0-.947.447-1.154.862C.123 6.807 0 7.387 0 8h1c0-.492.1-.912.24-1.19a.86.86 0 01.194-.271.213.213 0 01.063-.039H1.5v-1zm.943.52c-.21-.274-.528-.52-.943-.52v1l.006.001a.112.112 0 01.025.012c.027.016.068.05.118.115l.794-.608zm.675.48c-.195 0-.42-.147-.675-.48l-.794.608c.287.375.773.872 1.469.872v-1zm.782 0h-.782v1H3.9v-1zm-.788-2.858l.29 3.4.996-.085-.29-3.4-.996.085z"/>'); // eslint-disable-next-line

var BIconPuzzleFill = /*#__PURE__*/make_icon_makeIcon('PuzzleFill', '<path fill-rule="evenodd" d="M3.112 3.645A1.5 1.5 0 014.605 2H7a.5.5 0 01.5.5v.382c0 .696-.497 1.182-.872 1.469a.459.459 0 00-.115.118.113.113 0 00-.012.025L6.5 4.5v.003l.003.01c.004.01.014.028.036.053a.86.86 0 00.27.194C7.09 4.9 7.51 5 8 5c.492 0 .912-.1 1.19-.24a.86.86 0 00.271-.194.213.213 0 00.036-.054l.003-.01v-.008a.112.112 0 00-.012-.025.459.459 0 00-.115-.118c-.375-.287-.872-.773-.872-1.469V2.5A.5.5 0 019 2h2.395a1.5 1.5 0 011.493 1.645L12.645 6.5h.237c.195 0 .42-.147.675-.48.21-.274.528-.52.943-.52.568 0 .947.447 1.154.862C15.877 6.807 16 7.387 16 8s-.123 1.193-.346 1.638c-.207.415-.586.862-1.154.862-.415 0-.733-.246-.943-.52-.255-.333-.48-.48-.675-.48h-.237l.243 2.855A1.5 1.5 0 0111.395 14H9a.5.5 0 01-.5-.5v-.382c0-.696.497-1.182.872-1.469a.459.459 0 00.115-.118.113.113 0 00.012-.025L9.5 11.5v-.003l-.003-.01a.214.214 0 00-.036-.053.859.859 0 00-.27-.194C8.91 11.1 8.49 11 8 11c-.491 0-.912.1-1.19.24a.859.859 0 00-.271.194.214.214 0 00-.036.054l-.003.01v.002l.001.006a.113.113 0 00.012.025c.016.027.05.068.115.118.375.287.872.773.872 1.469v.382a.5.5 0 01-.5.5H4.605a1.5 1.5 0 01-1.493-1.645L3.356 9.5h-.238c-.195 0-.42.147-.675.48-.21.274-.528.52-.943.52-.568 0-.947-.447-1.154-.862C.123 9.193 0 8.613 0 8s.123-1.193.346-1.638C.553 5.947.932 5.5 1.5 5.5c.415 0 .733.246.943.52.255.333.48.48.675.48h.238l-.244-2.855z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconQuestion = /*#__PURE__*/make_icon_makeIcon('Question', '<path d="M5.25 6.033h1.32c0-.781.458-1.384 1.36-1.384.685 0 1.313.343 1.313 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.007.463h1.307v-.355c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.326 0-2.786.647-2.754 2.533zm1.562 5.516c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>'); // eslint-disable-next-line

var BIconQuestionCircle = /*#__PURE__*/make_icon_makeIcon('QuestionCircle', '<path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/><path d="M5.25 6.033h1.32c0-.781.458-1.384 1.36-1.384.685 0 1.313.343 1.313 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.007.463h1.307v-.355c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.326 0-2.786.647-2.754 2.533zm1.562 5.516c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>'); // eslint-disable-next-line

var BIconQuestionCircleFill = /*#__PURE__*/make_icon_makeIcon('QuestionCircleFill', '<path fill-rule="evenodd" d="M16 8A8 8 0 110 8a8 8 0 0116 0zM6.57 6.033H5.25C5.22 4.147 6.68 3.5 8.006 3.5c1.397 0 2.673.73 2.673 2.24 0 1.08-.635 1.594-1.244 2.057-.737.559-1.01.768-1.01 1.486v.355H7.117l-.007-.463c-.038-.927.495-1.498 1.168-1.987.59-.444.965-.736.965-1.371 0-.825-.628-1.168-1.314-1.168-.901 0-1.358.603-1.358 1.384zm1.251 6.443c-.584 0-1.009-.394-1.009-.927 0-.552.425-.94 1.01-.94.609 0 1.028.388 1.028.94 0 .533-.42.927-1.029.927z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconQuestionDiamond = /*#__PURE__*/make_icon_makeIcon('QuestionDiamond', '<path fill-rule="evenodd" d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 010-2.098L6.95.435zm1.4.7a.495.495 0 00-.7 0L1.134 7.65a.495.495 0 000 .7l6.516 6.516a.495.495 0 00.7 0l6.516-6.516a.495.495 0 000-.7L8.35 1.134z" clip-rule="evenodd"/><path d="M5.25 6.033h1.32c0-.781.458-1.384 1.36-1.384.685 0 1.313.343 1.313 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.007.463h1.307v-.355c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.326 0-2.786.647-2.754 2.533zm1.562 5.516c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>'); // eslint-disable-next-line

var BIconQuestionDiamondFill = /*#__PURE__*/make_icon_makeIcon('QuestionDiamondFill', '<path fill-rule="evenodd" d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098L9.05.435zM6.57 6.033H5.25C5.22 4.147 6.68 3.5 8.006 3.5c1.397 0 2.673.73 2.673 2.24 0 1.08-.635 1.594-1.244 2.057-.737.559-1.01.768-1.01 1.486v.355H7.117l-.007-.463c-.038-.927.495-1.498 1.168-1.987.59-.444.965-.736.965-1.371 0-.825-.628-1.168-1.314-1.168-.901 0-1.358.603-1.358 1.384zm1.251 6.443c-.584 0-1.009-.394-1.009-.927 0-.552.425-.94 1.01-.94.609 0 1.028.388 1.028.94 0 .533-.42.927-1.029.927z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconQuestionOctagon = /*#__PURE__*/make_icon_makeIcon('QuestionOctagon', '<path fill-rule="evenodd" d="M4.54.146A.5.5 0 014.893 0h6.214a.5.5 0 01.353.146l4.394 4.394a.5.5 0 01.146.353v6.214a.5.5 0 01-.146.353l-4.394 4.394a.5.5 0 01-.353.146H4.893a.5.5 0 01-.353-.146L.146 11.46A.5.5 0 010 11.107V4.893a.5.5 0 01.146-.353L4.54.146zM5.1 1L1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z" clip-rule="evenodd"/><path d="M5.25 6.033h1.32c0-.781.458-1.384 1.36-1.384.685 0 1.313.343 1.313 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.007.463h1.307v-.355c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.326 0-2.786.647-2.754 2.533zm1.562 5.516c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>'); // eslint-disable-next-line

var BIconQuestionOctagonFill = /*#__PURE__*/make_icon_makeIcon('QuestionOctagonFill', '<path fill-rule="evenodd" d="M11.46.146A.5.5 0 0011.107 0H4.893a.5.5 0 00-.353.146L.146 4.54A.5.5 0 000 4.893v6.214a.5.5 0 00.146.353l4.394 4.394a.5.5 0 00.353.146h6.214a.5.5 0 00.353-.146l4.394-4.394a.5.5 0 00.146-.353V4.893a.5.5 0 00-.146-.353L11.46.146zM6.57 6.033H5.25C5.22 4.147 6.68 3.5 8.006 3.5c1.397 0 2.673.73 2.673 2.24 0 1.08-.635 1.594-1.244 2.057-.737.559-1.01.768-1.01 1.486v.355H7.117l-.007-.463c-.038-.927.495-1.498 1.168-1.987.59-.444.965-.736.965-1.371 0-.825-.628-1.168-1.314-1.168-.901 0-1.358.603-1.358 1.384zm1.251 6.443c-.584 0-1.009-.394-1.009-.927 0-.552.425-.94 1.01-.94.609 0 1.028.388 1.028.94 0 .533-.42.927-1.029.927z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconQuestionSquare = /*#__PURE__*/make_icon_makeIcon('QuestionSquare', '<path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path d="M5.25 6.033h1.32c0-.781.458-1.384 1.36-1.384.685 0 1.313.343 1.313 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.007.463h1.307v-.355c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.326 0-2.786.647-2.754 2.533zm1.562 5.516c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>'); // eslint-disable-next-line

var BIconQuestionSquareFill = /*#__PURE__*/make_icon_makeIcon('QuestionSquareFill', '<path fill-rule="evenodd" d="M2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2zm4.57 6.033H5.25C5.22 4.147 6.68 3.5 8.006 3.5c1.397 0 2.673.73 2.673 2.24 0 1.08-.635 1.594-1.244 2.057-.737.559-1.01.768-1.01 1.486v.355H7.117l-.007-.463c-.038-.927.495-1.498 1.168-1.987.59-.444.965-.736.965-1.371 0-.825-.628-1.168-1.314-1.168-.901 0-1.358.603-1.358 1.384zm1.251 6.443c-.584 0-1.009-.394-1.009-.927 0-.552.425-.94 1.01-.94.609 0 1.028.388 1.028.94 0 .533-.42.927-1.029.927z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconReply = /*#__PURE__*/make_icon_makeIcon('Reply', '<path fill-rule="evenodd" d="M9.502 5.013a.144.144 0 00-.202.134V6.3a.5.5 0 01-.5.5c-.667 0-2.013.005-3.3.822-.984.624-1.99 1.76-2.595 3.876C3.925 10.515 5.09 9.982 6.11 9.7a8.741 8.741 0 011.921-.306 7.403 7.403 0 01.798.008h.013l.005.001h.001L8.8 9.9l.05-.498a.5.5 0 01.45.498v1.153c0 .108.11.176.202.134l3.984-2.933a.494.494 0 01.042-.028.147.147 0 000-.252.494.494 0 01-.042-.028L9.502 5.013zM8.3 10.386a7.745 7.745 0 00-1.923.277c-1.326.368-2.896 1.201-3.94 3.08a.5.5 0 01-.933-.305c.464-3.71 1.886-5.662 3.46-6.66 1.245-.79 2.527-.942 3.336-.971v-.66a1.144 1.144 0 011.767-.96l3.994 2.94a1.147 1.147 0 010 1.946l-3.994 2.94a1.144 1.144 0 01-1.767-.96v-.667z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconReplyAll = /*#__PURE__*/make_icon_makeIcon('ReplyAll', '<path fill-rule="evenodd" d="M8.002 5.013a.144.144 0 00-.202.134V6.3a.5.5 0 01-.5.5c-.667 0-2.013.005-3.3.822-.984.624-1.99 1.76-2.595 3.876C2.425 10.515 3.59 9.982 4.61 9.7a8.741 8.741 0 011.921-.306 7.403 7.403 0 01.798.008h.013l.005.001h.001L7.3 9.9l.05-.498a.5.5 0 01.45.498v1.153c0 .108.11.176.202.134l3.984-2.933a.494.494 0 01.042-.028.147.147 0 000-.252.494.494 0 01-.042-.028L8.002 5.013zM6.8 10.386a7.745 7.745 0 00-1.923.277c-1.326.368-2.896 1.201-3.94 3.08a.5.5 0 01-.933-.305c.464-3.71 1.886-5.662 3.46-6.66 1.245-.79 2.527-.942 3.336-.971v-.66a1.144 1.144 0 011.767-.96l3.994 2.94a1.147 1.147 0 010 1.946l-3.994 2.94a1.144 1.144 0 01-1.767-.96v-.667z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10.868 4.293a.5.5 0 01.7-.106l3.993 2.94a1.147 1.147 0 010 1.946l-3.994 2.94a.5.5 0 01-.593-.805l4.012-2.954a.493.493 0 01.042-.028.147.147 0 000-.252.496.496 0 01-.042-.028l-4.012-2.954a.5.5 0 01-.106-.699z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconReplyAllFill = /*#__PURE__*/make_icon_makeIcon('ReplyAllFill', '<path d="M8.079 11.9l4.568-3.281a.719.719 0 000-1.238L8.079 4.1A.716.716 0 007 4.719V6c-1.5 0-6 0-7 8 2.5-4.5 7-4 7-4v1.281c0 .56.606.898 1.079.62z"/><path fill-rule="evenodd" d="M10.868 4.293a.5.5 0 01.7-.106l3.993 2.94a1.147 1.147 0 010 1.946l-3.994 2.94a.5.5 0 01-.593-.805l4.012-2.954a.493.493 0 01.042-.028.147.147 0 000-.252.496.496 0 01-.042-.028l-4.012-2.954a.5.5 0 01-.106-.699z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconReplyFill = /*#__PURE__*/make_icon_makeIcon('ReplyFill', '<path d="M9.079 11.9l4.568-3.281a.719.719 0 000-1.238L9.079 4.1A.716.716 0 008 4.719V6c-1.5 0-6 0-7 8 2.5-4.5 7-4 7-4v1.281c0 .56.606.898 1.079.62z"/>'); // eslint-disable-next-line

var BIconScrewdriver = /*#__PURE__*/make_icon_makeIcon('Screwdriver', '<path fill-rule="evenodd" d="M0 1l1-1 3.081 2.2a1 1 0 01.419.815v.07a1 1 0 00.293.708L10.5 9.5l.914-.305a1 1 0 011.023.242l3.356 3.356a1 1 0 010 1.414l-1.586 1.586a1 1 0 01-1.414 0l-3.356-3.356a1 1 0 01-.242-1.023L9.5 10.5 3.793 4.793a1 1 0 00-.707-.293h-.071a1 1 0 01-.814-.419L0 1zm11.354 9.646a.5.5 0 00-.708.708l3 3a.5.5 0 00.708-.708l-3-3z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconSearch = /*#__PURE__*/make_icon_makeIcon('Search', '<path fill-rule="evenodd" d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconServer = /*#__PURE__*/make_icon_makeIcon('Server', '<path d="M13 2c0-1.105-2.239-2-5-2S3 .895 3 2s2.239 2 5 2 5-.895 5-2z"/><path d="M13 3.75c-.322.24-.698.435-1.093.593C10.857 4.763 9.475 5 8 5s-2.857-.237-3.907-.657A4.881 4.881 0 013 3.75V6c0 1.105 2.239 2 5 2s5-.895 5-2V3.75z"/><path d="M13 7.75c-.322.24-.698.435-1.093.593C10.857 8.763 9.475 9 8 9s-2.857-.237-3.907-.657A4.881 4.881 0 013 7.75V10c0 1.105 2.239 2 5 2s5-.895 5-2V7.75z"/><path d="M13 11.75c-.322.24-.698.435-1.093.593-1.05.42-2.432.657-3.907.657s-2.857-.237-3.907-.657A4.883 4.883 0 013 11.75V14c0 1.105 2.239 2 5 2s5-.895 5-2v-2.25z"/>'); // eslint-disable-next-line

var BIconShield = /*#__PURE__*/make_icon_makeIcon('Shield', '<path fill-rule="evenodd" d="M5.443 1.991a60.17 60.17 0 00-2.725.802.454.454 0 00-.315.366C1.87 7.056 3.1 9.9 4.567 11.773c.736.94 1.533 1.636 2.197 2.093.333.228.626.394.857.5.116.053.21.089.282.11A.73.73 0 008 14.5c.007-.001.038-.005.097-.023.072-.022.166-.058.282-.111.23-.106.525-.272.857-.5a10.197 10.197 0 002.197-2.093C12.9 9.9 14.13 7.056 13.597 3.159a.454.454 0 00-.315-.366c-.626-.2-1.682-.526-2.725-.802C9.491 1.71 8.51 1.5 8 1.5c-.51 0-1.49.21-2.557.491zm-.256-.966C6.23.749 7.337.5 8 .5c.662 0 1.77.249 2.813.525a61.09 61.09 0 012.772.815c.528.168.926.623 1.003 1.184.573 4.197-.756 7.307-2.367 9.365a11.191 11.191 0 01-2.418 2.3 6.942 6.942 0 01-1.007.586c-.27.124-.558.225-.796.225s-.526-.101-.796-.225a6.908 6.908 0 01-1.007-.586 11.192 11.192 0 01-2.417-2.3C2.167 10.331.839 7.221 1.412 3.024A1.454 1.454 0 012.415 1.84a61.11 61.11 0 012.772-.815z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconShieldFill = /*#__PURE__*/make_icon_makeIcon('ShieldFill', '<path fill-rule="evenodd" d="M5.187 1.025C6.23.749 7.337.5 8 .5c.662 0 1.77.249 2.813.525a61.09 61.09 0 012.772.815c.528.168.926.623 1.003 1.184.573 4.197-.756 7.307-2.367 9.365a11.191 11.191 0 01-2.418 2.3 6.942 6.942 0 01-1.007.586c-.27.124-.558.225-.796.225s-.526-.101-.796-.225a6.908 6.908 0 01-1.007-.586 11.192 11.192 0 01-2.417-2.3C2.167 10.331.839 7.221 1.412 3.024A1.454 1.454 0 012.415 1.84a61.11 61.11 0 012.772-.815z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconShieldLock = /*#__PURE__*/make_icon_makeIcon('ShieldLock', '<path fill-rule="evenodd" d="M5.443 1.991a60.17 60.17 0 00-2.725.802.454.454 0 00-.315.366C1.87 7.056 3.1 9.9 4.567 11.773c.736.94 1.533 1.636 2.197 2.093.333.228.626.394.857.5.116.053.21.089.282.11A.73.73 0 008 14.5c.007-.001.038-.005.097-.023.072-.022.166-.058.282-.111.23-.106.525-.272.857-.5a10.197 10.197 0 002.197-2.093C12.9 9.9 14.13 7.056 13.597 3.159a.454.454 0 00-.315-.366c-.626-.2-1.682-.526-2.725-.802C9.491 1.71 8.51 1.5 8 1.5c-.51 0-1.49.21-2.557.491zm-.256-.966C6.23.749 7.337.5 8 .5c.662 0 1.77.249 2.813.525a61.09 61.09 0 012.772.815c.528.168.926.623 1.003 1.184.573 4.197-.756 7.307-2.367 9.365a11.191 11.191 0 01-2.418 2.3 6.942 6.942 0 01-1.007.586c-.27.124-.558.225-.796.225s-.526-.101-.796-.225a6.908 6.908 0 01-1.007-.586 11.192 11.192 0 01-2.417-2.3C2.167 10.331.839 7.221 1.412 3.024A1.454 1.454 0 012.415 1.84a61.11 61.11 0 012.772-.815z" clip-rule="evenodd"/><path d="M9.5 6.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/><path d="M7.411 8.034a.5.5 0 01.493-.417h.156a.5.5 0 01.492.414l.347 2a.5.5 0 01-.493.585h-.835a.5.5 0 01-.493-.582l.333-2z"/>'); // eslint-disable-next-line

var BIconShieldLockFill = /*#__PURE__*/make_icon_makeIcon('ShieldLockFill', '<path fill-rule="evenodd" d="M5.187 1.025C6.23.749 7.337.5 8 .5c.662 0 1.77.249 2.813.525a61.09 61.09 0 012.772.815c.528.168.926.623 1.003 1.184.573 4.197-.756 7.307-2.367 9.365a11.191 11.191 0 01-2.418 2.3 6.942 6.942 0 01-1.007.586c-.27.124-.558.225-.796.225s-.526-.101-.796-.225a6.908 6.908 0 01-1.007-.586 11.192 11.192 0 01-2.417-2.3C2.167 10.331.839 7.221 1.412 3.024A1.454 1.454 0 012.415 1.84a61.11 61.11 0 012.772-.815zm3.328 6.884a1.5 1.5 0 10-1.06-.011.5.5 0 00-.044.136l-.333 2a.5.5 0 00.493.582h.835a.5.5 0 00.493-.585l-.347-2a.5.5 0 00-.037-.122z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconShieldShaded = /*#__PURE__*/make_icon_makeIcon('ShieldShaded', '<path fill-rule="evenodd" d="M5.443 1.991a60.17 60.17 0 00-2.725.802.454.454 0 00-.315.366C1.87 7.056 3.1 9.9 4.567 11.773c.736.94 1.533 1.636 2.197 2.093.333.228.626.394.857.5.116.053.21.089.282.11A.73.73 0 008 14.5c.007-.001.038-.005.097-.023.072-.022.166-.058.282-.111.23-.106.525-.272.857-.5a10.197 10.197 0 002.197-2.093C12.9 9.9 14.13 7.056 13.597 3.159a.454.454 0 00-.315-.366c-.626-.2-1.682-.526-2.725-.802C9.491 1.71 8.51 1.5 8 1.5c-.51 0-1.49.21-2.557.491zm-.256-.966C6.23.749 7.337.5 8 .5c.662 0 1.77.249 2.813.525a61.09 61.09 0 012.772.815c.528.168.926.623 1.003 1.184.573 4.197-.756 7.307-2.367 9.365a11.191 11.191 0 01-2.418 2.3 6.942 6.942 0 01-1.007.586c-.27.124-.558.225-.796.225s-.526-.101-.796-.225a6.908 6.908 0 01-1.007-.586 11.192 11.192 0 01-2.417-2.3C2.167 10.331.839 7.221 1.412 3.024A1.454 1.454 0 012.415 1.84a61.11 61.11 0 012.772-.815z" clip-rule="evenodd"/><path d="M8 2.25c.909 0 3.188.685 4.254 1.022a.94.94 0 01.656.773c.814 6.424-4.13 9.452-4.91 9.452V2.25z"/>'); // eslint-disable-next-line

var BIconShift = /*#__PURE__*/make_icon_makeIcon('Shift', '<path fill-rule="evenodd" d="M7.27 2.047a1 1 0 011.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v3a1 1 0 01-1 1h-5a1 1 0 01-1-1v-3H1.654C.78 10.5.326 9.455.924 8.816L7.27 2.047zM14.346 9.5L8 2.731 1.654 9.5H4.5a1 1 0 011 1v3h5v-3a1 1 0 011-1h2.846z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconShiftFill = /*#__PURE__*/make_icon_makeIcon('ShiftFill', '<path fill-rule="evenodd" d="M7.27 2.047a1 1 0 011.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v3a1 1 0 01-1 1h-5a1 1 0 01-1-1v-3H1.654C.78 10.5.326 9.455.924 8.816L7.27 2.047z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconShuffle = /*#__PURE__*/make_icon_makeIcon('Shuffle', '<path fill-rule="evenodd" d="M12.646 1.146a.5.5 0 01.708 0l2.5 2.5a.5.5 0 010 .708l-2.5 2.5a.5.5 0 01-.708-.708L14.793 4l-2.147-2.146a.5.5 0 010-.708zm0 8a.5.5 0 01.708 0l2.5 2.5a.5.5 0 010 .708l-2.5 2.5a.5.5 0 01-.708-.708L14.793 12l-2.147-2.146a.5.5 0 010-.708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M0 4a.5.5 0 01.5-.5h2c3.053 0 4.564 2.258 5.856 4.226l.08.123c.636.97 1.224 1.865 1.932 2.539.718.682 1.538 1.112 2.632 1.112h2a.5.5 0 010 1h-2c-1.406 0-2.461-.57-3.321-1.388-.795-.755-1.441-1.742-2.055-2.679l-.105-.159C6.186 6.242 4.947 4.5 2.5 4.5h-2A.5.5 0 010 4z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M0 12a.5.5 0 00.5.5h2c3.053 0 4.564-2.258 5.856-4.226l.08-.123c.636-.97 1.224-1.865 1.932-2.539C11.086 4.93 11.906 4.5 13 4.5h2a.5.5 0 000-1h-2c-1.406 0-2.461.57-3.321 1.388-.795.755-1.441 1.742-2.055 2.679l-.105.159C6.186 9.758 4.947 11.5 2.5 11.5h-2a.5.5 0 00-.5.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconSkipBackward = /*#__PURE__*/make_icon_makeIcon('SkipBackward', '<path fill-rule="evenodd" d="M.5 3.5A.5.5 0 011 4v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v2.94l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L8.5 8.752v2.94c0 .653-.713.998-1.233.696L1 8.752V12a.5.5 0 01-1 0V4a.5.5 0 01.5-.5zm7 1.133L1.696 8 7.5 11.367V4.633zm7.5 0L9.196 8 15 11.367V4.633z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconSkipBackwardFill = /*#__PURE__*/make_icon_makeIcon('SkipBackwardFill', '<path fill-rule="evenodd" d="M.5 3.5A.5.5 0 000 4v8a.5.5 0 001 0V4a.5.5 0 00-.5-.5z" clip-rule="evenodd"/><path d="M.904 8.697l6.363 3.692c.54.313 1.233-.066 1.233-.697V4.308c0-.63-.692-1.01-1.233-.696L.904 7.304a.802.802 0 000 1.393z"/><path d="M8.404 8.697l6.363 3.692c.54.313 1.233-.066 1.233-.697V4.308c0-.63-.693-1.01-1.233-.696L8.404 7.304a.802.802 0 000 1.393z"/>'); // eslint-disable-next-line

var BIconSkipEnd = /*#__PURE__*/make_icon_makeIcon('SkipEnd', '<path fill-rule="evenodd" d="M12 3.5a.5.5 0 01.5.5v8a.5.5 0 01-1 0V4a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 010 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconSkipEndFill = /*#__PURE__*/make_icon_makeIcon('SkipEndFill', '<path fill-rule="evenodd" d="M12 3.5a.5.5 0 01.5.5v8a.5.5 0 01-1 0V4a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 010 1.393z"/>'); // eslint-disable-next-line

var BIconSkipForward = /*#__PURE__*/make_icon_makeIcon('SkipForward', '<path fill-rule="evenodd" d="M15.5 3.5a.5.5 0 01.5.5v8a.5.5 0 01-1 0V8.752l-6.267 3.636c-.52.302-1.233-.043-1.233-.696v-2.94l-6.267 3.636C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696L7.5 7.248v-2.94c0-.653.713-.998 1.233-.696L15 7.248V4a.5.5 0 01.5-.5zM1 4.633v6.734L6.804 8 1 4.633zm7.5 0v6.734L14.304 8 8.5 4.633z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconSkipForwardFill = /*#__PURE__*/make_icon_makeIcon('SkipForwardFill', '<path fill-rule="evenodd" d="M15.5 3.5a.5.5 0 01.5.5v8a.5.5 0 01-1 0V4a.5.5 0 01.5-.5z" clip-rule="evenodd"/><path d="M7.596 8.697l-6.363 3.692C.693 12.702 0 12.322 0 11.692V4.308c0-.63.693-1.01 1.233-.696l6.363 3.692a.802.802 0 010 1.393z"/><path d="M15.096 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.693-1.01 1.233-.696l6.363 3.692a.802.802 0 010 1.393z"/>'); // eslint-disable-next-line

var BIconSkipStart = /*#__PURE__*/make_icon_makeIcon('SkipStart', '<path fill-rule="evenodd" d="M4.5 3.5A.5.5 0 004 4v8a.5.5 0 001 0V4a.5.5 0 00-.5-.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5.696 8L11.5 4.633v6.734L5.696 8zm-.792-.696a.802.802 0 000 1.392l6.363 3.692c.52.302 1.233-.043 1.233-.696V4.308c0-.653-.713-.998-1.233-.696L4.904 7.304z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconSkipStartFill = /*#__PURE__*/make_icon_makeIcon('SkipStartFill', '<path fill-rule="evenodd" d="M4.5 3.5A.5.5 0 004 4v8a.5.5 0 001 0V4a.5.5 0 00-.5-.5z" clip-rule="evenodd"/><path d="M4.903 8.697l6.364 3.692c.54.313 1.232-.066 1.232-.697V4.308c0-.63-.692-1.01-1.232-.696L4.903 7.304a.802.802 0 000 1.393z"/>'); // eslint-disable-next-line

var BIconSlash = /*#__PURE__*/make_icon_makeIcon('Slash', '<path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconSlashCircle = /*#__PURE__*/make_icon_makeIcon('SlashCircle', '<path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconSlashCircleFill = /*#__PURE__*/make_icon_makeIcon('SlashCircleFill', '<path fill-rule="evenodd" d="M16 8A8 8 0 110 8a8 8 0 0116 0zm-4.146-3.146a.5.5 0 00-.708-.708l-7 7a.5.5 0 00.708.708l7-7z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconSlashSquare = /*#__PURE__*/make_icon_makeIcon('SlashSquare', '<path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconSlashSquareFill = /*#__PURE__*/make_icon_makeIcon('SlashSquareFill', '<path fill-rule="evenodd" d="M2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2zm9.854 4.854a.5.5 0 00-.708-.708l-7 7a.5.5 0 00.708.708l7-7z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconSliders = /*#__PURE__*/make_icon_makeIcon('Sliders', '<path d="M0 0h16v16H0z"/><path fill-rule="evenodd" d="M14 3.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM11.5 5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM7 8.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM4.5 10a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm9.5 3.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM11.5 15a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M9.5 4H0V3h9.5v1zM16 4h-2.5V3H16v1zM9.5 14H0v-1h9.5v1zm6.5 0h-2.5v-1H16v1zM6.5 9H16V8H6.5v1zM0 9h2.5V8H0v1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconSoundwave = /*#__PURE__*/make_icon_makeIcon('Soundwave', '<path stroke="currentColor" stroke-linecap="round" d="M2.5 7v2m12-2v2m-2-3v4m-8-4v4m4-7.5v11m-2-9v7m4-7v7"/>'); // eslint-disable-next-line

var BIconSpeaker = /*#__PURE__*/make_icon_makeIcon('Speaker', '<path d="M9 4a1 1 0 11-2 0 1 1 0 012 0zm-2.5 6.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"/><path fill-rule="evenodd" d="M4 0a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V2a2 2 0 00-2-2H4zm6 4a2 2 0 11-4 0 2 2 0 014 0zM8 7a3.5 3.5 0 100 7 3.5 3.5 0 000-7z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconSquare = /*#__PURE__*/make_icon_makeIcon('Square', '<path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconSquareFill = /*#__PURE__*/make_icon_makeIcon('SquareFill', '<rect width="16" height="16" rx="2"/>'); // eslint-disable-next-line

var BIconSquareHalf = /*#__PURE__*/make_icon_makeIcon('SquareHalf', '<path fill-rule="evenodd" d="M8 1H2a1 1 0 00-1 1v12a1 1 0 001 1h6V1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconStar = /*#__PURE__*/make_icon_makeIcon('Star', '<path fill-rule="evenodd" d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 00-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 00-.163-.505L1.71 6.745l4.052-.576a.525.525 0 00.393-.288l1.847-3.658 1.846 3.658a.525.525 0 00.393.288l4.052.575-2.906 2.77a.564.564 0 00-.163.506l.694 3.957-3.686-1.894a.503.503 0 00-.461 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconStarFill = /*#__PURE__*/make_icon_makeIcon('StarFill', '<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>'); // eslint-disable-next-line

var BIconStarHalf = /*#__PURE__*/make_icon_makeIcon('StarHalf', '<path fill-rule="evenodd" d="M5.354 5.119L7.538.792A.516.516 0 018 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0116 6.32a.55.55 0 01-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.519.519 0 01-.146.05c-.341.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 01-.171-.403.59.59 0 01.084-.302.513.513 0 01.37-.245l4.898-.696zM8 12.027c.08 0 .16.018.232.056l3.686 1.894-.694-3.957a.564.564 0 01.163-.505l2.906-2.77-4.052-.576a.525.525 0 01-.393-.288L8.002 2.223 8 2.226v9.8z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconStop = /*#__PURE__*/make_icon_makeIcon('Stop', '<path fill-rule="evenodd" d="M3.5 5A1.5 1.5 0 015 3.5h6A1.5 1.5 0 0112.5 5v6a1.5 1.5 0 01-1.5 1.5H5A1.5 1.5 0 013.5 11V5zM5 4.5a.5.5 0 00-.5.5v6a.5.5 0 00.5.5h6a.5.5 0 00.5-.5V5a.5.5 0 00-.5-.5H5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconStopFill = /*#__PURE__*/make_icon_makeIcon('StopFill', '<path d="M5 3.5h6A1.5 1.5 0 0112.5 5v6a1.5 1.5 0 01-1.5 1.5H5A1.5 1.5 0 013.5 11V5A1.5 1.5 0 015 3.5z"/>'); // eslint-disable-next-line

var BIconStopwatch = /*#__PURE__*/make_icon_makeIcon('Stopwatch', '<path fill-rule="evenodd" d="M8 15A6 6 0 108 3a6 6 0 000 12zm0 1A7 7 0 108 2a7 7 0 000 14z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 4.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4.5a.5.5 0 010-1h3V5a.5.5 0 01.5-.5zM5.5.5A.5.5 0 016 0h4a.5.5 0 010 1H6a.5.5 0 01-.5-.5z" clip-rule="evenodd"/><path d="M7 1h2v2H7V1z"/>'); // eslint-disable-next-line

var BIconStopwatchFill = /*#__PURE__*/make_icon_makeIcon('StopwatchFill', '<path fill-rule="evenodd" d="M5.5.5A.5.5 0 016 0h4a.5.5 0 010 1H9v1.07A7.002 7.002 0 018 16 7 7 0 017 2.07V1H6a.5.5 0 01-.5-.5zm3 4.5a.5.5 0 00-1 0v3.5h-3a.5.5 0 000 1H8a.5.5 0 00.5-.5V5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconSubtract = /*#__PURE__*/make_icon_makeIcon('Subtract', '<path d="M4 12v2.5A1.5 1.5 0 005.5 16h9a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0014.5 4H12v6.5a1.5 1.5 0 01-1.5 1.5H4z"/><path fill-rule="evenodd" d="M10.5 1h-9a.5.5 0 00-.5.5v9a.5.5 0 00.5.5h9a.5.5 0 00.5-.5v-9a.5.5 0 00-.5-.5zm-9-1A1.5 1.5 0 000 1.5v9A1.5 1.5 0 001.5 12h9a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0010.5 0h-9z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconSun = /*#__PURE__*/make_icon_makeIcon('Sun', '<path d="M3.5 8a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0z"/><path fill-rule="evenodd" d="M8.202.28a.25.25 0 00-.404 0l-.91 1.255a.25.25 0 01-.334.067L5.232.79a.25.25 0 00-.374.155l-.36 1.508a.25.25 0 01-.282.19l-1.532-.245a.25.25 0 00-.286.286l.244 1.532a.25.25 0 01-.189.282l-1.509.36a.25.25 0 00-.154.374l.812 1.322a.25.25 0 01-.067.333l-1.256.91a.25.25 0 000 .405l1.256.91a.25.25 0 01.067.334L.79 10.768a.25.25 0 00.154.374l1.51.36a.25.25 0 01.188.282l-.244 1.532a.25.25 0 00.286.286l1.532-.244a.25.25 0 01.282.189l.36 1.508a.25.25 0 00.374.155l1.322-.812a.25.25 0 01.333.067l.91 1.256a.25.25 0 00.405 0l.91-1.256a.25.25 0 01.334-.067l1.322.812a.25.25 0 00.374-.155l.36-1.508a.25.25 0 01.282-.19l1.532.245a.25.25 0 00.286-.286l-.244-1.532a.25.25 0 01.189-.282l1.508-.36a.25.25 0 00.155-.374l-.812-1.322a.25.25 0 01.067-.333l1.256-.91a.25.25 0 000-.405l-1.256-.91a.25.25 0 01-.067-.334l.812-1.322a.25.25 0 00-.155-.374l-1.508-.36a.25.25 0 01-.19-.282l.245-1.532a.25.25 0 00-.286-.286l-1.532.244a.25.25 0 01-.282-.189l-.36-1.508a.25.25 0 00-.374-.155l-1.322.812a.25.25 0 01-.333-.067L8.203.28zM8 2.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconTable = /*#__PURE__*/make_icon_makeIcon('Table', '<path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M15 4H1V3h14v1z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M5 15.5v-14h1v14H5zm5 0v-14h1v14h-1z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M15 8H1V7h14v1zm0 4H1v-1h14v1z" clip-rule="evenodd"/><path d="M0 2a2 2 0 012-2h12a2 2 0 012 2v2H0V2z"/>'); // eslint-disable-next-line

var BIconTablet = /*#__PURE__*/make_icon_makeIcon('Tablet', '<path fill-rule="evenodd" d="M12 1H4a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1V2a1 1 0 00-1-1zM4 0a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V2a2 2 0 00-2-2H4z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 14a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconTabletLandscape = /*#__PURE__*/make_icon_makeIcon('TabletLandscape', '<path fill-rule="evenodd" d="M1 4v8a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H2a1 1 0 00-1 1zm-1 8a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H2a2 2 0 00-2 2v8z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M14 8a1 1 0 10-2 0 1 1 0 002 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconTag = /*#__PURE__*/make_icon_makeIcon('Tag', '<path fill-rule="evenodd" d="M.5 2A1.5 1.5 0 012 .5h4.586a1.5 1.5 0 011.06.44l7 7a1.5 1.5 0 010 2.12l-4.585 4.586a1.5 1.5 0 01-2.122 0l-7-7A1.5 1.5 0 01.5 6.586V2zM2 1.5a.5.5 0 00-.5.5v4.586a.5.5 0 00.146.353l7 7a.5.5 0 00.708 0l4.585-4.585a.5.5 0 000-.708l-7-7a.5.5 0 00-.353-.146H2z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M2.5 4.5a2 2 0 114 0 2 2 0 01-4 0zm2-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconTagFill = /*#__PURE__*/make_icon_makeIcon('TagFill', '<path fill-rule="evenodd" d="M2 1a1 1 0 00-1 1v4.586a1 1 0 00.293.707l7 7a1 1 0 001.414 0l4.586-4.586a1 1 0 000-1.414l-7-7A1 1 0 006.586 1H2zm4 3.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconTerminal = /*#__PURE__*/make_icon_makeIcon('Terminal', '<path fill-rule="evenodd" d="M14 2H2a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V3a1 1 0 00-1-1zM2 1a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V3a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M6 9a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3A.5.5 0 016 9zM3.146 4.146a.5.5 0 01.708 0l2 2a.5.5 0 010 .708l-2 2a.5.5 0 11-.708-.708L4.793 6.5 3.146 4.854a.5.5 0 010-.708z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconTerminalFill = /*#__PURE__*/make_icon_makeIcon('TerminalFill', '<path fill-rule="evenodd" d="M0 3a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H2a2 2 0 01-2-2V3zm9.5 5.5h-3a.5.5 0 000 1h3a.5.5 0 000-1zm-6.354-.354L4.793 6.5 3.146 4.854a.5.5 0 11.708-.708l2 2a.5.5 0 010 .708l-2 2a.5.5 0 01-.708-.708z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconTextCenter = /*#__PURE__*/make_icon_makeIcon('TextCenter', '<path fill-rule="evenodd" d="M4 12.5a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm-2-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm2-3a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm-2-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconTextIndentLeft = /*#__PURE__*/make_icon_makeIcon('TextIndentLeft', '<path fill-rule="evenodd" d="M2 3.5a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm.646 2.146a.5.5 0 01.708 0l2 2a.5.5 0 010 .708l-2 2a.5.5 0 01-.708-.708L4.293 8 2.646 6.354a.5.5 0 010-.708zM7 6.5a.5.5 0 01.5-.5h6a.5.5 0 010 1h-6a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h6a.5.5 0 010 1h-6a.5.5 0 01-.5-.5zm-5 3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconTextIndentRight = /*#__PURE__*/make_icon_makeIcon('TextIndentRight', '<path fill-rule="evenodd" d="M2 3.5a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm10.646 2.146a.5.5 0 01.708.708L11.707 8l1.647 1.646a.5.5 0 01-.708.708l-2-2a.5.5 0 010-.708l2-2zM2 6.5a.5.5 0 01.5-.5h6a.5.5 0 010 1h-6a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h6a.5.5 0 010 1h-6a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconTextLeft = /*#__PURE__*/make_icon_makeIcon('TextLeft', '<path fill-rule="evenodd" d="M2 12.5a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconTextRight = /*#__PURE__*/make_icon_makeIcon('TextRight', '<path fill-rule="evenodd" d="M6 12.5a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm-4-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm4-3a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm-4-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconTextarea = /*#__PURE__*/make_icon_makeIcon('Textarea', '<path fill-rule="evenodd" d="M14 9a1 1 0 100-2 1 1 0 000 2zm0 1a2 2 0 100-4 2 2 0 000 4zM2 9a1 1 0 100-2 1 1 0 000 2zm0 1a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M1.5 2.5A1.5 1.5 0 013 1h10a1.5 1.5 0 011.5 1.5v4h-1v-4A.5.5 0 0013 2H3a.5.5 0 00-.5.5v4h-1v-4zm1 7v4a.5.5 0 00.5.5h10a.5.5 0 00.5-.5v-4h1v4A1.5 1.5 0 0113 15H3a1.5 1.5 0 01-1.5-1.5v-4h1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconTextareaT = /*#__PURE__*/make_icon_makeIcon('TextareaT', '<path fill-rule="evenodd" d="M14 9a1 1 0 100-2 1 1 0 000 2zm0 1a2 2 0 100-4 2 2 0 000 4zM2 9a1 1 0 100-2 1 1 0 000 2zm0 1a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M1.5 2.5A1.5 1.5 0 013 1h10a1.5 1.5 0 011.5 1.5v4h-1v-4A.5.5 0 0013 2H3a.5.5 0 00-.5.5v4h-1v-4zm1 7v4a.5.5 0 00.5.5h10a.5.5 0 00.5-.5v-4h1v4A1.5 1.5 0 0113 15H3a1.5 1.5 0 01-1.5-1.5v-4h1z" clip-rule="evenodd"/><path d="M11.434 4H4.566L4.5 5.994h.386c.21-1.252.612-1.446 2.173-1.495l.343-.011v6.343c0 .537-.116.665-1.049.748V12h3.294v-.421c-.938-.083-1.054-.21-1.054-.748V4.488l.348.01c1.56.05 1.963.244 2.173 1.496h.386L11.434 4z"/>'); // eslint-disable-next-line

var BIconThreeDots = /*#__PURE__*/make_icon_makeIcon('ThreeDots', '<path fill-rule="evenodd" d="M3 9.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconThreeDotsVertical = /*#__PURE__*/make_icon_makeIcon('ThreeDotsVertical', '<path fill-rule="evenodd" d="M9.5 13a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0-5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconToggleOff = /*#__PURE__*/make_icon_makeIcon('ToggleOff', '<path fill-rule="evenodd" d="M11 4a4 4 0 010 8H8a4.992 4.992 0 002-4 4.992 4.992 0 00-2-4h3zm-6 8a4 4 0 110-8 4 4 0 010 8zM0 8a5 5 0 005 5h6a5 5 0 000-10H5a5 5 0 00-5 5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconToggleOn = /*#__PURE__*/make_icon_makeIcon('ToggleOn', '<path fill-rule="evenodd" d="M5 3a5 5 0 000 10h6a5 5 0 000-10H5zm6 9a4 4 0 100-8 4 4 0 000 8z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconToggles = /*#__PURE__*/make_icon_makeIcon('Toggles', '<path fill-rule="evenodd" d="M11.5 1h-7a2.5 2.5 0 000 5h7a2.5 2.5 0 000-5zm-7-1a3.5 3.5 0 100 7h7a3.5 3.5 0 100-7h-7zm0 9a3.5 3.5 0 100 7h7a3.5 3.5 0 100-7h-7zm7 6a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 3.5a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0zM4.5 6a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconTools = /*#__PURE__*/make_icon_makeIcon('Tools', '<path fill-rule="evenodd" d="M0 1l1-1 3.081 2.2a1 1 0 01.419.815v.07a1 1 0 00.293.708L10.5 9.5l.914-.305a1 1 0 011.023.242l3.356 3.356a1 1 0 010 1.414l-1.586 1.586a1 1 0 01-1.414 0l-3.356-3.356a1 1 0 01-.242-1.023L9.5 10.5 3.793 4.793a1 1 0 00-.707-.293h-.071a1 1 0 01-.814-.419L0 1zm11.354 9.646a.5.5 0 00-.708.708l3 3a.5.5 0 00.708-.708l-3-3z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M15.898 2.223a3.003 3.003 0 01-3.679 3.674L5.878 12.15a3 3 0 11-2.027-2.027l6.252-6.341A3 3 0 0113.778.1l-2.142 2.142L12 4l1.757.364 2.141-2.141zm-13.37 9.019L3.001 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconTrash = /*#__PURE__*/make_icon_makeIcon('Trash', '<path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconTrash2 = /*#__PURE__*/make_icon_makeIcon('Trash2', '<path fill-rule="evenodd" d="M3.18 4l1.528 9.164a1 1 0 00.986.836h4.612a1 1 0 00.986-.836L12.82 4H3.18zm.541 9.329A2 2 0 005.694 15h4.612a2 2 0 001.973-1.671L14 3H2l1.721 10.329z" clip-rule="evenodd"/><path d="M14 3c0 1.105-2.686 2-6 2s-6-.895-6-2 2.686-2 6-2 6 .895 6 2z"/><path fill-rule="evenodd" d="M12.9 3c-.18-.14-.497-.307-.974-.466C10.967 2.214 9.58 2 8 2s-2.968.215-3.926.534c-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466zM8 5c3.314 0 6-.895 6-2s-2.686-2-6-2-6 .895-6 2 2.686 2 6 2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconTrash2Fill = /*#__PURE__*/make_icon_makeIcon('Trash2Fill', '<path d="M2.037 3.225l1.684 10.104A2 2 0 005.694 15h4.612a2 2 0 001.973-1.671l1.684-10.104C13.627 4.224 11.085 5 8 5c-3.086 0-5.627-.776-5.963-1.775z"/><path fill-rule="evenodd" d="M12.9 3c-.18-.14-.497-.307-.974-.466C10.967 2.214 9.58 2 8 2s-2.968.215-3.926.534c-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466zM8 5c3.314 0 6-.895 6-2s-2.686-2-6-2-6 .895-6 2 2.686 2 6 2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconTrashFill = /*#__PURE__*/make_icon_makeIcon('TrashFill', '<path fill-rule="evenodd" d="M2.5 1a1 1 0 00-1 1v1a1 1 0 001 1H3v9a2 2 0 002 2h6a2 2 0 002-2V4h.5a1 1 0 001-1V2a1 1 0 00-1-1H10a1 1 0 00-1-1H7a1 1 0 00-1 1H2.5zm3 4a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7a.5.5 0 01.5-.5zM8 5a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 018 5zm3 .5a.5.5 0 00-1 0v7a.5.5 0 001 0v-7z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconTriangle = /*#__PURE__*/make_icon_makeIcon('Triangle', '<path fill-rule="evenodd" d="M7.938 2.016a.146.146 0 00-.054.057L1.027 13.74a.176.176 0 00-.002.183c.016.03.037.05.054.06.015.01.034.017.066.017h13.713a.12.12 0 00.066-.017.163.163 0 00.055-.06.176.176 0 00-.003-.183L8.12 2.073a.146.146 0 00-.054-.057A.13.13 0 008.002 2a.13.13 0 00-.064.016zm1.044-.45a1.13 1.13 0 00-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconTriangleFill = /*#__PURE__*/make_icon_makeIcon('TriangleFill', '<path fill-rule="evenodd" d="M7.022 1.566a1.13 1.13 0 011.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconTriangleHalf = /*#__PURE__*/make_icon_makeIcon('TriangleHalf', '<path fill-rule="evenodd" d="M7.938 2.016a.146.146 0 00-.054.057L1.027 13.74a.176.176 0 00-.002.183c.016.03.037.05.054.06.015.01.034.017.066.017l6.857-.017V2a.13.13 0 00-.064.016zm1.044-.45a1.13 1.13 0 00-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconTrophy = /*#__PURE__*/make_icon_makeIcon('Trophy', '<path d="M3 1h10c-.495 3.467-.5 10-5 10S3.495 4.467 3 1zm0 15a1 1 0 011-1h8a1 1 0 011 1H3zm2-1a1 1 0 011-1h4a1 1 0 011 1H5z"/><path fill-rule="evenodd" d="M12.5 3a2 2 0 100 4 2 2 0 000-4zm-3 2a3 3 0 116 0 3 3 0 01-6 0zm-6-2a2 2 0 100 4 2 2 0 000-4zm-3 2a3 3 0 116 0 3 3 0 01-6 0z" clip-rule="evenodd"/><path d="M7 10h2v4H7v-4z"/><path d="M10 11c0 .552-.895 1-2 1s-2-.448-2-1 .895-1 2-1 2 .448 2 1z"/>'); // eslint-disable-next-line

var BIconTv = /*#__PURE__*/make_icon_makeIcon('Tv', '<path fill-rule="evenodd" d="M2.5 13.5A.5.5 0 013 13h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zM13.991 3H2c-.325 0-.502.078-.602.145a.758.758 0 00-.254.302A1.46 1.46 0 001 4.01V10c0 .325.078.502.145.602.07.105.17.188.302.254a1.464 1.464 0 00.538.143L2.01 11H14c.325 0 .502-.078.602-.145a.758.758 0 00.254-.302 1.464 1.464 0 00.143-.538L15 9.99V4c0-.325-.078-.502-.145-.602a.757.757 0 00-.302-.254A1.46 1.46 0 0013.99 3zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconTvFill = /*#__PURE__*/make_icon_makeIcon('TvFill', '<path fill-rule="evenodd" d="M2.5 13.5A.5.5 0 013 13h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zM2 2h12s2 0 2 2v6s0 2-2 2H2s-2 0-2-2V4s0-2 2-2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconType = /*#__PURE__*/make_icon_makeIcon('Type', '<path d="M2.244 13.081l.943-2.803H6.66l.944 2.803H8.86L5.54 3.75H4.322L1 13.081h1.244zm2.7-7.923L6.34 9.314H3.51l1.4-4.156h.034zm9.146 7.027h.035v.896h1.128V8.125c0-1.51-1.114-2.345-2.646-2.345-1.736 0-2.59.916-2.666 2.174h1.108c.068-.718.595-1.19 1.517-1.19.971 0 1.518.52 1.518 1.464v.731H12.19c-1.647.007-2.522.8-2.522 2.058 0 1.319.957 2.18 2.345 2.18 1.06 0 1.716-.43 2.078-1.011zm-1.763.035c-.752 0-1.456-.397-1.456-1.244 0-.65.424-1.115 1.408-1.115h1.805v.834c0 .896-.752 1.525-1.757 1.525z"/>'); // eslint-disable-next-line

var BIconTypeBold = /*#__PURE__*/make_icon_makeIcon('TypeBold', '<path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 001.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"/>'); // eslint-disable-next-line

var BIconTypeH1 = /*#__PURE__*/make_icon_makeIcon('TypeH1', '<path d="M8.637 13V3.669H7.379V7.62H2.758V3.67H1.5V13h1.258V8.728h4.62V13h1.259zm5.329 0V3.669h-1.244L10.5 5.316v1.265l2.16-1.565h.062V13h1.244z"/>'); // eslint-disable-next-line

var BIconTypeH2 = /*#__PURE__*/make_icon_makeIcon('TypeH2', '<path d="M7.638 13V3.669H6.38V7.62H1.759V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.022-6.733v-.048c0-.889.63-1.668 1.716-1.668.957 0 1.675.608 1.675 1.572 0 .855-.554 1.504-1.067 2.085l-3.513 3.999V13H15.5v-1.094h-4.245v-.075l2.481-2.844c.875-.998 1.586-1.784 1.586-2.953 0-1.463-1.155-2.556-2.919-2.556-1.941 0-2.966 1.326-2.966 2.74v.049h1.223z"/>'); // eslint-disable-next-line

var BIconTypeH3 = /*#__PURE__*/make_icon_makeIcon('TypeH3', '<path d="M7.637 13V3.669H6.379V7.62H1.758V3.67H.5V13h1.258V8.728h4.62V13h1.259zm3.625-4.272h1.018c1.142 0 1.935.67 1.949 1.674.013 1.005-.78 1.737-2.01 1.73-1.08-.007-1.853-.588-1.935-1.32H9.108c.069 1.327 1.224 2.386 3.083 2.386 1.935 0 3.343-1.155 3.309-2.789-.027-1.51-1.251-2.16-2.037-2.249v-.068c.704-.123 1.764-.91 1.723-2.229-.035-1.353-1.176-2.4-2.954-2.385-1.873.006-2.857 1.162-2.898 2.358h1.196c.062-.69.711-1.299 1.696-1.299.998 0 1.695.622 1.695 1.525.007.922-.718 1.592-1.695 1.592h-.964v1.074z"/>'); // eslint-disable-next-line

var BIconTypeItalic = /*#__PURE__*/make_icon_makeIcon('TypeItalic', '<path d="M7.991 11.674L9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z"/>'); // eslint-disable-next-line

var BIconTypeStrikethrough = /*#__PURE__*/make_icon_makeIcon('TypeStrikethrough', '<path d="M8.527 13.164c-2.153 0-3.589-1.107-3.705-2.81h1.23c.144 1.06 1.129 1.703 2.544 1.703 1.34 0 2.31-.705 2.31-1.675 0-.827-.547-1.374-1.914-1.675L8.046 8.5h3.45c.468.437.675.994.675 1.697 0 1.826-1.436 2.967-3.644 2.967zM6.602 6.5H5.167a2.776 2.776 0 01-.099-.76c0-1.627 1.436-2.768 3.48-2.768 1.969 0 3.39 1.175 3.445 2.85h-1.23c-.11-1.08-.964-1.743-2.25-1.743-1.23 0-2.18.602-2.18 1.607 0 .31.083.581.27.814z"/><path fill-rule="evenodd" d="M15 8.5H1v-1h14v1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconTypeUnderline = /*#__PURE__*/make_icon_makeIcon('TypeUnderline', '<path d="M5.313 3.136h-1.23V9.54c0 2.105 1.47 3.623 3.917 3.623s3.917-1.518 3.917-3.623V3.136h-1.23v6.323c0 1.49-.978 2.57-2.687 2.57-1.709 0-2.687-1.08-2.687-2.57V3.136z"/><path fill-rule="evenodd" d="M12.5 15h-9v-1h9v1z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconUnion = /*#__PURE__*/make_icon_makeIcon('Union', '<path d="M4 5.5A1.5 1.5 0 015.5 4h9A1.5 1.5 0 0116 5.5v9a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 014 14.5v-9z"/><path d="M0 1.5A1.5 1.5 0 011.5 0h9A1.5 1.5 0 0112 1.5v9a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 010 10.5v-9z"/>'); // eslint-disable-next-line

var BIconUnlock = /*#__PURE__*/make_icon_makeIcon('Unlock', '<path fill-rule="evenodd" d="M9.655 8H2.333c-.264 0-.398.068-.471.121a.73.73 0 00-.224.296 1.626 1.626 0 00-.138.59V14c0 .342.076.531.14.635.064.106.151.18.256.237a1.122 1.122 0 00.436.127l.013.001h7.322c.264 0 .398-.068.471-.121a.73.73 0 00.224-.296 1.627 1.627 0 00.138-.59V9c0-.342-.076-.531-.14-.635a.658.658 0 00-.255-.237A1.122 1.122 0 009.655 8zm.012-1H2.333C.5 7 .5 9 .5 9v5c0 2 1.833 2 1.833 2h7.334c1.833 0 1.833-2 1.833-2V9c0-2-1.833-2-1.833-2zM8.5 4a3.5 3.5 0 117 0v3h-1V4a2.5 2.5 0 00-5 0v3h-1V4z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconUnlockFill = /*#__PURE__*/make_icon_makeIcon('UnlockFill', '<path d="M.5 9a2 2 0 012-2h7a2 2 0 012 2v5a2 2 0 01-2 2h-7a2 2 0 01-2-2V9z"/><path fill-rule="evenodd" d="M8.5 4a3.5 3.5 0 117 0v3h-1V4a2.5 2.5 0 00-5 0v3h-1V4z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconUpload = /*#__PURE__*/make_icon_makeIcon('Upload', '<path fill-rule="evenodd" d="M.5 8a.5.5 0 01.5.5V12a1 1 0 001 1h12a1 1 0 001-1V8.5a.5.5 0 011 0V12a2 2 0 01-2 2H2a2 2 0 01-2-2V8.5A.5.5 0 01.5 8zM5 4.854a.5.5 0 00.707 0L8 2.56l2.293 2.293A.5.5 0 1011 4.146L8.354 1.5a.5.5 0 00-.708 0L5 4.146a.5.5 0 000 .708z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 2a.5.5 0 01.5.5v8a.5.5 0 01-1 0v-8A.5.5 0 018 2z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconViewList = /*#__PURE__*/make_icon_makeIcon('ViewList', '<path fill-rule="evenodd" d="M3 4.5h10a2 2 0 012 2v3a2 2 0 01-2 2H3a2 2 0 01-2-2v-3a2 2 0 012-2zm0 1a1 1 0 00-1 1v3a1 1 0 001 1h10a1 1 0 001-1v-3a1 1 0 00-1-1H3zM1 2a.5.5 0 01.5-.5h13a.5.5 0 010 1h-13A.5.5 0 011 2zm0 12a.5.5 0 01.5-.5h13a.5.5 0 010 1h-13A.5.5 0 011 14z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconViewStacked = /*#__PURE__*/make_icon_makeIcon('ViewStacked', '<path fill-rule="evenodd" d="M3 0h10a2 2 0 012 2v3a2 2 0 01-2 2H3a2 2 0 01-2-2V2a2 2 0 012-2zm0 1a1 1 0 00-1 1v3a1 1 0 001 1h10a1 1 0 001-1V2a1 1 0 00-1-1H3zm0 8h10a2 2 0 012 2v3a2 2 0 01-2 2H3a2 2 0 01-2-2v-3a2 2 0 012-2zm0 1a1 1 0 00-1 1v3a1 1 0 001 1h10a1 1 0 001-1v-3a1 1 0 00-1-1H3z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconVolumeDown = /*#__PURE__*/make_icon_makeIcon('VolumeDown', '<path fill-rule="evenodd" d="M8.717 3.55A.5.5 0 019 4v8a.5.5 0 01-.812.39L5.825 10.5H3.5A.5.5 0 013 10V6a.5.5 0 01.5-.5h2.325l2.363-1.89a.5.5 0 01.529-.06zM8 5.04L6.312 6.39A.5.5 0 016 6.5H4v3h2a.5.5 0 01.312.11L8 10.96V5.04z" clip-rule="evenodd"/><path d="M10.707 11.182A4.486 4.486 0 0012.025 8a4.486 4.486 0 00-1.318-3.182L10 5.525A3.489 3.489 0 0111.025 8c0 .966-.392 1.841-1.025 2.475l.707.707z"/>'); // eslint-disable-next-line

var BIconVolumeDownFill = /*#__PURE__*/make_icon_makeIcon('VolumeDownFill', '<path fill-rule="evenodd" d="M8.717 3.55A.5.5 0 019 4v8a.5.5 0 01-.812.39L5.825 10.5H3.5A.5.5 0 013 10V6a.5.5 0 01.5-.5h2.325l2.363-1.89a.5.5 0 01.529-.06z" clip-rule="evenodd"/><path d="M10.707 11.182A4.486 4.486 0 0012.025 8a4.486 4.486 0 00-1.318-3.182L10 5.525A3.489 3.489 0 0111.025 8c0 .966-.392 1.841-1.025 2.475l.707.707z"/>'); // eslint-disable-next-line

var BIconVolumeMute = /*#__PURE__*/make_icon_makeIcon('VolumeMute', '<path fill-rule="evenodd" d="M6.717 3.55A.5.5 0 017 4v8a.5.5 0 01-.812.39L3.825 10.5H1.5A.5.5 0 011 10V6a.5.5 0 01.5-.5h2.325l2.363-1.89a.5.5 0 01.529-.06zM6 5.04L4.312 6.39A.5.5 0 014 6.5H2v3h2a.5.5 0 01.312.11L6 10.96V5.04zm7.854.606a.5.5 0 010 .708l-4 4a.5.5 0 01-.708-.708l4-4a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M9.146 5.646a.5.5 0 000 .708l4 4a.5.5 0 00.708-.708l-4-4a.5.5 0 00-.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconVolumeMuteFill = /*#__PURE__*/make_icon_makeIcon('VolumeMuteFill', '<path fill-rule="evenodd" d="M6.717 3.55A.5.5 0 017 4v8a.5.5 0 01-.812.39L3.825 10.5H1.5A.5.5 0 011 10V6a.5.5 0 01.5-.5h2.325l2.363-1.89a.5.5 0 01.529-.06zm7.137 1.596a.5.5 0 010 .708l-4 4a.5.5 0 01-.708-.708l4-4a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M9.146 5.146a.5.5 0 000 .708l4 4a.5.5 0 00.708-.708l-4-4a.5.5 0 00-.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconVolumeUp = /*#__PURE__*/make_icon_makeIcon('VolumeUp', '<path fill-rule="evenodd" d="M6.717 3.55A.5.5 0 017 4v8a.5.5 0 01-.812.39L3.825 10.5H1.5A.5.5 0 011 10V6a.5.5 0 01.5-.5h2.325l2.363-1.89a.5.5 0 01.529-.06zM6 5.04L4.312 6.39A.5.5 0 014 6.5H2v3h2a.5.5 0 01.312.11L6 10.96V5.04z" clip-rule="evenodd"/><path d="M11.536 14.01A8.473 8.473 0 0014.026 8a8.473 8.473 0 00-2.49-6.01l-.708.707A7.476 7.476 0 0113.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/><path d="M10.121 12.596A6.48 6.48 0 0012.025 8a6.48 6.48 0 00-1.904-4.596l-.707.707A5.483 5.483 0 0111.025 8a5.483 5.483 0 01-1.61 3.89l.706.706z"/><path d="M8.707 11.182A4.486 4.486 0 0010.025 8a4.486 4.486 0 00-1.318-3.182L8 5.525A3.489 3.489 0 019.025 8 3.49 3.49 0 018 10.475l.707.707z"/>'); // eslint-disable-next-line

var BIconVolumeUpFill = /*#__PURE__*/make_icon_makeIcon('VolumeUpFill', '<path d="M11.536 14.01A8.473 8.473 0 0014.026 8a8.473 8.473 0 00-2.49-6.01l-.708.707A7.476 7.476 0 0113.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/><path d="M10.121 12.596A6.48 6.48 0 0012.025 8a6.48 6.48 0 00-1.904-4.596l-.707.707A5.483 5.483 0 0111.025 8a5.483 5.483 0 01-1.61 3.89l.706.706z"/><path d="M8.707 11.182A4.486 4.486 0 0010.025 8a4.486 4.486 0 00-1.318-3.182L8 5.525A3.489 3.489 0 019.025 8 3.49 3.49 0 018 10.475l.707.707z"/><path fill-rule="evenodd" d="M6.717 3.55A.5.5 0 017 4v8a.5.5 0 01-.812.39L3.825 10.5H1.5A.5.5 0 011 10V6a.5.5 0 01.5-.5h2.325l2.363-1.89a.5.5 0 01.529-.06z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconVr = /*#__PURE__*/make_icon_makeIcon('Vr', '<path d="M3 12V4a1 1 0 011-1h2.5V2H4a2 2 0 00-2 2v8a2 2 0 002 2h2.5v-1H4a1 1 0 01-1-1zm6.5 1v1H12a2 2 0 002-2V4a2 2 0 00-2-2H9.5v1H12a1 1 0 011 1v8a1 1 0 01-1 1H9.5z"/><path fill-rule="evenodd" d="M8 16a.5.5 0 01-.5-.5V.5a.5.5 0 011 0v15a.5.5 0 01-.5.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconWallet = /*#__PURE__*/make_icon_makeIcon('Wallet', '<path fill-rule="evenodd" d="M1.5 3a.5.5 0 00-.5.5v2h5a.5.5 0 01.5.5c0 .253.08.644.306.958.207.288.557.542 1.194.542.637 0 .987-.254 1.194-.542.226-.314.306-.705.306-.958a.5.5 0 01.5-.5h5v-2a.5.5 0 00-.5-.5h-13zM15 6.5h-4.551a2.678 2.678 0 01-.443 1.042C9.613 8.088 8.963 8.5 8 8.5c-.963 0-1.613-.412-2.006-.958A2.679 2.679 0 015.551 6.5H1v6a.5.5 0 00.5.5h13a.5.5 0 00.5-.5v-6zm-15-3A1.5 1.5 0 011.5 2h13A1.5 1.5 0 0116 3.5v9a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 010 12.5v-9z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconWatch = /*#__PURE__*/make_icon_makeIcon('Watch', '<path fill-rule="evenodd" d="M4 14.333v-1.86A5.985 5.985 0 012 8c0-1.777.772-3.374 2-4.472V1.667C4 .747 4.746 0 5.667 0h4.666C11.253 0 12 .746 12 1.667v1.86A5.985 5.985 0 0114 8a5.985 5.985 0 01-2 4.472v1.861c0 .92-.746 1.667-1.667 1.667H5.667C4.747 16 4 15.254 4 14.333zM13 8A5 5 0 103 8a5 5 0 0010 0z" clip-rule="evenodd"/><rect width="1" height="2" x="13.5" y="7" rx=".5"/><path fill-rule="evenodd" d="M8 4.5a.5.5 0 01.5.5v3a.5.5 0 01-.5.5H6a.5.5 0 010-1h1.5V5a.5.5 0 01.5-.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconWifi = /*#__PURE__*/make_icon_makeIcon('Wifi', '<path fill-rule="evenodd" d="M6.858 11.858A1.991 1.991 0 018 11.5c.425 0 .818.132 1.142.358L8 13l-1.142-1.142z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M7.731 12.024l.269.269.269-.269a1.507 1.507 0 00-.538 0zm-1.159-.576A2.49 2.49 0 018 11c.53 0 1.023.165 1.428.448a.5.5 0 01.068.763l-1.142 1.143a.5.5 0 01-.708 0L6.504 12.21a.5.5 0 01.354-.853v.5l-.286-.41zM8 9.5a4.478 4.478 0 00-2.7.9.5.5 0 01-.6-.8c.919-.69 2.062-1.1 3.3-1.1s2.381.41 3.3 1.1a.5.5 0 01-.6.8A4.478 4.478 0 008 9.5zm0-3c-1.833 0-3.51.657-4.814 1.748a.5.5 0 01-.642-.766A8.468 8.468 0 018 5.5c2.076 0 3.98.745 5.456 1.982a.5.5 0 11-.642.766A7.468 7.468 0 008 6.5z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M8 3.5c-2.657 0-5.082.986-6.932 2.613a.5.5 0 11-.66-.75A11.458 11.458 0 018 2.5c2.91 0 5.567 1.081 7.592 2.862a.5.5 0 11-.66.751A10.458 10.458 0 008 3.5z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconWindow = /*#__PURE__*/make_icon_makeIcon('Window', '<path fill-rule="evenodd" d="M14 2H2a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V3a1 1 0 00-1-1zM2 1a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V3a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M15 6H1V5h14v1z" clip-rule="evenodd"/><path d="M3 3.5a.5.5 0 11-1 0 .5.5 0 011 0zm1.5 0a.5.5 0 11-1 0 .5.5 0 011 0zm1.5 0a.5.5 0 11-1 0 .5.5 0 011 0z"/>'); // eslint-disable-next-line

var BIconWrench = /*#__PURE__*/make_icon_makeIcon('Wrench', '<path fill-rule="evenodd" d="M.102 2.223A3.004 3.004 0 003.78 5.897l6.341 6.252A3.003 3.003 0 0013 16a3 3 0 10-.851-5.878L5.897 3.781A3.004 3.004 0 002.223.1l2.141 2.142L4 4l-1.757.364L.102 2.223zm13.37 9.019L13 11l-.471.242-.529.026-.287.445-.445.287-.026.529L11 13l.242.471.026.529.445.287.287.445.529.026L13 15l.471-.242.529-.026.287-.445.445-.287.026-.529L15 13l-.242-.471-.026-.529-.445-.287-.287-.445-.529-.026z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconX = /*#__PURE__*/make_icon_makeIcon('X', '<path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconXCircle = /*#__PURE__*/make_icon_makeIcon('XCircle', '<path fill-rule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconXCircleFill = /*#__PURE__*/make_icon_makeIcon('XCircleFill', '<path fill-rule="evenodd" d="M16 8A8 8 0 110 8a8 8 0 0116 0zm-4.146-3.146a.5.5 0 00-.708-.708L8 7.293 4.854 4.146a.5.5 0 10-.708.708L7.293 8l-3.147 3.146a.5.5 0 00.708.708L8 8.707l3.146 3.147a.5.5 0 00.708-.708L8.707 8l3.147-3.146z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconXDiamond = /*#__PURE__*/make_icon_makeIcon('XDiamond', '<path fill-rule="evenodd" d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 010-2.098L6.95.435zm1.4.7a.495.495 0 00-.7 0L1.134 7.65a.495.495 0 000 .7l6.516 6.516a.495.495 0 00.7 0l6.516-6.516a.495.495 0 000-.7L8.35 1.134z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconXDiamondFill = /*#__PURE__*/make_icon_makeIcon('XDiamondFill', '<path fill-rule="evenodd" d="M9.05.435c-.58-.58-1.52-.58-2.1 0L4.047 3.339 8 7.293l3.954-3.954L9.049.435zm3.61 3.611L8.708 8l3.954 3.954 2.904-2.905c.58-.58.58-1.519 0-2.098l-2.904-2.905zm-.706 8.615L8 8.707l-3.954 3.954 2.905 2.904c.58.58 1.519.58 2.098 0l2.905-2.904zm-8.615-.707L7.293 8 3.339 4.046.435 6.951c-.58.58-.58 1.519 0 2.098l2.904 2.905z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconXOctagon = /*#__PURE__*/make_icon_makeIcon('XOctagon', '<path fill-rule="evenodd" d="M4.54.146A.5.5 0 014.893 0h6.214a.5.5 0 01.353.146l4.394 4.394a.5.5 0 01.146.353v6.214a.5.5 0 01-.146.353l-4.394 4.394a.5.5 0 01-.353.146H4.893a.5.5 0 01-.353-.146L.146 11.46A.5.5 0 010 11.107V4.893a.5.5 0 01.146-.353L4.54.146zM5.1 1L1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconXOctagonFill = /*#__PURE__*/make_icon_makeIcon('XOctagonFill', '<path fill-rule="evenodd" d="M11.46.146A.5.5 0 0011.107 0H4.893a.5.5 0 00-.353.146L.146 4.54A.5.5 0 000 4.893v6.214a.5.5 0 00.146.353l4.394 4.394a.5.5 0 00.353.146h6.214a.5.5 0 00.353-.146l4.394-4.394a.5.5 0 00.146-.353V4.893a.5.5 0 00-.146-.353L11.46.146zm.394 4.708a.5.5 0 00-.708-.708L8 7.293 4.854 4.146a.5.5 0 10-.708.708L7.293 8l-3.147 3.146a.5.5 0 00.708.708L8 8.707l3.146 3.147a.5.5 0 00.708-.708L8.707 8l3.147-3.146z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconXSquare = /*#__PURE__*/make_icon_makeIcon('XSquare', '<path fill-rule="evenodd" d="M14 1H2a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V2a1 1 0 00-1-1zM2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z" clip-rule="evenodd"/>'); // eslint-disable-next-line

var BIconXSquareFill = /*#__PURE__*/make_icon_makeIcon('XSquareFill', '<path fill-rule="evenodd" d="M2 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V2a2 2 0 00-2-2H2zm9.854 4.854a.5.5 0 00-.708-.708L8 7.293 4.854 4.146a.5.5 0 10-.708.708L7.293 8l-3.147 3.146a.5.5 0 00.708.708L8 8.707l3.146 3.147a.5.5 0 00.708-.708L8.707 8l3.147-3.146z" clip-rule="evenodd"/>'); // --- END AUTO-GENERATED FILE ---
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/bv-form-btn-label-control.js
function bv_form_btn_label_control_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
// Private component used by `b-form-datepicker` and `b-form-timepicker`
//







 // Re-export common dropdown props used for convenience

var dropdownProps = commonProps; // @vue/component

var BVFormBtnLabelControl = /*#__PURE__*/vue.extend({
  name: 'BVFormBtnLabelControl',
  directives: {
    BHover: VBHover
  },
  mixins: [mixins_id, mixins_normalize_slot, dropdown],
  props: {
    value: {
      // This is the value placed on the hidden input
      type: String,
      default: ''
    },
    formattedValue: {
      // This is the value shown in the label
      // Defaults back to `value`
      type: String // default: null

    },
    placeholder: {
      // This is the value placed on the hidden input when no value selected
      type: String // default: null

    },
    labelSelected: {
      // Value placed in sr-only span inside label when value is present
      type: String // default: null

    },
    state: {
      // Tri-state prop: `true`, `false`, or `null`
      type: Boolean,
      // We must explicitly default to `null` here otherwise
      // Vue coerces `undefined` into Boolean `false`
      default: null
    },
    size: {
      type: String // default: null

    },
    name: {
      type: String // default: null

    },
    form: {
      type: String // default: null

    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    lang: {
      type: String // default: null

    },
    rtl: {
      // Tri-state prop: `true`, `false` or `null`
      type: Boolean,
      // We must explicitly default to `null` here otherwise
      // Vue coerces `undefined` into Boolean `false`
      default: null
    },
    buttonOnly: {
      // When true, renders a btn-group wrapper and visually hides the label
      type: Boolean,
      default: false
    },
    buttonVariant: {
      // Applicable in button mode only
      type: String,
      default: 'secondary'
    },
    menuClass: {
      // Extra classes to apply to the `dropdown-menu` div
      type: [String, Array, Object] // default: null

    }
  },
  data: function data() {
    return {
      isHovered: false,
      hasFocus: false
    };
  },
  computed: {
    idButton: function idButton() {
      return this.safeId();
    },
    idLabel: function idLabel() {
      return this.safeId('_value_');
    },
    idMenu: function idMenu() {
      return this.safeId('_dialog_');
    },
    idWrapper: function idWrapper() {
      return this.safeId('_outer_');
    },
    computedDir: function computedDir() {
      return this.rtl === true ? 'rtl' : this.rtl === false ? 'ltr' : null;
    }
  },
  methods: {
    focus: function focus() {
      if (!this.disabled) {
        attemptFocus(this.$refs.toggle);
      }
    },
    blur: function blur() {
      if (!this.disabled) {
        attemptBlur(this.$refs.toggle);
      }
    },
    setFocus: function setFocus(evt) {
      this.hasFocus = evt.type === 'focus';
    },
    handleHover: function handleHover(hovered) {
      this.isHovered = hovered;
    },

    /* istanbul ignore next */
    stopEvent: function stopEvent(evt)
    /* istanbul ignore next */
    {
      evt.stopPropagation();
    }
  },
  render: function render(h) {
    var _class, _class2, _ref;

    var idButton = this.idButton;
    var idLabel = this.idLabel;
    var idMenu = this.idMenu;
    var idWrapper = this.idWrapper;
    var disabled = this.disabled;
    var readonly = this.readonly;
    var required = this.required;
    var isHovered = this.isHovered;
    var hasFocus = this.hasFocus;
    var state = this.state;
    var visible = this.visible;
    var size = this.size;
    var value = string_toString(this.value) || '';
    var labelSelected = this.labelSelected;
    var buttonOnly = !!this.buttonOnly;
    var buttonVariant = this.buttonVariant;
    var btnScope = {
      isHovered: isHovered,
      hasFocus: hasFocus,
      state: state,
      opened: visible
    };
    var $button = h('button', {
      ref: 'toggle',
      staticClass: 'btn',
      class: (_class = {}, bv_form_btn_label_control_defineProperty(_class, "btn-".concat(buttonVariant), buttonOnly), bv_form_btn_label_control_defineProperty(_class, "btn-".concat(size), !!size), bv_form_btn_label_control_defineProperty(_class, 'h-auto', !buttonOnly), bv_form_btn_label_control_defineProperty(_class, 'dropdown-toggle', buttonOnly), bv_form_btn_label_control_defineProperty(_class, 'dropdown-toggle-no-caret', buttonOnly), _class),
      attrs: {
        id: idButton,
        type: 'button',
        disabled: disabled,
        'aria-haspopup': 'dialog',
        'aria-expanded': visible ? 'true' : 'false',
        'aria-invalid': state === false || required && !value ? 'true' : null,
        'aria-required': required ? 'true' : null
      },
      directives: [{
        name: 'b-hover',
        value: this.handleHover
      }],
      on: {
        mousedown: this.onMousedown,
        click: this.toggle,
        keydown: this.toggle,
        // Handle ENTER, SPACE and DOWN
        '!focus': this.setFocus,
        '!blur': this.setFocus
      }
    }, [this.hasNormalizedSlot('button-content') ? this.normalizeSlot('button-content', btnScope) :
    /* istanbul ignore next */
    h(BIconChevronDown, {
      props: {
        scale: 1.25
      }
    })]); // Hidden input

    var $hidden = h();

    if (this.name && !disabled) {
      $hidden = h('input', {
        attrs: {
          type: 'hidden',
          name: this.name || null,
          form: this.form || null,
          value: value
        }
      });
    } // Dropdown content


    var $menu = h('div', {
      ref: 'menu',
      staticClass: 'dropdown-menu',
      class: [this.menuClass, {
        show: visible,
        'dropdown-menu-right': this.right
      }],
      attrs: {
        id: idMenu,
        role: 'dialog',
        tabindex: '-1',
        'aria-modal': 'false',
        'aria-labelledby': idLabel
      },
      on: {
        keydown: this.onKeydown // Handle ESC

      }
    }, [this.normalizeSlot('default', {
      opened: visible
    })]); // Value label

    var $label = h('label', {
      staticClass: 'form-control text-break text-wrap bg-transparent h-auto',
      class: (_class2 = {
        // Hidden in button only mode
        'sr-only': buttonOnly,
        // Mute the text if showing the placeholder
        'text-muted': !value
      }, bv_form_btn_label_control_defineProperty(_class2, "form-control-".concat(size), !!size), bv_form_btn_label_control_defineProperty(_class2, 'is-invalid', state === false), bv_form_btn_label_control_defineProperty(_class2, 'is-valid', state === true), _class2),
      attrs: {
        id: idLabel,
        for: idButton,
        'aria-invalid': state === false || required && !value ? 'true' : null,
        'aria-required': required ? 'true' : null
      },
      directives: [{
        name: 'b-hover',
        value: this.handleHover
      }],
      on: {
        // Disable bubbling of the click event to
        // prevent menu from closing and re-opening
        '!click': this.stopEvent
      }
    }, [value ? this.formattedValue || value : this.placeholder || '', // Add the selected label for screen readers when a value is provided
    value && labelSelected ? h('bdi', {
      staticClass: 'sr-only'
    }, labelSelected) : '']); // Return the custom form control wrapper

    return h('div', {
      staticClass: 'b-form-btn-label-control dropdown',
      class: [this.directionClass, (_ref = {
        'btn-group': buttonOnly,
        'form-control': !buttonOnly
      }, bv_form_btn_label_control_defineProperty(_ref, "form-control-".concat(size), !!size && !buttonOnly), bv_form_btn_label_control_defineProperty(_ref, 'd-flex', !buttonOnly), bv_form_btn_label_control_defineProperty(_ref, 'h-auto', !buttonOnly), bv_form_btn_label_control_defineProperty(_ref, 'align-items-stretch', !buttonOnly), bv_form_btn_label_control_defineProperty(_ref, "focus", hasFocus && !buttonOnly), bv_form_btn_label_control_defineProperty(_ref, "show", visible), bv_form_btn_label_control_defineProperty(_ref, 'is-valid', state === true), bv_form_btn_label_control_defineProperty(_ref, 'is-invalid', state === false), _ref)],
      attrs: {
        id: idWrapper,
        role: buttonOnly ? null : 'group',
        lang: this.lang || null,
        dir: this.computedDir,
        'aria-disabled': disabled,
        'aria-readonly': readonly && !disabled,
        'aria-labelledby': idLabel,
        'aria-invalid': state === false || required && !value ? 'true' : null,
        'aria-required': required ? 'true' : null
      }
    }, [$button, $hidden, $menu, $label]);
  }
});
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/pluck-props.js



/**
 * Given an array of properties or an object of property keys,
 * plucks all the values off the target object, returning a new object
 * that has props that reference the original prop values
 *
 * @param {{}|string[]} keysToPluck
 * @param {{}} objToPluck
 * @param {Function} transformFn
 * @return {{}}
 */

var pluck_props_pluckProps = function pluckProps(keysToPluck, objToPluck) {
  var transformFn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : utils_identity;
  return (isArray(keysToPluck) ? keysToPluck.slice() : keys(keysToPluck)).reduce(function (memo, prop) {
    memo[transformFn(prop)] = objToPluck[prop];
    return memo;
  }, {});
};

/* harmony default export */ var pluck_props = (pluck_props_pluckProps);
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/components/button/button.js
function button_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function button_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { button_ownKeys(Object(source), true).forEach(function (key) { button_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { button_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function button_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











 // --- Constants --

var NAME = 'BButton';
var btnProps = {
  block: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: function _default() {
      return getComponentConfig(NAME, 'size');
    }
  },
  variant: {
    type: String,
    default: function _default() {
      return getComponentConfig(NAME, 'variant');
    }
  },
  type: {
    type: String,
    default: 'button'
  },
  tag: {
    type: String,
    default: 'button'
  },
  pill: {
    type: Boolean,
    default: false
  },
  squared: {
    type: Boolean,
    default: false
  },
  pressed: {
    // Tri-state: `true`, `false` or `null`
    // => On, off, not a toggle
    type: Boolean,
    default: null
  }
};
var linkProps = propsFactory();
delete linkProps.href.default;
delete linkProps.to.default;
var linkPropKeys = keys(linkProps);
var button_props = button_objectSpread(button_objectSpread({}, linkProps), btnProps); // --- Helper methods ---
// Returns `true` if a tag's name equals `name`

var button_tagIs = function tagIs(tag, name) {
  return string_toString(tag).toLowerCase() === string_toString(name).toLowerCase();
}; // Focus handler for toggle buttons
// Needs class of 'focus' when focused


var button_handleFocus = function handleFocus(evt) {
  if (evt.type === 'focusin') {
    addClass(evt.target, 'focus');
  } else if (evt.type === 'focusout') {
    removeClass(evt.target, 'focus');
  }
}; // Is the requested button a link?
// If tag prop is set to `a`, we use a <b-link> to get proper disabled handling


var isLink = function isLink(props) {
  return props.href || props.to || button_tagIs(props.tag, 'a');
}; // Is the button to be a toggle button?


var button_isToggle = function isToggle(props) {
  return isBoolean(props.pressed);
}; // Is the button "really" a button?


var isButton = function isButton(props) {
  return !(isLink(props) || props.tag && !button_tagIs(props.tag, 'button'));
}; // Is the requested tag not a button or link?


var isNonStandardTag = function isNonStandardTag(props) {
  return !isLink(props) && !isButton(props);
}; // Compute required classes (non static classes)


var button_computeClass = function computeClass(props) {
  var _ref;

  return ["btn-".concat(props.variant || getComponentConfig(NAME, 'variant')), (_ref = {}, button_defineProperty(_ref, "btn-".concat(props.size), props.size), button_defineProperty(_ref, 'btn-block', props.block), button_defineProperty(_ref, 'rounded-pill', props.pill), button_defineProperty(_ref, 'rounded-0', props.squared && !props.pill), button_defineProperty(_ref, "disabled", props.disabled), button_defineProperty(_ref, "active", props.pressed), _ref)];
}; // Compute the link props to pass to b-link (if required)


var button_computeLinkProps = function computeLinkProps(props) {
  return isLink(props) ? pluck_props(linkPropKeys, props) : null;
}; // Compute the attributes for a button


var computeAttrs = function computeAttrs(props, data) {
  var button = isButton(props);
  var link = isLink(props);
  var toggle = button_isToggle(props);
  var nonStandardTag = isNonStandardTag(props);
  var hashLink = link && props.href === '#';
  var role = data.attrs && data.attrs.role ? data.attrs.role : null;
  var tabindex = data.attrs ? data.attrs.tabindex : null;

  if (nonStandardTag || hashLink) {
    tabindex = '0';
  }

  return {
    // Type only used for "real" buttons
    type: button && !link ? props.type : null,
    // Disabled only set on "real" buttons
    disabled: button ? props.disabled : null,
    // We add a role of button when the tag is not a link or button for ARIA
    // Don't bork any role provided in `data.attrs` when `isLink` or `isButton`
    // Except when link has `href` of `#`
    role: nonStandardTag || hashLink ? 'button' : role,
    // We set the `aria-disabled` state for non-standard tags
    'aria-disabled': nonStandardTag ? String(props.disabled) : null,
    // For toggles, we need to set the pressed state for ARIA
    'aria-pressed': toggle ? String(props.pressed) : null,
    // `autocomplete="off"` is needed in toggle mode to prevent some browsers
    // from remembering the previous setting when using the back button
    autocomplete: toggle ? 'off' : null,
    // `tabindex` is used when the component is not a button
    // Links are tabbable, but don't allow disabled, while non buttons or links
    // are not tabbable, so we mimic that functionality by disabling tabbing
    // when disabled, and adding a `tabindex="0"` to non buttons or non links
    tabindex: props.disabled && !button ? '-1' : tabindex
  };
}; // @vue/component


var BButton = /*#__PURE__*/vue.extend({
  name: NAME,
  functional: true,
  props: button_props,
  render: function render(h, _ref2) {
    var props = _ref2.props,
        data = _ref2.data,
        listeners = _ref2.listeners,
        children = _ref2.children;
    var toggle = button_isToggle(props);
    var link = isLink(props);
    var nonStandardTag = isNonStandardTag(props);
    var hashLink = link && props.href === '#';
    var on = {
      keydown: function keydown(evt) {
        // When the link is a `href="#"` or a non-standard tag (has `role="button"`),
        // we add a keydown handlers for SPACE/ENTER

        /* istanbul ignore next */
        if (props.disabled || !(nonStandardTag || hashLink)) {
          return;
        }

        var keyCode = evt.keyCode; // Add SPACE handler for `href="#"` and ENTER handler for non-standard tags

        if (keyCode === key_codes.SPACE || keyCode === key_codes.ENTER && nonStandardTag) {
          var target = evt.currentTarget || evt.target;
          evt.preventDefault();
          target.click();
        }
      },
      click: function click(evt) {
        /* istanbul ignore if: blink/button disabled should handle this */
        if (props.disabled && isEvent(evt)) {
          evt.stopPropagation();
          evt.preventDefault();
        } else if (toggle && listeners && listeners['update:pressed']) {
          // Send `.sync` updates to any "pressed" prop (if `.sync` listeners)
          // `concat()` will normalize the value to an array without
          // double wrapping an array value in an array
          concat(listeners['update:pressed']).forEach(function (fn) {
            if (isFunction(fn)) {
              fn(!props.pressed);
            }
          });
        }
      }
    };

    if (toggle) {
      on.focusin = button_handleFocus;
      on.focusout = button_handleFocus;
    }

    var componentData = {
      staticClass: 'btn',
      class: button_computeClass(props),
      props: button_computeLinkProps(props),
      attrs: computeAttrs(props, data),
      on: on
    };
    return h(link ? BLink : props.tag, lib_esm_a(data, componentData), children);
  }
});
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/date.js
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || date_unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function date_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return date_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return date_arrayLikeToArray(o, minLen); }

function date_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function date_construct(Parent, args, Class) { if (date_isNativeReflectConstruct()) { date_construct = Reflect.construct; } else { date_construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) date_setPrototypeOf(instance, Class.prototype); return instance; }; } return date_construct.apply(null, arguments); }

function date_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function date_setPrototypeOf(o, p) { date_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return date_setPrototypeOf(o, p); }

// Date utility functions



 // --- Constants ---
// Loose YYYY-MM-DD matching, ignores any appended time inforation
// Matches '1999-12-20', '1999-1-1', '1999-01-20T22:51:49.118Z', '1999-01-02 13:00:00'

var RX_DATE = /^\d+-\d\d?-\d\d?(?:\s|T|$)/; // Used to split off the date parts of the YYYY-MM-DD string

var RX_DATE_SPLIT = /-|\s|T/; // --- Date utility methods ---
// Create or clone a date (`new Date(...)` shortcut)

var createDate = function createDate() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return date_construct(Date, args);
}; // Parse a date sting, or Date object, into a Date object (with no time information)

var date_parseYMD = function parseYMD(date) {
  if (isString(date) && RX_DATE.test(date.trim())) {
    var _date$split$map = date.split(RX_DATE_SPLIT).map(function (v) {
      return toInteger(v, 1);
    }),
        _date$split$map2 = _slicedToArray(_date$split$map, 3),
        year = _date$split$map2[0],
        month = _date$split$map2[1],
        day = _date$split$map2[2];

    return createDate(year, month - 1, day);
  } else if (isDate(date)) {
    return createDate(date.getFullYear(), date.getMonth(), date.getDate());
  }

  return null;
}; // Format a date object as `YYYY-MM-DD` format

var formatYMD = function formatYMD(date) {
  date = date_parseYMD(date);

  if (!date) {
    return null;
  }

  var year = date.getFullYear();
  var month = "0".concat(date.getMonth() + 1).slice(-2);
  var day = "0".concat(date.getDate()).slice(-2);
  return "".concat(year, "-").concat(month, "-").concat(day);
}; // Given a locale (or locales), resolve the browser available locale

var date_resolveLocale = function resolveLocale(locales)
/* istanbul ignore next */
{
  var calendar = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'gregory';
  locales = concat(locales).filter(utils_identity);
  var fmt = new Intl.DateTimeFormat(locales, {
    calendar: calendar
  });
  return fmt.resolvedOptions().locale;
}; // Create a `Intl.DateTimeFormat` formatter function

var createDateFormatter = function createDateFormatter(locale, options)
/* istanbul ignore next */
{
  var dtf = new Intl.DateTimeFormat(locale, options);
  return dtf.format;
}; // Determine if two dates are the same date (ignoring time portion)

var datesEqual = function datesEqual(date1, date2) {
  // Returns true of the date portion of two date objects are equal
  // We don't compare the time portion
  return formatYMD(date1) === formatYMD(date2);
}; // --- Date "math" utility methods (for BCalendar component mainly) ---

var firstDateOfMonth = function firstDateOfMonth(date) {
  date = createDate(date);
  date.setDate(1);
  return date;
};
var lastDateOfMonth = function lastDateOfMonth(date) {
  date = createDate(date);
  date.setMonth(date.getMonth() + 1);
  date.setDate(0);
  return date;
};
var addYears = function addYears(date, numberOfYears) {
  date = createDate(date);
  var month = date.getMonth();
  date.setFullYear(date.getFullYear() + numberOfYears); // Handle Feb 29th for leap years

  if (date.getMonth() !== month) {
    date.setDate(0);
  }

  return date;
};
var oneMonthAgo = function oneMonthAgo(date) {
  date = createDate(date);
  var month = date.getMonth();
  date.setMonth(month - 1); // Handle when days in month are different

  if (date.getMonth() === month) {
    date.setDate(0);
  }

  return date;
};
var oneMonthAhead = function oneMonthAhead(date) {
  date = createDate(date);
  var month = date.getMonth();
  date.setMonth(month + 1); // Handle when days in month are different

  if (date.getMonth() === (month + 2) % 12) {
    date.setDate(0);
  }

  return date;
};
var oneYearAgo = function oneYearAgo(date) {
  return addYears(date, -1);
};
var oneYearAhead = function oneYearAhead(date) {
  return addYears(date, 1);
};
var oneDecadeAgo = function oneDecadeAgo(date) {
  return addYears(date, -10);
};
var oneDecadeAhead = function oneDecadeAhead(date) {
  return addYears(date, 10);
}; // Helper function to constrain a date between two values
// Always returns a `Date` object or `null` if no date passed

var constrainDate = function constrainDate(date) {
  var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  // Ensure values are `Date` objects (or `null`)
  date = date_parseYMD(date);
  min = date_parseYMD(min) || date;
  max = date_parseYMD(max) || date; // Return a new `Date` object (or `null`)

  return date ? date < min ? min : date > max ? max : date : null;
};
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/locale.js
// Localization utilities

 // Languages that are RTL

var RTL_LANGS = ['ar', 'az', 'ckb', 'fa', 'he', 'ks', 'lrc', 'mzn', 'ps', 'sd', 'te', 'ug', 'ur', 'yi'].map(function (locale) {
  return locale.toLowerCase();
}); // Precompile RegExpr

var RX_STRIP_MODS = /-u-.+/; // Returns true if the locale is RTL

var locale_isLocaleRTL = function isLocaleRTL(locale) {
  // Determines if the locale is RTL (only single locale supported)
  var parts = string_toString(locale).toLowerCase().replace(RX_STRIP_MODS, '').split('-');
  var locale1 = parts.slice(0, 2).join('-');
  var locale2 = parts[0];
  return arrayIncludes(RTL_LANGS, locale1) || arrayIncludes(RTL_LANGS, locale2);
};
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/components/form-spinbutton/form-spinbutton.js
function form_spinbutton_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function form_spinbutton_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { form_spinbutton_ownKeys(Object(source), true).forEach(function (key) { form_spinbutton_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { form_spinbutton_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function form_spinbutton_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
















 // --- Constants ---

var form_spinbutton_NAME = 'BFormSpinbutton';
var UP = key_codes.UP,
    DOWN = key_codes.DOWN,
    HOME = key_codes.HOME,
    END = key_codes.END,
    PAGEUP = key_codes.PAGEUP,
    PAGEDOWN = key_codes.PAGEDOWN; // Default for spin button range and step

var DEFAULT_MIN = 1;
var DEFAULT_MAX = 100;
var DEFAULT_STEP = 1; // Delay before auto-repeat in ms

var DEFAULT_REPEAT_DELAY = 500; // Repeat interval in ms

var DEFAULT_REPEAT_INTERVAL = 100; // Repeat rate increased after number of repeats

var DEFAULT_REPEAT_THRESHOLD = 10; // Repeat speed multiplier (step multiplier, must be an integer)

var DEFAULT_REPEAT_MULTIPLIER = 4; // --- BFormSpinbutton ---
// @vue/component

var BFormSpinbutton = /*#__PURE__*/vue.extend({
  name: form_spinbutton_NAME,
  // Mixin order is important!
  mixins: [attrs, mixins_id, mixins_normalize_slot],
  inheritAttrs: false,
  props: {
    value: {
      // Should this really be String, to match native number inputs?
      type: Number,
      default: null
    },
    min: {
      type: [Number, String],
      default: DEFAULT_MIN
    },
    max: {
      type: [Number, String],
      default: DEFAULT_MAX
    },
    step: {
      type: [Number, String],
      default: DEFAULT_STEP
    },
    wrap: {
      type: Boolean,
      default: false
    },
    formatterFn: {
      type: Function // default: null

    },
    size: {
      type: String // default: null

    },
    placeholder: {
      type: String // default: null

    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    required: {
      // Only affects the `aria-invalid` attribute
      type: Boolean,
      default: false
    },
    name: {
      type: String // default: null

    },
    form: {
      type: String // default: null

    },
    state: {
      // Tri-state prop: `true`, `false`, or `null`
      type: Boolean,
      default: null
    },
    inline: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    },
    ariaLabel: {
      type: String // default: null

    },
    ariaControls: {
      type: String // default: null

    },
    labelDecrement: {
      type: String,
      default: function _default() {
        return getComponentConfig(form_spinbutton_NAME, 'labelDecrement');
      }
    },
    labelIncrement: {
      type: String,
      default: function _default() {
        return getComponentConfig(form_spinbutton_NAME, 'labelIncrement');
      }
    },
    locale: {
      type: [String, Array] // default: null

    },
    repeatDelay: {
      type: [Number, String],
      default: DEFAULT_REPEAT_DELAY
    },
    repeatInterval: {
      type: [Number, String],
      default: DEFAULT_REPEAT_INTERVAL
    },
    repeatThreshold: {
      type: [Number, String],
      default: DEFAULT_REPEAT_THRESHOLD
    },
    repeatStepMultiplier: {
      type: [Number, String],
      default: DEFAULT_REPEAT_MULTIPLIER
    }
  },
  data: function data() {
    return {
      localValue: toFloat(this.value, null),
      hasFocus: false
    };
  },
  computed: {
    spinId: function spinId() {
      return this.safeId();
    },
    computedInline: function computedInline() {
      return this.inline && !this.vertical;
    },
    computedReadonly: function computedReadonly() {
      return this.readonly && !this.disabled;
    },
    computedRequired: function computedRequired() {
      return this.required && !this.computedReadonly && !this.disabled;
    },
    computedStep: function computedStep() {
      return toFloat(this.step, DEFAULT_STEP);
    },
    computedMin: function computedMin() {
      return toFloat(this.min, DEFAULT_MIN);
    },
    computedMax: function computedMax() {
      // We round down to the nearest maximum step value
      var max = toFloat(this.max, DEFAULT_MAX);
      var step = this.computedStep;
      var min = this.computedMin;
      return mathFloor((max - min) / step) * step + min;
    },
    computedDelay: function computedDelay() {
      var delay = toInteger(this.repeatDelay, 0);
      return delay > 0 ? delay : DEFAULT_REPEAT_DELAY;
    },
    computedInterval: function computedInterval() {
      var interval = toInteger(this.repeatInterval, 0);
      return interval > 0 ? interval : DEFAULT_REPEAT_INTERVAL;
    },
    computedThreshold: function computedThreshold() {
      return mathMax(toInteger(this.repeatThreshold, DEFAULT_REPEAT_THRESHOLD), 1);
    },
    computedStepMultiplier: function computedStepMultiplier() {
      return mathMax(toInteger(this.repeatStepMultiplier, DEFAULT_REPEAT_MULTIPLIER), 1);
    },
    computedPrecision: function computedPrecision() {
      // Quick and dirty way to get the number of decimals
      var step = this.computedStep;
      return mathFloor(step) === step ? 0 : (step.toString().split('.')[1] || '').length;
    },
    computedMultiplier: function computedMultiplier() {
      return mathPow(10, this.computedPrecision || 0);
    },
    valueAsFixed: function valueAsFixed() {
      var value = this.localValue;
      return isNull(value) ? '' : value.toFixed(this.computedPrecision);
    },
    computedLocale: function computedLocale() {
      var locales = concat(this.locale).filter(utils_identity);
      var nf = new Intl.NumberFormat(locales);
      return nf.resolvedOptions().locale;
    },
    computedRTL: function computedRTL() {
      return locale_isLocaleRTL(this.computedLocale);
    },
    defaultFormatter: function defaultFormatter() {
      // Returns and `Intl.NumberFormat` formatter method reference
      var precision = this.computedPrecision;
      var nf = new Intl.NumberFormat(this.computedLocale, {
        style: 'decimal',
        useGrouping: false,
        minimumIntegerDigits: 1,
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
        notation: 'standard'
      }); // Return the format method reference

      return nf.format;
    },
    computedFormatter: function computedFormatter() {
      return isFunction(this.formatterFn) ? this.formatterFn : this.defaultFormatter;
    },
    computedAttrs: function computedAttrs() {
      return form_spinbutton_objectSpread(form_spinbutton_objectSpread({}, this.bvAttrs), {}, {
        role: 'group',
        lang: this.computedLocale,
        tabindex: this.disabled ? null : '-1',
        title: this.ariaLabel
      });
    },
    computedSpinAttrs: function computedSpinAttrs() {
      var spinId = this.spinId,
          value = this.localValue,
          required = this.computedRequired,
          disabled = this.disabled,
          state = this.state,
          computedFormatter = this.computedFormatter;
      var hasValue = !isNull(value);
      return form_spinbutton_objectSpread(form_spinbutton_objectSpread({
        dir: this.computedRTL ? 'rtl' : 'ltr'
      }, this.bvAttrs), {}, {
        id: spinId,
        role: 'spinbutton',
        tabindex: disabled ? null : '0',
        'aria-live': 'off',
        'aria-label': this.ariaLabel || null,
        'aria-controls': this.ariaControls || null,
        // TODO: May want to check if the value is in range
        'aria-invalid': state === false || !hasValue && required ? 'true' : null,
        'aria-required': required ? 'true' : null,
        // These attrs are required for role spinbutton
        'aria-valuemin': string_toString(this.computedMin),
        'aria-valuemax': string_toString(this.computedMax),
        // These should be `null` if the value is out of range
        // They must also be non-existent attrs if the value is out of range or `null`
        'aria-valuenow': hasValue ? value : null,
        'aria-valuetext': hasValue ? computedFormatter(value) : null
      });
    }
  },
  watch: {
    value: function value(_value) {
      this.localValue = toFloat(_value, null);
    },
    localValue: function localValue(value) {
      this.$emit('input', value);
    },
    disabled: function disabled(_disabled) {
      if (_disabled) {
        this.clearRepeat();
      }
    },
    readonly: function readonly(_readonly) {
      if (_readonly) {
        this.clearRepeat();
      }
    }
  },
  created: function created() {
    // Create non reactive properties
    this.$_autoDelayTimer = null;
    this.$_autoRepeatTimer = null;
    this.$_keyIsDown = false;
  },
  beforeDestroy: function beforeDestroy() {
    this.clearRepeat();
  },

  /* istanbul ignore next */
  deactivated: function deactivated()
  /* istanbul ignore next */
  {
    this.clearRepeat();
  },
  methods: {
    // --- Public methods ---
    focus: function focus() {
      if (!this.disabled) {
        attemptFocus(this.$refs.spinner);
      }
    },
    blur: function blur() {
      if (!this.disabled) {
        attemptBlur(this.$refs.spinner);
      }
    },
    // --- Private methods ---
    emitChange: function emitChange() {
      this.$emit('change', this.localValue);
    },
    stepValue: function stepValue(direction) {
      // Sets a new incremented or decremented value, supporting optional wrapping
      // Direction is either +1 or -1 (or a multiple thereof)
      var value = this.localValue;

      if (!this.disabled && !isNull(value)) {
        var step = this.computedStep * direction;
        var min = this.computedMin;
        var max = this.computedMax;
        var multiplier = this.computedMultiplier;
        var wrap = this.wrap; // We ensure that the value steps like a native input

        value = mathRound((value - min) / step) * step + min + step; // We ensure that precision is maintained (decimals)

        value = mathRound(value * multiplier) / multiplier; // Handle if wrapping is enabled

        this.localValue = value > max ? wrap ? min : max : value < min ? wrap ? max : min : value;
      }
    },
    onFocusBlur: function onFocusBlur(evt) {
      if (!this.disabled) {
        this.hasFocus = evt.type === 'focus';
      } else {
        this.hasFocus = false;
      }
    },
    stepUp: function stepUp() {
      var multiplier = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var value = this.localValue;

      if (isNull(value)) {
        this.localValue = this.computedMin;
      } else {
        this.stepValue(+1 * multiplier);
      }
    },
    stepDown: function stepDown() {
      var multiplier = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var value = this.localValue;

      if (isNull(value)) {
        this.localValue = this.wrap ? this.computedMax : this.computedMin;
      } else {
        this.stepValue(-1 * multiplier);
      }
    },
    onKeydown: function onKeydown(evt) {
      var keyCode = evt.keyCode,
          altKey = evt.altKey,
          ctrlKey = evt.ctrlKey,
          metaKey = evt.metaKey;
      /* istanbul ignore if */

      if (this.disabled || this.readonly || altKey || ctrlKey || metaKey) {
        return;
      }

      if (arrayIncludes([UP, DOWN, HOME, END, PAGEUP, PAGEDOWN], keyCode)) {
        // https://w3c.github.io/aria-practices/#spinbutton
        evt.preventDefault();
        /* istanbul ignore if */

        if (this.$_keyIsDown) {
          // Keypress is already in progress
          return;
        }

        this.resetTimers();

        if (arrayIncludes([UP, DOWN], keyCode)) {
          // The following use the custom auto-repeat handling
          this.$_keyIsDown = true;

          if (keyCode === UP) {
            this.handleStepRepeat(evt, this.stepUp);
          } else if (keyCode === DOWN) {
            this.handleStepRepeat(evt, this.stepDown);
          }
        } else {
          // These use native OS key repeating
          if (keyCode === PAGEUP) {
            this.stepUp(this.computedStepMultiplier);
          } else if (keyCode === PAGEDOWN) {
            this.stepDown(this.computedStepMultiplier);
          } else if (keyCode === HOME) {
            this.localValue = this.computedMin;
          } else if (keyCode === END) {
            this.localValue = this.computedMax;
          }
        }
      }
    },
    onKeyup: function onKeyup(evt) {
      // Emit a change event when the keyup happens
      var keyCode = evt.keyCode,
          altKey = evt.altKey,
          ctrlKey = evt.ctrlKey,
          metaKey = evt.metaKey;
      /* istanbul ignore if */

      if (this.disabled || this.readonly || altKey || ctrlKey || metaKey) {
        return;
      }

      if (arrayIncludes([UP, DOWN, HOME, END, PAGEUP, PAGEDOWN], keyCode)) {
        this.resetTimers();
        this.$_keyIsDown = false;
        evt.preventDefault();
        this.emitChange();
      }
    },
    handleStepRepeat: function handleStepRepeat(evt, stepper) {
      var _this = this;

      var _ref = evt || {},
          type = _ref.type,
          button = _ref.button;

      if (!this.disabled && !this.readonly) {
        /* istanbul ignore if */
        if (type === 'mousedown' && button) {
          // We only respond to left (main === 0) button clicks
          return;
        }

        this.resetTimers(); // Step the counter initially

        stepper(1);
        var threshold = this.computedThreshold;
        var multiplier = this.computedStepMultiplier;
        var delay = this.computedDelay;
        var interval = this.computedInterval; // Initiate the delay/repeat interval

        this.$_autoDelayTimer = setTimeout(function () {
          var count = 0;
          _this.$_autoRepeatTimer = setInterval(function () {
            // After N initial repeats, we increase the incrementing step amount
            // We do this to minimize screen reader announcements of the value
            // (values are announced every change, which can be chatty for SR users)
            // And to make it easer to select a value when the range is large
            stepper(count < threshold ? 1 : multiplier);
            count++;
          }, interval);
        }, delay);
      }
    },
    onMouseup: function onMouseup(evt) {
      // `<body>` listener, only enabled when mousedown starts
      var _ref2 = evt || {},
          type = _ref2.type,
          button = _ref2.button;
      /* istanbul ignore if */


      if (type === 'mouseup' && button) {
        // Ignore non left button (main === 0) mouse button click
        return;
      }

      evt.preventDefault();
      this.resetTimers();
      this.setMouseup(false); // Trigger the change event

      this.emitChange();
    },
    setMouseup: function setMouseup(on) {
      // Enable or disabled the body mouseup/touchend handlers
      // Use try/catch to handle case when called server side
      try {
        eventOnOff(on, document.body, 'mouseup', this.onMouseup, false);
        eventOnOff(on, document.body, 'touchend', this.onMouseup, false);
      } catch (_unused) {}
    },
    resetTimers: function resetTimers() {
      clearTimeout(this.$_autoDelayTimer);
      clearInterval(this.$_autoRepeatTimer);
    },
    clearRepeat: function clearRepeat() {
      this.resetTimers();
      this.setMouseup(false);
      this.$_keyIsDown = false;
    }
  },
  render: function render(h) {
    var _this2 = this,
        _class;

    var spinId = this.spinId,
        value = this.localValue,
        inline = this.computedInline,
        readonly = this.computedReadonly,
        vertical = this.vertical,
        disabled = this.disabled,
        state = this.state,
        size = this.size,
        computedFormatter = this.computedFormatter;
    var hasValue = !isNull(value);

    var makeButton = function makeButton(stepper, label, IconCmp, keyRef, shortcut, btnDisabled, slotName) {
      var $icon = h(IconCmp, {
        props: {
          scale: _this2.hasFocus ? 1.5 : 1.25
        },
        attrs: {
          'aria-hidden': 'true'
        }
      });
      var scope = {
        hasFocus: _this2.hasFocus
      };

      var handler = function handler(evt) {
        if (!disabled && !readonly) {
          evt.preventDefault();

          _this2.setMouseup(true); // Since we `preventDefault()`, we must manually focus the button


          attemptFocus(evt.currentTarget);

          _this2.handleStepRepeat(evt, stepper);
        }
      };

      return h('button', {
        key: keyRef || null,
        ref: keyRef,
        staticClass: 'btn btn-sm border-0 rounded-0',
        class: {
          'py-0': !vertical
        },
        attrs: {
          tabindex: '-1',
          type: 'button',
          disabled: disabled || readonly || btnDisabled,
          'aria-disabled': disabled || readonly || btnDisabled ? 'true' : null,
          'aria-controls': spinId,
          'aria-label': label || null,
          'aria-keyshortcuts': shortcut || null
        },
        on: {
          mousedown: handler,
          touchstart: handler
        }
      }, [h('div', [_this2.normalizeSlot(slotName, scope) || $icon])]);
    }; // TODO: Add button disabled state when `wrap` is `false` and at value max/min


    var $increment = makeButton(this.stepUp, this.labelIncrement, BIconPlus, 'inc', 'ArrowUp', false, 'increment');
    var $decrement = makeButton(this.stepDown, this.labelDecrement, BIconDash, 'dec', 'ArrowDown', false, 'decrement');
    var $hidden = h();

    if (this.name && !disabled) {
      $hidden = h('input', {
        key: 'hidden',
        attrs: {
          type: 'hidden',
          name: this.name,
          form: this.form || null,
          // TODO: Should this be set to '' if value is out of range?
          value: this.valueAsFixed
        }
      });
    }

    var $spin = h( // We use 'output' element to make this accept a `<label for="id">` (Except IE)
    'output', {
      ref: 'spinner',
      key: 'output',
      staticClass: 'flex-grow-1',
      class: {
        'd-flex': vertical,
        'align-self-center': !vertical,
        'align-items-center': vertical,
        'border-top': vertical,
        'border-bottom': vertical,
        'border-left': !vertical,
        'border-right': !vertical
      },
      attrs: this.computedSpinAttrs
    }, [h('bdi', hasValue ? computedFormatter(value) : this.placeholder || '')]);
    return h('div', {
      staticClass: 'b-form-spinbutton form-control',
      class: (_class = {
        disabled: disabled,
        readonly: readonly,
        focus: this.hasFocus
      }, form_spinbutton_defineProperty(_class, "form-control-".concat(size), !!size), form_spinbutton_defineProperty(_class, 'd-inline-flex', inline || vertical), form_spinbutton_defineProperty(_class, 'd-flex', !inline && !vertical), form_spinbutton_defineProperty(_class, 'align-items-stretch', !vertical), form_spinbutton_defineProperty(_class, 'flex-column', vertical), form_spinbutton_defineProperty(_class, 'is-valid', state === true), form_spinbutton_defineProperty(_class, 'is-invalid', state === false), _class),
      attrs: this.computedAttrs,
      on: {
        keydown: this.onKeydown,
        keyup: this.onKeyup,
        // We use capture phase (`!` prefix) since focus and blur do not bubble
        '!focus': this.onFocusBlur,
        '!blur': this.onFocusBlur
      }
    }, vertical ? [$increment, $hidden, $spin, $decrement] : [$decrement, $hidden, $spin, $increment]);
  }
});
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/components/time/time.js
function time_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function time_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { time_ownKeys(Object(source), true).forEach(function (key) { time_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { time_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function time_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function time_slicedToArray(arr, i) { return time_arrayWithHoles(arr) || time_iterableToArrayLimit(arr, i) || time_unsupportedIterableToArray(arr, i) || time_nonIterableRest(); }

function time_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function time_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return time_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return time_arrayLikeToArray(o, minLen); }

function time_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function time_iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function time_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// BTime control (not form input control)
 // Utilities











 // Mixins


 // Sub components used


 // --- Constants ---

var time_NAME = 'BTime';
var NUMERIC = 'numeric';
var LEFT = key_codes.LEFT,
    RIGHT = key_codes.RIGHT; // Time string RegExpr (optional seconds)

var RE_TIME = /^([0-1]?[0-9]|2[0-3]):[0-5]?[0-9](:[0-5]?[0-9])?$/; // --- Helpers ---
// Fallback to BFormSpinbutton prop if no value found

var time_getConfigFallback = function getConfigFallback(prop) {
  return getComponentConfig(time_NAME, prop) || getComponentConfig('BFormSpinbutton', prop);
};

var padLeftZeros = function padLeftZeros(num) {
  return "00".concat(num || '').slice(-2);
};

var time_parseHMS = function parseHMS(hms) {
  hms = string_toString(hms);
  var hh = null,
      mm = null,
      ss = null;

  if (RE_TIME.test(hms)) {
    ;

    var _hms$split$map = hms.split(':').map(function (v) {
      return toInteger(v, null);
    });

    var _hms$split$map2 = time_slicedToArray(_hms$split$map, 3);

    hh = _hms$split$map2[0];
    mm = _hms$split$map2[1];
    ss = _hms$split$map2[2];
  }

  return {
    hours: isUndefinedOrNull(hh) ? null : hh,
    minutes: isUndefinedOrNull(mm) ? null : mm,
    seconds: isUndefinedOrNull(ss) ? null : ss,
    ampm: isUndefinedOrNull(hh) || hh < 12 ? 0 : 1
  };
};

var time_formatHMS = function formatHMS(_ref) {
  var hours = _ref.hours,
      minutes = _ref.minutes,
      seconds = _ref.seconds;
  var requireSeconds = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (isNull(hours) || isNull(minutes) || requireSeconds && isNull(seconds)) {
    return '';
  }

  var hms = [hours, minutes, requireSeconds ? seconds : 0];
  return hms.map(padLeftZeros).join(':');
}; // @vue/component


var BTime = /*#__PURE__*/vue.extend({
  name: time_NAME,
  mixins: [mixins_id, mixins_normalize_slot],
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    showSeconds: {
      // If true, show the second spinbutton
      type: Boolean,
      default: false
    },
    hour12: {
      // Explicitly force 12 or 24 hour time
      // Default is to use resolved locale for 12/24 hour display
      // Tri-state: `true` = 12, `false` = 24, `null` = auto
      type: Boolean,
      default: null
    },
    locale: {
      type: [String, Array] // default: null

    },
    ariaLabelledby: {
      // ID of label element
      type: String // default: null

    },
    secondsStep: {
      type: [Number, String],
      default: 1
    },
    minutesStep: {
      type: [Number, String],
      default: 1
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    hideHeader: {
      type: Boolean,
      default: false
    },
    labelNoTimeSelected: {
      type: String,
      default: function _default() {
        return getComponentConfig(time_NAME, 'labelNoTimeSelected');
      }
    },
    labelSelected: {
      type: String,
      default: function _default() {
        return getComponentConfig(time_NAME, 'labelSelected');
      }
    },
    labelHours: {
      type: String,
      default: function _default() {
        return getComponentConfig(time_NAME, 'labelHours');
      }
    },
    labelMinutes: {
      type: String,
      default: function _default() {
        return getComponentConfig(time_NAME, 'labelMinutes');
      }
    },
    labelSeconds: {
      type: String,
      default: function _default() {
        return getComponentConfig(time_NAME, 'labelSeconds');
      }
    },
    labelAmpm: {
      type: String,
      default: function _default() {
        return getComponentConfig(time_NAME, 'labelAmpm');
      }
    },
    labelAm: {
      type: String,
      default: function _default() {
        return getComponentConfig(time_NAME, 'labelAm');
      }
    },
    labelPm: {
      type: String,
      default: function _default() {
        return getComponentConfig(time_NAME, 'labelPm');
      }
    },
    // Passed to the spin buttons
    labelIncrement: {
      type: String,
      // Falls back to BFormSpinbutton label
      default: function _default() {
        return time_getConfigFallback('labelIncrement');
      }
    },
    labelDecrement: {
      type: String,
      // Falls back to BFormSpinbutton label
      default: function _default() {
        return time_getConfigFallback('labelDecrement');
      }
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    var parsed = time_parseHMS(this.value || '');
    return {
      // Spin button models
      modelHours: parsed.hours,
      modelMinutes: parsed.minutes,
      modelSeconds: parsed.seconds,
      modelAmpm: parsed.ampm,
      // Internal flag to enable aria-live regions
      isLive: false
    };
  },
  computed: {
    computedHMS: function computedHMS() {
      var hours = this.modelHours;
      var minutes = this.modelMinutes;
      var seconds = this.modelSeconds;
      return time_formatHMS({
        hours: hours,
        minutes: minutes,
        seconds: seconds
      }, this.showSeconds);
    },
    resolvedOptions: function resolvedOptions() {
      // Resolved locale options
      var locale = concat(this.locale).filter(utils_identity);
      var options = {
        hour: NUMERIC,
        minute: NUMERIC,
        second: NUMERIC
      };

      if (!isUndefinedOrNull(this.hour12)) {
        // Force 12 or 24 hour clock
        options.hour12 = !!this.hour12;
      }

      var dtf = new Intl.DateTimeFormat(locale, options);
      var resolved = dtf.resolvedOptions();
      var hour12 = resolved.hour12 || false; // IE 11 doesn't resolve the hourCycle, so we make
      // an assumption and fall back to common values

      var hourCycle = resolved.hourCycle || (hour12 ? 'h12' : 'h23');
      return {
        locale: resolved.locale,
        hour12: hour12,
        hourCycle: hourCycle
      };
    },
    computedLocale: function computedLocale() {
      return this.resolvedOptions.locale;
    },
    computedLang: function computedLang() {
      return (this.computedLocale || '').replace(/-u-.*$/, '');
    },
    computedRTL: function computedRTL() {
      return locale_isLocaleRTL(this.computedLang);
    },
    computedHourCycle: function computedHourCycle() {
      // h11, h12, h23, or h24
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Locale/hourCycle
      // h12 - Hour system using 1–12. Corresponds to 'h' in patterns. The 12 hour clock, with midnight starting at 12:00 am
      // h23 - Hour system using 0–23. Corresponds to 'H' in patterns. The 24 hour clock, with midnight starting at 0:00
      // h11 - Hour system using 0–11. Corresponds to 'K' in patterns. The 12 hour clock, with midnight starting at 0:00 am
      // h24 - Hour system using 1–24. Corresponds to 'k' in pattern. The 24 hour clock, with midnight starting at 24:00
      // For h12 or h24, we visually format 00 hours as 12
      return this.resolvedOptions.hourCycle;
    },
    is12Hour: function is12Hour() {
      return !!this.resolvedOptions.hour12;
    },
    context: function context() {
      return {
        locale: this.computedLocale,
        isRTL: this.computedRTL,
        hourCycle: this.computedHourCycle,
        hour12: this.is12Hour,
        hours: this.modelHours,
        minutes: this.modelMinutes,
        seconds: this.showSeconds ? this.modelSeconds : 0,
        value: this.computedHMS,
        formatted: this.formattedTimeString
      };
    },
    valueId: function valueId() {
      return this.safeId() || null;
    },
    computedAriaLabelledby: function computedAriaLabelledby() {
      return [this.ariaLabelledby, this.valueId].filter(utils_identity).join(' ') || null;
    },
    timeFormatter: function timeFormatter() {
      // Returns a formatter function reference
      // The formatter converts the time to a localized string
      var options = {
        hour12: this.is12Hour,
        hourCycle: this.computedHourCycle,
        hour: NUMERIC,
        minute: NUMERIC,
        timeZone: 'UTC'
      };

      if (this.showSeconds) {
        options.second = NUMERIC;
      } // Formats the time as a localized string


      return createDateFormatter(this.computedLocale, options);
    },
    numberFormatter: function numberFormatter() {
      // Returns a formatter function reference
      // The formatter always formats as 2 digits and is localized
      var nf = new Intl.NumberFormat(this.computedLocale, {
        style: 'decimal',
        minimumIntegerDigits: 2,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        notation: 'standard'
      });
      return nf.format;
    },
    formattedTimeString: function formattedTimeString() {
      var hours = this.modelHours;
      var minutes = this.modelMinutes;
      var seconds = this.showSeconds ? this.modelSeconds || 0 : 0;

      if (this.computedHMS) {
        return this.timeFormatter(createDate(Date.UTC(0, 0, 1, hours, minutes, seconds)));
      }

      return this.labelNoTimeSelected || ' ';
    },
    spinScopedSlots: function spinScopedSlots() {
      var h = this.$createElement;
      return {
        increment: function increment(_ref2) {
          var hasFocus = _ref2.hasFocus;
          return h(BIconChevronUp, {
            props: {
              scale: hasFocus ? 1.5 : 1.25
            },
            attrs: {
              'aria-hidden': 'true'
            }
          });
        },
        decrement: function decrement(_ref3) {
          var hasFocus = _ref3.hasFocus;
          return h(BIconChevronUp, {
            props: {
              flipV: true,
              scale: hasFocus ? 1.5 : 1.25
            },
            attrs: {
              'aria-hidden': 'true'
            }
          });
        }
      };
    }
  },
  watch: {
    value: function value(newVal, oldVal) {
      if (newVal !== oldVal && !loose_equal(time_parseHMS(newVal), time_parseHMS(this.computedHMS))) {
        var _parseHMS = time_parseHMS(newVal),
            hours = _parseHMS.hours,
            minutes = _parseHMS.minutes,
            seconds = _parseHMS.seconds,
            ampm = _parseHMS.ampm;

        this.modelHours = hours;
        this.modelMinutes = minutes;
        this.modelSeconds = seconds;
        this.modelAmpm = ampm;
      }
    },
    computedHMS: function computedHMS(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('input', newVal);
      }
    },
    context: function context(newVal, oldVal) {
      if (!loose_equal(newVal, oldVal)) {
        this.$emit('context', newVal);
      }
    },
    modelAmpm: function modelAmpm(newVal, oldVal) {
      var _this = this;

      if (newVal !== oldVal) {
        var hours = isNull(this.modelHours) ? 0 : this.modelHours;
        this.$nextTick(function () {
          if (newVal === 0 && hours > 11) {
            // Switched to AM
            _this.modelHours = hours - 12;
          } else if (newVal === 1 && hours < 12) {
            // Switched to PM
            _this.modelHours = hours + 12;
          }
        });
      }
    },
    modelHours: function modelHours(newHours, oldHours) {
      if (newHours !== oldHours) {
        this.modelAmpm = newHours > 11 ? 1 : 0;
      }
    }
  },
  created: function created() {
    var _this2 = this;

    this.$nextTick(function () {
      _this2.$emit('context', _this2.context);
    });
  },
  mounted: function mounted() {
    this.setLive(true);
  },

  /* istanbul ignore next */
  activated: function activated()
  /* istanbul ignore next */
  {
    this.setLive(true);
  },

  /* istanbul ignore next */
  deactivated: function deactivated()
  /* istanbul ignore next */
  {
    this.setLive(false);
  },
  beforeDestroy: function beforeDestroy() {
    this.setLive(false);
  },
  methods: {
    // Public methods
    focus: function focus() {
      if (!this.disabled) {
        // We focus the first spin button
        attemptFocus(this.$refs.spinners[0]);
      }
    },
    blur: function blur() {
      if (!this.disabled) {
        var activeElement = getActiveElement();

        if (dom_contains(this.$el, activeElement)) {
          attemptBlur(activeElement);
        }
      }
    },
    // Formatters for the spin buttons
    formatHours: function formatHours(hh) {
      var hourCycle = this.computedHourCycle; // We always store 0-23, but format based on h11/h12/h23/h24 formats

      hh = this.is12Hour && hh > 12 ? hh - 12 : hh; // Determine how 00:00 and 12:00 are shown

      hh = hh === 0 && hourCycle === 'h12' ? 12 : hh === 0 && hourCycle === 'h24' ?
      /* istanbul ignore next */
      24 : hh === 12 && hourCycle === 'h11' ?
      /* istanbul ignore next */
      0 : hh;
      return this.numberFormatter(hh);
    },
    formatMinutes: function formatMinutes(mm) {
      return this.numberFormatter(mm);
    },
    formatSeconds: function formatSeconds(ss) {
      return this.numberFormatter(ss);
    },
    formatAmpm: function formatAmpm(ampm) {
      // These should come from label props???
      // `ampm` should always be a value of `0` or `1`
      return ampm === 0 ? this.labelAm : ampm === 1 ? this.labelPm : '';
    },
    // Spinbutton on change handlers
    setHours: function setHours(value) {
      this.modelHours = value;
    },
    setMinutes: function setMinutes(value) {
      this.modelMinutes = value;
    },
    setSeconds: function setSeconds(value) {
      this.modelSeconds = value;
    },
    setAmpm: function setAmpm(value) {
      this.modelAmpm = value;
    },
    onSpinLeftRight: function onSpinLeftRight() {
      var evt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var type = evt.type,
          keyCode = evt.keyCode;

      if (!this.disabled && type === 'keydown' && (keyCode === LEFT || keyCode === RIGHT)) {
        evt.preventDefault();
        evt.stopPropagation();
        var spinners = this.$refs.spinners || [];
        var index = spinners.map(function (cmp) {
          return !!cmp.hasFocus;
        }).indexOf(true);
        index = index + (keyCode === LEFT ? -1 : 1);
        index = index >= spinners.length ? 0 : index < 0 ? spinners.length - 1 : index;
        attemptFocus(spinners[index]);
      }
    },
    setLive: function setLive(on) {
      var _this3 = this;

      if (on) {
        this.$nextTick(function () {
          requestAF(function () {
            _this3.isLive = true;
          });
        });
      } else {
        this.isLive = false;
      }
    }
  },
  render: function render(h) {
    var _this4 = this;

    /* istanbul ignore if */
    if (this.hidden) {
      // If hidden, we just render a placeholder comment
      return h();
    }

    var valueId = this.valueId;
    var computedAriaLabelledby = this.computedAriaLabelledby;
    var spinIds = []; // Helper method to render a spinbutton

    var makeSpinbutton = function makeSpinbutton(handler, key, classes) {
      var spinbuttonProps = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var id = _this4.safeId("_spinbutton_".concat(key, "_")) || null;
      spinIds.push(id);
      return h(BFormSpinbutton, {
        key: key,
        ref: 'spinners',
        refInFor: true,
        class: classes,
        props: time_objectSpread({
          id: id,
          placeholder: '--',
          vertical: true,
          required: true,
          disabled: _this4.disabled,
          readonly: _this4.readonly,
          locale: _this4.computedLocale,
          labelIncrement: _this4.labelIncrement,
          labelDecrement: _this4.labelDecrement,
          wrap: true,
          ariaControls: valueId,
          min: 0
        }, spinbuttonProps),
        scopedSlots: _this4.spinScopedSlots,
        on: {
          // We use `change` event to minimize SR verbosity
          // As the spinbutton will announce each value change
          // and we don't want the formatted time to be announced
          // on each value input if repeat is happening
          change: handler
        }
      });
    }; // Helper method to return a "colon" separator


    var makeColon = function makeColon() {
      return h('div', {
        staticClass: 'd-flex flex-column',
        class: {
          'text-muted': _this4.disabled || _this4.readonly
        },
        attrs: {
          'aria-hidden': 'true'
        }
      }, [h(BIconCircleFill, {
        props: {
          shiftV: 4,
          scale: 0.5
        }
      }), h(BIconCircleFill, {
        props: {
          shiftV: -4,
          scale: 0.5
        }
      })]);
    };

    var $spinners = []; // Hours

    $spinners.push(makeSpinbutton(this.setHours, 'hours', 'b-time-hours', {
      value: this.modelHours,
      max: 23,
      step: 1,
      formatterFn: this.formatHours,
      ariaLabel: this.labelHours
    })); // Spacer

    $spinners.push(makeColon()); // Minutes

    $spinners.push(makeSpinbutton(this.setMinutes, 'minutes', 'b-time-minutes', {
      value: this.modelMinutes,
      max: 59,
      step: this.minutesStep || 1,
      formatterFn: this.formatMinutes,
      ariaLabel: this.labelMinutes
    }));

    if (this.showSeconds) {
      // Spacer
      $spinners.push(makeColon()); // Seconds

      $spinners.push(makeSpinbutton(this.setSeconds, 'seconds', 'b-time-seconds', {
        value: this.modelSeconds,
        max: 59,
        step: this.secondsStep || 1,
        formatterFn: this.formatSeconds,
        ariaLabel: this.labelSeconds
      }));
    } // AM/PM ?


    if (this.is12Hour) {
      // TODO:
      //   If locale is RTL, unshift this instead of push?
      //   And switch class `ml-2` to `mr-2`
      //   Note some LTR locales (i.e. zh) also place AM/PM to the left
      $spinners.push(makeSpinbutton(this.setAmpm, 'ampm', 'b-time-ampm', {
        value: this.modelAmpm,
        max: 1,
        formatterFn: this.formatAmpm,
        ariaLabel: this.labelAmpm,
        // We set `required` as `false`, since this always has a value
        required: false
      }));
    } // Assemble spinners


    $spinners = h('div', {
      staticClass: 'd-flex align-items-center justify-content-center mx-auto',
      attrs: {
        role: 'group',
        tabindex: this.disabled || this.readonly ? null : '-1',
        'aria-labelledby': computedAriaLabelledby
      },
      on: {
        keydown: this.onSpinLeftRight,
        click
        /* istanbul ignore next */
        : function click(evt)
        /* istanbul ignore next */
        {
          if (evt.target === evt.currentTarget) {
            _this4.focus();
          }
        }
      }
    }, $spinners); // Selected type display

    var $value = h('output', {
      staticClass: 'form-control form-control-sm text-center',
      class: {
        disabled: this.disabled || this.readonly
      },
      attrs: {
        id: valueId,
        role: 'status',
        for: spinIds.filter(utils_identity).join(' ') || null,
        tabindex: this.disabled ? null : '-1',
        'aria-live': this.isLive ? 'polite' : 'off',
        'aria-atomic': 'true'
      },
      on: {
        // Transfer focus/click to focus hours spinner
        click: this.focus,
        focus: this.focus
      }
    }, [h('bdi', this.formattedTimeString), this.computedHMS ? h('span', {
      staticClass: 'sr-only'
    }, " (".concat(this.labelSelected, ") ")) : '']);
    var $header = h('header', {
      staticClass: 'b-time-header',
      class: {
        'sr-only': this.hideHeader
      }
    }, [$value]); // Optional bottom slot

    var $slot = this.normalizeSlot('default');
    $slot = $slot ? h('footer', {
      staticClass: 'b-time-footer'
    }, $slot) : h();
    return h('div', {
      staticClass: 'b-time d-inline-flex flex-column text-center',
      attrs: {
        role: 'group',
        lang: this.computedLang || null,
        'aria-labelledby': computedAriaLabelledby || null,
        'aria-disabled': this.disabled ? 'true' : null,
        'aria-readonly': this.readonly && !this.disabled ? 'true' : null
      }
    }, [$header, $spinners, $slot]);
  }
});
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/components/form-timepicker/form-timepicker.js
function form_timepicker_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function form_timepicker_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { form_timepicker_ownKeys(Object(source), true).forEach(function (key) { form_timepicker_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { form_timepicker_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function form_timepicker_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










var form_timepicker_NAME = 'BFormTimepicker'; // Fallback to BTime/BFormSpinbutton prop if no value found

var form_timepicker_getConfigFallback = function getConfigFallback(prop) {
  return getComponentConfig(form_timepicker_NAME, prop) || getComponentConfig('BTime', prop) || getComponentConfig('BFormSpinbutton', prop);
}; // We create our props as a mixin so that we can control
// where they appear in the props listing reference section


var propsMixin = {
  props: form_timepicker_objectSpread({
    value: {
      type: String,
      default: ''
    },
    resetValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String // Defaults to `labelNoTime` from BTime context
      // default: null

    },
    size: {
      type: String // default: null

    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    required: {
      // If true adds the `aria-required` attribute
      type: Boolean,
      default: false
    },
    name: {
      type: String // default: null

    },
    form: {
      type: String // default: null

    },
    state: {
      // Tri-state prop: `true`, `false` or `null`
      type: Boolean,
      default: null
    },
    hour12: {
      // Tri-state prop: `true` => 12 hour, `false` => 24 hour, `null` => auto
      type: Boolean,
      default: null
    },
    locale: {
      type: [String, Array] // default: null

    },
    showSeconds: {
      type: Boolean,
      default: false
    },
    hideHeader: {
      type: Boolean,
      default: false
    },
    secondsStep: {
      type: [Number, String],
      default: 1
    },
    minutesStep: {
      type: [Number, String],
      default: 1
    },
    buttonOnly: {
      type: Boolean,
      default: false
    },
    buttonVariant: {
      // Applicable in button only mode
      type: String,
      default: 'secondary'
    },
    nowButton: {
      type: Boolean,
      default: false
    },
    labelNowButton: {
      type: String,
      default: function _default() {
        return getComponentConfig(form_timepicker_NAME, 'labelNowButton');
      }
    },
    nowButtonVariant: {
      type: String,
      default: 'outline-primary'
    },
    resetButton: {
      type: Boolean,
      default: false
    },
    labelResetButton: {
      type: String,
      default: function _default() {
        return getComponentConfig(form_timepicker_NAME, 'labelResetButton');
      }
    },
    resetButtonVariant: {
      type: String,
      default: 'outline-danger'
    },
    noCloseButton: {
      type: Boolean,
      default: false
    },
    labelCloseButton: {
      type: String,
      default: function _default() {
        return getComponentConfig(form_timepicker_NAME, 'labelCloseButton');
      }
    },
    closeButtonVariant: {
      type: String,
      default: 'outline-secondary'
    },
    // Labels
    // These fallback to BTime values
    labelSelected: {
      type: String,
      default: function _default() {
        return form_timepicker_getConfigFallback('labelSelected');
      }
    },
    labelNoTimeSelected: {
      type: String,
      default: function _default() {
        return form_timepicker_getConfigFallback('labelNoTimeSelected');
      }
    },
    labelHours: {
      type: String,
      default: function _default() {
        return form_timepicker_getConfigFallback('labelHours');
      }
    },
    labelMinutes: {
      type: String,
      default: function _default() {
        return form_timepicker_getConfigFallback('labelMinutes');
      }
    },
    labelSeconds: {
      type: String,
      default: function _default() {
        return form_timepicker_getConfigFallback('labelSeconds');
      }
    },
    labelAmpm: {
      type: String,
      default: function _default() {
        return form_timepicker_getConfigFallback('labelAmpm');
      }
    },
    labelAm: {
      type: String,
      default: function _default() {
        return form_timepicker_getConfigFallback('labelAm');
      }
    },
    labelPm: {
      type: String,
      default: function _default() {
        return form_timepicker_getConfigFallback('labelPm');
      }
    },
    // These pick BTime or BFormSpinbutton global config if no BFormTimepicker global config
    labelIncrement: {
      type: String,
      default: function _default() {
        return form_timepicker_getConfigFallback('labelIncrement');
      }
    },
    labelDecrement: {
      type: String,
      default: function _default() {
        return form_timepicker_getConfigFallback('labelDecrement');
      }
    },
    // extra dropdown stuff
    menuClass: {
      type: [String, Array, Object] // default: null

    }
  }, dropdownProps)
}; // --- BFormDate component ---
// @vue/component

var BFormTimepicker = /*#__PURE__*/vue.extend({
  name: form_timepicker_NAME,
  // The mixins order determines the order of appearance in the props reference section
  mixins: [mixins_id, propsMixin],
  model: {
    prop: 'value',
    event: 'input'
  },
  data: function data() {
    return {
      // We always use `HH:mm:ss` value internally
      localHMS: this.value || '',
      // Context data from BTime
      localLocale: null,
      isRTL: false,
      formattedValue: '',
      // If the menu is opened
      isVisible: false
    };
  },
  computed: {
    computedLang: function computedLang() {
      return (this.localLocale || '').replace(/-u-.*$/i, '') || null;
    },
    timeProps: function timeProps() {
      // Props we pass to BTime
      // Use self for better minification, as `this` won't
      // minimize and we reference it many times below
      var self = this;
      return {
        hidden: !self.isVisible,
        value: self.localHMS,
        // Passthrough props
        readonly: self.readonly,
        disabled: self.disabled,
        locale: self.locale,
        hour12: self.hour12,
        hideHeader: self.hideHeader,
        showSeconds: self.showSeconds,
        secondsStep: self.secondsStep,
        minutesStep: self.minutesStep,
        labelNoTimeSelected: self.labelNoTimeSelected,
        labelSelected: self.labelSelected,
        labelHours: self.labelHours,
        labelMinutes: self.labelMinutes,
        labelSeconds: self.labelSeconds,
        labelAmpm: self.labelAmpm,
        labelAm: self.labelAm,
        labelPm: self.labelPm,
        labelIncrement: self.labelIncrement,
        labelDecrement: self.labelDecrement
      };
    }
  },
  watch: {
    value: function value(newVal) {
      this.localHMS = newVal || '';
    },
    localHMS: function localHMS(newVal) {
      // We only update the v-model value when the timepicker
      // is open, to prevent cursor jumps when bound to a
      // text input in button only mode
      if (this.isVisible) {
        this.$emit('input', newVal || '');
      }
    }
  },
  methods: {
    // Public methods
    focus: function focus() {
      if (!this.disabled) {
        attemptFocus(this.$refs.control);
      }
    },
    blur: function blur() {
      if (!this.disabled) {
        attemptBlur(this.$refs.control);
      }
    },
    // Private methods
    setAndClose: function setAndClose(value) {
      var _this = this;

      this.localHMS = value;
      this.$nextTick(function () {
        _this.$refs.control.hide(true);
      });
    },
    onInput: function onInput(hms) {
      if (this.localHMS !== hms) {
        this.localHMS = hms;
      }
    },
    onContext: function onContext(ctx) {
      var isRTL = ctx.isRTL,
          locale = ctx.locale,
          value = ctx.value,
          formatted = ctx.formatted;
      this.isRTL = isRTL;
      this.localLocale = locale;
      this.formattedValue = formatted;
      this.localHMS = value || ''; // Re-emit the context event

      this.$emit('context', ctx);
    },
    onNowButton: function onNowButton() {
      var now = new Date();
      var hours = now.getHours();
      var minutes = now.getMinutes();
      var seconds = this.showSeconds ? now.getSeconds() : 0;
      var value = [hours, minutes, seconds].map(function (v) {
        return "00".concat(v || '').slice(-2);
      }).join(':');
      this.setAndClose(value);
    },
    onResetButton: function onResetButton() {
      this.setAndClose(this.resetValue);
    },
    onCloseButton: function onCloseButton() {
      this.$refs.control.hide(true);
    },
    onShow: function onShow() {
      this.isVisible = true;
    },
    onShown: function onShown() {
      var _this2 = this;

      this.$nextTick(function () {
        attemptFocus(_this2.$refs.time);

        _this2.$emit('shown');
      });
    },
    onHidden: function onHidden() {
      this.isVisible = false;
      this.$emit('hidden');
    },
    // Render function helpers
    defaultButtonFn: function defaultButtonFn(_ref) {
      var isHovered = _ref.isHovered,
          hasFocus = _ref.hasFocus;
      return this.$createElement(isHovered || hasFocus ? BIconClockFill : BIconClock, {
        attrs: {
          'aria-hidden': 'true'
        }
      });
    }
  },
  render: function render(h) {
    var localHMS = this.localHMS,
        disabled = this.disabled,
        readonly = this.readonly;
    var placeholder = isUndefinedOrNull(this.placeholder) ? this.labelNoTimeSelected : this.placeholder; // Footer buttons

    var $footer = [];

    if (this.nowButton) {
      var label = this.labelNowButton;
      $footer.push(h(BButton, {
        key: 'now-btn',
        props: {
          size: 'sm',
          disabled: disabled || readonly,
          variant: this.nowButtonVariant
        },
        attrs: {
          'aria-label': label || null
        },
        on: {
          click: this.onNowButton
        }
      }, label));
    }

    if (this.resetButton) {
      if ($footer.length > 0) {
        // Add a "spacer" between buttons ('&nbsp;')
        $footer.push(h('span', "\xA0"));
      }

      var _label = this.labelResetButton;
      $footer.push(h(BButton, {
        key: 'reset-btn',
        props: {
          size: 'sm',
          disabled: disabled || readonly,
          variant: this.resetButtonVariant
        },
        attrs: {
          'aria-label': _label || null
        },
        on: {
          click: this.onResetButton
        }
      }, _label));
    }

    if (!this.noCloseButton) {
      if ($footer.length > 0) {
        // Add a "spacer" between buttons ('&nbsp;')
        $footer.push(h('span', "\xA0"));
      }

      var _label2 = this.labelCloseButton;
      $footer.push(h(BButton, {
        key: 'close-btn',
        props: {
          size: 'sm',
          disabled: disabled,
          variant: this.closeButtonVariant
        },
        attrs: {
          'aria-label': _label2 || null
        },
        on: {
          click: this.onCloseButton
        }
      }, _label2));
    }

    if ($footer.length > 0) {
      $footer = [h('div', {
        staticClass: 'b-form-date-controls d-flex flex-wrap',
        class: {
          'justify-content-between': $footer.length > 1,
          'justify-content-end': $footer.length < 2
        }
      }, $footer)];
    }

    var $time = h(BTime, {
      ref: 'time',
      staticClass: 'b-form-time-control',
      props: this.timeProps,
      on: {
        input: this.onInput,
        context: this.onContext
      }
    }, $footer);
    return h(BVFormBtnLabelControl, {
      ref: 'control',
      staticClass: 'b-form-timepicker',
      props: form_timepicker_objectSpread(form_timepicker_objectSpread({}, this.$props), {}, {
        // Overridden / computed props
        id: this.safeId(),
        rtl: this.isRTL,
        lang: this.computedLang,
        value: localHMS || '',
        formattedValue: localHMS ? this.formattedValue : '',
        placeholder: placeholder || ''
      }),
      on: {
        show: this.onShow,
        shown: this.onShown,
        hidden: this.onHidden
      },
      scopedSlots: {
        'button-content': this.$scopedSlots['button-content'] || this.defaultButtonFn
      }
    }, [$time]);
  }
});
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/utils/loose-index-of.js


var loose_index_of_looseIndexOf = function looseIndexOf(arr, val) {
  // Assumes that the first argument is an array
  for (var i = 0; i < arr.length; i++) {
    if (loose_equal(arr[i], val)) {
      return i;
    }
  }

  return -1;
};

/* harmony default export */ var loose_index_of = (loose_index_of_looseIndexOf);
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/mixins/form-radio-check.js
function form_radio_check_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function form_radio_check_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { form_radio_check_ownKeys(Object(source), true).forEach(function (key) { form_radio_check_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { form_radio_check_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function form_radio_check_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



 // @vue/component

/* harmony default export */ var form_radio_check = ({
  mixins: [attrs, mixins_normalize_slot],
  inheritAttrs: false,
  model: {
    prop: 'checked',
    event: 'input'
  },
  props: {
    value: {// Value when checked
      // type: Object,
      // default: undefined
    },
    checked: {// This is the v-model
      // type: Object,
      // default: undefined
    },
    inline: {
      type: Boolean,
      default: false
    },
    plain: {
      type: Boolean,
      default: false
    },
    button: {
      // Only applicable in standalone mode (non group)
      type: Boolean,
      default: false
    },
    buttonVariant: {
      // Only applicable when rendered with button style
      type: String // default: null

    },
    ariaLabel: {
      // Placed on the input if present.
      type: String // default: null

    },
    ariaLabelledby: {
      // Placed on the input if present.
      type: String // default: null

    }
  },
  data: function data() {
    return {
      localChecked: this.isGroup ? this.bvGroup.checked : this.checked,
      hasFocus: false
    };
  },
  computed: {
    computedLocalChecked: {
      get: function get() {
        return this.isGroup ? this.bvGroup.localChecked : this.localChecked;
      },
      set: function set(val) {
        if (this.isGroup) {
          this.bvGroup.localChecked = val;
        } else {
          this.localChecked = val;
        }
      }
    },
    isGroup: function isGroup() {
      // Is this check/radio a child of check-group or radio-group?
      return Boolean(this.bvGroup);
    },
    isBtnMode: function isBtnMode() {
      // Support button style in single input mode
      return this.isGroup ? this.bvGroup.buttons : this.button;
    },
    isPlain: function isPlain() {
      return this.isBtnMode ? false : this.isGroup ? this.bvGroup.plain : this.plain;
    },
    isCustom: function isCustom() {
      return this.isBtnMode ? false : !this.isPlain;
    },
    isSwitch: function isSwitch() {
      // Custom switch styling (checkboxes only)
      return this.isBtnMode || this.isRadio || this.isPlain ? false : this.isGroup ? this.bvGroup.switches : this.switch;
    },
    isInline: function isInline() {
      return this.isGroup ? this.bvGroup.inline : this.inline;
    },
    isDisabled: function isDisabled() {
      // Child can be disabled while parent isn't, but is always disabled if group is
      return this.isGroup ? this.bvGroup.disabled || this.disabled : this.disabled;
    },
    isRequired: function isRequired() {
      // Required only works when a name is provided for the input(s)
      // Child can only be required when parent is
      // Groups will always have a name (either user supplied or auto generated)
      return this.getName && (this.isGroup ? this.bvGroup.required : this.required);
    },
    getName: function getName() {
      // Group name preferred over local name
      return (this.isGroup ? this.bvGroup.groupName : this.name) || null;
    },
    getForm: function getForm() {
      return (this.isGroup ? this.bvGroup.form : this.form) || null;
    },
    getSize: function getSize() {
      return (this.isGroup ? this.bvGroup.size : this.size) || '';
    },
    getState: function getState() {
      return this.isGroup ? this.bvGroup.computedState : this.computedState;
    },
    getButtonVariant: function getButtonVariant() {
      // Local variant preferred over group variant
      if (this.buttonVariant) {
        return this.buttonVariant;
      } else if (this.isGroup && this.bvGroup.buttonVariant) {
        return this.bvGroup.buttonVariant;
      } // default variant


      return 'secondary';
    },
    buttonClasses: function buttonClasses() {
      var _ref;

      // Same for radio & check
      return ['btn', "btn-".concat(this.getButtonVariant), (_ref = {}, form_radio_check_defineProperty(_ref, "btn-".concat(this.getSize), this.getSize), form_radio_check_defineProperty(_ref, "disabled", this.isDisabled), form_radio_check_defineProperty(_ref, "active", this.isChecked), form_radio_check_defineProperty(_ref, "focus", this.hasFocus), _ref)];
    },
    computedAttrs: function computedAttrs() {
      return form_radio_check_objectSpread(form_radio_check_objectSpread({}, this.bvAttrs), {}, {
        id: this.safeId(),
        type: this.isRadio ? 'radio' : 'checkbox',
        name: this.getName,
        form: this.getForm,
        disabled: this.isDisabled,
        required: this.isRequired,
        autocomplete: 'off',
        'aria-required': this.isRequired || null,
        'aria-label': this.ariaLabel || null,
        'aria-labelledby': this.ariaLabelledby || null
      });
    }
  },
  watch: {
    checked: function checked(newVal) {
      this.computedLocalChecked = newVal;
    }
  },
  methods: {
    handleFocus: function handleFocus(evt) {
      // When in buttons mode, we need to add 'focus' class to label when input focused
      // As it is the hidden input which has actual focus
      if (evt.target) {
        if (evt.type === 'focus') {
          this.hasFocus = true;
        } else if (evt.type === 'blur') {
          this.hasFocus = false;
        }
      }
    },
    // Convenience methods for focusing the input
    focus: function focus() {
      if (!this.isDisabled) {
        attemptFocus(this.$refs.input);
      }
    },
    blur: function blur() {
      if (!this.isDisabled) {
        attemptBlur(this.$refs.input);
      }
    }
  },
  render: function render(h) {
    var defaultSlot = this.normalizeSlot('default'); // Generate the input element

    var on = {
      change: this.handleChange
    };

    if (this.isBtnMode) {
      // Handlers for focus styling when in button mode
      on.focus = on.blur = this.handleFocus;
    }

    var input = h('input', {
      ref: 'input',
      key: 'input',
      on: on,
      class: {
        'form-check-input': this.isPlain,
        'custom-control-input': this.isCustom,
        'is-valid': this.getState === true && !this.isBtnMode,
        'is-invalid': this.getState === false && !this.isBtnMode,
        // https://github.com/bootstrap-vue/bootstrap-vue/issues/2911
        'position-static': this.isPlain && !defaultSlot
      },
      directives: [{
        name: 'model',
        rawName: 'v-model',
        value: this.computedLocalChecked,
        expression: 'computedLocalChecked'
      }],
      attrs: this.computedAttrs,
      domProps: {
        value: this.value,
        checked: this.isChecked
      }
    });

    if (this.isBtnMode) {
      // Button mode
      var button = h('label', {
        class: this.buttonClasses
      }, [input, defaultSlot]);

      if (!this.isGroup) {
        // Standalone button mode, so wrap in 'btn-group-toggle'
        // and flag it as inline-block to mimic regular buttons
        button = h('div', {
          class: ['btn-group-toggle', 'd-inline-block']
        }, [button]);
      }

      return button;
    } else {
      // Not button mode
      var label = h(); // If no label content in plain mode we dont render the label
      // https://github.com/bootstrap-vue/bootstrap-vue/issues/2911

      if (!(this.isPlain && !defaultSlot)) {
        label = h('label', {
          class: {
            'form-check-label': this.isPlain,
            'custom-control-label': this.isCustom
          },
          attrs: {
            for: this.safeId()
          }
        }, defaultSlot);
      } // Wrap it in a div


      return h('div', {
        class: form_radio_check_defineProperty({
          'form-check': this.isPlain,
          'form-check-inline': this.isPlain && this.isInline,
          'custom-control': this.isCustom,
          'custom-control-inline': this.isCustom && this.isInline,
          'custom-checkbox': this.isCustom && this.isCheck && !this.isSwitch,
          'custom-switch': this.isSwitch,
          'custom-radio': this.isCustom && this.isRadio
        }, "b-custom-control-".concat(this.getSize), Boolean(this.getSize && !this.isBtnMode))
      }, [input, label]);
    }
  }
});
// CONCATENATED MODULE: ./node_modules/bootstrap-vue/esm/components/form-checkbox/form-checkbox.js








 // @vue/component

var BFormCheckbox = /*#__PURE__*/vue.extend({
  name: 'BFormCheckbox',
  mixins: [form_radio_check, // Includes shared render function
  mixins_id, mixins_form, form_size, form_state],
  inject: {
    bvGroup: {
      from: 'bvCheckGroup',
      default: false
    }
  },
  props: {
    value: {
      // type: [String, Number, Boolean, Object],
      default: true
    },
    uncheckedValue: {
      // type: [String, Number, Boolean, Object],
      // Not applicable in multi-check mode
      default: false
    },
    indeterminate: {
      // Not applicable in multi-check mode
      type: Boolean,
      default: false
    },
    switch: {
      // Custom switch styling
      type: Boolean,
      default: false
    },
    checked: {
      // v-model (Array when multiple checkboxes have same name)
      // type: [String, Number, Boolean, Object, Array],
      default: null
    }
  },
  computed: {
    isChecked: function isChecked() {
      var checked = this.computedLocalChecked;
      var value = this.value;

      if (isArray(checked)) {
        return loose_index_of(checked, value) > -1;
      } else {
        return loose_equal(checked, value);
      }
    },
    isRadio: function isRadio() {
      return false;
    },
    isCheck: function isCheck() {
      return true;
    }
  },
  watch: {
    computedLocalChecked: function computedLocalChecked(newVal) {
      this.$emit('input', newVal);

      if (this.$refs && this.$refs.input) {
        this.$emit('update:indeterminate', this.$refs.input.indeterminate);
      }
    },
    indeterminate: function indeterminate(newVal) {
      this.setIndeterminate(newVal);
    }
  },
  mounted: function mounted() {
    // Set initial indeterminate state
    this.setIndeterminate(this.indeterminate);
  },
  methods: {
    handleChange: function handleChange(_ref) {
      var _ref$target = _ref.target,
          checked = _ref$target.checked,
          indeterminate = _ref$target.indeterminate;
      var localChecked = this.computedLocalChecked;
      var value = this.value;
      var isArr = isArray(localChecked);
      var uncheckedValue = isArr ? null : this.uncheckedValue; // Update computedLocalChecked

      if (isArr) {
        var idx = loose_index_of(localChecked, value);

        if (checked && idx < 0) {
          // Add value to array
          localChecked = localChecked.concat(value);
        } else if (!checked && idx > -1) {
          // Remove value from array
          localChecked = localChecked.slice(0, idx).concat(localChecked.slice(idx + 1));
        }
      } else {
        localChecked = checked ? value : uncheckedValue;
      }

      this.computedLocalChecked = localChecked; // Change is only emitted on user interaction

      this.$emit('change', checked ? value : uncheckedValue); // If this is a child of form-checkbox-group, we emit a change event on it as well

      if (this.isGroup) {
        this.bvGroup.$emit('change', localChecked);
      }

      this.$emit('update:indeterminate', indeterminate);
    },
    setIndeterminate: function setIndeterminate(state) {
      // Indeterminate only supported in single checkbox mode
      if (isArray(this.computedLocalChecked)) {
        state = false;
      }

      if (this.$refs && this.$refs.input) {
        this.$refs.input.indeterminate = state; // Emit update event to prop

        this.$emit('update:indeterminate', state);
      }
    }
  }
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/VueCronEditorBootstrap.vue?vue&type=script&lang=js&



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var VueCronEditorBootstrapvue_type_script_lang_js_ = ({
  name: "VueCronEditorBootstrap",
  mixins: [vueCronEditorMixin],
  components: {
    BFormInput: BFormInput,
    BForm: BForm,
    BTabs: BTabs,
    BTab: BTab,
    BCol: BCol,
    BRow: BRow,
    BFormTimepicker: BFormTimepicker,
    BFormCheckbox: BFormCheckbox
  },
  data: function data() {
    return {
      activeTab: null,
      tabs: [{
        id: 0,
        key: "minutes"
      }, {
        id: 1,
        key: "hourly"
      }, {
        id: 2,
        key: "daily"
      }, {
        id: 3,
        key: "weekly"
      }, {
        id: 4,
        key: "monthly"
      }, {
        id: 5,
        key: "advanced"
      }]
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.activeTab = this.tabs.find(function (t) {
      return t.key === _this.currentTab;
    }).id;
  },
  watch: {
    currentTab: function currentTab() {
      var _this2 = this;

      this.activeTab = this.tabs.find(function (t) {
        return t.key === _this2.currentTab;
      }).id;
    }
  },
  computed: {
    dateTime: function dateTime() {
      var dateTime = new Date();
      dateTime.setHours(this.editorData.hours);
      dateTime.setMinutes(this.editorData.minutes);
      return dateTime;
    }
  },
  methods: {
    reset: function reset(e) {
      var tabKey = this.tabs.find(function (t) {
        return t.id === e;
      }).key;

      this._resetToTab(tabKey);
    },
    setDateTime: function setDateTime(e) {
      if (e == null) {
        return;
      }

      var splittedTime = this.editorData.time.split(":");
      this.editorData.hours = splittedTime[0];
      this.editorData.minutes = splittedTime[1];
    }
  }
});
// CONCATENATED MODULE: ./src/VueCronEditorBootstrap.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_VueCronEditorBootstrapvue_type_script_lang_js_ = (VueCronEditorBootstrapvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/VueCronEditorBootstrap.vue





/* normalize component */

var component = normalizeComponent(
  src_VueCronEditorBootstrapvue_type_script_lang_js_,
  VueCronEditorBootstrapvue_type_template_id_0a36a7b8_render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var VueCronEditorBootstrap = (component.exports);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (VueCronEditorBootstrap);



/***/ }),

/***/ "fb6a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var isObject = __webpack_require__("861d");
var isArray = __webpack_require__("e8b5");
var toAbsoluteIndex = __webpack_require__("23cb");
var toLength = __webpack_require__("50c4");
var toIndexedObject = __webpack_require__("fc6a");
var createProperty = __webpack_require__("8418");
var wellKnownSymbol = __webpack_require__("b622");
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');
var USES_TO_LENGTH = arrayMethodUsesToLength('slice', { ACCESSORS: true, 0: 0, 1: 2 });

var SPECIES = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});


/***/ }),

/***/ "fc6a":
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__("44ad");
var requireObjectCoercible = __webpack_require__("1d80");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "fdbc":
/***/ (function(module, exports) {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),

/***/ "fdbf":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_SYMBOL = __webpack_require__("4930");

module.exports = NATIVE_SYMBOL
  // eslint-disable-next-line no-undef
  && !Symbol.sham
  // eslint-disable-next-line no-undef
  && typeof Symbol.iterator == 'symbol';


/***/ })

/******/ })["default"];
//# sourceMappingURL=vueCronEditorBootstrap.common.js.map