"use strict" ;

import { fastformatDate } from '../../../core/strings/fastformatDate.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.strings.fastformatDate' , () =>
{
    it('fastformatDate()', () =>
    {
        let date = fastformatDate() ;
        assert.isString( date ) ;
        assert.lengthOf( date , 10 ) ;
    });

    it('fastformatDate(new Date(2016,5,12))', () =>
    {
        let date = fastformatDate(new Date(2016,5,12)) ;
        assert.equal( date , "2016-06-12" ) ;
    });

    it('fastformatDate(new Date(2016,5,12),"/")', () =>
    {
        let date = fastformatDate(new Date(2016,5,12),"/") ;
        assert.equal( date , "2016/06/12" ) ;
    });
});
