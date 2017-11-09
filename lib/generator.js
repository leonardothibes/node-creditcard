'use strict';

const generator = require('creditcard-generator'),
      decorator = require('./decorator');

generator.Schemes.Diners = {
    prefixList: ['301', '305', '36', '38'],
    digitCount: 14,
};

generator.Schemes.Hipercard = {
    prefixList: ['60'],
    digitCount: 16,
};

generator.Schemes.ELO = {
    prefixList: ['504175', '504175', '636368'],
    digitCount: 16,
};

/**
 * Gera um número de cartão de crédito aleatório válido.
 *
 * @param {String} brand  Bandeira desejada.
 * @param {Bool}   masked Flag que indica se o número será gerado com máscara.
 * @param {Int}    count  Quantidade de números a serem gerados.
 *
 * @return {Array}
 */
exports.generate = function(brand, masked, count)
{
    const sanitized = sanitizeBrand(brand);
    if (!sanitized) { return []; }

    const numbers   = generator.GenCC(sanitized, count || 1);
    if (!masked) { return numbers; }

    for (var i in numbers) {
        numbers[i] = decorator.mask(numbers[i]);
    }

    return numbers;
};

/**
 * @param {String} brand
 *
 * @return {String|False}
 */
function sanitizeBrand(brand)
{
    switch(String(brand).toLowerCase())
    {
        case 'visa':
            return 'VISA';
        case 'master':
        case 'mastercard':
            return 'MasterCard';
        case 'amex':
            return 'Amex';
        case 'diners':
            return 'Diners';
        case 'hipercard':
            return 'Hipercard';
        case 'elo':
            return 'ELO';
    }

    return false;
}
