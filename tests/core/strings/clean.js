"use strict" ;

import { clean } from '../../../src/core/strings/clean.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.strings.clean' , () =>
{
    it('clean() === ""', () =>
    {
        assert.equal( clean() , "" ) ;
    });

    it('clean(null) === ""', () =>
    {
        assert.equal( clean(null) , "" ) ;
    });

    it('clean(1) === ""', () =>
    {
        assert.equal( clean(1) , "" ) ;
    });

    it('clean("   hello world \\n\\n") === "hello world"', () =>
    {
        assert.equal( clean("   hello world \n\n") , "hello world" ) ;
    });
});
