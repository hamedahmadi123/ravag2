app.controller('schoolCtrl', ['$scope', '$filter', '$http', function ($scope, $filter, $http, $timeout){

    $scope.eroretext = "";
    $scope.titelext = "";
    $scope.name = [];

    var skip = -15;
    var take = 15;
    var objects = 0;
    var isem = false;
    $scope.load2 = function () {

        if (isem)
            return;

        skip += take;
        for (var i = 1; i <= take; i++) {
            $scope.name.push({order_id: "-1" + $scope.name.length});
        }


        var msg = {
            ViewName: "SchoolSelect",
            mutualTransaction: {
                Columns: [],
                kendoDataRequest: {
                    filter: {
                        field: "",
                        logic: "",
                    operator: "",
                        value: ""
                    },
                    skip: skip,
                    take: take,
                    Sort: [{field: "schoolid", dir: "DESC"}]
                }
            },
        };
        $http.post(URL_GET, JSON.stringify(msg))
            .success(function (result, status, headers, config) {

                if (result.data.length === 0) {
                    isem = true;
                }

                result.data.forEach(function (element) {
                    $scope.name[objects] = element;
                    objects++;
                });
                $scope.name.length = objects;

            });

    };

    // delete******************************
    $scope.deleteSchool = function ($id, $name) {
        var del_Item = {
            ViewName: "SchoolDelete",
            parameters: [
                {key: "%schoolid", value: $id + ''},
            ]
        };

        var j = confirm("آیا برای حذف آموزشگاه با عنوان " + $name + " و با شناسه " + $id + " اطمینان دارید ؟");
        if (j === true) {
            $http.post(URL_INSERT, JSON.stringify(del_Item))
                .success(function (result, status, headers, config) {
                    document.location.reload();
                }).error(function (result, status, header, config) {
                alert("حذف با خطا مواجه شد.");
                document.location.reload();
            });
        }
    }





}])
;