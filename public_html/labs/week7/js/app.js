(function() {
'use strict';
    angular
        //linked to the index page
        .module('app',['ngRoute'])
    .config(config);
    config.$inject = ['$routeProvider'];
//set the view based on the url
    function config ($routeProvider) {
        $routeProvider.
            //home / default && link the template with the controller
            when('/', {
            templateUrl: 'js/phone-list.template.html',
            controller: 'PhoneListController',
            controllerAs: 'vm'
        }).
            //detail page && link the template with the controller
            when('/phones/:phoneId', {
            templateUrl: 'js/phone-detail.template.html',
            controller: 'PhoneDetailController',
            controllerAs: 'vm'
        }).
            //set the view to the default
            otherwise(({
            redirectTo: '/'
        }));
    }
})();