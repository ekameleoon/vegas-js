"use strict" ;

import { Dimension } from 'graphics/geom/Dimension.js' ;

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

    describe( '#copyFrom()' , () =>
    {
        it('new Dimension().copyFrom(10,20) === new Dimension(10,20)', () =>
        {
            let dim1 = new Dimension() ;
            let dim2 = new Dimension(10,20) ;
            let dim3 = dim1.copyFrom( dim2 ) ;
            assert.strictEqual( dim1 , dim3 );
            assert.equal( dim1.width, 10 );
            assert.equal( dim1.height, 20 );
        }) ;
    });

    describe( '#decrease()' , () =>
    {
        it('new Dimension(30,20).decrease(10,10) === new Dimension(20,10)', () =>
        {
            let dim = new Dimension(30,20) ;
            let dec = dim.decrease(10,10) ;
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

    describe( '#increase()' , () =>
    {
        it('new Dimension(30,20).increase(10,10) === new Dimension(40,30)', () =>
        {
            let dim = new Dimension(30,20) ;
            let dec = dim.increase(10,10) ;
            assert.strictEqual( dim , dec );
            assert.equal( dim.width, 40 );
            assert.equal( dim.height, 30 );
        });
    });

    describe( '#isEmpty()' , () =>
    {
        it('new Dimension().isEmpty() === true', () =>
        {
            assert.isTrue( new Dimension().isEmpty() );
        }) ;

        it('new Dimension().isEmpty(10,0) === true', () =>
        {
            assert.isTrue( new Dimension(10,0).isEmpty() );
        }) ;

        it('new Dimension().isEmpty(0,10) === true', () =>
        {
            assert.isTrue( new Dimension(10,0).isEmpty() );
        }) ;

        it('new Dimension().isEmpty(10,10) === false', () =>
        {
            assert.isFalse( new Dimension(10,10).isEmpty() );
        }) ;
    });

    describe( '#setTo()' , () =>
    {
        it('new Dimension(10,10).setTo() === new Dimension(0,0)', () =>
        {
            let dim = new Dimension(10,10) ;
            let now = dim.setTo() ;
            assert.strictEqual( dim , now );
            assert.equal( dim.width, 0 );
            assert.equal( dim.height, 0 );
        });

        it('new Dimension(10,10).setTo(0,0) === new Dimension(0,0)', () =>
        {
            let dim = new Dimension(10,10) ;
            let now = dim.setTo(0,0) ;
            assert.strictEqual( dim , now );
            assert.equal( dim.width, 0 );
            assert.equal( dim.height, 0 );
        });

        it('new Dimension(10,10).setTo(0,0) === new Dimension(0,0)', () =>
        {
            let dim = new Dimension(10,10) ;
            let now = dim.setTo(110,240) ;
            assert.strictEqual( dim , now );
            assert.equal( dim.width, 110 );
            assert.equal( dim.height, 240 );
        });
    });

    describe( '#toObject()' , () =>
    {
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
