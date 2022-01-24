app.controller('NewOrderCtrl', ['$scope', '$filter', '$http',
    function ($scope, $filter, $http, $timeout) {

// add user insert
        $scope.insert = function () {

            var data = {
                ViewName: "test",
                parameters: [

                    {key: "%user_id", value: "1"},
                    {key: "%order_name", value: $scope.ordername},
                    {key: "%Description", value: $scope.description},
                    {key: "%category_id", value: $scope.categoryid},
                    {key: "%amount", value: $scope.amount},
                    {key: "%order_type", value: $scope.ordertype},
                    {key: "%location_id", value: $scope.locationid},
                    {key: "%submit", value: $scope.submit}

                ]
            }

            console.log(data);
            $http.post(URL_INSERT, JSON.stringify(data))
                .success(function (result, status, headers, config) {
                    alert("آگهی با عنوان " + $scope.ordername + " با موفقیت ثبت شد. ");
                    document.location.replace("#/app/page/table1");

                }).error(function (result, status, header, config) {
                alert("ثبت آگهی با عنوان " + $scope.ordername + " با خطا مواجه شد./n لطفا دوباره تلاش کنید. ");
                document.location.replace("#/app/page/table1");
            });


        }

        // add user insert
        // location

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
    }])
;
