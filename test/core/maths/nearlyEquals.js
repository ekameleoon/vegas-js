"use strict" ;

import { nearlyEquals } from 'core/maths/nearlyEquals.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.maths.nearlyEquals' , () =>
{
    it('nearlyEquals(1,1) === true' , () =>
    {
        assert.isTrue( nearlyEquals(1,1) ) ;
    });

    it('nearlyEquals(1,1.000001) === true' , () =>
    {
        assert.isTrue( nearlyEquals(1,1.000001) ) ;
    });

    it('nearlyEquals(1,1.1) === false' , () =>
    {
        assert.isFalse( nearlyEquals(1,1.1) ) ;
    });

    it('nearlyEquals(1,1.01,0.1) === true' , () =>
    {
        assert.isTrue( nearlyEquals(1,1.01,0.1) ) ;
    });
});
