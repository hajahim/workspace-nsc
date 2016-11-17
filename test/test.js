/* eslint-disable */

process.env.NODE_ENV = 'test';

const assert = require('assert');

// const chai = require('chai');
// const chaiHttp = require('chai-http');

// const expect = chai.expect;
// const should = chai.should();

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});
