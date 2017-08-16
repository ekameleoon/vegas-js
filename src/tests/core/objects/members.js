"use strict" ;

import { members } from '../../../core/objects/members.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.objects.members' , () =>
{
    let o = { a : 5 , b : 6 } ;

    var keys   = members( o ) ;
    var values = members( o , true ) ;

    it('members( o )' , () =>
    {
        assert.sameMembers( keys , ['a','b'] );
    });

    it('members( o , true )' , () =>
    {
        assert.sameMembers( values , [5,6] );
    });
});
