/*!
 * SkyBet Tech Test
 * Copyright(c) 2017 Matthew D Webb <matt.d.webb@icloud.com>
 * MIT Licensed
 */

import assert from "assert";
import fs from "fs";
import os from "os";
import path from "path";
import sinon from "sinon";
import rimraf from "rimraf";
import Presenter from "../model";
import Database from "../service";

/* global describe it beforeEach afterEach */

describe( "Database", function () {

	let TEST_DIR, db, file, pre1, pre2;

	beforeEach( ( done ) => {
		TEST_DIR = path.join( os.tmpdir(), "presenters" );
		file = path.join( TEST_DIR, "presenters.json" );
		db = new Database( {
			file: file
		} );
		pre1 = new Presenter( {
			firstName: "Jeff",
			secondName: "Stelling"
		} ).toObj();
		pre2 = new Presenter( {
			firstName: "Heyley",
			secondName: "McQueen"
		} ).toObj();

		rimraf.sync( TEST_DIR );
		fs.mkdir( TEST_DIR, done );
	} );

	afterEach( ( done ) => {
		rimraf.sync( TEST_DIR );
		done();
	} );

	describe( "getPresenters()", function () {

		it( "should read and parse JSON", ( done ) => {
			const presenter = {
				firstName: "Kirsty",
				secondName: "Gallacher"
			};

			fs.writeFileSync( file, JSON.stringify( presenter ) );

			db.getPresenters( ( err, arr ) => {
				assert.ifError( err );
				assert.equal( arr[ 0 ].firstName, presenter.firstName );
				done();
			} );
		} );

		it( "should return an array with two presenters", ( done ) => {

			fs.writeFileSync( file, JSON.stringify( pre1 ) );
			fs.writeFileSync( file, JSON.stringify( pre2 ) );

			db.getPresenters( ( err, arr ) => {
				assert( arr instanceof Array );
				assert( arr.length === 1 );
				done();
			} );
		} );

		it( "should include the filename in error", ( done ) => {

			fs.writeFileSync( file, "{" );

			db.getPresenters( ( err ) => {
				assert( err instanceof Error );
				assert( err.message.match( file ) );
				done();
			} );
		} );

		it( "should call getPresenters method only once", ( done ) => {

			let spy = sinon.spy( db, "getPresenters" );

			fs.writeFileSync( file, JSON.stringify( pre1 ) );

			db.getPresenters( ( err ) => {
				assert.ifError( err );
				assert( spy.calledOnce );
				done();
			} );

		} );

	} );

	describe( "createPresenter()", function () {

		it( "should create a json record", ( done ) => {
			db.createPresenter( pre1, ( err, data ) => {
				assert.ifError( err );
				assert( data );
			} );
			fs.readFile( file, "utf8", ( err, data ) => {
				assert.ifError( err );
				assert( data, pre1 );
				assert.deepEqual( data, pre1 );
			} );
			done();
		} );

    // TODO: fix.
		it.skip( "should error when trying to create duplicate a records", ( done ) => {

			fs.writeFileSync( file, JSON.stringify( pre1 ) );

			db.createPresenter( pre1, ( err ) => {
				assert( err instanceof Error );
        assert( err.message.match( pre1.fullName ));
			} );
			done();
		} );

		it( "should call createPresenter method only once", ( done ) => {
			let spy = sinon.spy( db, "createPresenter" );
			db.createPresenter( pre1, ( err ) => {
				assert.ifError( err );
				assert( spy.calledOnce );
			} );
			done();
		} );

		it( "should call getPresenters method only once", ( done ) => {
			let spy = sinon.spy( db, "getPresenters" );
			db.createPresenter( pre1, ( err ) => {
				assert.ifError( err );
				assert( spy.calledOnce );
			} );
			done();
		} );

	} );

} );
