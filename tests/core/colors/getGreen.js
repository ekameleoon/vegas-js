"use strict" ;

import { getGreen } from '../../../src/core/colors/getGreen.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.colors.getGreen' , () =>
{
    it( 'getGreen(0x0000FF00) === 255' , () => { assert.equal( getGreen(0x0000FF00) , 255 ) ; }) ;
    it( 'getGreen(0x00FF00)   === 255' , () => { assert.equal( getGreen(0x00FF00)   , 255 ) ; }) ;
    it( 'getGreen(0x000000)   === 0'   , () => { assert.equal( getGreen(0x000000)   , 0   ) ; }) ;
});
