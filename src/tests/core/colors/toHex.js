"use strict" ;

import { toHex } from '../../../core/colors/toHex.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.colors.toHex' , () =>
{
    it( 'toHex() throws TypeError' , () =>
    {
        assert.throws( () => { toHex() ; } , TypeError ) ;
    }) ;

    it( 'toHex("foo") throws TypeError' , () =>
    {
        assert.throws( () => { toHex("foo") ; } , TypeError ) ;
    }) ;

    it('toHex(0x000000) === "#000000"' , () => { assert.equal( toHex(0x000000) , "#000000" ); });
    it('toHex(0xFF0000) === "#FF0000"' ,  () => { assert.equal( toHex(0xFF0000) , "#FF0000" ); });

    it('toHex(0xFF0000,"0x") === "0xFF0000"' ,  () => { assert.equal( toHex(0xFF0000,"0x") , "0xFF0000" ); });
    it('toHex(0xFF0000,"") === "FF0000"' ,  () => { assert.equal( toHex(0xFF0000,"") , "FF0000" ); });
    it('toHex(0xFF0000,2) === "0xFF0000"' ,  () => { assert.equal( toHex(0xFF0000,2) , "#FF0000" ); });
    it('toHex(0xFF0000,"#",false) === "0xff0000"' ,  () => { assert.equal( toHex(0xFF0000,"#",false) , "#ff0000" ); });
});
