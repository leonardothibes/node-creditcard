'use strict';

const identificator = require('../../lib/identificator'),
      decorator     = require('../../lib/decorator'),
      validator     = require('../../lib/validator'),
      generator     = require('../../lib/generator'),
      assert        = require('unit.js');

describe('Generator', function()
{
    it('VISA UnMasked', function(done)
    {
        const generated = generator.generate('visa', false, 3);

        generated.forEach(function(number)
        {
            assert.bool(validator.validate(number)).isTrue();
            assert.bool(decorator.isMasked(number)).isFalse();
            assert.string(identificator.identify(number)).isEqualTo('VISA');
        });

        done();
    });

    it('VISA Masked', function(done)
    {
        const generated = generator.generate('visa', true, 3);

        generated.forEach(function(number)
        {
            assert.bool(validator.validate(number)).isTrue();
            assert.bool(decorator.isMasked(number)).isTrue();
            assert.string(identificator.identify(number)).isEqualTo('VISA');
        });

        done();
    });
});
