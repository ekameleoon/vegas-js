"use strict" ;

import { Attribute } from '../../../src/system/data/Attribute.js' ;
import { Property } from '../../../src/system/data/Property.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'system.data.Attribute' , () =>
{
    describe( '#constructor' , () =>
    {
        it('new Attribute() instanceof Property', () =>
        {
            let prop = new Attribute() ;
            assert.instanceOf( prop , Property );
        });
    });

    describe( '#name' , () =>
    {
        it('new Attribute().name === null', () =>
        {
            let prop = new Attribute() ;
            assert.isNull( prop.name );
        });

        it('new Attribute(1).name === null', () =>
        {
            let prop = new Attribute() ;
            assert.isNull( prop.name );
        });

        it('new Attribute("foo").name === foo', () =>
        {
            let prop = new Attribute("foo") ;
            assert.equal( prop.name , "foo" );
        });
    });

    describe( '#value' , () =>
    {
        it('new Attribute().value === undefined', () =>
        {
            let prop = new Attribute() ;
            assert.isUndefined( prop.value );
        });
        it('new Attribute("x",1)', () =>
        {
            let prop = new Attribute("x",1) ;
            assert.equal( prop.value , 1);
        });
    });
});
