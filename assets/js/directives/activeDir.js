/* =========================
    Directive to toggle 'active' class
============================= */

tasInnApp.directive("active", [
    function() {
      return {
        restrict: "AE",
    
        scope: true,
        link: function(elem, attr) {

                var currentUrl = window.location.pathname.split('/');
                //console.log('currentActiveTab ', currentUrl);
                
                $('.tip__nav-list--link').each(function(){
                    if($(this).attr('href') != undefined){
                      var tabHref = $(this).attr('href').split('/');
                      //console.log('currentTabHref ', tabHref);

                      if(currentUrl[5] == tabHref[5]){
                        $('.tip__nav-list--link').removeClass('active');
                        $(this).toggleClass('active');
                        // console.log('currentUrl ', currentUrl[5]);
                        // console.log('currentTabHref ', tabHref[5]);
                      }
                    } 
                });  

                $('.tip__nav-list--link').on('click', function(){
                    
                    $('.tip__nav-list--link').removeClass('active');
                    $(this).toggleClass('active');
                });

                $('.tip__logo-cont--link').on('click', function(){
                  $('.tip__nav-list--link').removeClass('active');
                  $('#home-link').toggleClass('active');
                });
        }
      };
    }
]);