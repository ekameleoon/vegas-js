"use strict" ;

import { map } from '../../../src/core/maths/map.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.maths.map' , () =>
{
    it('map(10,0,100,20,80) === 26' , () =>
    {
        assert.equal( map(10,0,100,20,80) , 26 );
    });
    it('map(26,20,80,0,100) === 10' , () =>
    {
        assert.equal( map(26,20,80,0,100) , 10 );
    });
});
