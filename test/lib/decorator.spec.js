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
        // DINERS
        unmasked: '30225490720544',
        masked  : '3022 5490 7205 44',
    },
    {
        // ELO
        unmasked: '4514160058931695',
        masked  : '4514 1600 5893 1695',
    },
    {
        // AMEX
        unmasked: '340958930386006',
        masked  : '3409 589303 86006',
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
];
