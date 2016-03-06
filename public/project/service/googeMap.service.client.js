(function(){
    angular
        .module("FindGroupApp")
        .factory("GoogleMapService", GoogleMapService);

    function GoogleMapService($http) {
        var api = {
            searchMapByAddress: searchMapByAddress
            //findMovieByImdbID: findMovieByImdbID
        };
        return api;

        //function findMovieByImdbID(imdbID) {
        //    return $http.get("http://www.omdbapi.com/?i="+imdbID);
        //}

        function searchMapByAddress(address) {
            var data = $http.get("https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key=AIzaSyBFek2cKN2fA6seFcgfsEDyhE3CONb0ynM");
            console.log(data);
            return data;


        }
    }
})();