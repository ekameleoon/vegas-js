"use strict" ;

import { ChangeModel } from '../../../src/system/models/ChangeModel.js' ;
import { MemoryModel } from '../../../src/system/models/MemoryModel.js' ;
import { NoSuchElementError }  from "../../../src/system/errors/NoSuchElementError.js" ;
import { Signal }    from '../../../src/system/signals/Signal.js' ;

import { isLockable }  from '../../../src/system/process/Lockable.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'system.models.MemoryModel' , () =>
{
    let memoryModel = new MemoryModel() ;

    it('MemoryModel is a constructor function', () =>
    {
        assert.isFunction( MemoryModel );
    });

    it('new MemoryModel().constructor === MemoryModel', () =>
    {
        assert.equal( memoryModel.constructor , MemoryModel );
    });

    it('new MemoryModel() instanceOf ChangeModel', () =>
    {
        assert.instanceOf( memoryModel , ChangeModel );
    });

    it('new MemoryModel() isLockable', () =>
    {
        assert.isTrue( isLockable(memoryModel) );
    });

    it('new MemoryModel().isLocked() === false', () =>
    {
        memoryModel = new MemoryModel() ;
        assert.isFalse( memoryModel.isLocked() );
    });

    it('new MemoryModel().lock()', () =>
    {
        memoryModel = new MemoryModel();
        memoryModel.lock() ;
        assert.isTrue( memoryModel.isLocked() );
    });

    it('new MemoryModel().unlock()', () =>
    {
        memoryModel = new MemoryModel();
        memoryModel.lock() ;
        memoryModel.unlock() ;
        assert.isFalse( memoryModel.isLocked() );
    });

    it('new MemoryModel().beforeChanged instanceOf Signal', () =>
    {
        assert.instanceOf( memoryModel.beforeChanged , Signal );
    });

    it('new MemoryModel().changed instanceOf Signal', () =>
    {
        assert.instanceOf( memoryModel.changed , Signal );
    });

    it('new MemoryModel().cleared instanceOf Signal', () =>
    {
        assert.instanceOf( memoryModel.cleared , Signal );
    });

    let obj = { id:1 , name:'test' };
    it('new MemoryModel().current = new Object()', () =>
    {
        memoryModel.current = obj;
        assert.deepEqual( memoryModel.current , obj );
    });

    it('new MemoryModel().enableErrorChecking', () =>
    {
        assert.isFalse( memoryModel.enableErrorChecking );
        memoryModel.enableErrorChecking = true;
        assert.isTrue( memoryModel.enableErrorChecking );
        memoryModel.enableErrorChecking = false;
    });

    it('new MemoryModel().clear()', () =>
    {
        memoryModel.clear();
        assert.equal( memoryModel.length , 0 );
        assert.isNull( memoryModel.current );
    });

    it('new MemoryModel().length', () =>
    {
        memoryModel.clear();
        memoryModel.current = "home";
        memoryModel.current = "page1";
        memoryModel.current = "page2";
        assert.equal( memoryModel.length , 3 );
    });

    it('new MemoryModel().back()', () =>
    {
        memoryModel.clear();
        memoryModel.current = "home";
        memoryModel.current = "page1";
        memoryModel.current = "page2";
        assert.equal( memoryModel.back() , "page2" );
        assert.equal( memoryModel.current , "page1" );
        assert.equal( memoryModel.length , 2 );
    });

    it('new MemoryModel().backTo() with empty model', () =>
    {
        memoryModel.clear();

        memoryModel.enableErrorChecking = false;
        assert.isNull( memoryModel.backTo( 5 ) );
        memoryModel.enableErrorChecking = true;
        assert.throws( function(){ memoryModel.backTo( 5 ) } , NoSuchElementError );
        memoryModel.enableErrorChecking = false;
    });

    it('new MemoryModel().backTo()', () =>
    {
        memoryModel.clear();
        memoryModel.current = "home";
        memoryModel.current = "page1";
        memoryModel.current = "page2";
        memoryModel.current = "page3";
        memoryModel.current = "page4";
        memoryModel.current = "page5";
        assert.deepEqual( memoryModel.backTo( 3 ) , "page5" );
        assert.equal( memoryModel.current , "page2" );
        assert.equal( memoryModel.length , 3 );
    });

    it('new MemoryModel().backTo() with position error', () =>
    {
        memoryModel.clear();
        memoryModel.current = "home";
        memoryModel.current = "page1";
        memoryModel.current = "page2";
        memoryModel.current = "page3";
        memoryModel.current = "page4";
        memoryModel.current = "page5";
        memoryModel.backTo( 3 );

        memoryModel.enableErrorChecking = false;
        assert.isNull( memoryModel.backTo( 5 ) );
        memoryModel.enableErrorChecking = true;
        assert.throws( function(){ memoryModel.backTo( 5 ) } , RangeError );
        memoryModel.enableErrorChecking = false;
    });

    it('new MemoryModel().first() with empty model', () =>
    {
        memoryModel.clear();

        memoryModel.enableErrorChecking = false;
        assert.isNull( memoryModel.first() );
        memoryModel.enableErrorChecking = true;
        assert.throws( function(){ memoryModel.first() } , NoSuchElementError );
        memoryModel.enableErrorChecking = false;
    });

    it('new MemoryModel().first()', () =>
    {
        memoryModel.clear();
        memoryModel.current = "home";
        memoryModel.current = "page1";
        memoryModel.current = "page2";
        memoryModel.current = "page3";
        memoryModel.current = "page4";
        memoryModel.current = "page5";
        assert.equal( memoryModel.first() , "home" );
        assert.equal( memoryModel.length , 6 );
    });

    it('new MemoryModel().home() with empty model', () =>
    {
        memoryModel.clear();

        memoryModel.enableErrorChecking = false;
        assert.isNull( memoryModel.home() );
        memoryModel.enableErrorChecking = true;
        assert.throws( function(){ memoryModel.home() } , NoSuchElementError );
        memoryModel.enableErrorChecking = false;
    });

    it('new MemoryModel().home()', () =>
    {
        memoryModel.clear();
        memoryModel.current = "home";
        memoryModel.current = "page1";
        memoryModel.current = "page2";
        memoryModel.current = "page3";
        memoryModel.current = "page4";
        memoryModel.current = "page5";
        assert.equal( memoryModel.home() , "page5" );
        assert.equal( memoryModel.current , "home" );
        assert.equal( memoryModel.length , 1 );
    });

    it('new MemoryModel().isEmpty()', () =>
    {
        memoryModel.clear();
        assert.isTrue( memoryModel.isEmpty() );
        memoryModel.current = "home";
        memoryModel.current = "page1";
        memoryModel.current = "page2";
        memoryModel.current = "page3";
        memoryModel.current = "page4";
        memoryModel.current = "page5";
        assert.isFalse( memoryModel.isEmpty() );
    });

    it('new MemoryModel().last() with empty model', () =>
    {
        memoryModel.clear();

        memoryModel.enableErrorChecking = false;
        assert.isNull( memoryModel.last() );
        memoryModel.enableErrorChecking = true;
        assert.throws( function(){ memoryModel.last() } , NoSuchElementError );
        memoryModel.enableErrorChecking = false;
    });

    it('new MemoryModel().last()', () =>
    {
        memoryModel.clear();
        memoryModel.current = "home";
        memoryModel.current = "page1";
        memoryModel.current = "page2";
        memoryModel.current = "page3";
        memoryModel.current = "page4";
        memoryModel.current = "page5";
        assert.equal( memoryModel.last() , "page5" );
        assert.equal( memoryModel.length , 6 );
    });


    it('new MemoryModel().toString() === "[MemoryModel]"', () =>
    {
        let memoryModel = new MemoryModel() ;
        assert.equal( memoryModel.toString() , "[MemoryModel]" );
    });
});
