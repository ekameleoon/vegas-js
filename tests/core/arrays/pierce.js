"use strict" ;

import { pierce } from '../../../src/core/arrays/pierce.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.arrays.pierce' , () =>
{
    var ar = [0,1,2,3,4,5] ;

    let result ;

    it('pierce([0,1,2,3,4,5],1) === 1', () =>
    {
        result = pierce(ar,1) ;
        assert.equal( result , 1 );
        assert.deepEqual( ar , [0,2,3,4,5] );
    });

    it('pierce([0,2,3,4,5],1) === 2', () =>
    {
        result = pierce(ar,1) ;
        assert.equal( result , 2 );
        assert.deepEqual( ar , [0,3,4,5] );
    });

    it('pierce([0,3,4,5],2,true) === [0,3,5]', () =>
    {
        result = pierce(ar,2,true) ; // use the flag parameter
        assert.deepEqual( result , [0,3,5] );
    });

});
