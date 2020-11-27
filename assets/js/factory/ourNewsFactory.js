/* Our News Data Factory
======================================================================================
======================================================================================
*/

tasInnApp.factory('ourNewsData', function($http){
	return {
		getNewsData: function(){
	    	return $http.get("siteUrl_api/web/lists/getByTitle('Lst_Our-News')/items?$select=*", { 
				headers: { "Accept": "application/json;odata=verbose" }
			})
			.then(function(response) {
				return response.data;
			});
		}
	}
});