"use strict" ;

import chai from 'chai' ;

import { contains } from '../../../src/core/arrays/contains.js' ;

var assert = chai.assert ;

describe( 'src/core/arrays/contains.js' , () =>
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
