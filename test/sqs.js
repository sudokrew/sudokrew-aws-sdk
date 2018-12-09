const chaiAsPromised = require("chai-as-promised");
const chai = require('chai');
const expect = chai.expect;

chai.use(chaiAsPromised);

chai.should();

const sqsService = require('../sqs');
const errorHandler = require('../services/errorHandler');

describe('Check SQS for valid functions', () => {
  Object.keys(sqsService).map(function (key) {
    it(`should be a function`, () => {
      ((typeof (sqsService[key])).should.equals('function'))
    })

    it('should have a catch that returns an error object', () => {

      var testFunction = sqsService[key]().catch((err) => {
        expect(err).to.exist
          .and.be.an.instanceof(errorHandler.CommonError);
      });
    });
  });
});

