'use strict';

/**
 * Validação de número de cartão de crédito através de algoritmo de Luhn.
 *
 * @see https://en.wikipedia.org/wiki/Luhn_algorithm
 *
 * @param {String} number
 *
 * @return {Bool}
 */
exports.validate = function(number)
{
    var trimmed = String(number).replace(/[\s]/g, ''),
        length  = trimmed.length,
        odd     = false,
        total   = 0,
        calc,
        calc2;

    if (length === 0) {
        return false;
    }

    if (!/^[0-9]+$/.test(trimmed)) {
        return false;
    }

    for (var i = length; i > 0; i--) {

        calc = parseInt(trimmed.charAt(i - 1));

        if (!odd) {
            total += calc;
        } else {
            calc2 = calc * 2;

            switch (calc2) {
                case 10: calc2 = 1; break;
                case 12: calc2 = 3; break;
                case 14: calc2 = 5; break;
                case 16: calc2 = 7; break;
                case 18: calc2 = 9; break;
                default: calc2 = calc2;
            }
            total += calc2;
        }

        odd = !odd;
    }

    return ((total % 10) === 0);
};

/**
 * Valida o CVV de um cartão.
 *
 * @param {String} cvv
 *
 * @return {Bool}
 */
exports.cvv = function(cvv)
{
    return RegExp(/^[0-9]{3,4}$/).test(cvv);
};

/**
 * Valida a expiração de um cartão de crédito.
 *
 * É levada em consideração para a validação o
 * formato e se está expirado.
 *
 * @param {String} expiration Expiração nos formatos MM/YY ou MM/YYYY.
 *
 * @return {Object}
 */
exports.expiration = function(expiration)
{
    const validation       = {};
    validation.validFormat = RegExp(/^[0-9]{2}\/([0-9]{4}|[0-9]{2})$/).test(expiration);
    validation.isExpired   = (!validation.validFormat || isExpired(expiration));

    return validation;
};

/**
 * Valida se uma validade está expirada.
 *
 * @param {String} expiration
 *
 * @return {Bool}
 */
function isExpired(expiration)
{
    let date  = String(expiration).split('/'),
        month = String(date[0]),
        year  = String(date[1]);

    if (year.length === 2) {
        year = 20 + year;
    }

    let today   = new Date(),
        expires = new Date(year, month, 1);

    return (today > expires);
}
