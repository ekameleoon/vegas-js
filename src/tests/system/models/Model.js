"use strict" ;

import { Lockable } from '../../../system/process/Lockable.js' ;
import { Model } from '../../../system/models/Model.js' ;

import { isLockable } from '../../../system/process/Lockable.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'system.models.Model' , () =>
{
    let model = new Model() ;

    it('Model is a constructor function', () =>
    {
        assert.isFunction( Model );
    });

    it('new Model().constructor === Model', () =>
    {
        assert.equal( model.constructor , Model );
    });

    it('new Model() instanceOf Lockable', () =>
    {
        assert.instanceOf( model , Lockable );
    });

    it('new Model() isLockable', () =>
    {
        assert.isTrue( isLockable(model) );
    });

    it('new Model().isLocked() === false', () =>
    {
        model = new Model() ;
        assert.isFalse( model.isLocked() );
    });

    it('new Model().lock()', () =>
    {
        model = new Model();
        model.lock() ;
        assert.isTrue( model.isLocked() );
    });

    it('new Model().unlock()', () =>
    {
        model = new Model();
        model.lock() ;
        model.unlock() ;
        assert.isFalse( model.isLocked() );
    });

    it('new Model().toString() === "[Model]"', () =>
    {
        let model = new Model() ;
        assert.equal( model.toString() , "[Model]" );
    });
});
