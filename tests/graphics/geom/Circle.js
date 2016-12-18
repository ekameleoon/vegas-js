"use strict" ;

import { Circle } from '../../../src/graphics/geom/Circle.js' ;
import { Vector2D } from '../../../src/graphics/geom/Vector2D.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'graphics.geom.Circle' , () =>
{
    describe( '#constructor' , () =>
    {
        describe( 'new Circle()' , () =>
        {
            let circle = new Circle() ;

            it( circle + ', instanceof Vector2D', () =>
            {
                assert.instanceOf( circle  , Vector2D );
            });

            it( circle + ', x === 0', () =>
            {
                assert.equal( circle.x  , 0 );
            });
            it( circle + ', y === 0', () =>
            {
                assert.equal( circle.y , 0 );
            });
            it( circle + ', radius === 0', () =>
            {
                assert.equal( circle.radius , 0 );
            });
        });

        describe( 'new Circle(0,0,-10)' , () =>
        {
            let circle = new Circle(0,0,-10) ;
            it( 'new Circle(0,0,-10), radius === 0', () =>
            {
                assert.equal( circle.radius  , 0 );
            });
        });

        describe( 'new Circle(NaN,NaN,NaN)' , () =>
        {
            let circle = new Circle(NaN,NaN,NaN) ;
            it( 'new Circle(NaN,NaN,NaN), x === 0', () =>
            {
                assert.equal( circle.x  , 0 );
            });
            it( 'new Circle(NaN,NaN,NaN), y === 0', () =>
            {
                assert.equal( circle.y , 0 );
            });
            it( 'new Circle(NaN,NaN,NaN), radius === 0', () =>
            {
                assert.equal( circle.radius , 0 );
            });
        });

        describe( 'new Circle("foo","foo","foo")' , () =>
        {
            let circle = new Circle("foo","foo","foo") ;
            it( 'new Circle("foo","foo","foo"), x === 0', () =>
            {
                assert.equal( circle.x , 0 );
            });
            it( 'new Circle("foo","foo","foo"), y === 0', () =>
            {
                assert.equal( circle.y , 0 );
            });
            it( 'new Circle("foo","foo","foo"), radius === 0', () =>
            {
                assert.equal( circle.radius , 0 );
            });
        });

        describe( 'new Circle(500,400,300)' , () =>
        {
            let circle = new Circle(500,400,300) ;
            it( circle + ', x === 500', () =>
            {
                assert.equal( circle.x , 500 );
            });
            it( circle + ', y === 400', () =>
            {
                assert.equal( circle.y , 400 );
            });
            it( circle + ', radius === 300', () =>
            {
                assert.equal( circle.radius , 300 );
            });
        });
    });

    describe( '#clone()' , () =>
    {
        let circle = new Circle(10,20,30) ;
        let clone = circle.clone() ;
        it('new Circle(10,20,30).clone() is an instance of Circle.', () =>
        {
            assert.instanceOf( clone , Circle );
        });
        it('new Circle(10,20,30).clone() is not the same reference.', () =>
        {
            assert.notEqual( clone , circle );
        });
        it('new Circle(10,20,30).clone() has the same x value', () =>
        {
            assert.equal( clone.x , circle.x );
        });
        it('new Circle(10,20,30).clone() has the same y value', () =>
        {
            assert.equal( clone.y , circle.y  );
        });
        it('new Circle(10,20,30).clone() has the same radius value', () =>
        {
            assert.equal( clone.radius , circle.radius );
        });
    });

    describe( '#equals()' , () =>
    {
        let p1 = new Circle(30,20,10) ;
        let p2 = new Circle(30,20,10) ;
        let p3 = new Circle(30,10,20) ;
        let p4 = new Circle(10,20,30) ;

        it('new Circle(30,20,10).equals(new Circle(30,20,10)) === true', () =>
        {
            assert.isTrue( p1.equals(p1) );
            assert.isTrue( p1.equals(p2) );
        });

        it('new Circle(30,20,10).equals(new Circle(30,10,20)) === false', () =>
        {
            assert.isFalse( p1.equals(p3) );
        });

        it('new Circle(30,20,10).equals(new Circle(10,20,30)) === false', () =>
        {
            assert.isFalse( p1.equals(p4) );
        });

        it('new Circle(30,20,10).equals() === false', () =>
        {
            assert.isFalse( p1.equals() );
        });

        it('new Circle(30,20,10).equals(null) === false', () =>
        {
            assert.isFalse( p1.equals(null) );
        });

        it('new Circle(30,20,10).equals("foo") === false', () =>
        {
            assert.isFalse( p1.equals('foo') );
        });
    });

    describe( '#toObject()' , () =>
    {
        let p = new Circle(10,20,30) ;
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
        it( p + '.toObject() radius === 30', () =>
        {
            assert.equal( o.radius , 30 );
        });
    });

    describe( '#toString()' , () =>
    {
        it('new Circle().toString() === "[Circle x:0 y:0 radius:0]"', () =>
        {
            assert.equal( new Circle().toString() , "[Circle x:0 y:0 radius:0]" );
        });

        it('new Circle(100,200,300).toString() === "[Circle x:100 y:200 radius:300]"', () =>
        {
            assert.equal( new Circle(100,200,300).toString() , "[Circle x:100 y:200 radius:300]" );
        });
    });
});
