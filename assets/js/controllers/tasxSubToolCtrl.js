/* TASx Individual SUB Tool Controller
====================================================================================================
==================================================================================================*/
tasInnApp.controller('indSubToolCtrl', function (searchData, $scope, $sce, $filter, $window, $stateParams, $q) {
    'use strict';
  
    $window.scrollTo(0, 0);
    $scope.$sce = $sce;
    $scope.searchDataArr = [];
    $scope.championArr = [];

    $scope.sslTool = $stateParams.tasTool;
    //console.log('$scope.sslTool ', $scope.sslTool);

    $scope.sslSubTool = $stateParams.tasSubTool;
    //console.log('$scope.sslSubTool ', $scope.sslSubTool);
    
    
    //Get id of SSL tool
    searchData.getSSLData().then(function(data){
        //console.log('data.d.results ', data.d.results);
        angular.forEach(data.d.results, function(value, key){
            if(value.SSL_x002d_Tool == $scope.sslTool){
                $scope.sslObj = {
                    ID: value.ID,
                    Title: value.Title,
                    SSL: value.SSL_x002d_Tool,
                    cssClass: value.CSS_x002d_Class
                }
            }
        });

        //console.log('sslObj ', $scope.sslObj)
        $q.all($scope.sslObj).then(function(){
            //Get the Search data & check against both the title & ssl to make sure
            searchData.getSearchData().then(function(data){
                //console.log('data.d.results ', data.d.results);
                angular.forEach(data.d.results, function(value, key){
                    var searchObj = {
                        Title:  value.Title,
                        Intro:   value.Intro_x002d_Content,
                        Message:  value.Message_x002d_Content,
                        sslID:  value.SSL_x002d_ToolId,
                        ToolAccess: value.Tool_x002d_Access,
                        Videos: value.Videos,
                        QuikcRefs: value.Quick_x002d_Ref_x002d_Guide,
                        UseCase: value.Use_x002d_Case,
                        Faqs: value.FAQs,
                        ChampionsId: value.ChampionsId,
                        ToolImage: value.Tool_x002d_Image,
                        SuperUsersId: value.SuperUsersId
                    }
                    $scope.searchDataArr.push(searchObj);
                });   

                $q.all($scope.searchDataArr).then(function(){
                    $scope.currentSubTool = $filter('filter')($scope.searchDataArr, {Title: $scope.sslSubTool})[0];
                    //console.log('current subtool ', $scope.currentSubTool);
                    //Get the details of the tools Champions 
                    if($scope.currentSubTool.ChampionsId != null){
                        var champIdArr = $scope.currentSubTool.ChampionsId.results;
                        if(champIdArr.length > 0){
                            angular.forEach(champIdArr, function(value, key){
                                //Get details of Innovation Lead via ID & add them to $scope.currentSSL       
                                searchData.getUserData(value).then(function(data){
                                    var champObj = {
                                        Title : data.d.Title,
                                        Email : data.d.UserPrincipalName
                                    }
                                    $scope.championArr.push(champObj);
                                });
                            });
                        }
                    }
                    //Get the video links
                    if($scope.currentSubTool.Videos != null){
                        $scope.videoArr = [];
                        $scope.videoArr = $scope.currentSubTool.Videos.split(';');
                        //console.log('vidArr ', $scope.videoArr);
                    }
                    //Get the use-case links
                    if($scope.currentSubTool.UseCase != null){
                        $scope.useCaseArr = [];
                        $scope.useCaseArr = $scope.currentSubTool.UseCase.split(';');
                        //console.log('useCaseArr ', $scope.useCaseArr);
                    }
                    //Get the QuickRefs links
                    if($scope.currentSubTool.QuikcRefs != null){
                        $scope.quickRefsArr = [];
                        $scope.quickRefsArr = $scope.currentSubTool.QuikcRefs.split(';');
                        //console.log('quickRefsArr ', $scope.quickRefsArr);
                    }
                });
               
            });
        });
    
    });
   
});  

