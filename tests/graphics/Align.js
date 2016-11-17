/*jshint bitwise: false*/
"use strict" ;

import { Align } from '../../src/graphics/Align.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'graphics.Align' , () =>
{
    it( 'Align exist', () =>
    {
        assert.notStrictEqual( Align , null );
    });

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

    describe( 'toNumber()' , () =>
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

        it('Align.toNumber("none") === Align.NONE', () =>
        {
            assert.equal( Align.toNumber("l"), Align.LEFT );
        });

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
            assert.equal( Align.toNumber("l"), Align.LEFT );
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

        it('Align.toNumber("lr") === Align.LEFT_RIGHT', () =>
        {
            assert.equal( Align.toNumber("lt"), Align.LEFT_TOP );
        });
    }) ;
}) ;
