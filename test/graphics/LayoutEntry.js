"use strict" ;

import { LayoutEntry } from 'graphics/LayoutEntry.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'graphics.LayoutEntry' , () =>
{
    describe( 'new LayoutEntry()' , () =>
    {
        let entry = new LayoutEntry() ;

        it('entry.constructor === LayoutEntry' , () => { assert.equal( entry.constructor , LayoutEntry ); });

        it('entry.child === null' , () => { assert.isNull( entry.child ); });
        it('entry.x  === 0' , () => { assert.equal( entry.x  , 0 ); });
        it('entry.y  === 0' , () => { assert.equal( entry.y  , 0 ); });
        it('entry.tx === 0' , () => { assert.equal( entry.tx , 0 ); });
        it('entry.ty === 0' , () => { assert.equal( entry.ty , 0 ); });
    });

    describe( 'new LayoutEntry(child)' , () =>
    {
        let child = { x : 25 , y : 35 } ;
        let entry = new LayoutEntry(child) ;
        it('entry.child === child' , () => { assert.equal( entry.child , child ); });
        it('entry.x  === 25' , () => { assert.equal( entry.x , 25 ); });
        it('entry.y  === 35' , () => { assert.equal( entry.y , 35 ); });
        it('entry.tx ===  0' , () => { assert.equal( entry.tx , 0 ); });
        it('entry.ty ===  0' , () => { assert.equal( entry.ty , 0 ); });
    });
}) ;
