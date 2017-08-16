"use strict" ;

import { isAlpha } from '../../../core/chars/isAlpha.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.chars.isAlpha' , () =>
{
    let alphas =
    [
        "a","b","c","d","e","f","g","h","i",
        "j","k","l","m","n","o","p","q","r",
        "s","t","u","v","w","x","y","z"
    ];

    describe( '#lowercase' , () =>
    {
        alphas.forEach( ( element ) =>
        {
            it(`isAlpha(${element}) === true`, () => { assert.isTrue( isAlpha(element) ); });
        }) ;
    });

    describe( '#uppercase' , () =>
    {
        alphas.forEach( ( element ) =>
        {
            element = element.toUpperCase() ;
            it(`isAlpha(${element}) === true`, () => { assert.isTrue( isAlpha(element) ); });
        }) ;
    });

    it('isAlpha("0") === false', () => { assert.isFalse( isAlpha("0") ); });
    it('isAlpha("-") === false', () => { assert.isFalse( isAlpha("-") ); });
    it('isAlpha(" ") === false', () => { assert.isFalse( isAlpha(" ") ); });
});
