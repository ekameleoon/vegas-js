"use strict" ;

import { Base } from '../../../src/graphics/tmx/Base.js' ;
import { Image } from '../../../src/graphics/tmx/Image.js' ;

import chai from 'chai' ;
const assert = chai.assert ;

describe( 'graphics.tmx.Image' , () =>
{
    describe( '#constructor' , () =>
    {
        describe( 'new Image()' , () =>
        {
            let image = new Image() ;
            it( 'new Image() extends Base' , () =>
            {
                assert.instanceOf( image , Base );
            });
            it( 'new Image().constructor === Image' , () =>
            {
                assert.equal( image.constructor , Image );
            });
        });

        describe( 'new Image(init)' , () =>
        {
            let init =
            {
                id     : 'image',
                format : 'jpeg',
                height : 240,
                width  : 320,
                trans  : '#FF0000' ,
                source : 'source'
            };
            let image = new Image( init ) ;
            it( 'new Image(init) extends Base' , () =>
            {
                assert.instanceOf( image , Base );
            });
            it( 'new Image(init).constructor === Image' , () =>
            {
                assert.equal( image.constructor , Image );
            });
            it( 'new Image(init).id     === "image"' , () => { assert.equal( image.id , 'image' ); });
            it( 'new Image(init).format === "jpeg"' , () => { assert.equal( image.format , 'jpeg' ); });
            it( 'new Image(init).height === 240' , () => { assert.equal( image.height , 240 ); });
            it( 'new Image(init).width  === 320' , () => { assert.equal( image.width , 320 ); });
            it( 'new Image(init).trans  === "#FF0000"' , () => { assert.equal( image.trans , "#FF0000" ); });
            it( 'new Image(init).source === "source"' , () => { assert.equal( image.source , "source" ); });
        });
    });

    describe( '#clone' , () =>
    {
        let init =
        {
            id     : 'image',
            format : 'jpeg',
            height : 240,
            width  : 320,
            trans  : '#FF0000' ,
            source : 'source'
        };
        let image = new Image(init) ;
        let clone = image.clone() ;
        it( "new Image().clone() not equal image" , () =>
        {
            assert.notEqual( clone , image ) ;
        });
        it( "new Image().clone() instanceof Image" , () =>
        {
            assert.instanceOf( clone , Image ) ;
        });
        it( "new Image().clone() not equal image" , () =>
        {
            assert.equal( clone.id     , image.id ) ;
            assert.equal( clone.format , image.format ) ;
            assert.equal( clone.height , image.height ) ;
            assert.equal( clone.width  , image.width ) ;
            assert.equal( clone.trans  , image.trans ) ;
            assert.equal( clone.source , image.source ) ;
        });
    });

    describe( '#setTo' , () =>
    {
        describe( 'new Image().setTo(init)' , () =>
        {
            let init =
            {
                id     : 'image',
                format : 'jpeg',
                height : 240,
                width  : 320,
                trans  : '#FF0000' ,
                source : 'source'
            };
            let image = new Image() ;
            image.setTo(init)  ;
            it( image + ', id     === "image"', () => { assert.equal( image.id , 'image' ); });
            it( image + ', format === "jpeg"', () => { assert.equal( image.format , 'jpeg' ); });
            it( image + ', height === 240', () => { assert.equal( image.height , 240 ); });
            it( image + ', width  === 240', () => { assert.equal( image.width , 320 ); });
            it( image + ', trans  === "#FF0000"', () => { assert.equal( image.trans , "#FF0000" ); });
            it( image + ', source === "source"', () => { assert.equal( image.source , "source" ); });
        });
    });

    describe( '#toObject' , () =>
    {
        let init =
        {
            id     : 'image',
            format : 'jpeg',
            height : 240,
            width  : 320,
            trans  : '#FF0000' ,
            source : 'source'
        };
        let image = new Image(init) ;
        let object = image.toObject() ;
        it( "new Base(init).toObject() === init" , () =>
        {
            assert.notEqual( object , image ) ;
            assert.instanceOf( object.constructor , Object ) ;
            assert.equal( object.id     , image.id ) ;
            assert.equal( object.format , image.format ) ;
            assert.equal( object.height , image.height ) ;
            assert.equal( object.width  , image.width ) ;
            assert.equal( object.source , image.source ) ;
            assert.equal( object.trans  , image.trans ) ;
        });
    });

    describe( '#toString()' , () =>
    {
        it('new Image().toString() === "[Image]"', () =>
        {
            assert.equal( new Image().toString() , "[Image]" );
        });
    });
});
