"use strict" ;

import { Base } from '../../../graphics/tmx/Base.js' ;

import chai from 'chai' ;
const assert = chai.assert ;

describe( 'graphics.tmx.Base' , () =>
{
    describe( '#constructor' , () =>
    {
        let base = new Base() ;
        it( 'new Base().constructor === Base' , () =>
        {
            assert.equal( base.constructor , Base );
        });
    });

    describe( '#clone' , () =>
    {
        let base  = new Base() ;
        let clone = base.clone() ;
        it( "new Base().clone()" , () =>
        {
            assert.notEqual( clone , base ) ;
            assert.instanceOf( clone , Base ) ;
        });
    });

    describe( '#setTo' , () =>
    {
        describe( 'new Base().setTo({x:10,y:20})' , () =>
        {
            let base = new Base() ;
            base.x = 25 ;
            base.y = 25 ;
            base.setTo({x:10,y:20,z:30})  ;
            it( base + ', x === 10', () =>
            {
                assert.equal( base.x , 10 );
            });
            it( base + ', y === 20', () =>
            {
                assert.equal( base.y , 20 );
            });
            it( base + ', z === undefined', () =>
            {
                assert.isUndefined( base.z );
            });
        });
    });

    describe( '#toObject' , () =>
    {
        let base = new Base() ;
        let object = base.toObject() ;
        it( "new Base().toObject() === { id : null }" , () =>
        {
            assert.instanceOf( object.constructor , Object ) ;
            assert.isNull( object.id ) ;
        });
    });

    describe( '#toString()' , () =>
    {
        it('new Base().toString() === "[Base]"', () =>
        {
            assert.equal( new Base().toString() , "[Base]" );
        });
    });
});
