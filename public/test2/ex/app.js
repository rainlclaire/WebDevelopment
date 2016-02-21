/*load the app.js after lib angular, the
 * moduel bound to the ng-app, [] for dependency*/
/*angular: view(display data), data(provides data),
 controller(response for providing the date to the view*/
/*declar the controller*/
/*for the table data in
 * $scope response for everything happend in that table,
 * to ask the angular ref for $scope, the angular
 * will look at the variable in table, view and controller can communication
 * by $scope*/
/*it is now avaliable on view by touching the $scope*/
(function() {
    angular
        .module("MovieAdminApp", [])
        .controller("MovieListController", MovieListController);

    function MovieListController($scope) {

        $scope.movies = [
            {id: 123, title: "Star Wars", director: "JJ Abrams"},
            {id: 234, title: "Avatar", director: "James Cameron"},
            {id: 345, title: "Aliens", director: "James Cameron"}

        ];
        //a good style
        $scope.addMovie = addMovie;
        $scope.deleteMovie = deleteMovie;
        $scope.selectMoive = selectMovie;
        $scope.updateMoive = updateMovie;

        //event handler
        function addMovie(movie) {
            console.log("addMovie"+ $scope.movie.title);
            var newMovie = {
                id:movie.id,
                title:movie.title,
                director:movie.director
            };
            $scope.movies.push(newMovie);
        }

        function deleteMovie(movie) {
            var index = $scope.movies.indexOf(movie);
            console.log("deleteMovie"+index);
            $scope.movies.splice(index,1);
        }
        var selectMovieIndex = -1;
        function selectMovie(movie) {
            selectMovieIndex = $scope.movies.indexOf(movie);
            console.log(movie);
            $scope.movie = {
                id:movie.id,
                title:movie.title,
                director:movie.director
            }
        }

        function updateMovie(movie) {
            if (selectMovieIndex>=0) {
                $scope.movies[selectMovieIndex]= {
                    id:movie.id,

                }
            }
        }
    }
})();
