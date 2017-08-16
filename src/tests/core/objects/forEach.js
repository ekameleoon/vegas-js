"use strict" ;

import { forEach } from '../../../core/objects/forEach.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.objects.forEach' , () =>
{
    it('#forEach(array , action)' , () =>
    {
        let action = function( value , key , ref )
        {
            ref[key] = value + 1 ;
        }

        let array = [ 1 , 2 , 3 , 4 , 5 ] ;

        forEach( array , action ) ;

        assert.equal( array[0] , 2 );
        assert.equal( array[1] , 3 );
        assert.equal( array[2] , 4 );
        assert.equal( array[3] , 5 );
        assert.equal( array[4] , 6 );
    });

    it('#forEach(object , action)' , () =>
    {
        let action = function( value , key , ref )
        {
            ref[key] = value + 1 ;
        }

        let object = { one:1 , two:2 , three:3 , four:4 , five:5 } ;

        forEach( object , action ) ;

        assert.equal( object.one   , 2 );
        assert.equal( object.two   , 3 );
        assert.equal( object.three , 4 );
        assert.equal( object.four  , 5 );
        assert.equal( object.five  , 6 );
    });

    it('forEach(object, action, context)' , () =>
    {
        let action = function( value , key , ref )
        {
            if( this === context )
            {
                ref[key] = context[key] ;
            }
        }

        let object  = { one:1 , two:2 , three:3 , four:4 , five:5 } ;
        let context = { one:10 , two:20 , three:30 , four:40 , five:50 } ;

        forEach( object , action , context ) ;

        assert.equal( object.one   , 10 );
        assert.equal( object.two   , 20 );
        assert.equal( object.three , 30 );
        assert.equal( object.four  , 40 );
        assert.equal( object.five  , 50 );
    });

    it('#forEach( object, action, null, 3)' , () =>
    {
        let action = function( value , key , ref )
        {
            ref[key] = value + 1 ;
            return value ;
        }

        let object = { one:1 , two:2 , three:3 , four:4 , five:5 } ;

        forEach( object , action , null , 3 ) ;

        assert.equal( object.one   , 2 );
        assert.equal( object.two   , 3 );
        assert.equal( object.three , 4 );
        assert.equal( object.four  , 4 );
        assert.equal( object.five  , 5 );
    });
});
