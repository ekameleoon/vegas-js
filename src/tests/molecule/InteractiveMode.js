"use strict" ;

import { InteractiveMode } from '../../molecule/InteractiveMode.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'molecule.InteractiveMode' , () =>
{
    it('InteractiveMode.AUTO === "auto"', () =>
    {
        assert.equal( InteractiveMode.AUTO , 'auto' );
    });

    it('InteractiveMode.MOUSE === "mouse"', () =>
    {
        assert.equal( InteractiveMode.MOUSE , 'mouse' );
    });

    it('InteractiveMode.NONE === "none"', () =>
    {
        assert.equal( InteractiveMode.NONE , 'none' );
    });

    it('InteractiveMode.POINTER === "pointer"', () =>
    {
        assert.equal( InteractiveMode.POINTER , 'pointer' );
    });

    it('InteractiveMode.TOUCH === "touch"', () =>
    {
        assert.equal( InteractiveMode.TOUCH , 'touch' );
    });
}) ;
