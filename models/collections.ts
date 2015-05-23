/// <reference path="tsd.d.ts" />

module linkster {
	export var Folders = new Mongo.Collection<IFolder>('folders');
	
	Meteor.methods({
		addFolder: (folderName: string) => {
			check(folderName, checks.FolderName);
			
			var currentUser = Meteor.userId();
			var newFolder: IFolder = {name: folderName, owner: currentUser, collaborators: [currentUser], links: []}
			
			Folders.insert(newFolder);
		},
		
		renameFolder: (id: string, newName: string) => {
			check(id, checks.NonEmptyString);
			check(newName, checks.FolderName);
			
			var currentUser = Meteor.userId();
			
			Folders.update({_id: id, owner: currentUser}, {$set: {name: newName}});
		} 
	});
}