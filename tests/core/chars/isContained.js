"use strict" ;

import { isContained } from '../../../src/core/chars/isContained.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.chars.isContained' , () =>
{
    it('isContained("a","bubble") === false', () => { assert.isFalse( isContained("a","bubble") ); });
    it('isContained("u","bubble") === true' , () => {  assert.isTrue( isContained("u","bubble") ); });
});
