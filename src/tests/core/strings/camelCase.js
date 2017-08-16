"use strict" ;

import { camelCase } from '../../../core/strings/camelCase.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.strings.camelCase' , () =>
{
    it('camelCase() === ""', () =>
    {
        assert.equal( camelCase() , "" ) ;
    });

    it('camelCase(null) === ""', () =>
    {
        assert.equal( camelCase(null) , "" ) ;
    });

    it('camelCase(1) === ""', () =>
    {
        assert.equal( camelCase(1) , "" ) ;
    });

    it('camelCase("foo") === "foo"', () =>
    {
        assert.equal( camelCase("foo") , "foo" ) ;
    });

    it('camelCase("hello-world") == "helloWorld"', () =>
    {
        assert.equal( camelCase("hello-world") , "helloWorld" ) ;
    });
});
