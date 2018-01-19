"use strict" ;

import { isStartable } from 'system/process/Startable.js' ;
import { Startable } from 'system/process/Startable.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'system.process.Startable' , () =>
{
    it('Startable is a constructor function', () =>
    {
        assert.isFunction( Startable );
    });

    it('new Startable().constructor === Startable', () =>
    {
        let command = new Startable() ;
        assert.equal( command.constructor , Startable );
    });

    it('new Startable().start()', () =>
    {
        let command = new Startable() ;
        assert.property( command , "start" );
        assert.isFunction( command.start );
    });

    it('new Startable().toString() === "[Startable]"', () =>
    {
        let command = new Startable() ;
        assert.equal( command.toString() , "[Startable]" );
    });
});

describe( 'system.process.isStartable()' , () =>
{
    it('#isStartable(new Startable()) === true', () =>
    {
        assert.isTrue( isStartable(new Startable()) );
    });

    it('#isStartable({start:function(){}}) === true', () =>
    {
        assert.isTrue( isStartable({ start:function(){} }) );
    });

    it('#isStartable({start:"foo"}) === false', () =>
    {
        assert.isFalse( isStartable({ start:"foo" }) );
    });
    it('#isStartable() === false', () =>
    {
        assert.isFalse( isStartable() );
    });
    it('#isStartable(null) === false', () =>
    {
        assert.isFalse( isStartable(null) );
    });
    it('#isStartable("foo") === false', () =>
    {
        assert.isFalse( isStartable("foo") );
    });
});