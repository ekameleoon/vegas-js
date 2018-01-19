
"use strict" ;

import { Builder }  from 'molecule/Builder.js' ;
import { Runnable } from 'system/process/Runnable.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'molecule.Builder' , () =>
{
    describe( 'new molecule.Builder()' , () =>
    {
        let builder = new Builder() ;
        it('builder is Runnable' , () => { assert.instanceOf( builder, Runnable ); });
        it('builder.constructor' , () => { assert.equal( builder.constructor, Builder ); });
        it('builder.target === null' , () => { assert.isNull( builder.target ); });
    });

    describe( 'new molecule.Builder(target)' , () =>
    {
        let target  = {} ;
        let builder = new Builder(target) ;
        it('builder is Runnable' , () => { assert.instanceOf( builder, Runnable ); });
        it('builder.constructor' , () => { assert.equal( builder.constructor, Builder ); });
        it('builder.target === target' , () => { assert.equal( builder.target , target ); });
    });
}) ;
