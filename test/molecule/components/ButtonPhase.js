"use strict" ;

import { ButtonPhase } from 'molecule/components/ButtonPhase.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'molecule.components.ButtonPhase' , () =>
{
    it('ButtonPhase.DISABLE === "disable"', () =>
    {
        assert.equal( ButtonPhase.DISABLE , 'disable' );
    });

    it('ButtonPhase.DOWN === "down"', () =>
    {
        assert.equal( ButtonPhase.DOWN , 'down' );
    });

    it('ButtonPhase.OVER === "over"', () =>
    {
        assert.equal( ButtonPhase.OVER , 'over' );
    });

    it('ButtonPhase.UP === "up"', () =>
    {
        assert.equal( ButtonPhase.UP , 'up' );
    });
}) ;
