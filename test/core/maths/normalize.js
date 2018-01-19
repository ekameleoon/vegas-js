"use strict" ;

import { normalize } from 'core/maths/normalize.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.maths.normalize' , () =>
{
    it('normalize(0,0,100) === 0' , () =>
    {
        assert.equal( normalize(0,0,100) , 0 );
    });
    it('normalize(10,0,100) === 0.1' , () =>
    {
        assert.equal( normalize(10,0,100) , 0.1 );
    });
    it('normalize(100,0,100) === 1' , () =>
    {
        assert.equal( normalize(100,0,100) , 1 );
    });
});
