"use strict" ;

import { Property } from 'system/data/Property.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'system.data.Property' , () =>
{
    it('instanceof Property', () =>
    {
        let prop = new Property() ;
        assert.instanceOf( prop , Property );
    });
});
