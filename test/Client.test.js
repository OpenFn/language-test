import { expect } from 'chai';
import request from 'superagent';
import superagentMock from 'superagent-mock';

import { post } from '../src/Client'
import ClientFixtures, { fixtures } from './ClientFixtures'


describe("Client", () => {

  let mockRequest;

  before(() => {
    mockRequest = superagentMock(request, ClientFixtures)
  })

  describe("post", () => {

    it("sends a payload to test", () => {
      let body = fixtures.person.requestBody;
      let username = 'admin';
      let password = 'Admin123';
      let url = 'http://demo.test.org/test/ws/rest/v1/person';

      return post({ body, username, password, url }).then((result) => {
        expect(result.body).to.eql(fixtures.person.responseBody)

        // Check that basic auth is being used.
        expect(result.headers).
          to.eql({
            "Accept": "application/json",
            "Authorization": "Basic YWRtaW46QWRtaW4xMjM=",
            "Content-Type": "application/json",
          })

      })
    })

  })

  after(() => {
    mockRequest.unset()
  })

})
