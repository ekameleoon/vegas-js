"use strict" ;

import { ObjectStrategies } from './system/ioc/ObjectStrategies.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'system.ioc.ObjectStrategies' , () =>
{
    it('ObjectStrategies.FACTORY_METHOD === "factoryMethod"', () =>
    {
        assert.equal( ObjectStrategies.FACTORY_METHOD , 'factoryMethod' );
    });
    it('ObjectStrategies.FACTORY_PROPERTY === "factoryProperty"', () =>
    {
        assert.equal( ObjectStrategies.FACTORY_PROPERTY , 'factoryProperty' );
    });
    it('ObjectStrategies.FACTORY_REFERENCE === "factoryReference"', () =>
    {
        assert.equal( ObjectStrategies.FACTORY_REFERENCE , 'factoryReference' );
    });
    it('ObjectStrategies.FACTORY_VALUE === "factoryValue"', () =>
    {
        assert.equal( ObjectStrategies.FACTORY_VALUE , 'factoryValue' );
    });
    it('ObjectStrategies.STATIC_FACTORY_METHOD === "staticFactoryMethod"', () =>
    {
        assert.equal( ObjectStrategies.STATIC_FACTORY_METHOD , 'staticFactoryMethod' );
    });
    it('ObjectStrategies.STATIC_FACTORY_PROPERTY === "staticFactoryProperty"', () =>
    {
        assert.equal( ObjectStrategies.STATIC_FACTORY_PROPERTY , 'staticFactoryProperty' );
    });
}) ;
