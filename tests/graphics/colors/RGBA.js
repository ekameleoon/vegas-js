"use strict" ;

import { RGBA } from '../../../src/graphics/colors/RGBA.js' ;
import { RGB } from '../../../src/graphics/colors/RGB.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'graphics.colors.RGBA' , () =>
{
    describe( '#extends' , () =>
    {
        it('new RGBA() instanceof RGB', () =>
        {
            assert.instanceOf( new RGBA() , RGB );
        });
    });

    describe( '#constructor' , () =>
    {
        it('new RGBA() default', () =>
        {
            let rgb = new RGBA() ;
            assert.equal( rgb.r , 0 );
            assert.equal( rgb.g , 0 );
            assert.equal( rgb.b , 0 );
            assert.equal( rgb.a , 0 );
        });

        it('new RGBA(0xFF,0,0,1)', () =>
        {
            let rgb = new RGBA(0xFF,0,0,1) ;
            assert.equal( rgb.r , 0xFF );
            assert.equal( rgb.g , 0 );
            assert.equal( rgb.b , 0 );
            assert.equal( rgb.a , 1 );
        });

        it('new RGBA(0,0xFF,0,1)', () =>
        {
            let rgb = new RGBA(0,0xFF,0,1) ;
            assert.equal( rgb.r , 0 );
            assert.equal( rgb.g , 0xFF );
            assert.equal( rgb.b , 0 );
            assert.equal( rgb.a , 1 );
        });

        it('new RGBA(0,0,0xFF,1)', () =>
        {
            let rgb = new RGBA(0,0,0xFF,1) ;
            assert.equal( rgb.r , 0 );
            assert.equal( rgb.g , 0 );
            assert.equal( rgb.b , 0xFF );
            assert.equal( rgb.a , 1 );
        });

        it('new RGBA(0xFF,0xFF,0xFF,0)', () =>
        {
            let rgb = new RGBA(0xFF,0xFF,0xFF) ;
            assert.equal( rgb.r , 0xFF );
            assert.equal( rgb.g , 0xFF );
            assert.equal( rgb.b , 0xFF );
            assert.equal( rgb.a , 0 );
        });

        it('new RGBA(0xA2,0xE3,0xB5,0.5)', () =>
        {
            let rgb = new RGBA(0xA2,0xE3,0xB5,0.5) ;
            assert.equal( rgb.r , 0xA2 );
            assert.equal( rgb.g , 0xE3 );
            assert.equal( rgb.b , 0xB5 );
            assert.equal( rgb.a , 0.5 );
        });

        it('new RGBA(-1,-1,-1,-1)', () =>
        {
            let rgb = new RGBA(-1,-1,-1,-1) ;
            assert.equal( rgb.r , 0);
            assert.equal( rgb.g , 0 );
            assert.equal( rgb.b , 0 );
            assert.equal( rgb.a , 0 );
        });

        it('new RGBA(256,256,256,2)', () =>
        {
            let rgb = new RGBA(256,256,256,2) ;
            assert.equal( rgb.r , 0xFF);
            assert.equal( rgb.g , 0xFF );
            assert.equal( rgb.b , 0xFF );
            assert.equal( rgb.a , 1 );
        });
    });

    describe( '#valueOf' , () =>
    {
        it('new RGBA() === 0', () =>
        {
            assert.equal( new RGBA().valueOf() , 0 );
        });

        it('new RGBA(0xFF,0,0,1).valueOf() === 0xFF0000FF', () =>
        {
            assert.equal( (new RGBA(0xFF,0,0,1)).valueOf() , 0xFF0000FF );
        });

        it('new RGBA(0xA2,0xE3,0xB5,1).valueOf() === 0xA2E3B5FF', () =>
        {
            assert.equal( (new RGBA(0xA2,0xE3,0xB5,1)).valueOf() , 0xA2E3B5FF );
        });
    });

    describe( '#toHexString' , () =>
    {
        let color = new RGBA(0xA2,0xE3,0xB5,1) ;
        it('new RGBA(0xA2,0xE3,0xB5,1).toHexString() === #A2E3B5FF', () =>
        {
            assert.equal( color.toHexString() , '#A2E3B5FF' );
        });

        it('new RGBA(0xA2,0xE3,0xB5,1).toHexString("0x") === 0xA2E3B5FF', () =>
        {
            assert.equal( color.toHexString('0x') , '0xA2E3B5FF' );
        });

        it('new RGBA(0xA2,0xE3,0xB5).toHexString("0x",false) === 0xa2e3b5ff', () =>
        {
            assert.equal( color.toHexString('0x',false) , '0xa2e3b5ff' );
        });
    });

    describe( '#toString' , () =>
    {
        let rgb = new RGBA(0xA2,0xE3,0xB5,0.6) ;
        it('new RGBA(0xA2,0xE3,0xB5,0.6).toString() === [RGBA r:162 g:227 b:181 a:O.6]', () =>
        {
            assert.equal( rgb.toString() , '[RGBA r:162 g:227 b:181 a:0.6]' );
        });
    });

    describe( '#fromNumber' , () =>
    {
        it('new RGBA().fromNumber(0xA2E3B5FF).valueOf() === 0xA2E3B5FF', () =>
        {
            let rgb = new RGBA().fromNumber(0xA2E3B5FF)
            assert.equal( rgb.r , 0xA2 );
            assert.equal( rgb.g , 0xE3 );
            assert.equal( rgb.b , 0xB5 );
            assert.equal( rgb.a , 1 );
        });
    });

    describe( '#setTo' , () =>
    {
        it('new RGBA().setTo(0xA2,0xE3,0xB5,1).valueOf() === 0xA2E3B5FF', () =>
        {
            assert.equal( new RGBA().setTo(0xA2,0xE3,0xB5,1).valueOf() , 0xA2E3B5FF );
        });
    });
});
