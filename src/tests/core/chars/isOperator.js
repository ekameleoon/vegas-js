"use strict" ;

import { isOperator } from '../../../core/chars/isOperator.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.chars.isOperator' , () =>
{
    it('isOperator("+") === true', () => { assert.isTrue( isOperator("+") ); });
    it('isOperator("-") === true', () => { assert.isTrue( isOperator("-") ); });

    it('isOperator("a") === false', () => { assert.isFalse( isOperator("a") ); });
});
