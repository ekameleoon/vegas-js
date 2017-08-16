"use strict" ;

import { ZOrder } from '../../graphics/ZOrder.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'graphics.ZOrder' , () =>
{
    it('ZOrder.BACK === 0', () =>
    {
        assert.equal( ZOrder.BACK , 0 );
    });

    it('ZOrder.FRONT === 1', () =>
    {
        assert.equal( ZOrder.FRONT , 1 );
    });
}) ;
