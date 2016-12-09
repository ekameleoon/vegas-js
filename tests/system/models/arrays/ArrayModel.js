'use strict' ;

import { ArrayModel }  from '../../../../src/system/models/arrays/ArrayModel.js' ;
import { ChangeModel } from '../../../../src/system/models/ChangeModel.js' ;
import { Signal }      from '../../../../src/system/signals/Signal.js' ;

import { isLockable }  from '../../../../src/system/process/Lockable.js' ;
import { MockSlot }    from '../../../mocks/MockSlot.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'system.models.arrays.ArrayModel' , () =>
{
    let model = new ArrayModel() ;
    let slot = new MockSlot();

    let obj = { id:1 , name:'test' };

    it('ArrayModel is a constructor function', () =>
    {
        assert.isFunction( ArrayModel );
    });

    it('new ArrayModel().constructor === ArrayModel', () =>
    {
        assert.equal( model.constructor , ArrayModel );
    });

    it('new ArrayModel() instanceOf ChangeModel', () =>
    {
        assert.instanceOf( model , ChangeModel );
    });

    it('new ArrayModel() isLockable', () =>
    {
        assert.isTrue( isLockable(model) );
    });

    it('new ArrayModel().isLocked() === false', () =>
    {
        model = new ArrayModel() ;
        assert.isFalse( model.isLocked() );
    });

    it('new ArrayModel().lock()', () =>
    {
        model = new ArrayModel();
        model.lock() ;
        assert.isTrue( model.isLocked() );
    });

    it('new ArrayModel().unlock()', () =>
    {
        model = new ArrayModel();
        model.lock() ;
        model.unlock() ;
        assert.isFalse( model.isLocked() );
    });

    it('new ArrayModel().added instanceOf Signal', () =>
    {
        assert.instanceOf( model.added , Signal );
    });

    it('new ArrayModel().added.connect()', () =>
    {
        slot = new MockSlot();
        assert.isTrue( model.added.connect( slot ) );
        assert.isTrue( model.added.hasReceiver( slot ) );
    });

    it('new ArrayModel().added.disconnect()', () =>
    {
        assert.isTrue( model.added.hasReceiver( slot ) );
        assert.isTrue( model.added.disconnect( slot ) );
        assert.isFalse( model.added.hasReceiver( slot ) );
    });

    it('new ArrayModel().notifyAdd()', () =>
    {
        slot = new MockSlot();
        model = new ArrayModel();
        model.added.connect( slot );
        assert.isFalse( slot.isReceived() );
        assert.isNull( slot.getValues() );
        model.notifyAdd( 1 , obj );
        assert.isTrue( slot.isReceived() );
        assert.equal( slot.getValues()[0] , 1 );
        assert.equal( slot.getValues()[1] , obj );
    });

    it('new ArrayModel().beforeChanged instanceOf Signal', () =>
    {
        assert.instanceOf( model.beforeChanged , Signal );
    });

    it('new ArrayModel().changed instanceOf Signal', () =>
    {
        assert.instanceOf( model.changed , Signal );
    });

    it('new ArrayModel().cleared instanceOf Signal', () =>
    {
        assert.instanceOf( model.cleared , Signal );
    });

    it('new ArrayModel().removed instanceOf Signal', () =>
    {
        assert.instanceOf( model.removed , Signal );
    });

    it('new ArrayModel().removed.connect()', () =>
    {
        slot = new MockSlot();
        assert.isTrue( model.removed.connect( slot ) );
        assert.isTrue( model.removed.hasReceiver( slot ) );
    });

    it('new ArrayModel().removed.disconnect()', () =>
    {
        assert.isTrue( model.removed.hasReceiver( slot ) );
        assert.isTrue( model.removed.disconnect( slot ) );
        assert.isFalse( model.removed.hasReceiver( slot ) );
    });

    it('new ArrayModel().notifyRemove()', () =>
    {
        slot = new MockSlot();
        model = new ArrayModel();
        model.removed.connect( slot );
        assert.isFalse( slot.isReceived() );
        assert.isNull( slot.getValues() );
        model.notifyRemove( obj );
        assert.isTrue( slot.isReceived() );
        assert.equal( slot.getValues()[0] , obj );
    });

    it('new ArrayModel().updated instanceOf Signal', () =>
    {
        assert.instanceOf( model.updated , Signal );
    });

    it('new ArrayModel().updated.connect()', () =>
    {
        slot = new MockSlot();
        assert.isTrue( model.updated.connect( slot ) );
        assert.isTrue( model.updated.hasReceiver( slot ) );
    });

    it('new ArrayModel().updated.disconnect()', () =>
    {
        assert.isTrue( model.updated.hasReceiver( slot ) );
        assert.isTrue( model.updated.disconnect( slot ) );
        assert.isFalse( model.updated.hasReceiver( slot ) );
    });

    it('new ArrayModel().notifyUpdate()', () =>
    {
        slot = new MockSlot();
        model = new ArrayModel();
        model.updated.connect( slot );
        assert.isFalse( slot.isReceived() );
        assert.isNull( slot.getValues() );
        model.notifyUpdate( obj );
        assert.isTrue( slot.isReceived() );
        assert.equal( slot.getValues()[0] , obj );
    });

    it('new ArrayModel().current = new Object()', () =>
    {
        model = new ArrayModel();
        model.current = obj;
        assert.deepEqual( model.current , obj );
    });

    it('new ArrayModel().clear()', () =>
    {
        model.clear();
        assert.equal( model.length , 0 );
        assert.isNull( model.current );
    });

    let obj1 = { id:1 };
    let obj2 = { id:2 };
    let obj3 = { id:3 };
    let obj4 = { id:4 };
    let obj5 = { id:5 };
    let obj6 = { id:6 };

    it('new ArrayModel().add() with null entries', () =>
    {
        model.clear();
        assert.throws( function(){ model.add() } , ReferenceError );
        assert.throws( function(){ model.add( null ) } , ReferenceError );
        assert.throws( function(){ model.add( undefined ) } , ReferenceError );
    });

    it('new ArrayModel().add()', () =>
    {
        model.clear();
        assert.ifError( model.add( obj1 ) );
        assert.equal( model.length , 1 );
    });

    it('new ArrayModel().toArray()', () =>
    {
        model.clear();
        model.add( obj1 );
        model.add( obj2 );
        model.add( obj3 );
        model.add( obj4 );
        model.add( obj5 );
        model.add( obj6 );
        assert.isArray( model.toArray() );
        assert.deepEqual( model.toArray() , [ obj1 , obj2 , obj3 , obj4 , obj5 , obj6 ] );
    });

    it('new ArrayModel().addAt() with null entries', () =>
    {
        model.clear();
        assert.throws( function(){ model.addAt( 0 ) } , ReferenceError );
        assert.throws( function(){ model.addAt( 0 , null ) } , ReferenceError );
        assert.throws( function(){ model.addAt( 0 , undefined ) } , ReferenceError );
    });

    it('new ArrayModel().addAt()', () =>
    {
        model.clear();
        model.addAt( 0 , obj1 ) ;
        model.addAt( 0 , obj2 ) ;
        assert.equal( model.length , 2 );
        assert.deepEqual( model.toArray() , [ obj2 , obj1 ] );
        model.addAt( 4 , obj3 ) ;
        assert.deepEqual( model.toArray() , [ obj2 , obj1 , obj3 ] );
    });

    it('new ArrayModel().length', () =>
    {
        model.clear();
        assert.isTrue( model.isEmpty() );
        model.add( obj1 );
        model.add( obj2 );
        model.add( obj3 );
        model.add( obj4 );
        model.add( obj5 );
        model.add( obj6 );
        assert.equal( model.length , 6 );
        assert.isFalse( model.isEmpty() );
    });

    it('new ArrayModel().get()', () =>
    {
        model.clear();
        model.add( obj1 );
        model.add( obj2 );
        model.add( obj3 );
        model.add( obj4 );
        model.add( obj5 );
        model.add( obj6 );
        assert.deepEqual( model.get( 1 ) , obj2 );
        assert.deepEqual( model.get( 5 ) , obj6 );
        assert.isUndefined( model.get( 8 ) );
    });

    it('new ArrayModel().has()', () =>
    {
        model.clear();
        model.add( obj1 );
        model.add( obj2 );
        model.add( obj3 );
        model.add( obj4 );
        model.add( obj5 );
        model.add( obj6 );
        assert.isTrue( model.has( obj2 ) );
        assert.isTrue( model.has( obj4 ) );
        assert.isFalse( model.has( { id:8 } ) );
    });

    it('new ArrayModel().remove() with null entries', () =>
    {
        model.clear();
        model.add( obj1 );
        model.add( obj2 );
        model.add( obj3 );
        model.add( obj4 );
        model.add( obj5 );
        model.add( obj6 );

        assert.throws( function(){ model.remove() } , ReferenceError );
        assert.throws( function(){ model.remove( null ) } , ReferenceError );
        assert.throws( function(){ model.remove( undefined ) } , ReferenceError );

    });

    it('new ArrayModel().remove()', () =>
    {
        model.clear();
        model.add( obj1 );
        model.add( obj2 );
        model.add( obj3 );
        model.add( obj4 );
        model.add( obj5 );
        model.add( obj6 );

        model.remove( obj4 );
        assert.deepEqual( model.toArray() , [ obj1 , obj2 , obj3 , obj5 , obj6 ] );
        model.remove( obj1 );
        assert.deepEqual( model.toArray() , [ obj2 , obj3 , obj5 , obj6 ] );
        assert.throws( function(){ model.remove( obj1 ) } , ReferenceError );
    });

    it('new ArrayModel().removeAt()', () =>
    {
        model.clear();
        model.add( obj1 );
        model.add( obj2 );
        model.add( obj3 );
        model.add( obj4 );
        model.add( obj5 );
        model.add( obj6 );

        model.removeAt( 3 );
        assert.deepEqual( model.toArray() , [ obj1 , obj2 , obj3 , obj5 , obj6 ] );
        model.removeAt( 0 );
        assert.deepEqual( model.toArray() , [ obj2 , obj3 , obj5 , obj6 ] );

        model.removeAt( -1 );
        assert.deepEqual( model.toArray() , [ obj2 , obj3 , obj5 ] );
        model.removeAt( 8 );
        assert.deepEqual( model.toArray() , [ obj2 , obj3 , obj5 ] );
        model.removeAt( 0 , 2 );
        assert.deepEqual( model.toArray() , [ obj5 ] );
    });

    it('new ArrayModel().removeRange()', () =>
    {
        model.clear();
        model.add( obj1 );
        model.add( obj2 );
        model.add( obj3 );
        model.add( obj4 );
        model.add( obj5 );
        model.add( obj6 );

        model.removeRange( 3 , 4 );
        assert.deepEqual( model.toArray() , [ obj1 , obj2 , obj3 , obj5 , obj6 ] );
        model.removeRange( 0 , 2 );
        assert.deepEqual( model.toArray() , [ obj3 , obj5 , obj6 ] );

        assert.isNull( model.removeRange( 1 , 1 ) );
    });

    it('new ArrayModel().setArray()', () =>
    {
        model.clear();
        let arr = [ obj1 , obj2 , obj3 , obj4 , obj5 , obj6 ];
        model.setArray( arr );
        assert.equal( model.length , 6 );
        assert.deepEqual( model.toArray() , arr );
    });

    it('new ArrayModel().updateAt()', () =>
    {
        model.clear();
        model.add( obj1 );
        model.add( obj2 );
        model.add( obj3 );
        model.add( obj4 );
        model.add( obj5 );
        model.add( obj6 );

        model.updateAt( 0 , obj6 );
        assert.deepEqual( model.toArray() , [ obj6 , obj2 , obj3 , obj4 , obj5 , obj6 ] );

        model.updateAt( 2 , obj1 );
        assert.deepEqual( model.toArray() , [ obj6 , obj2 , obj1 , obj4 , obj5 , obj6 ] );
    });

    it('new ArrayModel().toString() === "[ArrayModel]"', () =>
    {
        let model = new ArrayModel() ;
        assert.equal( model.toString() , "[ArrayModel]" );
    });
});
