/// <reference path="tsd.d.ts" />

module linkster {
	export var rootFolderName = '_root';
	
	export interface IMongoCollection {
		_id?: string;
	}
	
	export interface IFolder extends IMongoCollection {
		name: string;
		links: ILink[];
		
		owner?: string;
		collaborators?: string[];
	}
	
	export interface ILink extends IMongoCollection {
		title?: string;
		description?: string
		link?: string;
	}
}