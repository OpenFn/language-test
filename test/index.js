import { expect } from 'chai';

import Adaptor from '../src';
const { execute, person } = Adaptor;

import request from 'superagent';
import superagentMock from 'superagent-mock';
import ClientFixtures, { fixtures } from './ClientFixtures'

describe("execute", () => {

  it("executes each operation in sequence", (done) => {
    let state = {}
    let operations = [
      (state) => { return {counter: 1} },
      (state) => { return {counter: 2} },
      (state) => { return {counter: 3} }
    ]

    execute(...operations)(state)
    .then((finalState) => {
      expect(finalState).to.eql({ counter: 3 })
    })
    .then(done).catch(done)


  })

  it("assigns references, data to the initialState", () => {
    let state = {}

    let finalState = execute()(state)

    execute()(state)
    .then((finalState) => {
      expect(finalState).to.eql({
        references: [],
        data: null
      })
    })

  })
})

describe("person", () => {
  let mockRequest

  before(() => {
    mockRequest = superagentMock(request, ClientFixtures)
  })

  it("posts to API and returns state", () => {
    let state = {
      configuration: {
        username: "admin",
        password: "Admin123",
        instanceUrl: 'http://demo.test.org/test'
      }
    };

    return execute(
      person(fixtures.person.requestBody)
    )(state)
    .then((state) => {
      let lastReference = state.references[0]

      // Check that the personData made it's way to the request as a string.
      expect(lastReference.params).
        to.eql(JSON.stringify(fixtures.person.requestBody))

    })

  })

  after(() => {
    mockRequest.unset()
  })

})
