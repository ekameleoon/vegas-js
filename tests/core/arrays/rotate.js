"use strict" ;

import { rotate } from '../../../src/core/arrays/rotate.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.arrays.rotate' , () =>
{
    it('rotate("hello",1) === null', () =>
    {
        assert.isNull( rotate("hello",1) , 'The first argument must be an Array.');
    });

    let array = [] ;

    it('rotate([],1) === []', () =>
    {
        assert.deepEqual( rotate( array ,  1 ) , array );
    });

    array = ["l","o","v","e"] ;

    it('rotate(["l","o","v","e"],1) include "e","l","o","v"', () =>
    {
        rotate( array ,  1 ) ;
        assert.include( array , "e","l","o","v" );
    });

    it('rotate(["l","o","v","e"],-1) include "l","o","v","e"' , () =>
    {
        rotate( array ,  -1 )
        assert.include( array , "l","o","v","e" );
    });

    it('rotate(["l","o","v","e"],-1) include "o","v","e","l"' , () =>
    {
        rotate( array ,  -1 )
        assert.include( array , "o","v","e","l" );
    });

    it('rotate(["o","v","e","l"],3) include "v","e","l","o"' , () =>
    {
        rotate( array ,  3 )
        assert.include( array , "v","e","l","o" );
    });
});
