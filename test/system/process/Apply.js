"use strict" ;

import { Action } from 'system/process/Action.js' ;
import { Apply }  from 'system/process/Apply.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'system.process.Apply' , () =>
{
    it('Apply is a constructor function', () =>
    {
        assert.isFunction( Apply );
    });

    it('new Apply().constructor === Apply', () =>
    {
        let command = new Apply() ;
        assert.equal( command.constructor , Apply );
        assert.isNull( command.func , command.func );
        assert.isNull( command.func , command.func );
    });

    it('new Apply() extends Action', () =>
    {
        assert.isTrue( new Apply() instanceof Action );
    });

    it('new Apply().run() throw a TypeError', () =>
    {
        let command = new Apply() ;
        assert.throws( () => command.run(), TypeError, '[Apply] run failed, the \'func\' property must be a Function.');
    });

    it('new Apply(func).run()', () =>
    {
        let flag = false ;
        let command = new Apply( function()
        {
            flag = true ;
        }) ;

        command.run() ;

        assert.isTrue( flag );
    });

    it('new Apply(func,[1,2,3]).run()', () =>
    {
        let va = null ;
        let vb = null ;
        let vc = null ;

        let command = new Apply( function( a , b , c )
        {
            va = a ;
            vb = b ;
            vc = c ;
        }, [1,2,3]) ;

        command.run() ;

        assert.equal( va , 1 );
        assert.equal( vb , 2 );
        assert.equal( vc , 3 );
    });

    it('new Apply(func,scope).run(1,2,3)', () =>
    {
        let func = function( a , b , c )
        {
            va = this.a + a ;
            vb = this.a + b ;
            vc = this.a + c ;
        };

        let args = [ 1 , 2 , 3 ] ;

        let scope =
        {
            a : 1 , b : 1 , c : 1 ,
            toString : function() { return 'scope' }
        };

        let va = null ;
        let vb = null ;
        let vc = null ;

        let command = new Apply( func , args , scope ) ;

        command.run() ;

        assert.equal( va , 2 );
        assert.equal( vb , 3 );
        assert.equal( vc , 4 );
    });
});