"use strict";

const _phoneNumber = Symbol( 'phoneNumber' );
const _country     = Symbol( 'country' );
const _prefix      = Symbol( 'prefix' );
const _area        = Symbol( 'area' );
const _number      = Symbol( 'number' );
const _opts        = Symbol( 'opts' );
const _countries   = Symbol( 'countries' );

class PhoneNumber {
    constructor( phoneNumber, country ) {
        this[_phoneNumber] = '';
        this[_country] = '';
        this[_prefix] = '';
        this[_area] = '';
        this[_number] = '';

        this[_opts] = {
            defaultCountry: 'UA'
        };

        this[_countries] = {
            UA: {
                prefix: '380',
                defaultFormat: '+38 000 000 00 00',
                areas: [
                    {
                        name: 'kyivstar',
                        areas: [67, 68, 96, 97, 98]
                    },
                    {
                        name: 'vodafone',
                        areas: [50, 66, 95, 99]
                    },
                    {
                        name: 'lifecell',
                        areas: [63, 73, 93]
                    },
                    {
                        name: 'intertelecom',
                        areas: [94]
                    },
                    {
                        name: '3mob',
                        areas: [91]
                    },
                    {
                        name: 'PEOPLEnet',
                        areas: [92]
                    }
                ],
                len: {
                    prefix: 3,
                    area: 2,
                    number: 7
                }
            }
        };

        this._init( phoneNumber, country );
    };

    _init( number, country ) {
        if ( !number ) return;

        // left only digits in number
        this[_phoneNumber] = number = number.replace( /\D+/g, '' );

        this[_country] = country || guessCountry.call( this, this[_phoneNumber] ) || this[_opts].defaultCountry;
        this[_prefix] = this[_countries][this[_country]].prefix;

        // if passed number longer than country minimum number length fill it in and truncate *number*
        // otherwise, break
        let lengths = this[_countries][this[_country]].len;

        if ( number.length >= lengths.number ) {
            this[_number] = number.substr( -lengths.number );
            number = number.slice( 0, -lengths.number );
        } else {
            return;
        }

        if ( number.length >= lengths.area ) {
            number = number.substr( -lengths.area );
            this[_area] = number;
        }

        function guessCountry( number ) {
            for ( var country in this[_countries] ) {
                if (
                    this[_countries].hasOwnProperty( country ) &&
                        this[_countries][country].prefix === number.slice( 0, this[_countries][country].prefix.length )
                ) {
                    return country;
                }
            }
        }
    };

    parse( number, country ) {
        number = number || this[_phoneNumber];
        country = country || this[_country];

        this._init( number, country );

        return this.toString();
    };

    toString() {
        return `${this[_prefix]}, ${this[_area]}, ${this[_number]}`;
    };

    get number() {
        return this[_number];
    }

    get areaCode() {
        return this[_area];
    }

    get internationalPrefix() {
        return this[_prefix];
    }

    get countryName() {
        return this[_country];
    }

    get operator() {
        var areas = this[_countries][this[_country]].areas;

        for ( var i = 0; i < areas.length; i++ ) {
            if ( !!~areas[i].areas.indexOf(+this[_area]) ) {
                return areas[i].name;
            }
        }
    }
}


