"use strict" ;

import { ArrayMap } from '../../../../src/system/data/maps/ArrayMap.js' ;
import { KeyValuePair } from '../../../../src/system/data/KeyValuePair.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'system.data.maps.ArrayMap' , () =>
{
    describe( '#constructor' , () =>
    {
        describe( 'new ArrayMap()' , () =>
        {
            let map = new ArrayMap() ;
            it('new ArrayMap() instanceof KeyValuePair', () => { assert.instanceOf( map , KeyValuePair ); });
            it('new ArrayMap().constructor === ArrayMap', () => { assert.equal( map.constructor , ArrayMap ); });
            it('new ArrayMap().length === 0', () => { assert.equal( map.length , 0 ); });
        });

        describe( 'new ArrayMap(["key1","key2"],["value1","value2"])' , () =>
        {
            let map = new ArrayMap(["key1","key2"],["value1","value2"]) ;
            it('new ArrayMap().length === 2', () => { assert.equal( map.length , 2 ); });
            it('new ArrayMap().get("key1") === "value1"', () => { assert.equal( map.get("key1") , "value1" ); });
            it('new ArrayMap().get("key2") === "value2"', () => { assert.equal( map.get("key2") , "value2" ); });
        });
    });

    describe( '#clear' , () =>
    {
        it('map.clear(), length === 0', () =>
        {
            let map = new ArrayMap(["key1","key2"],["value1","value2"]) ;
            map.clear() ;
            assert.equal( map.length , 0 );
        });
    });

    describe( '#clone' , () =>
    {
        let map   = new ArrayMap(["key1","key2"],["value1","value2"]) ;
        let clone = map.clone() ;
        it('clone() instanceof ArrayMap', () => { assert.instanceOf( clone , ArrayMap ); });
        it('clone() !== map', () => { assert.notEqual( map , clone ); });
        it('clone().length == map.length', () => { assert.equal( map.length , clone.length ); });
        it('clone().get("key1") == "value1"', () => { assert.equal( map.get("key1") , "value1" ); });
        it('clone().get("key2") == "value2"', () => { assert.equal( map.get("key2") , "value2" ); });
    });

    describe( '#copyFrom' , () =>
    {
        let map1 = new ArrayMap(["key1","key2"],["value1","value2"]) ;
        let map2 = new ArrayMap() ;
        map2.copyFrom(map1) ;
        it('map2.length === 2', () => { assert.equal( map2.length , 2 ); });
        it('map2.get("key1") === "value1"', () => { assert.equal( map2.get('key1') , "value1" ); });
        it('map2.get("key2") === "value2"', () => { assert.equal( map2.get('key2') , "value2" ); });
    });

    describe( '#delete' , () =>
    {
        let map = new ArrayMap(["key1","key2"],["value1","value2"]) ;
        map.delete("key1") ;
        it('#length === 1', () => { assert.equal( map.length , 1 ); });
        it('#has("key1") === false', () => { assert.isFalse( map.has('key1') ); });
    });

    describe( '#get' , () =>
    {
        let map = new ArrayMap(["key1","key2"],["value1","value2"]) ;
        it('#get("key1") === "value1"', () => { assert.equal( map.get('key1') , "value1" ); });
        it('#get("key2") === "value2"', () => { assert.equal( map.get('key2') , "value2" ); });
        it('#get("key3") === undefined', () => { assert.isUndefined( map.get('key3') ); });
    });
});
