/* Awards Data Factory
======================================================================================
======================================================================================
*/

tasInnApp.factory('awardsData', function($http){
	return {
		getAwardCatData: function(){
	    	return $http.get("siteUrl_api/web/lists/getByTitle('Lst_Awards-Categories')/items?$select=*", { 
				headers: { "Accept": "application/json;odata=verbose" }
			})
			.then(function(response) {
				return response.data;
			});
		},
		getAwardAccordionData: function(){
	    	return $http.get("siteUrl_api/web/lists/getByTitle('Lst_Awards-Accordion')/items?$select=*", { 
				headers: { "Accept": "application/json;odata=verbose" }
			})
			.then(function(response) {
				return response.data;
			});
		}
	}
});