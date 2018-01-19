"use strict" ;

import { isASCII } from 'core/chars/isASCII.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.chars.isASCII' , () =>
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
            it(`isASCII(${element}) === true`, () => { assert.isTrue( isASCII(element) ); });
        }) ;
    });

    describe( '#uppercases' , () =>
    {
        alphas.forEach( ( element ) =>
        {
            element = element.toUpperCase() ;
            it(`isASCII(${element}) === true`, () => { assert.isTrue( isASCII(element) ); });
        }) ;
    });

    describe( '#digits' , () =>
    {
        digits.forEach( ( element ) =>
        {
            it(`isASCII(${element}) === true`, () => { assert.isTrue( isASCII(element) ); });
        }) ;
    });

    it('isASCII("-") === true', () => { assert.isTrue( isASCII("-") ); });
    it('isASCII(" ") === true', () => { assert.isTrue( isASCII(" ") ); });
});
