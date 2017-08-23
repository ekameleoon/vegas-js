"use strict" ;

import { FillStyle } from '../../graphics/FillStyle.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'graphics.FillStyle' , () =>
{
    describe( 'new FillStyle()' , () =>
    {
        let style = new FillStyle() ;

        it('style.constructor === FillStyle' , () => { assert.equal( style.constructor , FillStyle ); });
        it('style.toString() === [FillStyle color:0 alpha:1]' , () => { assert.equal( style.toString() , '[FillStyle color:0 alpha:1]' ); });
        it('style.color === 0' , () => { assert.equal( style.color     , 0 ); });
        it('style.alpha === 1' , () => { assert.equal( style.alpha     , 1 ); });
    });

    describe( 'new FillStyle(0xFF0000,0.5)' , () =>
    {
        let style = new FillStyle(0xFF0000,0.5) ;

        it('style.constructor === FillStyle' , () => { assert.equal( style.constructor , FillStyle ); });
        it('style.toString() === [FillStyle color:16711680 alpha:0.5]' , () => { assert.equal( style.toString() , '[FillStyle color:16711680 alpha:0.5]' ); });
        it('style.color === 0xFF0000' , () => { assert.equal( style.color , 0xFF0000 ); });
        it('style.alpha === 0.5' , () => { assert.equal( style.alpha , 0.5 ); });
    });

    describe( 'new FillStyle().alpha' , () =>
    {
        let style = new FillStyle() ;

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

    describe( 'new FillStyle().color' , () =>
    {
        let style = new FillStyle() ;

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

    describe( 'new FillStyle().clone()' , () =>
    {
        it('new FillStyle(0xFF0000,1).clone()' , () =>
        {
            let style1 = new FillStyle(0xFF0000,1) ;
            let style2 = style1.clone() ;
            assert.notEqual( style1 , style2 );
            assert.isTrue( style1.equals(style2) );
        });
    });

    describe( 'new FillStyle().copyFrom()' , () =>
    {
        it('new FillStyle().copyFrom(new FillStyle(0xFF0000,1))' , () =>
        {
            let style1 = new FillStyle() ;
            let style2 = new FillStyle(0xFF0000,1) ;
            style1.copyFrom( style2 ) ;
            assert.isTrue( style1.equals(style2) );
        });
    });

    describe( 'new FillStyle().equals()' , () =>
    {
        it('new FillStyle().equals(new FillStyle() === true)' , () =>
        {
            assert.isTrue( new FillStyle().equals(new FillStyle()) );
        });
        it('new FillStyle(0xFF0000,1).equals(new FillStyle(0xFF0000,1) === true)' , () =>
        {
            assert.isTrue( new FillStyle(0xFF0000,1).equals(new FillStyle(0xFF0000,1)) );
        });
        it('new FillStyle(0,1).equals(new FillStyle(0xFF0000,1) === false)' , () =>
        {
            assert.isFalse( new FillStyle(0,1).equals(new FillStyle(0xFF0000,1)) );
        });
        it('new FillStyle(0xFF0000,0).equals(new FillStyle(0xFF0000,1) === false)' , () =>
        {
            assert.isFalse( new FillStyle(0xFF0000,0).equals(new FillStyle(0xFF0000,1)) );
        });
    });

    describe( 'FillStyle.EMPTY' , () =>
    {
        let style = FillStyle.EMPTY ;
        it('style.color === 0' , () => { assert.equal( style.color     , 0 ); });
        it('style.alpha === 0' , () => { assert.equal( style.alpha     , 0 ); });
        it('new FillStyle(0,0).equals(FillStyle.EMPTY)' , () =>
        {
            assert.isTrue( new FillStyle(0,0).equals(FillStyle.EMPTY) );
        });
    });
}) ;
