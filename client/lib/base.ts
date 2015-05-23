/// <reference path="../tsd.d.ts" />

module linkster.client {
    export class BaseControllerAny<T extends ng.IScope> {
        constructor(protected $scope: T) {
            $scope.$on('$stateChangeSuccess', this.onStateChanged.bind(this));
        }

        protected onStateChanged(event: ng.IAngularEvent,
            toState: ng.ui.IState, toParams: any, fromState: ng.ui.IState, fromParams: any) { }
    }
	
	export class BaseController extends BaseControllerAny<ng.meteor.IScope> { }
}