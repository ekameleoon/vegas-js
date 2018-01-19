"use strict" ;

import { CardinalDirection } from 'graphics/CardinalDirection.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'graphics.CardinalDirection' , () =>
{
    describe( 'new CardinalDirection()' , () =>
    {
        it('new CardinalDirection().azimut() === 0', () =>
        {
            let cardinal = new CardinalDirection() ;
            assert.equal( cardinal.azimut() , 0 );
        });

        it('new CardinalDirection().valueOf() === 0', () =>
        {
            let cardinal = new CardinalDirection() ;
            assert.equal( cardinal.valueOf() , 0 );
        });

        it('new CardinalDirection().toString() === ""', () =>
        {
            let cardinal = new CardinalDirection() ;
            assert.equal( cardinal.toString() , "" );
        });
    });

    describe( 'new CardinalDirection(Math.PI/2,"E",90)' , () =>
    {
        it('new CardinalDirection(Math.PI/2,"E",90).azimut() === 90', () =>
        {
            let cardinal = new CardinalDirection(Math.PI/2,"E",90) ;
            assert.equal( cardinal.azimut() , 90 );
        });

        it('new CardinalDirection(Math.PI/2,"E",90).valueOf() === Math.PI/2', () =>
        {
            let cardinal = new CardinalDirection(Math.PI/2,"E",90) ;
            assert.equal( cardinal.valueOf() , Math.PI/2 );
        });

        it('new CardinalDirection(Math.PI/2,"E",90).toString() === "E"', () =>
        {
            let cardinal = new CardinalDirection(Math.PI/2,"E",90) ;
            assert.equal( cardinal.toString() , "E" );
        });
    });

    describe( '#constants' , () =>
    {
        let i = 0 ;
        it('CardinalDirection.E', () =>
        {
            i++ ;
            assert.instanceOf( CardinalDirection.E , CardinalDirection );
            assert.equal( CardinalDirection.E.valueOf()  , Math.PI/2 );
            assert.equal( CardinalDirection.E.toString() , "E"       );
            assert.equal( CardinalDirection.E.azimut()   , 90        );
        });
        it('CardinalDirection.ENE', () =>
        {
            i++ ;
            assert.instanceOf( CardinalDirection.ENE , CardinalDirection );
            assert.equal( CardinalDirection.ENE.valueOf()  , 3*Math.PI/8 );
            assert.equal( CardinalDirection.ENE.toString() , "ENE"       );
            assert.equal( CardinalDirection.ENE.azimut()   , 67.5        );
        });
        it('CardinalDirection.ESE', () =>
        {
            i++ ;
            assert.instanceOf( CardinalDirection.ESE , CardinalDirection );
            assert.equal( CardinalDirection.ESE.valueOf()  , 5*Math.PI/8 );
            assert.equal( CardinalDirection.ESE.toString() , "ESE"       );
            assert.equal( CardinalDirection.ESE.azimut()   , 112.5       );
        });
        it('CardinalDirection.N', () =>
        {
            i++ ;
            assert.instanceOf( CardinalDirection.N , CardinalDirection );
            assert.equal( CardinalDirection.N.valueOf()  , 0   );
            assert.equal( CardinalDirection.N.toString() , "N" );
            assert.equal( CardinalDirection.N.azimut()   , 0   );
        });
        it('CardinalDirection.NE', () =>
        {
            i++ ;
            assert.instanceOf( CardinalDirection.NE , CardinalDirection );
            assert.equal( CardinalDirection.NE.valueOf()  , Math.PI/4 );
            assert.equal( CardinalDirection.NE.toString() , "NE" );
            assert.equal( CardinalDirection.NE.azimut()   , 45   );
        });
        it('CardinalDirection.NNE', () =>
        {
            i++ ;
            assert.equal( CardinalDirection.NNE.valueOf()  , Math.PI/8 );
            assert.equal( CardinalDirection.NNE.toString() , "NNE" );
            assert.equal( CardinalDirection.NNE.azimut()   , 22.5 );
        });
        it('CardinalDirection.NNW', () =>
        {
            i++ ;
            assert.instanceOf( CardinalDirection.NNW , CardinalDirection );
            assert.equal( CardinalDirection.NNW.valueOf()  , 15*Math.PI/8 );
            assert.equal( CardinalDirection.NNW.toString() , "NNW" );
            assert.equal( CardinalDirection.NNW.azimut()   , 337.5 );
        });
        it('CardinalDirection.NW', () =>
        {
            i++ ;
            assert.instanceOf( CardinalDirection.NW , CardinalDirection );
            assert.equal( CardinalDirection.NW.valueOf()  , 7*Math.PI/4 );
            assert.equal( CardinalDirection.NW.toString() , "NW" );
            assert.equal( CardinalDirection.NW.azimut()   , 315 );
        });
        it('CardinalDirection.S', () =>
        {
            i++ ;
            assert.instanceOf( CardinalDirection.S , CardinalDirection );
            assert.equal( CardinalDirection.S.valueOf()  , Math.PI );
            assert.equal( CardinalDirection.S.toString() , "S" );
            assert.equal( CardinalDirection.S.azimut()   , 180 );
        });
        it('CardinalDirection.SE', () =>
        {
            i++ ;
            assert.instanceOf( CardinalDirection.SE , CardinalDirection );
            assert.equal( CardinalDirection.SE.valueOf()  , 3*Math.PI/4 );
            assert.equal( CardinalDirection.SE.toString() , "SE" );
            assert.equal( CardinalDirection.SE.azimut()   , 135 );
        });
        it('CardinalDirection.SSE', () =>
        {
            i++ ;
            assert.instanceOf( CardinalDirection.SSE , CardinalDirection );
            assert.equal( CardinalDirection.SSE.valueOf()  , 7*Math.PI/8 );
            assert.equal( CardinalDirection.SSE.toString() , "SSE" );
            assert.equal( CardinalDirection.SSE.azimut()   , 157.5 );
        });
        it('CardinalDirection.SSW', () =>
        {
            i++ ;
            assert.instanceOf( CardinalDirection.SSW , CardinalDirection );
            assert.equal( CardinalDirection.SSW.valueOf()  , 9*Math.PI/8 );
            assert.equal( CardinalDirection.SSW.toString() , "SSW" );
            assert.equal( CardinalDirection.SSW.azimut()   , 202.5 );
        });
        it('CardinalDirection.SW', () =>
        {
            i++ ;
            assert.instanceOf( CardinalDirection.SW , CardinalDirection );
            assert.equal( CardinalDirection.SW.valueOf()  , 5*Math.PI/4 );
            assert.equal( CardinalDirection.SW.toString() , "SW" );
            assert.equal( CardinalDirection.SW.azimut()   , 225 );
        });
        it('CardinalDirection.W', () =>
        {
            i++ ;
            assert.instanceOf( CardinalDirection.W , CardinalDirection );
            assert.equal( CardinalDirection.W.valueOf()  , 3*Math.PI/2 );
            assert.equal( CardinalDirection.W.toString() , "W" );
            assert.equal( CardinalDirection.W.azimut()   , 270 );
        });
        it('CardinalDirection.WNW', () =>
        {
            i++ ;
            assert.instanceOf( CardinalDirection.WNW , CardinalDirection );
            assert.equal( CardinalDirection.WNW.valueOf()  , 13*Math.PI/8 );
            assert.equal( CardinalDirection.WNW.toString() , "WNW" );
            assert.equal( CardinalDirection.WNW.azimut()   , 292.5 );
        });
        it('CardinalDirection.WSW', () =>
        {
            i++ ;
            assert.instanceOf( CardinalDirection.WSW , CardinalDirection );
            assert.equal( CardinalDirection.WSW.valueOf()  , 11*Math.PI/8 );
            assert.equal( CardinalDirection.WSW.toString() , "WSW" );
            assert.equal( CardinalDirection.WSW.azimut()   , 247.5 );
        });

        it('CardinalDirection.ALL', () =>
        {
            assert.instanceOf( CardinalDirection.ALL , Array );
            assert.lengthOf( CardinalDirection.ALL , i );
            assert.sameMembers( CardinalDirection.ALL , [
                CardinalDirection.N,
                CardinalDirection.E,
                CardinalDirection.S,
                CardinalDirection.W,
                CardinalDirection.NE,
                CardinalDirection.SE,
                CardinalDirection.NW,
                CardinalDirection.SW,
                CardinalDirection.NNE,
                CardinalDirection.NNW,
                CardinalDirection.SSE,
                CardinalDirection.SSW,
                CardinalDirection.ENE,
                CardinalDirection.ESE,
                CardinalDirection.WNW,
                CardinalDirection.WSW
            ]);
        });

        it('CardinalDirection.DIAGONALS', () =>
        {
            assert.instanceOf( CardinalDirection.DIAGONALS , Array );
            assert.lengthOf( CardinalDirection.DIAGONALS , 4 );
            assert.sameMembers( CardinalDirection.DIAGONALS , [
                CardinalDirection.NE,
                CardinalDirection.SE,
                CardinalDirection.NW,
                CardinalDirection.SW
            ]);
        });

        it('CardinalDirection.ORTHOGONALS', () =>
        {
            assert.instanceOf( CardinalDirection.ORTHOGONALS , Array );
            assert.lengthOf( CardinalDirection.ORTHOGONALS , 4 );
            assert.sameMembers( CardinalDirection.ORTHOGONALS , [
                CardinalDirection.N,
                CardinalDirection.E,
                CardinalDirection.S,
                CardinalDirection.W
            ]);
        });
    }) ;

    describe( 'CardinalDirection.isDiagonal' , () =>
    {
        it('CardinalDirection.isDiagonal() == false', () =>
        {
            assert.isFalse( CardinalDirection.isDiagonal() );
        });
        it('CardinalDirection.isDiagonal("foo") == false', () =>
        {
            assert.isFalse( CardinalDirection.isDiagonal("foo") );
        });
        it('CardinalDirection.isDiagonal(CardinalDirection.N) == false', () =>
        {
            assert.isFalse( CardinalDirection.isDiagonal(CardinalDirection.N) );
        });
        it('CardinalDirection.isDiagonal(CardinalDirection.NE) == true', () =>
        {
            assert.isTrue( CardinalDirection.isDiagonal(CardinalDirection.NE) );
        });
        it('CardinalDirection.isDiagonal(CardinalDirection.SE) == true', () =>
        {
            assert.isTrue( CardinalDirection.isDiagonal(CardinalDirection.SE) );
        });
        it('CardinalDirection.isDiagonal(CardinalDirection.NW) == true', () =>
        {
            assert.isTrue( CardinalDirection.isDiagonal(CardinalDirection.NW) );
        });
        it('CardinalDirection.isDiagonal(CardinalDirection.SW) == true', () =>
        {
            assert.isTrue( CardinalDirection.isDiagonal(CardinalDirection.SW) );
        });
    });

    describe( 'CardinalDirection.isOrthogonal' , () =>
    {
        it('CardinalDirection.isOrthogonal() == false', () =>
        {
            assert.isFalse( CardinalDirection.isOrthogonal() );
        });
        it('CardinalDirection.isOrthogonal("foo") == false', () =>
        {
            assert.isFalse( CardinalDirection.isOrthogonal("foo") );
        });
        it('CardinalDirection.isOrthogonal(CardinalDirection.SE) == false', () =>
        {
            assert.isFalse( CardinalDirection.isOrthogonal(CardinalDirection.SE) );
        });
        it('CardinalDirection.isOrthogonal(CardinalDirection.N) == true', () =>
        {
            assert.isTrue( CardinalDirection.isOrthogonal(CardinalDirection.N) );
        });
        it('CardinalDirection.isOrthogonal(CardinalDirection.S) == true', () =>
        {
            assert.isTrue( CardinalDirection.isOrthogonal(CardinalDirection.S) );
        });
        it('CardinalDirection.isOrthogonal(CardinalDirection.W) == true', () =>
        {
            assert.isTrue( CardinalDirection.isOrthogonal(CardinalDirection.W) );
        });
        it('CardinalDirection.isOrthogonal(CardinalDirection.E) == true', () =>
        {
            assert.isTrue( CardinalDirection.isOrthogonal(CardinalDirection.E) );
        });
    });

}) ;
