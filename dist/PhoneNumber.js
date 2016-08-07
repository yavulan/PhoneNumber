'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//'use strict';

var PhoneNumber = function () {
    var _phoneNumber = Symbol('phoneNumber');
    var _country = Symbol('country');
    var _prefix = Symbol('prefix');
    var _area = Symbol('area');
    var _number = Symbol('number');

    var PhoneNumber = function () {
        function PhoneNumber(number, country) {
            _classCallCheck(this, PhoneNumber);

            var invalid = function () {
                this[_area] = this[_number] = void 0;
            }.bind(this);

            var guessCountry = function (number) {
                for (var _country2 in PhoneNumber.countries) {
                    if (PhoneNumber.countries.hasOwnProperty(_country2) && PhoneNumber.countries[_country2].prefix === number.slice(0, PhoneNumber.countries[_country2].prefix.length)) {
                        return _country2;
                    }
                }
            }.bind(this);

            if (!number) return invalid();

            // left only digits in number
            // cache input number in *this[_phoneNumber]* for further use
            this[_phoneNumber] = number = number.replace(/\D+/g, '');

            if (country && !!~Object.keys(PhoneNumber.countries).indexOf(country)) {
                this[_country] = country;
            } else {
                this[_country] = guessCountry(number) || PhoneNumber.defaultCountry;
            }

            this[_prefix] = PhoneNumber.countries[this[_country]].prefix;

            // if passed number longer than country minimum number length fill it in and truncate *number*
            // otherwise, break
            var lengths = PhoneNumber.countries[this[_country]].len;

            if (number.length >= lengths.number) {
                this[_number] = number.substr(-lengths.number);
                number = number.slice(0, -lengths.number);
            } else {
                return invalid();
            }

            if (number.length >= lengths.area) {
                number = number.substr(-lengths.area);
                this[_area] = number;
                if (!PhoneNumber.countries[this[_country]].valid.area.test(this[_area])) return invalid();
            }
        }

        _createClass(PhoneNumber, [{
            key: 'toString',
            value: function toString() {
                return this[_number] && this[_area] ? '' + this[_prefix] + this[_area] + this[_number] : this[_number];
            }
        }, {
            key: 'number',
            get: function get() {
                return this[_number];
            }
        }, {
            key: 'areaCode',
            get: function get() {
                return this[_area];
            }
        }, {
            key: 'internationalPrefix',
            get: function get() {
                return this[_prefix];
            }
        }, {
            key: 'countryName',
            get: function get() {
                return this[_country];
            }
        }, {
            key: 'operator',
            get: function get() {
                var areas = PhoneNumber.countries[this[_country]].areas;

                for (var i = 0; i < areas.length; i++) {
                    if (!!~areas[i].areas.indexOf(+this[_area])) {
                        return areas[i].name;
                    }
                }
            }
        }], [{
            key: 'setDefaultCountry',
            value: function setDefaultCountry(country) {
                if (!!~Object.keys(PhoneNumber.countries).indexOf(country)) {
                    PhoneNumber.defaultCountry = country;
                } else {
                    throw new ReferenceError('Country ' + country + ' is not supported.');
                }
            }
        }, {
            key: 'parse',
            value: function parse(number, country) {
                return new PhoneNumber(number, country).toString();
            }
        }]);

        return PhoneNumber;
    }();

    PhoneNumber.defaultCountry = 'UA';
    PhoneNumber.countries = {
        UA: {
            prefix: '380',
            defaultFormat: '+38 000 000 00 00',
            areas: [{
                name: 'kyivstar',
                areas: [67, 68, 96, 97, 98]
                //type: 'mobile'
            }, {
                name: 'vodafone',
                areas: [50, 66, 95, 99]
            }, {
                name: 'lifecell',
                areas: [63, 73, 93]
            }, {
                name: 'intertelecom',
                areas: [94]
            }, {
                name: '3mob',
                areas: [91]
            }, {
                name: 'PEOPLEnet',
                areas: [92]
            }],
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
}();