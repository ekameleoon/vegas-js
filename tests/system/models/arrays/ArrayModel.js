'use strict' ;

import { ArrayModel } from '../../../../src/system/models/arrays/ArrayModel.js' ;
import { ChangeModel } from '../../../../src/system/models/ChangeModel.js' ;
import { Signal }    from '../../../../src/system/signals/Signal.js' ;

import { isLockable }  from '../../../../src/system/process/Lockable.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'system.models.arrays.ArrayModel' , () =>
{
    let arrayModel = new ArrayModel() ;

    it('ArrayModel is a constructor function', () =>
    {
        assert.isFunction( ArrayModel );
    });

    it('new ArrayModel().constructor === ArrayModel', () =>
    {
        assert.equal( arrayModel.constructor , ArrayModel );
    });

    it('new ArrayModel() instanceOf ChangeModel', () =>
    {
        assert.instanceOf( arrayModel , ChangeModel );
    });

    it('new ArrayModel() isLockable', () =>
    {
        assert.isTrue( isLockable(arrayModel) );
    });

    it('new ArrayModel().isLocked() === false', () =>
    {
        arrayModel = new ArrayModel() ;
        assert.isFalse( arrayModel.isLocked() );
    });

    it('new ArrayModel().lock()', () =>
    {
        arrayModel = new ArrayModel();
        arrayModel.lock() ;
        assert.isTrue( arrayModel.isLocked() );
    });

    it('new ArrayModel().unlock()', () =>
    {
        arrayModel = new ArrayModel();
        arrayModel.lock() ;
        arrayModel.unlock() ;
        assert.isFalse( arrayModel.isLocked() );
    });

    it('new ArrayModel().added instanceOf Signal', () =>
    {
        assert.instanceOf( arrayModel.added , Signal );
    });

    it('new ArrayModel().beforeChanged instanceOf Signal', () =>
    {
        assert.instanceOf( arrayModel.beforeChanged , Signal );
    });

    it('new ArrayModel().changed instanceOf Signal', () =>
    {
        assert.instanceOf( arrayModel.changed , Signal );
    });

    it('new ArrayModel().cleared instanceOf Signal', () =>
    {
        assert.instanceOf( arrayModel.cleared , Signal );
    });

    it('new ArrayModel().removed instanceOf Signal', () =>
    {
        assert.instanceOf( arrayModel.removed , Signal );
    });

    it('new ArrayModel().updated instanceOf Signal', () =>
    {
        assert.instanceOf( arrayModel.updated , Signal );
    });

    let obj = { id:1 , name:'test' };
    it('new ArrayModel().current = new Object()', () =>
    {
        arrayModel.current = obj;
        assert.deepEqual( arrayModel.current , obj );
    });

    it('new ArrayModel().clear()', () =>
    {
        arrayModel.clear();
        assert.equal( arrayModel.length , 0 );
        assert.isNull( arrayModel.current );
    });

    let obj1 = { id:1 };
    let obj2 = { id:2 };
    let obj3 = { id:3 };
    let obj4 = { id:4 };
    let obj5 = { id:5 };
    let obj6 = { id:6 };

    it('new ArrayModel().add() with null entries', () =>
    {
        arrayModel.clear();
        assert.throws( function(){ arrayModel.add() } , ReferenceError );
        assert.throws( function(){ arrayModel.add( null ) } , ReferenceError );
        assert.throws( function(){ arrayModel.add( undefined ) } , ReferenceError );
    });

    it('new ArrayModel().add()', () =>
    {
        arrayModel.clear();
        assert.ifError( arrayModel.add( obj1 ) );
        assert.equal( arrayModel.length , 1 );
    });

    it('new ArrayModel().toArray()', () =>
    {
        arrayModel.clear();
        arrayModel.add( obj1 );
        arrayModel.add( obj2 );
        arrayModel.add( obj3 );
        arrayModel.add( obj4 );
        arrayModel.add( obj5 );
        arrayModel.add( obj6 );
        assert.isArray( arrayModel.toArray() );
        assert.deepEqual( arrayModel.toArray() , [ obj1 , obj2 , obj3 , obj4 , obj5 , obj6 ] );
    });

    it('new ArrayModel().addAt() with null entries', () =>
    {
        arrayModel.clear();
        assert.throws( function(){ arrayModel.addAt( 0 ) } , ReferenceError );
        assert.throws( function(){ arrayModel.addAt( 0 , null ) } , ReferenceError );
        assert.throws( function(){ arrayModel.addAt( 0 , undefined ) } , ReferenceError );
    });

    it('new ArrayModel().addAt()', () =>
    {
        arrayModel.clear();
        arrayModel.addAt( 0 , obj1 ) ;
        arrayModel.addAt( 0 , obj2 ) ;
        assert.equal( arrayModel.length , 2 );
        assert.deepEqual( arrayModel.toArray() , [ obj2 , obj1 ] );
        arrayModel.addAt( 4 , obj3 ) ;
        assert.deepEqual( arrayModel.toArray() , [ obj2 , obj1 , obj3 ] );
    });

    it('new ArrayModel().length', () =>
    {
        arrayModel.clear();
        assert.isTrue( arrayModel.isEmpty() );
        arrayModel.add( obj1 );
        arrayModel.add( obj2 );
        arrayModel.add( obj3 );
        arrayModel.add( obj4 );
        arrayModel.add( obj5 );
        arrayModel.add( obj6 );
        assert.equal( arrayModel.length , 6 );
        assert.isFalse( arrayModel.isEmpty() );
    });

    it('new ArrayModel().get()', () =>
    {
        arrayModel.clear();
        arrayModel.add( obj1 );
        arrayModel.add( obj2 );
        arrayModel.add( obj3 );
        arrayModel.add( obj4 );
        arrayModel.add( obj5 );
        arrayModel.add( obj6 );
        assert.deepEqual( arrayModel.get( 1 ) , obj2 );
        assert.deepEqual( arrayModel.get( 5 ) , obj6 );
        assert.isUndefined( arrayModel.get( 8 ) );
    });

    it('new ArrayModel().has()', () =>
    {
        arrayModel.clear();
        arrayModel.add( obj1 );
        arrayModel.add( obj2 );
        arrayModel.add( obj3 );
        arrayModel.add( obj4 );
        arrayModel.add( obj5 );
        arrayModel.add( obj6 );
        assert.isTrue( arrayModel.has( obj2 ) );
        assert.isTrue( arrayModel.has( obj4 ) );
        assert.isFalse( arrayModel.has( { id:8 } ) );
    });

    it('new ArrayModel().remove() with null entries', () =>
    {
        arrayModel.clear();
        arrayModel.add( obj1 );
        arrayModel.add( obj2 );
        arrayModel.add( obj3 );
        arrayModel.add( obj4 );
        arrayModel.add( obj5 );
        arrayModel.add( obj6 );

        assert.throws( function(){ arrayModel.remove() } , ReferenceError );
        assert.throws( function(){ arrayModel.remove( null ) } , ReferenceError );
        assert.throws( function(){ arrayModel.remove( undefined ) } , ReferenceError );

    });

    it('new ArrayModel().remove()', () =>
    {
        arrayModel.clear();
        arrayModel.add( obj1 );
        arrayModel.add( obj2 );
        arrayModel.add( obj3 );
        arrayModel.add( obj4 );
        arrayModel.add( obj5 );
        arrayModel.add( obj6 );

        arrayModel.remove( obj4 );
        assert.deepEqual( arrayModel.toArray() , [ obj1 , obj2 , obj3 , obj5 , obj6 ] );
        arrayModel.remove( obj1 );
        assert.deepEqual( arrayModel.toArray() , [ obj2 , obj3 , obj5 , obj6 ] );
        assert.throws( function(){ arrayModel.remove( obj1 ) } , ReferenceError );
    });

    it('new ArrayModel().removeAt()', () =>
    {
        arrayModel.clear();
        arrayModel.add( obj1 );
        arrayModel.add( obj2 );
        arrayModel.add( obj3 );
        arrayModel.add( obj4 );
        arrayModel.add( obj5 );
        arrayModel.add( obj6 );

        arrayModel.removeAt( 3 );
        assert.deepEqual( arrayModel.toArray() , [ obj1 , obj2 , obj3 , obj5 , obj6 ] );
        arrayModel.removeAt( 0 );
        assert.deepEqual( arrayModel.toArray() , [ obj2 , obj3 , obj5 , obj6 ] );

        arrayModel.removeAt( -1 );
        assert.deepEqual( arrayModel.toArray() , [ obj2 , obj3 , obj5 ] );
        arrayModel.removeAt( 8 );
        assert.deepEqual( arrayModel.toArray() , [ obj2 , obj3 , obj5 ] );
        arrayModel.removeAt( 0 , 2 );
        assert.deepEqual( arrayModel.toArray() , [ obj5 ] );
    });

    it('new ArrayModel().removeRange()', () =>
    {
        arrayModel.clear();
        arrayModel.add( obj1 );
        arrayModel.add( obj2 );
        arrayModel.add( obj3 );
        arrayModel.add( obj4 );
        arrayModel.add( obj5 );
        arrayModel.add( obj6 );

        arrayModel.removeRange( 3 , 4 );
        assert.deepEqual( arrayModel.toArray() , [ obj1 , obj2 , obj3 , obj5 , obj6 ] );
        arrayModel.removeRange( 0 , 2 );
        assert.deepEqual( arrayModel.toArray() , [ obj3 , obj5 , obj6 ] );

        assert.isNull( arrayModel.removeRange( 1 , 1 ) );
    });

    it('new ArrayModel().setArray()', () =>
    {
        arrayModel.clear();
        let arr = [ obj1 , obj2 , obj3 , obj4 , obj5 , obj6 ];
        arrayModel.setArray( arr );
        assert.equal( arrayModel.length , 6 );
        assert.deepEqual( arrayModel.toArray() , arr );
    });

    it('new ArrayModel().updateAt()', () =>
    {
        arrayModel.clear();
        arrayModel.add( obj1 );
        arrayModel.add( obj2 );
        arrayModel.add( obj3 );
        arrayModel.add( obj4 );
        arrayModel.add( obj5 );
        arrayModel.add( obj6 );

        arrayModel.updateAt( 0 , obj6 );
        assert.deepEqual( arrayModel.toArray() , [ obj6 , obj2 , obj3 , obj4 , obj5 , obj6 ] );

        arrayModel.updateAt( 2 , obj1 );
        assert.deepEqual( arrayModel.toArray() , [ obj6 , obj2 , obj1 , obj4 , obj5 , obj6 ] );
    });

    it('new ArrayModel().toString() === "[ArrayModel]"', () =>
    {
        let arrayModel = new ArrayModel() ;
        assert.equal( arrayModel.toString() , "[ArrayModel]" );
    });
});
