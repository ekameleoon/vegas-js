"use strict" ;

import { Method } from 'system/data/Method.js' ;
import { Property } from 'system/data/Property.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'system.data.Method' , () =>
{
    describe( '#constructor' , () =>
    {
        it('new Method() instanceof Property', () =>
        {
            let prop = new Method() ;
            assert.instanceOf( prop , Property );
        });
    });

    describe( '#name' , () =>
    {
        it('new Method().name === null', () =>
        {
            let prop = new Method() ;
            assert.isNull( prop.name );
        });

        it('new Method(1).name === null', () =>
        {
            let prop = new Method() ;
            assert.isNull( prop.name );
        });

        it('new Method("sum").name === foo', () =>
        {
            let prop = new Method("sum") ;
            assert.equal( prop.name , "sum" );
        });
    });

    describe( '#value' , () =>
    {
        it('new Method().args === null', () =>
        {
            let prop = new Method() ;
            assert.isNull( prop.args );
        });
        it('new Method("x",1).args === null', () =>
        {
            let prop = new Method("sum",1) ;
            assert.isNull( prop.args );
        });
        it('new Method("sum",[1,2,3]).args === [2,3,4]', () =>
        {
            let args = [1,2,3] ;
            let prop = new Method("sum",args) ;
            assert.isArray( prop.args );
            assert.equal( prop.args , args );
        });
    });
});
