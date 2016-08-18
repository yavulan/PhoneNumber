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
        PhoneNumber.parse( '+380501234567' ).should.equal( '+380501234567' ) );

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

    it( 'should set country properly despite the case', () =>
        expect( PhoneNumber.setDefaultCountry('uA') ).to.equal( 'UA' )
    );

});

describe( 'Getting operators', () => {
    it( 'should return kyivstar', () => {
        let ph = new PhoneNumber( '0671234567' );
        ph.operator.should.equal( 'kyivstar' );
    });

    it( 'should return vodafone', () => {
        let ph = new PhoneNumber( '0991234567' );
        ph.operator.should.equal( 'vodafone' );
    });

    it( 'should return lifecell', () => {
        let ph = new PhoneNumber( '0731234567' );
        ph.operator.should.equal( 'lifecell' );
    });

    it( 'should return intertelecom', () => {
        let ph = new PhoneNumber( '0941234567' );
        ph.operator.should.equal( 'intertelecom' );
    });

    it( 'should return 3mob', () => {
        let ph = new PhoneNumber( '0911234567' );
        ph.operator.should.equal( '3mob' );
    });
});

describe( 'Phone number formatting', () => {
    it( 'should use default formatting by default', () =>
        PhoneNumber.parse( '0501234567' ).should.equal( '+380501234567' )
    );

    it( 'should properly fit to formatting with spaces', () =>
            PhoneNumber.parse( '0501234567', '', '+38 000 000 00 00' ).should.equal( '+38 050 123 45 67' )
    );

    it( 'should properly fit to formatting with dashes', () =>
            PhoneNumber.parse( '0501234567', '', '+38 000 000-00-00' ).should.equal( '+38 050 123-45-67' )
    );

    it( 'should properly fit to formatting without area code', () =>
            PhoneNumber.parse( '0501234567', '', '000 -> 00 -> 00' ).should.equal( '123 -> 45 -> 67' )
    );
});