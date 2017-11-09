'use strict';

const identificator = require('../../lib/identificator'),
      decorator     = require('../../lib/decorator'),
      validator     = require('../../lib/validator'),
      generator     = require('../../lib/generator'),
      assert        = require('unit.js');

const brands = [
    'visa',
    'master',
    'mastercard',
    'amex',
    'diners',
    'elo',
    'hipercard',
];

describe('Generator', function()
{
    it ('Invalid/Unsupported Brand', function(done)
    {
        const generated = generator.generate('UNSUPPORTED');
        assert.array(generated).hasLength(0);
        done();
    });

    brands.forEach(function(brand)
    {
        it(brand.toUpperCase() + ' UnMasked (default)', function(done)
        {
            const generated = generator.generate(brand, false);
            assert.array(generated).hasLength(1);

            generated.forEach(function(number)
            {
                assert.bool(validator.validate(number)).isTrue();
                assert.bool(decorator.isMasked(number)).isFalse();
                if (brand === 'master') {
                    assert.string(identificator.identify(number)).isEqualTo('MASTERCARD');
                } else {
                    assert.string(identificator.identify(number)).isEqualTo(brand.toUpperCase());
                }
            });

            done();
        });

        it(brand.toUpperCase() + ' Masked (default)', function(done)
        {
            const generated = generator.generate(brand, true);
            assert.array(generated).hasLength(1);

            generated.forEach(function(number)
            {
                assert.bool(validator.validate(number)).isTrue();
                assert.bool(decorator.isMasked(number)).isTrue();
                if (brand === 'master') {
                    assert.string(identificator.identify(number)).isEqualTo('MASTERCARD');
                } else {
                    assert.string(identificator.identify(number)).isEqualTo(brand.toUpperCase());
                }
            });

            done();
        });

        it(brand.toUpperCase() + ' UnMasked (3x)', function(done)
        {
            const generated = generator.generate(brand, false, 3);
            assert.array(generated).hasLength(3);

            generated.forEach(function(number)
            {
                assert.bool(validator.validate(number)).isTrue();
                assert.bool(decorator.isMasked(number)).isFalse();
                if (brand === 'master') {
                    assert.string(identificator.identify(number)).isEqualTo('MASTERCARD');
                } else {
                    assert.string(identificator.identify(number)).isEqualTo(brand.toUpperCase());
                }
            });

            done();
        });

        it(brand.toUpperCase() + ' Masked (3x)', function(done)
        {
            const generated = generator.generate(brand, true, 3);
            assert.array(generated).hasLength(3);

            generated.forEach(function(number)
            {
                assert.bool(validator.validate(number)).isTrue();
                assert.bool(decorator.isMasked(number)).isTrue();
                if (brand === 'master') {
                    assert.string(identificator.identify(number)).isEqualTo('MASTERCARD');
                } else {
                    assert.string(identificator.identify(number)).isEqualTo(brand.toUpperCase());
                }
            });

            done();
        });
    });
});
