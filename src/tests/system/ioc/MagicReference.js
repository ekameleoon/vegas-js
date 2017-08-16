"use strict" ;

import { MagicReference } from '../../../system/ioc/MagicReference.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'system.ioc.MagicReference' , () =>
{
    it('MagicReference.CONFIG === "#config"', () =>
    {
        assert.equal( MagicReference.CONFIG , '#config' );
    });
    it('MagicReference.INIT === "#init"', () =>
    {
        assert.equal( MagicReference.INIT , '#init' );
    });
    it('MagicReference.LOCALE === "#locale"', () =>
    {
        assert.equal( MagicReference.LOCALE , '#locale' );
    });
    it('MagicReference.PARAMS === "#params"', () =>
    {
        assert.equal( MagicReference.PARAMS , '#params' );
    });
    it('MagicReference.ROOT === "#root"', () =>
    {
        assert.equal( MagicReference.ROOT , '#root' );
    });
    it('MagicReference.STAGE === "#stage"', () =>
    {
        assert.equal( MagicReference.STAGE , '#stage' );
    });
    it('MagicReference.THIS === "#this"', () =>
    {
        assert.equal( MagicReference.THIS , '#this' );
    });
}) ;
