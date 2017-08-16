"use strict" ;

import { Position } from '../../graphics/Position.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'graphics.Position' , () =>
{
    it('Position.ABSOLUTE === "absolute"', () =>
    {
        assert.equal( Position.ABSOLUTE , 'absolute' );
    });

    it('Position.FIXED === "fixed"', () =>
    {
        assert.equal( Position.FIXED , 'fixed' );
    });

    it('Position.NORMAL === "normal"', () =>
    {
        assert.equal( Position.NORMAL , 'normal' );
    });

    it('Position.RELATIVE === "relative"', () =>
    {
        assert.equal( Position.RELATIVE , 'relative' );
    });

    it('Position.STATIC === "static"', () =>
    {
        assert.equal( Position.STATIC , 'static' );
    });
}) ;
