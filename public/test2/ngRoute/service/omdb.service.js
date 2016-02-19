(function () {
    angular.module("MovieApp")
        .factory("OmdbService", OmdbService);


    function OmdbService($http) {
        var api ={
            findMoviesByTitle: findMoviesByTitle,
            findMovieByImdbID: findMovieByImdbID
        };

        return api;

        function findMoviesByTitle(title, callback) {
            $http.get("http://www.omdbapi.com/?s=" +title)
                .success(callback);
        }

        function findMovieByImdbID(ImdbID, callback) {
            $http.get("http://www.omdbapi.com/?i="+ ImdbID)
                .success(callback);
        }




    }
})();