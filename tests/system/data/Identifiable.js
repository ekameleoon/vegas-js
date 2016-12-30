"use strict" ;

import { isIdentifiable } from '../../../src/system/data/Identifiable.js' ;
import { Identifiable } from '../../../src/system/data/Identifiable.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'system.data.Identifiable' , () =>
{
    let object = new Identifiable() ;
    it('#constructor === Identifiable', () => { assert.equal( object.constructor , Identifiable ); });
    it('#id === null', () => { assert.isNull( object.id ); });
});

describe( 'system.data.isIdentifiable' , () =>
{
    let object1 = new Identifiable() ;
    let object2 = { id : 2 } ;
    let object3 = { name : 'object' } ;
    it('isIdentifiable(new Identifiable()) === true', () => { assert.isTrue( isIdentifiable(object1) ); });
    it('isIdentifiable({ id : 2 }) === true', () => { assert.isTrue( isIdentifiable(object2) ); });
    it('isIdentifiable({ name : "object" }) === false', () => { assert.isFalse( isIdentifiable(object3) ); });
});
