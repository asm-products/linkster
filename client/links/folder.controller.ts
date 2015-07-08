/// <reference path="../tsd.d.ts" />

module linkster.client {
	interface IFolderAngularObject extends ng.meteor.AngularMeteorObject<IFolder>, IFolder {}
	
	class FolderController extends BaseController {
	    public current: IFolderAngularObject;
	    
		static $inject = ['$scope', '$meteor', '$state', 'currentUser'];
		constructor($scope: ng.meteor.IScope, private $meteor: ng.meteor.IMeteorService,
			private $state: ng.ui.IStateService, private currentUser: Meteor.User) {
			super($scope);
		
			$scope.$meteorSubscribe('folders').then(handle => {
				this.current = <IFolderAngularObject>$scope.$meteorObject(Folders, $state.params['folderId']);
				
				if (!this.current._id) {
					$state.go('links');
				} else if ($state.current.name === 'links.folder') {
					this.updateFolderUrlIfNecessary();
				} else {
					this.initializeController();
				}
			})
			
			if ($state.current.name === 'links.folder') {
			}
			console.log($state.params);
			// this.folders = $scope.$meteorCollection(Folders);
			// this.folders.subscribe('folders');
		}
		
		public addNewLink(link: ILink) {
			link.createdAt = new Date();
			this.current.links.push(link);
		}
		
		public deleteLink(index: number) {
			this.current.links.splice(index, 1);
		}
		
		private initializeController() {
			this.$scope.$watch('folder.current.name', this.updateFolderUrlIfNecessary.bind(this));			
		}
		
		private updateFolderUrlIfNecessary() {
			if (!this.$state.params['folderName'] || this.$state.params['folderName'] !== this.current.name) {
				this.$state.go('links.namedFolder', { 
					folderId: this.current._id, 
					folderName: this.current.name 
				});
			}
		}
	}
	
	angular.module('linkster')
		.controller('FolderController', FolderController);
}