
"use strict" ;

import { Style }  from 'molecule/Style.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'molecule.Style' , () =>
{
    describe( 'new molecule.Style()' , () =>
    {
        let builder = new Style() ;
        it('builder.constructor' , () => { assert.equal( builder.constructor, Style ); });
    });
}) ;
