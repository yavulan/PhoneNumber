'use strict';

process.env.NODE_ENV = 'test';

const chai = require( 'chai' );
    const should = chai.should();
    const expect = chai.expect;

// getting access to non-exporting class in separate file
const rewire = require( 'rewire' );
    const app = rewire( '../dist/PhoneNumber.js' );
    const PhoneNumber = app.__get__( 'PhoneNumber' );

describe( 'Phone number parsing', () => {
    it( 'should parse valid phone numbers', () =>
        PhoneNumber.parse( '+380501234567' ).should.equal( '380501234567' ) );

    it( 'should not parse invalid phone numbers (return undefined)', () =>
        expect(PhoneNumber.parse( '380001234567' )).to.be.undefined );
});

describe( 'Setting default country', () => {
    it( 'should throw an Err if country is invalid or not supported', () =>
        expect( ()=> PhoneNumber.setDefaultCountry('whaat') ).to.throw( ReferenceError, /is not supported/ ) );

    it( 'should set supported country', () => {
        PhoneNumber.setDefaultCountry( 'UA' );
        PhoneNumber.defaultCountry.should.equal( 'UA' );
    });
});
