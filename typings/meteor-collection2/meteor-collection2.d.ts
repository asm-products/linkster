/// <reference path="../meteor-simple-schema/meteor-simple-schema.d.ts" />

declare module Mongo {
	interface Collection<T> {
		/**
		 * Attaches a SimpleSchema to the collection.
		 */
		attachSchema(schema: SimpleSchema<T>, options?: Collection2.SchemaAttachOptions): void;
		
		/**
		 * Retrieves the attached SimpleSchema from the collection.
		 */
		simpleSchema(): SimpleSchema<T>;

		insert(doc: Object, options?: {}, callback?: Function): string;
		update(selector: Mongo.Selector, modifier: Mongo.Modifier, options?: {
			multi?: boolean;
			upsert?: boolean;
		}, callback?: Function): number;
		upsert(selector: Mongo.Selector, modifier: Mongo.Modifier, options?: Collection2.UpsertOptions, callback?: Function): {numberAffected?: number; insertedId?: string;};	
	}
}

declare module MeteorSimpleSchema {
	interface PropertyDefinition {
		/**
		 * If you set denyUpdate: true, any collection update that modifies the field will fail.
		 */
		denyUpdate?: boolean;
		
		/**
		 * If you set denyInsert to true, you will need to set optional: true as well.
		 */
		denyInsert?: boolean;
		
		/**
		 * Use the index option to ensure a MongoDB index for a specific field.
		 * Set to 1 or true for an ascending index. Set to -1 for a descending index. 
		 * Or you may set this to another type of specific MongoDB index, such as "2d". 
		 * Indexes works on embedded sub-documents as well.
		 * 
		 * If you have created an index for a field by mistake and you want to remove it, set index to false.
		 */
		index?: number|boolean|string;
		
		/**
		 * If a field has the unique option set to true, the MongoDB index will be a unique index as well. Then on the server, 
		 * Collection2 will rely on MongoDB to check uniqueness of your field, which is more efficient than our custom checking.
		 */
		unique?: boolean;
	}
	
	interface ThisContext {
		/**
		 * True if it's an insert operation
		 */
		isInsert: boolean;
		
		/**
		 * True if it's an update operation
		 */
		isUpdate: boolean;
		
		/**
		 * True if it's an upsert operation (either upsert() or upsert: true)
		 */
		isUpsert: boolean;
		
		/**
		 * The ID of the currently logged in user. (Always null for server-initiated actions.)
		 */
		userId: string;
		
		/**
		 * True if the insert, update, or upsert was initiated from trusted (server) code
		 */
		isFromTrustedCode: boolean;
		
		/**
		 * The _id property of the document being updated. This will be set only for an update or upsert, 
		 * and only when the selector includes the _id or when the operation is initiated on the client.
		 */
		docId: string;
	}
}

declare module Collection2 {
	interface SchemaAttachOptions {
		/**
		 * If your validation requires that your doc be transformed using the collection's transform function prior to being validated,
		 * then you must pass the transform: true option to attachSchema when you attach the schema:
		 */
		transform?: boolean;
		
		/**
		 * By default, if a collection already has a schema attached, attachSchema will combine the new schema with the existing. 
		 * Pass the replace: true option to attachSchema to discard any existing schema.
		 */
		replace?: boolean;
	}
	
	interface InsertOptions extends MeteorSimpleSchema.BaseCleaningOptions {
		/**
		 * To use a specific named validation context.
		 */
		validationContext?: string;
		
		/**
		 * To skip validation, use the validate: false option when calling insert or update. On the client (untrusted code), 
		 * this will skip only client-side validation. On the server (trusted code), 
		 * it will skip all validation. The object is still cleaned and autoValues are still generated.
		 */
		validate?: boolean;
	}
	
	interface UpsertOptions extends InsertOptions {
		multi?: boolean;
	}
	
	interface UpdateOptions extends UpsertOptions {
		upsert?: boolean;
	}
}