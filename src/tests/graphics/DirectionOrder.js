"use strict" ;

import { DirectionOrder } from '../../graphics/DirectionOrder.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'graphics.DirectionOrder' , () =>
{
    it('DirectionOrder.NORMAL === "normal"', () =>
    {
        assert.equal( DirectionOrder.NORMAL , 'normal' );
    });

    it('DirectionOrder.REVERSE === "reverse"', () =>
    {
        assert.equal( DirectionOrder.REVERSE , 'reverse' );
    });
}) ;
