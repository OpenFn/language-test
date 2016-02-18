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
 * Create a person
 * @example
 * execute(
 *   person(data)
 * )(state)
 * @constructor
 * @param {object} personData - Payload data for the person
 * @returns {Operation}
 */
export function person(personData) {

  return state => {
    const body = expandReferences(personData)(state);

    const { username, password, instanceUrl } = state.configuration;

    const url = resolveUrl(instanceUrl + '/', 'ws/rest/v1/person')

    console.log("Posting person:");
    console.log(JSON.stringify(body));

    return post({ username, password, body, url })
    .then((result) => {
      console.log("Success:", result);
      return { ...state, references: [ result, ...state.references ] }
    })

  }
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
export function patient(patientData) {

  return state => {
    const body = expandReferences(patientData)(state);

    const { username, password, instanceUrl } = state.configuration;

    const url = resolveUrl(instanceUrl + '/', 'ws/rest/v1/patient')

    console.log("Posting patient:");
    console.log(JSON.stringify(body))

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
