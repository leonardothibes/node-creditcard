'use strict';

const identificator = require('./lib/identificator'),
      validator     = require('./lib/validator'),
      decorator     = require('./lib/decorator'),
      obfuscator    = require('./lib/obfuscator'),
      generator     = require('./lib/generator');

/**
 * Cartão de crédito.
 *
 * @see https://www.npmjs.com/package/node-creditcard
 */
module.exports = class
{
    /**
     * @param {Object} card
     * @param {String} card.number
     * @param {String} card.holder
     * @param {String} card.expiration
     * @param {String} card.cvv
     */
    constructor(card)
    {
        if (!card) {
            this.number     = '';
            this.holder     = '';
            this.expiration = '';
            this.cvv        = '';
            return;
        }

        this.number     = card.number     || '';
        this.holder     = card.holder     || '';
        this.expiration = card.expiration || '';
        this.cvv        = card.cvv        || '';
    }

    /**
     * Bandeira do cartão.
     *
     * @return {String}
     */
    get brand()
    {
        return this._brand;
    }

    /**
     * @param {String} number
     */
    set number(number)
    {
        this._brand         = identificator.identify(number);
        this._number        = decorator.unMask(number);
        this._numberIsValid = validator.validate(number);
    }

    /**
     * Número do cartão sem máscara.
     *
     * @return {String}
     */
    get number()
    {
        return this._number;
    }

    /**
     * Número do cartão com máscara.
     *
     * @return {String}
     */
    get maskedNumber()
    {
        return decorator.mask(this._number);
    }

    /**
     * @param {String} holder
     */
    set holder(holder)
    {
        holder              = String(holder);
        this._holder        = holder.toUpperCase().trim();
        this._holderIsValid = (holder.length > 0);
    }

    /**
     * Nome impresso no cartão.
     *
     * @return {String}
     */
    get holder()
    {
        return this._holder;
    }

    /**
     * @param {String} expiration
     */
    set expiration(expiration)
    {
        const validation = validator.expiration(expiration);

        this._expiration        = expiration;
        this._expirationIsValid = validation.validFormat;
        this._isExpired         = validation.isExpired;
    }

    /**
     * Data de validade do cartão.
     *
     * @return {String}
     */
    get expiration()
    {
        return this._expiration;
    }

    /**
     * @param {String} cvv
     */
    set cvv(cvv)
    {
        this._cvv        = cvv;
        this._cvvIsValid = validator.cvv(cvv);
    }

    /**
     * Código de segurança do cartão.
     *
     * @return {String}
     */
    get cvv()
    {
        return this._cvv;
    }

    /**
     * Consolidação de todas as validações.
     *
     * @return {Bool}
     */
    isValid()
    {
        return (
            this._brand             &&
            this._numberIsValid     &&
            this._holderIsValid     &&
            this._cvvIsValid        &&
            this._expirationIsValid &&
            !this._isExpired
        );
    }

    /**
     * Detalhamento de todas as validações.
     *
     * @return {Object}
     */
    validate()
    {
        return {
            brand          : this._brand,
            validCardNumber: this._numberIsValid,
            validHolder    : this._holderIsValid,
            validCvv       : this._cvvIsValid,
            validExpiration: this._expirationIsValid,
            isExpired      : this._isExpired,
        };
    }

    /**
     * Obtém todos os dados do cartão.
     *
     * @return {Object}
     */
    getData()
    {
        return {
            brand     : this.brand,
            number    : this.number,
            holder    : this.holder,
            expiration: this.expiration,
            cvv       : this.cvv,
        };
    }

    /**
     * Obtém todos os dados do cartão de forma segura para exibição na tela.
     *
     * @return {Object}
     */
    getSafeData()
    {
        if (!this.number) {
            return this.getData();
        }

        return {
            brand     : this.brand,
            number    : obfuscator.number(this.number),
            holder    : this.holder,
            expiration: this.expiration,
            cvv       : obfuscator.cvv(this.cvv),
        };
    }

    /**
     * Gera números de cartão de crédito válidos.
     *
     * @param {String} brand  Bandeira desejada.
     * @param {Bool}   masked Flag que indica se o número será gerado com máscara.
     * @param {Int}    count  Quantidade de números a serem gerados.
     *
     * @return {Array}
     */
    static generate(brand, masked, count)
    {
        return generator.generate(brand, masked, count);
    }
};
