/// <reference path="../tsd.d.ts" />

module linkster.client {
	angular.module('linkster', ['angular-meteor', 'ngAnimate', 'ngMaterial', 'ui.router'])
		.config(['$locationProvider', ($locationProvider: ng.ILocationProvider) => {
			$locationProvider.html5Mode(true);
		}])
		.config(['$mdThemingProvider', ($mdThemingProvider: angular.material.MDThemingProvider) => {
		$mdThemingProvider.theme('default')
			.primaryPalette('teal')
			.accentPalette('yellow', {'default':'400'})
		}])
		.config(['$stateProvider', '$urlRouterProvider',
            ($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
                $stateProvider.state('home', {
                    url: '/',
					templateUrl: 'client/main/home.ng.html'
				}).state('about', {
					url: '/about',
					templateUrl: 'client/main/about.ng.html'
				});
				$urlRouterProvider.otherwise('/');
            }]);
}