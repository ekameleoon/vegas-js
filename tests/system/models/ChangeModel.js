"use strict" ;

import { ChangeModel } from '../../../src/system/models/ChangeModel.js' ;
import { Model } from '../../../src/system/models/Model.js' ;
import { Signal }    from '../../../src/system/signals/Signal.js' ;

import { isLockable }  from '../../../src/system/process/Lockable.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'system.models.ChangeModel' , () =>
{
    let changeModel = new ChangeModel() ;

    it('ChangeModel is a constructor function', () =>
    {
        assert.isFunction( ChangeModel );
    });

    it('new ChangeModel().constructor === ChangeModel', () =>
    {
        assert.equal( changeModel.constructor , ChangeModel );
    });

    it('new ChangeModel() instanceOf Model', () =>
    {
        assert.instanceOf( changeModel , Model );
    });

    it('new ChangeModel() isLockable', () =>
    {
        assert.isTrue( isLockable(changeModel) );
    });

    it('new ChangeModel().isLocked() === false', () =>
    {
        changeModel = new ChangeModel() ;
        assert.isFalse( changeModel.isLocked() );
    });

    it('new ChangeModel().lock()', () =>
    {
        changeModel = new ChangeModel();
        changeModel.lock() ;
        assert.isTrue( changeModel.isLocked() );
    });

    it('new ChangeModel().unlock()', () =>
    {
        changeModel = new ChangeModel();
        changeModel.lock() ;
        changeModel.unlock() ;
        assert.isFalse( changeModel.isLocked() );
    });

    it('new ChangeModel().beforeChanged instanceOf Signal', () =>
    {
        assert.instanceOf( changeModel.beforeChanged , Signal );
    });

    it('new ChangeModel().changed instanceOf Signal', () =>
    {
        assert.instanceOf( changeModel.changed , Signal );
    });

    it('new ChangeModel().cleared instanceOf Signal', () =>
    {
        assert.instanceOf( changeModel.cleared , Signal );
    });

    let obj = { id:1 , name:'test' };
    it('new ChangeModel().current = new Object()', () =>
    {
        changeModel.current = obj;
        assert.deepEqual( changeModel.current , obj );
    });

    it('new ChangeModel().clear()', () =>
    {
        changeModel.clear();
        assert.equal( changeModel.current , null );
    });


    it('new ChangeModel().toString() === "[ChangeModel]"', () =>
    {
        let changeModel = new ChangeModel() ;
        assert.equal( changeModel.toString() , "[ChangeModel]" );
    });
});
