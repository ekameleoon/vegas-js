"use strict" ;

import { Matrix } from '../../../src/graphics/geom/Matrix.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'graphics.geom.Matrix' , () =>
{
    describe( '#constructor' , () =>
    {
        describe( 'new Matrix()' , () =>
        {
            let matrix = new Matrix() ;
            it( matrix + '.clone() test a'  , () => { assert.equal( matrix.a  , 1 ); });
            it( matrix + '.clone() test b'  , () => { assert.equal( matrix.b  , 0 ); });
            it( matrix + '.clone() test c'  , () => { assert.equal( matrix.c  , 0 ); });
            it( matrix + '.clone() test d'  , () => { assert.equal( matrix.d  , 1 ); });
            it( matrix + '.clone() test tx' , () => { assert.equal( matrix.tx , 0 ); });
            it( matrix + '.clone() test ty' , () => { assert.equal( matrix.ty , 0 ); });
        });

        describe( 'new Matrix(NaN,NaN,NaN,NaN,NaN,NaN)' , () =>
        {
            let matrix = new Matrix(NaN,NaN,NaN,NaN,NaN,NaN) ;
            it( matrix + '.clone() test a'  , () => { assert.equal( matrix.a  , 0 ); });
            it( matrix + '.clone() test b'  , () => { assert.equal( matrix.b  , 0 ); });
            it( matrix + '.clone() test c'  , () => { assert.equal( matrix.c  , 0 ); });
            it( matrix + '.clone() test d'  , () => { assert.equal( matrix.d  , 0 ); });
            it( matrix + '.clone() test tx' , () => { assert.equal( matrix.tx , 0 ); });
            it( matrix + '.clone() test ty' , () => { assert.equal( matrix.ty , 0 ); });
        });

        describe( 'new Matrix("foo","foo","foo","foo","foo","foo")' , () =>
        {
            let matrix = new Matrix("foo","foo","foo","foo","foo","foo") ;
            it( matrix + '.clone() test a'  , () => { assert.equal( matrix.a  , 0 ); });
            it( matrix + '.clone() test b'  , () => { assert.equal( matrix.b  , 0 ); });
            it( matrix + '.clone() test c'  , () => { assert.equal( matrix.c  , 0 ); });
            it( matrix + '.clone() test d'  , () => { assert.equal( matrix.d  , 0 ); });
            it( matrix + '.clone() test tx' , () => { assert.equal( matrix.tx , 0 ); });
            it( matrix + '.clone() test ty' , () => { assert.equal( matrix.ty , 0 ); });
        });
    });

    describe( '#clone()' , () =>
    {
        let matrix = new Matrix() ;
        let clone = matrix.clone() ;
        it( matrix + '.clone() is an instance of Matrix.', () =>
        {
            assert.instanceOf( clone , Matrix );
        });
        it( matrix + '.clone() is not the same reference.', () =>
        {
            assert.notEqual( clone , matrix );
        });
        it( matrix + '.clone() test a'  , () => { assert.equal( matrix.a  , clone.a ); });
        it( matrix + '.clone() test b'  , () => { assert.equal( matrix.b  , clone.b ); });
        it( matrix + '.clone() test c'  , () => { assert.equal( matrix.c  , clone.c ); });
        it( matrix + '.clone() test d'  , () => { assert.equal( matrix.d  , clone.d ); });
        it( matrix + '.clone() test tx' , () => { assert.equal( matrix.tx , clone.tx ); });
        it( matrix + '.clone() test ty' , () => { assert.equal( matrix.ty , clone.ty ); });
    });

    describe( '#equals()' , () =>
    {
        let m0 = new Matrix() ;
        let m1 = new Matrix(2,2,2,2,2,2) ;
        let m2 = new Matrix(2,2,2,2,2,2) ;
        let m3 = new Matrix(3,3,3,3,3,3) ;

        it( m1 + '.equals(' + m1 + ') === true', () =>
        {
            assert.isTrue( m1.equals(m1) );
            assert.isTrue( m1.equals(m2) );
        });

        it( m1 + '.equals(' + m3 + ') === false', () =>
        {
            assert.isFalse( m1.equals(m3) );
        });

        it('new Matrix().equals() === false', () =>
        {
            assert.isFalse( m0.equals() );
        });

        it('new Matrix().equals(null) === false', () =>
        {
            assert.isFalse( m0.equals(null) );
        });

        it('new Matrix().equals("foo") === false', () =>
        {
            assert.isFalse( m0.equals('foo') );
        });
    });

    describe( '#toObject()' , () =>
    {
        let p = new Matrix(2,2,2,2,2,2) ;
        let o = p.toObject() ;
        it( p + '.toObject() is a generic object', () =>
        {
            assert.isTrue( o.constructor === Object );
        });
        it( p + '.toObject() a === 2', () => { assert.equal( o.a , 2 ); });
        it( p + '.toObject() b === 2', () => { assert.equal( o.b , 2 ); });
        it( p + '.toObject() c === 2', () => { assert.equal( o.c , 2 ); });
        it( p + '.toObject() d === 2', () => { assert.equal( o.d , 2 ); });
        it( p + '.toObject() tx === 2', () => { assert.equal( o.tx , 2 ); });
        it( p + '.toObject() ty === 2', () => { assert.equal( o.ty , 2 ); });
    });

    describe( '#toString()' , () =>
    {
        it('new Matrix().toString() === "[Matrix a:1 b:0 c:0 d:1 tx:0 ty:0]"', () =>
        {
            assert.equal( new Matrix().toString() , "[Matrix a:1 b:0 c:0 d:1 tx:0 ty:0]" );
        });

        it('new Matrix(2,2,2,2,2,2).toString() === "[Matrix a:2 b:2 c:2 d:2 tx:2 ty:2]"', () =>
        {
            assert.equal( new Matrix(2,2,2,2,2,2).toString() , "[Matrix a:2 b:2 c:2 d:2 tx:2 ty:2]" );
        });
    });
});
