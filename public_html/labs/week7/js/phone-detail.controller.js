(function(){
    'use strict';
    angular
        //link to app
        .module('app')
        .controller('PhoneDetailController', PhoneDetailController);
//set the params so that we can grab url data and to use the phone service js
    PhoneDetailController.$inject = ['$routeParams', 'PhonesService'];

    function  PhoneDetailController($routeParams, PhonesService) {
        var vm = this;

        vm.phone = {};
        var id = $routeParams.phoneId;
//grab the id from the url
        activate();
//find the phone using the function declared in the service and set it to the vm.phone object
        function activate() {
            PhonesService.findPhone(id).then(function (response) {
                vm.phone = response;
            });
        }
    }
}) ();