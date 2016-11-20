"use strict" ;

import { Dimension } from '../../../src/graphics/geom/Dimension.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'graphics.geom.Dimension' , () =>
{
    describe( '#constructor' , () =>
    {
        it('new Dimension().width === 0', () =>
        {
            let dim = new Dimension() ;
            assert.equal( dim.width  , 0 );
        });

        it('new Dimension().height === 0', () =>
        {
            let dim = new Dimension() ;
            assert.equal( dim.height , 0 );
        });

        it('new Dimension(500,400).width === 500', () =>
        {
            let dim = new Dimension(500,400) ;
            assert.equal( dim.width  , 500 );
        });

        it('new Dimension(500,400).heigth === 400', () =>
        {
            let dim = new Dimension(500,400) ;
            assert.equal( dim.height , 400 );
        });

        it('new Dimension(new Dimension())', () =>
        {
            let dim = new Dimension(new Dimension()) ;
            assert.equal( dim.width  , 0 );
            assert.equal( dim.height , 0 );
        });

        it('new Dimension(new Dimension(10,20))', () =>
        {
            let dim = new Dimension(new Dimension(10,20)) ;
            assert.equal( dim.width  , 10 );
            assert.equal( dim.height , 20 );
        });
    });

    describe( '#clone()' , () =>
    {
        let dim   = new Dimension(10,20) ;
        let clone = dim.clone() ;
        it('new Dimension(10,20).clone() is an instance of Dimension.', () =>
        {
            assert.instanceOf( clone , Dimension );
        });
        it('new Dimension(10,20).clone() is not the same reference.', () =>
        {
            assert.notEqual( clone , dim );
        });
        it('new Dimension(10,20).clone() has the same height value', () =>
        {
            assert.equal( clone.height , dim.height );
        });
        it('new Dimension(10,20).clone() has the same width value', () =>
        {
            assert.equal( clone.width  , dim.width  );
        });
    });

    describe( '#decrease()' , () =>
    {
        it('new Dimension(30,20).decrease(new Dimension(10,10)) === new Dimension(20,10)', () =>
        {
            let dim = new Dimension(30,20) ;
            let dec = dim.decrease(10,10) ;
            assert.strictEqual( dim , dec );
            assert.equal( dim.width, 20 );
            assert.equal( dim.height, 10 );
        });
        it('new Dimension(30,20).decrease(new Dimension(10,10)) === new Dimension(20,10)', () =>
        {
            let dim = new Dimension(30,20) ;
            let dec = dim.decrease(new Dimension(10,10)) ;
            assert.strictEqual( dim , dec );
            assert.equal( dim.width, 20 );
            assert.equal( dim.height, 10 );
        });
    });

    describe( '#equals()' , () =>
    {
        let dim1 = new Dimension(30,20) ;
        let dim2 = new Dimension(30,20) ;
        let dim3 = new Dimension(30,10) ;
        let dim4 = new Dimension(10,20) ;

        it('new Dimension(30,20).equals(new Dimension(30,20)) === true', () =>
        {
            assert.isTrue( dim1.equals(dim1) );
            assert.isTrue( dim1.equals(dim2) );
        });

        it('new Dimension(30,20).equals(new Dimension(30,10)) === false', () =>
        {
            assert.isFalse( dim1.equals(dim3) );
        });

        it('new Dimension(30,20).equals(new Dimension(10,20)) === false', () =>
        {
            assert.isFalse( dim1.equals(dim4) );
        });

        it('new Dimension(30,20).equals() === false', () =>
        {
            assert.isFalse( dim1.equals() );
        });

        it('new Dimension(30,20).equals(null) === false', () =>
        {
            assert.isFalse( dim1.equals(null) );
        });

        it('new Dimension(30,20).equals("foo") === false', () =>
        {
            assert.isFalse( dim1.equals('foo') );
        });
    });

    // describe( '#getBounds()' , () =>
    // {
    //
    // });

    describe( '#increase()' , () =>
    {
        it('new Dimension(30,20).increase(new Dimension(10,10)) === new Dimension(40,30)', () =>
        {
            let dim = new Dimension(30,20) ;
            let dec = dim.increase(10,10) ;
            assert.strictEqual( dim , dec );
            assert.equal( dim.width, 40 );
            assert.equal( dim.height, 30 );
        });
        it('new Dimension(30,20).decrease(new Dimension(10,10)) === new Dimension(40,30)', () =>
        {
            let dim = new Dimension(30,20) ;
            let dec = dim.increase(new Dimension(10,10)) ;
            assert.strictEqual( dim , dec );
            assert.equal( dim.width, 40 );
            assert.equal( dim.height, 30 );
        });
    });

    describe( '#setSize()' , () =>
    {
        it('new Dimension(10,10).setSize() === new Dimension(0,0)', () =>
        {
            let dim = new Dimension(10,10) ;
            let now = dim.setSize() ;
            assert.strictEqual( dim , now );
            assert.equal( dim.width, 0 );
            assert.equal( dim.height, 0 );
        });

        it('new Dimension(10,10).setSize(0,0) === new Dimension(0,0)', () =>
        {
            let dim = new Dimension(10,10) ;
            let now = dim.setSize(0,0) ;
            assert.strictEqual( dim , now );
            assert.equal( dim.width, 0 );
            assert.equal( dim.height, 0 );
        });

        it('new Dimension(10,10).setSize(0,0) === new Dimension(0,0)', () =>
        {
            let dim = new Dimension(10,10) ;
            let now = dim.setSize(110,240) ;
            assert.strictEqual( dim , now );
            assert.equal( dim.width, 110 );
            assert.equal( dim.height, 240 );
        });

        it('new Dimension(10,10).toObject === { width:10 , height:10 }', () =>
        {
            let dim = new Dimension(10,10) ;
            let obj = dim.toObject() ;
            assert.notInstanceOf( obj , Dimension );
            assert.isObject( obj );
            assert.equal( obj.width  , 10 );
            assert.equal( obj.height , 10 );
        });
    });

    describe( '#toString()' , () =>
    {
        it('new Dimension().toString() === "[Dimension width:0 height:0]"', () =>
        {
            assert.equal( new Dimension().toString() , "[Dimension width:0 height:0]" );
        });

        it('new Dimension(100,200).toString() === "[Dimension width:100 height:200]"', () =>
        {
            assert.equal( new Dimension(100,200).toString() , "[Dimension width:100 height:200]" );
        });
    });
});
