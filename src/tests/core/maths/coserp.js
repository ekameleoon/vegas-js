"use strict" ;

import { coserp } from '../../../core/maths/coserp.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.maths.coserp' , () =>
{
    it('coserp(0,100,0) === 0' , () =>
    {
        assert.equal( coserp(0,100,0) , 0 );
    });

    it('coserp(0,100,0.5) === 29.28932188134524' , () =>
    {
        assert.equal( coserp(0,100,0.5) , 29.28932188134524 );
    });

    it('coserp(0,100,1) === 99.99999999999999' , () =>
    {
        assert.equal( coserp(0,100,1) , 99.99999999999999 );
    });
});
