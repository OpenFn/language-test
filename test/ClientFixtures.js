const fixtures = {
  person: {
    requestBody: {
      "gender": "F",
      "names": [
        {
          "givenName": "Jane",
          "familyName": "Doe"
        }
      ]
    },
    responseBody: {
      "httpStatus":"OK",
      "httpStatusCode":201, "status":"Created", "message":"The request has been fulfilled and resulted in a new resource being created.", "response": {"uuid":"97ae3d49-657e-461f-8332-0f45e69b7aee","display":"sammy Blaylock","gender":"M","age":null,"birthdate":null,"birthdateEstimated":false,"dead":false,"deathDate":null,"causeOfDeath":null,"preferredName":{"uuid":"4b8fb9ff-cf48-4e00-955c-74776c4d6dcf","display":"sammy Blaylock","links":[{"rel":"self","uri":"http://demo.test.org/test/ws/rest/v1/person/97ae3d49-657e-461f-8332-0f45e69b7aee/name/4b8fb9ff-cf48-4e00-955c-74776c4d6dcf"}]},"preferredAddress":null,"attributes":[],"voided":false,"deathdateEstimated":false,"birthtime":null,"links":[{"rel":"self","uri":"http://demo.test.org/test/ws/rest/v1/person/97ae3d49-657e-461f-8332-0f45e69b7aee"},{"rel":"full","uri":"http://demo.test.org/test/ws/rest/v1/person/97ae3d49-657e-461f-8332-0f45e69b7aee?v=full"}],"resourceVersion":"1.11"}}


    }
  }

  // patient: {
  //   requestBody: {
  //     "person": "82b3b08c-792f-4bda-a4eb-5ba2db3b9d51",
  //     "identifiers": [
  //       {
  //         "identifier": "1034",
  //         "identifierType": "8d79403a-c2cc-11de-8d13-0010c6dffd0f",
  //         "location": "8d6c993e-c2cc-11de-8d13-0010c6dffd0f",
  //         "preferred": true
  //       }
  //     ]
  //   },
  //   responseBody: {
  //     "httpStatus":"OK",
  //     "httpStatusCode":201,
  //     "status":"Created",
  //     "message":"The request has been fulfilled and resulted in a new resource being created.",
  //     "response": {"uuid":"82b3b08c-792f-4bda-a4eb-5ba2db3b9d51","display":"1034 - Mookie Blaylock","identifiers":[{"uuid":"38416bcb-eca6-4bc0-8eba-3ed384e6bd69","display":"Old Identification Number = 1034","links":[{"rel":"self","uri":"http://demo.test.org/test/ws/rest/v1/patient/82b3b08c-792f-4bda-a4eb-5ba2db3b9d51/identifier/38416bcb-eca6-4bc0-8eba-3ed384e6bd69"}]}],"person":{"uuid":"82b3b08c-792f-4bda-a4eb-5ba2db3b9d51","display":"Mookie Blaylock","gender":"M","age":null,"birthdate":null,"birthdateEstimated":false,"dead":false,"deathDate":null,"causeOfDeath":null,"preferredName":{"uuid":"58c4e7d8-bceb-4b9c-98c2-18b7d0eae709","display":"Mookie Blaylock","links":[{"rel":"self","uri":"http://demo.test.org/test/ws/rest/v1/person/82b3b08c-792f-4bda-a4eb-5ba2db3b9d51/name/58c4e7d8-bceb-4b9c-98c2-18b7d0eae709"}]},"preferredAddress":null,"attributes":[],"voided":false,"deathdateEstimated":false,"birthtime":null,"links":[{"rel":"self","uri":"http://demo.test.org/test/ws/rest/v1/person/82b3b08c-792f-4bda-a4eb-5ba2db3b9d51"},{"rel":"full","uri":"http://demo.test.org/test/ws/rest/v1/person/82b3b08c-792f-4bda-a4eb-5ba2db3b9d51?v=full"}],"resourceVersion":"1.11"},"voided":false,"links":[{"rel":"self","uri":"http://demo.test.org/test/ws/rest/v1/patient/82b3b08c-792f-4bda-a4eb-5ba2db3b9d51"},{"rel":"full","uri":"http://demo.test.org/test/ws/rest/v1/patient/82b3b08c-792f-4bda-a4eb-5ba2db3b9d51?v=full"}],"resourceVersion":"1.8"}}
  //
  //
  //   }
  // }

export { fixtures };

export default [ {
  pattern: 'http://demo.test.org/test(.*)',

  fixtures( match, params, headers ) {
    if( match[1] === '/ws/rest/v1/person' ) {
      return {
        body: fixtures.person.responseBody,
        params, headers
      }
    }

    throw new Error( `No Fixture Match\ngot: ${JSON.stringify(match, 2, null)}`)
  },

  post(match, data) {
    return { ok: true, match, ...data }
  }
} ]
