"use strict" ;

import { Point }   from '../../../src/graphics/geom/Point.js' ;
import { Vector2 } from '../../../src/graphics/geom/Vector2.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'graphics.geom.Point' , () =>
{
    describe( '#constructor' , () =>
    {
        describe( 'new Point()' , () =>
        {
            let point = new Point() ;
            it( point + ', instanceof Vector2', () =>
            {
                assert.instanceOf( point  , Vector2 );
            });

            it( point + ', x === 0', () =>
            {
                assert.equal( point.x  , 0 );
            });
            it( point + ', y === 0', () =>
            {
                assert.equal( point.y , 0 );
            });
        });

        describe( 'new Point(NaN,NaN)' , () =>
        {
            let point = new Point(NaN,NaN) ;
            it( 'new Point(NaN,NaN), x === 0', () =>
            {
                assert.equal( point.x  , 0 );
            });
            it( 'new Point(NaN,NaN), y === 0', () =>
            {
                assert.equal( point.y , 0 );
            });
        });

        describe( 'new Point("foo","foo")' , () =>
        {
            let point = new Point("foo","foo") ;
            it( 'new Point("foo","foo"), x === 0', () =>
            {
                assert.equal( point.x  , 0 );
            });
            it( 'new Point("foo","foo"), y === 0', () =>
            {
                assert.equal( point.y , 0 );
            });
        });

        describe( 'new Point(500,400)' , () =>
        {
            let point = new Point(500,400) ;
            it( point + ', x === 500', () =>
            {
                assert.equal( point.x , 500 );
            });
            it( point + ', y === 400', () =>
            {
                assert.equal( point.y , 400 );
            });
        });
    });

    describe( '#angle' , () =>
    {
        let p1 = new Point(0,10) ;
        let p2 = new Point(10,10) ;
        it( p1 + '.angle === 90', () =>
        {
            assert.equal( p1.angle , 90 );
        });
        it( p2 + '.angle === 45', () =>
        {
            assert.equal( p2.angle , 45 );
        });
    });

    describe( '#length' , () =>
    {
        let p1 = new Point(0,10) ;
        let p2 = new Point(100,100) ;
        it( p1 + '.length === Math.sqrt(0*0+10*10) : ' + Math.sqrt(0*0+10*10) , () =>
        {
            assert.equal( p1.length , 10 );
            assert.equal( p1.length , Math.sqrt(0*0+10*10) );
        });
        it( p2 + '.length === Math.sqrt(100*100+100*100) : ' + Math.sqrt(100*100+100*100) , () =>
        {
            assert.equal( p2.length , Math.sqrt(100*100+100*100) );
        });
    });

    describe( '#abs()' , () =>
    {
        it('new Point(-10,-20).abs() === new Point(10,20)', () =>
        {
            let p = new Point(-10,-20) ;
            p.abs() ;
            assert.equal( p.x , 10 );
            assert.equal( p.y , 20 );
        });
    });

    describe( '#add()' , () =>
    {
        it('new Point(10,20).add(new Point(10,10)) === new Point(20,30)', () =>
        {
            let p = new Point(10,20) ;
            p.add(new Point(10,10)) ;
            assert.equal( p.x , 20 );
            assert.equal( p.y , 30 );
        });
    });

    describe( '#angleBetween()' , () =>
    {
        var p1 = new Point(0, 100) ;
        var p2 = new Point(100, 0) ;
        var p3 = new Point(0, -100) ;
        var p4 = new Point(-100,0) ;

        it( p1 + '.angleBetween(' + p2 + ') === 90', () =>
        {
            let angle = p1.angleBetween(p2) ;
            assert.equal( angle , 90 );
        });

        it( p1 + '.angleBetween(' + p3 + ') === 180', () =>
        {
            let angle = p1.angleBetween(p3) ;
            assert.equal( angle , 180 );
        });

        it( p1 + '.angleBetween(' + p4 + ') === 90', () =>
        {
            let angle = p1.angleBetween(p4) ;
            assert.equal( angle , 90 );
        });
    });

    describe( '#clone()' , () =>
    {
        let point = new Point(10,20) ;
        let clone = point.clone() ;
        it('new Point(10,20).clone() is an instance of Point.', () =>
        {
            assert.instanceOf( clone , Point );
        });
        it('new Point(10,20).clone() is not the same reference.', () =>
        {
            assert.notEqual( clone , point );
        });
        it('new Point(10,20).clone() has the same x value', () =>
        {
            assert.equal( clone.x , point.x );
        });
        it('new Point(10,20).clone() has the same y value', () =>
        {
            assert.equal( clone.y , point.y  );
        });
    });

    describe( '#cross()' , () =>
    {
        let p1 = new Point(10,20) ;
        let p2 = new Point(40,60) ;
        it( p1 + '.cross(' + p2 + ') === -200', () =>
        {
            assert.equal( p1.cross(p2) , -200 );
        });
    });

    describe( '#dot()' , () =>
    {
        let p1 = new Point(10,20) ;
        let p2 = new Point(40,60) ;
        it( p1 + '.dot(' + p2 + ') === 1600', () =>
        {
            assert.equal( p1.dot(p2) , 1600 );
        });
    });

    describe( '#equals()' , () =>
    {
        let p1 = new Point(30,20) ;
        let p2 = new Point(30,20) ;
        let p3 = new Point(30,10) ;
        let p4 = new Point(10,20) ;

        it('new Point(30,20).equals(new Point(30,20)) === true', () =>
        {
            assert.isTrue( p1.equals(p1) );
            assert.isTrue( p1.equals(p2) );
        });

        it('new Point(30,20).equals(new Point(30,10)) === false', () =>
        {
            assert.isFalse( p1.equals(p3) );
        });

        it('new Point(30,20).equals(new Point(10,20)) === false', () =>
        {
            assert.isFalse( p1.equals(p4) );
        });

        it('new Point(30,20).equals() === false', () =>
        {
            assert.isFalse( p1.equals() );
        });

        it('new Point(30,20).equals(null) === false', () =>
        {
            assert.isFalse( p1.equals(null) );
        });

        it('new Point(30,20).equals("foo") === false', () =>
        {
            assert.isFalse( p1.equals('foo') );
        });
    });

    describe( '#getNormal()' , () =>
    {
        let p = new Point(10,10) ;
        let n = p.getNormal() ;
        it( p + '.getNormal() === ' + n , () =>
        {
            assert.equal( n.x , -10 );
            assert.equal( n.y ,  10 );
        });
    });

    describe( '#getProjectionLength()' , () =>
    {
        let p1 = new Point(10,10) ;
        let p2 = new Point(100,200) ;
        let size = p1.getProjectionLength(p2) ;
        it( p1 + '.getProjectionLength(' + p2 + ') === 0.06' , () =>
        {
            assert.equal( size , 0.06 );
        });
    });

    describe( '#isPerpTo()' , () =>
    {
        let p1 = new Point(0,10) ;
        let p2 = new Point(10,10) ;
        let p3 = new Point(10,0) ;
        it( p1 + '.isPerpTo(' + p2 + ') === false' , () =>
        {
            assert.isFalse( p1.isPerpTo(p2) );
        });
        it( p1 + '.isPerpTo(' + p3 + ') === true' , () =>
        {
            assert.isTrue( p1.isPerpTo(p3) );
        });
    });

    describe( '#max()' , () =>
    {
        let p1 = new Point(10,100) ;
        let p2 = new Point(100,10) ;
        let p3 = p1.max(p2) ;
        it( p1 + '.max(' + p2 + ') === ' + p3 , () =>
        {
            assert.instanceOf( p3 , Point );
            assert.equal( p3.x , 100 ) ;
            assert.equal( p3.y , 100 ) ;
        });
    });

    describe( '#min()' , () =>
    {
        let p1 = new Point(10,100) ;
        let p2 = new Point(100,10) ;
        let p3 = p1.min(p2) ;
        it( p1 + '.min(' + p2 + ') === ' + p3 , () =>
        {
            assert.instanceOf( p3 , Point );
            assert.equal( p3.x , 10 ) ;
            assert.equal( p3.y , 10 ) ;
        });
    });

    describe( '#negate()' , () =>
    {
        let p = new Point(100,200) ;
        it( p + '.negate()' , () =>
        {
            p.negate() ;
            assert.equal( p.x , -100 ) ;
            assert.equal( p.y , -200 ) ;
        });
    });

    describe( '#normalize()' , () =>
    {
        let p = new Point(0,5) ;
        it( p + '.normalize()' , () =>
        {
            p = new Point(0,5) ;
            p.normalize() ;
            assert.equal( p.x , 0 ) ;
            assert.equal( p.y , 1 ) ;
            p = new Point(0,5) ;
        });

        it( p + '.normalize(1)' , () =>
        {
            p = new Point(0,5) ;
            p.normalize(1) ;
            assert.equal( p.x , 0 ) ;
            assert.equal( p.y , 1 ) ;
            p = new Point(0,5) ;
        });

        it( p + '.normalize(NaN)' , () =>
        {
            p = new Point(0,5) ;
            p.normalize(NaN) ;
            assert.equal( p.x , 0 ) ;
            assert.equal( p.y , 1 ) ;
            p = new Point(0,5) ;
        });

        it( p + '.normalize(2)' , () =>
        {
            p = new Point(0,5) ;
            p.normalize(2) ;
            assert.equal( p.x , 0 ) ;
            assert.equal( p.y , 2 ) ;
            p = new Point(0,5) ;
        });
    });

    describe( '#offset()' , () =>
    {
        let p = new Point(100,200) ;
        it( p + '.offset(10,20)' , () =>
        {
            p.offset(10,20) ;
            assert.equal( p.x , 110 ) ;
            assert.equal( p.y , 220 ) ;
        });
    });

    // TODO project
    // TODO rotate

    describe( '#scale()' , () =>
    {
        let p = new Point(10,20) ;
        it( p + '.scale(10)' , () =>
        {
            p.scale(10) ;
            assert.equal( p.x , 100 ) ;
            assert.equal( p.y , 200 ) ;
        });
    });

    describe( '#set()' , () =>
    {
        let p = new Point(50,60) ;
        it( p + '.set()' , () =>
        {
            p.set() ;
            assert.equal( p.x , 0 ) ;
            assert.equal( p.y , 0 ) ;
        });
        it( p + '.set(10,20)' , () =>
        {
            p.set(10,20) ;
            assert.equal( p.x , 10 ) ;
            assert.equal( p.y , 20 ) ;
        });
        it( p + '.set(NaN,NaN)' , () =>
        {
            p.set(NaN,NaN) ;
            assert.equal( p.x , 0 ) ;
            assert.equal( p.y , 0 ) ;
        });
    });

    describe( '#subtract()' , () =>
    {
        it('new Point(10,20).subtract(new Point(10,10)) === new Point(0,10)', () =>
        {
            let p = new Point(10,20) ;
            p.subtract(new Point(10,10)) ;
            assert.equal( p.x , 0 );
            assert.equal( p.y , 10 );
        });
    });

    describe( '#swap()' , () =>
    {
        let p1 = new Point(10,20) ;
        let p2 = new Point(30,40) ;
        it( p1 + '.swap(' + p2  + ')' , () =>
        {
            p1.swap(p2) ;
            assert.equal( p1.x , 30 );
            assert.equal( p1.y , 40 );
            assert.equal( p2.x , 10 );
            assert.equal( p2.y , 20 );
        });
    });

    describe( '#toObject()' , () =>
    {
        let p = new Point(10,20) ;
        let o = p.toObject() ;
        it( p + '.toObject() is a generic object', () =>
        {
            assert.isTrue( o.constructor === Object );
        });
        it( p + '.toObject() x === 10', () =>
        {
            assert.equal( o.x , 10 );
        });
        it( p + '.toObject() y === 20', () =>
        {
            assert.equal( o.y , 20 );
        });
    });

    describe( '#toString()' , () =>
    {
        it('new Point().toString() === "[Point x:0 y:0]"', () =>
        {
            assert.equal( new Point().toString() , "[Point x:0 y:0]" );
        });

        it('new Point(100,200).toString() === "[Point x:100 y:200]"', () =>
        {
            assert.equal( new Point(100,200).toString() , "[Point x:100 y:200]" );
        });
    });

    describe( '#statics' , () =>
    {
        describe( '#distance' , () =>
        {
            it('Point.distance(new Point(10,20),new Point(40,60)) === 50', () =>
            {
                let p1 = new Point(10,20) ;
                let p2 = new Point(40,60) ;
                assert.equal( Point.distance(p1,p2) , 50 );
            });
        });

        describe( '#getMiddle' , () =>
        {
            it('Point.getMiddle(new Point(10,20),new Point(20,20)) === 50', () =>
            {
                let p1 = new Point(10,10) ;
                let p2 = new Point(20,20) ;
                let p3 = Point.getMiddle(p1,p2) ;
                assert.equal( p3.x , 15 );
                assert.equal( p3.y , 15 );
            });
        });

        describe( '#interpolate : between 0 and 1' , () =>
        {
            let p1 = new Point(10,10) ;
            let p2 = new Point(40,40) ;
            let p3 ;

            it('Point.interpolate(new Point(10,10),new Point(40,40),0) === new Point(40,40)', () =>
            {
                p3 = Point.interpolate(p1,p2,0) ;
                assert.instanceOf( p3 , Point );
                assert.equal( p3.x , 40 );
                assert.equal( p3.y , 40 );
                assert.equal( p3 , p2 ) ;
            });

            it('Point.interpolate(new Point(10,10),new Point(40,40),NaN) === new Point(40,40)', () =>
            {
                p3 = Point.interpolate(p1,p2,NaN) ;
                assert.instanceOf( p3 , Point );
                assert.equal( p3.x , 40 );
                assert.equal( p3.y , 40 );
                assert.equal( p3 , p2 ) ;
            });

            it('Point.interpolate(new Point(10,10),new Point(40,40),"foo") === new Point(40,40)', () =>
            {
                p3 = Point.interpolate(p1,p2,"foo") ;
                assert.instanceOf( p3 , Point );
                assert.equal( p3.x , 40 );
                assert.equal( p3.y , 40 );
                assert.equal( p3 , p2 ) ;
            });

            it('Point.interpolate(new Point(10,10),new Point(40,40),-100) === new Point(40,40)', () =>
            {
                p3 = Point.interpolate(p1,p2,-100) ;
                assert.instanceOf( p3 , Point );
                assert.equal( p3.x , 40 );
                assert.equal( p3.y , 40 );
                assert.equal( p3 , p2 ) ;
            });

            it('Point.interpolate(new Point(10,10),new Point(40,40),0.5) === new Point(25,25)', () =>
            {
                p3 =  Point.interpolate(p1,p2,0.5) ;
                assert.instanceOf( p3 , Point );
                assert.notEqual( p3 , p1 );
                assert.notEqual( p3 , p2 );
                assert.equal( p3.x , 25 );
                assert.equal( p3.y , 25 );
            });

            it('Point.interpolate(new Point(10,10),new Point(40,40),1) === new Point(10,10)', () =>
            {
                p3 = Point.interpolate(p1,p2,1) ;
                assert.instanceOf( p3 , Point );
                assert.equal( p3.x , 10 );
                assert.equal( p3.y , 10 );
                assert.equal( p3 , p1 ) ;
            });

            it('Point.interpolate(new Point(10,10),new Point(40,40),2) === new Point(10,10)', () =>
            {
                p3 = Point.interpolate(p1,p2,2) ;
                assert.instanceOf( p3 , Point );
                assert.equal( p3.x , 10 );
                assert.equal( p3.y , 10 );
                assert.equal( p3 , p1 ) ;
            });
        });
    });
});
