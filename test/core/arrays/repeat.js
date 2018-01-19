"use strict" ;

import { repeat } from 'core/arrays/repeat.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.arrays.repeat' , () =>
{
    it('repeat([1,2,3],NaN) === [1,2,3]', () =>
    {
        assert.deepEqual( repeat([1,2,3],NaN) , [1,2,3]);
    });

    it('repeat([2,3,4],\'hello\') === [2,3,4]', () =>
    {
        assert.deepEqual( repeat([2,3,4],'hello') , [2,3,4] );
    });

    it('repeat([2,3,4],-1) === [2,3,4]', () =>
    {
        assert.deepEqual( repeat([2,3,4],-1) , [2,3,4] );
    });

    it('repeat([2,3,4],0) === [2,3,4]', () =>
    {
        assert.deepEqual( repeat([2,3,4],0) , [2,3,4] );
    });

    it('repeat([2,3,4],3) === [2,3,4,2,3,4,2,3,4]', () =>
    {
        assert.deepEqual( repeat([2,3,4],3) , [2,3,4,2,3,4,2,3,4] );
    });

    it('repeat(null,3) === null', () =>
    {
        assert.isNull( repeat(null,3) );
    });

    it('repeat(\'hello\',3) === null', () =>
    {
        assert.isNull( repeat('hello',3) );
    });
});
