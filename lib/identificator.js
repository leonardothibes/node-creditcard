'use strict';

const identifier = require('creditcard-identifier');

/**
 * Identifica a bandeira de um cartão de crédito através do seu número.
 *
 * @param {String} number
 *
 * @return {String}
 */
exports.identify = function(number)
{
    number = String(number).replace(/\s/g, '');

    if (!identifier.isSupported(number)) {
        return 'UNKNOW';
    }

    return String(identifier.findBrand(number)).toUpperCase();
};
