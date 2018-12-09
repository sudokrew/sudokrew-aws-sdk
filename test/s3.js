const chaiAsPromised = require("chai-as-promised");
const chai = require('chai');
const expect = chai.expect;

chai.use(chaiAsPromised);

chai.should();

const s3Service = require('../s3');
const errorHandler = require('../services/errorHandler');

describe('Check S3 for valid functions', () => {
  Object.keys(s3Service).map(function (key) {
    it(`should be a function`, () => {
      ((typeof (s3Service[key])).should.equals('function'))
    })

    it('should have a catch that returns an error object', () => {

      var testFunction = s3Service[key]().catch((err) => {
        expect(err).to.exist
          .and.be.an.instanceof(errorHandler.CommonError);
      });
    });
  });
});

describe('createBucket', () => {
  it('has the required parameter, bucket name, passed in', (done) => {
    var params = {
      Bucket: 'Bucket Name'
    };

    s3Service.createBucket(params)
      .then((data) => {
        expect(data).to.be.an('object')
        done(data)
      })
      .catch((err) => {
        done(err);
      })
  });

  //doesn't have the parameters
  it('should fail if functions are not passed required paramaters', () => {

    var testFunction = s3Service.createBucket().catch((err) => {
      expect(err).to.exist
        .and.be.an.instanceof(errorHandler.CommonError);
    });
  });
});

