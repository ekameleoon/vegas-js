"use strict" ;

import { wrap } from '../../../src/core/maths/wrap.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.maths.wrap' , () =>
{
    it( 'wrap(0)   ===   0' , () => { assert.equal( wrap(0)   ,   0 ); });
    it( 'wrap(359) === 359' , () => { assert.equal( wrap(359) , 359 ); });
    it( 'wrap(360) ===   0' , () => { assert.equal( wrap(360) ,   0 ); });
    it( 'wrap(-1)  === 359' , () => { assert.equal( wrap(-1)  , 359 ); });

    it( 'wrap(0,0,Math.PI)         ===         0' , () => { assert.equal( wrap(0,0,Math.PI)         ,         0 ); });
    it( 'wrap(Math.PI-1,0,Math.PI) === Math.PI-1' , () => { assert.equal( wrap(Math.PI-1,0,Math.PI) , Math.PI-1 ); });
    it( 'wrap(Math.PI,0,Math.PI)   ===         0' , () => { assert.equal( wrap(Math.PI,0,Math.PI)   ,         0 ); });
    it( 'wrap(-1,0,Math.PI)        === Math.PI-1' , () => { assert.equal( wrap(-1,0,Math.PI)        , Math.PI-1 ); });
    it( 'wrap(Math.PI+1,0,Math.PI) === 1'         , () => { assert.equal( wrap(Math.PI+1,0,Math.PI) ,         1 ); });
});
