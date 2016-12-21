"use strict" ;

import { Receiver } from '../../../src/system/signals/Receiver.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'system.signals.Receiver' , () =>
{
    let slot = new Receiver() ;

    it('#receive() is a function', () =>
    {
        assert.isFunction( slot.receive );
    });

    it('#toString() === "[Receiver]"', () =>
    {
        assert.equal( slot.toString() , '[Receiver]' );
    });
});
