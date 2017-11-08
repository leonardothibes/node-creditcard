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
    return (number);
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
