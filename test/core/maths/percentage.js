"use strict" ;

import { percentage } from 'core/maths/percentage.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.maths.percentage' , () =>
{
    it('percentage(50,100) === 50' , () =>
    {
        assert.equal( percentage(50,100) , 50 ) ;
    });
    it('percentage(68,425) === 16' , () =>
    {
        assert.equal( percentage(68,425) , 16 ) ;
    });

    it('percentage(NaN,NaN) === NaN' , () =>
    {
        assert.isNaN( percentage(NaN,NaN) ) ;
    });
    it('percentage(10,NaN) === NaN' , () =>
    {
        assert.isNaN( percentage(10,NaN) ) ;
    });
    it('percentage(NaN,10) === NaN' , () =>
    {
        assert.isNaN( percentage(NaN,10) ) ;
    });
    it('percentage(10,Infinity) === 0' , () =>
    {
        assert.equal( percentage(10,Infinity) , 0 ) ;
    });
    it('percentage(Infinity,10) === NaN' , () =>
    {
        assert.isNaN( percentage(Infinity,10) ) ;
    });
});
