"use strict" ;

import { ObjectOrder } from 'system/ioc/ObjectOrder.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'system.ioc.ObjectOrder' , () =>
{
    it('ObjectOrder.AFTER === "after"', () =>
    {
        assert.equal( ObjectOrder.AFTER , 'after' );
    });
    it('ObjectOrder.BEFORE === "before"', () =>
    {
        assert.equal( ObjectOrder.BEFORE , 'before' );
    });
    it('ObjectOrder.NONE === "none"', () =>
    {
        assert.equal( ObjectOrder.NONE , 'none' );
    });
    it('ObjectOrder.NOW === "now"', () =>
    {
        assert.equal( ObjectOrder.NOW , 'now' );
    });
}) ;
