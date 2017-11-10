'use strict';

const decorator = require('../../lib/decorator'),
      assert    = require('unit.js');

const numbers = [
    {
        // VISA 13
        unmasked: '4485751556456',
        masked  : '4485 7515 5645 6',
    },
    {
        // VISA
        unmasked: '4024007180612532',
        masked  : '4024 0071 8061 2532',
    },
    {
        // MASTERCARD
        unmasked: '5244430837858152',
        masked  : '5244 4308 3785 8152',
    },
    {
        // ELO
        unmasked: '4514160058931695',
        masked  : '4514 1600 5893 1695',
    },
    {
        // DISCOVER
        unmasked: '6011899731549951',
        masked  : '6011 8997 3154 9951',
    },
    {
        // HIPERCARD
        unmasked: '6062823434266992',
        masked  : '6062 8234 3426 6992',
    },
    {
        // DINERS
        unmasked: '30225490720544',
        masked  : '3022 549072 0544',
    },
    {
        // AMEX
        unmasked: '340958930386006',
        masked  : '3409 589303 86006',
    },
];

const expirations = [
    {
        input : '09/19',
        output: '19/09',
    },
    {
        input : '19/09',
        output: '09/19',
    },
    {
        input : '09/2019',
        output: '2019/09',
    },
    {
        input : '2019/09',
        output: '09/2019',
    },
];

describe('Decorator', function()
{
    numbers.forEach(function(number)
    {
        it('Is Masked..: ' + number.masked, function(done)
        {
            assert.bool(decorator.isMasked(number.masked)).isTrue();
            done();
        });

        it('Is UnMasked: ' + number.unmasked, function(done)
        {
            assert.bool(decorator.isMasked(number.unmasked)).isFalse();
            done();
        });

        it('Mask.......: ' + number.unmasked, function(done)
        {
            assert.string(decorator.mask(number.unmasked)).isEqualTo(number.masked);
            done();
        });

        it('Mask Double: ' + number.masked, function(done)
        {
            assert.string(decorator.mask(number.masked)).isEqualTo(number.masked);
            done();
        });

        it('UnMask.....: ' + number.masked, function(done)
        {
            assert.string(decorator.unMask(number.masked)).isEqualTo(number.unmasked);
            done();
        });
    });

    expirations.forEach(function(expiration)
    {
        it('Reverse Expiration: ' + expiration.input + ' => ' + expiration.output, function(done)
        {
            assert.string(decorator.expirationReverse(expiration.input)).isEqualTo(expiration.output);
            done();
        });
    });
});
