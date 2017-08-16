"use strict" ;

import { leapYear } from '../../../core/date/leapYear.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.date.leapYear' , () =>
{
    describe( 'leapYear(year:number)' , () =>
    {
        it('leapYear(2016) === true)', () =>
        {
            assert.isTrue( leapYear(2016) );
        });
        it('leapYear(2017) === false)', () =>
        {
            assert.isFalse( leapYear(2017) );
        });
    });

    describe( 'leapYear(date:Date)' , () =>
    {
        it('leapYear(new Date(2016,0,1)) === true)', () =>
        {
            assert.isTrue( leapYear(new Date(2016,0,1)) );
        });

        it('leapYear(new Date(2017,0,1)) === false)', () =>
        {
            assert.isFalse( leapYear(new Date(2017,0,1)) );
        });
    });
});
