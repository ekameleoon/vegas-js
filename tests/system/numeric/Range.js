"use strict" ;

import { Range } from '../../../src/system/numeric/Range.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'system.numeric.Range' , () =>
{
    describe( '#constructor empty' , () =>
    {
        it('new Range().min is NaN', () =>
        {
            let range = new Range() ;
            assert.isNaN( range.min ) ;
            assert.isFalse( Object.isFrozen(range) ) ;
        });
        it('new Range().max is NaN', () =>
        {
            let range = new Range() ;
            assert.isNaN( range.max ) ;
            assert.isFalse( Object.isFrozen(range) ) ;
        });
    });

    describe( '#constructor with arguments' , () =>
    {
        it('new Range(2,8).min is NaN', () =>
        {
            let range = new Range(2,8) ;
            assert.equal( range.min , 2 ) ;
            assert.isFalse( Object.isFrozen(range) ) ;
        });
        it('new Range(2,8).max is NaN', () =>
        {
            let range = new Range(2,8) ;
            assert.equal( range.max , 8 ) ;
            assert.isFalse( Object.isFrozen(range) ) ;
        });

        it('new Range(2,8,true) is freezed', () =>
        {
            let range = new Range(2,8,true) ;
            assert.isTrue( Object.isFrozen(range) ) ;
        });
    });

    describe( '#enumeration' , () =>
    {
        it('Range.COLOR', () =>
        {
            console.log( Range.COLOR ) ;
            assert.instanceOf( Range.COLOR , Range ) ;
            assert.isTrue( Object.isFrozen(Range.COLOR) ) ;
            assert.isNaN( Range.COLOR.max ,  255 ) ;
            assert.isNaN( Range.COLOR.min , -255 ) ;
        });
    });
});
