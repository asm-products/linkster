/// <reference path="tsd.d.ts" />

module linkster {
	export var Folders = new Mongo.Collection<IFolder>('folders');
	
	Meteor.methods({
		addFolder: (folderName: string) => {
			check(folderName, checks.NonEmptyAndMaxLengthString(50));
			
			var currentUser = Meteor.userId();
			var newFolder: IFolder = {name: folderName, owner: currentUser, collaborators: [currentUser], links: []}
			
			Folders.insert(newFolder);
		}
	})
}