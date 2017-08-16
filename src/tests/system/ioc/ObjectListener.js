"use strict" ;

import { ObjectOrder } from './system/ioc/ObjectOrder.js' ;
import { ObjectListener } from './system/ioc/ObjectListener.js' ;

import chai from 'chai' ;

const assert = chai.assert ;

describe( 'system.ioc.ObjectListener' , () =>
{
    describe( '#enum' , () =>
    {
        it('ObjectListener.DISPATCHER === "dispatcher"', () =>
        {
            assert.equal( ObjectListener.DISPATCHER , 'dispatcher' );
        });
        it('ObjectListener.METHOD === "method"', () =>
        {
            assert.equal( ObjectListener.METHOD , 'method' );
        });
        it('ObjectListener.ORDER === "order"', () =>
        {
            assert.equal( ObjectListener.ORDER , 'order' );
        });
        it('ObjectListener.USE_CAPTURE === "useCapture"', () =>
        {
            assert.equal( ObjectListener.USE_CAPTURE , 'useCapture' );
        });
        it('ObjectListener.TYPE === "type"', () =>
        {
            assert.equal( ObjectListener.TYPE , 'type' );
        });
    });

    describe( '#constructor' , () =>
    {
        describe( 'new ObjectListener()' , () =>
        {
            let listener = new ObjectListener() ;
            it('new ObjectListener().constructor === ObjectListener', () => { assert.equal( listener.constructor , ObjectListener ); });
            it('new ObjectListener().toString() === "[ObjectListener]"', () => { assert.equal( listener.toString() , "[ObjectListener]" ); });
            it('new ObjectListener().dispatcher === undefined', () => { assert.isUndefined( listener.dispatcher ); });
            it('new ObjectListener().type === undefined', () => { assert.isUndefined( listener.type ); });
            it('new ObjectListener().method === null', () => { assert.isNull( listener.method ); });
            it('new ObjectListener().useCapture === false', () => { assert.isFalse( listener.useCapture ); });
            it('new ObjectListener().order === "after"', () => { assert.equal( listener.order , "after" ); });
        });

        describe( 'new ObjectListener("test1","test2","test3",true,"before")' , () =>
        {
            let listener = new ObjectListener("test1","test2","test3",true,"before") ;
            it('new ObjectListener().dispatcher === "test1"', () => { assert.equal( listener.dispatcher , "test1" ); });
            it('new ObjectListener().type === "test2"', () => { assert.equal( listener.type , "test2"); });
            it('new ObjectListener().method === "test3"', () => { assert.equal( listener.method , "test3"); });
            it('new ObjectListener().useCapture === true', () => { assert.isTrue( listener.useCapture ); });
            it('new ObjectListener().order === "before"', () => { assert.equal( listener.order , "before" ); });
        });

        describe( 'new ObjectListener("test1","test2","test3","foo","foo")' , () =>
        {
            let listener = new ObjectListener("test1","test2","test3","foo","foo") ;
            it('new ObjectListener().dispatcher === "test1"', () => { assert.equal( listener.dispatcher , "test1" ); });
            it('new ObjectListener().type === "test2"', () => { assert.equal( listener.type , "test2"); });
            it('new ObjectListener().method === "test3"', () => { assert.equal( listener.method , "test3"); });
            it('new ObjectListener().useCapture === "foo"', () => { assert.isFalse( listener.useCapture ); });
            it('new ObjectListener().order === "foo"', () => { assert.equal( listener.order , "after" ); });
        });
    });

    describe( '#order' , () =>
    {
        it('new ObjectListener().order = "foo" => "after"', () =>
        {
            let listener = new ObjectListener() ;
            listener.order = "foo" ;
            assert.equal( listener.order , "after" );
        });
        it('new ObjectListener().order = "after" => "after"', () =>
        {
            let listener = new ObjectListener() ;
            listener.order = "after" ;
            assert.equal( listener.order , "after" );
        });
        it('new ObjectListener().order = "before" => "before"', () =>
        {
            let listener = new ObjectListener() ;
            listener.order = "before" ;
            assert.equal( listener.order , "before" );
        });
        it('new ObjectListener().order = ObjectOrder.AFTER => ObjectOrder.AFTER', () =>
        {
            let listener = new ObjectListener() ;
            listener.order = ObjectOrder.AFTER ;
            assert.equal( listener.order , ObjectOrder.AFTER );
        });
        it('new ObjectListener().order = ObjectOrder.BEFORE  => ObjectOrder.BEFORE', () =>
        {
            let listener = new ObjectListener() ;
            listener.order = ObjectOrder.BEFORE ;
            assert.equal( listener.order , ObjectOrder.BEFORE );
        });
    });
}) ;
