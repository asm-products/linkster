/// <reference path="../tsd.d.ts" />

module linkster {
	export var Folders = new Mongo.Collection<IFolder>('folders');
	
	var folderDefinitions:MeteorSimpleSchema.Definition = {};
	
	folderDefinitions['name'] = {
		type: String,
		min: 1,
		max: 50
	};
	folderDefinitions['links'] = {
		type: [Object],
		max: 100,
		autoValue: function(documentOrModifier) {
			var me = <MeteorSimpleSchema.AutoValueThis>this;
			
			if (me.isInsert) {
				return [];
			}
		}
	};
	folderDefinitions['links.$.title'] = {
		type: String,
		optional: true,
		max: 200
	};
	folderDefinitions['links.$.description'] = {
		type: String,
		optional: true,
		max: 5000
	};
	folderDefinitions['links.$.link'] = {
		type: String,
		optional: true,
		max: 2048,
		regEx: SimpleSchema.RegEx.Url
	};
	folderDefinitions['links.$.createdAt'] = {
		type: Date,
		optional: false,
		// denyUpdate: true, // TODO: angular-meteor updates the whole object, not just the changes. Enable this again when it gets fixed.
	}
	folderDefinitions['owner'] = {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
		// denyUpdate: true, // TODO: angular-meteor updates the whole object, not just the changes. Enable this again when it gets fixed.
		autoValue: function(documentOrModifier) {
			var me = <MeteorSimpleSchema.AutoValueThis>this;
			
			if (me.isInsert) {
				return me.userId;
			}
		}
	};
	folderDefinitions['collaborators'] = {
		type: [String],
		minCount: 1,
		// denyUpdate: true, // TODO: angular-meteor updates the whole object, not just the changes. Enable this again when it gets fixed.
		autoValue: function(documentOrModifier) {
			var me = <MeteorSimpleSchema.AutoValueThis>this;
			
			if (me.isInsert) {
				return [me.userId];
			}
		}
	};
	folderDefinitions['collaborators.$'] = {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
		// denyUpdate: true, // TODO: angular-meteor updates the whole object, not just the changes. Enable this again when it gets fixed.
	}
	
	Folders.attachSchema(new SimpleSchema<IFolder>(folderDefinitions));
	
	Folders.deny({
		update: (userId: string, doc: IFolder, fieldNames: string[], modifier) => {
			if (doc.owner === userId) {
				return false;
			} else if (fieldNames.length === 1 && fieldNames[0] === 'links') {
				return false;
			} else {
				return true;
			}
		}
	});
	
	Folders.allow({
		insert: (userId: string, doc: IFolder) => { 
			return userId === doc.owner 
				&& doc.collaborators && doc.collaborators.length === 1
				&& doc.collaborators[0] === userId; 
		},
		update: (userId: string, doc: IFolder, fieldNames: string[], modifier) => {
			return doc.collaborators 
				&& doc.collaborators.indexOf(userId) > -1;
		},
		remove: (userId: string, doc: IFolder) => { return userId === doc.owner; }
	})
}