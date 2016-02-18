'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrayToString = exports.lastReferenceValue = exports.dataValue = exports.dataPath = exports.merge = exports.combine = exports.each = exports.sourceValue = exports.fields = exports.field = undefined;
exports.execute = execute;
exports.test = test;

var _languageCommon = require('language-common');

Object.defineProperty(exports, 'field', {
  enumerable: true,
  get: function get() {
    return _languageCommon.field;
  }
});
Object.defineProperty(exports, 'fields', {
  enumerable: true,
  get: function get() {
    return _languageCommon.fields;
  }
});
Object.defineProperty(exports, 'sourceValue', {
  enumerable: true,
  get: function get() {
    return _languageCommon.sourceValue;
  }
});
Object.defineProperty(exports, 'each', {
  enumerable: true,
  get: function get() {
    return _languageCommon.each;
  }
});
Object.defineProperty(exports, 'combine', {
  enumerable: true,
  get: function get() {
    return _languageCommon.combine;
  }
});
Object.defineProperty(exports, 'merge', {
  enumerable: true,
  get: function get() {
    return _languageCommon.merge;
  }
});
Object.defineProperty(exports, 'dataPath', {
  enumerable: true,
  get: function get() {
    return _languageCommon.dataPath;
  }
});
Object.defineProperty(exports, 'dataValue', {
  enumerable: true,
  get: function get() {
    return _languageCommon.dataValue;
  }
});
Object.defineProperty(exports, 'lastReferenceValue', {
  enumerable: true,
  get: function get() {
    return _languageCommon.lastReferenceValue;
  }
});
Object.defineProperty(exports, 'arrayToString', {
  enumerable: true,
  get: function get() {
    return _languageCommon.arrayToString;
  }
});

var _Client = require('./Client');

var _url = require('url');

/**
 * Execute a sequence of operations.
 * Wraps `language-common/execute`, and prepends initial state for test.
 * @example
 * execute(
 *   create('foo'),
 *   delete('bar')
 * )(state)
 * @constructor
 * @param {Operations} operations - Operations to be performed.
 * @returns {Operation}
 */
function execute() {
  for (var _len = arguments.length, operations = Array(_len), _key = 0; _key < _len; _key++) {
    operations[_key] = arguments[_key];
  }

  var initialState = {
    references: [],
    data: null
  };

  return function (state) {
    return _languageCommon.execute.apply(undefined, operations)(_extends({}, initialState, state));
  };
}

/**
 * Create a test JSON payload
 * @example
 * execute(
 *   person(data)
 * )(state)
 * @constructor
 * @param {object} testData - Payload data for the person
 * @returns {Operation}
 */
function test(testData) {

  return function (state) {
    var body = (0, _languageCommon.expandReferences)(testData)(state);

    var _state$configuration = state.configuration;
    var username = _state$configuration.username;
    var password = _state$configuration.password;
    var instanceUrl = _state$configuration.instanceUrl;
    var loginUrl = _state$configuration.loginUrl;
    var apiUrl = _state$configuration.apiUrl;

    // console.log("Target URL:");
    // if (instanceUrl) {
    //   console.log(instanceUrl)
    // } else if (apiUrl) {
    //   console.log(instanceUrl)
    // } else {
    //   console.log(loginUrl)
    // };
    // console.log("Username:")
    // console.log(username)

    console.log("POST body:");
    console.log(JSON.stringify(body));
  };
}
