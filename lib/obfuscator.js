'use strict';

const identificator = require('./identificator'),
      decorator     = require('./decorator');

/**
 * Verifica se o valor passado por parâmetro está ofuscado.
 *
 * @param {String} value
 *
 * @return {Bool}
 */
exports.isObfuscated = function(value)
{
    return RegExp(/\*.?/g).test(value);
};

/**
 * Ofusca o número do cartão.
 *
 * @param {String} number
 *
 * @return {String}
 */
exports.number = function(number)
{
    number      = decorator.unMask(number);
    const brand = identificator.identify(number);

    if (brand === 'VISA' && number.length === 13) {
        return obfuscateVisa13(number);
    } else if (brand === 'AMEX') {
        return obfuscateAmex(number);
     }else if (brand === 'DINERS') {
        return obfuscateDiners(number);
    }

    return number.substring(0, 4) +
           ' **** **** '          +
           number.substring(12, 16);
};

/**
 * @param {String} number
 *
 * @return {String}
 */
function obfuscateVisa13(number)
{
    return number.substring(0, 4)  +
           ' **** **** '           +
           number.substring(12, 13);
}

/**
 * @param {String} number
 *
 * @return {String}
 */
function obfuscateAmex(number)
{
    return number.substring(0, 4)  +
           ' ****** '              +
           number.substring(10, 15);
}

/**
 * @param {String} number
 *
 * @return {String}
 */
function obfuscateDiners(number)
{
    return number.substring(0, 4)  +
           ' ****** '              +
           number.substring(10, 14);
}

/**
 * Ofusca o CVV do cartão.
 *
 * @param {String} cvv
 *
 * @return {String}
 */
exports.cvv = function(cvv)
{
    return (String(cvv).length === 4) ? '****' : '***';
};
