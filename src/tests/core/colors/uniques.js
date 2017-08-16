"use strict" ;

import { uniques } from '../../../core/colors/uniques.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.colors.uniques' , () =>
{
    let colors = [0xFFFFFF,0xFFFFFE,0xFF0000,0xFFFFFF,0x000000,0xFF0000,0xFFFFFD] ;
    let result = uniques(colors) ;

    it( 'uniques(colors) === [16777215,16711680,0]' , () =>
    {
        assert.instanceOf( result , Array );
        assert.lengthOf( result , 3 ) ;
        assert.sameMembers( result , [16777215,16711680,0] ) ;
    }) ;
});
