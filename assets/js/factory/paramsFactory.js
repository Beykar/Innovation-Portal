/* Params Factory
===========================================================================================
===========================================================================================*/
tasInnApp.factory('sharedParams', function() {
    var dataObj= {}
  
    return {
      setState          : setState,
      setNewsItemID     : setNewsItemID,
      setStateDetails   : setStateDetails,
      getDataObj        : getDataObj 
    };

  
    function setState(state) {
      dataObj.state = state
    }

    function setNewsItemID(newsItemID) {
      dataObj.newsItemID = newsItemID
    }

    function setStateDetails(stateDetails) {
      dataObj.stateDetails = stateDetails
    }
  
    function getDataObj() {
      return dataObj;
    }


  });

  

