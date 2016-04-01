(function() {
    angular.module("fieldSortable",[])
    .directive("fieldSortable", fieldSortable);


    function fieldSortable(FieldService) {
        var start = null;
        var end = null;

        function link(scope, element, attributes) {
            var jpaAxis = attributes.jpaAxis;

            $(element).sortable({
                axis:jpaAxis,
                start: function(event, ui) {
                    start = ui.item.index();
                },

                stop: function(event, ui) {
                    end = ui.item.index();

                    if(start>=end) {
                        start--;
                    }
                    scope.model.sortOrder(start,end);


            }
            });
        }
        return{
            link:link
        }
    }
})();