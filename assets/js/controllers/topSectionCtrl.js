/* Top Section Controller
====================================================================================================
==================================================================================================*/
tasInnApp.controller('topSectionCtrl', function (introSectionData, sharedParams,$scope, $state, $stateParams, $sce, $filter, $location, $window, $rootScope) {
    'use strict';
  
    $window.scrollTo(0, 0);
    $scope.$sce = $sce;
    $scope.subTool = false;
    $scope.introDataArr = [];
    $scope.currentPageArr = [];
    $scope.hideSearch = false;

    //Get the Intro Sections data
    introSectionData.getIntroData().then(function(data){
        //console.log('data.d.results ', data.d.results);
        angular.forEach(data.d.results, function(value, key){
            var introObj = {
                Title:  value.Title,
                Text:   value.Intro_x002d_text,
                StateName:  value.state_x002d_name,
                ToolsMenu:  value.Tools_x002d_Menu,
                IndTool:    value.Ind_x002d_Tool
            }
            $scope.introDataArr.push(introObj);
        });
    }); 

    $scope.$watch(function(){
        //console.log('$state.$current.name 334', $state.$current.name);
        $scope.currentPage = $filter('filter')($scope.introDataArr, {StateName: $state.$current.name})[0];
        //console.log('$scope.currentPage', $scope.currentPage);


        //Check if in subTool state and populate breadcrumb accordingly
        if($state.$current.name == 'tasx-tools/ind-tool/sub-tool' || $state.$current.name == 'sat-all-tools'){
            $scope.currentPage = {};
            $scope.currentPage.StateName = 'SaT-Tools';
            $scope.sslTool = $stateParams.tasTool;
            $scope.sslSubTool = $stateParams.tasSubTool;
        }
       

        if($state.$current.name == 'search' || $state.$current.name == 'sat-all-tools' ){
            $scope.hideSearch = true;
        } else {
            $scope.hideSearch = false;
        }

        //console.log('$scope.hideSearch' , $scope.hideSearch);
    });       

 });
    

