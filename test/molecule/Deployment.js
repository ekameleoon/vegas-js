"use strict" ;

import { Deployment } from 'molecule/Deployment.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'molecule.Deployment' , () =>
{
    it('Deployment.CLOSE === "close"', () =>
    {
        assert.equal( Deployment.CLOSE , 'close' );
    });

    it('Deployment.OPEN === "open"', () =>
    {
        assert.equal( Deployment.OPEN , 'open' );
    });

    it('Deployment.PROTECTED === "protected"', () =>
    {
        assert.equal( Deployment.PROTECTED , 'protected' );
    });
}) ;
