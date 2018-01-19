/*jshint loopfunc: true */
"use strict" ;

import { Base } from 'graphics/tmx/Base.js' ;
import { TileObject } from 'graphics/tmx/TileObject.js' ;

import chai from 'chai' ;
const assert = chai.assert ;

describe( 'graphics.tmx.TileObject' , () =>
{
    let defaultValues =
    {
        ellipse    : false ,
        gid        : null ,
        height     : 0 ,
        id         : null ,
        name       : null ,
        polygon    : null ,
        polyline   : null ,
        rotation   : 0 ,
        type       : null,
        visible    : true ,
        width      : 0 ,
        x          : 0 ,
        y          : 0
    };

    let init =
    {
        ellipse  : true ,
        gid      : "test" ,
        height   : 240 ,
        id       : "id" ,
        name     : "object" ,
        polygon  : "polygon" ,
        polyline : "polyline" ,
        rotation : 90 ,
        type     : "custom" ,
        visible  : false ,
        width    : 320 ,
        x        : 10 ,
        y        : 20
    };

    describe( '#constructor' , () =>
    {
        describe( 'new TileObject()' , () =>
        {
            let object = new TileObject() ;
            it( 'new TileObject() extends Base' , () => { assert.instanceOf( object , Base ); });
            it( 'new TileObject().constructor === TileObject' , () => { assert.equal( object.constructor , TileObject ); });
            for( let prop in defaultValues )
            {
                if( prop in defaultValues )
                {
                    it( 'new Layer(init).' + prop + ' === ' + defaultValues[prop] , () =>
                    {
                        assert.equal( object[prop] , defaultValues[prop] );
                    });
                }
            }
        });

        describe( 'new TileObject(init)' , () =>
        {
            let object = new TileObject(init) ;
            for( let prop in init )
            {
                if( prop in init )
                {
                    it( '#' + prop + ' === "' + init[prop] + '' , () =>
                    {
                        assert.equal( object[prop] , init[prop] );
                    });
                }
            }
        });
    });

    describe( '#clone' , () =>
    {
        let object = new TileObject(init) ;
        let clone = object.clone() ;
        it( "#clone() not equal object" , () => { assert.notEqual( clone , object ) ; });
        it( "#clone() instanceof TileObject" , () => { assert.instanceOf( clone , TileObject ) ; });
        for( let prop in init )
        {
            if( prop in init )
            {
                it( '#clone().' + prop + ' === "' + object[prop] + '' , () =>
                {
                    assert.equal( clone[prop] , object[prop] );
                });
            }
        }
    });

    describe( '#setTo' , () =>
    {
        let object = new TileObject() ;
        object.setTo(init)  ;
        for( let prop in init )
        {
            if( prop in init )
            {
                it( '#' + prop + ' === "' + init[prop] + '' , () =>
                {
                    assert.equal( object[prop] , init[prop] );
                });
            }
        }
    });

    describe( '#toObject' , () =>
    {
        let tileobject = new TileObject(init) ;
        let object     = tileobject.toObject() ;
        it( '#toObject() not equal the current TileObject reference' , () => { assert.notEqual( object , tileobject ) ;}) ;
        it( '#toObject() is a generic object' , () => { assert.instanceOf( object.constructor , Object ) } ) ;
        for( let prop in init )
        {
            if( prop in init )
            {
                it( '#toObject().' + prop + ' === "' + init[prop] + '' , () =>
                {
                    assert.equal( object[prop] , init[prop] );
                });
            }
        }
    });

    describe( '#toString()' , () =>
    {
        it('#toString() === "[TileObject]"', () =>
        {
            assert.equal( new TileObject().toString() , "[TileObject]" );
        });
    });
});
