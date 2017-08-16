"use strict" ;

import { ObjectScope } from './system/ioc/ObjectScope.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'system.ioc.ObjectScope' , () =>
{
    describe( '#enum' , () =>
    {
        it('ObjectScope.PROTOTYPE === "prototype"', () =>
        {
            assert.equal( ObjectScope.PROTOTYPE , 'prototype' );
        });
        it('ObjectScope.SINGLETON === "singleton"', () =>
        {
            assert.equal( ObjectScope.SINGLETON , 'singleton' );
        });
        it('ObjectScope.SCOPES === ["prototype","singleton"]', () =>
        {
            assert.instanceOf( ObjectScope.SCOPES , Array );
            assert.equal( ObjectScope.SCOPES.length , 2 );
            assert.equal( ObjectScope.SCOPES[0] , 'prototype' );
            assert.equal( ObjectScope.SCOPES[1] , 'singleton' );
        });
    });
    describe( '#validate' , () =>
    {
        it('#validate(ObjectScope.PROTOTYPE) === true', () =>
        {
            assert.isTrue( ObjectScope.validate(ObjectScope.PROTOTYPE) );
        });
        it('#validate(ObjectScope.SINGLETON) === true', () =>
        {
            assert.isTrue( ObjectScope.validate(ObjectScope.SINGLETON) );
        });
        it('#validate("foo") === false', () =>
        {
            assert.isFalse( ObjectScope.validate("foo") );
        });
    });
}) ;
