/* search Data Factory
======================================================================================
======================================================================================
*/

tasInnApp.factory('searchData', function($http){
	return {
		getSSLData: function(){
	    	return $http.get("siteUrl_api/web/lists/getByTitle('Lst_SSL-tools')/items?$select=*", { 
				headers: { "Accept": "application/json;odata=verbose" }
			})
			.then(function(response) {
				return response.data;
			});
		},
		getSearchData: function(){
	    	return $http.get("siteUrl_api/web/lists/getByTitle('Lst_Innovation-Tools')/items?$select=*", { 
				headers: { "Accept": "application/json;odata=verbose" }
			})
			.then(function(response) {
				return response.data;
			});
		},
		getGDSData: function(){
			return $http.get("siteUrl_api/web/lists/getByTitle('Lst_GDS-contacts')/items?$select=*", { 
				headers: { "Accept": "application/json;odata=verbose" }
			})
			.then(function(response) {
				return response.data;
			});
		},
		getUserData: function(ID){
	    	return $http.get("siteUrl_api/web/getuserbyid("+ ID +")", { 
				headers: { "Accept": "application/json;odata=verbose" }
			})
			.then(function(response) {
				return response.data;
			});
		}
	}
});