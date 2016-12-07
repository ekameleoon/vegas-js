"use strict" ;

import { getRed } from '../../../src/core/colors/getRed.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.colors.getRed' , () =>
{
    it( 'getRed(0x00FF0000) === 255' , () => { assert.equal( getRed(0x00FF0000) , 255 ) ; }) ;
    it( 'getRed(0xFF0000)   === 255' , () => { assert.equal( getRed(0xFF0000)   , 255 ) ; }) ;
    it( 'getRed(0x000000)   === 0'   , () => { assert.equal( getRed(0x000000)   , 0   ) ; }) ;
});
