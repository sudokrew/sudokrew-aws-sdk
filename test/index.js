const chaiAsPromised = require("chai-as-promised");
const chai = require('chai');
const expect = chai.expect;

chai.use(chaiAsPromised);

chai.should();

const s3Service = require('../s3');
const sqsService = require('../sqs');

describe('Check S3 for valid functions', () => {
  var newObject = Object.keys(s3Service).map(function (key) {
    it(`should be a function`, () => {
      ((typeof (s3Service[key])).should.equals('function'))
    })

    it('rejects as promised', async () => {

      //trying to check that the Error always contains a name, message, and stack
      await (Promise.resolve(s3Service[key])).reject(new Error()).should.be.rejectedWith(Error);
      // .that.deep.equals({
      // 'firstProp': 'foo',
      // 'secondProp': 'bar',
      // });

    });
  });
});
