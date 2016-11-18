/*jshint bitwise: false*/
"use strict" ;

import { Orientation } from '../../src/graphics/Orientation.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'graphics.Orientation' , () =>
{
    describe( '#constants' , () =>
    {
        it('#NONE === 0', () =>
        {
            assert.equal( Orientation.NONE , 0 );
        });

        it('#BOTTOM_TO_TOP === 4', () =>
        {
            assert.equal( Orientation.BOTTOM_TO_TOP , 4 );
        });

        it('#LEFT_TO_RIGHT === 1', () =>
        {
            assert.equal( Orientation.LEFT_TO_RIGHT , 1 );
        });

        it('#RIGHT_TO_LEFT === 2', () =>
        {
            assert.equal( Orientation.RIGHT_TO_LEFT , 2 );
        });

        it('#TOP_TO_BOTTOM === 8', () =>
        {
            assert.equal( Orientation.TOP_TO_BOTTOM , 8 );
        });

        it('#LEFT_TO_RIGHT_BOTTOM_TO_TOP === 5', () =>
        {
            assert.equal( Orientation.LEFT_TO_RIGHT_BOTTOM_TO_TOP , 5 );
        });

        it('#LEFT_TO_RIGHT_TOP_TO_BOTTOM === 5', () =>
        {
            assert.equal( Orientation.LEFT_TO_RIGHT_TOP_TO_BOTTOM , 9 );
        });

        it('#RIGHT_TO_LEFT_BOTTOM_TO_TOP === 6', () =>
        {
            assert.equal( Orientation.RIGHT_TO_LEFT_BOTTOM_TO_TOP , 6 );
        });

        it('#RIGHT_TO_LEFT_TOP_TO_BOTTOM === 10', () =>
        {
            assert.equal( Orientation.RIGHT_TO_LEFT_TOP_TO_BOTTOM , 10 );
        });
    });

    describe( '#ALL' , () =>
    {
        it('is Array', () =>
        {
            assert.isArray( Orientation.ALL );
        });
        it('length == 9', () =>
        {
            assert.lengthOf( Orientation.ALL , 9 );
        });
        it('check members', () =>
        {
            assert.sameMembers( Orientation.ALL ,
            [
                Orientation.NONE ,
                Orientation.BOTTOM_TO_TOP ,
                Orientation.LEFT_TO_RIGHT ,
                Orientation.RIGHT_TO_LEFT ,
                Orientation.TOP_TO_BOTTOM ,
                Orientation.LEFT_TO_RIGHT_BOTTOM_TO_TOP ,
                Orientation.LEFT_TO_RIGHT_TOP_TO_BOTTOM ,
                Orientation.RIGHT_TO_LEFT_BOTTOM_TO_TOP ,
                Orientation.RIGHT_TO_LEFT_TOP_TO_BOTTOM
            ]);
        });
    });

    describe( '#toString' , () =>
    {
        it('toString() == "none"', () =>
        {
            assert.equal( Orientation.toString() , "none" );
        });

        it('toString("foo") == "none"', () =>
        {
            assert.equal( Orientation.toString('foo') , "none" );
        });

        it('toString("foo","hello") == "hello"', () =>
        {
            assert.equal( Orientation.toString('foo','hello') , "hello" );
        });

        it('toString(Orientation.NONE) == "none"' ,  () =>
        {
            assert.equal( Orientation.toString(Orientation.NONE) , "none" );
        });
        it('toString(Orientation.BOTTOM_TO_TOP) == "btt"' ,  () =>
        {
            assert.equal( Orientation.toString(Orientation.BOTTOM_TO_TOP) , "btt" );
        });
        it('toString(Orientation.LEFT_TO_RIGHT) == "btt"' ,  () =>
        {
            assert.equal( Orientation.toString(Orientation.LEFT_TO_RIGHT) , "ltr" );
        });
        it('toString(Orientation.RIGHT_TO_LEFT) == "btt"' ,  () =>
        {
            assert.equal( Orientation.toString(Orientation.RIGHT_TO_LEFT) , "rtl" );
        });
        it('toString(Orientation.TOP_TO_BOTTOM) == "ttb"' ,  () =>
        {
            assert.equal( Orientation.toString(Orientation.TOP_TO_BOTTOM) , "ttb" );
        });
        it('toString(Orientation.LEFT_TO_RIGHT_BOTTOM_TO_TOP) == "ltrbtt"' ,  () =>
        {
            assert.equal( Orientation.toString(Orientation.LEFT_TO_RIGHT_BOTTOM_TO_TOP) , "ltrbtt" );
        });
        it('toString(Orientation.LEFT_TO_RIGHT_TOP_TO_BOTTOM) == "ltrbtt"' ,  () =>
        {
            assert.equal( Orientation.toString(Orientation.LEFT_TO_RIGHT_TOP_TO_BOTTOM) , "ltrttb" );
        });
        it('toString(Orientation.RIGHT_TO_LEFT_BOTTOM_TO_TOP) == "rtlbtt"' ,  () =>
        {
            assert.equal( Orientation.toString(Orientation.RIGHT_TO_LEFT_BOTTOM_TO_TOP) , "rtlbtt" );
        });
        it('toString(Orientation.RIGHT_TO_LEFT_TOP_TO_BOTTOM) == "rtlbtt"' ,  () =>
        {
            assert.equal( Orientation.toString(Orientation.RIGHT_TO_LEFT_TOP_TO_BOTTOM) , "rtlttb" );
        });
    });

    describe( '#validate' , () =>
    {
        it('validate() == false', () =>
        {
            assert.isFalse( Orientation.validate() );
        });
        it('validate("foo") == false', () =>
        {
            assert.isFalse( Orientation.validate("foo") );
        });
        it('validate(Orientation.NONE) == true', () =>
        {
            assert.isTrue( Orientation.validate(Orientation.NONE) );
        });
        it('validate(Orientation.BOTTOM_TO_TOP) == true', () =>
        {
            assert.isTrue( Orientation.validate(Orientation.BOTTOM_TO_TOP) );
        });
        it('validate(Orientation.LEFT_TO_RIGHT) == true', () =>
        {
            assert.isTrue( Orientation.validate(Orientation.LEFT_TO_RIGHT) );
        });
        it('validate(Orientation.RIGHT_TO_LEFT) == true', () =>
        {
            assert.isTrue( Orientation.validate(Orientation.RIGHT_TO_LEFT) );
        });
        it('validate(Orientation.TOP_TO_BOTTOM) == true', () =>
        {
            assert.isTrue( Orientation.validate(Orientation.TOP_TO_BOTTOM) );
        });
        it('validate(Orientation.LEFT_TO_RIGHT_BOTTOM_TO_TOP) == true', () =>
        {
            assert.isTrue( Orientation.validate(Orientation.LEFT_TO_RIGHT_BOTTOM_TO_TOP) );
        });
        it('validate(Orientation.LEFT_TO_RIGHT_TOP_TO_BOTTOM) == true', () =>
        {
            assert.isTrue( Orientation.validate(Orientation.LEFT_TO_RIGHT_TOP_TO_BOTTOM) );
        });
        it('validate(Orientation.RIGHT_TO_LEFT_BOTTOM_TO_TOP) == true', () =>
        {
            assert.isTrue( Orientation.validate(Orientation.RIGHT_TO_LEFT_BOTTOM_TO_TOP) );
        });
        it('validate(Orientation.RIGHT_TO_LEFT_TOP_TO_BOTTOM) == true', () =>
        {
            assert.isTrue( Orientation.validate(Orientation.RIGHT_TO_LEFT_TOP_TO_BOTTOM) );
        });
    });
}) ;
