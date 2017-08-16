"use strict" ;

import { merge } from '../../../core/objects/merge.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.objects.merge' , () =>
{
    it('merge(target,source)' , () =>
    {
        let source = { a : 1 , b : 2 , c: 3 } ;
        let target = { a : 5 , b : 6 } ;
        merge( target , source ) ;
        assert.propertyVal( target , 'a' , 1);
        assert.propertyVal( target , 'b' , 2);
        assert.propertyVal( target , 'c' , 3);
    });

    it('merge(target,source,true)' , () =>
    {
        let source = { a : 1 , b : 2 , c: 3 } ;
        let target = { a : 5 , b : 6 } ;
        merge( target , source , true ) ;
        assert.propertyVal( target , 'a' , 1);
        assert.propertyVal( target , 'b' , 2);
        assert.propertyVal( target , 'c' , 3);
    });

    it('merge(target,source,false)' , () =>
    {
        let target = { a : 5 , b : 6 } ;
        let source = { a : 1 , b : 2 , c: 3 } ;
        merge( target , source , false ) ;
        assert.propertyVal( target , 'a' , 5);
        assert.propertyVal( target , 'b' , 6);
        assert.propertyVal( target , 'c' , 3);
    });
});
