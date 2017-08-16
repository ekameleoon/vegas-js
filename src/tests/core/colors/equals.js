"use strict" ;

import { equals } from '../../../core/colors/equals.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.colors.equals' , () =>
{
    it( 'equals( 0xFFFFFF , 0x000000 ) === false' , () => { assert.isFalse( equals( 0xFFFFFF , 0x000000 ) ); }) ;
    it( 'equals( 0xFF0000 , 0xFF0000 ) === true'  , () => { assert.isTrue ( equals( 0xFF0000 , 0xFF0000 ) ); }) ;
    it( 'equals( 0xFFFFFF , 0xFFFFFF ) === true'  , () => { assert.isTrue ( equals( 0xFFFFFF , 0xFFFFFF ) ); }) ;
    it( 'equals( 0xFFFFFF , 0xFFEEFF ) === true'  , () => { assert.isTrue ( equals( 0xFFFFFF , 0xFFEEFF ) ); }) ;

    it( 'equals( 0xFFFFFF , 0xFFEEFF , 0 ) === false' , () => { assert.isFalse( equals( 0xFFFFFF , 0xFFEEFF , 0 ) ); }) ;
    it( 'equals( 0xFFFFFF , 0xFFEEFF , 1 ) === true'  , () => { assert.isTrue ( equals( 0xFFFFFF , 0xFFEEFF , 1 ) ); }) ;
});
