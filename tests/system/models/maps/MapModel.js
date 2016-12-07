'use strict' ;

import { ChangeModel } from '../../../../src/system/models/ChangeModel.js' ;
import { MapModel } from '../../../../src/system/models/maps/MapModel.js' ;
import { Signal }    from '../../../../src/system/signals/Signal.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'system.models.maps.MapModel' , () =>
{
    let mapModel = new MapModel() ;

    it('MapModel is a constructor function', () =>
    {
        assert.isFunction( MapModel );
    });

    it('new MapModel().constructor === MapModel', () =>
    {
        assert.equal( mapModel.constructor , MapModel );
    });

    it('new MapModel() instanceOf ChangeModel', () =>
    {
        assert.instanceOf( mapModel , ChangeModel );
    });

    it('new MapModel().added instanceOf Signal', () =>
    {
        assert.instanceOf( mapModel.added , Signal );
    });

    it('new MapModel().removed instanceOf Signal', () =>
    {
        assert.instanceOf( mapModel.removed , Signal );
    });

    it('new MapModel().updated instanceOf Signal', () =>
    {
        assert.instanceOf( mapModel.updated , Signal );
    });

    let obj1 = { id:1 , name:"test1" };
    let obj2 = { id:2 , name:"test2" };
    let obj3 = { id:3 , name:"test3" };
    let obj4 = { id:4 , name:"test4" };
    let obj5 = { id:5 , name:"test5" };
    let obj6 = { id:6 , name:"test6" };

    it('new MapModel().add() with null entries', () =>
    {
        mapModel.clear();
        assert.throws( function(){ mapModel.add() } , ReferenceError );
        assert.throws( function(){ mapModel.add( null ) } , ReferenceError );
        assert.throws( function(){ mapModel.add( undefined ) } , ReferenceError );
    });

    it('new MapModel().add()', () =>
    {
        mapModel.clear();
        mapModel.add( obj1 );
    });

    it('new MapModel().add() with no id', () =>
    {
        mapModel.clear();
        assert.throws( function(){ mapModel.add( { name:"test" } ) } , ReferenceError );
    });

    it('new MapModel().clear()', () =>
    {
        mapModel.clear();
        assert.equal( mapModel.length , 0 );
        assert.isNull( mapModel.current );
    });

    it('new MapModel().length', () =>
    {
        mapModel.clear();
        mapModel.add( obj1 );
        mapModel.add( obj2 );
        mapModel.add( obj3 );
        assert.equal( mapModel.length , 3 );
    });

    it('new MapModel().isEmpty()', () =>
    {
        mapModel.clear();
        assert.isTrue( mapModel.isEmpty() );
        mapModel.add( obj1 );
        mapModel.add( obj2 );
        mapModel.add( obj3 );
        assert.isFalse( mapModel.isEmpty() );
    });

    it('new MapModel().get()', () =>
    {
        mapModel.clear();
        mapModel.add( obj1 );
        mapModel.add( obj2 );
        mapModel.add( obj3 );
        mapModel.add( obj4 );
        mapModel.add( obj5 );
        mapModel.add( obj6 );
        assert.deepEqual( mapModel.get( 2 ) , obj2 );
    });

    it('new MapModel().getByProperty()', () =>
    {
        mapModel.clear();
        mapModel.add( obj1 );
        mapModel.add( obj2 );
        mapModel.add( obj3 );
        mapModel.add( obj4 );
        mapModel.add( obj5 );
        mapModel.add( obj6 );
        assert.deepEqual( mapModel.getByProperty( "name" , "test5" ) , obj5 );
    });

    it('new MapModel().getByProperty() with errors', () =>
    {
        mapModel.clear();
        mapModel.add( obj1 );
        mapModel.add( obj2 );
        mapModel.add( obj3 );
        mapModel.add( obj4 );
        mapModel.add( obj5 );
        mapModel.add( obj6 );
        assert.isNull( mapModel.getByProperty( null , "test5" ) );
        assert.isNull( mapModel.getByProperty( "" , "test5" ) );
        assert.isNull( mapModel.getByProperty( "test" , "test5" ) );
    });

    it('new MapModel().has()', () =>
    {
        mapModel.clear();
        mapModel.add( obj1 );
        mapModel.add( obj2 );
        mapModel.add( obj3 );
        mapModel.add( obj4 );
        mapModel.add( obj5 );
        assert.isTrue( mapModel.has( obj2 ) );
        assert.isFalse( mapModel.has( obj6 ) );
    });

    it('new MapModel().hasByProperty()', () =>
    {
        mapModel.clear();
        mapModel.add( obj1 );
        mapModel.add( obj2 );
        mapModel.add( obj3 );
        mapModel.add( obj4 );
        mapModel.add( obj5 );
        mapModel.add( obj6 );
        assert.isTrue( mapModel.hasByProperty( "name" , "test5" ) );
    });

    it('new MapModel().hasByProperty() with errors', () =>
    {
        mapModel.clear();
        mapModel.add( obj1 );
        mapModel.add( obj2 );
        mapModel.add( obj3 );
        mapModel.add( obj4 );
        mapModel.add( obj5 );
        mapModel.add( obj6 );
        assert.isFalse( mapModel.hasByProperty( null , "test5" ) );
        assert.isFalse( mapModel.hasByProperty( "" , "test5" ) );
        assert.isFalse( mapModel.hasByProperty( "test" , "test5" ) );
    });

    it('new MapModel().hasKey()', () =>
    {
        mapModel.clear();
        mapModel.add( obj1 );
        mapModel.add( obj2 );
        mapModel.add( obj3 );
        mapModel.add( obj4 );
        mapModel.add( obj5 );
        assert.isTrue( mapModel.hasKey( 2 ) );
        assert.isFalse( mapModel.hasKey( 6 ) );
    });

    it('new MapModel().remove() with null entries', () =>
    {
        mapModel.clear();
        assert.throws( function(){ mapModel.remove() } , ReferenceError );
        assert.throws( function(){ mapModel.remove( null ) } , ReferenceError );
        assert.throws( function(){ mapModel.remove( undefined ) } , ReferenceError );
    });

    it('new MapModel().remove()', () =>
    {
        mapModel.clear();
        mapModel.add( obj1 );
        mapModel.add( obj2 );
        mapModel.add( obj3 );
        mapModel.add( obj4 );
        mapModel.add( obj5 );
        mapModel.add( obj6 );

        mapModel.remove( obj2 );
        assert.isFalse( mapModel.has( obj2 ) );
        assert.throws( function(){ mapModel.remove( obj2 ) } , ReferenceError );
    });

    it('new MapModel().remove() with no id', () =>
    {
        mapModel.clear();
        mapModel.add( obj1 );
        mapModel.add( obj2 );
        mapModel.add( obj3 );
        mapModel.add( obj4 );
        mapModel.add( obj5 );
        mapModel.add( obj6 );

        assert.throws( function(){ mapModel.remove( { name:"testing" } ) } , ReferenceError );
    });

    it('new MapModel().update()', () =>
    {
        mapModel.clear();
        mapModel.add( obj1 );
        mapModel.add( obj2 );
        mapModel.add( obj3 );
        mapModel.add( obj4 );
        mapModel.add( obj5 );
        mapModel.add( obj6 );

        mapModel.update( { id:4 , name:"testing" } );
        assert.deepEqual( mapModel.get( 4 ) , { id:4 , name:"testing" } );
    });

    it('new MapModel().update() with errors', () =>
    {
        mapModel.clear();
        mapModel.add( obj1 );
        mapModel.add( obj2 );
        mapModel.add( obj3 );
        mapModel.add( obj4 );
        mapModel.add( obj5 );

        assert.throws( function(){ mapModel.update( { name:"testing" } ) } , ReferenceError );
        assert.throws( function(){ mapModel.update( obj6 ) } , ReferenceError );
    });
});
