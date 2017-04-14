"use strict" ;

import { daysInMonth } from '../../../src/core/date/daysInMonth.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.date.daysInMonth' , () =>
{
    // describe( 'daysInMonth() use Date.now()' , () =>
    // {
    //     it('daysInMonth() === 31)', () => { assert.equal( daysInMonth() , 31 ); });
    // });

    describe( 'daysInMonth(2016,xx,1) - Leap year' , () =>
    {
        it('daysInMonth(new Date(2016, 0, 1)) === 31)', () => { assert.equal( daysInMonth(new Date(2016, 0,1)) , 31 ); });
        it('daysInMonth(new Date(2016, 1, 1)) === 29)', () => { assert.equal( daysInMonth(new Date(2016, 1,1)) , 29 ); });
        it('daysInMonth(new Date(2016, 2, 1)) === 31)', () => { assert.equal( daysInMonth(new Date(2016, 2,1)) , 31 ); });
        it('daysInMonth(new Date(2016, 3, 1)) === 30)', () => { assert.equal( daysInMonth(new Date(2016, 3,1)) , 30 ); });
        it('daysInMonth(new Date(2016, 4, 1)) === 31)', () => { assert.equal( daysInMonth(new Date(2016, 4,1)) , 31 ); });
        it('daysInMonth(new Date(2016, 5, 1)) === 30)', () => { assert.equal( daysInMonth(new Date(2016, 5,1)) , 30 ); });
        it('daysInMonth(new Date(2016, 6, 1)) === 31)', () => { assert.equal( daysInMonth(new Date(2016, 6,1)) , 31 ); });
        it('daysInMonth(new Date(2016, 7, 1)) === 31)', () => { assert.equal( daysInMonth(new Date(2016, 7,1)) , 31 ); });
        it('daysInMonth(new Date(2016, 8, 1)) === 30)', () => { assert.equal( daysInMonth(new Date(2016, 8,1)) , 30 ); });
        it('daysInMonth(new Date(2016, 9, 1)) === 31)', () => { assert.equal( daysInMonth(new Date(2016, 9,1)) , 31 ); });
        it('daysInMonth(new Date(2016,10, 1)) === 30)', () => { assert.equal( daysInMonth(new Date(2016,10,1)) , 30 ); });
        it('daysInMonth(new Date(2016,11, 1)) === 31)', () => { assert.equal( daysInMonth(new Date(2016,11,1)) , 31 ); });
    });

    describe( 'daysInMonth(2017,1,1) - Normal year' , () =>
    {
        it('daysInMonth(new Date(2017,1,1)) === 28)', () => { assert.equal( daysInMonth(new Date(2017,1,1)) , 28 ); });
    });
});
