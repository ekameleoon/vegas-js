"use strict" ;

import { ArrayMap }         from '../../../system/data/maps/ArrayMap.js' ;
import { CoreGroup }        from '../../../molecule/groups/CoreGroup.js' ;
import { RadioButtonGroup } from '../../../molecule/groups/RadioButtonGroup.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'molecule.groups.RadioButtonGroup' , () =>
{
    let item = new RadioButtonGroup() ;

    it('new CoreGroup() is CoreGroup', () =>
    {
        assert.instanceOf( item , CoreGroup );
    });

    it('new CoreGroup().constructor === CoreGroup', () =>
    {
        assert.equal( item.constructor , RadioButtonGroup );
    });

    it('new CoreGroup().groups instanceof ArrayMap', () =>
    {
        assert.instanceOf( item.groups , ArrayMap );
    });
}) ;
