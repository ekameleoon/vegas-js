"use strict" ;

import { hypothenuse } from '../../../core/maths/hypothenuse.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.maths.hypothenuse' , () =>
{
    it('hypothenuse(5,12) === 13' , () =>
    {
        assert.equal( hypothenuse(5,12) , 13 );
    });
});
