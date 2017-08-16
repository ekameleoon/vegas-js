"use strict" ;

import { isIconifiable , Iconifiable } from '../../src/molecule/Iconifiable.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'molecule.Iconifiable' , () =>
{
    let item = new Iconifiable() ;

    it('item is Iconifiable' , () => { assert.instanceOf( item, Iconifiable ); });
    it('item.icon === null' , () => { assert.isNull( item.icon ); });
}) ;

describe( 'molecule.isIconifiable' , () =>
{
    let item = new Iconifiable() ;
    let test = {} ;

    it('isIconifiable(item) === true' , () => { assert.isTrue( isIconifiable(item) ); });
    it('isIconifiable(test) === false' , () => { assert.isFalse( isIconifiable(test) ); });
}) ;
