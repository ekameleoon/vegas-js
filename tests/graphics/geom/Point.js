"use strict" ;

import { Point } from '../../../src/graphics/geom/Point.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'graphics.geom.Point' , () =>
{
    describe( '#constructor' , () =>
    {
        it('new Point().x === 0', () =>
        {
            let point = new Point() ;
            assert.equal( point.x  , 0 );
        });

        it('new Point().y === 0', () =>
        {
            let point = new Point() ;
            assert.equal( point.y , 0 );
        });

        it('new Point(500,400).x === 500', () =>
        {
            let point = new Point(500,400) ;
            assert.equal( point.x , 500 );
        });

        it('new Point(500,400).y === 400', () =>
        {
            let point = new Point(500,400) ;
            assert.equal( point.y , 400 );
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
        assert.isTrue( o.constructor === Object );
        assert.isTrue( Object.getPrototypeOf(o) === Object.prototype );
        assert.equal( o.x , 10 );
        assert.equal( o.y , 20 );
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
