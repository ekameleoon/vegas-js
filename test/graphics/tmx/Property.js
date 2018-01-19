"use strict" ;

import { Base } from 'graphics/tmx/Base.js' ;
import { Property } from 'graphics/tmx/Property.js' ;

import chai from 'chai' ;
const assert = chai.assert ;

describe( 'graphics.tmx.Property' , () =>
{
    describe( '#constructor' , () =>
    {
        describe( 'new Property()' , () =>
        {
            let prop = new Property() ;
            it( 'new Property() extends Base' , () =>
            {
                assert.instanceOf( prop , Base );
            });
            it( 'new Property().constructor === Property' , () =>
            {
                assert.equal( prop.constructor , Property );
            });
        });

        describe( 'new Property({name:"x",type:"float",value:12.5})' , () =>
        {
            let prop = new Property({name:"x",type:"float",value:12.5}) ;
            it( 'new Property({name:"x",type:"float",value:12.5}) extends Base' , () =>
            {
                assert.instanceOf( prop , Base );
            });
            it( 'new Property({name:"x",type:"float",value:12.5}).constructor === Property' , () =>
            {
                assert.equal( prop.constructor , Property );
            });
            it( 'new Property({name:"x",type:"float",value:12.5}).name === "x"' , () =>
            {
                assert.equal( prop.name , "x" );
            });
            it( 'new Property({name:"x",type:"float",value:12.5}).type === "float"' , () =>
            {
                assert.equal( prop.type , "float" );
            });
            it( 'new Property({name:"x",type:"float",value:12.5}).value === 12.5' , () =>
            {
                assert.equal( prop.value , 12.5 );
            });
        });
    });

    describe( '#clone' , () =>
    {
        let prop = new Property({name:"x",type:"float",value:12.5}) ;
        let clone = prop.clone() ;
        it( "new Property().clone()" , () =>
        {
            assert.notEqual( clone , prop ) ;
            assert.instanceOf( clone , Property ) ;
            assert.equal( clone.name , prop.name ) ;
            assert.equal( clone.type , prop.type ) ;
            assert.equal( clone.value , prop.value ) ;
        });
    });

    describe( '#setTo' , () =>
    {
        describe( 'new Property().setTo({name:"x",type:"float",value:12.5})' , () =>
        {
            let prop = new Property() ;
            prop.setTo({name:"x",type:"float",value:12.5})  ;
            it( prop + ', name  === "x"', () => { assert.equal( prop.name , "x" ); });
            it( prop + ', type  === "float"', () => { assert.equal( prop.type , "float" ); });
            it( prop + ', value === 12.5', () => { assert.equal( prop.value , 12.5 ); });
        });
    });

    describe( '#toObject' , () =>
    {
        let prop = new Property({name:"x",type:"float",value:12.5}) ;
        let object = prop.toObject() ;
        it( 'new Base({name:"x",type:"float",value:12.5}).toObject() === {name:"x",type:"float",value:12.5}' , () =>
        {
            assert.notEqual( object , prop ) ;
            assert.instanceOf( object.constructor , Object ) ;
            assert.equal( object.name , prop.name ) ;
            assert.equal( object.type , prop.type ) ;
            assert.equal( object.value , prop.value ) ;
        });
    });

    describe( '#toString()' , () =>
    {
        it('new Property().toString() === "[Property]"', () =>
        {
            assert.equal( new Property().toString() , "[Property]" );
        });
    });
});
