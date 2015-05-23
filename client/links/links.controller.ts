/// <reference path="../tsd.d.ts" />

module linkster.client {
	class LinksterController extends BaseController {
		static $inject = ['$scope', '$meteor', '$state'];
		constructor($scope: ng.meteor.IScope, private $meteor: ng.meteor.IMeteorService, 
			private $state: ng.ui.IStateService, public currentUser: IUser) {
			super($scope);
			
			if (!this.currentUser.folders) {
				this.currentUser.folders = [];
			}
			this.redirectToFirstFolderIfNecessary();
		}
		
		public newFolder(folderName: string) {
			this.currentUser.folders.push({_id: Random.id(), name: folderName});
		}
		
		private redirectToFirstFolderIfNecessary() {
			if (this.$state.current.name === 'links') {
				if (this.currentUser.folders.length) {
					this.$state.go('.folder', {id: this.currentUser.folders[0]._id});
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