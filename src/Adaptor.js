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

    const { username, password, instanceUrl } = state.configuration;

    const url = resolveUrl(instanceUrl + '/', 'test')

    console.log("Will connect to:");
    console.log(url);
    console.log("With username:");
    console.log(username);
    console.log("And valid password:")
    console.log(!!password);
    console.log("Will POST payload:");
    console.log(JSON.stringify(body));

    return post({ username, password, body, url })
    .then((result) => {
      console.log("Success:", result);
      return { ...state, references: [ result, ...state.references ] }
    })

  }
}

export {
  field, fields, sourceValue,
  merge, dataPath, dataValue, lastReferenceValue, arrayToString
} from 'language-common';
