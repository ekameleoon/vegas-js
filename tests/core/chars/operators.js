"use strict" ;

import { operators } from '../../../src/core/chars/operators.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.chars.operators' , () =>
{
    it('operators is Array', () =>
    {
        assert.isArray( operators );
    });
});
