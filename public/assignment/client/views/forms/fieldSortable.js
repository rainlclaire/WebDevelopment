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
                    //var temp = scope.model.index();
                    var temp = scope.model.fields[start];
                    scope.model.fields[start] = scope.model.fields[end];
                    scope.model.fields[end] = temp;
                    scope.$apply();

                    alert(scope.model.fields[end].id);
                    FieldService.reorderField(scope.model.fields.id, start, end);
            }
            });
        }
        return{
            link:link
        }
    }
})();