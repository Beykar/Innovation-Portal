/* GDS Controller
====================================================================================================
==================================================================================================*/
tasInnApp.controller('gdsCtrl', function (searchData, sharedParams, $scope, $state, $stateParams, $sce, $filter, $window, $q) {
    'use strict';
  
    $window.scrollTo(0, 0);
    $scope.$sce = $sce;
    $scope.sslArr = [];
    $scope.gdsContactsArr = [];
   

    //Get id of SSL tool
    searchData.getSSLData().then(function(data){
        //console.log('data.d.results ', data.d.results);
        angular.forEach(data.d.results, function(value, key){
                var sslObj = {
                    ID: value.ID,
                    Title: value.Title,
                    SSL: value.SSL_x002d_Tool,
                    cssClass: value.CSS_x002d_Class
                }
                $scope.sslArr.push(sslObj);
        });
    });


    //Get GDS contact data
    searchData.getGDSData().then(function(data){
        console.log('gds contacts ', data.d.results);
        angular.forEach(data.d.results, function(value, key){
            $scope.gdsObj = {
                ID: value.ID,
                Name: value.Title,
                ContactType: value.Contact_x002d_Type,
                Position: value.Position,
                GDSContactID: value.EY_x002d_ProfileId,
                sslToolID: value.SSL_x002d_ToolId
            }
            $scope.gdsContactsArr.push($scope.gdsObj);     
        }); 

        $q.all($scope.gdsContactsArr).then(function(){
            //Get details of GDS contact via ID & add them to gdsObj
            angular.forEach($scope.gdsContactsArr, function(value, key){
                searchData.getUserData(value.GDSContactID).then(function(data){
                    value.GDSContactIDTitle = data.d.Title;
                    value.GDSContactEmail = data.d.UserPrincipalName;
                });
            });

            //Get name of SSL vid sslToolID & add it to gdsObj
            angular.forEach($scope.sslArr, function(value, key){
                var sslID = value.ID,
                    sslName = value.SSL;
                    angular.forEach($scope.gdsContactsArr, function(value, key){
                        if(value.sslToolID != null && value.sslToolID == sslID){
                            value.SSL = sslName;
                        }
                    });
            });            
        });               
        //console.log('$scope.gdsContactsArr', $scope.gdsContactsArr);       
    });

    
});  

