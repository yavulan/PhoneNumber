'use strict';

let PhoneNumber = (function() {
    const _phoneNumber = Symbol( 'phoneNumber' );
    const _country     = Symbol( 'country' );
    const _prefix      = Symbol( 'prefix' );
    const _area        = Symbol( 'area' );
    const _number      = Symbol( 'number' );

    class PhoneNumber {
        constructor( number, country ) {
            let invalid = function () {
                this[_area] = this[_number] = void 0;
            }.bind( this );

            let guessCountry = function ( number ) {
                for ( let country in PhoneNumber.countries ) {
                    if (
                        PhoneNumber.countries.hasOwnProperty( country ) &&
                        PhoneNumber.countries[country].prefix === number.slice( 0, PhoneNumber.countries[country].prefix.length )
                    ) {
                        return country;
                    }
                }
            }.bind( this );

            if ( !number ) return invalid();

            // left only digits in number
            // cache input number in *this[_phoneNumber]* for further use
            this[_phoneNumber] = number = number.replace( /\D+/g, '' );

            if( country && !!~Object.keys(PhoneNumber.countries).indexOf(country) ){
                this[_country] = country;
            } else{
                this[_country] = guessCountry( number ) || PhoneNumber.defaultCountry;
            }

            this[_prefix] = PhoneNumber.countries[this[_country]].prefix;

            // if passed number longer than country minimum number length fill it in and truncate *number*
            // otherwise, break
            let lengths = PhoneNumber.countries[this[_country]].len;

            if ( number.length >= lengths.number ) {
                this[_number] = number.substr( -lengths.number );
                number = number.slice( 0, -lengths.number );
            } else {
                return invalid();
            }

            if ( number.length >= lengths.area ) {
                number = number.substr( -lengths.area );
                this[_area] = number;
                if( !PhoneNumber.countries[this[_country]].valid.area.test(this[_area]) ) return invalid();
            }

        };
        static setDefaultCountry( country ){
            if( !!~Object.keys(PhoneNumber.countries).indexOf(country) ){
                PhoneNumber.defaultCountry = country;
            } else {
                throw new ReferenceError( `Country ${country} is not supported.` );
            }
        };
        static parse( number, country ) {
            return new PhoneNumber( number, country ).toString();
        };
        toString() {
            return ( this[_number] && this[_area] ) ?
                    `${this[_prefix]}${this[_area]}${this[_number]}` :
                        this[_number];
        };
        get number() {
            return this[_number];
        };
        get areaCode() {
            return this[_area];
        };
        get internationalPrefix() {
            return this[_prefix];
        };
        get countryName() {
            return this[_country];
        };
        get operator() {
            let areas = PhoneNumber.countries[this[_country]].areas;

            for ( let i = 0; i < areas.length; i++ ) {
                if ( !!~areas[i].areas.indexOf(+this[_area]) ) {
                    return areas[i].name;
                }
            }
        };
    }

    PhoneNumber.defaultCountry = 'UA';
    PhoneNumber.countries = {
        UA: {
            prefix: '380',
            defaultFormat: '+38 000 000 00 00',
            areas: [
                {
                    name: 'kyivstar',
                    areas: [67, 68, 96, 97, 98]
                    //type: 'mobile'
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
            },
            valid: {
                area: /^(50|6[36-8]|73|9[1-9])$/
            }
        }
    };

    return PhoneNumber;
}());
