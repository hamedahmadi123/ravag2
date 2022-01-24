app.controller('DetailsController', ['$scope', '$filter', '$http',
    function ($scope, $filter, $http, $timeout) {


        setTimeout(myFunction, 300);

        function myFunction() {


            var full_url = document.URL; // Get current url
            var url_array = full_url.split('/') // Split the string into an array with / as separator
            order_id = url_array[url_array.length - 1];  // Get the last part of the array (-1)

            var data = {
                ViewName: "OrderDetail",
                parameters: [
                    {key: "%order_id", value: order_id}]
            }


            $http.post(URL_GET, JSON.stringify(data))
                .success(function (result, status, headers, config) {
                    $scope.orders = result.data;
                })

        }
    }]);