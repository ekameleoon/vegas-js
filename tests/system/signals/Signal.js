"use strict" ;

import { Signal } from '../../../src/system/signals/Signal.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'system.signals.Signal' , () =>
{
    it('instanceof Signal', () =>
    {
        let signal = new Signal() ;
        assert.instanceOf( signal , Signal );
    });

    it('default length === 0', () =>
    {
        let signal = new Signal() ;
        assert.equal( signal.length , 0);
    });

    it('default connected() === false', () =>
    {
        let signal = new Signal() ;
        assert.isFalse( signal.connected() );
    });
});
