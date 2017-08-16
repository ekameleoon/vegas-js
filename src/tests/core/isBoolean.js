"use strict" ;

import { isBoolean } from '../../core/isBoolean.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.isBoolean' , () =>
{
    it('isBoolean(0) === false'     , () => { assert.isFalse( isBoolean(0) ); });
    it('isBoolean(true) === true'   , () => { assert.isTrue( isBoolean(true) ); });
    it('isBoolean(false) === true'  , () => { assert.isTrue( isBoolean(false) ); });
    it('isBoolean(3>2) === true'    , () => { assert.isTrue( isBoolean(3>2) ); });
    it('isBoolean("true") === false' , () => { assert.isFalse( isBoolean("true") ); });
    it('isBoolean(NaN) === false'   , () => { assert.isFalse( isBoolean(NaN) ); });
    it('isBoolean(null) === false'  , () => { assert.isFalse( isBoolean(null) ); });
});
