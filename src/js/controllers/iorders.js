app.controller('categoriesCtrl', ['$scope', '$filter', '$http',
    function ($scope, $filter, $http, $timeout) {

        var order_id;


        var locations = {
            ViewName: "locationParrent",
            parameters: [
                {key: "%parrent", value: "-"}

            ]

        }

        $http.post(URL_GET, JSON.stringify(locations))
            .success(function (result, status, headers, config) {
                $scope.loca = result.data;
            })
            .error(function (result, status, header, config) {
                $scope.loca = result.data;
            });


//location


//category
        var cat = {
            ViewName: "categoryTable"

        }

        $http.post(URL_GET, JSON.stringify(cat))
            .success(function (result, status, headers, config) {
                $scope.cate = result.data;
            })
            .error(function (result, status, header, config) {
                $scope.cate = result.data;
            });

        $scope.order_type = [
            {order_itype: 1, order_ntype: 'آگهی عادی'},
            {order_itype: 2, order_ntype: 'مزایده'},
            {order_itype: 3, order_ntype: 'مناقصه'}
        ];

    }]);






