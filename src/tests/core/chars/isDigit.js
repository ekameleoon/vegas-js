"use strict" ;

import { isDigit } from '../../../core/chars/isDigit.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.chars.isDigit' , () =>
{
    let alphas =
    [
        "a","b","c","d","e","f","g","h","i",
        "j","k","l","m","n","o","p","q","r",
        "s","t","u","v","w","x","y","z"
    ];

    let digits = ["0","1","2","3","4","5","6","7","8","9"] ;

    describe( '#digits' , () =>
    {
        digits.forEach( ( element ) =>
        {
            it(`isDigit(${element}) === true`, () => { assert.isTrue( isDigit(element) ); });
        }) ;
    });

    describe( '#lowercases' , () =>
    {
        alphas.forEach( ( element ) =>
        {
            it(`isDigit(${element}) === false`, () => { assert.isFalse( isDigit(element) ); });
        }) ;
    });

    describe( '#uppercases' , () =>
    {
        alphas.forEach( ( element ) =>
        {
            element = element.toUpperCase() ;
            it(`isDigit(${element}) === false`, () => { assert.isFalse( isDigit(element) ); });
        }) ;
    });

    it('isDigit("-") === false', () => { assert.isFalse( isDigit("-") ); });
    it('isDigit(" ") === false', () => { assert.isFalse( isDigit(" ") ); });
});
