"use strict" ;

import { Action } from '../../../system/process/Action.js' ;
import { Call } from '../../../system/process/Call.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'system.process.Call' , () =>
{
    it('Call is a constructor function', () =>
    {
        assert.isFunction( Call );
    });

    it('new Call().constructor === Call', () =>
    {
        let command = new Call() ;
        assert.equal( command.constructor , Call );
        assert.isNull( command.func , command.func );
        assert.isNull( command.func , command.func );
    });

    it('new Call() extends Action', () =>
    {
        assert.isTrue( new Call() instanceof Action );
    });

    it('new Call().run() throw a TypeError', () =>
    {
        let command = new Call() ;
        assert.throws( () => command.run(), TypeError, '[Call] run failed, the \'func\' property must be a Function.');
    });

    it('new Call(func).run()', () =>
    {
        let flag = false ;
        let command = new Call( function()
        {
            flag = true ;
        }) ;

        command.run() ;

        assert.isTrue( flag );
    });

    it('new Call(func).run(1,2,3)', () =>
    {
        let va = null ;
        let vb = null ;
        let vc = null ;

        let command = new Call( function( a , b , c )
        {
            va = a ;
            vb = b ;
            vc = c ;
        }) ;

        command.run(1,2,3) ;

        assert.equal( va , 1 );
        assert.equal( vb , 2 );
        assert.equal( vc , 3 );
    });

    it('new Call(func,scope).run(1,2,3)', () =>
    {
        let func = function( a , b , c )
        {
            va = this.a + a ;
            vb = this.a + b ;
            vc = this.a + c ;
        };

        let scope =
        {
            a : 1 , b : 1 , c : 1 ,
            toString : function() { return 'scope' }
        };

        let va = null ;
        let vb = null ;
        let vc = null ;

        let command = new Call( func , scope ) ;

        command.run(1,2,3) ;

        assert.equal( va , 2 );
        assert.equal( vb , 3 );
        assert.equal( vc , 4 );
    });
});