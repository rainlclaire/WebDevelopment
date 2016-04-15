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
                    console.log(start+" "+end);
                    //if(start>=end) {
                    //    start--;
                    //}
                    scope.fieldSortableCallback({start:start,end:end});


            }
            });
        }
        return{
            scope: {
                fieldSortableCallback:'&'
            },
            link:link
        }
    }
})();