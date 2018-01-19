"use strict" ;

import { floor } from 'core/maths/floor.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.maths.floor' , () =>
{
    it('floor(0)              ===  0'      , () => { assert.equal( floor(0) , 0 ); });
    it('floor(4.572525153,2)  ===  4.57'   , () => { assert.equal( floor(4.572525153,2)  , 4.57   ); });
    it('floor(4.572525153,4)  ===  4.5725' , () => { assert.equal( floor(4.572525153,4)  , 4.5725 ); });
    it('floor(4.572525153)    ===  0'      , () => { assert.equal( floor(4.572525153)    , 4      ); });
    it('floor(4.572525153,0)  ===  0'      , () => { assert.equal( floor(4.572525153,0)  , 4      ); });
    it('floor(4.572525153,-1) ===  0'      , () => { assert.equal( floor(4.572525153,-1) , 4      ); });
});
