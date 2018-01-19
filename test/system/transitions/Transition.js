"use strict" ;

import { Task }       from 'system/process/Task.js' ;
import { Transition } from 'system/transitions/Transition.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'system.transitions.Transition' , () =>
{
    var t0 = new Transition() ;
    var t1 = new Transition(1) ;

    var t2 = new Transition() ;
    t2.id = 2 ;

    var t3 = new Transition(1) ;

    it('new Transition() instanceof Task', () =>
    {
        assert.isTrue( t0 instanceof Task );
    })

    it('new Transition().id === null', () =>
    {
        assert.strictEqual( t0.id , null );
    })

    it('new Transition(1).id === 1', () =>
    {
        assert.strictEqual( t1.id , 1 );
    })

    it('new Transition().id=2 === 2', () =>
    {
        assert.strictEqual( t2.id , 2 );
    })

    it('new Transition(1).equals(new Transition(1)) === true ', () =>
    {
        assert.isTrue( t1.equals(t3) );
    })

    it('new Transition(1).equals(new Transition(2)) === false ', () =>
    {
        assert.isFalse( t1.equals(t2) );
    })
});
