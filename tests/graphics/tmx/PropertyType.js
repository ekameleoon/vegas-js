"use strict" ;

import { PropertyType } from '../../../src/graphics/tmx/PropertyType.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'graphics.tmx.PropertyType' , () =>
{
    it('PropertyType.BOOL === "bool"', () =>
    {
        assert.equal( PropertyType.BOOL , 'bool' );
    });
    it('PropertyType.COLOR === "color"', () =>
    {
        assert.equal( PropertyType.COLOR , 'color' );
    });
    it('PropertyType.FILE === "file"', () =>
    {
        assert.equal( PropertyType.FILE , 'file' );
    });
    it('PropertyType.FLOAT === "float"', () =>
    {
        assert.equal( PropertyType.FLOAT , 'float' );
    });
    it('PropertyType.INT === "int"', () =>
    {
        assert.equal( PropertyType.INT , 'int' );
    });
    it('PropertyType.STRING === "string"', () =>
    {
        assert.equal( PropertyType.STRING , 'string' );
    });
}) ;
