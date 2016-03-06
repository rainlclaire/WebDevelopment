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
            var data = $http.get("http://maps.googleapis.com/maps/api/geocode/json?&address="+address+"&sensor=false");
            var url= "https://www.google.com/maps/embed/v1/place?key=AIzaSyBFek2cKN2fA6seFcgfsEDyhE3CONb0ynM&q="+address.toString();
            console.log(url);
            console.log(data);
            return data;


        }
    }
})();