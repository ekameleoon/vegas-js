"use strict" ;

import { TileMapRenderOrder } from '../../../src/graphics/tmx/TileMapRenderOrder.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'graphics.tmx.TileMapRenderOrder' , () =>
{
    it('TileMapRenderOrder.LEFT_DOWN === "left-down"', () =>
    {
        assert.equal( TileMapRenderOrder.LEFT_DOWN , 'left-down' );
    });
    it('TileMapRenderOrder.LEFT_UP === "left-up"', () =>
    {
        assert.equal( TileMapRenderOrder.LEFT_UP , 'left-up' );
    });
    it('TileMapRenderOrder.RIGHT_DOWN === "right-down"', () =>
    {
        assert.equal( TileMapRenderOrder.RIGHT_DOWN , 'right-down' );
    });
    it('TileMapRenderOrder.RIGHT_UP === "right-up"', () =>
    {
        assert.equal( TileMapRenderOrder.RIGHT_UP , 'right-up' );
    });
}) ;
