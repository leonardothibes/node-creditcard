'use strict';

const generator = require('creditcard-generator'),
      decorator = require('./decorator');

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
    var numbers = generator.GenCC(sanitizeBrand(brand), count || 1);
    if (!masked) { return numbers; }

    for (var i in numbers) {
        numbers[i] = decorator.mask(numbers[i]);
    }

    return numbers;
};

/**
 * @param {String} brand
 *
 * @return {String}
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
        case 'discover':
            return 'Discover';
        case 'jcb':
            return 'JCB';
    }

    return brand;
}
