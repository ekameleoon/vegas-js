"use strict" ;

import { Event } from '../../../src/system/events/Event.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'system.events.Event' , () =>
{
    describe( 'new Event()' , () =>
    {
        let event = new Event() ;

        it('new Event().bubbles === false', () =>
        {
            assert.isFalse( event.bubbles );
        });

        it('new Event().cancelable === false', () =>
        {
            assert.isFalse( event.cancelable );
        });

        it('new Event().currentTarget === null', () =>
        {
            assert.isNull( event.currentTarget );
        });

        it('new Event().eventPhase === 0', () =>
        {
            assert.equal( event.eventPhase , 0 );
        });

        it('new Event().target === null', () =>
        {
            assert.isNull( event.target );
        });

        it('new Event().type === null', () =>
        {
            assert.isNull( event.type );
        });

        it('new Event().isDefaultPrevented() === false', () =>
        {
            assert.isFalse( event.isDefaultPrevented() );
        });

        it('new Event().isImmediatePropagationStopped() === false', () =>
        {
            assert.isFalse( event.isImmediatePropagationStopped() );
        });

        it('new Event().isPropagationStopped() === false', () =>
        {
            assert.isFalse( event.isPropagationStopped() );
        });

        it('new Event().toString() === [Event]', () =>
        {
            assert.equal( event.toString() , "[Event type:null bubbles:false cancelable:false]" );
        });
    });

    describe( 'new Event("click",true,true).clone' , () =>
    {
        let event = new Event("click",true,true) ;
        let clone = event.clone() ;

        it('new Event("click",true,true).clone().bubbles === true', () =>
        {
            assert.isTrue( clone.bubbles );
        });

        it('new Event("click",true,true).clone().cancelable === true', () =>
        {
            assert.isTrue( clone.cancelable );
        });

        it('new Event("click",true,true).clone().currentTarget === null', () =>
        {
            assert.isNull( clone.currentTarget );
        });

        it('new Event("click",true,true).clone().eventPhase === 0', () =>
        {
            assert.equal( clone.eventPhase , 0 );
        });

        it('new Event("click",true,true).clone().target === null', () =>
        {
            assert.isNull( clone.target );
        });

        it('new Event("click",true,true).clone().type === "click"', () =>
        {
            assert.equal( clone.type , 'click' );
        });

        it('new Event("click",true,true).clone().toString() === [Event]', () =>
        {
            assert.equal( event.toString() , "[Event type:click bubbles:true cancelable:true]" );
        });
    });
});
