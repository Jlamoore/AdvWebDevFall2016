(function () {
    'use strict';
    angular
    //set the "module" to the app.js which is linked to the index page 
        .module('app')
        .controller('PhoneListController', PhoneListController);

    PhoneListController.$inject = ['PhonesService'];
 // create the phones object
    function PhoneListController(PhonesService) {
        var vm = this;

        vm.phones = [];

        //get all the phones
        activate();

        function activate(){
            PhonesService.getPhones().then(function (response) {
                vm.phones = response;
            });
        }
    }
}) ();