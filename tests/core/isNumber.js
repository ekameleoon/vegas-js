/*jshint -W053 */

"use strict" ;

import { isNumber } from '../../src/core/isNumber.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.isNumber' , () =>
{
    it('isNumber(0) === true'      , () => { assert.isTrue( isNumber(0) ); });
    it('isNumber(0.5) === true'    , () => { assert.isTrue( isNumber(0.5) ); });
    it('isNumber(new Number(2)) === true' , () => { assert.isTrue( isNumber(new Number(2)) ); });
    it('isNumber(true) === false'  , () => { assert.isFalse( isNumber(true) ); });
    it('isNumber("foo") === false' , () => { assert.isFalse( isNumber("foo") ); });
    it('isNumber(null) === false'  , () => { assert.isFalse( isNumber(null) ); });
    it('isNumber(NaN) === true'    , () => { assert.isTrue( isNumber(NaN) ); });
});
