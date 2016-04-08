'use strict';

/**
 * @ngdoc function
 * @name testApp.controller:FormulaireCtrl
 * @description
 * # FormulaireCtrl
 * Controller of the testApp
 */
angular.module('testApp').controller('FormulaireCtrl', function ($scope, $http, viewDB, $filter ) {

  //Nom de la base de donne selectioner hibernate ou mongodb pour l'instant
  $scope.nomBaseDeDonnee = null;

  // objet placé dans un drop
  $scope.list2 ;


  // Nom de la table selectionner ResultatTable de la base de donnée de nomBaseDeDonnee
  var onDataTable = function (response) {
    $scope.resultatTable = response.data;
  };

  var onErrorTable = function (reason) {
    $scope.errorTable = "aucun chargement des tables, promise compromis";
  };

  // Service viewDB Get /toupie/viewAllDataBase  retourne le nom des bases de donnée
  viewDB.query(function (data) {
    $scope.resultatDb = data;
  });

//Affichage de toutes les tables de la base de donnée
  $scope.selectDB = function () {
    //alert("titi");
    $http.get('http://127.0.0.1:8080/toupie/' + $scope.nomBaseDeDonnee + '/tables').then(onDataTable, onErrorTable);

  };

  // Retourne la structure de la table "tableBaseDeDonnee" de la base de donnée "nomBaseDeDonnee"
  var onDataTableType = function (response) {

    $scope.resultatTableType = angular.fromJson(response.data);
  };

  var onErrorTableType = function (reason) {
    $scope.errorTableType = "aucun chargement des tables, promise compromis";
  };

  $scope.selectTable = function () {

    $http.get('http://127.0.0.1:8080/toupie/' + $scope.nomBaseDeDonnee + '/tables/' + $scope.tableBaseDeDonnee).then(onDataTableType, onErrorTableType);

  }


  // ListeElem, va contenir  la liste des champs selectionné par l'utilisateur.
  $scope.listeElem = [];



  function tableEtChamps(tablee, champs) {
    return {
      "table": tablee,
      "champs": champs
    };
  }

  /** Retourne l'index où se trouve l'élément recherché
   Si l'élément ne s'y trouve pas alors retourne -1
   Element table et champs   **/

  $scope.retourneEmplacement = function (list, elem) {
    for (var index = 0; index < list.length; index++) {
      if (list[index]['table'] == elem['table'] && list[index]['champs'] == elem['champs']) {
        return index;
      }
    }
    return -1;
  };

  $scope.toggle = function (tableName, item, list) {

    /*  var inside = function(table , item ) {
     var found = $filter('filter')(list, {table : table , champs : item }, true);
     if (found.length) {
     $scope.reponseTre = JSON.stringify(found[0]);
     } else {
     $scope.reponseTre = 'Not found';
     }
     } */
    var monElement = tableEtChamps(tableName, item);
    var idx = $scope.retourneEmplacement(list, monElement);
    if (idx > -1) {
      list.splice(idx, 1);
    } else {
      var myVar = tableEtChamps(tableName, item);
      list.push(myVar);
    }
  };


  $scope.exists = function (tableName, item, list) {
    //  alert( "hhhlllllllllllll" + (list.indexOf($table+"."+item) > -1)) ;
    // vraioufaux = list.indexOf($table+"."+item) > -1;
    var monElement = tableEtChamps(tableName, item);
    return $scope.retourneEmplacement(list, monElement) > -1;
  };


  $scope.resultatTableDonnee = [];
  var onDataTableDonnee = function (response) {

    $scope.resultatTableDonnee.push(response.data);
    //angular.fromJson(response.data) ;
  };

  var onErrorTableDonnee = function (reason) {
    $scope.errorTableDonnee = "aucun chargement des tables, promise compromis";
  };


  $scope.selectDonnee = function () {

    if ($scope.listeElem != null && $scope.listeElem.length > 0) {

      var nameFilter = [];
      for (var i = 0; i < $scope.listeElem.length; i++) {
        var tableUn = $scope.listeElem[i]['table'];
        if (nameFilter.indexOf(tableUn) == -1) {
          nameFilter.push($scope.listeElem[i]['table']);
          var tableau = $filter('filter')($scope.listeElem, {table: $scope.listeElem[i]['table']}, true);

          var maRequete = tableau[0]['table'] + "/data?";
          var t = 0;
          tableau.forEach(function (entree) {
            t++;
            if (t == tableau.length) {
              maRequete += "fieldName=" + entree['champs'];
            } else {
              maRequete += "fieldName=" + entree['champs'] + "&";
            }
          });
          $http.get('http://127.0.0.1:8080/toupie/' + $scope.nomBaseDeDonnee + '/tables/' + maRequete).then(onDataTableDonnee, onErrorTableDonnee);

          //users/data?fieldName=name&fieldName=id

          // $http.get('http://127.0.0.1:8080/toupie/'+ $scope.nomBaseDeDonnee +'/tables/'+ $scope.tableBaseDeDonnee +"/"+$scope.listeElem).then(onDataTableDonnee, onErrorTableDonnee) ;

        }
      }
    }

  };
  $scope.testi = function(){

    alert ( "bobi a");
  };
  $scope.onDrop = function(){

    alert ( "bobi with onDrop");
  }

  $scope.test = function(bob){

    alert ( "bobi adi");
  };


  $scope.histogramme = function() {
    $scope.result = angular.fromJson($scope.resultatTableDonnee[0]);

   var w = 300;
    var h = 100;
    var padding = 2;
  alert( $scope.result[0].id ) ;
    var dataset = $scope.result;//[5, 10, 13, 19, 14, 21, 25, 11, 25, 22, 18, 7];
    var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

    function colorPicker(v) {
      if (v <= 20) {
        return "#666666";
      }
      else if (v > 20) {
        return "#FF0033";
      }
    };

    svg.selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("x", function (d, i) {
        alert("numero i : " + i +  "valeur : "+ d);
        return i * (w / dataset.size);
      })
      .attr("y", function (d) {
        return h - (d * 4);
      })
      .attr("width", w / dataset.size - padding)
      .attr("height", function (d) {
        return d.id * 4;
      })
      .attr("fill", function (d) {
        return colorPicker(d);
      });

    svg.selectAll("text")
      .data(dataset)
      .enter()
      .append("text")
      .text(function (d) {
        return d;
      })
      .attr({
        "text-anchor": "middle",
        x: function (d, i) {

          return i * (w / dataset.size) + (w / dataset.size - padding) / 2;
        },
        y: function (d) {
          return h - (d * 4) + 14;
        },
        "font-family": "sans-serif",
        "font-size": 12,
        "fill": "#ffffff"

      });
  };





  });



/*


 $scope.ajoutSupprimeListe = function ($donne, $tableBaseDeDonnee, $selection) {
 //alert($donne) ;
 if ($donne == true) {
 //alert("valeur cocher") ;
 $scope.listeElem.push($tableBaseDeDonnee + "." + $selection);
 }
 else if ($donne == false) {
 // alert ("valeur decocher");
 var index = $scope.listeElem.indexOf($tableBaseDeDonnee + "." + $selection);
 if (index > -1) {
 $scope.listeElem.splice(index, 1);
 }
 } else {
 alert($donne + "erreur ni vrai ni faux");
 }
 };
 */
