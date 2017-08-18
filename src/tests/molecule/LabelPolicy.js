"use strict" ;

import { LabelPolicy } from '../../molecule/LabelPolicy.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'molecule.LabelPolicy' , () =>
{
    it('LabelPolicy.AUTO === "auto"', () =>
    {
        assert.equal( LabelPolicy.AUTO , 'auto' );
    });

    it('LabelPolicy.NORMAL === "normal"', () =>
    {
        assert.equal( LabelPolicy.NORMAL , 'normal' );
    });
}) ;
