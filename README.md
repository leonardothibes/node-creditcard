# CreditCard [![npm](http://img.shields.io/npm/v/node-creditcard.svg)](https://www.npmjs.com/package/node-creditcard) ![Downloads](https://img.shields.io/npm/dm/node-creditcard.svg) [![Build Status](https://secure.travis-ci.org/leonardothibes/node-creditcard.png)](http://travis-ci.org/leonardothibes/node-creditcard) [![Package Quality](http://npm.packagequality.com/shield/node-creditcard.svg)](http://packagequality.com/#?package=node-creditcard) [![License](https://img.shields.io/npm/l/node-creditcard.svg)](https://tldrlegal.com/license/mit-license)

Utilities functions for credit cards treatment.

Pay me a Coffee
---------------

If this component was useful for you, or one of your projects, please help to support my work clicking in the button below and making a donation via PayPal:

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=leonardothibes%40gmail%2ecom&lc=BR&item_name=Leonardo%20Thibes&item_number=node%2dcreditcard&no_note=0&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHostedGuest)

Supported Brands
----------------

* VISA
* MASTERCARD
* DINERS CLUB
* AMERICAN EXPRESS
* HIPERCARD
* ELO
* DISCOVER

Installation
------------

```bash
npm install node-creditcard --save
```

Examples
--------

* [Basic Usage](#basic-usage)
* [Get Data](#get-data)
* [Get Safe Data](#get-safe-data)
* [Identify Brand](#identify-brand)
* [Mask or Unmask Number](#mask-or-unmask-number)
* [Generate](#generate)

Basic Usage
-----------

```js
const CreditCard = require('node-creditcard');

// Passing data to constructor.
const creditcard = new CreditCard({
    number    : '4532862404969398',
    holder    : 'FULANO D TAL',
    expiration: '04/2019',
    cvv       : '123',
});
// Passing data to constructor.

// Passing data individually.
const creditcard      = new CreditCard();
creditcard.number     = '4532 8624 0496 9398';
creditcard.holder     = 'FULANO D TAL';
creditcard.expiration = '04/2019';
creditcard.cvv        = '123';
// Passing data individually.

creditcard.isValid(); // returns TRUE

const validation = creditcard.validate();
```
The validation object returned by __validate()__ will looks like this:
```js
{
    brand          : 'VISA',
    validCardNumber: true,
    validHolder    : true,
    validCvv       : true,
    validExpiration: true,
    isExpired      : false,
}
```

Get Data
--------

```js
const CreditCard = require('node-creditcard');

const creditcard = new CreditCard({
    number    : '4532862404969398',
    holder    : 'FULANO D TAL',
    expiration: '04/2019',
    cvv       : '123',
});

const data = creditcard.getData();
```
The data object returned by __getData()__ will looks like this:
```js
{
    brand     : 'VISA',
    number    : '4532862404969398',
    holder    : 'FULANO D TAL',
    expiration: '04/2019',
    cvv       : '123',
}
```

Get Safe Data
-------------

```js
const CreditCard = require('node-creditcard');

const creditcard = new CreditCard({
    number    : '4532862404969398',
    holder    : 'FULANO D TAL',
    expiration: '04/2019',
    cvv       : '123',
});

const data = creditcard.getSafeData();
```
The data object returned by __getSafeData()__ will looks like this:
```js
{
    brand     : 'VISA',
    number    : '4532 **** **** 9398',
    holder    : 'FULANO D TAL',
    expiration: '04/2019',
    cvv       : '***',
}
```

Identify Brand
--------------

```js
const CreditCard = require('node-creditcard');

CreditCard.identify('4716058940605004');    // returns 'VISA'
CreditCard.identify('4716 0589 4060 5004'); // returns 'VISA'

CreditCard.identify('5194189706731425');    // returns 'MASTERCARD'
CreditCard.identify('5194 1897 0673 1425'); // returns 'MASTERCARD'

CreditCard.identify('376921693572268');    // returns 'AMEX'
CreditCard.identify('3769 216935 72268');  // returns 'AMEX'

```

Mask or Unmask Number
---------------------

```js
const CreditCard = require('node-creditcard');

CreditCard.isMasked('4716058940605004'); // returns FALSE
CreditCard.mask('4716058940605004');     // returns '4716 0589 4060 5004'

CreditCard.isMasked('4716 0589 4060 5004'); // returns TRUE
CreditCard.unMask('4716 0589 4060 5004');   // returns '4716058940605004'

```

Generate
--------

```js
const CreditCard = require('node-creditcard');

CreditCard.generate('VISA');          // returns a VISA UNMASKED number
CreditCard.generate('VISA', true);    // returns a VISA MASKED number
CreditCard.generate('VISA', true, 3); // returns a 3 VISA MASKED numbers

```

Test and development
--------------------

* Install external dependencies: **``npm install``**
* Run the test suite without coverage: **``npm test``**
* Run the test suite with coverage: **``npm run testdox``**

How to Contribute
-----------------

* Open a pull request or an issue about what you want to implement / change. We're glad for any help!
* Please be aware that we'll only accept fully tested code.

Contributors
------------

 * **Leonardo Thibes <leonardothibes@gmail.com>**

LICENSE
=======

Copyright (c) 2017 Leonardo Thibes

The MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
