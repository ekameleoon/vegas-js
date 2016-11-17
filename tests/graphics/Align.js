/*jshint bitwise: false*/
"use strict" ;

import { Align } from '../../src/graphics/Align.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'graphics.Align' , () =>
{
    describe( '#constants' , () =>
    {
        it('Align.NONE === 0', () =>
        {
            assert.equal( Align.NONE , 0 );
        });

        it('Align.CENTER === 1', () =>
        {
            assert.equal( Align.CENTER , 1 );
        });

        it('Align.LEFT === 2', () =>
        {
            assert.equal( Align.LEFT , 2 ) ;
        });

        it('Align.RIGHT === 4', () =>
        {
            assert.equal( Align.RIGHT , 4 ) ;
        });

        it('Align.TOP === 8', () =>
        {
            assert.equal( Align.TOP , 8 ) ;
        });

        it('Align.BOTTOM === 16', () =>
        {
            assert.equal( Align.BOTTOM , 16 ) ;
        });

        it('Align.REVERSE === 32', () =>
        {
            assert.equal( Align.REVERSE , 32 ) ;
        });

        it('Align.BOTTOM_LEFT === Align.BOTTOM | Align.LEFT', () =>
        {
            assert.equal( Align.BOTTOM_LEFT , Align.BOTTOM | Align.LEFT ) ;
        });

        it('Align.BOTTOM_RIGHT === Align.BOTTOM | Align.RIGHT', () =>
        {
            assert.equal( Align.BOTTOM_RIGHT , Align.BOTTOM | Align.RIGHT ) ;
        });

        it('Align.CENTER_LEFT === Align.CENTER | Align.LEFT', () =>
        {
            assert.equal( Align.CENTER_LEFT , Align.CENTER | Align.LEFT ) ;
        });

        it('Align.CENTER_RIGHT === Align.CENTER | Align.RIGHT', () =>
        {
            assert.equal( Align.CENTER_RIGHT , Align.CENTER | Align.RIGHT ) ;
        });

        it('Align.TOP_LEFT === Align.TOP | Align.LEFT', () =>
        {
            assert.equal( Align.TOP_LEFT , Align.TOP | Align.LEFT ) ;
        });

        it('Align.TOP_RIGHT === Align.TOP | Align.RIGHT', () =>
        {
            assert.equal( Align.TOP_RIGHT , Align.TOP | Align.RIGHT ) ;
        });

        it('Align.LEFT_BOTTOM === Align.LEFT | Align.BOTTOM | Align.REVERSE', () =>
        {
            assert.equal( Align.LEFT_BOTTOM , Align.LEFT | Align.BOTTOM | Align.REVERSE ) ;
        });

        it('Align.RIGHT_BOTTOM === Align.RIGHT | Align.BOTTOM | Align.REVERSE', () =>
        {
            assert.equal( Align.RIGHT_BOTTOM , Align.RIGHT | Align.BOTTOM | Align.REVERSE ) ;
        });

        it('Align.LEFT_TOP === Align.LEFT | Align.TOP | Align.REVERSE', () =>
        {
            assert.equal( Align.LEFT_TOP , Align.LEFT | Align.TOP | Align.REVERSE ) ;
        });

        it('Align.RIGHT_TOP === Align.RIGHT | Align.TOP | Align.REVERSE', () =>
        {
            assert.equal( Align.RIGHT_TOP , Align.RIGHT | Align.TOP | Align.REVERSE ) ;
        });
    });

    // --------------------------------

    describe( '#alignments' , () =>
    {
        it('Align.alignments is an Array' , () =>
        {
            assert.isTrue( Align.alignments instanceof Array );
        });

        it('Align.alignments contains 16 elements' , () =>
        {
            assert.equal( Align.alignments.length , 16 );
        });
    });

    // --------------------------------

    describe( '#stringToNumber' , () =>
    {
        it('Align.stringToNumber is not null' , () =>
        {
            assert.isNotNull( Align.stringToNumber  );
        });

        it('Align.stringToNumber contains 16 keys' , () =>
        {
            assert.equal( Object.keys(Align.stringToNumber).length , 16 );
        });
    });

    // --------------------------------

    describe( '#toNumber()' , () =>
    {
        // bad values : the first argument is null.

        it('Align.toNumber(null) === Align.NONE', () =>
        {
            assert.equal( Align.toNumber(null), Align.NONE );
        });

        it('Align.toNumber(null,Align.CENTER) === Align.CENTER', () =>
        {
            assert.equal( Align.toNumber( null , Align.CENTER ), Align.CENTER );
        });

        // bad values : the first argument is not a string.

        it('Align.toNumber(2) === Align.NONE', () =>
        {
            assert.equal( Align.toNumber(2), Align.NONE );
        });

        it('Align.toNumber(2,Align.CENTER) === Align.CENTER', () =>
        {
            assert.equal( Align.toNumber( 2 , Align.CENTER ), Align.CENTER );
        });

        // bad values : the first argument is not a valid string.

        it('Align.toNumber("foo") === Align.NONE', () =>
        {
            assert.equal( Align.toNumber("foo"), Align.NONE );
        });

        it('Align.toNumber("foo",Align.CENTER) === Align.CENTER', () =>
        {
            assert.equal( Align.toNumber( "foo" , Align.CENTER ), Align.CENTER );
        });

        // good values

        it('Align.toNumber("b") === Align.BOTTOM', () =>
        {
            assert.equal( Align.toNumber("b"), Align.BOTTOM );
        });

        it('Align.toNumber("bl") === Align.BOTTOM_LEFT', () =>
        {
            assert.equal( Align.toNumber("bl"), Align.BOTTOM_LEFT );
        });

        it('Align.toNumber("br") === Align.BOTTOM_RIGHT', () =>
        {
            assert.equal( Align.toNumber("br"), Align.BOTTOM_RIGHT );
        });

        it('Align.toNumber("c") === Align.CENTER', () =>
        {
            assert.equal( Align.toNumber("c"), Align.CENTER );
        });

        it('Align.toNumber("cl") === Align.CENTER_LEFT', () =>
        {
            assert.equal( Align.toNumber("cl"), Align.CENTER_LEFT );
        });

        it('Align.toNumber("cr") === Align.CENTER_RIGHT', () =>
        {
            assert.equal( Align.toNumber("cr"), Align.CENTER_RIGHT );
        });

        it('Align.toNumber("l") === Align.LEFT', () =>
        {
            assert.equal( Align.toNumber("l"), Align.LEFT );
        });

        it('Align.toNumber("lb") === Align.LEFT_BOTTOM', () =>
        {
            assert.equal( Align.toNumber("lb"), Align.LEFT_BOTTOM );
        });

        it('Align.toNumber("lr") === Align.LEFT_TOP', () =>
        {
            assert.equal( Align.toNumber("lt"), Align.LEFT_TOP );
        });

        it('Align.toNumber("r") === Align.RIGHT', () =>
        {
            assert.equal( Align.toNumber("r"), Align.RIGHT );
        });

        it('Align.toNumber("rb") === Align.RIGHT_BOTTOM', () =>
        {
            assert.equal( Align.toNumber("rb"), Align.RIGHT_BOTTOM );
        });

        it('Align.toNumber("rt") === Align.RIGHT_TOP', () =>
        {
            assert.equal( Align.toNumber("rt"), Align.RIGHT_TOP );
        });

        it('Align.toNumber("t") === Align.TOP', () =>
        {
            assert.equal( Align.toNumber("t"), Align.TOP );
        });

        it('Align.toNumber("tl") === Align.TOP_LEFT', () =>
        {
            assert.equal( Align.toNumber("rb"), Align.RIGHT_BOTTOM );
        });

        it('Align.toNumber("tr") === Align.TOP_RIGHT', () =>
        {
            assert.equal( Align.toNumber("rt"), Align.RIGHT_TOP );
        });

        it('Align.toNumber("none") === Align.NONE', () =>
        {
            assert.equal( Align.toNumber("none"), Align.NONE );
        });

        // --------------------------------

        describe( '#toString()' , () =>
        {
            it('Align.toString() === ""', () =>
            {
                assert.equal( Align.toString(), "" );
            });

            it('Align.toString("foo") === ""', () =>
            {
                assert.equal( Align.toString("foo"), "" );
            });

            it('Align.toString(Align.NONE) === "none"', () =>
            {
                assert.equal( Align.toString(Align.NONE), "none" );
            });

            it('Align.toString(Align.BOTTOM) === "b"', () =>
            {
                assert.equal( Align.toString(Align.BOTTOM), "b" );
            });

            it('Align.toString(Align.BOTTOM_LEFT) === "bl"', () =>
            {
                assert.equal( Align.toString(Align.BOTTOM_LEFT), "bl" );
            });

            it('Align.toString(Align.BOTTOM_RIGHT) === "br"', () =>
            {
                assert.equal( Align.toString(Align.BOTTOM_RIGHT), "br" );
            });

            it('Align.toString(Align.CENTER) === "c"', () =>
            {
                assert.equal( Align.toString(Align.CENTER), "c" );
            });

            it('Align.toString(Align.CENTER_LEFT) === "cl"', () =>
            {
                assert.equal( Align.toString(Align.CENTER_LEFT), "cl" );
            });

            it('Align.toString(Align.CENTER_RIGHT) === "cr"', () =>
            {
                assert.equal( Align.toString(Align.CENTER_RIGHT), "cr" );
            });

            it('Align.toString(Align.LEFT) === "l"', () =>
            {
                assert.equal( Align.toString(Align.LEFT), "l" );
            });

            it('Align.toString(Align.LEFT_BOTTOM) === "lb"', () =>
            {
                assert.equal( Align.toString(Align.LEFT_BOTTOM), "lb" );
            });

            it('Align.toString(Align.LEFT_TOP) === "lt"', () =>
            {
                assert.equal( Align.toString(Align.LEFT_TOP), "lt" );
            });

            it('Align.toString(Align.RIGHT) === "r"', () =>
            {
                assert.equal( Align.toString(Align.RIGHT), "r" );
            });

            it('Align.toString(Align.RIGHT_BOTTOM) === "rb"', () =>
            {
                assert.equal( Align.toString(Align.RIGHT_BOTTOM), "rb" );
            });

            it('Align.toString(Align.RIGHT_TOP) === "rt"', () =>
            {
                assert.equal( Align.toString(Align.RIGHT_TOP), "rt" );
            });

            it('Align.toString(Align.TOP) === "t"', () =>
            {
                assert.equal( Align.toString(Align.TOP), "t" );
            });

            it('Align.toString(Align.TOP_LEFT) === "tl"', () =>
            {
                assert.equal( Align.toString(Align.TOP_LEFT), "tl" );
            });

            it('Align.toString(Align.TOP_RIGHT) === "tr"', () =>
            {
                assert.equal( Align.toString(Align.TOP_RIGHT), "tr" );
            });
        }) ;

        describe( '#validate()' , () =>
        {
            it('Align.validate() === false', () =>
            {
                assert.isFalse( Align.validate() );
            });

            it('Align.validate("foo") === false', () =>
            {
                assert.isFalse( Align.validate('foo') );
            });

            it('Align.validate all the Align.alignments elements', () =>
            {
                for( var i = 0 ; i<Align.alignments.length ; i++ )
                {
                    assert.isTrue( Align.validate(Align.alignments[i]) );
                }
            });
        }) ;
    }) ;
}) ;
