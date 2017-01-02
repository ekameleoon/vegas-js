/*jshint loopfunc: true */
"use strict" ;

import { Base } from '../../../src/graphics/tmx/Base.js' ;
import { Layer } from '../../../src/graphics/tmx/Layer.js' ;

import chai from 'chai' ;
const assert = chai.assert ;

describe( 'graphics.tmx.Layer' , () =>
{
    let defaultValues =
    {
        height     : 0 ,
        name       : null ,
        offsetx    : 0 ,
        offsety    : 0 ,
        opacity    : 1 ,
        properties : null ,
        visible    : true ,
        width      : 0 ,
        x          : 0 ,
        y          : 0
    };

    let init =
    {
        height     : 20 ,
        name       : "mylayer" ,
        offsetx    : 5 ,
        offsety    : 6 ,
        opacity    : 0.5 ,
        properties : [] ,
        visible    : false ,
        width      : 30 ,
        x          : 40 ,
        y          : 50
    };

    describe( '#constructor' , () =>
    {
        describe( 'new Layer()' , () =>
        {
            let layer = new Layer() ;
            it( 'new Layer() extends Base' , () => { assert.instanceOf( layer , Base ); });
            it( 'new Layer().constructor === Layer' , () => { assert.equal( layer.constructor , Layer ); });
            for( let prop in defaultValues )
            {
                if( prop in defaultValues )
                {
                    it( 'new Layer(init).' + prop + ' === ' + defaultValues[prop] , () =>
                    {
                        assert.equal( layer[prop] , defaultValues[prop] );
                    });
                }
            }
        });

        describe( 'new Layer(init)' , () =>
        {
            let layer = new Layer(init) ;
            for( let prop in init )
            {
                if( prop in init )
                {
                    it( 'new Layer(init).' + prop + ' === ' + init[prop] , () =>
                    {
                        assert.equal( layer[prop] , init[prop] );
                    });
                }
            }
        });
    });

    describe( '#clone' , () =>
    {
        let layer = new Layer(init) ;
        let clone = layer.clone() ;
        it( "#clone() not equal" , () => { assert.notEqual( clone , layer ) ; });
        it( "#clone() instanceOf Layer" , () => { assert.instanceOf( clone , Layer ) ; });
        for( let prop in init )
        {
            if( prop in init )
            {
                it( 'new Layer(init).clone().' + prop + ' === ' + init[prop] , () =>
                {
                    assert.equal( clone[prop] , init[prop] );
                });
            }
        }
    });

    describe( '#setTo' , () =>
    {
        let layer = new Layer() ;
        layer.setTo(init)  ;
        for( let prop in init )
        {
            if( prop in init )
            {
                it( 'new Layer(init).' + prop + ' === ' + init[prop] , () =>
                {
                    assert.equal( layer[prop] , init[prop] );
                });
            }
        }
    });

    describe( '#toObject' , () =>
    {
        let layer = new Layer(init) ;
        let object = layer.toObject() ;
        it( 'new Layer(init).toObject() not equals' , () => { assert.notEqual( object , layer ) ; });
        it( 'new Layer(init).toObject() is a generic object' , () => { assert.instanceOf( object.constructor , Object ) ; });
        for( let prop in init )
        {
            if( prop in init )
            {
                it( 'new Layer(init).toObject().' + prop + ' === ' + init[prop] , () =>
                {
                    assert.equal( object[prop] , init[prop] );
                });
            }
        }
    });

    describe( '#toString()' , () =>
    {
        it('new Layer().toString() === "[Layer]"', () =>
        {
            assert.equal( new Layer().toString() , "[Layer]" );
        });
    });
});
