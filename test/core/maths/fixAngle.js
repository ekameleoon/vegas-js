"use strict" ;

import { fixAngle } from 'core/maths/fixAngle.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.maths.fixAngle' , () =>
{
    it('fixAngle(0) ===  -1' , () => { assert.equal( fixAngle(-1)  , 359 ); });
    it('fixAngle(0) ===   0' , () => { assert.equal( fixAngle(0)   ,   0 ); });
    it('fixAngle(0) === 360' , () => { assert.equal( fixAngle(360) ,   0 ); });
    it('fixAngle(0) === 361' , () => { assert.equal( fixAngle(361) ,   1 ); });
});
