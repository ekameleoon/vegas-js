/*jshint bitwise: false*/
"use strict" ;

import { ArcType } from '../../src/graphics/ArcType.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'graphics.ArcType' , () =>
{
    it('ArcType.CHORD === "chord"', () =>
    {
        assert.equal( ArcType.CHORD , 'chord' );
    });

    it('ArcType.NONE === "none"', () =>
    {
        assert.equal( ArcType.NONE , 'none' );
    });

    it('ArcType.PIE === "pie"', () =>
    {
        assert.equal( ArcType.PIE , 'pie' );
    });
}) ;
