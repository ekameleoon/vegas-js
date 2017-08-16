"use strict" ;

import { between } from '../../../core/strings/between.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.strings.between' , () =>
{
    it('between() === ""', () =>
    {
        assert.equal( between() , "" ) ;
    });

    it('between(null) === ""', () =>
    {
        assert.equal( between(null) , "" ) ;
    });

    it('between(1) === ""', () =>
    {
        assert.equal( between(1) , "" ) ;
    });

    it('between("hello") === "hello"', () =>
    {
        assert.equal( between("hello") , "hello" ) ;
    });

    it('between("<b>hello</b>","<b>","</b>") === "hello"', () =>
    {
        assert.equal( between("<b>hello</b>" , "<b>" , "</b>") , "hello" ) ;
    });

    it('between("hello {world}","{","}") === "world"', () =>
    {
        assert.equal( between("hello {world}","{","}") , "world" ) ;
    });

    it('between("hello [{world}]","[{","}]") === "world"', () =>
    {
        assert.equal( between("hello [{world}]","[{","}]") , "world" ) ;
    });

    it('between("hello [{world}]","[{","-]") === "world}]"', () =>
    {
        assert.equal( between("hello [{world}]","[{","-]") , "world}]" ) ;
    });

    it('between("hello {world}","{") === "world}"', () =>
    {
        assert.equal( between("hello {world}","{") , "world}" ) ;
    });

    it('between("hello {world}","a") === "hello world"', () =>
    {
        assert.equal( between("hello {world}","{","a") , "world}" ) ;
    });
});
