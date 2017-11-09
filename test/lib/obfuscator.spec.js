'use strict';

const obfuscator = require('../../lib/obfuscator'),
      assert     = require('unit.js');

const numbers = [
    {
        // VISA 13
        unObfuscated: '4485751556456',
        obfuscated  : '4485 **** **** 6',
    },
    {
        // VISA 13
        unObfuscated: '4485 7515 5645 6',
        obfuscated  : '4485 **** **** 6',
    },
    {
        // AMEX
        unObfuscated: '3409 589303 86006',
        obfuscated  : '3409 ****** 86006',
    },
    {
        // AMEX
        unObfuscated: '340958930386006',
        obfuscated  : '3409 ****** 86006',
    },
    {
        // DINERS
        unObfuscated: '3022 549072 0544',
        obfuscated  : '3022 ****** 0544',
    },
    {
        // DINERS
        unObfuscated: '30225490720544',
        obfuscated  : '3022 ****** 0544',
    },
    {
        // Mastercard
        unObfuscated: '5244430837858152',
        obfuscated  : '5244 **** **** 8152',
    },
    {
        // Mastercard
        unObfuscated: '5244 4308 3785 8152',
        obfuscated  : '5244 **** **** 8152',
    },
];

const cvvs = [
    {
        unObfuscated: '123',
        obfuscated  : '***'
    },
    {
        unObfuscated: '1234',
        obfuscated  : '****'
    },
];

describe('Obfuscator', function()
{
    numbers.forEach(function(number)
    {
        it('Is Obfuscated: ' + number.obfuscated, function(done)
        {
            assert.bool(obfuscator.isObfuscated(number.obfuscated)).isTrue();
            done();
        });

        it('Is Not Obfuscated: ' + number.unObfuscated, function(done)
        {
            assert.bool(obfuscator.isObfuscated(number.unObfuscated)).isFalse();
            done();
        });

        it('Obfuscating Number: ' + number.unObfuscated + ' -> ' + number.obfuscated, function(done)
        {
            assert.string(obfuscator.number(number.unObfuscated)).isEqualTo(number.obfuscated);
            done();
        });

        it('Double Obfuscating Number: ' + number.obfuscated + ' -> ' + number.obfuscated, function(done)
        {
            assert.string(obfuscator.number(number.obfuscated)).isEqualTo(number.obfuscated);
            done();
        });
    });

    cvvs.forEach(function(cvv)
    {
        it('Is Obfuscated: ' + cvv.obfuscated, function(done)
        {
            assert.bool(obfuscator.isObfuscated(cvv.obfuscated)).isTrue();
            done();
        });

        it('Is Not Obfuscated: ' + cvv.unObfuscated, function(done)
        {
            assert.bool(obfuscator.isObfuscated(cvv.unObfuscated)).isFalse();
            done();
        });

        it('Obfuscating CVV: ' + cvv.unObfuscated + ' -> ' + cvv.obfuscated, function(done)
        {
            assert.string(obfuscator.cvv(cvv.unObfuscated)).isEqualTo(cvv.obfuscated);
            done();
        });

        it('Double Obfuscating CVV: ' + cvv.obfuscated + ' -> ' + cvv.obfuscated, function(done)
        {
            assert.string(obfuscator.cvv(cvv.obfuscated)).isEqualTo(cvv.obfuscated);
            done();
        });
    });
});
