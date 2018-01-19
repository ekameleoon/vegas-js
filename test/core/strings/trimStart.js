"use strict" ;

import { trimStart } from 'core/strings/trimStart.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.strings.trimStart' , () =>
{
    it('trimStart() === ""', () =>
    {
        assert.equal( trimStart() , "" ) ;
    });

    it('trimStart(null) === ""', () =>
    {
        assert.equal( trimStart(null) , "" ) ;
    });

    it('trimStart(1) === ""', () =>
    {
        assert.equal( trimStart(1) , "" ) ;
    });

    it('trimStart("foo") === "foo"', () =>
    {
        assert.equal( trimStart("foo") , "foo" ) ;
    });

    it('trimStart("\\r\\t   hello world") == "hello world"', () =>
    {
        assert.equal( trimStart("\r\t   hello world") , "hello world" ) ;
    });

    it('trimStart("-_hello world_-",["-","_"]) == "hello world_-"', () =>
    {
        assert.equal( trimStart("-_hello world_-",["-","_"]) , "hello world_-" ) ;
    });
});
