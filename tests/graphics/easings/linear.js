"use strict" ;

import { linear } from '../../../src/graphics/easings/linear.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'src/graphics/easings/linear.js' , () =>
{
    var b = 0 ,
        c = 1 ,
        d = 1 ;

    it('linear(0,0,0,1) === 0', () =>
    {
        assert.equal( linear(0,b,c,d) , 0 );
    })

    it('linear(1,0,0,1) === 1', () =>
    {
        assert.equal( linear(1,b,c,d) , 1 );
    })
});