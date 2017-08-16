/*jshint bitwise: false*/
"use strict" ;

import { Border } from '../../graphics/Border.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'graphics.Border' , () =>
{
    describe( 'new Border()' , () =>
    {
        it('new Border().value === 30', () =>
        {
            let border = new Border() ;
            assert.equal( border.value , 30 );
        });

        it('new Border().value === 30', () =>
        {
            let border = new Border() ;
            assert.equal( border.value , Border.BOTTOM | Border.LEFT | Border.TOP | Border.RIGHT );
        });

        it('new Border().hasBorders === true', () =>
        {
            let border = new Border() ;
            assert.isTrue( border.hasBorders() );
        });
    });

    describe( 'new Border(Border.ALL)' , () =>
    {
        it('new Border(Border.ALL).value === Border.ALL', () =>
        {
            let border = new Border(Border.ALL) ;
            assert.equal( border.value , Border.ALL );
        });
        it('new Border(Border.ALL).hasBorders === true', () =>
        {
            let border = new Border(Border.ALL) ;
            assert.isTrue( border.hasBorders() );
        });
        it('new Border(Border.ALL).disableBorderSide(Border.ALL)', () =>
        {
            let border = new Border(Border.ALL) ;
            border.disableBorderSide( Border.ALL ) ;
            assert.isFalse( border.hasBorders() );
            assert.isFalse( border.hasBorder(Border.TOP) );
            assert.isFalse( border.hasBorder(Border.LEFT) );
            assert.isFalse( border.hasBorder(Border.RIGHT) );
            assert.isFalse( border.hasBorder(Border.BOTTOM) );
        });
        it('new Border(Border.ALL).disableBorderSide(Border.TOP)', () =>
        {
            let border = new Border(Border.ALL) ;
            border.disableBorderSide( Border.TOP ) ;
            assert.isTrue( border.hasBorders() );
            assert.isFalse( border.hasBorder(Border.TOP) );
            assert.isTrue( border.hasBorder(Border.LEFT) );
            assert.isTrue( border.hasBorder(Border.RIGHT) );
            assert.isTrue( border.hasBorder(Border.BOTTOM) );
        });
        it('new Border(Border.ALL).disableBorderSide(Border.LEFT)', () =>
        {
            let border = new Border(Border.ALL) ;
            border.disableBorderSide( Border.LEFT ) ;
            assert.isTrue( border.hasBorders() );
            assert.isTrue( border.hasBorder(Border.TOP) );
            assert.isFalse( border.hasBorder(Border.LEFT) );
            assert.isTrue( border.hasBorder(Border.RIGHT) );
            assert.isTrue( border.hasBorder(Border.BOTTOM) );
        });
        it('new Border(Border.ALL).disableBorderSide(Border.RIGHT)', () =>
        {
            let border = new Border(Border.ALL) ;
            border.disableBorderSide( Border.RIGHT ) ;
            assert.isTrue( border.hasBorders() );
            assert.isTrue( border.hasBorder(Border.TOP) );
            assert.isTrue( border.hasBorder(Border.LEFT) );
            assert.isFalse( border.hasBorder(Border.RIGHT) );
            assert.isTrue( border.hasBorder(Border.BOTTOM) );
        });
        it('new Border(Border.ALL).disableBorderSide(Border.RIGHT)', () =>
        {
            let border = new Border(Border.ALL) ;
            border.disableBorderSide( Border.BOTTOM ) ;
            assert.isTrue( border.hasBorders() );
            assert.isTrue( border.hasBorder(Border.TOP) );
            assert.isTrue( border.hasBorder(Border.LEFT) );
            assert.isTrue( border.hasBorder(Border.RIGHT) );
            assert.isFalse( border.hasBorder(Border.BOTTOM) );
        });
    });

    describe( 'new Border(Border.NONE)' , () =>
    {
        let border = new Border(Border.NONE) ;
        it('new Border(Border.NONE).value === Border.NONE', () =>
        {
            assert.equal( border.value , Border.NONE );
        });
        it('new Border(Border.NONE).hasBorders === false', () =>
        {
            assert.isFalse( border.hasBorders() );
        });
        it('new Border(Border.NONE).enableBorderSide(Border.ALL)', () =>
        {
            let border = new Border(Border.ALL) ;
            border.enableBorderSide( Border.ALL ) ;
            assert.isTrue( border.hasBorders() );
            assert.isTrue( border.hasBorder(Border.TOP) );
            assert.isTrue( border.hasBorder(Border.LEFT) );
            assert.isTrue( border.hasBorder(Border.RIGHT) );
            assert.isTrue( border.hasBorder(Border.BOTTOM) );
        });
    });

    describe( 'new Border(Border.LEFT)' , () =>
    {
        let border = new Border(Border.LEFT) ;
        it('new Border(Border.LEFT).value === Border.LEFT', () =>
        {
            assert.equal( border.value , Border.LEFT );
        });
        it('new Border(Border.LEFT).hasBorders === true', () =>
        {
            assert.isTrue( border.hasBorders() );
        });
    });

    describe( 'new Border(Border.RIGHT)' , () =>
    {
        let border = new Border(Border.RIGHT) ;
        it('new Border(Border.RIGHT).value === Border.RIGHT', () =>
        {
            assert.equal( border.value , Border.RIGHT );
        });
        it('new Border(Border.RIGHT).hasBorders === true', () =>
        {
            assert.isTrue( border.hasBorders() );
        });
    });

    describe( 'new Border(Border.TOP)' , () =>
    {
        let border = new Border(Border.TOP) ;
        it('new Border(Border.TOP).value === Border.TOP', () =>
        {
            assert.equal( border.value , Border.TOP );
        });
        it('new Border(Border.TOP).hasBorders === true', () =>
        {
            assert.isTrue( border.hasBorders() );
        });
    });

    describe( '#constants' , () =>
    {
        it('Border.ALL === 30', () =>
        {
            assert.equal( Border.ALL , 30 );
        });

        it('Border.NONE === 0', () =>
        {
            assert.equal( Border.NONE , 0 );
        });

        it('Border.NO_BORDER === 0', () =>
        {
            assert.equal( Border.NO_BORDER , 0 );
        });

        it('Border.BOTTOM === 16', () =>
        {
            assert.equal( Border.BOTTOM , 16 );
        });

        it('Border.LEFT === 2', () =>
        {
            assert.equal( Border.LEFT , 2 );
        });

        it('Border.RIGHT === 4', () =>
        {
            assert.equal( Border.RIGHT , 4 );
        });

        it('Border.TOP === 8', () =>
        {
            assert.equal( Border.TOP , 8 );
        });
    }) ;
}) ;
