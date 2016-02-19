(function (){
    angular.module("MovieApp")
        .controller("DetailsController", DetailsController);

    function DetailsController($scope, $routeParams, OmdbService) {
        $scope.ImdbID = $routeParams.ImdbID;

        OmdbService.findMovieByImdbID($scope.ImdbID, render);



        function render(response) {
            $scope.movie=response;
        }

    }
})();