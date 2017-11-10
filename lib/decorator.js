'use strict';

const identificator = require('./identificator');

/**
 * Identifica se um número de cartão de crédito está ou não com máscara.
 *
 * @param {String} number
 *
 * @return {Bool}
 */
exports.isMasked = function(number)
{
    var brand = identificator.identify(number);
    var regex = new RegExp(/^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/);

    if (brand === 'AMEX') {
        regex = new RegExp(/^[0-9]{4}\s[0-9]{6}\s[0-9]{5}$/);
    } else if (brand === 'DINERS') {
        regex = new RegExp(/^[0-9]{4}\s[0-9]{6}\s[0-9]{4}$/);
    } else if (brand === 'VISA' && number.length === 16) {
        regex = new RegExp(/^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{1}$/);
    }

    return regex.test(number);
};

/**
 * Aplica a máscara num número de cartão de crédito.
 *
 * @param {String} number
 *
 * @return {String}
 */
exports.mask = function(number)
{
    if (exports.isMasked(number)) {
        return number;
    }

    var brand = identificator.identify(number);
    number    = String(number);

    if (brand === 'VISA' && number.length === 13) {
        return maskVisa13(number);
    } else if (brand === 'AMEX') {
        return maskAmex(number);
    } else if (brand === 'DINERS') {
        return maskDiners(number);
    }

    return number.substring(0, 4)  + ' ' +
           number.substring(4, 8)  + ' ' +
           number.substring(8, 12) + ' ' +
           number.substring(12, 16);
};

/**
 * @param {String} number
 *
 * @return String
 */
function maskVisa13(number)
{
    return number.substring(0, 4)  + ' ' +
           number.substring(4, 8)  + ' ' +
           number.substring(8, 12) + ' ' +
           number.substring(12, 13);
}

/**
 * @param {String} number
 *
 * @return String
 */
function maskAmex(number)
{
    return number.substring(0, 4)  + ' ' +
           number.substring(4, 10) + ' ' +
           number.substring(10, 15);
}

/**
 * @param {String} number
 *
 * @return String
 */
function maskDiners(number)
{
    return number.substring(0, 4)  + ' ' +
           number.substring(4, 10) + ' ' +
           number.substring(10, 14);
}

/**
 * Remove a máscara de um número de cartão e crédito.
 *
 * @param {String} number
 *
 * @return {String}
 */
exports.unMask = function(number)
{
    return String(number).replace(/\s/g, '');
};
