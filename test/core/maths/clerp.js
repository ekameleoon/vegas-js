"use strict" ;

import { clerp } from 'core/maths/clerp.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.maths.clerp' , () =>
{
    it('clerp(0,100,0) === 0' , () =>
    {
        assert.equal( clerp(0,180,0) , 0 );
    });

    it('clerp(0,180,0.5) === 90' , () =>
    {
        assert.equal( clerp(0,180,0.5) , 90 );
    });

    it('clerp(0,100,1) === 100' , () =>
    {
        assert.equal( clerp(0,180,1) , 180 );
    });
});
