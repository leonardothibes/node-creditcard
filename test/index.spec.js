'use strict';

const CreditCard    = require('../index'),
      identificator = require('../lib/identificator'),
      validator     = require('../lib/validator'),
      decorator     = require('../lib/decorator'),
      assert        = require('unit.js');

const validCards = [
    {
        brand       : 'VISA',
        rawNumber   : '4716579221521',
        maskedNumber: '4716 5792 2152 1',
        safeNumber  : '4716 **** **** 1',
        cvv         : '166',
        safeCvv     : '***',
        expiration  : '01/2050',
    },
    {
        brand       : 'VISA',
        rawNumber   : '4716058940605004',
        maskedNumber: '4716 0589 4060 5004',
        safeNumber  : '4716 **** **** 5004',
        cvv         : '517',
        safeCvv     : '***',
        expiration  : '01/2050',
    },
    {
        brand       : 'MASTERCARD',
        rawNumber   : '5194189706731425',
        maskedNumber: '5194 1897 0673 1425',
        safeNumber  : '5194 **** **** 1425',
        cvv         : '831',
        safeCvv     : '***',
        expiration  : '01/2050',
    },
    {
        brand       : 'DINERS',
        rawNumber   : '30036809953894',
        maskedNumber: '3003 680995 3894',
        safeNumber  : '3003 ****** 3894',
        cvv         : '536',
        safeCvv     : '***',
        expiration  : '01/2050',
    },
    {
        brand       : 'AMEX',
        rawNumber   : '376921693572268',
        maskedNumber: '3769 216935 72268',
        safeNumber  : '3769 ****** 72268',
        cvv         : '5710',
        safeCvv     : '****',
        expiration  : '01/2050',
    },
    {
        brand       : 'HIPERCARD',
        rawNumber   : '6062822846555505',
        maskedNumber: '6062 8228 4655 5505',
        safeNumber  : '6062 **** **** 5505',
        cvv         : '123',
        safeCvv     : '***',
        expiration  : '01/2050',
    },
    {
        brand       : 'ELO',
        rawNumber   : '4389350624996924',
        maskedNumber: '4389 3506 2499 6924',
        safeNumber  : '4389 **** **** 6924',
        cvv         : '203',
        safeCvv     : '***',
        expiration  : '01/2050',
    },
];

describe('Entry Point', function()
{
    validCards.forEach(function(data)
    {
        it('Valid ' + data.brand + ' => ' + data.maskedNumber, function(done)
        {
            const card = new CreditCard({
                holder    : ' fulano d tal    ',
                number    : data.maskedNumber,
                cvv       : data.cvv,
                expiration: data.expiration,
            });

            assert.string(card.brand).isEqualTo(data.brand);
            assert.string(card.number).isEqualTo(data.rawNumber);
            assert.string(card.maskedNumber).isEqualTo(data.maskedNumber);
            assert.string(card.holder).isEqualTo('FULANO D TAL');
            assert.string(card.cvv).isEqualTo(data.cvv);

            const validation = card.validate();

            assert.string(validation.brand).isEqualTo(data.brand);
            assert.bool(validation.validCardNumber).isTrue();
            assert.bool(validation.validHolder).isTrue();
            assert.bool(validation.validCvv).isTrue();
            assert.bool(validation.validExpiration).isTrue();
            assert.bool(validation.isExpired).isFalse();

            assert.bool(card.isValid()).isTrue();
            done();
        });

        it('GetData ' + data.brand + ' => ' + data.maskedNumber, function(done)
        {
            const card = new CreditCard({
                holder    : ' fulano d tal    ',
                number    : data.maskedNumber,
                cvv       : data.cvv,
                expiration: data.expiration,
            });

            assert.object(card.getData()).is({
                brand     : data.brand,
                number    : data.rawNumber,
                holder    : 'FULANO D TAL',
                expiration: data.expiration,
                cvv       : data.cvv,
            });

            done();
        });

        it('GetSafeData ' + data.brand + ' => ' + data.maskedNumber, function(done)
        {
            const card = new CreditCard({
                holder    : ' fulano d tal    ',
                number    : data.maskedNumber,
                cvv       : data.cvv,
                expiration: data.expiration,
            });

            assert.object(card.getSafeData()).is({
                brand     : data.brand,
                number    : data.safeNumber,
                holder    : 'FULANO D TAL',
                expiration: data.expiration,
                cvv       : data.safeCvv,
            });

            done();
        });

        it('Generating UnMasked: ' + data.brand, function(done)
        {
            const generated = CreditCard.generate(data.brand);
            assert.array(generated).hasLength(1);

            generated.forEach(function(number)
            {
                assert.bool(validator.validate(number)).isTrue();
                assert.bool(decorator.isMasked(number)).isFalse();
                assert.string(identificator.identify(number)).isEqualTo(data.brand.toUpperCase());
            });

            done();
        });

        it('Generating Masked: ' + data.brand, function(done)
        {
            const generated = CreditCard.generate(data.brand, true);
            assert.array(generated).hasLength(1);

            generated.forEach(function(number)
            {
                assert.bool(validator.validate(number)).isTrue();
                assert.bool(decorator.isMasked(number)).isTrue();
                assert.string(identificator.identify(number)).isEqualTo(data.brand.toUpperCase());
            });

            done();
        });
    });

    it('Initial Values 1', function(done)
    {
        const card = new CreditCard();

        assert.string(card.brand).isEqualTo('UNKNOW');
        assert.string(card.number).isEqualTo('');
        assert.string(card.holder).isEqualTo('');
        assert.string(card.expiration).isEqualTo('');
        assert.string(card.cvv).isEqualTo('');

        assert.object(card.getData()).is({
            brand     : 'UNKNOW',
            number    : '',
            holder    : '',
            expiration: '',
            cvv       : '',
        });

        const validation = card.validate();

        assert.string(validation.brand).isEqualTo('UNKNOW');
        assert.bool(validation.validCardNumber).isFalse();
        assert.bool(validation.validHolder).isFalse();
        assert.bool(validation.validCvv).isFalse();
        assert.bool(validation.validExpiration).isFalse();
        assert.bool(validation.isExpired).isTrue();

        assert.bool(card.isValid()).isFalse();
        done();
    });

    it('Initial Values 2', function(done)
    {
        const card = new CreditCard({});

        assert.string(card.brand).isEqualTo('UNKNOW');
        assert.string(card.number).isEqualTo('');
        assert.string(card.holder).isEqualTo('');
        assert.string(card.expiration).isEqualTo('');
        assert.string(card.cvv).isEqualTo('');

        assert.object(card.getData()).is({
            brand     : 'UNKNOW',
            number    : '',
            holder    : '',
            expiration: '',
            cvv       : '',
        });

        done();
    });

    it('Initial Values 3', function(done)
    {
        const card = new CreditCard({});

        assert.string(card.brand).isEqualTo('UNKNOW');
        assert.string(card.number).isEqualTo('');
        assert.string(card.holder).isEqualTo('');
        assert.string(card.expiration).isEqualTo('');
        assert.string(card.cvv).isEqualTo('');

        assert.object(card.getSafeData()).is({
            brand     : 'UNKNOW',
            number    : '',
            holder    : '',
            expiration: '',
            cvv       : '',
        });

        const validation = card.validate();

        assert.string(validation.brand).isEqualTo('UNKNOW');
        assert.bool(validation.validCardNumber).isFalse();
        assert.bool(validation.validHolder).isFalse();
        assert.bool(validation.validCvv).isFalse();
        assert.bool(validation.validExpiration).isFalse();
        assert.bool(validation.isExpired).isTrue();

        assert.bool(card.isValid()).isFalse();
        done();
    });

    it('Invalid Card Number', function(done)
    {
        const card  = new CreditCard({});
        card.number = 123;

        assert.object(card.getData()).is({
            brand     : 'UNKNOW',
            number    : '123',
            holder    : '',
            expiration: '',
            cvv       : '',
        });

        assert.bool(card.isValid()).isFalse();

        assert.object(card.validate()).is({
            brand          : 'UNKNOW',
            validCardNumber: false,
            validHolder    : false,
            validCvv       : false,
            validExpiration: false,
            isExpired      : true,
        });

        const validation = card.validate();

        assert.string(validation.brand).isEqualTo('UNKNOW');
        assert.bool(validation.validCardNumber).isFalse();
        assert.bool(validation.validHolder).isFalse();
        assert.bool(validation.validCvv).isFalse();
        assert.bool(validation.validExpiration).isFalse();
        assert.bool(validation.isExpired).isTrue();

        assert.bool(card.isValid()).isFalse();
        done();
    });
});
