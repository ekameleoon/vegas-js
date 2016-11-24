"use strict" ;

import { invoke } from '../../../src/core/reflect/invoke.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.reflect.invoke' , () =>
{
    it('invoke() === null', () =>
    {
        assert.isNull( invoke() ) ;
    });

    it('invoke(null) === null', () =>
    {
        assert.isNull( invoke(null) ) ;
    });

    it('invoke("foo") === null', () =>
    {
        assert.isNull( invoke("foo") ) ;
    });

    it('invoke(Array) === "[]"', () =>
    {
        let ar = invoke(Array) ;
        assert.instanceOf( ar , Array ) ;
        assert.lengthOf( ar , 0 ) ;
    });

    it('invoke(Array,null) === "[]"', () =>
    {
        let ar = invoke(Array,null) ;
        assert.instanceOf( ar , Array ) ;
        assert.lengthOf( ar , 0 ) ;
    });

    it('invoke(Array,"foo") === "[]"', () =>
    {
        let ar = invoke(Array,"foo") ;
        assert.instanceOf( ar , Array ) ;
        assert.lengthOf( ar , 0 ) ;
    });

    it('invoke(Array,[5]) === "[undefined,undefined,undefined,undefined,undefined]"', () =>
    {
        let ar = invoke(Array,[5]) ;
        assert.instanceOf( ar , Array ) ;
        assert.lengthOf( ar , 5 ) ;
    });

    it('invoke(Array,[1,2,3]) === "[1,2,3]"', () =>
    {
        let ar = invoke(Array,[1,2,3]) ;
        assert.instanceOf( ar , Array ) ;
        assert.lengthOf( ar , 3 ) ;
        assert.sameMembers( ar , [1,2,3] ) ;
    });
});
