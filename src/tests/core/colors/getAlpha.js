"use strict" ;

import { getAlpha } from '../../../core/colors/getAlpha.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.colors.getAlpha' , () =>
{
    it( 'getAlpha(0xFFFFFFFF) === 255' , () => { assert.equal( getAlpha(0xFFFFFFFF) , 255 ) ; }) ;
    it( 'getAlpha(0xFF000000) === 255' , () => { assert.equal( getAlpha(0xFF000000) , 255 ) ; }) ;
    it( 'getAlpha(0x00FFFFFF) === 0'   , () => { assert.equal( getAlpha(0x00FFFFFF) , 0   ) ; }) ;
    it( 'getAlpha(0x00000000) === 0'   , () => { assert.equal( getAlpha(0x00000000) , 0   ) ; }) ;
});
