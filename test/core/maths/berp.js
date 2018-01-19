"use strict" ;

import { berp } from 'core/maths/berp.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.maths.berp' , () =>
{
    it('berp(0,100,0) === 0' , () =>
    {
        assert.equal( berp(0,100,0) , 0 );
    });

    it('berp(0,100,0.5) === 105.1015801865505' , () =>
    {
        assert.equal( berp(0,100,0.5) , 105.1015801865505 );
    });

    it('berp(0,100,1) === 100' , () =>
    {
        assert.equal( berp(0,100,1) , 100 );
    });
});
