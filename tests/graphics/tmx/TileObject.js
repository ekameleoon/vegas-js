/*jshint loopfunc: true */
"use strict" ;

import { Base } from '../../../src/graphics/tmx/Base.js' ;
import { TileObject } from '../../../src/graphics/tmx/TileObject.js' ;

import chai from 'chai' ;
const assert = chai.assert ;

describe( 'graphics.tmx.TileObject' , () =>
{
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

            it( '#ellipse === false' , () => { assert.isFalse( object.ellipse ); });
            it( '#gid === null'      , () => { assert.isNull( object.gid ); });
            it( '#height === 0'      , () => { assert.equal( object.height , 0 ); });
            it( '#id === null'       , () => { assert.isNull( object.id ); });
            it( '#name === null'     , () => { assert.isNull( object.name ); });
            it( '#polygon === null'  , () => { assert.isNull( object.polygon ); });
            it( '#polyline === null' , () => { assert.isNull( object.polyline ); });
            it( '#rotation === 0'    , () => { assert.equal( object.rotation , 0 ); });
            it( '#type === null'     , () => { assert.isNull( object.type ); });
            it( '#visible === false' , () => { assert.isTrue( object.visible ); });
            it( '#width === 0'       , () => { assert.equal( object.width , 0 ); });
            it( '#x === 0'           , () => { assert.equal( object.x , 0 ); });
            it( '#y === 0'           , () => { assert.equal( object.y , 0 ); });
        });

        describe( 'new TileObject(init)' , () =>
        {
            let object = new TileObject(init) ;
            for( let prop in init )
            {
                if( prop in init )
                {
                    it( '#' + prop + ' === "' + init[prop] + '' , () => { assert.equal( object[prop] , init[prop] ); });
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
                it( '#clone().' + prop + ' === "' + object[prop] + '' , () => { assert.equal( clone[prop] , object[prop] ); });
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
                it( '#' + prop + ' === "' + init[prop] + '' , () => { assert.equal( object[prop] , init[prop] ); });
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
                it( '#toObject().' + prop + ' === "' + init[prop] + '' , () => { assert.equal( object[prop] , init[prop] ); });
            }
        }
    });

    describe( '#toString()' , () =>
    {
        it('#toString() === "[TileObject]"', () => { assert.equal( new TileObject().toString() , "[TileObject]" ); });
    });
});
