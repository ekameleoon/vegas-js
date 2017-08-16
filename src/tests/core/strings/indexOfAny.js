"use strict" ;

import { indexOfAny } from '../../../core/strings/indexOfAny.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.strings.indexOfAny' , () =>
{
    it('indexOfAny() === -1', () =>
    {
        assert.equal( indexOfAny() , -1 ) ;
    });

    it('indexOfAny(null) === -1', () =>
    {
        assert.equal( indexOfAny(null) , -1 ) ;
    });

    it('indexOfAny(1) === -1', () =>
    {
        assert.equal( indexOfAny(1) , -1 ) ;
    });

    it('indexOfAny("foo") === -1', () =>
    {
        assert.equal( indexOfAny("foo") , -1 ) ;
    });

    it('indexOfAny("foo","bar") === -1', () =>
    {
        assert.equal( indexOfAny("foo","bar") , -1 ) ;
    });

    it('indexOfAny("foo",[]) === -1', () =>
    {
        assert.equal( indexOfAny("foo",[]) , -1 ) ;
    });

    it('indexOfAny( "hello world" , ["h","e","l"]) === 0', () =>
    {
        assert.equal( indexOfAny( "hello world" , ["h","e","l"] ) , 0 ) ;
    });

    it('indexOfAny( "hello world" , ["d"]) === 11', () =>
    {
        assert.equal( indexOfAny( "hello world" , ["d"] ) , 10 ) ;
    });

    it('indexOfAny( "hello world" , ["w","a","i","t"] ) === 6', () =>
    {
        assert.equal( indexOfAny( "hello world" , ["w","a","i","t"] ) , 6 ) ;
    });

    it('indexOfAny( "hello world" , ["n","i"] ) === -1', () =>
    {
        assert.equal( indexOfAny( "hello world" , ["n","i"] ) , -1 ) ;
    });
});
