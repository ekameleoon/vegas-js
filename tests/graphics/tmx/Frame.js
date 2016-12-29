"use strict" ;

import { Base } from '../../../src/graphics/tmx/Base.js' ;
import { Frame } from '../../../src/graphics/tmx/Frame.js' ;

import chai from 'chai' ;
const assert = chai.assert ;

describe( 'graphics.tmx.Frame' , () =>
{
    describe( '#constructor' , () =>
    {
        describe( 'new Frame()' , () =>
        {
            let frame = new Frame() ;
            it( 'new Frame() extends Base' , () =>
            {
                assert.instanceOf( frame , Base );
            });
            it( 'new Frame().constructor === Frame' , () =>
            {
                assert.equal( frame.constructor , Frame );
            });
        });

        describe( 'new Frame({duration:100,tileid:20})' , () =>
        {
            let frame = new Frame({duration:100,tileid:20}) ;
            it( 'new Frame({duration:100,tileid:20}) extends Base' , () =>
            {
                assert.instanceOf( frame , Base );
            });
            it( 'new Frame({duration:100,tileid:20}).constructor === Frame' , () =>
            {
                assert.equal( frame.constructor , Frame );
            });
            it( 'new Frame({duration:100,tileid:20}).duration === 100' , () =>
            {
                assert.equal( frame.duration , 100 );
            });
            it( 'new Frame({duration:100,tileid:20}).tileid === 20' , () =>
            {
                assert.equal( frame.tileid , 20 );
            });
        });
    });

    describe( '#clone' , () =>
    {
        let frame = new Frame({duration:100,tileid:20}) ;
        let clone = frame.clone() ;
        it( "new Base().clone()" , () =>
        {
            assert.notEqual( clone , frame ) ;
            assert.instanceOf( clone , Frame ) ;
            assert.equal( clone.duration , frame.duration ) ;
            assert.equal( clone.tileid   , frame.tileid ) ;
        });
    });

    describe( '#setTo' , () =>
    {
        describe( 'new Frame().setTo({duration:100,tileid:20})' , () =>
        {
            let frame = new Frame() ;
            frame.setTo({duration:100,tileid:20})  ;
            it( frame + ', duration === 100', () =>
            {
                assert.equal( frame.duration , 100 );
            });
            it( frame + ', tileid === 20', () =>
            {
                assert.equal( frame.tileid , 20 );
            });
        });
    });

    describe( '#toObject' , () =>
    {
        let frame = new Frame({duration:100,tileid:20}) ;
        let object = frame.toObject() ;
        it( "new Base({duration:100,tileid:20}).toObject() === {duration:100,tileid:20}" , () =>
        {
            assert.notEqual( object , frame ) ;
            assert.instanceOf( object.constructor , Object ) ;
            assert.equal( object.duration , frame.duration ) ;
            assert.equal( object.tileid   , frame.tileid ) ;
        });
    });

    describe( '#toString()' , () =>
    {
        it('new Frame().toString() === "[Frame]"', () =>
        {
            assert.equal( new Frame().toString() , "[Frame]" );
        });
    });
});
