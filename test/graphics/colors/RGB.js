"use strict" ;

import { RGB } from 'graphics/colors/RGB.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'graphics.colors.RGB' , () =>
{
    describe( '#constructor' , () =>
    {
        it('new RGB() default', () =>
        {
            let rgb = new RGB() ;
            assert.equal( rgb.r , 0 );
            assert.equal( rgb.g , 0 );
            assert.equal( rgb.b , 0 );
            assert.equal( rgb.valueOf() , 0 );
        });

        it('new RGB(0xFF,0,0)', () =>
        {
            let rgb = new RGB(0xFF,0,0) ;
            assert.equal( rgb.r , 0xFF );
            assert.equal( rgb.g , 0 );
            assert.equal( rgb.b , 0 );
            assert.equal( rgb.valueOf() , 0xFF0000 );
        });

        it('new RGB(0,0xFF,0)', () =>
        {
            let rgb = new RGB(0,0xFF,0) ;
            assert.equal( rgb.r , 0 );
            assert.equal( rgb.g , 0xFF );
            assert.equal( rgb.b , 0 );
            assert.equal( rgb.valueOf() , 0x00FF00 );
        });

        it('new RGB(0,0,0xFF)', () =>
        {
            let rgb = new RGB(0,0,0xFF) ;
            assert.equal( rgb.r , 0 );
            assert.equal( rgb.g , 0 );
            assert.equal( rgb.b , 0xFF );
            assert.equal( rgb.valueOf() , 0x0000FF );
        });

        it('new RGB(0xFF,0xFF,0xFF)', () =>
        {
            let rgb = new RGB(0xFF,0xFF,0xFF) ;
            assert.equal( rgb.r , 0xFF );
            assert.equal( rgb.g , 0xFF );
            assert.equal( rgb.b , 0xFF );
            assert.equal( rgb.valueOf() , 0xFFFFFF );
        });

        it('new RGB(0xA2,0xE3,0xB5)', () =>
        {
            let rgb = new RGB(0xA2,0xE3,0xB5) ;
            assert.equal( rgb.r , 0xA2 );
            assert.equal( rgb.g , 0xE3 );
            assert.equal( rgb.b , 0xB5 );
            assert.equal( rgb.valueOf() , 0xA2E3B5 );
        });
    });

    describe( '#toHexString' , () =>
    {
        let rgb = new RGB(0xA2,0xE3,0xB5) ;
        it('new RGB(0xA2,0xE3,0xB5).toHexString() === #A2E3B5', () =>
        {
            assert.equal( rgb.toHexString() , '#A2E3B5' );
        });

        it('new RGB(0xA2,0xE3,0xB5).toHexString("0x") === 0xA2E3B5', () =>
        {
            assert.equal( rgb.toHexString('0x') , '0xA2E3B5' );
        });

        it('new RGB(0xA2,0xE3,0xB5).toHexString("0x",false) === 0xa2e3b5', () =>
        {
            assert.equal( rgb.toHexString('0x',false) , '0xa2e3b5' );
        });
    });

    describe( '#toString' , () =>
    {
        let rgb = new RGB(0xA2,0xE3,0xB5) ;
        it('new RGB(0xA2,0xE3,0xB5).toString() === [RGB r:162 g:227 b:181 hex:#A2E3B5]', () =>
        {
            assert.equal( rgb.toString() , '[RGB r:162 g:227 b:181 hex:#A2E3B5]' );
        });
    });

    describe( '#valueOf' , () =>
    {
        let rgb = new RGB(0xA2,0xE3,0xB5) ;
        it('new RGB(0xA2,0xE3,0xB5).valueOf() === 0xA2E3B5', () =>
        {
            assert.equal( rgb.valueOf() , 0xA2E3B5 );
        });
    });

    describe( '#fromNumber' , () =>
    {
        it('new RGB().fromNumber(0xA2E3B5).valueOf() === 0xA2E3B5', () =>
        {
            let rgb = new RGB().fromNumber(0xA2E3B5)
            assert.equal( rgb.r , 0xA2 );
            assert.equal( rgb.g , 0xE3 );
            assert.equal( rgb.b , 0xB5 );
            assert.equal( rgb.valueOf() , 0xA2E3B5 );
        });
        it('RGB.fromNumber(0xA2E3B5).valueOf() === 0xA2E3B5', () =>
        {
            let rgb = RGB.fromNumber(0xA2E3B5)
            assert.instanceOf( rgb , RGB );
            assert.equal( rgb.r , 0xA2 );
            assert.equal( rgb.g , 0xE3 );
            assert.equal( rgb.b , 0xB5 );
            assert.equal( rgb.valueOf() , 0xA2E3B5 );
        });
    });

    describe( '#setTo' , () =>
    {
        it('new RGB().setTo(0xA2,0xE3,0xB5).valueOf() === 0xA2E3B5', () =>
        {
            assert.equal( new RGB().setTo(0xA2,0xE3,0xB5).valueOf() , 0xA2E3B5 );
        });
    });
});
