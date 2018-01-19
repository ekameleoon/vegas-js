"use strict" ;

import { Groupable } from 'molecule/Groupable.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'molecule.Groupable' , () =>
{
    let item = new Groupable() ;

    it('group is Groupable' , () => { assert.instanceOf( item, Groupable ); });
    it('group.group === false' , () => { assert.isFalse( item.group ); });
    it('group.groupName === null' , () => { assert.isNull( item.groupName ); });
}) ;
