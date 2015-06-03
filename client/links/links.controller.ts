/// <reference path="../tsd.d.ts" />

module linkster.client {
	class LinksterController extends BaseController {
		public folders: ng.meteor.AngularMeteorCollection<IFolder>;
		
		static $inject = ['$scope', '$meteor', '$state', 'currentUser'];
		constructor($scope: ng.meteor.IScope, private $meteor: ng.meteor.IMeteorService, 
			private $state: ng.ui.IStateService, private currentUser: Meteor.User) {
			super($scope);
			
			this.folders = $scope.$meteorCollection(Folders);
			this.folders.subscribe('folders');
			
			$meteor.autorun($scope, () => {
				$scope.getReactively('links.folders[0]');
				this.redirectToFirstFolderIfNecessary();
			})
		}
		
		public addFolder(folderName: string) {
			this.folders.push({
				name: folderName,
				links: []
			});
		}
		
		public renameFolder(index: number, newName: string) {
			this.folders[index].name = newName;
		}
		
		public removeFolder(index: number) {
			this.folders.splice(index, 1);
		}
		
		private redirectToFirstFolderIfNecessary(folders?: ng.meteor.AngularMeteorCollection<IFolder>) {
			folders = folders || this.folders;
			
			if (this.$state.current.name === 'links') {
				if (folders && folders.length) {
					this.$state.go('.folder', {id: folders[0]._id});
				}
			}
		}
		
		protected onStateChanged(event: ng.IAngularEvent, toState: ng.ui.IState, toParams: any, fromState: ng.ui.IState, fromParams: any) {
			this.redirectToFirstFolderIfNecessary();		
		}
	}
	
	angular.module('linkster')
		.controller('LinksterController', LinksterController)
		.config(['$stateProvider', '$urlRouterProvider',
            ($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
                $stateProvider.state('links', {
                    url: '/links',
					templateUrl: 'client/links/index.ng.html',
					controller: 'LinksterController',
					controllerAs: 'links',
					resolve: {
						'currentUser': ['$meteor', ($meteor: ng.meteor.IMeteorService) => {
							return $meteor.requireUser();
						}]
					}
				}).state('links.folder', {
					url: '/:id',
					templateUrl: 'client/links/folder.ng.html',
					controller: 'FolderController',
					controllerAs: 'folder'
				});
            }]).run(['$rootScope', '$state', ($rootScope: ng.IRootScopeService, $state: ng.ui.IStateService) => {
				$rootScope.$on('$stateChangeError', (event: ng.IAngularEvent, toState: ng.ui.IState, toParams: any,
																		fromState: ng.ui.IState, fromParams: any, error: string) => {
					$state.go('home');
				});
			}]);
}