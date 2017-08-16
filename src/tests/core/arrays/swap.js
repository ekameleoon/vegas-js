"use strict" ;

import { swap } from '../../../core/arrays/swap.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.arrays.swap' , () =>
{
    it('swap([1,2,3,4],1,3) == [1,4,3,2]', () =>
    {
        let ar1 = [1,2,3,4] ;
        swap( ar1 , 1 , 3 ) ;
        assert.equal( ar1.length , ([1,2,3,4]).length ) ;
        assert.sameMembers( ar1 , [1,2,3,4] ) ;
        assert.equal( ar1.toString() , '1,4,3,2' ) ;
    });

    it('swap([1,2,3,4],1,3,true) == [1,4,3,2]', () =>
    {
        let ar1 = [1,2,3,4] ;
        let ar2 = swap( ar1 , 1 , 3 , true ) ;
        assert.equal( ar1.length , ar2.length ) ;
        assert.sameMembers( ar1 , ar2 ) ;
        assert.equal( ar1.toString() , '1,2,3,4' ) ;
        assert.equal( ar2.toString() , '1,4,3,2' ) ;
    });
});
