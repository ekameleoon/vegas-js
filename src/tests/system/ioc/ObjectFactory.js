"use strict" ;

import { ArrayMap } from './system/data/maps/ArrayMap.js' ;

import { ObjectConfig } from './system/ioc/ObjectConfig.js' ;
import { ObjectFactory } from './system/ioc/ObjectFactory.js' ;
import { ObjectDefinitionContainer } from './system/ioc/ObjectDefinitionContainer.js' ;

import { Civility , User , UserFactory } from '../../examples/User.js' ;

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

    // --------- strategies

    describe( '#config' , () =>
    {
        let factory = new ObjectFactory() ;
        factory.config.setConfigTarget
        ({
            user :
            {
                name : "ekameleon" ,
                city : "Marseille"
            },
            info :
            {
                civility : "MAN" ,
                test     : "test"
            }
        });

        factory.run
        ([
            {
                id   : "user"   ,
                type : User ,
                args : [ { config : 'user.name' } ] ,
                properties :
                [
                    { name : "city"  , config : "user.city" } ,
                    { name : "#init" , config : "info"      }
                ]
            }
        ]);

        let user = factory.getObject('user') ;

        it( 'user instanceOf User' , () => { assert.instanceOf( user , User ) });
        it( 'user.name === "ekameleon"' , () => { assert.equal( user.name , "ekameleon" ); });
        it( 'user.city === "Marseille"' , () => { assert.equal( user.city , "Marseille" ); });
        it( 'user.civility === "MAN"' , () => { assert.equal( user.civility , "MAN" ); });
    });

    // --------- strategies

    describe( '#strategies' , () =>
    {
        describe( '#factoryMethod' , () =>
        {
            let factory = new ObjectFactory() ;

            factory.run
            ([
                {
                    id   : "user_factory"     ,
                    type : UserFactory ,
                    args : [ { value : [ "lunas" , "pegas" ] } ]
                },
                {
                    id            : "user1"   ,
                    type          : User ,
                    factoryMethod :
                    {
                        factory : "user_factory" ,
                        name    : "build" ,
                        args    : [ { value : "vegas" } ]
                    }
                },
                {
                    id            : "user2"   ,
                    type          : User ,
                    factoryMethod :
                    {
                        factory : "user_factory" ,
                        name    : "build" ,
                        args    : [ { value : "pegas" } ]
                    }
                }
            ]);

            let user1 = factory.getObject("user1") ;
            let user2 = factory.getObject("user2") ;

            it('factory.getObject("user1")', () => { assert.isNotNull( user1 );});
            it('factory.getObject("user1") instanceof User', () => { assert.instanceOf( user1 , User ); });
            it('factory.getObject("user1").name === "vegas"', () => { assert.equal( user1.name , 'vegas' ); });

            it('factory.getObject("user2")', () => { assert.isNull( user2 );});
        });

        describe( '#factoryProperty' , () =>
        {
            let factory = new ObjectFactory() ;
            factory.run
            ([
                {
                    id   : "user" ,
                    type : User ,
                    args : [ { value : "JohnDoe" } ]
                },
                {
                    id              : "name"   ,
                    type            : String ,
                    factoryProperty : { factory : "user" , name : "name" }
                }
            ]);
            it( 'name === "JohnDoe"' , () =>
            {
                assert.equal( factory.getObject('name') , "JohnDoe" );
            });
        });

        describe( '#factoryReference' , () =>
        {
            let factory = new ObjectFactory() ;
            factory.run
            ([
                {
                    id   : "user" ,
                    type : User ,
                    args : [ { value : "ekameleon" } ] ,
                    properties :
                    [
                        { name : 'city' , value : 'Marseille' }
                    ]
                },
                {
                    id              : "john"   ,
                    type            : User ,
                    factoryReference : 'user' ,
                    properties       :
                    [
                        { name : "city"      , value : "Ventabren" } ,
                        { name : "name"      , value : "Doe"       } ,
                        { name : "firstname" , value : "John"      }
                    ]
                }
            ]);

            let user = factory.getObject('john') ;

            it( 'user instanceof User' , () => { assert.instanceOf( user , User ); });
            it( 'user.name === "Doe"' , () => { assert.equal( user.name , "Doe" ); });
            it( 'user.firstname === "John"' , () => { assert.equal( user.firstname , "John" ); });
            it( 'user.city === "Ventabren"' , () => { assert.equal( user.city , "Ventabren" ); });
        });

        describe( '#factoryValue' , () =>
        {
            let factory = new ObjectFactory() ;
            factory.run
            ([
                {
                    id           : "name" ,
                    type         : String ,
                    factoryValue : "ekameleon"
                },
                {
                    id           : "date" ,
                    type         : Date ,
                    factoryValue : new Date(1977,2,22)
                },
                {
                    id           : "user" ,
                    type         : User ,
                    properties   :
                    [
                        { name : "name"     , ref : "name" } ,
                        { name : "birthday" , ref : "date" }
                    ]
                }
            ]);

            let user = factory.getObject("user")  ;
            it('user.name === "ekameleon"', () => { assert.equal( user.name , "ekameleon" ); });
            it('user.birthday === new Date(1977,2,22)', () => { assert.equal( user.birthday.valueOf() , (new Date(1977,2,22)).valueOf() ); });
        });

        describe( '#staticFactoryMethod' , () =>
        {
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

        describe( '#staticFactoryProperty' , () =>
        {
            let factory = new ObjectFactory() ;
            factory.run
            ([
                {
                    id : "civility" ,
                    type : String ,
                    staticFactoryProperty :
                    {
                        type : Civility , name : "MAN"
                    }
                }
            ]);
            it('factory.getObject("civility") === "man"', () =>
            {
                assert.equal( factory.getObject("civility") , "man" );
            });
        });
    });
});
