"use strict" ;

import { isStoppable } from '../../../system/process/Stoppable.js' ;
import { Stoppable } from '../../../system/process/Stoppable.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'system.process.Stoppable' , () =>
{
    it('Stoppable is a constructor function', () =>
    {
        assert.isFunction( Stoppable );
    });

    it('new Stoppable().constructor === Stoppable', () =>
    {
        let command = new Stoppable() ;
        assert.equal( command.constructor , Stoppable );
    });

    it('new Stoppable().stop()', () =>
    {
        let command = new Stoppable() ;
        assert.property( command , "stop" );
        assert.isFunction( command.stop );
    });

    it('new Stoppable().toString() === "[Stoppable]"', () =>
    {
        let command = new Stoppable() ;
        assert.equal( command.toString() , "[Stoppable]" );
    });
});

describe( 'system.process.isStoppable()' , () =>
{
    it('#isStoppable(new Stoppable()) === true', () =>
    {
        assert.isTrue( isStoppable(new Stoppable()) );
    });

    it('#isStoppable({stop:function(){}}) === true', () =>
    {
        assert.isTrue( isStoppable({ stop:function(){} }) );
    });

    it('#isStoppable({stop:"foo"}) === false', () =>
    {
        assert.isFalse( isStoppable({ stop:"foo" }) );
    });
    it('#isStoppable() === false', () =>
    {
        assert.isFalse( isStoppable() );
    });
    it('#isStoppable(null) === false', () =>
    {
        assert.isFalse( isStoppable(null) );
    });
    it('#isStoppable("foo") === false', () =>
    {
        assert.isFalse( isStoppable("foo") );
    });
});