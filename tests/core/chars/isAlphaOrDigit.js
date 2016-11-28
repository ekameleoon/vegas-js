"use strict" ;

import { isAlphaOrDigit } from '../../../src/core/chars/isAlphaOrDigit.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.chars.isAlphaOrDigit' , () =>
{
    let alphas =
    [
        "a","b","c","d","e","f","g","h","i",
        "j","k","l","m","n","o","p","q","r",
        "s","t","u","v","w","x","y","z"
    ];

    let digits = ["0","1","2","3","4","5","6","7","8","9"] ;

    describe( '#lowercases' , () =>
    {
        alphas.forEach( ( element ) =>
        {
            it(`isAlphaOrDigit(${element}) === true`, () => { assert.isTrue( isAlphaOrDigit(element) ); });
        }) ;
    });

    describe( '#uppercases' , () =>
    {
        alphas.forEach( ( element ) =>
        {
            element = element.toUpperCase() ;
            it(`isAlphaOrDigit(${element}) === true`, () => { assert.isTrue( isAlphaOrDigit(element) ); });
        }) ;
    });

    describe( '#digits' , () =>
    {
        digits.forEach( ( element ) =>
        {
            it(`isAlphaOrDigit(${element}) === true`, () => { assert.isTrue( isAlphaOrDigit(element) ); });
        }) ;
    });

    it('isAlphaOrDigit("-") === false', () => { assert.isFalse( isAlphaOrDigit("-") ); });
    it('isAlphaOrDigit(" ") === false', () => { assert.isFalse( isAlphaOrDigit(" ") ); });
});
