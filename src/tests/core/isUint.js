"use strict" ;

import { isUint } from '../../core/isUint.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.isUint' , () =>
{
    it('isUint(0) === true'      , () => { assert.isTrue( isUint(0) ); });
    it('isUint(-1) === false'    , () => { assert.isFalse( isUint(-1) ); });
    it('isUint(0.5) === false'   , () => { assert.isFalse( isUint(0.5) ); });
    it('isUint(1) === true'      , () => { assert.isTrue( isUint(1) ); });
    it('isUint("foo") === false' , () => { assert.isFalse( isUint("foo") ); });
    it('isUint(NaN) === false'   , () => { assert.isFalse( isUint(NaN) ); });
});
