"use strict" ;

import { IEventDispatcher } from '../../../src/system/events/IEventDispatcher.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'system.events.IEventDispatcher' , () =>
{
    let dispatcher = new IEventDispatcher() ;

    it('dispatcher.addEventListener', () =>
    {
        assert.isFunction( dispatcher.addEventListener );
    });

    it('dispatcher.dispatchEvent', () =>
    {
        assert.isFunction( dispatcher.dispatchEvent );
    });

    it('dispatcher.hasEventListener', () =>
    {
        assert.isFunction( dispatcher.hasEventListener );
    });

    it('dispatcher.removeEventListener', () =>
    {
        assert.isFunction( dispatcher.removeEventListener );
    });

    it('dispatcher.willTrigger', () =>
    {
        assert.isFunction( dispatcher.willTrigger );
    });
});
