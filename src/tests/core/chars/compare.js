"use strict" ;

import { compare } from '../../../core/chars/compare.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.chars.compare' , () =>
{
    it('compare("a","a") ===  0', () => { assert.equal( compare("a","a") ,  0 ); });
    it('compare("b","a") ===  1', () => { assert.equal( compare("b","a") ,  1 ); });
    it('compare("a","b") === -1', () => { assert.equal( compare("a","b") , -1 ); });

    it('compare("a","A") === -1', () => { assert.equal( compare("a","A") , -1 ); });
    it('compare("A","a") ===  1', () => { assert.equal( compare("A","a") ,  1 ); });

    it('compare() throws error', () => { assert.throws( () => { compare(); } , TypeError ); });
    it('compare(null,"a") throws error', () => { assert.throws( () => { compare(null,"a"); } , TypeError ); });
    it('compare("a",null) throws error', () => { assert.throws( () => { compare("a",null); } , TypeError ); });
});
