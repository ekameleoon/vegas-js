"use strict" ;

import { getBlue } from '../../../src/core/colors/getBlue.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.colors.getBlue' , () =>
{
    it( 'getBlue(0x0000FF) === 255' , () => { assert.equal( getBlue(0x0000FF) , 255 ) ; }) ;
    it( 'getBlue(0xFFFF00) === 0'   , () => { assert.equal( getBlue(0xFFFF00) , 0   ) ; }) ;
    it( 'getBlue(0x000000) === 0'   , () => { assert.equal( getBlue(0x000000) , 0   ) ; }) ;
});
