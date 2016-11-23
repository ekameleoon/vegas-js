"use strict" ;

import chai from 'chai' ;

import { initialize } from '../../../src/core/arrays/initialize.js' ;

var assert = chai.assert ;

describe( 'core.arrays.initialize' , () =>
{
    it('initialize() === []', () =>
    {
        assert.isArray( initialize() );
        assert.lengthOf( initialize() , 0 );
    })

    it('initialize(0) === []', () =>
    {
        assert.deepEqual( initialize(0) , [] );
    })

    it('initialize(-1) === []', () =>
    {
        assert.deepEqual( initialize(-1) , [] );
    })

    it('initialize(3,0) is Array', () =>
    {
        assert( initialize(3,0) );
    })

    it('initialize(3,0).length === 3', () =>
    {
        assert.equal( initialize(3,0).length , 3 );
    })

    it('initialize(3,0) === [0,0,0]', () =>
    {
        assert.deepEqual( initialize(3,0) , [0,0,0] );
    })

    it('initialize(4) is Array', () =>
    {
        assert( initialize(4) );
    })

    it('initialize(4).length === 4', () =>
    {
        assert.equal( initialize(4).length , 4 );
    })

    it('initialize(4) === [null,null,null,null]', () =>
    {
        assert.deepEqual( initialize(4) , [null,null,null,null] );
    })
});


