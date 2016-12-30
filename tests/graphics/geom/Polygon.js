"use strict" ;

import { Polygon } from '../../../src/graphics/geom/Polygon.js' ;
import { Point } from '../../../src/graphics/geom/Point.js' ;
import { Vector2D } from '../../../src/graphics/geom/Vector2D.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'graphics.geom.Polygon' , () =>
{
    describe( '#constructor' , () =>
    {
        describe( 'new Polygon()' , () =>
        {
            let polygon = new Polygon() ;

            it( polygon + ', area === 0', () =>
            {
                assert.equal( polygon.area , 0 );
            });
            it( polygon + ', closed === true', () =>
            {
                assert.isTrue( polygon.closed );
            });
            it( polygon + ', flattened === false', () =>
            {
                assert.isFalse( polygon.flattened );
            });
            it( polygon + ', length === 0', () =>
            {
                assert.equal( polygon.length , 0 );
            });
            it( polygon + ', points === []', () =>
            {
                assert.isArray( polygon.points );
                assert.equal( polygon.points.length , 0 );
            });
        });

        describe( 'new Polygon(10,10,20,20,20,20,10,20)' , () =>
        {
            let polygon = new Polygon(10,10,20,10,20,20,10,20) ;
            it( polygon + ', area === 100', () =>
            {
                assert.equal( polygon.area , 100 );
            });
            it( polygon + ', closed === true', () =>
            {
                assert.isTrue( polygon.closed );
            });
            it( polygon + ', flattened === false', () =>
            {
                assert.isFalse( polygon.flattened );
            });
            it( polygon + ', length === 4', () =>
            {
                assert.equal( polygon.length , 4 );
            });
            it( polygon + ', points === [{x:10,y:10},{x:20,y:10},{x:20,y:20},{x:10,y:20}]', () =>
            {
                assert.isArray( polygon.points );
                assert.equal( polygon.points.length , 4 );
                assert.equal( polygon.points[0].x , 10 );
                assert.equal( polygon.points[0].y , 10 );
                assert.equal( polygon.points[1].x , 20 );
                assert.equal( polygon.points[1].y , 10 );
                assert.equal( polygon.points[2].x , 20 );
                assert.equal( polygon.points[2].y , 20 );
                assert.equal( polygon.points[3].x , 10 );
                assert.equal( polygon.points[3].y , 20 );
            });
        });

        describe( 'new Polygon({x:10,y:10},{x:20,y:10},{x:20,y:20},{x:10,y:20})' , () =>
        {
            let polygon = new Polygon({x:10,y:10},{x:20,y:10},{x:20,y:20},{x:10,y:20}) ;
            it( polygon + ', area === 100', () =>
            {
                assert.equal( polygon.area , 100 );
            });
            it( polygon + ', closed === true', () =>
            {
                assert.isTrue( polygon.closed );
            });
            it( polygon + ', flattened === false', () =>
            {
                assert.isFalse( polygon.flattened );
            });
            it( polygon + ', length === 4', () =>
            {
                assert.equal( polygon.length , 4 );
            });
            it( polygon + ', points === [{x:10,y:10},{x:20,y:10},{x:20,y:20},{x:10,y:20}]', () =>
            {
                assert.isArray( polygon.points );
                assert.equal( polygon.points.length , 4 );

                assert.instanceOf( polygon.points[0] , Point );
                assert.equal( polygon.points[0].x , 10 );
                assert.equal( polygon.points[0].y , 10 );

                assert.instanceOf( polygon.points[1] , Point );
                assert.equal( polygon.points[1].x , 20 );
                assert.equal( polygon.points[1].y , 10 );

                assert.instanceOf( polygon.points[2] , Point );
                assert.equal( polygon.points[2].x , 20 );
                assert.equal( polygon.points[2].y , 20 );

                assert.instanceOf( polygon.points[3] , Point );
                assert.equal( polygon.points[3].x , 10 );
                assert.equal( polygon.points[3].y , 20 );
            });
        });

        describe( 'new Polygon([{x:10,y:10},{x:20,y:10},{x:20,y:20},{x:10,y:20}])' , () =>
        {
            let polygon = new Polygon([{x:10,y:10},{x:20,y:10},{x:20,y:20},{x:10,y:20}]) ;
            it( polygon + ', area === 100', () =>
            {
                assert.equal( polygon.area , 100 );
            });
            it( polygon + ', closed === true', () =>
            {
                assert.isTrue( polygon.closed );
            });
            it( polygon + ', flattened === false', () =>
            {
                assert.isFalse( polygon.flattened );
            });
            it( polygon + ', length === 4', () =>
            {
                assert.equal( polygon.length , 4 );
            });
            it( polygon + ', points === [{x:10,y:10},{x:20,y:10},{x:20,y:20},{x:10,y:20}]', () =>
            {
                assert.isArray( polygon.points );
                assert.equal( polygon.points.length , 4 );
                assert.equal( polygon.points[0].x , 10 );
                assert.equal( polygon.points[0].y , 10 );
                assert.equal( polygon.points[1].x , 20 );
                assert.equal( polygon.points[1].y , 10 );
                assert.equal( polygon.points[2].x , 20 );
                assert.equal( polygon.points[2].y , 20 );
                assert.equal( polygon.points[3].x , 10 );
                assert.equal( polygon.points[3].y , 20 );
            });
        });

        describe( 'new Polygon([new Vector2D(10,10),new Vector2D(20,10),new Vector2D(20,20),new Vector2D(10,20)])' , () =>
        {
            let polygon = new Polygon([new Vector2D(10,10),new Vector2D(20,10),new Vector2D(20,20),new Vector2D(10,20)]) ;
            it( polygon + ', area === 100', () =>
            {
                assert.equal( polygon.area , 100 );
            });
            it( polygon + ', closed === true', () =>
            {
                assert.isTrue( polygon.closed );
            });
            it( polygon + ', flattened === false', () =>
            {
                assert.isFalse( polygon.flattened );
            });
            it( polygon + ', length === 4', () =>
            {
                assert.equal( polygon.length , 4 );
            });
            it( polygon + ', points === [{x:10,y:10},{x:20,y:10},{x:20,y:20},{x:10,y:20}]', () =>
            {
                assert.isArray( polygon.points );
                assert.equal( polygon.points.length , 4 );
                assert.equal( polygon.points[0].x , 10 );
                assert.equal( polygon.points[0].y , 10 );
                assert.equal( polygon.points[1].x , 20 );
                assert.equal( polygon.points[1].y , 10 );
                assert.equal( polygon.points[2].x , 20 );
                assert.equal( polygon.points[2].y , 20 );
                assert.equal( polygon.points[3].x , 10 );
                assert.equal( polygon.points[3].y , 20 );
            });
        });
    });

    describe( '#clone' , () =>
    {
        let points = [{x:10,y:10},{x:20,y:10},{x:20,y:20},{x:10,y:20}] ;
        let polygon = new Polygon(points) ;
        let clone   = polygon.clone() ;
        it( "new Polygon([{x:10,y:10},{x:20,y:10},{x:20,y:20},{x:10,y:20}]).clone()" , () =>
        {
            assert.notEqual( clone , polygon ) ;
            assert.instanceOf( clone , Polygon ) ;
            assert.equal( clone.length , polygon.length ) ;
            for( let i = 0 , len = polygon.length ; i<len ; i++ )
            {
                assert.equal( polygon.points[i].x , clone.points[i].x ) ;
                assert.equal( polygon.points[i].y , clone.points[i].y ) ;
            }
        });
    });

    describe( '#equals()' , () =>
    {
        let polygon0 = new Polygon() ;
        let polygon1 = new Polygon([{x:10,y:10},{x:20,y:10},{x:20,y:20},{x:10,y:20}]) ;
        let polygon2 = new Polygon({x:10,y:10},{x:20,y:10},{x:20,y:20},{x:10,y:20}) ;
        let polygon3 = new Polygon({x:10,y:10},{x:20,y:10},{x:20,y:20}) ;

        it( "polygon0.equal(polygon0) === false" , () => { assert.isTrue( polygon0.equals(polygon0) ) ; });
        it( "polygon0.equal(polygon1) === false" , () => { assert.isFalse( polygon0.equals(polygon1) ) ; });
        it( "polygon1.equal(polygon0) === false" , () => { assert.isFalse( polygon1.equals(polygon0) ) ; });
        it( "polygon1.equal(polygon1) === true"  , () => { assert.isTrue( polygon1.equals(polygon1) ) ; });
        it( "polygon1.equal(polygon2) === true"  , () => { assert.isTrue( polygon1.equals(polygon2) ) ; });
        it( "polygon1.equal(polygon3) === false" , () => { assert.isFalse( polygon1.equals(polygon3) ) ; });
    });

    describe( '#flatten' , () =>
    {
        let ref = [10,10,20,10,20,20,10,20] ;
        let polygon = new Polygon([{x:10,y:10},{x:20,y:10},{x:20,y:20},{x:10,y:20}]) ;
        let points = polygon.flatten().points ;

        it( "new Polygon([{x:10,y:10},{x:20,y:10},{x:20,y:20},{x:10,y:20}]).flatten().points === [10,10,20,10,20,20,10,20]" , () =>
        {
            assert.instanceOf( points , Array ) ;
            assert.lengthOf( points , ref.length ) ;
            for( let i = 0 , len = ref.length ; i<len ; i++ )
            {
                assert.equal( points[i] , ref[i] ) ;
            }
            assert.isTrue( polygon.flattened ) ;
        });

        it( "new Polygon([{x:10,y:10},{x:20,y:10},{x:20,y:20},{x:10,y:20}]).flatten().flattened === true" , () =>
        {
            assert.isTrue( polygon.flattened ) ;
        });

        it( "new Polygon().flatten().flattened === false" , () =>
        {
            assert.isFalse( (new Polygon()).flatten().flattened ) ;
        });
    });

    describe( '#setTo' , () =>
    {
        describe( 'new Polygon().setTo(10,10,20,20,20,20,10,20)' , () =>
        {
            let polygon = (new Polygon()).setTo(10,10,20,10,20,20,10,20) ;
            it( polygon + ', area === 100', () =>
            {
                assert.equal( polygon.area , 100 );
            });
            it( polygon + ', closed === true', () =>
            {
                assert.isTrue( polygon.closed );
            });
            it( polygon + ', flattened === false', () =>
            {
                assert.isFalse( polygon.flattened );
            });
            it( polygon + ', length === 4', () =>
            {
                assert.equal( polygon.length , 4 );
            });
            it( polygon + ', points === [{x:10,y:10},{x:20,y:10},{x:20,y:20},{x:10,y:20}]', () =>
            {
                assert.isArray( polygon.points );
                assert.equal( polygon.points.length , 4 );
                assert.equal( polygon.points[0].x , 10 );
                assert.equal( polygon.points[0].y , 10 );
                assert.equal( polygon.points[1].x , 20 );
                assert.equal( polygon.points[1].y , 10 );
                assert.equal( polygon.points[2].x , 20 );
                assert.equal( polygon.points[2].y , 20 );
                assert.equal( polygon.points[3].x , 10 );
                assert.equal( polygon.points[3].y , 20 );
            });
        });

        describe( 'new Polygon().setTo({x:10,y:10},{x:20,y:10},{x:20,y:20},{x:10,y:20})' , () =>
        {
            let polygon = (new Polygon()).setTo({x:10,y:10},{x:20,y:10},{x:20,y:20},{x:10,y:20}) ;
            it( polygon + ', area === 100', () =>
            {
                assert.equal( polygon.area , 100 );
            });
            it( polygon + ', closed === true', () =>
            {
                assert.isTrue( polygon.closed );
            });
            it( polygon + ', flattened === false', () =>
            {
                assert.isFalse( polygon.flattened );
            });
            it( polygon + ', length === 4', () =>
            {
                assert.equal( polygon.length , 4 );
            });
            it( polygon + ', points === [{x:10,y:10},{x:20,y:10},{x:20,y:20},{x:10,y:20}]', () =>
            {
                assert.isArray( polygon.points );
                assert.equal( polygon.points.length , 4 );

                assert.instanceOf( polygon.points[0] , Point );
                assert.equal( polygon.points[0].x , 10 );
                assert.equal( polygon.points[0].y , 10 );

                assert.instanceOf( polygon.points[1] , Point );
                assert.equal( polygon.points[1].x , 20 );
                assert.equal( polygon.points[1].y , 10 );

                assert.instanceOf( polygon.points[2] , Point );
                assert.equal( polygon.points[2].x , 20 );
                assert.equal( polygon.points[2].y , 20 );

                assert.instanceOf( polygon.points[3] , Point );
                assert.equal( polygon.points[3].x , 10 );
                assert.equal( polygon.points[3].y , 20 );
            });
        });

        describe( 'new Polygon().setTo([{x:10,y:10},{x:20,y:10},{x:20,y:20},{x:10,y:20}])' , () =>
        {
            let polygon = (new Polygon()).setTo([{x:10,y:10},{x:20,y:10},{x:20,y:20},{x:10,y:20}]) ;
            it( polygon + ', area === 100', () =>
            {
                assert.equal( polygon.area , 100 );
            });
            it( polygon + ', closed === true', () =>
            {
                assert.isTrue( polygon.closed );
            });
            it( polygon + ', flattened === false', () =>
            {
                assert.isFalse( polygon.flattened );
            });
            it( polygon + ', length === 4', () =>
            {
                assert.equal( polygon.length , 4 );
            });
            it( polygon + ', points === [{x:10,y:10},{x:20,y:10},{x:20,y:20},{x:10,y:20}]', () =>
            {
                assert.isArray( polygon.points );
                assert.equal( polygon.points.length , 4 );
                assert.equal( polygon.points[0].x , 10 );
                assert.equal( polygon.points[0].y , 10 );
                assert.equal( polygon.points[1].x , 20 );
                assert.equal( polygon.points[1].y , 10 );
                assert.equal( polygon.points[2].x , 20 );
                assert.equal( polygon.points[2].y , 20 );
                assert.equal( polygon.points[3].x , 10 );
                assert.equal( polygon.points[3].y , 20 );
            });
        });

        describe( 'new Polygon().setTo([new Vector2D(10,10),new Vector2D(20,10),new Vector2D(20,20),new Vector2D(10,20)])' , () =>
        {
            let polygon = new Polygon().setTo([new Vector2D(10,10),new Vector2D(20,10),new Vector2D(20,20),new Vector2D(10,20)]) ;
            it( polygon + ', area === 100', () =>
            {
                assert.equal( polygon.area , 100 );
            });
            it( polygon + ', closed === true', () =>
            {
                assert.isTrue( polygon.closed );
            });
            it( polygon + ', flattened === false', () =>
            {
                assert.isFalse( polygon.flattened );
            });
            it( polygon + ', length === 4', () =>
            {
                assert.equal( polygon.length , 4 );
            });
            it( polygon + ', points === [{x:10,y:10},{x:20,y:10},{x:20,y:20},{x:10,y:20}]', () =>
            {
                assert.isArray( polygon.points );
                assert.equal( polygon.points.length , 4 );
                assert.equal( polygon.points[0].x , 10 );
                assert.equal( polygon.points[0].y , 10 );
                assert.equal( polygon.points[1].x , 20 );
                assert.equal( polygon.points[1].y , 10 );
                assert.equal( polygon.points[2].x , 20 );
                assert.equal( polygon.points[2].y , 20 );
                assert.equal( polygon.points[3].x , 10 );
                assert.equal( polygon.points[3].y , 20 );
            });
        });
    });

    describe( '#toArray' , () =>
    {
        let ref = [10,10,20,10,20,20,10,20] ;
        let polygon = new Polygon([{x:10,y:10},{x:20,y:10},{x:20,y:20},{x:10,y:20}]) ;
        let array = polygon.toArray() ;
        it( "new Polygon([{x:10,y:10},{x:20,y:10},{x:20,y:20},{x:10,y:20}]).toArray() === [10,10,20,10,20,20,10,20]" , () =>
        {
            assert.instanceOf( array , Array ) ;
            assert.lengthOf( array , ref.length ) ;
            for( let i = 0 , len = ref.length ; i<len ; i++ )
            {
                assert.equal( array[i] , ref[i] ) ;
            }
        });
    });

    describe( '#toObject' , () =>
    {
        let points = [{x:10,y:10},{x:20,y:10},{x:20,y:20},{x:10,y:20}] ;
        let polygon = new Polygon(points) ;
        let array = polygon.toObject() ;
        it( "new Polygon([{x:10,y:10},{x:20,y:10},{x:20,y:20},{x:10,y:20}]).toArray() === [{x:10,y:10},{x:20,y:10},{x:20,y:20},{x:10,y:20}]" , () =>
        {
            assert.instanceOf( array , Array ) ;
            assert.lengthOf( array , points.length ) ;
            for( let i = 0 , len = points.length ; i<len ; i++ )
            {
                assert.equal( points[i].constructor , Object ) ;
                assert.equal( array[i].x , points[i].x ) ;
                assert.equal( array[i].y , points[i].y ) ;
            }
        });
    });

    describe( '#toString()' , () =>
    {
        it('new Polygon().toString() === "[Polygon]"', () =>
        {
            assert.equal( new Polygon().toString() , "[Polygon]" );
        });
    });
});
