/* TASx Team Controller
====================================================================================================
==================================================================================================*/
tasInnApp.controller('teamCtrl', function (teamData, searchData, introSectionData,  sharedParams, $scope, $state, $stateParams, $sce, $filter, $window, $q) {
    'use strict';
  
    $window.scrollTo(0, 0);
    $scope.$sce = $sce;
    $scope.sslArr = [];
    $scope.teamMembersArr = [];
    $scope.contributorsArrInitial = [];
    $scope.contributorsArr = [];

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

    //Get Team Members data
    teamData.getTeamData().then(function(data){
        //console.log('data.d.results ', data.d.results);
        angular.forEach(data.d.results, function(value, key){
            var teamMemberObj = {
                Title: value.Title,
                Intro: value.Intro_x002d_Content,
                ReadMore: value.Read_x002d_More_x002d_Content,
                ImageLink: value.Image_x002d_Link,
                TeamMemberID: value.EY_Profile_x002d_PicId,
                Order: value.Order0
            }
            $scope.teamMembersArr.push(teamMemberObj);                        
        });

        $q.all($scope.teamMembersArr).then(function(){
            //Get details of Team Member via ID & add them to teamMemberObj
            angular.forEach($scope.teamMembersArr, function(value, key){
                searchData.getUserData(value.TeamMemberID).then(function(data){
                    value.TeamMemberTitle = data.d.Title;
                    value.TeamMemberEmail = data.d.UserPrincipalName;
                });
            });
        });
        //console.log('$scope.teamMembersArr new', $scope.teamMembersArr);
    });

    // Get Contributors data
    teamData.getContributorsData().then(function(data){
        //console.log('contributors ', data.d.results);
        angular.forEach(data.d.results, function(value, key){
            $scope.contributorObj = {
                ID: value.ID,
                Name: value.Title,
                Position: value.Position,
                ImageLink: value.Image_x002d_Link,
                ContributorID: value.EY_Profile_x002d_PicId,
                sslToolID: value.SSL_x002d_ToolId,
                Order: value.Order0
            }
            $scope.contributorsArrInitial.push($scope.contributorObj);     
        }); 

        $q.all($scope.contributorsArrInitial).then(function(){
            //Get details of Contributor via ID & add them to contributorObj
            angular.forEach($scope.contributorsArrInitial, function(value, key){
                searchData.getUserData(value.ContributorID).then(function(data){
                    value.ContributorTitle = data.d.Title;
                    value.ContributorEmail = data.d.UserPrincipalName;
                });
            });

            //Get name of SSL vid sslToolID & add it to contributorObj
            angular.forEach($scope.sslArr, function(value, key){
                var sslID = value.ID,
                    sslName = value.SSL;
                    angular.forEach($scope.contributorsArrInitial, function(value, key){
                        if(value.sslToolID == sslID){
                            value.SSL = sslName;
                        }
                    });

            });
            
        });
               
        //console.log('contributorsArr new', $scope.contributorsArrInitial);
        $scope.contributorsArr = $scope.contributorsArrInitial;
    });

    $scope.selectedSSL = 'Select SSL';
    $scope.filterBySSL = function(){
        $scope.filterContArr = [];
        $scope.contributorsArr = $scope.contributorsArrInitial;

        if($scope.selectedSSL == 'ALL'){
            $scope.contributorsArr = $scope.contributorsArrInitial;
        } else {
            //console.log('selectedSSL ', $scope.selectedSSL);
            angular.forEach($scope.contributorsArr, function(value, key){
                //console.log('value.SSL ', value.SSL);
                if (value.SSL == $scope.selectedSSL){
                    $scope.filterContArr.push(value);
                }
            });
            //console.log('$scope.filterContArr ', $scope.filterContArr);
            $scope.contributorsArr = $scope.filterContArr;
        }
    }

    introSectionData.getIntroData().then(function(response) {
        $scope.bottomSectionIntroData = response.d.results;
        // console.log("bottomSectionIntroData", $scope.bottomSectionIntroData);
      });
});  

