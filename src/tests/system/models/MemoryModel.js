"use strict" ;

import { ChangeModel }        from './system/models/ChangeModel.js' ;
import { MemoryModel }        from './system/models/MemoryModel.js' ;
import { NoSuchElementError } from "./system/errors/NoSuchElementError.js" ;
import { Signal }             from './system/signals/Signal.js' ;

import { isLockable }  from './system/process/Lockable.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'system.models.MemoryModel' , () =>
{
    let model = new MemoryModel() ;

    it('MemoryModel is a constructor function', () =>
    {
        assert.isFunction( MemoryModel );
    });

    it('new MemoryModel().constructor === MemoryModel', () =>
    {
        assert.equal( model.constructor , MemoryModel );
    });

    it('new MemoryModel() instanceOf ChangeModel', () =>
    {
        assert.instanceOf( model , ChangeModel );
    });

    it('new MemoryModel() isLockable', () =>
    {
        assert.isTrue( isLockable(model) );
    });

    it('new MemoryModel().isLocked() === false', () =>
    {
        model = new MemoryModel() ;
        assert.isFalse( model.isLocked() );
    });

    it('new MemoryModel().lock()', () =>
    {
        model = new MemoryModel();
        model.lock() ;
        assert.isTrue( model.isLocked() );
    });

    it('new MemoryModel().unlock()', () =>
    {
        model = new MemoryModel();
        model.lock() ;
        model.unlock() ;
        assert.isFalse( model.isLocked() );
    });

    it('new MemoryModel().beforeChanged instanceOf Signal', () =>
    {
        assert.instanceOf( model.beforeChanged , Signal );
    });

    it('new MemoryModel().changed instanceOf Signal', () =>
    {
        assert.instanceOf( model.changed , Signal );
    });

    it('new MemoryModel().cleared instanceOf Signal', () =>
    {
        assert.instanceOf( model.cleared , Signal );
    });

    let obj = { id:1 , name:'test' };
    it('new MemoryModel().current = new Object()', () =>
    {
        model.current = obj;
        assert.deepEqual( model.current , obj );
    });

    it('new MemoryModel().enableErrorChecking', () =>
    {
        assert.isFalse( model.enableErrorChecking );
        model.enableErrorChecking = true;
        assert.isTrue( model.enableErrorChecking );
        model.enableErrorChecking = false;
    });

    it('new MemoryModel().clear()', () =>
    {
        model.clear();
        assert.equal( model.length , 0 );
        assert.isNull( model.current );
    });

    it('new MemoryModel().length', () =>
    {
        model.clear();
        model.current = "home";
        model.current = "page1";
        model.current = "page2";
        assert.equal( model.length , 3 );
    });

    it('new MemoryModel().back()', () =>
    {
        model.clear();
        model.current = "home";
        model.current = "page1";
        model.current = "page2";
        assert.equal( model.back() , "page2" );
        assert.equal( model.current , "page1" );
        assert.equal( model.length , 2 );
    });

    it('new MemoryModel().backTo() with empty model', () =>
    {
        model.clear();

        model.enableErrorChecking = false;
        assert.isNull( model.backTo( 5 ) );
        model.enableErrorChecking = true;
        assert.throws( function(){ model.backTo( 5 ) } , NoSuchElementError );
        model.enableErrorChecking = false;
    });

    it('new MemoryModel().backTo()', () =>
    {
        model.clear();
        model.current = "home";
        model.current = "page1";
        model.current = "page2";
        model.current = "page3";
        model.current = "page4";
        model.current = "page5";
        assert.deepEqual( model.backTo( 3 ) , "page5" );
        assert.equal( model.current , "page2" );
        assert.equal( model.length , 3 );
    });

    it('new MemoryModel().backTo() with position error', () =>
    {
        model.clear();
        model.current = "home";
        model.current = "page1";
        model.current = "page2";
        model.current = "page3";
        model.current = "page4";
        model.current = "page5";
        model.backTo( 3 );

        model.enableErrorChecking = false;
        assert.isNull( model.backTo( 5 ) );
        model.enableErrorChecking = true;
        assert.throws( function(){ model.backTo( 5 ) } , RangeError );
        model.enableErrorChecking = false;
    });

    it('new MemoryModel().first() with empty model', () =>
    {
        model.clear();

        model.enableErrorChecking = false;
        assert.isNull( model.first() );
        model.enableErrorChecking = true;
        assert.throws( function(){ model.first() } , NoSuchElementError );
        model.enableErrorChecking = false;
    });

    it('new MemoryModel().first()', () =>
    {
        model.clear();
        model.current = "home";
        model.current = "page1";
        model.current = "page2";
        model.current = "page3";
        model.current = "page4";
        model.current = "page5";
        assert.equal( model.first() , "home" );
        assert.equal( model.length , 6 );
    });

    it('new MemoryModel().home() with empty model', () =>
    {
        model.clear();

        model.enableErrorChecking = false;
        assert.isNull( model.home() );
        model.enableErrorChecking = true;
        assert.throws( function(){ model.home() } , NoSuchElementError );
        model.enableErrorChecking = false;
    });

    it('new MemoryModel().home()', () =>
    {
        model.clear();
        model.current = "home";
        model.current = "page1";
        model.current = "page2";
        model.current = "page3";
        model.current = "page4";
        model.current = "page5";
        assert.equal( model.home() , "page5" );
        assert.equal( model.current , "home" );
        assert.equal( model.length , 1 );
    });

    it('new MemoryModel().isEmpty()', () =>
    {
        model.clear();
        assert.isTrue( model.isEmpty() );
        model.current = "home";
        model.current = "page1";
        model.current = "page2";
        model.current = "page3";
        model.current = "page4";
        model.current = "page5";
        assert.isFalse( model.isEmpty() );
    });

    it('new MemoryModel().last() with empty model', () =>
    {
        model.clear();

        model.enableErrorChecking = false;
        assert.isNull( model.last() );
        model.enableErrorChecking = true;
        assert.throws( function(){ model.last() } , NoSuchElementError );
        model.enableErrorChecking = false;
    });

    it('new MemoryModel().last()', () =>
    {
        model.clear();
        model.current = "home";
        model.current = "page1";
        model.current = "page2";
        model.current = "page3";
        model.current = "page4";
        model.current = "page5";
        assert.equal( model.last() , "page5" );
        assert.equal( model.length , 6 );
    });


    it('new MemoryModel().toString() === "[MemoryModel]"', () =>
    {
        let model = new MemoryModel() ;
        assert.equal( model.toString() , "[MemoryModel]" );
    });
});
