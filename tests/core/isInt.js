"use strict" ;

import { isInt } from '../../src/core/isInt.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.isInt' , () =>
{
    it('isInt(0) === true'      , () => { assert.isTrue( isInt(0) ); });
    it('isInt(0.5) === false'   , () => { assert.isFalse( isInt(0.5) ); });
    it('isInt(1) === true'      , () => { assert.isTrue( isInt(1) ); });
    it('isInt("foo") === false' , () => { assert.isFalse( isInt("foo") ); });
    it('isInt(NaN) === false'   , () => { assert.isFalse( isInt(NaN) ); });
});
