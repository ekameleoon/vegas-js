"use strict" ;

import { fromRGBA } from '../../../src/core/colors/fromRGBA.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.colors.fromRGBA' , () =>
{
    it('fromRGBA(170,170,170,0.6)) ===  0x99AAAAAA', () => { assert.equal( fromRGBA(170,170,170,0.6) , 0x99AAAAAA ); });
});
