"use strict" ;

import { whiteSpaces } from '../../../src/core/chars/whiteSpaces.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.chars.whiteSpaces' , () =>
{
    it('whiteSpaces is Array', () =>
    {
        assert.isArray( whiteSpaces );
    });

    it('whiteSpaces length 26', () =>
    {
        assert.lengthOf( whiteSpaces , 26 );
    });
});
