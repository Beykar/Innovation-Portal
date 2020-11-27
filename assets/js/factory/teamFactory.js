/* Team Data Factory
======================================================================================
======================================================================================
*/

tasInnApp.factory('teamData', function($http){
	return {
		getTeamData: function(){
	    	return $http.get("siteUrl_api/web/lists/getByTitle('Lst_Team-Members')/items?$select=*", { 
				headers: { "Accept": "application/json;odata=verbose" }
			})
			.then(function(response) {
				return response.data;
			});
		},
		getContributorsData: function(){
			return $http.get("siteUrl_api/web/lists/getByTitle('Lst_Contributors')/items?$select=*", { 
				headers: { "Accept": "application/json;odata=verbose" }
			})
			.then(function(response) {
				return response.data;
			});
		}
	}
});