"use strict" ;

import { ObjectAttribute } from '../../../system/ioc/ObjectAttribute.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'system.ioc.ObjectAttribute' , () =>
{
    it('ObjectAttribute.ARGUMENTS === "args"', () =>
    {
        assert.equal( ObjectAttribute.ARGUMENTS , 'args' );
    });
    it('ObjectAttribute.CALLBACK === "callback"', () =>
    {
        assert.equal( ObjectAttribute.CALLBACK , 'callback' );
    });
    it('ObjectAttribute.CONFIG === "config"', () =>
    {
        assert.equal( ObjectAttribute.CONFIG , 'config' );
    });
    it('ObjectAttribute.DEPENDS_ON === "dependsOn"', () =>
    {
        assert.equal( ObjectAttribute.DEPENDS_ON , 'dependsOn' );
    });
    it('ObjectAttribute.DESTROY_METHOD_NAME === "destroy"', () =>
    {
        assert.equal( ObjectAttribute.DESTROY_METHOD_NAME , 'destroy' );
    });
    it('ObjectAttribute.EVALUATORS === "evaluators"', () =>
    {
        assert.equal( ObjectAttribute.EVALUATORS , 'evaluators' );
    });
    it('ObjectAttribute.FACTORY === "factory"', () =>
    {
        assert.equal( ObjectAttribute.FACTORY , 'factory' );
    });
    it('ObjectAttribute.GENERATES === "generates"', () =>
    {
        assert.equal( ObjectAttribute.GENERATES , 'generates' );
    });
    it('ObjectAttribute.ID === "id"', () =>
    {
        assert.equal( ObjectAttribute.ID , 'id' );
    });
    it('ObjectAttribute.IDENTIFY === "identify"', () =>
    {
        assert.equal( ObjectAttribute.IDENTIFY , 'identify' );
    });
    it('ObjectAttribute.INIT_METHOD_NAME === "init"', () =>
    {
        assert.equal( ObjectAttribute.INIT_METHOD_NAME , 'init' );
    });
    it('ObjectAttribute.LAZY_INIT === "lazyInit"', () =>
    {
        assert.equal( ObjectAttribute.LAZY_INIT , 'lazyInit' );
    });
    it('ObjectAttribute.LAZY_TYPE === "lazyType"', () =>
    {
        assert.equal( ObjectAttribute.LAZY_TYPE , 'lazyType' );
    });
    it('ObjectAttribute.LISTENERS === "listeners"', () =>
    {
        assert.equal( ObjectAttribute.LISTENERS , 'listeners' );
    });
    it('ObjectAttribute.LOCALE === "locale"', () =>
    {
        assert.equal( ObjectAttribute.LOCALE , 'locale' );
    });
    it('ObjectAttribute.LISTENERS === "listeners"', () =>
    {
        assert.equal( ObjectAttribute.LISTENERS , 'listeners' );
    });
    it('ObjectAttribute.LOCK === "lock"', () =>
    {
        assert.equal( ObjectAttribute.LOCK , 'lock' );
    });
    it('ObjectAttribute.NAME === "name"', () =>
    {
        assert.equal( ObjectAttribute.NAME , 'name' );
    });
    it('ObjectAttribute.PROPERTIES === "properties"', () =>
    {
        assert.equal( ObjectAttribute.PROPERTIES , 'properties' );
    });
    it('ObjectAttribute.RECEIVERS === "receivers"', () =>
    {
        assert.equal( ObjectAttribute.RECEIVERS , 'receivers' );
    });
    it('ObjectAttribute.REFERENCE === "ref"', () =>
    {
        assert.equal( ObjectAttribute.REFERENCE , 'ref' );
    });
    it('ObjectAttribute.SCOPE === "scope"', () =>
    {
        assert.equal( ObjectAttribute.SCOPE , 'scope' );
    });
    it('ObjectAttribute.SINGLETON === "singleton"', () =>
    {
        assert.equal( ObjectAttribute.SINGLETON , 'singleton' );
    });
    it('ObjectAttribute.TYPE === "type"', () =>
    {
        assert.equal( ObjectAttribute.TYPE , 'type' );
    });
    it('ObjectAttribute.VALUE === "value"', () =>
    {
        assert.equal( ObjectAttribute.VALUE , 'value' );
    });
}) ;
