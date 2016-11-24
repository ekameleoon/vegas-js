"use strict" ;

import { startsWith } from '../../../src/core/strings/startsWith.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.strings.startsWith' , () =>
{
    it('startsWith() === false', () =>
    {
        assert.isFalse( startsWith() ) ;
    });
    it('startsWith("hello",null) === false', () =>
    {
        assert.isFalse( startsWith("hello",null) ) ;
    });

    it('startsWith("hello","o") === false', () =>
    {
        assert.isFalse( startsWith("hello","o") ) ;
    });

    it('startsWith("hello","") === true', () =>
    {
        assert.isTrue( startsWith("hello","") ) ;
    });

    it('startsWith("hello","hello") === true', () =>
    {
        assert.isTrue( startsWith("hello","hello") ) ;
    });

    it('startsWith("hello","h") === true', () =>
    {
        assert.isTrue( startsWith("hello","h") ) ;
    });

    it('startsWith("hello","h") === true', () =>
    {
        assert.isTrue( startsWith("hello","h") ) ;
    });
});
