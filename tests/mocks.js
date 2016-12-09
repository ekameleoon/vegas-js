'use strict'

import { MockSlot } from './mocks/MockSlot.js';

import { Receiver } from '../src/system/signals/Receiver.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'mocks.MockSlot' , () =>
{
    let slot = new MockSlot();

    it('MockSlot is a constructor function', () =>
    {
        assert.isFunction( MockSlot );
    });

    it('new MockSlot().constructor === MockSlot', () =>
    {
        assert.equal( slot.constructor , MockSlot );
    });

    it('new MockSlot() instanceOf Receiver', () =>
    {
        assert.instanceOf( slot , Receiver );
    });

    it('new MockSlot().isReceived()', () =>
    {
        assert.isFalse( slot.isReceived() );
    });
});
