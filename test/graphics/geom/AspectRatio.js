"use strict" ;

import { AspectRatio } from 'graphics/geom/AspectRatio.js' ;
import { Dimension } from 'graphics/geom/Dimension.js' ;
import { isLockable } from 'system/process/Lockable.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'graphics.geom.AspectRatio' , () =>
{
    describe( '#constructor' , () =>
    {
        let dim1 = new AspectRatio() ;
        let dim2 = new AspectRatio(500,400) ;

        it('new AspectRatio() extends Dimension', () =>
        {
            assert.instanceOf( dim1 , Dimension ) ;
        });

        it('new AspectRatio().width === 0', () =>
        {
            assert.equal( dim1.width  , 0 );
        });

        it('new AspectRatio().height === 0', () =>
        {
            assert.equal( dim1.height , 0 );
        });

        it('new AspectRatio(500,400).width === 500', () =>
        {
            assert.equal( dim2.width  , 500 );
        });

        it('new AspectRatio(500,400).heigth === 400', () =>
        {
            assert.equal( dim2.height , 400 );
        });


        it('new AspectRatio("foo","foo").width === 500', () =>
        {
            let dim = new AspectRatio("foo","foo") ;
            assert.equal( dim.width , 0 );
            assert.equal( dim.height , 0 );
        });
    });

    describe( '#gcd' , () =>
    {
        let dim1 = new AspectRatio() ;
        let dim2 = new AspectRatio(320,240) ;
        let dim3 = new AspectRatio(640,480) ;

        it('new AspectRatio().gcd === 0', () =>
        {
            assert.equal( dim1.gcd , 0 ) ;
        });

        it('new AspectRatio(320,240).gcd === 80', () =>
        {
            assert.equal( dim2.gcd , 80 ) ;
        });

        it('new AspectRatio(640,480).gcd === 160', () =>
        {
            assert.equal( dim3.gcd , 160 ) ;
        });
    });

    describe( '#lockable' , () =>
    {
        let dim1 = new AspectRatio() ;
        let dim2 = new AspectRatio(500,400) ;
        let dim3 = new AspectRatio(500,400,true) ;

        it('#isLockable(new AspectRatio()) === true', () =>
        {
            assert.isTrue( isLockable(dim1) );
            assert.isTrue( isLockable(dim2) );
            assert.isTrue( isLockable(dim3) );
        });

        it('new AspectRatio().isLocked() === false', () =>
        {
            assert.isFalse( dim1.isLocked() );
        });

        it('new AspectRatio(500,400).isLocked() === false', () =>
        {
            assert.isFalse( dim2.isLocked() );
        });

        it('new AspectRatio(500,400,true).isLocked() === true', () =>
        {
            assert.isTrue( dim3.isLocked() );
        });
    });

    describe( '#clone()' , () =>
    {
        let dim   = new AspectRatio(10,20) ;
        let clone = dim.clone() ;
        it('new AspectRatio(10,20).clone() is an instance of AspectRatio', () =>
        {
            assert.instanceOf( clone , AspectRatio );
        });
        it('new AspectRatio(10,20).clone() is not the same reference', () =>
        {
            assert.notEqual( clone , dim );
        });
        it('new AspectRatio(10,20).clone() has the same height value', () =>
        {
            assert.equal( clone.height , dim.height );
        });
        it('new AspectRatio(10,20).clone() has the same width value', () =>
        {
            assert.equal( clone.width , dim.width  );
        });
    });

    describe( '#copyFrom()' , () =>
    {
        it('new AspectRatio().copyFrom(10,20) === new AspectRatio(10,20)', () =>
        {
            let dim1 = new AspectRatio() ;
            let dim2 = new AspectRatio(10,20) ;
            let dim3 = dim1.copyFrom( dim2 ) ;
            assert.strictEqual( dim1 , dim3 );
            assert.equal( dim1.width, 10 );
            assert.equal( dim1.height, 20 );
        }) ;
    });

    describe( '#decrease()' , () =>
    {
        it('new AspectRatio(30,20).decrease(10,10) === new AspectRatio(20,10)', () =>
        {
            let dim = new AspectRatio(30,20) ;
            let dec = dim.decrease(10,10) ;
            assert.strictEqual( dim , dec );
            assert.equal( dim.width, 20 );
            assert.equal( dim.height, 10 );
        });
    });

    describe( '#equals()' , () =>
    {
        let dim1 = new AspectRatio(30,20) ;
        let dim2 = new AspectRatio(30,20) ;
        let dim3 = new AspectRatio(30,10) ;
        let dim4 = new AspectRatio(10,20) ;

        it('new AspectRatio(30,20).equals(new AspectRatio(30,20)) === true', () =>
        {
            assert.isTrue( dim1.equals(dim1) );
            assert.isTrue( dim1.equals(dim2) );
        });

        it('new AspectRatio(30,20).equals(new AspectRatio(30,10)) === false', () =>
        {
            assert.isFalse( dim1.equals(dim3) );
        });

        it('new AspectRatio(30,20).equals(new AspectRatio(10,20)) === false', () =>
        {
            assert.isFalse( dim1.equals(dim4) );
        });

        it('new AspectRatio(30,20).equals() === false', () =>
        {
            assert.isFalse( dim1.equals() );
        });

        it('new AspectRatio(30,20).equals(null) === false', () =>
        {
            assert.isFalse( dim1.equals(null) );
        });

        it('new AspectRatio(30,20).equals("foo") === false', () =>
        {
            assert.isFalse( dim1.equals('foo') );
        });
    });

    describe( '#increase()' , () =>
    {
        it('new AspectRatio(30,20).increase(10,10) === new AspectRatio(40,30)', () =>
        {
            let dim = new AspectRatio(30,20) ;
            let dec = dim.increase(10,10) ;
            assert.strictEqual( dim , dec );
            assert.equal( dim.width, 40 );
            assert.equal( dim.height, 30 );
        });
    });

    describe( '#isEmpty()' , () =>
    {
        it('new AspectRatio().isEmpty() === true', () =>
        {
            assert.isTrue( new AspectRatio().isEmpty() );
        }) ;

        it('new AspectRatio().isEmpty(10,0) === true', () =>
        {
            assert.isTrue( new AspectRatio(10,0).isEmpty() );
        }) ;

        it('new AspectRatio().isEmpty(0,10) === true', () =>
        {
            assert.isTrue( new AspectRatio(10,0).isEmpty() );
        }) ;

        it('new AspectRatio().isEmpty(10,10) === false', () =>
        {
            assert.isFalse( new AspectRatio(10,10).isEmpty() );
        }) ;
    });

    describe( '#setTo()' , () =>
    {
        it('new AspectRatio(10,10).setTo() === new AspectRatio(0,0)', () =>
        {
            let dim = new AspectRatio(10,10) ;
            let now = dim.setTo() ;
            assert.strictEqual( dim , now );
            assert.equal( dim.width, 0 );
            assert.equal( dim.height, 0 );
        });

        it('new AspectRatio(10,10).setTo(0,0) === new AspectRatio(0,0)', () =>
        {
            let dim = new AspectRatio(10,10) ;
            let now = dim.setTo(0,0) ;
            assert.strictEqual( dim , now );
            assert.equal( dim.width, 0 );
            assert.equal( dim.height, 0 );
        });

        it('new AspectRatio(10,10).setTo(0,0) === new AspectRatio(0,0)', () =>
        {
            let dim = new AspectRatio(10,10) ;
            let now = dim.setTo(110,240) ;
            assert.strictEqual( dim , now );
            assert.equal( dim.width, 110 );
            assert.equal( dim.height, 240 );
        });
    });

    describe( '#toObject()' , () =>
    {
        it('new AspectRatio(10,10).toObject === { width:10 , height:10 }', () =>
        {
            let dim = new AspectRatio(10,10) ;
            let obj = dim.toObject() ;
            assert.notInstanceOf( obj , AspectRatio );
            assert.isObject( obj );
            assert.equal( obj.width  , 10 );
            assert.equal( obj.height , 10 );
        });
    });

    describe( '#toString(), verbose === false' , () =>
    {
        it('new AspectRatio(0,0).toString() === "0:0"', () =>
        {
            assert.equal( new AspectRatio(0,0).toString() , "0:0" );
        });

        it('new AspectRatio(320,120).toString() === "8:3"', () =>
        {
            assert.equal( new AspectRatio(320,120).toString() , "8:3" );
        });

        it('new AspectRatio(320,240).toString() === "4:3"', () =>
        {
            assert.equal( new AspectRatio(320,240).toString() , "4:3" );
        });

        it('new AspectRatio(640,480).toString() === "4:3"', () =>
        {
            assert.equal( new AspectRatio(640,480).toString() , "4:3" );
        });
    });

    describe( '#toString(), verbose === true' , () =>
    {
        it('new AspectRatio(0,0,false,true).toString() === "[AspectRatio width:0 height:0 ratio:[0:0]]"', () =>
        {
            assert.equal( new AspectRatio(0,0,false,true).toString() , "[AspectRatio width:0 height:0 ratio:[0:0]]" );
        });

        it('new AspectRatio(320,240,false,true).toString() === "[AspectRatio width:320 height:240 ratio:[4:3]]"', () =>
        {
            assert.equal( new AspectRatio(320,240,false,true).toString() , "[AspectRatio width:320 height:240 ratio:[4:3]]" );
        });
    });
});
