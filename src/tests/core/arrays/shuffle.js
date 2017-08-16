"use strict" ;

import { shuffle } from '../../../core/arrays/shuffle.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.arrays.shuffle' , () =>
{
    let ar = [0,1,2,3,4,5,6,7,8,9] ;

    it('shuffle("hello") == null', () =>
    {
        let test = shuffle("hello") ;
        assert.isNull( test );
    });

    it('shuffle([0,1,2,3,4,5,6,7,8,9])', () =>
    {
        let co = ar.concat() ;
        let re = shuffle(co) ;
        assert.strictEqual( co , re );
        assert.lengthOf( co , 10 );
        assert.sameMembers( co , ar ) ;
        assert.notDeepEqual( co , ar ) ;
    });
});
