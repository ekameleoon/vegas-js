"use strict" ;

import { yesterday } from 'core/date/yesterday.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.date.yesterday' , () =>
{
    let date = new Date(2016,1,2) ;
    let prev = yesterday(date) ;
    let now  = new Date() ;

    it( 'yesterday(new Date(2016,1,2)) instanceof Date', () =>
    {
        assert.instanceOf( prev , Date ) ;
    });

    it( 'yesterday(new Date(2016,1,2)).valueOf() === new Date(2016,1,1).valueOf()', () =>
    {
        assert.equal( prev.valueOf() , new Date(2016,1,1).valueOf() );
    });

    it( 'yesterday() instanceof Date', () =>
    {
        assert.instanceOf( yesterday() , Date ) ;
    });

    it( 'yesterday().getFullYear() === now.getFullYear()', () =>
    {
        assert.equal( yesterday().getFullYear(), now.getFullYear() );
    });

    // it( 'yesterday().getMonth() === now.getMonth()', () =>
    // {
    //     assert.equal( yesterday().getMonth(), now.getMonth() );
    // });

    it( 'yesterday().getDay() === now.getDay()-1', () =>
    {
        prev = yesterday() ;
        let day = now.getDay() - 1 ;
        if( day < 0 )
        {
            day = 6 ;
        }
        assert.equal( prev.getDay() , day );
    });
});
