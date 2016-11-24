"use strict" ;

import { insert } from '../../../src/core/strings/insert.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.strings.insert' , () =>
{
    it('insert() === ""', () =>
    {
        assert.equal( insert() , "" ) ;
    });

    it('insert(null) === ""', () =>
    {
        assert.equal( insert(null) , "" ) ;
    });

    it('insert(1) === ""', () =>
    {
        assert.equal( insert(1) , "" ) ;
    });

    it('insert("hello") === "hello"', () =>
    {
        assert.equal( insert("hello") , "hello" ) ;
    });

    it('insert("hello",0,"a") === "ahello"', () =>
    {
        assert.equal( insert("hello",0,"a") , "ahello" ) ;
    });

    it('insert("hello",1,"a") === "haello"', () =>
    {
        assert.equal( insert("hello",1,"a") , "haello" ) ;
    });

    it('insert("hello",20,"a") === "helloa"', () =>
    {
        assert.equal( insert("hello",20,"a") , "helloa" ) ;
    });

    it('insert("hello",-1,"a") === "helloa"', () =>
    {
        assert.equal( insert("hello",-1,"a") , "helloa" ) ;
    });

    it('insert("hello",-2,"a") === "hellao"', () =>
    {
        assert.equal( insert("hello",-2,"a") , "hellao" ) ;
    });
});
