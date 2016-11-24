"use strict" ;

import { format } from '../../../src/core/strings/format.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.strings.format' , () =>
{
    // ----

    it('format() === ""', () =>
    {
        assert.equal( format() , "" ) ;
    });

    it('format(null) === ""', () =>
    {
        assert.equal( format(null) , "" ) ;
    });

    it('format(1) === ""', () =>
    {
        assert.equal( format(1) , "" ) ;
    });

    // ----

    it('format("{0},{1},{2}" , "apples" , "oranges", "grapes") === "apples,oranges,grapes"', () =>
    {
        assert.equal( format( "{0},{1},{2}" , "apples" , "oranges", "grapes") , "apples,oranges,grapes" ) ;
    });

    it('format("{0},{1},{2}" , ["apples" , "oranges", "grapes"]) === "apples,oranges,grapes"', () =>
    {
        assert.equal( format( "{0},{1},{2}" , ["apples" , "oranges", "grapes"] ) , "apples,oranges,grapes" ) ;
    });

    it('format("{0},{1},{2}" , ["apples" , "oranges"] , "grapes" ) === "apples,oranges,grapes"', () =>
    {
        assert.equal( format( "{0},{1},{2}" , ["apples" , "oranges"] , "grapes" ) , "apples,oranges,grapes" ) ;
    });

    it('format("{path}{0}{name}{1}" , { name : "format" , path:"core.strings" } , "." , "()" ) === "core.strings.format()"', () =>
    {
        assert.equal( format( "{path}{0}{name}{1}" , { name : "format" , path:"core.strings" } , "." , "()" ) , "core.strings.format()" ) ;
    });
});
