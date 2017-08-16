"use strict" ;

import { ucWords } from '../../../core/strings/ucWords.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.strings.ucWords' , () =>
{
    it('ucWords() === ""', () =>
    {
        assert.equal( ucWords() , "" ) ;
    });

    it('ucWords(null) === ""', () =>
    {
        assert.equal( ucWords(null) , "" ) ;
    });

    it('ucWords(1) === ""', () =>
    {
        assert.equal( ucWords(1) , "" ) ;
    });

    it('ucWords("foo") === "Foo"', () =>
    {
        assert.equal( ucWords("foo") , "Foo" ) ;
    });

    it('ucWords("hello world") == "Hello World"', () =>
    {
        assert.equal( ucWords("hello world") , "Hello World" ) ;
    });

    it('ucWords("hello-world foo","-") == "Hello-World foo"', () =>
    {
        assert.equal( ucWords("hello-world foo","-") , "Hello-World foo" ) ;
    });
});
