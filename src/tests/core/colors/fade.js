"use strict" ;

import { fade } from '../../../core/colors/fade.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.colors.fade' , () =>
{
    it('fade(0x000000,0xFFFFFF,0) === 0x000000', () => { assert.equal( fade(0x000000,0xFFFFFF,0) , 0x000000 ); });
    it('fade(0x000000,0xFFFFFF,1) === 0xFFFFFF', () => { assert.equal( fade(0x000000,0xFFFFFF,1) , 0xFFFFFF ); });
});
