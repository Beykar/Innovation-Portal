/* Intro Section Data Factory
======================================================================================
======================================================================================
*/

tasInnApp.factory('introSectionData', function($http){
	return {
		getIntroData: function(){
	    	return $http.get("siteUrl_api/web/lists/getByTitle('Lst_Intro-Section')/items?$select=*", { 
				headers: { "Accept": "application/json;odata=verbose" }
			})
			.then(function(response) {
				return response.data;
			});
		}
	}
});