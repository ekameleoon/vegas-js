"use strict" ;

import { pad } from '../../../src/core/strings/pad.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.strings.pad' , () =>
{
    it('pad() === ""', () =>
    {
        assert.equal( pad() , "" ) ;
    });

    it('pad(null) === ""', () =>
    {
        assert.equal( pad(null) , "" ) ;
    });

    it('pad(1) === ""', () =>
    {
        assert.equal( pad(1) , "" ) ;
    });

    it('pad("hello") === "hello"', () =>
    {
        assert.equal( pad("hello") , "hello" ) ;
    });

    it('pad("hello",8) === "   hello"', () =>
    {
        assert.equal( pad("hello",8) , "   hello" ) ;
    });

    it('pad("hello",-8) === "hello   "', () =>
    {
        assert.equal( pad("hello",-8) , "hello   " ) ;
    });

    it('pad("hello",8,".") === "...hello"', () =>
    {
        assert.equal( pad("hello",8,".") , "...hello" ) ;
    });

    it('pad("hello",-8,".") === "hello..."', () =>
    {
        assert.equal( pad("hello",-8,".") , "hello..." ) ;
    });
});
