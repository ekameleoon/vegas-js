"use strict" ;

import { Action }    from './system/process/Action.js' ;
import { Runnable }  from './system/process/Runnable.js' ;
import { Signal }    from './system/signals/Signal.js' ;
import { TaskPhase } from './system/process/TaskPhase.js' ;

import { isLockable }  from './system/process/Lockable.js' ;
import { isRunnable }  from './system/process/Runnable.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'system.process.Action' , () =>
{
    describe( 'new Action()' , () =>
    {
        let action = new Action() ;

        it('Action is a constructor function', () =>
        {
            assert.isFunction( Action );
        });

        it('new Action().constructor === Action', () =>
        {
            assert.equal( action.constructor , Action );
        });

        it('new Action() instanceOf Runnable', () =>
        {
            assert.instanceOf( action , Runnable );
        });

        it('new Action() isLockable', () =>
        {
            assert.isTrue( isLockable(action) );
        });

        it('new Action() isRunnable', () =>
        {
            assert.isTrue( isRunnable(action) );
        });

        it('new Action().finishIt instanceOf Signal', () =>
        {
            assert.instanceOf( action.finishIt , Signal );
        });

        it('new Action().phase === TaskPhase.INACTIVE', () =>
        {
            assert.equal( action.phase , TaskPhase.INACTIVE );
        });

        it('new Action().running === false', () =>
        {
            assert.isFalse( action.running );
        });

        it('new Action().startIt instanceOf Signal', () =>
        {
            assert.instanceOf( action.startIt , Signal );
        });

        it('new Action().isLocked() === false', () =>
        {
            assert.isFalse( action.isLocked() );
        });

        it('new Action().run()', () =>
        {
            assert.property( action , "run" );
            assert.isFunction( action.run );
        });

        it('new Action().toString() === "[Action]"', () =>
        {
            assert.equal( action.toString() , "[Action]" );
        });

        it('new Action().clone()', () =>
        {
            let action = new Action() ;
            let clone  = action.clone() ;
            assert.isNotNull( clone );
            assert.instanceOf( clone , Action );
            assert.notEqual( clone , action );
        });

        it('new Action().isLocked()', () =>
        {
            let action = new Action() ;
            assert.isFalse( action.isLocked() );
        });

        it('new Action().lock()', () =>
        {
            let action = new Action() ;
            action.lock() ;
            assert.isTrue( action.isLocked() );
        });

        it('new Action().unlock()', () =>
        {
            let action = new Action() ;
            action.lock() ;
            action.unlock() ;
            assert.isFalse( action.isLocked() );
        });

        it('new Action().notifyStarted()', () =>
        {
            let action = new Action() ;
            action.notifyStarted() ;
            assert.isTrue( action.running );
            assert.equal( action.phase , TaskPhase.RUNNING );
        });

        it('new Action().notifyFinished()', () =>
        {
            let action = new Action() ;
            action.notifyFinished() ;
            assert.isFalse( action.running );
            assert.equal( action.phase , TaskPhase.INACTIVE );
        });
    });
});