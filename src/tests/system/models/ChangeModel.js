"use strict" ;

import { ChangeModel } from './system/models/ChangeModel.js' ;
import { Model }       from './system/models/Model.js' ;
import { Signal }      from './system/signals/Signal.js' ;

import { isLockable } from './system/process/Lockable.js' ;
import { MockSlot }   from '../../mocks/MockSlot.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'system.models.ChangeModel' , () =>
{
    let model = new ChangeModel() ;
    let slot = new MockSlot();

    let obj = { id:1 , name:'test' };

    it('ChangeModel is a constructor function', () =>
    {
        assert.isFunction( ChangeModel );
    });

    it('new ChangeModel().constructor === ChangeModel', () =>
    {
        assert.equal( model.constructor , ChangeModel );
    });

    it('new ChangeModel() instanceOf Model', () =>
    {
        assert.instanceOf( model , Model );
    });

    it('new ChangeModel() isLockable', () =>
    {
        assert.isTrue( isLockable(model) );
    });

    it('new ChangeModel().isLocked() === false', () =>
    {
        model = new ChangeModel() ;
        assert.isFalse( model.isLocked() );
    });

    it('new ChangeModel().lock()', () =>
    {
        model = new ChangeModel();
        model.lock() ;
        assert.isTrue( model.isLocked() );
    });

    it('new ChangeModel().unlock()', () =>
    {
        model = new ChangeModel();
        model.lock() ;
        model.unlock() ;
        assert.isFalse( model.isLocked() );
    });

    it('new ChangeModel().beforeChanged instanceOf Signal', () =>
    {
        assert.instanceOf( model.beforeChanged , Signal );
    });

    it('new ChangeModel().beforeChanged.connect()', () =>
    {
        slot = new MockSlot();
        assert.isTrue( model.beforeChanged.connect( slot ) );
        assert.isTrue( model.beforeChanged.hasReceiver( slot ) );
    });

    it('new ChangeModel().beforeChanged.disconnect()', () =>
    {
        assert.isTrue( model.beforeChanged.hasReceiver( slot ) );
        assert.isTrue( model.beforeChanged.disconnect( slot ) );
        assert.isFalse( model.beforeChanged.hasReceiver( slot ) );
    });

    it('new ChangeModel().notifyBeforeChange()', () =>
    {
        slot = new MockSlot();
        model = new ChangeModel();
        model.beforeChanged.connect( slot );
        assert.isFalse( slot.isReceived() );
        assert.isNull( slot.getValues() );
        model.notifyBeforeChange( obj );
        assert.isTrue( slot.isReceived() );
        assert.equal( slot.getValues()[0] , obj );
    });

    it('new ChangeModel().changed instanceOf Signal', () =>
    {
        assert.instanceOf( model.changed , Signal );
    });

    it('new ChangeModel().changed.connect()', () =>
    {
        slot = new MockSlot();
        assert.isTrue( model.changed.connect( slot ) );
        assert.isTrue( model.changed.hasReceiver( slot ) );
    });

    it('new ChangeModel().changed.disconnect()', () =>
    {
        assert.isTrue( model.changed.hasReceiver( slot ) );
        assert.isTrue( model.changed.disconnect( slot ) );
        assert.isFalse( model.changed.hasReceiver( slot ) );
    });

    it('new ChangeModel().notifyChange()', () =>
    {
        slot = new MockSlot();
        model = new ChangeModel();
        model.changed.connect( slot );
        assert.isFalse( slot.isReceived() );
        assert.isNull( slot.getValues() );
        model.notifyChange( obj );
        assert.isTrue( slot.isReceived() );
        assert.equal( slot.getValues()[0] , obj );
    });

    it('new ChangeModel().cleared instanceOf Signal', () =>
    {
        assert.instanceOf( model.cleared , Signal );
    });

    it('new ChangeModel().cleared.connect()', () =>
    {
        slot = new MockSlot();
        assert.isTrue( model.cleared.connect( slot ) );
        assert.isTrue( model.cleared.hasReceiver( slot ) );
    });

    it('new ChangeModel().cleared.disconnect()', () =>
    {
        assert.isTrue( model.cleared.hasReceiver( slot ) );
        assert.isTrue( model.cleared.disconnect( slot ) );
        assert.isFalse( model.cleared.hasReceiver( slot ) );
    });

    it('new ChangeModel().notifyClear()', () =>
    {
        slot = new MockSlot();
        model = new ChangeModel();
        model.cleared.connect( slot );
        assert.isFalse( slot.isReceived() );
        assert.isNull( slot.getValues() );
        model.notifyClear( obj );
        assert.isTrue( slot.isReceived() );
        assert.deepEqual( slot.getValues()[0] , {} );
    });

    it('new ChangeModel().current = new Object()', () =>
    {
        model = new ChangeModel();
        model.current = obj;
        assert.deepEqual( model.current , obj );
    });

    it('new ChangeModel().clear()', () =>
    {
        model.clear();
        assert.equal( model.current , null );
    });

    it('new ChangeModel().toString() === "[ChangeModel]"', () =>
    {
        let model = new ChangeModel() ;
        assert.equal( model.toString() , "[ChangeModel]" );
    });
});
