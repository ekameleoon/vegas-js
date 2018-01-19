"use strict" ;

import { hyphenate } from 'core/strings/hyphenate.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.strings.hyphenate' , () =>
{
    it('hyphenate() === ""', () =>
    {
        assert.equal( hyphenate() , "" ) ;
    });

    it('hyphenate(null) === ""', () =>
    {
        assert.equal( hyphenate(null) , "" ) ;
    });

    it('hyphenate(1) === ""', () =>
    {
        assert.equal( hyphenate(1) , "" ) ;
    });

    it('hyphenate("foo") === "foo"', () =>
    {
        assert.equal( hyphenate("foo") , "foo" ) ;
    });

    it('hyphenate("helloWorld") == "hello-world"', () =>
    {
        assert.equal( hyphenate("helloWorld") , "hello-world" ) ;
    });
});
