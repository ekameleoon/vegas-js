'use strict' ;

import { ChangeModel } from '../../../../system/models/ChangeModel.js' ;
import { MapModel }    from '../../../../system/models/maps/MapModel.js' ;
import { Signal }      from '../../../../system/signals/Signal.js' ;

import { MockSlot }    from '../../../mocks/MockSlot.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'system.models.maps.MapModel' , () =>
{
    let model = new MapModel() ;
    let slot = new MockSlot();

    let obj1 = { id:1 , name:"test1" };
    let obj2 = { id:2 , name:"test2" };
    let obj3 = { id:3 , name:"test3" };
    let obj4 = { id:4 , name:"test4" };
    let obj5 = { id:5 , name:"test5" };
    let obj6 = { id:6 , name:"test6" };

    it('MapModel is a constructor function', () =>
    {
        assert.isFunction( MapModel );
    });

    it('new MapModel().constructor === MapModel', () =>
    {
        assert.equal( model.constructor , MapModel );
    });

    it('new MapModel() instanceOf ChangeModel', () =>
    {
        assert.instanceOf( model , ChangeModel );
    });

    it('new MapModel().added instanceOf Signal', () =>
    {
        assert.instanceOf( model.added , Signal );
    });

    it('new MapModel().added.connect()', () =>
    {
        slot = new MockSlot();
        assert.isTrue( model.added.connect( slot ) );
        assert.isTrue( model.added.hasReceiver( slot ) );
    });

    it('new MapModel().added.disconnect()', () =>
    {
        assert.isTrue( model.added.hasReceiver( slot ) );
        assert.isTrue( model.added.disconnect( slot ) );
        assert.isFalse( model.added.hasReceiver( slot ) );
    });

    it('new MapModel().notifyAdd()', () =>
    {
        slot = new MockSlot();
        model = new MapModel();
        model.added.connect( slot );
        assert.isFalse( slot.isReceived() );
        assert.isNull( slot.getValues() );
        model.notifyAdd( obj1 );
        assert.isTrue( slot.isReceived() );
        assert.equal( slot.getValues()[0] , obj1 );
    });

    it('new MapModel().removed instanceOf Signal', () =>
    {
        assert.instanceOf( model.removed , Signal );
    });

    it('new MapModel().removed.connect()', () =>
    {
        slot = new MockSlot();
        assert.isTrue( model.removed.connect( slot ) );
        assert.isTrue( model.removed.hasReceiver( slot ) );
    });

    it('new MapModel().removed.disconnect()', () =>
    {
        assert.isTrue( model.removed.hasReceiver( slot ) );
        assert.isTrue( model.removed.disconnect( slot ) );
        assert.isFalse( model.removed.hasReceiver( slot ) );
    });

    it('new MapModel().notifyRemove()', () =>
    {
        slot = new MockSlot();
        model = new MapModel();
        model.removed.connect( slot );
        assert.isFalse( slot.isReceived() );
        assert.isNull( slot.getValues() );
        model.notifyRemove( obj1 );
        assert.isTrue( slot.isReceived() );
        assert.equal( slot.getValues()[0] , obj1 );
    });

    it('new MapModel().updated instanceOf Signal', () =>
    {
        assert.instanceOf( model.updated , Signal );
    });

    it('new MapModel().updated.connect()', () =>
    {
        slot = new MockSlot();
        assert.isTrue( model.updated.connect( slot ) );
        assert.isTrue( model.updated.hasReceiver( slot ) );
    });

    it('new MapModel().updated.disconnect()', () =>
    {
        assert.isTrue( model.updated.hasReceiver( slot ) );
        assert.isTrue( model.updated.disconnect( slot ) );
        assert.isFalse( model.updated.hasReceiver( slot ) );
    });

    it('new MapModel().notifyUpdate()', () =>
    {
        slot = new MockSlot();
        model = new MapModel();
        model.updated.connect( slot );
        assert.isFalse( slot.isReceived() );
        assert.isNull( slot.getValues() );
        model.notifyUpdate( obj1 );
        assert.isTrue( slot.isReceived() );
        assert.equal( slot.getValues()[0] , obj1 );
    });

    it('new MapModel().add() with null entries', () =>
    {
        model = new MapModel();
        assert.throws( function(){ model.add() } , ReferenceError );
        assert.throws( function(){ model.add( null ) } , ReferenceError );
        assert.throws( function(){ model.add( undefined ) } , ReferenceError );
    });

    it('new MapModel().add()', () =>
    {
        model.clear();
        model.add( obj1 );
    });

    it('new MapModel().add() with no id', () =>
    {
        model.clear();
        assert.throws( function(){ model.add( { name:"test" } ) } , ReferenceError );
    });

    it('new MapModel().clear()', () =>
    {
        model.clear();
        assert.equal( model.length , 0 );
        assert.isNull( model.current );
    });

    it('new MapModel().length', () =>
    {
        model.clear();
        model.add( obj1 );
        model.add( obj2 );
        model.add( obj3 );
        assert.equal( model.length , 3 );
    });

    it('new MapModel().isEmpty()', () =>
    {
        model.clear();
        assert.isTrue( model.isEmpty() );
        model.add( obj1 );
        model.add( obj2 );
        model.add( obj3 );
        assert.isFalse( model.isEmpty() );
    });

    it('new MapModel().get()', () =>
    {
        model.clear();
        model.add( obj1 );
        model.add( obj2 );
        model.add( obj3 );
        model.add( obj4 );
        model.add( obj5 );
        model.add( obj6 );
        assert.deepEqual( model.get( 2 ) , obj2 );
    });

    it('new MapModel().getByProperty()', () =>
    {
        model.clear();
        model.add( obj1 );
        model.add( obj2 );
        model.add( obj3 );
        model.add( obj4 );
        model.add( obj5 );
        model.add( obj6 );
        assert.deepEqual( model.getByProperty( "name" , "test5" ) , obj5 );
    });

    it('new MapModel().getByProperty() with errors', () =>
    {
        model.clear();
        model.add( obj1 );
        model.add( obj2 );
        model.add( obj3 );
        model.add( obj4 );
        model.add( obj5 );
        model.add( obj6 );
        assert.isNull( model.getByProperty( null , "test5" ) );
        assert.isNull( model.getByProperty( "" , "test5" ) );
        assert.isNull( model.getByProperty( "test" , "test5" ) );
    });

    it('new MapModel().has()', () =>
    {
        model.clear();
        model.add( obj1 );
        model.add( obj2 );
        model.add( obj3 );
        model.add( obj4 );
        model.add( obj5 );
        assert.isTrue( model.has( obj2 ) );
        assert.isFalse( model.has( obj6 ) );
    });

    it('new MapModel().hasByProperty()', () =>
    {
        model.clear();
        model.add( obj1 );
        model.add( obj2 );
        model.add( obj3 );
        model.add( obj4 );
        model.add( obj5 );
        model.add( obj6 );
        assert.isTrue( model.hasByProperty( "name" , "test5" ) );
    });

    it('new MapModel().hasByProperty() with errors', () =>
    {
        model.clear();
        model.add( obj1 );
        model.add( obj2 );
        model.add( obj3 );
        model.add( obj4 );
        model.add( obj5 );
        model.add( obj6 );
        assert.isFalse( model.hasByProperty( null , "test5" ) );
        assert.isFalse( model.hasByProperty( "" , "test5" ) );
        assert.isFalse( model.hasByProperty( "test" , "test5" ) );
    });

    it('new MapModel().hasKey()', () =>
    {
        model.clear();
        model.add( obj1 );
        model.add( obj2 );
        model.add( obj3 );
        model.add( obj4 );
        model.add( obj5 );
        assert.isTrue( model.hasKey( 2 ) );
        assert.isFalse( model.hasKey( 6 ) );
    });

    it('new MapModel().remove() with null entries', () =>
    {
        model.clear();
        assert.throws( function(){ model.remove() } , ReferenceError );
        assert.throws( function(){ model.remove( null ) } , ReferenceError );
        assert.throws( function(){ model.remove( undefined ) } , ReferenceError );
    });

    it('new MapModel().remove()', () =>
    {
        model.clear();
        model.add( obj1 );
        model.add( obj2 );
        model.add( obj3 );
        model.add( obj4 );
        model.add( obj5 );
        model.add( obj6 );

        model.remove( obj2 );
        assert.isFalse( model.has( obj2 ) );
        assert.throws( function(){ model.remove( obj2 ) } , ReferenceError );
    });

    it('new MapModel().remove() with no id', () =>
    {
        model.clear();
        model.add( obj1 );
        model.add( obj2 );
        model.add( obj3 );
        model.add( obj4 );
        model.add( obj5 );
        model.add( obj6 );

        assert.throws( function(){ model.remove( { name:"testing" } ) } , ReferenceError );
    });

    it('new MapModel().update()', () =>
    {
        model.clear();
        model.add( obj1 );
        model.add( obj2 );
        model.add( obj3 );
        model.add( obj4 );
        model.add( obj5 );
        model.add( obj6 );

        model.update( { id:4 , name:"testing" } );
        assert.deepEqual( model.get( 4 ) , { id:4 , name:"testing" } );
    });

    it('new MapModel().update() with errors', () =>
    {
        model.clear();
        model.add( obj1 );
        model.add( obj2 );
        model.add( obj3 );
        model.add( obj4 );
        model.add( obj5 );

        assert.throws( function(){ model.update( { name:"testing" } ) } , ReferenceError );
        assert.throws( function(){ model.update( obj6 ) } , ReferenceError );
    });
});
