/* =========================
    Directive to toggle sliding tools menu
============================= */

tasInnApp.directive("slideMenu", [
    function() {
      return {
        restrict: "AE",
    
        scope: true,
        link: function(elem, attr) {
                $('.tip__tools-sliding-menu--tools-item-link').on('click', function(){
                    console.log('clicked');
                    $('.tip__tools-sliding-menu--cont').toggleClass('show-menu');
                });
        }
      };
    }
]);
