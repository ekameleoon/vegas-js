"use strict" ;

import { getDefinitionByName } from '../../../src/core/reflect/getDefinitionByName.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.reflect.getDefinitionByName' , () =>
{
    it('getDefinitionByName() === undefined', () =>
    {
        assert.isUndefined( getDefinitionByName() ) ;
    });

    // FIXME test the function
});
