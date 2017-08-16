"use strict" ;

import { ColorTransform } from '../../../graphics/geom/ColorTransform.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'graphics.geom.ColorTransform' , () =>
{
    describe( '#constructor' , () =>
    {
        describe( 'new ColorTransform()' , () =>
        {
            let color = new ColorTransform() ;

            it( 'redMultiplier'   , () => { assert.equal( color.redMultiplier   , 1 ); });
            it( 'greenMultiplier' , () => { assert.equal( color.greenMultiplier , 1 ); });
            it( 'blueMultiplier'  , () => { assert.equal( color.blueMultiplier  , 1 ); });
            it( 'alphaMultiplier' , () => { assert.equal( color.alphaMultiplier , 1 ); });

            it( 'redOffset'   , () => { assert.equal( color.redOffset   , 0 ); });
            it( 'greenOffset' , () => { assert.equal( color.greenOffset , 0 ); });
            it( 'blueOffset'  , () => { assert.equal( color.blueOffset  , 0 ); });
            it( 'alphaOffset' , () => { assert.equal( color.alphaOffset , 0 ); });
        });

        describe( 'new ColorTransform().toString()' , () =>
        {
            it('new ColorTransform().toString() === "[ColorTransform redMultiplier:1 greenMultiplier:1 blueMultiplier:1 alphaMultiplier:1 redOffset:0 greenOffset:0 blueOffset:0 alphaOffset:0]"', () =>
            {
                assert.equal( new ColorTransform().toString() , "[ColorTransform redMultiplier:1 greenMultiplier:1 blueMultiplier:1 alphaMultiplier:1 redOffset:0 greenOffset:0 blueOffset:0 alphaOffset:0]" );
            });

            it('new ColorTransform(5,6,7,8,100,101,102,103).toString() === "[ColorTransform redMultiplier:5 greenMultiplier:6 blueMultiplier:7 alphaMultiplier:8 redOffset:100 greenOffset:101 blueOffset:102 alphaOffset:103]"', () =>
            {
                assert.equal( new ColorTransform(5,6,7,8,100,101,102,103).toString() , "[ColorTransform redMultiplier:5 greenMultiplier:6 blueMultiplier:7 alphaMultiplier:8 redOffset:100 greenOffset:101 blueOffset:102 alphaOffset:103]" );
            });
        });
    });
});
