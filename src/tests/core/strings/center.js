"use strict" ;

import { center } from '../../../core/strings/center.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.strings.center' , () =>
{
    it('center() === ""', () =>
    {
        assert.equal( center() , "" ) ;
    });

    it('center(null) === ""', () =>
    {
        assert.equal( center(null) , "" ) ;
    });

    it('center(1) === ""', () =>
    {
        assert.equal( center(1) , "" ) ;
    });

    it('center("hello world") === "hello"', () =>
    {
        assert.equal( center("hello world") , "hello world" ) ;
    });

    it('center("hello world") === "hello world"', () =>
    {
        assert.equal( center("hello world") , "hello world" ) ;
    });

    it('center("hello world" , 20 ) === "    hello world    "', () =>
    {
        assert.equal( center("hello world", 20) , "    hello world     " ) ;
    });

    it('center("hello world" , 20 , "_") === "____hello world_____"', () =>
    {
        assert.equal( center("hello world", 20, '_') , "____hello world_____" ) ;
    });
});
