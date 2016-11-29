(function() {

    'use strict';
    angular
        .module('app')
        .factory('PhonesService', PhonesService);

    PhonesService.$inject = ['$http', 'REQUEST'];
//set the http promise and the REQUEST json file
    function PhonesService($http, REQUEST) {
//add the .phones to the location url
        var url = REQUEST.Phones;
        //set the service object to get all phones and find specific phone functions
        var service = {
            'getPhones' : getPhones,
            'findPhone' : findPhone
        };
        return service;
//declare the functions and what they do
        function getPhones() {
            return $http.get(url)
                .then(getPhonesComplete, getPhonesFailed);
//aka. callback and error functions
            function getPhonesComplete(response) {
                return response.data;
            }

            function getPhonesFailed(error){
                return [];
            }
        }

        function findPhone(id) {

            return getPhones()
            .then(function(data) {
                return findPhoneComplete(data);
            });

            function findPhoneComplete(data) {
                var results = {};
//callback function foreach phone in data( if the phone has properties: name, id, snippit ect.. compare the id of the phone with the desired id and return the phone data if true. used for the detail page)
                angular.forEach(data, function (value, key) {
                    if(!results.length) {
                        if(value.hasOwnProperty('id') && value.id === id) {
                            results = angular.copy(value);
                        }
                    }
                }, results);

                return results;

            }
        }

    }
})();