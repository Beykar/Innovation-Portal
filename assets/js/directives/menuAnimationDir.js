/* =========================
    Directive to animate burger menu 
============================= */

tasInnApp.directive("animateMenu", [
    function() {
      return {
        restrict: "AE",
    
        scope: true,
        link: function(elem, attr) {
                $('#tip__menu-burger').click(function(){
                    $(this).toggleClass('open');
                });  
        }
      };
    }
]);