/* TASx Individual Tool Controller
====================================================================================================
==================================================================================================*/
tasInnApp.controller('indToolCtrl', function (searchData, $scope, $sce, $filter, $window, $location, $stateParams, $q) {
    'use strict';
  
    $window.scrollTo(0, 0);
    $scope.$sce = $sce;
    $scope.sslArr = [];
    $scope.searchDataArr = [];
    $scope.currentSSLToolsArr = [];

   

    // $scope.$on('$locationChangeSuccess', function($event, next, current) { 
        $scope.stateName = $location.$$url.split('/')[3];
        //console.log('stateName window home ', $scope.stateName);

   
        $scope.toolParams = $stateParams;
        //console.log('$scope.toolParams ', $scope.toolParams);

        $scope.sslTool = $stateParams.tasTools;
        //console.log('$scope.sslTool ', $scope.sslTool);

    //});

        //Get SSL Data
        searchData.getSSLData().then(function(data){
            //console.log('data.d.results ', data.d.results);
            angular.forEach(data.d.results, function(value, key){
                var sslObj = {
                    ID: value.ID,
                    Title: value.Title,
                    SSL: value.SSL_x002d_Tool,
                    cssClass: value.CSS_x002d_Class,
                    IntroMessage: value.Intro_x002d_Message,
                    AnalytLeadId: value.Analytics_x002d_LeadId,
                    AnalytLeadImg: value.Analytics_x002d_Lead_x002d_Image,
                    AnlytLeadPos: value.Analytics_x002d_Lead_x002d_Posit,
                    InnovLeadId: value.Innovation_x002d_LeadId,
                    InnovLeadImg: value.Innovation_x002d_Lead_x002d_Imag,
                    InnovLeadPos: value.Innovation_x002d_Lead_x002d_Posi
                }
                $scope.sslArr.push(sslObj);
            });

            $q.all($scope.sslArr).then(function(){
                //console.log('$scope.sslArr ', $scope.sslArr);

                //console.log('$scope.sslTool ', $scope.sslTool);
                //Get details of current SSL Tool
                $scope.currentSSL = $filter('filter')($scope.sslArr,{SSL: $scope.sslTool})[0];
                //console.log('$scope.currentSSL ', $scope.currentSSL);        
        
                //Get details of Analytics Lead via ID & add them to $scope.currentSSL       
                searchData.getUserData($scope.currentSSL.AnalytLeadId).then(function(data){
                $scope.currentSSL.ALTitle = data.d.Title;
                $scope.currentSSL.ALEmail = data.d.UserPrincipalName;
                });

                //Get details of Innovation Lead via ID & add them to $scope.currentSSL       
                searchData.getUserData($scope.currentSSL.InnovLeadId).then(function(data){
                $scope.currentSSL.ILTitle = data.d.Title;
                $scope.currentSSL.ILEmail = data.d.UserPrincipalName;
                });
                //console.log('current tool ', $scope.currentSSL);
            });

            //Get the Search data
            searchData.getSearchData().then(function(data){
                //console.log('data.d.results ', data.d.results);
                angular.forEach(data.d.results, function(value, key){
                    var searchObj = {
                        Title:  value.Title,
                        Intro:   value.Intro_x002d_Content,
                        Message:  value.Message,
                        sslID:  value.SSL_x002d_ToolId,
                        ToolAccess: value.Tool_x002d_Access,
                        Videos: value.Videos,
                        QuikcRefs: value.Quick_x002d_Ref_x002d_Guide,
                        UseCase: value.User_x002d_Case,
                        Faqs: value.FAQs,
                        ChampionsId: value.ChampionsId,
                        ToolImage: value.Tool_x002d_Image,
                        SuperUsersId: value.SuperUsersId
                    }
                    $scope.searchDataArr.push(searchObj);
                });

                //console.log('$scope.searchDataArr new', $scope.searchDataArr);

                //Get SSL values for each array item
                angular.forEach($scope.searchDataArr, function(value, key){
                    $scope.searchValue = value;
                    angular.forEach($scope.sslArr, function(value, key){
                        if ($scope.searchValue.sslID == value.ID){
                            $scope.searchValue.SSL = value.SSL;
                            $scope.searchValue.cssClass = value.cssClass;
                        }
                    });
                });

                //console.log('$scope.searchDataArr plus', $scope.searchDataArr);

                //Get all tool items that have the current ssl
                angular.forEach($scope.searchDataArr, function(value, key){
                    if (value.SSL == $scope.currentSSL.SSL){
                        $scope.currentSSLToolsArr.push(value);
                    }
                });

                //console.log('final result: ', $scope.currentSSLToolsArr);
            });

        });


   
});
