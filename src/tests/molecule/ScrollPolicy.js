"use strict" ;

import { ScrollPolicy } from '../../molecule/ScrollPolicy.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'molecule.ScrollPolicy' , () =>
{
    it('ScrollPolicy.AUTO === "auto"', () =>
    {
        assert.equal( ScrollPolicy.AUTO , 'auto' );
    });

    it('ScrollPolicy.OFF === "off"', () =>
    {
        assert.equal( ScrollPolicy.OFF , 'off' );
    });

    it('ScrollPolicy.ON === "on"', () =>
    {
        assert.equal( ScrollPolicy.ON , 'on' );
    });
}) ;
