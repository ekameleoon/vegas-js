/*jshint -W053 */
"use strict" ;

import { isString } from '../../core/isString.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.isString' , () =>
{
    it('isString(0) === false'    , () => { assert.isFalse( isString(0) ); });
    it('isString(true) === false' , () => { assert.isFalse( isString(true) ); });
    it('isString("foo") === true' , () => { assert.isTrue( isString("foo") ); });
    it('isString(new String("foo")) === true' , () => { assert.isTrue( isString(new String("foo")) ); });
    it('isString(null) === false' , () => { assert.isFalse( isString(null) ); });
    it('isString(NaN) === false'  , () => { assert.isFalse( isString(NaN) ); });
});
