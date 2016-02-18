'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrayToString = exports.lastReferenceValue = exports.dataValue = exports.dataPath = exports.merge = exports.sourceValue = exports.fields = exports.field = undefined;
exports.execute = execute;
exports.person = person;
exports.patient = patient;

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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
 * Create a person
 * @example
 * execute(
 *   person(data)
 * )(state)
 * @constructor
 * @param {object} personData - Payload data for the person
 * @returns {Operation}
 */
function person(personData) {

  return function (state) {
    var body = (0, _languageCommon.expandReferences)(personData)(state);

    var _state$configuration = state.configuration;
    var username = _state$configuration.username;
    var password = _state$configuration.password;
    var instanceUrl = _state$configuration.instanceUrl;


    var url = (0, _url.resolve)(instanceUrl + '/', 'ws/rest/v1/person');

    console.log("Posting person:");
    console.log(JSON.stringify(body));

    return (0, _Client.post)({ username: username, password: password, body: body, url: url }).then(function (result) {
      console.log("Success:", result);
      return _extends({}, state, { references: [result].concat(_toConsumableArray(state.references)) });
    });
  };
}

/**
 * Create a patient
 * @example
 * execute(
 *   patient(data)
 * )(state)
 * @constructor
 * @param {object} patientData - Payload data for the patient
 * @returns {Operation}
 */
function patient(patientData) {

  return function (state) {
    var body = (0, _languageCommon.expandReferences)(patientData)(state);

    var _state$configuration2 = state.configuration;
    var username = _state$configuration2.username;
    var password = _state$configuration2.password;
    var instanceUrl = _state$configuration2.instanceUrl;


    var url = (0, _url.resolve)(instanceUrl + '/', 'ws/rest/v1/patient');

    console.log("Posting patient:");
    console.log(JSON.stringify(body));

    return (0, _Client.post)({ username: username, password: password, body: body, url: url }).then(function (result) {
      console.log("Success:", result);
      return _extends({}, state, { references: [result].concat(_toConsumableArray(state.references)) });
    });
  };
}
