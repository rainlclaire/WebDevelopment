"use strict";

(function() {
    angular.module('FindGroupApp')
        .controller("GroupController", GroupController);

    function GroupController($scope, $rootScope, GroupService, GoogleMapService) {

        var user = $rootScope.currentUser;

            GroupService.findAllGroups(function(allGroups) {
                $scope.groups= allGroups;

            });




        //function initMap() {
        //    var map = new google.maps.Map(document.getElementById('map'), {
        //        zoom: 8,
        //        center: {lat: -34.397, lng: 150.644}
        //    });
        //    var geocoder = new google.maps.Geocoder();
        //
        //    document.getElementById('submit').addEventListener('click', function() {
        //        geocodeAddress(geocoder, map);
        //    });
        //}
        //function geocodeAddress(geocoder, resultsMap) {
        //    var address = document.getElementById('address').value;
        //    geocoder.geocode({'address': address}, function(results, status) {
        //        if (status === google.maps.GeocoderStatus.OK) {
        //            resultsMap.setCenter(results[0].geometry.location);
        //            var marker = new google.maps.Marker({
        //                map: resultsMap,
        //                position: results[0].geometry.location
        //            });
        //        } else {
        //            alert('Geocode was not successful for the following reason: ' + status);
        //        }
        //    });
        //}



        var clickGroup  = $rootScope.clickGroup;
        //function for form
        $scope.addGroup = addGroup;
        $scope.updateGroup = updateGroup;
        $scope.deleteGroup = deleteGroup;
        $scope.selectGroup = selectGroup;
        //$scope.search = search;



        //function search(group) {
        //
        //    console.log("serach");
        //
        //    GroupService.findGroupsByTitle(group.title, function (response) {
        //        console.log(response);
        //        $scope.groups= response;
        //        alert("cici");
        //
        //    });



            //GoogleMapService.searchMapByAddress(group)
            //    .then(function(response) {
            //
            //        console.log(response);
            //        $scope.results = response.data.results;
            //        $scope.address = response.data.results[0].formatted_address;
            //        $scope.url = "https://www.google.com/maps/embed/v1/place?key=AIzaSyBFek2cKN2fA6seFcgfsEDyhE3CONb0ynM&q="+$scope.adress;
            //
            //        console.log($scope.results[0].geometry.location.lat);


                    //function initMap() {
                    //    var map = new google.maps.Map(document.getElementById('map'), {
                    //        zoom: 8,
                    //        center: {lat: -34.397, lng: 150.644}
                    //    });
                    //    var geocoder = new google.maps.Geocoder();
                    //
                    //    document.getElementById('submit').addEventListener('click', function() {
                    //        geocodeAddress(geocoder, map);
                    //    });
                    //}
                    //
                    //function geocodeAddress(geocoder, resultsMap) {
                    //    var address = document.getElementById('address').value;
                    //    geocoder.geocode({'address': address}, function(results, status) {
                    //        if (status === google.maps.GeocoderStatus.OK) {
                    //            resultsMap.setCenter(results[0].geometry.location);
                    //            var marker = new google.maps.Marker({
                    //                map: resultsMap,
                    //                position: results[0].geometry.location
                    //            });
                    //        } else {
                    //            alert('Geocode was not successful for the following reason: ' + status);
                    //        }
                    //    });
                    //}
                    //
                    //var myLatLng= {
                    //    lat: $scope.result.value
                    //}
                //});






        }

        //add the form to currentForms
        function addGroup(group) {
            var newGroup= {
                title: group.title,
                _id: group._id,
                ownerName: group.ownerName,
                description:group.description,
                listofEvents:group.listofEvents,
                address:group.address
            };

            //inti the title with empty
            $scope.clickGroup.title="";
            $scope.clickGroup.ownerName="";
            $scope.clickGroup.address="";
            $scope.clickGroup.description="";
            $scope.clickGroup.listofEvents="";

            GroupService.createGroup(newGroup, function(createdGroups) {
                GroupService.findAllGroups(function(allGroups) {
                    $scope.groups = allGroups;

                });
            });
        }

        //update the select form with the given form info
        function updateGroup(group) {
            if ($scope.selectGroupIndex != null) {
                $scope.groups[$scope.selectGroupIndex]._id = group._id;
                $scope.groups[$scope.selectGroupIndex].title = group.title;
                $scope.groups[$scope.selectGroupIndex].adress = group.adress;
                $scope.groups[$scope.selectGroupIndex].description = group.description;
                $scope.groups[$scope.selectGroupIndex].ownerName = group.ownerName;
                $scope.groups[$scope.selectGroupIndex].listofEvents = group.listofEvents;

            } else {
                alert("You have to select a Form");
            }
        }

        //delete the form with given form's index
        function deleteGroup(index) {
            var deletedId = $scope.groups[index]._id;
            console.log(deletedId);
            GroupService.deleteGroupById(deletedId, function(allOtherGroups) {
                $scope.groups = allOtherGroups;
            });
        }

        //select the form with given form's index
        function selectGroup(index) {
            //$scope.clickForm.title = $scope.forms[index].title;
            $scope.selectGroupIndex = index;
            console.log($scope.groups[index].ownerName);
            $scope.clickGroup = {
                "_id": $scope.groups[index]._id,
                "title": $scope.groups[index].title,
                "address": $scope.groups[index].address,
                "ownerName": $scope.groups[index].ownerName,
                "description": $scope.groups[index].description,
                "listofEvents:": $scope.groups[index].listofEvents
            };
            console.log($scope.clickGroup.ownerName);

        }


})();