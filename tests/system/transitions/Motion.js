"use strict" ;


import { Motion }     from '../../../src/system/transitions/Motion.js' ;
import { Transition } from '../../../src/system/transitions/Transition.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'system/transitions/Motion.js' , () =>
{
    var m = new Motion() ;

    it('instanceof Transition', () =>
    {
        assert.isTrue( m instanceof Transition );
    })

    it('default id === null', () =>
    {
        assert.strictEqual( m.id , null );
    })

    it('new Motion(1).id === 1', () =>
    {
        assert.strictEqual( new Motion(1).id , 1 );
    })

    it('id=2 === 2', () =>
    {
        m.id = 2 ;
        assert.strictEqual( m.id , 2 );
    })

    it('new Motion(2).equals(new Motion(2)) === true ', () =>
    {
        assert.isTrue( m.equals(new Motion(2)) );
    })

    it('new Motion().useSeconds === false', () =>
    {
        assert.isFalse( m.useSeconds );
    })

    it('new Motion().useSeconds true/false', () =>
    {
        m.useSeconds = true ;
        assert.isTrue( m.useSeconds );
        m.useSeconds = false ;
        assert.isFalse( m.useSeconds );
    })
});
