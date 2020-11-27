/* Search Controller
====================================================================================================
==================================================================================================*/
tasInnApp.controller('searchCtrl', function (searchData, $scope, $sce, $filter, $window, $q) {
    'use strict';
  
    $window.scrollTo(0, 0);
    $scope.$sce = $sce;
    $scope.sslArr = [];
    $scope.searchDataArr = [];
    $scope.searchResultsArr =[];
    $scope.hideSearch = true;

    // Remove duplicates from results array of objects
    $scope.removeDuplicates = function(myArray){ 
    var newArray = [];
    for(var i=0; i< myArray.length; i++){
        if(newArray.indexOf(myArray[i]) == -1){
        newArray.push(myArray[i])
        }
    }
    return newArray;
    };

    //Get SSL Data
    searchData.getSSLData().then(function(data){
        console.log('data.d.results ', data.d.results);
        angular.forEach(data.d.results, function(value, key){
            var sslObj = {
                ID: value.ID,
                Title: value.Title,
                SSL: value.SSL_x002d_Tool,
                cssClass: value.CSS_x002d_Class,
                Clicked: '',
                Order: value.Order0
            }
            $scope.sslArr.push(sslObj);
        });

        console.log('$scope.sslArr ', $scope.sslArr);
    });

    //Get the Search data
    searchData.getSearchData().then(function(data){
        //console.log('data.d.results ', data.d.results);
        angular.forEach(data.d.results, function(value, key){
            var searchObj = {
                Title:  value.Title,
                Intro:   value.Intro_x002d_Content,
                Image:  value.Tool_x002d_Image,
                sslID:  value.SSL_x002d_ToolId,
                Order:  value.Order0
            }
            $scope.searchDataArr.push(searchObj);
        });

        $q.all($scope.searchDataArr).then(function(){
            angular.forEach($scope.searchDataArr, function(value, key){
                $scope.searchValue = value;
                angular.forEach($scope.sslArr, function(value, key){
                    if ($scope.searchValue.sslID == value.ID){
                        $scope.searchValue.SSL = value.SSL;
                        $scope.searchValue.cssClass = value.cssClass;
                    }
                });
            });
        });
       
    });

    $scope.searchResultsArr = $scope.searchDataArr;

    $scope.filterBySSL = function(ssl){
        $scope.singleSSLArr = [];
        angular.forEach($scope.sslArr, function(value, key){
            if (value.SSL == ssl){
                value.Clicked = 'ssl-clicked';
            } else {
                value.Clicked = '';
            }
        });            
        angular.forEach($scope.searchDataArr, function(value, key){
            if (value.SSL == ssl){
                $scope.singleSSLArr.push(value);
            }
        });

        $scope.searchResultsArr = $scope.singleSSLArr;
    }

    $scope.resetFilters = function(){
        angular.forEach($scope.sslArr, function(value, key){
            value.Clicked = '';
        });
        $scope.singleSSLArr = [];
        $scope.searchResultsArr = $scope.searchDataArr;
    }

});

 

