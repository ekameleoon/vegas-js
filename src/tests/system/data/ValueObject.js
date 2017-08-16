"use strict" ;

import { ValueObject } from '../../../system/data/ValueObject.js' ;
import { Identifiable } from '../../../system/data/Identifiable.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'system.data.ValueObject' , () =>
{
    describe( 'new ValueObject()' , () =>
    {
        let object = new ValueObject() ;
        it('@implements Identifiable', () => { assert.instanceOf( object , Identifiable ); });
        it('#constructor === ValueObject', () => { assert.equal( object.constructor , ValueObject ); });
        it('#id === null', () => { assert.isNull( object.id ); });
    });

    describe( 'new ValueObject({id:1,name:"hello"})' , () =>
    {
        let object = new ValueObject({id:1,name:"hello"}) ;
        it('@implements Identifiable', () => { assert.instanceOf( object , Identifiable ); });
        it('#constructor === ValueObject', () => { assert.equal( object.constructor , ValueObject ); });
        it('#id === 1', () => { assert.equal( object.id , 1 ); });
        it('#name === undefined', () => { assert.isUndefined( object.name ); });
    });

    describe( 'new ValueObject().setTo({id:1,name:"hello"})' , () =>
    {
        let object = new ValueObject() ;
        object.setTo({id:1,name:"hello"}) ;
        it('#id === 1', () => { assert.equal( object.id , 1 ); });
        it('#name === undefined', () => { assert.isUndefined( object.name ); });
    });

    describe( 'new ValueObject().toString()' , () =>
    {
        let object = new ValueObject() ;
        it('#toString() === [ValueObject]', () => { assert.equal( object.toString() , "[ValueObject]" ); });
    });

    describe( 'new ValueObject().formatToString()' , () =>
    {
        let object1 = new ValueObject() ;
        let object2 = new ValueObject() ;

        object2.id   = "object" ;
        object2.name = "bar" ;

        it('object1.formatToString() === [ValueObject]', () => { assert.equal( object1.formatToString() , "[ValueObject]" ); });
        it('object1.formatToString("Foo") === [Foo]', () => { assert.equal( object1.formatToString("Foo") , "[Foo]" ); });
        it('object1.formatToString("Foo","name") === [Foo]', () => { assert.equal( object1.formatToString("Foo","name") , "[Foo]" ); });
        it('object2.formatToString("Foo","name") === [Foo name:bar]', () => { assert.equal( object2.formatToString("Foo","name") , "[Foo name:bar]" ); });
        it('object2.formatToString("Foo","name") === [Foo name:bar]', () => { assert.equal( object2.formatToString("Foo","name") , "[Foo name:bar]" ); });
        it('object2.formatToString("Foo","id","name") === [Foo name:bar]', () => { assert.equal( object2.formatToString("Foo","id","name") , "[Foo id:object name:bar]" ); });
    });
});
