"use strict" ;

import { EventPhase } from '../../../system/events/EventPhase.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'system.events.EventPhase' , () =>
{
    it('EventPhase.NONE === 0', () =>
    {
        assert.equal( EventPhase.NONE , 0 );
    });
    it('EventPhase.AT_TARGET === 2', () =>
    {
        assert.equal( EventPhase.AT_TARGET , 2 );
    });
    it('EventPhase.BUBBLING_PHASE === 3', () =>
    {
        assert.equal( EventPhase.BUBBLING_PHASE , 3 );
    });
    it('EventPhase.CAPTURING_PHASE === 1', () =>
    {
        assert.equal( EventPhase.CAPTURING_PHASE , 1 );
    });
}) ;
