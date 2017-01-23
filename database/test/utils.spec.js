/*!
 * SkyBet Tech Test
 * Copyright(c) 2017 Matthew D Webb <matt.d.webb@icloud.com>
 * MIT Licensed
 */

import assert from "assert";
import util from "../utils";

/* global describe it beforeEach */

describe( "Utilities", () => {

	describe( "helper", () => {

		let data, helper, prop;

		beforeEach( ( done ) => {
			data = [ {
				name: "Jeff Stelling"
			}, {
				name: "Kirsy Gallacher"
			}, {
				name: "Hayley McQueen"
			} ];
			helper = util;
			prop = "name";
			done();
		} );

		describe( "exists()", () => {
			it( "should return TRUE if object value is found in database", ( done ) => {
				const item = {
					name: "Jeff Stelling"
				};
				assert( helper.exists( data, item, prop ) );
				done();
			} );

			it( "should return FALSE if object value is NOT found in database", ( done ) => {
				const item = {
					name: "Legend Jeff"
				};
				const prop = "name";
				assert( !helper.exists( data, item, prop ) );
				done();
			} );

			it( "should return FALSE if data is not an Array", ( done ) => {
				const data = {
					name: "Jeff Stelling"
				};
				const item = {
					name: "Jeff Stelling"
				};
				assert( !helper.exists( data, item, prop ) );
				done();
			} );

		} );

		describe( "extract()", () => {

			it( "should return object from the database", ( done ) => {
				const item = {
					name: "Jeff Stelling"
				};
				const record = helper.extract( data, item, prop );
				assert( typeof record === "object" );
				assert( record.name === item.name );
				assert.deepEqual( record, item );
				done();
			} );

			it( "should return undefined when object is not in database", ( done ) => {
				const item = {
					name: "Insanely Hot McQueen"
				};
				const record = helper.extract( data, item, prop );
				assert( !record );
				done();
			} );

			it( "should return undefined when object is not in database", ( done ) => {
				const item = {
					name: "Insanely Hot McQueen"
				};
				const record = helper.extract( data, item, prop );
				assert( !record );
				done();
			} );

		} );

		describe( "strip", () => {

			it( "should properly parse", ( done ) => {
				const missFormedItem = "\uFEFF" + JSON.stringify( {
					name: "Kirsy Gallacher"
				} );
				const item = JSON.stringify( {
					name: "Kirsy Gallacher"
				} );
				const obj = helper.strip( missFormedItem );
				assert.deepEqual( obj, item );
				done();
			} );
		} );

	} );
} );
