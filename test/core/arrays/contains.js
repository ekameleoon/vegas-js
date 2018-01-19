"use strict" ;

import { contains } from 'core/arrays/contains.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.arrays.contains' , () =>
{
    it('contains([1,2,3],1) === true', () =>
    {
        assert.isTrue( contains( [1,2,3] ,1 ) );
    })

    it('contains([1,2,3],5) === false', () =>
    {
        assert.isFalse( contains( [1,2,3] , 5 ) );
    })

    it('contains(null,5) === false', () =>
    {
        assert.isFalse( contains( null , 5 ) );
    })

    it('contains("hello",5) === false', () =>
    {
        assert.isFalse( contains( "hello" , 5 ) );
    })
});
