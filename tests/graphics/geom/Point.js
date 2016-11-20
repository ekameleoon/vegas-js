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
});
