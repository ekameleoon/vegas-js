"use strict" ;

import { dump }      from '../../../src/core/dump.js' ;
import { Dimension } from '../../../src/graphics/geom/Dimension.js' ;
import { Point }     from '../../../src/graphics/geom/Point.js' ;
import { Rectangle } from '../../../src/graphics/geom/Rectangle.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'graphics.geom.Rectangle' , () =>
{
    describe( '#constructor' , () =>
    {
        describe( 'new Rectangle()' , () =>
        {
            let rec = new Rectangle() ;
            it('new Rectangle() instanceof Dimension', () =>
            {
                assert.instanceOf( rec , Dimension );
            });
            it('new Rectangle().x === 0', () =>
            {
                assert.equal( rec.x , 0 );
            });
            it('new Rectangle().y === 0', () =>
            {
                assert.equal( rec.y , 0 );
            });
            it('new Rectangle().width === 0', () =>
            {
                assert.equal( rec.width  , 0 );
            });
            it('new Rectangle().height === 0', () =>
            {
                assert.equal( rec.height , 0 );
            });
        });

        describe( 'new Rectangle(10,20,500,400)' , () =>
        {
            let rec = new Rectangle(10,20,500,400) ;
            it('new Rectangle(10,20,500,400).x === 10', () =>
            {
                assert.equal( rec.x , 10 );
            });
            it('new Rectangle(10,20,500,400).y === 20', () =>
            {
                assert.equal( rec.y , 20 );
            });
            it('new Rectangle(10,20,500,400).width === 500', () =>
            {
                assert.equal( rec.width , 500 );
            });
            it('new Rectangle(10,20,500,400).heigth === 400', () =>
            {
                assert.equal( rec.height , 400 );
            });
        });
    });

    describe( '#area' , () =>
    {
        it('new Rectangle(0,0,40,12).area === 480', () =>
        {
            assert.equal( new Rectangle(0,0,40,12).area , 480 ) ;
        }) ;
    });

    describe( '#perimeter' , () =>
    {
        it('new Rectangle(0,0,40,12).perimeter === 104', () =>
        {
            let rec = new Rectangle(0,0,40,12) ;
            assert.equal( rec.perimeter , 104 ) ;
        }) ;
    });

    describe( '#clone()' , () =>
    {
        let rec   = new Rectangle(10,20,100,200) ;
        let clone = rec.clone() ;
        it('new Rectangle(10,20,100,200).clone() is an instance of Rectangle.', () =>
        {
            assert.instanceOf( clone , Rectangle );
        });
        it('new Rectangle(10,20).clone() is not the same reference.', () =>
        {
            assert.notEqual( clone , rec );
        });
        it('new Rectangle(10,20).clone() has the same x value', () =>
        {
            assert.equal( clone.x , rec.x );
        });
        it('new Rectangle(10,20).clone() has the same y value', () =>
        {
            assert.equal( clone.y , rec.y );
        });
        it('new Rectangle(10,20).clone() has the same height value', () =>
        {
            assert.equal( clone.height , rec.height );
        });
        it('new Rectangle(10,20).clone() has the same width value', () =>
        {
            assert.equal( clone.width  , rec.width  );
        });
    });

    describe( '#contains()' , () =>
    {
        it('new Rectangle(10,20,100,200).contains(10,20) === true', () =>
        {
            assert.isTrue( new Rectangle(10,20,100,200).contains(10,20) );
        }) ;

        it('new Rectangle(10,20,100,200).contains(50,60) === true', () =>
        {
            assert.isTrue( new Rectangle(10,20,100,200).contains(50,100) );
        }) ;

        it('new Rectangle(10,20,100,200).contains(9,20) === false', () =>
        {
            assert.isFalse( new Rectangle(10,20,100,200).contains(9,20) );
        }) ;

        it('new Rectangle(10,20,100,200).contains(111,20) === false', () =>
        {
            assert.isFalse( new Rectangle(10,20,100,200).contains(111,20) );
        }) ;

        it('new Rectangle(10,20,100,200).contains(10,19) === false', () =>
        {
            assert.isFalse( new Rectangle(10,20,100,200).contains(10,19) );
        }) ;

        it('new Rectangle(10,20,100,200).contains(110,19) === false', () =>
        {
            assert.isFalse( new Rectangle(10,20,100,200).contains(110,19) );
        }) ;

        it('new Rectangle(10,20,100,200).contains(500,600) === false', () =>
        {
            assert.isFalse( new Rectangle(10,20,100,200).contains(500,600) );
        }) ;
    });

    describe( '#containsPoint()' , () =>
    {
        it('new Rectangle(10,20,100,200).contains(new Point(10,20)) === true', () =>
        {
            assert.isTrue( new Rectangle(10,20,100,200).containsPoint(new Point(10,20)) );
        }) ;

        it('new Rectangle(10,20,100,200).contains(new Point(50,60)) === true', () =>
        {
            assert.isTrue( new Rectangle(10,20,100,200).containsPoint(new Point(50,100)) );
        }) ;

        it('new Rectangle(10,20,100,200).contains(new Point(9,20)) === false', () =>
        {
            assert.isFalse( new Rectangle(10,20,100,200).containsPoint(new Point(9,20)) );
        }) ;

        it('new Rectangle(10,20,100,200).contains(new Point(111,20)) === false', () =>
        {
            assert.isFalse( new Rectangle(10,20,100,200).containsPoint(new Point(111,20)) );
        }) ;

        it('new Rectangle(10,20,100,200).contains(new Point(10,19)) === false', () =>
        {
            assert.isFalse( new Rectangle(10,20,100,200).containsPoint(new Point(10,19)) );
        }) ;

        it('new Rectangle(10,20,100,200).contains(new Point(110,19)) === false', () =>
        {
            assert.isFalse( new Rectangle(10,20,100,200).containsPoint(new Point(110,19)) );
        }) ;

        it('new Rectangle(10,20,100,200).contains(new Point(500,600)) === false', () =>
        {
            assert.isFalse( new Rectangle(10,20,100,200).containsPoint(new Point(500,600)) );
        }) ;
    });

    describe( '#copyFrom()' , () =>
    {
        let rec1 = new Rectangle() ;
        let rec2 = new Rectangle(10,20,100,200) ;
        let rec3 = rec1.copyFrom( rec2 ) ;
        it('new Rectangle().copyFrom(new Rectangle(10,20,100,200))', () =>
        {
            assert.strictEqual( rec1 , rec3 );
            assert.notStrictEqual( rec1 , rec2 );
        }) ;
        it('new Rectangle().copyFrom(new Rectangle(10,20,100,200)) test x', () =>
        {
            assert.equal( rec1.x , rec2.x );
        }) ;
        it('new Rectangle().copyFrom(new Rectangle(10,20,100,200)) test y', () =>
        {
            assert.equal( rec1.y , rec2.y );
        }) ;
        it('new Rectangle().copyFrom(new Rectangle(10,20,100,200)) test width', () =>
        {
            assert.equal( rec1.height , rec2.height );
        }) ;
        it('new Rectangle().copyFrom(new Rectangle(10,20,100,200)) test width', () =>
        {
            assert.equal( rec1.width , rec2.width );
        }) ;
    });

    describe( '#equals()' , () =>
    {
        let rec1 = new Rectangle(10,20,30,40) ;
        let rec2 = new Rectangle(10,20,30,40) ;
        let rec3 = new Rectangle(40,30,20,10) ;
        let rec4 = new Rectangle() ;

        let obj1 = { x:10 , y:20 , width:30 , height:40 } ;
        let obj2 = { x:54 , y:64 , width:74 , height:84 } ;

        it( rec1 + '.equals(' + rec2 + ') === true', () =>
        {
            assert.isTrue( rec1.equals(rec1) );
            assert.isTrue( rec1.equals(rec2) );
        });

        it( rec1 + '.equals(' + dump(obj1) + ') === false', () =>
        {
            assert.isFalse( rec1.equals(obj1) );
        });

        it( rec1 + '.equals(' + dump(obj1) + ',true) === false', () =>
        {
            assert.isFalse( rec1.equals(obj1) );
        });

        it( rec1 + '.equals(' + dump(obj1) + ',false) === true', () =>
        {
            assert.isTrue( rec1.equals(obj1,false) );
        });

        it( rec1 + '.equals(' + dump(obj2) + ',false) === false', () =>
        {
            assert.isFalse( rec1.equals(obj2,false) );
        });

        it( rec1 + '.equals(' + rec3 + ') === false', () =>
        {
            assert.isFalse( rec1.equals(rec3) );
        });

        it( rec1 + '.equals(' + rec3 + ') === false', () =>
        {
            assert.isFalse( rec1.equals(rec3) );
        });

        it( rec1 + '.equals(' + rec4 + ') === false', () =>
        {
            assert.isFalse( rec1.equals(rec4) );
        });

        it( rec1 + '.equals() === false', () =>
        {
            assert.isFalse( rec1.equals() );
        });

        it( rec1 + '.equals(null) === false', () =>
        {
            assert.isFalse( rec1.equals(null) );
        });

        it( rec1 + '.equals("foo") === false', () =>
        {
            assert.isFalse( rec1.equals('foo') );
        });
    });

    describe( '#setTo()' , () =>
    {
        it('new Rectangle(10,20,30,40).setTo()', () =>
        {
            let rec = new Rectangle(10,20,30,40) ;
            let now = rec.setTo() ;
            assert.strictEqual( rec , now );
            assert.equal( rec.x, 0 );
            assert.equal( rec.y, 0 );
            assert.equal( rec.width, 0 );
            assert.equal( rec.height, 0 );
        });

        it('new Rectangle(10,10).setTo(0,0,0,0)', () =>
        {
            let rec = new Rectangle(10,20,30,40) ;
            let now = rec.setTo(0,0,0,0) ;
            assert.strictEqual( rec , now );
            assert.equal( rec.x, 0 );
            assert.equal( rec.y, 0 );
            assert.equal( rec.width, 0 );
            assert.equal( rec.height, 0 );
        });

        it('new Rectangle(10,20,30,40).setTo(100,200,300,400)', () =>
        {
            let rec = new Rectangle(10,20,30,40) ;
            let now = rec.setTo(100,200,300,400) ;
            assert.strictEqual( rec , now );
            assert.equal( rec.x, 100 );
            assert.equal( rec.y, 200 );
            assert.equal( rec.width, 300 );
            assert.equal( rec.height, 400 );
        });
    });

    describe( '#toObject()' , () =>
    {
        let rec = new Rectangle(10,20,100,200) ;
        let obj = rec.toObject() ;
        it('new Rectangle(10,20,100,200).toObject() is a generic Object', () =>
        {
            assert.isTrue( obj.constructor === Object );
        });
        it('new Rectangle(10,20,100,200).toObject(), x test', () =>
        {
            assert.equal( obj.x , 10 );
        });
        it('new Rectangle(10,20,100,200).toObject(), y test', () =>
        {
            assert.equal( obj.y , 20 );
        });
        it('new Rectangle(10,20,100,200).toObject(), height test', () =>
        {
            assert.equal( obj.height , 200 );
        });
        it('new Rectangle(10,20,100,200).toObject(), width test', () =>
        {
            assert.equal( obj.width , 100 );
        });
    });

    describe( '#toString()' , () =>
    {
        it('new Rectangle().toString() === "[Rectangle x:0 y:0 width:0 height:0]"', () =>
        {
            assert.equal( new Rectangle().toString() , "[Rectangle x:0 y:0 width:0 height:0]" );
        });

        it('new Rectangle(10,20,100,200).toString() === "[Rectangle x:10 y:20 width:100 height:200]"', () =>
        {
            assert.equal( new Rectangle(10,20,100,200).toString() , "[Rectangle x:10 y:20 width:100 height:200]" );
        });

        it('new Rectangle(-10,-20,-100,-200).toString() === "[Rectangle x:-10 y:-20 width:-100 height:-200]"', () =>
        {
            assert.equal( new Rectangle(-10,-20,-100,-200).toString() , "[Rectangle x:-10 y:-20 width:-100 height:-200]" );
        });
    });
});
