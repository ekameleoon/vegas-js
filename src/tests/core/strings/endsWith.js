"use strict" ;

import { endsWith } from '../../../core/strings/endsWith.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.strings.endsWith' , () =>
{
    it('endsWith() === false', () =>
    {
        assert.isFalse( endsWith() ) ;
    });
    it('endsWith("hello",null) === false', () =>
    {
        assert.isFalse( endsWith("hello",null) ) ;
    });

    it('endsWith("hello","") === true', () =>
    {
        assert.isTrue( endsWith("hello","") ) ;
    });

    it('endsWith("hello","hello") === true', () =>
    {
        assert.isTrue( endsWith("hello","hello") ) ;
    });

    it('endsWith("hello","o") === true', () =>
    {
        assert.isTrue( endsWith("hello","o") ) ;
    });

    it('endsWith("hello","lo") === true', () =>
    {
        assert.isTrue( endsWith("hello","lo") ) ;
    });

    it('endsWith("hello","h") === false', () =>
    {
        assert.isFalse( endsWith("hello","h") ) ;
    });

    it('endsWith("hello","-") === false', () =>
    {
        assert.isFalse( endsWith("hello","-") ) ;
    });
});
