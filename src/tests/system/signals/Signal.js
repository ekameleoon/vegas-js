"use strict" ;

import { Signal } from '../../../system/signals/Signal.js' ;
import { Signaler } from '../../../system/signals/Signaler.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'system.signals.Signal' , () =>
{
    describe( '#new Signal()' , () =>
    {
        let signal = new Signal() ;
        it('instanceof Signaler', () =>
        {
            assert.instanceOf( signal , Signaler );
        });

        it('constructor === Signal', () =>
        {
            assert.equal( signal.constructor , Signal );
        });

        it('default length === 0', () =>
        {
            assert.equal( signal.length , 0);
        });

        it('default proxy === null', () =>
        {
            assert.isNull( signal.proxy );
        });

        it('default connected() === false', () =>
        {
            assert.isFalse( signal.connected() );
        });

        it('default toArray() === []', () =>
        {
            let ar1 = signal.toArray() ;
            let ar2 = signal.toArray() ;
            assert.isArray( ar1 );
            assert.equal( ar1.length , 0 );
            assert.isArray( ar2 );
            assert.equal( ar2.length , 0 );

            assert.notEqual( ar1 , ar2 );
        });

        it('default toString() === [Signal]', () =>
        {
            assert.equal( signal.toString() , '[Signal]' );
        });
    });
});
