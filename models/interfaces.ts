/// <reference path="tsd.d.ts" />

module linkster {
	export interface IFolderDesc {
		_id?: string;	
		name: string;
	}
	
	export interface IFolder extends IFolderDesc {
		description?: string;
		link?: string;
		content?: IFolder[];
	}
	
	export interface IUser extends Meteor.User {
		folders: IFolderDesc[];
	}
}