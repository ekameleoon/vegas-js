"use strict" ;

import { isResetable } from 'system/process/Resetable.js' ;
import { Resetable } from 'system/process/Resetable.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'system.process.Resetable' , () =>
{
    it('Resetable is a constructor function', () =>
    {
        assert.isFunction( Resetable );
    });

    it('new Resetable().constructor === Resetable', () =>
    {
        let command = new Resetable() ;
        assert.equal( command.constructor , Resetable );
    });

    it('new Resetable().reset()', () =>
    {
        let command = new Resetable() ;
        assert.property( command , "reset" );
        assert.isFunction( command.reset );
    });

    it('new Resetable().toString() === "[Resetable]"', () =>
    {
        let command = new Resetable() ;
        assert.equal( command.toString() , "[Resetable]" );
    });
});

describe( 'system.process.isResetable()' , () =>
{
    it('#isResetable(new Resetable()) === true', () =>
    {
        assert.isTrue( isResetable(new Resetable()) );
    });

    it('#isResetable({reset:function(){}}) === true', () =>
    {
        assert.isTrue( isResetable({ reset:function(){} }) );
    });

    it('#isResetable({reset:"foo"}) === false', () =>
    {
        assert.isFalse( isResetable({ reset:"foo" }) );
    });
    it('#isResetable() === false', () =>
    {
        assert.isFalse( isResetable() );
    });
    it('#isResetable(null) === false', () =>
    {
        assert.isFalse( isResetable(null) );
    });
    it('#isResetable("foo") === false', () =>
    {
        assert.isFalse( isResetable("foo") );
    });
});