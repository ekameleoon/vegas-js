"use strict" ;

import { isSymbol } from '../../../src/core/chars/isSymbol.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.chars.isSymbol' , () =>
{
    it('isSymbol(" ") === true'  , () => { assert.isTrue( isSymbol(" ") ); });
    it('isSymbol("!") === true'  , () => { assert.isTrue( isSymbol("!") ); });
    it('isSymbol("\\") === true' , () => { assert.isTrue( isSymbol("\\") ); });
    it('isSymbol("#") === true'  , () => { assert.isTrue( isSymbol("#") ); });
    it('isSymbol("$") === true'  , () => { assert.isTrue( isSymbol("$") ); });
    it('isSymbol("%") === true'  , () => { assert.isTrue( isSymbol("%") ); });
    it('isSymbol("&") === true'  , () => { assert.isTrue( isSymbol("&") ); });
    it('isSymbol("\'") === true' , () => { assert.isTrue( isSymbol("\'") ); });
    it('isSymbol("(") === true'  , () => { assert.isTrue( isSymbol("(") ); });
    it('isSymbol(")") === true'  , () => { assert.isTrue( isSymbol(")") ); });
    it('isSymbol("*") === true'  , () => { assert.isTrue( isSymbol("*") ); });
    it('isSymbol("+") === true'  , () => { assert.isTrue( isSymbol("+") ); });
    it('isSymbol(",") === true'  , () => { assert.isTrue( isSymbol(",") ); });
    it('isSymbol("_") === true'  , () => { assert.isTrue( isSymbol("_") ); });
    it('isSymbol(".") === true'  , () => { assert.isTrue( isSymbol(".") ); });
    it('isSymbol("/") === true'  , () => { assert.isTrue( isSymbol("/") ); });
    it('isSymbol(":") === true'  , () => { assert.isTrue( isSymbol(":") ); });
    it('isSymbol(";") === true'  , () => { assert.isTrue( isSymbol(";") ); });
    it('isSymbol("<") === true'  , () => { assert.isTrue( isSymbol("<") ); });
    it('isSymbol("=") === true'  , () => { assert.isTrue( isSymbol("=") ); });
    it('isSymbol(">") === true'  , () => { assert.isTrue( isSymbol(">") ); });
    it('isSymbol("?") === true'  , () => { assert.isTrue( isSymbol("?") ); });
    it('isSymbol("@") === true'  , () => { assert.isTrue( isSymbol("@") ); });
    it('isSymbol("[") === true'  , () => { assert.isTrue( isSymbol("[") ); });
    it('isSymbol("\\") === true' , () => { assert.isTrue( isSymbol("\\") ); });
    it('isSymbol("]") === true'  , () => { assert.isTrue( isSymbol("]") ); });
    it('isSymbol("^") === true'  , () => { assert.isTrue( isSymbol("^") ); });
    it('isSymbol("_") === true'  , () => { assert.isTrue( isSymbol("_") ); });
    it('isSymbol("`") === true'  , () => { assert.isTrue( isSymbol("`") ); });
    it('isSymbol("{") === true'  , () => { assert.isTrue( isSymbol("{") ); });
    it('isSymbol("|") === true'  , () => { assert.isTrue( isSymbol("|") ); });
    it('isSymbol("}") === true'  , () => { assert.isTrue( isSymbol("}") ); });
    it('isSymbol("~") === true'  , () => { assert.isTrue( isSymbol("~") ); });

    it('isSymbol("a") === false', () => { assert.isFalse( isSymbol("a") ); });
});
