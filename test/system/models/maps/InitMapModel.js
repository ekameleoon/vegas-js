'use strict' ;

import { Action }       from 'system/process/Action.js' ;
import { InitMapModel } from 'system/models/maps/InitMapModel.js' ;
import { MapModel }     from 'system/models/maps/MapModel.js' ;

import chai  from 'chai' ;
const assert = chai.assert ;

describe( 'system.models.maps.InitMapModel' , () =>
{
    describe( 'system.models.maps.InitMapModel constructor' , () =>
    {
        let init = new InitMapModel() ;

        it('InitMapModel is a constructor function', () =>
        {
            assert.isFunction( InitMapModel );
        });

        it('new InitMapModel().constructor === InitMapModel', () =>
        {
            assert.equal( init.constructor , InitMapModel );
        });

        it('new InitMapModel() instanceOf Action', () =>
        {
            assert.instanceOf( init , Action );
        });

        describe( 'system.models.maps.InitMapModel(null,null,true,false,false,false)' , () =>
        {
            let init = new InitMapModel( null , null , true , false , false , false ) ;
            it('init.autoClear === true', () => { assert.isTrue( init.autoClear ); });
            it('init.autoSelect === false', () => { assert.isFalse( init.autoSelect ); });
            it('init.autoDequeue === false', () => { assert.isFalse( init.autoDequeue ); });
            it('init.cleanFirst === false', () => { assert.isFalse( init.cleanFirst ); });
        });

        describe( 'system.models.maps.InitMapModel(null,null,false,true,false,false)' , () =>
        {
            let init = new InitMapModel( null , null , false , true , false , false ) ;
            it('init.autoClear === false', () => { assert.isFalse( init.autoClear ); });
            it('init.autoSelect === true', () => { assert.isTrue( init.autoSelect ); });
            it('init.autoDequeue === false', () => { assert.isFalse( init.autoDequeue ); });
            it('init.cleanFirst === false', () => { assert.isFalse( init.cleanFirst ); });
        });

        describe( 'system.models.maps.InitMapModel(null,null,false,false,true,false)' , () =>
        {
            let init = new InitMapModel( null , null , false , false , true , false ) ;
            it('init.autoClear === false', () => { assert.isFalse( init.autoClear ); });
            it('init.autoSelect === true', () => { assert.isFalse( init.autoSelect ); });
            it('init.autoDequeue === false', () => { assert.isTrue( init.autoDequeue ); });
            it('init.cleanFirst === false', () => { assert.isFalse( init.cleanFirst ); });
        });

        describe( 'system.models.maps.InitMapModel(null,null,false,false,false,true)' , () =>
        {
            let init = new InitMapModel( null , null , false , false , false , true ) ;
            it('init.autoClear === false', () => { assert.isFalse( init.autoClear ); });
            it('init.autoSelect === false', () => { assert.isFalse( init.autoSelect ); });
            it('init.autoDequeue === false', () => { assert.isFalse( init.autoDequeue ); });
            it('init.cleanFirst === true', () => { assert.isTrue( init.cleanFirst ); });
        });
    });

    describe( 'system.models.maps.InitMapModel(model,datas).datas' , () =>
    {
        let model = new MapModel() ;
        let datas =
        [
            { id:1 , name:"test1" } ,
            { id:2 , name:"test2" } ,
            { id:3 , name:"test3" } ,
            { id:4 , name:"test4" } ,
            { id:5 , name:"test5" } ,
            { id:6 , name:"test6" }
        ] ;

        let init = new InitMapModel( model , datas ) ;

        it('InitMapModel.model === model', () =>
        {
            assert.equal( init.model , model );
        });

        it('InitMapModel.datas instanceof Array', () =>
        {
            assert.isArray( init.datas );
        });

        it('InitMapModel.datas.length instanceof Array', () =>
        {
            assert.equal( init.datas.length , 6 );
        });

        it('InitMapModel.datas === datas', () =>
        {
            assert.equal( init.datas , datas );
        });
    }) ;

    describe( 'system.models.maps.InitMapModel(model,datas).run()' , () =>
    {
        let model = new MapModel() ;
        let datas =
        [
            { id:1 , name:"test1" } ,
            { id:2 , name:"test2" } ,
            { id:3 , name:"test3" } ,
            { id:4 , name:"test4" } ,
            { id:5 , name:"test5" } ,
            { id:6 , name:"test6" }
        ] ;

        let init = new InitMapModel( model , datas ) ;

        init.run() ;

        it('InitMapModel.run, model.length === 6', () =>
        {
            assert.equal( model.length , 6 );
        });

        it('InitMapModel.run, model.get(1) === "test1"', () =>
        {
            assert.equal( model.get(1).name , "test1" );
        });

        it('InitMapModel.run, init.datas instanceof Array', () =>
        {
            assert.isArray( init.datas );
            assert.equal( init.datas.length , 6 );
        });
    });

    describe( 'system.models.maps.InitMapModel(model,datas).run() with autoDequeue = true' , () =>
    {
        let model = new MapModel() ;
        let datas =
        [
            { id:1 , name:"test1" } ,
            { id:2 , name:"test2" } ,
            { id:3 , name:"test3" } ,
            { id:4 , name:"test4" } ,
            { id:5 , name:"test5" } ,
            { id:6 , name:"test6" }
        ] ;

        let init = new InitMapModel( model , datas ) ;

        init.autoDequeue = true ;

        init.run() ;

        it('InitMapModel.run, model.length === 6', () =>
        {
            assert.equal( model.length , 6 );
        });

        it('InitMapModel.run, model.get(1) === "test1"', () =>
        {
            assert.equal( model.get(1).name , "test1" );
        });

        it('InitMapModel.run, init.datas instanceof Array', () =>
        {
            assert.isArray( init.datas );
            assert.equal( init.datas.length , 0 );
        });

        it('InitMapModel.run, datas.length === 0', () =>
        {
            assert.equal( datas.length , 0 );
        });
    });
});
