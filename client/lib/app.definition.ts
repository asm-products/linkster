/// <reference path="../tsd.d.ts" />

module linkster.client {
	angular.module('linkster', ['angular-meteor', 'ngAnimate', 'ngMaterial', 'ui.router'])
		.config(['$locationProvider', ($locationProvider: ng.ILocationProvider) => {
			$locationProvider.html5Mode(true);
		}])
		.config(['$mdThemingProvider', ($mdThemingProvider: angular.material.MDThemingProvider) => {
		$mdThemingProvider.theme('default')
			.primaryPalette('teal')
			.accentPalette('teal', {'default':'200'})
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
			
	//Full Material icon set can be found here http://google.github.io/material-design-icons/    
	var themeIcons = ['$mdIconProvider' , function ($mdIconProvider) {
	
	$mdIconProvider
	    .iconSet("social", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-social.svg")
	    .iconSet("action", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-action.svg")
	    .iconSet("communication", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-communication.svg")
	    .iconSet("content", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-content.svg")
	    .iconSet("toggle", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-toggle.svg")
	    .iconSet("navigation", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-navigation.svg")
	    .iconSet("image", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-image.svg")
		.iconSet("file", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-file.svg");
	
	}];
	
    angular.module('linkster') .config(themeIcons); 
}