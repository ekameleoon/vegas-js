"use strict" ;

import { ArrayMap } from '../../../src/system/data/maps/ArrayMap.js' ;

import { ObjectConfig } from '../../../src/system/ioc/ObjectConfig.js' ;
import { ObjectFactory } from '../../../src/system/ioc/ObjectFactory.js' ;
import { ObjectDefinitionContainer } from '../../../src/system/ioc/ObjectDefinitionContainer.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'system.ioc.ObjectFactory' , () =>
{
    describe( '#constructor' , () =>
    {
        let factory = new ObjectFactory() ;

        it('factory extends ObjectDefinitionContainer', () =>
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

    describe( '#staticFactoryMethod' , () =>
    {
        var User = function( name )
        {
            this.name = name ;
        }

        User.prototype.toString = function()
        {
            return '[User ' + this.name + ']' ;
        }

        var UserFactory =
        {
            create : function( name )
            {
                return new User(name) ;
            }
        }

        let factory = new ObjectFactory() ;

        factory.run
        ([
            {
                id : "user" ,
                type : User ,
                staticFactoryMethod :
                {
                    type : UserFactory ,
                    name : "create"           ,
                    args : [ { value : "ekameleon" } ]
                }
            }
        ]);

        let user = factory.getObject("user") ;

        it('factory.getObject("user") is not null', () => { assert.isNotNull( user );});
        it('factory.getObject("user") instanceof User', () => { assert.instanceOf( user , User ); });
        it('factory.getObject("user").name === "ekameleon"', () => { assert.equal( user.name , 'ekameleon' ); });
    });
});
