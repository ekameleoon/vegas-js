"use strict" ;

import { IsNaN } from 'system/rules/IsNaN.js' ;
import { Rule } from 'system/rules/Rule.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'system.rules.IsNaN' , () =>
{
    describe( '#constructor' , () =>
    {
        it('new IsNaN() instanceof Rule', () =>
        {
            let condition = new IsNaN() ;
            assert.instanceOf( condition , Rule );
        });

        it('new IsNaN().value is NaN', () =>
        {
            let condition = new IsNaN() ;
            assert.isNaN( condition.value );
        });
    });

    describe( '#eval(condition[,true])' , () =>
    {
        let condition = new IsNaN() ;
        it('new IsNaN(0).eval() === false', () =>
        {
            condition.value = 0 ;
            assert.isFalse( condition.eval() );
        });
        it('new IsNaN(1).eval() === false', () =>
        {
            condition.value = 1 ;
            assert.isFalse( condition.eval() );
        });
        it('new IsNaN(null).eval() === false', () =>
        {
            condition.value = null ;
            assert.isFalse( condition.eval() );
        });
        it('new IsNaN([]).eval() === false', () =>
        {
            condition.value = [] ;
            assert.isFalse( condition.eval() );
        });
        it('new IsNaN(NaN).eval() === true', () =>
        {
            condition.value = NaN ;
            assert.isTrue( condition.eval() );
        });
    });

    describe( '#eval(condition,false)' , () =>
    {
        let condition = new IsNaN() ;
        condition.strict = false ;
        it('new IsNaN(0).eval() === false', () =>
        {
            condition.value = 0 ;
            assert.isFalse( condition.eval() );
        });
        it('new IsNaN(1).eval() === false', () =>
        {
            condition.value = 1 ;
            assert.isFalse( condition.eval() );
        });
        it('new IsNaN(null).eval() === true', () =>
        {
            condition.value = null ;
            assert.isTrue( condition.eval() );
        });
        it('new IsNaN([],false).eval() === true', () =>
        {
            condition.value = [] ;
            assert.isTrue( condition.eval() );
        });
        it('new IsNaN(NaN).eval() === true', () =>
        {
            condition.value = NaN ;
            assert.isTrue( condition.eval() );
        });
    });
});
