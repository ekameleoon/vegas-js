"use strict" ;

import { LayoutBufferMode } from 'graphics/LayoutBufferMode.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'graphics.LayoutBufferMode' , () =>
{
    it('LayoutBufferMode.AUTO === "auto"', () =>
    {
        assert.equal( LayoutBufferMode.AUTO , 'auto' );
    });

    it('LayoutBufferMode.NORMAL === "normal"', () =>
    {
        assert.equal( LayoutBufferMode.NORMAL , 'normal' );
    });
}) ;
