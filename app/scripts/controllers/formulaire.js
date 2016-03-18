'use strict';

/**
 * @ngdoc function
 * @name testApp.controller:FormulaireCtrl
 * @description
 * # FormulaireCtrl
 * Controller of the testApp
 */
angular.module('testApp')
  .controller('FormulaireCtrl', function ($scope, $http ) {

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

      var onData = function(response){

        $scope.resultat = response.data ;
      };
       var onError = function(reason) {
       $scope.error = " aucun chargement des tables, promise compromis";
       };


      $http.get("http://127.0.0.1:8080/toupie/hibernate/tables").then(onData, onError) ;


      $scope.message = "Bonjour Madame, Monsieur";




  });
