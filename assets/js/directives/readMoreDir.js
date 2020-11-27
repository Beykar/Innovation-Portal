/* =========================
    Directive to change team-member list item css upon click
============================= */

tasInnApp.directive("readMore", [
    function() {
      return {
        restrict: "AE",
    
        scope: true,
        link: function(elem, attr) {

                // var resetElements = function(){
                //     $('.tip__tasx-team-members-list--item').removeClass('clicked');
                //     $('.tip__tasx-team-members-desc--hidden-para').css('display', 'none');
                //     $('.tip__tasx-team-members-desc--readmore-btn').html('Read More');
                // }

                // $('.tip__tasx-team-members-desc--readmore-btn').on('click', function($e){
                //     $e.preventDefault();
                //     if($(this).closest('li').hasClass('clicked') ){
                //         $(this).closest('li').removeClass('clicked');
                //         var $target = $(this).attr('href');
                //         $($target).slideUp('slow');
                //         setTimeout($(this).html('Read More'), 1500);
                //     } else {
                //         resetElements();
                //         $(this).closest('li').addClass('clicked');
                //         var $target = $(this).attr('href');
                //         $($target).slideDown('slow');
                //         setTimeout($(this).html('Read Less'), 1500);
                //     }
                // });
              
             
            $(window).on('load', function(){

                var $listItems = $('.tip__tasx-team-members-list--item'),
                $readMoreBtn = $('.tip__tasx-team-members-desc--readmore-btn'),
                $hiddenPara = $('.tip__tasx-team-members-desc--hidden-para'),

                resetElements = function(){
                    $listItems.removeClass('clicked');
                    $hiddenPara.css('display', 'none');
                    $readMoreBtn.html('Read more');
                };

                $readMoreBtn.on('click', function($e){
                    $e.preventDefault();
                    $targetParaId =  $(this).attr('href');
                    $thisLi = '#list-item-' + $targetParaId.substr(5);
                    //console.log('$(this) ', $(this));
                    if($(this).html() === 'Read more'){
                        resetElements();
                        $($thisLi).addClass('clicked'); 
                        //console.log('event target li', $thisLi);                   
                        $($targetParaId).toggle();
                        //console.log('$targetPara', $($targetParaId));
                        $(this).html('Read less');
                    } else {
                        $($thisLi).removeClass('clicked');                    
                        $($targetParaId).toggle();
                        $(this).html('Read more');
                        // resetElements(); 
                    }
                });

            });
        }
      };
    }
]);