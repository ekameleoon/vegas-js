"use strict" ;

import { isWhiteSpace } from '../../../src/core/chars/isWhiteSpace.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.chars.isWhiteSpace' , () =>
{
    it('isWhiteSpace(" ")  === true'  , () => { assert.isTrue( isWhiteSpace(" ") ); });
    it('isWhiteSpace("\\r") === true'  , () => { assert.isTrue( isWhiteSpace("\r") ); });

    it('isWhiteSpace("!") === false' , () => { assert.isFalse( isWhiteSpace("!") ); });
});
