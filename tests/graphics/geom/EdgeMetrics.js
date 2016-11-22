"use strict" ;

import { EdgeMetrics } from '../../../src/graphics/geom/EdgeMetrics.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'graphics.geom.EdgeMetrics' , () =>
{
    describe( '#constructor' , () =>
    {
        describe( 'new EdgeMetrics()' , () =>
        {
            let em = new EdgeMetrics() ;
            it( em + ', left   === 0', () => { assert.equal( em.left , 0 ); });
            it( em + ', top    === 0', () => { assert.equal( em.top  , 0 ); });
            it( em + ', bottom === 0', () => { assert.equal( em.bottom , 0 ); });
            it( em + ', right  === 0', () => { assert.equal( em.right , 0 ); });
        });

        describe( 'new EdgeMetrics(NaN,NaN)' , () =>
        {
            let em = new EdgeMetrics(NaN,NaN,NaN,NaN) ;
            it( em + ', left   === 0', () => { assert.equal( em.left , 0 ); });
            it( em + ', top    === 0', () => { assert.equal( em.top  , 0 ); });
            it( em + ', bottom === 0', () => { assert.equal( em.bottom , 0 ); });
            it( em + ', right  === 0', () => { assert.equal( em.right , 0 ); });
        });

        describe( 'new EdgeMetrics("foo","foo","foo","foo")' , () =>
        {
            let em = new EdgeMetrics("foo","foo") ;
            it( em + ', left   === 0', () => { assert.equal( em.left , 0 ); });
            it( em + ', top    === 0', () => { assert.equal( em.top  , 0 ); });
            it( em + ', bottom === 0', () => { assert.equal( em.bottom , 0 ); });
            it( em + ', right  === 0', () => { assert.equal( em.right , 0 ); });
        });

        describe( 'new EdgeMetrics(5,6,8,2)' , () =>
        {
            let em = new EdgeMetrics(5,6,8,2) ;
            it( em + ', left   === 5', () => { assert.equal( em.left   , 5 ); });
            it( em + ', top    === 6', () => { assert.equal( em.top    , 6 ); });
            it( em + ', right  === 8', () => { assert.equal( em.right  , 8 ); });
            it( em + ', bottom === 2', () => { assert.equal( em.bottom , 2 ); });
        });
    });

    describe( '#horizontal' , () =>
    {
        let em1 = new EdgeMetrics() ;
        let em2 = new EdgeMetrics(1,2,3,4) ;
        it( em1 + '.horizontal === 0', () => { assert.equal( em1.horizontal , 0 ); });
        it( em2 + '.horizontal === 4', () => { assert.equal( em2.horizontal , 4 ); });
    });

    describe( '#vertical' , () =>
    {
        let em1 = new EdgeMetrics() ;
        let em2 = new EdgeMetrics(1,2,3,4) ;
        it( em1 + '.vertical === 0', () => { assert.equal( em1.vertical , 0 ); });
        it( em2 + '.vertical === 6', () => { assert.equal( em2.vertical , 6 ); });
    });

    describe( '#clone()' , () =>
    {
        let em = new EdgeMetrics(10,20,30,40) ;
        let clone = em.clone() ;
        it('new EdgeMetrics(10,20,30,40).clone() is an instance of EdgeMetrics.', () =>
        {
            assert.instanceOf( clone , EdgeMetrics );
        });
        it('new EdgeMetrics(10,20,30,40).clone() is not the same reference.', () =>
        {
            assert.notEqual( clone , em );
        });
        it('new EdgeMetrics(10,20,30,40).clone() has the same left value', () =>
        {
            assert.equal( clone.left , em.left );
        });
        it('new EdgeMetrics(10,20,30,40).clone() has the same top value', () =>
        {
            assert.equal( clone.top , em.top );
        });
        it('new EdgeMetrics(10,20,30,40).clone() has the same right value', () =>
        {
            assert.equal( clone.right , em.right );
        });
        it('new EdgeMetrics(10,20,30,40).clone() has the same bottom value', () =>
        {
            assert.equal( clone.bottom , em.bottom );
        });
    });

    describe( '#equals()' , () =>
    {
        let p1 = new EdgeMetrics(1,2,3,4) ;
        let p2 = new EdgeMetrics(1,2,3,4) ;
        let p3 = new EdgeMetrics(4,3,2,1) ;
        let p4 = new EdgeMetrics() ;

        it( p1 + '.equals(' + p1 + ') === true', () =>
        {
            assert.isTrue( p1.equals(p1) );
        });

        it( p1 + '.equals(' + p2 + ') === true (not the same ref.)', () =>
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
        let p = new EdgeMetrics(1,2,3,4) ;
        let o = p.toObject() ;
        it( p + '.toObject() is a generic object', () =>
        {
            assert.isTrue( o.constructor === Object );
        });
        it( p + '.toObject() left   === 1', () => { assert.equal( o.left   , 1 ); });
        it( p + '.toObject() top    === 2', () => { assert.equal( o.top    , 2 ); });
        it( p + '.toObject() right  === 3', () => { assert.equal( o.right  , 3 ); });
        it( p + '.toObject() bottom === 4', () => { assert.equal( o.bottom , 4 ); });
    });

    describe( '#toString()' , () =>
    {
        it('new EdgeMetrics().toString() === "[EdgeMetrics left:0 top:0 right:0 bottom:0]"', () =>
        {
            assert.equal( new EdgeMetrics().toString() , "[EdgeMetrics left:0 top:0 right:0 bottom:0]" );
        });

        it('new EdgeMetrics(1,2,3,4).toString() === "[EdgeMetrics left:1 top:2 right:3 bottom:4]"', () =>
        {
            assert.equal( new EdgeMetrics(1,2,3,4).toString() , "[EdgeMetrics left:1 top:2 right:3 bottom:4]" );
        });
    });
});
