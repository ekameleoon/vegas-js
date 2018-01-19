"use strict" ;

import { modulo } from 'core/maths/modulo.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.maths.modulo' , () =>
{
    it('modulo(-1,8) === 7' , () =>
    {
        assert.equal( modulo(-1,8) , 7 ) ;
    });
});
