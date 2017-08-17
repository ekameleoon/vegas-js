"use strict" ;

import { isFocusable , Focusable } from '../../molecule/Focusable.js' ;
import { Groupable } from '../../molecule/Groupable.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'molecule.Focusable' , () =>
{
    let item = new Focusable() ;

    it('item is Focusable' , () => { assert.instanceOf( item, Focusable ); });
    it('item is Groupable' , () => { assert.instanceOf( item, Groupable ); });
    it('item.group === false' , () => { assert.isFalse( item.group ); });
    it('item.groupName === null' , () => { assert.isNull( item.groupName ); });
    it('item.selected === false' , () => { assert.isFalse( item.selected ); });
}) ;

describe( 'molecule.isFocusable' , () =>
{
    let item = new Focusable() ;
    let test = {} ;

    it('isFocusable(item) === true' , () => { assert.isTrue( isFocusable(item) ); });
    it('isFocusable(test) === false' , () => { assert.isFalse( isFocusable(test) ); });
}) ;
