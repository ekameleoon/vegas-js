"use strict" ;

import { ObjectArgument } from '../../../system/ioc/ObjectArgument.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'system.ioc.ObjectArgument' , () =>
{
    describe( '#constructor' , () =>
    {
        describe( 'new ObjectArgument()' , () =>
        {
            let arg = new ObjectArgument() ;
            it('new ObjectArgument().constructor === ObjectArgument', () => { assert.equal( arg.constructor , ObjectArgument ); });
            it('new ObjectArgument().toString() === "[ObjectArgument]"', () => { assert.equal( arg.toString() , "[ObjectArgument]" ); });
            it('new ObjectArgument().value === undefined', () => { assert.isUndefined( arg.value ); });
            it('new ObjectArgument().policy === "value"', () => { assert.equal( arg.policy , "value" ); });
            it('new ObjectArgument().evaluators === null', () => { assert.isNull( arg.evaluators ); });
        });
    });
}) ;
