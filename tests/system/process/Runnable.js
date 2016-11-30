"use strict" ;

import { isRunnable } from '../../../src/system/process/Runnable.js' ;
import { Runnable } from '../../../src/system/process/Runnable.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'system.process.Runnable' , () =>
{
    it('Runnable is a constructor function', () =>
    {
        assert.isFunction( Runnable );
    });

    it('new Runnable().constructor === Runnable', () =>
    {
        let command = new Runnable() ;
        assert.equal( command.constructor , Runnable );
    });

    it('new Runnable().run()', () =>
    {
        let command = new Runnable() ;
        assert.property( command , "run" );
        assert.isFunction( command.run );
    });

    it('new Runnable().toString() === "[Runnable]"', () =>
    {
        let command = new Runnable() ;
        assert.equal( command.toString() , "[Runnable]" );
    });
});

describe( 'system.process.isRunnable()' , () =>
{
    it('#isRunnable(new Runnable()) === true', () =>
    {
        assert.isTrue( isRunnable(new Runnable()) );
    });

    it('#isRunnable({run:function(){}}) === true', () =>
    {
        assert.isTrue( isRunnable({ run : function(){} }) );
    });

    it('#isRunnable({run:"foo"}) === false', () =>
    {
        assert.isFalse( isRunnable({ run : "foo" }) );
    });
    it('#isRunnable() === false', () =>
    {
        assert.isFalse( isRunnable() );
    });
    it('#isRunnable(null) === false', () =>
    {
        assert.isFalse( isRunnable(null) );
    });
    it('#isRunnable("foo") === false', () =>
    {
        assert.isFalse( isRunnable("foo") );
    });
});