"use strict" ;

import { Vector2 } from '../../../src/graphics/geom/Vector2.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'graphics.geom.Vector2' , () =>
{
    describe( '#constructor' , () =>
    {
        describe( 'new Vector2()' , () =>
        {
            let point = new Vector2() ;

            it( point + ', x === 0', () =>
            {
                assert.equal( point.x  , 0 );
            });
            it( point + ', y === 0', () =>
            {
                assert.equal( point.y , 0 );
            });
        });

        describe( 'new Vector2(NaN,NaN)' , () =>
        {
            let point = new Vector2(NaN,NaN) ;
            it( 'new Vector2(NaN,NaN), x === 0', () =>
            {
                assert.equal( point.x  , 0 );
            });
            it( 'new Vector2(NaN,NaN), y === 0', () =>
            {
                assert.equal( point.y , 0 );
            });
        });

        describe( 'new Vector2("foo","foo")' , () =>
        {
            let point = new Vector2("foo","foo") ;
            it( 'new Vector2("foo","foo"), x === 0', () =>
            {
                assert.equal( point.x  , 0 );
            });
            it( 'new Vector2("foo","foo"), y === 0', () =>
            {
                assert.equal( point.y , 0 );
            });
        });

        describe( 'new Vector2(500,400)' , () =>
        {
            let point = new Vector2(500,400) ;
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

    describe( '#clone()' , () =>
    {
        let point = new Vector2(10,20) ;
        let clone = point.clone() ;
        it('new Vector2(10,20).clone() is an instance of Vector2.', () =>
        {
            assert.instanceOf( clone , Vector2 );
        });
        it('new Vector2(10,20).clone() is not the same reference.', () =>
        {
            assert.notEqual( clone , point );
        });
        it('new Vector2(10,20).clone() has the same x value', () =>
        {
            assert.equal( clone.x , point.x );
        });
        it('new Vector2(10,20).clone() has the same y value', () =>
        {
            assert.equal( clone.y , point.y  );
        });
    });

    describe( '#equals()' , () =>
    {
        let p1 = new Vector2(30,20) ;
        let p2 = new Vector2(30,20) ;
        let p3 = new Vector2(30,10) ;
        let p4 = new Vector2(10,20) ;

        it('new Vector2(30,20).equals(new Vector2(30,20)) === true', () =>
        {
            assert.isTrue( p1.equals(p1) );
            assert.isTrue( p1.equals(p2) );
        });

        it('new Vector2(30,20).equals(new Vector2(30,10)) === false', () =>
        {
            assert.isFalse( p1.equals(p3) );
        });

        it('new Vector2(30,20).equals(new Vector2(10,20)) === false', () =>
        {
            assert.isFalse( p1.equals(p4) );
        });

        it('new Vector2(30,20).equals() === false', () =>
        {
            assert.isFalse( p1.equals() );
        });

        it('new Vector2(30,20).equals(null) === false', () =>
        {
            assert.isFalse( p1.equals(null) );
        });

        it('new Vector2(30,20).equals("foo") === false', () =>
        {
            assert.isFalse( p1.equals('foo') );
        });
    });

    describe( '#toObject()' , () =>
    {
        let p = new Vector2(10,20) ;
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
        it('new Vector2().toString() === "[Vector2 x:0 y:0]"', () =>
        {
            assert.equal( new Vector2().toString() , "[Vector2 x:0 y:0]" );
        });

        it('new Vector2(100,200).toString() === "[Vector2 x:100 y:200]"', () =>
        {
            assert.equal( new Vector2(100,200).toString() , "[Vector2 x:100 y:200]" );
        });
    });
});
