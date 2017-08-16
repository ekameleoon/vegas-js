"use strict" ;

import { isResumable } from './system/process/Resumable.js' ;
import { Resumable } from './system/process/Resumable.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'system.process.Resumable' , () =>
{
    it('Resumable is a constructor function', () =>
    {
        assert.isFunction( Resumable );
    });

    it('new Resumable().constructor === Resumable', () =>
    {
        let command = new Resumable() ;
        assert.equal( command.constructor , Resumable );
    });

    it('new Resumable().resume()', () =>
    {
        let command = new Resumable() ;
        assert.property( command , "resume" );
        assert.isFunction( command.resume );
    });

    it('new Resumable().toString() === "[Resumable]"', () =>
    {
        let command = new Resumable() ;
        assert.equal( command.toString() , "[Resumable]" );
    });
});

describe( 'system.process.isResumable()' , () =>
{
    it('#isResumable(new Resumable()) === true', () =>
    {
        assert.isTrue( isResumable(new Resumable()) );
    });

    it('#isResumable({resume:function(){}}) === true', () =>
    {
        assert.isTrue( isResumable({ resume:function(){} }) );
    });

    it('#isResumable({resume:"foo"}) === false', () =>
    {
        assert.isFalse( isResumable({ resume:"foo" }) );
    });
    it('#isResumable() === false', () =>
    {
        assert.isFalse( isResumable() );
    });
    it('#isResumable(null) === false', () =>
    {
        assert.isFalse( isResumable(null) );
    });
    it('#isResumable("foo") === false', () =>
    {
        assert.isFalse( isResumable("foo") );
    });
});