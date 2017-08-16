"use strict" ;

import { after } from '../../../core/date/after.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.date.after' , () =>
{
    it('after(new Date(2016,1,1),new Date(2016,1,0)) === true)', () =>
    {
        assert.isTrue( after(new Date(2016,1,1),new Date(2016,1,0)) );
    });
    it('after(new Date(2016,1,1),new Date(2016,1,1)) === false)', () =>
    {
        assert.isFalse( after(new Date(2016,1,1),new Date(2016,1,1)) );
    });
    it('after(new Date(2015,1,1),new Date(2016,1,1)) === false)', () =>
    {
        assert.isFalse( after(new Date(2015,1,1),new Date(2016,1,1)) );
    });

    it('after() throws TypeError', () =>
    {
        assert.throws( () => { after() ; } , TypeError );
    });

    it('after("foo",new Date()) throws TypeError', () =>
    {
        assert.throws( function(){ after( "foo" , new Date() ) } , TypeError ) ;
    });

    it('after(new Date(),"foo") throws TypeError', () =>
    {
        assert.throws( function(){ after( new Date() , "foo" ) } , TypeError ) ;
    });
});
