"use strict" ;

import { truncate } from 'core/strings/truncate.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.strings.truncate' , () =>
{
    it('truncate() === ""', () =>
    {
        assert.equal( truncate() , "" ) ;
    });

    it('truncate(null) === ""', () =>
    {
        assert.equal( truncate(null) , "" ) ;
    });

    it('truncate(1) === ""', () =>
    {
        assert.equal( truncate(1) , "" ) ;
    });

    it('truncate("hello") === "..."', () =>
    {
        assert.equal( truncate("hello") , "..." ) ;
    });

    it('truncate("this is some long text",0) === "..."', () =>
    {
        assert.equal( truncate("this is some long text",0) , "..." ) ;
    });

    it('truncate("this is some long text",1) === "..."', () =>
    {
        assert.equal( truncate("this is some long text",1) , "..." ) ;
    });

    it('truncate("this is some long text",2) === "..."', () =>
    {
        assert.equal( truncate("this is some long text",2) , "..." ) ;
    });

    it('truncate("this is some long text",3) === "..."', () =>
    {
        assert.equal( truncate("this is some long text",3) , "..." ) ;
    });

    it('truncate("this is some long text",4) === "this..."', () =>
    {
        assert.equal( truncate("this is some long text",4) , "this..." ) ;
    });

    it('truncate("this is some long text",7) === "this is..."', () =>
    {
        assert.equal( truncate("this is some long text",7) , "this is..." ) ;
    });

    it('truncate("this is some long text",11) === "this is..."', () =>
    {
        assert.equal( truncate("this is some long text",11) , "this is..." ) ;
    });

    it('truncate("this is some long text",12) === "this is some..."', () =>
    {
        assert.equal( truncate("this is some long text",12) , "this is some..." ) ;
    });

    it('truncate("this is some long text",12," etc.") === "this is some, etc."', () =>
    {
        assert.equal( truncate("this is some long text",12,', etc.') , "this is some, etc." ) ;
    });
});
