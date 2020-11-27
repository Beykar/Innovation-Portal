var tasInnApp = angular.module('tasInnApp', ['ngAnimate', 'ui.router', 'ngSanitize', 'ui.bootstrap']);

//this is to allow the $location.search().q to work when entering a search term
tasInnApp.config(['$locationProvider', function($locationProvider){
    $locationProvider.html5Mode(
      {
        enabled: true,
        requireBase: false
      });    
  }]);
  
  tasInnApp.filter('trusted', ['$sce', function($sce){
      var div = document.createElement('div');
      return function(text) {
          div.innerHTML = text;
          return $sce.trustAsHtml(div.textContent);
      }
  }]);
  
  tasInnApp.filter('removeHTMLTags', function() {
    return function(text) {
      return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
  });
  
  tasInnApp.filter('limitHtml', function() {
    return function(text, limit) {
  
        var changedString = String(text).replace(/<[^>]+>/gm, '');
        var length = changedString.length;
  
        return length > limit ? changedString.substr(0, limit - 1)+ '....' : changedString;
    }
  });

  tasInnApp.run(function($rootScope, $window) {

    $rootScope.$on('$stateChangeSuccess', function () {
  
      var interval = setInterval(function(){
        if (document.readyState == 'complete') {
          $window.scrollTo(0, 0);
          clearInterval(interval);
        }
      }, 200);
  
    });
    
  });
  
  tasInnApp.config(function($locationProvider, $stateProvider, $urlRouterProvider){
    $locationProvider.hashPrefix('');
    $stateProvider

    .state('/',{
        url: "/SitePages/Index-Test.aspx",
        templateUrl: "siteUrlSiteAssets/uki-tas-innovation-test/assets/js/partials/homePartial.html" 
    })
    .state('home', {
        url: "/SitePages/Index-Test.aspx/home",
        templateUrl: "siteUrlSiteAssets/uki-tas-innovation-test/assets/js/partials/homePartial.html" 
    })
    .state('sat-strategy', {
      url: "/SitePages/Index-Test.aspx/sat-strategy",
      templateUrl: "siteUrlSiteAssets/uki-tas-innovation-test/assets/js/partials/tasxStrategyPartial.html" 
    })
    .state('sat-team', {
      url: "/SitePages/Index-Test.aspx/sat-team",
      templateUrl: "siteUrlSiteAssets/uki-tas-innovation-test/assets/js/partials/tasxTeamPartial.html" 
    })
    .state('sat-tools', {
      url: "/SitePages/Index-Test.aspx/sat-tools/{tasTools}",
      templateUrl: "siteUrlSiteAssets/uki-tas-innovation-test/assets/js/partials/tasxIndToolPartial.html" 
    })
    .state('sat-all-tools', {
      url: "/SitePages/Index-Test.aspx/sat-all-tools",
      templateUrl: "siteUrlSiteAssets/uki-tas-innovation-test/assets/js/partials/searchPartial.html" 
    })
    .state('sat-tools/ind-tool/sub-tool', {
      url: "/SitePages/Index-Test.aspx/sat-tools/{tasTool}/{tasSubTool}",
      templateUrl: "siteUrlSiteAssets/uki-tas-innovation-test/assets/js/partials/tasxSubToolPartial.html" 
    })
    .state('search', {
      url: "/SitePages/Index-Test.aspx/search",
      templateUrl: "siteUrlSiteAssets/uki-tas-innovation-test/assets/js/partials/searchPartial.html" 
    })
    .state('gds', {
      url: "/SitePages/Index-Test.aspx/gds",
      templateUrl: "siteUrlSiteAssets/uki-tas-innovation-test/assets/js/partials/gdsPartial.html" 
    })
    .state('innovation-awards', {
      url: "/SitePages/Index-Test.aspx/innovation-awards",
      templateUrl: "siteUrlSiteAssets/uki-tas-innovation-test/assets/js/partials/awardsPartial.html" 
    })
    .state('our-news', {
      url: "/SitePages/Index-Test.aspx/our-news/:newsID",
      templateUrl: "siteUrlSiteAssets/uki-tas-innovation-test/assets/js/partials/newsPartial.html" 
    })


    //$urlRouterProvider.otherwise("/SitePages/Index-Test.aspx/home");
  
  });