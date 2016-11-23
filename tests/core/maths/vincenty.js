"use strict" ;

import { vincenty } from '../../../src/core/maths/vincenty.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.maths.vincenty' , () =>
{
    var position1 = { x : 37.422045 , y : -122.084347 } ; // Google HQ
    var position2 = { x : 37.77493  , y : -122.419416 } ; // San Francisco, CA
    it('vincenty(' + position1.x + ',' + position1.y + ',' + position2.x + ',' + position2.y + ') ===  49087.066 m (on Earth)' , () =>
    {
        assert.equal( vincenty(position1.x,position1.y,position2.x,position2.y ) , 49087.066 );
    });
});
