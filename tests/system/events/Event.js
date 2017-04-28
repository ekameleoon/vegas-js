"use strict" ;

import { ValueObject } from '../../../src/system/data/ValueObject.js' ;
import { Event } from '../../../src/system/events/Event.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'system.events.Event' , () =>
{
    describe( 'new Event()' , () =>
    {
        let event = new Event() ;

        it('new Event() instanceof ValueObject', () =>
        {
            assert.instanceOf( event , ValueObject );
        });

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
    describe( 'Event enumerations' , () =>
    {
        it('Event.ACTIVATE' , () => { assert.equal( Event.ACTIVATE , "activate" ); });
        it('Event.ADDED' , () => { assert.equal( Event.ADDED , "added" ); });
        it('Event.ADDED_TO_STAGE' , () => { assert.equal( Event.ADDED_TO_STAGE , "addedToStage" ); });
        it('Event.CANCEL' , () => { assert.equal( Event.CANCEL , "cancel" ); });
        it('Event.CHANGE' , () => { assert.equal( Event.CHANGE , "change" ); });
        it('Event.CLEAR' , () => { assert.equal( Event.CLEAR , "clear" ); });
        it('Event.CLICK' , () => { assert.equal( Event.CLICK , "click" ); });
        it('Event.CLOSE' , () => { assert.equal( Event.CLOSE , "close" ); });
        it('Event.COMPLETE' , () => { assert.equal( Event.COMPLETE , "complete" ); });
        it('Event.CONNECT' , () => { assert.equal( Event.CONNECT , "connect" ); });
        it('Event.COPY' , () => { assert.equal( Event.COPY , "copy" ); });
        it('Event.CUT' , () => { assert.equal( Event.CUT , "cut" ); });
        it('Event.DEACTIVATE' , () => { assert.equal( Event.DEACTIVATE , "deactivate" ); });
        it('Event.FULLSCREEN' , () => { assert.equal( Event.FULLSCREEN , "fullScreen" ); });
        it('Event.INIT' , () => { assert.equal( Event.INIT , "init" ); });
        it('Event.OPEN' , () => { assert.equal( Event.OPEN , "open" ); });
        it('Event.PASTE' , () => { assert.equal( Event.PASTE , "paste" ); });
        it('Event.REMOVED' , () => { assert.equal( Event.REMOVED , "removed" ); });
        it('Event.REMOVED_FROM_STAGE' , () => { assert.equal( Event.REMOVED_FROM_STAGE , "removedFromStage" ); });
        it('Event.RENDER' , () => { assert.equal( Event.RENDER , "render" ); });
        it('Event.RESIZE' , () => { assert.equal( Event.RESIZE , "resize" ); });
        it('Event.SCROLL' , () => { assert.equal( Event.SCROLL , "scroll" ); });
        it('Event.SELECT' , () => { assert.equal( Event.SELECT , "select" ); });
        it('Event.UNLOAD' , () => { assert.equal( Event.UNLOAD , "unload" ); });
    });
});
