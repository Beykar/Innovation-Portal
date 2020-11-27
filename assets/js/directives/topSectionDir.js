/* =========================
    Directive to include breadcrums and search
============================= */

tasInnApp.directive("topSection", ['$location', function($location) {
    return {
      restrict: "EA",
      templateUrl:
        "siteUrlSiteAssets/uki-tas-innovation-test/assets/js/partials/topSectionPartial.html",
        
      scope: true,
      link: function(scope, elem, attr) {

      }
    };
  }]);
  