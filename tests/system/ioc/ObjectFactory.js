"use strict" ;

import { ArrayMap } from '../../../src/system/data/maps/ArrayMap.js' ;

import { ObjectConfig } from '../../../src/system/ioc/ObjectConfig.js' ;
import { ObjectFactory } from '../../../src/system/ioc/ObjectFactory.js' ;
import { ObjectDefinitionContainer } from '../../../src/system/ioc/ObjectDefinitionContainer.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'system.ioc.ObjectFactory' , () =>
{
    describe( 'new ObjectFactory()' , () =>
    {
        let factory = new ObjectFactory() ;

        it('factory instanceof ObjectDefinitionContainer', () =>
        {
            assert.isTrue( factory instanceof ObjectDefinitionContainer );
        });

        it('factory.config instanceof ObjectConfig', () =>
        {
            assert.isNotNull( factory.config );
            assert.isTrue( factory.config instanceof ObjectConfig );
        });

        it('factory.singletons instanceof ArrayMap', () =>
        {
            assert.isNotNull( factory.singletons );
            assert.isTrue( factory.singletons instanceof ArrayMap );
        });

        it('factory.hasSingleton() === false', () =>
        {
            assert.isFalse( factory.hasSingleton() );
        });

        it('factory.isDirty() === false', () =>
        {
            assert.isFalse( factory.isDirty() );
        });

        it('factory.toString() === [ObjectFactory]', () =>
        {
            assert.equal( factory.toString() , "[ObjectFactory]" );
        });
    });
});
