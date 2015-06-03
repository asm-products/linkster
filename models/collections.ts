/// <reference path="tsd.d.ts" />

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
	folderDefinitions['owner'] = {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
		denyUpdate: true,
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
		denyUpdate: true,
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
		denyUpdate: true
	}
	
	Folders.attachSchema(new SimpleSchema<IFolder>(folderDefinitions));
	
	Folders.deny({
		insert: (userId: string, doc: IFolder) => {
			if (doc.owner !== userId) {
				return true;
			} else if (!doc.collaborators || doc.collaborators.length !== 1 || doc.collaborators[0] !== userId) {
				return true;
			} else {
				return false;
			}
		},
		update: (userId: string, doc: IFolder, fieldNames: string[], modifier) => {
			if (doc.owner === userId) {
				return false;
			} else if (fieldNames.length === 1 && fieldNames[0] === 'links') {
				return false;
			} else {
				return true;
			}
		},
		remove: (userId: string, doc: IFolder) => {
			return (doc.owner !== userId);
		}
	});
	
	Folders.allow({
		insert: (userId: string, doc: IFolder) => { return true; },
		update: (userId: string, doc: IFolder, fieldNames: string[], modifier) => { return true; },
		remove: (userId: string, doc: IFolder) => { return true; }
	})
		
//	Meteor.methods({
//		addFolder: (folderName: string) => {
//			check(folderName, checks.FolderName);
//			
//			var currentUser = Meteor.userId();
//			var newFolder: IFolder = {name: folderName, owner: currentUser, collaborators: [currentUser], links: []}
//			
//			Folders.insert(newFolder);
//		},
//		
//		renameFolder: (id: string, newName: string) => {
//			check(id, checks.NonEmptyString);
//			check(newName, checks.FolderName);
//			
//			var currentUser = Meteor.userId();
//			
//			Folders.update({_id: id, owner: currentUser}, {$set: {name: newName}});
//		},
//		
//		deleteFolder: (id: string) => {
//			check(id, checks.NonEmptyString);
//			
//			var currentUser = Meteor.userId();
//			
//			Folders.remove({_id: id, owner: currentUser});
//		}
//	});
	
	/*
	var allowedUpdates = {
		name: (userId: string, doc: IFolder, modifiers: Object) => {
			if (userId === doc.owner) {
				for (var key in modifiers) {
					if (modifiers.hasOwnProperty(key)) {
						if (key != '$set') {
							return false;
						}
						check(modifiers[key]['name'], checks.FolderName);
					}
				}
			}
		},
		links: (userId: string, doc: IFolder, modifiers: Object) => {
			if ()
		},
		
	}
	
	Folders.allow({
		update: (userId: string, doc: IFolder, fieldNames: string[], modifier: any) => {
			if (doc.collaborators.indexOf(userId) === -1) {
				return false;
			}
			var allowedFieldNamesToChange = ['name', 'links', 'collaborators'];
			
			fieldNames.forEach(field => {
				if (allowedFieldNamesToChange.indexOf(field) === -1) {
					return false;
				}	
				if ()
			});
		}
	})
	*/
}