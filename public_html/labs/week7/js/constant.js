(function() {
    'use strict'
//set a constant "REQUEST" to the value of the location of the json file. So that it doesn't have to typed in everytime.
    angular
        .module('app')
        .constant('REQUEST', {
            'Phones' : './data/phones.json'
        });
}) ();