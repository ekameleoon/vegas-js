"use strict" ;

import { LineStyle } from '../../graphics/LineStyle.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'graphics.LineStyle' , () =>
{
    describe( 'new LineStyle()' , () =>
    {
        let style = new LineStyle() ;

        it('style.constructor === LineStyle' , () => { assert.equal( style.constructor , LineStyle ); });
        it('style.toString() === [LineStyle thickness:1 color:0 alpha:1]' , () => { assert.equal( style.toString() , '[LineStyle thickness:1 color:0 alpha:1]' ); });
        it('style.thickness === 1' , () => { assert.equal( style.thickness , 1 ); });
        it('style.color === 0' , () => { assert.equal( style.color     , 0 ); });
        it('style.alpha === 1' , () => { assert.equal( style.alpha     , 1 ); });
    });

    describe( 'new LineStyle(25,0xFF0000,0.5)' , () =>
    {
        let style = new LineStyle(25,0xFF0000,0.5) ;

        it('style.constructor === LineStyle' , () => { assert.equal( style.constructor , LineStyle ); });
        it('style.toString() === [LineStyle thickness:25 color:16711680 alpha:0.5]' , () => { assert.equal( style.toString() , '[LineStyle thickness:25 color:16711680 alpha:0.5]' ); });
        it('style.thickness === 25' , () => { assert.equal( style.thickness , 25 ); });
        it('style.color === 0xFF0000' , () => { assert.equal( style.color , 0xFF0000 ); });
        it('style.alpha === 0.5' , () => { assert.equal( style.alpha , 0.5 ); });
    });

    describe( 'new LineStyle().alpha' , () =>
    {
        let style = new LineStyle() ;

        it('style.alpha = 0 => 0' , () =>
        {
            style.alpha = 0 ;
            assert.equal( style.alpha , 0 );
        });
        it('style.alpha = -1 => 0' , () =>
        {
            style.alpha = -1 ;
            assert.equal( style.alpha , 0 );
        });
        it('style.alpha = 1 => 1' , () =>
        {
            style.alpha = 1 ;
            assert.equal( style.alpha , 1 );
        });
        it('style.alpha = 2 => 1' , () =>
        {
            style.alpha = 2 ;
            assert.equal( style.alpha , 1 );
        });
        it('style.alpha = NaN => 0' , () =>
        {
            style.alpha = NaN ;
            assert.equal( style.alpha , 0 );
        });
    });

    describe( 'new LineStyle().color' , () =>
    {
        let style = new LineStyle() ;

        it('style.color = 0 => 0' , () =>
        {
            style.color = 0 ;
            assert.equal( style.color , 0 );
        });
        it('style.color = -1 => 0' , () =>
        {
            style.color = -1 ;
            assert.equal( style.color , 0 );
        });
        it('style.color = 0xFFFFFF => 0xFFFFFF' , () =>
        {
            style.color = 0xFFFFFF ;
            assert.equal( style.color , 0xFFFFFF );
        });
        it('style.color = (0xFFFFFF + 1) => 0xFFFFFF' , () =>
        {
            style.color = (0xFFFFFF + 1) ;
            assert.equal( style.color , 0xFFFFFF );
        });
        it('style.color = NaN => 0' , () =>
        {
            style.color = NaN ;
            assert.equal( style.color , 0 );
        });
    });

    describe( 'new LineStyle().thickness' , () =>
    {
        let style = new LineStyle() ;

        it('style.thickness = 0 => 0' , () =>
        {
            style.thickness = 0 ;
            assert.equal( style.thickness , 0 );
        });
        it('style.thickness = -1 => 0' , () =>
        {
            style.thickness = -1 ;
            assert.equal( style.thickness , 0 );
        });
        it('style.thickness = 255 => 255' , () =>
        {
            style.thickness = 255 ;
            assert.equal( style.thickness , 255 );
        });
        it('style.thickness = 256 => 255' , () =>
        {
            style.thickness = 256 ;
            assert.equal( style.thickness , 255 );
        });
        it('style.thickness = NaN => 0' , () =>
        {
            style.thickness = NaN ;
            assert.equal( style.thickness , 0 );
        });
    });

    describe( 'new LineStyle().clone()' , () =>
    {
        it('new LineStyle(25,0xFF0000,1).clone()' , () =>
        {
            let style1 = new LineStyle(25,0xFF0000,1) ;
            let style2 = style1.clone() ;
            assert.notEqual( style1 , style2 );
            assert.isTrue( style1.equals(style2) );
        });
    });

    describe( 'new LineStyle().copyFrom()' , () =>
    {
        it('new LineStyle().copyFrom(new LineStyle(25,0xFF0000,1))' , () =>
        {
            let style1 = new LineStyle() ;
            let style2 = new LineStyle(25,0xFF0000,1) ;
            style1.copyFrom( style2 ) ;
            assert.isTrue( style1.equals(style2) );
        });
    });

    describe( 'new LineStyle().equals()' , () =>
    {
        it('new LineStyle().equals(new LineStyle() === true)' , () =>
        {
            assert.isTrue( new LineStyle().equals(new LineStyle()) );
        });
        it('new LineStyle(25,0xFF0000,1).equals(new LineStyle(25,0xFF0000,1) === true)' , () =>
        {
            assert.isTrue( new LineStyle(25,0xFF0000,1).equals(new LineStyle(25,0xFF0000,1)) );
        });
        it('new LineStyle(0,0xFF0000,1).equals(new LineStyle(25,0xFF0000,1) === false)' , () =>
        {
            assert.isFalse( new LineStyle(0,0xFF0000,1).equals(new LineStyle(25,0xFF0000,1)) );
        });
        it('new LineStyle(25,0,1).equals(new LineStyle(25,0xFF0000,1) === false)' , () =>
        {
            assert.isFalse( new LineStyle(25,0,1).equals(new LineStyle(25,0xFF0000,1)) );
        });
        it('new LineStyle(25,0xFF0000,0).equals(new LineStyle(25,0xFF0000,1) === false)' , () =>
        {
            assert.isFalse( new LineStyle(25,0xFF0000,0).equals(new LineStyle(25,0xFF0000,1)) );
        });
    });

    describe( 'LineStyle.EMPTY' , () =>
    {
        let style = LineStyle.EMPTY ;
        it('style.thickness === 0' , () => { assert.equal( style.thickness , 0 ); });
        it('style.color === 0' , () => { assert.equal( style.color     , 0 ); });
        it('style.alpha === 0' , () => { assert.equal( style.alpha     , 0 ); });
        it('new LineStyle(0,0,0).equals(LineStyle.EMPTY)' , () =>
        {
            assert.isTrue( new LineStyle(0,0,0).equals(LineStyle.EMPTY) );
        });
    });
}) ;
