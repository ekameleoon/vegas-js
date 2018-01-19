"use strict" ;

import { EventListener } from 'system/events/EventListener.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'system.events.EventListener' , () =>
{
    let listener = new EventListener() ;

    it('listener.handleEvent()', () =>
    {
        assert.isFunction( listener.handleEvent );
    });

    it('listener.toString() === [EventListener]', () =>
    {
        assert.equal( listener.toString() , '[EventListener]' );
    });
});
