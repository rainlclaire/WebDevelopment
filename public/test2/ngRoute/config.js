(function(){
    angular.module("MovieApp")
        .config(Configuration);

   function Configuration($routeProvider) {
        $routeProvider
            .when("/home",{
                templateUrl:"view/home/home.view.html",
                controller: "HomeController"

            })
            .when("/search",{
                templateUrl:"view/search/search.view.html",
                controller: "SearchController"
            })
            .when("/search/:title", {
                templateUrl:"view/search/search.view.html",
                controller:"SearchController"
            })
            .when("/detail/:ImdbID",{
                templateUrl:"view/details/details.view.html",
                controller:"DetailsController"
            })
            .otherwise({
                redirectTo:"/home"
            });
    }
})();