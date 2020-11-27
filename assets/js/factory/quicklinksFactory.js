/* Our News Data Factory
======================================================================================
======================================================================================
*/

tasInnApp.factory('StrategyQuickLinksData', function($http){
	return {
		getStrategyQuickLinksData: function(){
	    	return $http.get("siteUrl_api/web/lists/getByTitle('Lst_Quick_Links')/items?$select=*", { 
				headers: { "Accept": "application/json;odata=verbose" }
			})
			.then(function(response) {
				return response.data;
			});
		}
	}
});