/* Home Controller
====================================================================================================
==================================================================================================*/
tasInnApp.controller('strategyCtrl', function (sharedParams, StrategyQuickLinksData, $scope, $sce, $stateParams, $filter, $window, $location) {
    'use strict';
  
    $window.scrollTo(0, 0);
    $scope.$sce = $sce;

    $scope.getItemID = function(id){
        sharedParams.setNewsItemID(id);
        $scope.dataObj = sharedParams.getDataObj();
        //console.log('$scope.dataObj ', $scope.dataObj);
    }

    StrategyQuickLinksData.getStrategyQuickLinksData().then(function(response) {
        $scope.quickLinksData = response.d.results;
        console.log("resources::test::", $scope.quickLinksData);
      });
});  

