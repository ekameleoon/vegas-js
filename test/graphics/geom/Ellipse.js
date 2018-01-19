"use strict" ;

import { dump } from 'core/dump.js' ;
import { Dimension } from 'graphics/geom/Dimension.js' ;
import { Ellipse } from 'graphics/geom/Ellipse.js' ;
import { Rectangle } from 'graphics/geom/Rectangle.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'graphics.geom.Ellipse' , () =>
{
    describe( '#constructor' , () =>
    {
        describe( 'new Ellipse()' , () =>
        {
            let ellipse = new Ellipse() ;
            it('new Rectangle() instanceof Dimension', () =>
            {
                assert.instanceOf( ellipse , Dimension );
            });
            it('new Ellipse().x === 0', () =>
            {
                assert.equal( ellipse.x , 0 );
            });
            it('new Ellipse().y === 0', () =>
            {
                assert.equal( ellipse.y , 0 );
            });
            it('new Ellipse().width === 0', () =>
            {
                assert.equal( ellipse.width  , 0 );
            });
            it('new Ellipse().height === 0', () =>
            {
                assert.equal( ellipse.height , 0 );
            });
        });

        describe( 'new Ellipse(10,20,500,400)' , () =>
        {
            let ellipse = new Ellipse(10,20,500,400) ;
            it('new Ellipse(10,20,500,400).x === 10', () =>
            {
                assert.equal( ellipse.x , 10 );
            });
            it('new Ellipse(10,20,500,400).y === 20', () =>
            {
                assert.equal( ellipse.y , 20 );
            });
            it('new Ellipse(10,20,500,400).width === 500', () =>
            {
                assert.equal( ellipse.width , 500 );
            });
            it('new Ellipse(10,20,500,400).heigth === 400', () =>
            {
                assert.equal( ellipse.height , 400 );
            });
        });
    });

    describe( '#area' , () =>
    {
        it('new Ellipse(0,0,40,12).area === 480', () =>
        {
            assert.equal( new Ellipse(0,0,40,12).area , (40*12)/2*Math.PI ) ;
        }) ;
    });

    describe( '#clone()' , () =>
    {
        let ellipse   = new Ellipse(10,20,100,200) ;
        let clone = ellipse.clone() ;
        it('new Ellipse(10,20,100,200).clone() is an instance of Ellipse.', () =>
        {
            assert.instanceOf( clone , Ellipse );
        });
        it('new Ellipse(10,20).clone() is not the same reference.', () =>
        {
            assert.notEqual( clone , ellipse );
        });
        it('new Ellipse(10,20).clone() has the same x value', () =>
        {
            assert.equal( clone.x , ellipse.x );
        });
        it('new Ellipse(10,20).clone() has the same y value', () =>
        {
            assert.equal( clone.y , ellipse.y );
        });
        it('new Ellipse(10,20).clone() has the same height value', () =>
        {
            assert.equal( clone.height , ellipse.height );
        });
        it('new Ellipse(10,20).clone() has the same width value', () =>
        {
            assert.equal( clone.width  , ellipse.width  );
        });
    });

    describe( '#contains()' , () =>
    {
        it('new Ellipse(10,20,100,200).contains(10,20) === false', () =>
        {
            assert.isFalse( new Ellipse(10,20,100,200).contains(10,20) );
        }) ;

        it('new Ellipse(10,20,100,200).contains(50,60) === true', () =>
        {
            assert.isTrue( new Ellipse(10,20,100,200).contains(50,100) );
        }) ;

        it('new Ellipse(10,20,100,200).contains(9,20) === false', () =>
        {
            assert.isFalse( new Ellipse(10,20,100,200).contains(9,20) );
        }) ;

        it('new Ellipse(10,20,100,200).contains(111,20) === false', () =>
        {
            assert.isFalse( new Ellipse(10,20,100,200).contains(111,20) );
        }) ;

        it('new Ellipse(10,20,100,200).contains(10,19) === false', () =>
        {
            assert.isFalse( new Ellipse(10,20,100,200).contains(10,19) );
        }) ;

        it('new Ellipse(10,20,100,200).contains(110,19) === false', () =>
        {
            assert.isFalse( new Ellipse(10,20,100,200).contains(110,19) );
        }) ;

        it('new Ellipse(10,20,100,200).contains(500,600) === false', () =>
        {
            assert.isFalse( new Ellipse(10,20,100,200).contains(500,600) );
        }) ;
    });

    describe( '#copyFrom()' , () =>
    {
        let ellipse1 = new Ellipse() ;
        let ellipse2 = new Ellipse(10,20,100,200) ;
        let ellipse3 = ellipse1.copyFrom( ellipse2 ) ;
        it('new Ellipse().copyFrom(new Ellipse(10,20,100,200))', () =>
        {
            assert.strictEqual( ellipse1 , ellipse3 );
            assert.notStrictEqual( ellipse1 , ellipse2 );
        }) ;
        it('new Ellipse().copyFrom(new Ellipse(10,20,100,200)) test x', () =>
        {
            assert.equal( ellipse1.x , ellipse2.x );
        }) ;
        it('new Ellipse().copyFrom(new Ellipse(10,20,100,200)) test y', () =>
        {
            assert.equal( ellipse1.y , ellipse2.y );
        }) ;
        it('new Ellipse().copyFrom(new Ellipse(10,20,100,200)) test width', () =>
        {
            assert.equal( ellipse1.height , ellipse2.height );
        }) ;
        it('new Ellipse().copyFrom(new Ellipse(10,20,100,200)) test width', () =>
        {
            assert.equal( ellipse1.width , ellipse2.width );
        }) ;
    });

    describe( '#equals()' , () =>
    {
        let ellipse1 = new Ellipse(10,20,30,40) ;
        let ellipse2 = new Ellipse(10,20,30,40) ;
        let ellipse3 = new Ellipse(40,30,20,10) ;
        let ellipse4 = new Ellipse() ;

        let obj1 = { x:10 , y:20 , width:30 , height:40 } ;
        let obj2 = { x:54 , y:64 , width:74 , height:84 } ;

        it( ellipse1 + '.equals(' + ellipse2 + ') === true', () =>
        {
            assert.isTrue( ellipse1.equals(ellipse1) );
            assert.isTrue( ellipse1.equals(ellipse2) );
        });

        it( ellipse1 + '.equals(' + dump(obj1) + ') === false', () =>
        {
            assert.isFalse( ellipse1.equals(obj1) );
        });

        it( ellipse1 + '.equals(' + dump(obj1) + ',true) === false', () =>
        {
            assert.isFalse( ellipse1.equals(obj1) );
        });

        it( ellipse1 + '.equals(' + dump(obj1) + ',false) === true', () =>
        {
            assert.isTrue( ellipse1.equals(obj1,false) );
        });

        it( ellipse1 + '.equals(' + dump(obj2) + ',false) === false', () =>
        {
            assert.isFalse( ellipse1.equals(obj2,false) );
        });

        it( ellipse1 + '.equals(' + ellipse3 + ') === false', () =>
        {
            assert.isFalse( ellipse1.equals(ellipse3) );
        });

        it( ellipse1 + '.equals(' + ellipse3 + ') === false', () =>
        {
            assert.isFalse( ellipse1.equals(ellipse3) );
        });

        it( ellipse1 + '.equals(' + ellipse4 + ') === false', () =>
        {
            assert.isFalse( ellipse1.equals(ellipse4) );
        });

        it( ellipse1 + '.equals() === false', () =>
        {
            assert.isFalse( ellipse1.equals() );
        });

        it( ellipse1 + '.equals(null) === false', () =>
        {
            assert.isFalse( ellipse1.equals(null) );
        });

        it( ellipse1 + '.equals("foo") === false', () =>
        {
            assert.isFalse( ellipse1.equals('foo') );
        });
    });

    describe( '#setTo()' , () =>
    {
        it('new Ellipse(10,20,30,40).setTo()', () =>
        {
            let ellipse = new Ellipse(10,20,30,40) ;
            let now = ellipse.setTo() ;
            assert.strictEqual( ellipse , now );
            assert.equal( ellipse.x, 0 );
            assert.equal( ellipse.y, 0 );
            assert.equal( ellipse.width, 0 );
            assert.equal( ellipse.height, 0 );
        });

        it('new Ellipse(10,10).setTo(0,0,0,0)', () =>
        {
            let ellipse = new Ellipse(10,20,30,40) ;
            let now = ellipse.setTo(0,0,0,0) ;
            assert.strictEqual( ellipse , now );
            assert.equal( ellipse.x, 0 );
            assert.equal( ellipse.y, 0 );
            assert.equal( ellipse.width, 0 );
            assert.equal( ellipse.height, 0 );
        });

        it('new Ellipse(10,20,30,40).setTo(100,200,300,400)', () =>
        {
            let ellipse = new Ellipse(10,20,30,40) ;
            let now = ellipse.setTo(100,200,300,400) ;
            assert.strictEqual( ellipse , now );
            assert.equal( ellipse.x, 100 );
            assert.equal( ellipse.y, 200 );
            assert.equal( ellipse.width, 300 );
            assert.equal( ellipse.height, 400 );
        });
    });

    describe( '#toObject()' , () =>
    {
        let ellipse = new Rectangle(10,20,100,200) ;
        let obj = ellipse.toObject() ;
        it('new Ellipse(10,20,100,200).toObject() is a generic Object', () =>
        {
            assert.isTrue( obj.constructor === Object );
        });
        it('new Ellipse(10,20,100,200).toObject(), x test', () =>
        {
            assert.equal( obj.x , 10 );
        });
        it('new Ellipse(10,20,100,200).toObject(), y test', () =>
        {
            assert.equal( obj.y , 20 );
        });
        it('new Ellipse(10,20,100,200).toObject(), height test', () =>
        {
            assert.equal( obj.height , 200 );
        });
        it('new Ellipse(10,20,100,200).toObject(), width test', () =>
        {
            assert.equal( obj.width , 100 );
        });
    });

    describe( '#toString()' , () =>
    {
        it('new Ellipse().toString() === "[Ellipse x:0 y:0 width:0 height:0]"', () =>
        {
            assert.equal( new Ellipse().toString() , "[Ellipse x:0 y:0 width:0 height:0]" );
        });

        it('new Ellipse(10,20,100,200).toString() === "[Ellipse x:10 y:20 width:100 height:200]"', () =>
        {
            assert.equal( new Ellipse(10,20,100,200).toString() , "[Ellipse x:10 y:20 width:100 height:200]" );
        });

        it('new Ellipse(-10,-20,-100,-200).toString() === "[Ellipse x:-10 y:-20 width:-100 height:-200]"', () =>
        {
            assert.equal( new Ellipse(-10,-20,-100,-200).toString() , "[Ellipse x:-10 y:-20 width:-100 height:-200]" );
        });
    });
});
