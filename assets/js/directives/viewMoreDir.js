/* =========================
    Directive to reveal more news items
============================= */

tasInnApp.directive("viewMore", [
    function() {
      return {
        restrict: "AE",
    
        scope: true,
        link: function(elem, attr) {
            $listItems = $('.tip__tasx-news-articles-list--item');
            $viewMoreBtn = $('.tip__tasx-news-articles-viewmore-btn');
            $viewMoreBtnCont = $('.tip__tasx-news-articles-viewmore-cont');
            $listLength = $listItems.length;
            $lastElement = $listItems.eq($listLength-1);
            $itemsShown = 8;
            //console.log('list length: ', $listLength); 
 
            setTimeout(function(){
                if ($listLength <= 8){
                    $viewMoreBtn.css('display', 'none');
                } else {
                    for (var i = 8; i < $listLength; i++){
                        var $item = $listItems.eq(i);
                        $item.css('display', 'none');
                    }
                    $viewMoreBtn.on('click', function(){                    
                        if($viewMoreBtnCont.text() == 'View More'){
                            if($itemsShown < $listLength){
                                //console.log('$itemsShown', $itemsShown);
                                $listItems.slice($itemsShown, $itemsShown+8).css('display', 'block');
                                    
                                if ($lastElement.css('display') == 'block'){
                                    $viewMoreBtnCont.text('View Less');
                                } else {
                                    $itemsShown+= 8;
                                }       
                            } 
                        } else {
                            if($itemsShown > 8){
                                console.log('$itemsShown in less', $itemsShown);
                                $listItems.css('display', 'none');
                                $listItems.slice(0, $itemsShown-8).css('display', 'block');
                                if ($listItems.eq(8).css('display') == 'none'){
                                    $viewMoreBtnCont.text('View More');
                                    $itemsShown = 8;
                                } else {
                                    $itemsShown-= 8; 
                                }
                            }
                        }
                    });
                }
            },500);           
        }
      };
    }
]);
