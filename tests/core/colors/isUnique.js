"use strict" ;

import { isUnique } from '../../../src/core/colors/isUnique.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.colors.isUnique' , () =>
{
    let colors = [ 0xFF0000 , 0x00FF00 , 0x0000FF , 0x000000 ] ;

    it( 'isUnique( 0xFFFFFF , colors ) === true' , () => { assert.isTrue( isUnique( 0xFFFFFF , colors ) ); }) ;
    it( 'isUnique( 0xEEFFFF , colors ) === true' , () => { assert.isTrue( isUnique( 0xEEFFFF , colors ) ); }) ;

    it( 'isUnique( 0xFF0000 , colors ) === false' , () => { assert.isFalse( isUnique( 0xFF0000 , colors ) ); }) ;
    it( 'isUnique( 0xFE0000 , colors ) === false' , () => { assert.isFalse( isUnique( 0xFE0000 , colors ) ); }) ;

    it( 'isUnique( 0x00FF00 , colors ) === false' , () => { assert.isFalse( isUnique( 0x00FF00 , colors ) ); }) ;
    it( 'isUnique( 0x0000FF , colors ) === false' , () => { assert.isFalse( isUnique( 0x0000FF , colors ) ); }) ;
    it( 'isUnique( 0x000000 , colors ) === false' , () => { assert.isFalse( isUnique( 0x000000 , colors ) ); }) ;
});
