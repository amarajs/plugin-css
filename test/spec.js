const sinon = require('sinon');
const expect = require('chai').expect;

const AmaraCSS = require('../dist/amara-plugin-css');

describe('AmaraCSSPlugin', function() {

    let dispatch;

    beforeEach(function setup() {
        dispatch = sinon.spy();
    });

    it('returns handler factory', function() {
        expect(AmaraCSS).to.be.a('function');
    });

    it('handler factory returns handler', function() {
        expect(AmaraCSS()).to.be.a('function');
    });

    describe('handler', function() {

        beforeEach(function setup() {
            this.handler = AmaraCSS()(dispatch);
        });

    });

});
