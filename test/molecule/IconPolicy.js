"use strict" ;

import { IconPolicy } from 'molecule/IconPolicy.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'molecule.IconPolicy' , () =>
{
    it('IconPolicy.AUTO === "auto"', () =>
    {
        assert.equal( IconPolicy.AUTO , 'auto' );
    });

    it('IconPolicy.NORMAL === "normal"', () =>
    {
        assert.equal( IconPolicy.NORMAL , 'normal' );
    });
}) ;
