/*jshint loopfunc: true */
"use strict" ;

import { Image as Img } from 'graphics/tmx/Image.js' ;
import { ImageLayer } from 'graphics/tmx/ImageLayer.js' ;
import { Layer }      from 'graphics/tmx/Layer.js' ;

import chai from 'chai' ;
const assert = chai.assert ;

describe( 'graphics.tmx.ImageLayer' , () =>
{
    let defaultValues =
    {
        height     : 0 ,
        image      : null ,
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
        image      : new Img({source:'image.png'}) ,
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
        describe( 'new ImageLayer()' , () =>
        {
            let layer = new ImageLayer() ;
            it( 'new ImageLayer() extends Layer' , () => { assert.instanceOf( layer , Layer ); });
            it( 'new ImageLayer().constructor === ImageLayer' , () => { assert.equal( layer.constructor , ImageLayer ); });
            for( let prop in defaultValues )
            {
                if( prop in defaultValues )
                {
                    it( 'new ImageLayer(init).' + prop + ' === ' + defaultValues[prop] , () =>
                    {
                        assert.equal( layer[prop] , defaultValues[prop] );
                    });
                }
            }
        });

        describe( 'new ImageLayer(init)' , () =>
        {
            let layer = new ImageLayer(init) ;
            for( let prop in init )
            {
                if( prop in init )
                {
                    it( 'new ImageLayer(init).' + prop + ' === ' + init[prop] , () =>
                    {
                        assert.equal( layer[prop] , init[prop] );
                    });
                }
            }
        });
    });

    describe( '#clone' , () =>
    {
        let layer = new ImageLayer(init) ;
        let clone = layer.clone() ;
        it( "#clone() not equal" , () => { assert.notEqual( clone , layer ) ; });
        it( "#clone() instanceOf Layer" , () => { assert.instanceOf( clone , Layer ) ; });
        for( let prop in init )
        {
            if( prop in init )
            {
                switch( prop )
                {
                    case 'image' :
                    {
                        it( 'new ImageLayer(init).clone().image instanceof Image' , () =>
                        {
                            assert.equal( clone[prop].constructor , Object );
                        });
                        it( 'new ImageLayer(init).clone().image.source === "image.png"' , () =>
                        {
                            assert.equal( clone[prop].source , 'image.png' );
                        });
                        break;
                    }
                    default :
                    {
                        it( 'new ImageLayer(init).clone().' + prop + ' === ' + init[prop] , () =>
                        {
                            assert.equal( clone[prop] , init[prop] );
                        });
                    }
                }

            }
        }
    });

    describe( '#setTo' , () =>
    {
        let layer = new ImageLayer() ;
        layer.setTo(init)  ;
        for( let prop in init )
        {
            if( prop in init )
            {
                it( 'new ImageLayer(init).' + prop + ' === ' + init[prop] , () =>
                {
                    assert.equal( layer[prop] , init[prop] );
                });
            }
        }
    });

    describe( '#toObject' , () =>
    {
        let layer = new ImageLayer(init) ;
        let object = layer.toObject() ;

        it( 'new ImageLayer(init).toObject() not equals' , () => { assert.notEqual( object , layer ) ; });
        it( 'new ImageLayer(init).toObject() is a generic object' , () => { assert.instanceOf( object.constructor , Object ) ; });

        for( let prop in init )
        {
            if( prop !== 'image' )
            {
                it( 'new ImageLayer(init).toObject().' + prop + ' === ' + init[prop] , () =>
                {
                    assert.equal( object[prop] , init[prop] );
                });
            }
        }

        it( 'new ImageLayer(init).toObject().image.constructor === Object' , () =>
        {
            assert.equal( object.image.constructor , Object );
        });

        it( 'new ImageLayer(init).toObject().image !== init.image' , () =>
        {
            assert.notEqual( object.image , init.image );
        });
    });

    describe( '#toString()' , () =>
    {
        it('new ImageLayer().toString() === "[ImageLayer]"', () =>
        {
            assert.equal( new ImageLayer().toString() , "[ImageLayer]" );
        });
    });
});
