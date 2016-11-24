"use strict" ;

import { generateUUID } from '../../../src/core/random/generateUUID.js' ;
import { validateUUID } from '../../../src/core/strings/validateUUID.js' ;
import { versionUUID  } from '../../../src/core/strings/validateUUID.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.random.generateUUID' , () =>
{
    // ex: 2c70b3a0-a1c3-4cbd-71d3-62b50b8b20ac

    it('generateUUID() is random', () =>
    {
        let id1 = generateUUID() ;
        let id2 = generateUUID() ;
        assert.isString( id1 ) ;
        assert.isString( id2 ) ;
        assert.equal( id1.length , id2.length ) ;
        assert.notEqual( id1 , id2 ) ;
    });

    it('generateUUID() validate', () =>
    {
        let uuid = generateUUID() ;
        let valid = validateUUID( uuid ) ;
        assert.isTrue( valid ) ;
    });

    it('generateUUID() version === 4', () =>
    {
        let uuid = generateUUID() ;
        let version = versionUUID(uuid) ;
        assert.equal( version , 4 ) ;
    });
});
