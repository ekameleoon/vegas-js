"use strict" ;

import { ArrayMap } from 'system/data/maps/ArrayMap.js' ;
import { KeyValuePair } from 'system/data/KeyValuePair.js' ;
import { ArrayIterator } from 'system/data/iterators/ArrayIterator.js' ;
import { MapIterator } from 'system/data/iterators/MapIterator.js' ;

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

    describe( '#getKeyAt' , () =>
    {
        let map = new ArrayMap(["key1","key2"],["value1","value2"]) ;
        it('#getKeyAt(0) === "key1"', () => { assert.equal( map.getKeyAt(0) , "key1" ); });
        it('#getKeyAt(1) === "key2"', () => { assert.equal( map.getKeyAt(1) , "key2" ); });
        it('#getKeyAt(2) === undefined', () => { assert.isUndefined( map.getKeyAt(2) ); });
    });

    describe( '#getValueAt' , () =>
    {
        let map = new ArrayMap(["key1","key2"],["value1","value2"]) ;
        it('#getValueAt(0) === "value1"', () => { assert.equal( map.getValueAt(0) , "value1" ); });
        it('#getValueAt(1) === "value2"', () => { assert.equal( map.getValueAt(1) , "value2" ); });
        it('#getValueAt(2) === undefined', () => { assert.isUndefined( map.getValueAt(2) ); });
    });

    describe( '#has' , () =>
    {
        let map = new ArrayMap(["key1","key2"],["value1","value2"]) ;
        it('#has("key1") === true', () => { assert.isTrue( map.has('key1') ); });
        it('#has("key2") === true', () => { assert.isTrue( map.has('key2') ); });
        it('#has("key3") === false', () => { assert.isFalse( map.has('key3') ); });
    });

    describe( '#hasValue' , () =>
    {
        let map = new ArrayMap(["key1","key2"],["value1","value2"]) ;
        it('#hasValue("value1") === true', () => { assert.isTrue( map.hasValue('value1') ); });
        it('#hasValue("value2") === true', () => { assert.isTrue( map.hasValue('value2') ); });
        it('#hasValue("value3") === false', () => { assert.isFalse( map.hasValue('value3') ); });
    });

    describe( '#indexOfKey' , () =>
    {
        let map = new ArrayMap(["key1","key2"],["value1","value2"]) ;
        it('#indexOfKey("key1") === 0', () => { assert.equal( map.indexOfKey('key1') , 0 ); });
        it('#indexOfKey("key2") === 1', () => { assert.equal( map.indexOfKey('key2') , 1 ); });
        it('#indexOfKey("key3") === -1', () => { assert.equal( map.indexOfKey('key3') , -1 ); });
    });

    describe( '#indexOfValue' , () =>
    {
        let map = new ArrayMap(["key1","key2"],["value1","value2"]) ;
        it('#indexOfValue("value1") === 0', () => { assert.equal( map.indexOfValue('value1') , 0 ); });
        it('#indexOfValue("value2") === 1', () => { assert.equal( map.indexOfValue('value2') , 1 ); });
        it('#indexOfValue("value3") === -1', () => { assert.equal( map.indexOfValue('value3') , -1 ); });
    });

    describe( '#isEmpty' , () =>
    {
        it('new ArrayMap().isEmpty() === true', () =>
        {
            let map = new ArrayMap() ;
            assert.isTrue( map.isEmpty() , 0 );
        });
        it('new ArrayMap(["key1","key2"],["value1","value2"]).isEmpty() === false', () =>
        {
            let map = new ArrayMap(["key1","key2"],["value1","value2"]) ;
            assert.isFalse( map.isEmpty() , 0 );
        });
    });

    describe( '#iterator' , () =>
    {
        let map = new ArrayMap(["key1","key2"],["value1","value2"]) ;
        let iterator = map.iterator() ;
        it('#iterator instanceof MapIterator', () => { assert.instanceOf( iterator , MapIterator ); });
        it('#iterator.next() === "value1"' , () => { assert.equal( iterator.next() , 'value1' ); });
        it('#iterator.key()  === "key1"'   , () => { assert.equal( iterator.key()  , 'key1'   ); });
        it('#iterator.next() === "value2"' , () => { assert.equal( iterator.next() , 'value2' ); });
        it('#iterator.key()  === "key2"'   , () => { assert.equal( iterator.key()  , 'key2'   ); });
    });

    describe( '#keyIterator' , () =>
    {
        let map = new ArrayMap(["key1","key2"],["value1","value2"]) ;
        let iterator = map.keyIterator() ;
        it('#iterator instanceof ArrayIterator', () => { assert.instanceOf( iterator , ArrayIterator ); });
        it('#iterator.next() === "key1"' , () => { assert.equal( iterator.next() , 'key1' ); });
        it('#iterator.key() === 0' , () => { assert.equal( iterator.key() , 0 ); });
        it('#iterator.next() === "key2"' , () => { assert.equal( iterator.next() , 'key2' ); });
        it('#iterator.key() === 1' , () => { assert.equal( iterator.key() , 1 ); });
    });

    describe( '#keys' , () =>
    {
        let map = new ArrayMap(["key1","key2"],["value1","value2"]) ;
        let keys = map.keys() ;
        it('#keys instanceof Array', () => { assert.instanceOf( keys , Array ); });
        it('#keys.length === 2', () => { assert.equal( keys.length , 2 ); });
        it('#keys[0] === "key1"' , () => { assert.equal( keys[0] , 'key1' ); });
        it('#keys[1] === "key2"' , () => { assert.equal( keys[1] , 'key2' ); });
    });

    describe( '#set' , () =>
    {
        let map = new ArrayMap(["key1","key2"],["value1","value2"]) ;
        it('#set("key1") = "value4"', () =>
        {
            let r = map.set('key1','value4');
            assert.equal( map.get("key1") , "value4" );
            assert.equal( r , "value1" );
        });
        it('#set("key3") = "value3"', () =>
        {
            let r = map.set('key3','value3');
            assert.equal( map.get("key3") , "value3" );
            assert.isNull( r  );
        });
    });

    // TODO setKeyAt
    // TODO setValueAt

    describe( '#toString' , () =>
    {
        it('new ArrayMap().toString() === "{}"', () =>
        {
            let map = new ArrayMap() ;
            assert.equal( map.toString() , "{}" );
        });
        it('new ArrayMap(["key1","key2"],["value1","value2"]).toString() === "{key1:value1,key2:value2}"', () =>
        {
            let map = new ArrayMap(["key1","key2"],["value1","value2"]) ;
            assert.equal( map.toString() , "{key1:value1,key2:value2}" );
        });
    });

    describe( '#values' , () =>
    {
        let map = new ArrayMap(["key1","key2"],["value1","value2"]) ;
        let values = map.values() ;
        it('#values instanceof Array', () => { assert.instanceOf( values , Array ); });
        it('#values.length === 2', () => { assert.equal( values.length , 2 ); });
        it('#values[0] === "value1"' , () => { assert.equal( values[0] , 'value1' ); });
        it('#values[1] === "key2"' , () => { assert.equal( values[1] , 'value2' ); });
    });
});
