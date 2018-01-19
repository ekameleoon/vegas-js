"use strict" ;

import { compare } from 'core/strings/compare.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.strings.compare' , () =>
{
    it('compare throws TypeError', () =>
    {
        assert.throws( function(){ compare(1) } , TypeError ) ;
        assert.throws( function(){ compare(1) } , 'Bad arguments, the compare function failed, the first argument must be a string value.' ) ;
    });

    it('compare throws TypeError', () =>
    {
        assert.throws( function(){ compare("",1) } , TypeError ) ;
        assert.throws( function(){ compare("",1) } , 'Bad arguments, the compare function failed, the second argument must be a string value.' ) ;
    });

    it('compare("","") === 0', () =>
    {
        assert.equal( compare("","") , 0 ) ;
    });

    let s0 = "HELLO";
    let s1 = "hello";
    let s2 = "welcome";
    let s3 = "world";

    it('compare("' + s1 + '","' + s2 + '") === -1', () =>
    {
        assert.equal( compare(s1,s2) , -1 ) ;
    });

    it('compare("' + s3 + '","' + s1 + '") === 1', () =>
    {
        assert.equal( compare(s3,s1) , 1 ) ;
    });

    it('compare("' + s1 + '","' + s1 + '") === 0', () =>
    {
        assert.equal( compare(s1,s1) , 0 ) ;
    });

    it('compare("' + s1 + '","' + s0 + '") === 0', () =>
    {
        assert.equal( compare(s1,s0) , 0 ) ;
    });

    it('compare("' + s1 + '","' + s0 + '",true) === -1', () =>
    {
        assert.equal( compare(s1,s0,true) , -1 ) ;
    });

    it('compare("' + s0 + '","' + s1 + '",true) === 1', () =>
    {
        assert.equal( compare(s0,s1,true) , 1 ) ;
    });
});
