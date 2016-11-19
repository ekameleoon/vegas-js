"use strict" ;

import { lineTerminators } from '../../../src/core/strings/lineTerminators.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'core.strings.lineTerminators' , () =>
{
    it('lineTerminators is Array', () =>
    {
        assert.isArray( lineTerminators ) ;
    });

    it('lineTerminators length == 4', () =>
    {
        assert.lengthOf( lineTerminators , 4 ) ;
    });

    it('lineTerminators check elements', () =>
    {
        assert.sameMembers( lineTerminators ,
        [
            "\u000A" /*LF : Line Feed*/ ,
            "\u000D" /*CR : Carriage Return*/,
            "\u2028" /*LS : Line Separator*/ ,
            "\u2929" /*PS : Paragraphe Separator*/
        ]) ;
    });
});
