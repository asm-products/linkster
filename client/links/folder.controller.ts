/// <reference path="../tsd.d.ts" />

module linkster.client {
	class FolderController extends BaseController {
	    private currentFolder: IFolder;
	    
		static $inject = ['$scope', '$meteor', '$state', 'currentUser'];
		constructor($scope: ng.meteor.IScope, private $meteor: ng.meteor.IMeteorService, 
			private $state: ng.ui.IStateService, private currentUser: Meteor.User) {
			super($scope);
			
			if ($state.current.name === 'links.folder') {
			}
			console.log($state.params);
			// this.folders = $scope.$meteorCollection(Folders);
			// this.folders.subscribe('folders');
			
			$meteor.autorun($scope, () => {
				$scope.getReactively('links.folders[0]');
			})
		}
	}
	
	angular.module('linkster')
		.controller('FolderController', FolderController);
}