/*jshint loopfunc: true */
"use strict" ;

import { ObjectGroup } from '../../../graphics/tmx/ObjectGroup.js' ;
import { Layer }      from '../../../graphics/tmx/Layer.js' ;
//import { TileObject } from '../../../graphics/tmx/TileObject.js' ;

import chai from 'chai' ;
const assert = chai.assert ;

describe( 'graphics.tmx.ObjectGroup' , () =>
{
    let defaultValues =
    {
        color      : null ,
        draworder  : 'topdown' ,
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
        color      : '#FF0000' ,
        draworder  : 'index' ,
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
        describe( 'new ObjectGroup()' , () =>
        {
            let layer = new ObjectGroup() ;
            it( 'new ObjectGroup() extends Layer' , () => { assert.instanceOf( layer , Layer ); });
            it( 'new ObjectGroup().constructor === ObjectGroup' , () => { assert.equal( layer.constructor , ObjectGroup ); });
            for( let prop in defaultValues )
            {
                if( prop in defaultValues )
                {
                    it( 'new ObjectGroup(init).' + prop + ' === ' + defaultValues[prop] , () =>
                    {
                        assert.equal( layer[prop] , defaultValues[prop] );
                    });
                }
            }
        });

        describe( 'new ObjectGroup(init)' , () =>
        {
            let layer = new ObjectGroup(init) ;
            for( let prop in init )
            {
                if( prop in init )
                {
                    it( 'new ObjectGroup(init).' + prop + ' === ' + init[prop] , () =>
                    {
                        assert.equal( layer[prop] , init[prop] );
                    });
                }
            }
        });
    });

    describe( '#clone' , () =>
    {
        let layer = new ObjectGroup(init) ;
        let clone = layer.clone() ;
        it( "#clone() not equal" , () => { assert.notEqual( clone , layer ) ; });
        it( "#clone() instanceOf Layer" , () => { assert.instanceOf( clone , Layer ) ; });
        for( let prop in init )
        {
            if( prop in init )
            {
                switch( prop )
                {
                    case 'objects' :
                    {
                        // it( 'new ObjectGroup(init).clone().objects instanceof Array' , () =>
                        // {
                        //     assert.equal( clone[prop].constructor , Array );
                        // });
                        break;
                    }
                    default :
                    {
                        it( 'new ObjectGroup(init).clone().' + prop + ' === ' + init[prop] , () =>
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
        let layer = new ObjectGroup() ;
        layer.setTo(init)  ;
        for( let prop in init )
        {
            if( prop in init )
            {
                it( 'new ObjectGroup(init).' + prop + ' === ' + init[prop] , () =>
                {
                    assert.equal( layer[prop] , init[prop] );
                });
            }
        }
    });

    describe( '#toObject' , () =>
    {
        let layer = new ObjectGroup(init) ;
        let object = layer.toObject() ;

        it( 'new ObjectGroup(init).toObject() not equals' , () => { assert.notEqual( object , layer ) ; });
        it( 'new ObjectGroup(init).toObject() is a generic object' , () => { assert.instanceOf( object.constructor , Object ) ; });

        for( let prop in init )
        {
            if( prop !== 'objects' )
            {
                it( 'new ObjectGroup(init).toObject().' + prop + ' === ' + init[prop] , () =>
                {
                    assert.equal( object[prop] , init[prop] );
                });
            }
        }

        // it( 'new ObjectGroup(init).toObject().objects.constructor === Array' , () =>
        // {
        //     assert.equal( object.objects.constructor , Array );
        // });
    });

    describe( '#toString()' , () =>
    {
        it('new ObjectGroup().toString() === "[ObjectGroup]"', () =>
        {
            assert.equal( new ObjectGroup().toString() , "[ObjectGroup]" );
        });
    });
});
