"use strict" ;

import { fuse } from '../../../src/core/objects/fuse.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.objects.fuse' , () =>
{
    let ar1 = [1,2,3,4] ;
    let ar2 = [5,6,7,8] ;

    fuse( ar1 , 2 , ar2 , 2 , 2 ) ;

    it('fuse( ar1 , 2 , ar2 , 2 , 2 )' , () =>
    {
        assert.sameMembers( ar2 , [5,6,3,4] );
    });
});
