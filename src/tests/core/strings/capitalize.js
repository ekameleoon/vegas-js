"use strict" ;

import { capitalize } from '../../../core/strings/capitalize.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.strings.capitalize' , () =>
{
    it('capitalize() === ""', () =>
    {
        assert.equal( capitalize() , "" ) ;
    });

    it('capitalize(null) === ""', () =>
    {
        assert.equal( capitalize(null) , "" ) ;
    });

    it('capitalize(1) === ""', () =>
    {
        assert.equal( capitalize(1) , "" ) ;
    });

    it('capitalize("hello") === "Hello"', () =>
    {
        assert.equal( capitalize("hello") , "Hello" ) ;
    });

    it('capitalize("hello world") == "Hello World"', () =>
    {
        assert.equal( capitalize("hello world") , "Hello World" ) ;
    });
});
