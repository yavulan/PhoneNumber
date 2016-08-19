# PhoneNumber
![](https://img.shields.io/badge/documentation-not%20ready-red.svg?style=flat-square)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/yavulan/PhoneNumber/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/yavulan/PhoneNumber.svg?style=flat-square)](https://github.com/yavulan/PhoneNumber/issues)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/yavulan/PhoneNumber.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=%5Bobject%20Object%5D)

A JavaScript (ECMAScript) class for working with phone numbers (without dependencies). Easy parsing, formatting, validating etc.

## How to use?
Just add the `PhoneNumber.min.js` file to your HTML page. Then construct a new PhoneNumber instance. Like so:

```html
<script src="PhoneNumber.min.js"></script>
<script>
let myNumber = new PhoneNumber( '0501234567' );
</script>
```

Usage might be even simpler with static methods.

## Constructor

## Static methods

### `.parse( number[, country[, format] )`

Returns formatted number. Uses `.toString()` method with new instance of PhoneNumber.

```javascript
// Uses default formatting in case if format is not provided
PhoneNumber.parse( '0501234567' ) === '+380501234567';

// If format provided and passed number is valid:
// Replace *format* from the end of a string with a reversed number and area code
PhoneNumber.parse( '0501234567', '', 'tel:+380000000000' ) ===  'tel:+380501234567';
```

## Supported countries:
1. Ukraine

Planned:
* 

*Feel free posting an issue for country support plan*