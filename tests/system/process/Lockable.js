"use strict" ;

import { isLockable } from '../../../src/system/process/Lockable.js' ;
import { Lockable } from '../../../src/system/process/Lockable.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'system.process.Lockable' , () =>
{
    it('Lockable is a constructor function', () =>
    {
        assert.isFunction( Lockable );
    });

    let object = new Lockable() ;

    it('new Lockable().constructor === Lockable', () =>
    {
        assert.equal( object.constructor , Lockable );
    });

    it('new Lockable().isLocked()', () =>
    {
        assert.property( object , "isLocked" );
        assert.isFunction( object.isLocked );
        object = new Lockable() ;
        assert.isFalse( object.isLocked() ); // default
    });

    it('new Lockable().lock()', () =>
    {
        object = new Lockable() ;
        assert.property( object , "lock" );
        assert.isFunction( object.lock );
        object.lock() ;
        assert.isTrue( object.isLocked() );
    });

    it('new Lockable().unlock()', () =>
    {
        assert.property( object , "unlock" );
        assert.isFunction( object.unlock );
        object.unlock() ;
        assert.isFalse( object.isLocked() );
    });

    it('new Lockable().toString() === "[Lockable]"', () =>
    {
        let object = new Lockable() ;
        assert.equal( object.toString() , "[Lockable]" );
    });
});

describe( 'system.process.isLockable()' , () =>
{
    it('#isLockable(new Lockable()) === true', () =>
    {
        assert.isTrue( isLockable(new Lockable()) );
    });

    it('#isLockable({isLocked:function(){},lock:function(){},unlock:function(){}}) === true', () =>
    {
        assert.isTrue
        (
            isLockable
            (
                {
                    isLocked:function(){} ,
                    lock:function(){} ,
                    unlock:function(){}
                }
            )
        );
    });

    it('#isLockable() === false', () =>
    {
        assert.isFalse( isLockable() );
    });
    it('#isLockable(null) === false', () =>
    {
        assert.isFalse( isLockable(null) );
    });
    it('#isLockable("foo") === false', () =>
    {
        assert.isFalse( isLockable("foo") );
    });
});