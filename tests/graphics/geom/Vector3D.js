"use strict" ;

import { round } from '../../../src/core/maths/round.js' ;
import { Vector2D } from '../../../src/graphics/geom/Vector2D.js' ;
import { Vector3D } from '../../../src/graphics/geom/Vector3D.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'graphics.geom.Vector3D' , () =>
{
    describe( '#constructor' , () =>
    {
        describe( 'new Vector3D()' , () =>
        {
            let point = new Vector3D() ;

            it('instance of Vector2D.', () =>
            {
                assert.instanceOf( point , Vector2D );
            });

            it( point + ', x === 0', () =>
            {
                assert.equal( point.x  , 0 );
            });
            it( point + ', y === 0', () =>
            {
                assert.equal( point.y , 0 );
            });
            it( point + ', z === 0', () =>
            {
                assert.equal( point.z , 0 );
            });
            it( point + ', w === 0', () =>
            {
                assert.equal( point.w , 0 );
            });
        });

        describe( 'new Vector3D(NaN,NaN,NaN)' , () =>
        {
            let point = new Vector3D(NaN,NaN,NaN) ;
            it( 'new Vector3D(NaN,NaN,NaN), x === 0', () =>
            {
                assert.equal( point.x  , 0 );
            });
            it( 'new Vector3D(NaN,NaN,NaN), y === 0', () =>
            {
                assert.equal( point.y , 0 );
            });
            it( 'new Vector3D(NaN,NaN,NaN), y === 0', () =>
            {
                assert.equal( point.z , 0 );
            });
            it( point + ', w === 0', () =>
            {
                assert.equal( point.w , 0 );
            });
        });

        describe( 'new Vector3D("foo","foo","foo")' , () =>
        {
            let point = new Vector3D("foo","foo","foo") ;
            it( 'new Vector3D("foo","foo"), x === 0', () =>
            {
                assert.equal( point.x  , 0 );
            });
            it( 'new Vector3D("foo","foo","foo"), y === 0', () =>
            {
                assert.equal( point.y , 0 );
            });
            it( 'new Vector3D("foo","foo","foo"), z === 0', () =>
            {
                assert.equal( point.z , 0 );
            });
            it( point + ', w === 0', () =>
            {
                assert.equal( point.w , 0 );
            });
        });

        describe( 'new Vector3D(500,400,300)' , () =>
        {
            let point = new Vector3D(500,400,300,200) ;
            it( point + ', x === 500', () =>
            {
                assert.equal( point.x , 500 );
            });
            it( point + ', y === 400', () =>
            {
                assert.equal( point.y , 400 );
            });
            it( point + ', z === 300', () =>
            {
                assert.equal( point.z , 300 );
            });
            it( point + ', w === 200', () =>
            {
                assert.equal( point.w , 200 );
            });
        });
    });

    describe( '#clone()' , () =>
    {
        let point = new Vector3D(10,20,30,40) ;
        let clone = point.clone() ;
        it('new Vector3D(10,20,30,40).clone() is an instance of Vector3D.', () =>
        {
            assert.instanceOf( clone , Vector3D );
        });
        it('new Vector3D(10,20,30,40).clone() is not the same reference.', () =>
        {
            assert.notEqual( clone , point );
        });
        it('new Vector3D(10,20,30,40).clone() has the same x value', () =>
        {
            assert.equal( clone.x , point.x );
        });
        it('new Vector3D(10,20,30,40).clone() has the same y value', () =>
        {
            assert.equal( clone.y , point.y  );
        });
        it('new Vector3D(10,20,30,40).clone() has the same z value', () =>
        {
            assert.equal( clone.z , point.z  );
        });
        it('new Vector3D(10,20,30,40).clone() has the same w value', () =>
        {
            assert.equal( clone.w , point.w  );
        });
    });

    describe( '#equals()' , () =>
    {
        let p1 = new Vector3D(30,20,10,5) ;
        let p2 = new Vector3D(30,20,10,5) ;
        let p3 = new Vector3D(30,10,20,1) ;
        let p4 = new Vector3D(10,20,30,4) ;

        it( p1 + '.equals(itselft) === true', () =>
        {
            assert.isTrue( p1.equals(p1) );
        });

        it( p1 + '.equals(' + p2 + ') === true', () =>
        {
            assert.isTrue( p1.equals(p2) );
        });

        it( p1 + '.equals(' + p3 + ') === false', () =>
        {
            assert.isFalse( p1.equals(p3) );
        });

        it( p1 + '.equals(' + p4 + ') === false', () =>
        {
            assert.isFalse( p1.equals(p4) );
        });

        it( p1 + '.equals() === false', () =>
        {
            assert.isFalse( p1.equals() );
        });

        it( p1 + '.equals(null) === false', () =>
        {
            assert.isFalse( p1.equals(null) );
        });

        it( p1 + '.equals("foo") === false', () =>
        {
            assert.isFalse( p1.equals('foo') );
        });
    });

    describe( '#toObject()' , () =>
    {
        let p = new Vector3D(10,20,30,40) ;
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
        it( p + '.toObject() z === 30', () =>
        {
            assert.equal( o.z , 30 );
        });
        it( p + '.toObject() w === 40', () =>
        {
            assert.equal( o.w , 40 );
        });
    });

    describe( '#toString()' , () =>
    {
        it('new Vector3D().toString() === "[Vector3D x:0 y:0 z:0]"', () =>
        {
            assert.equal( new Vector3D().toString() , "[Vector3D x:0 y:0 z:0]" );
        });

        it('new Vector3D(100,200,300).toString() === "[Vector3D x:100 y:200 z:300]"', () =>
        {
            assert.equal( new Vector3D(100,200,300).toString() , "[Vector3D x:100 y:200 z:300]" );
        });
    });

    describe( '#angleBetween()' , () =>
    {
        it('Vector3D.angleBetween(new Vector3D(10,20,30),new Vector3D(1,2,3)) === 0', () =>
        {
            assert.equal( Vector3D.angleBetween(new Vector3D(10,20,30),new Vector3D(1,2,3)) , 0 );
        });
        it('Vector3D.angleBetween(new Vector3D(20,30,40),new Vector3D(45,70,80)) === 0.07245359608858765', () =>
        {
            assert.equal( Vector3D.angleBetween(new Vector3D(20,30,40),new Vector3D(45,70,80)) , 0.07245359608858765 );
        });
    });

    describe( '#distance()' , () =>
    {
        it('Vector3D.distance(new Vector3D(7,4,3),new Vector3D(17,6,2)) === 10.246951', () =>
        {
            assert.equal( Vector3D.distance(new Vector3D(7,4,3),new Vector3D(17,6,2)) , 10.246950765959598 );
        });
    });
});
