/* Our News Controller
====================================================================================================
==================================================================================================*/
tasInnApp.controller('ourNewsCtrl', function (ourNewsData, sharedParams, $scope, $state, $sce, $filter, $window, $stateParams, $location) {
    'use strict';
  
    $window.scrollTo(0, 0);
    $scope.$sce = $sce;
    $scope.newsDataArr = [];
    $scope.newsArr =[];
    

    //console.log('stateParams', $stateParams.newsID);
    
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


    //Get the News data
    ourNewsData.getNewsData().then(function(data){

        //console.log('data.d.results ', data.d.results);

        angular.forEach(data.d.results, function(value, key){
            var newsObj = {
                ID: value.ID,
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
            $scope.newsDataArr.push(newsObj);
        });

        // console.log('$scope.newsDataArr ', $scope.newsDataArr);
        $scope.newsDataArr = $filter('orderBy')($scope.newsDataArr, '-Date');

        
        /* The following code is a fail-safe, when more than one article are set to 'Featured' in the list. the code will Only display the LATEST featured article. */

        // 1- Put all articles with Featured set to true in an array and order by desc date.
        $scope.featuredArr = [];    
        angular.forEach($scope.newsDataArr, function(value, key){
            if(value.Featured == true){
                $scope.featuredArr.push(value);
            }
        });
        
        $scope.featuredArr = $filter('orderBy')($scope.featuredArr, '-Date');

        if($scope.featuredArr.length == 0){
            $scope.featuredArticle = $scope.newsDataArr [0];
        }


        //Check if an article has been clicked in the home carousel. If it has it will take precedence
        // Get any stored ID from the sharedParams object
        if ($stateParams.newsID != undefined && $stateParams.newsID != 'home'){
            angular.forEach($scope.newsDataArr, function(value, key){
                if (value.ID == $stateParams.newsID){
                    $scope.clickedElement = value;
                    $scope.clickedElement.Featured = true;
                }
            });
            $scope.featuredArr = [];
            $scope.featuredArr.push($scope.clickedElement);
        }

        // 2- Display the latest article with Featured set to true or the article that was clicked on the homepage
        $scope.featuredArticle = $scope.featuredArr[0];
        
        // 3- Remove the newest featured article from the main news array so that it's not displayed twice
        $scope.newsDataArr.splice($scope.newsDataArr.indexOf($scope.featuredArr[0]), 1);
        angular.forEach($scope.newsDataArr, function(value, key){
            value.Featured = false;
        });


        // 4 - This foo adds the existing featured article in with the remainder of the articles in the main section, then moves the clicked news item into the featured area
        $scope.makeFeature = function (item){
            
            //empty the FeaturedArr
            $scope.featuredArr =[];

            item.Featured = true;
            $scope.featuredArticle = item;
            
            $scope.newsDataArr.push($scope.featuredArticle);
            $scope.featuredArr.push(item);
         
            //console.log('$scope.newsDataArr', $scope.newsDataArr);
            $stateParams.newsID = item.ID; 
            $state.go('our-news', {'newsID': item.ID})
        }

    });

});  

