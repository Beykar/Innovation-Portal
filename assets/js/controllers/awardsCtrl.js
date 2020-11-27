/* Innovation Awards Controller
====================================================================================================
==================================================================================================*/
tasInnApp.controller('awardsCtrl', function (ourNewsData, sharedParams, awardsData, $scope, $state, $stateParams, $sce, $filter, $window) {
    'use strict';
  
    $window.scrollTo(0, 0);
    $scope.$sce = $sce;
    $scope.featuredArr = [];
    $scope.awardCatArr = [];
    $scope.awardAccordionArr = [];

   //Get the News data
   ourNewsData.getNewsData().then(function(data){
    //console.log('data.d.results ', data.d.results);
    angular.forEach(data.d.results, function(value, key){
        if(value.Featured == true && value.Article_x002d_Type === 'Awards'){
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
    //console.log('$scope.featuredArr ', $scope.featuredArr);

    //order by desc date                  
    $scope.featuredArr = $filter('orderBy')($scope.featuredArr, '-Date');
    });

    awardsData.getAwardCatData().then(function(data){
        //console.log('awardsCat data ', data.d.results);
        angular.forEach(data.d.results, function(value, key){
            var awardCatObj = {
                Title: value.Title,
                Description: value.Description
            }
            $scope.awardCatArr.push(awardCatObj);
        });        
    });

    awardsData.getAwardAccordionData().then(function(data){
        angular.forEach(data.d.results, function(value, key){
            var awardAccorObj = {
                Title: value.Title,
                Description: value.Description
            }
            $scope.awardAccordionArr.push(awardAccorObj);
        });        
    });

    $scope.getItemID = function(id){
        sharedParams.setNewsItemID(id);
        $scope.dataObj = sharedParams.getDataObj();
        //console.log('$scope.dataObj ', $scope.dataObj);
    }

});  

