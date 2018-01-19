"use strict" ;

import { EventDispatcher } from 'system/events/EventDispatcher.js' ;
import { IEventDispatcher } from 'system/events/IEventDispatcher.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'system.events.EventDispatcher' , () =>
{
    let dispatcher = new EventDispatcher() ;

    it('dispatcher instanceOf IEventDispatcher', () =>
    {
        assert.instanceOf( dispatcher , IEventDispatcher );
    });

    it('dispatcher instanceOf EventDispatcher', () =>
    {
        assert.instanceOf( dispatcher , EventDispatcher );
    });
});
