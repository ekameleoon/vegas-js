"use strict" ;

import { before } from 'core/date/before.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.date.before' , () =>
{
    it('before(new Date(2015,1,1),new Date(2016,1,1)) === true)', () =>
    {
        assert.isTrue( before(new Date(2015,1,1),new Date(2016,1,1)) );
    });
    it('before(new Date(2016,1,1),new Date(2016,1,1)) === false)', () =>
    {
        assert.isFalse( before(new Date(2016,1,1),new Date(2016,1,1)) );
    });
    it('before(new Date(2016,1,1),new Date(2016,1,0)) === false)', () =>
    {
        assert.isFalse( before(new Date(2016,1,1),new Date(2016,1,0)) );
    });

    it('before() throws TypeError', () =>
    {
        assert.throws( () => { before() ; } , TypeError );
    });

    it('before("foo",new Date()) throws TypeError', () =>
    {
        assert.throws( function(){ before( "foo" , new Date() ) } , TypeError ) ;
    });

    it('before(new Date(),"foo") throws TypeError', () =>
    {
        assert.throws( function(){ before( new Date() , "foo" ) } , TypeError ) ;
    });
});
