"use strict" ;

import { midPoint } from 'core/maths/midPoint.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.maths.midPoint' , () =>
{
    let pos1 = { x : 34.122222   , y : 118.4111111 } ; // LA
    let pos2 = { x : 40.66972222 , y : 73.94388889 } ; // NYC

    let point = midPoint( pos1.x , pos1.y , pos2.x , pos2.y ) ;

    it('midPoint(' + pos1.x + ',' + pos1.y + ',' + pos2.x + ',' + pos2.y + ').x === 39.547078603870254' , () =>
    {
        assert.equal( point.x , 39.547078603870254 );
    });

    it('midPoint(' + pos1.x + ',' + pos1.y + ',' + pos2.x + ',' + pos2.y + ').y === 97.2015133919303' , () =>
    {
        assert.equal( point.y , 97.2015133919303 );
    });
});
