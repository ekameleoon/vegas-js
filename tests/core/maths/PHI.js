"use strict" ;

import { PHI } from '../../../src/core/maths/PHI.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.maths.PHI' , () =>
{
    it('PHI === 1.61803398874989' , () =>
    {
        assert.equal( PHI , 1.61803398874989 );
    });
});
