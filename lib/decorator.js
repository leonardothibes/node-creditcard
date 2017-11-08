'use strict';

const identificator = require('./identificator');

/**
 * Valida se um número de cartão de crédito está ou não com máscara.
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
        regex = new RegExp(/^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{2}$/);
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
    return number;
};

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
