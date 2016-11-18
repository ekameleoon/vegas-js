"use strict" ;

import { Corner } from '../../src/graphics/Corner.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'graphics.Corner' , () =>
{
    describe( '#constructor' , () =>
    {
        it('new Corner()', () =>
        {
            let corner = new Corner() ;

            assert.property( corner, 'bl' );
            assert.property( corner, 'br' );
            assert.property( corner, 'tl' );
            assert.property( corner, 'tr' );

            assert.isTrue( corner.bl );
            assert.isTrue( corner.br );
            assert.isTrue( corner.tl );
            assert.isTrue( corner.tr );
        });

        it('new Corner(true,true,true,true)', () =>
        {
            let corner = new Corner(true,true,true,true) ;
            assert.isTrue( corner.bl );
            assert.isTrue( corner.br );
            assert.isTrue( corner.tl );
            assert.isTrue( corner.tr );
        });

        it('new Corner(false,true,true,true)', () =>
        {
            let corner = new Corner(false,true,true,true) ;
            assert.isFalse( corner.tl );
            assert.isTrue( corner.tr );
            assert.isTrue( corner.br );
            assert.isTrue( corner.bl );
        });

        it('new Corner(true,false,true,true)', () =>
        {
            let corner = new Corner(true,false,true,true) ;
            assert.isTrue( corner.tl );
            assert.isFalse( corner.tr );
            assert.isTrue( corner.br );
            assert.isTrue( corner.bl );
        });

        it('new Corner(true,true,false,true)', () =>
        {
            let corner = new Corner(true,true,false,true) ;
            assert.isTrue( corner.tl );
            assert.isTrue( corner.tr );
            assert.isFalse( corner.br );
            assert.isTrue( corner.bl );
        });

        it('new Corner(true,true,true,false)', () =>
        {
            let corner = new Corner(true,true,true,false) ;
            assert.isTrue( corner.tl );
            assert.isTrue( corner.tr );
            assert.isTrue( corner.br );
            assert.isFalse( corner.bl );
        });

        it('new Corner(false,false,false,false)', () =>
        {
            let corner = new Corner(false,false,false,false) ;
            assert.isFalse( corner.tl );
            assert.isFalse( corner.tr );
            assert.isFalse( corner.br );
            assert.isFalse( corner.bl );
        });

        it('new Corner("foo","bar","foo","bar")', () =>
        {
            let corner = new Corner("foo","bar","foo","bar") ;
            assert.isFalse( corner.tl );
            assert.isFalse( corner.tr );
            assert.isFalse( corner.br );
            assert.isFalse( corner.bl );
        });
    });

    describe( '#clone()' , () =>
    {
        it('new Corner(true,false,true,false).clone()', () =>
        {
            let corner1 = new Corner(true,false,true,false) ;
            let corner2 = corner1.clone() ;
            assert.notEqual( corner1 , corner2 ) ;
            assert.instanceOf( corner2 , Corner ) ;
            assert.equal( corner1.tl , corner2.tl ) ;
            assert.equal( corner1.tr , corner2.tr ) ;
            assert.equal( corner1.bl , corner2.bl ) ;
            assert.equal( corner1.br , corner2.br ) ;
        });
    });

    describe( '#equals()' , () =>
    {
        it('new Corner(true,false,true,false).equals(new Corner(true,false,true,false)) === true', () =>
        {
            let corner1 = new Corner(true,false,true,false) ;
            let corner2 = new Corner(true,false,true,false) ;
            assert.isTrue( corner1.equals(corner1) ) ;
            assert.isTrue( corner1.equals(corner2) ) ;
        });
        it('new Corner(true,false,true,false).equals(new Corner(false,false,true,false)) === false', () =>
        {
            let corner1 = new Corner(true,false,true,false) ;
            let corner2 = new Corner(false,false,true,false) ;
            assert.isFalse( corner1.equals(corner2) ) ;
        });
        it('new Corner(true,false,true,false).equals(null) === false', () =>
        {
            let corner = new Corner(true,false,true,false) ;
            assert.isFalse( corner.equals(null) ) ;
        });
        it('new Corner(true,false,true,false).equals("fake") === false', () =>
        {
            let corner = new Corner(true,false,true,false) ;
            assert.isFalse( corner.equals("fake") ) ;
        });
    });

    describe( '#toString()' , () =>
    {
        it('new Corner(true,false,true,false).toString()', () =>
        {
            let corner = new Corner(true,false,true,false) ;
            assert.equal( corner.toString() , '[Corner tl:true tr:false br:true bl:false]' ) ;
        });
    });
}) ;
