"use strict" ;

import { Direction } from '../../src/graphics/Direction.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'graphics.Direction' , () =>
{
    it('Direction.BACKWARD === "backward"', () =>
    {
        assert.equal( Direction.BACKWARD , 'backward' );
    });

    it('Direction.BOTH === "both"', () =>
    {
        assert.equal( Direction.BOTH , 'both' );
    });

    it('Direction.DOWN === "down"', () =>
    {
        assert.equal( Direction.DOWN , 'down' );
    });

    it('Direction.FORWARD === "forward"', () =>
    {
        assert.equal( Direction.FORWARD , 'forward' );
    });

    it('Direction.HORIZONTAL === "horizontal"', () =>
    {
        assert.equal( Direction.HORIZONTAL , 'horizontal' );
    });

    it('Direction.LEFT === "left"', () =>
    {
        assert.equal( Direction.LEFT , 'left' );
    });

    it('Direction.NONE === "none"', () =>
    {
        assert.equal( Direction.NONE , 'none' );
    });

    it('Direction.RIGHT === "right"', () =>
    {
        assert.equal( Direction.RIGHT , 'right' );
    });

    it('Direction.UP === "up"', () =>
    {
        assert.equal( Direction.UP , 'up' );
    });

    it('Direction.VERTICAL === "vertical"', () =>
    {
        assert.equal( Direction.VERTICAL , 'vertical' );
    });
}) ;
