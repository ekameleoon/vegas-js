"use strict" ;

import { distance } from '../../../core/colors/distance.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.colors.distance' , () =>
{
    it( 'distance( 0xFFFFFF , 0x000000 )' , () => { assert.equal( distance( 0xFFFFFF , 0x000000 ) , 195075 ); }) ;
    it( 'distance( 0xFFFFFF , 0xFFEEFF )' , () => { assert.equal( distance( 0xFFFFFF , 0xFFEEFF ) , 289    ); }) ;
    it( 'distance( 0xFF0000 , 0xFF0000 )' , () => { assert.equal( distance( 0xFF0000 , 0xFF0000 ) , 0      ); }) ;
    it( 'distance( 0xFFFFFF , 0xFFFFFF )' , () => { assert.equal( distance( 0xFFFFFF , 0xFFFFFF ) , 0      ); }) ;
});
