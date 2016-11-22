"use strict" ;

import { Task }   from '../../src/system/process/Task.js' ;
import { Signal } from '../../src/system/signals/Signal.js' ;

import { Align }            from '../../src/graphics/Align.js' ;
import { Layout }           from '../../src/graphics/Layout.js' ;
import { LayoutBufferMode } from '../../src/graphics/LayoutBufferMode.js' ;
import { Rectangle }        from '../../src/graphics/geom/Rectangle.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'graphics.Layout' , () =>
{
    let layout = new Layout() ;

    it('layout   is Task'   , () => { assert.instanceOf( layout          , Task   ); });
    it('renderer is Signal' , () => { assert.instanceOf( layout.renderer , Signal ); });
    it('updater  is Signal' , () => { assert.instanceOf( layout.updater  , Signal ); });

    it('layout.align === Align.TOP_LEFT' , () =>
    {
        assert.equal( layout.align , Align.TOP_LEFT );
    });

    it('layout.bounds === [Rectangle x:0 y:0 width:0 height:0]' , () =>
    {
        assert.instanceOf( layout.bounds , Rectangle );
        assert.equal( layout.bounds.x , 0 );
        assert.equal( layout.bounds.y , 0 );
        assert.equal( layout.bounds.width , 0 );
        assert.equal( layout.bounds.height , 0 );
    });

    it('layout.bufferMode === LayoutBufferMode.AUTO' , () =>
    {
        assert.equal( layout.bufferMode , LayoutBufferMode.AUTO );
    });

    it('layout.container === null' , () =>
    {
        assert.isNull( layout.container );
    });

    it('layout.measuredHeight === 0' , () =>
    {
        assert.equal( layout.measuredHeight , 0 );
    });

    it('layout.measuredWidth === 0' , () =>
    {
        assert.equal( layout.measuredWidth , 0 );
    });

}) ;
