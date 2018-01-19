"use strict" ;

import { CoreGroup } from 'molecule/groups/CoreGroup.js' ;
import { ArrayMap }  from 'system/data/maps/ArrayMap.js' ;
import { Receiver }  from 'system/signals/Receiver.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'molecule.groups.CoreGroup' , () =>
{
    let item = new CoreGroup() ;

    it('new CoreGroup() is Receiver', () =>
    {
        assert.instanceOf( item , Receiver );
    });

    it('new CoreGroup().constructor === CoreGroup', () =>
    {
        assert.equal( item.constructor , CoreGroup );
    });

    it('new CoreGroup().groups instanceof ArrayMap', () =>
    {
        assert.instanceOf( item.groups , ArrayMap );
    });
}) ;
