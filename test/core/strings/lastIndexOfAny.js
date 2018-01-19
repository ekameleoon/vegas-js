"use strict" ;

import { lastIndexOfAny } from 'core/strings/lastIndexOfAny.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.strings.lastIndexOfAny' , () =>
{
    it('lastIndexOfAny() === -1', () =>
    {
        assert.equal( lastIndexOfAny() , -1 ) ;
    });

    it('lastIndexOfAny(null) === -1', () =>
    {
        assert.equal( lastIndexOfAny(null) , -1 ) ;
    });

    it('lastIndexOfAny(1) === -1', () =>
    {
        assert.equal( lastIndexOfAny(1) , -1 ) ;
    });

    it('lastIndexOfAny("foo") === -1', () =>
    {
        assert.equal( lastIndexOfAny("foo") , -1 ) ;
    });

    it('lastIndexOfAny("foo","bar") === -1', () =>
    {
        assert.equal( lastIndexOfAny("foo","bar") , -1 ) ;
    });

    it('lastIndexOfAny("foo",[]) === -1', () =>
    {
        assert.equal( lastIndexOfAny("foo",[]) , -1 ) ;
    });

    it('lastIndexOfAny( "hello world" , ["n","i"] ) === -1', () =>
    {
        assert.equal( lastIndexOfAny( "hello world" , ["n","i"] ) , -1 ) ;
    });

    it('lastIndexOfAny( "hello world" , ["h","e","l"]) === 0', () =>
    {
        assert.equal( lastIndexOfAny( "hello world" , ["h","e","l"] ) , 0 ) ;
    });

    it('lastIndexOfAny( "hello world" , ["l","e","h"]) === 9', () =>
    {
        assert.equal( lastIndexOfAny( "hello world" , ["l","e","h"] ) , 9 ) ;
    });

    it('lastIndexOfAny( "hello world" , ["w","a","i","t"] ) === 6', () =>
    {
        assert.equal( lastIndexOfAny( "hello world" , ["w","a","i","t"] ) , 6 ) ;
    });

    it('lastIndexOfAny( "hello world" , ["d","r","a","w"] ) === 10', () =>
    {
        assert.equal( lastIndexOfAny( "hello world" , ["d","r","a","w"] ) , 10 ) ;
    });

    it('lastIndexOfAny( "hello world" , ["l"] ) === 9', () =>
    {
        assert.equal( lastIndexOfAny( "hello world" , ["l"] ) , 9 ) ;
    });

    it('lastIndexOfAny( "hello world" , ["l"] , 9) === 4', () =>
    {
        assert.equal( lastIndexOfAny( "hello world" , ["l"] , 9 ) , 3 ) ;
    });

    it('lastIndexOfAny( "hello world" , ["w"] , 9, 5) === 4', () =>
    {
        assert.equal( lastIndexOfAny( "hello world" , ["w"] , 9 , 5 ) , 6 ) ;
    });
});
