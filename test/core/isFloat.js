"use strict" ;

import { isFloat } from 'core/isFloat.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.isFloat' , () =>
{
    it('isFloat(0) === false'      , () => { assert.isFalse( isFloat(0) ); });
    it('isFloat(0.5) === true'   , () => { assert.isTrue( isFloat(0.5) ); });
    it('isFloat(1) === false'      , () => { assert.isFalse( isFloat(1) ); });
    it('isFloat("foo") === false' , () => { assert.isFalse( isFloat("foo") ); });
    it('isFloat(NaN) === false'   , () => { assert.isFalse( isFloat(NaN) ); });
});
