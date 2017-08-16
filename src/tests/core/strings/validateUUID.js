"use strict" ;

import { validateUUID } from '../../../core/strings/validateUUID.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.strings.validateUUID' , () =>
{
    it('validateUUID("c01bfdc3-405c-45a1-9dec-06e6e830bee1") === true', () =>
    {
        assert.isTrue( validateUUID("c01bfdc3-405c-45a1-9dec-06e6e830bee1") ) ;
    });

    it('validateUUID(null) === false', () =>
    {
        assert.isFalse( validateUUID(null) ) ;
    });
    it('validateUUID("foo") === false', () =>
    {
        assert.isFalse( validateUUID("foo") ) ;
    });
    it('validateUUID("c01bfdc3-405c-95a1-9dec-06e6e830bee1") === false', () =>
    {
        assert.isFalse( validateUUID("c01bfdc3-405c-95a1-9dec-06e6e830bee1") ) ;
    });
});
