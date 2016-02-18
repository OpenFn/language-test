import { execute as commonExecute, expandReferences } from 'language-common';
import { post } from './Client';
import { resolve as resolveUrl } from 'url';

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
export function execute(...operations) {
  const initialState = {
    references: [],
    data: null
  }

  return state => {
    return commonExecute(...operations)({ ...initialState, ...state })
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
export function test(testData) {

  return state => {
    const body = expandReferences(testData)(state);

    const { username, password, instanceUrl, loginUrl, apiUrl } = state.configuration;

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

  }
}

export {
  field, fields, sourceValue, each, combine,
  merge, dataPath, dataValue, lastReferenceValue, arrayToString
} from 'language-common';
