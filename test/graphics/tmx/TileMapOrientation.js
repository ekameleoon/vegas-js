"use strict" ;

import { TileMapOrientation } from 'graphics/tmx/TileMapOrientation.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'graphics.tmx.TileMapOrientation' , () =>
{
    it('TileMapOrientation.HEXAGONAL === "hexagonal"', () =>
    {
        assert.equal( TileMapOrientation.HEXAGONAL , 'hexagonal' );
    });
    it('TileMapOrientation.ISOMETRIC === "isometric"', () =>
    {
        assert.equal( TileMapOrientation.ISOMETRIC , 'isometric' );
    });
    it('TileMapOrientation.ORTHOGONAL === "orthogonal"', () =>
    {
        assert.equal( TileMapOrientation.ORTHOGONAL , 'orthogonal' );
    });
    it('TileMapOrientation.STAGGERED === "staggered"', () =>
    {
        assert.equal( TileMapOrientation.STAGGERED , 'staggered' );
    });
}) ;
