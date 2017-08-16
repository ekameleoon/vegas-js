"use strict" ;

import { fromARGB } from '../../../core/colors/fromARGB.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.colors.fromARGB' , () =>
{
    it('fromARGB(0.6,170,170,170)) ===  0x99AAAAAA', () => { assert.equal( fromARGB(0.6,170,170,170) , 0x99AAAAAA ); });
});
