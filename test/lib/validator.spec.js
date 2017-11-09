'use strict';

const validator = require('../../lib/validator'),
      assert    = require('unit.js');

const valid = [

    // Visa 13
    '4485751556456',
    '4485 7515 5645 6',

    // Visa normal
    '4024007180612532',
    '4024 0071 8061 2532',

    // Mastercard
    '5244430837858152',
    '5244 4308 3785 8152',

    // Diners
    '30225490720544',
    '3022 549072 0544',

    // Elo
    '4514160058931695',
    '4514 1600 5893 1695',

    // Amex
    '340958930386006',
    '3409 589303 86006',

    // Discover
    '6011899731549951',
    '6011 8997 3154 9951',

    // Hipercard
    '6062823434266992',
    '6062 8234 3426 6992',
];

const invalid = [
    '4485751556457',
    '4024007180612531',
    '5244430837858151',
    '30225490720543',
    '4514160058931694',
    '340958930386005',
    '6011899731549950',
    '6062823434266991',
    '',
    ' ',
    '1',
    'a',
    true,
    false,
    null,
    undefined,
];

const expirationValid = [
    '09/2019',
    '09/19',
];

const expirationinValid = [
    '09/20190',
    '009/2019',
    '09/190',
    '009/19',
    '09',
    '19',
    '',
    ' ',
    '1',
    'a',
    true,
    false,
    null,
    undefined,
];

const validCvv = [
    '123',
    '1234'
];

const invalidCvv = [
    '',
    ' ',
    '1',
    'a',
    true,
    false,
    null,
    undefined,
];

describe('Validator', function()
{
    valid.forEach(function(number)
    {
        it('Valid: ' + number, function(done)
        {
            assert.bool(validator.validate(number)).isTrue();
            done();
        });
    });

    invalid.forEach(function(number)
    {
        it('Invalid: ' + number, function(done)
        {
            assert.bool(validator.validate(number)).isFalse();
            done();
        });
    });

    validCvv.forEach(function(cvv)
    {
        it('Valid CVV: ' + cvv, function(done)
        {
            assert.bool(validator.cvv(cvv)).isTrue();
            done();
        });
    });

    invalidCvv.forEach(function(cvv)
    {
        it('Invalid CVV: ' + cvv, function(done)
        {
            assert.bool(validator.cvv(cvv)).isFalse();
            done();
        });
    });

    expirationValid.forEach(function(expiration)
    {
        it('Exiration Valid: ' + expiration, function(done)
        {
            const validation = validator.expiration(expiration);

            assert.object(validation);
            assert.bool(validation.validFormat).isTrue();
            assert.bool(validation.isExpired).isFalse();

            done();
        });
    });

    expirationinValid.forEach(function(expiration)
    {
        it('Exiration Invalid: ' + expiration, function(done)
       {
            const validation = validator.expiration(expiration);

            assert.object(validation);
            assert.bool(validation.validFormat).isFalse();
            assert.bool(validation.isExpired).isTrue();

            done();
        });
    });
});
