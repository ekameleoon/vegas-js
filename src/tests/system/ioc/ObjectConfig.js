"use strict" ;

import { ObjectConfig } from './system/ioc/ObjectConfig.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'system.ioc.ObjectConfig' , () =>
{
    describe( '#TYPE_ALIAS' , () =>
    {
        it('ObjectConfig.TYPE_ALIAS === "alias"', () =>
        {
            assert.equal( ObjectConfig.TYPE_ALIAS , 'alias' );
        });
    });
}) ;
