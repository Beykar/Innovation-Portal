/* Home Controller
====================================================================================================
==================================================================================================*/
tasInnApp.controller('homeCtrl', function (searchData, introSectionData, ourNewsData, sharedParams, $scope, $sce, $stateParams, $filter, $window, $location) {
    'use strict';
  
    $window.scrollTo(0, 0);
    $scope.$sce = $sce;
    $scope.sslArr = [];
    $scope.searchDataArr = [];
    $scope.searchResultsArr =[];
    $scope.featuredArr = [];
    
    //Get SSL Data
    searchData.getSSLData().then(function(data){
        //console.log('data.d.results ', data.d.results);
        angular.forEach(data.d.results, function(value, key){
            var sslObj = {
                ID: value.ID,
                Title: value.Title,
                SSL: value.SSL_x002d_Tool,
                cssClass: value.CSS_x002d_Class,
                Order: value.Order0
            }
            $scope.sslArr.push(sslObj);
        });
        //console.log('$scope.sslArr ', $scope.sslArr);
    });

    //Get the Intro Sections data
    introSectionData.getIntroData().then(function(data){
        //console.log('data.d.results ', data.d.results);
        $scope.introData = $filter('filter')(data.d.results, {'state_x002d_name': 'home'})[0];
        //console.log('$scope.introData ', $scope.introData);
    }); 

    //Get the News data
    ourNewsData.getNewsData().then(function(data){
        //console.log('data.d.results ', data.d.results);
        angular.forEach(data.d.results, function(value, key){
            if(value.Featured == true && value.Article_x002d_Type === 'News'){
                 var newsObj = {
                    ID  :  value.ID,
                    Title:  value.Title,
                    Summary:   value.Summary,
                    Content:  value.Content,
                    Image:  value.Article_x002d_Image.Url,
                    Quote:  value.Quote,
                    QuoteAuthor: value.Quote_x002d_Author,
                    Author: value.Article_x002d_Author,
                    Date: value.Article_x002d_Date,
                    Featured: value.Featured,
                    ArticleType: value.Article_x002d_Type
                }
                $scope.featuredArr.push(newsObj);
            }
        });

        //order by desc date                  
        $scope.featuredArr = $filter('orderBy')($scope.featuredArr, '-Date');
        //console.log('$scope.featuredArr ', $scope.featuredArr);
    });

    $scope.getItemID = function(id){
        sharedParams.setNewsItemID(id);
        $scope.dataObj = sharedParams.getDataObj();
        //console.log('$scope.dataObj ', $scope.dataObj);
    }
});  

