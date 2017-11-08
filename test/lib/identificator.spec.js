'use strict';

const identificator = require('../../lib/identificator'),
      assert        = require('unit.js');

const cards = [
    {
        number: '4485751556456',
        brand : 'VISA',
    },
    {
        number: '4485 7515 5645 6',
        brand : 'VISA',
    },
    {
        number: '4024007180612532',
        brand : 'VISA',
    },
    {
        number: '4024 0071 8061 2532',
        brand : 'VISA',
    },
    {
        number: '5244430837858152',
        brand : 'MASTERCARD',
    },
    {
        number: '5244 4308 3785 8152',
        brand : 'MASTERCARD',
    },
    {
        number: '30225490720544',
        brand : 'DINERS',
    },
    {
        number: '3022 5490 7205 44',
        brand : 'DINERS',
    },
    {
        number: '4514160058931695',
        brand : 'ELO',
    },
    {
        number: '4514 1600 5893 1695',
        brand : 'ELO',
    },
    {
        number: '5041752135079057',
        brand : 'ELO',
    },
    {
        number: '5041 7521 3507 9057',
        brand : 'ELO',
    },
    {
        number: '6363682711660012',
        brand : 'ELO',
    },
    {
        number: '6363 6827 1166 0012',
        brand : 'ELO',
    },
    {
        number: '340958930386006',
        brand : 'AMEX',
    },
    {
        number: '3409 589303 86006',
        brand : 'AMEX',
    },
    {
        number: '376560050188258',
        brand : 'AMEX',
    },
    {
        number: '3765 600501 88258',
        brand : 'AMEX',
    },
    {
        number: '6011899731549951',
        brand : 'DISCOVER',
    },
    {
        number: '6011 8997 3154 9951',
        brand : 'DISCOVER',
    },
    {
        number: '6062823434266992',
        brand : 'HIPERCARD',
    },
    {
        number: '6062 8234 3426 6992',
        brand : 'HIPERCARD',
    },
];

const invalid = [
    123,
    '123',
    'a',
    '1234567812345678',
    '',
    ' ',
    true,
    false,
    null,
    undefined,
];

describe('Identificator', function()
{
    cards.forEach(function(card)
    {
        it('Identify: ' + card.number, function(done)
        {
            assert.string(identificator.identify(card.number)).isEqualTo(card.brand);
            done();
        });
    });

    invalid.forEach(function(number)
    {
        it('Can`t identify: ' + number, function(done)
        {
            assert.string(identificator.identify(number)).isEqualTo('UNKNOW');
            done();
        });
    });
});
