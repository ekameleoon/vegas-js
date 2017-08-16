"use strict" ;

import { latinize } from '../../../core/strings/latinize.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.strings.latinize' , () =>
{
    it('latinize() === ""', () =>
    {
        assert.equal( latinize() , "" ) ;
    });

    it('latinize(null) === ""', () =>
    {
        assert.equal( latinize(null) , "" ) ;
    });

    it('latinize(1) === ""', () =>
    {
        assert.equal( latinize(1) , "" ) ;
    });

    it('latinize("foo") === "foo"', () =>
    {
        assert.equal( latinize("foo") , "foo" ) ;
    });

    it('latinize("ỆᶍǍᶆṔƚÉ áéíóúýčďěňřšťžů") == "ExAmPlE aeiouycdenrstzu"', () =>
    {
        assert.equal( latinize("ỆᶍǍᶆṔƚÉ áéíóúýčďěňřšťžů") , "ExAmPlE aeiouycdenrstzu" ) ;
    });
});
