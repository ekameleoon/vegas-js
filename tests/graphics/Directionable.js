"use strict" ;

import { isDirectionable } from '../../src/graphics/Directionable.js' ;
import { Directionable } from '../../src/graphics/Directionable.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'graphics.isDirectionable' , () =>
{
    it('isDirectionable() === false', () =>
    {
        assert.isFalse( isDirectionable() );
    });

    it('isDirectionable(new Directionable()) === true', () =>
    {
        assert.isTrue( isDirectionable(new Directionable()) );
    });

    it('isDirectionable(o) === true, if o.direction', () =>
    {
        var o = { direction : 'left' } ;
        assert.isTrue( isDirectionable(o) );
    });
}) ;

describe( 'graphics.Directionable' , () =>
{
    var o = new Directionable() ;

    it('new Directionable().direction exist', () =>
    {
        assert.property( o , 'direction' );
    });

    it('new Directionable().direction == null', () =>
    {
        assert.isNull( o.direction );
    });
}) ;
