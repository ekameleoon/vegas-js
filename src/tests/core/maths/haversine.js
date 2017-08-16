"use strict" ;

import { haversine } from '../../../core/maths/haversine.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.maths.haversine' , () =>
{
    var position1 = { x : 37.422045 , y : -122.084347 } ; // Google HQ
    var position2 = { x : 37.77493  , y : -122.419416 } ; // San Francisco, CA
    it('haversine(' + position1.x + ',' + position1.y + ',' + position2.x + ',' + position2.y + ') ===  49103.007 m (on Earth)' , () =>
    {
        assert.equal( haversine(position1.x,position1.y,position2.x,position2.y ) , 49103.007 );
    });

    it('haversine(' + position1.x + ',' + position1.y + ',' + position2.x + ',' + position2.y + ',3390) ===  26.128 m (on Mars)' , () =>
    {
        assert.equal( haversine(position1.x,position1.y,position2.x,position2.y,3390),26.128 );
    });
});
