"use strict" ;

import { aop } from '../../../src/core/functors/aop.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

var scope = { result : 0 } ;

var testBegin ,
    testEnd ,
    testScope ;

describe( 'core.functors.aop' , () =>
{
    var sum = function(x, y)
    {
        testScope = this === scope  ;
        console.log( testScope ) ;
        return x + y;
    }

    function begin()
    {
        testBegin = true ;
    }

    function end()
    {
        testEnd = true ;
    }

    describe( 'aop(sum, begin, end)(3, 5)' , () =>
    {
        it('aop(sum, begin, end)(3, 5) === 8', () =>
        {
            testBegin = testEnd = false ;
            testScope = null ;
            assert.equal( aop(sum, begin, end)(3, 5) , 8 ) ;
        });

        it('aop(sum, begin, end)(3, 5), begin() invoked', () =>
        {
            testBegin = testEnd = false ;
            testScope = null ;
            aop(sum, begin, end)(3, 5) ;
            assert.isTrue( testBegin) ;
        });

        it('aop(sum, begin, end)(3, 5), end() invoked', () =>
        {
            testBegin = testEnd = false ;
            testScope = null ;
            aop(sum, begin, end)(3, 5) ;
            assert.isTrue( testEnd ) ;
        });

        it('aop(sum, begin, end)(3, 5), default scope', () =>
        {
            testBegin = testEnd = false ;
            testScope = null ;
            aop(sum, begin, end)(3, 5) ;
            assert.isFalse( testScope ) ;
        });
    });

    describe( 'aop(sum, begin, end, scope)(3, 5, scope)' , () =>
    {
        it('aop(sum, begin, end, scope)(3, 5) === 8', () =>
        {
            testBegin = testEnd = false ;
            testScope = null ;
            assert.equal( aop(sum, begin, end, scope)(3, 5) , 8 ) ;
        });

        it('aop(sum, begin, end, scope)(3, 5), begin() invoked', () =>
        {
            testBegin = testEnd = false ;
            testScope = null ;
            aop(sum, begin, end, scope)(3, 5) ;
            assert.isTrue( testBegin ) ;
        });

        it('aop(sum, begin, end, scope)(3, 5), end() invoked', () =>
        {
            testBegin = testEnd = false ;
            testScope = null ;
            aop(sum, begin, end, scope)(3, 5) ;
            assert.isTrue( testEnd ) ;
        });

        it('aop(sum, begin, end, scope)(3, 5), scope is registered', () =>
        {
            testBegin = testEnd = false ;
            testScope = null ;
            aop(sum, begin, end, scope)(3, 5) ;
            assert.isTrue( testScope ) ;
        });
    });
});
